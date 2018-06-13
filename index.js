/**
 @description: 工具函数入口
 @date: 2018/6/7
 @author: 雷利(Rayleight@baie.com.cn)
 */
var index=require('./lib/index')
var net=require('./lib/net')
var Toast=require('./lib/Toast/index')

var VUtils={
    R_POST:net.R_POST,
    R_GET:net.R_GET,
    Toast:Toast.default,
    R_alert:index.R_alert,
    R_confirm:index.R_confirm,
}

module.exports = VUtils;


