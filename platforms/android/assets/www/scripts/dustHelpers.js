!function(dust){function isSelect(e){var t=e.current();return"object"==typeof t&&t.isSelect===!0}function jsonFilter(e,t){return"function"==typeof t?t.toString().replace(/(^\s+|\s+$)/gm,"").replace(/\n/gm,"").replace(/,\s*/gm,", ").replace(/\)\{/gm,") {"):t}function filter(e,t,r,n,o){n=n||{};var s,l,i=r.block,c=n.filterOpType||"";if("undefined"!=typeof n.key)s=dust.helpers.tap(n.key,e,t);else{if(!isSelect(t))return _console.log("No key specified for filter in:"+c+" helper "),e;s=t.current().selectKey,t.current().isResolved&&(o=function(){return!1})}return l=dust.helpers.tap(n.value,e,t),o(coerce(l,n.type,t),coerce(s,n.type,t))?(isSelect(t)&&(t.current().isResolved=!0),i?e.render(i,t):(_console.log("Missing body block in the "+c+" helper "),e)):r["else"]?e.render(r["else"],t):e}function coerce(e,t,r){if(e)switch(t||typeof e){case"number":return+e;case"string":return String(e);case"boolean":return e="false"===e?!1:e,Boolean(e);case"date":return new Date(e);case"context":return r.get(e)}return e}var _console="undefined"!=typeof console?console:{log:function(){}},helpers={tap:function(e,t,r){var n=e;return"function"==typeof e&&(e.isFunction===!0?n=e():(n="",t.tap(function(e){return n+=e,""}).render(e,r).untap(),""===n&&(n=!1))),n},sep:function(e,t,r){var n=r.block;return t.stack.index===t.stack.of-1?e:n?r.block(e,t):e},idx:function(e,t,r){var n=r.block;return n?r.block(e,t.push(t.stack.index)):e},contextDump:function(e,t,r,n){var o,s=n||{},l=s.to||"output",i=s.key||"current";return l=dust.helpers.tap(l,e,t),i=dust.helpers.tap(i,e,t),o="full"===i?JSON.stringify(t.stack,jsonFilter,2):JSON.stringify(t.stack.head,jsonFilter,2),"console"===l?(_console.log(o),e):e.write(o)},"if":function(chunk,context,bodies,params){var body=bodies.block,skip=bodies["else"];if(params&&params.cond){var cond=params.cond;if(cond=dust.helpers.tap(cond,chunk,context),eval(cond))return body?chunk.render(bodies.block,context):(_console.log("Missing body block in the if helper!"),chunk);if(skip)return chunk.render(bodies["else"],context)}else _console.log("No condition given in the if helper!");return chunk},math:function(e,t,r,n){if(n&&"undefined"!=typeof n.key&&n.method){var o=n.key,s=n.method,l=n.operand,i=n.round,c=null;switch(o=dust.helpers.tap(o,e,t),l=dust.helpers.tap(l,e,t),s){case"mod":(0===l||l===-0)&&_console.log("operand for divide operation is 0/-0: expect Nan!"),c=parseFloat(o)%parseFloat(l);break;case"add":c=parseFloat(o)+parseFloat(l);break;case"subtract":c=parseFloat(o)-parseFloat(l);break;case"multiply":c=parseFloat(o)*parseFloat(l);break;case"divide":(0===l||l===-0)&&_console.log("operand for divide operation is 0/-0: expect Nan/Infinity!"),c=parseFloat(o)/parseFloat(l);break;case"ceil":c=Math.ceil(parseFloat(o));break;case"floor":c=Math.floor(parseFloat(o));break;case"round":c=Math.round(parseFloat(o));break;case"abs":c=Math.abs(parseFloat(o));break;default:_console.log("method passed is not supported")}return null!==c?(i&&(c=Math.round(c)),r&&r.block?e.render(r.block,t.push({isSelect:!0,isResolved:!1,selectKey:c})):e.write(c)):e}return _console.log("Key is a required parameter for math helper along with method/operand!"),e},select:function(e,t,r,n){var o=r.block;if(n&&"undefined"!=typeof n.key){var s=dust.helpers.tap(n.key,e,t);return o?e.render(r.block,t.push({isSelect:!0,isResolved:!1,selectKey:s})):(_console.log("Missing body block in the select helper "),e)}return _console.log("No key given in the select helper!"),e},eq:function(e,t,r,n){return n&&(n.filterOpType="eq"),filter(e,t,r,n,function(e,t){return t===e})},ne:function(e,t,r,n){return n?(n.filterOpType="ne",filter(e,t,r,n,function(e,t){return t!==e})):e},lt:function(e,t,r,n){return n?(n.filterOpType="lt",filter(e,t,r,n,function(e,t){return e>t})):void 0},lte:function(e,t,r,n){return n?(n.filterOpType="lte",filter(e,t,r,n,function(e,t){return e>=t})):e},gt:function(e,t,r,n){return n?(n.filterOpType="gt",filter(e,t,r,n,function(e,t){return t>e})):e},gte:function(e,t,r,n){return n?(n.filterOpType="gte",filter(e,t,r,n,function(e,t){return t>=e})):e},"default":function(e,t,r,n){return n&&(n.filterOpType="default"),filter(e,t,r,n,function(){return!0})},size:function(e,t,r,n){var o,s,l,i=0;if(n=n||{},o=n.key,o&&o!==!0)if(dust.isArray(o))i=o.length;else if(!isNaN(parseFloat(o))&&isFinite(o))i=o;else if("object"==typeof o){s=0;for(l in o)Object.hasOwnProperty.call(o,l)&&s++;i=s}else i=(o+"").length;else i=0;return e.write(i)}};dust.helpers=helpers}("undefined"!=typeof exports?module.exports=require("dustjs-linkedin"):dust);