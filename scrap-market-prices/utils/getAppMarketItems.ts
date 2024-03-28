import fs from "fs";

export function getAppMarketItems(appId: number | string) {
  const marketItems = JSON.parse(
    fs.readFileSync(`./data/allMarketItems/allMarketItems.json`, "utf-8")
  );
  const appMarketItems = marketItems.filter(
    (item: any) => item.appid === appId
  );

  return appMarketItems;
}
