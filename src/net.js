/**
 @description: description
 @date: 2018/4/8
 @author: 雷利(Rayleight@baie.com.cn)
 */
import Cookies from 'js-cookie'
import {
    Platform,
} from 'react-native'
import * as qs from "qs";


window.global=window.global||window

const TIMEOUT = 60 * 1000
const EMOJI_REPLACE_TEXT = "您输入了系统无法识别的表情字符，请更换"
const FETCH_ERROR_MAP = {
    'Network request failed': '网络未连接，请检查网络设置'
}

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params
 * @param noPre - 不判断error_code
 * @returns {Promise}
 */
export function R_GET(url, params = {}, noPre) {
    return _FETCH(url, params, 'GET', noPre)
}

/**
 * 基于 fetch 封装的 POST请求
 * @param url
 * @param data
 * @param noPre
 * @returns {Promise}
 */
export function R_POST(url, data = {}, noPre) {
    return _FETCH(url, data, "POST", noPre)
}

/**
 * fetch 封装
 * @param url
 * @param params
 * @param method
 * @param noPre - enum("v3",true)  v3:会更新服务器时间，true：直接resolve(response)
 * @returns {*}
 * @private
 */
function _FETCH(url, params = {}, method = 'GET', noPre = false) {
    if (!url) {
        return Promise.reject("请求地址为空")
    }
    
    //统一加上渠道接口
    let channelMarketingCode = global.__channelMarketingCode
    try {
        params.channelMarketingCode = channelMarketingCode
    } catch (e) {
        params = {channelMarketingCode}
    }
    
    //统一加上统计信息
    try {
        params.TRU = global.__userId || 0 //当前用户id
        params.TREF = global.__prevPageName || "init" //调用的页面之前页面
        params.TFROM = global.location.href
        
    } catch (e) {
    }
    
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject('网络请求超时，请检查网络设置')
        }, TIMEOUT)
        
        _fetch()
        
        
        if (global.token === "logout") {
            return reject("已退出登录")
        }
        
        function _fetch() {
            if (!params.token && (global.token && global.token.length && global.token!=="init" && global.token!==0)) {
                params.token = global.token
            }
            
            let requestBody =qs.stringify(params)
            
            let responseStatus = 200
            let fetch_url = url
            let fetch_param = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: requestBody
            }
            
            if (method === "GET") {
                if (fetch_url.search(/\?/) === -1) {
                    fetch_url += '?' + requestBody
                } else {
                    fetch_url += '&' + requestBody
                }
                fetch_param = {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            }
            fetch(fetch_url, fetch_param)
            .then((response) => {
                if (noPre === "v3") {
                    try {
                        global.__serverTime = response.headers.map.date[0]
                    } catch (e) {
                    
                    }
                }
                responseStatus = response.status
                return response.json()
            })
            .then((response) => {
                
                if (noPre) {
                    //不需要预处理，调用这个方法的地方自己判断
                    resolve(response)
                    return
                }
                if (response && response.error_code == 1) {
                    let _result = response
                    if (!response.data) {
                        //兼容mock 服务器 - 后面会去掉，所以调用的地方，都不要用 response.data.xxx 来获取，而应该使用response.xxx
                        _result = {
                            data: response,
                            ...response,
                        }
                    }
                    resolve(_result)
                } else if (response && response.error_code == "errors.nologin") {
                    //尝试通知redux token变成0了
                    global.token=0
                    try {
                        global.store.dispatch({
                            type: "SET_TOKEN",
                            token:0
                        })
                    }catch(e){
                    
                    }
                    reject(response.message)
                } else if (response && response.message) {
                    reject(response.message)
                } else {
                    reject('系统开小差了，请稍后再试或联系客服')
                }
            })
            .catch((err) => {
                if (noPre === "v3") {
                    try {
                        global.__serverTime = 0
                    } catch (e) {
                    
                    }
                }
                let errMsg = _parseErrorMsg(err, responseStatus)
                reject(errMsg)
            })
        }
        
    })
}

/**
 * 处理错误信息
 * @param err
 * @returns {*}
 * @private
 */
function _parseErrorMsg(err, status = 200) {
    let errText = err
    if (errText && errText.message) {
        errText = errText.message
    }
    if (FETCH_ERROR_MAP[errText]) {
        errText = FETCH_ERROR_MAP[errText]
    }
    
    if (errText && errText.match) {
        if (errText.match('Uncaught SyntaxError') != null) {
            errText = "系统开小差了，请稍后再试或联系客服"
        }
        if (errText.match('Unexpected token') != null) {
            errText = "系统开小差了，请稍后再试或联系客服"
        }
        if (errText.match('JSON Parse error') != null) {
            errText = "系统开小差了，请稍后再试或联系客服"
        }
        if (errText.match('timeout') != null) {
            errText = "系统开小差了，请稍后再试或联系客服"
        }
    }
    
    if (typeof errText === 'object') {
        errText = JSON.stringify(errText)
    }
    return errText
}