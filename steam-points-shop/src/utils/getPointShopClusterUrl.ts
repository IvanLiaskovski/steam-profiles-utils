export default function getPointShopClusterUrl(
  pointsShopUrl: string,
  itemClass: number
) {
  let clusterUrl = `${pointsShopUrl}/cluster/`;

  switch (itemClass) {
    case 15:
      return `${clusterUrl}2`;
    case 14:
      return `${clusterUrl}3`;
    case 13:
      return `${clusterUrl}4`;
    case 11:
      return `${clusterUrl}6`;
    case 3:
      return `${clusterUrl}5`;
    case 4:
      return `${clusterUrl}7`;
    case 0:
      return `${clusterUrl}0`;
    case 8:
      return `${clusterUrl}1`;
    case 16:
      return `${clusterUrl}8`;
    case 12:
      return "https://store.steampowered.com/points/shop/c/chateffects";
    case 17:
      return `${clusterUrl}9`;
  }
  return clusterUrl;
}
