export async function scrapCards(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-cards"]')
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

        return {
          wallpaper,
          cardImage,
          cardTitle,
          tradeLink,
          order,
          isFoil: false,
          appId,
          appName,
        };
      })
    : [];
}

export function scrapFoilCards(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-cards"]')
    ? Array.from(
        document
          .querySelector('a[href="#series-1-foilcards"]')
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

        return {
          wallpaper,
          cardImage,
          cardTitle,
          tradeLink,
          order,
          isFoil: true,
          appId,
          appName,
        };
      })
    : [];
}

export function scrapBusterPack(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-booster"]')
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

        return { busterImage, busterLink, appId, appName };
      })
    : [];
}

export function scrapBadges(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-badges"]')
    ? Array.from(
        document
          .querySelector('a[href="#series-1-badges"]')
          .closest("div")
          .nextElementSibling.querySelectorAll(".flex.flex-col")
      ).map((item) => {
        const image = item.querySelector("img").getAttribute("src");
        const title = item.querySelector("img").nextElementSibling.textContent;
        const level = item
          .querySelector("img")
          .nextElementSibling.nextElementSibling.querySelector("div")
          .textContent.replace(/\D/g, "");
        const xp = item
          .querySelector("img")
          .nextElementSibling.nextElementSibling.querySelectorAll("div")[1]
          .textContent.replace(/\D/g, "");

        return { image, title, level, xp, isFoil: false, appId, appName };
      })
    : [];
}

export function scrapFoilBadges(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-foilbadges"]')
    ? Array.from(
        document
          .querySelector('a[href="#series-1-foilbadges"]')
          .closest("div")
          .nextElementSibling.querySelectorAll(".flex.flex-col")
      ).map((item) => {
        const image = item.querySelector("img").getAttribute("src");
        const title = item.querySelector("img").nextElementSibling.textContent;
        const level = item
          .querySelector("img")
          .nextElementSibling.nextElementSibling.querySelector("div")
          .textContent.replace(/\D/g, "");
        const xp = item
          .querySelector("img")
          .nextElementSibling.nextElementSibling.querySelectorAll("div")[1]
          .textContent.replace(/\D/g, "");

        return { image, title, level, xp, isFoil: true, appId, appName };
      })
    : [];
}

export function scrapEmoticons(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-emoticons"]')
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
          item.querySelectorAll("img")[1].nextElementSibling.nextElementSibling
            .textContent;
        const marketLink = item
          .querySelectorAll("img")[1]
          .nextElementSibling.nextElementSibling.nextElementSibling.getAttribute(
            "href"
          );

        return {
          imageMini,
          image,
          title,
          valuable,
          marketLink,
          appId,
          appName,
        };
      })
    : [];
}

export function scrapBackgrounds(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-backgrounds"]')
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

        return {
          wallpaper,
          image,
          title,
          tradeLink,
          order,
          valuable,
          appId,
          appName,
        };
      })
    : [];
}

export function scrapAnimatedStickers(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-animatedstickers"]')
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
        const valuable = item.querySelectorAll(":scope > div")[3].textContent;

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
}

export function scrapAnimatedBackgrounds(
  appId: number | string,
  appName: string
) {
  return document.querySelector('a[href="#series-1-animatedbackgrounds"]')
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
        const valuable = item.querySelectorAll(":scope > div")[3].textContent;

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
}

export function scrapAnimatedMiniBackgrounds(
  appId: number | string,
  appName: string
) {
  return document.querySelector('a[href="#series-1-animatedminibackgrounds"]')
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
        const valuable = item.querySelectorAll(":scope > div")[3].textContent;

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
}

export function scrapAnimatedFrames(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-avatarframes"]')
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
        const valuable = item.querySelectorAll(":scope > div")[3].textContent;

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
}

export function scrapAnimatedAvatars(appId: number | string, appName: string) {
  return document.querySelector('a[href="#series-1-avataranimated"]')
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
        const valuable = item.querySelectorAll(":scope > div")[3].textContent;

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
}
