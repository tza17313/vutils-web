"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveItem = saveItem;
exports.getItem = getItem;
exports.removeItem = removeItem;
exports.clearAllItem = clearAllItem;

var _jsCookie = require("js-cookie");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 保存数据
 * @param key
 * @param string
 * @returns {Promise}
 */
function saveItem(key, string) {
    return new Promise(function (resolve, reject) {
        if (typeof string === "object") {
            string = JSON.stringify(string);
        }
        try {
            localStorage.setItem(key, string);
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

/**
 * 读取数据
 * @param key
 * @param isDecode - 是否需要解密
 * @returns {Promise}
 */
/**
 @description: 数据持续存储
 @date: 2016-9-23
 @author: Rayleigh(Rayleigh@Nero-zou.com)
 */
function getItem(key, isDecode) {
    return new Promise(function (resolve, reject) {
        try {
            let data = localStorage.getItem(key);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * 删除数据
 * @param key
 * @returns {Promise}
 */
function removeItem(key) {
    if (key === "LOGIN_INFO") {
        _jsCookie2.default.remove('TokenSign');
    }
    return new Promise(function (resolve, reject) {
        if (key instanceof Array) {
            key.forEach(i => {
                localStorage.removeItem(i);
            });
        } else {
            localStorage.removeItem(key);
        }
        resolve();
    });
}

/**
 * 清空数据
 * @returns {Promise}
 */
function clearAllItem() {
    return new Promise(function (resolve, reject) {
        localStorage.clear();
        resolve();
    });
}