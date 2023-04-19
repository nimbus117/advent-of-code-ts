import { MapWithError } from '@shared/Map';
import { parseLinesOfStrings } from '@shared/ParseInput';

export const getRoute = (input: string, minMax: 'min' | 'max') => {
  const lookup = new MapWithError<string, Map<string, number>>();

  const addToLookup = (from: string, to: string, value: number) => {
    const destinations = lookup.has(from) ? lookup.get(from) : new Map();
    destinations.set(to, value);
    lookup.set(from, destinations);
  };

  parseLinesOfStrings(input)
    .map((line) => line.split(' = ').flatMap((x) => x.split(' to ')))
    .forEach(([from, to, value]) => {
      const _value = parseInt(value);
      addToLookup(from, to, _value);
      addToLookup(to, from, _value);
    });

  const routes: number[] = [];

  const travel = (start: string, visited: string[], total = 0) => {
    const next = [...lookup.get(start)].filter(([x]) => !visited.includes(x));
    if (next.length === 0) routes.push(total);
    else next.forEach((x) => travel(x[0], [start, ...visited], x[1] + total));
  };

  [...lookup.keys()].forEach((place) => travel(place, []));

  return (minMax === 'max' ? Math.max : Math.min)(...routes);
};

export const part1 = (input: string) => getRoute(input, 'min');

export const part2 = (input: string) => getRoute(input, 'max');
