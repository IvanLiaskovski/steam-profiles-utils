import fs from "fs";
import appendToJSON from "./utils/appendToJSON";
import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();
puppeteer.use(stealthPlugin());

const scrapeNewBadges = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.steamcardexchange.net/index.php");

  const linksIds = await page.evaluate(() => {
    const links: HTMLLinkElement[] = Array.from(
      document.querySelectorAll(
        'a[href*="https://steamcommunity.com/groups/card-trading-card-trades/announcements/detail/"]'
      )
    );

    return links.map((a) => a?.getAttribute("href")?.match(/\d+$/)?.[0]!);
  });

  const scrappedLinks = fs.readFileSync(
    "./data/scrappedLinksIds/scrappedLinksIds.json",
    "utf-8"
  );

  const unscrappedLinks = linksIds.filter((id) => !scrappedLinks.includes(id));

  for (const index in unscrappedLinks) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    const id = unscrappedLinks[index];
    logger(`Scrapping ${id}`, "./logs/logs.txt");
    console.log(`Scrapping ${id}`);

    await page.goto(
      `https://steamcommunity.com/groups/card-trading-card-trades/announcements/detail/${id}`
    );
    const appIds = await page.evaluate(() => {
      let links: HTMLLinkElement[] = Array.from(
        document.querySelectorAll(
          'a[href*="https://steam.cards/index.php?gamepage-appid-"]'
        )
      );

      if (links.length === 0) {
        links = Array.from(
          document.querySelectorAll(
            'a[href*="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fsteam.cards%2Findex.php%3Fgamepage-appid-"]'
          )
        );
      }
      return links.map((a) => a?.getAttribute("href")?.match(/\d+$/)?.[0]!);
    });

    logger(`Scrapped ${id}`, "./logs/logs.txt");
    console.log(`Scrapped ${id}`);

    appendToJSON(appIds, "./data/appsToScrap/appsToScrap.json");
  }

  appendToJSON(
    unscrappedLinks,
    "./data/scrappedLinksIds/scrappedLinksIds.json"
  );

  await browser.close();
};

scrapeNewBadges();
