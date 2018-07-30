'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.entryAdded = entryAdded;
/**
 * Issued when new message was logged.
 *
 * @param  {LogEntry} entry  the entry
 */
function entryAdded(request, error) {
    this.send({
        method: 'Log.entryAdded',
        params: {
            entry: {
                level: 'error',
                source: 'network',
                text: error.message,
                timestamp: new Date().getTime(),
                url: request.fullUrl,
                networkRequestId: request.requestId
            }
        }
    });
}