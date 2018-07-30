'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getResponseBodyData = getResponseBodyData;
exports.getResponseBody = getResponseBody;

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getResponseBodyData(_ref) {
    var _this = this;

    var id = _ref.id,
        params = _ref.params;

    var request = this.requestList.filter(function (req) {
        return req.requestId === params.requestId;
    })[0];

    if (!request) {
        return _promise2.default.reject(new Error('Couldn\'t find request with id ' + params.requestId));
    }

    /**
     * if request in not encoded return immediately
     */
    if (!(0, _utils.hasGzipEncoding)(request.request)) {
        return _promise2.default.resolve({
            id: id,
            result: {
                base64Encoded: false,
                body: request.chunks.join('')
            }
        });
    }

    /**
     * images are not gzipped
     */
    if (request.type.toLowerCase() === 'image') {
        return _promise2.default.resolve({
            id: id,
            result: {
                base64Encoded: true,
                body: Buffer.concat(request.chunks).toString('base64')
            }
        });
    }

    return new _promise2.default(function (resolve, reject) {
        return _zlib2.default.gunzip(Buffer.concat(request.chunks), function (err, body) {
            if (err) {
                /**
                 * return as if not encoded
                 * some JS files have accept-encoding: gzip, deflate but are not
                 * actually gzipped
                 */
                return resolve({
                    id: id,
                    result: {
                        base64Encoded: false,
                        body: request.chunks.join('')
                    }
                });
            }

            if (!body) {
                var gzipError = new Error('Gzip decoding failed');
                _this.log.error(gzipError);
                return reject(gzipError);
            }

            return resolve({
                id: id,
                result: {
                    base64Encoded: false,
                    body: body.toString()
                }
            });
        });
    });
}

/**
 * Returns content served for the given request.
 *
 * @param {Number}  id      socket id
 * @param {Object}  params  parameter object containing requestId
 * @return                  response as base64 encoded
 */
function getResponseBody() {
    var _this2 = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    getResponseBodyData.apply(this, args).then(function (data) {
        return _this2.send(data);
    }, function (e) {
        return _this2.log.error(e);
    });
}