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
  let index: number = 0;
  const apps = await getGamesWithBadges();

  for (const appId in apps) {
    index++;
    if (index >= 249) {
      index = 0;
    }
    const appName = apps[appId].name;

    logger(`Scrapping ${appName} ${appId}`, "./logs/logs.txt");
    console.log(`Scrapping ${appName} ${appId}`);

    const proxyUrl = proxiesList[proxyIndex];
    logger(`Using proxy ${proxyUrl}`, "./logs/logs.txt");
    console.log(`Using proxy ${proxyUrl}`);

    const browser: Browser = await puppeteer.launch({
      args: [`--proxy-server=${proxyUrl}`],
    });

    const page = await browser.newPage();
    console.log(process.env.PROXY_USER);
    await page.authenticate({
      username: process.env.PROXY_USER as string,
      password: process.env.PROXY_PASSWORD as string,
    });

    await page.goto(generateMarketUrl(appName, "Card"));

    await new Promise((resolve) => {
      setTimeout(resolve, 3500);
    });

    const cardsData = await page.evaluate(() => {
      return document.querySelector("pre")?.textContent;
    });

    const cardsDataJson: MarketData = JSON.parse(cardsData as string);

    await new Promise((resolve) => {
      setTimeout(resolve, 3500);
    });

    await page.goto(generateMarketUrl(appName, "Background"));

    const backgroundData = await page.evaluate(() => {
      return document.querySelector("pre")?.textContent;
    });

    const backgroundDataJson: MarketData = JSON.parse(backgroundData as string);

    await new Promise((resolve) => {
      setTimeout(resolve, 3500);
    });

    await page.goto(generateMarketUrl(appName, "Emoticon"));

    const emoticonData = await page.evaluate(() => {
      return document.querySelector("pre")?.textContent;
    });
    const emoticonDataJson: MarketData = JSON.parse(emoticonData as string);

    appendToJSON(
      convertMarketData(cardsDataJson, appId, appName),
      "./data/cardsPrices/cardsPrices.json"
    );
    appendToJSON(
      convertMarketData(backgroundDataJson, appId, appName),
      "./data/backgroundPrices/backgroundPrices.json"
    );
    appendToJSON(
      convertMarketData(emoticonDataJson, appId, appName),
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
