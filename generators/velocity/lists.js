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
 * @fileoverview Generating Velocity for list blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.Velocity.lists');

goog.require('Blockly.Velocity');


Blockly.Velocity['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.Velocity.valueToCode(block, 'ADD' + n,
        Blockly.Velocity.ORDER_COMMA) || 'null';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var argument0 = Blockly.Velocity.valueToCode(block, 'ITEM',
      Blockly.Velocity.ORDER_COMMA) || 'null';
  var argument1 = Blockly.Velocity.valueToCode(block, 'NUM',
      Blockly.Velocity.ORDER_COMMA) || '0';
  var code = "#set($array = [])#foreach ($number in [1.." + argument1 + "]#set($temp = $array.add(" + argument0 + "))#end$array"
  return [code, Blockly.Velocity.ORDER_MULTIPLICATIVE];
};

Blockly.Velocity['lists_length'] = function(block) {
  // List length.
  var list = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_FUNCTION_CALL) || '[]';
  return [list + '.size()', Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['lists_isEmpty'] = function(block) {
  // Is the list empty?
  var list = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_MEMBER) || '[]';
  return [list + '.isEmpty()', Blockly.Velocity.ORDER_LOGICAL_NOT];
};

Blockly.Velocity['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var item = Blockly.Velocity.valueToCode(block, 'FIND',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var list = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_MEMBER) || '[]';
  var code = list + '.' + operator + '(' + item + ')';
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.Velocity.ORDER_ADDITION];
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var list = Blockly.Velocity.valueToCode(block, 'VALUE',
      Blockly.Velocity.ORDER_MEMBER) || '[]';

  if (where == 'FIRST') {
    if (mode == 'GET') {
      var code = list + '[0]';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.remove(0)';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'REMOVE') {
      return list + '.remove(0)\n';
    }
  } else if (where == 'LAST') {
    if (mode == 'GET') {
      var code = list + '[-1]';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.remove(' + list + '.indexOf('+list+'[-1]))';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'REMOVE') {
      return list + '.remove(' + list + '.indexOf('+list+'[-1]))\n';
    }
  } else if (where == 'FROM_START') {
    var at = Blockly.Velocity.getAdjusted(block, 'AT');
    if (mode == 'GET') {
      var code = list + '[' + at + ']';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.remove(' + at + ')';
      return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
    } else if (mode == 'REMOVE') {
      return list + '.remove(' + at + ')\n';
    }
  } else if (where == 'FROM_END') {
    if (mode == 'GET') {
      var code = list + '[-' + at + ']';
      return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
    } else if (mode == 'GET_REMOVE') {
      var code = list + '.remove(' + list + '.indexOf('+list+'[-' + at + ']))';
      return [code, Blockly.Velocity.ORDER_MEMBER];
    } else if (mode == 'REMOVE') {
      return list + '.remove(' + list + '.indexOf('+list+'[-' + at + ']))\n';
    }
  } else if (where == 'RANDOM') {
    if (mode == 'GET') {
        var code = list+ '[$mathtool.random(0,' + list + '.size())]';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else {
        var code = list+ '.remove($mathtool.random(0,' + list + '.size()))';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + '\n';
        }
      }
      break;
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.Velocity['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.Velocity.valueToCode(block, 'LIST',
      Blockly.Velocity.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Velocity.valueToCode(block, 'AT',
      Blockly.Velocity.ORDER_NONE) || '1';
  var value = Blockly.Velocity.valueToCode(block, 'TO',
      Blockly.Velocity.ORDER_ASSIGNMENT) || 'null';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.Velocity.variableDB_.getDistinctName(
        'tmp_list', Blockly.Variables.NAME_TYPE);
    var code = '#set(' + listVar + ' = ' + list + ')';
    list = listVar;
    return code;
  }
  if (where == 'FIRST') {
      if (mode == 'SET') {
        return '#set(' + list + '[0] = ' + value + ')\n';
      } else if (mode == 'INSERT') {
      return '#set(#temp=' + list + '.add(0, ' + value + '))\n';
    }
  } else if (where == 'LAST') {
    if (mode == 'SET') {
      var code = cacheList();
      code += '#set(' + list + '[-1] = ' + value + ')';
      return code;
    } else if (mode == 'INSERT') {
      return "#set($index=" + list + '.indexOf(' + list + "[-1]) + 1)\n" + list + ".add($index, " + value + ')\n';
    }
  } else if (where == 'FROM_START') {
    var at = Blockly.Velocity.getAdjusted(block, 'AT');
    if (mode == 'SET') {
      return '#set(' + list + '[' + at + '] = ' + value + ')\n';
    } else if (mode == 'INSERT') {
      return list + ".add(" + at +", " + value + ')\n';
    }
  } else if (where == 'FROM_END') {
    var code = cacheList();
    if (mode == 'SET') {
      code += '#set(' + list + '[-' + at + '] = ' + value + ')';
      return code;
    } else if (mode == 'INSERT') {
      code += "#set($index=" + list + '.indexOf(' + list + "[-" + at + "]) + 1)\n" + list + ".add($index, " + value + ')\n';
      return code;
    }
  } else if (where == 'RANDOM') {
    var code = cacheList();
    var xVar = Blockly.Velocity.variableDB_.getDistinctName(
        'tmp_x', Blockly.Variables.NAME_TYPE);
    code += '#set(' + xVar + ' = $mathtool.random(0,' + list + '.size())';
    if (mode == 'SET') {
      code += '#set('+ list + '[' + xVar + '] = ' + value + ')';
      return code;
    } else if (mode == 'INSERT') {
      code += list + ".add(" + xVar +", " + value + ')\n';
      return code;
    }
  }
  throw 'Unhandled combination (lists_setIndex).';
};

/**
 * Returns an expression calculating the index into a list.
 * @private
 * @param {string} listName Name of the list, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string} Index expression.
 */
Blockly.Velocity.lists.getIndex_ = function(listName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return listName + '.size() - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return listName + '.size() - 1';
  } else {
    return opt_at;
  }
};

Blockly.Velocity['lists_getSublist'] = function(block) {
  var list = Blockly.Velocity.valueToCode(block, 'LIST',
      Blockly.Velocity.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = list;
  } 
  else {
    // If the list is a variable or doesn't require a call for length, don't
    // generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Velocity.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Velocity.getAdjusted(block, 'AT1', 1, false,
            Blockly.Velocity.ORDER_SUBTRACTION);
        at1 = list + '.size() - ' + at1;
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
        at2 = list + '.size() - ' + at2;
        break;
      case 'LAST':
        var at2 = list + '.size()';
        break;
      default:
        throw 'Unhandled option (lists_getSublist).';
    }
    code += "#set($at1 = " + at1 +  ")"
    code += "#set($at2 = " + at2 +  ")"
    code += list + '.subList($at1, $at2)';
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var input = Blockly.Velocity.valueToCode(block, 'INPUT',
      Blockly.Velocity.ORDER_MEMBER);
  var delimiter = Blockly.Velocity.valueToCode(block, 'DELIM',
      Blockly.Velocity.ORDER_NONE) || '\'\'';
  var mode = block.getFieldValue('MODE');
  if (mode == 'SPLIT') {
    if (!input) {
      input = '\'\'';
    }
    var code = "$stringtool.split("+input+","+delimiter+")";
  } else if (mode == 'JOIN') {
    if (!input) {
      input = '[]';
    }
    var code = "$stringtool.join("+input+","+delimiter+")";
  } else {
    throw 'Unknown mode: ' + mode;
  }
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['lists_reverse'] = function(block) {
  // Block for reversing a list.
  var list = Blockly.Velocity.valueToCode(block, 'LIST',
      Blockly.Velocity.ORDER_FUNCTION_CALL) || '[]';
  var code = "#set($array2 = [])\n#set($sz = " + list + ".size() - 1)\n#foreach ($i in [$sz..0])\n#set($temp = $array2.add("+list+"[$i]))\n#end\n$array2";
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['lists_sort'] = function(block) {
  // Block for sorting a list.
  var list = Blockly.Velocity.valueToCode(block, 'LIST',
      Blockly.Velocity.ORDER_FUNCTION_CALL) || '[]';
  var direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
  //Incorporate descending order sorting also
  return ["$sorttool.sort("list + ')',
      Blockly.Velocity.ORDER_FUNCTION_CALL];
};