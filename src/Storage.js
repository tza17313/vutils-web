/**
 @description: 数据持续存储
 @date: 2016-9-23
 @author: Rayleigh(Rayleigh@Nero-zou.com)
 */
import Cookies from 'js-cookie'

/**
 * 保存数据
 * @param key
 * @param string
 * @returns {Promise}
 */
export function saveItem(key, string) {
    return new Promise(function (resolve, reject) {
        if (typeof string === "object") {
            string = JSON.stringify(string)
        }
        try{
            localStorage.setItem(key, string)
            resolve()
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}

/**
 * 读取数据
 * @param key
 * @param isDecode - 是否需要解密
 * @returns {Promise}
 */
export function getItem(key, isDecode) {
    return new Promise(function (resolve, reject) {
        try{
            let data=localStorage.getItem(key)
            resolve(data)
        }catch(e){
            reject(e)
        }
    })
}

/**
 * 删除数据
 * @param key
 * @returns {Promise}
 */
export function removeItem(key) {
    if(key==="LOGIN_INFO"){
        Cookies.remove('TokenSign')
    }
    return new Promise(function (resolve, reject) {
        if (key instanceof Array) {
            key.forEach((i)=>{
                localStorage.removeItem(i)
            })
        }else{
            localStorage.removeItem(key)
        }
        resolve()
    })
   
}

/**
 * 清空数据
 * @returns {Promise}
 */
export function clearAllItem() {
    return new Promise(function (resolve, reject) {
        localStorage.clear()
        resolve()
    })
}