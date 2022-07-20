import { readFileSync } from 'fs';

if (process.argv.length < 4) {
  throw new Error('Expected year and day arguments (npm start 2021 01)');
}

const [, , year, day] = process.argv;
const parts = process.argv[4] ? [process.argv[4]] : ['part1', 'part2'];
const input = readFileSync(`./src/${year}/${day}/input`, 'utf8');

(async () => {
  const solution = await import(`./${year}/${day}`);

  parts.forEach((part) => {
    if (solution[part]) {
      const start = new Date().valueOf();
      console.log(`${part}:`, solution[part](input));
      const end = new Date().valueOf();
      console.log(`${end - start}ms\n`);
    }
  });
})();
