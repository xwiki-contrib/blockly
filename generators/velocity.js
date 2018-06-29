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
    'Blockly,' +  // In case JS is evaled in the current window.
        // http://Velocity.net/manual/en/reserved.keywords.Velocity
    '__halt_compiler,abstract,and,array,as,break,callable,case,catch,class,clone,const,continue,declare,default,die,do,echo,else,elseif,empty,enddeclare,endfor,endforeach,endif,endswitch,endwhile,eval,exit,extends,final,for,foreach,function,global,goto,if,implements,include,include_once,instanceof,insteadof,interface,isset,list,namespace,new,or,print,private,protected,public,require,require_once,return,static,switch,throw,trait,try,unset,use,var,while,xor,' +
        // http://Velocity.net/manual/en/reserved.constants.Velocity
    'Velocity_VERSION,Velocity_MAJOR_VERSION,Velocity_MINOR_VERSION,Velocity_RELEASE_VERSION,Velocity_VERSION_ID,Velocity_EXTRA_VERSION,Velocity_ZTS,Velocity_DEBUG,Velocity_MAXPATHLEN,Velocity_OS,Velocity_SAPI,Velocity_EOL,Velocity_INT_MAX,Velocity_INT_SIZE,DEFAULT_INCLUDE_PATH,PEAR_INSTALL_DIR,PEAR_EXTENSION_DIR,Velocity_EXTENSION_DIR,Velocity_PREFIX,Velocity_BINDIR,Velocity_BINARY,Velocity_MANDIR,Velocity_LIBDIR,Velocity_DATADIR,Velocity_SYSCONFDIR,Velocity_LOCALSTATEDIR,Velocity_CONFIG_FILE_PATH,Velocity_CONFIG_FILE_SCAN_DIR,Velocity_SHLIB_SUFFIX,E_ERROR,E_WARNING,E_PARSE,E_NOTICE,E_CORE_ERROR,E_CORE_WARNING,E_COMPILE_ERROR,E_COMPILE_WARNING,E_USER_ERROR,E_USER_WARNING,E_USER_NOTICE,E_DEPRECATED,E_USER_DEPRECATED,E_ALL,E_STRICT,__COMPILER_HALT_OFFSET__,TRUE,FALSE,NULL,__CLASS__,__DIR__,__FILE__,__FUNCTION__,__LINE__,__METHOD__,__NAMESPACE__,__TRAIT__');
        // there are more than 9,000 internal functions in http://Velocity.net/manual/en/indexes.functions.Velocity
        // do we really need to list them here?

/**
 * Order of operation ENUMs.
 * https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html
 */
Blockly.Velocity.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Velocity.ORDER_MEMBER = 0.9;   
Blockly.Velocity.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] . ?.
Blockly.Velocity.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Velocity.ORDER_UNARY_FUNCTION_CALL = 2.5; 
Blockly.Velocity.ORDER_UNARY_NEGATION = 2.5; 
Blockly.Velocity.ORDER_MULTIPLICATION = 3; // * / % ~/
Blockly.Velocity.ORDER_DIVISION = 3;
Blockly.Velocity.ORDER_ADDITION = 4;
Blockly.Velocity.ORDER_SUBTRACTION = 4;       // + -
Blockly.Velocity.ORDER_SHIFT = 5;          // << >>
Blockly.Velocity.ORDER_RELATIONAL = 6;     // >= > <= < as is is!
Blockly.Velocity.ORDER_EQUALITY = 7;      // == !=
Blockly.Velocity.ORDER_BITWISE_AND = 8;    // &
Blockly.Velocity.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Velocity.ORDER_BITWISE_OR = 10;     // |
Blockly.Velocity.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Velocity.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Velocity.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Velocity.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
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
    defvars[x] = 'var ' +
        Blockly.Velocity.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE) + ';';
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
  return line + ';\n';
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
      commentCode += Blockly.Velocity.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Velocity.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Velocity.prefixLines(comment, '// ');
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
