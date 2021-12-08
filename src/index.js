import compareObjects from './compare.js';
import formatResultToNewArray from './format.js';
import parseData from './parsers.js';
import { getContentFromFile, getExt } from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const firstFileContent = parseData(getContentFromFile(filepath1), getExt(filepath1));
  const secondFileContent = parseData(getContentFromFile(filepath2), getExt(filepath2));

  const data = compareObjects(firstFileContent, secondFileContent);
  const result = data
    .reduce(formatResultToNewArray, [])
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
