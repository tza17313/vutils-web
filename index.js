/**
 @description: 工具函数入口
 @date: 2018/6/7
 @author: 雷利(Rayleight@baie.com.cn)
 */
var common=require('baie-vutils')
var index=require('./lib/index')
var net=require('./lib/net')
var storage=require('./lib/Storage')
var Toast=require('./lib/Toast/index')

var VUtils={
    isNumber:common.isNumber,
    isMobile:common.isMobile,
    isIdCard:common.isIdCard,
    isMobileCaptcha:common.isMobileCaptcha,
    toNumber:common.toNumber,
    numberFormat:common.numberFormat,
    parseParam:common.parseParam,
    phoneText:common.phoneText,
    bankCardEncode:common.bankCardEncode,
    getCdnTimeStamp:common.getCdnTimeStamp,
    getMainDomain:common.getMainDomain,
    getNowClearingMonth:common.getNowClearingMonth,
    getNowClearingYear:common.getNowClearingYear,
    getNowClearingMonthText:common.getNowClearingMonthText,
    getNowClearingYearText:common.getNowClearingYearText,
    R_POST:net.R_POST,
    R_GET:net.R_GET,
    Toast:Toast.default,
    R_alert:index.R_alert,
    R_confirm:index.R_confirm,
    imgCompress:index.imgCompress,
    saveItem:storage.saveItem,
    getItem:storage.getItem,
    removeItem:storage.removeItem,
    clearAllItem:storage.clearAllItem,
}

module.exports = VUtils;


