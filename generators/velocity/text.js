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
 * @fileoverview Generating Velocity for text blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Velocity.texts');

goog.require('Blockly.Velocity');


Blockly.Velocity['text'] = function(block) {
  // Text value.
  var code = Blockly.Velocity.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  //Should we allow joining by '-' or ',' or any other characters?
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.Velocity.ORDER_ATOMIC];
      break;
    case 1:
      var element = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '\'\'';
      // To type-convert to string. Verify once if this is true
      var code = '\"' + element + '\"';
      return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
      break;
    case 2:
      var element0 = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '\'\'';
      var element1 = Blockly.Velocity.valueToCode(block, 'ADD1',
              Blockly.Velocity.ORDER_NONE) || '\'\'';
      var code = '\"' + element0 + '\" + \"' + element1 + '\"';
      return [code, Blockly.Velocity.ORDER_ADDITIVE];
      break;
    default:
      var elements = [];
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Velocity.valueToCode(block, 'ADD' + i,
                Blockly.Velocity.ORDER_NONE) || '\'\'';
      }
      var tempVar = Blockly.Velocity.variableDB_.getDistinctName('x',
          Blockly.Variables.NAME_TYPE);
      var code = "$stringtool.join(\'\', [" + elements.join(', ') + '])'
      return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
  }
};

Blockly.Velocity['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Velocity.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var value = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  return "#set (" + varName + ' = \"' + varName + '\" + \"' + value + '\")';
};

Blockly.Velocity['text_length'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  return ['$stringtool.length(' + text + ')', Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var code = '$stringtool.isNotEmpty(' + text + ')';
  return [code, Blockly.Velocity.ORDER_LOGICAL_NOT];
};

Blockly.Velocity['text_indexOf'] = function(block) {
  // Search the text for a substring.
  // Should we allow for non-case sensitive???
  var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  var substring = Blockly.Velocity.valueToCode(block, 'FIND',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var text = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.Velocity.ORDER_ADDITIVE];
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var text = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    case 'LAST':
      var code = '#set ($index = $stringtool.length(' + text + ') - 1)' + text + '.charAt($index)';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    case 'FROM_START':
      var at = Blockly.Velocity.getAdjustedInt(block, 'AT');
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    case 'FROM_END':
      var at = Blockly.Velocity.getAdjustedInt(block, 'AT', 1, true);
      var code = '#set ($index = $stringtool.length(' + text + ') - ' + at + ')' + text + '.charAt($index)';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    case 'RANDOM':
      var code = text + ".charAt($mathtool.random(0, $stringtool.length(" + text + ")))"
      return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.Velocity['text_getSubstring'] = function(block) {
  // Get substring.
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var text = Blockly.Velocity.valueToCode(block, 'STRING',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var code = "";
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } 
  else {
    // If the text is a variable or literal or doesn't require a call for
    // length, don't generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Velocity.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Velocity.getAdjusted(block, 'AT1', 1, false,
            Blockly.Velocity.ORDER_SUBTRACTION);
        at1 = "$stringtool.length(" + text + ') - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw 'Unhandled option (lists_getSublist).';
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.Velocity.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.Velocity.getAdjusted(block, 'AT2', 0, false,
            Blockly.Velocity.ORDER_SUBTRACTION);
        at2 = "$stringtool.length(" + text + ') - ' + at2;
        break;
      case 'LAST':
        var at2 = "$stringtool.length(" + text + ')';
        break;
      default:
        throw 'Unhandled option (lists_getSublist).';
    }
    code += "#set($at1 = " + at1 +  ")"
    code += "#set($at2 = " + at2 +  ")"
    code += list + '.substring($at1, $at2)';
  }
  return [code, Blockly.Velocity.ORDER_MEMBER];
};

Blockly.Velocity['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.upperCase',
    'LOWERCASE': '.lowerCase',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var text = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var code = text + operator;
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var code = "$stringtool" + operator + "(" + text + ")";
  } else {
    var code = "$stringtool.upperCase($string.charAt(0)) + $stringtool.lowerCase($string.substring(1))"
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replaceAll('^[\s\xa0]+','')",
    'RIGHT': ".replaceAll('[\s\xa0]+$','')",
    'BOTH': '.strip()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var code = text + operator;
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  return msg;
};

Blockly.Velocity['text_count'] = function(block) {
  var text = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.Velocity.valueToCode(block, 'SUB',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var code = '$stringtool.countMatches(' + text + ", " + sub + ')';
  return [code, Blockly.Velocity.ORDER_MEMBER];
};

Blockly.Velocity['text_replace'] = function(block) {
  var text = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var from = Blockly.Velocity.valueToCode(block, 'FROM',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var to = Blockly.Velocity.valueToCode(block, 'TO',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var code = text + '.replace(' + from + ', ' + to + ')';
  return [code, Blockly.Velocity.ORDER_MEMBER];
};

Blockly.Velocity['text_reverse'] = function(block) {
  var text = Blockly.Velocity.valueToCode(block, 'TEXT',
      Blockly.Velocity.ORDER_MEMBER) || '\'\'';
  var code = "$stringtool.reverse(" + text + ')';
  return [code, Blockly.Velocity.ORDER_MEMBER];
};
