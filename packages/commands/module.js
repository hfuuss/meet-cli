const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');

const getMeetConfig = function(){
    return require(path.resolve('meet.config.js'));
};
const meetConfig = getMeetConfig();

// 要拷贝的目标所在路径
const templatePath = path.join(__dirname,'..','meet/module');
// 目标文件夹根路径
const targetRootPath = meetConfig.modulePath;

function deleteFolderRecursive (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function copyTemplates(name){
    function readAndCopyFile(parentPath,tempPath){
        let files = fs.readdirSync(parentPath);

        files.forEach((file)=>{
            let curPath = `${parentPath}/${file}`;
            let stat = fs.statSync(curPath);
            let filePath = `${targetRootPath}/${tempPath}/${file}`;
            if(stat.isDirectory()){
                fs.mkdirSync(filePath);
                readAndCopyFile(`${parentPath}/${file}`,`${tempPath}/${file}`);
            }
            else{
                const contents = fs.readFileSync(curPath,'utf8');
                fs.writeFileSync(filePath,contents, 'utf8');
            }

        });
    }

    readAndCopyFile(templatePath,name);
}


function generateModule(name){
    let targetDir = path.join(targetRootPath,name);

    if(fs.existsSync(targetDir)){

        // 如果已存在改模块，提问开发者是否覆盖该模块
        inquirer.prompt([
            {
                name:'module-overwrite',
                type:'confirm',
                message:`Module named ${name} is already existed, are you sure to overwrite?`,
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
                console.log('answers',answers);

                // 如果确定覆盖
                if(answers['module-overwrite']){
                    // 删除文件夹
                    deleteFolderRecursive(targetDir);
                    console.log(chalk.yellow(`Module already existed , removing!`));

                    //创建新模块文件夹
                    fs.mkdirSync(targetDir);
                    copyTemplates(name);
                    console.log(chalk.green(`Generate new module "${name}" finished!`));
                }
            })
            .catch(err=>{
                console.log(chalk.red(err));
            })
    }
    else{
        //创建新模块文件夹
        fs.mkdirSync(targetDir);
        copyTemplates(name);
        console.log(chalk.green(`Generate new module "${name}" finished!`));
    }

}

module.exports = generateModule;
