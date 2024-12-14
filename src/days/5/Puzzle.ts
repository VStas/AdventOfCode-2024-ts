function checkSequence(sequence: string[], shouldNotHaveBefore: Map<string, Set<string>>) {
  const set = new Set<string>();

  for (const char of sequence) {
    const shouldNotHaveBeforeSet = shouldNotHaveBefore.get(char);

    if (!shouldNotHaveBeforeSet || shouldNotHaveBeforeSet.isDisjointFrom(set)) {
      set.add(char);
      continue;
    } else {
      return false;
    }
  }

  return true;
}

const getRulesAndSequesnces = (input: string) => {
  const [rulesSection, sequenceSection] = input.split('\n\n');
  const rules = rulesSection.split('\n').map(line => line.split('|'));

  const shouldNotHaveBefore: Map<string, Set<string>> = new Map();

  for (const rule of rules) {
    const [a, b] = rule;

    if (!shouldNotHaveBefore.has(a)) {
      shouldNotHaveBefore.set(a, new Set());
    }
    shouldNotHaveBefore.get(a).add(b);
  }

  const sequences = sequenceSection.split('\n').map(line => line.split(','));

  return { rules, sequences, shouldNotHaveBefore };
}


const first = (input: string) => {
  const { rules, sequences, shouldNotHaveBefore } = getRulesAndSequesnces(input);
  
  let result = 0;

  for (const sequence of sequences) {
    if (checkSequence(sequence, shouldNotHaveBefore)) {
      const middleEl = sequence[(sequence.length - 1) / 2];
      result += +middleEl;

    }
  }

  return result;
};

const expectedFirstSolution = 5275;

function fixSequence(sequence: string[], shouldNotHaveBefore: Map<string, Set<string>>) {
  // const set = new Set<string>();
  const arr = sequence.sort((a, b) => shouldNotHaveBefore.get(a).has(b) ? -1 : 1);
  return arr;
}

const second = (input: string) => {
  const { rules, sequences, shouldNotHaveBefore } = getRulesAndSequesnces(input);
  
  let result = 0;

  const wrongSequences = sequences.filter(sequence =>!checkSequence(sequence, shouldNotHaveBefore));

  for (const wrongSequence of wrongSequences) {
    const fixed = fixSequence(wrongSequence, shouldNotHaveBefore);
    const middleEl = fixed[(fixed.length - 1) / 2];
    result += +middleEl;
  }

  return result;
};

const expectedSecondSolution = 6191;

export { first, expectedFirstSolution, second, expectedSecondSolution };
