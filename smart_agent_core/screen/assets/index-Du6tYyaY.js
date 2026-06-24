/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=globalThis,Te=Mt.ShadowRoot&&(Mt.ShadyCSS===void 0||Mt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Re=Symbol(),Ue=new WeakMap;let Ti=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Te&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Ue.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ue.set(e,t))}return t}toString(){return this.cssText}};const Yi=s=>new Ti(typeof s=="string"?s:s+"",void 0,Re),B=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new Ti(e,s,Re)},Xi=(s,t)=>{if(Te)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),n=Mt.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}},je=Te?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Yi(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qi,defineProperty:Zi,getOwnPropertyDescriptor:ts,getOwnPropertyNames:es,getOwnPropertySymbols:is,getPrototypeOf:ss}=Object,J=globalThis,We=J.trustedTypes,ns=We?We.emptyScript:"",Zt=J.reactiveElementPolyfillSupport,_t=(s,t)=>s,Dt={toAttribute(s,t){switch(t){case Boolean:s=s?ns:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ie=(s,t)=>!Qi(s,t),He={attribute:!0,type:String,converter:Dt,reflect:!1,useDefault:!1,hasChanged:Ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),J.litPropertyMetadata??(J.litPropertyMetadata=new WeakMap);let nt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=He){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);n!==void 0&&Zi(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=ts(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){const l=n==null?void 0:n.call(this);r==null||r.call(this,o),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??He}static _$Ei(){if(this.hasOwnProperty(_t("elementProperties")))return;const t=ss(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_t("properties"))){const e=this.properties,i=[...es(e),...is(e)];for(const n of i)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,n]of e)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const n=this._$Eu(e,i);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)e.unshift(je(n))}else t!==void 0&&e.push(je(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:Dt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var r,o;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const l=i.getPropertyOptions(n),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:Dt;this._$Em=n;const d=a.fromAttribute(e,l.type);this[n]=d??((o=this._$Ej)==null?void 0:o.get(n))??d,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){var o;if(t!==void 0){const l=this.constructor;if(n===!1&&(r=this[t]),i??(i=l.getPropertyOptions(t)),!((i.hasChanged??Ie)(r,e)||i.useDefault&&i.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[r,o]of n){const{wrapped:l}=o,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(n=>{var r;return(r=n.hostUpdate)==null?void 0:r.call(n)}),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};nt.elementStyles=[],nt.shadowRootOptions={mode:"open"},nt[_t("elementProperties")]=new Map,nt[_t("finalized")]=new Map,Zt==null||Zt({ReactiveElement:nt}),(J.reactiveElementVersions??(J.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,qe=s=>s,Ot=bt.trustedTypes,Ve=Ot?Ot.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ri="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,Ii="?"+G,rs=`<${Ii}>`,Q=document,xt=()=>Q.createComment(""),wt=s=>s===null||typeof s!="object"&&typeof s!="function",Me=Array.isArray,os=s=>Me(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",te=`[ 	
\f\r]`,mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ge=/-->/g,Je=/>/g,K=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ke=/'/g,Ye=/"/g,Mi=/^(?:script|style|textarea|title)$/i,as=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),g=as(1),lt=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Xe=new WeakMap,Y=Q.createTreeWalker(Q,129);function Di(s,t){if(!Me(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ve!==void 0?Ve.createHTML(t):t}const ls=(s,t)=>{const e=s.length-1,i=[];let n,r=t===2?"<svg>":t===3?"<math>":"",o=mt;for(let l=0;l<e;l++){const a=s[l];let d,h,c=-1,u=0;for(;u<a.length&&(o.lastIndex=u,h=o.exec(a),h!==null);)u=o.lastIndex,o===mt?h[1]==="!--"?o=Ge:h[1]!==void 0?o=Je:h[2]!==void 0?(Mi.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=K):h[3]!==void 0&&(o=K):o===K?h[0]===">"?(o=n??mt,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?K:h[3]==='"'?Ye:Ke):o===Ye||o===Ke?o=K:o===Ge||o===Je?o=mt:(o=K,n=void 0);const p=o===K&&s[l+1].startsWith("/>")?" ":"";r+=o===mt?a+rs:c>=0?(i.push(d),a.slice(0,c)+Ri+a.slice(c)+G+p):a+G+(c===-2?l:p)}return[Di(s,r+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Et{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[d,h]=ls(t,e);if(this.el=Et.createElement(d,i),Y.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=Y.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const c of n.getAttributeNames())if(c.endsWith(Ri)){const u=h[o++],p=n.getAttribute(c).split(G),v=/([.?@])?(.*)/.exec(u);a.push({type:1,index:r,name:v[2],strings:p,ctor:v[1]==="."?ds:v[1]==="?"?hs:v[1]==="@"?us:Ht}),n.removeAttribute(c)}else c.startsWith(G)&&(a.push({type:6,index:r}),n.removeAttribute(c));if(Mi.test(n.tagName)){const c=n.textContent.split(G),u=c.length-1;if(u>0){n.textContent=Ot?Ot.emptyScript:"";for(let p=0;p<u;p++)n.append(c[p],xt()),Y.nextNode(),a.push({type:2,index:++r});n.append(c[u],xt())}}}else if(n.nodeType===8)if(n.data===Ii)a.push({type:2,index:r});else{let c=-1;for(;(c=n.data.indexOf(G,c+1))!==-1;)a.push({type:7,index:r}),c+=G.length-1}r++}}static createElement(t,e){const i=Q.createElement("template");return i.innerHTML=t,i}}function ct(s,t,e=s,i){var o,l;if(t===lt)return t;let n=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const r=wt(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==r&&((l=n==null?void 0:n._$AO)==null||l.call(n,!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=n:e._$Cl=n),n!==void 0&&(t=ct(s,n._$AS(s,t.values),n,i)),t}class cs{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=((t==null?void 0:t.creationScope)??Q).importNode(e,!0);Y.currentNode=n;let r=Y.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Pt(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new ps(r,this,t)),this._$AV.push(d),a=i[++l]}o!==(a==null?void 0:a.index)&&(r=Y.nextNode(),o++)}return Y.currentNode=Q,n}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ct(this,t,e),wt(t)?t===F||t==null||t===""?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==lt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):os(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&wt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Q.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Et.createElement(Di(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===n)this._$AH.p(e);else{const o=new cs(n,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Xe.get(t.strings);return e===void 0&&Xe.set(t.strings,e=new Et(t)),e}k(t){Me(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new Pt(this.O(xt()),this.O(xt()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const n=qe(t).nextSibling;qe(t).remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ht{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,n){const r=this.strings;let o=!1;if(r===void 0)t=ct(this,t,e,0),o=!wt(t)||t!==this._$AH&&t!==lt,o&&(this._$AH=t);else{const l=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=ct(this,l[i+a],e,a),d===lt&&(d=this._$AH[a]),o||(o=!wt(d)||d!==this._$AH[a]),d===F?t=F:t!==F&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!n&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ds extends Ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class hs extends Ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class us extends Ht{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=ct(this,t,e,0)??F)===lt)return;const i=this._$AH,n=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class ps{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ct(this,t)}}const ee=bt.litHtmlPolyfillSupport;ee==null||ee(Et,Pt),(bt.litHtmlVersions??(bt.litHtmlVersions=[])).push("3.3.2");const gs=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let n=i._$litPart$;if(n===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=n=new Pt(t.insertBefore(xt(),r),r,void 0,e??{})}return n._$AI(s),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=globalThis;class D extends nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return lt}}var Pi;D._$litElement$=!0,D.finalized=!0,(Pi=X.litElementHydrateSupport)==null||Pi.call(X,{LitElement:D});const ie=X.litElementPolyfillSupport;ie==null||ie({LitElement:D});(X.litElementVersions??(X.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fs={attribute:!0,type:String,converter:Dt,reflect:!1,hasChanged:Ie},ms=(s=fs,t,e)=>{const{kind:i,metadata:n}=e;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),i==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,s,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,s,l),l}}}if(i==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,s,!0,l)}}throw Error("Unsupported decorator location: "+i)};function T(s){return(t,e)=>typeof e=="object"?ms(s,t,e):((i,n,r)=>{const o=n.hasOwnProperty(r);return n.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(n,r):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(s){return T({...s,state:!0,attribute:!1})}function vs(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var st={},se,Qe;function _s(){return Qe||(Qe=1,se=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),se}var ne={},V={},Ze;function tt(){if(Ze)return V;Ze=1;let s;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return V.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},V.getSymbolTotalCodewords=function(i){return t[i]},V.getBCHDigit=function(e){let i=0;for(;e!==0;)i++,e>>>=1;return i},V.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');s=i},V.isKanjiModeEnabled=function(){return typeof s<"u"},V.toSJIS=function(i){return s(i)},V}var re={},ti;function De(){return ti||(ti=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+e)}}s.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},s.from=function(i,n){if(s.isValid(i))return i;try{return t(i)}catch{return n}}})(re)),re}var oe,ei;function bs(){if(ei)return oe;ei=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},oe=s,oe}var ae,ii;function ys(){if(ii)return ae;ii=1;function s(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return s.prototype.set=function(t,e,i,n){const r=t*this.size+e;this.data[r]=i,n&&(this.reservedBit[r]=!0)},s.prototype.get=function(t,e){return this.data[t*this.size+e]},s.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},s.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},ae=s,ae}var le={},si;function xs(){return si||(si=1,(function(s){const t=tt().getSymbolSize;s.getRowColCoords=function(i){if(i===1)return[];const n=Math.floor(i/7)+2,r=t(i),o=r===145?26:Math.ceil((r-13)/(2*n-2))*2,l=[r-7];for(let a=1;a<n-1;a++)l[a]=l[a-1]-o;return l.push(6),l.reverse()},s.getPositions=function(i){const n=[],r=s.getRowColCoords(i),o=r.length;for(let l=0;l<o;l++)for(let a=0;a<o;a++)l===0&&a===0||l===0&&a===o-1||l===o-1&&a===0||n.push([r[l],r[a]]);return n}})(le)),le}var ce={},ni;function ws(){if(ni)return ce;ni=1;const s=tt().getSymbolSize,t=7;return ce.getPositions=function(i){const n=s(i);return[[0,0],[n-t,0],[0,n-t]]},ce}var de={},ri;function Es(){return ri||(ri=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};s.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},s.from=function(n){return s.isValid(n)?parseInt(n,10):void 0},s.getPenaltyN1=function(n){const r=n.size;let o=0,l=0,a=0,d=null,h=null;for(let c=0;c<r;c++){l=a=0,d=h=null;for(let u=0;u<r;u++){let p=n.get(c,u);p===d?l++:(l>=5&&(o+=t.N1+(l-5)),d=p,l=1),p=n.get(u,c),p===h?a++:(a>=5&&(o+=t.N1+(a-5)),h=p,a=1)}l>=5&&(o+=t.N1+(l-5)),a>=5&&(o+=t.N1+(a-5))}return o},s.getPenaltyN2=function(n){const r=n.size;let o=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const d=n.get(l,a)+n.get(l,a+1)+n.get(l+1,a)+n.get(l+1,a+1);(d===4||d===0)&&o++}return o*t.N2},s.getPenaltyN3=function(n){const r=n.size;let o=0,l=0,a=0;for(let d=0;d<r;d++){l=a=0;for(let h=0;h<r;h++)l=l<<1&2047|n.get(d,h),h>=10&&(l===1488||l===93)&&o++,a=a<<1&2047|n.get(h,d),h>=10&&(a===1488||a===93)&&o++}return o*t.N3},s.getPenaltyN4=function(n){let r=0;const o=n.data.length;for(let a=0;a<o;a++)r+=n.data[a];return Math.abs(Math.ceil(r*100/o/5)-10)*t.N4};function e(i,n,r){switch(i){case s.Patterns.PATTERN000:return(n+r)%2===0;case s.Patterns.PATTERN001:return n%2===0;case s.Patterns.PATTERN010:return r%3===0;case s.Patterns.PATTERN011:return(n+r)%3===0;case s.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2===0;case s.Patterns.PATTERN101:return n*r%2+n*r%3===0;case s.Patterns.PATTERN110:return(n*r%2+n*r%3)%2===0;case s.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}s.applyMask=function(n,r){const o=r.size;for(let l=0;l<o;l++)for(let a=0;a<o;a++)r.isReserved(a,l)||r.xor(a,l,e(n,a,l))},s.getBestMask=function(n,r){const o=Object.keys(s.Patterns).length;let l=0,a=1/0;for(let d=0;d<o;d++){r(d),s.applyMask(d,n);const h=s.getPenaltyN1(n)+s.getPenaltyN2(n)+s.getPenaltyN3(n)+s.getPenaltyN4(n);s.applyMask(d,n),h<a&&(a=h,l=d)}return l}})(de)),de}var It={},oi;function Oi(){if(oi)return It;oi=1;const s=De(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return It.getBlocksCount=function(n,r){switch(r){case s.L:return t[(n-1)*4+0];case s.M:return t[(n-1)*4+1];case s.Q:return t[(n-1)*4+2];case s.H:return t[(n-1)*4+3];default:return}},It.getTotalCodewordsCount=function(n,r){switch(r){case s.L:return e[(n-1)*4+0];case s.M:return e[(n-1)*4+1];case s.Q:return e[(n-1)*4+2];case s.H:return e[(n-1)*4+3];default:return}},It}var he={},vt={},ai;function Ss(){if(ai)return vt;ai=1;const s=new Uint8Array(512),t=new Uint8Array(256);return(function(){let i=1;for(let n=0;n<255;n++)s[n]=i,t[i]=n,i<<=1,i&256&&(i^=285);for(let n=255;n<512;n++)s[n]=s[n-255]})(),vt.log=function(i){if(i<1)throw new Error("log("+i+")");return t[i]},vt.exp=function(i){return s[i]},vt.mul=function(i,n){return i===0||n===0?0:s[t[i]+t[n]]},vt}var li;function As(){return li||(li=1,(function(s){const t=Ss();s.mul=function(i,n){const r=new Uint8Array(i.length+n.length-1);for(let o=0;o<i.length;o++)for(let l=0;l<n.length;l++)r[o+l]^=t.mul(i[o],n[l]);return r},s.mod=function(i,n){let r=new Uint8Array(i);for(;r.length-n.length>=0;){const o=r[0];for(let a=0;a<n.length;a++)r[a]^=t.mul(n[a],o);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},s.generateECPolynomial=function(i){let n=new Uint8Array([1]);for(let r=0;r<i;r++)n=s.mul(n,new Uint8Array([1,t.exp(r)]));return n}})(he)),he}var ue,ci;function $s(){if(ci)return ue;ci=1;const s=As();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(i){this.degree=i,this.genPoly=s.generateECPolynomial(this.degree)},t.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(i.length+this.degree);n.set(i);const r=s.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){const l=new Uint8Array(this.degree);return l.set(r,o),l}return r},ue=t,ue}var pe={},ge={},fe={},di;function Bi(){return di||(di=1,fe.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),fe}var U={},hi;function zi(){if(hi)return U;hi=1;const s="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;U.KANJI=new RegExp(e,"g"),U.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),U.BYTE=new RegExp(i,"g"),U.NUMERIC=new RegExp(s,"g"),U.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+e+"$"),r=new RegExp("^"+s+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return U.testKanji=function(a){return n.test(a)},U.testNumeric=function(a){return r.test(a)},U.testAlphanumeric=function(a){return o.test(a)},U}var ui;function et(){return ui||(ui=1,(function(s){const t=Bi(),e=zi();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(r,o){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?r.ccBits[0]:o<27?r.ccBits[1]:r.ccBits[2]},s.getBestModeForData=function(r){return e.testNumeric(r)?s.NUMERIC:e.testAlphanumeric(r)?s.ALPHANUMERIC:e.testKanji(r)?s.KANJI:s.BYTE},s.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},s.isValid=function(r){return r&&r.bit&&r.ccBits};function i(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+n)}}s.from=function(r,o){if(s.isValid(r))return r;try{return i(r)}catch{return o}}})(ge)),ge}var pi;function Cs(){return pi||(pi=1,(function(s){const t=tt(),e=Oi(),i=De(),n=et(),r=Bi(),o=7973,l=t.getBCHDigit(o);function a(u,p,v){for(let k=1;k<=40;k++)if(p<=s.getCapacity(k,v,u))return k}function d(u,p){return n.getCharCountIndicator(u,p)+4}function h(u,p){let v=0;return u.forEach(function(k){const O=d(k.mode,p);v+=O+k.getBitsLength()}),v}function c(u,p){for(let v=1;v<=40;v++)if(h(u,v)<=s.getCapacity(v,p,n.MIXED))return v}s.from=function(p,v){return r.isValid(p)?parseInt(p,10):v},s.getCapacity=function(p,v,k){if(!r.isValid(p))throw new Error("Invalid QR Code version");typeof k>"u"&&(k=n.BYTE);const O=t.getSymbolTotalCodewords(p),A=e.getTotalCodewordsCount(p,v),P=(O-A)*8;if(k===n.MIXED)return P;const $=P-d(k,p);switch(k){case n.NUMERIC:return Math.floor($/10*3);case n.ALPHANUMERIC:return Math.floor($/11*2);case n.KANJI:return Math.floor($/13);case n.BYTE:default:return Math.floor($/8)}},s.getBestVersionForData=function(p,v){let k;const O=i.from(v,i.M);if(Array.isArray(p)){if(p.length>1)return c(p,O);if(p.length===0)return 1;k=p[0]}else k=p;return a(k.mode,k.getLength(),O)},s.getEncodedBits=function(p){if(!r.isValid(p)||p<7)throw new Error("Invalid QR Code version");let v=p<<12;for(;t.getBCHDigit(v)-l>=0;)v^=o<<t.getBCHDigit(v)-l;return p<<12|v}})(pe)),pe}var me={},gi;function ks(){if(gi)return me;gi=1;const s=tt(),t=1335,e=21522,i=s.getBCHDigit(t);return me.getEncodedBits=function(r,o){const l=r.bit<<3|o;let a=l<<10;for(;s.getBCHDigit(a)-i>=0;)a^=t<<s.getBCHDigit(a)-i;return(l<<10|a)^e},me}var ve={},_e,fi;function Ps(){if(fi)return _e;fi=1;const s=et();function t(e){this.mode=s.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(i){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),i.put(o,10);const l=this.data.length-n;l>0&&(r=this.data.substr(n),o=parseInt(r,10),i.put(o,l*3+1))},_e=t,_e}var be,mi;function Ts(){if(mi)return be;mi=1;const s=et(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(i){this.mode=s.ALPHANUMERIC,this.data=i}return e.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let r;for(r=0;r+2<=this.data.length;r+=2){let o=t.indexOf(this.data[r])*45;o+=t.indexOf(this.data[r+1]),n.put(o,11)}this.data.length%2&&n.put(t.indexOf(this.data[r]),6)},be=e,be}var ye,vi;function Rs(){if(vi)return ye;vi=1;const s=et();function t(e){this.mode=s.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(i){return i*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let i=0,n=this.data.length;i<n;i++)e.put(this.data[i],8)},ye=t,ye}var xe,_i;function Is(){if(_i)return xe;_i=1;const s=et(),t=tt();function e(i){this.mode=s.KANJI,this.data=i}return e.getBitsLength=function(n){return n*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let n;for(n=0;n<this.data.length;n++){let r=t.toSJIS(this.data[n]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),i.put(r,13)}},xe=e,xe}var we={exports:{}},bi;function Ms(){return bi||(bi=1,(function(s){var t={single_source_shortest_paths:function(e,i,n){var r={},o={};o[i]=0;var l=t.PriorityQueue.make();l.push(i,0);for(var a,d,h,c,u,p,v,k,O;!l.empty();){a=l.pop(),d=a.value,c=a.cost,u=e[d]||{};for(h in u)u.hasOwnProperty(h)&&(p=u[h],v=c+p,k=o[h],O=typeof o[h]>"u",(O||k>v)&&(o[h]=v,l.push(h,v),r[h]=d))}if(typeof n<"u"&&typeof o[n]>"u"){var A=["Could not find a path from ",i," to ",n,"."].join("");throw new Error(A)}return r},extract_shortest_path_from_predecessor_list:function(e,i){for(var n=[],r=i;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,i,n){var r=t.single_source_shortest_paths(e,i,n);return t.extract_shortest_path_from_predecessor_list(r,n)},PriorityQueue:{make:function(e){var i=t.PriorityQueue,n={},r;e=e||{};for(r in i)i.hasOwnProperty(r)&&(n[r]=i[r]);return n.queue=[],n.sorter=e.sorter||i.default_sorter,n},default_sorter:function(e,i){return e.cost-i.cost},push:function(e,i){var n={value:e,cost:i};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=t})(we)),we.exports}var yi;function Ds(){return yi||(yi=1,(function(s){const t=et(),e=Ps(),i=Ts(),n=Rs(),r=Is(),o=zi(),l=tt(),a=Ms();function d(A){return unescape(encodeURIComponent(A)).length}function h(A,P,$){const E=[];let N;for(;(N=A.exec($))!==null;)E.push({data:N[0],index:N.index,mode:P,length:N[0].length});return E}function c(A){const P=h(o.NUMERIC,t.NUMERIC,A),$=h(o.ALPHANUMERIC,t.ALPHANUMERIC,A);let E,N;return l.isKanjiModeEnabled()?(E=h(o.BYTE,t.BYTE,A),N=h(o.KANJI,t.KANJI,A)):(E=h(o.BYTE_KANJI,t.BYTE,A),N=[]),P.concat($,E,N).sort(function(x,y){return x.index-y.index}).map(function(x){return{data:x.data,mode:x.mode,length:x.length}})}function u(A,P){switch(P){case t.NUMERIC:return e.getBitsLength(A);case t.ALPHANUMERIC:return i.getBitsLength(A);case t.KANJI:return r.getBitsLength(A);case t.BYTE:return n.getBitsLength(A)}}function p(A){return A.reduce(function(P,$){const E=P.length-1>=0?P[P.length-1]:null;return E&&E.mode===$.mode?(P[P.length-1].data+=$.data,P):(P.push($),P)},[])}function v(A){const P=[];for(let $=0;$<A.length;$++){const E=A[$];switch(E.mode){case t.NUMERIC:P.push([E,{data:E.data,mode:t.ALPHANUMERIC,length:E.length},{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.ALPHANUMERIC:P.push([E,{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.KANJI:P.push([E,{data:E.data,mode:t.BYTE,length:d(E.data)}]);break;case t.BYTE:P.push([{data:E.data,mode:t.BYTE,length:d(E.data)}])}}return P}function k(A,P){const $={},E={start:{}};let N=["start"];for(let m=0;m<A.length;m++){const x=A[m],y=[];for(let f=0;f<x.length;f++){const S=x[f],_=""+m+f;y.push(_),$[_]={node:S,lastCount:0},E[_]={};for(let w=0;w<N.length;w++){const b=N[w];$[b]&&$[b].node.mode===S.mode?(E[b][_]=u($[b].lastCount+S.length,S.mode)-u($[b].lastCount,S.mode),$[b].lastCount+=S.length):($[b]&&($[b].lastCount=S.length),E[b][_]=u(S.length,S.mode)+4+t.getCharCountIndicator(S.mode,P))}}N=y}for(let m=0;m<N.length;m++)E[N[m]].end=0;return{map:E,table:$}}function O(A,P){let $;const E=t.getBestModeForData(A);if($=t.from(P,E),$!==t.BYTE&&$.bit<E.bit)throw new Error('"'+A+'" cannot be encoded with mode '+t.toString($)+`.
 Suggested mode is: `+t.toString(E));switch($===t.KANJI&&!l.isKanjiModeEnabled()&&($=t.BYTE),$){case t.NUMERIC:return new e(A);case t.ALPHANUMERIC:return new i(A);case t.KANJI:return new r(A);case t.BYTE:return new n(A)}}s.fromArray=function(P){return P.reduce(function($,E){return typeof E=="string"?$.push(O(E,null)):E.data&&$.push(O(E.data,E.mode)),$},[])},s.fromString=function(P,$){const E=c(P,l.isKanjiModeEnabled()),N=v(E),m=k(N,$),x=a.find_path(m.map,"start","end"),y=[];for(let f=1;f<x.length-1;f++)y.push(m.table[x[f]].node);return s.fromArray(p(y))},s.rawSplit=function(P){return s.fromArray(c(P,l.isKanjiModeEnabled()))}})(ve)),ve}var xi;function Os(){if(xi)return ne;xi=1;const s=tt(),t=De(),e=bs(),i=ys(),n=xs(),r=ws(),o=Es(),l=Oi(),a=$s(),d=Cs(),h=ks(),c=et(),u=Ds();function p(m,x){const y=m.size,f=r.getPositions(x);for(let S=0;S<f.length;S++){const _=f[S][0],w=f[S][1];for(let b=-1;b<=7;b++)if(!(_+b<=-1||y<=_+b))for(let C=-1;C<=7;C++)w+C<=-1||y<=w+C||(b>=0&&b<=6&&(C===0||C===6)||C>=0&&C<=6&&(b===0||b===6)||b>=2&&b<=4&&C>=2&&C<=4?m.set(_+b,w+C,!0,!0):m.set(_+b,w+C,!1,!0))}}function v(m){const x=m.size;for(let y=8;y<x-8;y++){const f=y%2===0;m.set(y,6,f,!0),m.set(6,y,f,!0)}}function k(m,x){const y=n.getPositions(x);for(let f=0;f<y.length;f++){const S=y[f][0],_=y[f][1];for(let w=-2;w<=2;w++)for(let b=-2;b<=2;b++)w===-2||w===2||b===-2||b===2||w===0&&b===0?m.set(S+w,_+b,!0,!0):m.set(S+w,_+b,!1,!0)}}function O(m,x){const y=m.size,f=d.getEncodedBits(x);let S,_,w;for(let b=0;b<18;b++)S=Math.floor(b/3),_=b%3+y-8-3,w=(f>>b&1)===1,m.set(S,_,w,!0),m.set(_,S,w,!0)}function A(m,x,y){const f=m.size,S=h.getEncodedBits(x,y);let _,w;for(_=0;_<15;_++)w=(S>>_&1)===1,_<6?m.set(_,8,w,!0):_<8?m.set(_+1,8,w,!0):m.set(f-15+_,8,w,!0),_<8?m.set(8,f-_-1,w,!0):_<9?m.set(8,15-_-1+1,w,!0):m.set(8,15-_-1,w,!0);m.set(f-8,8,1,!0)}function P(m,x){const y=m.size;let f=-1,S=y-1,_=7,w=0;for(let b=y-1;b>0;b-=2)for(b===6&&b--;;){for(let C=0;C<2;C++)if(!m.isReserved(S,b-C)){let q=!1;w<x.length&&(q=(x[w]>>>_&1)===1),m.set(S,b-C,q),_--,_===-1&&(w++,_=7)}if(S+=f,S<0||y<=S){S-=f,f=-f;break}}}function $(m,x,y){const f=new e;y.forEach(function(C){f.put(C.mode.bit,4),f.put(C.getLength(),c.getCharCountIndicator(C.mode,m)),C.write(f)});const S=s.getSymbolTotalCodewords(m),_=l.getTotalCodewordsCount(m,x),w=(S-_)*8;for(f.getLengthInBits()+4<=w&&f.put(0,4);f.getLengthInBits()%8!==0;)f.putBit(0);const b=(w-f.getLengthInBits())/8;for(let C=0;C<b;C++)f.put(C%2?17:236,8);return E(f,m,x)}function E(m,x,y){const f=s.getSymbolTotalCodewords(x),S=l.getTotalCodewordsCount(x,y),_=f-S,w=l.getBlocksCount(x,y),b=f%w,C=w-b,q=Math.floor(f/w),ft=Math.floor(_/w),Gi=ft+1,Ne=q-ft,Ji=new a(Ne);let Kt=0;const Rt=new Array(w),Fe=new Array(w);let Yt=0;const Ki=new Uint8Array(m.buffer);for(let it=0;it<w;it++){const Qt=it<C?ft:Gi;Rt[it]=Ki.slice(Kt,Kt+Qt),Fe[it]=Ji.encode(Rt[it]),Kt+=Qt,Yt=Math.max(Yt,Qt)}const Xt=new Uint8Array(f);let Le=0,j,W;for(j=0;j<Yt;j++)for(W=0;W<w;W++)j<Rt[W].length&&(Xt[Le++]=Rt[W][j]);for(j=0;j<Ne;j++)for(W=0;W<w;W++)Xt[Le++]=Fe[W][j];return Xt}function N(m,x,y,f){let S;if(Array.isArray(m))S=u.fromArray(m);else if(typeof m=="string"){let q=x;if(!q){const ft=u.rawSplit(m);q=d.getBestVersionForData(ft,y)}S=u.fromString(m,q||40)}else throw new Error("Invalid data");const _=d.getBestVersionForData(S,y);if(!_)throw new Error("The amount of data is too big to be stored in a QR Code");if(!x)x=_;else if(x<_)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+_+`.
`);const w=$(x,y,S),b=s.getSymbolSize(x),C=new i(b);return p(C,x),v(C),k(C,x),A(C,y,0),x>=7&&O(C,x),P(C,w),isNaN(f)&&(f=o.getBestMask(C,A.bind(null,C,y))),o.applyMask(f,C),A(C,y,f),{modules:C,version:x,errorCorrectionLevel:y,maskPattern:f,segments:S}}return ne.create=function(x,y){if(typeof x>"u"||x==="")throw new Error("No input text");let f=t.M,S,_;return typeof y<"u"&&(f=t.from(y.errorCorrectionLevel,t.M),S=d.from(y.version),_=o.from(y.maskPattern),y.toSJISFunc&&s.setToSJISFunction(y.toSJISFunc)),N(x,S,f,_)},ne}var Ee={},Se={},wi;function Ni(){return wi||(wi=1,(function(s){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let i=e.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+e);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(r){return[r,r]}))),i.length===6&&i.push("F","F");const n=parseInt(i.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+i.slice(0,6).join("")}}s.getOptions=function(i){i||(i={}),i.color||(i.color={});const n=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,r=i.width&&i.width>=21?i.width:void 0,o=i.scale||4;return{width:r,scale:r?4:o,margin:n,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},s.getScale=function(i,n){return n.width&&n.width>=i+n.margin*2?n.width/(i+n.margin*2):n.scale},s.getImageWidth=function(i,n){const r=s.getScale(i,n);return Math.floor((i+n.margin*2)*r)},s.qrToImageData=function(i,n,r){const o=n.modules.size,l=n.modules.data,a=s.getScale(o,r),d=Math.floor((o+r.margin*2)*a),h=r.margin*a,c=[r.color.light,r.color.dark];for(let u=0;u<d;u++)for(let p=0;p<d;p++){let v=(u*d+p)*4,k=r.color.light;if(u>=h&&p>=h&&u<d-h&&p<d-h){const O=Math.floor((u-h)/a),A=Math.floor((p-h)/a);k=c[l[O*o+A]?1:0]}i[v++]=k.r,i[v++]=k.g,i[v++]=k.b,i[v]=k.a}}})(Se)),Se}var Ei;function Bs(){return Ei||(Ei=1,(function(s){const t=Ni();function e(n,r,o){n.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(r,o,l){let a=l,d=o;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),o||(d=i()),a=t.getOptions(a);const h=t.getImageWidth(r.modules.size,a),c=d.getContext("2d"),u=c.createImageData(h,h);return t.qrToImageData(u.data,r,a),e(c,d,h),c.putImageData(u,0,0),d},s.renderToDataURL=function(r,o,l){let a=l;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),a||(a={});const d=s.render(r,o,a),h=a.type||"image/png",c=a.rendererOpts||{};return d.toDataURL(h,c.quality)}})(Ee)),Ee}var Ae={},Si;function zs(){if(Si)return Ae;Si=1;const s=Ni();function t(n,r){const o=n.a/255,l=r+'="'+n.hex+'"';return o<1?l+" "+r+'-opacity="'+o.toFixed(2).slice(1)+'"':l}function e(n,r,o){let l=n+r;return typeof o<"u"&&(l+=" "+o),l}function i(n,r,o){let l="",a=0,d=!1,h=0;for(let c=0;c<n.length;c++){const u=Math.floor(c%r),p=Math.floor(c/r);!u&&!d&&(d=!0),n[c]?(h++,c>0&&u>0&&n[c-1]||(l+=d?e("M",u+o,.5+p+o):e("m",a,0),a=0,d=!1),u+1<r&&n[c+1]||(l+=e("h",h),h=0)):a++}return l}return Ae.render=function(r,o,l){const a=s.getOptions(o),d=r.modules.size,h=r.modules.data,c=d+a.margin*2,u=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",p="<path "+t(a.color.dark,"stroke")+' d="'+i(h,d,a.margin)+'"/>',v='viewBox="0 0 '+c+" "+c+'"',O='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+v+' shape-rendering="crispEdges">'+u+p+`</svg>
`;return typeof l=="function"&&l(null,O),O},Ae}var Ai;function Ns(){if(Ai)return st;Ai=1;const s=_s(),t=Os(),e=Bs(),i=zs();function n(r,o,l,a,d){const h=[].slice.call(arguments,1),c=h.length,u=typeof h[c-1]=="function";if(!u&&!s())throw new Error("Callback required as last argument");if(u){if(c<2)throw new Error("Too few arguments provided");c===2?(d=l,l=o,o=a=void 0):c===3&&(o.getContext&&typeof d>"u"?(d=a,a=void 0):(d=a,a=l,l=o,o=void 0))}else{if(c<1)throw new Error("Too few arguments provided");return c===1?(l=o,o=a=void 0):c===2&&!o.getContext&&(a=l,l=o,o=void 0),new Promise(function(p,v){try{const k=t.create(l,a);p(r(k,o,a))}catch(k){v(k)}})}try{const p=t.create(l,a);d(null,r(p,o,a))}catch(p){d(p)}}return st.create=t.create,st.toCanvas=n.bind(null,e.render),st.toDataURL=n.bind(null,e.renderToDataURL),st.toString=n.bind(null,function(r,o,l){return i.render(r,l)}),st}var Fs=Ns();const Ls=vs(Fs);var Us=Object.defineProperty,js=Object.getOwnPropertyDescriptor,qt=(s,t,e,i)=>{for(var n=i>1?void 0:i?js(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Us(t,e,n),n};let dt=class extends D{constructor(){super(...arguments),this.variant="frosted",this.state="off",this.interactive=!1}render(){return g`
      <div
        class="card ${this.variant} ${this.interactive?"interactive":""}"
        data-state="${this.state}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};dt.styles=B`
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
  `;qt([T({type:String})],dt.prototype,"variant",2);qt([T({type:String})],dt.prototype,"state",2);qt([T({type:Boolean})],dt.prototype,"interactive",2);dt=qt([z("glass-card")],dt);var Ws=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,Fi=(s,t,e,i)=>{for(var n=i>1?void 0:i?Hs(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Ws(t,e,n),n};let Bt=class extends D{constructor(){super(...arguments),this.checked=!1}render(){return g`
      <div
        class="toggle"
        ?data-checked="${this.checked}"
        @click="${()=>{this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}}"
      >
        <div class="thumb"></div>
      </div>
    `}};Bt.styles=B`
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
  `;Fi([T({type:Boolean})],Bt.prototype,"checked",2);Bt=Fi([z("glass-toggle")],Bt);var qs=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Vt=(s,t,e,i)=>{for(var n=i>1?void 0:i?Vs(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&qs(t,e,n),n};let ht=class extends D{constructor(){super(...arguments),this.value=50,this.label="",this._isDragging=!1,this._handleMove=s=>{this._isDragging&&(s.cancelable&&s.preventDefault(),this._updateValue(s),this.dispatchEvent(new CustomEvent("input",{detail:this.value})))},this._handleEnd=()=>{this._isDragging&&(this._isDragging=!1,this.dispatchEvent(new CustomEvent("change",{detail:this.value}))),window.removeEventListener("mousemove",this._handleMove),window.removeEventListener("mouseup",this._handleEnd),window.removeEventListener("touchmove",this._handleMove),window.removeEventListener("touchend",this._handleEnd)}}render(){return g`
      <div class="container" @mousedown="${this._handleStart}" @touchstart="${this._handleStart}">
        <div class="track" id="track">
          <div class="fill" style="width: ${this.value}%"></div>
          <div class="thumb" style="left: ${this.value}%"></div>
        </div>
        <div class="value-display">${Math.round(this.value)}%</div>
      </div>
    `}_handleStart(s){this._isDragging=!0,this._updateValue(s);const t={passive:!1};window.addEventListener("mousemove",this._handleMove,t),window.addEventListener("mouseup",this._handleEnd,t),window.addEventListener("touchmove",this._handleMove,t),window.addEventListener("touchend",this._handleEnd,t)}_updateValue(s){const t=this.renderRoot.querySelector("#track");if(!t)return;const e=t.getBoundingClientRect(),i="touches"in s?s.touches[0].clientX:s.clientX,r=Math.max(0,Math.min(i-e.left,e.width))/e.width*100;this.value!==r&&(this.value=r)}};ht.styles=B`
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
  `;Vt([T({type:Number})],ht.prototype,"value",2);Vt([T({type:String})],ht.prototype,"label",2);Vt([I()],ht.prototype,"_isDragging",2);ht=Vt([z("glass-slider")],ht);var Gs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Oe=(s,t,e,i)=>{for(var n=i>1?void 0:i?Js(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Gs(t,e,n),n};let St=class extends D{constructor(){super(...arguments),this.rooms=[],this.activeRoom=""}render(){return g`
      <div class="nav-container">
        ${this.rooms.map(s=>g`
          <div
            class="nav-item"
            ?data-active="${this.activeRoom===s.id}"
            @click="${()=>this._selectRoom(s.id)}"
          >
            ${s.name}
          </div>
        `)}
      </div>
    `}_selectRoom(s){this.activeRoom=s,this.dispatchEvent(new CustomEvent("room-change",{detail:s}))}};St.styles=B`
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
  `;Oe([T({type:Array})],St.prototype,"rooms",2);Oe([T({type:String})],St.prototype,"activeRoom",2);St=Oe([z("glass-nav")],St);const gt=(s,t)=>{if(!s)return{light:"lightbulb",switch:"toggle_on",climate:"ac_unit",cover:"blinds",sensor:"sensors",binary_sensor:"sensors",scene:"scene",media_player:"play_circle",automation:"robot",fan:"fan"}[t||""]||"device_hub";const e=s.replace("mdi:","").replace(/-/g,"_"),i={white_balance_incandescent:"lightbulb",ceiling_light:"lightbulb",lamp:"lightbulb",wall_sconce:"lightbulb",floor_lamp:"lightbulb",led_strip:"lightbulb",weather_sunny:"sunny",weather_cloudy:"cloudy",weather_rainy:"rainy",weather_snowy:"snowy",thermometer:"thermostat",water_percent:"humidity_mid",motion_sensor:"motion_sensors",motion_sensor_off:"motion_sensors",shield_lock:"security",eye:"visibility",eye_outline:"visibility",eye_off:"visibility_off",eye_off_outline:"visibility_off",eye_circle:"visibility",eye_circle_outline:"visibility",cctv:"videocam",camera:"videocam",camera_outline:"videocam",camera_off:"videocam_off",video:"videocam",video_outline:"videocam",account:"person",account_outline:"person",account_multiple:"group",account_multiple_outline:"group",account_check:"how_to_reg",account_off:"person_off",run:"directions_run",walk:"directions_walk",human:"person",human_greeting:"waving_hand",window_shutter:"blinds",curtains:"blinds",door:"door_front",door_open:"door_open",door_closed:"door_front",air_conditioner:"ac_unit",television:"tv",speaker:"speaker",washing_machine:"local_laundry_service",dishwasher:"dishwasher_gen",fridge:"kitchen",coffee_maker:"coffee_maker",kettle:"kettle",microwave:"microwave",oven:"oven_gen",fan:"fan",robot_vacuum:"cleaning_services",power:"power_settings_new",power_plug:"electrical_services",power_plug_off:"electrical_services",flash:"bolt",wifi:"wifi",bluetooth:"bluetooth",home:"home",home_outline:"home",map_marker:"location_on",map_marker_outline:"location_on"},n=e.replace(/_outline$/,"").replace(/_filled$/,"");return i[e]||i[n]||n};var Ks=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,L=(s,t,e,i)=>{for(var n=i>1?void 0:i?Ys(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Ks(t,e,n),n};let At=class extends D{constructor(){super(...arguments),this.device={},this.isAiControlled=!1,this._lpTimer=null,this._lpStartX=0,this._lpStartY=0}render(){var n;const s=this.device.state==="on",t=gt(this.device.icon,"light"),e=((n=this.device.attributes)==null?void 0:n.supported_color_modes)||[],i=e.length>0&&!(e.length===1&&e[0]==="onoff");return g`
      <glass-card
        ?state="${s?"on":"off"}"
        interactive
        @pointerdown="${this._onPointerDown}"
        @pointermove="${this._onPointerMove}"
        @pointerup="${this._onPointerUp}"
        @pointercancel="${this._onPointerCancel}"
        @contextmenu="${r=>r.preventDefault()}"
      >
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box"
              style="color: ${s?"var(--glass-primary)":"inherit"}; background: ${s?"rgba(107, 170, 255, 0.1)":"rgba(255,255,255,0.05)"};"
            >
              <span>${t}</span>
            </div>
            <glass-toggle
              .checked="${s}"
              @change="${r=>{r.stopPropagation(),this._dispatchCall("light",r.detail?"turn_on":"turn_off")}}"
            ></glass-toggle>
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="info">${s?`${this.device.brightness||0}% 亮度`:"已关闭"}</div>
            ${i?g`<div class="hint">长按调光调色</div>`:""}
          </div>
        </div>
      </glass-card>
    `}_onPointerDown(s){s.button!==void 0&&s.button!==0||(this._lpStartX=s.clientX,this._lpStartY=s.clientY,this._lpTimer=setTimeout(()=>{var t;(t=navigator.vibrate)==null||t.call(navigator,40),this._showDetail()},600))}_onPointerMove(s){if(this._lpTimer===null)return;const t=s.clientX-this._lpStartX,e=s.clientY-this._lpStartY;Math.sqrt(t*t+e*e)>10&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerUp(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerCancel(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_dispatchCall(s,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:s,service:t,data:{...e,entity_id:this.device.id}}}))}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};At.styles=B`
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
  `;L([T({type:Object})],At.prototype,"device",2);L([T({type:Boolean})],At.prototype,"isAiControlled",2);At=L([z("light-card")],At);let $t=class extends D{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const s=this.device.state!=="off",t=this.device.attributes.temperature||26,e=gt(this.device.icon,"climate");return g`
      <glass-card ?state="${s?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" 
              style="color: ${s?"var(--glass-primary)":"inherit"};"
              @click="${this._showDetail}"
            >${e}</div>
            <glass-toggle 
              .checked="${s}"
              @change="${i=>this._dispatchCall("climate",(i.detail,"set_hvac_mode"),{hvac_mode:i.detail?"cool":"off"})}"
            ></glass-toggle>
          </div>
          
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${this.device.attributes.hvac_action||"空闲"}</div>
          </div>

          <div class="main-control">
            <div class="temp-display">
              <span class="temp-value">${t}</span>
              <span class="temp-unit">°C</span>
            </div>
            <div class="btn-group">
              <div class="btn" @click="${()=>this._adjustTemp(-.5)}">remove</div>
              <div class="btn" @click="${()=>this._adjustTemp(.5)}">add</div>
            </div>
          </div>
        </div>
      </glass-card>
    `}_adjustTemp(s){const t=this.device.attributes.temperature||26;this._dispatchCall("climate","set_temperature",{temperature:t+s})}_dispatchCall(s,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:s,service:t,data:{...e,entity_id:this.device.id}}}))}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};$t.styles=B`
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
  `;L([T({type:Object})],$t.prototype,"device",2);L([T({type:Boolean})],$t.prototype,"isAiControlled",2);$t=L([z("climate-card")],$t);let Ct=class extends D{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const s=this.device.attributes.current_position||0,t=s>0,e=gt(this.device.icon,"cover");return g`
      <glass-card ?state="${t?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" style="color: ${t?"var(--glass-primary)":"inherit"}">${e}</div>
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${t?`打开 ${s}%`:"已关闭"}</div>
          </div>

          <div class="controls">
            <glass-slider 
              style="--glass-card-min-height: 0px; margin: 2px 0;"
              .value="${s}"
              @change="${i=>this._dispatchCall("cover","set_cover_position",{position:i.detail})}"
            ></glass-slider>
            <div class="icon-btn-row">
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","open_cover")}">keyboard_arrow_up</div>
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","stop_cover")}">pause</div>
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","close_cover")}">keyboard_arrow_down</div>
            </div>
          </div>
        </div>
      </glass-card>
    `}_dispatchCall(s,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:s,service:t,data:{...e,entity_id:this.device.id}}}))}};Ct.styles=B`
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
  `;L([T({type:Object})],Ct.prototype,"device",2);L([T({type:Boolean})],Ct.prototype,"isAiControlled",2);Ct=L([z("cover-card")],Ct);let zt=class extends D{constructor(){super(...arguments),this.device={}}render(){let s=this.device.state;const t=this.device.attributes||{},e=t.unit_of_measurement||"",i=t.device_class||"",n=gt(this.device.icon,"sensor"),r=c=>!c||/[\u4e00-\u9fa5]/.test(c)?c:c.replace(/\bPerson Occupancy\b/gi,"人员占用").replace(/\bPerson Count\b/gi,"人数").replace(/\bOccupancy\b/gi,"占用").replace(/\bMotion\b/gi,"移动检测").replace(/\bCam\s+[A-Fa-f0-9]+\b/gi,"摄像头").replace(/\bCamera\b/gi,"摄像头").replace(/\bZone\s+[A-Fa-f0-9]+\b/gi,"区域").trim().replace(/\s+/g," ");if(typeof s=="string"&&s.includes("T")&&s.includes(":"))try{const c=new Date(s);isNaN(c.getTime())||(s=`${(c.getMonth()+1).toString().padStart(2,"0")}-${c.getDate().toString().padStart(2,"0")} ${c.getHours().toString().padStart(2,"0")}:${c.getMinutes().toString().padStart(2,"0")}`)}catch{}const o=(c,u)=>{const p=c.toLowerCase();return p==="on"?u==="motion"||u==="occupancy"||u==="presence"?"有人":u==="door"||u==="window"||u==="opening"?"已打开":u==="moisture"?"漏水！":u==="smoke"?"烟雾！":u==="gas"?"燃气！":"开启":p==="off"?u==="motion"||u==="occupancy"||u==="presence"?"无人":u==="door"||u==="window"||u==="opening"?"已关闭":"正常":{playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",home:"在家",not_home:"离家",clear:"清空",detected:"检测到"}[p]||c},l=r(this.device.name),a=o(s,i),d=i===""&&/^\d+$/.test(String(s)),h=a.length>5?"18px":a.length>2?"22px":"28px";return g`
      <glass-card>
        <div class="sensor-box">
          <div class="icon-box">${n}</div>
          <div class="bottom-info">
            <div class="name">${l}</div>
            <div class="value-display">
              <span class="value" style="font-size: ${d?"28px":h}">
                ${d?s:a}
              </span>
              ${d?g`<span class="unit">人</span>`:g`<span class="unit">${e}</span>`}
            </div>
          </div>
        </div>
      </glass-card>
    `}};zt.styles=B`
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
  `;L([T({type:Object})],zt.prototype,"device",2);zt=L([z("sensor-card")],zt);let kt=class extends D{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const s=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",t=this.device.id.split(".")[0],e=gt(this.device.icon,t),i=n=>{const r=n.toLowerCase();return{on:"已开启",off:"已关闭",playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",open:"已打开",closed:"已关闭"}[r]||n};return g`
      <glass-card ?state="${s?"on":"off"}" interactive @click="${this._toggle}">
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="content">
          <div class="top-row">
            <div class="icon-box" style="color: ${s?"var(--glass-primary)":"inherit"}">
              ${e}
            </div>
            <glass-toggle .checked="${s}" @change="${this._toggle}"></glass-toggle>
          </div>
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${i(this.device.state)}</div>
          </div>
        </div>
      </glass-card>
    `}_toggle(s){s&&s.stopPropagation();const t=this.device.id.split(".")[0],e=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active";let i=e?"turn_off":"turn_on";t==="cover"&&(i=e?"close_cover":"open_cover"),t==="media_player"&&(i=e?"media_stop":"media_play"),t==="vacuum"&&(i=e?"return_to_base":"start"),t==="scene"&&(i="turn_on"),this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:t,service:i,data:{entity_id:this.device.id}}}))}};kt.styles=B`
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
  `;L([T({type:Object})],kt.prototype,"device",2);L([T({type:Boolean})],kt.prototype,"isAiControlled",2);kt=L([z("generic-device-card")],kt);let ut=class extends D{constructor(){super(...arguments),this.scene={},this.isAiRecommended=!1,this.reason=""}render(){const s=gt(this.scene.icon,"scene");return g`
      <glass-card 
        interactive 
        style="--glass-card-min-height: 56px;"
        state="${this.isAiRecommended?"ai-active":"off"}"
        @click="${this._trigger}"
      >
        ${this.isAiRecommended?g`<div class="ai-badge">AI</div>`:""}
        <div class="scene-box">
          <span class="icon-main" style="color: ${this.isAiRecommended?"var(--glass-ai)":"var(--glass-on-surface)"}">${s}</span>
          <span class="scene-name">${this.scene.name}</span>
        </div>
      </glass-card>
    `}_trigger(){if(this.scene.gatewayTriggerPath){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"smart_agent",service:"trigger_ai_scene",data:{scene_id:this.scene.id,gateway_path:this.scene.gatewayTriggerPath}}}));return}this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"scene",service:"turn_on",data:{entity_id:this.scene.id}}}))}};ut.styles=B`
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
  `;L([T({type:Object})],ut.prototype,"scene",2);L([T({type:Boolean})],ut.prototype,"isAiRecommended",2);L([T({type:String})],ut.prototype,"reason",2);ut=L([z("scene-card")],ut);var Xs=Object.defineProperty,Qs=Object.getOwnPropertyDescriptor,Li=(s,t,e,i)=>{for(var n=i>1?void 0:i?Qs(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Xs(t,e,n),n};let Nt=class extends D{constructor(){super(...arguments),this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""}}render(){const s=this.aiState.status==="thinking"||this.aiState.status==="推理中";return g`
      <div class="header">
        <div class="status-indicator">
          <div class="dot ${s?"active":""}"></div>
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
        ${this.aiState.actionHistory.length>0?this.aiState.actionHistory.map(t=>g`
              <div class="log-item">${t}</div>
            `):g`
              <div class="empty-state">
                <span class="material-symbols-outlined" style="font-size: 40px;">Psychology</span>
                <span>等待指令中...</span>
              </div>
            `}
      </div>

      <div class="footer">
        系统状态: ${this.aiState.status}
      </div>
    `}};Nt.styles=B`
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
      content: 'LATEST';
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
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `;Li([T({type:Object})],Nt.prototype,"aiState",2);Nt=Li([z("ai-status-panel")],Nt);var Zs=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,Tt=(s,t,e,i)=>{for(var n=i>1?void 0:i?tn(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Zs(t,e,n),n};let Z=class extends D{constructor(){super(...arguments),this.isRecording=!1,this.status="idle",this.text="点击开始语音指令",this.waveData=new Array(20).fill(0)}render(){return g`
      <div class="bar-content" @click="${this._handleClick}">
        <div class="wave-container">
          ${this.isRecording?this.waveData.map(s=>g`
              <div class="wave-bar" style="height:${Math.max(4,s*40)}px"></div>
            `):g`
              <div class="wave-bar static" style="animation-delay: 0s"></div>
              <div class="wave-bar static" style="animation-delay: -0.2s"></div>
              <div class="wave-bar static" style="animation-delay: -0.4s"></div>
              <div class="wave-bar static" style="animation-delay: -0.1s"></div>
            `}
        </div>

        <span class="voice-text ${this.isRecording?"recording":""}">
          ${this.text}
        </span>

        <div class="mic-button ${this.isRecording?"recording":""} ${this.status==="processing"?"processing":""}">
          <span class="icon">${this.isRecording?"stop":this.status==="processing"?"sync":"mic"}</span>
        </div>
      </div>
    `}_handleClick(){this.dispatchEvent(new CustomEvent("toggle-voice",{bubbles:!0,composed:!0}))}};Z.styles=B`
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
  `;Tt([T({type:Boolean})],Z.prototype,"isRecording",2);Tt([T({type:String})],Z.prototype,"status",2);Tt([T({type:String})],Z.prototype,"text",2);Tt([T({type:Array})],Z.prototype,"waveData",2);Z=Tt([z("voice-bar")],Z);var en=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,Ui=(s,t,e,i)=>{for(var n=i>1?void 0:i?sn(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&en(t,e,n),n};let Ft=class extends D{constructor(){super(...arguments),this._time=new Date}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=new Date},1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}render(){const s=this._time.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),t=this._time.toLocaleDateString("zh-CN",{month:"long",day:"numeric"}),e=this._time.toLocaleDateString("zh-CN",{weekday:"long"});return g`
      <div class="time">${s}</div>
      <div class="info-box">
        <div class="date">${t}</div>
        <div class="weekday">${e}</div>
      </div>
    `}};Ft.styles=B`
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
  `;Ui([I()],Ft.prototype,"_time",2);Ft=Ui([z("clock-widget")],Ft);var nn=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,Gt=(s,t,e,i)=>{for(var n=i>1?void 0:i?rn(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&nn(t,e,n),n};let pt=class extends D{constructor(){super(...arguments),this.condition="晴",this.temperature=26,this.icon="wb_sunny"}render(){return g`
      <div class="icon">${this.icon}</div>
      <div class="info">
        <div class="temp">${this.temperature}°C</div>
        <div class="desc">${this.condition}</div>
      </div>
    `}};pt.styles=B`
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
  `;Gt([T({type:String})],pt.prototype,"condition",2);Gt([T({type:Number})],pt.prototype,"temperature",2);Gt([T({type:String})],pt.prototype,"icon",2);pt=Gt([z("weather-widget")],pt);var on=Object.defineProperty,an=Object.getOwnPropertyDescriptor,ji=(s,t,e,i)=>{for(var n=i>1?void 0:i?an(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&on(t,e,n),n};let Lt=class extends D{constructor(){super(...arguments),this.stats=[]}render(){if(!this.stats||this.stats.length===0)return g`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; opacity:0.3; gap:12px;">
          <span class="material-symbols-outlined" style="font-size:40px;">analytics</span>
          <span>暂无能耗数据</span>
        </div>
      `;const s=this.stats.slice(0,8),t=Math.max(...s.map(e=>e.on_minutes),1);return g`
      <div class="chart-container">
        ${s.map(e=>{const i=e.on_minutes/t*100,n=e.on_minutes>0?e.waste_minutes/e.on_minutes*100:0,r=e.entity_id.split(".").pop().replace(/_/g," ");return g`
            <div class="energy-row">
              <div class="row-header">
                <span class="device-name">${r}</span>
                <span class="time-val">${this._formatTime(e.on_minutes)} / 浪费 ${this._formatTime(e.waste_minutes)}</span>
              </div>
              <div class="progress-track">
                <div class="progress-on" style="width: ${i}%">
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
    `}_formatTime(s){if(!s)return"0m";const t=Math.floor(s/60),e=Math.floor(s%60);return t>0?`${t}h${e}m`:`${e}m`}};Lt.styles=B`
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
  `;ji([T({type:Array})],Lt.prototype,"stats",2);Lt=ji([z("energy-chart")],Lt);var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,Wi=(s,t,e,i)=>{for(var n=i>1?void 0:i?cn(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&ln(t,e,n),n};let Ut=class extends D{constructor(){super(...arguments),this.events=[]}render(){return!this.events||this.events.length===0?g`
        <div class="empty-state">
          <span class="material-symbols-outlined" style="font-size: 32px;">videocam_off</span>
          <span>近期无视觉检测事件</span>
        </div>
      `:g`
      <div class="events-container">
        ${this.events.map((s,t)=>{var e;return g`
          <div class="event-card">
            <div class="thumbnail">
              ${s.thumbnail?g`<img src="${s.thumbnail}" alt="Snapshot">`:g`<span class="material-symbols-outlined" style="opacity: 0.3;">person</span>`}
            </div>
            <div class="event-info">
              <div class="camera-name">
                ${t===0?g`<span class="live-dot"></span>`:""}
                ${s.camera}
              </div>
              <div class="event-detail">
                ${s.type==="end"?"离开":"检测到"} ${s.label} ${(e=s.current_zones)!=null&&e.length?`@ ${s.current_zones.join(", ")}`:""}
              </div>
              <div class="score-badge">${Math.round(s.score*100)}% 置信度</div>
            </div>
          </div>
        `})}
      </div>
    `}};Ut.styles=B`
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
  `;Wi([T({type:Array})],Ut.prototype,"events",2);Ut=Wi([z("frigate-events-panel")],Ut);var dn=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,Jt=(s,t,e,i)=>{for(var n=i>1?void 0:i?hn(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&dn(t,e,n),n};let jt=class extends D{constructor(){super(...arguments),this.device={}}render(){const s=this.device.attributes||{},t=this.device.brightness!==void 0?this.device.brightness:s.brightness?Math.round(s.brightness/255*100):0,e=s.color_temp_kelvin||(s.color_temp?Math.round(1e6/s.color_temp):null),i=s.min_color_temp_kelvin||(s.max_mireds?Math.round(1e6/s.max_mireds):2700),n=s.max_color_temp_kelvin||(s.min_mireds?Math.round(1e6/s.min_mireds):6500),r=e??Math.round((i+n)/2),o=Math.min(100,Math.max(0,Math.round((r-i)/(n-i)*100))),l=s.supported_color_modes||[],a=l.includes("color_temp"),d=l.some(c=>["hs","rgb","xy","rgbw","rgbww"].includes(c)),h=[{name:"暖光",color:"#FFB347",k:2700},{name:"自然",color:"#FFE0B2",k:3500},{name:"阅读",color:"#FFF5DC",k:4e3},{name:"冷白",color:"#E8F4FD",k:5e3},{name:"日光",color:"#E3F2FD",k:6e3}].filter(c=>c.k>=i&&c.k<=n);return g`
      <div class="container">
        <!-- 亮度调节 -->
        <div class="section">
          <div class="value-display">
            <div class="label">亮度调节</div>
            <div class="value">${t}<span class="unit">%</span></div>
          </div>
          <glass-slider
            .value="${t}"
            @change="${c=>this._call("turn_on",{brightness_pct:c.detail})}"
          ></glass-slider>
        </div>

        <!-- 色温调节（仅支持色温的灯显示） -->
        ${a?g`
          <div class="section">
            <div class="value-display">
              <div class="label">色温调节</div>
              <div class="value">${r}<span class="unit">K</span></div>
            </div>
            <glass-slider
              style="--glass-primary: #ffb347; --glass-primary-glow: rgba(255,179,71,0.3);"
              .value="${o}"
              @change="${c=>{const u=Math.round(i+c.detail/100*(n-i));this._call("turn_on",{color_temp_kelvin:u})}}"
            ></glass-slider>
            <!-- 色温预设快捷按钮 -->
            ${h.length>0?g`
              <div class="color-presets">
                ${h.map(c=>g`
                  <div
                    class="color-dot ${r===c.k?"active":""}"
                    style="background: ${c.color}; color: ${c.color};"
                    title="${c.name} ${c.k}K"
                    @click="${()=>this._call("turn_on",{color_temp_kelvin:c.k})}"
                  ></div>
                `)}
              </div>
            `:""}
          </div>
        `:""}

        <!-- RGB 颜色预设（仅支持彩色的灯显示） -->
        ${d?g`
          <div class="section">
            <div class="label">颜色预设</div>
            <div class="color-presets">
              ${[{color:"#FF8A80",rgb:[255,138,128]},{color:"#B388FF",rgb:[179,136,255]},{color:"#80D8FF",rgb:[128,216,255]},{color:"#CCFF90",rgb:[204,255,144]},{color:"#FFD180",rgb:[255,209,128]}].map(c=>g`
                <div
                  class="color-dot"
                  style="background: ${c.color}; color: ${c.color};"
                  @click="${()=>this._call("turn_on",{rgb_color:c.rgb})}"
                ></div>
              `)}
            </div>
          </div>
        `:""}
      </div>
    `}_call(s,t){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"light",service:s,data:{...t,entity_id:this.device.id}}}))}};jt.styles=B`
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
  `;Jt([T({type:Object})],jt.prototype,"device",2);jt=Jt([z("light-detail-panel")],jt);let Wt=class extends D{constructor(){super(...arguments),this.device={}}render(){const s=this.device.state,t=this.device.attributes.fan_mode||"auto";return g`
      <div class="container">
        <div class="section">
          <div class="label">运行模式</div>
          <div class="mode-grid">
            ${[{id:"cool",name:"制冷",icon:"ac_unit"},{id:"heat",name:"制热",icon:"wb_sunny"},{id:"dry",name:"除湿",icon:"water_drop"},{id:"fan_only",name:"送风",icon:"air"},{id:"off",name:"关闭",icon:"power_settings_new"}].map(i=>g`
              <div class="mode-btn ${s===i.id?"active":""}" @click="${()=>this._call("set_hvac_mode",{hvac_mode:i.id})}">
                <span class="icon-main material-symbols-outlined">${i.icon}</span>
                <span class="mode-name">${i.name}</span>
              </div>
            `)}
          </div>
        </div>

        <div class="section">
          <div class="label">风速调节</div>
          <div class="fan-row">
            ${["low","medium","high","auto"].map(i=>g`
              <div class="fan-btn ${t===i?"active":""}" @click="${()=>this._call("set_fan_mode",{fan_mode:i})}">
                ${i==="low"?"低":i==="medium"?"中":i==="high"?"高":"自动"}
              </div>
            `)}
          </div>
        </div>

        <div class="section">
          <div class="label">定时关闭</div>
          <div style="display:flex; gap:12px;">
            ${[30,60,120].map(i=>g`
              <div class="fan-btn" style="flex:1;">${i}分钟</div>
            `)}
          </div>
        </div>
      </div>
    `}_call(s,t){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"climate",service:s,data:{...t,entity_id:this.device.id}}}))}};Wt.styles=B`
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
  `;Jt([T({type:Object})],Wt.prototype,"device",2);Wt=Jt([z("climate-detail-panel")],Wt);class rt{constructor(){this.ws=null,this.entitiesListeners=[],this.entities={},this.messageId=1,this.pending=new Map,this.connected=!1}static getInstance(){return rt.instance||(rt.instance=new rt),rt.instance}async connect(t){const e=t||localStorage.getItem("gateway_token")||"";if(!e)throw new Error("AUTH_REQUIRED");const i=this._buildWsUrl();await new Promise((n,r)=>{let o=!1;this.ws=new WebSocket(i);const l=d=>{o||(o=!0,r(d))},a=()=>{o||(o=!0,n())};this.ws.addEventListener("open",()=>{}),this.ws.addEventListener("message",async d=>{var c;let h;try{h=JSON.parse(d.data)}catch{return}if(h.type==="auth_required"){(c=this.ws)==null||c.send(JSON.stringify({type:"auth",access_token:e}));return}if(h.type==="auth_invalid"){l(new Error("AUTH_REQUIRED"));return}if(h.type==="auth_ok"){this.connected=!0;try{await this._bootstrapEntities(),await this._subscribeStateChanged(),a()}catch(u){l(u)}return}this._handleProtocolMessage(h)}),this.ws.addEventListener("error",()=>{l(new Error("Gateway WebSocket connection failed"))}),this.ws.addEventListener("close",()=>{this.connected=!1})})}onEntitiesUpdate(t){this.entitiesListeners.push(t)}async sendMessage(t){if(String((t==null?void 0:t.type)||"")==="call_service")throw new Error("HA websocket execution is disabled; route commands through SmartAgent Gateway");if(!this.ws||this.ws.readyState!==WebSocket.OPEN||!this.connected)throw new Error("No gateway websocket connection established");const e=this.messageId++;return this.ws.send(JSON.stringify({id:e,...t})),new Promise((i,n)=>{this.pending.set(e,{resolve:i,reject:n}),setTimeout(()=>{this.pending.has(e)&&(this.pending.delete(e),n(new Error(`WS request timeout: ${(t==null?void 0:t.type)||"unknown"}`)))},15e3)})}_buildWsUrl(){const t=window.location.origin;return`${t.startsWith("https://")?t.replace("https://","wss://"):t.replace("http://","ws://")}/api/websocket`}async _bootstrapEntities(){const t=await this.sendMessage({type:"get_states"}),e={};if(Array.isArray(t))for(const i of t)i!=null&&i.entity_id&&(e[i.entity_id]=i);this.entities=e,this._notifyEntitiesListeners(this.entities)}async _subscribeStateChanged(){await this.sendMessage({type:"subscribe_events",event_type:"state_changed"})}_handleProtocolMessage(t){var e,i,n,r;if(typeof(t==null?void 0:t.id)=="number"&&this.pending.has(t.id)){const o=this.pending.get(t.id);this.pending.delete(t.id),t.type==="result"&&t.success===!1?o.reject(new Error(((e=t==null?void 0:t.error)==null?void 0:e.message)||"WS request failed")):o.resolve(t.result);return}if(t.type==="event"&&((i=t.event)==null?void 0:i.event_type)==="state_changed"){const o=(r=(n=t.event)==null?void 0:n.data)==null?void 0:r.new_state;o!=null&&o.entity_id&&(this.entities[o.entity_id]=o,this._notifyEntitiesListeners(this.entities))}}_notifyEntitiesListeners(t){this.entitiesListeners.forEach(e=>e(t))}}const Hi=rt.getInstance(),un=new Set(["1","true","yes","on"]),pn=new Set(["local_space_model"]);function H(...s){for(const t of s){if(t==null)continue;const e=String(t).trim();if(e)return e}return""}function at(s){return s===!0?!0:s===!1||s===null||s===void 0?!1:typeof s=="number"?s!==0:un.has(String(s).trim().toLowerCase())}function Be(s){return H(s==null?void 0:s.entity_id,s==null?void 0:s.entityId,s==null?void 0:s.id)}function gn(s){return!s||typeof s!="object"||!Be(s)?!1:at(s.managed)||at(s.in_sa)||at(s.in_smartagent)}function $e(s){const t=[],e=new Set;for(const i of s||[]){if(!gn(i))continue;const r=Be(i).toLowerCase();e.has(r)||(t.push(i),e.add(r))}return t}function qi(s){const e=String(s||"").trim().toLowerCase();if(!e)return"";const i=e.replace(/[\s_-]+/g,"");if(e==="all"||e.includes("全屋")||e.includes("全部")||e.includes("whole_home"))return"all";if(e.includes("厨房")||e.includes("kitchen"))return"kitchen";const n=e.includes("客厅")||e.includes("living"),r=e.includes("餐厅")||e.includes("dining");return n&&r?"living_dining":n?"living":r?"dining":e.includes("书房")||e.includes("study")?"study":e.includes("主卧")||e.includes("卧室")||e.includes("bedroom")||e.includes("master")||i.includes("zhuwo")||i.includes("woshi")||i.includes("primarybedroom")?"bedroom":e.includes("卫生间")||e.includes("卫浴")||e.includes("bathroom")?"bathroom":e.includes("阳台")||e.includes("balcony")?"balcony":e.includes("玄关")||e.includes("entry")?"entry":e.includes("走廊")||e.includes("hallway")||e.includes("corridor")?"hallway":""}function ze(s){const t=String(s||"").trim(),e=t.toLowerCase();if(!e)return"";const i=qi(t);return i||e.replace(/\s+/g,"_")}function $i(...s){const t=s.map(e=>H(e)).filter(Boolean);for(const e of t){const i=qi(e);if(i)return i}return ze(t[0]||"")}function fn(s){const t=H(s==null?void 0:s.roomId),e=H(s==null?void 0:s.sourceId);if(e.startsWith("system_fixed_lighting:")){const i=e.split(":").pop()||"";return[t||"all","system_fixed_lighting",i].join("|")}return[t||"all",e||H(s==null?void 0:s.id,s==null?void 0:s.name)].join("|")}function mn(s,t=""){const e=`${H(s==null?void 0:s.name)} ${H(s==null?void 0:s.sourceId)}`.toLowerCase(),i=t.trim().toLowerCase();let n=0;i&&e.includes(i)&&(n+=100);const r=e.replace(/[\s_-]+/g,"");return(e.includes("主卧")||r.includes("zhuwo")||e.includes("master"))&&(n+=10),n}function vn(s,t={}){const e=new Map;return s.forEach((i,n)=>{const r=fn(i);if(!r)return;const o=H(i==null?void 0:i.roomId),l=mn(i,t[o]||""),a=e.get(r);(!a||l>a.score)&&e.set(r,{scene:i,score:l,index:n})}),Array.from(e.values()).sort((i,n)=>i.index-n.index).map(i=>i.scene)}function _n(s){return!s||typeof s!="object"?!1:at(s.managed)||at(s.in_sa)||at(s.in_smartagent)?!0:H(s.source).split("+").map(e=>e.trim()).some(e=>pn.has(e))}class ot{constructor(){this._devices=[],this._aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this._energyStats=[],this._frigateEvents=[],this._criticalFrigateEvent=null,this._lastEntities=null,this._rooms=[{id:"all",name:"全部"}],this._managedDevicesInfo=new Map,this._listeners=[],Hi.onEntitiesUpdate(t=>{this._lastEntities=t,this._processEntities(t),this._processAIState(t),this._processEnergyStats(t),this._processFrigateEvents(t),this._notifyListeners()}),setInterval(()=>this.refreshManagedDevices(),3e4)}async refreshManagedDevices(){try{const[t,e]=await Promise.allSettled([this._fetchGatewayJson("/devices"),this._fetchGatewayJson("/rooms")]);if(t.status==="rejected"&&console.warn("[StateManager] Failed to fetch managed devices",t.reason),e.status==="rejected"&&console.warn("[StateManager] Failed to fetch rooms",e.reason),t.status==="rejected"&&e.status==="rejected")return;const i=t.status==="fulfilled"?this._extractRows(t.value,"devices"):[],n=e.status==="fulfilled"?this._extractRows(e.value,"rooms"):[],r=$e(i);if(i&&Array.isArray(i)){t.status==="fulfilled"&&(this._managedDevicesInfo=this._buildManagedDeviceInfo(r));const o=new Map;n.forEach(d=>{if(!_n(d))return;const h=this._roomSummaryFromRow(d);h&&o.set(h.id,h)}),(t.status==="fulfilled"?r:Array.from(this._managedDevicesInfo.values())).forEach(d=>{const h=this._deviceRoom(d),c=this._deviceRoomId(d,h);h&&c&&o.set(c,{id:c,name:h})}),this._rooms=[{id:"all",name:"全部"},...Array.from(o.values())];let a=!1;this._lastEntities&&this._processEntities(this._lastEntities),r.some(d=>this._gatewayRowHasRuntimeState(d))?a=this._processGatewayDeviceRows(r):t.status==="fulfilled"&&r.length===0&&(this._devices=[],a=!0),(this._lastEntities||a)&&this._notifyListeners()}}catch(t){console.warn("[StateManager] Failed to fetch managed devices",t)}}_gatewayHeaders(){const t=localStorage.getItem("gateway_token")||"",e={Accept:"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["X-SA-Token"]=t),e}async _fetchGatewayJson(t){const e=await fetch(t,{headers:this._gatewayHeaders()});if(!e.ok)throw new Error(`Gateway request failed: ${t} ${e.status}`);return e.json()}_extractRows(t,e){if(Array.isArray(t))return t;for(const i of[e,"items","data","rows","result"]){const n=t==null?void 0:t[i];if(Array.isArray(n))return n}return[]}_buildManagedDeviceInfo(t){const e=new Map;for(const i of $e(t)){const n=this._deviceEntityId(i);if(!n)continue;const r=this._deviceRoom(i);e.set(n.toLowerCase(),{name:this._deviceName(i,n),room:r,roomId:this._deviceRoomId(i,r)})}return e}_processGatewayDeviceRows(t){const e=[];for(const i of $e(t)){const n=this._deviceEntityId(i);if(!n)continue;const r=i!=null&&i.attributes&&typeof i.attributes=="object"?i.attributes:{},o=this._firstString(i==null?void 0:i.domain,n.split(".")[0],i==null?void 0:i.type),l=this._deviceRoom(i),a=this._deviceRoomId(i,l),d=this._firstString(i==null?void 0:i.state,r.state,"unknown");e.push({id:n,type:this._mapDomainToType(o),name:this._deviceName(i,n),room:l,roomId:a,state:d,brightness:this._deviceBrightness(i,r),temperature:(i==null?void 0:i.temperature)||r.temperature||r.current_temperature,humidity:(i==null?void 0:i.humidity)||r.humidity,icon:this._firstString(i==null?void 0:i.icon,r.icon),attributes:r})}return e.length===0?!1:(this._devices=e,!0)}_gatewayRowHasRuntimeState(t){var e;return!!this._firstString(t==null?void 0:t.state,(e=t==null?void 0:t.attributes)==null?void 0:e.state)}_deviceBrightness(t,e){const i=(t==null?void 0:t.brightness_pct)??(t==null?void 0:t.brightness)??(e==null?void 0:e.brightness_pct)??(e==null?void 0:e.brightness);if(i==null||i==="")return;const n=Number(i);if(Number.isFinite(n))return n>100?Math.round(n/255*100):Math.round(n)}_deviceEntityId(t){return Be(t)}_deviceName(t,e){var i;return this._firstString(t==null?void 0:t.name,t==null?void 0:t.friendly_name,t==null?void 0:t.alias,(i=t==null?void 0:t.attributes)==null?void 0:i.friendly_name,e)}_deviceRoom(t){var e,i;return this._firstString(t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.space_id,t==null?void 0:t.room_id,t==null?void 0:t.area_id,(e=t==null?void 0:t.attributes)==null?void 0:e.room,(i=t==null?void 0:t.attributes)==null?void 0:i.area)}_deviceRoomId(t,e=""){var i,n,r;return $i(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id,(i=t==null?void 0:t.attributes)==null?void 0:i.room_id,(n=t==null?void 0:t.attributes)==null?void 0:n.space_id,(r=t==null?void 0:t.attributes)==null?void 0:r.area_id)}_roomSummaryFromRow(t){const e=this._firstString(t==null?void 0:t.name,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id),i=$i(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id);return!i||i==="all"?null:{id:i,name:e||i}}_firstString(...t){for(const e of t){if(e==null)continue;const i=String(e).trim();if(i)return i}return""}static getInstance(){return ot.instance||(ot.instance=new ot),ot.instance}subscribe(t){this._listeners.push(t),this.refreshManagedDevices(),(this._devices.length>0||this._aiState.lastAction)&&t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent)}_processFrigateEvents(t){const e=t["sensor.smart_agent_status"];e&&(e.attributes.frigate_events&&(this._frigateEvents=e.attributes.frigate_events),this._criticalFrigateEvent=e.attributes.critical_frigate_event||null)}_processEnergyStats(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.energy_stats){const i=e.attributes.energy_stats;Array.isArray(i)?this._energyStats=[...i]:typeof i=="object"&&(this._energyStats=Object.values(i))}}_processAIState(t){const e=t["sensor.smart_agent_status"],i=t["text.smart_agent_last_action"];if(e){this._aiState.status=e.state;const n=e.attributes.action_history;Array.isArray(n)&&(this._aiState.actionHistory=[...n]),this._aiState.lastCorrection=e.attributes.last_correction||"",this._aiState.recentAiActions=e.attributes.recent_ai_actions||[],this._aiState.voiceStatus=e.attributes.voice_status||"idle",this._aiState.voiceReply=e.attributes.voice_reply||"",this._aiState.lastStt=e.attributes.last_stt||""}i&&i.state!==this._aiState.lastAction&&(this._aiState.lastAction=i.state,i.state&&i.state!=="unknown"&&(this._aiState.actionHistory=[i.state,...this._aiState.actionHistory.filter(n=>n!==i.state)].slice(0,5)))}_processEntities(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.device_count!==void 0){const n=this._last_count||0;e.attributes.device_count!==n&&(this._last_count=e.attributes.device_count,this.refreshManagedDevices())}const i=[];for(const[n,r]of Object.entries(t)){const o=this._managedDevicesInfo.get(n.toLowerCase());if(!o)continue;const l=n.split(".")[0],a=o.room||this._guessRoom(n,r),d=o.roomId||this._mapRoomToId(a);i.push({id:n,type:this._mapDomainToType(l),name:o.name||r.attributes.friendly_name||n,room:a,roomId:d,state:r.state,brightness:r.attributes.brightness?Math.round(r.attributes.brightness/255*100):void 0,temperature:r.attributes.temperature||r.attributes.current_temperature,humidity:r.attributes.humidity,icon:r.attributes.icon,attributes:r.attributes})}this._devices=i}_mapRoomToId(t){return ze(t)}_mapDomainToType(t){return t==="binary_sensor"?"sensor":t}_guessRoom(t,e){const i=(e.attributes.friendly_name||"").toLowerCase(),n=t.toLowerCase();return i.includes("客厅")||n.includes("living")?"客厅":i.includes("厨房")||n.includes("kitchen")?"厨房":i.includes("书房")||n.includes("study")?"书房":i.includes("卧室")||n.includes("bedroom")?"卧室":"未分类"}_notifyListeners(){this._listeners.forEach(t=>t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent))}getDevices(){return this._devices}}const Ce=ot.getInstance(),Ci=1024,ki=2048,yt=16e3,bn=12e3,yn=`
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
`,xn=`
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
`;let ke=null,Pe=null;function Vi(s,t){if(t==="pcm"&&ke)return ke;if(t==="vad"&&Pe)return Pe;const e=new Blob([s],{type:"application/javascript"}),i=URL.createObjectURL(e);return t==="pcm"?ke=i:Pe=i,i}class wn{constructor(t={},e={}){this._audioCtx=null,this._mediaStream=null,this._inputNode=null,this._workletNode=null,this._legacyProcessor=null,this._isRunning=!1,this._audioElem=null,this._audioElemHandlers={},this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._stage="idle",this.VAD_SILENCE_THRESHOLD=.015,this.VAD_SILENCE_FRAMES=35,this._sessionId=null,this._sessionWs=null,this._eventsWs=null,this._closingByClient=!1,this._intentTimeoutTimer=null,this._onSessionWsError=()=>{var i,n;this._closingByClient||((n=(i=this._cb).onError)==null||n.call(i,"Gateway 语音通道异常中断"),this._emit("error","Gateway 语音通道异常中断"),this._cleanup())},this._onEventsWsError=()=>{var i,n;this._closingByClient||((n=(i=this._cb).onError)==null||n.call(i,"Gateway 语音事件通道异常中断"),this._emit("error","Gateway 语音事件通道异常中断"),this._cleanup())},this._onGatewaySocketClosed=()=>{var i,n;!this._closingByClient&&this._isRunning&&((n=(i=this._cb).onError)==null||n.call(i,"语音会话已断开"),this._emit("error","语音会话已断开"),this._cleanup())},this._onEventsSocketMessage=i=>{var o,l,a,d,h,c;if(i.data instanceof ArrayBuffer||i.data instanceof Blob)return;let n;try{n=typeof i.data=="string"?JSON.parse(i.data):i.data}catch{return}const r=this._mapIncomingVoiceEvent(n);if(r){if(r.type==="stt_result"){const u=r.text||"";u&&((l=(o=this._cb).onSttResult)==null||l.call(o,u));return}if(r.type==="intent_result"){const u=r.reply||"";u&&((d=(a=this._cb).onReply)==null||d.call(a,u)),this._clearIntentTimeout(),this._emit("tts");return}if(r.type==="tts_url"){const u=r.url||"";if(u){const p=this._resolveMediaUrl(u);this._playTts(p)}this._clearIntentTimeout(),this._emit("playing");return}if(r.type==="done"){if(this._clearIntentTimeout(),this._audioElem)return;this._emit("idle"),this._cleanup();return}if(r.type==="error"){const u=r.message||"语音管道错误";(c=(h=this._cb).onError)==null||c.call(h,u),this._emit("error",u),this._cleanup()}}},this._options=t,this._cb=e,this._enableLegacyVoiceEventCompat=t.enableLegacyVoiceEventCompat===!0,this._intentTimeoutMs=t.intentTimeoutMs??bn}get isRunning(){return this._isRunning}async start(){var t,e;if(!this._isRunning){this._isRunning=!0,this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._closingByClient=!1,this._emit("starting");try{const i=this._resolveGatewayBaseUrl(),n=this._resolveGatewayToken();if(!n)throw new Error("未检测到 Gateway 会话令牌，请先登录 Gateway");const r=await this._createVoiceSession(i,n);if(this._sessionId=r.session_id||r.sessionId||null,!this._sessionId&&!r.ws_url&&!r.wsUrl)throw new Error("Gateway 未返回 voice session 标识");await this._openGatewaySockets(i,r),this._mediaStream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:yt,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._emit("stt"),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:yt}),this._inputNode=this._audioCtx.createMediaStreamSource(this._mediaStream),await this._tryAttachWorklet(this._audioCtx,this._inputNode)||this._attachLegacyProcessor(this._audioCtx,this._inputNode)}catch(i){const n=this._normalizeError(i);(e=(t=this._cb).onError)==null||e.call(t,n),this._emit("error",n),this._cleanup()}}}stop(){if(this._isRunning){if(this._stage!=="stt"){this._emit("idle"),this._cleanup();return}this._stopRecording()}}async _tryAttachWorklet(t,e){if(!t.audioWorklet)return!1;try{const i=Vi(yn,"pcm");await t.audioWorklet.addModule(i);const n=new AudioWorkletNode(t,"pcm-capture-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:Ci,waveBins:20}});return n.port.onmessage=r=>this._onAudioFrame(r.data),e.connect(n),this._workletNode=n,!0}catch(i){return console.warn("[VoicePipeline] AudioWorklet 不可用，回退 ScriptProcessor:",i),!1}}_attachLegacyProcessor(t,e){const i=t.createScriptProcessor(Ci,1,1);i.onaudioprocess=n=>{if(!this._isRunning)return;const r=n.inputBuffer.getChannelData(0);let o=0;for(let c=0;c<r.length;c++)o+=r[c]*r[c];const l=Math.sqrt(o/r.length),a=[],d=Math.floor(r.length/20)||1;for(let c=0;c<20;c++)a.push(Math.abs(r[c*d]||0));const h=new Int16Array(r.length);for(let c=0;c<r.length;c++){const u=Math.max(-1,Math.min(1,r[c]));h[c]=u<0?u*32768:u*32767}this._onAudioFrame({type:"frame",rms:l,wave:a,pcm16:h.buffer})},e.connect(i),i.connect(t.destination),this._legacyProcessor=i}_onAudioFrame(t){var e;if(this._isRunning&&(t==null?void 0:t.type)==="frame"){if(this._cb.onWaveData&&Array.isArray(t.wave)&&this._cb.onWaveData(t.wave),t.rms>=this.VAD_SILENCE_THRESHOLD)this._hasSpeechStarted=!0,this._vadSilenceCount=0;else if(this._hasSpeechStarted){if(this._vadSilenceCount++,this._vadSilenceCount>this.VAD_SILENCE_FRAMES){this._stopRecording();return}}else return;if(((e=this._sessionWs)==null?void 0:e.readyState)===WebSocket.OPEN&&t.pcm16)try{this._sessionWs.send(t.pcm16)}catch{}}}_stopRecording(){var t;if(this._isRunning){if(this._teardownAudioGraph(),((t=this._sessionWs)==null?void 0:t.readyState)===WebSocket.OPEN){try{this._sessionWs.send(JSON.stringify({type:"input_audio_buffer.commit"}))}catch{}try{this._sessionWs.send(new ArrayBuffer(0))}catch{}}this._emit("intent"),this._armIntentTimeout()}}_armIntentTimeout(){this._clearIntentTimeout(),this._intentTimeoutMs>0&&(this._intentTimeoutTimer=setTimeout(()=>{var e,i;if(!this._isRunning)return;const t="AI 响应超时";(i=(e=this._cb).onError)==null||i.call(e,t),this._emit("error",t),this._cleanup()},this._intentTimeoutMs))}_clearIntentTimeout(){this._intentTimeoutTimer!==null&&(clearTimeout(this._intentTimeoutTimer),this._intentTimeoutTimer=null)}_teardownAudioGraph(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._inputNode){try{this._inputNode.disconnect()}catch{}this._inputNode=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._mediaStream&&(this._mediaStream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._mediaStream=null)}_resolveGatewayBaseUrl(){var e;const t=(e=this._options.gatewayBaseUrl)==null?void 0:e.trim();return t?t.replace(/\/$/,""):window.location.origin}_resolveGatewayToken(){var t;return((t=this._options.gatewayToken)==null?void 0:t.trim())||localStorage.getItem("gateway_token")||""}_buildAuthHeaders(t){return{"Content-Type":"application/json",Authorization:`Bearer ${t}`,"X-SA-Token":t}}async _createVoiceSession(t,e){const i=await fetch(`${t}/api/v1/voice/session`,{method:"POST",headers:this._buildAuthHeaders(e),body:JSON.stringify({sample_rate:yt,audio_format:"pcm16"})});let n={};try{n=await i.json()}catch{}if(!i.ok){const r=(n==null?void 0:n.error)||i.statusText;throw new Error(`Gateway 语音会话创建失败 (${i.status}): ${r||"unknown error"}`)}return n}async _openGatewaySockets(t,e){const i=this._toWsBase(t),n=e.ws_url||e.wsUrl||`${i}/api/v1/voice/session?session_id=${encodeURIComponent(this._sessionId||"")}`,r=e.events_ws_url||e.eventsWsUrl||`${i}/api/v1/events?topic=voice&session_id=${encodeURIComponent(this._sessionId||"")}`;this._sessionWs=new WebSocket(n),this._eventsWs=new WebSocket(r),this._sessionWs.binaryType="arraybuffer",await Promise.all([this._waitSocketOpen(this._sessionWs,"voice session"),this._waitSocketOpen(this._eventsWs,"voice events")]),this._sessionWs.addEventListener("close",this._onGatewaySocketClosed),this._sessionWs.addEventListener("error",this._onSessionWsError),this._eventsWs.addEventListener("message",this._onEventsSocketMessage),this._eventsWs.addEventListener("close",this._onGatewaySocketClosed),this._eventsWs.addEventListener("error",this._onEventsWsError)}_mapIncomingVoiceEvent(t){var i,n,r,o,l,a,d,h,c,u,p,v;const e=String((t==null?void 0:t.type)||(t==null?void 0:t.event)||(t==null?void 0:t.name)||"").trim();return e==="stt_result"?{type:"stt_result",text:(t==null?void 0:t.text)||((i=t==null?void 0:t.result)==null?void 0:i.text)||((r=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||""}:e==="intent_result"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((l=t==null?void 0:t.result)==null?void 0:l.reply)||((u=(c=(h=(d=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:d.response)==null?void 0:h.speech)==null?void 0:c.plain)==null?void 0:u.speech)||""}:e==="tts_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((v=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:v.url)||""}:e==="done"?{type:"done"}:e==="error"?{type:"error",message:(t==null?void 0:t.message)||(t==null?void 0:t.error)||"语音管道错误"}:this._mapLegacyVoiceEvent(t,e)}_mapLegacyVoiceEvent(t,e){var i,n,r,o,l,a,d,h,c,u,p,v;return this._enableLegacyVoiceEventCompat?e==="stt-end"||e==="transcript_final"?{type:"stt_result",text:(t==null?void 0:t.text)||((i=t==null?void 0:t.result)==null?void 0:i.text)||((r=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||"",legacy_type:e}:e==="intent-end"||e==="reply"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((l=t==null?void 0:t.result)==null?void 0:l.reply)||((u=(c=(h=(d=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:d.response)==null?void 0:h.speech)==null?void 0:c.plain)==null?void 0:u.speech)||"",legacy_type:e}:e==="tts-end"||e==="audio_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((v=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:v.url)||"",legacy_type:e}:e==="pipeline_end"||e==="session_end"?{type:"done",legacy_type:e}:null:null}_resolveMediaUrl(t){if(/^https?:\/\//i.test(t))return t;const e=this._resolveGatewayBaseUrl();return t.startsWith("/")?`${e}${t}`:`${e}/${t}`}_playTts(t){this._releaseAudioElem();const e=new Audio(t),i=()=>{this._emit("idle"),this._cleanup()},n=()=>{this._emit("idle"),this._cleanup()};e.addEventListener("ended",i),e.addEventListener("error",n),this._audioElem=e,this._audioElemHandlers={ended:i,error:n},e.play().catch(()=>{this._emit("idle"),this._cleanup()})}_releaseAudioElem(){const t=this._audioElem;if(t){try{t.pause()}catch{}this._audioElemHandlers.ended&&t.removeEventListener("ended",this._audioElemHandlers.ended),this._audioElemHandlers.error&&t.removeEventListener("error",this._audioElemHandlers.error);try{t.src="",t.load()}catch{}this._audioElem=null,this._audioElemHandlers={}}}_emit(t,e){var i,n;this._stage=t,(n=(i=this._cb).onStageChange)==null||n.call(i,t,e)}_cleanup(){var t,e,i,n,r;if(this._isRunning=!1,this._closingByClient=!0,this._stage="idle",this._hasSpeechStarted=!1,this._clearIntentTimeout(),(t=this._eventsWs)==null||t.removeEventListener("message",this._onEventsSocketMessage),(e=this._sessionWs)==null||e.removeEventListener("close",this._onGatewaySocketClosed),(i=this._eventsWs)==null||i.removeEventListener("close",this._onGatewaySocketClosed),(n=this._sessionWs)==null||n.removeEventListener("error",this._onSessionWsError),(r=this._eventsWs)==null||r.removeEventListener("error",this._onEventsWsError),this._sessionWs&&this._sessionWs.readyState===WebSocket.OPEN)try{this._sessionWs.close(1e3,"client_cleanup")}catch{}if(this._eventsWs&&this._eventsWs.readyState===WebSocket.OPEN)try{this._eventsWs.close(1e3,"client_cleanup")}catch{}this._sessionWs=null,this._eventsWs=null,this._sessionId=null,this._teardownAudioGraph(),this._releaseAudioElem()}_toWsBase(t){return t.startsWith("https://")?`wss://${t.slice(8)}`:t.startsWith("http://")?`ws://${t.slice(7)}`:t}_waitSocketOpen(t,e){return new Promise((i,n)=>{const r=()=>{a(),i()},o=()=>{a(),n(new Error(`${e} 连接失败`))},l=()=>{a(),n(new Error(`${e} 已关闭`))},a=()=>{t.removeEventListener("open",r),t.removeEventListener("error",o),t.removeEventListener("close",l)};t.addEventListener("open",r),t.addEventListener("error",o),t.addEventListener("close",l)})}_normalizeError(t){const e=(t==null?void 0:t.name)||"",i=(t==null?void 0:t.message)||String(t||"未知错误");return e==="NotAllowedError"||/permission/i.test(i)?"请允许浏览器使用麦克风":e==="NotFoundError"?"未检测到可用麦克风设备":e==="NotReadableError"?"麦克风被其他应用占用":`语音链路错误: ${i}`}}class En{constructor(t){this._state="stopped",this._audioCtx=null,this._stream=null,this._source=null,this._workletNode=null,this._legacyProcessor=null,this._activationFrames=0,this.ACTIVATION_THRESHOLD=7,this.ENERGY_THRESHOLD=.02,this._cooldownTimer=null,this.COOLDOWN_MS=8e3,this._onActivated=t}get isListening(){return this._state==="listening"}async start(){if(this._state!=="stopped")return this._state==="listening";try{return this._stream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:yt,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:yt}),this._source=this._audioCtx.createMediaStreamSource(this._stream),await this._tryAttachWorklet(this._audioCtx,this._source)||this._attachLegacyProcessor(this._audioCtx,this._source),this._state="listening",!0}catch(t){return console.warn("[AlwaysOnVAD] 麦克风访问失败，免唤醒模式不可用:",(t==null?void 0:t.message)||t),this._teardown(),this._state="stopped",!1}}pause(){this._state==="listening"&&(this._state="paused")}resume(){this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._state==="paused"&&(this._cooldownTimer=setTimeout(()=>{if(this._cooldownTimer=null,this._state==="paused"){if(!this._stream){this._state="stopped",this.start();return}this._state="listening",this._activationFrames=0}},this.COOLDOWN_MS))}stop(){this._state="stopped",this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._teardown()}async _tryAttachWorklet(t,e){if(!t.audioWorklet)return!1;try{const i=Vi(xn,"vad");await t.audioWorklet.addModule(i);const n=new AudioWorkletNode(t,"vad-energy-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:ki}});return n.port.onmessage=r=>{const o=r.data;!o||o.type!=="energy"||this._handleEnergy(o.rms||0)},e.connect(n),this._workletNode=n,!0}catch(i){return console.warn("[AlwaysOnVAD] AudioWorklet 不可用，回退 ScriptProcessor:",i),!1}}_attachLegacyProcessor(t,e){const i=t.createScriptProcessor(ki,1,1);i.onaudioprocess=n=>{if(this._state!=="listening")return;const r=n.inputBuffer.getChannelData(0);let o=0;for(let a=0;a<r.length;a++)o+=r[a]*r[a];const l=Math.sqrt(o/r.length);this._handleEnergy(l)},e.connect(i),i.connect(t.destination),this._legacyProcessor=i}_handleEnergy(t){this._state==="listening"&&(t>this.ENERGY_THRESHOLD?(this._activationFrames++,this._activationFrames>=this.ACTIVATION_THRESHOLD&&(this._activationFrames=0,this._state="paused",this._teardown(),this._onActivated())):this._activationFrames=0)}_teardown(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._source){try{this._source.disconnect()}catch{}this._source=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._stream&&(this._stream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._stream=null)}}var Sn=Object.defineProperty,An=Object.getOwnPropertyDescriptor,M=(s,t,e,i)=>{for(var n=i>1?void 0:i?An(t,e):t,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(t,e,n):o(n))||n);return i&&n&&Sn(t,e,n),n};let R=class extends D{constructor(){super(...arguments),this.activeRoomId="all",this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this.devices=[],this.energyStats=[],this.frigateEvents=[],this.criticalEvent=null,this.activeDetailEntity=null,this.isRecording=!1,this.isConnected=!1,this.isConfiguring=!1,this.connectionError="",this.isPairingStep=!1,this.gatewayBase="",this.gatewayToken="",this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.isPairing=!1,this.voiceText="点击开始语音指令",this.voiceReply="",this.waveData=new Array(20).fill(0),this.pipelineStage="idle",this.theme="dark",this._voicePipeline=null,this._alwaysOnVad=null,this._lastStt="",this.alwaysOnEnabled=!1,this._expressWatchTimer=null,this._sceneRefreshTimer=null,this.rooms=[{id:"all",name:"全部"}],this.scenes=[],this.probeStatus=""}firstUpdated(){const s=localStorage.getItem("sa-theme");s&&(this.theme=s,s==="light"&&this.classList.add("theme-light")),Promise.resolve().then(()=>this._initConnection())}_toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",this.theme==="light"?this.classList.add("theme-light"):this.classList.remove("theme-light"),localStorage.setItem("sa-theme",this.theme)}async _initConnection(){const s=new URLSearchParams(window.location.search),t=s.get("gateway_token");if(t){this.gatewayToken=t,localStorage.setItem("gateway_token",t);try{s.delete("gateway_token");const e=s.toString(),i=window.location.pathname+(e?`?${e}`:"")+window.location.hash;window.history.replaceState({},"",i)}catch{}}else this.gatewayToken=localStorage.getItem("gateway_token")||"";this.gatewayBase=window.location.origin,this.gatewayToken?this._tryConnect():(this.isConfiguring=!0,this.isPairingStep=!1,this._startExpressWatch())}_startExpressWatch(){this._stopExpressWatch();let s=0;const t=async()=>{if(!(this.isConnected||!this.isConfiguring||this.isPairing)){s++;try{const e=this.gatewayBase.trim(),i=`${e}/api/v1/device/pair/start`;this.probeStatus=`探测中 #${s}...`;const r=await(await fetch(i,{signal:AbortSignal.timeout(3e3)})).json();if(r.token){this.probeStatus="收到 Token，正在连接...",this._stopExpressWatch();const o=r.gateway_token||"";o&&(this.gatewayToken=o,localStorage.setItem("gateway_token",o));const l=window.location.origin.includes(":5173");this.gatewayBase=l?"":r.url||e,this._tryConnect();return}this.probeStatus=`等待极速配对... (#${s})`}catch(e){console.warn(`[probe #${s}] 失败:`,e.message),this.probeStatus=`探测失败: ${e.message}`}this.isConfiguring&&!this.isConnected&&!this.isPairing&&(this._expressWatchTimer=setTimeout(t,2e3))}};this._expressWatchTimer=setTimeout(t,1500)}_stopExpressWatch(){this._expressWatchTimer!==null&&(clearTimeout(this._expressWatchTimer),this._expressWatchTimer=null)}async _tryConnect(){this._stopExpressWatch();try{if(this.connectionError="",!this.gatewayToken)throw new Error("GATEWAY_TOKEN_REQUIRED");await Hi.connect(this.gatewayToken),this.isConnected=!0,this.isConfiguring=!1;const t=localStorage.getItem("sa_voice_legacy_event_compat")==="1";this._voicePipeline=new wn({gatewayBaseUrl:this.gatewayBase||window.location.origin,gatewayToken:this.gatewayToken,enableLegacyVoiceEventCompat:t},{onStageChange:(e,i)=>{var n,r;this.pipelineStage=e,e==="stt"?(this.isRecording=!0,this.voiceText="正在聆听中..."):e==="intent"?(this.isRecording=!1,this._lastStt||(this.voiceText="AI 理解中...")):e==="tts"||e==="playing"?this.voiceText=this.voiceReply||"正在生成回复...":e==="idle"?(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"随时说话...":"点击开始语音指令",this.waveData=new Array(20).fill(0),this._lastStt="",setTimeout(()=>{this.voiceReply=""},8e3),this.alwaysOnEnabled&&((n=this._alwaysOnVad)==null||n.resume())):e==="error"&&(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"出错了，继续监听中...":i||"出现错误，请重试",this.waveData=new Array(20).fill(0),this._lastStt="",this.alwaysOnEnabled&&((r=this._alwaysOnVad)==null||r.resume()))},onSttResult:e=>{this._lastStt=e,this.voiceText=`"${e}"`},onReply:e=>{this.voiceReply=e},onError:e=>{var i;console.error("[VoicePipeline]",e),this.voiceText=e,this.isRecording=!1,this.alwaysOnEnabled&&((i=this._alwaysOnVad)==null||i.resume())},onWaveData:e=>{this.waveData=[...e]}}),this._alwaysOnVad=new En(async()=>{!this._voicePipeline||this._voicePipeline.isRunning||(this.voiceText="检测到语音，正在识别...",await this._voicePipeline.start())}),Ce.subscribe((e,i,n,r,o,l)=>{this.devices=[...e],this.aiState={...i},this.energyStats=[...n],this.frigateEvents=[...r],this.rooms=[...o],this.criticalEvent=l}),await this._refreshAiScenes(),this._sceneRefreshTimer&&clearInterval(this._sceneRefreshTimer),this._sceneRefreshTimer=setInterval(()=>this._refreshAiScenes(),3e4)}catch(s){console.error("Connection failed",s),this.isConnected=!1,this.isConfiguring=!0,s.message==="GATEWAY_TOKEN_REQUIRED"?this.connectionError="缺少 Gateway Token：请通过一键配对获取 gateway_token，或在本地存储中提供 gateway_token":this.connectionError=s.message==="AUTH_REQUIRED"?"访问令牌无效或已过期":"无法连接到 Home Assistant 服务器"}}async _toggleVoice(){if(!this._voicePipeline){this.voiceText="语音功能初始化中...";return}this._voicePipeline.isRunning?this._voicePipeline.stop():await this._voicePipeline.start()}async _startRecording(){await this._toggleVoice()}async _stopRecording(){var s;(s=this._voicePipeline)==null||s.stop()}async _toggleAlwaysOn(){if(this._alwaysOnVad)if(this.alwaysOnEnabled)this._alwaysOnVad.stop(),this.alwaysOnEnabled=!1,this.voiceText="点击开始语音指令";else{const s=await this._alwaysOnVad.start();this.alwaysOnEnabled=s,this.voiceText=s?"随时说话...":"无法访问麦克风，免唤醒未开启"}}_renderActiveRoomView(){const s=this.activeRoomId,t=s==="all"?this.devices:this.devices.filter(r=>r.roomId===s);if(t.length===0&&s!=="all")return g`
        <div style="text-align: center; padding: 100px 20px; color: rgba(255,255,255,0.15);">
          <span class="icon-main" style="font-size: 64px; margin-bottom: 24px; display: block; opacity: 0.1;">devices_other</span>
          <div style="font-size: 16px; font-weight: 700;">该区域暂无托管设备</div>
        </div>
      `;const e=this.scenes.filter(r=>s==="all"?r.roomId==="all":r.roomId===s),i=this.devices.filter(r=>r.type==="scene"&&(s==="all"||r.roomId===s)),n=[{id:"light",name:"照明",icon:"lightbulb"},{id:"climate",name:"环境",icon:"thermostat"},{id:"cover",name:"遮蔽",icon:"curtains"},{id:"sensor",name:"感应",icon:"sensors"},{id:"other",name:"其他",icon:"more_horiz"}];return g`
      <div class="room-content" style="padding-top: 0;">
        <!-- 场景区 -->
        ${e.length>0||i.length>0?g`
          <div class="category-group">
            <div class="section-label">
              <span class="icon-main">auto_awesome</span> 场景模式
            </div>
            <div class="scene-grid-orb">
              ${e.map(r=>g`<scene-card .scene="${r}" .isAiRecommended="${r.isAi}"></scene-card>`)}
              ${i.map(r=>g`<scene-card .scene="${r}" .isAiRecommended="${!0}"></scene-card>`)}
            </div>
          </div>
        `:""}

        <!-- 设备分类区 -->
        ${n.map(r=>{const o=t.filter(a=>r.id==="other"?!["light","climate","cover","sensor","scene"].includes(a.type):a.type===r.id);if(o.length===0)return"";let l=`${o.length} 个设备`;if(r.id==="light"){const a=o.filter(d=>d.state==="on").length;l=a===0?"灯全部关了":`${a} 盏灯开启中`}return g`
            <div class="category-group">
              <div class="section-label">
                <span class="icon-main">${r.icon}</span> ${r.name} <span style="opacity:0.4; font-size:13px; font-weight:600; margin-left:8px;">| ${l}</span>
              </div>
              <div class="device-grid-orb">
                ${o.map(a=>{const d=this.aiState.recentAiActions.includes(a.id);return a.type==="light"?g`<light-card .device="${a}" .isAiControlled="${d}"></light-card>`:a.type==="climate"?g`<climate-card .device="${a}" .isAiControlled="${d}"></climate-card>`:a.type==="cover"?g`<cover-card .device="${a}" .isAiControlled="${d}"></cover-card>`:a.type==="sensor"?g`<sensor-card .device="${a}"></sensor-card>`:g`<generic-device-card .device="${a}" .isAiControlled="${d}"></generic-device-card>`})}
              </div>
            </div>
          `})}
      </div>
    `}_gatewayApiBase(){let s=(this.gatewayBase||"").trim();return!s||window.location.origin.includes(":5173")?"":(s.startsWith("http")||(s="http://"+s),s.endsWith("/")?s.slice(0,-1):s)}_gatewayJsonHeaders(){const s={"Content-Type":"application/json"};return this.gatewayToken&&(s.Authorization=`Bearer ${this.gatewayToken}`,s["X-SA-Token"]=this.gatewayToken),s}async _fetchGatewayJson(s){const t=await fetch(`${this._gatewayApiBase()}${s}`,{headers:this._gatewayJsonHeaders(),signal:AbortSignal.timeout(15e3)}),e=await t.text();let i={};if(e)try{i=JSON.parse(e)}catch{i={raw:e}}if(!t.ok)throw new Error((i==null?void 0:i.error)||(i==null?void 0:i.message)||`Gateway request failed: ${t.status}`);return i}async _postGatewayJson(s,t){const e=await fetch(`${this._gatewayApiBase()}${s}`,{method:"POST",headers:this._gatewayJsonHeaders(),body:JSON.stringify(t),signal:AbortSignal.timeout(15e3)}),i=await e.text();let n={};if(i)try{n=JSON.parse(i)}catch{n={raw:i}}if(!e.ok)throw new Error((n==null?void 0:n.error)||(n==null?void 0:n.message)||`Gateway request failed: ${e.status}`);return n}_extractRows(s,t){if(Array.isArray(s))return s;for(const e of[t,"items","data","rows","result"]){const i=s==null?void 0:s[e];if(Array.isArray(i))return i}return[]}async _refreshAiScenes(){try{const s=await this._fetchGatewayJson("/ai-scenes"),e=this._extractRows(s,"scenes").map(i=>this._normalizeAiScene(i)).filter(i=>!!i);this.scenes=vn(e,this._scenePreferredRoomNames())}catch(s){console.warn("[Scenes] 刷新 AI 场景失败:",s)}}_scenePreferredRoomNames(){const s={};for(const t of this.rooms||[]){const e=String((t==null?void 0:t.id)||"").trim(),i=String((t==null?void 0:t.name)||"").trim();e&&e!=="all"&&i&&(s[e]=i)}return s}_normalizeAiScene(s){if(!s||typeof s!="object")return null;const t=String(s.id??"").trim();if(!t)return null;const e=String(s.status||s.lifecycle_state||"").trim().toLowerCase();if(e&&!["approved","active"].includes(e)||!(typeof s.executable=="boolean"?s.executable:Number(s.action_count||s.raw_action_count||0)>0))return null;const n=String(s.source_id||"").trim(),r=String(s.title||s.name||n||`AI 场景 ${t}`).trim();return{id:t,name:r,icon:this._sceneIcon(s,n),isAi:!0,roomId:this._sceneRoomId(s,n,r),sourceId:n,gatewayTriggerPath:`/ai-scenes/${encodeURIComponent(t)}/trigger`}}_sceneIcon(s,t){const e=String((s==null?void 0:s.icon)||"").trim();if(e)return e;const i=t.split(":").pop()||"";return i==="all_off"?"light_off":i==="all_on"?"lightbulb":i==="bright"?"wb_sunny":i==="soft"?"brightness_5":i==="night"?"nightlight":i==="glow"?"bedtime":"auto_awesome"}_sceneRoomId(s,t,e){const i=this._roomIdFromFixedLightingSource(t);if(i)return i;const n=String((s==null?void 0:s.room)||(s==null?void 0:s.area)||(s==null?void 0:s.space)||(s==null?void 0:s.room_id)||(s==null?void 0:s.space_id)||"").trim();return n?this._mapRoomToId(n):this._knownRoomIdFromText(e)||"all"}_roomIdFromFixedLightingSource(s){if(s.startsWith("system_fixed_lighting:home:"))return"all";const t=s.match(/^system_fixed_lighting:room:([^:]+):/);return t!=null&&t[1]?this._mapRoomToId(t[1]):""}_knownRoomIdFromText(s){const t=s.toLowerCase();if(t.includes("全屋")||t.includes("全部")||t.includes("whole_home"))return"all";if(t.includes("厨房")||t.includes("kitchen"))return"kitchen";const e=t.includes("客厅")||t.includes("living"),i=t.includes("餐厅")||t.includes("dining");return e&&i?"living_dining":e?"living":i?"dining":t.includes("书房")||t.includes("study")?"study":t.includes("卧室")||t.includes("bedroom")?"bedroom":t.includes("卫生间")||t.includes("卫浴")||t.includes("bathroom")?"bathroom":t.includes("阳台")||t.includes("balcony")?"balcony":t.includes("玄关")||t.includes("entry")?"entry":t.includes("走廊")||t.includes("hallway")||t.includes("corridor")?"hallway":""}_mapRoomToId(s){const t=ze(s)||this._knownRoomIdFromText(s);return t||String(s||"").trim().toLowerCase().replace(/\s+/g,"_")}_commandEntityId(s){var n;const t=(n=s.data)==null?void 0:n.entity_id,e=Array.isArray(t)?t[0]:t,i=String(e||"").trim();return i?i.includes(".")||!s.domain?i:`${s.domain}.${i}`:""}_capabilityForDomain(s){return s==="light"||s==="switch"?"lighting":s==="media_player"?"media":s||"unknown"}_deviceRegistryForCommand(s,t){const e=this.devices.find(i=>{var n;return i.id===t||i.id===((n=s.data)==null?void 0:n.entity_id)});return[{entity_id:t,domain:s.domain,capability:this._capabilityForDomain(s.domain),name:(e==null?void 0:e.name)||t,room:(e==null?void 0:e.room)||(e==null?void 0:e.roomId)||"",space_id:(e==null?void 0:e.roomId)||(e==null?void 0:e.room)||"",risk_level:"safe",supported_services:[s.service]}]}async _executeServiceThroughGateway(s){const t=this._commandEntityId(s);if(!t||!s.domain||!s.service)throw new Error("invalid_screen_service_call");const e={source:"smart-control-screen",execution_path:"command_envelope"},i={...s.data||{},entity_id:t},n={request_id:`screen-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,source:e.source,scope:"home_control",commands:[{entity_id:t,domain:s.domain,service:s.service,data:i}],safety:{risk_level:"safe",requires_confirmation:!1,context:{surface:"smart-control-screen"}},devices:this._deviceRegistryForCommand(s,t)},r=await this._postGatewayJson("/api/v1/ha/execute",n);if(r!=null&&r.execution_path&&r.execution_path!==e.execution_path)throw new Error(`unexpected_execution_path:${r.execution_path}`);return r}async _reportCorrectionThroughGateway(s,t){return this._postGatewayJson("/api/v1/corrections/report",{entity_id:s,user_service:t.service,user_state:t.service,context:"smart-control-screen manual override",source:"smart-control-screen",reason:"screen_manual_override"})}async _requestManualInferenceThroughGateway(s){return this._postGatewayJson("/api/v1/infer",{trigger:s,source:"smart-control-screen",is_manual:!0,context_text:"",devices:this.devices.slice(0,50).map(t=>({entity_id:t.id,domain:t.id.split(".",1)[0],state:t.state,room:t.room,room_id:t.roomId}))})}async _triggerAiSceneThroughGateway(s){const t=String(s||"").trim();if(!t)throw new Error("invalid_ai_scene_id");return this._postGatewayJson(`/ai-scenes/${encodeURIComponent(t)}/trigger`,{})}_refreshDeviceStateAfterGatewayAction(){Ce.refreshManagedDevices(),setTimeout(()=>{Ce.refreshManagedDevices()},1200)}async _handleServiceCall(s){var i;const t=s.detail;if(t.domain==="smart_agent"&&t.service==="trigger_ai_scene"){try{await this._triggerAiSceneThroughGateway(String(((i=t.data)==null?void 0:i.scene_id)||"")),this._refreshDeviceStateAfterGatewayAction()}catch(n){console.error("[SceneTrigger] AI 场景触发失败:",n)}return}const e=this._commandEntityId(t);if(e&&this.aiState.recentAiActions.includes(e))try{await this._reportCorrectionThroughGateway(e,t)}catch(n){console.warn("[Correction] 纠错上报失败:",n)}try{await this._executeServiceThroughGateway(t),this._refreshDeviceStateAfterGatewayAction()}catch(n){console.error("[ServiceCall] 指令发送失败:",n)}}async _startPairing(){if(!this.isPairing){this._stopExpressWatch(),this.isPairing=!0,this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.connectionError="";try{let s=this.gatewayBase.trim();s&&!s.startsWith("http")&&(s="http://"+s),s.endsWith("/")&&(s=s.slice(0,-1));const t=await fetch(`${s}/api/v1/device/pair/start`,{method:"POST"});let e={};try{e=await t.json()}catch{e={}}if(!t.ok){const i=String((e==null?void 0:e.error)||(e==null?void 0:e.message)||`HTTP_${t.status}`);throw t.status===409&&i==="pairing_window_not_open"?new Error("PAIRING_WINDOW_NOT_OPEN"):new Error(i||"API_FAILED")}if(e.token){const i=e.gateway_token||"";i&&(this.gatewayToken=i,localStorage.setItem("gateway_token",i));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||s,this.isPairing=!1,this._tryConnect();return}this.pairingCode=e.code||"",this.authUrl=e.auth_url||"",this.authUrl&&(this.qrDataUrl=await Ls.toDataURL(this.authUrl,{width:200,margin:1,color:{dark:"#1a1a2e",light:"#ffffff"}})),this.isPairingStep=!1,this._pollPairingStatus(s)}catch(s){console.error("Pairing failed",s),this.connectionError=(s==null?void 0:s.message)==="PAIRING_WINDOW_NOT_OPEN"?"请先在 8234 管理端「授权」页面点击开启配对，然后 60 秒内回到中控屏点击一键连接":"无法连接到配对服务器",this.isPairingStep=!1,this.isPairing=!1}}}async _pollPairingStatus(s){if(this.isPairing)try{const t=await fetch(`${s}/api/v1/device/pair/confirm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:this.pairingCode})}),e=await t.json();if(!t.ok)throw new Error(String((e==null?void 0:e.error)||"API_FAILED"));if(e.ok){const i=e.gateway_token||"";i&&(this.gatewayToken=i,localStorage.setItem("gateway_token",i));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||s,this.isPairing=!1,this.isPairingStep=!0,this._tryConnect()}else e.error==="EXPIRED"?(this.connectionError='配对码已过期，请重新点击"一键连接"',this.isPairing=!1,this.isPairingStep=!1):setTimeout(()=>this._pollPairingStatus(s),2e3)}catch(t){console.warn("Polling pairing status failed",t),setTimeout(()=>this._pollPairingStatus(s),5e3)}}_renderConfigScreen(){return g`
      <div style="display:flex; height:100vh; align-items:center; justify-content:center; padding: 20px; box-sizing: border-box; overflow: hidden;">
        <glass-card variant="elevated" style="width: 100%; max-width: 480px; min-height: 420px; padding: 48px; display: flex; flex-direction: column; justify-content: center; gap: 40px; position: relative; border-radius: 32px;">
          
          <!-- 智能引导头部 -->
          <div style="text-align: center;">
            <div style="font-size: 42px; font-weight: 900; background: linear-gradient(135deg, #B388FF 0%, #82B1FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; letter-spacing: -1.5px;">
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
                <span class="icon-main" style="font-size: 48px; position: relative; z-index: 1;">bolt</span>
                <div style="font-weight: 900; font-size: 22px; position: relative; z-index: 1;">一键连接</div>
                <div style="font-size: 13px; opacity: 0.8; font-weight: 500; position: relative; z-index: 1;">免扫码或扫码一键授权</div>
              </button>

              <div style="text-align: center; opacity: 0.3; font-size: 13px; font-weight: 500;">
                手动地址与手动令牌模式已禁用（Gateway-only）
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
            ${(this.pairingCode||"").split("").map(s=>g`
              <div style="width: 38px; height: 52px; background: rgba(179,136,255,0.1); border: 2px solid rgba(179,136,255,0.3); border-radius: 12px; font-size: 26px; font-weight: 900; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; color: #B388FF; box-shadow: 0 4px 16px rgba(179,136,255,0.2);">
                ${s}
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
    `}render(){return this.isConfiguring?this._renderConfigScreen():this.isConnected?g`
      <div class="container" 
        @service-call="${this._handleServiceCall}"
        @show-detail="${s=>{const t=this.devices.find(e=>e.id===s.detail.entityId);t&&(this.activeDetailEntity=t)}}"
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
              <span class="status-value">3.4kWh</span>
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
              ${this.rooms.map(s=>g`
                <div 
                  class="room-tab ${this.activeRoomId===s.id?"active":""}"
                  @click="${()=>this.activeRoomId=s.id}"
                >${s.name}</div>
              `)}
            </div>
          </div>
          ${this._renderActiveRoomView()}
        </div>

        <!-- 4. 底栏：语音交互 -->
        <div class="voice">
          <div class="voice-interactive-zone">
            <voice-bar 
              .isRecording="${this.isRecording}" 
              .status="${this.pipelineStage==="intent"||this.pipelineStage==="tts"?"processing":this.pipelineStage==="playing"?"done":this.pipelineStage}"
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

          <!-- AI Reply Overlay (Ambient) -->
          ${this.voiceReply?g`
            <div style="position:absolute; bottom:130px; left:50%; transform:translateX(-50%); width:90%; background:linear-gradient(90deg, var(--ai-purple), var(--ai-cyan)); padding:20px 40px; border-radius:32px; box-shadow:0 15px 50px rgba(0,229,255,0.3); animation:slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display:flex; align-items:center; gap:20px;">
              <span class="icon-main" style="color:white; font-size:32px;">auto_awesome</span>
              <span style="font-size:18px; font-weight:800; color:white;">${this.voiceReply}</span>
            </div>
          `:""}
        </div>

        <!-- 5. 关键视觉事件大图弹出 (Critical Event Overlay) -->
        ${this.criticalEvent?g`
          <div class="critical-overlay">
            <div class="critical-card">
              <div class="critical-header">
                <div style="display:flex; align-items:center; gap:12px;">
                  <span class="pulse-dot" style="background:#ff5252;"></span>
                  <span style="font-weight:900; color:#ff5252; letter-spacing:1px; font-size:12px;">CRITICAL EVENT</span>
                </div>
                <div class="critical-time" style="font-size:12px; opacity:0.4; font-weight:700;">
                  ${new Date(this.criticalEvent.time*1e3).toLocaleTimeString()}
                </div>
              </div>
              
              <div class="critical-camera-name" style="margin: 12px 0; font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
                <span class="icon-main" style="font-size:24px; opacity:0.5;">videocam</span>
                ${this.criticalEvent.camera_name}
              </div>

              <div class="critical-snapshot-box" style="width:100%; border-radius:24px; overflow:hidden; position:relative; aspect-ratio:16/9; background:#000;">
                <img src="${this.gatewayBase}${this.criticalEvent.snapshot}" style="width:100%; height:100%; object-fit:cover;" alt="Critical Snapshot">
                <div class="snapshot-label" style="position:absolute; bottom:16px; left:16px; background:rgba(0,0,0,0.6); padding:6px 12px; border-radius:8px; font-size:11px; font-weight:700; backdrop-filter:blur(10px);">检测到人员停留</div>
              </div>

              <div class="critical-ai-insight" style="margin-top:20px; padding:20px; background:rgba(179,136,255,0.08); border-radius:20px; border:1px solid rgba(179,136,255,0.15); display:flex; gap:16px; align-items:flex-start;">
                <span class="icon-main" style="color:var(--ai-purple); font-size:32px;">psychology</span>
                <div style="flex:1;">
                  <div style="font-size:10px; opacity:0.5; font-weight:900; text-transform:uppercase; margin-bottom:6px; letter-spacing:1px;">AI INSIGHT</div>
                  <div style="font-size:14px; font-weight:600; line-height:1.6; color:rgba(255,255,255,0.9);">
                    门口发现可疑停留，置信度 ${Math.round(this.criticalEvent.score*100)}%。建议开启玄关灯并发出语音询问。
                  </div>
                </div>
              </div>

              <div class="critical-actions" style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                <button class="critical-btn secondary" 
                  style="padding:18px; border-radius:16px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:white; font-weight:800; font-size:15px; cursor:pointer;"
                  @click="${()=>this.criticalEvent=null}">忽略此事件</button>
                <button class="critical-btn primary" 
                  style="padding:18px; border-radius:16px; border:none; background:var(--ai-purple); color:white; font-weight:800; font-size:15px; cursor:pointer; box-shadow:0 8px 24px rgba(179,136,255,0.3);"
                  @click="${async()=>{const s=this.criticalEvent;s&&(await this._requestManualInferenceThroughGateway(`[视觉主动] ${s.camera_name} 发现人员长时间停留`),this.criticalEvent=null)}}">允许 AI 处理</button>
              </div>
            </div>
          </div>
        `:""}

        <!-- 6. 设备深度控制面板 (Detail Overlay) -->
        ${this.activeDetailEntity?g`
          <div class="critical-overlay" @click="${()=>this.activeDetailEntity=null}">
            <div class="detail-card" @click="${s=>s.stopPropagation()}">
              <div class="detail-header">
                <div style="display:flex; align-items:center; gap:16px;">
                  <div class="icon-box" style="width:48px; height:48px; border-radius:14px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center;">
                    <span class="icon-main" style="font-size:24px;">
                      ${this.activeDetailEntity.type==="light"?"lightbulb":"ac_unit"}
                    </span>
                  </div>
                  <div>
                    <div style="font-size:18px; font-weight:800;">${this.activeDetailEntity.name}</div>
                    <div style="font-size:12px; opacity:0.4;">${this.activeDetailEntity.room}</div>
                  </div>
                </div>
                <button 
                  style="width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.05); color:white; cursor:pointer;"
                  @click="${()=>this.activeDetailEntity=null}"
                >
                  <span class="icon-main">close</span>
                </button>
              </div>

              <div class="detail-content" style="margin-top:24px;">
                ${this.activeDetailEntity.type==="light"?g`
                  <light-detail-panel .device="${this.activeDetailEntity}"></light-detail-panel>
                `:this.activeDetailEntity.type==="climate"?g`
                  <climate-detail-panel .device="${this.activeDetailEntity}"></climate-detail-panel>
                `:""}
              </div>
            </div>
          </div>
        `:""}
      </div>
    `:g`<div style="display:flex; height:100vh; align-items:center; justify-content:center;">正在连接...</div>`}};R.styles=B`
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

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;M([I()],R.prototype,"activeRoomId",2);M([I()],R.prototype,"aiState",2);M([I()],R.prototype,"devices",2);M([I()],R.prototype,"energyStats",2);M([I()],R.prototype,"frigateEvents",2);M([I()],R.prototype,"criticalEvent",2);M([I()],R.prototype,"activeDetailEntity",2);M([I()],R.prototype,"isRecording",2);M([I()],R.prototype,"isConnected",2);M([I()],R.prototype,"isConfiguring",2);M([I()],R.prototype,"connectionError",2);M([I()],R.prototype,"isPairingStep",2);M([I()],R.prototype,"gatewayBase",2);M([I()],R.prototype,"gatewayToken",2);M([I()],R.prototype,"pairingCode",2);M([I()],R.prototype,"authUrl",2);M([I()],R.prototype,"qrDataUrl",2);M([I()],R.prototype,"isPairing",2);M([I()],R.prototype,"voiceText",2);M([I()],R.prototype,"voiceReply",2);M([I()],R.prototype,"waveData",2);M([I()],R.prototype,"pipelineStage",2);M([I()],R.prototype,"theme",2);M([I()],R.prototype,"alwaysOnEnabled",2);M([I()],R.prototype,"rooms",2);M([I()],R.prototype,"scenes",2);M([I()],R.prototype,"probeStatus",2);R=M([z("smart-app-shell")],R);
