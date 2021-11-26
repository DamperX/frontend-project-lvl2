#!/usr/bin/env node
import { program } from 'commander';

program
  .version('0.0.1')
  .argument('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format');

program.parse();
