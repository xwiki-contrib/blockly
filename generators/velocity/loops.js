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
 * @fileoverview Generating Velocity for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Velocity.loops');

goog.require('Blockly.Velocity');


Blockly.Velocity['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Velocity.valueToCode(block, 'TIMES',
        Blockly.Velocity.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Velocity.statementToCode(block, 'DO');
  branch = Blockly.Velocity.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.Velocity.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Velocity.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += '#set( ' + endVar + ' = ' + repeats + ')\n';
  }
  code += '#foreach (' + loopVar + ' in [0..' + endVar + "])\n" +
      branch + '\n#end\n';
  return code;
};

Blockly.Velocity['controls_repeat'] =
    Blockly.Velocity['controls_repeat_ext'];

Blockly.Velocity['controls_forEach'] = function(block) {
    // For each loop.
  var variable0 = Blockly.Velocity.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Velocity.valueToCode(block, 'LIST',
      Blockly.Velocity.ORDER_RELATIONAL) || '[]';
  var branch = Blockly.Velocity.statementToCode(block, 'DO');
  branch = Blockly.Velocity.addLoopTrap(branch, block.id) ||
      Blockly.Velocity.PASS;
  var code = '#foreach (' + variable0 + ' in ' + argument0 + ')\n' + branch + '#end\n';
  return code;
};

Blockly.Velocity['controls_flow_statements'] = function(block) {
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return '#break';
  }
  throw 'Unknown flow statement.';
};