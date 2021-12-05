import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getContentFromFile = (filepath) => readFileSync(path.resolve(filepath), 'utf-8');

const compareObjects = (firstObject, secondObject) => {
  const keysArray = _.union(_.keys(firstObject), _.keys(secondObject));

  const result = keysArray.map((key) => {
    if (!_.has(firstObject, key)) {
      return { key, value: secondObject[key], mod: '+' };
    }

    if (!_.has(secondObject, key)) {
      return { key, value: firstObject[key], mod: '-' };
    }

    if (firstObject[key] === secondObject[key]) {
      return { key, value: firstObject[key], mod: ' ' };
    }

    return { key, value: { before: firstObject[key], after: secondObject[key] }, mod: '+-' };
  });

  return _.sortBy(result, 'key');
};

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

const genDiff = (filepath1, filepath2) => {
  const firstFileContent = getContentFromFile(filepath1);
  const secondFileContent = getContentFromFile(filepath2);

  const firstFileData = JSON.parse(firstFileContent);
  const secondFileData = JSON.parse(secondFileContent);

  const data = compareObjects(firstFileData, secondFileData);
  const result = data
    .reduce(formatResultToNewArray, [])
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
