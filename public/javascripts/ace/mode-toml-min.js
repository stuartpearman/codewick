ace.define("ace/mode/toml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,o){"use strict";var i=e("../lib/oop"),n=e("./text_highlight_rules").TextHighlightRules,r=function(){var e=this.createKeywordMapper({"constant.language.boolean":"true|false"},"identifier"),t="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b";this.$rules={start:[{token:"comment.toml",regex:/#.*$/},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[\\[([^\\]]+)\\]\\])"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[([^\\]]+)\\])"},{token:e,regex:t},{token:"support.date.toml",regex:"\\d{4}-\\d{2}-\\d{2}(T)\\d{2}:\\d{2}:\\d{2}(Z)"},{token:"constant.numeric.toml",regex:"-?\\d+(\\.?\\d+)?"}],qqstring:[{token:"string",regex:"\\\\$",next:"qqstring"},{token:"constant.language.escape",regex:'\\\\[0tnr"\\\\]'},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}]}};i.inherits(r,n),t.TomlHighlightRules=r}),ace.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,o){"use strict";var i=e("../../lib/oop"),n=e("../../range").Range,r=e("./fold_mode").FoldMode,l=t.FoldMode=function(){};i.inherits(l,r),function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(e,t,o){var i=this.foldingStartMarker,r=e.getLine(o),l=r.match(i);if(l){for(var g=l[1]+".",a=r.length,s=e.getLength(),d=o,h=o;++o<s;)if(r=e.getLine(o),!/^\s*$/.test(r)){if(l=r.match(i),l&&0!==l[1].lastIndexOf(g,0))break;h=o}if(h>d){var c=e.getLine(h).length;return new n(d,a,h,c)}}}}.call(l.prototype)}),ace.define("ace/mode/toml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/toml_highlight_rules","ace/mode/folding/ini"],function(e,t,o){"use strict";var i=e("../lib/oop"),n=e("./text").Mode,r=e("./toml_highlight_rules").TomlHighlightRules,l=e("./folding/ini").FoldMode,g=function(){this.HighlightRules=r,this.foldingRules=new l};i.inherits(g,n),function(){this.lineCommentStart="#",this.$id="ace/mode/toml"}.call(g.prototype),t.Mode=g});