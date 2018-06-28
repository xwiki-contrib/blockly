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
  var functionName = Blockly.Velocity.provideFunction_(
      'colour_random',
      [ 'function ' + Blockly.Velocity.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  return \'#\' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, \'0\', STR_PAD_LEFT);',
        '}']);
  var code = functionName + '()';
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
  var functionName = Blockly.Velocity.provideFunction_(
      'colour_rgb',
      [ 'function ' + Blockly.Velocity.FUNCTION_NAME_PLACEHOLDER_ +
          '($r, $g, $b) {',
        '  $hex = "#";',
        '  $hex .= str_pad(dechex($r), 2, "0", STR_PAD_LEFT);',
        '  $hex .= str_pad(dechex($g), 2, "0", STR_PAD_LEFT);',
        '  $hex .= str_pad(dechex($b), 2, "0", STR_PAD_LEFT);',
        '  return $hex;',
        '}']);
  var code = functionName + '($' + red + ', $' + green + ', $' + blue + ')';
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
  var functionName = Blockly.Velocity.provideFunction_(
      'colour_blend',
      [ 'function ' + Blockly.Velocity.FUNCTION_NAME_PLACEHOLDER_ +
          '($c1, $c2, $ratio) {',
        '  $ratio = max(min($ratio, 1), 0);',
        '  $r1 = hexdec(substr($c1,0,2));',
        '  $g1 = hexdec(substr($c1,2,2));',
        '  $b1 = hexdec(substr($c1,4,2));',
        '  $r2 = hexdec(substr($c2,0,2));',
        '  $g2 = hexdec(substr($c2,2,2));',
        '  $b2 = hexdec(substr($c2,4,2));',
        '  $r = round($r1 * (1 - $ratio) + $r2 * $ratio);',
        '  $g = round($g1 * (1 - $ratio) + $g2 * $ratio);',
        '  $b = round($b1 * (1 - $ratio) + $b2 * $ratio);',
        '  $hex = "#";',
        '  $hex .= str_pad(dechex($r), 2, "0", STR_PAD_LEFT);',
        '  $hex .= str_pad(dechex($g), 2, "0", STR_PAD_LEFT);',
        '  $hex .= str_pad(dechex($b), 2, "0", STR_PAD_LEFT);',
        '  return $hex;',
        '}']);
  var code = functionName + '($' + c1 + ', $' + c2 + ', $' + ratio + ')';
  return [code, Blockly.Velocity.ORDER_FUNCTION_CALL];
};