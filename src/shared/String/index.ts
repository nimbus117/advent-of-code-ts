export const isAllLowerCase = (string: string) =>
  string.toLocaleLowerCase() === string;

export const isAllUpperCase = (string: string) =>
  string.toLocaleUpperCase() === string;

export const isLengthAtLeast = (length: number) => (string: string) =>
  string.length >= length;

export const split =
  (splitter: string | RegExp, limit?: number) => (string: string) =>
    string.split(splitter, limit);

export const trimEnd = (string: string) => string.trimEnd();

export const trimStart = (string: string) => string.trimStart();

export const trim = (string: string) => string.trim();

export const indexOf = (substring: string) => (string: string) =>
  string.indexOf(substring);

export const toLowerCase = (string: string) => string.toLowerCase();

export const toUpperCase = (string: string) => string.toUpperCase();

export const slice = (start?: number, end?: number) => (input: string) =>
  input.slice(start, end);
