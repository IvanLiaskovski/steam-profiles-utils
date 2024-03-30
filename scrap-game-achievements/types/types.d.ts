export type Achievement = {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  description: string;
  icon: string;
  icongray: string;
};

export type GameData = {
  game?: {
    gameName: string;
    gameVersion: string;
    availableGameStats: {
      achievements: Achievement[];
    };
  };
};
