export function generateMarketUrl(
  appName: string,
  itemTypeName: "Card" | "Background" | "Emoticon"
) {
  return `https://steamcommunity.com/market/search/render?norender=1&start=0&count=99&query=${appName}%20${itemTypeName}`;
}
