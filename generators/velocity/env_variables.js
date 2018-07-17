/**
 * @fileoverview Generating Velocity for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Velocity.EnvVariables');

goog.require('Blockly.Velocity');


Blockly.Velocity['envvar_constant'] = function(block) {
  // Constants: $xwiki, $doc, $services, $context
  var CONSTANTS = {
    '$xwiki': ['$xwiki', Blockly.Velocity.ORDER_MEMBER],
    '$doc': ['$doc', Blockly.Velocity.ORDER_MEMBER],
    '$services': ['$services', Blockly.Velocity.ORDER_MEMBER],
    '$xcontext': ['$xcontext', Blockly.Velocity.ORDER_MEMBER],
    '$request': ['$request', Blockly.Velocity.ORDER_MEMBER],
    '$response': ['$response', Blockly.Velocity.ORDER_MEMBER]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};