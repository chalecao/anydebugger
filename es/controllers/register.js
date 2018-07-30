"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cdp = require("../cdp");

var _cdp2 = _interopRequireDefault(_cdp);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    'OPTIONS /register': function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            (0, _utils.handleCORS)(ctx);
                            ctx.body = "";

                        case 2:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function OPTIONSRegister(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),
    'POST /register': function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            (0, _utils.handleCORS)(ctx);
                            ctx.set('Surrogate-Control', 'no-store');
                            ctx.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            ctx.set('Pragma', 'no-cache');
                            ctx.set('Expires', '0');
                            _cdp2.default.getInstance().addPage(ctx.request.body);
                            ctx.body = "{msg:'register page success', code: 1}";

                        case 7:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function POSTRegister(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }(),
    'GET /json': function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
            var cdpServer;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            (0, _utils.handleCORS)(ctx);
                            ctx.set('Content-Type', 'application/json;charset=utf-8');
                            cdpServer = _cdp2.default.getInstance();

                            ctx.body = (0, _stringify2.default)(cdpServer.pages.map(function (page) {
                                var devtoolsPath = page.hostname + "/inspect/" + page.uuid;
                                var title = page.title || (0, _utils.getDomain)(page.url);
                                return {
                                    description: page.description,
                                    devtoolsFrontendUrl: "http://chrome-devtools-frontend.appspot.com/serve_rev/@a000f5daeaac3f79102a0c8f6eaab57aa0e00ae9/inspector.html?ws=" + devtoolsPath,
                                    localDevtoolsFrontendUrl: "http://" + page.hostname + "/app/inspector.html?ws=" + devtoolsPath,
                                    title: title,
                                    type: 'page',
                                    url: page.url.href,
                                    metadata: page.metadata,
                                    webSocketDebuggerUrl: "ws://" + devtoolsPath
                                };
                            }), null, 2);

                        case 4:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function GETJson(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }()
};
module.exports = exports["default"];