export const isLowerCase = (string: string) =>
  string.toLocaleLowerCase() === string;

export const isUpperCase = (string: string) =>
  string.toLocaleLowerCase() !== string;

export const isCapitalized = (string: string) =>
  isUpperCase(string.slice(0, 1)) && isLowerCase(string.slice(1));

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
