(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{336:function(t,n){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},337:function(t,n,e){var r=e(2),i=e(29),u=e(21),a=e(336),o=r("".replace),s="["+a+"]",l=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),f=function(t){return function(n){var e=u(i(n));return 1&t&&(e=o(e,l,"")),2&t&&(e=o(e,c,"")),e}};t.exports={start:f(1),end:f(2),trim:f(3)}},339:function(t,n,e){var r=e(5),i=e(7),u=e(84);t.exports=function(t,n,e){var a,o;return u&&r(a=n.constructor)&&a!==e&&i(o=a.prototype)&&o!==e.prototype&&u(t,o),t}},341:function(t,n,e){"use strict";var r=e(35),i=e(10),u=e(2),a=e(187),o=e(185),s=e(8),l=e(29),c=e(114),f=e(188),h=e(83),v=e(21),p=e(56),d=e(186),g=e(189),x=e(88),m=e(184),w=e(3),b=m.UNSUPPORTED_Y,_=Math.min,I=[].push,N=u(/./.exec),E=u(I),y=u("".slice);a("split",(function(t,n,e){var u;return u="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var u=v(l(this)),a=void 0===e?4294967295:e>>>0;if(0===a)return[];if(void 0===t)return[u];if(!o(t))return i(n,u,t,a);for(var s,c,f,h=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,m=new RegExp(t.source,p+"g");(s=i(x,m,u))&&!((c=m.lastIndex)>g&&(E(h,y(u,g,s.index)),s.length>1&&s.index<u.length&&r(I,h,d(s,1)),f=s[0].length,g=c,h.length>=a));)m.lastIndex===s.index&&m.lastIndex++;return g===u.length?!f&&N(m,"")||E(h,""):E(h,y(u,g)),h.length>a?d(h,0,a):h}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:i(n,this,t,e)}:n,[function(n,e){var r=l(this),a=null==n?void 0:p(n,t);return a?i(a,n,r,e):i(u,v(r),n,e)},function(t,r){var i=s(this),a=v(t),o=e(u,i,a,r,u!==n);if(o.done)return o.value;var l=c(i,RegExp),p=i.unicode,d=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(b?"g":"y"),x=new l(b?"^(?:"+i.source+")":i,d),m=void 0===r?4294967295:r>>>0;if(0===m)return[];if(0===a.length)return null===g(x,a)?[a]:[];for(var w=0,I=0,N=[];I<a.length;){x.lastIndex=b?0:I;var T,M=g(x,b?y(a,I):a);if(null===M||(T=_(h(x.lastIndex+(b?I:0)),a.length))===w)I=f(a,I,p);else{if(E(N,y(a,w,I)),N.length===m)return N;for(var R=1;R<=M.length-1;R++)if(E(N,M[R]),N.length===m)return N;I=w=T}}return E(N,y(a,w)),N}]}),!!w((function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2!==e.length||"a"!==e[0]||"b"!==e[1]})),b)},342:function(t,n,e){var r=e(2);t.exports=r(1..valueOf)},343:function(t,n,e){"use strict";var r=e(11),i=e(0),u=e(2),a=e(111),o=e(18),s=e(9),l=e(339),c=e(36),f=e(86),h=e(191),v=e(3),p=e(57).f,d=e(31).f,g=e(12).f,x=e(342),m=e(337).trim,w=i.Number,b=w.prototype,_=i.TypeError,I=u("".slice),N=u("".charCodeAt),E=function(t){var n=h(t,"number");return"bigint"==typeof n?n:y(n)},y=function(t){var n,e,r,i,u,a,o,s,l=h(t,"number");if(f(l))throw _("Cannot convert a Symbol value to a number");if("string"==typeof l&&l.length>2)if(l=m(l),43===(n=N(l,0))||45===n){if(88===(e=N(l,2))||120===e)return NaN}else if(48===n){switch(N(l,1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+l}for(a=(u=I(l,2)).length,o=0;o<a;o++)if((s=N(u,o))<48||s>i)return NaN;return parseInt(u,r)}return+l};if(a("Number",!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var T,M=function(t){var n=arguments.length<1?0:w(E(t)),e=this;return c(b,e)&&v((function(){x(e)}))?l(Object(n),e,M):n},R=r?p(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),S=0;R.length>S;S++)s(w,T=R[S])&&!s(M,T)&&g(M,T,d(w,T));M.prototype=b,b.constructor=M,o(i,"Number",M)}},345:function(t,n,e){var r=e(0),i=e(3),u=e(2),a=e(21),o=e(337).trim,s=e(336),l=r.parseInt,c=r.Symbol,f=c&&c.iterator,h=/^[+-]?0x/i,v=u(h.exec),p=8!==l(s+"08")||22!==l(s+"0x16")||f&&!i((function(){l(Object(f))}));t.exports=p?function(t,n){var e=o(a(t));return l(e,n>>>0||(v(h,e)?16:10))}:l},347:function(t,n,e){var r=e(1),i=e(0),u=e(35),a=e(5),o=e(55),s=e(58),l=/MSIE .\./.test(o),c=i.Function,f=function(t){return function(n,e){var r=arguments.length>2,i=r?s(arguments,2):void 0;return t(r?function(){u(a(n)?n:c(n),this,i)}:n,e)}};r({global:!0,bind:!0,forced:l},{setTimeout:f(i.setTimeout),setInterval:f(i.setInterval)})},353:function(t,n,e){var r=e(1),i=e(345);r({target:"Number",stat:!0,forced:Number.parseInt!=i},{parseInt:i})},372:function(t,n,e){},414:function(t,n,e){"use strict";e(372)},461:function(t,n,e){"use strict";e.r(n);var r=e(72);e(118),e(82),e(30),e(341),e(353),e(343),e(115),e(6),e(116),e(347),e(61),e(34);function i(t){var n=t.split("\n").map((function(t){return Number.parseInt(t)})).map((function(t){return{scan:t}}));return n.forEach((function(t,e){var r=n[e-1]||{scan:NaN};t.diff=t.scan-r.scan})),n}function u(t){return a.apply(this,arguments)}function a(){return(a=Object(r.a)(regeneratorRuntime.mark((function t(n){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=i(n),t.abrupt("return",{depths:e,solution:e.filter((function(t){return t.diff>0})).length});case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function o(t){return s.apply(this,arguments)}function s(){return(s=Object(r.a)(regeneratorRuntime.mark((function t(n){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(e=i(n)).forEach((function(t,n){var r=t,i=e[n-1]||{scan:NaN},u=e[n-2]||{scan:NaN};t.window=r.scan+i.scan+u.scan})),e.forEach((function(t,n){var r=e[n-1]||{scan:0};t.diff=t.window-r.window})),t.abrupt("return",{depths:e,solution:e.filter((function(t){return t.diff>0})).length});case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var l={data:function(){return{inputText:"",solution1:{solution:"?"},solution2:{solution:"?"},timestep:0,viewWidth:740,viewHeight:400}},computed:{submarine:function(){var t=this.viewWidth,n=this.solution1.depths;return{x:Math.min(10*n.length-t/2,this.timestep),y:20}}},watch:{inputText:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var e;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.inputText,n.next=3,u(e);case 3:return t.solution1=n.sent,n.next=6,o(e);case 6:t.solution2=n.sent;case 7:case"end":return n.stop()}}),n)})))()}},mounted:function(){var t=this;setInterval((function(){t.timestep++}),10)},methods:{depthsInView:function(t){var n=this.submarine,e=Math.round(n.x/10),r=t.slice(e,e+74);for(this.solution1.diffCount=t.slice(0,e).filter((function(t){return t.diff>0})).length;r.length<74;)r.push(r[r.length-1]);return r},boxDiffClass:function(t){return 0===t.diff?"flat":t.diff>0?"up":"down"}}},c=(e(414),e(54)),f=Object(c.a)(l,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ul",[e("li",[e("label",[t._v("Solution 1:")]),t._v(" "),e("b",[t._v(t._s(t.solution1.solution))])]),t._v(" "),e("li",[e("label",[t._v("Solution 2:")]),t._v(" "),e("b",[t._v(t._s(t.solution2.solution))])])]),t._v(" "),e("h3",[t._v("Visualisation")]),t._v(" "),t.solution1.depths?e("svg",{attrs:{viewBox:"0 0 "+t.viewWidth+" "+t.viewHeight,xmlns:"http://www.w3.org/2000/svg",width:"100%"}},[e("rect",{attrs:{width:t.viewWidth,height:t.viewHeight,fill:"navy"}}),t._v(" "),t._l(t.depthsInView(t.solution1.depths),(function(n,r){return e("rect",{key:"box-"+r,class:t.boxDiffClass(n),attrs:{fill:"brown",x:""+10*r,y:""+(50+Math.round(n.scan/10)),width:"10",height:""+(t.viewHeight-Math.round(n.scan/10))}})})),t._v(" "),e("g",{attrs:{transform:"translate("+Math.min(t.submarine.x,t.viewWidth/2)+", "+t.submarine.y+")"}},[e("circle",{attrs:{cx:"-10",r:"5",fill:"orange"}}),t._v(" "),e("rect",{attrs:{x:"-10",width:"20",y:"-5",height:"10",fill:"orange"}}),t._v(" "),e("circle",{attrs:{cx:"10",r:"5",fill:"orange"}})]),t._v(" "),e("text",{staticClass:"label",attrs:{x:t.viewWidth-10,y:"20",width:"100",height:"20",fill:"white","text-anchor":"end"}},[t._v("Downwards count: "+t._s(t.solution1.diffCount))])],2):t._e(),t._v(" "),e("h3",[t._v("My Input")]),t._v(" "),e("shared-TextLoader",{attrs:{file:"input.txt"},model:{value:t.inputText,callback:function(n){t.inputText=n},expression:"inputText"}}),t._v(" "),e("h2",[t._v("My Solution")]),t._v(" "),e("h3",[t._v("Solution Code")]),t._v(" "),e("shared-TextLoader",{staticClass:"language-js",attrs:{file:"solution.js"}}),t._v(" "),e("h3",[t._v("README")]),t._v(" "),e("shared-TextLoader",{staticClass:"language-md",attrs:{file:"README.md"}}),t._v(" "),e("h3",[t._v("Viewer")]),t._v(" "),e("shared-TextLoader",{staticClass:"language-markup",attrs:{file:"Viewer.vue"}})],1)}),[],!1,null,"2d1d763a",null);n.default=f.exports}}]);