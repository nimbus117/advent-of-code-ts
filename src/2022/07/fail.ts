import { pipe } from '@shared/Function';
import { parseLinesOfStrings } from '@shared/ParseInput';

type File = number;
type Dir = Map<string, Dir | File>;
type GetDirTreeOut = { i: number; directory: Dir };

const parseFile = (file: string) => {
  const [size, name] = file.split(' ');
  return {
    size: parseInt(size),
    name,
  };
};

const getDirTree = (
  lines: string[],
  index = 0,
  directory = new Map()
): GetDirTreeOut => {
  let i = index;
  while (i < lines.length) {
    const line = lines[i];
    if (line.match(/^\$ cd/)) {
      if (!line.match(/^\$ cd \.\./)) {
        const tree = getDirTree(lines, i + 1, new Map());
        directory.set(line.split(' ')[2], tree.directory);
        i = tree.i + 1;
        continue;
      } else {
        return { directory, i };
      }
    } else if (line.match(/^\d/)) {
      const file = parseFile(line);
      directory.set(file.name, file.size);
    }
    i++;
  }

  return { directory, i };
};

export const part1 = (input: string) =>
  pipe(input)
    ._(parseLinesOfStrings)
    ._(getDirTree)
    ._((x) => x.directory)
    .__((x) => console.dir(x, { depth: 3 })).$;
