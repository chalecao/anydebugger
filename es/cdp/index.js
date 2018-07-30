'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _domains = require('./domains');

var _domains2 = _interopRequireDefault(_domains);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CDP Contains the actual devtools backend logic. It manages devtools pages and analyses network
 * connection if it is run by a proxy.
 */
var CDPServer = function () {
    function CDPServer(io) {
        (0, _classCallCheck3.default)(this, CDPServer);

        this.io = io;
        this.log = (0, _logger2.default)('CDP Server');
        this.pages = [];
    }

    //web socket protocol, when server setUp, the web-inspector-client will connect and establish a ws connect


    (0, _createClass3.default)(CDPServer, [{
        key: 'upgradeWssSocket',
        value: function upgradeWssSocket(req, socket, head) {
            var pathname = _url2.default.parse(req.url).pathname;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var page = _step.value;

                    if (pathname === '/inspect/' + page.uuid) {
                        this.log.warn("handle chrome devTools upgradeWssSocket... from " + req.url);
                        return page.wss.handleUpgrade(req, socket, head, page.connectWebSocket.bind(page));
                    }
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

            socket.destroy();
        }
        // exec when register page by web inspector page

    }, {
        key: 'addPage',
        value: function addPage(params) {
            var _this = this;

            var page = void 0;
            var registeredPage = this.pages.find(function (page) {
                return page.uuid === params.uuid;
            });

            if (!registeredPage) {
                this.log.info('Create a new page with uuid "' + params.uuid + '"');

                page = new _page2.default(this.io, params.uuid, params.hostname, _url2.default.parse(params.url), params.title, params.description, params.metadata);
                this.pages.push(page);

                /**
                 * remove page if disconnected from devtools frontend
                 */
                page.on('disconnect', this.removePage.bind(this));
                page.on('domainEnabled', function (domain) {
                    return _this.domainEnabled(page, domain);
                });
                page.on('domainDisabled', function (domain) {
                    return _this.domainDisabled(page, domain);
                });
                page.on('incomming', function (params) {
                    return _this.handleIncomming(page, params);
                });
            } else {
                this.log.info('Page with uuid "' + params.uuid + '" already exists');
                page = registeredPage;
            }

            /**
             * clear css cache
             */
            page.cssContent = [];

            page.frameStartedLoading();
            return page;
        }
    }, {
        key: 'removePage',
        value: function removePage(uuid) {
            var deletedPages = this.pages.splice(this.pages.findIndex(function (page) {
                return page.uuid === uuid;
            }), 1);

            /**
             * clear page so that listeners get removed
             */
            for (var i = 0; i < deletedPages.length; ++i) {
                delete deletedPages[i];
            }
        }
    }, {
        key: 'domainEnabled',
        value: function domainEnabled(page, domain) {
            /**
             * trigger events in case the dev tool was refreshed
             * (these are normally triggered on page load but in case of
             * a refresh we can emit them here)
             */
            if (domain.toLowerCase() === 'debugger') {
                page.trigger(domain, { method: 'scriptParsed' });
            }

            if (domain.toLowerCase() === 'runtime') {
                page.trigger(domain, { method: 'executionContextCreated' });

                /**
                 * also send target created event as they usually happen at the same time
                 */
                _domains2.default.Target.targetCreated.call(page);
            }

            /**
             * send over css content to register stylesheets
             */
            if (domain.toLowerCase() === 'css') {
                page.cssContent.filter(function (content) {
                    return content.params.frameId === page.frameId;
                }).forEach(function (content) {
                    return page.trigger('CSS', content);
                });
            }
        }
        /**
         * can not hide tab in chrome devtools, no use
         * @param {*} page 
         * @param {*} domain 
         */

    }, {
        key: 'domainDisabled',
        value: function domainDisabled(page, domain) {
            page.trigger(domain, { method: 'disable' });
        }
        /**
         * pass Chrome Devtools msg to web-inspector-client
         * @param {*} page 
         * @param {*} param1 
         */

    }, {
        key: 'handleIncomming',
        value: function handleIncomming(page, _ref) {
            var domain = _ref.domain,
                method = _ref.method,
                msg = _ref.msg;

            this.log.warn("pass CDP msg to web-inspector-client in domain: " + domain);
            /**
             * check if method has to be executed on serverside
             */
            if (_domains2.default[domain] && typeof _domains2.default[domain][method] === 'function') {
                var result = _domains2.default[domain][method].call(page, msg);

                /**
                 * some methods are async and broadcast their message on their own
                 */
                if (!result) {
                    return;
                }

                return page.send({ id: msg.id, result: result });
            }

            /**
             * if not handled on server side sent command to device
             */
            page.trigger(domain, { id: msg.id, method: method, domain: domain, params: msg.params || {} });
        }
    }, {
        key: 'logRequest',
        value: function logRequest(page, req, newRequest) {
            var _this2 = this;

            var request = new _request2.default(req);

            if (request.fullUrl.includes('samsungcloudsolution')) {
                return;
            }

            page.requestList.push(request);

            /**
             * don't do any analytics if network is not enabled
             */
            if (!page.isDomainSupported('Network')) {
                return;
            }

            this.log.debug('requestWillBeSent', request.requestId, request.fullUrl);
            page.send({ method: 'Network.requestWillBeSent', params: request.requestWillBeSent() });

            if (req.stale) {
                page.send({ method: 'Network.requestServedFromCache', params: request.requestServedFromCache() });
            }

            newRequest.on('data', function (chunk) {
                return page.send({
                    method: 'Network.dataReceived',
                    params: request.dataReceived(chunk)
                });
            });

            newRequest.then(function (response) {
                _this2.log.debug('loadingFinished', request.requestId, request.fullUrl);

                page.send({
                    method: 'Network.responseReceived',
                    params: request.responseReceived(response)
                });

                if (request.type === 'Stylesheet') {
                    _domains2.default.Network.getResponseBodyData.call(page, {
                        params: { requestId: request.requestId }
                    }).then(function (result) {
                        var hasRegisteredStyle = Boolean(page.cssContent.find(function (_ref2) {
                            var params = _ref2.params;
                            return params.url === request.req.url;
                        }));
                        var payload = {
                            method: 'styleSheetRegistered',
                            params: {
                                url: request.req.url,
                                cssText: result.result.body,
                                frameId: request.frameId
                            }
                        };

                        if (!hasRegisteredStyle) {
                            page.cssContent.push(payload);
                        }

                        /**
                         * only trigger stylesheet registration if CSS domain was
                         * already enabled
                         */
                        if (page.domains.includes('CSS') && !hasRegisteredStyle) {
                            return page.trigger('CSS', payload);
                        }
                    });
                }

                /**
                 * send loadingFinished on next tick to make sure responseReceived was sent
                 * and got received first
                 */
                process.nextTick(function () {
                    return page.send({
                        method: 'Network.loadingFinished',
                        params: request.loadingFinished()
                    });
                });
            });

            newRequest.catch(function (error) {
                _domains2.default.Log.entryAdded.call(page, request, error);

                return page.send({
                    method: 'Network.loadingFailed',
                    params: request.loadingFailed(error)
                });
            });

            return request;
        }
    }]);
    return CDPServer;
}();

var CDP = {
    cdpServer: null,
    init: function init(args) {
        if (!CDP.cdpServer) CDP.cdpServer = new CDPServer(args);
        return CDP.cdpServer;
    },
    getInstance: function getInstance() {
        return CDP.cdpServer;
    }
};

exports.default = CDP;
module.exports = exports['default'];