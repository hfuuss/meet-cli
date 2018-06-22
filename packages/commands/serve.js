const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports = function (module) {
    let packageStr = fs.readFileSync(path.resolve('package.json'),'utf8');
    let packageJson = JSON.parse(packageStr);
    shell.exec('nodemon ' + packageJson.main + ' ' + module, function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
};