import fs from "fs";

fs.copyFileSync(
  "./data/ScrappedApps/ScrappedApps.json",
  "./data/ScrappedApps/backup/ScrappedApps.json"
);

fs.copyFileSync(
  "./data/prices/prices.json",
  "./data/prices/backup/prices.json"
);
