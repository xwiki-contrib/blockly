// Do not edit this file; automatically generated by build.py.
'use strict';


Blockly.Velocity=new Blockly.Generator("Velocity");Blockly.Velocity.addReservedWords("Blockly,#break,#define,#else,#elsif,#end,#evaluate,#foreach,#if,#include,#parse,#set,#stop,#macro,$collectionstool,$datetool,$escapetool,$jsontool,$listtool,$mathtool,$msg,$numbertool$regextool,$sorttool,$stringtool,$urltool,$exceptiontool,$niotooltrue, false");Blockly.Velocity.ORDER_ATOMIC=0;Blockly.Velocity.ORDER_MEMBER=.9;Blockly.Velocity.ORDER_UNARY_FUNCTION_CALL=2.5;Blockly.Velocity.ORDER_UNARY_NEGATION=2.5;
Blockly.Velocity.ORDER_MULTIPLICATION=3;Blockly.Velocity.ORDER_DIVISION=3;Blockly.Velocity.ORDER_ADDITION=4;Blockly.Velocity.ORDER_SUBTRACTION=4;Blockly.Velocity.ORDER_RELATIONAL=6;Blockly.Velocity.ORDER_EQUALITY=7;Blockly.Velocity.ORDER_BITWISE_OR=10;Blockly.Velocity.ORDER_LOGICAL_AND=11;Blockly.Velocity.ORDER_LOGICAL_OR=12;Blockly.Velocity.ORDER_ASSIGNMENT=14;Blockly.Velocity.ORDER_COMMA=18;Blockly.Velocity.ORDER_NONE=99;
Blockly.Velocity.ORDER_OVERRIDES=[[Blockly.Velocity.ORDER_FUNCTION_CALL,Blockly.Velocity.ORDER_MEMBER],[Blockly.Velocity.ORDER_FUNCTION_CALL,Blockly.Velocity.ORDER_FUNCTION_CALL],[Blockly.Velocity.ORDER_MEMBER,Blockly.Velocity.ORDER_MEMBER],[Blockly.Velocity.ORDER_MEMBER,Blockly.Velocity.ORDER_FUNCTION_CALL],[Blockly.Velocity.ORDER_LOGICAL_NOT,Blockly.Velocity.ORDER_LOGICAL_NOT],[Blockly.Velocity.ORDER_MULTIPLICATION,Blockly.Velocity.ORDER_MULTIPLICATION],[Blockly.Velocity.ORDER_ADDITION,Blockly.Velocity.ORDER_ADDITION],
[Blockly.Velocity.ORDER_LOGICAL_AND,Blockly.Velocity.ORDER_LOGICAL_AND],[Blockly.Velocity.ORDER_LOGICAL_OR,Blockly.Velocity.ORDER_LOGICAL_OR]];
Blockly.Velocity.init=function(a){Blockly.Velocity.definitions_=Object.create(null);Blockly.Velocity.functionNames_=Object.create(null);Blockly.Velocity.variableDB_?Blockly.Velocity.variableDB_.reset():Blockly.Velocity.variableDB_=new Blockly.Names(Blockly.Velocity.RESERVED_WORDS_,"$");Blockly.Velocity.variableDB_.setVariableMap(a.getVariableMap());for(var b=[],c=Blockly.Variables.allDeveloperVariables(a),d=0;d<c.length;d++)b.push(Blockly.Velocity.variableDB_.getName(c[d],Blockly.Names.DEVELOPER_VARIABLE_TYPE)+
" = $NULL");a=Blockly.Variables.allUsedVarModels(a);for(d=0;d<a.length;d++)b.push(Blockly.Velocity.variableDB_.getName(a[d].getId(),Blockly.Variables.NAME_TYPE)+" = $NULL");b.length&&(Blockly.Velocity.definitions_.variables="")};Blockly.Velocity.finish=function(a){var b=[],c;for(c in Blockly.Velocity.definitions_)b.push(Blockly.Velocity.definitions_[c]);delete Blockly.Velocity.definitions_;delete Blockly.Velocity.functionNames_;Blockly.Velocity.variableDB_.reset();return b.join("\n\n")+"\n\n\n"+a};
Blockly.Velocity.scrubNakedValue=function(a){return a+"\n"};Blockly.Velocity.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.Velocity.scrub_=function(a,b){var c="";if(!a.outputConnection||!a.outputConnection.targetConnection){var d=a.getCommentText();(d=Blockly.utils.wrap(d,Blockly.Velocity.COMMENT_WRAP-3))&&(c=a.getProcedureDef?c+("#*\n"+Blockly.Velocity.prefixLines(d+"\n"," ")+"*#\n"):c+Blockly.Velocity.prefixLines(d+"\n","## "));for(var e=0;e<a.inputList.length;e++)a.inputList[e].type==Blockly.INPUT_VALUE&&(d=a.inputList[e].connection.targetBlock())&&(d=Blockly.Velocity.allNestedComments(d))&&(c+=Blockly.Velocity.prefixLines(d,
"## "))}e=a.nextConnection&&a.nextConnection.targetBlock();e=Blockly.Velocity.blockToCode(e);return c+b+e};
Blockly.Velocity.getAdjusted=function(a,b,c,d,e){c=c||0;e=e||Blockly.Velocity.ORDER_NONE;a.workspace.options.oneBasedIndex&&c--;var f=a.workspace.options.oneBasedIndex?"1":"0";a=0<c?Blockly.Velocity.valueToCode(a,b,Blockly.Velocity.ORDER_ADDITION)||f:0>c?Blockly.Velocity.valueToCode(a,b,Blockly.Velocity.ORDER_SUBTRACTION)||f:d?Blockly.Velocity.valueToCode(a,b,Blockly.Velocity.ORDER_UNARY_NEGATION)||f:Blockly.Velocity.valueToCode(a,b,e)||f;if(Blockly.isNumber(a))a=parseFloat(a)+c,d&&(a=-a);else{a=
"#set($Integer = 0) $Integer.parseInt("+a+")";c="#set($Integer = 0) $Integer.parseInt("+c+")";if(0<c){a=a+" + "+c;var g=Blockly.Velocity.ORDER_ADDITION}else 0>c&&(a=a+" - "+-c,g=Blockly.Velocity.ORDER_SUBTRACTION);a="#set($Integer = 0) $Integer.parseInt("+a+")";d&&(a=c?"-("+a+")":"-"+a,g=Blockly.Velocity.ORDER_UNARY_NEGATION);a="#set($Integer = 0) $Integer.parseInt("+a+")";g=Math.floor(g);e=Math.floor(e);g&&e>=g&&(a="("+a+")")}return a};Blockly.Velocity.colour={};Blockly.Velocity.colour_picker=function(a){return["'"+a.getFieldValue("COLOUR")+"'",Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.colour_random=function(a){return["#set ($s = '#%06X')#set ($lim = $mathtool.pow(2,24) - 1)$s.format($s, $lim)",Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.colour_rgb=function(a){var b=Blockly.Velocity.valueToCode(a,"RED",Blockly.Velocity.ORDER_COMMA)||0,c=Blockly.Velocity.valueToCode(a,"GREEN",Blockly.Velocity.ORDER_COMMA)||0;a=Blockly.Velocity.valueToCode(a,"BLUE",Blockly.Velocity.ORDER_COMMA)||0;return["#set ($s = '#%02x%02x%02x')$s.format($s,"+("$mathtool.round($mathtool.min(100, $mathtool.max(0,"+b+")) * 2.55)")+", "+("$mathtool.round($mathtool.min(100, $mathtool.max(0,"+c+")) * 2.55)")+", "+("$mathtool.round($mathtool.min(100, $mathtool.max(0,"+
a+")) * 2.55)")+")$s",Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.colour_blend=function(a){var b=Blockly.Velocity.valueToCode(a,"COLOUR1",Blockly.Velocity.ORDER_COMMA)||"'#000000'",c=Blockly.Velocity.valueToCode(a,"COLOUR2",Blockly.Velocity.ORDER_COMMA)||"'#000000'";Blockly.Velocity.valueToCode(a,"RATIO",Blockly.Velocity.ORDER_COMMA);return["#set($Integer = 0)"+("#set($r1 = '"+b+"'.substring(1,3))$Integer.parseInt($r1,16)")+("#set($r2 = '"+c+"'.substring(1,3))$Integer.parseInt($r2,16)")+("#set($g1 = '"+b+"'.substring(3,5))$Integer.parseInt($g1,16)")+
("#set($g2 = '"+c+"'.substring(3,5))$Integer.parseInt($g2,16)")+("#set($b1 = '"+b+"'.substring(5,7))$Integer.parseInt($b1,16)")+("#set($b2 = '"+c+"'.substring(5,7))$Integer.parseInt($b2,16)")+"#set($temp = $r1 * (1 - $ratio) + $r2 * $ratio)#set($r = $mathtool.round($temp)#set($temp = $g1 * (1 - $ratio) + $g2 * $ratio)#set($g = $mathtool.round($temp)#set($temp = $b1 * (1 - $ratio) + $b2 * $ratio)#set($b = $mathtool.round($temp)#set ($s = '#%02x%02x%02x')$s.format($s,$r,$g,$b)$s",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.EnvVariables={};Blockly.Velocity.envvar_constant=function(a){return[a.getFieldValue("ENVVAR_CONSTANT"),Blockly.Velocity.ORDER_MEMBER]};
Blockly.Velocity.envvar_method=function(a){var b=Blockly.Velocity.valueToCode(a,"ENVVAR_METHOD",Blockly.Velocity.ORDER_ATOMIC)||"",c=Blockly.Velocity.valueToCode(a,"ENVVAR_METHOD_TEXT",Blockly.Velocity.ORDER_ATOMIC)||"";switch(a.itemCount_){case 0:a="";break;case 1:a=Blockly.Velocity.valueToCode(a,"ADD0",Blockly.Velocity.ORDER_NONE)||"";break;case 2:var d=Blockly.Velocity.valueToCode(a,"ADD0",Blockly.Velocity.ORDER_NONE)||"";a=Blockly.Velocity.valueToCode(a,"ADD1",Blockly.Velocity.ORDER_NONE)||"";
a=d&&a?d+", "+a:d?d:a;break;default:d=[];for(var e=0;e<a.itemCount_;e++){var f=Blockly.Velocity.valueToCode(a,"ADD"+e,Blockly.Velocity.ORDER_NONE)||"";f&&d.push(f)}Blockly.Velocity.variableDB_.getDistinctName("x",Blockly.Variables.NAME_TYPE);a=d.join(", ")}return[c?b+"."+c+"("+a+")":b,Blockly.Velocity.ORDER_ATOMIC]};
Blockly.Velocity.envvar_attrib=function(a){var b=Blockly.Velocity.valueToCode(a,"ENVVAR_ATTRIB",Blockly.Velocity.ORDER_ATOMIC)||"";a=a.getFieldValue("ENVVAR_ATTRIB_TEXT");return[a?b+"."+a:b,Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.envvar_text=function(a){return[a.getFieldValue("ENVVAR_TEXT"),Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.lists={};Blockly.Velocity.lists_create_empty=function(a){return["[]",Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Velocity.valueToCode(a,"ADD"+c,Blockly.Velocity.ORDER_COMMA)||"$NULL";b="["+b.join(", ")+"]";return[b,Blockly.Velocity.ORDER_ATOMIC]};
Blockly.Velocity.lists_repeat=function(a){var b=Blockly.Velocity.valueToCode(a,"ITEM",Blockly.Velocity.ORDER_COMMA)||"$NULL";return["#set($array = [])#foreach ($number in [1.."+(Blockly.Velocity.valueToCode(a,"NUM",Blockly.Velocity.ORDER_COMMA)||"0")+"])#set($temp = $array.add("+b+"))#end$array",Blockly.Velocity.ORDER_MULTIPLICATIVE]};
Blockly.Velocity.lists_length=function(a){return["#set ($list = "+(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_FUNCTION_CALL)||"[]")+".size())$list",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.lists_isEmpty=function(a){return[(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_MEMBER)||"[]")+".isEmpty()",Blockly.Velocity.ORDER_LOGICAL_NOT]};
Blockly.Velocity.lists_indexOf=function(a){var b="FIRST"==a.getFieldValue("END")?"indexOf":"lastIndexOf",c=Blockly.Velocity.valueToCode(a,"FIND",Blockly.Velocity.ORDER_NONE)||"''";b=(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_MEMBER)||"[]")+"."+b+"("+c+")";return a.workspace.options.oneBasedIndex?["#set($index = "+b+" + 1)$index",Blockly.Velocity.ORDER_ADDITION]:[b,Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.lists_getIndex=function(a){var b=a.getFieldValue("MODE")||"GET",c=a.getFieldValue("WHERE")||"FROM_START",d=Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_MEMBER)||"[]";if("FIRST"==c){if("GET"==b)return[d+"[0]",Blockly.Velocity.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".remove(0)",Blockly.Velocity.ORDER_MEMBER];if("REMOVE"==b)return d+".remove(0)\n"}else if("LAST"==c){if("GET"==b)return[d+"[-1]",Blockly.Velocity.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".remove("+
d+".indexOf("+d+"[-1]))",Blockly.Velocity.ORDER_MEMBER];if("REMOVE"==b)return d+".remove("+d+".indexOf("+d+"[-1]))\n"}else if("FROM_START"==c){var e=Blockly.Velocity.getAdjusted(a,"AT");if("GET"==b)return[d+"["+e+"]",Blockly.Velocity.ORDER_MEMBER];if("GET_REMOVE"==b)return[d+".remove("+e+")",Blockly.Velocity.ORDER_FUNCTION_CALL];if("REMOVE"==b)return d+".remove("+e+")\n"}else if("FROM_END"==c){if("GET"==b)return[d+"[-"+e+"]",Blockly.Velocity.ORDER_FUNCTION_CALL];if("GET_REMOVE"==b)return[d+".remove("+
d+".indexOf("+d+"[-"+e+"]))",Blockly.Velocity.ORDER_MEMBER];if("REMOVE"==b)return d+".remove("+d+".indexOf("+d+"[-"+e+"]))\n"}else if("RANDOM"==c){if("GET"==b)return[d+"[$mathtool.random(0,"+d+".size())]",Blockly.Python.ORDER_FUNCTION_CALL];a=d+".remove($mathtool.random(0,"+d+".size()))";if("GET_REMOVE"==b)return[a,Blockly.Python.ORDER_FUNCTION_CALL];if("REMOVE"==b)return a+"\n"}throw"Unhandled combination (lists_getIndex).";};
Blockly.Velocity.lists_setIndex=function(a){function b(){if(c.match(/^\w+$/))return"";var a=Blockly.Velocity.variableDB_.getDistinctName("tmp_list",Blockly.Variables.NAME_TYPE),b="#set("+a+" = "+c+")";c=a;return b}var c=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_MEMBER)||"[]",d=a.getFieldValue("MODE")||"GET",e=a.getFieldValue("WHERE")||"FROM_START",f=Blockly.Velocity.valueToCode(a,"AT",Blockly.Velocity.ORDER_NONE)||"1",g=Blockly.Velocity.valueToCode(a,"TO",Blockly.Velocity.ORDER_ASSIGNMENT)||
"$NULL";if("FIRST"==e){if("SET"==d)return"#set("+c+"[0] = "+g+")\n";if("INSERT"==d)return"#set(#temp="+c+".add(0, "+g+"))\n"}else if("LAST"==e){if("SET"==d)return a=b(),a+("#set("+c+"[-1] = "+g+")");if("INSERT"==d)return"#set($index="+c+".indexOf("+c+"[-1]) + 1)\n"+c+".add($index, "+g+")\n"}else if("FROM_START"==e){f=Blockly.Velocity.getAdjusted(a,"AT");if("SET"==d)return"#set("+c+"["+f+"] = "+g+")\n";if("INSERT"==d)return c+".add("+f+", "+g+")\n"}else if("FROM_END"==e){a=b();if("SET"==d)return a+
("#set("+c+"[-"+f+"] = "+g+")");if("INSERT"==d)return a+("#set($index="+c+".indexOf("+c+"[-"+f+"]) + 1)\n"+c+".add($index, "+g+")\n")}else if("RANDOM"==e){a=b();f=Blockly.Velocity.variableDB_.getDistinctName("tmp_x",Blockly.Variables.NAME_TYPE);a+="#set("+f+" = $mathtool.random(0,"+c+".size())";if("SET"==d)return a+("#set("+c+"["+f+"] = "+g+")");if("INSERT"==d)return a+(c+".add("+f+", "+g+")\n")}throw"Unhandled combination (lists_setIndex).";};
Blockly.Velocity.lists.getIndex_=function(a,b,c){return"FIRST"==b?"0":"FROM_END"==b?"#set ($index = "+a+".size() - 1 - "+c+")$index":"LAST"==b?"#set ($index = "+a+".size() - 1)$index":c};
Blockly.Velocity.lists_getSublist=function(a){var b=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_MEMBER)||"[]",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2"),e="";if("FIRST"==c&&"LAST"==d)e=b;else{switch(c){case "FROM_START":c=Blockly.Velocity.getAdjusted(a,"AT1");break;case "FROM_END":c=Blockly.Velocity.getAdjusted(a,"AT1",1,!1,Blockly.Velocity.ORDER_SUBTRACTION);c=b+".size() - "+c;break;case "FIRST":c="0";break;default:throw"Unhandled option (lists_getSublist).";}switch(d){case "FROM_START":a=
Blockly.Velocity.getAdjusted(a,"AT2",1);break;case "FROM_END":a=Blockly.Velocity.getAdjusted(a,"AT2",0,!1,Blockly.Velocity.ORDER_SUBTRACTION);a=b+".size() - "+a;break;case "LAST":a=b+".size()";break;default:throw"Unhandled option (lists_getSublist).";}e+=b+".subList("+c+", "+a+")"}return[e,Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.lists_split=function(a){var b=Blockly.Velocity.valueToCode(a,"INPUT",Blockly.Velocity.ORDER_MEMBER),c=Blockly.Velocity.valueToCode(a,"DELIM",Blockly.Velocity.ORDER_NONE)||"''";a=a.getFieldValue("MODE");if("SPLIT"==a)b||(b="''"),b="$stringtool.split("+b+","+c+")";else if("JOIN"==a)b||(b="[]"),b="$stringtool.join("+b+","+c+")";else throw"Unknown mode: "+a;return[b,Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.lists_reverse=function(a){a=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_FUNCTION_CALL)||"[]";return["#set($array2 = [])\n#set($sz = "+a+".size() - 1)\n#foreach ($i in [$sz..0])\n#set($temp = $array2.add("+a+"[$i]))\n#end\n$array2",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.lists_sort=function(a){var b=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_FUNCTION_CALL)||"[]";a.getFieldValue("DIRECTION");return["$sorttool.sort("+b+")",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.logic={};Blockly.Velocity.controls_if=function(a){var b=0,c="";do{var d=Blockly.Velocity.valueToCode(a,"IF"+b,Blockly.Velocity.ORDER_NONE)||"false";var e=Blockly.Velocity.statementToCode(a,"DO"+b);c+=(0<b?"#elseif":"#if")+" ("+d+")\n"+e+"\n";++b}while(a.getInput("IF"+b));a.getInput("ELSE")&&(e=Blockly.Velocity.statementToCode(a,"ELSE"),c+="#else\n"+e+"\n");return c+"#end\n"};Blockly.Velocity.controls_ifelse=Blockly.Velocity.controls_if;
Blockly.Velocity.logic_compare=function(a){var b={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],c="=="==b||"!="==b?Blockly.Velocity.ORDER_EQUALITY:Blockly.Velocity.ORDER_RELATIONAL,d=Blockly.Velocity.valueToCode(a,"A",c)||"0";a=Blockly.Velocity.valueToCode(a,"B",c)||"0";return[d+" "+b+" "+a,c]};
Blockly.Velocity.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"&&":"||",c="&&"==b?Blockly.Velocity.ORDER_LOGICAL_AND:Blockly.Velocity.ORDER_LOGICAL_OR,d=Blockly.Velocity.valueToCode(a,"A",c);a=Blockly.Velocity.valueToCode(a,"B",c);if(d||a){var e="&&"==b?"true":"false";d||(d=e);a||(a=e)}else a=d="false";return[d+" "+b+" "+a,c]};Blockly.Velocity.logic_negate=function(a){var b=Blockly.Velocity.ORDER_LOGICAL_NOT;return["!"+(Blockly.Velocity.valueToCode(a,"BOOL",b)||"true"),b]};
Blockly.Velocity.logic_boolean=function(a){return["TRUE"==a.getFieldValue("BOOL")?"true":"false",Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.logic_null=function(a){return["$NULL",Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.loops={};
Blockly.Velocity.controls_repeat_ext=function(a){var b=a.getField("TIMES")?String(Number(a.getFieldValue("TIMES"))):Blockly.Velocity.valueToCode(a,"TIMES",Blockly.Velocity.ORDER_ASSIGNMENT)||"0",c=Blockly.Velocity.statementToCode(a,"DO");c=Blockly.Velocity.addLoopTrap(c,a.id);a="";var d=Blockly.Velocity.variableDB_.getDistinctName("count",Blockly.Variables.NAME_TYPE),e=b;b.match(/^\w+$/)||Blockly.isNumber(b)||(e=Blockly.Velocity.variableDB_.getDistinctName("repeat_end",Blockly.Variables.NAME_TYPE),a+=
"#set( "+e+" = "+b+")\n");return a+("#foreach ("+d+" in [0.."+e+"])\n"+c+"\n#end\n")};Blockly.Velocity.controls_repeat=Blockly.Velocity.controls_repeat_ext;
Blockly.Velocity.controls_forEach=function(a){var b=Blockly.Velocity.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_RELATIONAL)||"[]",d=Blockly.Velocity.statementToCode(a,"DO");d=Blockly.Velocity.addLoopTrap(d,a.id)||Blockly.Velocity.PASS;return"#foreach ("+b+" in "+c+")\n"+d+"#end\n"};
Blockly.Velocity.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return"#break"}throw"Unknown flow statement.";};Blockly.Velocity.math={};Blockly.Velocity.math_number=function(a){a=parseFloat(a.getFieldValue("NUM"));return[a,0<=a?Blockly.Velocity.ORDER_ATOMIC:Blockly.Velocity.ORDER_UNARY_NEGATION]};
Blockly.Velocity.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.Velocity.ORDER_ADDITION],MINUS:[" - ",Blockly.Velocity.ORDER_SUBTRACTION],MULTIPLY:[" * ",Blockly.Velocity.ORDER_MULTIPLICATION],DIVIDE:[" / ",Blockly.Velocity.ORDER_DIVISION],POWER:[null,Blockly.Velocity.ORDER_COMMA]}[a.getFieldValue("OP")],c=b[0];b=b[1];var d=Blockly.Velocity.valueToCode(a,"A",b)||"0";a=Blockly.Velocity.valueToCode(a,"B",b)||"0";return c?["#set ($ans = "+d+c+a+")$ans",b]:["$mathtool.pow("+d+", "+a+")",Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.math_single=function(a){var b=a.getFieldValue("OP");if("NEG"==b){a=Blockly.Velocity.valueToCode(a,"NUM",Blockly.Velocity.ORDER_UNARY_NEGATION)||"0";if("-"==a[0]){a[0]="+";var c=a}else"+"==a[0]?(a[0]="-",c=a):c="-"+a;return[c,Blockly.Velocity.ORDER_UNARY_NEGATION]}a=Blockly.Velocity.valueToCode(a,"NUM",Blockly.Velocity.ORDER_NONE)||"0";switch(b){case "ABS":c="$mathtool.abs("+a+")";break;case "EXP":c="$mathtool.pow(e,"+a+")";break;case "POW10":c="$mathtool.pow(10,"+a+")";break;case "ROUND":c=
"$mathtool.round("+a+")";break;case "ROUNDUP":c="$mathtool.ceil("+a+")";break;case "ROUNDDOWN":c="$mathtool.floor("+a+")"}return c?[c,Blockly.Velocity.ORDER_FUNCTION_CALL]:[c,Blockly.Velocity.ORDER_DIVISION]};
Blockly.Velocity.math_number_property=function(a){var b=Blockly.Velocity.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Velocity.ORDER_MODULUS)||"0";switch(a.getFieldValue("PROPERTY")){case "EVEN":var c=b+" % 2 == 0";break;case "ODD":c=b+" % 2 == 1";break;case "WHOLE":c=b+" % 1 == 0";break;case "POSITIVE":c=b+" > 0";break;case "NEGATIVE":c=b+" < 0";break;case "DIVISIBLE_BY":a=Blockly.Velocity.valueToCode(a,"DIVISOR",Blockly.Velocity.ORDER_MODULUS)||"0",c=b+" % "+a+" == 0"}return[c,Blockly.Velocity.ORDER_EQUALITY]};
Blockly.Velocity.math_change=function(a){var b=Blockly.Velocity.valueToCode(a,"DELTA",Blockly.Velocity.ORDER_ADDITION)||"0";a=Blockly.Velocity.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);return"#set ("+a+" = "+a+" + "+b+")"};Blockly.Velocity.math_round=Blockly.Velocity.math_single;Blockly.Velocity.math_trig=Blockly.Velocity.math_single;
Blockly.Velocity.math_on_list=function(a){var b=a.getFieldValue("OP");switch(b){case "SUM":var c=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_MEMBER)||"[]";a="$mathtool.getTotal("+c+")";break;case "AVERAGE":a="$mathtool.getAverage("+c+")";break;case "RANDOM":c=Blockly.Velocity.valueToCode(a,"LIST",Blockly.Velocity.ORDER_NONE)||"[]";a=c+"[$mathtool.random(0,"+c+".size())]";break;default:throw"Unknown operator: "+b;}return[a,Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.math_modulo=function(a){var b=Blockly.Velocity.valueToCode(a,"DIVIDEND",Blockly.Velocity.ORDER_MODULUS)||"0";a=Blockly.Velocity.valueToCode(a,"DIVISOR",Blockly.Velocity.ORDER_MODULUS)||"0";return["#set($rem = "+b+" % "+a+")$rem",Blockly.Velocity.ORDER_MODULUS]};
Blockly.Velocity.math_constrain=function(a){var b=Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_COMMA)||"0",c=Blockly.Velocity.valueToCode(a,"LOW",Blockly.Velocity.ORDER_COMMA)||"0";a=Blockly.Velocity.valueToCode(a,"HIGH",Blockly.Velocity.ORDER_COMMA)||"Infinity";return["$mathtool.min($mathtool.max("+b+", "+c+"), "+a+")",Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.math_random_int=function(a){var b=Blockly.Velocity.valueToCode(a,"FROM",Blockly.Velocity.ORDER_COMMA)||"0";a=Blockly.Velocity.valueToCode(a,"TO",Blockly.Velocity.ORDER_COMMA)||"10";return["$mathtool.random("+b+", "+a+")",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.math_random_float=function(a){return["$mathtool.random(0.0,1.0)",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.procedures={};
Blockly.Velocity.procedures_defnoreturn=function(a){var b=Blockly.Velocity.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=Blockly.Velocity.statementToCode(a,"STACK");if(Blockly.Velocity.STATEMENT_PREFIX){var d=a.id.replace(/\$/g,"$$$$");c=Blockly.Velocity.prefixLines(Blockly.Velocity.STATEMENT_PREFIX.replace(/%1/g,"'"+d+"'"),Blockly.Velocity.INDENT)+c}Blockly.Velocity.INFINITE_LOOP_TRAP&&(c=Blockly.Velocity.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+c);d=[];for(var e=
0;e<a.arguments_.length;e++)d[e]=Blockly.Velocity.variableDB_.getName(a.arguments_[e],Blockly.Variables.NAME_TYPE);c="#macro( "+b+" "+d.join(" ")+" )\n"+c+"#end\n";c=Blockly.Velocity.scrub_(a,c);Blockly.Velocity.definitions_["%"+b]=c;return null};
Blockly.Velocity.procedures_callnoreturn=function(a){for(var b=Blockly.Velocity.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Velocity.valueToCode(a,"ARG"+d,Blockly.Velocity.ORDER_NONE)||"None";return"#"+b+" ("+c.join(" ")+")\n"};Blockly.Velocity.texts={};Blockly.Velocity.text=function(a){return[Blockly.Velocity.quote_(a.getFieldValue("TEXT")),Blockly.Velocity.ORDER_ATOMIC]};
Blockly.Velocity.text_join=function(a){switch(a.itemCount_){case 0:return["''",Blockly.Velocity.ORDER_ATOMIC];case 1:return[Blockly.Velocity.valueToCode(a,"ADD0",Blockly.Velocity.ORDER_NONE)||"''",Blockly.Velocity.ORDER_FUNCTION_CALL];case 2:var b=Blockly.Velocity.valueToCode(a,"ADD0",Blockly.Velocity.ORDER_NONE)||"''";a=Blockly.Velocity.valueToCode(a,"ADD1",Blockly.Velocity.ORDER_NONE)||"''";return[b+" + "+a,Blockly.Velocity.ORDER_ADDITIVE];default:b=[];for(var c=0;c<a.itemCount_;c++)b[c]=Blockly.Velocity.valueToCode(a,
"ADD"+c,Blockly.Velocity.ORDER_NONE)||"''";Blockly.Velocity.variableDB_.getDistinctName("x",Blockly.Variables.NAME_TYPE);a="["+b.join(" + ")+"]";return[a,Blockly.Velocity.ORDER_FUNCTION_CALL]}};Blockly.Velocity.text_append=function(a){var b=Blockly.Velocity.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_NONE)||"''";return"#set ("+b+" = "+b+" + "+a+")"};
Blockly.Velocity.text_length=function(a){return["$stringtool.length("+(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_NONE)||"''")+")",Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.text_isEmpty=function(a){return["$stringtool.isNotEmpty("+(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_NONE)||"''")+")",Blockly.Velocity.ORDER_LOGICAL_NOT]};
Blockly.Velocity.text_indexOf=function(a){var b="FIRST"==a.getFieldValue("END")?"indexOf":"lastIndexOf",c=Blockly.Velocity.valueToCode(a,"FIND",Blockly.Velocity.ORDER_NONE)||"''";b=(Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_MEMBER)||"''")+"."+b+"("+c+")";return a.workspace.options.oneBasedIndex?["#set ($index = "+b+" + 1)$index",Blockly.Velocity.ORDER_ADDITIVE]:[b,Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_MEMBER)||"''";switch(b){case "FIRST":return[c+".charAt(0)",Blockly.Velocity.ORDER_MEMBER];case "LAST":return["#set ($index = $stringtool.length("+c+") - 1)"+c+".charAt($index)",Blockly.Velocity.ORDER_MEMBER];case "FROM_START":return a=Blockly.Velocity.getAdjusted(a,"AT"),[c+".charAt("+a+")",Blockly.Velocity.ORDER_MEMBER];case "FROM_END":return a=Blockly.Velocity.getAdjusted(a,
"AT",1,!0),["#set ($index = $stringtool.length("+c+") - "+a+")"+c+".charAt($index)",Blockly.Velocity.ORDER_MEMBER];case "RANDOM":return[c+".charAt($mathtool.random(0, $stringtool.length("+c+")))",Blockly.Velocity.ORDER_FUNCTION_CALL]}throw"Unhandled option (text_charAt).";};
Blockly.Velocity.text_getSubstring=function(a){var b=a.getFieldValue("WHERE1"),c=a.getFieldValue("WHERE2"),d=Blockly.Velocity.valueToCode(a,"STRING",Blockly.Velocity.ORDER_MEMBER)||"''",e="";if("FIRST"==b&&"LAST"==c)e=d;else{switch(b){case "FROM_START":b=Blockly.Velocity.getAdjusted(a,"AT1");break;case "FROM_END":b=Blockly.Velocity.getAdjusted(a,"AT1",1,!1,Blockly.Velocity.ORDER_SUBTRACTION);b="$stringtool.length("+d+") - "+b;break;case "FIRST":b="0";break;default:throw"Unhandled option (lists_getSublist).";
}switch(c){case "FROM_START":a=Blockly.Velocity.getAdjusted(a,"AT2",1);break;case "FROM_END":a=Blockly.Velocity.getAdjusted(a,"AT2",0,!1,Blockly.Velocity.ORDER_SUBTRACTION);a="$stringtool.length("+d+") - "+a;break;case "LAST":a="$stringtool.length("+d+")";break;default:throw"Unhandled option (lists_getSublist).";}e=e+("#set($at1 = "+b+")")+("#set($at2 = "+a+")")+(d+".substring($at1, $at2)")}return[e,Blockly.Velocity.ORDER_MEMBER]};
Blockly.Velocity.text_changeCase=function(a){var b={UPPERCASE:".upperCase",LOWERCASE:".lowerCase",TITLECASE:null}[a.getFieldValue("CASE")];a=Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_MEMBER)||"''";return[b?"$stringtool"+b+"("+a+")":"$stringtool.upperCase($string.charAt(0)) + $stringtool.lowerCase($string.substring(1))",Blockly.Velocity.ORDER_FUNCTION_CALL]};
Blockly.Velocity.text_trim=function(a){var b={LEFT:".replaceAll('^[s\u00a0]+','')",RIGHT:".replaceAll('[s\u00a0]+$','')",BOTH:".trim()"}[a.getFieldValue("MODE")];return[(Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_MEMBER)||"''")+b,Blockly.Velocity.ORDER_FUNCTION_CALL]};Blockly.Velocity.text_print=function(a){return Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_NONE)||"''"};
Blockly.Velocity.text_count=function(a){var b=Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_MEMBER)||"''";a=Blockly.Velocity.valueToCode(a,"SUB",Blockly.Velocity.ORDER_NONE)||"''";return["$stringtool.countMatches("+b+", "+a+")",Blockly.Velocity.ORDER_MEMBER]};
Blockly.Velocity.text_replace=function(a){var b=Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_MEMBER)||"''",c=Blockly.Velocity.valueToCode(a,"FROM",Blockly.Velocity.ORDER_NONE)||"''";a=Blockly.Velocity.valueToCode(a,"TO",Blockly.Velocity.ORDER_NONE)||"''";return[b+".replace("+c+", "+a+")",Blockly.Velocity.ORDER_MEMBER]};Blockly.Velocity.text_reverse=function(a){return["$stringtool.reverse("+(Blockly.Velocity.valueToCode(a,"TEXT",Blockly.Velocity.ORDER_MEMBER)||"''")+")",Blockly.Velocity.ORDER_MEMBER]};Blockly.Velocity.variables={};Blockly.Velocity.variables_get=function(a){return[Blockly.Velocity.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),Blockly.Velocity.ORDER_ATOMIC]};Blockly.Velocity.variables_set=function(a){var b=Blockly.Velocity.valueToCode(a,"VALUE",Blockly.Velocity.ORDER_NONE)||"0";return"#set ("+Blockly.Velocity.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+" = "+b+")\n"};
Blockly.Velocity.variablesDynamic={};Blockly.Velocity.variables_get_dynamic=Blockly.Velocity.variables_get;Blockly.Velocity.variables_set_dynamic=Blockly.Velocity.variables_set;