const aliOss = require('meetyou-ali-oss');

function upload(uploadConfig){
    // 自动发布alioss
    return aliOss(uploadConfig.config)
}

module.exports = upload;