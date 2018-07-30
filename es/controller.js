'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dir) {
    var controllers_dir = dir || 'controllers',
        router = (0, _koaRouter2.default)();
    addControllers(router, controllers_dir);
    return router.routes();
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _logger2.default)("controller").info;
// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            log('register URL mapping: GET ' + path);
        } else if (url.startsWith('OPTIONS ')) {
            var path = url.substring(8);
            router.options(path, mapping[url]);
            log('register URL mapping: OPTIONS ' + path);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            log('register URL mapping: POST ' + path);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            log('register URL mapping: PUT ' + path);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            log('register URL mapping: DELETE ' + path);
        } else {
            log('invalid URL: ' + url);
        }
    }
}

function addControllers(router, dir) {
    _fs2.default.readdirSync(__dirname + '/' + dir).filter(function (f) {
        return f.endsWith('.js');
    }).forEach(function (f) {
        log('process controller: ' + f + '...');
        var mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

;
module.exports = exports['default'];