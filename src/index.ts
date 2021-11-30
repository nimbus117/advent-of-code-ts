/* eslint-disable @typescript-eslint/no-var-requires */

if (process.argv.length < 4) {
  throw new Error('\nExpected year and day arguments (npm start 2021 01)\n');
}

const year = process.argv[2];
const day = process.argv[3];
const parts = process.argv[4] ? [process.argv[4]] : ['part1', 'part2'];

const solution = require(`./${year}/${day}`);
const input = require('fs').readFileSync(`./src/${year}/${day}/input`, 'utf8');

parts.forEach((part) => {
  const start = new Date().getMilliseconds();
  solution[part] && console.log(`${part}:`, solution[part](input));
  const end = new Date().getMilliseconds();
  console.log(`${end - start}ms\n`);
});
