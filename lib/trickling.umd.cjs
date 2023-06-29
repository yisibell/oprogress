(function(a,i){typeof exports=="object"&&typeof module!="undefined"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(a=typeof globalThis!="undefined"?globalThis:a||self,i(a.Trickling={}))})(this,function(a){"use strict";var T=Object.defineProperty;var x=(a,i,p)=>i in a?T(a,i,{enumerable:!0,configurable:!0,writable:!0,value:p}):a[i]=p;var m=(a,i,p)=>(x(a,typeof i!="symbol"?i+"":i,p),p);function i(r,e,t){return r<e?e:r>t?t:r}function p(r,e){return(e?(1-r)*100:(-1+r)*100).toFixed(4)}const E=(()=>{const r=[];function e(){const t=r.shift();t&&t(e)}return function(t){r.push(t),r.length==1&&e()}})();function u(r,e){const n=(r.getAttribute("style")||"").split(";").filter(l=>!!l.trim()).reduce((l,f)=>{const b=f.split(":").map(B=>B.trim()),S=b[0],W=b[1];return l[S]=W,l},{}),o=Object.assign(n,e),k=Object.keys(o).filter(l=>!!l.trim()).reduce((l,f)=>(l+=`${f}: ${o[f]};`,l),"");r.setAttribute("style",k)}function d(r,e){const t=typeof e=="string"?[e]:e;r.classList.add(...t)}function v(r,e){const t=typeof e=="string"?[e]:e;r.classList.remove(...t)}function P(r){r&&r.parentNode&&r.parentNode.removeChild(r)}var c=(r=>(r.wrapperSelectorId="trickling",r.customParentClassName="trickling-custom-parent",r.busyFlagClassName="trickling-busy",r.template=`
  <div class="trickling-progress-bar" role="bar">
    <div class="trickling-progress-peg"></div>
  </div>
  <div class="trickling-progress-spinner" role="spinner">
    <div class="trickling-progress-spinner__spinner-icon"></div>
  </div>`,r.barSelector='[role="bar"]',r.spinnerSelector='[role="spinner"]',r.rtlClassName="rtl",r))(c||{}),y=(r=>(r.queryBarElementError="[Trickling]: Can not find 'barSelector' element!",r.queryAppendToElementError="[Trickling]: Can not find 'options.appendTo' element!",r))(y||{});const h=class{constructor(e){m(this,"progressOffsetWidth",0);m(this,"status",null);m(this,"positionUsing","");m(this,"options",{speed:200,easing:"ease",appendTo:"body",customWrapperClassName:"",minimum:.08,maximum:.994,showSpinner:!0,trickleSpeed:1e3,trickle:!0,color:"#2299dd",progressBarHeight:"2px",spinnerOpacity:1,spinnerSize:"18px",spinnerStrokeWidth:"2px",zIndex:1031,rtl:!1,removeFromDOMWhenDone:!0,trickleIncrementalCurve:[{from:0,to:.2,value:.1},{from:.2,to:.5,value:.04},{from:.5,to:.8,value:.02},{from:.8,to:.99,value:.005}]});this.options=Object.assign(this.options,e),this.setPercent(null)}setOptions(e){return this.options=Object.assign(this.options,e),this}setCSSVars(e){u(e,{"--trickling-color":this.options.color,"--trickling-progress-bar-height":this.options.progressBarHeight,"--trickling-spinner-opacity":this.options.spinnerOpacity,"--trickling-spinner-size":this.options.spinnerSize,"--trickling-spinner-stroke-width":this.options.spinnerStrokeWidth,"--trickling-progress-bar-z-index":this.options.zIndex})}render(e){if(this.isRendered())return this.getWrapperElement();d(document.documentElement,c.busyFlagClassName);const t=document.createElement("div");t.id=c.wrapperSelectorId,t.innerHTML=c.template,this.options.rtl&&d(t,c.rtlClassName),this.options.customWrapperClassName&&d(t,this.options.customWrapperClassName),this.setCSSVars(t);const s=this.getBarElement(t),n=this.getAppendToElement();if(this.translateProgressBar(s,e),!this.options.showSpinner){const o=t.querySelector(c.spinnerSelector);o&&P(o)}return n!=document.body&&d(n,c.customParentClassName),n&&n.appendChild(t),t}triggerRepaint(){const e=this.getWrapperElement();e&&(this.progressOffsetWidth=e.offsetWidth)}set(e){const t=this.isStarted();!t&&this.visible(),e=i(e,this.options.minimum,1),this.setPercent(e===1?null:e);const s=this.render(!t),n=this.getBarElement(s),o=this.options.speed,k=this.options.easing;return this.triggerRepaint(),E(l=>{this.positionUsing===""&&(this.positionUsing=this.getPositioningCSS()),u(n,this.barPositionCSS(e,o,k)),e===1?(u(s,{transition:"none",opacity:1}),this.triggerRepaint(),setTimeout(()=>{u(s,{transition:`all ${o}ms linear`,opacity:0}),setTimeout(()=>{this.remove(),l()},o)},o)):setTimeout(l,o)}),this}inc(e){let t=this.getPercent();if(t){if(t>1)return this;if(typeof e!="number"){const s=typeof this.options.trickleIncrementalCurve=="function"?this.options.trickleIncrementalCurve(t):this.options.trickleIncrementalCurve;if(typeof s=="number")e=s||0;else{const n=s.find(o=>t!==null&&t>=o.from&&t<o.to);n?e=n.value:e=0}}return t=i(t+e,0,this.options.maximum),this.set(t)}else return this.start()}trickle(){return this.inc()}start(){!this.isStarted()&&this.visible(),this.getPercent()||this.set(0);const e=()=>{setTimeout(()=>{this.getPercent()&&(this.trickle(),e())},this.options.trickleSpeed)};return this.options.trickle&&e(),this}done(e){return!e&&!this.getPercent()?this:this.inc(.3+.5*Math.random()).set(1)}translateProgressBar(e,t){const s=t?this.getBarPercentage(0):this.getBarPercentage(this.getPercent()||0);u(e,{transition:"all 0 linear",transform:`translate3d(${s}%, 0, 0)`})}visible(){if(this.isRendered()&&!this.options.removeFromDOMWhenDone){const e=this.getWrapperElement();e&&u(e,{display:"block",opacity:1}),this.setPercent(null)}}hidden(){const e=this.getWrapperElement();e&&(u(e,{display:"none"}),this.setPercent(null),this.translateProgressBar(this.getBarElement(e),!0))}remove(e){if(v(document.documentElement,c.busyFlagClassName),!this.options.removeFromDOMWhenDone&&!e){this.hidden();return}const t=this.getAppendToElement();v(t,c.customParentClassName);const s=this.getWrapperElement();s&&P(s)}getWrapperElement(){return document.getElementById(c.wrapperSelectorId)}getBarElement(e){const t=e.querySelector(c.barSelector);if(!t)throw new Error(y.queryBarElementError);return t}getAppendToElement(){const e=typeof this.options.appendTo=="string"?document.querySelector(this.options.appendTo):this.options.appendTo;if(!e)throw new Error(y.queryAppendToElementError);return e}setPercent(e){this.status=e}getPercent(){return this.status}isRendered(){return!!this.getWrapperElement()}isStarted(){return typeof this.getPercent()=="number"}getBarPercentage(e){return p(e,this.options.rtl)}barPositionCSS(e,t,s){let n={};return this.positionUsing==="translate3d"?n={transform:`translate3d(${this.getBarPercentage(e)}%,0,0)`}:this.positionUsing==="translate"?n={transform:`translate(${this.getBarPercentage(e)}%,0)`}:n={"margin-left":`${this.getBarPercentage(e)}%`},n.transition=`all ${t}ms ${s} 0s`,n}getPositioningCSS(){const e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"}static createProgress(e){return h.instance||(h.instance=new h(e)),h.instance}};let g=h;m(g,"instance");const C=function(r){return g.createProgress(r)},I="";a.Trickling=g,a.createTrickling=C,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
