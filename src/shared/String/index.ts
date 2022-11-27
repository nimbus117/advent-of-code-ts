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
    typeof limit === 'number'
      ? string.split(splitter, limit)
      : string.split(splitter);

export const trimEnd = (string: string) => string.trimEnd();

export const trimStart = (string: string) => string.trimStart();

export const trim = (string: string) => string.trim();
