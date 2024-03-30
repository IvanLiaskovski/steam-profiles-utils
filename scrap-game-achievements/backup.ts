import fs from "fs";

fs.copyFileSync(
  "./data/scrappedApps/ScrappedApps.json",
  "./data/scrappedApps/backup/ScrappedApps.json"
);

fs.copyFileSync(
  "./data/achievements/achievements.json",
  "./data/achievements/backup/achievements.json"
);

fs.copyFileSync(
  "./data/steamApps/steamApps.json",
  "./data/steamApps/backup/steamApps.json"
);
