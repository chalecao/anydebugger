'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasGzipEncoding = hasGzipEncoding;
exports.getDomain = getDomain;
exports.getFullUrl = getFullUrl;
exports.readConfig = readConfig;
exports.getRequestOpts = getRequestOpts;
exports.getIpAddress = getIpAddress;
exports.handleCORS = handleCORS;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG_FILE_PATH = _path2.default.resolve(__dirname, '..', 'config.json');

function hasGzipEncoding(req) {
    return Boolean(typeof req.headers['accept-encoding'] === 'string' && req.headers['accept-encoding'].includes('gzip'));
}

function getDomain(url) {
    return url.host.split('.').slice(-2).join('.');
}

function getFullUrl(req, page) {
    var target = req.originalUrl;

    if (!target.startsWith('/')) {
        return target;
    }

    return req.protocol + '://' + req.get('host') + target;
}

function readConfig() {
    var config = { data: {} };

    try {
        config = JSON.parse(_fs2.default.readFileSync(CONFIG_FILE_PATH));
    } catch (e) {}

    return config;
}

function getRequestOpts(req) {
    delete req.headers['if-modified-since'];
    delete req.headers['if-none-match'];
    var opts = {
        url: req.target,
        headers: req.headers,
        method: req.method,
        time: true,
        resolveWithFullResponse: true
    };

    if (req.method.toLowerCase() === 'post' && req.body) {
        opts.json = req.body;
    }

    return opts;
}

function getIpAddress(iface) {
    var family = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ipv4';

    var interfaces = _os2.default.networkInterfaces();

    /**
     * check if interface can be found
     */
    if (!interfaces[iface]) {
        return null;
    }

    return interfaces[iface].filter(function (conn) {
        return conn.family.toLowerCase() === family;
    })[0].address;
}

function handleCORS(ctx) {
    ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin || "*");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 86400000);
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
}