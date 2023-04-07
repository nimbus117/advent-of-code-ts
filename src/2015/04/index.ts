import { createHash } from 'crypto';

const hash = (input: string) => createHash('md5').update(input).digest('hex');

const mine = (pattern: RegExp, secret: string) => {
  let num = 0;
  while (num >= 0) {
    const coinHash = hash(secret.trim() + num.toString());
    if (coinHash.toString().match(pattern)) return num;
    num++;
  }
};

export const part1 = (input: string) => mine(/^00000/, input);

export const part2 = (input: string) => mine(/^000000/, input);
