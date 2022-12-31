(this["webpackJsonpshows-in-town"]=this["webpackJsonpshows-in-town"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),a=n(10),s=n.n(a),r=(n(15),n(3)),l=n(2),o=n(0),u=function(){return Object(o.jsx)("input",{type:"date",onChange:function(e){var t=String(new Date(e.target.value).setHours(24,0,0,0)),n=Object(r.a)(document.querySelectorAll(".dayHeader")).map((function(e){return e.id})).sort((function(e,t){return e-t}));if(n.includes(t))document.getElementById(t).scrollIntoView();else{+t<n[0]&&document.getElementsByTagName("h1")[0].scrollIntoView();for(var c=0;c<n.length;c++)t>n[c]&&t<n[c+1]&&document.getElementById(n[c+1]).scrollIntoView()}},"aria-label":"Jump to date",title:"Jump to date"})},j=function(e){var t=e.epoch,n=new Date,c=new Date(t),i=new Date(t).setHours(0,0,0,0);return Object(o.jsxs)("header",{className:"dayHeader",id:i,children:[Object(o.jsx)("div",{}),Object(o.jsx)("h2",{children:n.getFullYear()===c.getFullYear()&&n.getMonth()===c.getMonth()&&n.getDate()===c.getDate()?"Today":function(){var e={weekday:"long",month:"long",day:"numeric"};return c.getFullYear()!==n.getFullYear()&&(e.year="numeric"),c.toLocaleDateString("en-us",e)}()}),Object(o.jsx)("div",{})]})},d=function(e){var t=e.data;return Object(o.jsxs)("article",{children:[Object(o.jsx)("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",children:Object(o.jsx)("h3",{children:t.title})}),Object(o.jsxs)("p",{className:"event-address",children:[Object(o.jsx)("span",{children:t.venue})," - ",t.address]}),Object(o.jsx)("p",{className:"event-time",children:t.time}),Object(o.jsx)("p",{className:"event-description",children:t.desc})]})},b=n(6),h=n.n(b),O=function(e){var t=e.setIsLoading,n=e.setEvents,a=e.events,s=e.setUniqueLocations;Object(c.useEffect)((function(){fetch("https://shows-in-town.xyz").then((function(e){return e.json()})).then((function(e){e.sort((function(e,t){return e.epoch-t.epoch})),n(e),t(!1);var c=Object(r.a)(new Set(e.map((function(e){return e.venue})))),i=c.filter((function(e,t){return 0===c.filter((function(n,c){return c>t&&h.a.compareTwoStrings(e,n)>.9})).length}));i.sort((function(e,t){var n=e.replace(/^(a |the |an )/i,""),c=t.replace(/^(a |the |an )/i,"");return n.localeCompare(c)})),s(i)}))}),[]);return Object(o.jsxs)(o.Fragment,{children:[a&&a.map((function(e,t){return!(e.epoch<new Date((new Date).setHours(0,0,0,0)))&&(0===t||function(e,t){var n=new Date(t),c=new Date(e);return n.getFullYear()!==c.getFullYear()||n.getMonth()!==c.getMonth()||n.getDate()!==c.getDate()}(e.epoch,a[t-1].epoch)?Object(o.jsxs)(i.a.Fragment,{children:[Object(o.jsx)(j,{epoch:e.epoch}),Object(o.jsx)(d,{data:e})]},t):Object(o.jsx)(d,{data:e},t))})),a&&Object(o.jsx)("p",{className:"noMoreEvents",children:"-no more events to show - check back later-"})]})},f=function(e){var t=e.expandedSection,n=e.setExpandedSection;return Object(o.jsx)("button",{className:"filter-button","aria-label":"Filter",title:"Filter",onClick:function(){n("filter-options"===t?null:"filter-options")},children:Object(o.jsx)("svg",{version:"1.1",x:"0px",y:"0px",viewBox:"0 0 1000 1000",children:Object(o.jsx)("path",{d:"M981.4,50.7c-15.5-29.2-39.5-43-72.2-43c-135.8,0-273.4,0-409.2,0c-51.6,0-103.2,0-154.7,0c-86,0-171.9,0-257.9,0c-43,0-72.2,25.8-77.4,67.1c0,3.4,1.7,10.3,3.4,12C121.8,210.6,230.1,331,340.1,453c5.2,5.2,6.9,10.3,6.9,18.9c0,113.5,0,225.2,0,338.7c0,49.9,24.1,87.7,68.8,110c30.9,15.5,63.6,25.8,94.6,39.5c25.8,10.3,49.9,20.6,75.6,29.2c25.8,8.6,49.9-3.4,58.5-25.8c3.4-8.6,5.2-20.6,5.2-30.9c0-153,0-306,0-459.1c0-6.9,1.7-12,6.9-17.2c39.5-44.7,80.8-89.4,120.4-134.1c68.8-77.4,139.3-154.7,208-232.1c1.7-1.7,5.2-6.9,5.2-10.3C986.6,69.6,986.6,59.3,981.4,50.7z M878.2,95.4C792.3,190,708,284.6,622.1,379.1c-1.7,1.7-22.4,22.4-48.1,46.4c0,144.4,0,340.4,0,476.2c-3.4-1.7-6.9-1.7-8.6-3.4c-36.1-13.8-72.2-29.2-108.3-43c-22.4-8.6-32.7-25.8-32.7-49.9c0-110,0-220.1,0-331.8c0-1.7,0-25.8,0-48.1c-24.1-24.1-44.7-43-46.4-44.7c-89.4-96.3-175.4-194.3-263.1-290.6c-1.7-1.7-3.4-3.4-5.2-6.9c259.6,0,517.5,0,778.8,0C883.4,88.6,881.7,92,878.2,95.4z"})})})},p=n(7),x=n(8),g=function(e){var t=e.uniqueLocations,n=e.filterTimeline,i=e.isVisible,a=Object(c.useState)(!1),s=Object(l.a)(a,2),r=s[0],u=s[1],j=Object(c.useState)({locations:[]}),d=Object(l.a)(j,2),b=d[0],h=d[1],O=function(e){var t=Object(x.a)(Object(x.a)({},b),{},Object(p.a)({},e,[]));h(t),n(t),document.querySelectorAll("#".concat(e,"-fields input")).forEach((function(e){return e.checked=!1}))};return Object(o.jsxs)("form",{style:{display:i?"grid":"none"},id:"filters",children:[Object(o.jsxs)("fieldset",{id:"filter-by",children:[Object(o.jsx)("legend",{children:"Filter By"}),Object(o.jsxs)("label",{htmlFor:"locations",children:["Venue",Object(o.jsx)("input",{type:"checkbox",id:"locations",name:"filter-category",value:"locations",onClick:function(e){e.target.checked?u(e.target.value):(u(!1),O(e.target.value))}})]})]}),"locations"===r&&Object(o.jsxs)("fieldset",{id:"locations-fields",children:[Object(o.jsx)("legend",{children:"Location"}),Object(o.jsxs)("label",{htmlFor:"clear-all-locations",children:[Object(o.jsx)("input",{type:"checkbox",id:"clear-all-locations",value:"clear-all-locations",onClick:function(e){return O("locations")}}),"Clear all location filters (see all locations)"]}),t.map((function(e,t){return Object(o.jsxs)("label",{htmlFor:"location"+t,children:[Object(o.jsx)("input",{type:"checkbox",id:"location"+t,value:e,onClick:function(e){return function(e,t){var c=Object(x.a)({},b);t.target.checked&&!c[e].includes(t.target.value)?c[e].push(t.target.value):c[e]=c[e].filter((function(e){return e!==t.target.value})),h(c),n(c)}("locations",e)}}),e]},t)}))]})]})},m=function(){var e=Object(c.useState)(!0),t=Object(l.a)(e,2),n=t[0],i=t[1],a=Object(c.useState)(null),s=Object(l.a)(a,2),j=s[0],d=s[1],b=Object(c.useState)(null),p=Object(l.a)(b,2),x=p[0],m=p[1],v=Object(c.useState)(null),w=Object(l.a)(v,2),y=w[0],S=w[1],k=Object(c.useState)(null),F=Object(l.a)(k,2),D=F[0],N=F[1];return Object(o.jsxs)("main",{className:n?"loading":"",children:[Object(o.jsxs)("header",{children:[Object(o.jsx)("h1",{children:"Shows In Town"}),Object(o.jsx)("hr",{}),n&&Object(o.jsx)("p",{className:"subtitle",children:"Finding live music in Louisville..."}),!n&&Object(o.jsxs)("div",{className:"subheading",children:[Object(o.jsx)("p",{className:"subtitle",children:"live music in Louisville"}),Object(o.jsxs)("div",{className:"options-wrapper",children:[Object(o.jsx)(f,{expandedSection:y,setExpandedSection:S}),Object(o.jsx)(u,{})]})]})]}),Object(o.jsx)("section",{id:"expanded-section",children:Object(o.jsx)(g,{uniqueLocations:D,filterTimeline:function(e){var t=Object(r.a)(j);e.locations.length>0&&(t=t.filter((function(t){return e.locations.includes(t.venue)||e.locations.some((function(e){return h.a.compareTwoStrings(e,t.venue)>.9}))}))),m(t)},isVisible:"filter-options"===y})}),Object(o.jsx)(O,{setIsLoading:i,setEvents:d,events:x||j,setUniqueLocations:N}),!n&&Object(o.jsx)("a",{href:"#top",id:"topLink",children:"Top \u2191"})]})};s.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(m,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.71dbe7f4.chunk.js.map