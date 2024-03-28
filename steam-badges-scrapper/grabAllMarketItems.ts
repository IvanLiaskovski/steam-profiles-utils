import fs from "fs";

const backgrounds = fs.readFileSync(
  "./data/backgrounds/backgrounds.json",
  "utf-8"
);
const busterPacks = fs.readFileSync(
  "./data/busterPacks/busterPacks.json",
  "utf-8"
);
const cards = fs.readFileSync("./data/cards/cards.json", "utf-8");
const emoticons = fs.readFileSync("./data/emoticons/emoticons.json", "utf-8");

const allMarketData = [
  ...JSON.parse(backgrounds),
  ...JSON.parse(busterPacks),
  ...JSON.parse(cards),
  ...JSON.parse(emoticons),
];

fs.writeFileSync(
  "./data/allMarketItems/allMarketItems.json",
  JSON.stringify(allMarketData, null, 2)
);
