/**
 * @fileoverview Math blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Constants.EnvVariables');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.MATH_HUE. (2018 April 5)
 */
Blockly.Constants.EnvVariables.HUE = 230;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for constants: $document, $xwiki, $context, $services.
  {
    "type": "envvar_text",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "ENVVAR_TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": "%{BKY_ENVVAR_HUE}",
    "helpUrl": "%{BKY_ENVVAR_TEXT_HELPURL}",
    "tooltip": "%{BKY_ENVVAR_TEXT_TOOLTIP}",
    "extensions": [
      "parent_tooltip_when_inline"
    ]
  },
  {
    "type": "envvar_constant",
    "message0": "XWiki Binding %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ENVVAR_CONSTANT",
        "options": [
          ["Document", "$doc"],
          ["XWiki", "$xwiki"],
          ["Context", "$xcontext"],
          ["Services", "$services"],
          ["Request", "$request"],
          ["Response", "$response"]
        ]
      }
    ],
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_CONSTANT_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_CONSTANT_HELPURL}"
  },
  {
    "type": "envvar_method",
    "message0": "XWiki Binding %1 Method %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ENVVAR_METHOD"
      },
      {
        "type": "input_value",
        "name": "ENVVAR_METHOD_TEXT",
        "check": "String"
      }
    ],
    "inputsInline": false,
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_METHOD_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_METHOD_HELPURL}",
    "mutator": "envvar_method_args_mutator"
  },
  {
    "type": "envvar_create_args_container",
    "message0": "%{BKY_ENVVAR_METHOD_CREATE_ARGS_TITLE} %1 %2",
    "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STACK"
    }],
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_METHOD_CREATE_ARGS_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "envvar_create_args_item",
    "message0": "%{BKY_ENVVAR_METHOD_CREATE_ARG_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_METHOD_CREATE_ARG_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "envvar_attrib",
    "message0": "XWiki Binding %1 Attribute %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ENVVAR_ATTRIB"
      },
      {
        "type": "field_input",
        "name": "ENVVAR_ATTRIB_TEXT",
        "text": ""
      }
    ],
    "inputsInline": true,
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_ATTRIB_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_ATTRIB_HELPURL}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin for mutator functions in the 'envvar_method_args_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.EnvVariables.ENVVAR_METHOD_ARGS_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of arguments to method call.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('args', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('args'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('envvar_create_args_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('envvar_create_args_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg['ENVVAR_METHOD_CREATEWITH']);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

/**
 *
 * @mixin
 * @package
 * @readonly
 */
Blockly.Constants.EnvVariables.QUOTE_IMAGE_MIXIN = {
  /**
   * Image data URI of an LTR opening double quote (same as RTL closing double quote).
   * @readonly
   */
  QUOTE_IMAGE_LEFT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
    '1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
    'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
    'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
  /**
   * Image data URI of an LTR closing double quote (same as RTL opening double quote).
   * @readonly
   */
  QUOTE_IMAGE_RIGHT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
    'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
    'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
    'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
  /**
   * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_WIDTH: 12,
  /**
   * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_HEIGHT: 12,

  /**
   * Inserts appropriate quote images before and after the named field.
   * @param {string} fieldName The name of the field to wrap with quotes.
   * @this Blockly.Block
   */
  quoteField_: function(fieldName) {
    for (var i = 0, input; input = this.inputList[i]; i++) {
      for (var j = 0, field; field = input.fieldRow[j]; j++) {
        if (fieldName == field.name) {
          input.insertFieldAt(j, this.newQuote_(true));
          input.insertFieldAt(j + 2, this.newQuote_(false));
          return;
        }
      }
    }
    console.warn('field named "' + fieldName + '" not found in ' + this.toDevString());
  },

  /**
   * A helper function that generates a FieldImage of an opening or
   * closing double quote. The selected quote will be adapted for RTL blocks.
   * @param {boolean} open If the image should be open quote (“ in LTR).
   *                       Otherwise, a closing quote is used (” in LTR).
   * @returns {!Blockly.FieldImage} The new field.
   * @this Blockly.Block
   */
  newQuote_: function(open) {
    var isLeft = this.RTL ? !open : open;
    var dataUri = isLeft ?
      this.QUOTE_IMAGE_LEFT_DATAURI :
      this.QUOTE_IMAGE_RIGHT_DATAURI;
    return new Blockly.FieldImage(
        dataUri,
        this.QUOTE_IMAGE_WIDTH,
        this.QUOTE_IMAGE_HEIGHT,
        isLeft ? '\u201C' : '\u201D');
  }
};


/**
 * Performs final setup of a text_join block.
 * @this Blockly.Block
 */
Blockly.Constants.EnvVariables.ENVVAR_METHOD_ARGS_EXTENSION = function() {
  // Add the quote mixin for the itemCount_ = 0 case.
  this.mixin(Blockly.Constants.EnvVariables.QUOTE_IMAGE_MIXIN);
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['envvar_create_args_item']));
};

Blockly.Extensions.registerMutator('envvar_method_args_mutator',
    Blockly.Constants.EnvVariables.ENVVAR_METHOD_ARGS_MUTATOR_MIXIN,
    Blockly.Constants.EnvVariables.ENVVAR_METHOD_ARGS_EXTENSION);
