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
  // XWiki script binding
  var code = Blockly.Velocity.valueToCode(block, 'ENVVAR_METHOD', Blockly.Velocity.ORDER_ATOMIC) || '';
  // Method name
  var method_name = Blockly.Velocity.valueToCode(block, 'ENVVAR_METHOD_TEXT', Blockly.Velocity.ORDER_ATOMIC) || '';
  var args = '';
  // Call a method made up of any number of args of any type.
  switch (block.itemCount_) {
    case 0:
      args = '';
      break;
    case 1:
      var element = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '';
      args = element;
      break;
    case 2:
      var element0 = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '';
      
      var element1 = Blockly.Velocity.valueToCode(block, 'ADD1',
              Blockly.Velocity.ORDER_NONE) || '';
      args = element0 && element1 ? element0 + ", " + element1 : (element0 ? element0 : element1);
      break;
    default:
      var elems = [];
      for (var i = 0; i < block.itemCount_; i++) {
        var temp = Blockly.Velocity.valueToCode(block, 'ADD' + i,
                Blockly.Velocity.ORDER_NONE) || '';
        if(temp)
          elems.push(temp);
      }
      var tempVar = Blockly.Velocity.variableDB_.getDistinctName('x',
          Blockly.Variables.NAME_TYPE);
      args = elems.join(', ')
  }
  code = method_name ? code + "." + method_name + "(" + args + ")": code;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['envvar_attrib'] = function(block) {
  // Dynamic XWiki script binding
  var code = Blockly.Velocity.valueToCode(block, 'ENVVAR_ATTRIB', Blockly.Velocity.ORDER_ATOMIC) || '';
  // Attribute name
  var attrib_name = block.getFieldValue('ENVVAR_ATTRIB_TEXT');
  code = attrib_name ? code + "." + attrib_name : code;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['envvar_text'] = function(block) {
  // Text value.
  var code = block.getFieldValue('ENVVAR_TEXT');
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};