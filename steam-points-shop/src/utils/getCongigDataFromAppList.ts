/** Generates configuration information from the app list data from the Steam API GetAppList v2 endpoint.
 *
 * @param {Object[]} appList: A list of objects with the "appid" and "name" properties.
 * @returns {Object} An object containing general info about each app, and the Steam API URL's to query.
 */
export function getConfigDataFromAppList(appList: any) {
  let output = {
    app: {},
  };

  console.log(`Processing ${appList.length} apps.`);
  for (let i = 0; i < appList.length; i++) {
    let appid = appList[i].appid;
    output.app[`${appid}`] = {
      name: appList[i].name,
      pointsShopUrl: `https://store.steampowered.com/points/shop/app/${appid}`,
    };
  }

  console.log("Config construction complete.");
  return output;
}
