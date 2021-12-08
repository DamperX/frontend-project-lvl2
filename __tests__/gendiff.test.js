import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureFileContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = getFixtureFileContent('result.txt');

test('run gendiff flat', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const diff = genDiff(file1, file2);

  expect(diff).toBe(result);
});

test('run gendiff yaml', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const diff = genDiff(file1, file2);

  expect(diff).toBe(result);
});
