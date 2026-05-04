/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=globalThis,Se=Rt.ShadowRoot&&(Rt.ShadyCSS===void 0||Rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Ie=new WeakMap;let yi=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Se&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ie.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ie.set(e,t))}return t}toString(){return this.cssText}};const Oi=n=>new yi(typeof n=="string"?n:n+"",void 0,$e),O=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new yi(e,n,$e)},zi=(n,t)=>{if(Se)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Rt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Be=Se?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Oi(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fi,defineProperty:Ni,getOwnPropertyDescriptor:Li,getOwnPropertyNames:Ui,getOwnPropertySymbols:ji,getPrototypeOf:Hi}=Object,G=globalThis,De=G.trustedTypes,Wi=De?De.emptyScript:"",Qt=G.reactiveElementPolyfillSupport,mt=(n,t)=>n,Mt={toAttribute(n,t){switch(t){case Boolean:n=n?Wi:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ce=(n,t)=>!Fi(n,t),Oe={attribute:!0,type:String,converter:Mt,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),G.litPropertyMetadata??(G.litPropertyMetadata=new WeakMap);let st=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Oe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ni(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=Li(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);r==null||r.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oe}static _$Ei(){if(this.hasOwnProperty(mt("elementProperties")))return;const t=Hi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(mt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mt("properties"))){const e=this.properties,s=[...Ui(e),...ji(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Be(i))}else t!==void 0&&e.push(Be(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:Mt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var r,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:Mt;this._$Em=i;const d=a.fromAttribute(e,l.type);this[i]=d??((o=this._$Ej)==null?void 0:o.get(i))??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){var o;if(t!==void 0){const l=this.constructor;if(i===!1&&(r=this[t]),s??(s=l.getPropertyOptions(t)),!((s.hasChanged??Ce)(r,e)||s.useDefault&&s.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(l._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:l}=o,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};st.elementStyles=[],st.shadowRootOptions={mode:"open"},st[mt("elementProperties")]=new Map,st[mt("finalized")]=new Map,Qt==null||Qt({ReactiveElement:st}),(G.reactiveElementVersions??(G.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,ze=n=>n,It=bt.trustedTypes,Fe=It?It.createPolicy("lit-html",{createHTML:n=>n}):void 0,_i="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,xi="?"+V,qi=`<${xi}>`,Q=document,yt=()=>Q.createComment(""),_t=n=>n===null||typeof n!="object"&&typeof n!="function",Ae=Array.isArray,Vi=n=>Ae(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,ft=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Le=/>/g,J=RegExp(`>|${Xt}(?:([^\\s"'>=/]+)(${Xt}*=${Xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,je=/"/g,wi=/^(?:script|style|textarea|title)$/i,Gi=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),g=Gi(1),at=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),He=new WeakMap,Y=Q.createTreeWalker(Q,129);function Ei(n,t){if(!Ae(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(t):t}const Ji=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",o=ft;for(let l=0;l<e;l++){const a=n[l];let d,p,c=-1,h=0;for(;h<a.length&&(o.lastIndex=h,p=o.exec(a),p!==null);)h=o.lastIndex,o===ft?p[1]==="!--"?o=Ne:p[1]!==void 0?o=Le:p[2]!==void 0?(wi.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=J):p[3]!==void 0&&(o=J):o===J?p[0]===">"?(o=i??ft,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?J:p[3]==='"'?je:Ue):o===je||o===Ue?o=J:o===Ne||o===Le?o=ft:(o=J,i=void 0);const u=o===J&&n[l+1].startsWith("/>")?" ":"";r+=o===ft?a+qi:c>=0?(s.push(d),a.slice(0,c)+_i+a.slice(c)+V+u):a+V+(c===-2?l:u)}return[Ei(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class xt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[d,p]=Ji(t,e);if(this.el=xt.createElement(d,s),Y.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=Y.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(_i)){const h=p[o++],u=i.getAttribute(c).split(V),v=/([.?@])?(.*)/.exec(h);a.push({type:1,index:r,name:v[2],strings:u,ctor:v[1]==="."?Ki:v[1]==="?"?Qi:v[1]==="@"?Xi:jt}),i.removeAttribute(c)}else c.startsWith(V)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(wi.test(i.tagName)){const c=i.textContent.split(V),h=c.length-1;if(h>0){i.textContent=It?It.emptyScript:"";for(let u=0;u<h;u++)i.append(c[u],yt()),Y.nextNode(),a.push({type:2,index:++r});i.append(c[h],yt())}}}else if(i.nodeType===8)if(i.data===xi)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(V,c+1))!==-1;)a.push({type:7,index:r}),c+=V.length-1}r++}}static createElement(t,e){const s=Q.createElement("template");return s.innerHTML=t,s}}function lt(n,t,e=n,s){var o,l;if(t===at)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const r=_t(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=lt(n,i._$AS(n,t.values),i,s)),t}class Yi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??Q).importNode(e,!0);Y.currentNode=i;let r=Y.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new At(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Zi(r,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(r=Y.nextNode(),o++)}return Y.currentNode=Q,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class At{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=lt(this,t,e),_t(t)?t===N||t==null||t===""?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==at&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==N&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.T(Q.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=xt.createElement(Ei(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const o=new Yi(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=He.get(t.strings);return e===void 0&&He.set(t.strings,e=new xt(t)),e}k(t){Ae(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new At(this.O(yt()),this.O(yt()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=ze(t).nextSibling;ze(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class jt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=N}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=lt(this,t,e,0),o=!_t(t)||t!==this._$AH&&t!==at,o&&(this._$AH=t);else{const l=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=lt(this,l[s+a],e,a),d===at&&(d=this._$AH[a]),o||(o=!_t(d)||d!==this._$AH[a]),d===N?t=N:t!==N&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ki extends jt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===N?void 0:t}}class Qi extends jt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==N)}}class Xi extends jt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=lt(this,t,e,0)??N)===at)return;const s=this._$AH,i=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==N&&(s===N||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Zi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){lt(this,t)}}const Zt=bt.litHtmlPolyfillSupport;Zt==null||Zt(xt,At),(bt.litHtmlVersions??(bt.litHtmlVersions=[])).push("3.3.2");const ts=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new At(t.insertBefore(yt(),r),r,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis;class B extends st{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ts(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return at}}var bi;B._$litElement$=!0,B.finalized=!0,(bi=K.litElementHydrateSupport)==null||bi.call(K,{LitElement:B});const te=K.litElementPolyfillSupport;te==null||te({LitElement:B});(K.litElementVersions??(K.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const es={attribute:!0,type:String,converter:Mt,reflect:!1,hasChanged:Ce},is=(n=es,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+s)};function T(n){return(t,e)=>typeof e=="object"?is(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(n){return T({...n,state:!0,attribute:!1})}function ss(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var it={},ee,We;function ns(){return We||(We=1,ee=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ee}var ie={},q={},qe;function Z(){if(qe)return q;qe=1;let n;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return q.getSymbolSize=function(s){if(!s)throw new Error('"version" cannot be null or undefined');if(s<1||s>40)throw new Error('"version" should be in range from 1 to 40');return s*4+17},q.getSymbolTotalCodewords=function(s){return t[s]},q.getBCHDigit=function(e){let s=0;for(;e!==0;)s++,e>>>=1;return s},q.setToSJISFunction=function(s){if(typeof s!="function")throw new Error('"toSJISFunc" is not a valid function.');n=s},q.isKanjiModeEnabled=function(){return typeof n<"u"},q.toSJIS=function(s){return n(s)},q}var se={},Ve;function ke(){return Ve||(Ve=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+e)}}n.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},n.from=function(s,i){if(n.isValid(s))return s;try{return t(s)}catch{return i}}})(se)),se}var ne,Ge;function rs(){if(Ge)return ne;Ge=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let s=0;s<e;s++)this.putBit((t>>>e-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},ne=n,ne}var re,Je;function os(){if(Je)return re;Je=1;function n(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return n.prototype.set=function(t,e,s,i){const r=t*this.size+e;this.data[r]=s,i&&(this.reservedBit[r]=!0)},n.prototype.get=function(t,e){return this.data[t*this.size+e]},n.prototype.xor=function(t,e,s){this.data[t*this.size+e]^=s},n.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},re=n,re}var oe={},Ye;function as(){return Ye||(Ye=1,(function(n){const t=Z().getSymbolSize;n.getRowColCoords=function(s){if(s===1)return[];const i=Math.floor(s/7)+2,r=t(s),o=r===145?26:Math.ceil((r-13)/(2*i-2))*2,l=[r-7];for(let a=1;a<i-1;a++)l[a]=l[a-1]-o;return l.push(6),l.reverse()},n.getPositions=function(s){const i=[],r=n.getRowColCoords(s),o=r.length;for(let l=0;l<o;l++)for(let a=0;a<o;a++)l===0&&a===0||l===0&&a===o-1||l===o-1&&a===0||i.push([r[l],r[a]]);return i}})(oe)),oe}var ae={},Ke;function ls(){if(Ke)return ae;Ke=1;const n=Z().getSymbolSize,t=7;return ae.getPositions=function(s){const i=n(s);return[[0,0],[i-t,0],[0,i-t]]},ae}var le={},Qe;function cs(){return Qe||(Qe=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};n.isValid=function(i){return i!=null&&i!==""&&!isNaN(i)&&i>=0&&i<=7},n.from=function(i){return n.isValid(i)?parseInt(i,10):void 0},n.getPenaltyN1=function(i){const r=i.size;let o=0,l=0,a=0,d=null,p=null;for(let c=0;c<r;c++){l=a=0,d=p=null;for(let h=0;h<r;h++){let u=i.get(c,h);u===d?l++:(l>=5&&(o+=t.N1+(l-5)),d=u,l=1),u=i.get(h,c),u===p?a++:(a>=5&&(o+=t.N1+(a-5)),p=u,a=1)}l>=5&&(o+=t.N1+(l-5)),a>=5&&(o+=t.N1+(a-5))}return o},n.getPenaltyN2=function(i){const r=i.size;let o=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const d=i.get(l,a)+i.get(l,a+1)+i.get(l+1,a)+i.get(l+1,a+1);(d===4||d===0)&&o++}return o*t.N2},n.getPenaltyN3=function(i){const r=i.size;let o=0,l=0,a=0;for(let d=0;d<r;d++){l=a=0;for(let p=0;p<r;p++)l=l<<1&2047|i.get(d,p),p>=10&&(l===1488||l===93)&&o++,a=a<<1&2047|i.get(p,d),p>=10&&(a===1488||a===93)&&o++}return o*t.N3},n.getPenaltyN4=function(i){let r=0;const o=i.data.length;for(let a=0;a<o;a++)r+=i.data[a];return Math.abs(Math.ceil(r*100/o/5)-10)*t.N4};function e(s,i,r){switch(s){case n.Patterns.PATTERN000:return(i+r)%2===0;case n.Patterns.PATTERN001:return i%2===0;case n.Patterns.PATTERN010:return r%3===0;case n.Patterns.PATTERN011:return(i+r)%3===0;case n.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(r/3))%2===0;case n.Patterns.PATTERN101:return i*r%2+i*r%3===0;case n.Patterns.PATTERN110:return(i*r%2+i*r%3)%2===0;case n.Patterns.PATTERN111:return(i*r%3+(i+r)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}n.applyMask=function(i,r){const o=r.size;for(let l=0;l<o;l++)for(let a=0;a<o;a++)r.isReserved(a,l)||r.xor(a,l,e(i,a,l))},n.getBestMask=function(i,r){const o=Object.keys(n.Patterns).length;let l=0,a=1/0;for(let d=0;d<o;d++){r(d),n.applyMask(d,i);const p=n.getPenaltyN1(i)+n.getPenaltyN2(i)+n.getPenaltyN3(i)+n.getPenaltyN4(i);n.applyMask(d,i),p<a&&(a=p,l=d)}return l}})(le)),le}var Tt={},Xe;function Si(){if(Xe)return Tt;Xe=1;const n=ke(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Tt.getBlocksCount=function(i,r){switch(r){case n.L:return t[(i-1)*4+0];case n.M:return t[(i-1)*4+1];case n.Q:return t[(i-1)*4+2];case n.H:return t[(i-1)*4+3];default:return}},Tt.getTotalCodewordsCount=function(i,r){switch(r){case n.L:return e[(i-1)*4+0];case n.M:return e[(i-1)*4+1];case n.Q:return e[(i-1)*4+2];case n.H:return e[(i-1)*4+3];default:return}},Tt}var ce={},vt={},Ze;function ds(){if(Ze)return vt;Ze=1;const n=new Uint8Array(512),t=new Uint8Array(256);return(function(){let s=1;for(let i=0;i<255;i++)n[i]=s,t[s]=i,s<<=1,s&256&&(s^=285);for(let i=255;i<512;i++)n[i]=n[i-255]})(),vt.log=function(s){if(s<1)throw new Error("log("+s+")");return t[s]},vt.exp=function(s){return n[s]},vt.mul=function(s,i){return s===0||i===0?0:n[t[s]+t[i]]},vt}var ti;function hs(){return ti||(ti=1,(function(n){const t=ds();n.mul=function(s,i){const r=new Uint8Array(s.length+i.length-1);for(let o=0;o<s.length;o++)for(let l=0;l<i.length;l++)r[o+l]^=t.mul(s[o],i[l]);return r},n.mod=function(s,i){let r=new Uint8Array(s);for(;r.length-i.length>=0;){const o=r[0];for(let a=0;a<i.length;a++)r[a]^=t.mul(i[a],o);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},n.generateECPolynomial=function(s){let i=new Uint8Array([1]);for(let r=0;r<s;r++)i=n.mul(i,new Uint8Array([1,t.exp(r)]));return i}})(ce)),ce}var de,ei;function ps(){if(ei)return de;ei=1;const n=hs();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(s){this.degree=s,this.genPoly=n.generateECPolynomial(this.degree)},t.prototype.encode=function(s){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(s.length+this.degree);i.set(s);const r=n.mod(i,this.genPoly),o=this.degree-r.length;if(o>0){const l=new Uint8Array(this.degree);return l.set(r,o),l}return r},de=t,de}var he={},pe={},ue={},ii;function $i(){return ii||(ii=1,ue.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),ue}var U={},si;function Ci(){if(si)return U;si=1;const n="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const s="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;U.KANJI=new RegExp(e,"g"),U.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),U.BYTE=new RegExp(s,"g"),U.NUMERIC=new RegExp(n,"g"),U.ALPHANUMERIC=new RegExp(t,"g");const i=new RegExp("^"+e+"$"),r=new RegExp("^"+n+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return U.testKanji=function(a){return i.test(a)},U.testNumeric=function(a){return r.test(a)},U.testAlphanumeric=function(a){return o.test(a)},U}var ni;function tt(){return ni||(ni=1,(function(n){const t=$i(),e=Ci();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(r,o){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?r.ccBits[0]:o<27?r.ccBits[1]:r.ccBits[2]},n.getBestModeForData=function(r){return e.testNumeric(r)?n.NUMERIC:e.testAlphanumeric(r)?n.ALPHANUMERIC:e.testKanji(r)?n.KANJI:n.BYTE},n.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},n.isValid=function(r){return r&&r.bit&&r.ccBits};function s(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+i)}}n.from=function(r,o){if(n.isValid(r))return r;try{return s(r)}catch{return o}}})(pe)),pe}var ri;function us(){return ri||(ri=1,(function(n){const t=Z(),e=Si(),s=ke(),i=tt(),r=$i(),o=7973,l=t.getBCHDigit(o);function a(h,u,v){for(let k=1;k<=40;k++)if(u<=n.getCapacity(k,v,h))return k}function d(h,u){return i.getCharCountIndicator(h,u)+4}function p(h,u){let v=0;return h.forEach(function(k){const D=d(k.mode,u);v+=D+k.getBitsLength()}),v}function c(h,u){for(let v=1;v<=40;v++)if(p(h,v)<=n.getCapacity(v,u,i.MIXED))return v}n.from=function(u,v){return r.isValid(u)?parseInt(u,10):v},n.getCapacity=function(u,v,k){if(!r.isValid(u))throw new Error("Invalid QR Code version");typeof k>"u"&&(k=i.BYTE);const D=t.getSymbolTotalCodewords(u),$=e.getTotalCodewordsCount(u,v),P=(D-$)*8;if(k===i.MIXED)return P;const C=P-d(k,u);switch(k){case i.NUMERIC:return Math.floor(C/10*3);case i.ALPHANUMERIC:return Math.floor(C/11*2);case i.KANJI:return Math.floor(C/13);case i.BYTE:default:return Math.floor(C/8)}},n.getBestVersionForData=function(u,v){let k;const D=s.from(v,s.M);if(Array.isArray(u)){if(u.length>1)return c(u,D);if(u.length===0)return 1;k=u[0]}else k=u;return a(k.mode,k.getLength(),D)},n.getEncodedBits=function(u){if(!r.isValid(u)||u<7)throw new Error("Invalid QR Code version");let v=u<<12;for(;t.getBCHDigit(v)-l>=0;)v^=o<<t.getBCHDigit(v)-l;return u<<12|v}})(he)),he}var ge={},oi;function gs(){if(oi)return ge;oi=1;const n=Z(),t=1335,e=21522,s=n.getBCHDigit(t);return ge.getEncodedBits=function(r,o){const l=r.bit<<3|o;let a=l<<10;for(;n.getBCHDigit(a)-s>=0;)a^=t<<n.getBCHDigit(a)-s;return(l<<10|a)^e},ge}var fe={},ve,ai;function fs(){if(ai)return ve;ai=1;const n=tt();function t(e){this.mode=n.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(s){return 10*Math.floor(s/3)+(s%3?s%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(s){let i,r,o;for(i=0;i+3<=this.data.length;i+=3)r=this.data.substr(i,3),o=parseInt(r,10),s.put(o,10);const l=this.data.length-i;l>0&&(r=this.data.substr(i),o=parseInt(r,10),s.put(o,l*3+1))},ve=t,ve}var me,li;function vs(){if(li)return me;li=1;const n=tt(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(s){this.mode=n.ALPHANUMERIC,this.data=s}return e.getBitsLength=function(i){return 11*Math.floor(i/2)+6*(i%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let r;for(r=0;r+2<=this.data.length;r+=2){let o=t.indexOf(this.data[r])*45;o+=t.indexOf(this.data[r+1]),i.put(o,11)}this.data.length%2&&i.put(t.indexOf(this.data[r]),6)},me=e,me}var be,ci;function ms(){if(ci)return be;ci=1;const n=tt();function t(e){this.mode=n.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(s){return s*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let s=0,i=this.data.length;s<i;s++)e.put(this.data[s],8)},be=t,be}var ye,di;function bs(){if(di)return ye;di=1;const n=tt(),t=Z();function e(s){this.mode=n.KANJI,this.data=s}return e.getBitsLength=function(i){return i*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(s){let i;for(i=0;i<this.data.length;i++){let r=t.toSJIS(this.data[i]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[i]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),s.put(r,13)}},ye=e,ye}var _e={exports:{}},hi;function ys(){return hi||(hi=1,(function(n){var t={single_source_shortest_paths:function(e,s,i){var r={},o={};o[s]=0;var l=t.PriorityQueue.make();l.push(s,0);for(var a,d,p,c,h,u,v,k,D;!l.empty();){a=l.pop(),d=a.value,c=a.cost,h=e[d]||{};for(p in h)h.hasOwnProperty(p)&&(u=h[p],v=c+u,k=o[p],D=typeof o[p]>"u",(D||k>v)&&(o[p]=v,l.push(p,v),r[p]=d))}if(typeof i<"u"&&typeof o[i]>"u"){var $=["Could not find a path from ",s," to ",i,"."].join("");throw new Error($)}return r},extract_shortest_path_from_predecessor_list:function(e,s){for(var i=[],r=s;r;)i.push(r),e[r],r=e[r];return i.reverse(),i},find_path:function(e,s,i){var r=t.single_source_shortest_paths(e,s,i);return t.extract_shortest_path_from_predecessor_list(r,i)},PriorityQueue:{make:function(e){var s=t.PriorityQueue,i={},r;e=e||{};for(r in s)s.hasOwnProperty(r)&&(i[r]=s[r]);return i.queue=[],i.sorter=e.sorter||s.default_sorter,i},default_sorter:function(e,s){return e.cost-s.cost},push:function(e,s){var i={value:e,cost:s};this.queue.push(i),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=t})(_e)),_e.exports}var pi;function _s(){return pi||(pi=1,(function(n){const t=tt(),e=fs(),s=vs(),i=ms(),r=bs(),o=Ci(),l=Z(),a=ys();function d($){return unescape(encodeURIComponent($)).length}function p($,P,C){const E=[];let F;for(;(F=$.exec(C))!==null;)E.push({data:F[0],index:F.index,mode:P,length:F[0].length});return E}function c($){const P=p(o.NUMERIC,t.NUMERIC,$),C=p(o.ALPHANUMERIC,t.ALPHANUMERIC,$);let E,F;return l.isKanjiModeEnabled()?(E=p(o.BYTE,t.BYTE,$),F=p(o.KANJI,t.KANJI,$)):(E=p(o.BYTE_KANJI,t.BYTE,$),F=[]),P.concat(C,E,F).sort(function(x,_){return x.index-_.index}).map(function(x){return{data:x.data,mode:x.mode,length:x.length}})}function h($,P){switch(P){case t.NUMERIC:return e.getBitsLength($);case t.ALPHANUMERIC:return s.getBitsLength($);case t.KANJI:return r.getBitsLength($);case t.BYTE:return i.getBitsLength($)}}function u($){return $.reduce(function(P,C){const E=P.length-1>=0?P[P.length-1]:null;return E&&E.mode===C.mode?(P[P.length-1].data+=C.data,P):(P.push(C),P)},[])}function v($){const P=[];for(let C=0;C<$.length;C++){const E=$[C];switch(E.mode){case t.NUMERIC:P.push([E,{data:E.data,mode:t.ALPHANUMERIC,length:E.length},{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.ALPHANUMERIC:P.push([E,{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.KANJI:P.push([E,{data:E.data,mode:t.BYTE,length:d(E.data)}]);break;case t.BYTE:P.push([{data:E.data,mode:t.BYTE,length:d(E.data)}])}}return P}function k($,P){const C={},E={start:{}};let F=["start"];for(let m=0;m<$.length;m++){const x=$[m],_=[];for(let f=0;f<x.length;f++){const S=x[f],b=""+m+f;_.push(b),C[b]={node:S,lastCount:0},E[b]={};for(let w=0;w<F.length;w++){const y=F[w];C[y]&&C[y].node.mode===S.mode?(E[y][b]=h(C[y].lastCount+S.length,S.mode)-h(C[y].lastCount,S.mode),C[y].lastCount+=S.length):(C[y]&&(C[y].lastCount=S.length),E[y][b]=h(S.length,S.mode)+4+t.getCharCountIndicator(S.mode,P))}}F=_}for(let m=0;m<F.length;m++)E[F[m]].end=0;return{map:E,table:C}}function D($,P){let C;const E=t.getBestModeForData($);if(C=t.from(P,E),C!==t.BYTE&&C.bit<E.bit)throw new Error('"'+$+'" cannot be encoded with mode '+t.toString(C)+`.
 Suggested mode is: `+t.toString(E));switch(C===t.KANJI&&!l.isKanjiModeEnabled()&&(C=t.BYTE),C){case t.NUMERIC:return new e($);case t.ALPHANUMERIC:return new s($);case t.KANJI:return new r($);case t.BYTE:return new i($)}}n.fromArray=function(P){return P.reduce(function(C,E){return typeof E=="string"?C.push(D(E,null)):E.data&&C.push(D(E.data,E.mode)),C},[])},n.fromString=function(P,C){const E=c(P,l.isKanjiModeEnabled()),F=v(E),m=k(F,C),x=a.find_path(m.map,"start","end"),_=[];for(let f=1;f<x.length-1;f++)_.push(m.table[x[f]].node);return n.fromArray(u(_))},n.rawSplit=function(P){return n.fromArray(c(P,l.isKanjiModeEnabled()))}})(fe)),fe}var ui;function xs(){if(ui)return ie;ui=1;const n=Z(),t=ke(),e=rs(),s=os(),i=as(),r=ls(),o=cs(),l=Si(),a=ps(),d=us(),p=gs(),c=tt(),h=_s();function u(m,x){const _=m.size,f=r.getPositions(x);for(let S=0;S<f.length;S++){const b=f[S][0],w=f[S][1];for(let y=-1;y<=7;y++)if(!(b+y<=-1||_<=b+y))for(let A=-1;A<=7;A++)w+A<=-1||_<=w+A||(y>=0&&y<=6&&(A===0||A===6)||A>=0&&A<=6&&(y===0||y===6)||y>=2&&y<=4&&A>=2&&A<=4?m.set(b+y,w+A,!0,!0):m.set(b+y,w+A,!1,!0))}}function v(m){const x=m.size;for(let _=8;_<x-8;_++){const f=_%2===0;m.set(_,6,f,!0),m.set(6,_,f,!0)}}function k(m,x){const _=i.getPositions(x);for(let f=0;f<_.length;f++){const S=_[f][0],b=_[f][1];for(let w=-2;w<=2;w++)for(let y=-2;y<=2;y++)w===-2||w===2||y===-2||y===2||w===0&&y===0?m.set(S+w,b+y,!0,!0):m.set(S+w,b+y,!1,!0)}}function D(m,x){const _=m.size,f=d.getEncodedBits(x);let S,b,w;for(let y=0;y<18;y++)S=Math.floor(y/3),b=y%3+_-8-3,w=(f>>y&1)===1,m.set(S,b,w,!0),m.set(b,S,w,!0)}function $(m,x,_){const f=m.size,S=p.getEncodedBits(x,_);let b,w;for(b=0;b<15;b++)w=(S>>b&1)===1,b<6?m.set(b,8,w,!0):b<8?m.set(b+1,8,w,!0):m.set(f-15+b,8,w,!0),b<8?m.set(8,f-b-1,w,!0):b<9?m.set(8,15-b-1+1,w,!0):m.set(8,15-b-1,w,!0);m.set(f-8,8,1,!0)}function P(m,x){const _=m.size;let f=-1,S=_-1,b=7,w=0;for(let y=_-1;y>0;y-=2)for(y===6&&y--;;){for(let A=0;A<2;A++)if(!m.isReserved(S,y-A)){let W=!1;w<x.length&&(W=(x[w]>>>b&1)===1),m.set(S,y-A,W),b--,b===-1&&(w++,b=7)}if(S+=f,S<0||_<=S){S-=f,f=-f;break}}}function C(m,x,_){const f=new e;_.forEach(function(A){f.put(A.mode.bit,4),f.put(A.getLength(),c.getCharCountIndicator(A.mode,m)),A.write(f)});const S=n.getSymbolTotalCodewords(m),b=l.getTotalCodewordsCount(m,x),w=(S-b)*8;for(f.getLengthInBits()+4<=w&&f.put(0,4);f.getLengthInBits()%8!==0;)f.putBit(0);const y=(w-f.getLengthInBits())/8;for(let A=0;A<y;A++)f.put(A%2?17:236,8);return E(f,m,x)}function E(m,x,_){const f=n.getSymbolTotalCodewords(x),S=l.getTotalCodewordsCount(x,_),b=f-S,w=l.getBlocksCount(x,_),y=f%w,A=w-y,W=Math.floor(f/w),gt=Math.floor(b/w),Ii=gt+1,Te=W-gt,Bi=new a(Te);let Gt=0;const Pt=new Array(w),Re=new Array(w);let Jt=0;const Di=new Uint8Array(m.buffer);for(let et=0;et<w;et++){const Kt=et<A?gt:Ii;Pt[et]=Di.slice(Gt,Gt+Kt),Re[et]=Bi.encode(Pt[et]),Gt+=Kt,Jt=Math.max(Jt,Kt)}const Yt=new Uint8Array(f);let Me=0,j,H;for(j=0;j<Jt;j++)for(H=0;H<w;H++)j<Pt[H].length&&(Yt[Me++]=Pt[H][j]);for(j=0;j<Te;j++)for(H=0;H<w;H++)Yt[Me++]=Re[H][j];return Yt}function F(m,x,_,f){let S;if(Array.isArray(m))S=h.fromArray(m);else if(typeof m=="string"){let W=x;if(!W){const gt=h.rawSplit(m);W=d.getBestVersionForData(gt,_)}S=h.fromString(m,W||40)}else throw new Error("Invalid data");const b=d.getBestVersionForData(S,_);if(!b)throw new Error("The amount of data is too big to be stored in a QR Code");if(!x)x=b;else if(x<b)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+b+`.
`);const w=C(x,_,S),y=n.getSymbolSize(x),A=new s(y);return u(A,x),v(A),k(A,x),$(A,_,0),x>=7&&D(A,x),P(A,w),isNaN(f)&&(f=o.getBestMask(A,$.bind(null,A,_))),o.applyMask(f,A),$(A,_,f),{modules:A,version:x,errorCorrectionLevel:_,maskPattern:f,segments:S}}return ie.create=function(x,_){if(typeof x>"u"||x==="")throw new Error("No input text");let f=t.M,S,b;return typeof _<"u"&&(f=t.from(_.errorCorrectionLevel,t.M),S=d.from(_.version),b=o.from(_.maskPattern),_.toSJISFunc&&n.setToSJISFunction(_.toSJISFunc)),F(x,S,f,b)},ie}var xe={},we={},gi;function Ai(){return gi||(gi=1,(function(n){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let s=e.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+e);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(r){return[r,r]}))),s.length===6&&s.push("F","F");const i=parseInt(s.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:i&255,hex:"#"+s.slice(0,6).join("")}}n.getOptions=function(s){s||(s={}),s.color||(s.color={});const i=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,r=s.width&&s.width>=21?s.width:void 0,o=s.scale||4;return{width:r,scale:r?4:o,margin:i,color:{dark:t(s.color.dark||"#000000ff"),light:t(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},n.getScale=function(s,i){return i.width&&i.width>=s+i.margin*2?i.width/(s+i.margin*2):i.scale},n.getImageWidth=function(s,i){const r=n.getScale(s,i);return Math.floor((s+i.margin*2)*r)},n.qrToImageData=function(s,i,r){const o=i.modules.size,l=i.modules.data,a=n.getScale(o,r),d=Math.floor((o+r.margin*2)*a),p=r.margin*a,c=[r.color.light,r.color.dark];for(let h=0;h<d;h++)for(let u=0;u<d;u++){let v=(h*d+u)*4,k=r.color.light;if(h>=p&&u>=p&&h<d-p&&u<d-p){const D=Math.floor((h-p)/a),$=Math.floor((u-p)/a);k=c[l[D*o+$]?1:0]}s[v++]=k.r,s[v++]=k.g,s[v++]=k.b,s[v]=k.a}}})(we)),we}var fi;function ws(){return fi||(fi=1,(function(n){const t=Ai();function e(i,r,o){i.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(r,o,l){let a=l,d=o;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),o||(d=s()),a=t.getOptions(a);const p=t.getImageWidth(r.modules.size,a),c=d.getContext("2d"),h=c.createImageData(p,p);return t.qrToImageData(h.data,r,a),e(c,d,p),c.putImageData(h,0,0),d},n.renderToDataURL=function(r,o,l){let a=l;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),a||(a={});const d=n.render(r,o,a),p=a.type||"image/png",c=a.rendererOpts||{};return d.toDataURL(p,c.quality)}})(xe)),xe}var Ee={},vi;function Es(){if(vi)return Ee;vi=1;const n=Ai();function t(i,r){const o=i.a/255,l=r+'="'+i.hex+'"';return o<1?l+" "+r+'-opacity="'+o.toFixed(2).slice(1)+'"':l}function e(i,r,o){let l=i+r;return typeof o<"u"&&(l+=" "+o),l}function s(i,r,o){let l="",a=0,d=!1,p=0;for(let c=0;c<i.length;c++){const h=Math.floor(c%r),u=Math.floor(c/r);!h&&!d&&(d=!0),i[c]?(p++,c>0&&h>0&&i[c-1]||(l+=d?e("M",h+o,.5+u+o):e("m",a,0),a=0,d=!1),h+1<r&&i[c+1]||(l+=e("h",p),p=0)):a++}return l}return Ee.render=function(r,o,l){const a=n.getOptions(o),d=r.modules.size,p=r.modules.data,c=d+a.margin*2,h=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",u="<path "+t(a.color.dark,"stroke")+' d="'+s(p,d,a.margin)+'"/>',v='viewBox="0 0 '+c+" "+c+'"',D='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+v+' shape-rendering="crispEdges">'+h+u+`</svg>
`;return typeof l=="function"&&l(null,D),D},Ee}var mi;function Ss(){if(mi)return it;mi=1;const n=ns(),t=xs(),e=ws(),s=Es();function i(r,o,l,a,d){const p=[].slice.call(arguments,1),c=p.length,h=typeof p[c-1]=="function";if(!h&&!n())throw new Error("Callback required as last argument");if(h){if(c<2)throw new Error("Too few arguments provided");c===2?(d=l,l=o,o=a=void 0):c===3&&(o.getContext&&typeof d>"u"?(d=a,a=void 0):(d=a,a=l,l=o,o=void 0))}else{if(c<1)throw new Error("Too few arguments provided");return c===1?(l=o,o=a=void 0):c===2&&!o.getContext&&(a=l,l=o,o=void 0),new Promise(function(u,v){try{const k=t.create(l,a);u(r(k,o,a))}catch(k){v(k)}})}try{const u=t.create(l,a);d(null,r(u,o,a))}catch(u){d(u)}}return it.create=t.create,it.toCanvas=i.bind(null,e.render),it.toDataURL=i.bind(null,e.renderToDataURL),it.toString=i.bind(null,function(r,o,l){return s.render(r,l)}),it}var $s=Ss();const Cs=ss($s);var As=Object.defineProperty,ks=Object.getOwnPropertyDescriptor,Ht=(n,t,e,s)=>{for(var i=s>1?void 0:s?ks(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&As(t,e,i),i};let ct=class extends B{constructor(){super(...arguments),this.variant="frosted",this.state="off",this.interactive=!1}render(){return g`
      <div
        class="card ${this.variant} ${this.interactive?"interactive":""}"
        data-state="${this.state}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};ct.styles=O`
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
  `;Ht([T({type:String})],ct.prototype,"variant",2);Ht([T({type:String})],ct.prototype,"state",2);Ht([T({type:Boolean})],ct.prototype,"interactive",2);ct=Ht([z("glass-card")],ct);var Ps=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,ki=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ts(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ps(t,e,i),i};let Bt=class extends B{constructor(){super(...arguments),this.checked=!1}render(){return g`
      <div
        class="toggle"
        ?data-checked="${this.checked}"
        @click="${()=>{this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:this.checked}))}}"
      >
        <div class="thumb"></div>
      </div>
    `}};Bt.styles=O`
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
  `;ki([T({type:Boolean})],Bt.prototype,"checked",2);Bt=ki([z("glass-toggle")],Bt);var Rs=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,Wt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ms(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Rs(t,e,i),i};let dt=class extends B{constructor(){super(...arguments),this.value=50,this.label="",this._isDragging=!1,this._handleMove=n=>{this._isDragging&&(n.cancelable&&n.preventDefault(),this._updateValue(n),this.dispatchEvent(new CustomEvent("input",{detail:this.value})))},this._handleEnd=()=>{this._isDragging&&(this._isDragging=!1,this.dispatchEvent(new CustomEvent("change",{detail:this.value}))),window.removeEventListener("mousemove",this._handleMove),window.removeEventListener("mouseup",this._handleEnd),window.removeEventListener("touchmove",this._handleMove),window.removeEventListener("touchend",this._handleEnd)}}render(){return g`
      <div class="container" @mousedown="${this._handleStart}" @touchstart="${this._handleStart}">
        <div class="track" id="track">
          <div class="fill" style="width: ${this.value}%"></div>
          <div class="thumb" style="left: ${this.value}%"></div>
        </div>
        <div class="value-display">${Math.round(this.value)}%</div>
      </div>
    `}_handleStart(n){this._isDragging=!0,this._updateValue(n);const t={passive:!1};window.addEventListener("mousemove",this._handleMove,t),window.addEventListener("mouseup",this._handleEnd,t),window.addEventListener("touchmove",this._handleMove,t),window.addEventListener("touchend",this._handleEnd,t)}_updateValue(n){const t=this.renderRoot.querySelector("#track");if(!t)return;const e=t.getBoundingClientRect(),s="touches"in n?n.touches[0].clientX:n.clientX,r=Math.max(0,Math.min(s-e.left,e.width))/e.width*100;this.value!==r&&(this.value=r)}};dt.styles=O`
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
  `;Wt([T({type:Number})],dt.prototype,"value",2);Wt([T({type:String})],dt.prototype,"label",2);Wt([M()],dt.prototype,"_isDragging",2);dt=Wt([z("glass-slider")],dt);var Is=Object.defineProperty,Bs=Object.getOwnPropertyDescriptor,Pe=(n,t,e,s)=>{for(var i=s>1?void 0:s?Bs(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Is(t,e,i),i};let wt=class extends B{constructor(){super(...arguments),this.rooms=[],this.activeRoom=""}render(){return g`
      <div class="nav-container">
        ${this.rooms.map(n=>g`
          <div
            class="nav-item"
            ?data-active="${this.activeRoom===n.id}"
            @click="${()=>this._selectRoom(n.id)}"
          >
            ${n.name}
          </div>
        `)}
      </div>
    `}_selectRoom(n){this.activeRoom=n,this.dispatchEvent(new CustomEvent("room-change",{detail:n}))}};wt.styles=O`
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
  `;Pe([T({type:Array})],wt.prototype,"rooms",2);Pe([T({type:String})],wt.prototype,"activeRoom",2);wt=Pe([z("glass-nav")],wt);const ut=(n,t)=>{if(!n)return{light:"lightbulb",switch:"toggle_on",climate:"ac_unit",cover:"blinds",sensor:"sensors",binary_sensor:"sensors",scene:"scene",media_player:"play_circle",automation:"robot",fan:"fan"}[t||""]||"device_hub";const e=n.replace("mdi:","").replace(/-/g,"_"),s={white_balance_incandescent:"lightbulb",ceiling_light:"lightbulb",lamp:"lightbulb",wall_sconce:"lightbulb",floor_lamp:"lightbulb",led_strip:"lightbulb",weather_sunny:"sunny",weather_cloudy:"cloudy",weather_rainy:"rainy",weather_snowy:"snowy",thermometer:"thermostat",water_percent:"humidity_mid",motion_sensor:"motion_sensors",motion_sensor_off:"motion_sensors",shield_lock:"security",eye:"visibility",eye_outline:"visibility",eye_off:"visibility_off",eye_off_outline:"visibility_off",eye_circle:"visibility",eye_circle_outline:"visibility",cctv:"videocam",camera:"videocam",camera_outline:"videocam",camera_off:"videocam_off",video:"videocam",video_outline:"videocam",account:"person",account_outline:"person",account_multiple:"group",account_multiple_outline:"group",account_check:"how_to_reg",account_off:"person_off",run:"directions_run",walk:"directions_walk",human:"person",human_greeting:"waving_hand",window_shutter:"blinds",curtains:"blinds",door:"door_front",door_open:"door_open",door_closed:"door_front",air_conditioner:"ac_unit",television:"tv",speaker:"speaker",washing_machine:"local_laundry_service",dishwasher:"dishwasher_gen",fridge:"kitchen",coffee_maker:"coffee_maker",kettle:"kettle",microwave:"microwave",oven:"oven_gen",fan:"fan",robot_vacuum:"cleaning_services",power:"power_settings_new",power_plug:"electrical_services",power_plug_off:"electrical_services",flash:"bolt",wifi:"wifi",bluetooth:"bluetooth",home:"home",home_outline:"home",map_marker:"location_on",map_marker_outline:"location_on"},i=e.replace(/_outline$/,"").replace(/_filled$/,"");return s[e]||s[i]||i};var Ds=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,L=(n,t,e,s)=>{for(var i=s>1?void 0:s?Os(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ds(t,e,i),i};let Et=class extends B{constructor(){super(...arguments),this.device={},this.isAiControlled=!1,this._lpTimer=null,this._lpStartX=0,this._lpStartY=0}render(){var i;const n=this.device.state==="on",t=ut(this.device.icon,"light"),e=((i=this.device.attributes)==null?void 0:i.supported_color_modes)||[],s=e.length>0&&!(e.length===1&&e[0]==="onoff");return g`
      <glass-card
        ?state="${n?"on":"off"}"
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
              style="color: ${n?"var(--glass-primary)":"inherit"}; background: ${n?"rgba(107, 170, 255, 0.1)":"rgba(255,255,255,0.05)"};"
            >
              <span>${t}</span>
            </div>
            <glass-toggle
              .checked="${n}"
              @change="${r=>{r.stopPropagation(),this._dispatchCall("light",r.detail?"turn_on":"turn_off")}}"
            ></glass-toggle>
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="info">${n?`${this.device.brightness||0}% 亮度`:"已关闭"}</div>
            ${s?g`<div class="hint">长按调光调色</div>`:""}
          </div>
        </div>
      </glass-card>
    `}_onPointerDown(n){n.button!==void 0&&n.button!==0||(this._lpStartX=n.clientX,this._lpStartY=n.clientY,this._lpTimer=setTimeout(()=>{var t;(t=navigator.vibrate)==null||t.call(navigator,40),this._showDetail()},600))}_onPointerMove(n){if(this._lpTimer===null)return;const t=n.clientX-this._lpStartX,e=n.clientY-this._lpStartY;Math.sqrt(t*t+e*e)>10&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerUp(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerCancel(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_dispatchCall(n,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:n,service:t,data:{...e,entity_id:this.device.id}}}))}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};Et.styles=O`
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
  `;L([T({type:Object})],Et.prototype,"device",2);L([T({type:Boolean})],Et.prototype,"isAiControlled",2);Et=L([z("light-card")],Et);let St=class extends B{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const n=this.device.state!=="off",t=this.device.attributes.temperature||26,e=ut(this.device.icon,"climate");return g`
      <glass-card ?state="${n?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" 
              style="color: ${n?"var(--glass-primary)":"inherit"};"
              @click="${this._showDetail}"
            >${e}</div>
            <glass-toggle 
              .checked="${n}"
              @change="${s=>this._dispatchCall("climate",(s.detail,"set_hvac_mode"),{hvac_mode:s.detail?"cool":"off"})}"
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
    `}_adjustTemp(n){const t=this.device.attributes.temperature||26;this._dispatchCall("climate","set_temperature",{temperature:t+n})}_dispatchCall(n,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:n,service:t,data:{...e,entity_id:this.device.id}}}))}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};St.styles=O`
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
  `;L([T({type:Object})],St.prototype,"device",2);L([T({type:Boolean})],St.prototype,"isAiControlled",2);St=L([z("climate-card")],St);let $t=class extends B{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const n=this.device.attributes.current_position||0,t=n>0,e=ut(this.device.icon,"cover");return g`
      <glass-card ?state="${t?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" style="color: ${t?"var(--glass-primary)":"inherit"}">${e}</div>
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${t?`打开 ${n}%`:"已关闭"}</div>
          </div>

          <div class="controls">
            <glass-slider 
              style="--glass-card-min-height: 0px; margin: 2px 0;"
              .value="${n}"
              @change="${s=>this._dispatchCall("cover","set_cover_position",{position:s.detail})}"
            ></glass-slider>
            <div class="icon-btn-row">
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","open_cover")}">keyboard_arrow_up</div>
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","stop_cover")}">pause</div>
              <div class="icon-btn" @click="${()=>this._dispatchCall("cover","close_cover")}">keyboard_arrow_down</div>
            </div>
          </div>
        </div>
      </glass-card>
    `}_dispatchCall(n,t,e={}){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:n,service:t,data:{...e,entity_id:this.device.id}}}))}};$t.styles=O`
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
  `;L([T({type:Object})],$t.prototype,"device",2);L([T({type:Boolean})],$t.prototype,"isAiControlled",2);$t=L([z("cover-card")],$t);let Dt=class extends B{constructor(){super(...arguments),this.device={}}render(){let n=this.device.state;const t=this.device.attributes||{},e=t.unit_of_measurement||"",s=t.device_class||"",i=ut(this.device.icon,"sensor"),r=c=>!c||/[\u4e00-\u9fa5]/.test(c)?c:c.replace(/\bPerson Occupancy\b/gi,"人员占用").replace(/\bPerson Count\b/gi,"人数").replace(/\bOccupancy\b/gi,"占用").replace(/\bMotion\b/gi,"移动检测").replace(/\bCam\s+[A-Fa-f0-9]+\b/gi,"摄像头").replace(/\bCamera\b/gi,"摄像头").replace(/\bZone\s+[A-Fa-f0-9]+\b/gi,"区域").trim().replace(/\s+/g," ");if(typeof n=="string"&&n.includes("T")&&n.includes(":"))try{const c=new Date(n);isNaN(c.getTime())||(n=`${(c.getMonth()+1).toString().padStart(2,"0")}-${c.getDate().toString().padStart(2,"0")} ${c.getHours().toString().padStart(2,"0")}:${c.getMinutes().toString().padStart(2,"0")}`)}catch{}const o=(c,h)=>{const u=c.toLowerCase();return u==="on"?h==="motion"||h==="occupancy"||h==="presence"?"有人":h==="door"||h==="window"||h==="opening"?"已打开":h==="moisture"?"漏水！":h==="smoke"?"烟雾！":h==="gas"?"燃气！":"开启":u==="off"?h==="motion"||h==="occupancy"||h==="presence"?"无人":h==="door"||h==="window"||h==="opening"?"已关闭":"正常":{playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",home:"在家",not_home:"离家",clear:"清空",detected:"检测到"}[u]||c},l=r(this.device.name),a=o(n,s),d=s===""&&/^\d+$/.test(String(n)),p=a.length>5?"18px":a.length>2?"22px":"28px";return g`
      <glass-card>
        <div class="sensor-box">
          <div class="icon-box">${i}</div>
          <div class="bottom-info">
            <div class="name">${l}</div>
            <div class="value-display">
              <span class="value" style="font-size: ${d?"28px":p}">
                ${d?n:a}
              </span>
              ${d?g`<span class="unit">人</span>`:g`<span class="unit">${e}</span>`}
            </div>
          </div>
        </div>
      </glass-card>
    `}};Dt.styles=O`
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
  `;L([T({type:Object})],Dt.prototype,"device",2);Dt=L([z("sensor-card")],Dt);let Ct=class extends B{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const n=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",t=this.device.id.split(".")[0],e=ut(this.device.icon,t),s=i=>{const r=i.toLowerCase();return{on:"已开启",off:"已关闭",playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",open:"已打开",closed:"已关闭"}[r]||i};return g`
      <glass-card ?state="${n?"on":"off"}" interactive @click="${this._toggle}">
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="content">
          <div class="top-row">
            <div class="icon-box" style="color: ${n?"var(--glass-primary)":"inherit"}">
              ${e}
            </div>
            <glass-toggle .checked="${n}" @change="${this._toggle}"></glass-toggle>
          </div>
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${s(this.device.state)}</div>
          </div>
        </div>
      </glass-card>
    `}_toggle(n){n&&n.stopPropagation();const t=this.device.id.split(".")[0],e=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active";let s=e?"turn_off":"turn_on";t==="cover"&&(s=e?"close_cover":"open_cover"),t==="media_player"&&(s=e?"media_stop":"media_play"),t==="vacuum"&&(s=e?"return_to_base":"start"),t==="scene"&&(s="turn_on"),this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:t,service:s,data:{entity_id:this.device.id}}}))}};Ct.styles=O`
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
  `;L([T({type:Object})],Ct.prototype,"device",2);L([T({type:Boolean})],Ct.prototype,"isAiControlled",2);Ct=L([z("generic-device-card")],Ct);let ht=class extends B{constructor(){super(...arguments),this.scene={},this.isAiRecommended=!1,this.reason=""}render(){const n=ut(this.scene.icon,"scene");return g`
      <glass-card 
        interactive 
        style="--glass-card-min-height: 56px;"
        state="${this.isAiRecommended?"ai-active":"off"}"
        @click="${this._trigger}"
      >
        ${this.isAiRecommended?g`<div class="ai-badge">AI</div>`:""}
        <div class="scene-box">
          <span class="icon-main" style="color: ${this.isAiRecommended?"var(--glass-ai)":"var(--glass-on-surface)"}">${n}</span>
          <span class="scene-name">${this.scene.name}</span>
        </div>
      </glass-card>
    `}_trigger(){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"scene",service:"turn_on",data:{entity_id:this.scene.id}}}))}};ht.styles=O`
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
  `;L([T({type:Object})],ht.prototype,"scene",2);L([T({type:Boolean})],ht.prototype,"isAiRecommended",2);L([T({type:String})],ht.prototype,"reason",2);ht=L([z("scene-card")],ht);var zs=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,Pi=(n,t,e,s)=>{for(var i=s>1?void 0:s?Fs(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&zs(t,e,i),i};let Ot=class extends B{constructor(){super(...arguments),this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""}}render(){const n=this.aiState.status==="thinking"||this.aiState.status==="推理中";return g`
      <div class="header">
        <div class="status-indicator">
          <div class="dot ${n?"active":""}"></div>
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
    `}};Ot.styles=O`
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
  `;Pi([T({type:Object})],Ot.prototype,"aiState",2);Ot=Pi([z("ai-status-panel")],Ot);var Ns=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,kt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ls(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ns(t,e,i),i};let X=class extends B{constructor(){super(...arguments),this.isRecording=!1,this.status="idle",this.text="点击开始语音指令",this.waveData=new Array(20).fill(0)}render(){return g`
      <div class="bar-content" @click="${this._handleClick}">
        <div class="wave-container">
          ${this.isRecording?this.waveData.map(n=>g`
              <div class="wave-bar" style="height:${Math.max(4,n*40)}px"></div>
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
    `}_handleClick(){this.dispatchEvent(new CustomEvent("toggle-voice",{bubbles:!0,composed:!0}))}};X.styles=O`
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
  `;kt([T({type:Boolean})],X.prototype,"isRecording",2);kt([T({type:String})],X.prototype,"status",2);kt([T({type:String})],X.prototype,"text",2);kt([T({type:Array})],X.prototype,"waveData",2);X=kt([z("voice-bar")],X);var Us=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Ti=(n,t,e,s)=>{for(var i=s>1?void 0:s?js(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Us(t,e,i),i};let zt=class extends B{constructor(){super(...arguments),this._time=new Date}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=new Date},1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}render(){const n=this._time.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),t=this._time.toLocaleDateString("zh-CN",{month:"long",day:"numeric"}),e=this._time.toLocaleDateString("zh-CN",{weekday:"long"});return g`
      <div class="time">${n}</div>
      <div class="info-box">
        <div class="date">${t}</div>
        <div class="weekday">${e}</div>
      </div>
    `}};zt.styles=O`
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
  `;Ti([M()],zt.prototype,"_time",2);zt=Ti([z("clock-widget")],zt);var Hs=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,qt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ws(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Hs(t,e,i),i};let pt=class extends B{constructor(){super(...arguments),this.condition="晴",this.temperature=26,this.icon="wb_sunny"}render(){return g`
      <div class="icon">${this.icon}</div>
      <div class="info">
        <div class="temp">${this.temperature}°C</div>
        <div class="desc">${this.condition}</div>
      </div>
    `}};pt.styles=O`
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
  `;qt([T({type:String})],pt.prototype,"condition",2);qt([T({type:Number})],pt.prototype,"temperature",2);qt([T({type:String})],pt.prototype,"icon",2);pt=qt([z("weather-widget")],pt);var qs=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Ri=(n,t,e,s)=>{for(var i=s>1?void 0:s?Vs(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&qs(t,e,i),i};let Ft=class extends B{constructor(){super(...arguments),this.stats=[]}render(){if(!this.stats||this.stats.length===0)return g`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; opacity:0.3; gap:12px;">
          <span class="material-symbols-outlined" style="font-size:40px;">analytics</span>
          <span>暂无能耗数据</span>
        </div>
      `;const n=this.stats.slice(0,8),t=Math.max(...n.map(e=>e.on_minutes),1);return g`
      <div class="chart-container">
        ${n.map(e=>{const s=e.on_minutes/t*100,i=e.on_minutes>0?e.waste_minutes/e.on_minutes*100:0,r=e.entity_id.split(".").pop().replace(/_/g," ");return g`
            <div class="energy-row">
              <div class="row-header">
                <span class="device-name">${r}</span>
                <span class="time-val">${this._formatTime(e.on_minutes)} / 浪费 ${this._formatTime(e.waste_minutes)}</span>
              </div>
              <div class="progress-track">
                <div class="progress-on" style="width: ${s}%">
                  <div class="progress-waste" style="width: ${i}%"></div>
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
    `}_formatTime(n){if(!n)return"0m";const t=Math.floor(n/60),e=Math.floor(n%60);return t>0?`${t}h${e}m`:`${e}m`}};Ft.styles=O`
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
  `;Ri([T({type:Array})],Ft.prototype,"stats",2);Ft=Ri([z("energy-chart")],Ft);var Gs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Mi=(n,t,e,s)=>{for(var i=s>1?void 0:s?Js(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Gs(t,e,i),i};let Nt=class extends B{constructor(){super(...arguments),this.events=[]}render(){return!this.events||this.events.length===0?g`
        <div class="empty-state">
          <span class="material-symbols-outlined" style="font-size: 32px;">videocam_off</span>
          <span>近期无视觉检测事件</span>
        </div>
      `:g`
      <div class="events-container">
        ${this.events.map((n,t)=>{var e;return g`
          <div class="event-card">
            <div class="thumbnail">
              ${n.thumbnail?g`<img src="${n.thumbnail}" alt="Snapshot">`:g`<span class="material-symbols-outlined" style="opacity: 0.3;">person</span>`}
            </div>
            <div class="event-info">
              <div class="camera-name">
                ${t===0?g`<span class="live-dot"></span>`:""}
                ${n.camera}
              </div>
              <div class="event-detail">
                ${n.type==="end"?"离开":"检测到"} ${n.label} ${(e=n.current_zones)!=null&&e.length?`@ ${n.current_zones.join(", ")}`:""}
              </div>
              <div class="score-badge">${Math.round(n.score*100)}% 置信度</div>
            </div>
          </div>
        `})}
      </div>
    `}};Nt.styles=O`
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
  `;Mi([T({type:Array})],Nt.prototype,"events",2);Nt=Mi([z("frigate-events-panel")],Nt);var Ys=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,Vt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ks(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Ys(t,e,i),i};let Lt=class extends B{constructor(){super(...arguments),this.device={}}render(){const n=this.device.attributes||{},t=this.device.brightness!==void 0?this.device.brightness:n.brightness?Math.round(n.brightness/255*100):0,e=n.color_temp_kelvin||(n.color_temp?Math.round(1e6/n.color_temp):null),s=n.min_color_temp_kelvin||(n.max_mireds?Math.round(1e6/n.max_mireds):2700),i=n.max_color_temp_kelvin||(n.min_mireds?Math.round(1e6/n.min_mireds):6500),r=e??Math.round((s+i)/2),o=Math.min(100,Math.max(0,Math.round((r-s)/(i-s)*100))),l=n.supported_color_modes||[],a=l.includes("color_temp"),d=l.some(c=>["hs","rgb","xy","rgbw","rgbww"].includes(c)),p=[{name:"暖光",color:"#FFB347",k:2700},{name:"自然",color:"#FFE0B2",k:3500},{name:"阅读",color:"#FFF5DC",k:4e3},{name:"冷白",color:"#E8F4FD",k:5e3},{name:"日光",color:"#E3F2FD",k:6e3}].filter(c=>c.k>=s&&c.k<=i);return g`
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
              @change="${c=>{const h=Math.round(s+c.detail/100*(i-s));this._call("turn_on",{color_temp_kelvin:h})}}"
            ></glass-slider>
            <!-- 色温预设快捷按钮 -->
            ${p.length>0?g`
              <div class="color-presets">
                ${p.map(c=>g`
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
    `}_call(n,t){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"light",service:n,data:{...t,entity_id:this.device.id}}}))}};Lt.styles=O`
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
  `;Vt([T({type:Object})],Lt.prototype,"device",2);Lt=Vt([z("light-detail-panel")],Lt);let Ut=class extends B{constructor(){super(...arguments),this.device={}}render(){const n=this.device.state,t=this.device.attributes.fan_mode||"auto";return g`
      <div class="container">
        <div class="section">
          <div class="label">运行模式</div>
          <div class="mode-grid">
            ${[{id:"cool",name:"制冷",icon:"ac_unit"},{id:"heat",name:"制热",icon:"wb_sunny"},{id:"dry",name:"除湿",icon:"water_drop"},{id:"fan_only",name:"送风",icon:"air"},{id:"off",name:"关闭",icon:"power_settings_new"}].map(s=>g`
              <div class="mode-btn ${n===s.id?"active":""}" @click="${()=>this._call("set_hvac_mode",{hvac_mode:s.id})}">
                <span class="icon-main material-symbols-outlined">${s.icon}</span>
                <span class="mode-name">${s.name}</span>
              </div>
            `)}
          </div>
        </div>

        <div class="section">
          <div class="label">风速调节</div>
          <div class="fan-row">
            ${["low","medium","high","auto"].map(s=>g`
              <div class="fan-btn ${t===s?"active":""}" @click="${()=>this._call("set_fan_mode",{fan_mode:s})}">
                ${s==="low"?"低":s==="medium"?"中":s==="high"?"高":"自动"}
              </div>
            `)}
          </div>
        </div>

        <div class="section">
          <div class="label">定时关闭</div>
          <div style="display:flex; gap:12px;">
            ${[30,60,120].map(s=>g`
              <div class="fan-btn" style="flex:1;">${s}分钟</div>
            `)}
          </div>
        </div>
      </div>
    `}_call(n,t){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"climate",service:n,data:{...t,entity_id:this.device.id}}}))}};Ut.styles=O`
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
  `;Vt([T({type:Object})],Ut.prototype,"device",2);Ut=Vt([z("climate-detail-panel")],Ut);class nt{constructor(){this.ws=null,this.entitiesListeners=[],this.entities={},this.messageId=1,this.pending=new Map,this.connected=!1}static getInstance(){return nt.instance||(nt.instance=new nt),nt.instance}async connect(t){const e=t||localStorage.getItem("gateway_token")||"";if(!e)throw new Error("AUTH_REQUIRED");const s=this._buildWsUrl();await new Promise((i,r)=>{let o=!1;this.ws=new WebSocket(s);const l=d=>{o||(o=!0,r(d))},a=()=>{o||(o=!0,i())};this.ws.addEventListener("open",()=>{}),this.ws.addEventListener("message",async d=>{var c;let p;try{p=JSON.parse(d.data)}catch{return}if(p.type==="auth_required"){(c=this.ws)==null||c.send(JSON.stringify({type:"auth",access_token:e}));return}if(p.type==="auth_invalid"){l(new Error("AUTH_REQUIRED"));return}if(p.type==="auth_ok"){this.connected=!0;try{await this._bootstrapEntities(),await this._subscribeStateChanged(),a()}catch(h){l(h)}return}this._handleProtocolMessage(p)}),this.ws.addEventListener("error",()=>{l(new Error("Gateway WebSocket connection failed"))}),this.ws.addEventListener("close",()=>{this.connected=!1})})}onEntitiesUpdate(t){this.entitiesListeners.push(t)}async callService(t,e,s={}){return this.sendMessage({type:"call_service",domain:t,service:e,service_data:s})}async sendMessage(t){if(!this.ws||this.ws.readyState!==WebSocket.OPEN||!this.connected)throw new Error("No gateway websocket connection established");const e=this.messageId++;return this.ws.send(JSON.stringify({id:e,...t})),new Promise((s,i)=>{this.pending.set(e,{resolve:s,reject:i}),setTimeout(()=>{this.pending.has(e)&&(this.pending.delete(e),i(new Error(`WS request timeout: ${(t==null?void 0:t.type)||"unknown"}`)))},15e3)})}_buildWsUrl(){const t=window.location.origin;return`${t.startsWith("https://")?t.replace("https://","wss://"):t.replace("http://","ws://")}/api/websocket`}async _bootstrapEntities(){const t=await this.sendMessage({type:"get_states"}),e={};if(Array.isArray(t))for(const s of t)s!=null&&s.entity_id&&(e[s.entity_id]=s);this.entities=e,this._notifyEntitiesListeners(this.entities)}async _subscribeStateChanged(){await this.sendMessage({type:"subscribe_events",event_type:"state_changed"})}_handleProtocolMessage(t){var e,s,i,r;if(typeof(t==null?void 0:t.id)=="number"&&this.pending.has(t.id)){const o=this.pending.get(t.id);this.pending.delete(t.id),t.type==="result"&&t.success===!1?o.reject(new Error(((e=t==null?void 0:t.error)==null?void 0:e.message)||"WS request failed")):o.resolve(t.result);return}if(t.type==="event"&&((s=t.event)==null?void 0:s.event_type)==="state_changed"){const o=(r=(i=t.event)==null?void 0:i.data)==null?void 0:r.new_state;o!=null&&o.entity_id&&(this.entities[o.entity_id]=o,this._notifyEntitiesListeners(this.entities))}}_notifyEntitiesListeners(t){this.entitiesListeners.forEach(e=>e(t))}}const rt=nt.getInstance();class ot{constructor(){this._devices=[],this._aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this._energyStats=[],this._frigateEvents=[],this._criticalFrigateEvent=null,this._lastEntities=null,this._rooms=[{id:"all",name:"全部"}],this._managedDevicesInfo=new Map,this._listeners=[],rt.onEntitiesUpdate(t=>{this._lastEntities=t,this._processEntities(t),this._processAIState(t),this._processEnergyStats(t),this._processFrigateEvents(t),this._notifyListeners()}),setInterval(()=>this.refreshManagedDevices(),3e4)}async refreshManagedDevices(){try{const t=await rt.sendMessage({type:"smart_agent/get_devices"}),e=(t==null?void 0:t.devices)||t;if(e&&Array.isArray(e)){this._managedDevicesInfo=new Map(e.map(i=>[i.entity_id,{name:i.name,room:i.room}]));const s=new Set;e.forEach(i=>{i.room&&s.add(i.room)}),this._rooms=[{id:"all",name:"全部"},...Array.from(s).map(i=>({id:this._mapRoomToId(i),name:i}))],this._lastEntities&&(this._processEntities(this._lastEntities),this._notifyListeners())}}catch(t){console.warn("[StateManager] Failed to fetch managed devices",t)}}static getInstance(){return ot.instance||(ot.instance=new ot),ot.instance}subscribe(t){this._listeners.push(t),this.refreshManagedDevices(),(this._devices.length>0||this._aiState.lastAction)&&t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent)}_processFrigateEvents(t){const e=t["sensor.smart_agent_status"];e&&(e.attributes.frigate_events&&(this._frigateEvents=e.attributes.frigate_events),this._criticalFrigateEvent=e.attributes.critical_frigate_event||null)}_processEnergyStats(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.energy_stats){const s=e.attributes.energy_stats;Array.isArray(s)?this._energyStats=[...s]:typeof s=="object"&&(this._energyStats=Object.values(s))}}_processAIState(t){const e=t["sensor.smart_agent_status"],s=t["text.smart_agent_last_action"];if(e){this._aiState.status=e.state;const i=e.attributes.action_history;Array.isArray(i)&&(this._aiState.actionHistory=[...i]),this._aiState.lastCorrection=e.attributes.last_correction||"",this._aiState.recentAiActions=e.attributes.recent_ai_actions||[],this._aiState.voiceStatus=e.attributes.voice_status||"idle",this._aiState.voiceReply=e.attributes.voice_reply||"",this._aiState.lastStt=e.attributes.last_stt||""}s&&s.state!==this._aiState.lastAction&&(this._aiState.lastAction=s.state,s.state&&s.state!=="unknown"&&(this._aiState.actionHistory=[s.state,...this._aiState.actionHistory.filter(i=>i!==s.state)].slice(0,5)))}_processEntities(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.device_count!==void 0){const i=this._last_count||0;e.attributes.device_count!==i&&(this._last_count=e.attributes.device_count,this.refreshManagedDevices())}const s=[];for(const[i,r]of Object.entries(t)){const o=this._managedDevicesInfo.get(i.toLowerCase());if(!o)continue;const l=i.split(".")[0],a=o.room||this._guessRoom(i,r);s.push({id:i,type:this._mapDomainToType(l),name:o.name||r.attributes.friendly_name||i,room:a,roomId:this._mapRoomToId(a),state:r.state,brightness:r.attributes.brightness?Math.round(r.attributes.brightness/255*100):void 0,temperature:r.attributes.temperature||r.attributes.current_temperature,humidity:r.attributes.humidity,icon:r.attributes.icon,attributes:r.attributes})}this._devices=s}_mapRoomToId(t){const e=t.toLowerCase(),s=e.includes("客厅")||e.includes("living"),i=e.includes("餐厅")||e.includes("dining");return s&&i?"living_dining":s?"living":e.includes("卧室")||e.includes("房")||e.includes("bedroom")?"bedroom":e.includes("书房")||e.includes("study")?"study":e.includes("厨房")||e.includes("kitchen")?"kitchen":i?"dining":e}_mapDomainToType(t){return t==="binary_sensor"?"sensor":t}_guessRoom(t,e){const s=(e.attributes.friendly_name||"").toLowerCase(),i=t.toLowerCase();return s.includes("客厅")||i.includes("living")?"客厅":s.includes("卧室")||s.includes("房")||i.includes("bedroom")?"卧室":s.includes("书房")||i.includes("study")?"书房":s.includes("厨房")||i.includes("kitchen")?"厨房":"未分类"}_notifyListeners(){this._listeners.forEach(t=>t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent))}getDevices(){return this._devices}}const Qs=ot.getInstance();class Xs{constructor(t={},e={}){this._audioCtx=null,this._mediaStream=null,this._processor=null,this._inputNode=null,this._isRunning=!1,this._audioElem=null,this._vadSilenceCount=0,this.VAD_SILENCE_THRESHOLD=.015,this.VAD_SILENCE_FRAMES=35,this._sessionId=null,this._sessionWs=null,this._eventsWs=null,this._closingByClient=!1,this._onGatewaySocketClosed=()=>{var s,i;!this._closingByClient&&this._isRunning&&((i=(s=this._cb).onError)==null||i.call(s,"语音会话已断开"),this._emit("error","语音会话已断开"),this._cleanup())},this._onGatewaySocketMessage=s=>{var o,l,a,d,p,c;if(s.data instanceof ArrayBuffer||s.data instanceof Blob)return;let i;try{i=typeof s.data=="string"?JSON.parse(s.data):s.data}catch{return}const r=this._mapIncomingVoiceEvent(i);if(r){if(r.type==="stt_result"){const h=r.text||"";h&&((l=(o=this._cb).onSttResult)==null||l.call(o,h));return}if(r.type==="intent_result"){const h=r.reply||"";h&&((d=(a=this._cb).onReply)==null||d.call(a,h)),this._emit("tts");return}if(r.type==="tts_url"){const h=r.url||"";if(h){const u=this._resolveMediaUrl(h);this._playTts(u)}this._emit("playing");return}if(r.type==="done"){this._emit("idle"),this._cleanup();return}if(r.type==="error"){const h=r.message||"语音管道错误";(c=(p=this._cb).onError)==null||c.call(p,h),this._emit("error",h),this._cleanup()}}},this._options=t,this._cb=e,this._enableLegacyVoiceEventCompat=t.enableLegacyVoiceEventCompat===!0}get isRunning(){return this._isRunning}async start(){var t,e;if(!this._isRunning){this._isRunning=!0,this._vadSilenceCount=0,this._closingByClient=!1,this._emit("starting");try{const s=this._resolveGatewayBaseUrl(),i=this._resolveGatewayToken();if(!i)throw new Error("未检测到 Gateway 会话令牌，请先登录 Gateway");const r=await this._createVoiceSession(s,i);if(this._sessionId=r.session_id||r.sessionId||null,!this._sessionId&&!r.ws_url&&!r.wsUrl)throw new Error("Gateway 未返回 voice session 标识");await this._openGatewaySockets(s,i,r),this._mediaStream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:16e3,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._emit("stt"),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:16e3}),this._inputNode=this._audioCtx.createMediaStreamSource(this._mediaStream),this._processor=this._audioCtx.createScriptProcessor(1024,1,1),this._processor.onaudioprocess=o=>{var c;if(!this._isRunning)return;const l=o.inputBuffer.getChannelData(0);let a=0;for(let h=0;h<l.length;h++)a+=l[h]*l[h];const d=Math.sqrt(a/l.length);if(this._cb.onWaveData){const h=[],u=Math.floor(l.length/20);for(let v=0;v<20;v++)h.push(Math.abs(l[v*u]||0));this._cb.onWaveData(h)}if(d<this.VAD_SILENCE_THRESHOLD){if(this._vadSilenceCount++,this._vadSilenceCount>this.VAD_SILENCE_FRAMES){this._stopRecording();return}}else this._vadSilenceCount=0;const p=new Int16Array(l.length);for(let h=0;h<l.length;h++){const u=Math.max(-1,Math.min(1,l[h]));p[h]=u<0?u*32768:u*32767}((c=this._sessionWs)==null?void 0:c.readyState)===WebSocket.OPEN&&this._sessionWs.send(p.buffer)},this._inputNode.connect(this._processor),this._processor.connect(this._audioCtx.destination)}catch(s){const i=this._normalizeError(s);(e=(t=this._cb).onError)==null||e.call(t,i),this._emit("error",i),this._cleanup()}}}stop(){this._stopRecording()}_stopRecording(){var t,e,s,i,r;if((t=this._processor)==null||t.disconnect(),(e=this._inputNode)==null||e.disconnect(),(s=this._audioCtx)==null||s.close(),this._processor=null,this._inputNode=null,this._audioCtx=null,(i=this._mediaStream)==null||i.getTracks().forEach(o=>o.stop()),this._mediaStream=null,((r=this._sessionWs)==null?void 0:r.readyState)===WebSocket.OPEN){try{this._sessionWs.send(JSON.stringify({type:"input_audio_buffer.commit"}))}catch{}try{this._sessionWs.send(new ArrayBuffer(0))}catch{}}this._emit("intent")}_resolveGatewayBaseUrl(){var e;const t=(e=this._options.gatewayBaseUrl)==null?void 0:e.trim();return t?t.replace(/\/$/,""):window.location.origin}_resolveGatewayToken(){var t;return((t=this._options.gatewayToken)==null?void 0:t.trim())||localStorage.getItem("gateway_token")||""}_buildAuthHeaders(t){return{"Content-Type":"application/json",Authorization:`Bearer ${t}`,"X-SA-Token":t}}async _createVoiceSession(t,e){var r,o;const s=await fetch(`${t}/api/v1/voice/session`,{method:"POST",headers:this._buildAuthHeaders(e),body:JSON.stringify({sample_rate:16e3,audio_format:"pcm16"})});let i={};try{i=await s.json()}catch{}if(!s.ok){const l=(i==null?void 0:i.error)||((o=(r=i==null?void 0:i.error)==null?void 0:r.toString)==null?void 0:o.call(r))||s.statusText;throw new Error(`Gateway 语音会话创建失败 (${s.status}): ${l||"unknown error"}`)}return i}async _openGatewaySockets(t,e,s){const i=this._toWsBase(t),r=s.ws_url||s.wsUrl||`${i}/api/v1/voice/session?session_id=${encodeURIComponent(this._sessionId||"")}`,o=s.events_ws_url||s.eventsWsUrl||`${i}/api/v1/events?topic=voice&session_id=${encodeURIComponent(this._sessionId||"")}`;this._sessionWs=new WebSocket(this._appendToken(r,e)),this._eventsWs=new WebSocket(this._appendToken(o,e)),this._sessionWs.binaryType="arraybuffer",await Promise.all([this._waitSocketOpen(this._sessionWs,"voice session"),this._waitSocketOpen(this._eventsWs,"voice events")]),this._sessionWs.addEventListener("message",this._onGatewaySocketMessage),this._eventsWs.addEventListener("message",this._onGatewaySocketMessage),this._sessionWs.addEventListener("close",this._onGatewaySocketClosed),this._eventsWs.addEventListener("close",this._onGatewaySocketClosed),this._sessionWs.addEventListener("error",()=>{var l,a;this._closingByClient||((a=(l=this._cb).onError)==null||a.call(l,"Gateway 语音通道异常中断"),this._emit("error","Gateway 语音通道异常中断"),this._cleanup())}),this._eventsWs.addEventListener("error",()=>{var l,a;this._closingByClient||((a=(l=this._cb).onError)==null||a.call(l,"Gateway 语音事件通道异常中断"),this._emit("error","Gateway 语音事件通道异常中断"),this._cleanup())})}_mapIncomingVoiceEvent(t){var s,i,r,o,l,a,d,p,c,h,u,v;const e=String((t==null?void 0:t.type)||(t==null?void 0:t.event)||(t==null?void 0:t.name)||"").trim();return e==="stt_result"?{type:"stt_result",text:(t==null?void 0:t.text)||((s=t==null?void 0:t.result)==null?void 0:s.text)||((r=(i=t==null?void 0:t.data)==null?void 0:i.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||""}:e==="intent_result"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((l=t==null?void 0:t.result)==null?void 0:l.reply)||((h=(c=(p=(d=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:d.response)==null?void 0:p.speech)==null?void 0:c.plain)==null?void 0:h.speech)||""}:e==="tts_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((v=(u=t==null?void 0:t.data)==null?void 0:u.tts_output)==null?void 0:v.url)||""}:e==="done"?{type:"done"}:e==="error"?{type:"error",message:(t==null?void 0:t.message)||(t==null?void 0:t.error)||"语音管道错误"}:this._mapLegacyVoiceEvent(t,e)}_mapLegacyVoiceEvent(t,e){var s,i,r,o,l,a,d,p,c,h,u,v;return this._enableLegacyVoiceEventCompat?e==="stt-end"||e==="transcript_final"?{type:"stt_result",text:(t==null?void 0:t.text)||((s=t==null?void 0:t.result)==null?void 0:s.text)||((r=(i=t==null?void 0:t.data)==null?void 0:i.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||"",legacy_type:e}:e==="intent-end"||e==="reply"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((l=t==null?void 0:t.result)==null?void 0:l.reply)||((h=(c=(p=(d=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:d.response)==null?void 0:p.speech)==null?void 0:c.plain)==null?void 0:h.speech)||"",legacy_type:e}:e==="tts-end"||e==="audio_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((v=(u=t==null?void 0:t.data)==null?void 0:u.tts_output)==null?void 0:v.url)||"",legacy_type:e}:e==="pipeline_end"||e==="session_end"?{type:"done",legacy_type:e}:null:null}_resolveMediaUrl(t){if(/^https?:\/\//i.test(t))return t;const e=this._resolveGatewayBaseUrl();return t.startsWith("/")?`${e}${t}`:`${e}/${t}`}_playTts(t){this._audioElem&&this._audioElem.pause(),this._audioElem=new Audio(t),this._audioElem.onended=()=>{this._emit("idle"),this._cleanup()},this._audioElem.onerror=()=>{this._emit("idle"),this._cleanup()},this._audioElem.play().catch(()=>{this._emit("idle")})}_emit(t,e){var s,i;(i=(s=this._cb).onStageChange)==null||i.call(s,t,e)}_cleanup(){var t,e,s,i,r,o,l,a;this._isRunning=!1,this._closingByClient=!0,(t=this._sessionWs)==null||t.removeEventListener("message",this._onGatewaySocketMessage),(e=this._eventsWs)==null||e.removeEventListener("message",this._onGatewaySocketMessage),(s=this._sessionWs)==null||s.removeEventListener("close",this._onGatewaySocketClosed),(i=this._eventsWs)==null||i.removeEventListener("close",this._onGatewaySocketClosed),this._sessionWs&&this._sessionWs.readyState===WebSocket.OPEN&&this._sessionWs.close(1e3,"client_cleanup"),this._eventsWs&&this._eventsWs.readyState===WebSocket.OPEN&&this._eventsWs.close(1e3,"client_cleanup"),this._sessionWs=null,this._eventsWs=null,this._sessionId=null,(r=this._processor)==null||r.disconnect(),(o=this._inputNode)==null||o.disconnect(),(l=this._audioCtx)==null||l.close(),this._processor=null,this._inputNode=null,this._audioCtx=null,(a=this._mediaStream)==null||a.getTracks().forEach(d=>d.stop()),this._mediaStream=null}_toWsBase(t){return t.startsWith("https://")?`wss://${t.slice(8)}`:t.startsWith("http://")?`ws://${t.slice(7)}`:t}_appendToken(t,e){if(!e||t.includes("token="))return t;const s=t.includes("?")?"&":"?";return`${t}${s}token=${encodeURIComponent(e)}`}_waitSocketOpen(t,e){return new Promise((s,i)=>{const r=()=>{a(),s()},o=()=>{a(),i(new Error(`${e} 连接失败`))},l=()=>{a(),i(new Error(`${e} 已关闭`))},a=()=>{t.removeEventListener("open",r),t.removeEventListener("error",o),t.removeEventListener("close",l)};t.addEventListener("open",r),t.addEventListener("error",o),t.addEventListener("close",l)})}_normalizeError(t){const e=(t==null?void 0:t.message)||String(t||"未知错误");return/permission/i.test(e)?"请允许浏览器使用麦克风":`语音链路错误: ${e}`}}class Zs{constructor(t){this._state="stopped",this._audioCtx=null,this._stream=null,this._processor=null,this._source=null,this._activationFrames=0,this.ACTIVATION_THRESHOLD=7,this.ENERGY_THRESHOLD=.02,this._cooldownTimer=null,this.COOLDOWN_MS=8e3,this._onActivated=t}get isListening(){return this._state==="listening"}async start(){if(this._state==="stopped")try{this._stream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:16e3,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:16e3}),this._source=this._audioCtx.createMediaStreamSource(this._stream),this._processor=this._audioCtx.createScriptProcessor(2048,1,1),this._processor.onaudioprocess=t=>{if(this._state!=="listening")return;const e=t.inputBuffer.getChannelData(0);let s=0;for(let r=0;r<e.length;r++)s+=e[r]*e[r];Math.sqrt(s/e.length)>this.ENERGY_THRESHOLD?(this._activationFrames++,this._activationFrames>=this.ACTIVATION_THRESHOLD&&(this._activationFrames=0,this._triggerActivation())):this._activationFrames=0},this._source.connect(this._processor),this._processor.connect(this._audioCtx.destination),this._state="listening"}catch(t){console.warn("[AlwaysOnVAD] 麦克风访问失败，免唤醒模式不可用:",t.message)}}pause(){this._state==="listening"&&(this._state="paused")}resume(){this._state==="paused"&&(this._cooldownTimer=setTimeout(()=>{this._state==="paused"&&(this._state="listening",this._activationFrames=0)},this.COOLDOWN_MS))}stop(){var t,e,s,i;this._state="stopped",this._cooldownTimer&&clearTimeout(this._cooldownTimer),(t=this._processor)==null||t.disconnect(),(e=this._source)==null||e.disconnect(),(s=this._audioCtx)==null||s.close(),(i=this._stream)==null||i.getTracks().forEach(r=>r.stop()),this._processor=null,this._source=null,this._audioCtx=null,this._stream=null}_triggerActivation(){this._state="paused",this._onActivated()}}var tn=Object.defineProperty,en=Object.getOwnPropertyDescriptor,I=(n,t,e,s)=>{for(var i=s>1?void 0:s?en(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&tn(t,e,i),i};let R=class extends B{constructor(){super(...arguments),this.activeRoomId="all",this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this.devices=[],this.energyStats=[],this.frigateEvents=[],this.criticalEvent=null,this.activeDetailEntity=null,this.isRecording=!1,this.isConnected=!1,this.isConfiguring=!1,this.connectionError="",this.isPairingStep=!1,this.gatewayBase="",this.gatewayToken="",this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.isPairing=!1,this.voiceText="点击开始语音指令",this.voiceReply="",this.waveData=new Array(20).fill(0),this.pipelineStage="idle",this.theme="dark",this._voicePipeline=null,this._alwaysOnVad=null,this.alwaysOnEnabled=!1,this._expressWatchTimer=null,this.rooms=[{id:"all",name:"全部"}],this.scenes=[{id:"sc1",name:"全屋回家",icon:"home",isAi:!0,roomId:"all"},{id:"sc2",name:"全屋离家",icon:"directions_run",isAi:!1,roomId:"all"},{id:"sc_all_off",name:"全屋关灯",icon:"light_off",isAi:!1,roomId:"all"},{id:"sc3",name:"观影模式",icon:"movie",isAi:!0,roomId:"living"},{id:"sc_dinner",name:"用餐模式",icon:"restaurant",isAi:!1,roomId:"living"},{id:"sc4",name:"助眠模式",icon:"bedtime",isAi:!0,roomId:"bedroom"},{id:"sc_night",name:"起夜模式",icon:"nightlight",isAi:!1,roomId:"bedroom"},{id:"sc5",name:"专注工作",icon:"menu_book",isAi:!0,roomId:"study"},{id:"sc_read",name:"阅读模式",icon:"auto_stories",isAi:!1,roomId:"study"}],this.probeStatus=""}firstUpdated(){const n=localStorage.getItem("sa-theme");n&&(this.theme=n,n==="light"&&this.classList.add("theme-light")),Promise.resolve().then(()=>this._initConnection())}_toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",this.theme==="light"?this.classList.add("theme-light"):this.classList.remove("theme-light"),localStorage.setItem("sa-theme",this.theme)}async _initConnection(){const t=new URLSearchParams(window.location.search).get("gateway_token");t?(this.gatewayToken=t,localStorage.setItem("gateway_token",t)):this.gatewayToken=localStorage.getItem("gateway_token")||"",this.gatewayBase=window.location.origin,this.gatewayToken?this._tryConnect():(this.isConfiguring=!0,this.isPairingStep=!1,this._startExpressWatch())}_startExpressWatch(){this._stopExpressWatch();let n=0;const t=async()=>{if(!(this.isConnected||!this.isConfiguring||this.isPairing)){n++;try{const e=this.gatewayBase.trim(),s=`${e}/api/v1/device/pair/start`;this.probeStatus=`探测中 #${n}...`;const r=await(await fetch(s,{signal:AbortSignal.timeout(3e3)})).json();if(r.token){this.probeStatus="收到 Token，正在连接...",this._stopExpressWatch();const o=r.gateway_token||"";o&&(this.gatewayToken=o,localStorage.setItem("gateway_token",o));const l=window.location.origin.includes(":5173");this.gatewayBase=l?"":r.url||e,this._tryConnect();return}this.probeStatus=`等待极速配对... (#${n})`}catch(e){console.warn(`[probe #${n}] 失败:`,e.message),this.probeStatus=`探测失败: ${e.message}`}this.isConfiguring&&!this.isConnected&&!this.isPairing&&(this._expressWatchTimer=setTimeout(t,2e3))}};this._expressWatchTimer=setTimeout(t,1500)}_stopExpressWatch(){this._expressWatchTimer!==null&&(clearTimeout(this._expressWatchTimer),this._expressWatchTimer=null)}async _tryConnect(){this._stopExpressWatch();try{if(this.connectionError="",!this.gatewayToken)throw new Error("GATEWAY_TOKEN_REQUIRED");await rt.connect(this.gatewayToken),this.isConnected=!0,this.isConfiguring=!1;const t=localStorage.getItem("sa_voice_legacy_event_compat")==="1";this._voicePipeline=new Xs({gatewayBaseUrl:this.gatewayBase||window.location.origin,gatewayToken:this.gatewayToken,enableLegacyVoiceEventCompat:t},{onStageChange:(e,s)=>{var i;this.pipelineStage=e,e==="stt"?(this.isRecording=!0,this.voiceText="正在聆听中..."):e==="intent"?(this.isRecording=!1,this.voiceText="AI 理解中..."):e==="tts"||e==="playing"?this.voiceText=this.voiceReply||"正在生成回复...":e==="idle"?(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"随时说话...":"点击开始语音指令",this.waveData=new Array(20).fill(0),setTimeout(()=>{this.voiceReply=""},8e3),this.alwaysOnEnabled&&((i=this._alwaysOnVad)==null||i.resume())):e==="error"&&(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"出错了，继续监听中...":s||"出现错误，请重试",this.waveData=new Array(20).fill(0),this.alwaysOnEnabled&&setTimeout(()=>{var r;return(r=this._alwaysOnVad)==null?void 0:r.resume()},2e3))},onSttResult:e=>{this.voiceText=`"${e}"`},onReply:e=>{this.voiceReply=e},onError:e=>{console.error("[VoicePipeline]",e),this.voiceText=e,this.isRecording=!1},onWaveData:e=>{this.waveData=[...e]},onVadActivated:()=>{}}),this._alwaysOnVad=new Zs(async()=>{!this._voicePipeline||this._voicePipeline.isRunning||(this.voiceText="检测到语音，正在识别...",await this._voicePipeline.start())}),Qs.subscribe((e,s,i,r,o,l)=>{this.devices=[...e],this.aiState={...s},this.energyStats=[...i],this.frigateEvents=[...r],this.rooms=[...o],this.criticalEvent=l})}catch(n){console.error("Connection failed",n),this.isConnected=!1,this.isConfiguring=!0,n.message==="GATEWAY_TOKEN_REQUIRED"?this.connectionError="缺少 Gateway Token：请通过一键配对获取 gateway_token，或在本地存储中提供 gateway_token":this.connectionError=n.message==="AUTH_REQUIRED"?"访问令牌无效或已过期":"无法连接到 Home Assistant 服务器"}}async _toggleVoice(){if(!this._voicePipeline){this.voiceText="语音功能初始化中...";return}this._voicePipeline.isRunning?this._voicePipeline.stop():await this._voicePipeline.start()}async _startRecording(){await this._toggleVoice()}async _stopRecording(){var n;(n=this._voicePipeline)==null||n.stop()}async _toggleAlwaysOn(){this._alwaysOnVad&&(this.alwaysOnEnabled?(this._alwaysOnVad.stop(),this.alwaysOnEnabled=!1,this.voiceText="点击开始语音指令"):(await this._alwaysOnVad.start(),this.alwaysOnEnabled=!0,this.voiceText="随时说话..."))}_renderActiveRoomView(){const n=this.activeRoomId,t=n==="all"?this.devices:this.devices.filter(r=>r.roomId===n);if(t.length===0&&n!=="all")return g`
        <div style="text-align: center; padding: 100px 20px; color: rgba(255,255,255,0.15);">
          <span class="icon-main" style="font-size: 64px; margin-bottom: 24px; display: block; opacity: 0.1;">devices_other</span>
          <div style="font-size: 16px; font-weight: 700;">该区域暂无托管设备</div>
        </div>
      `;const e=this.scenes.filter(r=>r.roomId===n||n==="all"&&r.isAi),s=this.devices.filter(r=>r.type==="scene"&&(n==="all"||r.roomId===n)),i=[{id:"light",name:"照明",icon:"lightbulb"},{id:"climate",name:"环境",icon:"thermostat"},{id:"cover",name:"遮蔽",icon:"curtains"},{id:"sensor",name:"感应",icon:"sensors"},{id:"other",name:"其他",icon:"more_horiz"}];return g`
      <div class="room-content" style="padding-top: 0;">
        <!-- 场景区 -->
        ${e.length>0||s.length>0?g`
          <div class="category-group">
            <div class="section-label">
              <span class="icon-main">auto_awesome</span> 场景模式
            </div>
            <div class="scene-grid-orb">
              ${e.map(r=>g`<scene-card .scene="${r}" .isAiRecommended="${r.isAi}"></scene-card>`)}
              ${s.map(r=>g`<scene-card .scene="${r}" .isAiRecommended="${!0}"></scene-card>`)}
            </div>
          </div>
        `:""}

        <!-- 设备分类区 -->
        ${i.map(r=>{const o=t.filter(a=>r.id==="other"?!["light","climate","cover","sensor","scene"].includes(a.type):a.type===r.id);if(o.length===0)return"";let l=`${o.length} 个设备`;if(r.id==="light"){const a=o.filter(d=>d.state==="on").length;l=a===0?"灯全部关了":`${a} 盏灯开启中`}return g`
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
    `}async _handleServiceCall(n){var s;const{detail:t}=n,e=(s=t.data)==null?void 0:s.entity_id;e&&this.aiState.recentAiActions.includes(e)&&rt.callService("smart_agent","report_correction",{entity_id:e,reason:"中控屏手动覆盖"});try{await rt.callService(t.domain,t.service,t.data)}catch(i){console.error("[ServiceCall] 指令发送失败:",i)}}async _startPairing(){if(!this.isPairing){this._stopExpressWatch(),this.isPairing=!0,this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.connectionError="";try{let n=this.gatewayBase.trim();n&&!n.startsWith("http")&&(n="http://"+n),n.endsWith("/")&&(n=n.slice(0,-1));const t=await fetch(`${n}/api/v1/device/pair/start`,{method:"POST"});if(!t.ok)throw new Error("API_FAILED");const e=await t.json();if(e.token){const s=e.gateway_token||"";s&&(this.gatewayToken=s,localStorage.setItem("gateway_token",s));const i=window.location.origin.includes(":5173");this.gatewayBase=i?"":e.url||n,this.isPairing=!1,this._tryConnect();return}this.pairingCode=e.code||"",this.authUrl=e.auth_url||"",this.authUrl&&(this.qrDataUrl=await Cs.toDataURL(this.authUrl,{width:200,margin:1,color:{dark:"#1a1a2e",light:"#ffffff"}})),this.isPairingStep=!1,this._pollPairingStatus(n)}catch(n){console.error("Pairing failed",n),this.connectionError="无法连接到配对服务器",this.isPairingStep=!1,this.isPairing=!1}}}async _pollPairingStatus(n){if(this.isPairing)try{const t=await fetch(`${n}/api/v1/device/pair/confirm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:this.pairingCode})}),e=await t.json();if(!t.ok)throw new Error(String((e==null?void 0:e.error)||"API_FAILED"));if(e.ok){const s=e.gateway_token||"";s&&(this.gatewayToken=s,localStorage.setItem("gateway_token",s));const i=window.location.origin.includes(":5173");this.gatewayBase=i?"":e.url||n,this.isPairing=!1,this.isPairingStep=!0,this._tryConnect()}else e.error==="EXPIRED"?(this.connectionError='配对码已过期，请重新点击"一键连接"',this.isPairing=!1,this.isPairingStep=!1):setTimeout(()=>this._pollPairingStatus(n),2e3)}catch(t){console.warn("Polling pairing status failed",t),setTimeout(()=>this._pollPairingStatus(n),5e3)}}_renderConfigScreen(){return g`
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
            ${(this.pairingCode||"").split("").map(n=>g`
              <div style="width: 38px; height: 52px; background: rgba(179,136,255,0.1); border: 2px solid rgba(179,136,255,0.3); border-radius: 12px; font-size: 26px; font-weight: 900; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; color: #B388FF; box-shadow: 0 4px 16px rgba(179,136,255,0.2);">
                ${n}
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
        @show-detail="${n=>{const t=this.devices.find(e=>e.id===n.detail.entityId);t&&(this.activeDetailEntity=t)}}"
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
              ${this.rooms.map(n=>g`
                <div 
                  class="room-tab ${this.activeRoomId===n.id?"active":""}"
                  @click="${()=>this.activeRoomId=n.id}"
                >${n.name}</div>
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
                  @click="${()=>{rt.callService("smart_agent","manual_inference",{trigger:`[视觉主动] ${this.criticalEvent.camera_name} 发现人员长时间停留`}),this.criticalEvent=null}}">允许 AI 处理</button>
              </div>
            </div>
          </div>
        `:""}

        <!-- 6. 设备深度控制面板 (Detail Overlay) -->
        ${this.activeDetailEntity?g`
          <div class="critical-overlay" @click="${()=>this.activeDetailEntity=null}">
            <div class="detail-card" @click="${n=>n.stopPropagation()}">
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
    `:g`<div style="display:flex; height:100vh; align-items:center; justify-content:center;">正在连接...</div>`}};R.styles=O`
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
    `;I([M()],R.prototype,"activeRoomId",2);I([M()],R.prototype,"aiState",2);I([M()],R.prototype,"devices",2);I([M()],R.prototype,"energyStats",2);I([M()],R.prototype,"frigateEvents",2);I([M()],R.prototype,"criticalEvent",2);I([M()],R.prototype,"activeDetailEntity",2);I([M()],R.prototype,"isRecording",2);I([M()],R.prototype,"isConnected",2);I([M()],R.prototype,"isConfiguring",2);I([M()],R.prototype,"connectionError",2);I([M()],R.prototype,"isPairingStep",2);I([M()],R.prototype,"gatewayBase",2);I([M()],R.prototype,"gatewayToken",2);I([M()],R.prototype,"pairingCode",2);I([M()],R.prototype,"authUrl",2);I([M()],R.prototype,"qrDataUrl",2);I([M()],R.prototype,"isPairing",2);I([M()],R.prototype,"voiceText",2);I([M()],R.prototype,"voiceReply",2);I([M()],R.prototype,"waveData",2);I([M()],R.prototype,"pipelineStage",2);I([M()],R.prototype,"theme",2);I([M()],R.prototype,"alwaysOnEnabled",2);I([M()],R.prototype,"rooms",2);I([M()],R.prototype,"scenes",2);I([M()],R.prototype,"probeStatus",2);R=I([z("smart-app-shell")],R);
