import getApps from "./getApps";
import getCommunityItemType from "./getCommunityItemType";
import getPointShopClusterUrl from "./getPointShopClusterUrl";
import getItemMediaData from "./getMediaItemData";

/** Returns the Steam API extraction result from a given configuration, accessing paginated data where necessary.
 *
 * @param {Object} axiosInstance: An Axios instance used to make web requests.
 * @param {Object} itemMapping: An object containing the cumulative result of each page of data from the Steam API.
 * @param {Object} config: A configuration that was returned from `getConfigDataFromAppList()`.
 * @param {string} baseUrl: The main endpoint URL being queried.
 * @param {string} cursor: A cursor used to view a specific page of data.
 * @returns {Promise} A promise which returns an object containing Steam API data.
 */
export async function processConfigDataRecursive(
  axiosInstance: any,
  itemMapping: any,
  config: any,
  baseUrl: string,
  cursor: string
) {
  const url = `${baseUrl}&cursor=${cursor}`;
  console.log(`Getting data from ${url}`);

  const apps = await getApps(
    "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
  );

  return Promise.resolve(axiosInstance.get(url))
    .then(function (results) {
      let endpointData = results.data.response;

      if (endpointData.count <= 0) {
        return itemMapping;
      }

      endpointData.definitions.forEach(function (item) {
        // App ID did not show up in the list of apps from the Steam API, so use the ID as a fallback name
        if (!config["app"][`${item.appid}`]) {
          config["app"][`${item.appid}`] = {
            name: `${item.appid}`,
            pointsShopUrl: `https://store.steampowered.com/points/shop/app/${item.appid}`,
          };
        }

        // Add extra info about the app, since this is available from the response and discarding all this hard-earned data would be wasteful
        itemMapping[getCommunityItemType(item.community_item_class)].push({
          name: item.community_item_data.item_name,
          title: item.community_item_data.item_title, // This is more consistent than item_title, especially when for Item Bundles
          type: getCommunityItemType(item.community_item_class),
          appId: item.appid,
          appName: apps.find((app) => app.appid === item.appid)?.name,
          cost: Number(item.point_cost),
          pointsShopUrl: getPointShopClusterUrl(
            config["app"][`${item.appid}`]["pointsShopUrl"],
            item.community_item_class
          ),
          data: getItemMediaData(item),
          description: item.internal_description,
          timestampCreated: item.timestamp_created,
          timestampUpdated: item.timestamp_updated,
          timestampAvailable: item.timestamp_available,
          classId: item.community_item_class,
          typeId: item.community_item_type,
          isActive: item.active,
          isAnimated: item.community_item_data.animated,
        });
      });

      return processConfigDataRecursive(
        axiosInstance,
        itemMapping,
        config,
        baseUrl,
        encodeURIComponent(endpointData.next_cursor)
      );
    })
    .catch(console.error); // Error handling
}
