const path = require('path');

module.exports = {

    // module 生成的目标目录
    modulePath: path.resolve('public'),

    // module template 目录
    moduleTemplatePath: path.resolve('meet/templates/module'),

    // project git url
    gitUrl:'http://gitlab.meiyou.com/advertise/ad-activity.git',

    // module build npm command
    npmBuildCommand:'npm run release:',

    // upload assets config
    upload:{

        // CDN Server
        server:'alioss',// 阿里OSS - 'alioss', 七牛云 - 'qn'

        // alioss server config
        config:{
            accessKeyId: "LTAIovY7dqAhfHH0",
            accessKeySecret: "5xkXY9gDAvHdB7oudB8WMkEf6wlzD8",
            bucket: "adstatic",
            region: "oss-cn-beijing",
            srcDir: path.resolve('public/assets'),// 要上传的dist文件夹
            ignoreDir: false,
            deduplication: true,
            prefix: "ad-activity.meiyou.com",
        }
    },

    // is publish after build?
    autoPublish: false
};
