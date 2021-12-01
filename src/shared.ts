export const parseNumbers = (input: string) =>
  input
    .split('\n')
    .slice(0, -1)
    .map((x) => parseInt(x));

export const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b);
