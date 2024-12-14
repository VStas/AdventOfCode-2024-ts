function getArrays(input: string) {
  const lines = input.split('\n');
  const pairs = lines.map(line => line.split(/\D+/).map((str) => Number(str)));

  const arrLeft = pairs.map(( pair ) => pair[0]);
  const arrRight = pairs.map(( pair) => pair[1]);

  return { arrLeft, arrRight };
}

const first = (input: string) => {
  const {arrLeft, arrRight}  = getArrays(input);
  arrLeft.sort((a, b) => a - b);
  arrRight.sort((a, b) => a - b);


  let score = 0;
  for (let index = 0; index < arrLeft.length; index++) {
    const elementL = arrLeft[index];
    const elementR = arrRight[index];
    score += Math.abs(elementL-elementR);
  }
  return score;
};

const expectedFirstSolution = 2066446;

const second = (input: string) => {
  const {arrLeft, arrRight}  = getArrays(input);
  let res = 0;

  const map = new Map<number, number>();

  for (const num of arrRight) {
    if (!map.has(num)) {
      map.set(num, 0);
    }

    map.set(num, map.get(num) + 1);
  }

  for (let index = 0; index < arrLeft.length; index++) {
    const element = arrLeft[index];
    res += element * map.get(element) || 0;

    
  }

  return res;
};

const expectedSecondSolution = 24931009;

export { first, expectedFirstSolution, second, expectedSecondSolution };
