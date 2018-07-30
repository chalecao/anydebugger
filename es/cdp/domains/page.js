'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.frameNavigated = frameNavigated;
exports.frameStartedLoading = frameStartedLoading;
exports.getResourceContent = getResourceContent;

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FRAME_ID_REGEXP = /frameId=(\d+\.\d+)/;

/**
 * Fired once navigation of the frame has completed. Frame is now associated with
 * the new loader.
 */
function frameNavigated(frameId, origin, url) {
    this.send({
        method: 'Page.frameNavigated',
        params: {
            frame: {
                id: frameId,
                loaderId: frameId + '0',
                mimeType: 'text/html',
                securityOrigin: origin,
                url: origin + url
            }
        }
    });
}

/**
 * trigger frameStartedLoading event once application was served by proxy
 */
function frameStartedLoading(headers) {
    var setCookieHeader = headers['set-cookie'];
    /**
     * response headers can be a string or string array
     */
    if (Array.isArray(setCookieHeader)) {
        setCookieHeader = setCookieHeader.join('');
    }

    /**
     * return if cookies aren't set
     */
    if (!setCookieHeader || !setCookieHeader.match(FRAME_ID_REGEXP)) {
        return;
    }

    var frameId = setCookieHeader.match(FRAME_ID_REGEXP)[1];
    this.send({
        method: 'Page.frameStartedLoading',
        params: { frameId: frameId }
    });
}

/**
 * Returns content of the given resource.
 *
 * @param {Number}  id      socket id
 * @param {Object}  params  parameter object containing requestId
 * @return                  response as base64 encoded
 */
function getResourceContent(_ref) {
    var _this = this;

    var id = _ref.id,
        params = _ref.params;

    var request = this.requestList.filter(function (req) {
        return req.fullUrl === params.url;
    })[0];

    if (!request) {
        return { 'error': 'Couldn\'t find request with id ' + params.frameId + ' and url ' + params.url };
    }

    /**
     * if request in not encoded return immediately
     */
    if (!(0, _utils.hasGzipEncoding)(request.request)) {
        return { content: request.chunks.join('') };
    }

    /**
     * images are not gzipped
     */
    if (request.type.toLowerCase() === 'image') {
        return this.send({
            id: id,
            result: {
                base64Encoded: true,
                content: Buffer.concat(request.chunks).toString('base64')
            }
        });
    }

    _zlib2.default.gunzip(Buffer.concat(request.chunks), function (err, body) {
        if (err) {
            return _this.log.error(err);
        }

        if (!body) {
            _this.log.error(new Error('Gzip decoding failed'));
            return;
        }

        return _this.send({
            id: id,
            result: {
                base64Encoded: false,
                body: body.toString()
            }
        });
    });
}