const formatResultToNewArray = (acc, { key, value, mod }) => {
  if (mod === '+-') {
    const { before, after } = value;
    acc.push(`  - ${key}: ${before}`);
    acc.push(`  + ${key}: ${after}`);
  } else {
    acc.push(`  ${mod} ${key}: ${value}`);
  }
  return acc;
};

export default formatResultToNewArray;
