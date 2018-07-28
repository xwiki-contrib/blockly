/**
 * @fileoverview Generating Velocity for query blocks.
 * @author vivekbalasundaram@gmail.com (Vivek Iyer)
 */
'use strict';

goog.provide('Blockly.Velocity.Queries');

goog.require('Blockly.Velocity');


Blockly.Velocity['queries_args'] = function(block) {
  var args = '';
  // Call a method made up of any number of args of any type.
  switch (block.itemCount_) {
    case 0:
      args = '';
      break;
    case 1:
      var element = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '';
      args = element;
      break;
    case 2:
      var element0 = Blockly.Velocity.valueToCode(block, 'ADD0',
              Blockly.Velocity.ORDER_NONE) || '';
      
      var element1 = Blockly.Velocity.valueToCode(block, 'ADD1',
              Blockly.Velocity.ORDER_NONE) || '';
      args = element0 && element1 ? element0 + ", " + element1 : (element0 ? element0 : element1);
      break;
    default:
      var elems = [];
      for (var i = 0; i < block.itemCount_; i++) {
        var temp = Blockly.Velocity.valueToCode(block, 'ADD' + i,
                Blockly.Velocity.ORDER_NONE) || '';
        if(temp)
          elems.push(temp);
      }
      var tempVar = Blockly.Velocity.variableDB_.getDistinctName('x',
          Blockly.Variables.NAME_TYPE);
      args = elems.join(', ')
  }
  var code = args;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_distinct'] = function(block) {
  var value_distinct_attrib = Blockly.Velocity.valueToCode(block, 'DISTINCT_ATTRIB', Blockly.Velocity.ORDER_ATOMIC);
  var code = 'distinct ' + value_distinct_attrib;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_getxobject'] = function(block) {
  // Get XObject
  // Class name
  var className = block.getFieldValue('QUERIES_XOBJECT_NAME') || '';
  // Attrib name
  var attrib = block.getFieldValue('QUERIES_XOBJECT_ATTRIB') || '';
  var code = attrib ? "doc.object(" + className + "." + attrib + ")" : '';
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_object'] = function(block) {
  // Get Object
  var code = Blockly.Velocity.valueToCode(block, 'QUERIES_OBJECT', Blockly.Velocity.ORDER_ATOMIC) || '';
  // Attribute name
  var attrib_name = block.getFieldValue('QUERIES_OBJECT_ATTRIB');
  code = attrib_name ? code + "." + attrib_name : code;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_as'] = function(block) {
  // As keyword
  var as = block.getFieldValue('QUERIES_AS_CLAUSE') == 'TRUE';
  // Alias name
  var alias = block.getFieldValue('QUERIES_ALIAS');
  var as_clause = as && alias ? " as " + alias : (alias? " " + alias : " ");
  var query = Blockly.Velocity.valueToCode(block, 'QUERIES_AS_ARGS', Blockly.Velocity.ORDER_ATOMIC) || '';
  var code = query? query + as_clause: '';
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};


Blockly.Velocity['queries_andor'] = function(block) {
  // And/Or keyword
  var clause1 = Blockly.Velocity.valueToCode(block, 'QUERIES_ANDOR_CLAUSE1', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  var clause2 = Blockly.Velocity.valueToCode(block, 'QUERIES_ANDOR_CLAUSE2', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  var operator = block.getFieldValue('QUERIES_ANDOR_OPT');
  var code = clause1 + " " + operator + " " + clause2;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_comparison'] = function(block) {
  // Comparison operators like =,≠,>,<,≤,≥ etc
  var clause1 = Blockly.Velocity.valueToCode(block, 'QUERIES_COMPARISON_CLAUSE1', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  var clause2 = Blockly.Velocity.valueToCode(block, 'QUERIES_COMPARISON_CLAUSE2', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  var operator = block.getFieldValue('QUERIES_COMPARISON_OPT');
  var code = clause1 + " " + operator + " " + clause2;
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_main'] = function(block) {
  // Comparison operators like =,≠,>,<,≤,≥ etc
  var clause1 = Blockly.Velocity.valueToCode(block, 'QUERIES_SELECT', Blockly.Velocity.ORDER_ATOMIC);
  clause1 = clause1 ? " select " + clause1 : "";
  var clause2 = Blockly.Velocity.valueToCode(block, 'QUERIES_FROM', Blockly.Velocity.ORDER_ATOMIC);
  clause2 = clause2 ? " from " + clause2 : "";
  var clause3 = Blockly.Velocity.valueToCode(block, 'QUERIES_WHERE', Blockly.Velocity.ORDER_ATOMIC);
  clause3 = clause3 ? " where " + clause3 : "";
  var code = clause1 + clause2 + clause3;
  code = code.trim();
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};

Blockly.Velocity['queries_execute'] = function(block) {
  // Query execution
  var query = Blockly.Velocity.valueToCode(block, 'QUERIES_EXECUTE_BLOCK', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  var code = "$services.query.hql(\"" + query + "\").execute()\n"
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};


Blockly.Velocity['queries_not'] = function(block) {
  // Not keyword
  var code = "not" + " " + Blockly.Velocity.valueToCode(block, 'QUERIES_NOT_CLAUSE', Blockly.Velocity.ORDER_ATOMIC) || 'false';
  return [code, Blockly.Velocity.ORDER_ATOMIC];
};