import fs from "fs";
import { MarketData } from "./types/types";
import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
import logger from "./utils/logger";
import getGamesWithBadges from "./utils/getGamesWithBadges";
import appendToJSON from "./utils/appendToJSON";
import { generateMarketUrl } from "./utils/generateMarketUrl";
import { convertMarketData } from "./utils/convertMarketData";

dotenv.config();
puppeteer.use(stealthPlugin());

const proxiesList = JSON.parse(
  fs.readFileSync("./data/proxiesList/proxiesList.json", "utf-8")
);

async function scrapSteamMarketPrices(proxyIndex: number = 0) {
  const proxyUrl = proxiesList[proxyIndex];
  logger(`Using proxy ${proxyUrl}`, "./logs/logs.txt");
  console.log(`Using proxy ${proxyUrl}`);

  const browser: Browser = await puppeteer.launch({
    args: [`--proxy-server=${proxyUrl}`],
  });

  const page = await browser.newPage();
  await page.authenticate({
    username: process.env.PROXY_USER as string,
    password: process.env.PROXY_PASSWORD as string,
  });

  let index: number = 0;
  const apps = await getGamesWithBadges();

  for (const appId in apps) {
    index++;
    if (index > 998) break;
    const appName = apps[appId].name;

    logger(`Scrapping ${appName} ${appId}`, "./logs/logs.txt");
    console.log(`Scrapping ${appName} ${appId}`);

    await new Promise((resolve) => {
      setTimeout(resolve, 10500);
    });

    const cardsResponse = await fetch(generateMarketUrl(appName, "Card"));
    const cardsData: MarketData = await cardsResponse.json();

    const backgroundResponse = await fetch(
      generateMarketUrl(appName, "Background")
    );
    const backgroundData: MarketData = await backgroundResponse.json();

    const emoticonResponse = await fetch(
      generateMarketUrl(appName, "Emoticon")
    );
    const emoticonData: MarketData = await emoticonResponse.json();

    appendToJSON(
      convertMarketData(cardsData, appId, appName),
      "./data/cardsPrices/cardsPrices.json"
    );
    appendToJSON(
      convertMarketData(backgroundData, appId, appName),
      "./data/backgroundPrices/backgroundPrices.json"
    );
    appendToJSON(
      convertMarketData(emoticonData, appId, appName),
      "./data/emoticonPrices/emoticonPrices.json"
    );

    appendToJSON(appId, "./data/ScrappedApps/ScrappedApps.json");

    logger(`Scraped ${appName} ${appId}`, "./logs/logs.txt");
    console.log(`Scraped ${appId}`);
  }

  if (proxyIndex < proxiesList.length - 1) {
    scrapSteamMarketPrices(proxyIndex + 1);
  }
}

scrapSteamMarketPrices();
