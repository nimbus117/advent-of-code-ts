import { sum, transpose } from '../../shared';

type Board = number[][];
type Results = { left: Board[]; won: Board[] };

const parseBingo = (input: string) => {
  const numbersAndBoards = input.split('\n\n');
  return {
    numbers: numbersAndBoards[0].split(',').map((num) => parseInt(num)),
    boards: numbersAndBoards.slice(1).map((board) =>
      board
        .split('\n')
        .map((line) =>
          line
            .split(/\s+/)
            .map((num) => parseInt(num))
            .filter(Number.isInteger)
        )
        .filter((line) => line.length > 0)
    ),
  };
};

const hasRowWon = (board: Board, drawnNumbers: number[]) =>
  board.some((line) => line.every((number) => drawnNumbers.includes(number)));

const hasBoardWon = (board: Board, drawnNumbers: number[]) =>
  hasRowWon(board, drawnNumbers) || hasRowWon(transpose(board), drawnNumbers);

const boardScore = (board: Board, drawnNumbers: number[]) =>
  sum(board.flat().filter((number) => !drawnNumbers.includes(number))) *
  drawnNumbers[drawnNumbers.length - 1];

const getWin = (input: string, condition: (results: Results) => boolean) => {
  const { boards, numbers } = parseBingo(input);
  const drawnNumbers: number[] = [];
  let boardsLeft = boards;

  for (let i = 0; i < numbers.length; i++) {
    drawnNumbers.push(numbers[i]);
    const results = boardsLeft.reduce<Results>(
      (acc, cur) => {
        (hasBoardWon(cur, drawnNumbers) ? acc.won : acc.left).push(cur);
        return acc;
      },
      { left: [], won: [] }
    );

    if (condition(results)) {
      return results.won.map((board) => boardScore(board, drawnNumbers));
    }
    boardsLeft = results.left;
  }
};

export const part1 = (input: string) =>
  getWin(input, (results) => results.won.length > 0);

export const part2 = (input: string) =>
  getWin(input, (results) => results.left.length === 0);
