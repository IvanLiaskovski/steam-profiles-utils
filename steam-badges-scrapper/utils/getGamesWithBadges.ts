import fs from "fs";
import { gameWithBadgesUrl } from "../consts/consts";

export default async function getGamesWithBadges() {
  const bamesWithBaqdgesResponse = await fetch(gameWithBadgesUrl);
  const gamesWithBadges = await bamesWithBaqdgesResponse.json();

  fs.writeFileSync(
    "./data/steamApps/badges.json",
    JSON.stringify(gamesWithBadges, null, 2)
  );

  const scrappedGamesFile = fs.readFileSync(
    "./data/ScrappedApps/ScrappedApps.json",
    "utf-8"
  );
  const scrappedGames = JSON.parse(scrappedGamesFile);

  const gamesFile = fs.readFileSync("./data/steamApps/badges.json", "utf-8");
  const games = JSON.parse(gamesFile);

  scrappedGames.forEach((key) => {
    if (games.hasOwnProperty(key)) {
      delete games[key];
    }
  });

  return games;
}
