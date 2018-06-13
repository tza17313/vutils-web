'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layer = require('../layer/layer');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    show: function (text) {
        for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            props[_key - 1] = arguments[_key];
        }

        let options = {
            content: text || '错误',
            skin: 'msg',
            time: 2 //2秒后自动关闭
        };

        if (props.length > 0) {
            props.map(prop => {
                if (typeof prop === 'string' && prop === "LONG") {
                    options.time = 3.5;
                } else if (prop && prop.type) {
                    switch (prop.type) {
                        case "info":
                            options.showIcon = "info";
                            break;
                        case "error":
                            options.showIcon = "error";
                            break;
                        case "success":
                            options.showIcon = "success";
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        _layer2.default.open(options);
    },
    hide: () => {}
}; /**
    @description: 吐司Api 基于layer
    @date: 2018/3/9
    @author: Buggy(chenyuanhui@baie.com.cn)
    @warning: 修改吐司垂直定位的位子，需要修改layer.css文件的layui-m-layer-msg类中的bottom属性，
    属性值的大小为，相对垂直中心的值
    */