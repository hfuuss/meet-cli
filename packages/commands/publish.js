const chalk = require('chalk');
const inquirer = require('inquirer');
const shellHelper = require('../lib/shellHelper');
const upload = require('./upload');

let config = {
    autoPublish: false
};

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

function publish(meetConfig){
    Object.assign(config,meetConfig);
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


module.exports = publish;