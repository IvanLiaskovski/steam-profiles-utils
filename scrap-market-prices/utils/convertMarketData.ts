import { MarketData } from "../types/types";

export function convertMarketData(
  data: MarketData,
  appId: string,
  appName: string
) {
  return data.results.map((item) => ({
    name: item.name,
    hashName: item.hash_name,
    sellPriceText: item.sell_price_text,
    salePriceText: item.sale_price_text,
    appId,
    appName,
    steamType: item.asset_description.type,
    backgroundColor: item.asset_description.background_color,
    nameColor: item.asset_description.name_color,
    type: "Card",
    updatedAt: new Date().toISOString(),
  }));
}
