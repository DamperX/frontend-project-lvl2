import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getContentFromFile = (filepath) => readFileSync(filepath, 'utf-8');

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
    acc.push(` - ${key}: ${before}`);
    acc.push(` + ${key}: ${after}`);
  } else {
    acc.push(` ${mod} ${key}: ${value}`);
  }
  return acc;
};

const genDiff = (filepath1, filepath2) => {
  const absFirstFilePath = getAbsolutePath(filepath1);
  const absSecondFilePath = getAbsolutePath(filepath2);

  const firstFileContent = getContentFromFile(absFirstFilePath);
  const secondFileContent = getContentFromFile(absSecondFilePath);

  const firstFileData = JSON.parse(firstFileContent);
  const secondFileData = JSON.parse(secondFileContent);

  const data = compareObjects(firstFileData, secondFileData);
  const result = data
    .reduce(formatResultToNewArray, [])
    .join('\n');

  console.log(`{\n${result}\n}`);
};

export default genDiff;
