(window["webpackJsonp2019-2-Atom-Frontend-M-Makarov"]=window["webpackJsonp2019-2-Atom-Frontend-M-Makarov"]||[]).push([[0],{14:function(e,n,t){var r=t(48).default;e.exports=r()},32:function(e,n,t){e.exports=t.p+"static/media/logo.a55f1c43.svg"},36:function(e,n,t){e.exports=t(47)},46:function(e,n,t){},47:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(17),c=t(20),i=t(14),u=t.n(i),l=t(11),d=t(28),s=t(29),m=t(34),E=t(30),f=t(35),v=t(12);function p(){var e=Object(l.a)(["\n  font-size: large;\n"]);return p=function(){return e},e}var h=v.a.p(p());var O=function(e){var n=e.increment,t=e.incrementIfOdd,r=e.decrement,o=e.counter;return a.a.createElement("section",null,a.a.createElement(h,null,"To get started, edit ",a.a.createElement("code",null,"src/routes/index.js "),"and save to reload."),a.a.createElement("p",null,"Clicked: ",o," times ",a.a.createElement("button",{onClick:n},"+")," ",a.a.createElement("button",{onClick:r},"-")," ",a.a.createElement("button",{onClick:t},"Increment if odd")))},g=t(9);var N=function(e){function n(){var e,t;Object(d.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(t=Object(m.a)(this,(e=Object(E.a)(n)).call.apply(e,[this].concat(a)))).increment=function(){t.props.dispatch({type:g.a.INCREMENT_COUNTER})},t.decrement=function(){t.props.dispatch({type:g.a.DECREMENT_COUNTER})},t.incrementIfOdd=function(){u.a.getState().counter%2!==0&&u.a.dispatch({type:g.a.INCREMENT_COUNTER})},t}return Object(f.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return a.a.createElement(O,{counter:this.props.counter,increment:this.increment,decrement:this.decrement,incrementIfOdd:this.incrementIfOdd})}}]),n}(a.a.Component);var b=Object(c.b)((function(e){return{counter:e.counter}}))(N),C=t(32),R=t.n(C),T=t(16);function j(){var e=Object(l.a)(["\n  background-color: #222;\n  height: 150px;\n  padding: 20px;\n  color: #fff;\n\n  .redux-logo {\n    animation: "," infinite 20s linear;\n    height: 80px;\n  }\n"]);return j=function(){return e},e}function w(){var e=Object(l.a)(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);return w=function(){return e},e}var M=(new Date).getFullYear(),k=Object(T.b)(w()),y=v.a.div(j(),k);var I=function(){return a.a.createElement(y,null,a.a.createElement("img",{src:R.a,className:"redux-logo",alt:"logo"}),a.a.createElement("h2",null,"Atom Mail.Ru, ",M))},x=t(50),U=t(5);function _(){var e=Object(l.a)(["\n  text-align: center;\n"]);return _=function(){return e},e}var D=v.a.div(_()),A=Object(U.a)();var F=function(){return a.a.createElement(x.b,{history:A},a.a.createElement(D,null,a.a.createElement(I,null),a.a.createElement(x.c,null,a.a.createElement(x.a,{path:"/",component:b}))))};t(46),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(o.render)(a.a.createElement(c.a,{store:u.a},a.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},48:function(e,n,t){"use strict";t.r(n);var r=t(10),a=t(27),o=t(9),c=0;var i=Object(r.c)({counter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c;switch((arguments.length>1?arguments[1]:void 0).type){case o.a.INCREMENT_COUNTER:return e+1;case o.a.DECREMENT_COUNTER:return e-1;default:return e}}});t.d(n,"default",(function(){return d}));var u=[a.a],l=[r.a.apply(void 0,u)];function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.d.apply(void 0,[i,e].concat(l))}},9:function(e,n,t){"use strict";n.a={INCREMENT_COUNTER:"INCREMENT_COUNTER",DECREMENT_COUNTER:"DECREMENT_COUNTER"}}},[[36,1,2]]]);
//# sourceMappingURL=main.b9075f6f.chunk.js.map