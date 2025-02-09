export type MarketData = {
  results: {
    name: string;
    hash_name: string;
    sell_listings: number;
    sell_price: number;
    sell_price_text: string;
    app_icon: string;
    app_name: string;
    asset_description: {
      appid: number;
      classid: string;
      instanceid: string;
      background_color: string;
      icon_url: string;
      tradable: number;
      name: string;
      name_color: string;
      type: string;
      market_name: string;
      market_hash_name: string;
      commodity: number;
    };
    sale_price_text: string;
  }[];
};

export type SteamApps = {
  [i: string]: {
    name: string;
    size: number;
  };
};
