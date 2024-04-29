import getCommunityItemType from "./getCommunityItemType";
import getPointShopClusterUrl from "./getPointShopClusterUrl";
import getItemMediaData from "./getMediaItemData";
import getApps from "./getApps";

/** Returns the Steam API extraction result from a given configuration.
 *
 * @param {Object} axiosInstance: An Axios instance used to make web requests.
 * @param {Object} config: A configuration that was returned from `getConfigData()`.
 * @returns {Promise} A promise which returns an object containing Steam API data pertaining to the queried apps.
 */

type SteamReturnedData = {
  appid: number;
  defid: number;
  type: number;
  community_item_class: number;
  community_item_type: number;
  point_cost: string;
  timestamp_created: number;
  timestamp_updated: number;
  timestamp_available: number;
  timestamp_available_end: number;
  quantity: string;
  internal_description: string;
  active: boolean;
  community_item_data: {
    item_name: string;
    item_title: string;
    item_description: string;
    item_image_small: string;
    item_image_large: string;
    animated: boolean;
  };
  usable_duration: number;
  bundle_discount: number;
};

export async function processConfigData(axiosInstance: any, config: any) {
  let promises = [];
  for (let i = 0; i < config["urls"].length; i++) {
    promises.push(axiosInstance.get(config["urls"][i]).catch(console.error));
    console.log(`${promises.length} promise(s) are queued.`);
  }

  const apps = await getApps(
    "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
  );

  let itemMapping = {
    "Steam Startup Movie": [],
    "Steam Deck Keyboard": [],
    "Animated Avatar": [],
    "Avatar Frame": [],
    "Mini-Profile": [],
    "Chat Effect": [],
    "Animated Sticker": [],
    "Special Profile": [],
    Emoticon: [],
    "Profile Background": [],
    "Item Bundle": [],
    Other: [],
  };
  return Promise.all(promises)
    .then(function (results) {
      results.forEach(function (response) {
        let endpointData = response.data.response;

        if (endpointData.total_count > endpointData.count) {
          console.warn(
            `WARNING! Pagination is required to access remaining data. Got ${endpointData.total_count} total items.`
          );
        }

        if (endpointData.definitions) {
          endpointData.definitions.forEach(function (item: SteamReturnedData) {
            // Initial item mapping setup when adding items to this app for the first time

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
        }
      });
    })
    .then(function () {
      return itemMapping;
    })
    .catch(console.error); // Error handling
}
