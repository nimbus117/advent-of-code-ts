import { range } from '@shared/Array';
import { parseLinesOfStrings } from '@shared/ParseInput';

const getTailPositions = (input: string, knotCount: number) => {
  const tPositions = new Set(['0-0']);
  const knots: number[][] = range(knotCount).map(() => [0, 0]);
  const motions = parseLinesOfStrings(input).map((m) => m.split(' '));

  motions.forEach(([direction, steps]) => {
    for (let i = 0; i < parseInt(steps); i++) {
      direction === 'R'
        ? knots[0][0]++
        : direction === 'L'
        ? knots[0][0]--
        : direction === 'U'
        ? knots[0][1]++
        : knots[0][1]--;

      for (let tail = 1; tail < knotCount; tail++) {
        const [hx, hy] = knots[tail - 1];
        const [tx, ty] = knots[tail];
        const difX = Math.abs(hx - tx);
        const difY = Math.abs(hy - ty);

        if (difX > 1) {
          knots[tail][0] = hx > tx ? knots[tail][0] + 1 : knots[tail][0] - 1;
          if (difY > 0)
            knots[tail][1] = hy > ty ? knots[tail][1] + 1 : knots[tail][1] - 1;
        } else if (difY > 1) {
          knots[tail][1] = hy > ty ? knots[tail][1] + 1 : knots[tail][1] - 1;
          if (difX > 0)
            knots[tail][0] = hx > tx ? knots[tail][0] + 1 : knots[tail][0] - 1;
        }

        if (tail === knotCount - 1) tPositions.add(knots[tail].join('-'));
      }
    }
  });

  return tPositions.size;
};

export const part1 = (input: string) => getTailPositions(input, 2);

export const part2 = (input: string) => getTailPositions(input, 10);
