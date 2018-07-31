'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = staticFiles;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function staticFiles(url, dir) {
    var _this = this;

    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var rpath, fp;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            rpath = ctx.request.path;

                            if (!rpath.startsWith(url)) {
                                _context.next = 16;
                                break;
                            }

                            fp = __dirname + dir + rpath.substring(url.length);

                            console.log(fp);
                            _context.next = 6;
                            return _fs2.default.exists(fp);

                        case 6:
                            if (!_context.sent) {
                                _context.next = 13;
                                break;
                            }

                            ctx.response.type = _mime2.default.lookup(rpath);
                            _context.next = 10;
                            return _fs2.default.readFile(fp);

                        case 10:
                            ctx.response.body = _context.sent;
                            _context.next = 14;
                            break;

                        case 13:
                            ctx.response.status = 404;

                        case 14:
                            _context.next = 18;
                            break;

                        case 16:
                            _context.next = 18;
                            return next();

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}
module.exports = exports['default'];