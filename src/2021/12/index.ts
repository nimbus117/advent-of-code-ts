import { parseLinesOfStrings } from '../../shared';
import { Cave, CaveMap, CaveName, Connection, VisitedCaves } from './types';

const isCave = (cave: Cave | undefined): cave is Cave => cave !== undefined;

const getCave = (name: CaveName, caveMap: CaveMap) => {
  let cave = caveMap.get(name);
  if (!cave) {
    cave = {
      name,
      connected: [],
      isBigCave: /^[A-Z]+$/.test(name),
    };
    caveMap.set(name, cave);
  }
  return cave;
};

const addToMap = (connection: Connection, caveMap: CaveMap) => {
  const cave1 = getCave(connection[0], caveMap);
  const cave2 = getCave(connection[1], caveMap);
  cave1.connected.push(cave2);
  cave2.connected.push(cave1);
  return caveMap;
};

const mapCaves = (input: string) =>
  parseLinesOfStrings(input)
    .map((line) => line.split('-'))
    .filter((connection): connection is Connection => connection.length === 2)
    .reduce<CaveMap>(
      (caveMap, connection) => addToMap(connection, caveMap),
      new Map()
    );

const findPaths1 = (
  start: Cave,
  end: Cave,
  caveMap: CaveMap,
  visited: VisitedCaves = new Set()
): string[] => {
  if (start.name === end.name) return [start.name];

  visited.add(start.name);

  const paths = start.connected
    .filter((cave) => cave.isBigCave || !visited.has(cave.name))
    .flatMap((cave) => findPaths1(cave, end, caveMap, visited))
    .map((path) => `${start.name}, ${path}`);

  visited.delete(start.name);
  return paths;
};

export const part1 = (input: string) => {
  const caveMap = mapCaves(input);
  const start = caveMap.get('start');
  const end = caveMap.get('end');

  /* istanbul ignore next */
  if (!(isCave(start) && isCave(end)))
    throw new Error('CaveMap must include a start and end cave');

  const paths = findPaths1(start, end, caveMap);
  return paths.length;
};
