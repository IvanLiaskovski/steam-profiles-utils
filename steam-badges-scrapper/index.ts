import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

const games = {
  "220": {
    name: "Half-Life 2",
    size: 8,
  },
  "300": {
    name: "Day of Defeat: Source",
    size: 6,
  },
  "440": {
    name: "Team Fortress 2",
    size: 9,
  },
  "550": {
    name: "Left 4 Dead 2",
    size: 8,
  },
  "570": {
    name: "Dota 2",
    size: 8,
  },
  "620": {
    name: "Portal 2",
    size: 8,
  },
};

puppeteer.use(stealthPlugin());
const url = `https://www.steamcardexchange.net/index.php?gamepage-appid-`;

const scrape = async () => {
  for (const game in games) {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${url}${game}`);
    await page.screenshot({
      path: `./data/screenshots/${games[game].name}.png`,
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    const result = await page.evaluate(() => {
      const cookieButton = document.querySelector(
        'button[title="Accept"]'
      ) as HTMLButtonElement;
      if (cookieButton) {
        cookieButton.click();
      }

      const cards = document.querySelector('a[href="#series-1-cards"]')
        ? Array.from(
            document
              .querySelector('a[href="#series-1-cards"]')
              .closest("div")
              .nextElementSibling.querySelectorAll(".flex.flex-col")
          ).map((item, index) => {
            const order = index + 1;
            const wallpaper = item.querySelector("a").getAttribute("href");
            const cardImage = item.querySelector("img").getAttribute("src");
            const cardTitle = item.querySelector("img").closest("a")
              .nextElementSibling.textContent;
            const tradeLink = item
              .querySelector("img")
              .closest("a")
              .nextElementSibling.nextElementSibling.getAttribute("href");

            return { wallpaper, cardImage, cardTitle, tradeLink, order };
          })
        : [];

      const foilCards = document.querySelector('a[href="#series-1-cards"]')
        ? Array.from(
            document
              .querySelector('a[href="#series-1-cards"]')
              .closest("div")
              .nextElementSibling.querySelectorAll(".flex.flex-col")
          ).map((item, index) => {
            const order = index + 1;
            const wallpaper = item.querySelector("a").getAttribute("href");
            const cardImage = item.querySelector("img").getAttribute("src");
            const cardTitle = item.querySelector("img").closest("a")
              .nextElementSibling.textContent;
            const tradeLink = item
              .querySelector("img")
              .closest("a")
              .nextElementSibling.nextElementSibling.getAttribute("href");

            return { wallpaper, cardImage, cardTitle, tradeLink, order };
          })
        : [];

      const busterPacks = document.querySelector('a[href="#series-1-booster"]')
        ? Array.from(
            document
              .querySelector('a[href="#series-1-booster"]')
              .closest("div")
              .nextElementSibling.querySelectorAll(".flex.flex-col")
          ).map((item) => {
            const busterImage = item.querySelector("img").getAttribute("src");
            const busterLink = item
              .querySelector("img")
              .nextElementSibling.getAttribute("href");

            return { busterImage, busterLink };
          })
        : [];

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
              .nextElementSibling.nextElementSibling.querySelectorAll("div")[1]
              .textContent.replace(/\D/g, "");

            return { image, title, level, xp };
          })
        : [];

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
              .nextElementSibling.nextElementSibling.querySelectorAll("div")[1]
              .textContent.replace(/\D/g, "");

            return { image, title, level, xp };
          })
        : [];

      const emoticons = document.querySelector('a[href="#series-1-emoticons"]')
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
            const marketLink = item
              .querySelectorAll("img")[1]
              .nextElementSibling.nextElementSibling.nextElementSibling.getAttribute(
                "href"
              );

            return { imageMini, image, title, valuable, marketLink };
          })
        : [];

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
            const wallpaper = item.querySelector("a").getAttribute("href");
            const image = item.querySelector("img").getAttribute("src");
            const title = item.querySelector("img").closest("a")
              .nextElementSibling.textContent;
            const valuable = item.querySelector("img").closest("a")
              .nextElementSibling.nextElementSibling.textContent;
            const tradeLink = item
              .querySelector("img")
              .closest("a")
              .nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute(
                "href"
              );

            return { wallpaper, image, title, tradeLink, order, valuable };
          })
        : [];

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
            const title = item.querySelectorAll(":scope > div")[2].textContent;
            const valuable =
              item.querySelectorAll(":scope > div")[3].textContent;

            return { imageAnimated, imageStatic, title, order, valuable };
          })
        : [];

      const animatedBackgrounds = document.querySelector(
        'a[href="#series-1-animatedbackgrounds"]'
      )
        ? Array.from(
            document
              .querySelector('a[href="#series-1-animatedbackgrounds"]')
              .closest("div")
              .nextElementSibling.querySelectorAll(".flex.flex-col")
          ).map((item, index) => {
            const order = index + 1;
            const videoMp4 = item
              .querySelector("div")
              .querySelector("a")
              .getAttribute("href");
            const imageStatic = item
              .querySelector("div")
              .querySelectorAll("a")[1]
              .getAttribute("href");
            const title = item.querySelectorAll(":scope > div")[2].textContent;
            const valuable =
              item.querySelectorAll(":scope > div")[3].textContent;

            return { videoMp4, imageStatic, title, order, valuable };
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
              .querySelector("a")
              .getAttribute("href");
            const imageStatic = item
              .querySelector("div")
              .querySelectorAll("a")[1]
              .getAttribute("href");
            const title = item.querySelectorAll(":scope > div")[2].textContent;
            const valuable =
              item.querySelectorAll(":scope > div")[3].textContent;

            return { videoMp4, imageStatic, title, order, valuable };
          })
        : [];

      const animatedFrames = document.querySelector(
        'a[href="#series-1-avatarframes"]'
      )
        ? Array.from(
            document
              .querySelector('a[href="#series-1-avatarframes"]')
              .closest("div")
              .nextElementSibling.querySelectorAll(".flex.flex-col")
          ).map((item, index) => {
            const order = index + 1;
            const videoMp4 = item
              .querySelector("div")
              .querySelector("a")
              .getAttribute("href");
            const imageStatic = item
              .querySelector("div")
              .querySelectorAll("a")[1]
              .getAttribute("href");
            const title = item.querySelectorAll(":scope > div")[2].textContent;
            const valuable =
              item.querySelectorAll(":scope > div")[3].textContent;

            return { videoMp4, imageStatic, title, order, valuable };
          })
        : [];

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
            const title = item.querySelectorAll(":scope > div")[2].textContent;
            const valuable =
              item.querySelectorAll(":scope > div")[3].textContent;

            return { imageAnimated, imageStatic, title, order, valuable };
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
    });

    console.log(result);
    await browser.close();
  }
};

scrape();
