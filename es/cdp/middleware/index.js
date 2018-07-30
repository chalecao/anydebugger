'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _page = require('./page');

var Page = _interopRequireWildcard(_page);

var _debugger = require('./debugger');

var Debugger = _interopRequireWildcard(_debugger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = { Page: Page, Debugger: Debugger };
module.exports = exports['default'];