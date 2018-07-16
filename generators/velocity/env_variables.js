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
 * @fileoverview Generating Velocity for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Velocity.EnvVariables');

goog.require('Blockly.Velocity');


Blockly.Velocity['envvar_constant'] = function(block) {
  // Constants: $xwiki, $doc, $services, $context
  var CONSTANTS = {
    '$xwiki': ['$xwiki', Blockly.Velocity.ORDER_MEMBER],
    '$doc': ['$doc', Blockly.Velocity.ORDER_MEMBER],
    '$services': ['$services', Blockly.Velocity.ORDER_MEMBER],
    '$xcontext': ['$xcontext', Blockly.Velocity.ORDER_MEMBER],
    '$request': ['$request', Blockly.Velocity.ORDER_MEMBER],
    '$response': ['$response', Blockly.Velocity.ORDER_MEMBER]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};