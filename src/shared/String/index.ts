export const isLowerCase = (string: string) =>
  string.toLocaleLowerCase() === string;

export const isUpperCase = (string: string) =>
  string.toLocaleLowerCase() !== string;

export const isCapitalized = (string: string) =>
  isUpperCase(string.slice(0, 1)) && isLowerCase(string.slice(1));

export const lengthAtLeast = (length: number) => (string: string) =>
  string.length >= length;

export const splitAt = (char: string) => (string: string) => string.split(char);

export const trimEnd = (string: string) => string.trimEnd();

export const trimStart = (string: string) => string.trimStart();

export const trim = (string: string) => string.trim();
