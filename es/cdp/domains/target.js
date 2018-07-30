'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.targetCreated = targetCreated;
/**
 * Events
 */

/**
 * Issued when a possible inspection target is created.
 * @param  {String} uuid  page target passed in by debugger service
 * @return {Object}       target info
 */
function targetCreated() {
  var targetId = this.uuid,
      title = this.title,
      url = this.url;

  this.send({
    method: 'Target.targetCreated',
    params: { targetInfo: { targetId: targetId, title: title, type: 'page', url: url } }
  });
}