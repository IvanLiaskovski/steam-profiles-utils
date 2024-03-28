import appendToJSON from "./utils/appendToJSON";
import logger from "./utils/logger";

import getGamesWithBadges from "./utils/getGamesWithBadges";
import { getAppMarketItems } from "./utils/getAppMarketItems";
import { generateMarketUrl } from "./utils/generateMarketUrl";

async function scrapSteamMarketPrices() {
  const apps = await getGamesWithBadges();

  for (const appId in apps) {
    logger(`Scrapping ${appId}`, "./logs/logs.txt");
    console.log(`Scrapping ${appId}`);

    const appMarketItems = getAppMarketItems(apps[appId].appid);

    for (const item in appMarketItems) {
      await new Promise((resolve) => {
        setTimeout(resolve, 3500);
      });

      const tradeLink = appMarketItems[item].tradeLink;
      const marketAppId = tradeLink.match(/\/(\d+)\//)[1];
      const marketName = tradeLink.match(/\/listings\/\d+\/(.*)/)[1];

      logger(`Scrapping item ${marketName}(${appId})`, "./logs/logs.txt");
      console.log(`Scrapping item ${marketName}(${appId})`);

      const marketResponse = await fetch(
        generateMarketUrl(marketAppId, marketName)
      );
      const marketData = await marketResponse.json();
      const marketPriceItem = {
        appId,
        marketAppId,
        price: marketData.lowest_price,
        marketName,
        tradeLink,
        updatedAt: new Date().toISOString(),
      };

      appendToJSON([marketPriceItem], "./data/prices/prices.json");
      appendToJSON(
        marketName,
        "./data/scrappedMarketItems/scrappedMarketItems.json"
      );

      logger(`Scrapped item ${marketName}(${appId})`, "./logs/logs.txt");
      console.log(`Scrapped item ${marketName}(${appId})`);
    }

    appendToJSON(appId, "./data/ScrappedApps/ScrappedApps.json");

    logger(`Scraped ${appId}`, "./logs/logs.txt");
    console.log(`Scraped ${appId}`);
  }
}

scrapSteamMarketPrices();
