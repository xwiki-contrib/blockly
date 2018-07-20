/**
 * @fileoverview Generating Velocity for variable blocks.
 * @author vivekbalasundaram@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Velocity.EnvVariables');

goog.require('Blockly.Velocity');


Blockly.Velocity['envvar_constant'] = function(block) {
  return [block.getFieldValue('ENVVAR_CONSTANT'),Blockly.Velocity.ORDER_MEMBER];
};

Blockly.Velocity['envvar_method'] = function(block) {
  // XWiki script Variable from Dropdown menu
  var ddmenu = block.getFieldValue('ENVVAR_METHOD_CONSTANT');
  // Method name
  var method_name = block.getFieldValue('ENVVAR_METHOD_TEXT');
  var code = method_name ? ddmenu + "." + method_name + "()": ddmenu;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['envvar_attrib'] = function(block) {
  // XWiki script Variable from Dropdown menu
  var ddmenu = block.getFieldValue('ENVVAR_ATTRIB_CONSTANT');
  // Attribute name
  var attrib_name = block.getFieldValue('ENVVAR_ATTRIB_TEXT');
  var code = attrib_name ? ddmenu + "." + attrib_name:ddmenu;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['envvar_method_custom'] = function(block) {
  // Dynamic XWiki script binding
  var code = Blockly.Velocity.valueToCode(block, 'ENVVAR_METHOD_CUSTOM', Blockly.Velocity.ORDER_ATOMIC) || '';
  // Method name
  var method_name = block.getFieldValue('ENVVAR_METHOD_TEXT_CUSTOM');
  code = method_name ? code + "." + method_name + "()": code;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['envvar_attrib_custom'] = function(block) {
  // Dynamic XWiki script binding
  var code = Blockly.Velocity.valueToCode(block, 'ENVVAR_ATTRIB_CUSTOM', Blockly.Velocity.ORDER_ATOMIC) || '';
  // Attribute name
  var attrib_name = block.getFieldValue('ENVVAR_ATTRIB_TEXT_CUSTOM');
  code = attrib_name ? code + "." + attrib_name : code;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};