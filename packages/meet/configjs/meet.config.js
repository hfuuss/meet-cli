const path = require('path');

module.exports = {

    // module 生成的目标目录
    modulePath: path.resolve('public'),

    // module template 目录
    moduleTemplatePath: path.resolve('meet/templates/module'),

    // project git url
    gitUrl:'you git url',

    // module build npm command
    npmBuildCommand:'npm run release:',

    // upload assets config
    upload:{

        // CDN Server
        server:'alioss',// 阿里OSS - 'alioss', 七牛云 - 'qn'

        // alioss server config
        config:{
            accessKeyId: "",
            accessKeySecret: "",
            bucket: "",
            region: "",
            srcDir: path.resolve('public/assets'),// 要上传的dist文件夹
            ignoreDir: false,
            deduplication: true,
            prefix: "xxx.xxx.com",
        }
    },

    // is publish after build?
    autoPublish: false
};
