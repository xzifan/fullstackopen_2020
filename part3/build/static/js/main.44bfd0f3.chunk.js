(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(13),c=n.n(r),o=n(0),u=n.n(o),s=n(3),l=n.n(s),i="http://localhost:5000/api/persons",m=function(){return l.a.get(i)},d=function(e){return l.a.post(i,e)},f=function(e,t){return l.a.put("".concat(i,"/").concat(e),t)},p=function(e){return l.a.delete("".concat(i,"/").concat(e))},b=(n(36),function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)("success"),s=Object(a.a)(c,2),l=s[0],i=s[1],d=Object(o.useState)("some thing happened..."),f=Object(a.a)(d,2),p=f[0],b=f[1];Object(o.useEffect)((function(){O()}),[]);var O=function(e,t){m().then((function(e){r(e.data)})).then((function(){b(t),i(e)}))},j=Object(o.useState)(""),y=Object(a.a)(j,2),w=y[0],k=y[1];return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(g,{message:p,type:l}),u.a.createElement(h,{setFilter:k}),u.a.createElement("h3",null,"Add a new"),u.a.createElement(v,{list:n,updateList:O,setMessage:b,setMessageType:i}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(E,{list:n,filter:w,updateList:O}))}),h=function(e){var t=e.setFilter;return u.a.createElement("div",null,"filter shows with ",u.a.createElement("input",{onChange:function(e){t(e.target.value)}}))},v=function(e){var t=e.list,n=Object(o.useState)(""),r=Object(a.a)(n,2),c=r[0],s=r[1],l=Object(o.useState)(""),i=Object(a.a)(l,2),m=i[0],p=i[1],b=function(e){"name"===e.target.name?s(e.target.value):"number"===e.target.name&&p(e.target.value)};return u.a.createElement("form",{onSubmit:function(n){n.preventDefault();var a=t.map((function(e,t){return e.name}));-1===a.indexOf(c)?d({name:c,number:m}).then((function(t){200===t.status&&e.updateList("success","Added "+c)})).catch((function(t){e.setMessage(t.response.data.message),e.setMessageType("error")})):function(t,n,a){window.confirm(c+" is already added to phonebook, replace the old number with a new one?")&&(console.log(t,n,a),f(t,{name:n,number:a}).then((function(t){200===t.status&&e.updateList("success","Updated "+n)})).catch((function(t){e.updateList("error","Information of ".concat(n," has already been removed from server"))})))}(t[a.indexOf(c)].id,c,m)}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{name:"name",type:"text",onChange:b})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{name:"number",type:"text",onChange:b})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},E=function(e){var t=function(t){var n=t.target.value,a=t.target.name;console.log(n,a),window.confirm("Delete ".concat(a,"?"))&&p(n).then((function(){e.updateList("success","Removed "+a)})).catch((function(t){console.log(t),e.updateList("error","Information of ".concat(a," has already been removed from server"))}))};return u.a.createElement("div",null,e.list.map((function(n,a){if(-1!==n.name.indexOf(e.filter))return u.a.createElement("div",{key:a},n.name+" "+n.number," ",u.a.createElement("button",{name:n.name,value:n.id,onClick:t},"delete"))})))},g=function(e){var t=e.type,n=e.message;return null===n?null:u.a.createElement("div",{className:""+t},n)};c.a.render(u.a.createElement(b,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.44bfd0f3.chunk.js.map