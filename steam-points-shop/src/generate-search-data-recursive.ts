import axios from "axios";
import appendToJSON from "./utils/appendToJSON";
import { writeFile } from "fs";
import { processConfigDataRecursive } from "./utils/processConfigDataRecursive";
import { getConfigDataFromAppList } from "./utils/getCongigDataFromAppList";

const AxiosInstance = axios.create();
const jsonIndentation = "    ";

// See the technical notes for why this endpoint is still problematic for obtaining the app list
AxiosInstance.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/?")
  .then((response) => {
    return getConfigDataFromAppList(response.data.applist.apps);
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
    return processConfigDataRecursive(
      AxiosInstance,
      {
        "Steam Startup Movie": [],
        "Steam Deck Keyboard": [],
        "Animated Avatar": [],
        "Avatar Frame": [],
        "Mini-Profile": [],
        "Chat Effect": [],
        "Animated Sticker": [],
        "Special Profile": [],
        Emoticon: [],
        "Profile Background": [],
        "Item Bundle": [],
        Other: [],
      },
      response,
      "https://api.steampowered.com/ILoyaltyRewardsService/QueryRewardItems/v1/?count=1000",
      ""
    );
  })
  .then((response) => {
    writeFile(
      "debug/output.json",
      JSON.stringify(response, null, jsonIndentation),
      (err) => {
        if (err) {
          console.warn(err);
        } else {
          console.log("Success! Got all necessary data from the Steam API.");
        }
      }
    );

    let exportedData = `var APPDATA = ${JSON.stringify(
      response,
      null,
      jsonIndentation
    )};`;
    writeFile("docs/data.js", exportedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

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
    appendToJSON(response["Mini-Profile"], "data/miniProfile/miniProfile.json");
    appendToJSON(response["Avatar Frame"], "data/avatarFrame/avatarFrame.json");
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
