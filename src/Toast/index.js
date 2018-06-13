/**
 @description: 吐司Api 基于layer
 @date: 2018/3/9
 @author: Buggy(chenyuanhui@baie.com.cn)
 @warning: 修改吐司垂直定位的位子，需要修改layer.css文件的layui-m-layer-msg类中的bottom属性，
 属性值的大小为，相对垂直中心的值
 */
import layer from "../layer/layer"

export default {
    show:(text,...props)=>{
        let options={
            content: text || '错误'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        }

        if(props.length>0){
            props.map((prop)=>{
               if(typeof prop === 'string'&& prop==="LONG"){
                   options.time=3.5
               }else if(prop && prop.type){
                   switch(prop.type){
                       case "info":options.showIcon="info"
                           break
                       case "error":options.showIcon="error"
                           break
                       case "success":options.showIcon="success"
                           break
                       default:
                           break
                   }
               }
            })
        }

        layer.open(options);
    },
    hide:()=>{}
};
