(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n(13),r=n.n(c),o=n(0),u=n.n(o),l=n(3),i=n.n(l),s="http://localhost:5000/api/persons",m=function(){return i.a.get(s)},d=function(e){return i.a.post(s,e)},f=function(e,t){return i.a.put("".concat(s,"/").concat(e),t)},p=function(e){return i.a.delete("".concat(s,"/").concat(e))},b=(n(36),function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],r=Object(o.useState)("success"),l=Object(a.a)(r,2),i=l[0],s=l[1],d=Object(o.useState)("some thing happened..."),f=Object(a.a)(d,2),p=f[0],b=f[1];Object(o.useEffect)((function(){O()}),[]);var O=function(e,t){m().then((function(e){c(e.data)})).then((function(){b(t),s(e)}))},j=Object(o.useState)(""),w=Object(a.a)(j,2),y=w[0],k=w[1];return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(g,{message:p,type:i}),u.a.createElement(h,{setFilter:k}),u.a.createElement("h3",null,"Add a new"),u.a.createElement(v,{list:n,updateList:O}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(E,{list:n,filter:y,updateList:O}))}),h=function(e){var t=e.setFilter;return u.a.createElement("div",null,"filter shows with ",u.a.createElement("input",{onChange:function(e){t(e.target.value)}}))},v=function(e){var t=e.list,n=Object(o.useState)(""),c=Object(a.a)(n,2),r=c[0],l=c[1],i=Object(o.useState)(""),s=Object(a.a)(i,2),m=s[0],p=s[1],b=function(e){"name"===e.target.name?l(e.target.value):"number"===e.target.name&&p(e.target.value)};return u.a.createElement("form",{onSubmit:function(n){n.preventDefault();var a=t.map((function(e,t){return e.name}));-1===a.indexOf(r)?d({name:r,number:m}).then((function(t){200===t.status&&e.updateList("success","Added "+r)})).catch((function(e){console.log(e)})):function(t,n,a){window.confirm(r+" is already added to phonebook, replace the old number with a new one?")&&(console.log(t,n,a),f(t,{name:n,number:a}).then((function(t){200===t.status&&e.updateList("success","Updated "+n)})).catch((function(t){e.updateList("error","Information of ".concat(n," has already been removed from server"))})))}(t[a.indexOf(r)].id,r,m)}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{name:"name",type:"text",onChange:b})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{name:"number",type:"text",onChange:b})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},E=function(e){var t=function(t){var n=t.target.value,a=t.target.name;console.log(n,a),window.confirm("Delete ".concat(a,"?"))&&p(n).then((function(){e.updateList("success","Removed "+a)})).catch((function(t){console.log(t),e.updateList("error","Information of ".concat(a," has already been removed from server"))}))};return u.a.createElement("div",null,e.list.map((function(n,a){if(-1!==n.name.indexOf(e.filter))return u.a.createElement("div",{key:a},n.name+" "+n.number," ",u.a.createElement("button",{name:n.name,value:n.id,onClick:t},"delete"))})))},g=function(e){var t=e.type,n=e.message;return null===n?null:u.a.createElement("div",{className:""+t},n)};r.a.render(u.a.createElement(b,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.dad6eec5.chunk.js.map