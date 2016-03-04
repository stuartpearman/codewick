ace.define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set|function|declare|readonly",s=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",a=function(){var e=this.createKeywordMapper({keyword:i,"support.function.builtin":s,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",n="(?:\\.\\d+)",r="(?:\\d+)",o="(?:(?:"+r+"?"+n+")|(?:"+r+"\\.))",a="(?:(?:"+o+"|"+r+"))",l="(?:"+a+"|"+o+")",u="(?:&"+r+")",c="[a-zA-Z_][a-zA-Z0-9_]*",g="(?:"+c+"=)",d="(?:\\$(?:SHLVL|\\$|\\!|\\?))",h="(?:"+c+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$`"\\]|$)/},{include:"variables"},{token:"keyword.operator",regex:/`/},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:"\\$'",push:[{token:"constant.language.escape",regex:/\\(?:[abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"string",regex:"'",next:"pop"},{defaultToken:"string"}]},{regex:"<<<",token:"keyword.operator"},{stateName:"heredoc",regex:"(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",onMatch:function(e,t,n){var r="-"==e[2]?"indentedHeredoc":"heredoc",o=e.split(this.splitRegex);return n.push(r,o[4]),[{type:"constant",value:o[1]},{type:"text",value:o[2]},{type:"string",value:o[3]},{type:"support.class",value:o[4]},{type:"string",value:o[5]}]},rules:{heredoc:[{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^	+"},{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){return"heredoc"===t[0]||"indentedHeredoc"===t[0]?t[0]:e}},{token:["keyword","text","text","text","variable"],regex:/(declare|local|readonly)(\s+)(?:(-[fixar]+)(\s+))?([a-zA-Z_][a-zA-Z0-9_]*\b)/},{token:"variable.language",regex:d},{token:"variable",regex:g},{include:"variables"},{token:"support.function",regex:h},{token:"support.function",regex:u},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!=|[%&|`]"},{token:"punctuation.operator",regex:";"},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]]"},{token:"paren.rparen",regex:"[\\)\\}]",next:"pop"}],variables:[{token:"variable",regex:/(\$)(\w+)/},{token:["variable","paren.lparen"],regex:/(\$)(\()/,push:"start"},{token:["variable","paren.lparen","keyword.operator","variable","keyword.operator"],regex:/(\$)(\{)([#!]?)(\w+|[*@#?\-$!0_])(:[?+\-=]?|##?|%%?|,,?\/|\^\^?)?/,push:"start"},{token:"variable",regex:/\$[*@#?\-$!0_]/},{token:["variable","paren.lparen"],regex:/(\$)(\{)/,push:"start"}]},this.normalizeRules()};r.inherits(a,o),t.ShHighlightRules=a}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("../../range").Range,i=e("./fold_mode").FoldMode,s=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(s,i),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(r)?"start":o},this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var s=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,s);var a=e.getCommentFoldRange(n,s+i[0].length,1);return a&&!a.isMultiLine()&&(r?a=this.getSectionRange(e,n):"all"!=t&&(a=null)),a}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),i=t,s=n.length;t+=1;for(var a=t,l=e.getLength();++t<l;){n=e.getLine(t);var u=n.search(/\S/);if(-1!==u){if(r>u)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i)break;if(c.isMultiLine())t=c.end.row;else if(r==u)break}a=t}}return new o(i,s,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),i=e.getLength(),s=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<i;){t=e.getLine(n);var u=a.exec(t);if(u&&(u[1]?l--:l++,!l))break}var c=n;return c>s?new o(s,r,c,t.length):void 0}}.call(s.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r,o=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),l=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],c={},g=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?r=c[t]:void(r=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},h=function(){this.add("braces","insertion",function(e,t,n,o,i){var s=n.getCursorPosition(),l=o.doc.getLine(s.row);if("{"==i){g(n);var u=n.getSelectionRange(),c=o.doc.getTextRange(u);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return d(u,c,"{","}");if(h.isSaneInsertion(n,o))return/[\]\}\)]/.test(l[s.column])||n.inMultiSelectMode?(h.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(h.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){g(n);var f=l.substring(s.column,s.column+1);if("}"==f){var p=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==p&&h.isAutoInsertedClosing(s,l,i))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){g(n);var m="";h.isMaybeInsertedClosing(s,l)&&(m=a.stringRepeat("}",r.maybeInsertedBrackets),h.clearMaybeInsertedClosing());var f=l.substring(s.column,s.column+1);if("}"===f){var k=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!k)return null;var b=this.$getIndent(o.getLine(k.row))}else{if(!m)return void h.clearMaybeInsertedClosing();var b=this.$getIndent(l)}var v=b+o.getTabString();return{text:"\n"+v+"\n"+b+m,selection:[1,v.length,1,v.length]}}h.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,o,i){var s=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==s){g(n);var a=o.doc.getLine(i.start.row),l=a.substring(i.end.column,i.end.column+1);if("}"==l)return i.end.column++,i;r.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){g(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return d(i,s,"(",")");if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){g(n);var a=n.getCursorPosition(),l=r.doc.getLine(a.row),u=l.substring(a.column,a.column+1);if(")"==u){var c=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==c&&h.isAutoInsertedClosing(a,l,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){g(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return d(i,s,"[","]");if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){g(n);var a=n.getCursorPosition(),l=r.doc.getLine(a.row),u=l.substring(a.column,a.column+1);if("]"==u){var c=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==c&&h.isAutoInsertedClosing(a,l,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){g(n);var i=o,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return d(s,a,i,i);if(!a){var l=n.getCursorPosition(),u=r.doc.getLine(l.row),c=u.substring(l.column-1,l.column),h=u.substring(l.column,l.column+1),f=r.getTokenAt(l.row,l.column),p=r.getTokenAt(l.row,l.column+1);if("\\"==c&&f&&/escape/.test(f.type))return null;var m,k=f&&/string|escape/.test(f.type),b=!p||/string|escape/.test(p.type);if(h==i)m=k!==b;else{if(k&&!b)return null;if(k&&b)return null;var v=r.$mode.tokenRe;v.lastIndex=0;var x=v.test(c);v.lastIndex=0;var y=v.test(c);if(x||y)return null;if(h&&!/[\s;,.})\]\\]/.test(h))return null;m=!0}return{text:m?i+i:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==i)return o.end.column++,o}})};h.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",l)){var o=new s(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",l))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},h.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},h.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,r.autoInsertedLineEnd[0])||(r.autoInsertedBrackets=0),r.autoInsertedRow=o.row,r.autoInsertedLineEnd=n+i.substr(o.column),r.autoInsertedBrackets++},h.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(r.maybeInsertedBrackets=0),r.maybeInsertedRow=o.row,r.maybeInsertedLineStart=i.substr(0,o.column)+n,r.maybeInsertedLineEnd=i.substr(o.column),r.maybeInsertedBrackets++},h.isAutoInsertedClosing=function(e,t,n){return r.autoInsertedBrackets>0&&e.row===r.autoInsertedRow&&n===r.autoInsertedLineEnd[0]&&t.substr(e.column)===r.autoInsertedLineEnd},h.isMaybeInsertedClosing=function(e,t){return r.maybeInsertedBrackets>0&&e.row===r.maybeInsertedRow&&t.substr(e.column)===r.maybeInsertedLineEnd&&t.substr(0,e.column)==r.maybeInsertedLineStart},h.popAutoInsertedClosing=function(){r.autoInsertedLineEnd=r.autoInsertedLineEnd.substr(1),r.autoInsertedBrackets--},h.clearMaybeInsertedClosing=function(){r&&(r.maybeInsertedBrackets=0,r.maybeInsertedRow=-1)},o.inherits(h,i),t.CstyleBehaviour=h}),ace.define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sh_highlight_rules","ace/range","ace/mode/folding/cstyle","ace/mode/behaviour/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,i=e("./sh_highlight_rules").ShHighlightRules,s=e("../range").Range,a=e("./folding/cstyle").FoldMode,l=e("./behaviour/cstyle").CstyleBehaviour,u=function(){this.HighlightRules=i,this.foldingRules=new a,this.$behaviour=new l};r.inherits(u,o),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(r+=n)}return r};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,r){if("\r\n"!==r&&"\r"!==r&&"\n"!==r)return!1;var o=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!o)return!1;do var i=o.pop();while(i&&("comment"==i.type||"text"==i.type&&i.value.match(/^\s+$/)));return i?"keyword"==i.type&&e[i.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n)),o=t.getTabString();r.slice(-o.length)==o&&t.remove(new s(n,r.length-o.length,n,r.length))},this.$id="ace/mode/sh"}.call(u.prototype),t.Mode=u}),ace.define("ace/mode/dockerfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/sh_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./sh_highlight_rules").ShHighlightRules,i=function(){o.call(this);for(var e=this.$rules.start,t=0;t<e.length;t++)if("variable.language"==e[t].token){e.splice(t,0,{token:"constant.language",regex:"(?:^(?:FROM|MAINTAINER|RUN|CMD|EXPOSE|ENV|ADD|ENTRYPOINT|VOLUME|USER|WORKDIR|ONBUILD|COPY|LABEL)\\b)",caseInsensitive:!0});break}};r.inherits(i,o),t.DockerfileHighlightRules=i}),ace.define("ace/mode/dockerfile",["require","exports","module","ace/lib/oop","ace/mode/sh","ace/mode/dockerfile_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./sh").Mode,i=e("./dockerfile_highlight_rules").DockerfileHighlightRules,s=e("./folding/cstyle").FoldMode,a=function(){o.call(this),this.HighlightRules=i,this.foldingRules=new s};r.inherits(a,o),function(){this.$id="ace/mode/dockerfile"}.call(a.prototype),t.Mode=a});