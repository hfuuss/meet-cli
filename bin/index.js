#!/usr/bin/env node

const program = require('commander');
const gmodule = require('../packages/commands/module');
const question = require('../packages/commands/question');
const publish = require('../packages/commands/publish');

program
    .version('1.0.0','-v, --version')
    .command('new [module]')
    .description('generator a new module')
    .action(gmodule);

program
    .command('publish [module]')
    .description('git publish specify module and assets upload to CDN!')
    .action(publish);

program
    .command('init')
    .description('init your meet config')
    .action(question);

program.parse(process.argv);