(this.webpackJsonprtc1=this.webpackJsonprtc1||[]).push([[0],{30:function(e,n,t){e.exports=t(70)},35:function(e,n,t){},59:function(e,n){},61:function(e,n){},68:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=68},69:function(e,n,t){},70:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t.n(c),r=t(24),a=t.n(r),u=(t(35),t(25)),i=t(26),l=t(29),s=t(28),f=t(10),d=t.n(f);function p(e){var n=new d.a({initiator:!0,stream:e}),t=new d.a;n.on("signal",(function(e){t.signal(e)})),t.on("signal",(function(e){n.signal(e)})),t.on("stream",(function(e){var n=document.querySelector("video");"srcObject"in n?n.srcObject=e:n.src=window.URL.createObjectURL(e),n.play()}))}o.a.Component;var b=t(7),m=t(8),O=t(11),j=t(27),y=t.n(j),v=(t(69),{names:{}}),h=document.querySelector(".myVideo");function g(e,n){switch(n.type){case"name update":return Object(O.a)({},e,{names:Object(O.a)({},e.names,Object(m.a)({},n.payload.peerId,n.payload.name))});default:return e}}function k(){var e=Object(c.useReducer)(g,v),n=Object(b.a)(e,2),t=(n[0],n[1]),r=Object(c.useRef)(new y.a),a=Object(c.useRef)([]),u=Object(c.useState)(null),i=Object(b.a)(u,2),l=i[0],s=i[1],f=Object(c.useState)(""),d=Object(b.a)(f,2),p=d[0],m=d[1],O=Object(c.useState)([]),j=Object(b.a)(O,2),k=j[0],C=j[1],w=Object(c.useCallback)((function(){return a.current.map((function(e){return e.peer})).concat(l)}),[l]),E=Object(c.useCallback)((function(e){a.current.push(e),C(a.current.map((function(e){return e.peer})))}),[]),R=Object(c.useCallback)((function(e){a.current.splice(a.current.findIndex((function(n){return n.peer===e.peer})),1),C(a.current.map((function(e){return e.peer})))}),[]),S=Object(c.useCallback)((function(e,n){if(w().includes(e))console.log("Already connected to ".concat(e,". Aborting."));else{var t=r.current.connect(e,{metadata:{peers:w()}});t.on("open",(function e(){n(t),t.off("open",e)})),t.on("close",(function e(){R(t),t.off("close",e)})),t.on("error",(function(e){return console.error(e.message)}))}}),[w,R]),U=Object(c.useCallback)((function(e){a.current.map((function(n){return n.send(e)}))}),[]),D=Object(c.useCallback)((function(e){E(e),e.on("data",(function(e){e&&("srcObject"in h?h.srcObject=e:h.src=window.URL.createObjectURL(e),h.play()),"peer discovery"===e.type?e.payload.peers.filter((function(e){return!w().includes(e)})).map((function(e){return S(e,D)})):t(e)}))}),[w,E,S]),L=Object(c.useCallback)((function(e){if(w().includes(e.peer))return console.log("Already connected to ".concat(e.peer,". Closing connection.")),e.close();E(e),e.on("data",(function(e){"peer discovery"!==e.type&&t(e)}));var n=(e.metadata||{}).peers||[];n.filter((function(e){return!w().includes(e)})).map((function(e){return S(e,D)})),U("try to start a stream"),navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then((function(e){console.log("stream",e),U(e)})).catch((function(){}));var c=w().filter((function(e){return!n.includes(e)&&e!==l}));c.length>0&&e.send({type:"peer discovery",payload:{peers:c}})}),[w,E,U,S,D,l]),A=Object(c.useCallback)((function(e){e.on("open",(function n(){L(e),e.off("open",n)})),e.on("close",(function n(){R(e),e.off("close",n)})),e.on("error",(function(e){return console.error(e.message)}))}),[L,R]),I=Object(c.useCallback)((function(){r.current.on("open",(function(e){s(e)})),r.current.on("connection",A)}),[A]),x=Object(c.useCallback)((function(){r.current.off("open",s),r.current.off("connection",A)}),[A]);Object(c.useEffect)((function(){return I(),x}),[I,x]);var M=Object(c.useCallback)((function(e){e.preventDefault(),m(""),S(p,D)}),[p,S,D]),T=!!p&&p!==l&&!k.find((function(e){return e===p}));return l?o.a.createElement("main",null,o.a.createElement("form",{onSubmit:M},o.a.createElement("input",{autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:"false",onChange:function(e){return m(e.target.value)},value:p,id:"connectTo",placeholder:"Enter known peer id"}),o.a.createElement("button",{type:"submit",disabled:!T},p===l?"That is your ID":k.find((function(e){return e===p}))?"Already connected to that peer":"Connect")),o.a.createElement("h2",null,"Your connections"),o.a.createElement("ul",null,o.a.createElement("li",{key:l},l," (you)"),k.map((function(e,n){return o.a.createElement("li",{key:e},e)})))):null}var C=function(){return o.a.createElement(k,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.75eeb774.chunk.js.map