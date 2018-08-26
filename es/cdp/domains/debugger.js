"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScriptSource = getScriptSource;
exports.setScriptSource = setScriptSource;
/**
 * helper for Debugger.getScriptSource to return script content if script was fetched
 * from external source
 */
var forward2client = "FORWARD";
function getScriptSource(param) {
    this.mockscripts = this.mockscripts || {};
    if (param.scriptId) {
        if (param.src) {
            if (!this.mockscripts[param.scriptId]) {
                this.mockscripts[param.scriptId] = {};
            }
            // 客户端回传参数后，获取url 和 scriptId绑定，这样方便mock该条数据
            this.mockscripts[param.scriptId].url = param.src;
            return null;
        } else {
            // 直接拦截浏览器的请求，修改js脚本后在这里缓存
            if (this.mockscripts[param.scriptId] && this.mockscripts[param.scriptId].content) {
                return { scriptSource: this.mockscripts[param.scriptId].content };
            } else {
                return forward2client;
            }
        }
    }
}

function setScriptSource(_ref) {
    var scriptId = _ref.scriptId,
        scriptSource = _ref.scriptSource;

    this.mockscripts = this.mockscripts || {};
    if (scriptId && scriptSource) {
        this.mockscripts[scriptId] = this.mockscripts[scriptId] || {};
        this.mockscripts[scriptId].content = scriptSource;
    }
    return {};
}