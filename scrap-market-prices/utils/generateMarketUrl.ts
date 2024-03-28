export function generateMarketUrl(appId: string | number, hashName: string) {
  return `https://steamcommunity.com/market/priceoverview/?country=US&currency=1&appid=${appId}&market_hash_name=${hashName}`;
}
