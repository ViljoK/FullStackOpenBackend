(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),u=n.n(l),c=n(2),o=n(3),i=n.n(o),m="/api/persons",d=function(){return i.a.get(m).then(function(e){return e.data})},s=function(e){return i.a.post(m,e).then(function(e){return e.data})},f=function(e,t){return i.a.put("".concat(m,"/").concat(e),{number:t}).then(function(e){return e.data})},b=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},E=function(e){var t=e.name,n=e.number,a=e.deletePerson,l=e.id;return r.a.createElement("tr",null,r.a.createElement("td",{className:"name"},t),r.a.createElement("td",{className:"phone"},n),r.a.createElement("td",null,r.a.createElement("button",{type:"button",id:l,onClick:a},"Delete")))},p=function(e){var t=e.persons,n=e.filter,a=e.deletePerson,l=""===n?t:t.filter(function(e){return!!e.name.toLowerCase().includes(n.toLowerCase())});return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",null,r.a.createElement("tbody",null,l.map(function(e){return r.a.createElement(E,{key:e.id,id:e.id,name:e.name,number:e.number,deletePerson:a})}))))},h=function(e){var t=e.handler,n=e.value,a=e.reff;return r.a.createElement("input",{type:"text",ref:a,value:n,onChange:t})};h.defaultProps={reff:null};var v=h,g=function(e){var t=e.inputs,n=e.onsubmit;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,r.a.createElement(v,{reff:e.ref,handler:e.handler,value:e.value})))}))),r.a.createElement("button",{type:"submit"},"Add")))},y=function(e){var t=e.inputs;return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,r.a.createElement(v,{handler:e.handler,value:e.value})))}))))},w=function(e){var t=e.message;if(null===t)return null;var n={margin:"20px 0 0 20px",padding:10,border:"1px solid black",borderRadius:10,width:"80%",backgroundColor:t.color};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:n},r.a.createElement("p",{style:{width:"95%",margin:"0 auto 0 auto",textAlign:"center"}},t.text)))};w.defaultProps={message:null};var j=w,x=(n(36),function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],l=t[1],u=Object(a.useState)(""),o=Object(c.a)(u,2),i=o[0],m=o[1],E=Object(a.useState)(""),h=Object(c.a)(E,2),v=h[0],w=h[1],x=Object(a.useState)(""),O=Object(c.a)(x,2),k=O[0],P=O[1],C=Object(a.useState)(null),N=Object(c.a)(C,2),S=N[0],A=N[1];Object(a.useEffect)(function(){d().then(function(e){l(e)})},[n.length]);var F=Object(a.useRef)(""),T=Object(a.useRef)(""),D=[{name:"Name",value:i,handler:function(e){m(e.target.value)},id:1,ref:F},{name:"Number",value:v,handler:function(e){w(e.target.value)},id:2,ref:T}],R=[{name:"Find",value:k,handler:function(e){P(e.target.value)},id:1}];return r.a.createElement("div",{style:{width:"90%",margin:"0 auto 0 auto",borderRadius:10}},r.a.createElement("h1",{style:{textAlign:"center"}},"Phonebook"),r.a.createElement("h2",null,"Add new"),r.a.createElement(g,{inputs:D,onsubmit:function(e){if(e.preventDefault(),""!==i)if(""!==v){var t=n.find(function(e){return e.name===i});void 0!==t?window.confirm("Henkil\xf6 ".concat(t.name," l\xf6ytyy jo osoitekirjasta. \nHaluatko p\xe4ivitt\xe4\xe4 numeron?"))&&f(t.id,v).then(function(e){l(e),m(""),w(""),F.current.focus(),A({text:"Update successfull",color:"lightgreen"}),setTimeout(function(){A(null)},4e3)}):s({name:i,number:v}).then(function(e){l(n.concat(e)),m(""),w(""),F.current.focus(),A({text:"".concat(e.name," added"),color:"lightgreen"}),setTimeout(function(){A(null)},4e3)}).catch(function(e){var t=e.response.data.name,n="";"ValidationError"===t&&(n=": Name min 3 chars, Number min 10 numbers"),A({text:"".concat(t).concat(n),color:"salmon"}),setTimeout(function(){A(null)},4e3)})}else T.current.focus();else F.current.focus()}}),r.a.createElement("h2",null,"Contacts"),r.a.createElement(y,{inputs:R}),r.a.createElement(p,{persons:n,filter:k,deletePerson:function(e){e.persist();var t=n.findIndex(function(t){return t.id===e.target.id});window.confirm("Do you really want to delete ".concat(n[t].name))&&b(e.target.id).then(function(e){l(e),A({text:"Delete successful",color:"lightgreen"}),setTimeout(function(){A(null)},4e3)}).catch(function(){A({text:"Error: Allready deleted",color:"red"}),setTimeout(function(){A(null)},4e3)})}}),r.a.createElement(j,{message:S}))});u.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.0a2b2dc3.chunk.js.map