const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const shellHelper = require('../lib/shellHelper');

const getMeetConfig = function(){
    return require(path.resolve('meet.config.js'));
};
const meetConfig = getMeetConfig();

const gitUrl = meetConfig.gitUrl;

function publish(module){

    if(typeof module === 'undefined'){
        console.log(chalk.red(`Module ${module} is undefined !`));
        return;
    }
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
    if(typeof gitUrl === "undefined" || gitUrl === ''){
        console.log(chalk.red('Sorry, your gitUrl is not defined in meet.config.js'));
        shell.exit(1)
    }

    // 执行多个命令
    shellHelper.series([
        'git pull',
        `${meetConfig.npmBuildCommand?meetConfig.npmBuildCommand:'npm run build '}${module} `,
        'git add .',
    ], function(err){
        if(err){
            console.log(chalk.red(err));
            return;
        }
        console.log(chalk.green('Build finished!'));

        // 发布，提示输入commit 信息
        inquirer.prompt([
            {
                name:'message',
                type:'input',
                message:`Enter your publish message \n`
            }
        ])
            .then(answers=>{
                let message = answers.message;
                shellHelper.series([
                    `git commit -m "${message}"`,
                    'git push',
                ], function(err){
                    if(err){
                        console.log(chalk.red(err));
                        return;
                    }
                    console.log(chalk.green('Git push finished!'));
                });
            })
            .catch(err=>{
                console.log(chalk.red(err));
            });
    });

}


module.exports = publish;