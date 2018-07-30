"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = info;
/**
 * Custom Webdriver domain
 */

/**
 * Return page infos
 */
function info() {
  var uuid = this.uuid,
      hostname = this.hostname,
      url = this.url,
      title = this.title,
      description = this.description,
      metadata = this.metadata;

  return { uuid: uuid, hostname: hostname, url: url, title: title, description: description, metadata: metadata };
}