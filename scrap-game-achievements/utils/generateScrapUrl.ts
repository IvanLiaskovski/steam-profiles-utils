import "dotenv/config";

const steamKey = process.env.STEAM_API_KEY;

export default function generateMarketUrl(appId: string | number) {
  return `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${steamKey}&appid=${appId}`;
}
