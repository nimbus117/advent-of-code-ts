import { map, reduceI } from '@shared/Array';
import { pipe } from '@shared/Function';
import { MapWithDefault } from '@shared/Map';
import { max } from '@shared/Number';
import { parseLinesOfStrings } from '@shared/ParseInput';
import { split } from '@shared/String';

type Happiness = MapWithDefault<string, MapWithDefault<string, number>>;

const setHappiness = (happiness: Happiness, cur: string[]) => {
  const person = happiness.has(cur[0])
    ? happiness.get(cur[0])
    : new MapWithDefault<string, number>(0);
  person.set(
    cur[cur.length - 1].replace(/.$/, ''),
    parseInt(cur[3]) * (cur[2] === 'gain' ? 1 : -1)
  );
  happiness.set(cur[0], person);
  return happiness;
};

const getTableCombinations = (names: string[]) => {
  const result: string[][] = [];
  const get = (arr: string[], comb: string[] = []) => {
    if (arr.length === 0) result.push(comb);
    else {
      for (let i = 0; i < arr.length; i++) {
        const cur = arr.slice();
        const next = cur.splice(i, 1);
        get(cur.slice(), comb.concat(next));
      }
    }
  };
  get(names);
  return result;
};

const solve = (input: string, includeMe = false) => {
  const happinessMap = pipe(input)
    ._(parseLinesOfStrings)
    ._(map(split(' ')))
    ._(reduceI(setHappiness, new MapWithDefault(new MapWithDefault(0)))).$;

  const names = [...happinessMap.keys()];
  if (includeMe) names.push('me');

  const tables = getTableCombinations(names);
  const tableScores = tables.map((table) =>
    table.reduce((score, person, i) => {
      const happiness = happinessMap.get(person);
      const lastIndex = table.length - 1;
      return (
        score +
        happiness.get(table[i === 0 ? lastIndex : i - 1]) +
        happiness.get(table[i === lastIndex ? 0 : i + 1])
      );
    }, 0)
  );

  return max(tableScores);
};

export const part1 = (input: string) => solve(input);

export const part2 = (input: string) => solve(input, true);
