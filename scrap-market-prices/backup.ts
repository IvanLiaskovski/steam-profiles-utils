import fs from "fs";

fs.copyFileSync(
  "./data/ScrappedApps/ScrappedApps.json",
  "./data/ScrappedApps/backup/ScrappedApps.json"
);

fs.copyFileSync(
  "./data/cardsPrices/cardsPrices.json",
  "./data/cardsPrices/backup/cardsPrices.json"
);

fs.copyFileSync(
  "./data/backgroundPrices/backgroundPrices.json",
  "./data/backgroundPrices/backup/backgroundPrices.json"
);

fs.copyFileSync(
  "./data/emoticonPrices/emoticonPrices.json",
  "./data/emoticonPrices/backup/emoticonPrices.json"
);
