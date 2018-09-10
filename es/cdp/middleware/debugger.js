"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.getScriptSource = getScriptSource;
exports.setScriptSource = setScriptSource;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forward2client = "FORWARD"; /**
                                 * helper for Debugger.getScriptSource to return script content if script was fetched
                                 * from external source
                                 */
function getScriptSource(param) {
    var _this = this;

    this.mockscripts = this.mockscripts || {};
    return new _promise2.default(function (resolve, reject) {
        if (param.scriptId) {
            if (param.src) {
                if (!_this.mockscripts[param.scriptId]) {
                    _this.mockscripts[param.scriptId] = {};
                }
                // 客户端回传参数后，获取url 和 scriptId绑定，这样方便mock该条数据
                _this.mockscripts[param.scriptId].url = param.src;
                if (_this.mockscripts[param.scriptId].content) {
                    resolve(_this.mockscripts[param.scriptId].content);
                } else {
                    //服务端获取数据
                    (0, _request2.default)(param.src, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            _this.mockscripts[param.scriptId].content = body;
                            resolve({ scriptSource: body });
                        } else {
                            resolve({ scriptSource: "" });
                        }
                    });
                }
            } else {
                // 直接拦截浏览器的请求，修改js脚本后在这里缓存
                if (_this.mockscripts[param.scriptId]) {
                    resolve({ scriptSource: _this.mockscripts[param.scriptId].content });
                } else {
                    resolve(forward2client);
                }
            }
        }
    });
}

function setScriptSource(_ref) {
    var scriptId = _ref.scriptId,
        scriptSource = _ref.scriptSource;

    this.mockscripts = this.mockscripts || {};
    if (scriptId) {
        this.mockscripts[scriptId] = this.mockscripts[scriptId] || {};
        this.mockscripts[scriptId].content = scriptSource;
    }
    return {};
}