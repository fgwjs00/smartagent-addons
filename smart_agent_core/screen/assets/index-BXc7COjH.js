/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt=globalThis,Be=Lt.ShadowRoot&&(Lt.ShadyCSS===void 0||Lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),Ke=new WeakMap;let Li=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Be&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Ke.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ke.set(e,t))}return t}toString(){return this.cssText}};const nr=i=>new Li(typeof i=="string"?i:i+"",void 0,Fe),O=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((r,n,s)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[s+1],i[0]);return new Li(e,i,Fe)},sr=(i,t)=>{if(Be)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),n=Lt.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=e.cssText,i.appendChild(r)}},Ye=Be?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return nr(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:or,defineProperty:ar,getOwnPropertyDescriptor:cr,getOwnPropertyNames:lr,getOwnPropertySymbols:dr,getPrototypeOf:ur}=Object,Q=globalThis,Qe=Q.trustedTypes,hr=Qe?Qe.emptyScript:"",oe=Q.reactiveElementPolyfillSupport,Et=(i,t)=>i,Ut={toAttribute(i,t){switch(t){case Boolean:i=i?hr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Le=(i,t)=>!or(i,t),Xe={attribute:!0,type:String,converter:Ut,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Q.litPropertyMetadata??(Q.litPropertyMetadata=new WeakMap);let ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),n=this.getPropertyDescriptor(t,r,e);n!==void 0&&ar(this.prototype,t,n)}}static getPropertyDescriptor(t,e,r){const{get:n,set:s}=cr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){const c=n==null?void 0:n.call(this);s==null||s.call(this,o),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xe}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;const t=ur(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){const e=this.properties,r=[...lr(e),...dr(e)];for(const n of r)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,n]of e)this.elementProperties.set(r,n)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const n=this._$Eu(e,r);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const n of r)e.unshift(Ye(n))}else t!==void 0&&e.push(Ye(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return sr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){var s;const r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){const o=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:Ut).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s,o;const r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const c=r.getPropertyOptions(n),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((s=c.converter)==null?void 0:s.fromAttribute)!==void 0?c.converter:Ut;this._$Em=n;const l=a.fromAttribute(e,c.type);this[n]=l??((o=this._$Ej)==null?void 0:o.get(n))??l,this._$Em=null}}requestUpdate(t,e,r,n=!1,s){var o;if(t!==void 0){const c=this.constructor;if(n===!1&&(s=this[t]),r??(r=c.getPropertyOptions(t)),!((r.hasChanged??Le)(s,e)||r.useDefault&&r.reflect&&s===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(c._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:n,wrapped:s},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,o]of n){const{wrapped:c}=o,a=this[s];c!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var n;return(n=r.hostUpdated)==null?void 0:n.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},ct[Et("elementProperties")]=new Map,ct[Et("finalized")]=new Map,oe==null||oe({ReactiveElement:ct}),(Q.reactiveElementVersions??(Q.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,Ze=i=>i,jt=Ct.trustedTypes,ti=jt?jt.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ui="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,ji="?"+Y,pr=`<${ji}>`,et=document,$t=()=>et.createComment(""),kt=i=>i===null||typeof i!="object"&&typeof i!="function",Ue=Array.isArray,gr=i=>Ue(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",ae=`[ 	
\f\r]`,yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,ii=/>/g,X=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ri=/'/g,ni=/"/g,qi=/^(?:script|style|textarea|title)$/i,fr=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),g=fr(1),ht=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),si=new WeakMap,Z=et.createTreeWalker(et,129);function Hi(i,t){if(!Ue(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ti!==void 0?ti.createHTML(t):t}const mr=(i,t)=>{const e=i.length-1,r=[];let n,s=t===2?"<svg>":t===3?"<math>":"",o=yt;for(let c=0;c<e;c++){const a=i[c];let l,u,d=-1,h=0;for(;h<a.length&&(o.lastIndex=h,u=o.exec(a),u!==null);)h=o.lastIndex,o===yt?u[1]==="!--"?o=ei:u[1]!==void 0?o=ii:u[2]!==void 0?(qi.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=X):u[3]!==void 0&&(o=X):o===X?u[0]===">"?(o=n??yt,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?X:u[3]==='"'?ni:ri):o===ni||o===ri?o=X:o===ei||o===ii?o=yt:(o=X,n=void 0);const p=o===X&&i[c+1].startsWith("/>")?" ":"";s+=o===yt?a+pr:d>=0?(r.push(l),a.slice(0,d)+Ui+a.slice(d)+Y+p):a+Y+(d===-2?c:p)}return[Hi(i,s+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class Rt{constructor({strings:t,_$litType$:e},r){let n;this.parts=[];let s=0,o=0;const c=t.length-1,a=this.parts,[l,u]=mr(t,e);if(this.el=Rt.createElement(l,r),Z.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=Z.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(Ui)){const h=u[o++],p=n.getAttribute(d).split(Y),m=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:m[2],strings:p,ctor:m[1]==="."?br:m[1]==="?"?_r:m[1]==="@"?yr:Qt}),n.removeAttribute(d)}else d.startsWith(Y)&&(a.push({type:6,index:s}),n.removeAttribute(d));if(qi.test(n.tagName)){const d=n.textContent.split(Y),h=d.length-1;if(h>0){n.textContent=jt?jt.emptyScript:"";for(let p=0;p<h;p++)n.append(d[p],$t()),Z.nextNode(),a.push({type:2,index:++s});n.append(d[h],$t())}}}else if(n.nodeType===8)if(n.data===ji)a.push({type:2,index:s});else{let d=-1;for(;(d=n.data.indexOf(Y,d+1))!==-1;)a.push({type:7,index:s}),d+=Y.length-1}s++}}static createElement(t,e){const r=et.createElement("template");return r.innerHTML=t,r}}function pt(i,t,e=i,r){var o,c;if(t===ht)return t;let n=r!==void 0?(o=e._$Co)==null?void 0:o[r]:e._$Cl;const s=kt(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((c=n==null?void 0:n._$AO)==null||c.call(n,!1),s===void 0?n=void 0:(n=new s(i),n._$AT(i,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=n:e._$Cl=n),n!==void 0&&(t=pt(i,n._$AS(i,t.values),n,r)),t}class vr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,n=((t==null?void 0:t.creationScope)??et).importNode(e,!0);Z.currentNode=n;let s=Z.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new Mt(s,s.nextSibling,this,t):a.type===1?l=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(l=new xr(s,this,t)),this._$AV.push(l),a=r[++c]}o!==(a==null?void 0:a.index)&&(s=Z.nextNode(),o++)}return Z.currentNode=et,n}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Mt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=pt(this,t,e),kt(t)?t===L||t==null||t===""?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==ht&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&kt(this._$AH)?this._$AA.nextSibling.data=t:this.T(et.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Rt.createElement(Hi(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(e);else{const o=new vr(n,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=si.get(t.strings);return e===void 0&&si.set(t.strings,e=new Rt(t)),e}k(t){Ue(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,n=0;for(const s of t)n===e.length?e.push(r=new Mt(this.O($t()),this.O($t()),this,this.options)):r=e[n],r._$AI(s),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t!==this._$AB;){const n=Ze(t).nextSibling;Ze(t).remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Qt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,s){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=L}_$AI(t,e=this,r,n){const s=this.strings;let o=!1;if(s===void 0)t=pt(this,t,e,0),o=!kt(t)||t!==this._$AH&&t!==ht,o&&(this._$AH=t);else{const c=t;let a,l;for(t=s[0],a=0;a<s.length-1;a++)l=pt(this,c[r+a],e,a),l===ht&&(l=this._$AH[a]),o||(o=!kt(l)||l!==this._$AH[a]),l===L?t=L:t!==L&&(t+=(l??"")+s[a+1]),this._$AH[a]=l}o&&!n&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class br extends Qt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class _r extends Qt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class yr extends Qt{constructor(t,e,r,n,s){super(t,e,r,n,s),this.type=5}_$AI(t,e=this){if((t=pt(this,t,e,0)??L)===ht)return;const r=this._$AH,n=t===L&&r!==L||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==L&&(r===L||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class xr{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){pt(this,t)}}const ce=Ct.litHtmlPolyfillSupport;ce==null||ce(Rt,Mt),(Ct.litHtmlVersions??(Ct.litHtmlVersions=[])).push("3.3.2");const wr=(i,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let n=r._$litPart$;if(n===void 0){const s=(e==null?void 0:e.renderBefore)??null;r._$litPart$=n=new Mt(t.insertBefore($t(),s),s,void 0,e??{})}return n._$AI(i),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis;class M extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return ht}}var Fi;M._$litElement$=!0,M.finalized=!0,(Fi=tt.litElementHydrateSupport)==null||Fi.call(tt,{LitElement:M});const le=tt.litElementPolyfillSupport;le==null||le({LitElement:M});(tt.litElementVersions??(tt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Sr={attribute:!0,type:String,converter:Ut,reflect:!1,hasChanged:Le},Er=(i=Sr,t,e)=>{const{kind:r,metadata:n}=e;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(e.name,i),r==="accessor"){const{name:o}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,i,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(r==="setter"){const{name:o}=e;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,i,!0,c)}}throw Error("Unsupported decorator location: "+r)};function T(i){return(t,e)=>typeof e=="object"?Er(i,t,e):((r,n,s)=>{const o=n.hasOwnProperty(s);return n.constructor.createProperty(s,r),o?Object.getOwnPropertyDescriptor(n,s):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(i){return T({...i,state:!0,attribute:!1})}const B=O`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }
  }

  @media (prefers-contrast: more) {
    :host {
      --t-card: rgba(8, 11, 18, 0.96);
      --t-card-border: rgba(248, 250, 252, 0.42);
      --t-card-hover: rgba(8, 11, 18, 1);
      --t-sidebar: rgba(8, 11, 18, 0.98);
      --t-topbar: rgba(8, 11, 18, 0.98);
      --t-voicebar: rgba(8, 11, 18, 0.98);
      --t-text-sec: rgba(248, 250, 252, 0.78);
      --t-text-hint: rgba(248, 250, 252, 0.58);
      --glass-frosted-border: 1px solid rgba(248, 250, 252, 0.42);
      --glass-clear-border: 1px solid rgba(248, 250, 252, 0.32);
      --glass-elevated-border: 1px solid rgba(248, 250, 252, 0.52);
    }

    :host(.theme-light) {
      --t-card: rgba(255, 255, 255, 0.98);
      --t-card-border: rgba(15, 23, 42, 0.24);
      --t-card-hover: rgba(255, 255, 255, 1);
      --t-sidebar: rgba(255, 255, 255, 0.98);
      --t-topbar: rgba(255, 255, 255, 0.98);
      --t-voicebar: rgba(255, 255, 255, 0.98);
      --t-text-sec: rgba(15, 23, 42, 0.78);
      --t-text-hint: rgba(15, 23, 42, 0.62);
      --glass-frosted-border: 1px solid rgba(15, 23, 42, 0.28);
      --glass-clear-border: 1px solid rgba(15, 23, 42, 0.22);
      --glass-elevated-border: 1px solid rgba(15, 23, 42, 0.34);
    }
  }

  @media (prefers-reduced-transparency: reduce), (max-width: 760px) {
    :host {
      --glass-frosted-blur: none;
      --glass-clear-blur: none;
      --glass-elevated-blur: none;
    }

    *,
    *::before,
    *::after {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
  }
`;function Cr(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ot={},de,oi;function Ar(){return oi||(oi=1,de=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),de}var ue={},K={},ai;function rt(){if(ai)return K;ai=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return K.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},K.getSymbolTotalCodewords=function(r){return t[r]},K.getBCHDigit=function(e){let r=0;for(;e!==0;)r++,e>>>=1;return r},K.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');i=r},K.isKanjiModeEnabled=function(){return typeof i<"u"},K.toSJIS=function(r){return i(r)},K}var he={},ci;function je(){return ci||(ci=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+e)}}i.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},i.from=function(r,n){if(i.isValid(r))return r;try{return t(r)}catch{return n}}})(he)),he}var pe,li;function $r(){if(li)return pe;li=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let r=0;r<e;r++)this.putBit((t>>>e-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},pe=i,pe}var ge,di;function kr(){if(di)return ge;di=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,e,r,n){const s=t*this.size+e;this.data[s]=r,n&&(this.reservedBit[s]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},ge=i,ge}var fe={},ui;function Rr(){return ui||(ui=1,(function(i){const t=rt().getSymbolSize;i.getRowColCoords=function(r){if(r===1)return[];const n=Math.floor(r/7)+2,s=t(r),o=s===145?26:Math.ceil((s-13)/(2*n-2))*2,c=[s-7];for(let a=1;a<n-1;a++)c[a]=c[a-1]-o;return c.push(6),c.reverse()},i.getPositions=function(r){const n=[],s=i.getRowColCoords(r),o=s.length;for(let c=0;c<o;c++)for(let a=0;a<o;a++)c===0&&a===0||c===0&&a===o-1||c===o-1&&a===0||n.push([s[c],s[a]]);return n}})(fe)),fe}var me={},hi;function Pr(){if(hi)return me;hi=1;const i=rt().getSymbolSize,t=7;return me.getPositions=function(r){const n=i(r);return[[0,0],[n-t,0],[0,n-t]]},me}var ve={},pi;function Tr(){return pi||(pi=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},i.from=function(n){return i.isValid(n)?parseInt(n,10):void 0},i.getPenaltyN1=function(n){const s=n.size;let o=0,c=0,a=0,l=null,u=null;for(let d=0;d<s;d++){c=a=0,l=u=null;for(let h=0;h<s;h++){let p=n.get(d,h);p===l?c++:(c>=5&&(o+=t.N1+(c-5)),l=p,c=1),p=n.get(h,d),p===u?a++:(a>=5&&(o+=t.N1+(a-5)),u=p,a=1)}c>=5&&(o+=t.N1+(c-5)),a>=5&&(o+=t.N1+(a-5))}return o},i.getPenaltyN2=function(n){const s=n.size;let o=0;for(let c=0;c<s-1;c++)for(let a=0;a<s-1;a++){const l=n.get(c,a)+n.get(c,a+1)+n.get(c+1,a)+n.get(c+1,a+1);(l===4||l===0)&&o++}return o*t.N2},i.getPenaltyN3=function(n){const s=n.size;let o=0,c=0,a=0;for(let l=0;l<s;l++){c=a=0;for(let u=0;u<s;u++)c=c<<1&2047|n.get(l,u),u>=10&&(c===1488||c===93)&&o++,a=a<<1&2047|n.get(u,l),u>=10&&(a===1488||a===93)&&o++}return o*t.N3},i.getPenaltyN4=function(n){let s=0;const o=n.data.length;for(let a=0;a<o;a++)s+=n.data[a];return Math.abs(Math.ceil(s*100/o/5)-10)*t.N4};function e(r,n,s){switch(r){case i.Patterns.PATTERN000:return(n+s)%2===0;case i.Patterns.PATTERN001:return n%2===0;case i.Patterns.PATTERN010:return s%3===0;case i.Patterns.PATTERN011:return(n+s)%3===0;case i.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(s/3))%2===0;case i.Patterns.PATTERN101:return n*s%2+n*s%3===0;case i.Patterns.PATTERN110:return(n*s%2+n*s%3)%2===0;case i.Patterns.PATTERN111:return(n*s%3+(n+s)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}i.applyMask=function(n,s){const o=s.size;for(let c=0;c<o;c++)for(let a=0;a<o;a++)s.isReserved(a,c)||s.xor(a,c,e(n,a,c))},i.getBestMask=function(n,s){const o=Object.keys(i.Patterns).length;let c=0,a=1/0;for(let l=0;l<o;l++){s(l),i.applyMask(l,n);const u=i.getPenaltyN1(n)+i.getPenaltyN2(n)+i.getPenaltyN3(n)+i.getPenaltyN4(n);i.applyMask(l,n),u<a&&(a=u,c=l)}return c}})(ve)),ve}var Ft={},gi;function Wi(){if(gi)return Ft;gi=1;const i=je(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Ft.getBlocksCount=function(n,s){switch(s){case i.L:return t[(n-1)*4+0];case i.M:return t[(n-1)*4+1];case i.Q:return t[(n-1)*4+2];case i.H:return t[(n-1)*4+3];default:return}},Ft.getTotalCodewordsCount=function(n,s){switch(s){case i.L:return e[(n-1)*4+0];case i.M:return e[(n-1)*4+1];case i.Q:return e[(n-1)*4+2];case i.H:return e[(n-1)*4+3];default:return}},Ft}var be={},xt={},fi;function Ir(){if(fi)return xt;fi=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let r=1;for(let n=0;n<255;n++)i[n]=r,t[r]=n,r<<=1,r&256&&(r^=285);for(let n=255;n<512;n++)i[n]=i[n-255]})(),xt.log=function(r){if(r<1)throw new Error("log("+r+")");return t[r]},xt.exp=function(r){return i[r]},xt.mul=function(r,n){return r===0||n===0?0:i[t[r]+t[n]]},xt}var mi;function Dr(){return mi||(mi=1,(function(i){const t=Ir();i.mul=function(r,n){const s=new Uint8Array(r.length+n.length-1);for(let o=0;o<r.length;o++)for(let c=0;c<n.length;c++)s[o+c]^=t.mul(r[o],n[c]);return s},i.mod=function(r,n){let s=new Uint8Array(r);for(;s.length-n.length>=0;){const o=s[0];for(let a=0;a<n.length;a++)s[a]^=t.mul(n[a],o);let c=0;for(;c<s.length&&s[c]===0;)c++;s=s.slice(c)}return s},i.generateECPolynomial=function(r){let n=new Uint8Array([1]);for(let s=0;s<r;s++)n=i.mul(n,new Uint8Array([1,t.exp(s)]));return n}})(be)),be}var _e,vi;function Nr(){if(vi)return _e;vi=1;const i=Dr();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(r){this.degree=r,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(r.length+this.degree);n.set(r);const s=i.mod(n,this.genPoly),o=this.degree-s.length;if(o>0){const c=new Uint8Array(this.degree);return c.set(s,o),c}return s},_e=t,_e}var ye={},xe={},we={},bi;function Vi(){return bi||(bi=1,we.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),we}var W={},_i;function Gi(){if(_i)return W;_i=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;W.KANJI=new RegExp(e,"g"),W.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),W.BYTE=new RegExp(r,"g"),W.NUMERIC=new RegExp(i,"g"),W.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+e+"$"),s=new RegExp("^"+i+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return W.testKanji=function(a){return n.test(a)},W.testNumeric=function(a){return s.test(a)},W.testAlphanumeric=function(a){return o.test(a)},W}var yi;function nt(){return yi||(yi=1,(function(i){const t=Vi(),e=Gi();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(s,o){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?s.ccBits[0]:o<27?s.ccBits[1]:s.ccBits[2]},i.getBestModeForData=function(s){return e.testNumeric(s)?i.NUMERIC:e.testAlphanumeric(s)?i.ALPHANUMERIC:e.testKanji(s)?i.KANJI:i.BYTE},i.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},i.isValid=function(s){return s&&s.bit&&s.ccBits};function r(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+n)}}i.from=function(s,o){if(i.isValid(s))return s;try{return r(s)}catch{return o}}})(xe)),xe}var xi;function Mr(){return xi||(xi=1,(function(i){const t=rt(),e=Wi(),r=je(),n=nt(),s=Vi(),o=7973,c=t.getBCHDigit(o);function a(h,p,m){for(let f=1;f<=40;f++)if(p<=i.getCapacity(f,m,h))return f}function l(h,p){return n.getCharCountIndicator(h,p)+4}function u(h,p){let m=0;return h.forEach(function(f){const N=l(f.mode,p);m+=N+f.getBitsLength()}),m}function d(h,p){for(let m=1;m<=40;m++)if(u(h,m)<=i.getCapacity(m,p,n.MIXED))return m}i.from=function(p,m){return s.isValid(p)?parseInt(p,10):m},i.getCapacity=function(p,m,f){if(!s.isValid(p))throw new Error("Invalid QR Code version");typeof f>"u"&&(f=n.BYTE);const N=t.getSymbolTotalCodewords(p),_=e.getTotalCodewordsCount(p,m),R=(N-_)*8;if(f===n.MIXED)return R;const $=R-l(f,p);switch(f){case n.NUMERIC:return Math.floor($/10*3);case n.ALPHANUMERIC:return Math.floor($/11*2);case n.KANJI:return Math.floor($/13);case n.BYTE:default:return Math.floor($/8)}},i.getBestVersionForData=function(p,m){let f;const N=r.from(m,r.M);if(Array.isArray(p)){if(p.length>1)return d(p,N);if(p.length===0)return 1;f=p[0]}else f=p;return a(f.mode,f.getLength(),N)},i.getEncodedBits=function(p){if(!s.isValid(p)||p<7)throw new Error("Invalid QR Code version");let m=p<<12;for(;t.getBCHDigit(m)-c>=0;)m^=o<<t.getBCHDigit(m)-c;return p<<12|m}})(ye)),ye}var Se={},wi;function Or(){if(wi)return Se;wi=1;const i=rt(),t=1335,e=21522,r=i.getBCHDigit(t);return Se.getEncodedBits=function(s,o){const c=s.bit<<3|o;let a=c<<10;for(;i.getBCHDigit(a)-r>=0;)a^=t<<i.getBCHDigit(a)-r;return(c<<10|a)^e},Se}var Ee={},Ce,Si;function zr(){if(Si)return Ce;Si=1;const i=nt();function t(e){this.mode=i.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){let n,s,o;for(n=0;n+3<=this.data.length;n+=3)s=this.data.substr(n,3),o=parseInt(s,10),r.put(o,10);const c=this.data.length-n;c>0&&(s=this.data.substr(n),o=parseInt(s,10),r.put(o,c*3+1))},Ce=t,Ce}var Ae,Ei;function Br(){if(Ei)return Ae;Ei=1;const i=nt(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(r){this.mode=i.ALPHANUMERIC,this.data=r}return e.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let s;for(s=0;s+2<=this.data.length;s+=2){let o=t.indexOf(this.data[s])*45;o+=t.indexOf(this.data[s+1]),n.put(o,11)}this.data.length%2&&n.put(t.indexOf(this.data[s]),6)},Ae=e,Ae}var $e,Ci;function Fr(){if(Ci)return $e;Ci=1;const i=nt();function t(e){this.mode=i.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(r){return r*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let r=0,n=this.data.length;r<n;r++)e.put(this.data[r],8)},$e=t,$e}var ke,Ai;function Lr(){if(Ai)return ke;Ai=1;const i=nt(),t=rt();function e(r){this.mode=i.KANJI,this.data=r}return e.getBitsLength=function(n){return n*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){let n;for(n=0;n<this.data.length;n++){let s=t.toSJIS(this.data[n]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),r.put(s,13)}},ke=e,ke}var Re={exports:{}},$i;function Ur(){return $i||($i=1,(function(i){var t={single_source_shortest_paths:function(e,r,n){var s={},o={};o[r]=0;var c=t.PriorityQueue.make();c.push(r,0);for(var a,l,u,d,h,p,m,f,N;!c.empty();){a=c.pop(),l=a.value,d=a.cost,h=e[l]||{};for(u in h)h.hasOwnProperty(u)&&(p=h[u],m=d+p,f=o[u],N=typeof o[u]>"u",(N||f>m)&&(o[u]=m,c.push(u,m),s[u]=l))}if(typeof n<"u"&&typeof o[n]>"u"){var _=["Could not find a path from ",r," to ",n,"."].join("");throw new Error(_)}return s},extract_shortest_path_from_predecessor_list:function(e,r){for(var n=[],s=r;s;)n.push(s),e[s],s=e[s];return n.reverse(),n},find_path:function(e,r,n){var s=t.single_source_shortest_paths(e,r,n);return t.extract_shortest_path_from_predecessor_list(s,n)},PriorityQueue:{make:function(e){var r=t.PriorityQueue,n={},s;e=e||{};for(s in r)r.hasOwnProperty(s)&&(n[s]=r[s]);return n.queue=[],n.sorter=e.sorter||r.default_sorter,n},default_sorter:function(e,r){return e.cost-r.cost},push:function(e,r){var n={value:e,cost:r};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Re)),Re.exports}var ki;function jr(){return ki||(ki=1,(function(i){const t=nt(),e=zr(),r=Br(),n=Fr(),s=Lr(),o=Gi(),c=rt(),a=Ur();function l(_){return unescape(encodeURIComponent(_)).length}function u(_,R,$){const C=[];let F;for(;(F=_.exec($))!==null;)C.push({data:F[0],index:F.index,mode:R,length:F[0].length});return C}function d(_){const R=u(o.NUMERIC,t.NUMERIC,_),$=u(o.ALPHANUMERIC,t.ALPHANUMERIC,_);let C,F;return c.isKanjiModeEnabled()?(C=u(o.BYTE,t.BYTE,_),F=u(o.KANJI,t.KANJI,_)):(C=u(o.BYTE_KANJI,t.BYTE,_),F=[]),R.concat($,C,F).sort(function(S,w){return S.index-w.index}).map(function(S){return{data:S.data,mode:S.mode,length:S.length}})}function h(_,R){switch(R){case t.NUMERIC:return e.getBitsLength(_);case t.ALPHANUMERIC:return r.getBitsLength(_);case t.KANJI:return s.getBitsLength(_);case t.BYTE:return n.getBitsLength(_)}}function p(_){return _.reduce(function(R,$){const C=R.length-1>=0?R[R.length-1]:null;return C&&C.mode===$.mode?(R[R.length-1].data+=$.data,R):(R.push($),R)},[])}function m(_){const R=[];for(let $=0;$<_.length;$++){const C=_[$];switch(C.mode){case t.NUMERIC:R.push([C,{data:C.data,mode:t.ALPHANUMERIC,length:C.length},{data:C.data,mode:t.BYTE,length:C.length}]);break;case t.ALPHANUMERIC:R.push([C,{data:C.data,mode:t.BYTE,length:C.length}]);break;case t.KANJI:R.push([C,{data:C.data,mode:t.BYTE,length:l(C.data)}]);break;case t.BYTE:R.push([{data:C.data,mode:t.BYTE,length:l(C.data)}])}}return R}function f(_,R){const $={},C={start:{}};let F=["start"];for(let b=0;b<_.length;b++){const S=_[b],w=[];for(let v=0;v<S.length;v++){const A=S[v],y=""+b+v;w.push(y),$[y]={node:A,lastCount:0},C[y]={};for(let E=0;E<F.length;E++){const x=F[E];$[x]&&$[x].node.mode===A.mode?(C[x][y]=h($[x].lastCount+A.length,A.mode)-h($[x].lastCount,A.mode),$[x].lastCount+=A.length):($[x]&&($[x].lastCount=A.length),C[x][y]=h(A.length,A.mode)+4+t.getCharCountIndicator(A.mode,R))}}F=w}for(let b=0;b<F.length;b++)C[F[b]].end=0;return{map:C,table:$}}function N(_,R){let $;const C=t.getBestModeForData(_);if($=t.from(R,C),$!==t.BYTE&&$.bit<C.bit)throw new Error('"'+_+'" cannot be encoded with mode '+t.toString($)+`.
 Suggested mode is: `+t.toString(C));switch($===t.KANJI&&!c.isKanjiModeEnabled()&&($=t.BYTE),$){case t.NUMERIC:return new e(_);case t.ALPHANUMERIC:return new r(_);case t.KANJI:return new s(_);case t.BYTE:return new n(_)}}i.fromArray=function(R){return R.reduce(function($,C){return typeof C=="string"?$.push(N(C,null)):C.data&&$.push(N(C.data,C.mode)),$},[])},i.fromString=function(R,$){const C=d(R,c.isKanjiModeEnabled()),F=m(C),b=f(F,$),S=a.find_path(b.map,"start","end"),w=[];for(let v=1;v<S.length-1;v++)w.push(b.table[S[v]].node);return i.fromArray(p(w))},i.rawSplit=function(R){return i.fromArray(d(R,c.isKanjiModeEnabled()))}})(Ee)),Ee}var Ri;function qr(){if(Ri)return ue;Ri=1;const i=rt(),t=je(),e=$r(),r=kr(),n=Rr(),s=Pr(),o=Tr(),c=Wi(),a=Nr(),l=Mr(),u=Or(),d=nt(),h=jr();function p(b,S){const w=b.size,v=s.getPositions(S);for(let A=0;A<v.length;A++){const y=v[A][0],E=v[A][1];for(let x=-1;x<=7;x++)if(!(y+x<=-1||w<=y+x))for(let k=-1;k<=7;k++)E+k<=-1||w<=E+k||(x>=0&&x<=6&&(k===0||k===6)||k>=0&&k<=6&&(x===0||x===6)||x>=2&&x<=4&&k>=2&&k<=4?b.set(y+x,E+k,!0,!0):b.set(y+x,E+k,!1,!0))}}function m(b){const S=b.size;for(let w=8;w<S-8;w++){const v=w%2===0;b.set(w,6,v,!0),b.set(6,w,v,!0)}}function f(b,S){const w=n.getPositions(S);for(let v=0;v<w.length;v++){const A=w[v][0],y=w[v][1];for(let E=-2;E<=2;E++)for(let x=-2;x<=2;x++)E===-2||E===2||x===-2||x===2||E===0&&x===0?b.set(A+E,y+x,!0,!0):b.set(A+E,y+x,!1,!0)}}function N(b,S){const w=b.size,v=l.getEncodedBits(S);let A,y,E;for(let x=0;x<18;x++)A=Math.floor(x/3),y=x%3+w-8-3,E=(v>>x&1)===1,b.set(A,y,E,!0),b.set(y,A,E,!0)}function _(b,S,w){const v=b.size,A=u.getEncodedBits(S,w);let y,E;for(y=0;y<15;y++)E=(A>>y&1)===1,y<6?b.set(y,8,E,!0):y<8?b.set(y+1,8,E,!0):b.set(v-15+y,8,E,!0),y<8?b.set(8,v-y-1,E,!0):y<9?b.set(8,15-y-1+1,E,!0):b.set(8,15-y-1,E,!0);b.set(v-8,8,1,!0)}function R(b,S){const w=b.size;let v=-1,A=w-1,y=7,E=0;for(let x=w-1;x>0;x-=2)for(x===6&&x--;;){for(let k=0;k<2;k++)if(!b.isReserved(A,x-k)){let J=!1;E<S.length&&(J=(S[E]>>>y&1)===1),b.set(A,x-k,J),y--,y===-1&&(E++,y=7)}if(A+=v,A<0||w<=A){A-=v,v=-v;break}}}function $(b,S,w){const v=new e;w.forEach(function(k){v.put(k.mode.bit,4),v.put(k.getLength(),d.getCharCountIndicator(k.mode,b)),k.write(v)});const A=i.getSymbolTotalCodewords(b),y=c.getTotalCodewordsCount(b,S),E=(A-y)*8;for(v.getLengthInBits()+4<=E&&v.put(0,4);v.getLengthInBits()%8!==0;)v.putBit(0);const x=(E-v.getLengthInBits())/8;for(let k=0;k<x;k++)v.put(k%2?17:236,8);return C(v,b,S)}function C(b,S,w){const v=i.getSymbolTotalCodewords(S),A=c.getTotalCodewordsCount(S,w),y=v-A,E=c.getBlocksCount(S,w),x=v%E,k=E-x,J=Math.floor(v/E),_t=Math.floor(y/E),er=_t+1,Ve=J-_t,ir=new a(Ve);let ie=0;const Bt=new Array(E),Ge=new Array(E);let re=0;const rr=new Uint8Array(b.buffer);for(let st=0;st<E;st++){const se=st<k?_t:er;Bt[st]=rr.slice(ie,ie+se),Ge[st]=ir.encode(Bt[st]),ie+=se,re=Math.max(re,se)}const ne=new Uint8Array(v);let Je=0,V,G;for(V=0;V<re;V++)for(G=0;G<E;G++)V<Bt[G].length&&(ne[Je++]=Bt[G][V]);for(V=0;V<Ve;V++)for(G=0;G<E;G++)ne[Je++]=Ge[G][V];return ne}function F(b,S,w,v){let A;if(Array.isArray(b))A=h.fromArray(b);else if(typeof b=="string"){let J=S;if(!J){const _t=h.rawSplit(b);J=l.getBestVersionForData(_t,w)}A=h.fromString(b,J||40)}else throw new Error("Invalid data");const y=l.getBestVersionForData(A,w);if(!y)throw new Error("The amount of data is too big to be stored in a QR Code");if(!S)S=y;else if(S<y)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+y+`.
`);const E=$(S,w,A),x=i.getSymbolSize(S),k=new r(x);return p(k,S),m(k),f(k,S),_(k,w,0),S>=7&&N(k,S),R(k,E),isNaN(v)&&(v=o.getBestMask(k,_.bind(null,k,w))),o.applyMask(v,k),_(k,w,v),{modules:k,version:S,errorCorrectionLevel:w,maskPattern:v,segments:A}}return ue.create=function(S,w){if(typeof S>"u"||S==="")throw new Error("No input text");let v=t.M,A,y;return typeof w<"u"&&(v=t.from(w.errorCorrectionLevel,t.M),A=l.from(w.version),y=o.from(w.maskPattern),w.toSJISFunc&&i.setToSJISFunction(w.toSJISFunc)),F(S,A,v,y)},ue}var Pe={},Te={},Pi;function Ji(){return Pi||(Pi=1,(function(i){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let r=e.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+e);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(s){return[s,s]}))),r.length===6&&r.push("F","F");const n=parseInt(r.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+r.slice(0,6).join("")}}i.getOptions=function(r){r||(r={}),r.color||(r.color={});const n=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,s=r.width&&r.width>=21?r.width:void 0,o=r.scale||4;return{width:s,scale:s?4:o,margin:n,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},i.getScale=function(r,n){return n.width&&n.width>=r+n.margin*2?n.width/(r+n.margin*2):n.scale},i.getImageWidth=function(r,n){const s=i.getScale(r,n);return Math.floor((r+n.margin*2)*s)},i.qrToImageData=function(r,n,s){const o=n.modules.size,c=n.modules.data,a=i.getScale(o,s),l=Math.floor((o+s.margin*2)*a),u=s.margin*a,d=[s.color.light,s.color.dark];for(let h=0;h<l;h++)for(let p=0;p<l;p++){let m=(h*l+p)*4,f=s.color.light;if(h>=u&&p>=u&&h<l-u&&p<l-u){const N=Math.floor((h-u)/a),_=Math.floor((p-u)/a);f=d[c[N*o+_]?1:0]}r[m++]=f.r,r[m++]=f.g,r[m++]=f.b,r[m]=f.a}}})(Te)),Te}var Ti;function Hr(){return Ti||(Ti=1,(function(i){const t=Ji();function e(n,s,o){n.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=o,s.width=o,s.style.height=o+"px",s.style.width=o+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(s,o,c){let a=c,l=o;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),o||(l=r()),a=t.getOptions(a);const u=t.getImageWidth(s.modules.size,a),d=l.getContext("2d"),h=d.createImageData(u,u);return t.qrToImageData(h.data,s,a),e(d,l,u),d.putImageData(h,0,0),l},i.renderToDataURL=function(s,o,c){let a=c;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),a||(a={});const l=i.render(s,o,a),u=a.type||"image/png",d=a.rendererOpts||{};return l.toDataURL(u,d.quality)}})(Pe)),Pe}var Ie={},Ii;function Wr(){if(Ii)return Ie;Ii=1;const i=Ji();function t(n,s){const o=n.a/255,c=s+'="'+n.hex+'"';return o<1?c+" "+s+'-opacity="'+o.toFixed(2).slice(1)+'"':c}function e(n,s,o){let c=n+s;return typeof o<"u"&&(c+=" "+o),c}function r(n,s,o){let c="",a=0,l=!1,u=0;for(let d=0;d<n.length;d++){const h=Math.floor(d%s),p=Math.floor(d/s);!h&&!l&&(l=!0),n[d]?(u++,d>0&&h>0&&n[d-1]||(c+=l?e("M",h+o,.5+p+o):e("m",a,0),a=0,l=!1),h+1<s&&n[d+1]||(c+=e("h",u),u=0)):a++}return c}return Ie.render=function(s,o,c){const a=i.getOptions(o),l=s.modules.size,u=s.modules.data,d=l+a.margin*2,h=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",p="<path "+t(a.color.dark,"stroke")+' d="'+r(u,l,a.margin)+'"/>',m='viewBox="0 0 '+d+" "+d+'"',N='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+m+' shape-rendering="crispEdges">'+h+p+`</svg>
`;return typeof c=="function"&&c(null,N),N},Ie}var Di;function Vr(){if(Di)return ot;Di=1;const i=Ar(),t=qr(),e=Hr(),r=Wr();function n(s,o,c,a,l){const u=[].slice.call(arguments,1),d=u.length,h=typeof u[d-1]=="function";if(!h&&!i())throw new Error("Callback required as last argument");if(h){if(d<2)throw new Error("Too few arguments provided");d===2?(l=c,c=o,o=a=void 0):d===3&&(o.getContext&&typeof l>"u"?(l=a,a=void 0):(l=a,a=c,c=o,o=void 0))}else{if(d<1)throw new Error("Too few arguments provided");return d===1?(c=o,o=a=void 0):d===2&&!o.getContext&&(a=c,c=o,o=void 0),new Promise(function(p,m){try{const f=t.create(c,a);p(s(f,o,a))}catch(f){m(f)}})}try{const p=t.create(c,a);l(null,s(p,o,a))}catch(p){l(p)}}return ot.create=t.create,ot.toCanvas=n.bind(null,e.render),ot.toDataURL=n.bind(null,e.renderToDataURL),ot.toString=n.bind(null,function(s,o,c){return r.render(s,c)}),ot}var Gr=Vr();const Jr=Cr(Gr);var Kr=Object.defineProperty,Yr=Object.getOwnPropertyDescriptor,Xt=(i,t,e,r)=>{for(var n=r>1?void 0:r?Yr(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&Kr(t,e,n),n};let gt=class extends M{constructor(){super(...arguments),this.variant="frosted",this.state="off",this.interactive=!1}render(){return g`
      <div
        class="card ${this.variant} ${this.interactive?"interactive":""}"
        data-state="${this.state}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};gt.styles=[B,O`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .card {
      border-radius: 20px;
      padding: 14px;
      transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
      position: relative;
      overflow: hidden;
      height: 100%;
      min-height: var(--glass-card-min-height, 150px);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--t-card-border, rgba(255, 255, 255, 0.08));
      background: var(--t-card, rgba(255, 255, 255, 0.06));
      color: var(--t-text, #F0F2F5);
    }

    /* 变体 */
    .frosted {
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.18),
        inset 0 1px 1px rgba(255, 255, 255, 0.08);
    }

    .clear {
      background: var(--t-card, rgba(255, 255, 255, 0.02));
      backdrop-filter: blur(16px) saturate(120%);
      -webkit-backdrop-filter: blur(16px) saturate(120%);
    }

    .elevated {
      background: var(--t-card-hover, rgba(255, 255, 255, 0.09));
      backdrop-filter: blur(48px) saturate(220%);
      -webkit-backdrop-filter: blur(48px) saturate(220%);
      box-shadow:
        0 24px 64px -8px rgba(0, 0, 0, 0.22),
        inset 0 1px 1px rgba(255, 255, 255, 0.12);
    }

    /* 开启状态：绿色辉光 */
    .card[data-state="on"] {
      background: var(--t-card-on, rgba(92, 219, 149, 0.12));
      border: 1.5px solid var(--t-card-on-border, rgba(92, 219, 149, 0.40));
      box-shadow:
        0 0 10px var(--t-card-on-glow, rgba(92, 219, 149, 0.20)),
        0 0 28px var(--t-card-on-glow, rgba(92, 219, 149, 0.12));
      animation: glow-pulse 4s ease-in-out infinite;
    }

    /* AI 控制状态：紫色辉光（用品牌色变量，两套主题均有定义） */
    .card[data-state="ai-active"] {
      background: color-mix(in srgb, var(--ai-purple, #B388FF) 12%, transparent);
      border: 1.5px solid color-mix(in srgb, var(--ai-purple, #B388FF) 42%, transparent);
      box-shadow:
        0 0 10px color-mix(in srgb, var(--ai-purple, #B388FF) 28%, transparent),
        0 0 28px color-mix(in srgb, var(--ai-purple, #B388FF) 14%, transparent);
      animation: glow-pulse 3s ease-in-out infinite;
    }

    @keyframes glow-pulse {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.15); }
    }

    .interactive:active {
      transform: scale(0.96) translateY(2px);
      transition-duration: 0.1s;
    }

    /* 顶部高亮折射线 */
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg,
        rgba(255, 255, 255, 0.14) 0%,
        transparent 45%,
        transparent 55%,
        rgba(255, 255, 255, 0.05) 100%
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 2;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `];Xt([T({type:String})],gt.prototype,"variant",2);Xt([T({type:String})],gt.prototype,"state",2);Xt([T({type:Boolean})],gt.prototype,"interactive",2);gt=Xt([z("glass-card")],gt);var Qr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,Ki=(i,t,e,r)=>{for(var n=r>1?void 0:r?Xr(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&Qr(t,e,n),n};let qt=class extends M{constructor(){super(...arguments),this.checked=!1}render(){return g`
      <div
        class="toggle"
        ?data-checked="${this.checked}"
        @click="${i=>{i.stopPropagation();const t=!this.checked;this.dispatchEvent(new CustomEvent("change",{detail:t}))}}"
      >
        <div class="thumb"></div>
      </div>
    `}};qt.styles=[B,O`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .toggle {
      width: 52px;
      height: 28px;
      border-radius: 999px;
      background: var(--t-toggle-off, rgba(255, 255, 255, 0.08));
      border: 1px solid var(--t-toggle-off-border, rgba(255, 255, 255, 0.06));
      position: relative;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
    }

    .toggle[data-checked] {
      background: rgba(92, 219, 149, 0.22);
      border-color: rgba(92, 219, 149, 0.42);
      box-shadow: 0 0 12px rgba(92, 219, 149, 0.18);
    }

    .thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--t-text-hint, #9BA1B0);
      position: absolute;
      top: 3px;
      left: 3px;
      transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    }

    .toggle[data-checked] .thumb {
      transform: translateX(24px);
      background: #fff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    }
  `];Ki([T({type:Boolean})],qt.prototype,"checked",2);qt=Ki([z("glass-toggle")],qt);var Zr=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,Zt=(i,t,e,r)=>{for(var n=r>1?void 0:r?tn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&Zr(t,e,n),n};let ft=class extends M{constructor(){super(...arguments),this.value=50,this.label="",this._isDragging=!1,this._handleMove=i=>{this._isDragging&&(i.cancelable&&i.preventDefault(),this._updateValue(i),this.dispatchEvent(new CustomEvent("input",{detail:this.value})))},this._handleEnd=()=>{this._isDragging&&(this._isDragging=!1,this.dispatchEvent(new CustomEvent("change",{detail:this.value}))),window.removeEventListener("mousemove",this._handleMove),window.removeEventListener("mouseup",this._handleEnd),window.removeEventListener("touchmove",this._handleMove),window.removeEventListener("touchend",this._handleEnd)}}render(){return g`
      <div class="container" @mousedown="${this._handleStart}" @touchstart="${this._handleStart}">
        <div class="track" id="track">
          <div class="fill" style="width: ${this.value}%"></div>
          <div class="thumb" style="left: ${this.value}%"></div>
        </div>
        <div class="value-display">${Math.round(this.value)}%</div>
      </div>
    `}_handleStart(i){this._isDragging=!0,this._updateValue(i);const t={passive:!1};window.addEventListener("mousemove",this._handleMove,t),window.addEventListener("mouseup",this._handleEnd,t),window.addEventListener("touchmove",this._handleMove,t),window.addEventListener("touchend",this._handleEnd,t)}_updateValue(i){const t=this.renderRoot.querySelector("#track");if(!t)return;const e=t.getBoundingClientRect(),r="touches"in i?i.touches[0].clientX:i.clientX,s=Math.max(0,Math.min(r-e.left,e.width))/e.width*100;this.value!==s&&(this.value=s)}};ft.styles=[B,O`
    :host {
      display: block;
      width: 100%;
      user-select: none;
      margin: 8px 0;
    }

    .container {
      position: relative;
      height: 36px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .track {
      flex: 1;
      height: 10px;
      background: var(--t-track, rgba(255, 255, 255, 0.08));
      border-radius: 999px;
      position: relative;
      transition: background 0.3s;
    }

    .fill {
      height: 100%;
      background: linear-gradient(90deg,
        var(--glass-primary, #7AB8FF),
        color-mix(in srgb, var(--glass-primary, #7AB8FF) 70%, #fff)
      );
      border-radius: 999px;
      box-shadow: 0 0 8px var(--glass-primary-glow, rgba(122, 184, 255, 0.35));
      transition: box-shadow 0.3s;
    }

    .thumb {
      position: absolute;
      width: 22px;
      height: 22px;
      background: #fff;
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.30);
      z-index: 2;
      transition: transform 0.1s, box-shadow 0.2s;
    }

    .container:active .thumb {
      transform: translate(-50%, -50%) scale(1.18);
      box-shadow: 0 0 0 4px var(--glass-primary-glow, rgba(122, 184, 255, 0.25)), 0 3px 10px rgba(0, 0, 0, 0.30);
    }

    .value-display {
      margin-left: 12px;
      font-size: 13px;
      font-weight: 800;
      color: var(--t-text-sec, rgba(240, 242, 245, 0.6));
      width: 36px;
      text-align: right;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
    }
  `];Zt([T({type:Number})],ft.prototype,"value",2);Zt([T({type:String})],ft.prototype,"label",2);Zt([I()],ft.prototype,"_isDragging",2);ft=Zt([z("glass-slider")],ft);var en=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,qe=(i,t,e,r)=>{for(var n=r>1?void 0:r?rn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&en(t,e,n),n};let Pt=class extends M{constructor(){super(...arguments),this.rooms=[],this.activeRoom=""}render(){return g`
      <div class="nav-container">
        ${this.rooms.map(i=>g`
          <div
            class="nav-item"
            ?data-active="${this.activeRoom===i.id}"
            @click="${()=>this._selectRoom(i.id)}"
          >
            ${i.name}
          </div>
        `)}
      </div>
    `}_selectRoom(i){this.activeRoom=i,this.dispatchEvent(new CustomEvent("room-change",{detail:i}))}};Pt.styles=[B,O`
    :host {
      display: block;
      margin-bottom: 12px;
    }

    .nav-container {
      display: flex;
      gap: 10px;
      padding: 6px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .nav-container::-webkit-scrollbar {
      display: none;
    }

    .nav-item {
      padding: 9px 24px;
      border-radius: 999px;
      background: var(--t-nav-item, rgba(255, 255, 255, 0.03));
      border: 1px solid var(--t-nav-border, rgba(255, 255, 255, 0.05));
      color: var(--t-text-sec, rgba(240, 242, 245, 0.55));
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      letter-spacing: 0.3px;
    }

    .nav-item:hover {
      background: var(--t-card-hover, rgba(255, 255, 255, 0.07));
      color: var(--t-text, #F0F2F5);
      transform: translateY(-1px);
    }

    .nav-item[data-active] {
      background: linear-gradient(135deg,
        color-mix(in srgb, var(--ai-purple, #B388FF) 18%, transparent),
        color-mix(in srgb, var(--glass-primary, #7AB8FF) 12%, transparent)
      );
      border-color: color-mix(in srgb, var(--ai-purple, #B388FF) 50%, transparent);
      color: var(--ai-purple, #B388FF);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      transform: scale(1.04);
    }

    .nav-item[data-active]::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 38%;
      right: 38%;
      height: 2px;
      background: var(--ai-purple, #B388FF);
      box-shadow: 0 0 10px var(--ai-purple, #B388FF);
      border-radius: 4px;
    }
  `];qe([T({type:Array})],Pt.prototype,"rooms",2);qe([T({type:String})],Pt.prototype,"activeRoom",2);Pt=qe([z("glass-nav")],Pt);const bt=(i,t)=>{if(!i)return{light:"lightbulb",switch:"toggle_on",climate:"ac_unit",cover:"blinds",sensor:"sensors",binary_sensor:"sensors",scene:"scene",media_player:"play_circle",automation:"robot",fan:"fan"}[t||""]||"device_hub";const e=i.replace("mdi:","").replace(/-/g,"_"),r={white_balance_incandescent:"lightbulb",ceiling_light:"lightbulb",lamp:"lightbulb",wall_sconce:"lightbulb",floor_lamp:"lightbulb",led_strip:"lightbulb",weather_sunny:"sunny",weather_cloudy:"cloudy",weather_rainy:"rainy",weather_snowy:"snowy",thermometer:"thermostat",water_percent:"humidity_mid",motion_sensor:"motion_sensors",motion_sensor_off:"motion_sensors",shield_lock:"security",eye:"visibility",eye_outline:"visibility",eye_off:"visibility_off",eye_off_outline:"visibility_off",eye_circle:"visibility",eye_circle_outline:"visibility",cctv:"videocam",camera:"videocam",camera_outline:"videocam",camera_off:"videocam_off",video:"videocam",video_outline:"videocam",account:"person",account_outline:"person",account_multiple:"group",account_multiple_outline:"group",account_check:"how_to_reg",account_off:"person_off",run:"directions_run",walk:"directions_walk",human:"person",human_greeting:"waving_hand",window_shutter:"blinds",curtains:"blinds",door:"door_front",door_open:"door_open",door_closed:"door_front",air_conditioner:"ac_unit",television:"tv",speaker:"speaker",washing_machine:"local_laundry_service",dishwasher:"dishwasher_gen",fridge:"kitchen",coffee_maker:"coffee_maker",kettle:"kettle",microwave:"microwave",oven:"oven_gen",fan:"fan",robot_vacuum:"cleaning_services",power:"power_settings_new",power_plug:"electrical_services",power_plug_off:"electrical_services",flash:"bolt",wifi:"wifi",bluetooth:"bluetooth",home:"home",home_outline:"home",map_marker:"location_on",map_marker_outline:"location_on"},n=e.replace(/_outline$/,"").replace(/_filled$/,"");return r[e]||r[n]||n};function H(i,t){if(Array.isArray(i==null?void 0:i.actionDescriptors))return i.actionDescriptors.find(e=>e.available===!0&&e.ui_role===t)}function Oe(i,t){if(Array.isArray(i==null?void 0:i.actionDescriptors))return i.actionDescriptors.find(e=>e.available===!0&&e.service===t)}function q(i,t,e,r={}){i.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:e.domain,service:e.service,data:{...r,entity_id:t.id}}}))}var nn=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,U=(i,t,e,r)=>{for(var n=r>1?void 0:r?sn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&nn(t,e,n),n};let Tt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1,this._lpTimer=null,this._lpStartX=0,this._lpStartY=0}render(){var o;const i=this.device.state==="on",t=bt(this.device.icon,"light"),e=((o=this.device.attributes)==null?void 0:o.supported_color_modes)||[],r=H(this.device,i?"deactivate":"activate"),s=!!Oe(this.device,"turn_on")&&e.length>0&&!(e.length===1&&e[0]==="onoff");return g`
      <glass-card
        ?state="${i?"on":"off"}"
        ?interactive="${!!(r||s)}"
        @pointerdown="${this._onPointerDown}"
        @pointermove="${this._onPointerMove}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._onPointerCancel}"
        @contextmenu="${c=>c.preventDefault()}"
      >
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box"
              style="color: ${i?"var(--glass-primary)":"inherit"}; background: ${i?"rgba(107, 170, 255, 0.1)":"rgba(255,255,255,0.05)"};"
            >
              <span>${t}</span>
            </div>
            ${r?g`<glass-toggle
              .checked="${i}"
              @change="${c=>{c.stopPropagation(),q(this,this.device,r)}}"
            ></glass-toggle>`:""}
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="info">${i?`${this.device.brightness||0}% 亮度`:"已关闭"}</div>
            ${s?g`<div class="hint">长按调光调色</div>`:""}
          </div>
        </div>
      </glass-card>
    `}_onPointerDown(i){i.button!==void 0&&i.button!==0||(this._lpStartX=i.clientX,this._lpStartY=i.clientY,this._lpTimer=setTimeout(()=>{var t;(t=navigator.vibrate)==null||t.call(navigator,40),this._showDetail()},600))}_onPointerMove(i){if(this._lpTimer===null)return;const t=i.clientX-this._lpStartX,e=i.clientY-this._lpStartY;Math.sqrt(t*t+e*e)>10&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerUp(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerCancel(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_showDetail(){Oe(this.device,"turn_on")&&this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};Tt.styles=[B,O`
    :host { position: relative; display: block; height: 100%; }
    .ai-badge {
      position: absolute;
      top: 10px; left: 10px;
      background: var(--ai-purple, #B388FF);
      color: white;
      font-size: 7px;
      padding: 1px 4px;
      border-radius: 3px;
      z-index: 2;
      opacity: 0.85;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
    }
    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: auto;
    }
    .icon-box {
      width: 40px; height: 40px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      background: var(--t-input-bg, rgba(255,255,255,0.06));
      font-size: 24px;
      font-family: 'Material Symbols Outlined';
      transition: background 0.3s, color 0.3s;
    }
    .bottom-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 8px;
    }
    .name { font-size: 13px; font-weight: 800; color: var(--t-text, #F0F2F5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .info { font-size: 10px; color: var(--t-text-sec, rgba(240,242,245,0.55)); font-weight: 600; }
    .hint { font-size: 9px; color: var(--t-text-hint, rgba(240,242,245,0.30)); margin-top: 2px; }
  `];U([T({type:Object})],Tt.prototype,"device",2);U([T({type:Boolean})],Tt.prototype,"isAiControlled",2);Tt=U([z("light-card")],Tt);let It=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){var s;const i=this.device.state!=="off",t=Number((s=this.device.attributes)==null?void 0:s.temperature),e=bt(this.device.icon,"climate"),r=H(this.device,i?"deactivate":"activate"),n=H(this.device,"set_temperature");return g`
      <glass-card ?state="${i?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" 
              style="color: ${i?"var(--glass-primary)":"inherit"};"
              @click="${this._showDetail}"
            >${e}</div>
            ${r?g`<glass-toggle
              .checked="${i}"
              @change="${()=>q(this,this.device,r)}"
            ></glass-toggle>`:""}
          </div>
          
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${this.device.attributes.hvac_action||"空闲"}</div>
          </div>

          <div class="main-control">
            <div class="temp-display">
              <span class="temp-value">${Number.isFinite(t)?t:"—"}</span>
              <span class="temp-unit">°C</span>
            </div>
            ${n&&Number.isFinite(t)?g`<div class="btn-group">
              <div class="btn" @click="${()=>this._adjustTemp(-.5)}">remove</div>
              <div class="btn" @click="${()=>this._adjustTemp(.5)}">add</div>
            </div>`:""}
          </div>
        </div>
      </glass-card>
    `}_adjustTemp(i){var l,u;const t=H(this.device,"set_temperature"),e=Number((l=this.device.attributes)==null?void 0:l.temperature);if(!t||!Number.isFinite(e))return;const r=((u=t.parameters)==null?void 0:u.temperature)||{},n=Number(r.step)||Math.abs(i),s=Number(r.minimum),o=Number(r.maximum),c=e+Math.sign(i)*n,a=Math.min(Number.isFinite(o)?o:c,Math.max(Number.isFinite(s)?s:c,c));q(this,this.device,t,{temperature:a})}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};It.styles=[B,O`
    :host { position: relative; display: block; height: 100%; }
    .ai-badge {
      position: absolute;
      top: 8px; left: 8px;
      background: var(--glass-ai);
      color: white;
      font-size: 7px;
      padding: 1px 4px;
      border-radius: 3px;
      z-index: 2;
    }
    .card-content { display: flex; flex-direction: column; height: 100%; }
    .top-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: auto; }
    .icon-box {
      width: 40px; height: 40px; border-radius: 12px;
      background: rgba(255,255,255,0.05);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Outlined'; font-size: 22px;
    }
    .main-control { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
    .temp-display { display: flex; align-items: baseline; gap: 2px; }
    .temp-value { font-size: 28px; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: #fff; }
    .temp-unit { font-size: 12px; opacity: 0.3; }
    .btn-group { display: flex; gap: 6px; }
    .btn {
      width: 36px; height: 36px; border-radius: 10px;
      background: rgba(255,255,255,0.05);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Outlined'; font-size: 18px;
      cursor: pointer;
    }
    .bottom-info { margin-top: 8px; }
    .name { font-size: 13px; font-weight: 800; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .state { font-size: 10px; opacity: 0.4; font-weight: 600; }
  `];U([T({type:Object})],It.prototype,"device",2);U([T({type:Boolean})],It.prototype,"isAiControlled",2);It=U([z("climate-card")],It);let Dt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const i=this.device.attributes.current_position||0,t=i>0,e=bt(this.device.icon,"cover"),r=H(this.device,"set_position"),n=H(this.device,"open"),s=H(this.device,"stop"),o=H(this.device,"close");return g`
      <glass-card ?state="${t?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" style="color: ${t?"var(--glass-primary)":"inherit"}">${e}</div>
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${t?`打开 ${i}%`:"已关闭"}</div>
          </div>

          <div class="controls">
            ${r?g`<glass-slider
              style="--glass-card-min-height: 0px; margin: 2px 0;"
              .value="${i}"
              @change="${c=>q(this,this.device,r,{position:c.detail})}"
            ></glass-slider>`:""}
            <div class="icon-btn-row">
              ${n?g`<div class="icon-btn" @click="${()=>q(this,this.device,n)}">keyboard_arrow_up</div>`:""}
              ${s?g`<div class="icon-btn" @click="${()=>q(this,this.device,s)}">pause</div>`:""}
              ${o?g`<div class="icon-btn" @click="${()=>q(this,this.device,o)}">keyboard_arrow_down</div>`:""}
            </div>
          </div>
        </div>
      </glass-card>
    `}};Dt.styles=[B,O`
    :host { position: relative; display: block; height: 100%; }
    .ai-badge {
      position: absolute;
      top: 8px; left: 8px;
      background: var(--glass-ai);
      color: white;
      font-size: 7px;
      padding: 1px 4px;
      border-radius: 3px;
      z-index: 2;
    }
    .card-content { display: flex; flex-direction: column; height: 100%; }
    .top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto; }
    .icon-box {
      width: 40px; height: 40px; border-radius: 12px;
      background: rgba(255,255,255,0.05);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Outlined'; font-size: 22px;
    }
    .bottom-info { margin-top: 12px; }
    .name { font-size: 13px; font-weight: 800; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .state { font-size: 10px; opacity: 0.4; font-weight: 600; }
    .controls { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
    .icon-btn-row { display: flex; gap: 4px; }
    .icon-btn {
      font-family: 'Material Symbols Outlined';
      font-size: 16px;
      padding: 6px;
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex: 1;
    }
  `];U([T({type:Object})],Dt.prototype,"device",2);U([T({type:Boolean})],Dt.prototype,"isAiControlled",2);Dt=U([z("cover-card")],Dt);let Ht=class extends M{constructor(){super(...arguments),this.device={}}render(){let i=this.device.state;const t=this.device.attributes||{},e=t.unit_of_measurement||"",r=t.device_class||"",n=bt(this.device.icon,"sensor"),s=d=>!d||/[\u4e00-\u9fa5]/.test(d)?d:d.replace(/\bPerson Occupancy\b/gi,"人员占用").replace(/\bPerson Count\b/gi,"人数").replace(/\bOccupancy\b/gi,"占用").replace(/\bMotion\b/gi,"移动检测").replace(/\bCam\s+[A-Fa-f0-9]+\b/gi,"摄像头").replace(/\bCamera\b/gi,"摄像头").replace(/\bZone\s+[A-Fa-f0-9]+\b/gi,"区域").trim().replace(/\s+/g," ");if(typeof i=="string"&&i.includes("T")&&i.includes(":"))try{const d=new Date(i);isNaN(d.getTime())||(i=`${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")} ${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`)}catch{}const o=(d,h)=>{const p=d.toLowerCase();return p==="on"?h==="motion"||h==="occupancy"||h==="presence"?"有人":h==="door"||h==="window"||h==="opening"?"已打开":h==="moisture"?"漏水！":h==="smoke"?"烟雾！":h==="gas"?"燃气！":"开启":p==="off"?h==="motion"||h==="occupancy"||h==="presence"?"无人":h==="door"||h==="window"||h==="opening"?"已关闭":"正常":{playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",home:"在家",not_home:"离家",clear:"清空",detected:"检测到"}[p]||"后端未回流传感器状态"},c=s(this.device.name),a=o(i,r),l=r===""&&/^\d+$/.test(String(i)),u=a.length>5?"18px":a.length>2?"22px":"28px";return g`
      <glass-card>
        <div class="sensor-box">
          <div class="icon-box">${n}</div>
          <div class="bottom-info">
            <div class="name">${c}</div>
            <div class="value-display">
              <span class="value" style="font-size: ${l?"28px":u}">
                ${l?i:a}
              </span>
              ${l?g`<span class="unit">人</span>`:g`<span class="unit">${e}</span>`}
            </div>
          </div>
        </div>
      </glass-card>
    `}};Ht.styles=[B,O`
    :host { display: block; height: 100%; }
    .sensor-box {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .icon-box {
      width: 40px; height: 40px; border-radius: 12px;
      background: var(--t-input-bg, rgba(255,255,255,0.06));
      display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Outlined'; font-size: 22px;
      color: var(--glass-primary);
      margin-bottom: auto;
      transition: background 0.3s;
    }
    .bottom-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;
    }
    .value-display {
      display: flex;
      align-items: baseline;
      gap: 2px;
    }
    .value { font-size: 24px; font-weight: 600; font-family: 'HarmonyOS Sans SC', 'Inter', system-ui, sans-serif; color: var(--t-text, #F0F2F5); letter-spacing: -0.5px; }
    .unit { font-size: 12px; color: var(--t-text-hint, rgba(240,242,245,0.30)); font-weight: 600; }
    .name { font-size: 12px; font-weight: 800; color: var(--t-text-sec, rgba(240,242,245,0.55)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `];U([T({type:Object})],Ht.prototype,"device",2);Ht=U([z("sensor-card")],Ht);let Nt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const i=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",t=this.device.id.split(".")[0],e=bt(this.device.icon,t),r=H(this.device,i?"deactivate":"activate"),n=s=>{const o=s.toLowerCase();return{on:"已开启",off:"已关闭",playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",open:"已打开",closed:"已关闭"}[o]||"后端未回流设备状态"};return g`
      <glass-card ?state="${i?"on":"off"}" ?interactive="${!!r}" @click="${r?this._toggle:void 0}">
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="content">
          <div class="top-row">
            <div class="icon-box" style="color: ${i?"var(--glass-primary)":"inherit"}">
              ${e}
            </div>
            ${r?g`<glass-toggle .checked="${i}" @change="${this._toggle}"></glass-toggle>`:""}
          </div>
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${n(this.device.state)}</div>
          </div>
        </div>
      </glass-card>
    `}_toggle(i){i&&i.stopPropagation();const t=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",e=H(this.device,t?"deactivate":"activate");e&&q(this,this.device,e)}};Nt.styles=[B,O`
    :host { position: relative; display: block; height: 100%; }
    .ai-badge {
      position: absolute;
      top: 8px; left: 8px;
      background: var(--ai-purple, #B388FF);
      color: white;
      font-size: 7px;
      padding: 1px 4px;
      border-radius: 3px;
      z-index: 2;
    }
    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: auto;
    }
    .icon-box {
      width: 40px; height: 40px; border-radius: 12px;
      background: var(--t-input-bg, rgba(255,255,255,0.06));
      display: flex; align-items: center; justify-content: center;
      font-family: 'Material Symbols Outlined'; font-size: 24px;
      transition: background 0.3s;
    }
    .bottom-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 12px;
    }
    .name { font-size: 13px; font-weight: 800; color: var(--t-text, #F0F2F5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .state { font-size: 10px; color: var(--t-text-sec, rgba(240,242,245,0.55)); font-weight: 600; text-transform: uppercase; }
  `];U([T({type:Object})],Nt.prototype,"device",2);U([T({type:Boolean})],Nt.prototype,"isAiControlled",2);Nt=U([z("generic-device-card")],Nt);let mt=class extends M{constructor(){super(...arguments),this.scene={},this.isAiRecommended=!1,this.reason=""}render(){const i=bt(this.scene.icon,"scene");return g`
      <glass-card 
        interactive 
        style="--glass-card-min-height: 56px;"
        state="${this.isAiRecommended?"ai-active":"off"}"
        @click="${this._trigger}"
      >
        ${this.isAiRecommended?g`<div class="ai-badge">AI</div>`:""}
        <div class="scene-box">
          <span class="icon-main" style="color: ${this.isAiRecommended?"var(--glass-ai)":"var(--glass-on-surface)"}">${i}</span>
          <span class="scene-name">${this.scene.name}</span>
        </div>
      </glass-card>
    `}_trigger(){if(this.scene.gatewayTriggerPath){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"smart_agent",service:"trigger_ai_scene",data:{scene_id:this.scene.id,gateway_path:this.scene.gatewayTriggerPath}}}));return}this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"scene",service:"turn_on",data:{entity_id:this.scene.id}}}))}};mt.styles=[B,O`
    :host { display: block; position: relative; height: 100%; }
    .scene-box {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
    }
    .icon-main {
      font-family: 'Material Symbols Outlined';
      font-size: 24px;
      color: var(--t-text, #F0F2F5);
    }
    .scene-name {
      font-size: 12px;
      font-weight: 800;
      color: var(--t-text, #F0F2F5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .ai-badge {
      position: absolute;
      top: 4px; right: 4px;
      font-size: 7px;
      padding: 1px 4px;
      background: var(--ai-purple, #B388FF);
      border-radius: 3px;
      color: white;
      text-transform: uppercase;
      z-index: 2;
    }
  `];U([T({type:Object})],mt.prototype,"scene",2);U([T({type:Boolean})],mt.prototype,"isAiRecommended",2);U([T({type:String})],mt.prototype,"reason",2);mt=U([z("scene-card")],mt);var on=Object.defineProperty,an=Object.getOwnPropertyDescriptor,Yi=(i,t,e,r)=>{for(var n=r>1?void 0:r?an(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&on(t,e,n),n};let Wt=class extends M{constructor(){super(...arguments),this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""}}_statusLabel(i){const e=String(i||"").trim().toLowerCase();return{idle:"待命",thinking:"推理中",executing:"执行中",done:"已完成",error:"异常",unavailable:"不可用",unknown:"未知"}[e]||"后端未回流 AI 状态"}render(){const i=this._statusLabel(this.aiState.status);return g`
      <div class="header">
        <div class="status-indicator">
          <div class="dot ${i==="推理中"||i==="执行中"?"active":""}"></div>
          <span>AI 领航员</span>
        </div>
      </div>

      ${this.aiState.lastCorrection?g`
        <div class="correction-banner">
          <span class="material-symbols-outlined correction-icon">edit_note</span>
          <div class="correction-content">
            ${this.aiState.lastCorrection}
          </div>
        </div>
      `:""}

      <div class="log-container">
        ${this.aiState.actionHistory.length>0?this.aiState.actionHistory.map(e=>g`
              <div class="log-item">${e}</div>
            `):g`
              <div class="empty-state">
                <span class="material-symbols-outlined" aria-hidden="true" style="font-size: 40px;">psychology</span>
                <span>等待指令中...</span>
              </div>
            `}
      </div>

      <div class="footer">
        系统状态：${i}
      </div>
    `}};Wt.styles=[B,O`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 16px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 4px;
    }

    .correction-banner {
      background: rgba(255, 107, 107, 0.1);
      border: 1px solid rgba(255, 107, 107, 0.2);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .correction-icon {
      color: #ff6b6b;
      font-size: 18px;
    }

    .correction-content {
      flex: 1;
      font-size: 10px;
      color: #ff6b6b;
      font-weight: 600;
      line-height: 1.4;
    }

    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 14px;
      color: var(--glass-on-surface);
      letter-spacing: 0.5px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--t-track, rgba(255,255,255,0.2));
      transition: all 0.5s ease;
    }

    .dot.active {
      background: var(--glass-ai);
      box-shadow: 0 0 20px var(--glass-ai), 0 0 40px rgba(179, 136, 255, 0.4);
      animation: pulse 1.5s infinite ease-in-out;
      position: relative;
    }

    .dot.active::after {
      content: '';
      position: absolute;
      top: -4px; left: -4px; right: -4px; bottom: -4px;
      border-radius: 50%;
      border: 2px solid var(--glass-ai);
      animation: ripple 1.5s infinite ease-out;
      opacity: 0;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.2); filter: brightness(1.5); }
    }

    @keyframes ripple {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(2.5); opacity: 0; }
    }

    .log-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      padding-right: 4px;
      scrollbar-width: none;
    }

    .log-container::-webkit-scrollbar {
      display: none;
    }

    .log-item {
      padding: 14px;
      border-radius: 16px;
      background: var(--t-input-bg, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--t-card-border, rgba(255, 255, 255, 0.06));
      font-size: 10px;
      line-height: 1.5;
      color: var(--glass-on-surface-secondary);
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      word-break: break-all;
      overflow-wrap: break-word;
    }

    .log-item:first-child {
      background: linear-gradient(135deg, rgba(179, 136, 255, 0.1) 0%, rgba(130, 177, 255, 0.05) 100%);
      border: 1px solid rgba(179, 136, 255, 0.2);
      color: var(--glass-on-surface);
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .log-item:first-child::before {
      content: '最新';
      position: absolute;
      top: -6px; right: 12px;
      background: var(--glass-ai);
      color: white;
      font-size: 8px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 900;
      letter-spacing: 0.5px;
    }

    @keyframes slideIn {
      from { transform: translateX(-10px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      opacity: 0.3;
      font-style: italic;
      gap: 8px;
    }

    .footer {
      font-size: 11px;
      opacity: 0.4;
      text-align: center;
      letter-spacing: 1px;
    }
  `];Yi([T({type:Object})],Wt.prototype,"aiState",2);Wt=Yi([z("ai-status-panel")],Wt);var cn=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,Ot=(i,t,e,r)=>{for(var n=r>1?void 0:r?ln(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&cn(t,e,n),n};let it=class extends M{constructor(){super(...arguments),this.isRecording=!1,this.status="idle",this.text="点击开始语音指令",this.waveData=new Array(20).fill(0)}_stageMeta(){const i=String(this.status||"idle").toLowerCase();return this.isRecording||i==="stt"||i==="listening"?{stage:"listening",label:"聆听中",icon:"stop"}:i==="intent"||i==="processing"||i==="thinking"?{stage:"thinking",label:"理解中",icon:"sync"}:i==="tts"||i==="playing"||i==="done"||i==="speaking"?{stage:"speaking",label:"播报中",icon:"graphic_eq"}:i==="error"?{stage:"error",label:"异常",icon:"error"}:{stage:"idle",label:"待命",icon:"mic"}}render(){const i=this._stageMeta(),t=i.stage!=="idle";return g`
      <div
        class="bar-content voice-stage-${i.stage}"
        data-voice-stage="${i.stage}"
        aria-label="语音状态：${i.label}"
        @click="${this._handleClick}"
      >
        <div class="wave-container">
          ${this.isRecording?this.waveData.map(e=>g`
              <div class="wave-bar" style="height:${Math.max(4,e*40)}px"></div>
            `):g`
              <div class="wave-bar ${t?"static":""}" style="height:${t?"8px":"6px"}; animation-delay: 0s"></div>
              <div class="wave-bar ${t?"static":""}" style="height:${t?"18px":"10px"}; animation-delay: -0.2s"></div>
              <div class="wave-bar ${t?"static":""}" style="height:${t?"12px":"6px"}; animation-delay: -0.4s"></div>
              <div class="wave-bar ${t?"static":""}" style="height:${t?"24px":"12px"}; animation-delay: -0.1s"></div>
            `}
        </div>

        <span class="stage-pill">${i.label}</span>

        <span class="voice-text ${this.isRecording?"recording":""}">
          ${this.text}
        </span>

        <div class="mic-button ${this.isRecording?"recording":""} ${i.stage==="thinking"?"processing":""} ${i.stage==="speaking"?"speaking":""} ${i.stage==="error"?"error":""}">
          <span class="icon">${i.icon}</span>
        </div>
      </div>
    `}_handleClick(){this.dispatchEvent(new CustomEvent("toggle-voice",{bubbles:!0,composed:!0}))}};it.styles=[B,O`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }

    .bar-content {
      display: flex;
      align-items: center;
      gap: 20px;
      height: 100%;
      padding: 0 24px;
    }

    .wave-container {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 80px;
      height: 40px;
    }

    .wave-bar {
      width: 3px;
      background: var(--glass-info);
      border-radius: 3px;
      transition: height 0.1s ease-out;
    }

    .wave-bar.static {
      animation: wave 1s infinite alternate;
    }

    @keyframes wave {
      from { height: 8px; }
      to { height: 24px; }
    }

    .voice-text {
      font-size: 18px;
      font-weight: 500;
      color: var(--glass-on-surface);
      transition: opacity 0.3s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .voice-text.recording {
      color: var(--glass-info);
    }

    .stage-pill {
      flex-shrink: 0;
      min-width: 58px;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--glass-on-surface-secondary);
      font-size: 12px;
      font-weight: 800;
      text-align: center;
      line-height: 1;
      white-space: nowrap;
    }

    .bar-content.voice-stage-listening .stage-pill {
      color: var(--glass-info);
      background: rgba(122, 184, 255, 0.12);
      border-color: rgba(122, 184, 255, 0.28);
    }

    .bar-content.voice-stage-thinking .stage-pill,
    .bar-content.voice-stage-speaking .stage-pill {
      color: var(--glass-ai);
      background: rgba(179, 136, 255, 0.12);
      border-color: rgba(179, 136, 255, 0.26);
    }

    .bar-content.voice-stage-error .stage-pill {
      color: var(--glass-error);
      background: rgba(248, 81, 73, 0.12);
      border-color: rgba(248, 81, 73, 0.26);
    }

    .mic-button {
      margin-left: auto;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--glass-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px var(--glass-primary-glow);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mic-button.recording {
      background: var(--glass-error);
      box-shadow: 0 0 20px var(--glass-error-glow);
      transform: scale(1.1);
    }

    .mic-button.processing {
      background: var(--ai-purple);
      animation: pulse 1.5s infinite;
    }

    .mic-button.speaking {
      background: var(--ai-cyan);
      box-shadow: 0 0 16px rgba(0, 229, 255, 0.35);
    }

    .mic-button.error {
      background: var(--glass-error);
      box-shadow: 0 0 20px var(--glass-error-glow);
    }

    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(179, 136, 255, 0.4); }
      70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(179, 136, 255, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(179, 136, 255, 0); }
    }

    .icon {
      font-family: 'Material Symbols Outlined';
      color: white;
      font-size: 24px;
    }
  `];Ot([T({type:Boolean})],it.prototype,"isRecording",2);Ot([T({type:String})],it.prototype,"status",2);Ot([T({type:String})],it.prototype,"text",2);Ot([T({type:Array})],it.prototype,"waveData",2);it=Ot([z("voice-bar")],it);var dn=Object.defineProperty,un=Object.getOwnPropertyDescriptor,Qi=(i,t,e,r)=>{for(var n=r>1?void 0:r?un(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&dn(t,e,n),n};let Vt=class extends M{constructor(){super(...arguments),this._time=new Date}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=new Date},1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}render(){const i=this._time.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),t=this._time.toLocaleDateString("zh-CN",{month:"long",day:"numeric"}),e=this._time.toLocaleDateString("zh-CN",{weekday:"long"});return g`
      <div class="time">${i}</div>
      <div class="info-box">
        <div class="date">${t}</div>
        <div class="weekday">${e}</div>
      </div>
    `}};Vt.styles=[B,O`
    :host {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 12px 20px;
    }

    .time {
      font-size: 42px;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      color: var(--glass-on-surface);
      line-height: 1;
      letter-spacing: -1.5px;
    }

    .info-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .date {
      font-size: 13px;
      color: var(--glass-on-surface-secondary);
      font-weight: 700;
      opacity: 0.9;
      white-space: nowrap;
    }

    .weekday {
      display: inline-block;
      padding: 2px 10px;
      background: color-mix(in srgb, var(--ai-purple, #B388FF) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--ai-purple, #B388FF) 24%, transparent);
      border-radius: 8px;
      font-size: 10px;
      color: var(--ai-purple, #B388FF);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: fit-content;
    }
  `];Qi([I()],Vt.prototype,"_time",2);Vt=Qi([z("clock-widget")],Vt);var hn=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,te=(i,t,e,r)=>{for(var n=r>1?void 0:r?pn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&hn(t,e,n),n};let vt=class extends M{constructor(){super(...arguments),this.condition="晴",this.temperature=26,this.icon="wb_sunny"}render(){return g`
      <div class="icon">${this.icon}</div>
      <div class="info">
        <div class="temp">${this.temperature}°C</div>
        <div class="desc">${this.condition}</div>
      </div>
    `}};vt.styles=[B,O`
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 12px;
    }

    .icon {
      font-family: 'Material Symbols Outlined';
      font-size: 32px;
      color: #FFD54F;
      filter: drop-shadow(0 0 8px rgba(255, 213, 79, 0.4));
    }

    .info {
      display: flex;
      flex-direction: column;
    }

    .temp {
      font-size: 20px;
      font-weight: 700;
      color: var(--t-text, var(--glass-on-surface, #F0F2F5));
      line-height: 1;
    }

    .desc {
      font-size: 12px;
      color: var(--t-text-sec, var(--glass-on-surface-secondary, rgba(240,242,245,0.55)));
      margin-top: 2px;
    }
  `];te([T({type:String})],vt.prototype,"condition",2);te([T({type:Number})],vt.prototype,"temperature",2);te([T({type:String})],vt.prototype,"icon",2);vt=te([z("weather-widget")],vt);var gn=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,Xi=(i,t,e,r)=>{for(var n=r>1?void 0:r?fn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&gn(t,e,n),n};let Gt=class extends M{constructor(){super(...arguments),this.stats=[]}render(){if(!this.stats||this.stats.length===0)return g`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; opacity:0.3; gap:12px;">
          <span class="material-icon" data-icon="analytics" aria-hidden="true" style="font-size:40px;"></span>
          <span>暂无能耗数据</span>
        </div>
      `;const i=this.stats.slice(0,8),t=Math.max(...i.map(e=>e.on_minutes),1);return g`
      <div class="chart-container">
        ${i.map(e=>{const r=e.on_minutes/t*100,n=e.on_minutes>0?e.waste_minutes/e.on_minutes*100:0,s=e.entity_id.split(".").pop().replace(/_/g," ");return g`
            <div class="energy-row">
              <div class="row-header">
                <span class="device-name">${s}</span>
                <span class="time-val">${this._formatTime(e.on_minutes)} / 浪费 ${this._formatTime(e.waste_minutes)}</span>
              </div>
              <div class="progress-track">
                <div class="progress-on" style="width: ${r}%">
                  <div class="progress-waste" style="width: ${n}%"></div>
                </div>
              </div>
            </div>
          `})}
      </div>

      <div class="legend">
        <div class="legend-item">
          <div class="legend-dot" style="background: var(--glass-primary)"></div>
          <span>开启时长</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot" style="background: var(--glass-error)"></div>
          <span>空房浪费</span>
        </div>
      </div>
    `}_formatTime(i){if(!i)return"0分钟";const t=Math.floor(i/60),e=Math.floor(i%60);return t>0?`${t}小时${e}分钟`:`${e}分钟`}};Gt.styles=[B,O`
    :host {
      display: block;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chart-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .chart-container::-webkit-scrollbar { display: none; }

    .energy-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .row-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }

    .device-name {
      font-weight: 500;
      color: var(--glass-on-surface);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }

    .time-val {
      font-size: 11px;
      opacity: 0.6;
      font-family: 'JetBrains Mono', monospace;
    }

    .progress-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }

    .progress-on {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      background: var(--glass-primary);
      border-radius: 4px;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 10px var(--glass-primary-glow);
    }

    .progress-waste {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      background: var(--glass-error);
      opacity: 0.6;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .legend {
      display: flex;
      gap: 16px;
      font-size: 11px;
      opacity: 0.5;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .legend-item { display: flex; align-items: center; gap: 6px; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; }

    .material-icon {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
    }

    .material-icon::before {
      content: attr(data-icon);
    }
  `];Xi([T({type:Array})],Gt.prototype,"stats",2);Gt=Xi([z("energy-chart")],Gt);var mn=Object.defineProperty,vn=Object.getOwnPropertyDescriptor,Zi=(i,t,e,r)=>{for(var n=r>1?void 0:r?vn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&mn(t,e,n),n};let Jt=class extends M{constructor(){super(...arguments),this.events=[]}_labelText(i){const e=String(i||"").trim().toLowerCase();return{person:"人员",car:"车辆",dog:"宠物",cat:"宠物",package:"包裹",face:"人脸"}[e]||"未分类视觉目标"}render(){return!this.events||this.events.length===0?g`
        <div class="empty-state">
          <span class="material-icon" data-icon="videocam_off" aria-hidden="true" style="font-size: 32px;"></span>
          <span>近期无视觉检测事件</span>
        </div>
      `:g`
      <div class="events-container">
        ${this.events.map((i,t)=>{var e;return g`
          <div class="event-card">
            <div class="thumbnail">
              ${i.thumbnail?g`<img src="${i.thumbnail}" alt="视觉事件截图">`:g`<span class="material-icon" data-icon="person" aria-hidden="true" style="opacity: 0.3;"></span>`}
            </div>
            <div class="event-info">
              <div class="camera-name">
                ${t===0?g`<span class="live-dot"></span>`:""}
                ${i.camera}
              </div>
              <div class="event-detail">
                ${i.type==="end"?"离开":"检测到"} ${this._labelText(i.label)} ${(e=i.current_zones)!=null&&e.length?`区域 ${i.current_zones.join(", ")}`:""}
              </div>
              <div class="score-badge">${Math.round(i.score*100)}% 置信度</div>
            </div>
          </div>
        `})}
      </div>
    `}};Jt.styles=[B,O`
    :host {
      display: block;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .events-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .events-container::-webkit-scrollbar { display: none; }

    .event-card {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      padding: 10px;
      display: flex;
      gap: 12px;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .event-card:first-child {
      background: rgba(179, 136, 255, 0.08);
      border: 1px solid rgba(179, 136, 255, 0.2);
      padding: 14px;
    }

    .event-card:first-child::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--ai-purple), transparent);
      animation: scan 2s linear infinite;
    }

    @keyframes scan {
      0% { transform: translateY(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(80px); opacity: 0; }
    }

    .live-dot {
      width: 6px;
      height: 6px;
      background: #ff5252;
      border-radius: 50%;
      margin-right: 6px;
      display: inline-block;
      box-shadow: 0 0 10px #ff5252;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .event-card:hover {
      background: rgba(255, 255, 255, 0.06);
    }

    .thumbnail {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .event-info {
      flex: 1;
      min-width: 0;
    }

    .camera-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--glass-on-surface);
      margin-bottom: 2px;
    }

    .event-detail {
      font-size: 11px;
      opacity: 0.6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .score-badge {
      font-size: 10px;
      background: var(--glass-primary);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 4px;
      display: inline-block;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      opacity: 0.3;
      gap: 8px;
      font-size: 13px;
    }

    .material-icon {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
    }

    .material-icon::before {
      content: attr(data-icon);
    }
  `];Zi([T({type:Array})],Jt.prototype,"events",2);Jt=Zi([z("frigate-events-panel")],Jt);var bn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,ee=(i,t,e,r)=>{for(var n=r>1?void 0:r?_n(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&bn(t,e,n),n};let Kt=class extends M{constructor(){super(...arguments),this.device={}}render(){const i=this.device.attributes||{},t=Oe(this.device,"turn_on"),e=(t==null?void 0:t.parameters)||{},r=Number(this.device.brightness),n=i.color_temp_kelvin||(i.color_temp?Math.round(1e6/i.color_temp):null),s=e.color_temp_kelvin||{},o=Number(s.minimum),c=Number(s.maximum),a=Number(n),l=Math.min(100,Math.max(0,Math.round((a-o)/(c-o)*100))),u=i.supported_color_modes||[],d=!!(t&&e.brightness_pct&&Number.isFinite(r)),h=!!(t&&e.color_temp_kelvin&&u.includes("color_temp")&&Number.isFinite(a)&&Number.isFinite(o)&&Number.isFinite(c)&&c>o),p=!!(t&&e.rgb_color&&u.some(f=>["hs","rgb","xy","rgbw","rgbww"].includes(f))),m=[{name:"暖光",color:"#FFB347",k:2700},{name:"自然",color:"#FFE0B2",k:3500},{name:"阅读",color:"#FFF5DC",k:4e3},{name:"冷白",color:"#E8F4FD",k:5e3},{name:"日光",color:"#E3F2FD",k:6e3}].filter(f=>f.k>=o&&f.k<=c);return g`
      <div class="container">
        <!-- 亮度调节 -->
        ${d?g`<div class="section">
          <div class="value-display">
            <div class="label">亮度调节</div>
            <div class="value">${r}<span class="unit">%</span></div>
          </div>
          <glass-slider
            .value="${r}"
            @change="${f=>q(this,this.device,t,{brightness_pct:f.detail})}"
          ></glass-slider>
        </div>`:""}

        <!-- 色温调节（仅支持色温的灯显示） -->
        ${h?g`
          <div class="section">
            <div class="value-display">
              <div class="label">色温调节</div>
              <div class="value">${a}<span class="unit">K</span></div>
            </div>
            <glass-slider
              style="--glass-primary: #ffb347; --glass-primary-glow: rgba(255,179,71,0.3);"
              .value="${l}"
              @change="${f=>{const N=Math.round(o+f.detail/100*(c-o));q(this,this.device,t,{color_temp_kelvin:N})}}"
            ></glass-slider>
            <!-- 色温预设快捷按钮 -->
            ${m.length>0?g`
              <div class="color-presets">
                ${m.map(f=>g`
                  <div
                    class="color-dot ${a===f.k?"active":""}"
                    style="background: ${f.color}; color: ${f.color};"
                    title="${f.name} ${f.k}K"
                    @click="${()=>q(this,this.device,t,{color_temp_kelvin:f.k})}"
                  ></div>
                `)}
              </div>
            `:""}
          </div>
        `:""}

        <!-- RGB 颜色预设（仅支持彩色的灯显示） -->
        ${p?g`
          <div class="section">
            <div class="label">颜色预设</div>
            <div class="color-presets">
              ${[{color:"#FF8A80",rgb:[255,138,128]},{color:"#B388FF",rgb:[179,136,255]},{color:"#80D8FF",rgb:[128,216,255]},{color:"#CCFF90",rgb:[204,255,144]},{color:"#FFD180",rgb:[255,209,128]}].map(f=>g`
                <div
                  class="color-dot"
                  style="background: ${f.color}; color: ${f.color};"
                  @click="${()=>q(this,this.device,t,{rgb_color:f.rgb})}"
                ></div>
              `)}
            </div>
          </div>
        `:""}
      </div>
    `}};Kt.styles=[B,O`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      color: var(--t-text, #F0F2F5);
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 20px;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .label {
      font-size: 14px;
      font-weight: 700;
      color: var(--t-text-sec, rgba(240, 242, 245, 0.55));
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .value-display {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .value {
      font-size: 32px;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      color: var(--t-text, #F0F2F5);
    }

    .unit {
      font-size: 16px;
      color: var(--t-text-hint, rgba(240, 242, 245, 0.30));
      margin-left: 4px;
    }

    .color-presets {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }

    .color-dot {
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: pointer;
      border: 3px solid var(--t-card-border, rgba(255, 255, 255, 0.10));
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .color-dot:active {
      transform: scale(0.85);
    }

    .color-dot.active {
      border-color: var(--t-text, white);
      box-shadow: 0 0 20px currentColor;
    }
  `];ee([T({type:Object})],Kt.prototype,"device",2);Kt=ee([z("light-detail-panel")],Kt);let Yt=class extends M{constructor(){super(...arguments),this.device={}}render(){const i=this.device.state,t=H(this.device,"set_mode"),e=(t==null?void 0:t.modes)||[],r={cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭"},n={cool:"ac_unit",heat:"wb_sunny",dry:"water_drop",fan_only:"air",auto:"autorenew",off:"power_settings_new"};return g`
      <div class="container">
        <div class="section">
          <div class="label">运行模式</div>
          <div class="mode-grid">
            ${e.map(s=>g`
              <div class="mode-btn ${i===s?"active":""}" @click="${()=>t&&q(this,this.device,t,{hvac_mode:s})}">
                <span class="icon-main material-symbols-outlined">${n[s]||"tune"}</span>
                <span class="mode-name">${r[s]||s}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `}};Yt.styles=[B,O`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      color: white;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 20px;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .label {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .mode-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .mode-btn {
      padding: 16px 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .mode-btn .icon-main { font-size: 24px; opacity: 0.6; }
    .mode-btn .mode-name { font-size: 11px; font-weight: 700; opacity: 0.4; }

    .mode-btn.active {
      background: rgba(0, 229, 255, 0.1);
      border-color: var(--ai-cyan);
    }
    .mode-btn.active .icon-main { opacity: 1; color: var(--ai-cyan); }
    .mode-btn.active .mode-name { opacity: 1; color: var(--ai-cyan); }

    .fan-row {
      display: flex;
      gap: 12px;
    }

    .fan-btn {
      flex: 1;
      padding: 14px;
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      opacity: 0.6;
      cursor: pointer;
    }

    .fan-btn.active {
      background: var(--ai-purple);
      opacity: 1;
      box-shadow: 0 4px 12px rgba(179, 136, 255, 0.3);
    }
  `];ee([T({type:Object})],Yt.prototype,"device",2);Yt=ee([z("climate-detail-panel")],Yt);function yn(i){const t={};for(const e of i||[]){const r=j(e==null?void 0:e.id),n=j(e==null?void 0:e.name);r&&r!=="all"&&n&&(t[r]=n)}return t}function xn(i,t){const e=j(i==null?void 0:i.icon);if(e)return e;const r=j(t).split(":").pop()||"";return r==="all_off"?"light_off":r==="all_on"?"lightbulb":r==="bright"?"wb_sunny":r==="soft"?"brightness_5":r==="night"?"nightlight":r==="glow"?"bedtime":"auto_awesome"}function wn(i){if(i.startsWith("system_fixed_lighting:home:"))return"all";const t=i.match(/^system_fixed_lighting:room:([^:]+):/);return t!=null&&t[1]?zt(t[1]):""}function Sn(i,t,e){const r=wn(t);if(r)return r;const n=j(i==null?void 0:i.room,i==null?void 0:i.area,i==null?void 0:i.space,i==null?void 0:i.room_id,i==null?void 0:i.space_id);return n?zt(n):We(e)||"all"}const En=new Set(["1","true","yes","on"]),Cn=new Set(["local_space_model"]);function j(...i){for(const t of i){if(t==null)continue;const e=String(t).trim();if(e)return e}return""}function dt(i){return i===!0?!0:i===!1||i===null||i===void 0?!1:typeof i=="number"?i!==0:En.has(String(i).trim().toLowerCase())}function He(i){return j(i==null?void 0:i.entity_id,i==null?void 0:i.entityId,i==null?void 0:i.id)}function An(i){return!i||typeof i!="object"||!He(i)?!1:dt(i.managed)||dt(i.in_sa)||dt(i.in_smartagent)}function De(i){const t=[],e=new Set;for(const r of i||[]){if(!An(r))continue;const s=He(r).toLowerCase();e.has(s)||(t.push(r),e.add(s))}return t}function We(i){const e=String(i||"").trim().toLowerCase();if(!e)return"";const r=e.replace(/[\s_-]+/g,"");if(e==="all"||e.includes("全屋")||e.includes("全部")||e.includes("whole_home"))return"all";if(e.includes("厨房")||e.includes("kitchen"))return"kitchen";const n=e.includes("客厅")||e.includes("living"),s=e.includes("餐厅")||e.includes("dining");return n&&s?"living_dining":n?"living":s?"dining":e.includes("书房")||e.includes("study")?"study":e.includes("主卧")||e.includes("卧室")||e.includes("bedroom")||e.includes("master")||r.includes("zhuwo")||r.includes("woshi")||r.includes("primarybedroom")?"bedroom":e.includes("卫生间")||e.includes("卫浴")||e.includes("bathroom")?"bathroom":e.includes("阳台")||e.includes("balcony")?"balcony":e.includes("玄关")||e.includes("entry")?"entry":e.includes("走廊")||e.includes("hallway")||e.includes("corridor")?"hallway":""}function zt(i){const t=String(i||"").trim(),e=t.toLowerCase();if(!e)return"";const r=We(t);return r||e.replace(/\s+/g,"_")}function Ni(...i){const t=i.map(e=>j(e)).filter(Boolean);for(const e of t){const r=We(e);if(r)return r}return zt(t[0]||"")}function $n(i){const t=j(i==null?void 0:i.roomId),e=j(i==null?void 0:i.sourceId);if(e.startsWith("system_fixed_lighting:")){const r=e.split(":").pop()||"";return[t||"all","system_fixed_lighting",r].join("|")}return[t||"all",e||j(i==null?void 0:i.id,i==null?void 0:i.name)].join("|")}function kn(i,t=""){const e=`${j(i==null?void 0:i.name)} ${j(i==null?void 0:i.sourceId)}`.toLowerCase(),r=t.trim().toLowerCase();let n=0;r&&e.includes(r)&&(n+=100);const s=e.replace(/[\s_-]+/g,"");return(e.includes("主卧")||s.includes("zhuwo")||e.includes("master"))&&(n+=10),n}function Rn(i,t={}){const e=new Map;return i.forEach((r,n)=>{const s=$n(r);if(!s)return;const o=j(r==null?void 0:r.roomId),c=kn(r,t[o]||""),a=e.get(s);(!a||c>a.score)&&e.set(s,{scene:r,score:c,index:n})}),Array.from(e.values()).sort((r,n)=>r.index-n.index).map(r=>r.scene)}function Pn(i){return!i||typeof i!="object"?!1:dt(i.managed)||dt(i.in_sa)||dt(i.in_smartagent)?!0:j(i.source).split("+").map(e=>e.trim()).some(e=>Cn.has(e))}class lt{constructor(){this._devices=[],this._aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this._energyStats=[],this._frigateEvents=[],this._criticalFrigateEvent=null,this._rooms=[{id:"all",name:"全部"}],this._managedDevicesInfo=new Map,this._listeners=[],this._authorizationFailureListeners=[],setInterval(()=>this._refreshManagedDevicesInBackground(),3e4)}async refreshManagedDevices(){try{const[t,e]=await Promise.allSettled([this._fetchGatewayJson("/api/v1/devices"),this._fetchGatewayJson("/api/v1/rooms")]);if(t.status==="rejected"&&console.warn("[StateManager] Failed to fetch managed devices",t.reason),e.status==="rejected"&&console.warn("[StateManager] Failed to fetch rooms",e.reason),[t,e].some(o=>o.status==="rejected"&&this._isGatewayAuthorizationError(o.reason)))throw new Error("AUTH_REQUIRED");if([t,e].some(o=>o.status==="rejected"&&this._isGatewayScopeError(o.reason)))throw new Error("SCREEN_SCOPE_FORBIDDEN");if(t.status==="rejected"&&e.status==="rejected")return!1;const r=t.status==="fulfilled"?this._extractRows(t.value,"devices"):[],n=e.status==="fulfilled"?this._extractRows(e.value,"rooms"):[],s=De(r);if(r&&Array.isArray(r)){t.status==="fulfilled"&&(this._managedDevicesInfo=this._buildManagedDeviceInfo(s));const o=new Map;n.forEach(l=>{if(!Pn(l))return;const u=this._roomSummaryFromRow(l);u&&o.set(u.id,u)}),(t.status==="fulfilled"?s:Array.from(this._managedDevicesInfo.values())).forEach(l=>{const u=this._deviceRoom(l),d=this._deviceRoomId(l,u);u&&d&&o.set(d,{id:d,name:u})}),this._rooms=[{id:"all",name:"全部"},...Array.from(o.values())];let a=!1;s.some(l=>this._gatewayRowHasRuntimeState(l))?a=this._processGatewayDeviceRows(s):t.status==="fulfilled"&&s.length===0&&(this._devices=[],a=!0),a&&this._notifyListeners()}return!0}catch(t){if(this._isGatewayAuthorizationError(t))throw this._notifyAuthorizationRequired(),t;if(this._isGatewayScopeError(t))throw t;return console.warn("[StateManager] Failed to fetch managed devices",t),!1}}_isGatewayAuthorizationError(t){return t instanceof Error&&t.message==="AUTH_REQUIRED"}_isGatewayScopeError(t){return t instanceof Error&&t.message==="SCREEN_SCOPE_FORBIDDEN"}_notifyAuthorizationRequired(){for(const t of this._authorizationFailureListeners)t()}_refreshManagedDevicesInBackground(){this.refreshManagedDevices().catch(t=>{this._isGatewayAuthorizationError(t)||console.warn("[StateManager] Background device refresh failed",t)})}_gatewayHeaders(){const t=localStorage.getItem("screen_token")||"",e={Accept:"application/json"};return t&&(e.Authorization=`Bearer ${t}`),e}async _fetchGatewayJson(t){const e=await fetch(t,{headers:this._gatewayHeaders()});if(!e.ok)throw e.status===401?new Error("AUTH_REQUIRED"):e.status===403?new Error("SCREEN_SCOPE_FORBIDDEN"):new Error(`Gateway request failed: ${t} ${e.status}`);return e.json()}_extractRows(t,e){if(Array.isArray(t))return t;for(const r of[e,"items","data","rows","result"]){const n=t==null?void 0:t[r];if(Array.isArray(n))return n}return[]}_buildManagedDeviceInfo(t){const e=new Map;for(const r of De(t)){const n=this._deviceEntityId(r);if(!n)continue;const s=this._deviceRoom(r);e.set(n.toLowerCase(),{name:this._deviceName(r,n),room:s,roomId:this._deviceRoomId(r,s),actionDescriptors:Array.isArray(r==null?void 0:r.action_descriptors)?r.action_descriptors.filter(o=>o&&typeof o=="object"):[]})}return e}_processGatewayDeviceRows(t){const e=[];for(const r of De(t)){const n=this._deviceEntityId(r);if(!n)continue;const s=r!=null&&r.attributes&&typeof r.attributes=="object"?r.attributes:{},o=this._firstString(r==null?void 0:r.domain,n.split(".")[0],r==null?void 0:r.type),c=this._deviceRoom(r),a=this._deviceRoomId(r,c),l=this._firstString(r==null?void 0:r.state,s.state,"unknown");e.push({id:n,type:this._mapDomainToType(o),name:this._deviceName(r,n),room:c,roomId:a,state:l,brightness:this._deviceBrightness(r,s),temperature:(r==null?void 0:r.temperature)||s.temperature||s.current_temperature,humidity:(r==null?void 0:r.humidity)||s.humidity,icon:this._firstString(r==null?void 0:r.icon,s.icon),attributes:s,actionDescriptors:Array.isArray(r==null?void 0:r.action_descriptors)?r.action_descriptors.filter(u=>u&&typeof u=="object"&&u.available===!0):[]})}return e.length===0?!1:(this._devices=e,!0)}_gatewayRowHasRuntimeState(t){var e;return!!this._firstString(t==null?void 0:t.state,(e=t==null?void 0:t.attributes)==null?void 0:e.state)}_deviceBrightness(t,e){const r=(t==null?void 0:t.brightness_pct)??(t==null?void 0:t.brightness)??(e==null?void 0:e.brightness_pct)??(e==null?void 0:e.brightness);if(r==null||r==="")return;const n=Number(r);if(Number.isFinite(n))return n>100?Math.round(n/255*100):Math.round(n)}_deviceEntityId(t){return He(t)}_deviceName(t,e){var r;return this._firstString(t==null?void 0:t.name,t==null?void 0:t.friendly_name,t==null?void 0:t.alias,(r=t==null?void 0:t.attributes)==null?void 0:r.friendly_name,e)}_deviceRoom(t){var e,r;return this._firstString(t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.space_id,t==null?void 0:t.room_id,t==null?void 0:t.area_id,(e=t==null?void 0:t.attributes)==null?void 0:e.room,(r=t==null?void 0:t.attributes)==null?void 0:r.area)}_deviceRoomId(t,e=""){var r,n,s;return Ni(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id,(r=t==null?void 0:t.attributes)==null?void 0:r.room_id,(n=t==null?void 0:t.attributes)==null?void 0:n.space_id,(s=t==null?void 0:t.attributes)==null?void 0:s.area_id)}_roomSummaryFromRow(t){const e=this._firstString(t==null?void 0:t.name,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id),r=Ni(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id);return!r||r==="all"?null:{id:r,name:e||r}}_firstString(...t){for(const e of t){if(e==null)continue;const r=String(e).trim();if(r)return r}return""}static getInstance(){return lt.instance||(lt.instance=new lt),lt.instance}subscribe(t){this._listeners.push(t),this._refreshManagedDevicesInBackground(),(this._devices.length>0||this._aiState.lastAction)&&t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent)}subscribeAuthorizationRequired(t){return this._authorizationFailureListeners.push(t),()=>{this._authorizationFailureListeners=this._authorizationFailureListeners.filter(e=>e!==t)}}processSnapshotFrigateEvents(t){const e=t["sensor.smart_agent_status"];e&&(e.attributes.frigate_events&&(this._frigateEvents=e.attributes.frigate_events),this._criticalFrigateEvent=e.attributes.critical_frigate_event||null)}processSnapshotEnergyStats(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.energy_stats){const r=e.attributes.energy_stats;Array.isArray(r)?this._energyStats=[...r]:typeof r=="object"&&(this._energyStats=Object.values(r))}}processSnapshotAIState(t){const e=t["sensor.smart_agent_status"],r=t["text.smart_agent_last_action"];if(e){this._aiState.status=e.state;const n=e.attributes.action_history;Array.isArray(n)&&(this._aiState.actionHistory=[...n]),this._aiState.lastCorrection=e.attributes.last_correction||"",this._aiState.recentAiActions=e.attributes.recent_ai_actions||[],this._aiState.voiceStatus=e.attributes.voice_status||"idle",this._aiState.voiceReply=e.attributes.voice_reply||"",this._aiState.lastStt=e.attributes.last_stt||""}r&&r.state!==this._aiState.lastAction&&(this._aiState.lastAction=r.state,r.state&&r.state!=="unknown"&&(this._aiState.actionHistory=[r.state,...this._aiState.actionHistory.filter(n=>n!==r.state)].slice(0,5)))}processLegacySnapshot(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.device_count!==void 0){const n=this._last_count||0;e.attributes.device_count!==n&&(this._last_count=e.attributes.device_count,this._refreshManagedDevicesInBackground())}const r=[];for(const[n,s]of Object.entries(t)){const o=this._managedDevicesInfo.get(n.toLowerCase());if(!o)continue;const c=n.split(".")[0],a=o.room||this._guessRoom(n,s),l=o.roomId||this._mapRoomToId(a);r.push({id:n,type:this._mapDomainToType(c),name:o.name||s.attributes.friendly_name||n,room:a,roomId:l,state:s.state,brightness:s.attributes.brightness?Math.round(s.attributes.brightness/255*100):void 0,temperature:s.attributes.temperature||s.attributes.current_temperature,humidity:s.attributes.humidity,icon:s.attributes.icon,attributes:s.attributes,actionDescriptors:o.actionDescriptors.filter(u=>u.available===!0)})}this._devices=r}_mapRoomToId(t){return zt(t)}_mapDomainToType(t){return t==="binary_sensor"?"sensor":t}_guessRoom(t,e){const r=(e.attributes.friendly_name||"").toLowerCase(),n=t.toLowerCase();return r.includes("客厅")||n.includes("living")?"客厅":r.includes("厨房")||n.includes("kitchen")?"厨房":r.includes("书房")||n.includes("study")?"书房":r.includes("卧室")||n.includes("bedroom")?"卧室":"未分类"}_notifyListeners(){this._listeners.forEach(t=>t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent))}getDevices(){return this._devices}}const wt=lt.getInstance(),Mi=1024,Oi=2048,At=16e3,Tn=12e3,In=`
class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = (options && options.processorOptions) || {};
    this._chunkSize = opts.chunkSize || 1024;
    this._waveBins = opts.waveBins || 20;
    this._buffer = new Float32Array(this._chunkSize);
    this._cursor = 0;
  }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;
    for (let i = 0; i < channel.length; i++) {
      this._buffer[this._cursor++] = channel[i];
      if (this._cursor >= this._chunkSize) {
        this._flush();
      }
    }
    return true;
  }
  _flush() {
    const frame = this._buffer;
    let sumSq = 0;
    for (let i = 0; i < frame.length; i++) sumSq += frame[i] * frame[i];
    const rms = Math.sqrt(sumSq / frame.length);
    const wave = new Array(this._waveBins);
    const step = Math.floor(frame.length / this._waveBins) || 1;
    for (let i = 0; i < this._waveBins; i++) {
      wave[i] = Math.abs(frame[i * step] || 0);
    }
    const pcm = new Int16Array(frame.length);
    for (let i = 0; i < frame.length; i++) {
      const s = Math.max(-1, Math.min(1, frame[i]));
      pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    this.port.postMessage(
      { type: "frame", rms: rms, wave: wave, pcm16: pcm.buffer },
      [pcm.buffer],
    );
    this._buffer = new Float32Array(this._chunkSize);
    this._cursor = 0;
  }
}
registerProcessor("pcm-capture-processor", PcmCaptureProcessor);
`,Dn=`
class VadEnergyProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = (options && options.processorOptions) || {};
    this._chunkSize = opts.chunkSize || 2048;
    this._buffer = new Float32Array(this._chunkSize);
    this._cursor = 0;
  }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;
    for (let i = 0; i < channel.length; i++) {
      this._buffer[this._cursor++] = channel[i];
      if (this._cursor >= this._chunkSize) {
        let sumSq = 0;
        for (let j = 0; j < this._buffer.length; j++) sumSq += this._buffer[j] * this._buffer[j];
        const rms = Math.sqrt(sumSq / this._buffer.length);
        this.port.postMessage({ type: "energy", rms: rms });
        this._buffer = new Float32Array(this._chunkSize);
        this._cursor = 0;
      }
    }
    return true;
  }
}
registerProcessor("vad-energy-processor", VadEnergyProcessor);
`;let Ne=null,Me=null;function tr(i,t){if(t==="pcm"&&Ne)return Ne;if(t==="vad"&&Me)return Me;const e=new Blob([i],{type:"application/javascript"}),r=URL.createObjectURL(e);return t==="pcm"?Ne=r:Me=r,r}class Nn{constructor(t={},e={}){this._audioCtx=null,this._mediaStream=null,this._inputNode=null,this._workletNode=null,this._legacyProcessor=null,this._isRunning=!1,this._audioElem=null,this._audioElemHandlers={},this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._stage="idle",this.VAD_SILENCE_THRESHOLD=.015,this.VAD_SILENCE_FRAMES=35,this._sessionId=null,this._sessionWs=null,this._eventsWs=null,this._closingByClient=!1,this._intentTimeoutTimer=null,this._onSessionWsError=()=>{var r,n;this._closingByClient||((n=(r=this._cb).onError)==null||n.call(r,"Gateway 语音通道异常中断"),this._emit("error","Gateway 语音通道异常中断"),this._cleanup())},this._onEventsWsError=()=>{var r,n;this._closingByClient||((n=(r=this._cb).onError)==null||n.call(r,"Gateway 语音事件通道异常中断"),this._emit("error","Gateway 语音事件通道异常中断"),this._cleanup())},this._onGatewaySocketClosed=()=>{var r,n;!this._closingByClient&&this._isRunning&&((n=(r=this._cb).onError)==null||n.call(r,"语音会话已断开"),this._emit("error","语音会话已断开"),this._cleanup())},this._onEventsSocketMessage=r=>{var o,c,a,l,u,d;if(r.data instanceof ArrayBuffer||r.data instanceof Blob)return;let n;try{n=typeof r.data=="string"?JSON.parse(r.data):r.data}catch{return}const s=this._mapIncomingVoiceEvent(n);if(s){if(s.type==="stt_result"){const h=s.text||"";h&&((c=(o=this._cb).onSttResult)==null||c.call(o,h));return}if(s.type==="intent_result"){const h=s.reply||"";h&&((l=(a=this._cb).onReply)==null||l.call(a,h)),this._clearIntentTimeout(),this._emit("tts");return}if(s.type==="tts_url"){const h=s.url||"";if(h){const p=this._resolveMediaUrl(h);this._playTts(p)}this._clearIntentTimeout(),this._emit("playing");return}if(s.type==="done"){if(this._clearIntentTimeout(),this._audioElem)return;this._emit("idle"),this._cleanup();return}if(s.type==="error"){const h=s.message||"语音管道错误";(d=(u=this._cb).onError)==null||d.call(u,h),this._emit("error",h),this._cleanup()}}},this._options=t,this._cb=e,this._enableLegacyVoiceEventCompat=t.enableLegacyVoiceEventCompat===!0,this._intentTimeoutMs=t.intentTimeoutMs??Tn}get isRunning(){return this._isRunning}async start(){var t,e;if(!this._isRunning){this._isRunning=!0,this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._closingByClient=!1,this._emit("starting");try{const r=this._resolveGatewayBaseUrl(),n=this._resolveScreenToken();if(!n)throw new Error("未检测到 Gateway 会话令牌，请先登录 Gateway");const s=await this._createVoiceSession(r,n);if(this._sessionId=s.session_id||s.sessionId||null,!this._sessionId&&!s.ws_url&&!s.wsUrl)throw new Error("Gateway 未返回 voice session 标识");await this._openGatewaySockets(r,s),this._mediaStream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:At,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._emit("stt"),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:At}),this._inputNode=this._audioCtx.createMediaStreamSource(this._mediaStream),await this._tryAttachWorklet(this._audioCtx,this._inputNode)||this._attachLegacyProcessor(this._audioCtx,this._inputNode)}catch(r){const n=this._normalizeError(r);(e=(t=this._cb).onError)==null||e.call(t,n),this._emit("error",n),this._cleanup()}}}stop(){if(this._isRunning){if(this._stage!=="stt"){this._emit("idle"),this._cleanup();return}this._stopRecording()}}async _tryAttachWorklet(t,e){if(!t.audioWorklet)return!1;try{const r=tr(In,"pcm");await t.audioWorklet.addModule(r);const n=new AudioWorkletNode(t,"pcm-capture-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:Mi,waveBins:20}});return n.port.onmessage=s=>this._onAudioFrame(s.data),e.connect(n),this._workletNode=n,!0}catch(r){return console.warn("[VoicePipeline] AudioWorklet 不可用，回退 ScriptProcessor:",r),!1}}_attachLegacyProcessor(t,e){const r=t.createScriptProcessor(Mi,1,1);r.onaudioprocess=n=>{if(!this._isRunning)return;const s=n.inputBuffer.getChannelData(0);let o=0;for(let d=0;d<s.length;d++)o+=s[d]*s[d];const c=Math.sqrt(o/s.length),a=[],l=Math.floor(s.length/20)||1;for(let d=0;d<20;d++)a.push(Math.abs(s[d*l]||0));const u=new Int16Array(s.length);for(let d=0;d<s.length;d++){const h=Math.max(-1,Math.min(1,s[d]));u[d]=h<0?h*32768:h*32767}this._onAudioFrame({type:"frame",rms:c,wave:a,pcm16:u.buffer})},e.connect(r),r.connect(t.destination),this._legacyProcessor=r}_onAudioFrame(t){var e;if(this._isRunning&&(t==null?void 0:t.type)==="frame"){if(this._cb.onWaveData&&Array.isArray(t.wave)&&this._cb.onWaveData(t.wave),t.rms>=this.VAD_SILENCE_THRESHOLD)this._hasSpeechStarted=!0,this._vadSilenceCount=0;else if(this._hasSpeechStarted){if(this._vadSilenceCount++,this._vadSilenceCount>this.VAD_SILENCE_FRAMES){this._stopRecording();return}}else return;if(((e=this._sessionWs)==null?void 0:e.readyState)===WebSocket.OPEN&&t.pcm16)try{this._sessionWs.send(t.pcm16)}catch{}}}_stopRecording(){var t;if(this._isRunning){if(this._teardownAudioGraph(),((t=this._sessionWs)==null?void 0:t.readyState)===WebSocket.OPEN){try{this._sessionWs.send(JSON.stringify({type:"input_audio_buffer.commit"}))}catch{}try{this._sessionWs.send(new ArrayBuffer(0))}catch{}}this._emit("intent"),this._armIntentTimeout()}}_armIntentTimeout(){this._clearIntentTimeout(),this._intentTimeoutMs>0&&(this._intentTimeoutTimer=setTimeout(()=>{var e,r;if(!this._isRunning)return;const t="AI 响应超时";(r=(e=this._cb).onError)==null||r.call(e,t),this._emit("error",t),this._cleanup()},this._intentTimeoutMs))}_clearIntentTimeout(){this._intentTimeoutTimer!==null&&(clearTimeout(this._intentTimeoutTimer),this._intentTimeoutTimer=null)}_teardownAudioGraph(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._inputNode){try{this._inputNode.disconnect()}catch{}this._inputNode=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._mediaStream&&(this._mediaStream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._mediaStream=null)}_resolveGatewayBaseUrl(){var e;const t=(e=this._options.gatewayBaseUrl)==null?void 0:e.trim();return t?t.replace(/\/$/,""):window.location.origin}_resolveScreenToken(){var t;return((t=this._options.screenToken)==null?void 0:t.trim())||localStorage.getItem("screen_token")||""}_buildAuthHeaders(t){return{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}async _createVoiceSession(t,e){const r=await fetch(`${t}/api/v1/voice/session`,{method:"POST",headers:this._buildAuthHeaders(e),body:JSON.stringify({sample_rate:At,audio_format:"pcm16"})});let n={};try{n=await r.json()}catch{}if(!r.ok){const s=(n==null?void 0:n.error)||r.statusText;throw new Error(`Gateway 语音会话创建失败 (${r.status}): ${s||"unknown error"}`)}return n}async _openGatewaySockets(t,e){const r=this._toWsBase(t),n=e.ws_url||e.wsUrl||`${r}/api/v1/voice/session?session_id=${encodeURIComponent(this._sessionId||"")}`,s=e.events_ws_url||e.eventsWsUrl||`${r}/api/v1/events?topic=voice&session_id=${encodeURIComponent(this._sessionId||"")}`;this._sessionWs=new WebSocket(n),this._eventsWs=new WebSocket(s),this._sessionWs.binaryType="arraybuffer",await Promise.all([this._waitSocketOpen(this._sessionWs,"voice session"),this._waitSocketOpen(this._eventsWs,"voice events")]),this._sessionWs.addEventListener("close",this._onGatewaySocketClosed),this._sessionWs.addEventListener("error",this._onSessionWsError),this._eventsWs.addEventListener("message",this._onEventsSocketMessage),this._eventsWs.addEventListener("close",this._onGatewaySocketClosed),this._eventsWs.addEventListener("error",this._onEventsWsError)}_mapIncomingVoiceEvent(t){var r,n,s,o,c,a,l,u,d,h,p,m;const e=String((t==null?void 0:t.type)||(t==null?void 0:t.event)||(t==null?void 0:t.name)||"").trim();return e==="stt_result"?{type:"stt_result",text:(t==null?void 0:t.text)||((r=t==null?void 0:t.result)==null?void 0:r.text)||((s=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:s.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||""}:e==="intent_result"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((c=t==null?void 0:t.result)==null?void 0:c.reply)||((h=(d=(u=(l=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:l.response)==null?void 0:u.speech)==null?void 0:d.plain)==null?void 0:h.speech)||""}:e==="tts_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((m=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:m.url)||""}:e==="done"?{type:"done"}:e==="error"?{type:"error",message:(t==null?void 0:t.message)||(t==null?void 0:t.error)||"语音管道错误"}:this._mapLegacyVoiceEvent(t,e)}_mapLegacyVoiceEvent(t,e){var r,n,s,o,c,a,l,u,d,h,p,m;return this._enableLegacyVoiceEventCompat?e==="stt-end"||e==="transcript_final"?{type:"stt_result",text:(t==null?void 0:t.text)||((r=t==null?void 0:t.result)==null?void 0:r.text)||((s=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:s.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||"",legacy_type:e}:e==="intent-end"||e==="reply"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((c=t==null?void 0:t.result)==null?void 0:c.reply)||((h=(d=(u=(l=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:l.response)==null?void 0:u.speech)==null?void 0:d.plain)==null?void 0:h.speech)||"",legacy_type:e}:e==="tts-end"||e==="audio_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((m=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:m.url)||"",legacy_type:e}:e==="pipeline_end"||e==="session_end"?{type:"done",legacy_type:e}:null:null}_resolveMediaUrl(t){if(/^https?:\/\//i.test(t))return t;const e=this._resolveGatewayBaseUrl();return t.startsWith("/")?`${e}${t}`:`${e}/${t}`}_playTts(t){this._releaseAudioElem();const e=new Audio(t),r=()=>{this._emit("idle"),this._cleanup()},n=()=>{this._emit("idle"),this._cleanup()};e.addEventListener("ended",r),e.addEventListener("error",n),this._audioElem=e,this._audioElemHandlers={ended:r,error:n},e.play().catch(()=>{this._emit("idle"),this._cleanup()})}_releaseAudioElem(){const t=this._audioElem;if(t){try{t.pause()}catch{}this._audioElemHandlers.ended&&t.removeEventListener("ended",this._audioElemHandlers.ended),this._audioElemHandlers.error&&t.removeEventListener("error",this._audioElemHandlers.error);try{t.src="",t.load()}catch{}this._audioElem=null,this._audioElemHandlers={}}}_emit(t,e){var r,n;this._stage=t,(n=(r=this._cb).onStageChange)==null||n.call(r,t,e)}_cleanup(){var t,e,r,n,s;if(this._isRunning=!1,this._closingByClient=!0,this._stage="idle",this._hasSpeechStarted=!1,this._clearIntentTimeout(),(t=this._eventsWs)==null||t.removeEventListener("message",this._onEventsSocketMessage),(e=this._sessionWs)==null||e.removeEventListener("close",this._onGatewaySocketClosed),(r=this._eventsWs)==null||r.removeEventListener("close",this._onGatewaySocketClosed),(n=this._sessionWs)==null||n.removeEventListener("error",this._onSessionWsError),(s=this._eventsWs)==null||s.removeEventListener("error",this._onEventsWsError),this._sessionWs&&this._sessionWs.readyState===WebSocket.OPEN)try{this._sessionWs.close(1e3,"client_cleanup")}catch{}if(this._eventsWs&&this._eventsWs.readyState===WebSocket.OPEN)try{this._eventsWs.close(1e3,"client_cleanup")}catch{}this._sessionWs=null,this._eventsWs=null,this._sessionId=null,this._teardownAudioGraph(),this._releaseAudioElem()}_toWsBase(t){return t.startsWith("https://")?`wss://${t.slice(8)}`:t.startsWith("http://")?`ws://${t.slice(7)}`:t}_waitSocketOpen(t,e){return new Promise((r,n)=>{const s=()=>{a(),r()},o=()=>{a(),n(new Error(`${e} 连接失败`))},c=()=>{a(),n(new Error(`${e} 已关闭`))},a=()=>{t.removeEventListener("open",s),t.removeEventListener("error",o),t.removeEventListener("close",c)};t.addEventListener("open",s),t.addEventListener("error",o),t.addEventListener("close",c)})}_normalizeError(t){const e=(t==null?void 0:t.name)||"",r=(t==null?void 0:t.message)||String(t||"未知错误");return e==="NotAllowedError"||/permission/i.test(r)?"请允许浏览器使用麦克风":e==="NotFoundError"?"未检测到可用麦克风设备":e==="NotReadableError"?"麦克风被其他应用占用":`语音链路错误: ${r}`}}class Mn{constructor(t){this._state="stopped",this._audioCtx=null,this._stream=null,this._source=null,this._workletNode=null,this._legacyProcessor=null,this._activationFrames=0,this.ACTIVATION_THRESHOLD=7,this.ENERGY_THRESHOLD=.02,this._cooldownTimer=null,this.COOLDOWN_MS=8e3,this._onActivated=t}get isListening(){return this._state==="listening"}async start(){if(this._state!=="stopped")return this._state==="listening";try{return this._stream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:At,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:At}),this._source=this._audioCtx.createMediaStreamSource(this._stream),await this._tryAttachWorklet(this._audioCtx,this._source)||this._attachLegacyProcessor(this._audioCtx,this._source),this._state="listening",!0}catch(t){return console.warn("[AlwaysOnVAD] 麦克风访问失败，免唤醒模式不可用:",(t==null?void 0:t.message)||t),this._teardown(),this._state="stopped",!1}}pause(){this._state==="listening"&&(this._state="paused")}resume(){this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._state==="paused"&&(this._cooldownTimer=setTimeout(()=>{if(this._cooldownTimer=null,this._state==="paused"){if(!this._stream){this._state="stopped",this.start();return}this._state="listening",this._activationFrames=0}},this.COOLDOWN_MS))}stop(){this._state="stopped",this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._teardown()}async _tryAttachWorklet(t,e){if(!t.audioWorklet)return!1;try{const r=tr(Dn,"vad");await t.audioWorklet.addModule(r);const n=new AudioWorkletNode(t,"vad-energy-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:Oi}});return n.port.onmessage=s=>{const o=s.data;!o||o.type!=="energy"||this._handleEnergy(o.rms||0)},e.connect(n),this._workletNode=n,!0}catch(r){return console.warn("[AlwaysOnVAD] AudioWorklet 不可用，回退 ScriptProcessor:",r),!1}}_attachLegacyProcessor(t,e){const r=t.createScriptProcessor(Oi,1,1);r.onaudioprocess=n=>{if(this._state!=="listening")return;const s=n.inputBuffer.getChannelData(0);let o=0;for(let a=0;a<s.length;a++)o+=s[a]*s[a];const c=Math.sqrt(o/s.length);this._handleEnergy(c)},e.connect(r),r.connect(t.destination),this._legacyProcessor=r}_handleEnergy(t){this._state==="listening"&&(t>this.ENERGY_THRESHOLD?(this._activationFrames++,this._activationFrames>=this.ACTIVATION_THRESHOLD&&(this._activationFrames=0,this._state="paused",this._teardown(),this._onActivated())):this._activationFrames=0)}_teardown(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._source){try{this._source.disconnect()}catch{}this._source=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._stream&&(this._stream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._stream=null)}}const On="smartagent.user_explicit_control_confirmation.v0.1",zn="0.1",ze=/^uecc_[0-9a-f]{32}$/,Bn=/^[0-9a-f]{64}$/;function ut(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:null}function Fn(i){if(!i)return!1;const t=Date.parse(i);return Number.isFinite(t)}function Ln(i){return`/api/v1/devices/control-confirmations/${encodeURIComponent(i)}/confirm`}function Un(i,t){const e=Ln(t);return i===e}function zi(...i){for(const t of i){const e=String(t||"").trim();if(e)return e}return""}function St(i){const t=String(i||"").trim().toLowerCase();return Bn.test(t)?t:null}function jn(i){return`/api/v1/devices/${encodeURIComponent(i)}/control`}function qn(i,t){const e=ut(i.data)??{},r={};for(const[n,s]of Object.entries(e))n!=="entity_id"&&(r[n]=s);return{request_id:t,service:String(i.service||"").trim(),params:r}}function Bi(i){const t=ut(i);if(!t||t.error!=="confirmation_required")return null;const e=ut(t.confirmation);if(!e)return null;const r=String(e.confirm_path||"").trim(),n=String(e.claim_id||"").trim();if(!r||!n||!ze.test(n)||!Un(r,n))return null;const s=String(e.schema_version||"").trim();if(s!==On||e.required!==!0)return null;const c=St(e.binding_digest);if(!c)return null;const a=String(e.expires_at||"").trim();if(!Fn(a))return null;const l=String(e.risk_level||"").trim().toLowerCase();return l?{schemaVersion:s,claimId:n,bindingDigest:c,confirmPath:r,expiresAt:a,riskLevel:l,required:!0}:null}function Hn(i,t,e,r){const n=ut(i),s=ut(n==null?void 0:n.manual_control_receipt),o=String((s==null?void 0:s.request_id)||"").trim();if(!n||!s||!t||o!==t||String(s.receipt_version||"").trim()!==zn||s.retry_allowed!==!1||s.execution_class!=="user_explicit_control"||s.active_ai_governed!==!1)return null;const c=String(s.transaction_id||"").trim(),a=String(s.claim_id||"").trim();if(!ze.test(c)||a!==c)return null;const l=St(s.binding_digest),u=St(s.execution_pair_digest),d=St(s.receipt_digest);if(!l||!u||!d||u!==d)return null;const h=String(n.transaction_id||"").trim();if(h&&h!==c)return null;if(e!==void 0){const _=St(e);if(!_||_!==l)return null}if(r!==void 0){const _=String(r||"").trim();if(!ze.test(_)||_!==h||_!==c||_!==a)return null}const p=String(s.effect_status||"").trim().toLowerCase(),m=String(s.workflow_status||"").trim().toLowerCase();let f="";if(p==="verified_success"&&m==="completed"?f="verified_success":(p==="effect_unknown"&&m==="reconciliation_required"||p==="pending"&&n.effect_status==="effect_unknown"&&n.workflow_status==="reconciliation_required"&&n.retryable===!1)&&(f="effect_unknown"),!f||f==="verified_success"&&h!==c)return null;const N=ut(n.state_confirmation);return{transactionId:c,claimId:a,bindingDigest:l,executionPairDigest:u,receiptDigest:d,requestId:o,effectStatus:f,reason:zi(s.reason,s.reason_code,n.reason,n.error,n.error_type,N==null?void 0:N.reason),stage:zi(s.stage,n.stage,m,n.workflow_status)}}function Wn(i){return i?g`
    <div class="action-notice ${i.tone}" role="status" aria-live="polite">
      <div>${i.text}</div>
      ${i.receipt?g`
        <details class="receipt-engineering">
          <summary>工程视图</summary>
          <dl>
            <dt>transaction_id</dt>
            <dd>${i.receipt.transactionId}</dd>
            <dt>request_id</dt>
            <dd>${i.receipt.requestId}</dd>
            <dt>effect_status</dt>
            <dd>${i.receipt.effectStatus}</dd>
            <dt>reason</dt>
            <dd>${i.receipt.reason||"未提供"}</dd>
            <dt>stage</dt>
            <dd>${i.receipt.stage||"未提供"}</dd>
          </dl>
        </details>
      `:""}
    </div>
  `:""}function Vn(i){return i?g`
    <div style="position:absolute; bottom:130px; left:50%; transform:translateX(-50%); width:90%; background:linear-gradient(90deg, var(--ai-purple), var(--ai-cyan)); padding:20px 40px; border-radius:32px; box-shadow:0 15px 50px rgba(0,229,255,0.3); animation:slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display:flex; align-items:center; gap:20px;">
      <span class="icon-main" style="color:white; font-size:32px;">auto_awesome</span>
      <span style="font-size:18px; font-weight:800; color:white;">${i}</span>
    </div>
  `:""}function Gn(i,t,e){return i?g`
    <div class="critical-overlay" role="dialog" aria-modal="true" aria-label="关键视觉事件弹层">
      <div class="critical-card">
        <div class="critical-header">
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="pulse-dot" style="background:#ff5252;"></span>
            <span style="font-weight:900; color:#ff5252; letter-spacing:1px; font-size:12px;">关键视觉事件</span>
          </div>
          <div class="critical-time" style="font-size:12px; opacity:0.4; font-weight:700;">
            ${new Date(i.time*1e3).toLocaleTimeString()}
          </div>
        </div>
        <div class="critical-camera-name" style="margin: 12px 0; font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
          <span class="icon-main" style="font-size:24px; opacity:0.5;">videocam</span>
          ${i.camera_name}
        </div>
        <div class="critical-snapshot-box" style="width:100%; border-radius:24px; overflow:hidden; position:relative; aspect-ratio:16/9; background:#000;">
          <img src="${t}${i.snapshot}" style="width:100%; height:100%; object-fit:cover;" alt="关键事件截图">
          <div class="snapshot-label" style="position:absolute; bottom:16px; left:16px; background:rgba(0,0,0,0.6); padding:6px 12px; border-radius:8px; font-size:11px; font-weight:700; backdrop-filter:blur(10px);">检测到人员停留</div>
        </div>
        <div class="critical-ai-insight" style="margin-top:20px; padding:20px; background:rgba(179,136,255,0.08); border-radius:20px; border:1px solid rgba(179,136,255,0.15); display:flex; gap:16px; align-items:flex-start;">
          <span class="icon-main" style="color:var(--ai-purple); font-size:32px;">psychology</span>
          <div style="flex:1;">
            <div style="font-size:10px; opacity:0.5; font-weight:900; margin-bottom:6px; letter-spacing:1px;">AI 洞察</div>
            <div style="font-size:14px; font-weight:600; line-height:1.6; color:rgba(255,255,255,0.9);">
              网关回流了门口视觉事件，置信度 ${Math.round(i.score*100)}%。中控屏只负责展示，不补造 Presence、候选或设备状态。
            </div>
          </div>
        </div>
        <div class="critical-actions" style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <button class="critical-btn secondary"
            style="padding:18px; border-radius:16px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:white; font-weight:800; font-size:15px; cursor:pointer;"
            @click="${e}">忽略此事件</button>
          <button class="critical-btn primary"
            style="padding:18px; border-radius:16px; border:none; background:var(--ai-purple); color:white; font-weight:800; font-size:15px; cursor:pointer; box-shadow:0 8px 24px rgba(179,136,255,0.3);"
            @click="${e}">知道了</button>
        </div>
      </div>
    </div>
  `:""}function Jn(i,t,e,r,n,s,o){return i?g`
    <div class="critical-overlay" role="dialog" aria-modal="true" aria-label="设备控制确认" @click="${s}">
      <div class="confirmation-card" @click="${c=>c.stopPropagation()}">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:16px;">
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="confirmation-chip">
              <span class="icon-main" style="font-size:16px;">verified_user</span>
              ${e(i.challenge.riskLevel)}
            </div>
            <div>
              <div style="font-size:20px; font-weight:900; color:var(--t-text);">该操作需要主人确认</div>
              <div style="font-size:13px; line-height:1.6; color:var(--t-text-sec); margin-top:8px;">
                ${r(i.entityId)}
                将执行“${n(i.detail)}”。
                中控屏不会重发命令，确认后只向网关提交一次确认请求。
              </div>
            </div>
          </div>
          <button
            style="width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.05); color:white; cursor:pointer;"
            ?disabled="${t}"
            @click="${s}"
          >
            <span class="icon-main">close</span>
          </button>
        </div>
        <div style="margin-top:18px; padding:14px 16px; border-radius:18px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; justify-content:space-between; gap:12px; font-size:12px; color:var(--t-text-sec);">
            <span>设备</span>
            <span style="font-weight:800; color:var(--t-text);">${i.entityId}</span>
          </div>
          <div style="display:flex; justify-content:space-between; gap:12px; font-size:12px; color:var(--t-text-sec); margin-top:10px;">
            <span>确认单号</span>
            <span style="font-weight:800; color:var(--t-text);">${i.challenge.claimId}</span>
          </div>
          ${i.challenge.expiresAt?g`
            <div style="display:flex; justify-content:space-between; gap:12px; font-size:12px; color:var(--t-text-sec); margin-top:10px;">
              <span>有效期</span>
              <span style="font-weight:800; color:var(--t-text);">${i.challenge.expiresAt}</span>
            </div>
          `:""}
        </div>
        <div class="confirmation-actions">
          <button class="confirmation-btn" ?disabled="${t}" @click="${s}">取消</button>
          <button class="confirmation-btn primary" ?disabled="${t}" @click="${o}">
            ${t?"确认中...":"确认执行"}
          </button>
        </div>
      </div>
    </div>
  `:""}function Kn(i,t){return i?g`
    <div class="critical-overlay" role="dialog" aria-modal="true" aria-label="设备详情控制面板" @click="${t}">
      <div class="detail-card" @click="${e=>e.stopPropagation()}">
        <div class="detail-header">
          <div style="display:flex; align-items:center; gap:16px;">
            <div class="icon-box" style="width:48px; height:48px; border-radius:14px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center;">
              <span class="icon-main" style="font-size:24px;">
                ${i.type==="light"?"lightbulb":"ac_unit"}
              </span>
            </div>
            <div>
              <div style="font-size:10px; opacity:0.45; font-weight:900; letter-spacing:1px; margin-bottom:4px;">设备详情控制面板</div>
              <div style="font-size:18px; font-weight:800;">${i.name}</div>
              <div style="font-size:12px; opacity:0.4;">${i.room}</div>
            </div>
          </div>
          <button
            style="width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.05); color:white; cursor:pointer;"
            @click="${t}"
          >
            <span class="icon-main">close</span>
          </button>
        </div>
        <div class="detail-content" style="margin-top:24px;">
          ${i.type==="light"?g`
            <light-detail-panel .device="${i}"></light-detail-panel>
          `:i.type==="climate"?g`
            <climate-detail-panel .device="${i}"></climate-detail-panel>
          `:""}
        </div>
      </div>
    </div>
  `:""}var Yn=Object.defineProperty,Qn=Object.getOwnPropertyDescriptor,D=(i,t,e,r)=>{for(var n=r>1?void 0:r?Qn(t,e):t,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(t,e,n):o(n))||n);return r&&n&&Yn(t,e,n),n};class at extends Error{constructor(t,e){const r=e&&typeof e=="object"&&!Array.isArray(e)?e:{};super(String(r.error||r.message||`Gateway request failed: ${t}`)),this.name="GatewayRequestError",this.status=t,this.payload=r}}let P=class extends M{constructor(){super(...arguments),this.activeRoomId="all",this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this.devices=[],this.energyStats=[],this.frigateEvents=[],this.criticalEvent=null,this.activeDetailEntity=null,this.isRecording=!1,this.isConnected=!1,this.isConfiguring=!1,this.connectionError="",this.isPairingStep=!1,this.gatewayBase="",this.screenToken="",this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.isPairing=!1,this.voiceText="点击开始语音指令",this.voiceReply="",this.waveData=new Array(20).fill(0),this.pipelineStage="idle",this.theme="dark",this.actionNotice=null,this.pendingDeviceControlConfirmation=null,this.isConfirmingDeviceControl=!1,this._voicePipeline=null,this._alwaysOnVad=null,this._lastStt="",this._actionNoticeTimer=null,this.alwaysOnEnabled=!1,this._expressWatchTimer=null,this._sceneRefreshTimer=null,this._removeAuthorizationFailureListener=null,this.rooms=[{id:"all",name:"全部"}],this.scenes=[],this.probeStatus=""}firstUpdated(){const i=localStorage.getItem("sa-theme");i&&(this.theme=i,i==="light"&&this.classList.add("theme-light")),Promise.resolve().then(()=>this._initConnection())}_toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",this.theme==="light"?this.classList.add("theme-light"):this.classList.remove("theme-light"),localStorage.setItem("sa-theme",this.theme)}async _initConnection(){const i=new URLSearchParams(window.location.search),t=i.get("screen_token");if(t){this.screenToken=t,localStorage.setItem("screen_token",t);try{i.delete("screen_token");const e=i.toString(),r=window.location.pathname+(e?`?${e}`:"")+window.location.hash;window.history.replaceState({},"",r)}catch{}}else this.screenToken=localStorage.getItem("screen_token")||"";this.gatewayBase=window.location.origin,this.screenToken?this._tryConnect():(this.isConfiguring=!0,this.isPairingStep=!1,this._startExpressWatch())}_startExpressWatch(){this._stopExpressWatch();let i=0;const t=async()=>{if(!(this.isConnected||!this.isConfiguring||this.isPairing)){i++;try{const e=this.gatewayBase.trim(),r=`${e}/api/v1/device/pair/start`;this.probeStatus=`探测中 #${i}...`;const n=await fetch(r,{method:"POST",signal:AbortSignal.timeout(3e3)}),s=n.headers.get("content-type")||"";if(!n.ok||!s.includes("application/json"))throw await n.text().catch(()=>""),new Error("gateway_probe_unavailable");const o=await n.json();if(o.token){this.probeStatus="收到授权，正在连接...",this._stopExpressWatch();const c=o.screen_token||"";c&&(this.screenToken=c,localStorage.setItem("screen_token",c));const a=window.location.origin.includes(":5173");this.gatewayBase=a?"":o.url||e,this._tryConnect();return}this.probeStatus=`等待极速配对... (#${i})`}catch(e){console.warn(`[probe #${i}] 失败:`,e.message),this.probeStatus=`等待网关配对服务... (#${i})`}this.isConfiguring&&!this.isConnected&&!this.isPairing&&(this._expressWatchTimer=setTimeout(t,2e3))}};this._expressWatchTimer=setTimeout(t,1500)}_stopExpressWatch(){this._expressWatchTimer!==null&&(clearTimeout(this._expressWatchTimer),this._expressWatchTimer=null)}_handleScreenAuthorizationRequired(){var i,t;this._stopExpressWatch(),(i=this._voicePipeline)==null||i.stop(),this._voicePipeline=null,(t=this._alwaysOnVad)==null||t.stop(),this._alwaysOnVad=null,this.alwaysOnEnabled=!1,this.isRecording=!1,this._sceneRefreshTimer&&(clearInterval(this._sceneRefreshTimer),this._sceneRefreshTimer=null),localStorage.removeItem("screen_token"),this.screenToken="",this.isConnected=!1,this.isConfiguring=!0,this.isPairing=!1,this.isPairingStep=!1,this.connectionError="访问令牌无效或已过期，请重新配对。",this._startExpressWatch()}async _tryConnect(){var i;this._stopExpressWatch();try{if(this.connectionError="",!this.screenToken)throw new Error("SCREEN_TOKEN_REQUIRED");if((i=this._removeAuthorizationFailureListener)==null||i.call(this),this._removeAuthorizationFailureListener=wt.subscribeAuthorizationRequired(()=>{this._handleScreenAuthorizationRequired()}),!await wt.refreshManagedDevices())throw new Error("SCREEN_READ_MODEL_UNAVAILABLE");this.isConnected=!0,this.isConfiguring=!1;const r=localStorage.getItem("sa_voice_legacy_event_compat")==="1";this._voicePipeline=new Nn({gatewayBaseUrl:this.gatewayBase||window.location.origin,screenToken:this.screenToken,enableLegacyVoiceEventCompat:r},{onStageChange:(n,s)=>{var o,c;this.pipelineStage=n,n==="stt"?(this.isRecording=!0,this.voiceText="正在聆听中..."):n==="intent"?(this.isRecording=!1,this._lastStt||(this.voiceText="AI 理解中...")):n==="tts"||n==="playing"?this.voiceText=this.voiceReply||"正在生成回复...":n==="idle"?(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"随时说话...":"点击开始语音指令",this.waveData=new Array(20).fill(0),this._lastStt="",setTimeout(()=>{this.voiceReply=""},8e3),this.alwaysOnEnabled&&((o=this._alwaysOnVad)==null||o.resume())):n==="error"&&(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"出错了，继续监听中...":s||"出现错误，请重试",this.waveData=new Array(20).fill(0),this._lastStt="",this.alwaysOnEnabled&&((c=this._alwaysOnVad)==null||c.resume()))},onSttResult:n=>{this._lastStt=n,this.voiceText=`"${n}"`},onReply:n=>{this.voiceReply=n},onError:n=>{var s;console.error("[VoicePipeline]",n),this.voiceText=n,this.isRecording=!1,this.alwaysOnEnabled&&((s=this._alwaysOnVad)==null||s.resume())},onWaveData:n=>{this.waveData=[...n]}}),this._alwaysOnVad=new Mn(async()=>{!this._voicePipeline||this._voicePipeline.isRunning||(this.voiceText="检测到语音，正在识别...",await this._voicePipeline.start())}),wt.subscribe((n,s,o,c,a,l)=>{this.devices=[...n],this.aiState={...s},this.energyStats=[...o],this.frigateEvents=[...c],this.rooms=[...a],this.criticalEvent=l}),await this._refreshAiScenes(),this._sceneRefreshTimer&&clearInterval(this._sceneRefreshTimer),this._sceneRefreshTimer=setInterval(()=>this._refreshAiScenes(),3e4)}catch(t){if(console.error("Connection failed",t),t.message==="AUTH_REQUIRED"){this._handleScreenAuthorizationRequired();return}this.isConnected=!1,this.isConfiguring=!0,t.message==="SCREEN_TOKEN_REQUIRED"?this.connectionError="缺少访问令牌：请通过一键配对获取授权，或重新打开配对入口。":t.message==="SCREEN_SCOPE_FORBIDDEN"?this.connectionError="当前屏幕会话缺少读取权限，配对状态已保留。":this.connectionError=t.message==="AUTH_REQUIRED"?"访问令牌无效或已过期，请重新配对。":"无法连接到 SmartAgent 网关，请确认 add-on 正在运行后重试。"}}async _toggleVoice(){if(!this._voicePipeline){this.voiceText="语音功能初始化中...";return}this._voicePipeline.isRunning?this._voicePipeline.stop():await this._voicePipeline.start()}async _startRecording(){await this._toggleVoice()}async _stopRecording(){var i;(i=this._voicePipeline)==null||i.stop()}async _toggleAlwaysOn(){if(this._alwaysOnVad)if(this.alwaysOnEnabled)this._alwaysOnVad.stop(),this.alwaysOnEnabled=!1,this.voiceText="点击开始语音指令";else{const i=await this._alwaysOnVad.start();this.alwaysOnEnabled=i,this.voiceText=i?"随时说话...":"无法访问麦克风，免唤醒未开启"}}_renderActiveRoomView(){const i=this.activeRoomId,t=i==="all"?this.devices:this.devices.filter(s=>s.roomId===i);if(t.length===0&&i!=="all")return g`
        <div style="text-align: center; padding: 100px 20px; color: rgba(255,255,255,0.15);">
          <span class="icon-main" style="font-size: 64px; margin-bottom: 24px; display: block; opacity: 0.1;">devices_other</span>
          <div style="font-size: 16px; font-weight: 700;">该区域暂无托管设备</div>
        </div>
      `;const e=this.scenes.filter(s=>i==="all"?s.roomId==="all":s.roomId===i),r=this.devices.filter(s=>s.type==="scene"&&(i==="all"||s.roomId===i)),n=[{id:"light",name:"照明",icon:"lightbulb"},{id:"climate",name:"环境",icon:"thermostat"},{id:"cover",name:"遮蔽",icon:"curtains"},{id:"sensor",name:"感应",icon:"sensors"},{id:"other",name:"其他",icon:"more_horiz"}];return g`
      <div class="room-content" style="padding-top: 0;">
        <!-- 场景区 -->
        ${e.length>0||r.length>0?g`
          <div class="category-group">
            <div class="section-label">
              <span class="icon-main">auto_awesome</span> 场景模式
            </div>
            <div class="scene-grid-orb">
              ${e.map(s=>g`<scene-card .scene="${s}" .isAiRecommended="${s.isAi}"></scene-card>`)}
              ${r.map(s=>g`<scene-card .scene="${s}" .isAiRecommended="${!0}"></scene-card>`)}
            </div>
          </div>
        `:""}

        <!-- 设备分类区 -->
        ${n.map(s=>{const o=t.filter(a=>s.id==="other"?!["light","climate","cover","sensor","scene"].includes(a.type):a.type===s.id);if(o.length===0)return"";let c=`${o.length} 个设备`;if(s.id==="light"){const a=o.filter(l=>l.state==="on").length;c=a===0?"灯全部关了":`${a} 盏灯开启中`}return g`
            <div class="category-group">
              <div class="section-label">
                <span class="icon-main">${s.icon}</span> ${s.name} <span style="opacity:0.4; font-size:13px; font-weight:600; margin-left:8px;">| ${c}</span>
              </div>
              <div class="device-grid-orb">
                ${o.map(a=>{const l=this.aiState.recentAiActions.includes(a.id);return a.type==="light"?g`<light-card .device="${a}" .isAiControlled="${l}"></light-card>`:a.type==="climate"?g`<climate-card .device="${a}" .isAiControlled="${l}"></climate-card>`:a.type==="cover"?g`<cover-card .device="${a}" .isAiControlled="${l}"></cover-card>`:a.type==="sensor"?g`<sensor-card .device="${a}"></sensor-card>`:g`<generic-device-card .device="${a}" .isAiControlled="${l}"></generic-device-card>`})}
              </div>
            </div>
          `})}
      </div>
    `}_formatMinutes(i){if(!i)return"0分钟";const t=Math.floor(i/60),e=Math.floor(i%60);return t>0?`${t}小时${e}分钟`:`${e}分钟`}_energyKwhValue(i){for(const t of["today_kwh","kwh","energy_kwh","consumption_kwh","total_kwh"]){const e=i==null?void 0:i[t];if(e==null||e==="")continue;const r=Number(e);if(Number.isFinite(r))return r}return null}_formatTodayEnergyKwh(i){let t=!1;const e=(i||[]).reduce((r,n)=>{const s=this._energyKwhValue(n);return s===null?r:(t=!0,r+s)},0);return t?e>=100?`${Math.round(e)}kWh`:`${e.toFixed(1)}kWh`:"待回流"}_renderEnvironmentInsights(){const i=this.rooms.filter(o=>o.id!=="all").length,t=this.energyStats||[],e=this.frigateEvents||[],r=t.reduce((o,c)=>o+Number(c.waste_minutes||0),0),n=this.screenToken?"已授权":"等待授权",s=this.alwaysOnEnabled?"免唤醒监听":"点击唤醒";return g`
      <div class="room-content insights-strip" aria-label="环境洞察、能耗与诊断">
        <div class="insights-grid">
          <section class="insight-card">
            <div class="insight-heading">
              <div class="insight-title">
                <span class="icon-main">energy_savings_leaf</span>
                <span>能耗面板</span>
              </div>
              <span class="insight-subtitle">空房浪费 ${this._formatMinutes(r)}</span>
            </div>
            <div class="insight-body">
              <energy-chart .stats="${t}"></energy-chart>
            </div>
          </section>

          <section class="insight-card">
            <div class="insight-heading">
              <div class="insight-title">
                <span class="icon-main">visibility</span>
                <span>视觉事件</span>
              </div>
              <span class="insight-subtitle">${e.length} 条近期事件</span>
            </div>
            <div class="insight-body">
              <frigate-events-panel .events="${e}"></frigate-events-panel>
            </div>
          </section>

          <section class="insight-card" aria-label="极简设置与诊断">
            <div class="insight-heading">
              <div class="insight-title">
                <span class="icon-main">settings</span>
                <span>极简设置/诊断</span>
              </div>
              <span class="insight-subtitle">只读状态</span>
            </div>
            <div class="diagnostic-list">
              <div class="diagnostic-row">
                <span class="diagnostic-label">网关链路</span>
                <span class="diagnostic-value">${n}</span>
              </div>
              <div class="diagnostic-row">
                <span class="diagnostic-label">语音模式</span>
                <span class="diagnostic-value">${s}</span>
              </div>
              <div class="diagnostic-row">
                <span class="diagnostic-label">空间数量</span>
                <span class="diagnostic-value">${i} 个房间</span>
              </div>
              <div class="diagnostic-row">
                <span class="diagnostic-label">托管设备</span>
                <span class="diagnostic-value">${this.devices.length} 个设备</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}_gatewayApiBase(){let i=(this.gatewayBase||"").trim();return!i||window.location.origin.includes(":5173")?"":(i.startsWith("http")||(i="http://"+i),i.endsWith("/")?i.slice(0,-1):i)}_gatewayJsonHeaders(){const i={"Content-Type":"application/json"};return this.screenToken&&(i.Authorization=`Bearer ${this.screenToken}`),i}async _fetchGatewayJson(i){const t=await fetch(`${this._gatewayApiBase()}${i}`,{headers:this._gatewayJsonHeaders(),signal:AbortSignal.timeout(15e3)}),e=await t.text();let r={};if(e)try{r=JSON.parse(e)}catch{r={raw:e}}if(!t.ok)throw t.status===401?(this._handleScreenAuthorizationRequired(),new Error("AUTH_REQUIRED")):new at(t.status,r);return r}async _postGatewayJson(i,t){const e=await fetch(`${this._gatewayApiBase()}${i}`,{method:"POST",headers:this._gatewayJsonHeaders(),body:JSON.stringify(t),signal:AbortSignal.timeout(15e3)}),r=await e.text();let n={};if(r)try{n=JSON.parse(r)}catch{n={raw:r}}if(!e.ok)throw e.status===401?(this._handleScreenAuthorizationRequired(),new Error("AUTH_REQUIRED")):new at(e.status,n);return n}_extractRows(i,t){if(Array.isArray(i))return i;for(const e of[t,"items","data","rows","result"]){const r=i==null?void 0:i[e];if(Array.isArray(r))return r}return[]}async _refreshAiScenes(){try{const i=await this._fetchGatewayJson("/api/v1/ai-scenes"),e=this._extractRows(i,"scenes").map(r=>this._normalizeAiScene(r)).filter(r=>!!r);this.scenes=Rn(e,yn(this.rooms))}catch(i){console.warn("[Scenes] 刷新 AI 场景失败:",i)}}_normalizeAiScene(i){if(!i||typeof i!="object")return null;const t=String(i.id??"").trim();if(!t)return null;const e=String(i.status||i.lifecycle_state||"").trim().toLowerCase();if(e&&!["approved","active"].includes(e)||!(typeof i.executable=="boolean"?i.executable:Number(i.action_count||i.raw_action_count||0)>0))return null;const n=String(i.source_id||"").trim(),s=String(i.title||i.name||n||`AI 场景 ${t}`).trim();return{id:t,name:s,icon:xn(i,n),isAi:!0,roomId:Sn(i,n,s),sourceId:n,gatewayTriggerPath:`/api/v1/ai-scenes/${encodeURIComponent(t)}/trigger`}}_knownRoomIdFromText(i){const t=i.toLowerCase();if(t.includes("全屋")||t.includes("全部")||t.includes("whole_home"))return"all";if(t.includes("厨房")||t.includes("kitchen"))return"kitchen";const e=t.includes("客厅")||t.includes("living"),r=t.includes("餐厅")||t.includes("dining");return e&&r?"living_dining":e?"living":r?"dining":t.includes("书房")||t.includes("study")?"study":t.includes("卧室")||t.includes("bedroom")?"bedroom":t.includes("卫生间")||t.includes("卫浴")||t.includes("bathroom")?"bathroom":t.includes("阳台")||t.includes("balcony")?"balcony":t.includes("玄关")||t.includes("entry")?"entry":t.includes("走廊")||t.includes("hallway")||t.includes("corridor")?"hallway":""}_mapRoomToId(i){const t=zt(i)||this._knownRoomIdFromText(i);return t||String(i||"").trim().toLowerCase().replace(/\s+/g,"_")}_commandEntityId(i){var n;const t=(n=i.data)==null?void 0:n.entity_id,e=Array.isArray(t)?t[0]:t,r=String(e||"").trim();return r?r.includes(".")||!i.domain?r:`${i.domain}.${r}`:""}async _executeServiceThroughGateway(i,t){const e=this._commandEntityId(i);if(!e||!i.service)throw new Error("invalid_screen_service_call");return this._postGatewayJson(jn(e),qn({service:i.service,data:i.data},t))}async _triggerAiSceneThroughGateway(i){const t=String(i||"").trim();if(!t)throw new Error("invalid_ai_scene_id");return this._postGatewayJson(`/api/v1/ai-scenes/${encodeURIComponent(t)}/trigger`,{})}_refreshDeviceStateAfterGatewayAction(){wt.refreshManagedDevices().catch(i=>{i instanceof Error&&i.message==="AUTH_REQUIRED"&&this._handleScreenAuthorizationRequired()}),setTimeout(()=>{wt.refreshManagedDevices().catch(i=>{i instanceof Error&&i.message==="AUTH_REQUIRED"&&this._handleScreenAuthorizationRequired()})},1200)}_showActionNotice(i,t,e){this._actionNoticeTimer&&(clearTimeout(this._actionNoticeTimer),this._actionNoticeTimer=null),this.actionNotice=e?{tone:i,text:t,receipt:e}:{tone:i,text:t},this._actionNoticeTimer=setTimeout(()=>{this.actionNotice=null,this._actionNoticeTimer=null},e?12e3:i==="error"?6500:4200)}_showDeviceControlTerminalReceipt(i,t,e,r){const n=Hn(i,t,e,r);return n?n.effectStatus==="verified_success"?(this._showActionNotice("success","设备状态已由网关回流验证成功",n),!0):(this._showActionNotice("warning","设备结果尚未确认，禁止自动重试",n),!0):!1}_executionFailureMessage(i){if(i instanceof at){if(Bi(i.payload))return"该操作需要主人确认后才会执行";if(i.status===409)return"该操作已被网关拒绝，设备状态未改变";if(i.status===403)return"当前屏幕会话缺少此操作权限，配对状态已保留"}const t=i instanceof Error?i.message:String(i||"");return t.includes("invalid_screen_service_call")||t.includes("invalid_ai_scene_id")?"执行请求缺少必要字段，未发送动作":t.includes("AUTH")||t.includes("401")?"授权已失效，请重新配对后再执行":"执行请求未被网关接受，设备状态未改变"}_deviceControlChallengeFromError(i){if(!(i instanceof at))return null;const t=Bi(i.payload);return t?{challenge:t,responsePayload:i.payload}:null}_deviceLabel(i){var t;return((t=this.devices.find(e=>e.id===i))==null?void 0:t.name)||i}_serviceLabel(i){const t=String(i||"").trim().toLowerCase();return{turn_on:"开启",turn_off:"关闭",open_cover:"打开",close_cover:"关闭",stop_cover:"停止",set_cover_position:"调节开合",set_temperature:"调节温度",set_hvac_mode:"切换模式",set_fan_mode:"调节风速"}[t]||t||"执行"}_actionDescription(i){const t=[this._serviceLabel(i.service)],e=i.data||{},r=h=>{const p=Number(h);return Number.isFinite(p)?p:null},n=r(e.brightness_pct);n!==null&&t.push(`亮度 ${n}%`);const s=r(e.color_temp_kelvin);s!==null&&t.push(`色温 ${s}K`);const o=r(e.temperature);o!==null&&t.push(`温度 ${o}°C`);const c=r(e.position);c!==null&&t.push(`开合 ${c}%`);const a=r(e.transition);a!==null&&t.push(`过渡 ${a} 秒`);const l=String(e.hvac_mode||"").trim();l&&t.push(`模式 ${l}`);const u=String(e.fan_mode||"").trim();u&&t.push(`风速 ${u}`);const d=Array.isArray(e.rgb_color)?e.rgb_color.map(Number):[];return d.length===3&&d.every(Number.isFinite)&&t.push(`颜色 RGB(${d.join(", ")})`),t.join("，")}_riskLabel(i){const t=String(i||"").trim().toLowerCase();return t==="medium"?"中风险":t==="high"?"高风险":t==="critical"?"极高风险":t==="low"?"低风险":"需确认"}_dismissPendingDeviceControlConfirmation(){this.isConfirmingDeviceControl||(this.pendingDeviceControlConfirmation=null)}async _confirmPendingDeviceControl(){const i=this.pendingDeviceControlConfirmation;if(!(!i||this.isConfirmingDeviceControl)){this.isConfirmingDeviceControl=!0,this._showActionNotice("info","确认请求已提交，等待设备状态回流确认");try{const t=await this._postGatewayJson(i.challenge.confirmPath,{});this.pendingDeviceControlConfirmation=null,this._showDeviceControlTerminalReceipt(t,i.requestId,i.challenge.bindingDigest,i.challenge.claimId)||this._showActionNotice("info","确认请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(t){if(t instanceof at&&this._showDeviceControlTerminalReceipt(t.payload,i.requestId,i.challenge.bindingDigest,i.challenge.claimId)){this.pendingDeviceControlConfirmation=null,this._refreshDeviceStateAfterGatewayAction();return}const e=this._deviceControlChallengeFromError(t);e?this.pendingDeviceControlConfirmation={...i,challenge:e.challenge,responsePayload:e.responsePayload}:this.pendingDeviceControlConfirmation=null,console.error("[DeviceControl] 确认执行失败:",t),this._showActionNotice("error",this._executionFailureMessage(t))}finally{this.isConfirmingDeviceControl=!1}}}async _handleServiceCall(i){var n;const t=i.detail;if(t.domain==="smart_agent"&&t.service==="trigger_ai_scene"){try{await this._triggerAiSceneThroughGateway(String(((n=t.data)==null?void 0:n.scene_id)||"")),this._showActionNotice("info","场景请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(s){console.error("[SceneTrigger] AI 场景触发失败:",s),this._showActionNotice("error",this._executionFailureMessage(s))}return}const e=`screen-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,r=this._commandEntityId(t);this._showActionNotice("info","执行请求已提交，等待设备状态回流确认");try{const s=await this._executeServiceThroughGateway(t,e);this.pendingDeviceControlConfirmation=null,this._showDeviceControlTerminalReceipt(s,e)||this._showActionNotice("info","执行请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(s){if(s instanceof at&&this._showDeviceControlTerminalReceipt(s.payload,e)){this.pendingDeviceControlConfirmation=null,this._refreshDeviceStateAfterGatewayAction();return}const o=this._deviceControlChallengeFromError(s);if(o){this.pendingDeviceControlConfirmation={entityId:r,detail:t,requestId:e,challenge:o.challenge,responsePayload:o.responsePayload};return}console.error("[ServiceCall] 指令发送失败:",s),this._showActionNotice("error",this._executionFailureMessage(s))}}async _startPairing(){if(!this.isPairing){this._stopExpressWatch(),this.isPairing=!0,this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.connectionError="";try{let i=this.gatewayBase.trim();i&&!i.startsWith("http")&&(i="http://"+i),i.endsWith("/")&&(i=i.slice(0,-1));const t=await fetch(`${i}/api/v1/device/pair/start`,{method:"POST"});let e={};try{e=await t.json()}catch{e={}}if(!t.ok){const r=String((e==null?void 0:e.error)||(e==null?void 0:e.message)||`HTTP_${t.status}`);throw t.status===409&&r==="pairing_window_not_open"?new Error("PAIRING_WINDOW_NOT_OPEN"):new Error(r||"API_FAILED")}if(e.token){const r=e.screen_token||"";r&&(this.screenToken=r,localStorage.setItem("screen_token",r));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||i,this.isPairing=!1,this._tryConnect();return}this.pairingCode=e.code||"",this.authUrl=e.auth_url||"",this.authUrl&&(this.qrDataUrl=await Jr.toDataURL(this.authUrl,{width:200,margin:1,color:{dark:"#1a1a2e",light:"#ffffff"}})),this.isPairingStep=!1,this._pollPairingStatus(i)}catch(i){console.error("Pairing failed",i),this.connectionError=(i==null?void 0:i.message)==="PAIRING_WINDOW_NOT_OPEN"?"请先在 8234 管理端「授权」页面点击开启配对，然后 60 秒内回到中控屏点击一键连接":"无法连接到配对服务器",this.isPairingStep=!1,this.isPairing=!1}}}async _pollPairingStatus(i){if(this.isPairing)try{const t=await fetch(`${i}/api/v1/device/pair/confirm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:this.pairingCode})}),e=await t.json();if(!t.ok)throw new Error(String((e==null?void 0:e.error)||"API_FAILED"));if(e.ok){const r=e.screen_token||"";r&&(this.screenToken=r,localStorage.setItem("screen_token",r));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||i,this.isPairing=!1,this.isPairingStep=!0,this._tryConnect()}else e.error==="EXPIRED"?(this.connectionError='配对码已过期，请重新点击"一键连接"',this.isPairing=!1,this.isPairingStep=!1):setTimeout(()=>this._pollPairingStatus(i),2e3)}catch(t){console.warn("Polling pairing status failed",t),setTimeout(()=>this._pollPairingStatus(i),5e3)}}_renderConfigScreen(){return g`
      <div style="display:flex; height:100vh; align-items:center; justify-content:center; padding: 20px; box-sizing: border-box; overflow: hidden;">
        <glass-card variant="elevated" style="width: 100%; max-width: 480px; min-height: 420px; padding: clamp(32px, 8vw, 48px); display: flex; flex-direction: column; justify-content: center; gap: 40px; position: relative; border-radius: 32px;">
          
          <!-- 智能引导头部 -->
          <div style="text-align: center;">
            <div class="config-brand-title" style="font-size: clamp(34px, 9vw, 42px); line-height: 1.05; white-space: nowrap; font-weight: 900; background: linear-gradient(135deg, #B388FF 0%, #82B1FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; letter-spacing: 0;">
              SmartAgent
            </div>
            <div style="opacity: 0.5; font-size: 15px; font-weight: 600; letter-spacing: 1px;">
              ${this.isPairingStep?"安全授权中":"准备就绪"}
            </div>
          </div>

          ${this.isPairingStep?this._renderPairingScreen():g`
            <div style="display: flex; flex-direction: column; gap: 28px; animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">

              <div style="text-align: center; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 12px; opacity: 0.4; margin-bottom: 4px;">当前连接入口</div>
                <div style="font-size: 14px; font-family: 'JetBrains Mono'; opacity: 0.8;">
                  ${window.location.origin}
                </div>
              </div>

              <button
                @click="${this._startPairing}"
                style="background: linear-gradient(135deg, var(--glass-primary) 0%, #7C4DFF 100%); border: none; border-radius: 24px; padding: 32px; color: white; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: all 0.4s; box-shadow: 0 20px 40px rgba(179,136,255,0.3); position: relative; overflow: hidden;"
                onmouseover="this.style.transform='scale(1.02) translateY(-4px)'; this.style.boxShadow='0 25px 50px rgba(179,136,255,0.4)'"
                onmouseout="this.style.transform='none'; this.style.boxShadow='0 20px 40px rgba(179,136,255,0.3)'"
              >
                <div class="pulse-ring"></div>
                <span class="icon-main" style="font-size: 48px; position: relative; z-index: 1;">连</span>
                <div style="font-weight: 900; font-size: 22px; position: relative; z-index: 1;">一键连接</div>
                <div style="font-size: 13px; opacity: 0.8; font-weight: 500; position: relative; z-index: 1;">免扫码或扫码一键授权</div>
              </button>

              <div style="text-align: center; opacity: 0.3; font-size: 13px; font-weight: 500;">
                手动地址与手动令牌模式已禁用（仅网关链路）
              </div>

              ${this.probeStatus?g`
                <div style="text-align: center; font-size: 11px; opacity: 0.35; margin-top: -4px; font-family: 'JetBrains Mono', monospace;">
                  ${this.probeStatus}
                </div>
              `:""}
            </div>
          `}

          ${this.connectionError?g`
            <div style="position: absolute; bottom: 24px; left: 48px; right: 48px; text-align: center; color: #FF5252; font-size: 13px; background: rgba(255, 82, 82, 0.1); padding: 10px; border-radius: 12px; animation: shake 0.4s ease;">
              <span class="icon-main" style="font-size: 14px; vertical-align: middle; margin-right: 6px;">error</span>
              ${this.connectionError}
            </div>
          `:""}
        </glass-card>

        <style>
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
          
          .pulse-ring {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 100%; height: 100%;
            background: rgba(255,255,255,0.2);
            border-radius: 24px;
            animation: pulse 2s infinite;
            z-index: 0;
          }
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }
        </style>
      </div>
    `}_renderPairingScreen(){return g`
      <div style="display: flex; flex-direction: column; gap: 20px; animation: fadeIn 0.4s ease;">
        
        <!-- 顶部：配对码数字（最醒目） -->
        <div style="text-align: center;">
          <div style="font-size: 11px; opacity: 0.4; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">手机访问 HA 输入配对码</div>
          <div style="display: flex; gap: 8px; justify-content: center;">
            ${(this.pairingCode||"").split("").map(i=>g`
              <div style="width: 38px; height: 52px; background: rgba(179,136,255,0.1); border: 2px solid rgba(179,136,255,0.3); border-radius: 12px; font-size: 26px; font-weight: 900; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; color: #B388FF; box-shadow: 0 4px 16px rgba(179,136,255,0.2);">
                ${i}
              </div>
            `)}
          </div>
        </div>

        <!-- 中间：二维码（本地生成，不依赖外部API） -->
        <div style="display: flex; gap: 16px; align-items: center;">
          <div style="background: white; padding: 8px; border-radius: 16px; width: 100px; height: 100px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(179,136,255,0.2);">
            ${this.qrDataUrl?g`<img src="${this.qrDataUrl}" style="width:100%; height:100%;" alt="QR">`:g`<div style="font-size:11px; color:#888; text-align:center;">生成中...</div>`}
          </div>
          <div style="flex: 1; font-size: 12px; opacity: 0.6; line-height: 1.8;">
            <div style="font-weight: 700; opacity: 1; color: var(--glass-ai); font-size: 13px; margin-bottom: 6px;">如何操作</div>
            <div>① 手机扫码 <span style="opacity:0.4;">或</span></div>
            <div>① 手机打开 HA，进入开发者工具</div>
            <div>② 找到 SmartAgent → <code style="background:rgba(255,255,255,0.05); padding: 2px 6px; border-radius:4px;">配对确认</code></div>
            <div>③ 输入上方 <strong style="color:#B388FF">6位数字</strong> 后确认</div>
          </div>
        </div>

        <!-- 等待状态 -->
        <div style="background: rgba(179,136,255,0.05); padding: 14px 20px; border-radius: 16px; border: 1px solid rgba(179,136,255,0.1); display: flex; align-items: center; gap: 12px;">
          <div class="loader"></div>
          <div>
            <div style="font-size: 13px; font-weight: 600; color: var(--glass-ai);">等待手机确认...</div>
            <div style="font-size: 11px; opacity: 0.4; margin-top: 2px;">配对成功后将自动连接，下次打开无需再次授权</div>
          </div>
        </div>

        <div @click="${()=>{this.isPairingStep=!1,this.isPairing=!1}}"
             style="text-align: center; opacity: 0.3; font-size: 12px; cursor: pointer; padding: 4px;">
          取消并返回
        </div>
      </div>
    `}render(){if(this.isConfiguring)return this._renderConfigScreen();if(!this.isConnected)return g`<div style="display:flex; height:100vh; align-items:center; justify-content:center;">正在连接...</div>`;const i=this.energyStats||[];return g`
      <div class="container" 
        @service-call="${this._handleServiceCall}"
        @show-detail="${t=>{const e=this.devices.find(r=>r.id===t.detail.entityId);e&&(this.activeDetailEntity=e)}}"
      >
        <!-- 1. 侧边栏：AI 状态模块 -->
        <div class="sidebar">
          <div class="ai-brain-module">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
              <span class="icon-main" style="color:var(--ai-purple); font-size:32px;">auto_awesome</span>
              <div style="font-size:18px; font-weight:900;">AI 领航员</div>
            </div>
            <ai-status-panel .aiState="${this.aiState}"></ai-status-panel>
          </div>
        </div>

        <!-- 2. 顶栏：状态显示 (Clock & Weather) -->
        <div class="topbar">
          <div style="display:flex; align-items:center; gap:24px;">
            <clock-widget></clock-widget>
            <div style="width:1px; height:24px; background:var(--t-divider);"></div>
            <weather-widget></weather-widget>
          </div>
          
          <div class="status-group" style="display:flex; align-items:center; gap:16px;">
            <div class="status-item">
              <span class="status-label">今日</span>
              <span class="status-value">${this._formatTodayEnergyKwh(i)}</span>
            </div>
            <!-- 主题切换按钮 -->
            <button
              @click="${()=>this._toggleTheme()}"
              title="${this.theme==="dark"?"切换浅色模式":"切换深色模式"}"
              style="
                width:36px; height:36px; border-radius:50%;
                border:1px solid var(--t-input-border);
                background:var(--t-input-bg);
                color:var(--t-text-sec);
                display:flex; align-items:center; justify-content:center;
                cursor:pointer; font-family:'Material Symbols Outlined';
                font-size:20px; transition:all 0.3s;
              "
            >${this.theme==="dark"?"light_mode":"dark_mode"}</button>
          </div>
        </div>

        <!-- 3. 主区域：分房间视图 -->
        <div class="main">
          <div class="room-content" style="padding-bottom: 0;">
            <!-- 房间切换选项卡 (ORB Style) -->
            <div class="room-tabs">
              ${this.rooms.map(t=>g`
                <div 
                  class="room-tab ${this.activeRoomId===t.id?"active":""}"
                  @click="${()=>this.activeRoomId=t.id}"
                >${t.name}</div>
              `)}
            </div>
          </div>
          ${this._renderEnvironmentInsights()}
          ${this._renderActiveRoomView()}
        </div>

        <!-- 4. 底栏：语音交互 -->
        <div class="voice">
          <div class="voice-interactive-zone">
            <voice-bar 
              .isRecording="${this.isRecording}" 
              .status="${this.pipelineStage}"
              .text="${this.voiceText}"
              .waveData="${this.waveData}"
              @toggle-voice="${this._toggleVoice}"
            ></voice-bar>
          </div>
          <!-- 免唤醒模式开关 -->
          <button
            class="always-on-btn ${this.alwaysOnEnabled?"active":""}"
            @click="${this._toggleAlwaysOn}"
            title="${this.alwaysOnEnabled?"关闭免唤醒模式":"开启免唤醒模式"}"
          >
            <span class="icon-main">${this.alwaysOnEnabled?"hearing":"hearing_disabled"}</span>
          </button>
        </div>

          ${Wn(this.actionNotice)}

          <!-- AI Reply Overlay (Ambient) -->
          ${Vn(this.voiceReply)}
        </div>

        <!-- 5. 关键视觉事件大图弹出 (Critical Event Overlay) -->
        ${Gn(this.criticalEvent,this.gatewayBase,()=>this.criticalEvent=null)}

        ${Jn(this.pendingDeviceControlConfirmation,this.isConfirmingDeviceControl,t=>this._riskLabel(t),t=>this._deviceLabel(t),t=>this._actionDescription(t),()=>this._dismissPendingDeviceControlConfirmation(),()=>this._confirmPendingDeviceControl())}

        <!-- 6. 设备深度控制面板 (Detail Overlay) -->
        ${Kn(this.activeDetailEntity,()=>this.activeDetailEntity=null)}
      </div>
    `}};P.styles=[B,O`
    /* ═══════════════════════════════════════════
       深色主题（默认）
    ═══════════════════════════════════════════ */
    :host {
      display: block;
      height: 100vh; width: 100vw;
      font-family: 'HarmonyOS Sans SC', 'Inter', system-ui, sans-serif;
      overflow: hidden;
      /* PAD 布局尺寸 */
      --sidebar-width: 280px;
      --topbar-height: 72px;
      --voicebar-height: 56px;

      /* ── 深色主题色板 ── */
      --t-bg: #080B12;
      --t-bg-grad1: rgba(179, 136, 255, 0.07);
      --t-bg-grad2: rgba(0, 229, 255, 0.05);
      --t-sidebar: rgba(0, 0, 0, 0.18);
      --t-topbar: rgba(8, 11, 18, 0.6);
      --t-voicebar: rgba(8, 11, 18, 0.7);
      --t-card: rgba(255, 255, 255, 0.06);
      --t-card-border: rgba(255, 255, 255, 0.09);
      --t-card-hover: rgba(255, 255, 255, 0.09);
      --t-card-on: rgba(92, 219, 149, 0.13);
      --t-card-on-border: rgba(92, 219, 149, 0.40);
      --t-card-on-glow: rgba(92, 219, 149, 0.20);
      --t-text: #F0F2F5;
      --t-text-sec: rgba(240, 242, 245, 0.55);
      --t-text-hint: rgba(240, 242, 245, 0.30);
      --t-divider: rgba(255, 255, 255, 0.07);
      --t-input-bg: rgba(255, 255, 255, 0.06);
      --t-input-border: rgba(255, 255, 255, 0.10);
      --t-track: rgba(255, 255, 255, 0.08);
      --t-toggle-off: rgba(255, 255, 255, 0.08);
      --t-toggle-off-border: rgba(255, 255, 255, 0.06);
      --t-nav-item: rgba(255, 255, 255, 0.03);
      --t-nav-border: rgba(255, 255, 255, 0.05);
      --t-detail-bg: rgba(10, 12, 20, 0.96);
      --t-detail-card: rgba(255, 255, 255, 0.05);

      /* ── 品牌色 ── */
      --glass-primary: #7AB8FF;
      --glass-primary-glow: rgba(122, 184, 255, 0.35);
      --glass-bg: var(--t-card);
      --glass-border: var(--t-card-border);
      --ai-purple: #B388FF;
      --ai-cyan: #00E5FF;
      /* ── 旧变量别名（兼容各子组件） ── */
      --glass-on-surface: var(--t-text);
      --glass-on-surface-secondary: var(--t-text-sec);
      --glass-ai: var(--ai-purple);
      --glass-info: var(--glass-primary);
      --glass-error: #f85149;
      --glass-error-glow: rgba(248, 81, 73, 0.4);

      /* ── 应用 ── */
      background: var(--t-bg);
      background-image:
        radial-gradient(circle at 12% 20%, var(--t-bg-grad1) 0%, transparent 42%),
        radial-gradient(circle at 88% 82%, var(--t-bg-grad2) 0%, transparent 42%);
      color: var(--t-text);
    }

    /* ═══════════════════════════════════════════
       浅色主题
    ═══════════════════════════════════════════ */
    :host(.theme-light) {
      --t-bg: #EEF1F8;
      --t-bg-grad1: rgba(99, 102, 241, 0.06);
      --t-bg-grad2: rgba(14, 165, 233, 0.05);
      --t-sidebar: rgba(255, 255, 255, 0.88);
      --t-topbar: rgba(238, 241, 248, 0.85);
      --t-voicebar: rgba(255, 255, 255, 0.90);
      --t-card: rgba(255, 255, 255, 0.78);
      --t-card-border: rgba(0, 0, 0, 0.06);
      --t-card-hover: rgba(255, 255, 255, 0.96);
      --t-card-on: rgba(22, 163, 74, 0.10);
      --t-card-on-border: rgba(22, 163, 74, 0.32);
      --t-card-on-glow: rgba(22, 163, 74, 0.12);
      --t-text: #1A1D26;
      --t-text-sec: rgba(26, 29, 38, 0.55);
      --t-text-hint: rgba(26, 29, 38, 0.32);
      --t-divider: rgba(0, 0, 0, 0.07);
      --t-input-bg: rgba(0, 0, 0, 0.04);
      --t-input-border: rgba(0, 0, 0, 0.09);
      --t-track: rgba(0, 0, 0, 0.09);
      --t-toggle-off: rgba(0, 0, 0, 0.09);
      --t-toggle-off-border: rgba(0, 0, 0, 0.07);
      --t-nav-item: rgba(0, 0, 0, 0.04);
      --t-nav-border: rgba(0, 0, 0, 0.06);
      --t-detail-bg: rgba(238, 241, 248, 0.97);
      --t-detail-card: rgba(255, 255, 255, 0.80);

      --glass-primary: #5B6CF9;
      --glass-primary-glow: rgba(91, 108, 249, 0.25);
      --glass-bg: var(--t-card);
      --glass-border: var(--t-card-border);
      --ai-purple: #7C4DFF;
      --ai-cyan: #0EA5E9;
      /* ── 旧变量别名 ── */
      --glass-on-surface: var(--t-text);
      --glass-on-surface-secondary: var(--t-text-sec);
      --glass-ai: var(--ai-purple);
      --glass-info: var(--glass-primary);
      --glass-error: #f85149;
      --glass-error-glow: rgba(248, 81, 73, 0.4);

      background: var(--t-bg);
      background-image:
        radial-gradient(circle at 12% 20%, var(--t-bg-grad1) 0%, transparent 42%),
        radial-gradient(circle at 88% 82%, var(--t-bg-grad2) 0%, transparent 42%);
      color: var(--t-text);
    }

    .container {
      display: grid;
      grid-template-areas:
        "sidebar topbar"
        "sidebar main"
        "sidebar voice";
      grid-template-columns: var(--sidebar-width) 1fr;
      grid-template-rows: var(--topbar-height) 1fr var(--voicebar-height);
      height: 100vh;
      padding: 0;
      gap: 0;
      box-sizing: border-box;
    }

    /* 侧边栏：AI 状态面板 */
    .sidebar {
      grid-area: sidebar;
      display: flex;
      flex-direction: column;
      background: var(--t-sidebar);
      border-right: 1px solid var(--t-divider);
      padding: 24px;
      overflow: hidden;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    .ai-brain-module {
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100%;
    }

    /* 顶栏 (ORB Style) */
    .topbar {
      grid-area: topbar;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      background: var(--t-topbar);
      border-bottom: 1px solid var(--t-divider);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    /* 主区域 (ORB Style) */
    .main {
      grid-area: main;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      scrollbar-width: none;
      background: transparent;
    }
    .main::-webkit-scrollbar { display: none; }

    .room-content {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .insights-strip {
      padding-top: 0;
      padding-bottom: 8px;
      gap: 16px;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(220px, 0.78fr);
      gap: 16px;
    }

    .insight-card {
      min-height: 220px;
      border-radius: 24px;
      padding: 18px;
      background: var(--t-card);
      border: 1px solid var(--t-card-border);
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-width: 0;
      box-sizing: border-box;
    }

    .insight-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-width: 0;
    }

    .insight-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--t-text);
      font-size: 13px;
      font-weight: 900;
      min-width: 0;
    }

    .insight-subtitle {
      color: var(--t-text-hint);
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
    }

    .insight-body {
      flex: 1;
      min-height: 0;
    }

    .diagnostic-list {
      display: grid;
      gap: 10px;
      font-size: 12px;
    }

    .diagnostic-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--t-input-bg);
      border: 1px solid var(--t-input-border);
    }

    .diagnostic-label {
      color: var(--t-text-sec);
      font-weight: 700;
    }

    .diagnostic-value {
      color: var(--t-text);
      font-weight: 800;
      text-align: right;
    }

    .room-tabs {
      display: flex;
      gap: 40px;
      margin-bottom: 8px;
      border-bottom: 1px solid var(--t-divider);
    }

    .room-tab {
      font-size: 15px;
      font-weight: 800;
      color: var(--t-text-hint);
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      padding: 12px 0;
    }

    .room-tab.active {
      color: var(--t-text);
    }

    .room-tab.active::after {
      content: '';
      position: absolute;
      bottom: 0; left: -4px; right: -4px;
      height: 4px;
      background: var(--ai-cyan);
      border-radius: 99px;
      box-shadow: 0 0 15px var(--ai-cyan);
    }

    .category-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-label {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--t-text-hint);
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      margin-left: 4px;
    }

    .device-grid-orb {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      grid-auto-rows: 148px;
      gap: 14px;
    }

    .scene-grid-orb {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      grid-auto-rows: 56px; /* 场景按钮横向排布，高度 56px */
      gap: 12px;
    }

    .icon-main { 
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
    }

    .loader {
      width: 20px; height: 20px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top: 3px solid var(--glass-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    @keyframes scan {
      0% { transform: translateY(-100%); opacity: 0; }
      50% { opacity: 0.5; }
      100% { transform: translateY(100%); opacity: 0; }
    }

      .scanning-line {
        position: absolute;
        top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg, transparent, var(--glass-ai), transparent);
        animation: scan 3s linear infinite;
        z-index: 5;
        pointer-events: none;
      }

      .voice {
      grid-area: voice;
      display: flex;
      align-items: center;
      padding: 0 32px;
      background: var(--t-voicebar);
      border-top: 1px solid var(--t-divider);
      justify-content: space-between;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .voice-interactive-zone {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
    }

    .always-on-btn {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid var(--t-input-border);
      background: var(--t-input-bg);
      color: var(--t-text-sec);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      margin-left: 12px;
    }
    .always-on-btn .icon-main {
      font-size: 18px;
    }
    .always-on-btn:hover {
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.8);
    }
    .always-on-btn.active {
      background: linear-gradient(135deg, var(--ai-purple), var(--ai-cyan));
      border-color: transparent;
      color: white;
      box-shadow: 0 0 12px rgba(100, 181, 246, 0.5);
      animation: pulse-ring 2s ease-in-out infinite;
    }
    @keyframes pulse-ring {
      0%, 100% { box-shadow: 0 0 12px rgba(100,181,246,0.5); }
      50% { box-shadow: 0 0 20px rgba(100,181,246,0.9), 0 0 36px rgba(100,181,246,0.3); }
    }

    .action-notice {
      position: absolute;
      right: 28px;
      bottom: calc(var(--voicebar-height) + 22px);
      z-index: 25;
      max-width: min(420px, calc(100vw - 32px));
      padding: 12px 16px;
      border-radius: 16px;
      background: rgba(10, 12, 20, 0.88);
      border: 1px solid rgba(130, 177, 255, 0.32);
      color: var(--t-text);
      box-shadow: 0 16px 48px rgba(0,0,0,0.36);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      font-size: 13px;
      font-weight: 800;
      line-height: 1.45;
      word-break: break-word;
    }

    .action-notice.error {
      border-color: rgba(255, 82, 82, 0.38);
      background: rgba(40, 14, 18, 0.9);
      color: #ffd7d7;
    }

    .action-notice.success {
      border-color: rgba(92, 219, 149, 0.42);
      background: rgba(12, 42, 30, 0.92);
      color: #d7ffe8;
    }

    .action-notice.warning {
      border-color: rgba(255, 193, 7, 0.42);
      background: rgba(48, 35, 8, 0.92);
      color: #fff0bd;
    }

    .receipt-engineering {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 11px;
      font-weight: 600;
      color: inherit;
    }

    .receipt-engineering summary {
      cursor: pointer;
      font-weight: 800;
    }

    .receipt-engineering dl {
      display: grid;
      grid-template-columns: max-content minmax(0, 1fr);
      gap: 5px 10px;
      margin: 8px 0 0;
    }

    .receipt-engineering dt { opacity: 0.65; }
    .receipt-engineering dd {
      min-width: 0;
      margin: 0;
      overflow-wrap: anywhere;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    /* 关键事件弹窗样式 */
      .critical-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }

      .critical-card {
        width: 640px;
        background: var(--t-detail-bg, #0a0c14);
        border: 1px solid rgba(255, 82, 82, 0.3);
        border-radius: 40px;
        padding: 32px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255, 82, 82, 0.15);
        animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      @keyframes scaleUp {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .critical-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .critical-btn:active {
        transform: scale(0.96);
      }

    .detail-card {
      width: 520px;
      background: #0a0c14;
      border: 1px solid var(--glass-border);
        border-radius: 40px;
        padding: 32px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.8);
      animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .confirmation-card {
      width: min(520px, calc(100vw - 40px));
      background: var(--t-detail-bg, #0a0c14);
      border: 1px solid rgba(179, 136, 255, 0.24);
      border-radius: 32px;
      padding: 28px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(179, 136, 255, 0.12);
      animation: scaleUp 0.3s ease;
    }

    .confirmation-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(179, 136, 255, 0.12);
      border: 1px solid rgba(179, 136, 255, 0.24);
      color: var(--glass-ai);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.4px;
    }

    .confirmation-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .confirmation-btn {
      min-width: 116px;
      height: 44px;
      border-radius: 14px;
      border: 1px solid var(--t-input-border);
      background: var(--t-input-bg);
      color: var(--t-text);
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }

    .confirmation-btn.primary {
      border-color: rgba(179, 136, 255, 0.34);
      background: linear-gradient(135deg, rgba(179, 136, 255, 0.24), rgba(0, 229, 255, 0.18));
    }

    .confirmation-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      @media (max-width: 920px) {
        :host {
          --sidebar-width: 240px;
        }

        .insights-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        :host {
          --topbar-height: auto;
          --voicebar-height: 64px;
          overflow: hidden;
        }

        .container {
          grid-template-areas:
            "topbar"
            "sidebar"
            "main"
            "voice";
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto 180px minmax(0, 1fr) var(--voicebar-height);
          width: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .sidebar {
          padding: 12px 16px;
          border-right: 0;
          border-bottom: 1px solid var(--t-divider);
        }

        .ai-brain-module {
          gap: 10px;
        }

        .topbar {
          align-items: flex-start;
          gap: 10px;
          padding: 10px 16px;
          flex-wrap: wrap;
        }

        .main {
          min-width: 0;
        }

        .room-content {
          padding: 16px;
          gap: 22px;
        }

        .room-tabs {
          gap: 22px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .room-tabs::-webkit-scrollbar { display: none; }

        .device-grid-orb {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 132px;
          gap: 10px;
        }

        .scene-grid-orb {
          grid-template-columns: 1fr;
        }

        .insight-card {
          min-height: 196px;
          border-radius: 20px;
          padding: 14px;
        }

        .voice {
          padding: 0 12px;
        }

        .action-notice {
          left: 16px;
          right: 16px;
          bottom: calc(var(--voicebar-height) + 12px);
          max-width: none;
        }

        .critical-card,
        .detail-card {
          width: min(92vw, 520px);
          max-height: 86vh;
          overflow: auto;
          border-radius: 24px;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    `];D([I()],P.prototype,"activeRoomId",2);D([I()],P.prototype,"aiState",2);D([I()],P.prototype,"devices",2);D([I()],P.prototype,"energyStats",2);D([I()],P.prototype,"frigateEvents",2);D([I()],P.prototype,"criticalEvent",2);D([I()],P.prototype,"activeDetailEntity",2);D([I()],P.prototype,"isRecording",2);D([I()],P.prototype,"isConnected",2);D([I()],P.prototype,"isConfiguring",2);D([I()],P.prototype,"connectionError",2);D([I()],P.prototype,"isPairingStep",2);D([I()],P.prototype,"gatewayBase",2);D([I()],P.prototype,"screenToken",2);D([I()],P.prototype,"pairingCode",2);D([I()],P.prototype,"authUrl",2);D([I()],P.prototype,"qrDataUrl",2);D([I()],P.prototype,"isPairing",2);D([I()],P.prototype,"voiceText",2);D([I()],P.prototype,"voiceReply",2);D([I()],P.prototype,"waveData",2);D([I()],P.prototype,"pipelineStage",2);D([I()],P.prototype,"theme",2);D([I()],P.prototype,"actionNotice",2);D([I()],P.prototype,"pendingDeviceControlConfirmation",2);D([I()],P.prototype,"isConfirmingDeviceControl",2);D([I()],P.prototype,"alwaysOnEnabled",2);D([I()],P.prototype,"rooms",2);D([I()],P.prototype,"scenes",2);D([I()],P.prototype,"probeStatus",2);P=D([z("smart-app-shell")],P);
