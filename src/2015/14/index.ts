import { last, map, sort } from '@shared/Array';
import { pipe, repeat } from '@shared/Function';
import { get } from '@shared/Object';
import { parseLinesOfStrings } from '@shared/ParseInput';

const parseReindeer = (str: string) => {
  const parts = str.split(' ');
  return {
    distance: 0,
    flightTime: parseInt(parts[6]),
    restTime: parseInt(parts[13]),
    resting: false,
    score: 0,
    speed: parseInt(parts[3]),
    timeLeft: parseInt(parts[6]),
  };
};

const updateReindeers = (reindeers: ReturnType<typeof parseReindeer>[]) => {
  const updated = reindeers.map((reindeer) => ({
    ...reindeer,
    timeLeft: reindeer.timeLeft - 1,
    ...(!reindeer.resting && { distance: reindeer.distance + reindeer.speed }),
    ...(reindeer.timeLeft - 1 === 0 && {
      resting: !reindeer.resting,
      timeLeft: reindeer.resting ? reindeer.flightTime : reindeer.restTime,
    }),
  }));

  const currentWinner = last(updated.sort((a, b) => a.distance - b.distance));
  return updated.map((r) =>
    r.distance === currentWinner.distance ? { ...r, score: r.score + 1 } : r
  );
};

export const race = (input: string, winBy: 'score' | 'distance') =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(map(parseReindeer))
    ._(repeat(2503, updateReindeers))
    ._(map(get(winBy)))
    ._(sort((a, b) => a - b))
    ._(last)
    .$();

export const part1 = (input: string) => race(input, 'distance');

export const part2 = (input: string) => race(input, 'score');
