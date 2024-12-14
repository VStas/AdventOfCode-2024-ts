export function getSymbolGrid(input: string) {
  const rows = input.split('\n');
  return rows.map((row) => row.split(''));
}

const correctSequence = ['X', 'M', 'A', 'S'];
const correctSequenceRev = [...correctSequence].reverse();

const checkSequence = (grid: string[][], i: number, j: number) => {
  let res = 0;

  const height = grid.length;
  const width = grid[0].length;


  const indexSequences = [
    // down
    [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]],

    // right
    [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]],

    // diagonal down-right
    [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]],

    // diagonal down-left
    [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]],
  ];

  for (const sequence of indexSequences) {
    const lastCoord = sequence[sequence.length - 1];

    if (lastCoord[0] >= height || lastCoord[1] >= width) {
      continue;
    }

    if (sequence.every(([x, y], index) => grid[x][y] === correctSequence[index])) {
      res += 1;
    }
    if (sequence.every(([x, y], index) => grid[x][y] === correctSequenceRev[index])) {
      res += 1;
    }
  }

  return res;
};

const first = (input: string) => {
  const grid = getSymbolGrid(input);
  let result = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      result += checkSequence(grid, i, j);
    }
  }

  return result;
};

const expectedFirstSolution = 2562;

const second = (input: string) => {

  const isMandS = (a: string, b: string) => a === 'M' && b === 'S' || a === 'S' && b === 'M';

  const isXmas = (grid: string[][], i: number, j: number) => {
    if (grid[i][j] !== 'A') {
      return false;
    }
    return isMandS(grid[i + 1][j + 1], grid[i - 1][j - 1]) && isMandS(grid[i + 1][j - 1], grid[i - 1][j + 1]);
  };

  const grid = getSymbolGrid(input);

  let result = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (isXmas(grid, i, j)) {
        result += 1;
      }
    }
  }

  return result;
};

const expectedSecondSolution = 1902;

export { first, expectedFirstSolution, second, expectedSecondSolution };
