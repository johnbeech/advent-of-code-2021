(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{390:function(e,t,r){},455:function(e,t,r){"use strict";r(390)},482:function(e,t,r){"use strict";r.r(t);var n=r(61),a=(r(191),r(117),r(433)),o=r.n(a),c=r(451),l=r.n(c),i=(r(452),r(453),r(454),{data:function(){return{localText:"",error:""}},model:{prop:"text",event:"change"},props:{file:{type:String,default:""},text:{type:String,default:""}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,a,o,c,i,s,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.$site,n=e.file,a=e.load,o=e.loadLocal,c=r.themeConfig.env.LOCAL_AOC_DEV,!n){t.next=17;break}return t.prev=3,i=c?o(n):a("./".concat(n)),t.next=7,i;case 7:s=t.sent,u=s.data,e.localText=u,e.$emit("change",u),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(3),e.error=t.t0.message;case 16:l.a.highlightAll();case 17:case"end":return t.stop()}}),t,null,[[3,13]])})))()},methods:{load:function(e){return o.a.get(e)},loadLocal:function(e){var t=[this.$page.regularPath,e].join("");return this.load("http://localhost:8585".concat(t))}}}),s=(r(455),r(54)),u=Object(s.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text loader"},[r("pre",[r("code",[e._v(e._s(e.text||e.localText))])]),e._v(" "),e.error?r("pre",[r("code",[e._v("Error: "+e._s(e.error))])]):e._e()])}),[],!1,null,"1c0ac8f1",null);t.default=u.exports}}]);