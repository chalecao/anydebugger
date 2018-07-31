'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = createApp;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _templating = require('./templating');

var _templating2 = _interopRequireDefault(_templating);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _index = require('./cdp/index');

var _index2 = _interopRequireDefault(_index);

var _bopen = require('bopen');

var _bopen2 = _interopRequireDefault(_bopen);

var _staticFiles = require('./static-files');

var _staticFiles2 = _interopRequireDefault(_staticFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createApp(port) {
    var _this = this;

    var app = new _koa2.default();
    var log = (0, _logger2.default)();
    var isProduction = process.env.NODE_ENV === 'production';

    // log request URL:
    app.use(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var start, execTime;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            log.info('Process ' + ctx.request.method + ' ' + ctx.request.url + '...');
                            start = new Date().getTime();
                            _context.next = 4;
                            return next();

                        case 4:
                            execTime = new Date().getTime() - start;
                            ctx.response.set('X-Response-Time', execTime + 'ms');

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    app.use((0, _staticFiles2.default)('/app/', "/node_modules/chrome-devtools-frontend/front_end/"));
    app.use((0, _staticFiles2.default)('/static/', "/static/"));

    // parse request body:
    app.use((0, _koaBodyparser2.default)());

    // add nunjucks as view:
    app.use((0, _templating2.default)('views', {
        noCache: !isProduction,
        watch: !isProduction
    }));

    // add controller:
    app.use((0, _controller2.default)());

    var server = _http2.default.createServer(app.callback());

    /**
     * initialise socket.io server
     * this connection manages web socket traffic between web-inspector-client and server
     */
    var ioServer = (0, _socket2.default)(server, { origins: '*:*' });
    ioServer.on('connection', function (socket) {
        socket.on('log', function (args) {
            return console.log.apply(console, args);
        }); // dev debugging only
        socket.on('error:injectScript', function (e) {
            return log.error(e);
        });
    });

    /**
     * initialise Websocket Server
     * this connection mainly manages web socket traffic between Chrome Devtools and server
     */
    var cdp = _index2.default.init(ioServer);
    server.on('upgrade', cdp.upgradeWssSocket.bind(cdp));

    server.listen(port);
    log.info('app started at port ' + port + '...');
    // Open URL in default browser
    (0, _bopen2.default)('http://127.0.0.1:' + port);
}
// static file support:
module.exports = exports['default'];