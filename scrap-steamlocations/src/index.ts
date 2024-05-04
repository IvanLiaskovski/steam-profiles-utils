import { countries } from "./consts/constst";
import logger from "./logger";
import fs from "fs";

async function fetchLocation() {
  const allStates = [];
  const allCities = [];

  for (const country of countries) {
    console.log(`Scrapping states for ${country.countryName}`);
    logger(`Scrapping states for ${country.countryName}`, "src/logs/logs.txt");
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    try {
      const countryStates = await fetch(
        `https://steamcommunity.com//actions/QueryLocations/${country.countryCode}`
      );
      const states = await countryStates.json();

      if (states?.length > 0) {
        allStates.push(
          states.map((state) => {
            return {
              countryCode: country.countryCode,
              stateCode: state.statecode,
              stateName: state.statename,
            };
          })
        );
      }
    } catch (e) {
      console.error(`Error fetching states for ${country.countryName}`);
      logger(
        `Error fetching states for ${country.countryName}`,
        "src/logs/logs.txt"
      );
    }

    console.log(`Scrapped states for ${country.countryName}`);
    logger(`Scrapped states for ${country.countryName}`, "src/logs/logs.txt");
  }

  fs.writeFileSync(
    "src/data/states/states.json",
    JSON.stringify(allStates.flat())
  );

  for (const state of allStates.flat()) {
    console.log(`Scrapping cities for ${state.stateName}`);
    logger(`Scrapping cities for ${state.stateName}`, "src/logs/logs.txt");
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    try {
      const cities = await fetch(
        `https://steamcommunity.com//actions/QueryLocations/${state.countryCode}/${state.stateCode}`
      );
      const citiesData = await cities.json();

      if (citiesData?.length > 0) {
        allCities.push(
          citiesData.map((city) => {
            return {
              stateCode: state.stateCode,
              cityCode: city.citycode,
              cityName: city.cityname,
            };
          })
        );
      }
    } catch (e) {
      console.error(`Error fetching cities for ${state.stateName}`);
      logger(
        `Error fetching cities for ${state.stateName}`,
        "src/logs/logs.txt"
      );
    }
    console.log(`Scrapped cities for ${state.stateName}`);
    logger(`Scrapped cities for ${state.stateName}`, "src/logs/logs.txt");
  }

  fs.writeFileSync(
    "src/data/cities/cities.json",
    JSON.stringify(allCities.flat())
  );
}

fetchLocation();
