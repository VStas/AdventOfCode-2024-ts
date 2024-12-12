const first = (input: string) => {

  let result = 0;
  const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);
  for (const match of matches) {
    result += Number(match[1]) * Number(match[2]);
  }
  return result;
};

const expectedFirstSolution = 160672468;

const second = (input: string) => {
  let result = 0;
  const regex = /(?<=(?:do\(\)|^)(?:[^d]|d(?!on't\(\)))*)mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.matchAll(regex);

  for (const match of matches) {
    result += (Number(match[1]) * Number(match[2]));
  }
  return result;
};

// 84893551 - вот это вроде ок
// 61413365 - wrong. Где-то баг в bun
// 93733733 - wrong была ошибка в лишнем флаге m

const expectedSecondSolution = 84893551;

export { first, expectedFirstSolution, second, expectedSecondSolution };

/*
^(?:do\(\))?([^d]|d([^o]|o([^n]|n([^t]|t([^(]|\([^)])))))*(hehe)
*/

/*
(do\(\)|^)(?:[^d]|d(?!ont\(\)))*?(hello)
*/
