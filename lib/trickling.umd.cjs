(function(r,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(r=typeof globalThis<"u"?globalThis:r||self,n(r.Trickling={}))})(this,function(r){"use strict";var N=Object.defineProperty;var x=(r,n,p)=>n in r?N(r,n,{enumerable:!0,configurable:!0,writable:!0,value:p}):r[n]=p;var l=(r,n,p)=>(x(r,typeof n!="symbol"?n+"":n,p),p);function n(s,t,e){return s<t?t:s>e?e:s}function p(s){return((-1+s)*100).toFixed(4)}const T=(()=>{const s=[];function t(){const e=s.shift();e&&e(t)}return function(e){s.push(e),s.length==1&&t()}})();function f(s,t){const a=(s.getAttribute("style")||"").split(";").filter(c=>!!c.trim()).reduce((c,g)=>{const P=g.split(":").map(O=>O.trim()),C=P[0],w=P[1];return c[C]=w,c},{}),o=Object.assign(a,t),h=Object.keys(o).filter(c=>!!c.trim()).reduce((c,g)=>(c+=`${g}: ${o[g]};`,c),"");s.setAttribute("style",h)}function y(s,t){return(typeof s=="string"?s:m(s)).indexOf(" "+t+" ")>=0}function S(s,t){const e=m(s),i=e+t;y(e,t)||(s.className=i.substring(1))}function b(s,t){const e=m(s);if(!y(s,t))return;const i=e.replace(" "+t+" "," ");s.className=i.substring(1,i.length-1)}function m(s){return(" "+(s&&s.className||"")+" ").replace(/\s+/gi," ")}function k(s){s&&s.parentNode&&s.parentNode.removeChild(s)}const d=class{constructor(t){l(this,"template",`
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`);l(this,"barSelector",'[role="bar"]');l(this,"spinnerSelector",'[role="spinner"]');l(this,"busyFlagClassName","trickling-busy");l(this,"customParentClassName","trickling-custom-parent");l(this,"status",null);l(this,"positionUsing","");l(this,"options",{speed:200,wrapperSelectorId:"trickling",appendTo:"body",minimum:.08,easing:"ease",showSpinner:!0,trickleSpeed:1e3,trickle:!0,color:"#29d",progressBarHeight:"2px",spinnerOpacity:1,spinnerSize:"18px",spinnerStrokeWidth:"2px"});this.options=Object.assign(this.options,t)}setStyleVars(t){f(t,{"--trickling-color":this.options.color,"--trickling-progress-bar-height":this.options.progressBarHeight,"--trickling-spinner-opacity":this.options.spinnerOpacity,"--trickling-spinner-size":this.options.spinnerSize,"--trickling-spinner-stroke-width":this.options.spinnerStrokeWidth})}render(t){if(this.isRendered())return document.getElementById(this.options.wrapperSelectorId);S(document.documentElement,this.busyFlagClassName);const e=document.createElement("div");e.id=this.options.wrapperSelectorId,e.innerHTML=this.template,this.setStyleVars(e);const i=e.querySelector(this.barSelector),a=t?"-100":p(this.getPercent()||0),o=typeof this.options.appendTo=="string"?document.querySelector(this.options.appendTo):this.options.appendTo;if(f(i,{transition:"all 0 linear",transform:`translate3d(${a}%, 0, 0)`}),!this.options.showSpinner){const h=e.querySelector(this.spinnerSelector);h&&k(h)}return o!=document.body&&S(o,this.customParentClassName),o&&o.appendChild(e),e}set(t){const e=this.isStarted();t=n(t,this.options.minimum,1),this.setPercent(t===1?null:t);const i=this.render(!e),a=i.querySelector(this.barSelector),o=this.options.speed,h=this.options.easing;return d.progressOffsetWidth=i.offsetWidth,T(c=>{this.positionUsing===""&&(this.positionUsing=this.getPositioningCSS()),f(a,this.barPositionCSS(t,o,h)),t===1?(f(i,{transition:"none",opacity:1}),d.progressOffsetWidth=i.offsetWidth,setTimeout(()=>{f(i,{transition:`all ${o}ms linear`,opacity:0}),setTimeout(()=>{this.remove(),c()},o)},o)):setTimeout(c,o)}),this}inc(t){let e=this.getPercent();return e?e>1?this:(typeof t!="number"&&(e>=0&&e<.2?t=.1:e>=.2&&e<.5?t=.04:e>=.5&&e<.8?t=.02:e>=.8&&e<.99?t=.005:t=0),e=n(e+t,0,.994),this.set(e)):this.start()}trickle(){return this.inc()}start(){this.getPercent()||this.set(0);const t=()=>{setTimeout(()=>{this.getPercent()&&(this.trickle(),t())},this.options.trickleSpeed)};return this.options.trickle&&t(),this}done(t){return!t&&!this.getPercent()?this:this.inc(.3+.5*Math.random()).set(1)}remove(){b(document.documentElement,this.busyFlagClassName);const t=typeof this.options.appendTo=="string"?document.querySelector(this.options.appendTo):this.options.appendTo;b(t,this.customParentClassName);const e=document.getElementById(this.options.wrapperSelectorId);e&&k(e)}setPercent(t){this.status=t}getPercent(){return this.status}isRendered(){return!!document.getElementById(this.options.wrapperSelectorId)}isStarted(){return typeof this.getPercent()=="number"}barPositionCSS(t,e,i){let a={};return this.positionUsing==="translate3d"?a={transform:`translate3d(${p(t)}%,0,0)`}:this.positionUsing==="translate"?a={transform:`translate(${p(t)}%,0)`}:a={"margin-left":`${p(t)}%`},a.transition=`all ${e}ms ${i} 0s`,a}getPositioningCSS(){const t=document.body.style,e="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return e+"Perspective"in t?"translate3d":e+"Transform"in t?"translate":"margin"}static createProgress(t){return d.instance||(d.instance=new d(t)),d.instance}};let u=d;l(u,"instance"),l(u,"progressOffsetWidth",0);const v=function(s){return u.createProgress(s)},W="";r.Trickling=u,r.createTrickling=v,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
