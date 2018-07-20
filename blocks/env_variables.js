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
        "type": "field_dropdown",
        "name": "ENVVAR_METHOD_CONSTANT",
        "options": [
          ["Document", "$doc"],
          ["XWiki", "$xwiki"],
          ["Context", "$xcontext"],
          ["Services", "$services"],
          ["Request", "$request"],
          ["Response", "$response"]
        ]
      },
      {
        "type": "field_input",
        "name": "ENVVAR_METHOD_TEXT",
        "text": ""
      }
    ],
    "inputsInline": "false",
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_METHOD_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_METHOD_HELPURL}"
  },
  {
    "type": "envvar_attrib",
    "message0": "XWiki Binding %1 Attribute %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ENVVAR_ATTRIB_CONSTANT",
        "options": [
          ["Document", "$doc"],
          ["XWiki", "$xwiki"],
          ["Context", "$xcontext"],
          ["Services", "$services"],
          ["Request", "$request"],
          ["Response", "$response"]
        ]
      },
      {
        "type": "field_input",
        "name": "ENVVAR_ATTRIB_TEXT",
        "text": ""
      }
    ],
    "inputsInline": "false",
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_ATTRIB_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_ATTRIB_HELPURL}"
  },
  {
    "type": "envvar_method_custom",
    "message0": "XWiki Custom Binding %1 Method %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ENVVAR_METHOD_CUSTOM"
      },
      {
        "type": "field_input",
        "name": "ENVVAR_METHOD_TEXT_CUSTOM",
        "text": ""
      }
    ],
    "inputsInline": "true",
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_METHOD_CUSTOM_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_METHOD_CUSTOM_HELPURL}"
  },
  {
    "type": "envvar_attrib_custom",
    "message0": "XWiki Custom Binding %1 Attribute %2",
    "args0": [
      {
        "type": "input_value",
        "name": "ENVVAR_ATTRIB_CUSTOM"
      },
      {
        "type": "field_input",
        "name": "ENVVAR_ATTRIB_TEXT_CUSTOM",
        "text": ""
      }
    ],
    "inputsInline": "true",
    "output": "null",
    "colour": "%{BKY_ENVVAR_HUE}",
    "tooltip": "%{BKY_ENVVAR_ATTRIB_CUSTOM_TOOLTIP}",
    "helpUrl": "%{BKY_ENVVAR_ATTRIB_CUSTOM_HELPURL}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)