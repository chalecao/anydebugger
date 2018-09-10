'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = Logger;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * levels that are available from `npmlog`
 */
var NPM_LEVELS = ['silly', 'verbose', 'debug', 'info', 'http', 'warn', 'error'];

var globalLogFile = void 0;
var isLogging = Boolean(process.env.LOGGING_PATH);

/**
 * ensure log path exists
 */
if (process.env.LOGGING_PATH && !_fs2.default.existsSync(process.env.LOGGING_PATH)) {
    _npmlog2.default.info('Logger', 'logging path (' + process.env.LOGGING_PATH + ') doesn\'t exist');
    isLogging = false;
}

if (isLogging) {
    globalLogFile = _fs2.default.createWriteStream(_path2.default.resolve(process.env.LOGGING_PATH, _package2.default.name + '.log'));
}

_npmlog2.default.addLevel('debug', 4500, { fg: 'black', bg: 'white' }, 'debug');

var disableLog = false;

function Logger(component, debuglog) {
    if (debuglog == false) {
        disableLog = true;
    }
    var componentLogFile = void 0;
    var wrappedLogger = {};
    var prefix = _package2.default.name + (component ? ':' + component : '');

    /**
     * allow access to the level of the underlying logger
     */
    Object.defineProperty(wrappedLogger, 'level', {
        get: function get() {
            return _npmlog2.default.level;
        },
        set: function set(newValue) {
            _npmlog2.default.level = newValue;
        },
        enumerable: true,
        configurable: true
    });

    if (isLogging && component) {
        componentLogFile = _fs2.default.createWriteStream(_path2.default.resolve(process.env.LOGGING_PATH, _package2.default.name + '_' + component + '.log'));
    }

    /**
     * add all the levels from `npmlog`, and map to the underlying logger
     */

    var _loop = function _loop(level) {
        wrappedLogger[level] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _npmlog2.default[level].apply(_npmlog2.default, [prefix].concat(args));

            if (isLogging) {
                var logArgs = args.map(function (arg) {
                    return typeof arg === 'object' ? (0, _stringify2.default)(arg) : arg;
                });
                var logMessage = new Date() + ' ' + level.toUpperCase() + ' ' + (component ? component + ' ' : '') + logArgs.join(' ') + '\n';
                globalLogFile.write(logMessage);

                if (component) {
                    componentLogFile.write(logMessage);
                }
            }
        };
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(NPM_LEVELS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var level = _step.value;

            _loop(level);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        wrappedLogger.level = 'verbose';
    }

    wrappedLogger.levels = NPM_LEVELS;
    if (disableLog) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(NPM_LEVELS), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var level = _step2.value;

                wrappedLogger[level] = function () {};
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    return wrappedLogger;
}
module.exports = exports['default'];