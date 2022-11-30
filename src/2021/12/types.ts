import { Tuple } from '@shared/Types';

export type CaveName = string;

export type Cave = {
  name: CaveName;
  isBigCave: boolean;
  connected: Cave[];
};

export type Connection = Tuple<CaveName, 2>;

export type CaveMap = Map<CaveName, Cave>;

export type VisitedCaves = Set<CaveName>;
