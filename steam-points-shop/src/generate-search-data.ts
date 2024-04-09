import axios from "axios";
import { writeFile } from "fs";
import appendToJSON from "./utils/appendToJSON";
import getConfigData from "./utils/getConfigData";
import { processConfigData } from "./utils/processConfigData";

const AxiosInstance = axios.create();
const jsonIndentation = "    ";

// Send an async HTTP Get request to each url
const urlList = [
  "https://www.steamcardexchange.net/index.php?showcase-filter-ac",
  "https://www.steamcardexchange.net/index.php?showcase-filter-df",
  "https://www.steamcardexchange.net/index.php?showcase-filter-gi",
  "https://www.steamcardexchange.net/index.php?showcase-filter-jl",
  "https://www.steamcardexchange.net/index.php?showcase-filter-mo",
  "https://www.steamcardexchange.net/index.php?showcase-filter-pr",
  "https://www.steamcardexchange.net/index.php?showcase-filter-su",
  "https://www.steamcardexchange.net/index.php?showcase-filter-vx",
  "https://www.steamcardexchange.net/index.php?showcase-filter-yz",
  "https://www.steamcardexchange.net/index.php?showcase-filter-09",
  "https://www.steamcardexchange.net/index.php?showcase-filter-sym",
];
for (let i = 0; i < urlList.length; i++) {
  AxiosInstance.get(urlList[i])
    .then((response) => {
      console.log(
        `Acquired raw page data from "${urlList[i]}", now extracting app ID data.`
      );
      return getConfigData(
        response.data,
        "https://api.steampowered.com/ILoyaltyRewardsService/QueryRewardItems/v1/?count=1000",
        110,
        /\d+/
      );
    })
    .then((response) => {
      writeFile(
        "debug/config.json",
        JSON.stringify(response, null, jsonIndentation),
        (err) => {
          if (err) {
            console.warn(err);
          }
        }
      );
      return processConfigData(AxiosInstance, response);
    })
    .then((response) => {
      writeFile(
        "debug/output.json",
        JSON.stringify(response, null, jsonIndentation),
        (err) => {
          if (err) {
            console.warn(err);
          } else {
            console.log("Success! Got data from the Steam API.");
          }
        }
      );

      appendToJSON(
        response["Profile Background"],
        "data/profileBackground/profileBackground.json"
      );
      appendToJSON(response["Emoticon"], "data/emoticon/emoticon.json");
      appendToJSON(
        response["Special Profile"],
        "data/specialProfile/specialProfile.json"
      );
      appendToJSON(
        response["Animated Sticker"],
        "data/animatedSticker/animatedSticker.json"
      );
      appendToJSON(response["Chat Effect"], "data/chatEffect/chatEffect.json");
      appendToJSON(
        response["Mini-Profile"],
        "data/miniProfile/miniProfile.json"
      );
      appendToJSON(
        response["Avatar Frame"],
        "data/avatarFrame/avatarFrame.json"
      );
      appendToJSON(
        response["Animated Avatar"],
        "data/animatedAvatar/animatedAvatar.json"
      );
      appendToJSON(
        response["Steam Deck Keyboard"],
        "data/steamDeckKeyboard/steamDeckKeyboard.json"
      );
      appendToJSON(response["Item Bundle"], "data/itemBundle/itemBundle.json");
    })
    .catch(console.error);
}



