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
 * @fileoverview Generating Velocity for colour blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.Velocity.colour');

goog.require('Blockly.Velocity');


Blockly.Velocity['colour_picker'] = function(block) {
  // Colour picker.
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['colour_random'] = function(block) {
  // Generate a random colour.
  var code = "#set ($s = '#%06X')#set ($lim = $mathtool.pow(2,24) - 1)$s.format($s, $lim)"
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.Velocity.valueToCode(block, 'RED',
      Blockly.Velocity.ORDER_COMMA) || 0;
  var green = Blockly.Velocity.valueToCode(block, 'GREEN',
      Blockly.Velocity.ORDER_COMMA) || 0;
  var blue = Blockly.Velocity.valueToCode(block, 'BLUE',
      Blockly.Velocity.ORDER_COMMA) || 0;
  var r = "$mathtool.round($mathtool.min(100, $mathtool.max(0," + red + ")) * 2.55)"
  var g = "$mathtool.round($mathtool.min(100, $mathtool.max(0," + green + ")) * 2.55)"
  var b = "$mathtool.round($mathtool.min(100, $mathtool.max(0," + blue + ")) * 2.55)"
  var code = "#set ($s = '#%02x%02x%02x')$s.format($s," + r + ", " + g + ", " + b + ")"
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};

Blockly.Velocity['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.Velocity.valueToCode(block, 'COLOUR1',
      Blockly.Velocity.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.Velocity.valueToCode(block, 'COLOUR2',
      Blockly.Velocity.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.Velocity.valueToCode(block, 'RATIO',
      Blockly.Velocity.ORDER_COMMA) || 0.5;
  var code = "#set($Integer = 0)";
  
  var r1 = "#set($r1 = \'" + c1 + "\'.substring(1,3))$Integer.parseInt($r1,16)";
  var r2 = "#set($r2 = \'" + c2 + "\'.substring(1,3))$Integer.parseInt($r2,16)";

  var g1 = "#set($g1 = \'" + c1 + "\'.substring(3,5))$Integer.parseInt($g1,16)";
  var g2 = "#set($g2 = \'" + c2 + "\'.substring(3,5))$Integer.parseInt($g2,16)";

  var b1 = "#set($b1 = \'" + c1 + "\'.substring(5,7))$Integer.parseInt($b1,16)";
  var b2 = "#set($b2 = \'" + c2 + "\'.substring(5,7))$Integer.parseInt($b2,16)";  

  var ratio = "#set($ratio = $mathtool.min(1, $mathtool.max(0," + ratio + ")))";
  
  var r = '#set($temp = $r1 * (1 - $ratio) + $r2 * $ratio)#set($r = $mathtool.round($temp)';
  var g = '#set($temp = $g1 * (1 - $ratio) + $g2 * $ratio)#set($g = $mathtool.round($temp)';
  var b = '#set($temp = $b1 * (1 - $ratio) + $b2 * $ratio)#set($b = $mathtool.round($temp)',

  code = code + r1 + r2 + g1 + g2 + b1 + b2 + r + g + b + "#set ($s = '#%02x%02x%02x')$s.format($s,$r,$g,$b)";
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};