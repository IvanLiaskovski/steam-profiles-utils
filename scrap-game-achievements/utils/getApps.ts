import fs from "fs";
import { GameData } from "../types/types";

export default async function getApps(url: string) {
  const appsResponse = await fetch(url);
  const appsData = await appsResponse.json();

  fs.writeFileSync(
    "./data/steamApps/steamApps.json",
    JSON.stringify(appsData.applist.apps, null, 2)
  );

  const scrappedGamesFile = fs.readFileSync(
    "./data/scrappedApps/scrappedApps.json",
    "utf-8"
  );

  const scrappedGames: string[] = JSON.parse(scrappedGamesFile);

  const gamesFile = fs.readFileSync("./data/steamApps/steamApps.json", "utf-8");
  const games: {
    appid: number;
    name: string;
  }[] = JSON.parse(gamesFile);

  const unscrappedGames = games.filter(
    (game) => !scrappedGames.includes(String(game.appid))
  );

  return unscrappedGames;
}
