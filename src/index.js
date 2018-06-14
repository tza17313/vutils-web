/**
 @description: react web 通用函数
 @date: 2018/6/13
 @author: 雷利(Rayleight@baie.com.cn)
 */


import {
    Dimensions,
    PixelRatio,
} from 'react-native'

import layer from "./layer/layer"


export function R_alert(config) {
    if (typeof config === 'string') {
        if(__isNeedReturn(config)){return}
        return layer.open({
            title: [
                '提示',
            ]
            ,content: config.includes('\r\n')?config.replace('\r\n','<br />') : config ||''
            ,btn: '确定'
        });
    }
    
    if (config && config.message) {
        return layer.open({
            title: [
                '提示',
            ]
            ,content: config.message.toString()||''
            ,btn: '确定'
        });
    }
    let {title = '提示', content = '提示文字', yesText = '确定', yes}=config
    if (typeof title !== 'string') {
        title = "提示"
    }
    if (typeof content !== 'string') {
        content = "未知错误"
    }
    if(__isNeedReturn(content)){return}
    return layer.open({
        title: [
            title,
        ]
        ,content: content.includes('\r\n')?content.replace('\r\n','<br />') : content ||''
        ,btn: yesText
        ,yes: (index)=>{
            if(yes){
                yes()
            }
            layer.close(index)
        }
    });
    
    function __isNeedReturn(text) {
        if(text && text.match && (text.match('登录')!==null || text.match('token')!==null) && (global.token==="logout" || global.token===0)){
            //todo 暂时解决多次提示登录的bug
            return true
        }
        return false
    }
}

export function R_confirm(config) {
    let {title = '提示', content = '请传入content', yesText = '确定', yes, noText = '取消', no}=config
    if (typeof title !== 'string') {
        title = "提示"
    }
    if(content && content.message){
        content=content.message
    }
    if (content && typeof content !== 'string') {
        content = "未知错误"
    }
    
    if(content && content.includes('\r\n')){
        content=content.replace('\r\n','<br />')
    }
    layer.open({
        title: [
            title,
        ]
        ,content: content || ''
        ,btn: [yesText,noText]
        ,anim: 'up'
        ,yes: (index)=>{
            if(yes){
                yes()
            }
            layer.close(index)
        }
        ,no: (index)=>{
            if(no){
                no()
            }
            layer.close(index)
        }
    })
}

/**
 * 图片根据显示的大小尽可能的小
 * @param url - 原图片地址
 * @param width - 图片所占的宽
 * @param height - 图片所占的高
 * @returns {*}
 */
export function imgCompress(url, width, height, fixedPixel) {
    if (!width || !height) {
        return url
    }
    let src = url
    let pixel = PixelRatio.get()
    if (fixedPixel) {
        pixel = fixedPixel
    }
    width = parseInt(width * pixel, 10)
    height = parseInt(height * pixel, 10)
    
    //太大的数字，阿里云不支持，而且也裁剪压缩的意义了
    if (width > 1500 || height > 1500) {
        return src
    }
    try {
        let isAliImg = src.match(/static\.rosepie\.com/) !== null || src.match(/static\.meiguipai\.net/) !== null
        if (src.match('x-oss-process') !== null) {
            return src
        }
        if (isAliImg) {
            src = src.replace(/@.*/, "")
            if (src.match(/\?/) !== null) {
                src += '&'
            } else {
                src += '?'
            }
            src += `x-oss-process=image/resize,m_fill,h_${height},w_${width}` //缩略图
        }
        
    } catch (e) {
    
    }
    
    return src
}