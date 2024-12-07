import { getNumberGrid } from '../../utils/arrays/getNumberRows';

// function createLimitedChecker<T extends Array<K>, K>(checker: (...args: T) => boolean, tries: number) {
//   return (...args: T) => {
//     if (tries === 0) {
//       return false;
//     }
//     if (checker(...args)) {
//       tries -= 1;
//       return true;
//     }

//     return false;
//   };
// }




function isIncreasingPairValid(a: number, b: number) {
  return b > a && b - a <= 3;
}

function isDecreasingPairValid(a: number, b: number) {
  return b < a && a - b <= 3;
}
function isReportValid(report: number[]) {
  if (report.every((el, index) => index === report.length - 1 || isIncreasingPairValid(el, report[index + 1]))) {
    return true;
  }
  if (report.every((el, index) => index === report.length - 1 || isDecreasingPairValid(el, report[index + 1]))) {
    return true;
  }

  return false;
}

// function isReportValidWithMistake(report: number[]) {
//   const checkIncreasingRemoval = createLimitedChecker(
//     (index: number) => index === 0 || index === report.length - 2 || isIncreasingPairValid(report[index - 1], report[index + 1]),
//     1
//   );

//   if (
//     report.every((el, index) => index === report.length - 1 || isIncreasingPairValid(el, report[index + 1]) || checkIncreasingRemoval(index))
//   ) {
//     return true;
//   }
//   const checkDecreasingRemoval = createLimitedChecker(
//     (index: number) => index === 0 || index === report.length - 2 || isDecreasingPairValid(report[index - 1], report[index + 1]),
//     1
//   );

//   if (
//     report.every((el, index) => index === report.length - 1 || isDecreasingPairValid(el, report[index + 1]) || checkDecreasingRemoval(index))
//   ) {
//     return true;
//   }

//   return false;
// }

function checkIfIncreasing(report: number[]) {
  for (let i = 0; i < report.length - 1; i++) {
    if (!isIncreasingPairValid(report[i], report[i + 1])) {
      return i;
    }
  }
  return true;
}

function checkIfDecreasing(report: number[]) {
  for (let i = 0; i < report.length - 1; i++) {
    if (!isDecreasingPairValid(report[i], report[i + 1])) {
      return i;
    }
  }
  return true;
}

function isReportValidWithElRemoval(report: number[]) {
  const increasing = checkIfIncreasing(report);
  if (increasing === true) {
    // console.log(report);
    // console.log('is valid 1');
    return true;
  }

  const reportWithoutIncreasing = [...report];
  reportWithoutIncreasing.splice(increasing, 1);
  const reportWithoutIncreasingPlusOne = [...report];
  reportWithoutIncreasingPlusOne.splice(increasing + 1, 1);

  if (checkIfIncreasing(reportWithoutIncreasing) === true || checkIfIncreasing(reportWithoutIncreasingPlusOne) === true) {
    // console.log(report);
    // console.log(increasing);
    // console.log('is valid 2');
    return true;
  }

  const decreasing = checkIfDecreasing(report);
  if (decreasing === true) {
    // console.log(report);
    // console.log('is valid 3');
    return true;
  }

  const reportWithoutDecreasing = [...report];
  reportWithoutDecreasing.splice(decreasing, 1);
  const reportWithoutDecreasingPlusOne = [...report];
  reportWithoutDecreasingPlusOne.splice(decreasing + 1, 1);

  if (checkIfDecreasing(reportWithoutDecreasing) === true || checkIfDecreasing(reportWithoutDecreasingPlusOne) === true) {
    // console.log(report);
    // console.log('is valid 4');
    return true;
  }

  return false;
}

const first = (input: string) => {
  const grid = getNumberGrid(input);

  return grid.reduce((result, report) => {
    if (isReportValid(report)) {
      return result + 1;
    }
    return result;
  }, 0);
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  const grid = getNumberGrid(input);

  return grid.reduce((result, report) => {
    if (isReportValidWithElRemoval(report)) {
      return result + 1;
    }
    return result;
  }, 0);
};

const expectedSecondSolution = 4;

export { first, expectedFirstSolution, second, expectedSecondSolution };
