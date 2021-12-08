import { readFileSync } from 'fs';
import path from 'path';

export const getContentFromFile = (filepath) => readFileSync(filepath, 'utf-8');

export const getExt = (filepath) => path.extname(filepath);
