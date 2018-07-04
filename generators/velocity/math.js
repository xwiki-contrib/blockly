/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Velocity for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Velocity.math');

goog.require('Blockly.Velocity');


Blockly.Velocity['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.Velocity.ORDER_ATOMIC : 
              Blockly.Velocity.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.Velocity['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Velocity.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Velocity.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Velocity.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Velocity.ORDER_DIVISION],
    'POWER': [null, Blockly.Velocity.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Velocity.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Velocity.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in Velocity requires a special case since it has no operator.
  if (!operator) {
    code = '$mathtool.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Velocity['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.Velocity.valueToCode(block, 'NUM',
        Blockly.Velocity.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-'){
      arg[0] = "+";
      code = arg;
    } else if (arg[0] == '+') {
      arg[0] = "-";
      code = arg;
    } else
      code = '-' + arg;
    return [code, Blockly.Velocity.ORDER_UNARY_NEGATION];
  }
  arg = Blockly.Velocity.valueToCode(block, 'NUM',
        Blockly.Velocity.ORDER_NONE) || '0';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = '$mathtool.abs(' + arg + ')';
      break;
    case 'EXP':
      code = '$mathtool.pow(e,' + arg + ')';
      break;
    case 'POW10':
      code = '$mathtool.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = '$mathtool.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = '$mathtool.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = '$mathtool.floor(' + arg + ')';
      break;
  }
  if (code) {
    return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
  }
  return [code, Blockly.Velocity.ORDER_DIVISION];
};

Blockly.Velocity['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Velocity.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Velocity.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Velocity.valueToCode(block, 'DIVISOR',
          Blockly.Velocity.ORDER_MODULUS) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Velocity.ORDER_EQUALITY];
};

Blockly.Velocity['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Velocity.valueToCode(block, 'DELTA',
      Blockly.Velocity.ORDER_ADDITION) || '0';
  var varName = Blockly.Velocity.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = "#if ("+varName+'.class.simpleName == \'Double\' ||'+varName+'.class.simpleName == \'Integer\')' +
              varName + argument0 + "#else" + argument0 + "#end"
  return code;
};

// Rounding functions have a single operand.
Blockly.Velocity['math_round'] = Blockly.Velocity['math_single'];
// Trigonometry functions have a single operand.
Blockly.Velocity['math_trig'] = Blockly.Velocity['math_single'];

Blockly.Velocity['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.Velocity.valueToCode(block, 'LIST',
          Blockly.Velocity.ORDER_MEMBER) || '[]';
      code = "$mathtool.getTotal(" + list + ')';
      break;
    case 'AVERAGE':
      code = "$mathtool.getAverage(" + list + ')';
      break;
    case 'RANDOM':
      list = Blockly.Velocity.valueToCode(block, 'LIST',
          Blockly.Velocity.ORDER_NONE) || '[]';
      code = list + '[$mathtool.random(0,' + list + '.size())]';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Velocity.valueToCode(block, 'DIVIDEND',
      Blockly.Velocity.ORDER_MODULUS) || '0';
  var argument1 = Blockly.Velocity.valueToCode(block, 'DIVISOR',
      Blockly.Velocity.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Velocity.ORDER_MODULUS];
};

Blockly.Velocity['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_COMMA) || '0';
  var argument1 = Blockly.Velocity.valueToCode(block, 'LOW',
      Blockly.Velocity.ORDER_COMMA) || '0';
  var argument2 = Blockly.Velocity.valueToCode(block, 'HIGH',
      Blockly.Velocity.ORDER_COMMA) || 'Infinity';
  var code = '$mathtool.min($mathtool.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Velocity.valueToCode(block, 'FROM',
      Blockly.Velocity.ORDER_COMMA) || '0';
  var argument1 = Blockly.Velocity.valueToCode(block, 'TO',
      Blockly.Velocity.ORDER_COMMA) || '0';
  var code = '$mathtool.random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['$mathtool.random()', Blockly.Velocity.ORDER_FUNCTION_CALL];
};
