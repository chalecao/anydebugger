'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getResourceTree = getResourceTree;
/**
 * Information about the Frame hierarchy along with their cached resources.
 * @return {Object} frame tree
 */
function getResourceTree(result) {
    var requestList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var id = result.frameTree.frame.id.split('.')[0];
    var resources = requestList.filter(function (request) {
        return request.requestId && request.requestId.indexOf(id) === 0;
    });

    /**
     * add resource data
     */
    result.frameTree.resources = resources.map(function (request) {
        return {
            contentSize: request.requestBodySize,
            lastModified: request.wallTime,
            mimeType: request.mimeType,
            type: request.type,
            url: request.fullUrl
        };
    });

    return result;
}