import "dotenv/config";
import { GameData } from "./types/types";

import logger from "./utils/logger";
import appendToJSON from "./utils/appendToJSON";
import getApps from "./utils/getApps";

const steamKey = process.env.STEAM_API_KEY;

async function scrapAchievements() {
  const unscrappedApps = await getApps(
    "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json"
  );

  for (const index in unscrappedApps) {
    const appName = unscrappedApps[index].name;
    const appId = unscrappedApps[index].appid;

    if (appName && !appName.endsWith("Demo")) {
      logger(`Scrapping ${appName} ${appId}`, "./logs/logs.txt");
      console.log(`Scrapping ${appName} ${appId}`);

      const appResponse = await fetch(
        `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${steamKey}&appid=${appId}`
      );
      const appData: GameData = await appResponse.json();

      console.log(
        "Achievement",
        appData?.game?.availableGameStats?.achievements?.[0]
      );

      const achievements =
        appData?.game?.availableGameStats?.achievements?.map((achievement) => ({
          ...achievement,
          appId,
          appName,
        })) || [];

      if (achievements?.length > 0) {
        appendToJSON(achievements, `./data/achievements/achievements.json`);
      }
      appendToJSON(`${appId}`, "./data/ScrappedApps/ScrappedApps.json");

      logger(`Scrapped ${appName} ${appId}`, "./logs/logs.txt");
      console.log(`Scrapped ${appName} ${appId}`);
    }
  }
}

scrapAchievements();
