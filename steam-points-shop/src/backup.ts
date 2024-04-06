import fs from "fs";

fs.copyFileSync(
  "./data/animatedAvatar/animatedAvatar.json",
  "./data/animatedAvatar/backup/animatedAvatar.json"
);

fs.copyFileSync(
  "./data/animatedSticker/animatedSticker.json",
  "./data/animatedSticker/backup/animatedSticker.json"
);

fs.copyFileSync(
  "./data/avatarFrame/avatarFrame.json",
  "./data/avatarFrame/backup/avatarFrame.json"
);

fs.copyFileSync(
  "./data/chatEffect/chatEffect.json",
  "./data/chatEffect/backup/chatEffect.json"
);

fs.copyFileSync(
  "./data/emoticon/emoticon.json",
  "./data/emoticon/backup/emoticon.json"
);

fs.copyFileSync(
  "./data/itemBundle/itemBundle.json",
  "./data/itemBundle/backup/itemBundle.json"
);

fs.copyFileSync(
  "./data/miniProfile/miniProfile.json",
  "./data/miniProfile/backup/miniProfile.json"
);

fs.copyFileSync(
  "./data/profileBackground/profileBackground.json",
  "./data/profileBackground/backup/profileBackground.json"
);

fs.copyFileSync(
  "./data/specialProfile/specialProfile.json",
  "./data/specialProfile/backup/specialProfile.json"
);

fs.copyFileSync(
  "./data/steamDeckKeyboard/steamDeckKeyboard.json",
  "./data/steamDeckKeyboard/backup/steamDeckKeyboard.json"
);

fs.copyFileSync(
  "./data/steamStartupMovie/steamStartupMovie.json",
  "./data/steamStartupMovie/backup/steamStartupMovie.json"
);
