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
 * @fileoverview Generating Velocity for unit test blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Velocity['unittest_main'] = function(block) {
  // Container for unit tests.
  var resultsVar = Blockly.Velocity.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var code = "#set (" + resultsVar + ' = [])\\';
  // Run tests (unindented).
  code += Blockly.Velocity.statementToCode(block, 'DO')
      .replace(/^  /, '').replace(/\n  /g, '\\');
  // Print the report.
  code += '#set ($report = [])'
       +  '#set ($summary = [])'
       +  '#set ($fails = 0)'
       +  '#set ($limit = ' + resultsVar + '.size() - 1)' 
       +  '#foreach ($index in [0..$limit])'
       +  '    #if ('+ resultsVar + '[$index][0])'
       +  '      #set($temp = $summary.add("."))'
       +  '    #else'
       +  '      #set($temp = $summary.add("F"))'
       +  '      #set($fails = $fails + 1)'
       +  '      #set($temp = $report.add(""))'
       +  '      #set($temp = $report.add("FAIL: ' + resultsVar + '[$index][2]"))'
       +  '      #set($temp = $report.add(' + resultsVar + '[$index][1]))'
       +  '    #end'
       +  '#end'
       +  '#set($temp = $report.add(0, $stringtool.join($summary, "")'
       +  '#set($temp = $report.add(""))'
       +  '#set($statement = Number of tests run: ' + resultsVar + '.size())'
       +  '#set($temp = $report.add($statement))'
       +  '#set($temp = $report.add(""))'
       +  '#if ($fails!=0)'
       +    '#set($statement = FAILED (failures = $fails))'
       +    '$report.add($statement)'
       +  '#else'
       +    '$report.add("OK")'
       +  '$stringtool.join(report,"\\")'
  // Destroy results.
  code += resultsVar + ' = $NULL\n';
  return code;
};

Blockly.Velocity['unittest_main'].defineAssert_ = function() {
  var resultsVar = Blockly.Velocity.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var code = '#if (!' + resultsVar + ')'
            + '  "Orphaned assert equals: " + $message'
            + '#end'
            + '#if ($actual == $expected)'
            +   resultsVar + '.add([True, "OK", $message])'
            + '#else'
            +   '#set ($expected = "Expected: ' + expected + '\\Actual: ' + actual + '")'
            +    resultsVar + '.add([False, $expected, $message])';
            + '#end'
  return code;
};

Blockly.Velocity['unittest_assertequals'] = function(block) {
  // Asserts that a value equals another value.
  var message = Blockly.Velocity.valueToCode(block, 'MESSAGE',
      Blockly.Velocity.ORDER_NONE) || '';
  var actual = Blockly.Velocity.valueToCode(block, 'ACTUAL',
      Blockly.Velocity.ORDER_NONE) || '$NULL';
  var expected = Blockly.Velocity.valueToCode(block, 'EXPECTED',
      Blockly.Velocity.ORDER_NONE) || '$NULL';
  return '#set($actual = ' + actual + ')#set($expected = ' + expected + ')#set($message = ' + message + ')'
        +  Blockly.Velocity['unittest_main'].defineAssert_() + "\\";
};

Blockly.Velocity['unittest_assertvalue'] = function(block) {
  // Asserts that a value is true, false, or null.
  var message = Blockly.Velocity.valueToCode(block, 'MESSAGE',
      Blockly.Velocity.ORDER_NONE) || '';
  var actual = Blockly.Velocity.valueToCode(block, 'ACTUAL',
      Blockly.Velocity.ORDER_NONE) || 'None';
  var expected = block.getFieldValue('EXPECTED');
  if (expected == 'TRUE') {
    expected = 'true';
  } else if (expected == 'FALSE') {
    expected = 'false';
  } else if (expected == 'NULL') {
    expected = '$NULL';
  }
  return '#set($actual = ' + actual + ')#set($expected = ' + expected + ')#set($message = ' + message + ')'
        +  Blockly.Velocity['unittest_main'].defineAssert_() + "\\";
};

Blockly.Velocity['unittest_fail'] = function(block) {
  // Always assert an error.
  var resultsVar = Blockly.Velocity.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var message = Blockly.Velocity.quote_(block.getFieldValue('MESSAGE'));
  var code = '#if (!' + resultsVar + ')',
            +    '  "Orphaned assert equals: " + $message'
            +  '#else'
            +    resultsVar + '.add([false, "Fail.", $message])'
            +  '#end\\';
  return code;
};

Blockly.Velocity['unittest_adjustindex'] = function(block) {
  var index = Blockly.Velocity.valueToCode(block, 'INDEX',
      Blockly.Velocity.ORDER_ADDITIVE) || '0';
  // Adjust index if using one-based indexing.
  if (block.workspace.options.oneBasedIndex) {
    if (Blockly.isNumber(index)) {
      // If the index is a naked number, adjust it right now.
      return [parseFloat(index) + 1, Blockly.Velocity.ORDER_ATOMIC];
    } else {
      // If the index is dynamic, adjust it in code.
      index = index + ' + 1';
    }
  } else if (Blockly.isNumber(index)) {
    return [index, Blockly.Velocity.ORDER_ATOMIC];
  }
  return [index, Blockly.Velocity.ORDER_ADDITIVE];
};
