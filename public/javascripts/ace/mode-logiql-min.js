ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"-->",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]},this.normalizeRules()};r.inherits(i,o),t.LogiQLHighlightRules=i}),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("./fold_mode").FoldMode,i=e("../../range").Range,s=t.FoldMode=function(){};r.inherits(s,o),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var o=/\S/,s=e.getLine(n),a=s.search(o);if(-1!=a&&"#"==s[a]){for(var u=s.length,c=e.getLength(),l=n,d=n;++n<c;){s=e.getLine(n);var g=s.search(o);if(-1!=g){if("#"!=s[g])break;d=n}}if(d>l){var m=e.getLine(d).length;return new i(l,u,d,m)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),s=e.getLine(n-1),a=s.search(/\S/),u=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=a&&u>a?"start":"","";if(-1==a){if(o==u&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(a==o&&"#"==r[o]&&"#"==s[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return-1!=a&&o>a?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",u>o?"start":""}}.call(s.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r,o=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),u=["text","paren.rparen","punctuation.operator"],c=["text","paren.rparen","punctuation.operator","comment"],l={},d=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount})),l[t]?r=l[t]:void(r=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},g=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},m=function(){this.add("braces","insertion",function(e,t,n,o,i){var s=n.getCursorPosition(),u=o.doc.getLine(s.row);if("{"==i){d(n);var c=n.getSelectionRange(),l=o.doc.getTextRange(c);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return g(c,l,"{","}");if(m.isSaneInsertion(n,o))return/[\]\}\)]/.test(u[s.column])||n.inMultiSelectMode?(m.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){d(n);var f=u.substring(s.column,s.column+1);if("}"==f){var h=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==h&&m.isAutoInsertedClosing(s,u,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){d(n);var k="";m.isMaybeInsertedClosing(s,u)&&(k=a.stringRepeat("}",r.maybeInsertedBrackets),m.clearMaybeInsertedClosing());var f=u.substring(s.column,s.column+1);if("}"===f){var p=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!p)return null;var b=this.$getIndent(o.getLine(p.row))}else{if(!k)return void m.clearMaybeInsertedClosing();var b=this.$getIndent(u)}var v=b+o.getTabString();return{text:"\n"+v+"\n"+b+k,selection:[1,v.length,1,v.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,o,i){var s=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==s){d(n);var a=o.doc.getLine(i.start.row),u=a.substring(i.end.column,i.end.column+1);if("}"==u)return i.end.column++,i;r.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return g(i,s,"(",")");if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if(")"==c){var l=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==l&&m.isAutoInsertedClosing(a,u,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){d(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return g(i,s,"[","]");if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){d(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if("]"==c){var l=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==l&&m.isAutoInsertedClosing(a,u,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){d(n);var i=o,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return g(s,a,i,i);if(!a){var u=n.getCursorPosition(),c=r.doc.getLine(u.row),l=c.substring(u.column-1,u.column),m=c.substring(u.column,u.column+1),f=r.getTokenAt(u.row,u.column),h=r.getTokenAt(u.row,u.column+1);if("\\"==l&&f&&/escape/.test(f.type))return null;var k,p=f&&/string|escape/.test(f.type),b=!h||/string|escape/.test(h.type);if(m==i)k=p!==b;else{if(p&&!b)return null;if(p&&b)return null;var v=r.$mode.tokenRe;v.lastIndex=0;var w=v.test(l);v.lastIndex=0;var x=v.test(l);if(w||x)return null;if(m&&!/[\s;,.})\]\\]/.test(m))return null;k=!0}return{text:k?i+i:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){d(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==i)return o.end.column++,o}})};m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",u)){var o=new s(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",u))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",c)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,r.autoInsertedLineEnd[0])||(r.autoInsertedBrackets=0),r.autoInsertedRow=o.row,r.autoInsertedLineEnd=n+i.substr(o.column),r.autoInsertedBrackets++},m.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(r.maybeInsertedBrackets=0),r.maybeInsertedRow=o.row,r.maybeInsertedLineStart=i.substr(0,o.column)+n,r.maybeInsertedLineEnd=i.substr(o.column),r.maybeInsertedBrackets++},m.isAutoInsertedClosing=function(e,t,n){return r.autoInsertedBrackets>0&&e.row===r.autoInsertedRow&&n===r.autoInsertedLineEnd[0]&&t.substr(e.column)===r.autoInsertedLineEnd},m.isMaybeInsertedClosing=function(e,t){return r.maybeInsertedBrackets>0&&e.row===r.maybeInsertedRow&&t.substr(e.column)===r.maybeInsertedLineEnd&&t.substr(0,e.column)==r.maybeInsertedLineStart},m.popAutoInsertedClosing=function(){r.autoInsertedLineEnd=r.autoInsertedLineEnd.substr(1),r.autoInsertedBrackets--},m.clearMaybeInsertedClosing=function(){r&&(r.maybeInsertedBrackets=0,r.maybeInsertedRow=-1)},o.inherits(m,i),t.CstyleBehaviour=m}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),o=n.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,s=e.findMatchingBracket({row:t,column:i});if(!s||s.row==t)return 0;var a=this.$getIndent(e.getLine(s.row));e.replace(new r(t,0,t,i-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/behaviour/cstyle","ace/mode/matching_brace_outdent"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,i=e("./logiql_highlight_rules").LogiQLHighlightRules,s=e("./folding/coffee").FoldMode,a=e("../token_iterator").TokenIterator,u=e("../range").Range,c=e("./behaviour/cstyle").CstyleBehaviour,l=e("./matching_brace_outdent").MatchingBraceOutdent,d=function(){this.HighlightRules=i,this.foldingRules=new s,this.$outdent=new l,this.$behaviour=new c};r.inherits(d,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens,s=o.state;if(/comment|string/.test(s))return r;if(i.length&&"comment.single"==i[i.length-1].type)return r;t.match();return/(-->|<--|<-|->|{)\s*$/.test(t)&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)?!0:"\n"!==n&&"\r\n"!==n?!1:/^\s+/.test(t)?!0:!1},this.autoOutdent=function(e,t,n){if(!this.$outdent.autoOutdent(t,n)){var r=t.getLine(n),o=r.match(/^\s+/),i=r.lastIndexOf(".")+1;if(!o||!n||!i)return 0;var s=(t.getLine(n+1),this.getMatching(t,{row:n,column:i}));if(!s||s.start.row==n)return 0;i=o[0].length;var a=this.$getIndent(t.getLine(s.start.row));t.replace(new u(n+1,0,n+1,i),a)}},this.getMatching=function(e,t,n){void 0==t&&(t=e.selection.lead),"object"==typeof t&&(n=t.column,t=t.row);var r,o=e.getTokenAt(t,n),i="keyword.start",s="keyword.end";if(o){if(o.type==i){var c=new a(e,t,n);c.step=c.stepForward}else{if(o.type!=s)return;var c=new a(e,t,n);c.step=c.stepBackward}for(;(r=c.step())&&r.type!=i&&r.type!=s;);if(r&&r.type!=o.type){var l=c.getCurrentTokenColumn(),t=c.getCurrentTokenRow();return new u(t,l,t,l+r.value.length)}}},this.$id="ace/mode/logiql"}.call(d.prototype),t.Mode=d});