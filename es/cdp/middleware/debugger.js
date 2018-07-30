'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptSource = getScriptSource;
/**
 * helper for Debugger.getScriptSource to return script content if script was fetched
 * from external source
 */
function getScriptSource(result) {
  var requestList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  /**
   * return if result already contains script content
   */
  if (typeof result.src !== 'string') {
    return result;
  }

  var request = requestList.filter(function (req) {
    return req.fullUrl.includes(result.src);
  })[0];

  /**
   * don't do anything if request was not found in request list
   */
  if (!request) {
    return result;
  }

  result.scriptSource = request.chunks.join('');
  delete result.src;
  return result;
}