'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.R_alert = R_alert;
exports.R_confirm = R_confirm;
exports.imgCompress = imgCompress;

var _reactNative = require('react-native');

var _layer = require('./layer/layer');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 @description: react web 通用函数
 @date: 2018/6/13
 @author: 雷利(Rayleight@baie.com.cn)
 */

function R_alert(config) {
    if (typeof config === 'string') {
        if (__isNeedReturn(config)) {
            return;
        }
        return _layer2.default.open({
            title: ['提示'],
            content: config.includes('\r\n') ? config.replace('\r\n', '<br />') : config || '',
            btn: '确定'
        });
    }

    if (config && config.message) {
        return _layer2.default.open({
            title: ['提示'],
            content: config.message.toString() || '',
            btn: '确定'
        });
    }
    var _config$title = config.title;
    let title = _config$title === undefined ? '提示' : _config$title;
    var _config$content = config.content;
    let content = _config$content === undefined ? '提示文字' : _config$content;
    var _config$yesText = config.yesText;
    let yesText = _config$yesText === undefined ? '确定' : _config$yesText,
        yes = config.yes;

    if (typeof title !== 'string') {
        title = "提示";
    }
    if (typeof content !== 'string') {
        content = "未知错误";
    }
    if (__isNeedReturn(content)) {
        return;
    }
    return _layer2.default.open({
        title: [title],
        content: content.includes('\r\n') ? content.replace('\r\n', '<br />') : content || '',
        btn: yesText,
        yes: index => {
            if (yes) {
                yes();
            }
            _layer2.default.close(index);
        }
    });

    function __isNeedReturn(text) {
        if (text && text.match && (text.match('登录') !== null || text.match('token') !== null) && (global.token === "logout" || global.token === 0)) {
            //todo 暂时解决多次提示登录的bug
            return true;
        }
        return false;
    }
}

function R_confirm(config) {
    var _config$title2 = config.title;
    let title = _config$title2 === undefined ? '提示' : _config$title2;
    var _config$content2 = config.content;
    let content = _config$content2 === undefined ? '请传入content' : _config$content2;
    var _config$yesText2 = config.yesText;
    let yesText = _config$yesText2 === undefined ? '确定' : _config$yesText2,
        yes = config.yes;
    var _config$noText = config.noText;
    let noText = _config$noText === undefined ? '取消' : _config$noText,
        no = config.no;

    if (typeof title !== 'string') {
        title = "提示";
    }
    if (content && content.message) {
        content = content.message;
    }
    if (content && typeof content !== 'string') {
        content = "未知错误";
    }

    if (content && content.includes('\r\n')) {
        content = content.replace('\r\n', '<br />');
    }
    _layer2.default.open({
        title: [title],
        content: content || '',
        btn: [yesText, noText],
        anim: 'up',
        yes: index => {
            if (yes) {
                yes();
            }
            _layer2.default.close(index);
        },
        no: index => {
            if (no) {
                no();
            }
            _layer2.default.close(index);
        }
    });
}

/**
 * 图片根据显示的大小尽可能的小
 * @param url
 * @param width
 * @param height
 * @returns {*}
 */
function imgCompress(url, width, height, fixedPixel) {
    if (!width || !height) {
        return url;
    }
    let src = url;
    let pixel = _reactNative.PixelRatio.get();
    if (fixedPixel) {
        pixel = fixedPixel;
    }
    width = parseInt(width * pixel, 10);
    height = parseInt(height * pixel, 10);

    //太大的数字，阿里云不支持，而且也裁剪压缩的意义了
    if (width > 1500 || height > 1500) {
        return src;
    }
    try {
        let isAliImg = src.match(/static\.rosepie\.com/) !== null || src.match(/static\.meiguipai\.net/) !== null;
        if (src.match('x-oss-process') !== null) {
            return src;
        }
        if (isAliImg) {
            src = src.replace(/@.*/, "");
            if (src.match(/\?/) !== null) {
                src += '&';
            } else {
                src += '?';
            }
            src += `x-oss-process=image/resize,m_fill,h_${height},w_${width}`; //缩略图
        }
    } catch (e) {}

    return src;
}