'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _mimeDb = require('mime-db');

var _mimeDb2 = _interopRequireDefault(_mimeDb);

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = function () {
    function Request(req) {
        (0, _classCallCheck3.default)(this, Request);

        this.req = req;
        this.log = (0, _logger2.default)('Request');

        this.origin = req.protocol + '://' + req.headers.host;
        this.fullUrl = this.origin + req.url;
        this.documentURL = req.cookies.requestIdHost || this.fullUrl;
        this.requestId = req.cookies.requestId;
        this.frameId = req.cookies.frameId;
        this.loaderId = req.cookies.frameId + '0';
        this.request = {
            headers: req.headers,
            /**
             * initial page request have VeryHigh initial priority
             */
            initialPriority: this.requestId.slice(-2) === '.100' ? 'VeryHigh' : 'Medium',
            method: req.method,
            mixedContentType: 'none',
            postData: (0, _stringify2.default)(req.body),
            url: this.fullUrl
        };
        this.wallTime = new Date().getTime() / 1000;
        this.requestBodySize = 0;
        this.mimeType = this.getMimeType(req);
        this.chunks = [];
        this.responseHeaders = {
            'content-type': ''
        };
    }

    (0, _createClass3.default)(Request, [{
        key: 'getMimeType',
        value: function getMimeType(req) {
            var mimeLookup = _mimeTypes2.default.lookup(req.url);

            if (mimeLookup) {
                return mimeLookup;
            }

            if (typeof req.headers.accept === 'string') {
                var acceptedMimeTypes = req.headers.accept.split(',').filter(function (mimeType) {
                    return Boolean(_mimeDb2.default[mimeType]);
                });

                /**
                 * return first valid mime type from accept header
                 */
                if (acceptedMimeTypes.length) {
                    return acceptedMimeTypes[0];
                }
            }

            /**
             * return application/octet-stream as unkown mime type
             */
            return 'application/octet-stream';
        }
    }, {
        key: 'requestWillBeSent',
        value: function requestWillBeSent() {
            var documentURL = this.documentURL,
                request = this.request,
                wallTime = this.wallTime,
                timestamp = this.timestamp,
                requestId = this.requestId,
                frameId = this.frameId,
                loaderId = this.loaderId,
                type = this.type;

            var initiator = { type: 'other'

                /**
                 * if request id doesn't end with '.1' it is a subsequent request
                 * and therefor the initiator is defined in the requestIdHost cookie
                 */
            };if (requestId.slice(-2) !== '.1') {
                initiator = {
                    lineNumber: 0,
                    type: 'parser',
                    url: documentURL
                };
            }

            return (0, _assign2.default)({}, {
                documentURL: documentURL,
                frameId: frameId,
                requestId: requestId,
                loaderId: loaderId,
                initiator: initiator,
                request: request,
                wallTime: wallTime,
                timestamp: timestamp,
                type: type
            });
        }
    }, {
        key: 'requestServedFromCache',
        value: function requestServedFromCache() {
            return { requestId: this.requestId };
        }
    }, {
        key: 'dataReceived',
        value: function dataReceived(chunk) {
            var encodedData = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : chunk;
            this.requestBodySize += encodedData.length;
            this.chunks.push(chunk);

            return {
                requestId: this.requestId,
                dataLength: chunk.length,
                encodedDataLength: encodedData.length,
                timestamp: this.timestamp
            };
        }
    }, {
        key: 'responseReceived',
        value: function responseReceived(response) {
            this.responseHeaders = response.headers;

            /**
             * update mime type
             */
            this.mimeType = response.headers['content-type'].split(';')[0];

            return {
                frameId: this.frameId,
                loaderId: this.loaderId,
                requestId: this.requestId,
                timestamp: this.timestamp,
                type: this.type,
                response: {
                    requestHeaders: this.request.headers,
                    headers: response.headers,
                    status: response.statusCode,
                    statusText: 'OK',
                    mimeType: this.mimeType,
                    rotocol: 'http/1.1',
                    url: this.request.url,
                    fromDiskCache: false,
                    fromServiceWorker: false,
                    encodedDataLength: this.requestBodySize
                }
            };
        }
    }, {
        key: 'loadingFinished',
        value: function loadingFinished() {
            return {
                encodedDataLength: this.requestBodySize,
                requestId: this.requestId,
                timestamp: this.timestamp
            };
        }
    }, {
        key: 'loadingFailed',
        value: function loadingFailed(error) {
            return {
                requestId: this.requestId,
                timestamp: this.timestamp,
                type: this.type,
                errorText: error.message,
                canceled: false
            };
        }
    }, {
        key: 'type',
        get: function get() {
            if (this.req.url.match(/\.(png|jpg|jpeg|gif)$/i) || this.responseHeaders['content-type'].match(/^image\//)) return 'Image';

            if (this.req.url.match(/\.js/i) || this.responseHeaders['content-type'] === 'application/javascript') return 'Script';

            if (this.req.url.match(/\.css/i) || this.responseHeaders['content-type'] === 'text/css') return 'Stylesheet';

            if (this.req.url.match(/\.(html|php)/i) || _path2.default.extname(this.req.url) === '' || this.responseHeaders['content-type'].match(/^application\/.*(hbbtv|html)+.*/g)) return 'Document';

            if (this.req.url.match(/\.(mp4|mp3|flv|wav)/i)) return 'Media';
            if (this.req.url.match(/\.(ttf|otf|woff|woff2)/i)) return 'Font';
            if (this.req.get('Upgrade') && this.req.get('Upgrade').match(/websocket/i)) return 'WebSocket';

            return 'Other';
        }
    }, {
        key: 'timestamp',
        get: function get() {
            return (new Date().getTime() - this.wallTime) / 1000;
        }
    }]);
    return Request;
}();

exports.default = Request;
module.exports = exports['default'];