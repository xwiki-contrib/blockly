/**
 * @fileoverview HQL Query blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Constants.Queries');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.QUERIES_HUE. (2018 April 5)
 */
Blockly.Constants.Queries.HUE = 150;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for HQL queries
  {
    "type": "queries_select_args",
    "message0": "",
    "output": "String",
    "colour": "%{BKY_QUERIES_HUE}",
    "inputsInline": true,
    "tooltip": "%{BKY_QUERIES_SELECT_ARGS_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_SELECT_ARGS_HELPURL}",
    "mutator": "queries_select_args_mutator"
  },
  {
    "type": "queries_select_args_container",
    "message0": "%{BKY_QUERIES_SELECT_ARGS_TITLE} %1 %2",
    "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STACK"
    }],
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_SELECT_ARGS_CONTAINER_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "queries_select_args_item",
    "message0": "%{BKY_QUERIES_SELECT_ARGS_ITEM_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_SELECT_ARGS_ITEM_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "queries_from_args",
    "message0": "",
    "output": "String",
    "colour": "%{BKY_QUERIES_HUE}",
    "inputsInline": true,
    "tooltip": "%{BKY_QUERIES_FROM_ARGS_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_FROM_ARGS_HELPURL}",
    "mutator": "queries_from_args_mutator"
  },
  {
    "type": "queries_from_args_container",
    "message0": "%{BKY_QUERIES_FROM_ARGS_TITLE} %1 %2",
    "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STACK"
    }],
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_FROM_ARGS_CONTAINER_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "queries_from_args_item",
    "message0": "%{BKY_QUERIES_FROM_ARGS_ITEM_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_FROM_ARGS_ITEM_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "queries_distinct",
    "message0": "DISTINCT %1",
    "args0": [
      {
        "type": "input_value",
        "name": "DISTINCT_ATTRIB"
      }
    ],
    "output": "null",
    "colour": "%{BKY_COLOUR_HUE}",
    "tooltip": "%{BKY_QUERIES_DISTINCT_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_DISTINCT_HELPURL}"
  },
  {
    "type": "queries_getxobject",
    "message0": "Get XObject %1 Attribute %2",
    "args0": [
      {
        "type": "field_input",
        "name": "QUERIES_XOBJECT_NAME",
        "text": "XWiki"
      },
      {
        "type": "field_input",
        "name": "QUERIES_XOBJECT_ATTRIB",
        "text": "XWikiUsers"
      }
    ],
    "inputsInline": true,
    "output": "null",
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_XOBJECT_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_XOBJECT_HELPURL}"
  },
  {
    "type": "queries_object",
    "message0": "Object %1 Attribute %2",
    "args0": [
      {
        "type": "input_value",
        "name": "QUERIES_OBJECT"
      },
      {
        "type": "field_input",
        "name": "QUERIES_OBJECT_ATTRIB",
        "text": ""
      }
    ],
    "inputsInline": true,
    "output": "null",
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_OBJECT_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_OBJECT_HELPURL}"
  },
  {
    "type": "queries_as",
    "message0": "As %1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "QUERIES_AS_CLAUSE",
        "options": [
          [
            "as",
            "as"
          ],
          [
            "nil",
            ""
          ]
        ]
      },
      {
        "type": "field_input",
        "name": "QUERIES_ALIAS",
        "text": ""
      },
      {
        "type": "input_value",
        "name": "QUERIES_AS_ARGS"
      }
    ],
    "inputsInline": false,
    "output": "null",
    "colour": "%{BKY_QUERIES_HUE}",
    "tooltip": "%{BKY_QUERIES_AS_TOOLTIP}",
    "helpUrl": "%{BKY_QUERIES_AS_HELPURL}"
  }
   
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin for mutator functions in the 'queries_select_args_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Queries.QUERIES_SELECT_ARGS_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of arguments to method call.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('item', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('item'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('queries_select_args_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('queries_select_args_item');
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
          input.appendField(Blockly.Msg['QUERIES_SELECT_ARGS_CREATEWITH']);
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
Blockly.Constants.Queries.QUOTE_IMAGE_MIXIN = {
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
 * Performs final setup of a queries_select_args block.
 * @this Blockly.Block
 */
Blockly.Constants.Queries.QUERIES_SELECT_ARGS_EXTENSION = function() {
  // Add the quote mixin for the itemCount_ = 0 case.
  this.mixin(Blockly.Constants.Queries.QUOTE_IMAGE_MIXIN);
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['queries_select_args_item']));
};

Blockly.Extensions.registerMutator('queries_select_args_mutator',
    Blockly.Constants.Queries.QUERIES_SELECT_ARGS_MUTATOR_MIXIN,
    Blockly.Constants.Queries.QUERIES_SELECT_ARGS_EXTENSION);

/**
 * Mixin for mutator functions in the 'queries_from_args_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Queries.QUERIES_FROM_ARGS_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of arguments to method call.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('item', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('item'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('queries_from_args_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('queries_from_args_item');
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
          input.appendField(Blockly.Msg['QUERIES_FROM_ARGS_CREATEWITH']);
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
 * Performs final setup of a queries_from_args block.
 * @this Blockly.Block
 */
Blockly.Constants.Queries.QUERIES_FROM_ARGS_EXTENSION = function() {
  // Add the quote mixin for the itemCount_ = 0 case.
  this.mixin(Blockly.Constants.Queries.QUOTE_IMAGE_MIXIN);
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['queries_from_args_item']));
};

Blockly.Extensions.registerMutator('queries_from_args_mutator',
    Blockly.Constants.Queries.QUERIES_FROM_ARGS_MUTATOR_MIXIN,
    Blockly.Constants.Queries.QUERIES_FROM_ARGS_EXTENSION);

