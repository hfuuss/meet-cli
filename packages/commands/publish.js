const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const shellHelper = require('../lib/shellHelper');
const upload = require('./upload');
const Spinner = require('../lib/spinner');
const analysis = require('../lib/analysis');

const getMeetConfig = function(){
    return require(path.resolve('meet.config.js'));
};
const meetConfig = getMeetConfig();

let config = {
    autoPublish: false
};
Object.assign(config,meetConfig);

function gitCommit(){
    // 发布，提示输入commit 信息
    inquirer.prompt([
        {
            name:'message',
            type:'input',
            message:`Enter your publish message \n `
        }
    ])
        .then(answers=>{
            let message = answers.message;
            shellHelper.series([
                'git pull',
                'git add .',
                `git commit -m "${message}"`,
                'git push',
            ], function(err){
                if(err){
                    console.log(chalk.red(err));
                    process.exit(0);
                }
                console.log(chalk.green('Git push finished!'));
                process.exit(0);
            });
        })
        .catch(err=>{
            console.log(chalk.red(err));
        });
}

function publish(module){

    if(typeof module === 'undefined'){
        console.log(chalk.red(`Module ${module} is undefined !`));
        return;
    }
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
    if(typeof config.gitUrl === "undefined" || config.gitUrl === ''){
        console.log(chalk.red('Sorry, your gitUrl is not defined in meet.config.js'));
        shell.exit(1)
    }

    let spinner = new Spinner('building...');

    // 执行多个命令
    shellHelper.series([
        `${meetConfig.npmBuildCommand?meetConfig.npmBuildCommand:'npm run build '}${module} `,
    ], function(err){
        if(err){
            console.log(chalk.red(err));
            process.exit(0);
        }
        spinner.stop();
        console.log(chalk.green('Build finished!'));

        // 分析资源体积及占比
        analysis();

        if(config.upload.autoUpload === true){
            upload(config.upload)
                .then(res=>{
                    console.log(chalk.green('Upload To CDN finished!'));

                    if(config.autoPublish === true){
                        gitCommit();
                    }
                })
                .catch(err=>{
                    console.log(chalk.red(err));
                })
        }

    });

}


module.exports = publish;