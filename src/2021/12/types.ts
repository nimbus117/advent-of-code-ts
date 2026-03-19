export type CaveName = string;

export type Cave = {
  name: CaveName;
  isBigCave: boolean;
  connected: Cave[];
};

export type Connection = [CaveName, CaveName];

export type CaveMap = Map<CaveName, Cave>;

export type VisitedCaves = Set<CaveName>;
