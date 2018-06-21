const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

function copyMeetConfigJS(){
    figlet('meet cli', function(err, data) {
        if(err){
            console.log(chalk.red('Some thing about figlet is wrong!'));
        }
        console.log(chalk.yellow(data));
        let targetFilePath = path.resolve('meet.config.js');
        let templatePath = path.join(__dirname,'../meet/configjs/meet.config.js');
        let contents = fs.readFileSync(templatePath,'utf8');
        fs.writeFileSync(targetFilePath,contents,'utf8');
        console.log(chalk.green('Initialize meet config success \n'));
        process.exit(0);
    });
}

module.exports = function(){
    // 配置文件如果存在则提示是否覆盖
    if(fs.existsSync(path.resolve('meet.config.js'))){
        // 连续提问
        inquirer.prompt([
            {
                name:'init-confirm',
                type:'confirm',
                message:`meet.config.js is already existed, are you sure to overwrite?`,
                validate: function(input){
                    if(input.lowerCase !== 'y' && input.lowerCase !== 'n' ){
                        return 'Please input y/n !'
                    }
                    else{
                        return true;
                    }
                }
            }
        ])
            .then(answers=>{
                if(answers['init-confirm']){
                    copyMeetConfigJS();
                }
                else{
                    process.exit(0);
                }
            })
            .catch(err=>{
                console.log(chalk.red(err));
            })
    }
    else{
        copyMeetConfigJS();
    }
};

