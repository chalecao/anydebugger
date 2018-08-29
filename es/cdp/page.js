'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _domains = require('./domains');

var _domains2 = _interopRequireDefault(_domains);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVER_DOMAINS = ['Network', 'Log', 'Webdriver'];
var DISABLE_DOMAINS = ['Memory', 'Security', 'Performance', 'Audits'];

/**
 * Page model
 * ==========
 *
 * Manages connection between: Device  <--> Devtools backend <--> Devtools frontend. Each
 * page can be identified by an UUID where ids between device and devtools backend might
 * change over time due to page reloads.
 *
 * Device <--> Devtools backend connection:
 * Handled by a socket.io connection (for compatibility issues)
 *
 * Devtools backend <--> Devtools frontend
 * Handles by a standard socket connection (WS).
 */

var Page = function (_EventEmitter) {
    (0, _inherits3.default)(Page, _EventEmitter);

    /**
     *
     * @param {*} io :socket io instance
     * @param {*} uuid :uuid mark one page
     * @param {*} hostname :socket server host and port, host:port
     * @param {*} url :the page url
     * @param {*} title :the page title
     * @param {*} description
     * @param {*} metadata
     */
    function Page(io, uuid, hostname, url, title, description, metadata, connectcb) {
        (0, _classCallCheck3.default)(this, Page);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this));

        _this.uuid = uuid;
        _this.hostname = hostname || 'localhost:9222';
        _this.url = url;
        _this.title = title;
        _this.description = description;
        _this.metadata = metadata;
        _this.requestList = [];

        _this.log = (0, _logger2.default)('Page');
        _this.isConnectedToDevtoolsFrontend = false;
        _this.domains = [];
        _this.buffer = [];
        _this.bufferSocket = [];
        _this.cssContent = [];

        // switch channel for web inspector client connect
        _this.io = io.of('/page/' + _this.uuid);
        _this.io.on('connection', _this.connect.bind(_this));

        _this.wss = new _ws2.default.Server({
            perMessageDeflate: false,
            noServer: true
        });

        _this.connectcb = connectcb;
        return _this;
    }
    /**
     * Connect to web-inspector-client 
     */


    (0, _createClass3.default)(Page, [{
        key: 'connect',
        value: function connect(socket) {
            var _this2 = this;

            this.log.warn('Connected by web-inspector-client with page id ' + this.uuid);
            // emit /json to show in page
            this.connectcb();

            this.socket = socket;
            this.socket.on('result', this.send.bind(this));
            this.socket.on('connection', function (msg) {
                _this2.isConnectedToDevice = true;
                _this2.connectedTime = Date.now();

                _this2.enable(msg.supportedDomains.concat(SERVER_DOMAINS));
                _this2.disable(DISABLE_DOMAINS);
                _this2.log.warn('web-inspector-client connection: ' + msg.status + ',\n' + ('supported domains: ' + _this2.domains.join(',')));

                _this2.metadata = msg.info.metadata;
                _this2.title = msg.info.title;
                _this2.description = msg.info.description;
                _this2.frameId = msg.info.frameId;

                /**
                 * only update url if domain has changed and not e.g. host
                 */
                var newUrl = _url2.default.parse(msg.info.url);
                if ((0, _utils.getDomain)(_this2.url) !== (0, _utils.getDomain)(newUrl)) {
                    _this2.url = newUrl;
                }

                /**
                 * clear timeout when connection got disconnected
                 */
                if (_this2.disconnectTimeout) {
                    clearTimeout(_this2.disconnectTimeout);
                }
            });
            this.socket.on('disconnect', this.disconnect.bind(this));
            this.socket.on('debug', function (msg) {
                return _this2.log.http('debug web inspector client: ' + msg);
            });
            if (this.bufferSocket.length) {
                this.flushBufferSocket();
            }
        }

        /**
         * Disconnect from device
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            var _this3 = this;

            this.log.warn('Disconnected from page ' + this.uuid);
            this.isConnectedToDevice = false;

            /**
             * clear execution context
             */
            this.send({ method: 'Runtime.executionContextDestroyed', params: { executionContextId: 1 } });
            this.send({ method: 'Runtime.executionContextsCleared', params: {} });

            /**
             * disconnect from devtools frontend if connection was lost for more than 30s
             */
            this.disconnectTimeout = setTimeout(function () {
                if (_this3.isConnectedToDevice) {
                    // page reconnected (e.g. on page load)
                    return;
                }

                _this3.log.debug('Removing page with uuid ' + _this3.uuid);
                _this3.send({ method: 'Inspector.detached', params: { reason: 'Render process gone.' } });
                _this3.send({ method: 'Inspector.detached', params: { reason: 'target_close' } });
                _this3.isConnectedToDevice = false;

                /**
                 * remove all listeners
                 */
                _this3.io.removeAllListeners();
                // delete this.socket
                // delete this.ws
                // this.buffer = []

                return _this3.emit('disconnect', _this3.uuid);
            }, 10000);
        }

        /**
         * Connect to devtools frontend
         */

    }, {
        key: 'connectWebSocket',
        value: function connectWebSocket(ws) {
            var _this4 = this;

            this.log.warn('Connected to Chrome Devtools page ' + this.uuid);
            this.ws = ws;
            this.ws.on('message', this.handleIncomming.bind(this));
            this.ws.on('open', function () {
                return _this4.isConnectedToDevtoolsFrontend = true;
            });
            this.ws.on('close', this.disconnectWebSocket.bind(this));

            /**
             * send events that were missed by Chrome Devtools
             */
            this.flushMsgBuffer();
        }

        /**
         * Disconnect from devtools frontend
         */

    }, {
        key: 'disconnectWebSocket',
        value: function disconnectWebSocket() {
            this.isConnectedToDevtoolsFrontend = false;
            this.log.debug('Disconnect from devtools-frontend page ' + this.uuid);
            delete this.ws;
        }

        /**
         * enable domain for page
         *
         * @param {String|String[]} domain  domain(s) to enable
         */

    }, {
        key: 'enable',
        value: function enable(domain) {
            var _this5 = this;

            if (Array.isArray(domain)) {
                return domain.forEach(function (domain) {
                    return _this5.enable(domain);
                });
            }

            this.emit('domainEnabled', domain);

            if (this.domains.includes(domain)) {
                return this.log.info('Domain "' + domain + '" already enabled for page ' + this.uuid);
            }

            this.log.info('Enable domain ' + domain + ' for page ' + this.uuid);
            this.domains.push(domain);
        }

        /**
         * disable domain for page
         */

    }, {
        key: 'disable',
        value: function disable(domain) {
            var _this6 = this;

            if (Array.isArray(domain)) {
                return domain.forEach(function (domain) {
                    return _this6.disable(domain);
                });
            }
            this.log.info('Disable domain ' + domain + ' for page ' + this.uuid);
            var pos = this.domains.indexOf(domain);
            pos > 0 && this.domains.splice(pos, pos + 1);
            this.emit('domainDisabled', domain);
        }

        /**
         * check if domain is currently supported/enabled
         * Usage:
         *  - isDomainSupported({ method: 'Network.loadingFinished', params: { ... }})
         *  - isDomainSupported('Network')
         *
         * @param   [Object|String] msg  either:
         *                                 - a WS message like first example above or
         *                                 - string if you want to specify the domain directly
         * @returns [Boolean]            true if the specified domain is supported/enabled
         */

    }, {
        key: 'isDomainSupported',
        value: function isDomainSupported(msg) {
            if (typeof msg === 'string') {
                return this.domains.includes(msg);
            }

            var method = msg.method || '';
            var splitPoint = method.indexOf('.');
            return this.domains.includes(method.slice(0, splitPoint));
        }

        /**
         * Handle incomming debugger request.
         * Incomming can be either (but mostly) messages from the devtools app directly
         * or from other parts of the app (e.g. proxy)
         *
         * @param {Object|String} payload  message with command and params
         */

    }, {
        key: 'handleIncomming',
        value: function handleIncomming(payload) {

            var msg = typeof payload === 'string' ? JSON.parse(payload) : payload;
            var splitPoint = msg.method.indexOf('.');
            var domain = msg.method.slice(0, splitPoint);
            var method = msg.method.slice(splitPoint + 1);

            /**
             * enable domain agent
             */
            if (method === 'enable') {
                if (this.isDomainSupported(domain)) {
                    this.enable(domain);
                    return this.send({ id: msg.id, params: {} });
                } else {
                    this.disable(domain);
                    return this.send({ id: msg.id, method: domain + '.disable', params: { "enabled": false } });
                }
            }

            /**
             * disable domain agent
             */
            if (method === 'disable') {
                this.disable(domain);
                return this.send({ id: msg.id, params: {} });
            }

            /**
             * don't propagate domains that are not supported or disabled
             */
            if (!this.isDomainSupported(msg)) {
                return;
            }
            this.log.warn("Chrome DevTools msg: " + (0, _stringify2.default)(msg).slice(0, 100));
            this.emit('incomming', { method: method, domain: domain, msg: msg });
        }
    }, {
        key: 'flushMsgBuffer',
        value: function flushMsgBuffer() {
            var _this7 = this;

            if (this.ws) {
                this.buffer.forEach(function (bufferMsg) {
                    return _this7.send(bufferMsg, false);
                });
            }

            this.buffer = [];
        }

        /**
         * emits payload to devtools frontend
         * @param  {Object} msg  payload to send
         */

    }, {
        key: 'send',
        value: function send(msg) {
            var _this8 = this;

            var flushBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!this.ws) {
                this.log.http('Buffer debugger message: ' + (0, _stringify2.default)(msg).slice(0, 100));
                this.buffer.push(msg);
                return;
            }

            /**
             * check if buffer contains unsend messages
             */
            if (flushBuffer && this.buffer.length) {
                this.flushMsgBuffer();
                return process.nextTick(function () {
                    return _this8.send(msg, false);
                });
            }

            /**
             * check for server side domain handlers
             */
            if (_middleware2.default[msg._domain] && _middleware2.default[msg._domain][msg._method]) {
                this.log.warn('message from web-inspector-client to middleware handle to ws: ' + msg._domain + '.' + msg._method);
                // middleware[msg._domain][msg._method].call(this, msg.result)
                var result = _middleware2.default[msg._domain][msg._method].call(this, msg.result, this.requestList);
                if (result) {
                    return this.send({ id: msg.id, result: result });
                }
            }

            delete msg._domain;
            delete msg._method;

            var msgString = (0, _stringify2.default)(msg);
            this.log.debug('message from web-inspector-client to ws: ' + msgString.slice(0, 1000));

            /**
             * broadcast to clients that have open socket connection
             */
            if (this.ws.readyState !== _ws2.default.OPEN) {
                return;
            }

            return this.ws.send(msgString);
        }

        /**
         * trigger event to happen on device, send msg to web inspector client
         */

    }, {
        key: 'trigger',
        value: function trigger(domain) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!this.socket) {
                this.bufferSocket.push({
                    domain: domain, params: params
                });
                this.log.error('no socket found to trigger event, buffer msg');
                return;
            }

            this.socket.emit(domain, params);
        }
    }, {
        key: 'flushBufferSocket',
        value: function flushBufferSocket() {
            var _this9 = this;

            this.bufferSocket.forEach(function (msg) {
                _this9.socket.emit(msg.domain, msg.params);
            });
            this.bufferSocket = [];
        }

        /**
         * trigger page load events (set frameId to 1.0 if none given and proxy is not active)
         */

    }, {
        key: 'frameStartedLoading',
        value: function frameStartedLoading(targetUrl) {
            var frameId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1.0';

            if (!targetUrl && !this.url) {
                return;
            }

            _domains2.default.Page.frameStartedLoading.call(this, { 'set-cookie': ['frameId=' + frameId] }); // emulate page load
            this.url = _url2.default.parse(this.url || targetUrl); // update url
        }

        /**
         * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
         */

    }, {
        key: 'frameNavigated',
        value: function frameNavigated(targetUrl, frameId) {
            var id = frameId.split('.')[0];
            var parsedUrl = _url2.default.parse(targetUrl || this.url);
            _domains2.default.Page.frameNavigated.call(this, id, parsedUrl.protocol + '//' + parsedUrl.host, parsedUrl.path);
        }
    }, {
        key: 'connectionDuration',
        get: function get() {
            if (!this.isConnectedToDevice) {
                return 0;
            }

            return Date.now() - this.connectedTime;
        }
    }]);
    return Page;
}(_events2.default);

exports.default = Page;
module.exports = exports['default'];