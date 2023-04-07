import { readFile } from 'fs/promises';

if (process.argv.length < 4)
  console.log('ERROR: Expected year and day arguments (npm start 2021 01)\n');
else
  (async () => {
    const [, , year, day] = process.argv;
    const parts = process.argv[4] ? [process.argv[4]] : ['part1', 'part2'];
    const solution = await import(`./${year}/${day}`);
    const input = await readFile(`./src/${year}/${day}/input`, 'utf8');

    parts.forEach((part) => {
      if (solution[part]) {
        const start = new Date().valueOf();

        const result = solution[part](input);

        console.log(`${part}:`, result);

        const end = new Date().valueOf();

        console.log(`${end - start}ms\n`);
      } else {
        console.log(`ERROR: Could not find export named '${part}'\n`);
      }
    });
  })();
