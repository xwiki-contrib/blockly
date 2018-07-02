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
 * @fileoverview Helper functions for generating Velocity for blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.Velocity');

goog.require('Blockly.Generator');


/**
 * Velocity code generator.
 * @type !Blockly.Generator
 */
Blockly.Velocity = new Blockly.Generator('Velocity');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Velocity.addReservedWords(
    'Blockly,' +  // In case Velocity is evaled in the current window.
        // http://velocity.apache.org/engine/1.7/user-guide.html
    '#break,#define,#else,#elsif,#end,#evaluate,#foreach,#if,#include,#parse,#set,#stop,#macro,$collectionstool,$datetool,$escapetool,$jsontool,$listtool,$mathtool,$msg,$numbertool$regextool,$sorttool,$stringtool,$urltool,$exceptiontool,$niotool' +
    'true, false');

/**
 * Order of operation ENUMs.
 * https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html
 */
Blockly.Velocity.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Velocity.ORDER_MEMBER = 0.9;
Blockly.Velocity.ORDER_UNARY_FUNCTION_CALL = 2.5; 
Blockly.Velocity.ORDER_UNARY_NEGATION = 2.5; 
Blockly.Velocity.ORDER_MULTIPLICATION = 3; // * / % ~/
Blockly.Velocity.ORDER_DIVISION = 3;
Blockly.Velocity.ORDER_ADDITION = 4;
Blockly.Velocity.ORDER_SUBTRACTION = 4;
Blockly.Velocity.ORDER_RELATIONAL = 6;     // >= > <= < as is is!
Blockly.Velocity.ORDER_EQUALITY = 7;      // == !=
Blockly.Velocity.ORDER_BITWISE_OR = 10;     // |
Blockly.Velocity.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Velocity.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Velocity.ORDER_ASSIGNMENT = 14;
Blockly.JavaScript.ORDER_COMMA = 18;     // =
Blockly.Velocity.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Velocity.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Velocity.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Velocity.functionNames_ = Object.create(null);

  if (!Blockly.Velocity.variableDB_) {
    Blockly.Velocity.variableDB_ =
        new Blockly.Names(Blockly.Velocity.RESERVED_WORDS_);
  } else {
    Blockly.Velocity.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = '#set( ' +
        Blockly.Velocity.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE) + ')';
  }
  Blockly.Velocity.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Velocity.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Velocity.definitions_) {
    definitions.push(Blockly.Velocity.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Velocity.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Velocity string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Velocity string.
 * @private
 */
Blockly.Velocity.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Velocity from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Velocity code created for this block.
 * @return {string} Velocity code with comments and subsequent blocks added.
 * @private
 */
Blockly.Velocity.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Velocity.prefixLines(comment, '## ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Velocity.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Velocity.prefixLines(comment, '## ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Velocity.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Velocity.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Velocity.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Velocity.valueToCode(block, atId,
        Blockly.Velocity.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Velocity.valueToCode(block, atId,
        Blockly.Velocity.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Velocity.valueToCode(block, atId,
        Blockly.Velocity.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Velocity.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    at = "#set($Integer = 0) $Integer.parseInt(" + at + ")";
    delta = "#set($Integer = 0) $Integer.parseInt(" + delta + ")";
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Velocity.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Velocity.ORDER_SUBTRACTION;
    }
    at = "#set($Integer = 0) $Integer.parseInt(" + at + ")";
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Velocity.ORDER_UNARY_NEGATION;
    }
    at = "#set($Integer = 0) $Integer.parseInt(" + at + ")"
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
