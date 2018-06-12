#!/usr/bin/env node

const program = require('commander');
const gmodule = require('../packages/commands/module');
const question = require('../packages/commands/question');

const meetConfig = {};


const gModule = function(module){
    gmodule(module);
};

program
    .version('1.0.0','-v, --version')
    .command('new [module]')
    .description('generator a new module')
    .action(gModule);

program
    .command('init')
    .description('init your meet config')
    .action(question);

program.parse(process.argv);