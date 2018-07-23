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
 * @fileoverview Generating Velocity for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Velocity.procedures');

goog.require('Blockly.Velocity');


Blockly.Velocity['procedures_defnoreturn'] = function(block) {
  var funcName = Blockly.Velocity.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Velocity.statementToCode(block, 'STACK');
  if (Blockly.Velocity.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Velocity.prefixLines(
        Blockly.Velocity.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Velocity.INDENT) + branch;
  }
  if (Blockly.Velocity.INFINITE_LOOP_TRAP) {
    branch = Blockly.Velocity.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Velocity.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = '#macro( ' + funcName + " " + args.join(' ') + ' )\n' +
      branch + '#end\n';
  code = Blockly.Velocity.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Velocity.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Velocity['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Velocity.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Velocity.valueToCode(block, 'ARG' + i,
        Blockly.Velocity.ORDER_NONE) || 'None';
  }
  var code = "#" + funcName + " " + '(' + args.join(' ') + ')\n';
  return code;
};

