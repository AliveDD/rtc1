(this.webpackJsonprtc1=this.webpackJsonprtc1||[]).push([[0],{30:function(e,n,t){e.exports=t(70)},35:function(e,n,t){},59:function(e,n){},61:function(e,n){},68:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=68},69:function(e,n,t){},70:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t.n(c),r=t(24),a=t.n(r),u=(t(35),t(25)),i=t(26),l=t(29),s=t(28),f=t(10),p=t.n(f);function d(e){var n=new p.a({initiator:!0,stream:e}),t=new p.a;n.on("signal",(function(e){t.signal(e)})),t.on("signal",(function(e){n.signal(e)})),t.on("stream",(function(e){var n=document.querySelector(".fullVid");"srcObject"in n?n.srcObject=e:n.src=window.URL.createObjectURL(e),n.play()}))}o.a.Component;var m=t(7),b=t(8),O=t(11),j=t(27),y=t.n(j),v=(t(69),{names:{}});document.querySelector(".myVideo");function h(e,n){switch(n.type){case"name update":return Object(O.a)({},e,{names:Object(O.a)({},e.names,Object(b.a)({},n.payload.peerId,n.payload.name))});default:return e}}function k(){var e=Object(c.useReducer)(h,v),n=Object(m.a)(e,2),t=(n[0],n[1]),r=Object(c.useRef)(new y.a),a=Object(c.useRef)([]),u=Object(c.useState)(null),i=Object(m.a)(u,2),l=i[0],s=i[1],f=Object(c.useState)(""),p=Object(m.a)(f,2),d=p[0],b=p[1],O=Object(c.useState)([]),j=Object(m.a)(O,2),k=j[0],C=j[1],g=Object(c.useCallback)((function(){return a.current.map((function(e){return e.peer})).concat(l)}),[l]),w=Object(c.useCallback)((function(e){a.current.push(e),C(a.current.map((function(e){return e.peer})))}),[]),E=Object(c.useCallback)((function(e){a.current.splice(a.current.findIndex((function(n){return n.peer===e.peer})),1),C(a.current.map((function(e){return e.peer})))}),[]),S=Object(c.useCallback)((function(e,n){if(g().includes(e))console.log("Already connected to ".concat(e,". Aborting."));else{var t=r.current.connect(e,{metadata:{peers:g()}});t.on("open",(function e(){n(t),t.off("open",e)})),t.on("close",(function e(){E(t),t.off("close",e)})),t.on("error",(function(e){return console.error(e.message)}))}}),[g,E]),R=Object(c.useCallback)((function(e){a.current.map((function(n){return n.send(e)}))}),[]),A=Object(c.useCallback)((function(e){w(e),e.on("data",(function(e){"peer discovery"===e.type?e.payload.peers.filter((function(e){return!g().includes(e)})).map((function(e){return S(e,A)})):t(e)}))}),[g,w,S]),D=Object(c.useCallback)((function(e){if(g().includes(e.peer))return console.log("Already connected to ".concat(e.peer,". Closing connection.")),e.close();w(e),e.on("data",(function(e){"peer discovery"!==e.type&&t(e)}));var n=(e.metadata||{}).peers||[];n.filter((function(e){return!g().includes(e)})).map((function(e){return S(e,A)})),R("try to start a stream");var c=g().filter((function(e){return!n.includes(e)&&e!==l}));c.length>0&&e.send({type:"peer discovery",payload:{peers:c}})}),[g,w,R,S,A,l]),I=Object(c.useCallback)((function(e){e.on("open",(function n(){D(e),e.off("open",n)})),e.on("close",(function n(){E(e),e.off("close",n)})),e.on("error",(function(e){return console.error(e.message)}))}),[D,E]),U=Object(c.useCallback)((function(){r.current.on("open",(function(e){s(e)})),r.current.on("connection",I)}),[I]),x=Object(c.useCallback)((function(){r.current.off("open",s),r.current.off("connection",I)}),[I]);Object(c.useEffect)((function(){return U(),x}),[U,x]);var L=Object(c.useCallback)((function(e){e.preventDefault(),b(""),S(d,A)}),[d,S,A]),T=!!d&&d!==l&&!k.find((function(e){return e===d}));return l?o.a.createElement("main",null,o.a.createElement("form",{onSubmit:L},o.a.createElement("input",{autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:"false",onChange:function(e){return b(e.target.value)},value:d,id:"connectTo",placeholder:"Enter known peer id"}),o.a.createElement("button",{type:"submit",disabled:!T},d===l?"That is your ID":k.find((function(e){return e===d}))?"Already connected to that peer":"Connect")),o.a.createElement("h2",null,"Your connections"),o.a.createElement("ul",null,o.a.createElement("li",{key:l},l," (you)"),k.map((function(e,n){return o.a.createElement("li",{key:e},e)})))):null}function C(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(k,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.a7e3fa4e.chunk.js.map