(function(e){function t(t){for(var r,i,s=t[0],u=t[1],c=t[2],d=0,h=[];d<s.length;d++)i=s[d],o[i]&&h.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(h.length)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],i=n("2877"),s={},u=Object(i["a"])(s,o,a,!1,null,null,null),c=u.exports,l=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("editor",{attrs:{theme:e.theme},on:{"on-change":e.codeChange},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),n("br"),n("div",{ref:"run-container"},[n("codeRun",{ref:"run",attrs:{value:e.code}})],1)],1)},h=[],f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"groot-codemirror"},[n("textarea",{ref:"code",domProps:{value:e.value}})])},p=[],m=n("56b3"),g=n.n(m),b=(n("a7be"),n("cc10"),n("8c2e"),n("31c5"),n("8c33"),n("8f0a"),n("10b2"),n("05dd"),n("9948"),n("693d"),n("9c7b"),n("715d"),n("b933"),n("23de"),n("7289"),n("4ba6"),n("2aed"),n("d72f"),n("0b6c"),n("9a48"),n("4895"),n("cbc8"),n("697e"),n("aedd"),n("164b"),n("8d70"),n("9f09"),n("a2c1"),n("9b74"),n("f6b6"),n("111b"),n("832b"),n("3c98"),{name:"groot-codemirror",props:{value:{type:String,default:""},watchValue:{type:String,default:""},theme:{type:String,default:"light"},readOnly:{type:[Boolean,String],default:!1}},data:function(){return{code:""}},watch:{theme:function(e){this.editor.setOption("theme","base16-"+e)},readOnly:function(e){this.editor.setOption("readOnly",e)},watchValue:function(e){this.editor.setValue(e)}},mounted:function(){var e=this;this.editor=g.a.fromTextArea(this.$refs["code"],{mode:"text/x-vue",theme:"base16-"+this.theme,lineNumbers:!0,firstLineNumber:1,indentWithTabs:!0,indentUnit:4,smartIndent:!0,matchBrackets:!0,autofocus:!1,extraKeys:{"Ctrl-W":"autocomplete"},readOnly:this.readOnly,showCursorWhenSelecting:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],autoCloseBrackets:!0,autoCloseTags:!0,styleActiveLine:!0,keyMap:"sublime",matchTags:{bothTags:!0},hintOptions:{completeSingle:!1}}),this.editor.on("inputRead",function(t,n){/^[a-z]+$/i.test(n.text[0])&&e.editor.execCommand("autocomplete")}),this.editor.on("change",function(){e.$emit("input",e.editor.getValue()),e.$emit("on-change",e.editor.getValue())})}}),v=b,y=Object(i["a"])(v,f,p,!1,null,null,null),x=y.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},w=[],S=(n("a481"),n("4917"),n("3b2b"),n("a026")),T=n("554b");S["a"].config.productionTip=!1,S["a"].use(T["a"]);var j="groot-code-run",$={name:j,props:{value:{type:String,default:""}},data:function(){return{code:this.value,html:"",js:"",css:"",program:null,styleTag:document.createElement("style")}},watch:{value:function(e){this.code=e}},methods:{getSource:function(e,t){var n=new RegExp("<".concat(t,"[^>]*>")),r=e.match(n);return r?(r=r[0],e.slice(e.indexOf(r)+r.length,e.lastIndexOf("</".concat(t,">")))):""},splitCode:function(){var e=this.getSource(this.code,"script").replace(/export default/,"return "),t=this.getSource(this.code,"style"),n=this.getSource(this.code,"template");this.js=e,this.css=t,this.html=n},buildDom:function(e){if(this.splitCode(),""!==this.html&&""!==this.js)try{var t=new Function(this.js)();t.template=this.html;var n=S["a"].extend(t);this.program=new n,console.log(this.program),""!==this.css&&(this.styleTag.type="text/css",this.styleTag.innerHTML=this.css,document.getElementsByTagName("head")[0].appendChild(this.styleTag)),e.appendChild(this.program.$mount().$el)}catch(r){}else this.$Message.error({title:"请输入有效的Vue代码".concat(Math.floor(1e3*Math.random()))})},reset:function(e){e.innerHTML="",this.program&&this.program.$destroy(),this.program=null},codeRun:function(e){this.reset(e),this.buildDom(e)}}},C=$,_=Object(i["a"])(C,O,w,!1,null,null,null),M=_.exports,k="groot-home",E="<template>\n    <div></div>\n</template>\n<script>\nexport default {\n    name: 'zov-xxxx'\n}\n<\/script>\n<style scoped>\n\n</style>",P={name:k,components:{editor:x,codeRun:M},data:function(){return{code:E}},computed:{theme:function(){return this.isDark?"dark":"light"}},methods:{codeChange:function(e){var t=this;console.log(e),setTimeout(function(){t.$refs.run.codeRun(t.$refs["run-container"])},100)}}},R=P,V=Object(i["a"])(R,d,h,!1,null,null,null),B=V.exports;r["a"].use(l["a"]);var L=new l["a"]({routes:[{path:"/",name:"home",component:B}]}),D=n("2f62");r["a"].use(D["a"]);var N=new D["a"].Store({state:{},mutations:{},actions:{}});n("b20f");r["a"].use(T["a"]),r["a"].config.productionTip=!1,new r["a"]({router:L,store:N,render:function(e){return e(c)}}).$mount("#app")},b20f:function(e,t,n){}});
//# sourceMappingURL=app.45fe2f2f.js.map