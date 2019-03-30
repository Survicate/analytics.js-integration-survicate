'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');
var when = require('do-when');
var del = require('obj-case').del;

/**
 * Expose `Survicate` integration.
 */

var Survicate = module.exports = integration('Survicate')
  .global('_sva')
  .option('workspaceKey', '')
  .tag('<script src="//survey.survicate.com/workspaces/{{ workspaceKey }}/web_surveys.js">');

/**
 * Initialize.
 *
 * @api public
 */

Survicate.prototype.initialize = function() {
  var self = this;
  this.load(function() {
    when(function() { return self.loaded(); }, self.ready);
  });
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Survicate.prototype.loaded = function() {
  return typeof window._sva === 'object';
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Survicate.prototype.identify = function(identify) {
  var traits = identify.traits({
    userId: 'user_id'
  });
  del(traits, 'id');
  del(traits, 'createdAt');
  window._sva.setVisitorTraits(traits);
};

/**
 * Group.
 *
 * @api public
 * @param {Group} group
 */

Survicate.prototype.group = function(group) {
  var traits = group.traits({
    groupId: 'group_id'
  });
  del(traits, 'id');
  del(traits, 'createdAt');
  window._sva.setVisitorTraits(traits);
};
