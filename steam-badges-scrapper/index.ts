import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import { scrappedSiteUrl } from "./consts/consts";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";

import logger from "./utils/logger";
import getGamesWithBadges from "./utils/getGamesWithBadges";
import appendToJSON from "./utils/appendToJSON";

dotenv.config();
puppeteer.use(stealthPlugin());

const proxyServer = process.env.PROXY_SERVER;

const scrape = async () => {
  const games = await getGamesWithBadges();
  const url = scrappedSiteUrl;

  const browser: Browser = await puppeteer.launch({
    args: [`--proxy-server=${proxyServer}`],
  });
  const page = await browser.newPage();

  await page.authenticate({
    username: process.env.PROXY_USER,
    password: process.env.PROXY_PASSWORD,
  });

  console.log(process.env.PROXY_PASSWORD);
  let requestsIndex = 0;

  for (let appId in games) {
    requestsIndex++;
    if (requestsIndex >= 50) break;

    logger(`Scraping ${games[appId].name}`, "./logs/logs.txt");
    console.log(`Scraping ${games[appId].name}`);

    const appName = games[appId].name;
    await page.goto(`${url}${appId}`);

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    //await page.screenshot({ path: `./data/screenshots/${appId}.png` });

    const result = await page.evaluate(
      async ({ appId, appName }) => {
        const cookieButton = document.querySelector(
          'button[title="Accept"]'
        ) as HTMLButtonElement;
        if (cookieButton) {
          cookieButton.click();
        }

        function extractMarketName(url: string) {
          if (!url) return null;
          const match = url.match(/\/listings\/\d+\/(.*)/);
          return match ? match[1] : null;
        }

        //ScrapCards
        const cards = document.querySelector('a[href="#series-1-cards"]')
          ? Array.from(
              document
                .querySelector('a[href="#series-1-cards"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const wallpaper = item.querySelector("a")?.getAttribute("href");
              const image = item.querySelector("img").getAttribute("src");
              const title = item.querySelector("img").closest("a")
                ? item.querySelector("img").closest("a").nextElementSibling
                    .textContent
                : item.querySelector("img").nextElementSibling.textContent;
              const tradeLink = item
                .querySelector("img")
                ?.closest("a")
                ?.nextElementSibling?.nextElementSibling?.getAttribute("href");

              const marketName = extractMarketName(tradeLink);

              return {
                wallpaper,
                image,
                title,
                tradeLink,
                order,
                isFoil: false,
                appId,
                appName,
                marketName,
              };
            })
          : [];

        //ScrapFoilCards
        const foilCards = document.querySelector('a[href="#series-1-cards"]')
          ? Array.from(
              document
                .querySelector('a[href="#series-1-foilcards"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const wallpaper = item.querySelector("a")?.getAttribute("href");
              const image = item.querySelector("img").getAttribute("src");
              const title = item.querySelector("img").closest("a")
                ? item.querySelector("img").closest("a").nextElementSibling
                    .textContent
                : item.querySelector("img").nextElementSibling.textContent;
              const tradeLink = item
                .querySelector("img")
                ?.closest("a")
                ?.nextElementSibling?.nextElementSibling?.getAttribute("href");

              const marketName = extractMarketName(tradeLink);

              return {
                wallpaper,
                image,
                title,
                tradeLink,
                order,
                isFoil: true,
                appId,
                appName,
                marketName,
              };
            })
          : [];

        //ScrapBusterPack
        const busterPacks = document.querySelector(
          'a[href="#series-1-booster"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-booster"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item) => {
              const packImage = item.querySelector("img").getAttribute("src");
              const tradeLink = item
                .querySelector("img")
                .nextElementSibling?.getAttribute("href");

              const marketName = extractMarketName(tradeLink);

              return { packImage, tradeLink, appId, appName, marketName };
            })
          : [];

        //ScrapBadges
        const badges = document.querySelector('a[href="#series-1-badges"]')
          ? Array.from(
              document
                .querySelector('a[href="#series-1-badges"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item) => {
              const image = item.querySelector("img").getAttribute("src");
              const title =
                item.querySelector("img").nextElementSibling.textContent;
              const level = item
                .querySelector("img")
                .nextElementSibling.nextElementSibling.querySelector("div")
                .textContent.replace(/\D/g, "");
              const xp = item
                .querySelector("img")
                .nextElementSibling.nextElementSibling.querySelectorAll(
                  "div"
                )[1]
                .textContent.replace(/\D/g, "");

              return { image, title, level, xp, isFoil: false, appId, appName };
            })
          : [];

        //ScrapFoilBadges
        const foilBadges = document.querySelector(
          'a[href="#series-1-foilbadges"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-foilbadges"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item) => {
              const image = item.querySelector("img").getAttribute("src");
              const title =
                item.querySelector("img").nextElementSibling.textContent;
              const level = item
                .querySelector("img")
                .nextElementSibling.nextElementSibling.querySelector("div")
                .textContent.replace(/\D/g, "");
              const xp = item
                .querySelector("img")
                .nextElementSibling.nextElementSibling.querySelectorAll(
                  "div"
                )[1]
                .textContent.replace(/\D/g, "");

              return { image, title, level, xp, isFoil: true, appId, appName };
            })
          : [];

        //ScrapEmoticons
        const emoticons = document.querySelector(
          'a[href="#series-1-emoticons"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-emoticons"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item) => {
              const imageMini = item.querySelector("img").getAttribute("src");
              const image = item.querySelectorAll("img")[1].getAttribute("src");
              const title =
                item.querySelectorAll("img")[1].nextElementSibling.textContent;
              const valuable =
                item.querySelectorAll("img")[1].nextElementSibling
                  .nextElementSibling.textContent;
              const tradeLink = item
                .querySelectorAll("img")[1]
                .nextElementSibling?.nextElementSibling?.nextElementSibling?.getAttribute(
                  "href"
                );

              const marketName = extractMarketName(tradeLink);

              return {
                imageMini,
                image,
                title,
                valuable,
                tradeLink,
                appId,
                appName,
                marketName,
              };
            })
          : [];

        //ScrapBackgrounds
        const backgrounds = document.querySelector(
          'a[href="#series-1-backgrounds"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-backgrounds"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const wallpaper = item.querySelector("a")?.getAttribute("href");
              const image = item.querySelector("img")?.getAttribute("src");
              const title = item.querySelector("img").closest("a")
                .nextElementSibling.textContent;
              const valuable = item.querySelector("img")?.closest("a")
                .nextElementSibling.nextElementSibling.textContent;
              const tradeLink = item
                .querySelector("img")
                ?.closest("a")
                .nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.getAttribute(
                  "href"
                );

              const marketName = extractMarketName(tradeLink);

              return {
                wallpaper,
                image,
                title,
                tradeLink,
                order,
                valuable,
                appId,
                appName,
                marketName,
              };
            })
          : [];

        //Scraptickers
        const stickers = document.querySelector(
          'a[href="#series-1-animatedstickers"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-animatedstickers"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const imageAnimated = item
                .querySelector("div")
                .querySelector("a")
                .getAttribute("href");
              const imageStatic = item
                .querySelector("div")
                .querySelectorAll("a")[1]
                .getAttribute("href");
              const title =
                item.querySelectorAll(":scope > div")[2].textContent;
              const valuable =
                item.querySelectorAll(":scope > div")[3].textContent;

              return {
                imageAnimated,
                imageStatic,
                title,
                order,
                valuable,
                appId,
                appName,
              };
            })
          : [];

        //ScrapAnimatedBackgrounds
        const animatedBackgrounds = document.querySelector(
          'a[href="#series-1-animatedbackgrounds"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-animatedbackgrounds"]')
                ?.closest("div")
                ?.nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const videoMp4 = item
                .querySelector("div")
                ?.querySelector("a")
                ?.getAttribute("href");
              const imageStatic = item
                .querySelector("div")
                ?.querySelectorAll("a")[1]
                ?.getAttribute("href");
              const title =
                item.querySelectorAll(":scope > div")[2]?.textContent;
              const valuable =
                item.querySelectorAll(":scope > div")[3]?.textContent;

              return {
                videoMp4,
                imageStatic,
                title,
                order,
                valuable,
                appId,
                appName,
              };
            })
          : [];

        const animatedMiniBackgrounds = document.querySelector(
          'a[href="#series-1-animatedminibackgrounds"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-animatedminibackgrounds"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const videoMp4 = item
                .querySelector("div")
                ?.querySelector("a")
                ?.getAttribute("href");
              const imageStatic = item
                .querySelector("div")
                ?.querySelectorAll("a")[1]
                ?.getAttribute("href");
              const title =
                item.querySelectorAll(":scope > div")[2]?.textContent;
              const valuable =
                item.querySelectorAll(":scope > div")[3]?.textContent;

              return {
                videoMp4,
                imageStatic,
                title,
                order,
                valuable,
                appId,
                appName,
              };
            })
          : [];

        //ScrapAnimatedFrames
        const animatedFrames = document.querySelector(
          'a[href="#series-1-avatarframes"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-avatarframes"]')
                ?.closest("div")
                ?.nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const videoMp4 = item
                .querySelector("div")
                ?.querySelector("a")
                ?.getAttribute("href");
              const imageStatic = item
                .querySelector("div")
                ?.querySelectorAll("a")[1]
                ?.getAttribute("href");
              const title =
                item.querySelectorAll(":scope > div")[2]?.textContent;
              const valuable =
                item.querySelectorAll(":scope > div")[3]?.textContent;

              return {
                videoMp4,
                imageStatic,
                title,
                order,
                valuable,
                appId,
                appName,
              };
            })
          : [];

        //ScrapAnimatedAvatars
        const animatedAvatars = document.querySelector(
          'a[href="#series-1-avataranimated"]'
        )
          ? Array.from(
              document
                .querySelector('a[href="#series-1-avataranimated"]')
                .closest("div")
                .nextElementSibling.querySelectorAll(".flex.flex-col")
            ).map((item, index) => {
              const order = index + 1;
              const imageAnimated = item
                .querySelector("div")
                .querySelector("a")
                .getAttribute("href");
              const imageStatic = item
                .querySelector("div")
                .querySelectorAll("a")[1]
                .getAttribute("href");
              const title =
                item.querySelectorAll(":scope > div")[2].textContent;
              const valuable =
                item.querySelectorAll(":scope > div")[3].textContent;

              return {
                imageAnimated,
                imageStatic,
                title,
                order,
                valuable,
                appId,
                appName,
              };
            })
          : [];

        return {
          cards,
          foilCards,
          animatedBackgrounds,
          animatedMiniBackgrounds,
          animatedFrames,
          animatedAvatars,
          stickers,
          backgrounds,
          emoticons,
          foilBadges,
          badges,
          busterPacks,
        };
      },
      { appId, appName }
    );

    appendToJSON(
      [...result.badges, ...result.foilBadges],
      "./data/badges/badges.json"
    );
    appendToJSON(
      [...result.cards, ...result.foilCards],
      "./data/cards/cards.json"
    );
    appendToJSON(result.busterPacks, "./data/busterPacks/busterPacks.json");
    appendToJSON(result.stickers, "./data/stickers/stickers.json");
    appendToJSON(result.emoticons, "./data/emoticons/emoticons.json");
    appendToJSON(
      result.animatedBackgrounds,
      "./data/animatedBackgrounds/animatedBackgrounds.json"
    );
    appendToJSON(
      result.animatedMiniBackgrounds,
      "./data/animatedMiniBackgrounds/animatedMiniBackgrounds.json"
    );
    appendToJSON(
      result.animatedFrames,
      "./data/animatedFrames/animatedFrames.json"
    );
    appendToJSON(
      result.animatedAvatars,
      "./data/animatedAvatars/animatedAvatars.json"
    );
    appendToJSON(result.backgrounds, "./data/backgrounds/backgrounds.json");
    appendToJSON(appId, "./data/ScrappedApps/ScrappedApps.json");

    logger(`Scraped ${games[appId].name}`, "./logs/logs.txt");
    console.log(`Scraped ${games[appId].name}`);
  }

  await browser.close();

  if (Object.keys(games).length > 0) {
    scrape();
  }
};

try {
  scrape();
} catch (err) {
  console.error(err);
  logger(err, "./logs/errors.txt");
}
