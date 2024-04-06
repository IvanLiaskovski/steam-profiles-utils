import * as cheerio from "cheerio";

/** Generates configuration information to get Points Shop information from the Steam API.
 *
 * @param {string} responseData: HTML page data containing a list of apps and their ID numbers.
 * @param {string} urlPrefix: The base Steam API URL to query for app data.
 * @param {number} urlLimit: The max. number of apps to fit into one Steam API URL. In general, try to keep this below 440.
 * @param {string} idExtractionRegex: Regex that extracts the true app ID from the provided source value (first match only). Defaults to detecting all numbers.
 * @returns {Object} An object containing general info about each app, and the Steam API URL's to query.
 */

export default function getConfigData(
  responseData: string,
  urlPrefix: string,
  urlLimit: number,
  idExtractionRegex: RegExp = /\d+/
) {
  const parsedData = cheerio.load(responseData);
  parsedData.html();
  const options = parsedData(".btn-primary.p-2");
  const appNames = parsedData(
    ".mr-2.tracking-wider.truncate.font-league-gothic"
  );

  let output = {
    app: {},
    urls: [urlPrefix],
  };
  let urlCounter = 0;
  let urlIndex = 0;
  let appCounter = 0;
  // Extract all app id's with potential Points Shop items
  for (let i = 0; i < options.length; i++) {
    const rawAppId = options.eq(i).attr("href");
    let extractedAppId = "";
    if (rawAppId.length > 0) {
      // App ID is not empty, but may need to be extracted from a larger string, usually in the form of "index.php?gamepage-appid-..."
      if (idExtractionRegex) {
        extractedAppId = `${rawAppId}`.match(idExtractionRegex)?.[0];

        // The regex may result in some apps appearing multiple times, in which case only take the first instance.
        // This is a somewhat blind approach, but selecting the correct instance is not so trivial either, depending on the expression.
        if (!extractedAppId || `${extractedAppId}` in output["app"]) {
          continue;
        }
      }
      output["app"][`${extractedAppId}`] = {
        name: appNames.eq(appCounter).text(), // Lazily assign the next app, partly because the item comes from a different element tree
        pointsShopUrl: `https://store.steampowered.com/points/shop/app/${extractedAppId}`,
      };

      output["urls"][urlIndex] += `&appids[${urlCounter}]=${extractedAppId}`;
      urlCounter++;
      appCounter++;
      if (urlCounter >= urlLimit) {
        urlIndex++;
        output["urls"][urlIndex] = urlPrefix;
        urlCounter = 0;
        console.log(`Processed a full set of ${urlLimit} items.`);
      }
    }
  }

  // Omit the final entry, if the limit is a factor of the number of apps
  if (output["urls"][urlIndex] == urlPrefix) {
    output["urls"].pop();
  }
  return output;
}
