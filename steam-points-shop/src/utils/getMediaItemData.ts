export default function getItemMediaData(item: any) {
  switch (item.community_item_class) {
    case 17:
      return {
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
        videoWebm: item.community_item_data?.item_movie_webm
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_webm,
              item.community_item_class
            )
          : null,
        videoMp4: item.community_item_data?.item_movie_mp4
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_mp4,
              item.community_item_class
            )
          : null,
        videoWebmSmall: item.community_item_data?.item_movie_webm_small
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_webm_small,
              item.community_item_class
            )
          : null,
        videoMp4Small: item.community_item_data?.item_movie_mp4_small
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_mp4_small,
              item.community_item_class
            )
          : null,
      };
    case 16:
      return {
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
        profileThemeId: item.community_item_data?.profile_theme_id || null,
      };
    case 15:
    case 14:
    case 4:
      return {
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
      };
    case 13:
      return {
        description: item.community_item_data?.item_description,
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          4
        ),
        videoWebm: item.community_item_data?.item_movie_webm
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_webm,
              4
            )
          : null,
        videoMp4: item.community_item_data?.item_movie_mp4
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_mp4,
              4
            )
          : null,
      };
    case 12:
      return {
        description: item.community_item_data?.internal_description,
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
      };
    case 11:
      return {
        description: item.community_item_data?.item_description,
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
      };
    case 8:
      return {
        description: item.community_item_data?.item_description,
        imageSmall: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_small,
          item.community_item_class
        ),
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
        profileThemeId: item.community_item_data?.profile_theme_id,
      };
    case 3:
      return {
        imageLarge: getImageUrl(
          `${item.appid}`,
          item.community_item_data.item_image_large,
          item.community_item_class
        ),
        videoWebm: item.community_item_data?.item_movie_webm
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_webm,
              4
            )
          : null,
        videoMp4: item.community_item_data?.item_movie_mp4
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_mp4,
              4
            )
          : null,
        videoWebmSmall: item.community_item_data?.item_movie_webm_small
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_webm_small,
              4
            )
          : null,
        videoMp4Small: item.community_item_data?.item_movie_mp4_small
          ? getImageUrl(
              `${item.appid}`,
              item.community_item_data?.item_movie_mp4_small,
              4
            )
          : null,
      };
    default:
      return {
        description: item.community_item_data?.item_description,
        bundleDefIds: item?.bundle_defids,
      };
  }
}

function getImageUrl(
  appId: string,
  imageNameWithExtension: string,
  itemClass: number
) {
  switch (itemClass) {
    case 16:
    case 17:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 8:
    case 4:
      return `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/${appId}/${imageNameWithExtension}`;
    case 3:
      return `https://steamcommunity.com/economy/profilebackground/items/${appId}/${imageNameWithExtension}`;
    case 0:
      return ""; // Item bundles reuse an existing image, which is not provided through the Steam API
  }
  return "";
}
