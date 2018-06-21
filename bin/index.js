#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const gmodule = require('../packages/commands/module');
const question = require('../packages/commands/question');
const publish = require('../packages/commands/publish');
const upload = require('../packages/commands/upload');
const analysis = require('../packages/lib/analysis');
const config = require(path.resolve('meet.config.js'));

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
    .command('upload')
    .description('upload your build dist files to CDN server')
    .action(function () {
        upload(config.upload);
    });

program
    .command('analysis')
    .description('analysis dist files size and percent')
    .action(function () {
        analysis(config.upload.config.srcDir);
    });

program
    .command('init')
    .description('init your meet config')
    .action(question);

program.parse(process.argv);