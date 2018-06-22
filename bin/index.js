#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
const gmodule = require('../packages/commands/module');
// const serve = require('../packages/commands/serve');
const question = require('../packages/commands/question');
const build = require('../packages/commands/build');
const publish = require('../packages/commands/publish');
const upload = require('../packages/commands/upload');
const analysis = require('../packages/lib/analysis');
const initial = require('../packages/commands/initial');

let config = {};
// 配置文件如果存在则读取
if(fs.existsSync(path.resolve('meet.config.js'))){
    config = require(path.resolve('meet.config.js'));
}

program
    .version('1.0.0','-v, --version')
    .command('init')
    .description('initialize your meet config')
    .action(initial);

program
    .command('new [module]')
    .description('generator a new module')
    .action(function(module){
        gmodule(config,module)
    });

// program
//     .command('serve [module]')
//     .description('run node.js server and watch module for hot module reload!')
//     .action(function(module){
//         serve(module)
//     });

program
    .command('build [module]')
    .description('git build specify module and assets upload to CDN!')
    .action(function(module){
        build(config,module)
    });

program
    .command('publish')
    .description('upload assets to CDN and git commit && push')
    .action(function(){
        publish(config)
    });

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
    .command('question')
    .description('analysis dist files size and percent')
    .action(function(){
        question()
    });

program.parse(process.argv);