import fs from "fs";

fs.copyFileSync(
  "./data/animatedAvatars/animatedAvatars.json",
  "./data/animatedAvatars/backup/animatedAvatars.json"
);

fs.copyFileSync(
  "./data/animatedBackgrounds/animatedBackgrounds.json",
  "./data/animatedBackgrounds/backup/animatedBackgrounds.json"
);

fs.copyFileSync(
  "./data/animatedFrames/animatedFrames.json",
  "./data/animatedFrames/backup/animatedFrames.json"
);

fs.copyFileSync(
  "./data/animatedMiniBackgrounds/animatedMiniBackgrounds.json",
  "./data/animatedMiniBackgrounds/backup/animatedMiniBackgrounds.json"
);

fs.copyFileSync(
  "./data/backgrounds/backgrounds.json",
  "./data/backgrounds/backup/backgrounds.json"
);

fs.copyFileSync(
  "./data/badges/badges.json",
  "./data/badges/backup/badges.json"
);

fs.copyFileSync(
  "./data/busterPacks/busterPacks.json",
  "./data/busterPacks/backup/busterPacks.json"
);

fs.copyFileSync("./data/cards/cards.json", "./data/cards/backup/cards.json");

fs.copyFileSync(
  "./data/emoticons/emoticons.json",
  "./data/emoticons/backup/emoticons.json"
);

fs.copyFileSync(
  "./data/stickers/stickers.json",
  "./data/stickers/backup/stickers.json"
);

fs.copyFileSync(
  "./data/ScrappedApps/ScrappedApps.json",
  "./data/ScrappedApps/backup/ScrappedApps.json"
);
