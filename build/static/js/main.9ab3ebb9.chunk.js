(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),u=n.n(l),o=n(2),c=n(3),i=n.n(c),m="/api/persons",d=function(){return i.a.get(m).then(function(e){return e.data})},s=function(e){return i.a.post(m,e).then(function(e){return e.data})},f=function(e,t){return i.a.put("".concat(m,"/").concat(e),{number:t}).then(function(e){return e.data})},b=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(function(e){return 200===e.status?"Poisto onnistui":"Poisto ep\xe4onnistui"})},E=function(e){var t=e.name,n=e.number,a=e.deletePerson,l=e.id;return r.a.createElement("tr",null,r.a.createElement("td",{className:"name"},t),r.a.createElement("td",{className:"phone"},n),r.a.createElement("td",null,r.a.createElement("button",{id:l,onClick:a},"Delete")))},g=function(e){var t=e.persons,n=e.filter,a=e.deletePerson,l=""===n?t:t.filter(function(e){var t=n.split(" "),a=!0,r=!1,l=void 0;try{for(var u,o=t[Symbol.iterator]();!(a=(u=o.next()).done);a=!0){var c=u.value;if(!e.name.toLowerCase().includes(c.toLowerCase())&&!e.number.includes(c))return!1}}catch(i){r=!0,l=i}finally{try{a||null==o.return||o.return()}finally{if(r)throw l}}return!0});return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",null,r.a.createElement("tbody",null,l.map(function(e){return r.a.createElement(E,{key:e.id,id:e.id,name:e.name,number:e.number,deletePerson:a})}))))},h=function(e){var t=e.handler,n=e.value,a=e.reff;return r.a.createElement("input",{type:"text",ref:a,value:n,onChange:t})},p=function(e){var t=e.inputs,n=e.onsubmit;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,r.a.createElement(h,{reff:e.ref,handler:e.handler,value:e.value})))}))),r.a.createElement("button",{type:"submit"},"Add")))},v=function(e){var t=e.inputs;return r.a.createElement(r.a.Fragment,null,r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,r.a.createElement(h,{handler:e.handler,value:e.value})))}))))},y=function(e){var t=e.message;if(null===t)return null;var n={margin:"20px 0 0 20px",padding:10,border:"1px solid black",borderRadius:10,width:500,backgroundColor:t.color};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:n},r.a.createElement("p",{style:{width:"95%",margin:"0 auto 0 auto",textAlign:"center"}},t.text)))},w=(n(37),function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],l=t[1],u=Object(a.useState)(""),c=Object(o.a)(u,2),i=c[0],m=c[1],E=Object(a.useState)(""),h=Object(o.a)(E,2),w=h[0],j=h[1],x=Object(a.useState)(""),k=Object(o.a)(x,2),O=k[0],P=k[1],S=Object(a.useState)(null),C=Object(o.a)(S,2),A=C[0],F=C[1];Object(a.useEffect)(function(){console.log("effect"),d().then(function(e){l(e),console.log("Haku valmis, l\xf6ytyi: ".concat(n.length," yhteystietoa"))})},[n.length]);var D=Object(a.useRef)(""),N=Object(a.useRef)(""),R=[{name:"Name",value:i,handler:function(e){m(e.target.value)},id:1,ref:D},{name:"Number",value:w,handler:function(e){j(e.target.value)},id:2,ref:N}],T=[{name:"Find",value:O,handler:function(e){P(e.target.value)},id:1}];return r.a.createElement("div",{style:{width:"90%",margin:"0 auto 0 auto",borderRadius:10}},r.a.createElement("h1",{style:{textAlign:"center"}},"Phonebook"),r.a.createElement(v,{inputs:T}),r.a.createElement("h2",null,"Add new"),r.a.createElement(p,{inputs:R,onsubmit:function(e){if(e.preventDefault(),""!==i)if(""!==w){var t=n.find(function(e){return e.name===i});void 0!==t?window.confirm("Henkil\xf6 ".concat(t.name," l\xf6ytyy jo osoitekirjasta. \nHaluatko p\xe4ivitt\xe4\xe4 numeron?"))&&f(t.id,w).then(function(e){l([]),m(""),j(""),D.current.focus(),F({text:"".concat(e.name," updated"),color:"lightgreen"}),setTimeout(function(){F(null)},4e3)}):s({name:i,number:w}).then(function(e){l(n.concat(e)),m(""),j(""),D.current.focus(),F({text:"".concat(e.name," added"),color:"lightgreen"}),setTimeout(function(){F(null)},4e3)})}else N.current.focus();else D.current.focus()}}),r.a.createElement("h2",null,"Contacts"),r.a.createElement(g,{persons:n,filter:O,deletePerson:function(e){e.persist();var t=n.findIndex(function(t){return t.id===parseInt(e.target.id)});console.log(n,t,e.target.id),window.confirm("Do you really want to delete ".concat(n[t].name))&&(b(e.target.id).then(function(e){F({text:"Delete successful",color:"lightgreen"}),setTimeout(function(){F(null)},4e3),console.log(e)}).catch(function(e){F({text:"Error: Allready deleted",color:"red"}),setTimeout(function(){F(null)},4e3),console.log(e)}),l([]))}}),r.a.createElement(y,{message:A}))});u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9ab3ebb9.chunk.js.map