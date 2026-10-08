class xt extends Error{constructor(t,e){const s=e&&typeof e=="object"&&!Array.isArray(e)?e:{};super(String(s.error||s.message||`Gateway request failed: ${t}`)),this.name="GatewayRequestError",this.status=t,this.payload=s}}function cs(i){const t={};for(const e of i||[]){const s=U(e==null?void 0:e.id),n=U(e==null?void 0:e.name);s&&s!=="all"&&n&&(t[s]=n)}return t}function ls(i,t){const e=U(i==null?void 0:i.icon);if(e)return e;const s=U(t).split(":").pop()||"";return s==="all_off"?"light_off":s==="all_on"?"lightbulb":s==="bright"?"wb_sunny":s==="soft"?"brightness_5":s==="night"?"nightlight":s==="glow"?"bedtime":"auto_awesome"}function ds(i){if(i.startsWith("system_fixed_lighting:home:"))return"all";const t=i.match(/^system_fixed_lighting:room:([^:]+):/);return t!=null&&t[1]?zt(t[1]):""}function us(i,t,e){const s=ds(t);if(s)return s;const n=U(i==null?void 0:i.room,i==null?void 0:i.area,i==null?void 0:i.space,i==null?void 0:i.room_id,i==null?void 0:i.space_id);return n?zt(n):je(e)||"all"}const hs=new Set(["1","true","yes","on"]),ps=new Set(["local_space_model"]);function U(...i){for(const t of i){if(t==null)continue;const e=String(t).trim();if(e)return e}return""}function ut(i){return i===!0?!0:i===!1||i===null||i===void 0?!1:typeof i=="number"?i!==0:hs.has(String(i).trim().toLowerCase())}function Ue(i){return U(i==null?void 0:i.entity_id,i==null?void 0:i.entityId,i==null?void 0:i.id)}function gs(i){return!i||typeof i!="object"||!Ue(i)?!1:ut(i.managed)||ut(i.in_sa)||ut(i.in_smartagent)}function ce(i){const t=[],e=new Set;for(const s of i||[]){if(!gs(s))continue;const r=Ue(s).toLowerCase();e.has(r)||(t.push(s),e.add(r))}return t}function je(i){const e=String(i||"").trim().toLowerCase();if(!e)return"";const s=e.replace(/[\s_-]+/g,"");if(e==="all"||e.includes("全屋")||e.includes("全部")||e.includes("whole_home"))return"all";if(e.includes("厨房")||e.includes("kitchen"))return"kitchen";const n=e.includes("客厅")||e.includes("living"),r=e.includes("餐厅")||e.includes("dining");return n&&r?"living_dining":n?"living":r?"dining":e.includes("书房")||e.includes("study")?"study":e.includes("主卧")||e.includes("卧室")||e.includes("bedroom")||e.includes("master")||s.includes("zhuwo")||s.includes("woshi")||s.includes("primarybedroom")?"bedroom":e.includes("卫生间")||e.includes("卫浴")||e.includes("bathroom")?"bathroom":e.includes("阳台")||e.includes("balcony")?"balcony":e.includes("玄关")||e.includes("entry")?"entry":e.includes("走廊")||e.includes("hallway")||e.includes("corridor")?"hallway":""}function zt(i){const t=String(i||"").trim(),e=t.toLowerCase();if(!e)return"";const s=je(t);return s||e.replace(/\s+/g,"_")}function Ze(...i){const t=i.map(e=>U(e)).filter(Boolean);for(const e of t){const s=je(e);if(s)return s}return zt(t[0]||"")}function fs(i){const t=U(i==null?void 0:i.roomId),e=U(i==null?void 0:i.sourceId);if(e.startsWith("system_fixed_lighting:")){const s=e.split(":").pop()||"";return[t||"all","system_fixed_lighting",s].join("|")}return[t||"all",e||U(i==null?void 0:i.id,i==null?void 0:i.name)].join("|")}function ms(i,t=""){const e=`${U(i==null?void 0:i.name)} ${U(i==null?void 0:i.sourceId)}`.toLowerCase(),s=t.trim().toLowerCase();let n=0;s&&e.includes(s)&&(n+=100);const r=e.replace(/[\s_-]+/g,"");return(e.includes("主卧")||r.includes("zhuwo")||e.includes("master"))&&(n+=10),n}function _s(i,t={}){const e=new Map;return i.forEach((s,n)=>{const r=fs(s);if(!r)return;const o=U(s==null?void 0:s.roomId),c=ms(s,t[o]||""),a=e.get(r);(!a||c>a.score)&&e.set(r,{scene:s,score:c,index:n})}),Array.from(e.values()).sort((s,n)=>s.index-n.index).map(s=>s.scene)}function vs(i){return!i||typeof i!="object"?!1:ut(i.managed)||ut(i.in_sa)||ut(i.in_smartagent)?!0:U(i.source).split("+").map(e=>e.trim()).some(e=>ps.has(e))}function bs(i,t){if(Array.isArray(i))return i;for(const e of[t,"items","data","rows","result"]){const s=i==null?void 0:i[e];if(Array.isArray(s))return s}return[]}function le(i){return{loading:"正在读取",ready:"已更新",empty:"暂无数据",disabled:"未启用",unavailable:"数据源不可用",stale:"读取失败，显示上次数据"}[i]}class dt{constructor(){this._devices=[],this._feeds={ai:"loading",energy:"loading",frigate:"loading",observedAt:""},this._refreshGeneration=0,this._aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this._energyStats=[],this._frigateEvents=[],this._criticalFrigateEvent=null,this._rooms=[{id:"all",name:"全部"}],this._managedDevicesInfo=new Map,this._listeners=[],this._authorizationFailureListeners=[],setInterval(()=>this._refreshManagedDevicesInBackground(),3e4)}async refreshManagedDevices(){const t=++this._refreshGeneration,e=localStorage.getItem("screen_token");if(!e)return!1;try{const[s,n,r]=await Promise.allSettled([this._fetchGatewayJson("/api/v1/devices"),this._fetchGatewayJson("/api/v1/rooms"),this._fetchGatewayJson("/api/v1/screen/status")]);if(t!==this._refreshGeneration||e!==localStorage.getItem("screen_token")||(this._requireReadAuthorization([s,n,r]),this._applyStatusResult(r),this._notifyListeners(),s.status==="rejected"&&console.warn("[StateManager] Failed to fetch managed devices",s.reason),n.status==="rejected"&&console.warn("[StateManager] Failed to fetch rooms",n.reason),s.status==="rejected"&&n.status==="rejected"))return!1;const o=s.status==="fulfilled"?this._extractRows(s.value,"devices"):[],c=n.status==="fulfilled"?this._extractRows(n.value,"rooms"):[],a=ce(o);s.status==="fulfilled"&&(this._managedDevicesInfo=this._buildManagedDeviceInfo(a));const l=new Map;c.forEach(u=>{if(!vs(u))return;const p=this._roomSummaryFromRow(u);p&&l.set(p.id,p)}),(s.status==="fulfilled"?a:Array.from(this._managedDevicesInfo.values())).forEach(u=>{const p=this._deviceRoom(u),m=this._deviceRoomId(u,p);p&&m&&l.set(m,{id:m,name:p})}),this._rooms=[{id:"all",name:"全部"},...Array.from(l.values())];let h=!1;return a.some(u=>this._gatewayRowHasRuntimeState(u))?h=this._processGatewayDeviceRows(a):s.status==="fulfilled"&&a.length===0&&(this._devices=[],h=!0),h&&this._notifyListeners(),!0}catch(s){if(this._isGatewayAuthorizationError(s))throw this._notifyAuthorizationRequired(),s;if(this._isGatewayScopeError(s))throw s;return console.warn("[StateManager] Failed to fetch managed devices",s),!1}}_requireReadAuthorization(t){if(t.some(e=>e.status==="rejected"&&this._isGatewayAuthorizationError(e.reason)))throw new Error("AUTH_REQUIRED");if(t.some(e=>e.status==="rejected"&&this._isGatewayScopeError(e.reason)))throw new Error("SCREEN_SCOPE_FORBIDDEN")}_applyStatusResult(t){if(t.status==="fulfilled")try{this._applyScreenStatus(t.value)}catch(e){console.warn("[StateManager] Invalid screen status response",e),this._markFeedsStale()}else this._markFeedsStale()}_markFeedsStale(){this._criticalFrigateEvent=null;const t=this._feeds.observedAt?"stale":"unavailable";this._feeds={...this._feeds,ai:t,energy:t,frigate:t}}_applyScreenStatus(t){const e=new Set(["ready","empty","disabled","unavailable"]);if((t==null?void 0:t.schema_version)!=="smartagent.screen_status.v1"||!["ai","energy","frigate"].every(s=>{var n;return e.has((n=t[s])==null?void 0:n.status)})||!Array.isArray(t.energy.data)||!Array.isArray(t.frigate.data)||!t.ai.data||typeof t.ai.data!="object")throw new Error("Invalid screen status");this._aiState={...t.ai.data},this._energyStats=[...t.energy.data],this._frigateEvents=[...t.frigate.data],this._criticalFrigateEvent=t.critical_frigate_event||null,this._feeds={ai:t.ai.status,energy:t.energy.status,frigate:t.frigate.status,observedAt:t.observed_at}}_isGatewayAuthorizationError(t){return t instanceof Error&&t.message==="AUTH_REQUIRED"}_isGatewayScopeError(t){return t instanceof Error&&t.message==="SCREEN_SCOPE_FORBIDDEN"}_notifyAuthorizationRequired(){for(const t of this._authorizationFailureListeners)t()}_refreshManagedDevicesInBackground(){this.refreshManagedDevices().catch(t=>{this._isGatewayAuthorizationError(t)||console.warn("[StateManager] Background device refresh failed",t)})}_gatewayHeaders(){const t=localStorage.getItem("screen_token")||"",e={Accept:"application/json"};return t&&(e.Authorization=`Bearer ${t}`),e}async _fetchGatewayJson(t){const e=await fetch(t,{headers:this._gatewayHeaders(),signal:AbortSignal.timeout(12e3)});if(!e.ok)throw e.status===401?new Error("AUTH_REQUIRED"):e.status===403?new Error("SCREEN_SCOPE_FORBIDDEN"):new Error(`Gateway request failed: ${t} ${e.status}`);return e.json()}_extractRows(t,e){if(Array.isArray(t))return t;for(const s of[e,"items","data","rows","result"]){const n=t==null?void 0:t[s];if(Array.isArray(n))return n}return[]}_buildManagedDeviceInfo(t){const e=new Map;for(const s of ce(t)){const n=this._deviceEntityId(s);if(!n)continue;const r=this._deviceRoom(s);e.set(n.toLowerCase(),{name:this._deviceName(s,n),room:r,roomId:this._deviceRoomId(s,r),actionDescriptors:Array.isArray(s==null?void 0:s.action_descriptors)?s.action_descriptors.filter(o=>o&&typeof o=="object"):[]})}return e}_processGatewayDeviceRows(t){const e=[];for(const s of ce(t)){const n=this._deviceEntityId(s);if(!n)continue;const r=s!=null&&s.attributes&&typeof s.attributes=="object"?s.attributes:{},o=this._firstString(s==null?void 0:s.domain,n.split(".")[0],s==null?void 0:s.type),c=this._deviceRoom(s),a=this._deviceRoomId(s,c),l=this._firstString(s==null?void 0:s.state,r.state,"unknown");e.push({id:n,type:this._mapDomainToType(o),name:this._deviceName(s,n),room:c,roomId:a,state:l,brightness:this._deviceBrightness(s,r),temperature:(s==null?void 0:s.temperature)||r.temperature||r.current_temperature,humidity:(s==null?void 0:s.humidity)||r.humidity,icon:this._firstString(s==null?void 0:s.icon,r.icon),attributes:r,actionDescriptors:Array.isArray(s==null?void 0:s.action_descriptors)?s.action_descriptors.filter(d=>d&&typeof d=="object"&&d.available===!0):[]})}return e.length===0?!1:(this._devices=e,!0)}_gatewayRowHasRuntimeState(t){var e;return!!this._firstString(t==null?void 0:t.state,(e=t==null?void 0:t.attributes)==null?void 0:e.state)}_deviceBrightness(t,e){const s=(t==null?void 0:t.brightness_pct)??(t==null?void 0:t.brightness)??(e==null?void 0:e.brightness_pct)??(e==null?void 0:e.brightness);if(s==null||s==="")return;const n=Number(s);if(Number.isFinite(n))return n>100?Math.round(n/255*100):Math.round(n)}_deviceEntityId(t){return Ue(t)}_deviceName(t,e){var s;return this._firstString(t==null?void 0:t.name,t==null?void 0:t.friendly_name,t==null?void 0:t.alias,(s=t==null?void 0:t.attributes)==null?void 0:s.friendly_name,e)}_deviceRoom(t){var e,s;return this._firstString(t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.space_id,t==null?void 0:t.room_id,t==null?void 0:t.area_id,(e=t==null?void 0:t.attributes)==null?void 0:e.room,(s=t==null?void 0:t.attributes)==null?void 0:s.area)}_deviceRoomId(t,e=""){var s,n,r;return Ze(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id,(s=t==null?void 0:t.attributes)==null?void 0:s.room_id,(n=t==null?void 0:t.attributes)==null?void 0:n.space_id,(r=t==null?void 0:t.attributes)==null?void 0:r.area_id)}_roomSummaryFromRow(t){const e=this._firstString(t==null?void 0:t.name,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id),s=Ze(e,t==null?void 0:t.room,t==null?void 0:t.room_name,t==null?void 0:t.area,t==null?void 0:t.area_name,t==null?void 0:t.space,t==null?void 0:t.space_name,t==null?void 0:t.id,t==null?void 0:t.room_id,t==null?void 0:t.space_id,t==null?void 0:t.area_id);return!s||s==="all"?null:{id:s,name:e||s}}_firstString(...t){for(const e of t){if(e==null)continue;const s=String(e).trim();if(s)return s}return""}static getInstance(){return dt.instance||(dt.instance=new dt),dt.instance}subscribe(t){return this._listeners.push(t),this._refreshManagedDevicesInBackground(),(this._devices.length>0||this._aiState.lastAction)&&t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent,this._feeds),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}subscribeAuthorizationRequired(t){return this._authorizationFailureListeners.push(t),()=>{this._authorizationFailureListeners=this._authorizationFailureListeners.filter(e=>e!==t)}}processSnapshotFrigateEvents(t){const e=t["sensor.smart_agent_status"];e&&(e.attributes.frigate_events&&(this._frigateEvents=e.attributes.frigate_events),this._criticalFrigateEvent=e.attributes.critical_frigate_event||null)}processSnapshotEnergyStats(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.energy_stats){const s=e.attributes.energy_stats;Array.isArray(s)?this._energyStats=[...s]:typeof s=="object"&&(this._energyStats=Object.values(s))}}processSnapshotAIState(t){const e=t["sensor.smart_agent_status"],s=t["text.smart_agent_last_action"];if(e){this._aiState.status=e.state;const n=e.attributes.action_history;Array.isArray(n)&&(this._aiState.actionHistory=[...n]),this._aiState.lastCorrection=e.attributes.last_correction||"",this._aiState.recentAiActions=e.attributes.recent_ai_actions||[],this._aiState.voiceStatus=e.attributes.voice_status||"idle",this._aiState.voiceReply=e.attributes.voice_reply||"",this._aiState.lastStt=e.attributes.last_stt||""}s&&s.state!==this._aiState.lastAction&&(this._aiState.lastAction=s.state,s.state&&s.state!=="unknown"&&(this._aiState.actionHistory=[s.state,...this._aiState.actionHistory.filter(n=>n!==s.state)].slice(0,5)))}processLegacySnapshot(t){const e=t["sensor.smart_agent_config"];if(e&&e.attributes.device_count!==void 0){const n=this._last_count||0;e.attributes.device_count!==n&&(this._last_count=e.attributes.device_count,this._refreshManagedDevicesInBackground())}const s=[];for(const[n,r]of Object.entries(t)){const o=this._managedDevicesInfo.get(n.toLowerCase());if(!o)continue;const c=n.split(".")[0],a=o.room||this._guessRoom(n,r),l=o.roomId||this._mapRoomToId(a);s.push({id:n,type:this._mapDomainToType(c),name:o.name||r.attributes.friendly_name||n,room:a,roomId:l,state:r.state,brightness:r.attributes.brightness?Math.round(r.attributes.brightness/255*100):void 0,temperature:r.attributes.temperature||r.attributes.current_temperature,humidity:r.attributes.humidity,icon:r.attributes.icon,attributes:r.attributes,actionDescriptors:o.actionDescriptors.filter(d=>d.available===!0)})}this._devices=s}_mapRoomToId(t){return zt(t)}_mapDomainToType(t){return t==="binary_sensor"?"sensor":t}_guessRoom(t,e){const s=(e.attributes.friendly_name||"").toLowerCase(),n=t.toLowerCase();return s.includes("客厅")||n.includes("living")?"客厅":s.includes("厨房")||n.includes("kitchen")?"厨房":s.includes("书房")||n.includes("study")?"书房":s.includes("卧室")||n.includes("bedroom")?"卧室":"未分类"}_notifyListeners(){this._listeners.forEach(t=>t(this._devices,this._aiState,this._energyStats,this._frigateEvents,this._rooms,this._criticalFrigateEvent,this._feeds))}getDevices(){return this._devices}}const wt=dt.getInstance();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=globalThis,He=Ut.ShadowRoot&&(Ut.ShadyCSS===void 0||Ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ve=Symbol(),ti=new WeakMap;let Hi=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(He&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ti.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ti.set(e,t))}return t}toString(){return this.cssText}};const ys=i=>new Hi(typeof i=="string"?i:i+"",void 0,Ve),N=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new Hi(e,i,Ve)},xs=(i,t)=>{if(He)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),n=Ut.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},ei=He?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ys(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ws,defineProperty:Ss,getOwnPropertyDescriptor:Es,getOwnPropertyNames:As,getOwnPropertySymbols:$s,getPrototypeOf:Cs}=Object,Z=globalThis,ii=Z.trustedTypes,ks=ii?ii.emptyScript:"",de=Z.reactiveElementPolyfillSupport,$t=(i,t)=>i,jt={toAttribute(i,t){switch(t){case Boolean:i=i?ks:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},We=(i,t)=>!ws(i,t),si={attribute:!0,type:String,converter:jt,reflect:!1,useDefault:!1,hasChanged:We};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Z.litPropertyMetadata??(Z.litPropertyMetadata=new WeakMap);let lt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=si){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Ss(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){const{get:n,set:r}=Es(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){const c=n==null?void 0:n.call(this);r==null||r.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??si}static _$Ei(){if(this.hasOwnProperty($t("elementProperties")))return;const t=Cs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($t("properties"))){const e=this.properties,s=[...As(e),...$s(e)];for(const n of s)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(ei(n))}else t!==void 0&&e.push(ei(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xs(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:jt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var r,o;const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const c=s.getPropertyOptions(n),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((r=c.converter)==null?void 0:r.fromAttribute)!==void 0?c.converter:jt;this._$Em=n;const l=a.fromAttribute(e,c.type);this[n]=l??((o=this._$Ej)==null?void 0:o.get(n))??l,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){var o;if(t!==void 0){const c=this.constructor;if(n===!1&&(r=this[t]),s??(s=c.getPropertyOptions(t)),!((s.hasChanged??We)(r,e)||s.useDefault&&s.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(c._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[r,o]of n){const{wrapped:c}=o,a=this[r];c!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(n=>{var r;return(r=n.hostUpdate)==null?void 0:r.call(n)}),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var n;return(n=s.hostUpdated)==null?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};lt.elementStyles=[],lt.shadowRootOptions={mode:"open"},lt[$t("elementProperties")]=new Map,lt[$t("finalized")]=new Map,de==null||de({ReactiveElement:lt}),(Z.reactiveElementVersions??(Z.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,ni=i=>i,Ht=Ct.trustedTypes,ri=Ht?Ht.createPolicy("lit-html",{createHTML:i=>i}):void 0,Vi="$lit$",X=`lit$${Math.random().toFixed(9).slice(2)}$`,Wi="?"+X,Rs=`<${Wi}>`,st=document,Rt=()=>st.createComment(""),Pt=i=>i===null||typeof i!="object"&&typeof i!="function",Ge=Array.isArray,Ps=i=>Ge(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",ue=`[ 	
\f\r]`,St=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oi=/-->/g,ai=/>/g,tt=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ci=/'/g,li=/"/g,Gi=/^(?:script|style|textarea|title)$/i,Ts=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),g=Ts(1),pt=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),di=new WeakMap,et=st.createTreeWalker(st,129);function Ji(i,t){if(!Ge(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ri!==void 0?ri.createHTML(t):t}const Is=(i,t)=>{const e=i.length-1,s=[];let n,r=t===2?"<svg>":t===3?"<math>":"",o=St;for(let c=0;c<e;c++){const a=i[c];let l,d,h=-1,u=0;for(;u<a.length&&(o.lastIndex=u,d=o.exec(a),d!==null);)u=o.lastIndex,o===St?d[1]==="!--"?o=oi:d[1]!==void 0?o=ai:d[2]!==void 0?(Gi.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=tt):d[3]!==void 0&&(o=tt):o===tt?d[0]===">"?(o=n??St,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,l=d[1],o=d[3]===void 0?tt:d[3]==='"'?li:ci):o===li||o===ci?o=tt:o===oi||o===ai?o=St:(o=tt,n=void 0);const p=o===tt&&i[c+1].startsWith("/>")?" ":"";r+=o===St?a+Rs:h>=0?(s.push(l),a.slice(0,h)+Vi+a.slice(h)+X+p):a+X+(h===-2?c:p)}return[Ji(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class Tt{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0;const c=t.length-1,a=this.parts,[l,d]=Is(t,e);if(this.el=Tt.createElement(l,s),et.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=et.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(Vi)){const u=d[o++],p=n.getAttribute(h).split(X),m=/([.?@])?(.*)/.exec(u);a.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?Os:m[1]==="?"?Ms:m[1]==="@"?Ns:Zt}),n.removeAttribute(h)}else h.startsWith(X)&&(a.push({type:6,index:r}),n.removeAttribute(h));if(Gi.test(n.tagName)){const h=n.textContent.split(X),u=h.length-1;if(u>0){n.textContent=Ht?Ht.emptyScript:"";for(let p=0;p<u;p++)n.append(h[p],Rt()),et.nextNode(),a.push({type:2,index:++r});n.append(h[u],Rt())}}}else if(n.nodeType===8)if(n.data===Wi)a.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(X,h+1))!==-1;)a.push({type:7,index:r}),h+=X.length-1}r++}}static createElement(t,e){const s=st.createElement("template");return s.innerHTML=t,s}}function gt(i,t,e=i,s){var o,c;if(t===pt)return t;let n=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const r=Pt(t)?void 0:t._$litDirective$;return(n==null?void 0:n.constructor)!==r&&((c=n==null?void 0:n._$AO)==null||c.call(n,!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=n:e._$Cl=n),n!==void 0&&(t=gt(i,n._$AS(i,t.values),n,s)),t}class Ds{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,n=((t==null?void 0:t.creationScope)??st).importNode(e,!0);et.currentNode=n;let r=et.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new Bt(r,r.nextSibling,this,t):a.type===1?l=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(l=new zs(r,this,t)),this._$AV.push(l),a=s[++c]}o!==(a==null?void 0:a.index)&&(r=et.nextNode(),o++)}return et.currentNode=st,n}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Bt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=gt(this,t,e),Pt(t)?t===L||t==null||t===""?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==pt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ps(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&Pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(st.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Tt.createElement(Ji(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===n)this._$AH.p(e);else{const o=new Ds(n,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=di.get(t.strings);return e===void 0&&di.set(t.strings,e=new Tt(t)),e}k(t){Ge(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const r of t)n===e.length?e.push(s=new Bt(this.O(Rt()),this.O(Rt()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const n=ni(t).nextSibling;ni(t).remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Zt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=L}_$AI(t,e=this,s,n){const r=this.strings;let o=!1;if(r===void 0)t=gt(this,t,e,0),o=!Pt(t)||t!==this._$AH&&t!==pt,o&&(this._$AH=t);else{const c=t;let a,l;for(t=r[0],a=0;a<r.length-1;a++)l=gt(this,c[s+a],e,a),l===pt&&(l=this._$AH[a]),o||(o=!Pt(l)||l!==this._$AH[a]),l===L?t=L:t!==L&&(t+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!n&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Os extends Zt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class Ms extends Zt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class Ns extends Zt{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=gt(this,t,e,0)??L)===pt)return;const s=this._$AH,n=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==L&&(s===L||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class zs{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}}const he=Ct.litHtmlPolyfillSupport;he==null||he(Tt,Bt),(Ct.litHtmlVersions??(Ct.litHtmlVersions=[])).push("3.3.2");const Bs=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let n=s._$litPart$;if(n===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=n=new Bt(t.insertBefore(Rt(),r),r,void 0,e??{})}return n._$AI(i),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=globalThis;class M extends lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return pt}}var ji;M._$litElement$=!0,M.finalized=!0,(ji=it.litElementHydrateSupport)==null||ji.call(it,{LitElement:M});const pe=it.litElementPolyfillSupport;pe==null||pe({LitElement:M});(it.litElementVersions??(it.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fs={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:We},Ls=(i=Fs,t,e)=>{const{kind:s,metadata:n}=e;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,i,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(s==="setter"){const{name:o}=e;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function P(i){return(t,e)=>typeof e=="object"?Ls(i,t,e):((s,n,r)=>{const o=n.hasOwnProperty(r);return n.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(n,r):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(i){return P({...i,state:!0,attribute:!1})}const B=N`
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
`;function qs(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ct={},ge,ui;function Us(){return ui||(ui=1,ge=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ge}var fe={},Q={},hi;function rt(){if(hi)return Q;hi=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Q.getSymbolSize=function(s){if(!s)throw new Error('"version" cannot be null or undefined');if(s<1||s>40)throw new Error('"version" should be in range from 1 to 40');return s*4+17},Q.getSymbolTotalCodewords=function(s){return t[s]},Q.getBCHDigit=function(e){let s=0;for(;e!==0;)s++,e>>>=1;return s},Q.setToSJISFunction=function(s){if(typeof s!="function")throw new Error('"toSJISFunc" is not a valid function.');i=s},Q.isKanjiModeEnabled=function(){return typeof i<"u"},Q.toSJIS=function(s){return i(s)},Q}var me={},pi;function Je(){return pi||(pi=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+e)}}i.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},i.from=function(s,n){if(i.isValid(s))return s;try{return t(s)}catch{return n}}})(me)),me}var _e,gi;function js(){if(gi)return _e;gi=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let s=0;s<e;s++)this.putBit((t>>>e-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},_e=i,_e}var ve,fi;function Hs(){if(fi)return ve;fi=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,e,s,n){const r=t*this.size+e;this.data[r]=s,n&&(this.reservedBit[r]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,s){this.data[t*this.size+e]^=s},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},ve=i,ve}var be={},mi;function Vs(){return mi||(mi=1,(function(i){const t=rt().getSymbolSize;i.getRowColCoords=function(s){if(s===1)return[];const n=Math.floor(s/7)+2,r=t(s),o=r===145?26:Math.ceil((r-13)/(2*n-2))*2,c=[r-7];for(let a=1;a<n-1;a++)c[a]=c[a-1]-o;return c.push(6),c.reverse()},i.getPositions=function(s){const n=[],r=i.getRowColCoords(s),o=r.length;for(let c=0;c<o;c++)for(let a=0;a<o;a++)c===0&&a===0||c===0&&a===o-1||c===o-1&&a===0||n.push([r[c],r[a]]);return n}})(be)),be}var ye={},_i;function Ws(){if(_i)return ye;_i=1;const i=rt().getSymbolSize,t=7;return ye.getPositions=function(s){const n=i(s);return[[0,0],[n-t,0],[0,n-t]]},ye}var xe={},vi;function Gs(){return vi||(vi=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},i.from=function(n){return i.isValid(n)?parseInt(n,10):void 0},i.getPenaltyN1=function(n){const r=n.size;let o=0,c=0,a=0,l=null,d=null;for(let h=0;h<r;h++){c=a=0,l=d=null;for(let u=0;u<r;u++){let p=n.get(h,u);p===l?c++:(c>=5&&(o+=t.N1+(c-5)),l=p,c=1),p=n.get(u,h),p===d?a++:(a>=5&&(o+=t.N1+(a-5)),d=p,a=1)}c>=5&&(o+=t.N1+(c-5)),a>=5&&(o+=t.N1+(a-5))}return o},i.getPenaltyN2=function(n){const r=n.size;let o=0;for(let c=0;c<r-1;c++)for(let a=0;a<r-1;a++){const l=n.get(c,a)+n.get(c,a+1)+n.get(c+1,a)+n.get(c+1,a+1);(l===4||l===0)&&o++}return o*t.N2},i.getPenaltyN3=function(n){const r=n.size;let o=0,c=0,a=0;for(let l=0;l<r;l++){c=a=0;for(let d=0;d<r;d++)c=c<<1&2047|n.get(l,d),d>=10&&(c===1488||c===93)&&o++,a=a<<1&2047|n.get(d,l),d>=10&&(a===1488||a===93)&&o++}return o*t.N3},i.getPenaltyN4=function(n){let r=0;const o=n.data.length;for(let a=0;a<o;a++)r+=n.data[a];return Math.abs(Math.ceil(r*100/o/5)-10)*t.N4};function e(s,n,r){switch(s){case i.Patterns.PATTERN000:return(n+r)%2===0;case i.Patterns.PATTERN001:return n%2===0;case i.Patterns.PATTERN010:return r%3===0;case i.Patterns.PATTERN011:return(n+r)%3===0;case i.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2===0;case i.Patterns.PATTERN101:return n*r%2+n*r%3===0;case i.Patterns.PATTERN110:return(n*r%2+n*r%3)%2===0;case i.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}i.applyMask=function(n,r){const o=r.size;for(let c=0;c<o;c++)for(let a=0;a<o;a++)r.isReserved(a,c)||r.xor(a,c,e(n,a,c))},i.getBestMask=function(n,r){const o=Object.keys(i.Patterns).length;let c=0,a=1/0;for(let l=0;l<o;l++){r(l),i.applyMask(l,n);const d=i.getPenaltyN1(n)+i.getPenaltyN2(n)+i.getPenaltyN3(n)+i.getPenaltyN4(n);i.applyMask(l,n),d<a&&(a=d,c=l)}return c}})(xe)),xe}var qt={},bi;function Ki(){if(bi)return qt;bi=1;const i=Je(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return qt.getBlocksCount=function(n,r){switch(r){case i.L:return t[(n-1)*4+0];case i.M:return t[(n-1)*4+1];case i.Q:return t[(n-1)*4+2];case i.H:return t[(n-1)*4+3];default:return}},qt.getTotalCodewordsCount=function(n,r){switch(r){case i.L:return e[(n-1)*4+0];case i.M:return e[(n-1)*4+1];case i.Q:return e[(n-1)*4+2];case i.H:return e[(n-1)*4+3];default:return}},qt}var we={},Et={},yi;function Js(){if(yi)return Et;yi=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let s=1;for(let n=0;n<255;n++)i[n]=s,t[s]=n,s<<=1,s&256&&(s^=285);for(let n=255;n<512;n++)i[n]=i[n-255]})(),Et.log=function(s){if(s<1)throw new Error("log("+s+")");return t[s]},Et.exp=function(s){return i[s]},Et.mul=function(s,n){return s===0||n===0?0:i[t[s]+t[n]]},Et}var xi;function Ks(){return xi||(xi=1,(function(i){const t=Js();i.mul=function(s,n){const r=new Uint8Array(s.length+n.length-1);for(let o=0;o<s.length;o++)for(let c=0;c<n.length;c++)r[o+c]^=t.mul(s[o],n[c]);return r},i.mod=function(s,n){let r=new Uint8Array(s);for(;r.length-n.length>=0;){const o=r[0];for(let a=0;a<n.length;a++)r[a]^=t.mul(n[a],o);let c=0;for(;c<r.length&&r[c]===0;)c++;r=r.slice(c)}return r},i.generateECPolynomial=function(s){let n=new Uint8Array([1]);for(let r=0;r<s;r++)n=i.mul(n,new Uint8Array([1,t.exp(r)]));return n}})(we)),we}var Se,wi;function Ys(){if(wi)return Se;wi=1;const i=Ks();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(s){this.degree=s,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(s){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(s.length+this.degree);n.set(s);const r=i.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){const c=new Uint8Array(this.degree);return c.set(r,o),c}return r},Se=t,Se}var Ee={},Ae={},$e={},Si;function Yi(){return Si||(Si=1,$e.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),$e}var G={},Ei;function Qi(){if(Ei)return G;Ei=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const s="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;G.KANJI=new RegExp(e,"g"),G.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),G.BYTE=new RegExp(s,"g"),G.NUMERIC=new RegExp(i,"g"),G.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+e+"$"),r=new RegExp("^"+i+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return G.testKanji=function(a){return n.test(a)},G.testNumeric=function(a){return r.test(a)},G.testAlphanumeric=function(a){return o.test(a)},G}var Ai;function ot(){return Ai||(Ai=1,(function(i){const t=Yi(),e=Qi();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(r,o){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?r.ccBits[0]:o<27?r.ccBits[1]:r.ccBits[2]},i.getBestModeForData=function(r){return e.testNumeric(r)?i.NUMERIC:e.testAlphanumeric(r)?i.ALPHANUMERIC:e.testKanji(r)?i.KANJI:i.BYTE},i.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},i.isValid=function(r){return r&&r.bit&&r.ccBits};function s(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+n)}}i.from=function(r,o){if(i.isValid(r))return r;try{return s(r)}catch{return o}}})(Ae)),Ae}var $i;function Qs(){return $i||($i=1,(function(i){const t=rt(),e=Ki(),s=Je(),n=ot(),r=Yi(),o=7973,c=t.getBCHDigit(o);function a(u,p,m){for(let f=1;f<=40;f++)if(p<=i.getCapacity(f,m,u))return f}function l(u,p){return n.getCharCountIndicator(u,p)+4}function d(u,p){let m=0;return u.forEach(function(f){const D=l(f.mode,p);m+=D+f.getBitsLength()}),m}function h(u,p){for(let m=1;m<=40;m++)if(d(u,m)<=i.getCapacity(m,p,n.MIXED))return m}i.from=function(p,m){return r.isValid(p)?parseInt(p,10):m},i.getCapacity=function(p,m,f){if(!r.isValid(p))throw new Error("Invalid QR Code version");typeof f>"u"&&(f=n.BYTE);const D=t.getSymbolTotalCodewords(p),b=e.getTotalCodewordsCount(p,m),T=(D-b)*8;if(f===n.MIXED)return T;const C=T-l(f,p);switch(f){case n.NUMERIC:return Math.floor(C/10*3);case n.ALPHANUMERIC:return Math.floor(C/11*2);case n.KANJI:return Math.floor(C/13);case n.BYTE:default:return Math.floor(C/8)}},i.getBestVersionForData=function(p,m){let f;const D=s.from(m,s.M);if(Array.isArray(p)){if(p.length>1)return h(p,D);if(p.length===0)return 1;f=p[0]}else f=p;return a(f.mode,f.getLength(),D)},i.getEncodedBits=function(p){if(!r.isValid(p)||p<7)throw new Error("Invalid QR Code version");let m=p<<12;for(;t.getBCHDigit(m)-c>=0;)m^=o<<t.getBCHDigit(m)-c;return p<<12|m}})(Ee)),Ee}var Ce={},Ci;function Xs(){if(Ci)return Ce;Ci=1;const i=rt(),t=1335,e=21522,s=i.getBCHDigit(t);return Ce.getEncodedBits=function(r,o){const c=r.bit<<3|o;let a=c<<10;for(;i.getBCHDigit(a)-s>=0;)a^=t<<i.getBCHDigit(a)-s;return(c<<10|a)^e},Ce}var ke={},Re,ki;function Zs(){if(ki)return Re;ki=1;const i=ot();function t(e){this.mode=i.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(s){return 10*Math.floor(s/3)+(s%3?s%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(s){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),s.put(o,10);const c=this.data.length-n;c>0&&(r=this.data.substr(n),o=parseInt(r,10),s.put(o,c*3+1))},Re=t,Re}var Pe,Ri;function tn(){if(Ri)return Pe;Ri=1;const i=ot(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(s){this.mode=i.ALPHANUMERIC,this.data=s}return e.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let r;for(r=0;r+2<=this.data.length;r+=2){let o=t.indexOf(this.data[r])*45;o+=t.indexOf(this.data[r+1]),n.put(o,11)}this.data.length%2&&n.put(t.indexOf(this.data[r]),6)},Pe=e,Pe}var Te,Pi;function en(){if(Pi)return Te;Pi=1;const i=ot();function t(e){this.mode=i.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(s){return s*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let s=0,n=this.data.length;s<n;s++)e.put(this.data[s],8)},Te=t,Te}var Ie,Ti;function sn(){if(Ti)return Ie;Ti=1;const i=ot(),t=rt();function e(s){this.mode=i.KANJI,this.data=s}return e.getBitsLength=function(n){return n*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(s){let n;for(n=0;n<this.data.length;n++){let r=t.toSJIS(this.data[n]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),s.put(r,13)}},Ie=e,Ie}var De={exports:{}},Ii;function nn(){return Ii||(Ii=1,(function(i){var t={single_source_shortest_paths:function(e,s,n){var r={},o={};o[s]=0;var c=t.PriorityQueue.make();c.push(s,0);for(var a,l,d,h,u,p,m,f,D;!c.empty();){a=c.pop(),l=a.value,h=a.cost,u=e[l]||{};for(d in u)u.hasOwnProperty(d)&&(p=u[d],m=h+p,f=o[d],D=typeof o[d]>"u",(D||f>m)&&(o[d]=m,c.push(d,m),r[d]=l))}if(typeof n<"u"&&typeof o[n]>"u"){var b=["Could not find a path from ",s," to ",n,"."].join("");throw new Error(b)}return r},extract_shortest_path_from_predecessor_list:function(e,s){for(var n=[],r=s;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,s,n){var r=t.single_source_shortest_paths(e,s,n);return t.extract_shortest_path_from_predecessor_list(r,n)},PriorityQueue:{make:function(e){var s=t.PriorityQueue,n={},r;e=e||{};for(r in s)s.hasOwnProperty(r)&&(n[r]=s[r]);return n.queue=[],n.sorter=e.sorter||s.default_sorter,n},default_sorter:function(e,s){return e.cost-s.cost},push:function(e,s){var n={value:e,cost:s};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(De)),De.exports}var Di;function rn(){return Di||(Di=1,(function(i){const t=ot(),e=Zs(),s=tn(),n=en(),r=sn(),o=Qi(),c=rt(),a=nn();function l(b){return unescape(encodeURIComponent(b)).length}function d(b,T,C){const A=[];let F;for(;(F=b.exec(C))!==null;)A.push({data:F[0],index:F.index,mode:T,length:F[0].length});return A}function h(b){const T=d(o.NUMERIC,t.NUMERIC,b),C=d(o.ALPHANUMERIC,t.ALPHANUMERIC,b);let A,F;return c.isKanjiModeEnabled()?(A=d(o.BYTE,t.BYTE,b),F=d(o.KANJI,t.KANJI,b)):(A=d(o.BYTE_KANJI,t.BYTE,b),F=[]),T.concat(C,A,F).sort(function(S,w){return S.index-w.index}).map(function(S){return{data:S.data,mode:S.mode,length:S.length}})}function u(b,T){switch(T){case t.NUMERIC:return e.getBitsLength(b);case t.ALPHANUMERIC:return s.getBitsLength(b);case t.KANJI:return r.getBitsLength(b);case t.BYTE:return n.getBitsLength(b)}}function p(b){return b.reduce(function(T,C){const A=T.length-1>=0?T[T.length-1]:null;return A&&A.mode===C.mode?(T[T.length-1].data+=C.data,T):(T.push(C),T)},[])}function m(b){const T=[];for(let C=0;C<b.length;C++){const A=b[C];switch(A.mode){case t.NUMERIC:T.push([A,{data:A.data,mode:t.ALPHANUMERIC,length:A.length},{data:A.data,mode:t.BYTE,length:A.length}]);break;case t.ALPHANUMERIC:T.push([A,{data:A.data,mode:t.BYTE,length:A.length}]);break;case t.KANJI:T.push([A,{data:A.data,mode:t.BYTE,length:l(A.data)}]);break;case t.BYTE:T.push([{data:A.data,mode:t.BYTE,length:l(A.data)}])}}return T}function f(b,T){const C={},A={start:{}};let F=["start"];for(let v=0;v<b.length;v++){const S=b[v],w=[];for(let _=0;_<S.length;_++){const $=S[_],y=""+v+_;w.push(y),C[y]={node:$,lastCount:0},A[y]={};for(let E=0;E<F.length;E++){const x=F[E];C[x]&&C[x].node.mode===$.mode?(A[x][y]=u(C[x].lastCount+$.length,$.mode)-u(C[x].lastCount,$.mode),C[x].lastCount+=$.length):(C[x]&&(C[x].lastCount=$.length),A[x][y]=u($.length,$.mode)+4+t.getCharCountIndicator($.mode,T))}}F=w}for(let v=0;v<F.length;v++)A[F[v]].end=0;return{map:A,table:C}}function D(b,T){let C;const A=t.getBestModeForData(b);if(C=t.from(T,A),C!==t.BYTE&&C.bit<A.bit)throw new Error('"'+b+'" cannot be encoded with mode '+t.toString(C)+`.
 Suggested mode is: `+t.toString(A));switch(C===t.KANJI&&!c.isKanjiModeEnabled()&&(C=t.BYTE),C){case t.NUMERIC:return new e(b);case t.ALPHANUMERIC:return new s(b);case t.KANJI:return new r(b);case t.BYTE:return new n(b)}}i.fromArray=function(T){return T.reduce(function(C,A){return typeof A=="string"?C.push(D(A,null)):A.data&&C.push(D(A.data,A.mode)),C},[])},i.fromString=function(T,C){const A=h(T,c.isKanjiModeEnabled()),F=m(A),v=f(F,C),S=a.find_path(v.map,"start","end"),w=[];for(let _=1;_<S.length-1;_++)w.push(v.table[S[_]].node);return i.fromArray(p(w))},i.rawSplit=function(T){return i.fromArray(h(T,c.isKanjiModeEnabled()))}})(ke)),ke}var Oi;function on(){if(Oi)return fe;Oi=1;const i=rt(),t=Je(),e=js(),s=Hs(),n=Vs(),r=Ws(),o=Gs(),c=Ki(),a=Ys(),l=Qs(),d=Xs(),h=ot(),u=rn();function p(v,S){const w=v.size,_=r.getPositions(S);for(let $=0;$<_.length;$++){const y=_[$][0],E=_[$][1];for(let x=-1;x<=7;x++)if(!(y+x<=-1||w<=y+x))for(let k=-1;k<=7;k++)E+k<=-1||w<=E+k||(x>=0&&x<=6&&(k===0||k===6)||k>=0&&k<=6&&(x===0||x===6)||x>=2&&x<=4&&k>=2&&k<=4?v.set(y+x,E+k,!0,!0):v.set(y+x,E+k,!1,!0))}}function m(v){const S=v.size;for(let w=8;w<S-8;w++){const _=w%2===0;v.set(w,6,_,!0),v.set(6,w,_,!0)}}function f(v,S){const w=n.getPositions(S);for(let _=0;_<w.length;_++){const $=w[_][0],y=w[_][1];for(let E=-2;E<=2;E++)for(let x=-2;x<=2;x++)E===-2||E===2||x===-2||x===2||E===0&&x===0?v.set($+E,y+x,!0,!0):v.set($+E,y+x,!1,!0)}}function D(v,S){const w=v.size,_=l.getEncodedBits(S);let $,y,E;for(let x=0;x<18;x++)$=Math.floor(x/3),y=x%3+w-8-3,E=(_>>x&1)===1,v.set($,y,E,!0),v.set(y,$,E,!0)}function b(v,S,w){const _=v.size,$=d.getEncodedBits(S,w);let y,E;for(y=0;y<15;y++)E=($>>y&1)===1,y<6?v.set(y,8,E,!0):y<8?v.set(y+1,8,E,!0):v.set(_-15+y,8,E,!0),y<8?v.set(8,_-y-1,E,!0):y<9?v.set(8,15-y-1+1,E,!0):v.set(8,15-y-1,E,!0);v.set(_-8,8,1,!0)}function T(v,S){const w=v.size;let _=-1,$=w-1,y=7,E=0;for(let x=w-1;x>0;x-=2)for(x===6&&x--;;){for(let k=0;k<2;k++)if(!v.isReserved($,x-k)){let Y=!1;E<S.length&&(Y=(S[E]>>>y&1)===1),v.set($,x-k,Y),y--,y===-1&&(E++,y=7)}if($+=_,$<0||w<=$){$-=_,_=-_;break}}}function C(v,S,w){const _=new e;w.forEach(function(k){_.put(k.mode.bit,4),_.put(k.getLength(),h.getCharCountIndicator(k.mode,v)),k.write(_)});const $=i.getSymbolTotalCodewords(v),y=c.getTotalCodewordsCount(v,S),E=($-y)*8;for(_.getLengthInBits()+4<=E&&_.put(0,4);_.getLengthInBits()%8!==0;)_.putBit(0);const x=(E-_.getLengthInBits())/8;for(let k=0;k<x;k++)_.put(k%2?17:236,8);return A(_,v,S)}function A(v,S,w){const _=i.getSymbolTotalCodewords(S),$=c.getTotalCodewordsCount(S,w),y=_-$,E=c.getBlocksCount(S,w),x=_%E,k=E-x,Y=Math.floor(_/E),yt=Math.floor(y/E),rs=yt+1,Ye=Y-yt,os=new a(Ye);let ne=0;const Lt=new Array(E),Qe=new Array(E);let re=0;const as=new Uint8Array(v.buffer);for(let at=0;at<E;at++){const ae=at<k?yt:rs;Lt[at]=as.slice(ne,ne+ae),Qe[at]=os.encode(Lt[at]),ne+=ae,re=Math.max(re,ae)}const oe=new Uint8Array(_);let Xe=0,J,K;for(J=0;J<re;J++)for(K=0;K<E;K++)J<Lt[K].length&&(oe[Xe++]=Lt[K][J]);for(J=0;J<Ye;J++)for(K=0;K<E;K++)oe[Xe++]=Qe[K][J];return oe}function F(v,S,w,_){let $;if(Array.isArray(v))$=u.fromArray(v);else if(typeof v=="string"){let Y=S;if(!Y){const yt=u.rawSplit(v);Y=l.getBestVersionForData(yt,w)}$=u.fromString(v,Y||40)}else throw new Error("Invalid data");const y=l.getBestVersionForData($,w);if(!y)throw new Error("The amount of data is too big to be stored in a QR Code");if(!S)S=y;else if(S<y)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+y+`.
`);const E=C(S,w,$),x=i.getSymbolSize(S),k=new s(x);return p(k,S),m(k),f(k,S),b(k,w,0),S>=7&&D(k,S),T(k,E),isNaN(_)&&(_=o.getBestMask(k,b.bind(null,k,w))),o.applyMask(_,k),b(k,w,_),{modules:k,version:S,errorCorrectionLevel:w,maskPattern:_,segments:$}}return fe.create=function(S,w){if(typeof S>"u"||S==="")throw new Error("No input text");let _=t.M,$,y;return typeof w<"u"&&(_=t.from(w.errorCorrectionLevel,t.M),$=l.from(w.version),y=o.from(w.maskPattern),w.toSJISFunc&&i.setToSJISFunction(w.toSJISFunc)),F(S,$,_,y)},fe}var Oe={},Me={},Mi;function Xi(){return Mi||(Mi=1,(function(i){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let s=e.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+e);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(r){return[r,r]}))),s.length===6&&s.push("F","F");const n=parseInt(s.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+s.slice(0,6).join("")}}i.getOptions=function(s){s||(s={}),s.color||(s.color={});const n=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,r=s.width&&s.width>=21?s.width:void 0,o=s.scale||4;return{width:r,scale:r?4:o,margin:n,color:{dark:t(s.color.dark||"#000000ff"),light:t(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},i.getScale=function(s,n){return n.width&&n.width>=s+n.margin*2?n.width/(s+n.margin*2):n.scale},i.getImageWidth=function(s,n){const r=i.getScale(s,n);return Math.floor((s+n.margin*2)*r)},i.qrToImageData=function(s,n,r){const o=n.modules.size,c=n.modules.data,a=i.getScale(o,r),l=Math.floor((o+r.margin*2)*a),d=r.margin*a,h=[r.color.light,r.color.dark];for(let u=0;u<l;u++)for(let p=0;p<l;p++){let m=(u*l+p)*4,f=r.color.light;if(u>=d&&p>=d&&u<l-d&&p<l-d){const D=Math.floor((u-d)/a),b=Math.floor((p-d)/a);f=h[c[D*o+b]?1:0]}s[m++]=f.r,s[m++]=f.g,s[m++]=f.b,s[m]=f.a}}})(Me)),Me}var Ni;function an(){return Ni||(Ni=1,(function(i){const t=Xi();function e(n,r,o){n.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(r,o,c){let a=c,l=o;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),o||(l=s()),a=t.getOptions(a);const d=t.getImageWidth(r.modules.size,a),h=l.getContext("2d"),u=h.createImageData(d,d);return t.qrToImageData(u.data,r,a),e(h,l,d),h.putImageData(u,0,0),l},i.renderToDataURL=function(r,o,c){let a=c;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),a||(a={});const l=i.render(r,o,a),d=a.type||"image/png",h=a.rendererOpts||{};return l.toDataURL(d,h.quality)}})(Oe)),Oe}var Ne={},zi;function cn(){if(zi)return Ne;zi=1;const i=Xi();function t(n,r){const o=n.a/255,c=r+'="'+n.hex+'"';return o<1?c+" "+r+'-opacity="'+o.toFixed(2).slice(1)+'"':c}function e(n,r,o){let c=n+r;return typeof o<"u"&&(c+=" "+o),c}function s(n,r,o){let c="",a=0,l=!1,d=0;for(let h=0;h<n.length;h++){const u=Math.floor(h%r),p=Math.floor(h/r);!u&&!l&&(l=!0),n[h]?(d++,h>0&&u>0&&n[h-1]||(c+=l?e("M",u+o,.5+p+o):e("m",a,0),a=0,l=!1),u+1<r&&n[h+1]||(c+=e("h",d),d=0)):a++}return c}return Ne.render=function(r,o,c){const a=i.getOptions(o),l=r.modules.size,d=r.modules.data,h=l+a.margin*2,u=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",p="<path "+t(a.color.dark,"stroke")+' d="'+s(d,l,a.margin)+'"/>',m='viewBox="0 0 '+h+" "+h+'"',D='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+m+' shape-rendering="crispEdges">'+u+p+`</svg>
`;return typeof c=="function"&&c(null,D),D},Ne}var Bi;function ln(){if(Bi)return ct;Bi=1;const i=Us(),t=on(),e=an(),s=cn();function n(r,o,c,a,l){const d=[].slice.call(arguments,1),h=d.length,u=typeof d[h-1]=="function";if(!u&&!i())throw new Error("Callback required as last argument");if(u){if(h<2)throw new Error("Too few arguments provided");h===2?(l=c,c=o,o=a=void 0):h===3&&(o.getContext&&typeof l>"u"?(l=a,a=void 0):(l=a,a=c,c=o,o=void 0))}else{if(h<1)throw new Error("Too few arguments provided");return h===1?(c=o,o=a=void 0):h===2&&!o.getContext&&(a=c,c=o,o=void 0),new Promise(function(p,m){try{const f=t.create(c,a);p(r(f,o,a))}catch(f){m(f)}})}try{const p=t.create(c,a);l(null,r(p,o,a))}catch(p){l(p)}}return ct.create=t.create,ct.toCanvas=n.bind(null,e.render),ct.toDataURL=n.bind(null,e.renderToDataURL),ct.toString=n.bind(null,function(r,o,c){return s.render(r,c)}),ct}var dn=ln();const un=qs(dn);var hn=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,te=(i,t,e,s)=>{for(var n=s>1?void 0:s?pn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&hn(t,e,n),n};let ft=class extends M{constructor(){super(...arguments),this.variant="frosted",this.state="off",this.interactive=!1}render(){return g`
      <div
        class="card ${this.variant} ${this.interactive?"interactive":""}"
        data-state="${this.state}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};ft.styles=[B,N`
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
  `];te([P({type:String})],ft.prototype,"variant",2);te([P({type:String})],ft.prototype,"state",2);te([P({type:Boolean})],ft.prototype,"interactive",2);ft=te([z("glass-card")],ft);var gn=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,Zi=(i,t,e,s)=>{for(var n=s>1?void 0:s?fn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&gn(t,e,n),n};let Vt=class extends M{constructor(){super(...arguments),this.checked=!1}render(){return g`
      <div
        class="toggle"
        ?data-checked="${this.checked}"
        @click="${i=>{i.stopPropagation();const t=!this.checked;this.dispatchEvent(new CustomEvent("change",{detail:t}))}}"
      >
        <div class="thumb"></div>
      </div>
    `}};Vt.styles=[B,N`
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
  `];Zi([P({type:Boolean})],Vt.prototype,"checked",2);Vt=Zi([z("glass-toggle")],Vt);var mn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,ee=(i,t,e,s)=>{for(var n=s>1?void 0:s?_n(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&mn(t,e,n),n};let mt=class extends M{constructor(){super(...arguments),this.value=50,this.label="",this._isDragging=!1,this._handleMove=i=>{this._isDragging&&(i.cancelable&&i.preventDefault(),this._updateValue(i),this.dispatchEvent(new CustomEvent("input",{detail:this.value})))},this._handleEnd=()=>{this._isDragging&&(this._isDragging=!1,this.dispatchEvent(new CustomEvent("change",{detail:this.value}))),window.removeEventListener("mousemove",this._handleMove),window.removeEventListener("mouseup",this._handleEnd),window.removeEventListener("touchmove",this._handleMove),window.removeEventListener("touchend",this._handleEnd)}}render(){return g`
      <div class="container" @mousedown="${this._handleStart}" @touchstart="${this._handleStart}">
        <div class="track" id="track">
          <div class="fill" style="width: ${this.value}%"></div>
          <div class="thumb" style="left: ${this.value}%"></div>
        </div>
        <div class="value-display">${Math.round(this.value)}%</div>
      </div>
    `}_handleStart(i){this._isDragging=!0,this._updateValue(i);const t={passive:!1};window.addEventListener("mousemove",this._handleMove,t),window.addEventListener("mouseup",this._handleEnd,t),window.addEventListener("touchmove",this._handleMove,t),window.addEventListener("touchend",this._handleEnd,t)}_updateValue(i){const t=this.renderRoot.querySelector("#track");if(!t)return;const e=t.getBoundingClientRect(),s="touches"in i?i.touches[0].clientX:i.clientX,r=Math.max(0,Math.min(s-e.left,e.width))/e.width*100;this.value!==r&&(this.value=r)}};mt.styles=[B,N`
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
  `];ee([P({type:Number})],mt.prototype,"value",2);ee([P({type:String})],mt.prototype,"label",2);ee([R()],mt.prototype,"_isDragging",2);mt=ee([z("glass-slider")],mt);var vn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Ke=(i,t,e,s)=>{for(var n=s>1?void 0:s?bn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&vn(t,e,n),n};let It=class extends M{constructor(){super(...arguments),this.rooms=[],this.activeRoom=""}render(){return g`
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
    `}_selectRoom(i){this.activeRoom=i,this.dispatchEvent(new CustomEvent("room-change",{detail:i}))}};It.styles=[B,N`
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
  `];Ke([P({type:Array})],It.prototype,"rooms",2);Ke([P({type:String})],It.prototype,"activeRoom",2);It=Ke([z("glass-nav")],It);const bt=(i,t)=>{if(!i)return{light:"lightbulb",switch:"toggle_on",climate:"ac_unit",cover:"blinds",sensor:"sensors",binary_sensor:"sensors",scene:"scene",media_player:"play_circle",automation:"robot",fan:"fan"}[t||""]||"device_hub";const e=i.replace("mdi:","").replace(/-/g,"_"),s={white_balance_incandescent:"lightbulb",ceiling_light:"lightbulb",lamp:"lightbulb",wall_sconce:"lightbulb",floor_lamp:"lightbulb",led_strip:"lightbulb",weather_sunny:"sunny",weather_cloudy:"cloudy",weather_rainy:"rainy",weather_snowy:"snowy",thermometer:"thermostat",water_percent:"humidity_mid",motion_sensor:"motion_sensors",motion_sensor_off:"motion_sensors",shield_lock:"security",eye:"visibility",eye_outline:"visibility",eye_off:"visibility_off",eye_off_outline:"visibility_off",eye_circle:"visibility",eye_circle_outline:"visibility",cctv:"videocam",camera:"videocam",camera_outline:"videocam",camera_off:"videocam_off",video:"videocam",video_outline:"videocam",account:"person",account_outline:"person",account_multiple:"group",account_multiple_outline:"group",account_check:"how_to_reg",account_off:"person_off",run:"directions_run",walk:"directions_walk",human:"person",human_greeting:"waving_hand",window_shutter:"blinds",curtains:"blinds",door:"door_front",door_open:"door_open",door_closed:"door_front",air_conditioner:"ac_unit",television:"tv",speaker:"speaker",washing_machine:"local_laundry_service",dishwasher:"dishwasher_gen",fridge:"kitchen",coffee_maker:"coffee_maker",kettle:"kettle",microwave:"microwave",oven:"oven_gen",fan:"fan",robot_vacuum:"cleaning_services",power:"power_settings_new",power_plug:"electrical_services",power_plug_off:"electrical_services",flash:"bolt",wifi:"wifi",bluetooth:"bluetooth",home:"home",home_outline:"home",map_marker:"location_on",map_marker_outline:"location_on"},n=e.replace(/_outline$/,"").replace(/_filled$/,"");return s[e]||s[n]||n};function yn(i){return{screen_scope_forbidden:"当前屏幕会话缺少此操作权限，配对状态已保留",user_explicit_control_confirmation_session_mismatch:"本次确认不属于当前屏幕会话，请重新发起操作并确认；配对状态已保留",user_explicit_control_confirmation_credential_mismatch:"屏幕凭据已变化，本次确认已失效，请重新发起操作并确认；配对状态已保留"}[String(i||"")]||"网关拒绝本次操作，配对状态已保留"}function V(i,t){if(Array.isArray(i==null?void 0:i.actionDescriptors))return i.actionDescriptors.find(e=>e.available===!0&&e.ui_role===t)}function Le(i,t){if(Array.isArray(i==null?void 0:i.actionDescriptors))return i.actionDescriptors.find(e=>e.available===!0&&e.service===t)}function j(i,t,e,s={}){i.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:e.domain,service:e.service,data:{...s,entity_id:t.id}}}))}var xn=Object.defineProperty,wn=Object.getOwnPropertyDescriptor,q=(i,t,e,s)=>{for(var n=s>1?void 0:s?wn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&xn(t,e,n),n};let Dt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1,this._lpTimer=null,this._lpStartX=0,this._lpStartY=0}render(){var o;const i=this.device.state==="on",t=bt(this.device.icon,"light"),e=((o=this.device.attributes)==null?void 0:o.supported_color_modes)||[],s=V(this.device,i?"deactivate":"activate"),r=!!Le(this.device,"turn_on")&&e.length>0&&!(e.length===1&&e[0]==="onoff");return g`
      <glass-card
        ?state="${i?"on":"off"}"
        ?interactive="${!!(s||r)}"
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
            ${s?g`<glass-toggle
              .checked="${i}"
              @change="${c=>{c.stopPropagation(),j(this,this.device,s)}}"
            ></glass-toggle>`:""}
          </div>

          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="info">${i?`${this.device.brightness||0}% 亮度`:"已关闭"}</div>
            ${r?g`<div class="hint">长按调光调色</div>`:""}
          </div>
        </div>
      </glass-card>
    `}_onPointerDown(i){i.button!==void 0&&i.button!==0||(this._lpStartX=i.clientX,this._lpStartY=i.clientY,this._lpTimer=setTimeout(()=>{var t;(t=navigator.vibrate)==null||t.call(navigator,40),this._showDetail()},600))}_onPointerMove(i){if(this._lpTimer===null)return;const t=i.clientX-this._lpStartX,e=i.clientY-this._lpStartY;Math.sqrt(t*t+e*e)>10&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerUp(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_onPointerCancel(){this._lpTimer!==null&&(clearTimeout(this._lpTimer),this._lpTimer=null)}_showDetail(){Le(this.device,"turn_on")&&this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};Dt.styles=[B,N`
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
  `];q([P({type:Object})],Dt.prototype,"device",2);q([P({type:Boolean})],Dt.prototype,"isAiControlled",2);Dt=q([z("light-card")],Dt);let Ot=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){var r;const i=this.device.state!=="off",t=Number((r=this.device.attributes)==null?void 0:r.temperature),e=bt(this.device.icon,"climate"),s=V(this.device,i?"deactivate":"activate"),n=V(this.device,"set_temperature");return g`
      <glass-card ?state="${i?"on":"off"}" interactive>
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="card-content">
          <div class="top-row">
            <div class="icon-box" 
              style="color: ${i?"var(--glass-primary)":"inherit"};"
              @click="${this._showDetail}"
            >${e}</div>
            ${s?g`<glass-toggle
              .checked="${i}"
              @change="${()=>j(this,this.device,s)}"
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
    `}_adjustTemp(i){var l,d;const t=V(this.device,"set_temperature"),e=Number((l=this.device.attributes)==null?void 0:l.temperature);if(!t||!Number.isFinite(e))return;const s=((d=t.parameters)==null?void 0:d.temperature)||{},n=Number(s.step)||Math.abs(i),r=Number(s.minimum),o=Number(s.maximum),c=e+Math.sign(i)*n,a=Math.min(Number.isFinite(o)?o:c,Math.max(Number.isFinite(r)?r:c,c));j(this,this.device,t,{temperature:a})}_showDetail(){this.dispatchEvent(new CustomEvent("show-detail",{bubbles:!0,composed:!0,detail:{entityId:this.device.id}}))}};Ot.styles=[B,N`
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
  `];q([P({type:Object})],Ot.prototype,"device",2);q([P({type:Boolean})],Ot.prototype,"isAiControlled",2);Ot=q([z("climate-card")],Ot);let Mt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const i=this.device.attributes.current_position||0,t=i>0,e=bt(this.device.icon,"cover"),s=V(this.device,"set_position"),n=V(this.device,"open"),r=V(this.device,"stop"),o=V(this.device,"close");return g`
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
            ${s?g`<glass-slider
              style="--glass-card-min-height: 0px; margin: 2px 0;"
              .value="${i}"
              @change="${c=>j(this,this.device,s,{position:c.detail})}"
            ></glass-slider>`:""}
            <div class="icon-btn-row">
              ${n?g`<div class="icon-btn" @click="${()=>j(this,this.device,n)}">keyboard_arrow_up</div>`:""}
              ${r?g`<div class="icon-btn" @click="${()=>j(this,this.device,r)}">pause</div>`:""}
              ${o?g`<div class="icon-btn" @click="${()=>j(this,this.device,o)}">keyboard_arrow_down</div>`:""}
            </div>
          </div>
        </div>
      </glass-card>
    `}};Mt.styles=[B,N`
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
  `];q([P({type:Object})],Mt.prototype,"device",2);q([P({type:Boolean})],Mt.prototype,"isAiControlled",2);Mt=q([z("cover-card")],Mt);let Wt=class extends M{constructor(){super(...arguments),this.device={}}render(){let i=this.device.state;const t=this.device.attributes||{},e=t.unit_of_measurement||"",s=t.device_class||"",n=bt(this.device.icon,"sensor"),r=h=>!h||/[\u4e00-\u9fa5]/.test(h)?h:h.replace(/\bPerson Occupancy\b/gi,"人员占用").replace(/\bPerson Count\b/gi,"人数").replace(/\bOccupancy\b/gi,"占用").replace(/\bMotion\b/gi,"移动检测").replace(/\bCam\s+[A-Fa-f0-9]+\b/gi,"摄像头").replace(/\bCamera\b/gi,"摄像头").replace(/\bZone\s+[A-Fa-f0-9]+\b/gi,"区域").trim().replace(/\s+/g," ");if(typeof i=="string"&&i.includes("T")&&i.includes(":"))try{const h=new Date(i);isNaN(h.getTime())||(i=`${(h.getMonth()+1).toString().padStart(2,"0")}-${h.getDate().toString().padStart(2,"0")} ${h.getHours().toString().padStart(2,"0")}:${h.getMinutes().toString().padStart(2,"0")}`)}catch{}const o=(h,u)=>{const p=h.toLowerCase();return p==="on"?u==="motion"||u==="occupancy"||u==="presence"?"有人":u==="door"||u==="window"||u==="opening"?"已打开":u==="moisture"?"漏水！":u==="smoke"?"烟雾！":u==="gas"?"燃气！":"开启":p==="off"?u==="motion"||u==="occupancy"||u==="presence"?"无人":u==="door"||u==="window"||u==="opening"?"已关闭":"正常":{playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",home:"在家",not_home:"离家",clear:"清空",detected:"检测到"}[p]||"后端未回流传感器状态"},c=r(this.device.name),a=o(i,s),l=s===""&&/^\d+$/.test(String(i)),d=a.length>5?"18px":a.length>2?"22px":"28px";return g`
      <glass-card>
        <div class="sensor-box">
          <div class="icon-box">${n}</div>
          <div class="bottom-info">
            <div class="name">${c}</div>
            <div class="value-display">
              <span class="value" style="font-size: ${l?"28px":d}">
                ${l?i:a}
              </span>
              ${l?g`<span class="unit">人</span>`:g`<span class="unit">${e}</span>`}
            </div>
          </div>
        </div>
      </glass-card>
    `}};Wt.styles=[B,N`
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
  `];q([P({type:Object})],Wt.prototype,"device",2);Wt=q([z("sensor-card")],Wt);let Nt=class extends M{constructor(){super(...arguments),this.device={},this.isAiControlled=!1}render(){const i=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",t=this.device.id.split(".")[0],e=bt(this.device.icon,t),s=V(this.device,i?"deactivate":"activate"),n=r=>{const o=r.toLowerCase();return{on:"已开启",off:"已关闭",playing:"播放中",paused:"已暂停",idle:"空闲",unavailable:"不可用",unknown:"未知",open:"已打开",closed:"已关闭"}[o]||"后端未回流设备状态"};return g`
      <glass-card ?state="${i?"on":"off"}" ?interactive="${!!s}" @click="${s?this._toggle:void 0}">
        ${this.isAiControlled?g`<div class="ai-badge">AI</div>`:""}
        <div class="content">
          <div class="top-row">
            <div class="icon-box" style="color: ${i?"var(--glass-primary)":"inherit"}">
              ${e}
            </div>
            ${s?g`<glass-toggle .checked="${i}" @change="${this._toggle}"></glass-toggle>`:""}
          </div>
          <div class="bottom-info">
            <div class="name">${this.device.name}</div>
            <div class="state">${n(this.device.state)}</div>
          </div>
        </div>
      </glass-card>
    `}_toggle(i){i&&i.stopPropagation();const t=this.device.state==="on"||this.device.state==="playing"||this.device.state==="open"||this.device.state==="active",e=V(this.device,t?"deactivate":"activate");e&&j(this,this.device,e)}};Nt.styles=[B,N`
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
  `];q([P({type:Object})],Nt.prototype,"device",2);q([P({type:Boolean})],Nt.prototype,"isAiControlled",2);Nt=q([z("generic-device-card")],Nt);let _t=class extends M{constructor(){super(...arguments),this.scene={},this.isAiRecommended=!1,this.reason=""}render(){const i=bt(this.scene.icon,"scene");return g`
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
    `}_trigger(){if(this.scene.gatewayTriggerPath){this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"smart_agent",service:"trigger_ai_scene",data:{scene_id:this.scene.id,gateway_path:this.scene.gatewayTriggerPath}}}));return}this.dispatchEvent(new CustomEvent("service-call",{bubbles:!0,composed:!0,detail:{domain:"scene",service:"turn_on",data:{entity_id:this.scene.id}}}))}};_t.styles=[B,N`
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
  `];q([P({type:Object})],_t.prototype,"scene",2);q([P({type:Boolean})],_t.prototype,"isAiRecommended",2);q([P({type:String})],_t.prototype,"reason",2);_t=q([z("scene-card")],_t);var Sn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,ts=(i,t,e,s)=>{for(var n=s>1?void 0:s?En(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Sn(t,e,n),n};let Gt=class extends M{constructor(){super(...arguments),this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""}}_statusLabel(i){const e=String(i||"").trim().toLowerCase();return{idle:"待命",thinking:"推理中",executing:"执行中",done:"已完成",error:"异常",unavailable:"不可用",unknown:"未知"}[e]||"后端未回流 AI 状态"}render(){const i=this._statusLabel(this.aiState.status);return g`
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
    `}};Gt.styles=[B,N`
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
  `];ts([P({type:Object})],Gt.prototype,"aiState",2);Gt=ts([z("ai-status-panel")],Gt);function ze(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function An(i){if(!ze(i)||i.ok===!1||typeof i.enabled!="boolean"||!Array.isArray(i.items)||!Array.isArray(i.recent))throw new Error("owner_question_page_invalid");for(const t of[...i.items,...i.recent])if(!ze(t)||!["question_id","decision_id","space_id","prompt","expires_at","status"].every(e=>typeof t[e]=="string")||typeof t.answer_submission_enabled!="boolean"||["suggestion","action_summary","displayed_at","voice_status"].some(e=>t[e]!==void 0&&typeof t[e]!="string")||t.voice_allowed!==void 0&&typeof t.voice_allowed!="boolean"||t.outcome!==void 0&&(!ze(t.outcome)||typeof t.outcome.message!="string"))throw new Error("owner_question_item_invalid");return i}var $n=Object.defineProperty,Cn=Object.getOwnPropertyDescriptor,W=(i,t,e,s)=>{for(var n=s>1?void 0:s?Cn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&$n(t,e,n),n};let H=class extends M{constructor(){super(...arguments),this.items=[],this.recent=[],this.busy=!1,this.notice="",this.error="",this.loading=!1,this.revision=0,this.displayed=new Set,this.voiceAttempted=new Set,this.announcing=!1,this.onVisibility=()=>{this.refresh()},this.onAnswer=()=>{this.refresh(!0)}}connectedCallback(){super.connectedCallback(),this.timer=setInterval(()=>void this.refresh(),15e3),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("owner-questions-changed",this.onAnswer)}firstUpdated(){this.refresh()}disconnectedCallback(){var i;super.disconnectedCallback(),this.revision++,this.loading=!1,clearInterval(this.timer),(i=this.observer)==null||i.disconnect(),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("owner-questions-changed",this.onAnswer)}async refresh(i=!1){var e;if(!this.read||(this.loading||this.busy)&&!i||document.visibilityState==="hidden")return;const t=++this.revision;this.loading=!0;try{const s=An(await this.read("/owner-questions"));if(this.isConnected&&t===this.revision){this.items=s.items,this.recent=s.recent,this.error="",(e=this.onPendingChanged)==null||e.call(this,this.items.filter(r=>r.voice_allowed).map(r=>r.question_id));const n=this.items.find(r=>r.voice_allowed&&!r.voice_status&&!this.voiceAttempted.has(r.question_id));n&&this.play(n)}}catch{this.isConnected&&t===this.revision&&(this.error="待回答事项暂时无法读取，请稍后重试。")}finally{t===this.revision&&(this.loading=!1)}}updated(){var i;(i=this.observer)==null||i.disconnect(),this.observer=new IntersectionObserver(t=>{if(document.visibilityState!=="hidden")for(const e of t){const s=e.target.dataset.question;!e.isIntersecting||!s||this.displayed.has(s)||(this.displayed.add(s),this.send(`/owner-questions/${encodeURIComponent(s)}/displayed`,{}).catch(()=>this.displayed.delete(s)))}}),this.renderRoot.querySelectorAll("[data-question]").forEach(t=>this.observer.observe(t))}async play(i,t=!1){if(!this.announce||this.announcing||this.busy||Date.parse(i.expires_at)<=Date.now())return;const e=i.question_id;this.voiceAttempted.add(e),this.announcing=!0;try{await this.announce(e,t)||(setTimeout(()=>this.voiceAttempted.delete(e),14e3),t&&(this.notice="语音正在使用中，请稍后播放问题。"))}catch(s){this.notice=s instanceof Error?s.message:"播放失败，请点击播放问题重试。"}finally{this.announcing=!1}}async answer(i,t){var e;if(!this.busy){this.busy=!0,this.revision++,this.loading=!1,this.items=this.items.filter(s=>s.question_id!==i.question_id),(e=this.onPendingChanged)==null||e.call(this,this.items.map(s=>s.question_id)),this.notice="";try{const s=await this.send(`/decision-log/${encodeURIComponent(i.decision_id)}/proactive-response`,{delivery_kind:"owner_question.v1",question_id:i.question_id,choice:t});this.notice=s.message||"回答已保存。",this.recent=[{...i,status:s.status,answer_submission_enabled:!1,outcome:s},...this.recent.filter(n=>n.question_id!==i.question_id)]}catch{this.notice="尚未收到确定结果，正在刷新记录；不会自动重发执行请求。"}finally{await this.refresh(!0),this.busy=!1}}}result(i){var t;return i.status==="expired"?"建议已过期，未执行。":i.status==="processing"?"回答已保存，正在核对执行结果；请勿重复操作。":((t=i.outcome)==null?void 0:t.message)||"本次建议已结束。"}render(){return!this.items.length&&!this.recent.length&&!this.notice&&!this.error?g``:g`<section aria-label="待我回答"><h2>待我回答${this.items.length?` · ${this.items.length}`:""}</h2>
      ${this.error?g`<p role="alert">${this.error} <button @click=${()=>this.refresh()}>重试</button></p>`:""}
      ${this.notice?g`<p role="status">${this.notice}</p>`:""}
      ${this.items.map(i=>g`<article data-question=${i.question_id}><p>${i.prompt}</p><p>${i.action_summary||""}</p><small>只处理这一次，不修改长期习惯。</small>
        ${i.voice_allowed&&this.announce?g`<button ?disabled=${this.announcing||this.busy} @click=${()=>this.play(i,!0)}>播放问题</button><small>播报后可直接说“同意”“暂时不要”或“不用了”。</small>`:""}
        ${i.answer_submission_enabled&&Date.parse(i.expires_at)>Date.now()?g`<div class="choices">${[["approve_once","同意"],["not_now","暂时不要"],["reject_suggestion","不用了"]].map(([t,e])=>g`<button ?disabled=${this.busy} @click=${()=>this.answer(i,t)}>${e}</button>`)}</div>`:g`<p role="status">建议已过期，未执行。</p>`}
      </article>`)}
      ${this.recent.length?g`<details><summary>最近的回答与结果</summary>${this.recent.map(i=>g`<p>${i.prompt}<br><small>${this.result(i)}</small></p>`)}</details>`:""}
    </section>`}};H.styles=N`
    :host { display: block; margin: 0 24px; color: var(--t-text-main); }
    section { background: var(--t-input-bg); border: 1px solid var(--t-input-border); border-radius: 16px; padding: 16px; }
    h2 { margin: 0 0 12px; font-size: 18px; } article { padding: 12px 0; }
    p { margin: 8px 0; line-height: 1.5; } small, summary { color: var(--t-text-sec); }
    .choices { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
    button { min-height:44px; border-radius:12px; border:1px solid var(--t-input-border); background:var(--t-input-bg); color:inherit; padding:10px 18px; cursor:pointer; }
    button:first-child { color:var(--ai-purple); } button:disabled { opacity:.5; cursor:wait; }
    summary { cursor:pointer; padding-top:12px; } [role=alert] { color:var(--t-text-sec); }
  `;W([P({attribute:!1})],H.prototype,"read",2);W([P({attribute:!1})],H.prototype,"send",2);W([P({attribute:!1})],H.prototype,"announce",2);W([P({attribute:!1})],H.prototype,"onPendingChanged",2);W([R()],H.prototype,"items",2);W([R()],H.prototype,"recent",2);W([R()],H.prototype,"busy",2);W([R()],H.prototype,"notice",2);W([R()],H.prototype,"error",2);W([R()],H.prototype,"announcing",2);H=W([z("owner-questions")],H);var kn=Object.defineProperty,Rn=Object.getOwnPropertyDescriptor,Ft=(i,t,e,s)=>{for(var n=s>1?void 0:s?Rn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&kn(t,e,n),n};let nt=class extends M{constructor(){super(...arguments),this.isRecording=!1,this.status="idle",this.text="点击开始语音指令",this.waveData=new Array(20).fill(0)}_stageMeta(){const i=String(this.status||"idle").toLowerCase();return this.isRecording||i==="stt"||i==="listening"?{stage:"listening",label:"聆听中",icon:"stop"}:i==="intent"||i==="processing"||i==="thinking"?{stage:"thinking",label:"理解中",icon:"sync"}:i==="tts"||i==="playing"||i==="done"||i==="speaking"?{stage:"speaking",label:"播报中",icon:"graphic_eq"}:i==="error"?{stage:"error",label:"异常",icon:"error"}:{stage:"idle",label:"待命",icon:"mic"}}render(){const i=this._stageMeta(),t=i.stage!=="idle";return g`
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
    `}_handleClick(){this.dispatchEvent(new CustomEvent("toggle-voice",{bubbles:!0,composed:!0}))}};nt.styles=[B,N`
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
  `];Ft([P({type:Boolean})],nt.prototype,"isRecording",2);Ft([P({type:String})],nt.prototype,"status",2);Ft([P({type:String})],nt.prototype,"text",2);Ft([P({type:Array})],nt.prototype,"waveData",2);nt=Ft([z("voice-bar")],nt);var Pn=Object.defineProperty,Tn=Object.getOwnPropertyDescriptor,es=(i,t,e,s)=>{for(var n=s>1?void 0:s?Tn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Pn(t,e,n),n};let Jt=class extends M{constructor(){super(...arguments),this._time=new Date}connectedCallback(){super.connectedCallback(),this._timer=setInterval(()=>{this._time=new Date},1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}render(){const i=this._time.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),t=this._time.toLocaleDateString("zh-CN",{month:"long",day:"numeric"}),e=this._time.toLocaleDateString("zh-CN",{weekday:"long"});return g`
      <div class="time">${i}</div>
      <div class="info-box">
        <div class="date">${t}</div>
        <div class="weekday">${e}</div>
      </div>
    `}};Jt.styles=[B,N`
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
  `];es([R()],Jt.prototype,"_time",2);Jt=es([z("clock-widget")],Jt);var In=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,ie=(i,t,e,s)=>{for(var n=s>1?void 0:s?Dn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&In(t,e,n),n};let vt=class extends M{constructor(){super(...arguments),this.condition="晴",this.temperature=26,this.icon="wb_sunny"}render(){return g`
      <div class="icon">${this.icon}</div>
      <div class="info">
        <div class="temp">${this.temperature}°C</div>
        <div class="desc">${this.condition}</div>
      </div>
    `}};vt.styles=[B,N`
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
  `];ie([P({type:String})],vt.prototype,"condition",2);ie([P({type:Number})],vt.prototype,"temperature",2);ie([P({type:String})],vt.prototype,"icon",2);vt=ie([z("weather-widget")],vt);var On=Object.defineProperty,Mn=Object.getOwnPropertyDescriptor,is=(i,t,e,s)=>{for(var n=s>1?void 0:s?Mn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&On(t,e,n),n};let Kt=class extends M{constructor(){super(...arguments),this.stats=[]}render(){if(!this.stats||this.stats.length===0)return g`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; opacity:0.3; gap:12px;">
          <span class="material-icon" data-icon="analytics" aria-hidden="true" style="font-size:40px;"></span>
          <span>暂无能耗数据</span>
        </div>
      `;if(this.stats.some(e=>typeof e.reading=="number"))return g`<div class="chart-container">${this.stats.slice(0,8).map(e=>g`
        <div class="energy-row"><div class="row-header">
          <span class="device-name">${e.name||e.entity_id}</span>
          <span class="time-val">${e.reading} ${e.unit}</span>
        </div></div>`)}</div><div class="legend">表计当前读数；开启时长与空房浪费统计暂未接入</div>`;const i=this.stats.slice(0,8),t=Math.max(...i.map(e=>e.on_minutes),1);return g`
      <div class="chart-container">
        ${i.map(e=>{const s=e.on_minutes/t*100,n=e.on_minutes>0?e.waste_minutes/e.on_minutes*100:0,r=e.entity_id.split(".").pop().replace(/_/g," ");return g`
            <div class="energy-row">
              <div class="row-header">
                <span class="device-name">${r}</span>
                <span class="time-val">${this._formatTime(e.on_minutes)} / 浪费 ${this._formatTime(e.waste_minutes)}</span>
              </div>
              <div class="progress-track">
                <div class="progress-on" style="width: ${s}%">
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
    `}_formatTime(i){if(!i)return"0分钟";const t=Math.floor(i/60),e=Math.floor(i%60);return t>0?`${t}小时${e}分钟`:`${e}分钟`}};Kt.styles=[B,N`
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
  `];is([P({type:Array})],Kt.prototype,"stats",2);Kt=is([z("energy-chart")],Kt);var Nn=Object.defineProperty,zn=Object.getOwnPropertyDescriptor,ss=(i,t,e,s)=>{for(var n=s>1?void 0:s?zn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Nn(t,e,n),n};let Yt=class extends M{constructor(){super(...arguments),this.events=[]}_labelText(i){const e=String(i||"").trim().toLowerCase();return{person:"人员",car:"车辆",dog:"宠物",cat:"宠物",package:"包裹",face:"人脸"}[e]||"未分类视觉目标"}render(){return!this.events||this.events.length===0?g`
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
    `}};Yt.styles=[B,N`
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
  `];ss([P({type:Array})],Yt.prototype,"events",2);Yt=ss([z("frigate-events-panel")],Yt);var Bn=Object.defineProperty,Fn=Object.getOwnPropertyDescriptor,se=(i,t,e,s)=>{for(var n=s>1?void 0:s?Fn(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&Bn(t,e,n),n};let Qt=class extends M{constructor(){super(...arguments),this.device={}}render(){const i=this.device.attributes||{},t=Le(this.device,"turn_on"),e=(t==null?void 0:t.parameters)||{},s=Number(this.device.brightness),n=i.color_temp_kelvin||(i.color_temp?Math.round(1e6/i.color_temp):null),r=e.color_temp_kelvin||{},o=Number(r.minimum),c=Number(r.maximum),a=Number(n),l=Math.min(100,Math.max(0,Math.round((a-o)/(c-o)*100))),d=i.supported_color_modes||[],h=!!(t&&e.brightness_pct&&Number.isFinite(s)),u=!!(t&&e.color_temp_kelvin&&d.includes("color_temp")&&Number.isFinite(a)&&Number.isFinite(o)&&Number.isFinite(c)&&c>o),p=!!(t&&e.rgb_color&&d.some(f=>["hs","rgb","xy","rgbw","rgbww"].includes(f))),m=[{name:"暖光",color:"#FFB347",k:2700},{name:"自然",color:"#FFE0B2",k:3500},{name:"阅读",color:"#FFF5DC",k:4e3},{name:"冷白",color:"#E8F4FD",k:5e3},{name:"日光",color:"#E3F2FD",k:6e3}].filter(f=>f.k>=o&&f.k<=c);return g`
      <div class="container">
        <!-- 亮度调节 -->
        ${h?g`<div class="section">
          <div class="value-display">
            <div class="label">亮度调节</div>
            <div class="value">${s}<span class="unit">%</span></div>
          </div>
          <glass-slider
            .value="${s}"
            @change="${f=>j(this,this.device,t,{brightness_pct:f.detail})}"
          ></glass-slider>
        </div>`:""}

        <!-- 色温调节（仅支持色温的灯显示） -->
        ${u?g`
          <div class="section">
            <div class="value-display">
              <div class="label">色温调节</div>
              <div class="value">${a}<span class="unit">K</span></div>
            </div>
            <glass-slider
              style="--glass-primary: #ffb347; --glass-primary-glow: rgba(255,179,71,0.3);"
              .value="${l}"
              @change="${f=>{const D=Math.round(o+f.detail/100*(c-o));j(this,this.device,t,{color_temp_kelvin:D})}}"
            ></glass-slider>
            <!-- 色温预设快捷按钮 -->
            ${m.length>0?g`
              <div class="color-presets">
                ${m.map(f=>g`
                  <div
                    class="color-dot ${a===f.k?"active":""}"
                    style="background: ${f.color}; color: ${f.color};"
                    title="${f.name} ${f.k}K"
                    @click="${()=>j(this,this.device,t,{color_temp_kelvin:f.k})}"
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
                  @click="${()=>j(this,this.device,t,{rgb_color:f.rgb})}"
                ></div>
              `)}
            </div>
          </div>
        `:""}
      </div>
    `}};Qt.styles=[B,N`
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
  `];se([P({type:Object})],Qt.prototype,"device",2);Qt=se([z("light-detail-panel")],Qt);let Xt=class extends M{constructor(){super(...arguments),this.device={}}render(){const i=this.device.state,t=V(this.device,"set_mode"),e=(t==null?void 0:t.modes)||[],s={cool:"制冷",heat:"制热",dry:"除湿",fan_only:"送风",auto:"自动",off:"关闭"},n={cool:"ac_unit",heat:"wb_sunny",dry:"water_drop",fan_only:"air",auto:"autorenew",off:"power_settings_new"};return g`
      <div class="container">
        <div class="section">
          <div class="label">运行模式</div>
          <div class="mode-grid">
            ${e.map(r=>g`
              <div class="mode-btn ${i===r?"active":""}" @click="${()=>t&&j(this,this.device,t,{hvac_mode:r})}">
                <span class="icon-main material-symbols-outlined">${n[r]||"tune"}</span>
                <span class="mode-name">${s[r]||r}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `}};Xt.styles=[B,N`
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
  `];se([P({type:Object})],Xt.prototype,"device",2);Xt=se([z("climate-detail-panel")],Xt);const Fi=1024,Li=2048,kt=16e3,Ln=12e3,qn=`
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
`,Un=`
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
`;let Be=null,Fe=null;function ns(i,t){if(t==="pcm"&&Be)return Be;if(t==="vad"&&Fe)return Fe;const e=new Blob([i],{type:"application/javascript"}),s=URL.createObjectURL(e);return t==="pcm"?Be=s:Fe=s,s}class jn{constructor(t={},e={}){this._audioCtx=null,this._mediaStream=null,this._inputNode=null,this._workletNode=null,this._legacyProcessor=null,this._isRunning=!1,this._runId=0,this._audioElem=null,this._audioElemHandlers={},this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._stage="idle",this.VAD_SILENCE_THRESHOLD=.015,this.VAD_SILENCE_FRAMES=35,this._sessionId=null,this._sessionWs=null,this._eventsWs=null,this._closingByClient=!1,this._intentTimeoutTimer=null,this._questionTimer=null,this._announcementPlayed=!1,this._onSessionWsError=()=>{var s,n;this._closingByClient||((n=(s=this._cb).onError)==null||n.call(s,"Gateway 语音通道异常中断"),this._emit("error","Gateway 语音通道异常中断"),this._cleanup())},this._onEventsWsError=()=>{var s,n;this._closingByClient||((n=(s=this._cb).onError)==null||n.call(s,"Gateway 语音事件通道异常中断"),this._emit("error","Gateway 语音事件通道异常中断"),this._cleanup())},this._onGatewaySocketClosed=()=>{var s,n;!this._closingByClient&&this._isRunning&&((n=(s=this._cb).onError)==null||n.call(s,"语音会话已断开"),this._emit("error","语音会话已断开"),this._cleanup())},this._onEventsSocketMessage=s=>{var o,c,a,l,d,h,u,p,m;if(s.data instanceof ArrayBuffer||s.data instanceof Blob)return;let n;try{n=typeof s.data=="string"?JSON.parse(s.data):s.data}catch{return}const r=this._mapIncomingVoiceEvent(n);if(r){if(r.type==="stt_result"){const f=r.text||"";f&&((c=(o=this._cb).onSttResult)==null||c.call(o,f));return}if(r.type==="intent_result"){if(r.owner_question_id){const D=Date.parse(r.owner_question_answer_expires_at||"");this._question=r.owner_question_continue&&!r.owner_question_answered&&D>Date.now()?{id:r.owner_question_id,phase:"answer",expiresAt:Math.min(((a=this._question)==null?void 0:a.expiresAt)??D,D),retryAfterReply:!0}:void 0}r.owner_question_answered&&r.owner_question_id&&((d=(l=this._cb).onOwnerQuestionAnswered)==null||d.call(l,r.owner_question_id));const f=r.reply||"";f&&((u=(h=this._cb).onReply)==null||u.call(h,f)),this._clearIntentTimeout(),this._emit("tts");return}if(r.type==="tts_url"){const f=r.url||"";if(f){const D=this._resolveMediaUrl(f);this._playTts(D)}this._clearIntentTimeout(),this._emit("playing");return}if(r.type==="done"){if(this._clearIntentTimeout(),this._audioElem)return;this._finishReply();return}if(r.type==="error"){const f=r.message||"语音管道错误";(m=(p=this._cb).onError)==null||m.call(p,f),this._emit("error",f),this._cleanup()}}},this._options=t,this._cb=e,this._enableLegacyVoiceEventCompat=t.enableLegacyVoiceEventCompat===!0,this._intentTimeoutMs=t.intentTimeoutMs??Ln}get isRunning(){return this._isRunning}async start(t){var s,n,r,o,c,a;if(this._isRunning||!t&&((s=this._question)==null?void 0:s.phase)==="announce")return;t??(t=this._currentQuestionId()),t&&(((n=this._question)==null?void 0:n.id)!==t&&(this._question={id:t,phase:"answer"}),this._question.phase="answer",this._question.retryAfterReply=!1),this._answerQuestionId=t;const e=++this._runId;this._abort=new AbortController,this._isRunning=!0,this._vadSilenceCount=0,this._hasSpeechStarted=!1,this._closingByClient=!1,this._emit("starting");try{const l=this._resolveGatewayBaseUrl(),d=this._resolveScreenToken();if(!d)throw new Error("未检测到 Gateway 会话令牌，请先登录 Gateway");const h=await this._createVoiceSession(l,d,t?{owner_question_id:t,owner_question_mode:"answer"}:{});if(!this._currentRun(e))return;if(t&&((r=this._question)==null?void 0:r.id)===t){const m=Date.parse(h.answer_expires_at||"");Number.isFinite(m)&&(this._question.expiresAt=Math.min(this._question.expiresAt??m,m))}if(this._sessionId=h.session_id||h.sessionId||null,!this._sessionId&&!h.ws_url&&!h.wsUrl)throw new Error("Gateway 未返回 voice session 标识");if(await this._openGatewaySockets(l,h,e),!this._currentRun(e))return;const u=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:kt,channelCount:1,echoCancellation:!0,noiseSuppression:!0}});if(!this._currentRun(e)){u.getTracks().forEach(m=>m.stop());return}this._mediaStream=u,this._emit("stt"),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:kt}),this._inputNode=this._audioCtx.createMediaStreamSource(this._mediaStream);const p=await this._tryAttachWorklet(this._audioCtx,this._inputNode,e);if(!this._currentRun(e))return;p||this._attachLegacyProcessor(this._audioCtx,this._inputNode),t&&(this._questionTimer=setTimeout(()=>{this._currentRun(e)&&this._stage==="stt"&&(this._question=void 0,this._cleanup(),this._emit("idle"))},Math.min(3e4,Math.max(0,(((o=this._question)==null?void 0:o.expiresAt)??Date.now()+3e4)-Date.now()))))}catch(l){if(!this._currentRun(e))return;[400,401,403,404,409,422].includes(l==null?void 0:l.status)&&(this._question=void 0);const d=this._normalizeError(l);(a=(c=this._cb).onError)==null||a.call(c,d),this._emit("error",d),this._cleanup()}}async announce(t,e=!1){var r,o,c,a;if(this._isRunning)return{played:!1,sessionId:""};this._question={id:t,phase:"announce"};const s=++this._runId;this._abort=new AbortController,this._isRunning=!0,this._closingByClient=!1,this._announcementPlayed=!1;const n=new Promise(l=>{this._announcementDone=l});this._emit("starting"),this._questionTimer=setTimeout(()=>{var l,d;this._currentRun(s)&&((d=(l=this._cb).onError)==null||d.call(l,"问题播放超时，请点击播放问题重试。"),this._emit("error"),this._cleanup())},6e4);try{const l=this._resolveGatewayBaseUrl(),d=await this._createVoiceSession(l,this._resolveScreenToken(),{owner_question_id:t,owner_question_mode:"announce",repeat:e});if(!this._currentRun(s))return n;this._sessionId=d.session_id||d.sessionId||null,(o=(r=this._cb).onReply)==null||o.call(r,d.prompt||"正在播放问题…"),await this._openGatewaySockets(l,d,s)}catch(l){if(!this._currentRun(s))return n;const d=this._normalizeError(l);(a=(c=this._cb).onError)==null||a.call(c,d),this._emit("error",d),this._cleanup()}return n}async askOwnerQuestion(t,e,s){if(this._isRunning)return!1;const n=this.announce(t,e),r=this._question,o=await n;if(!r||this._question!==r)return o.sessionId&&s(o).catch(()=>{console.warn("[Voice] Stopped question delivery receipt unavailable")}),!0;const c=++this._runId;this._abort=new AbortController,this._isRunning=!0,this._emit("starting","正在准备回答…");try{if(o.sessionId&&await s(o,this._abort.signal),!this._currentRun(c)||this._question!==r)return!0;if(!o.played)throw new Error("问题未播放完成，请点击播放问题重试，或使用按钮回答。");return r.phase="answer",this._cleanup(),this.start(),!0}catch(a){if(!this._currentRun(c))return!0;throw this._question=void 0,this._cleanup(),this._emit("error",this._normalizeError(a)),a}}stop(){if(this._question=void 0,!!this._isRunning){if(this._stage!=="stt"){this._emit("idle"),this._cleanup();return}this._stopRecording()}}retainOwnerQuestions(t){this._question&&!t.includes(this._question.id)&&(this._question=void 0,this._cleanup(),this._emit("idle"))}_currentQuestionId(){var t,e;return((t=this._question)==null?void 0:t.expiresAt)!==void 0&&this._question.expiresAt<=Date.now()&&(this._question=void 0),((e=this._question)==null?void 0:e.phase)==="answer"?this._question.id:void 0}_currentRun(t){return this._isRunning&&this._runId===t}async _tryAttachWorklet(t,e,s=this._runId){if(!t.audioWorklet)return!1;try{const n=ns(qn,"pcm");if(await t.audioWorklet.addModule(n),!this._currentRun(s))return!1;const r=new AudioWorkletNode(t,"pcm-capture-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:Fi,waveBins:20}});return r.port.onmessage=o=>{this._currentRun(s)&&this._onAudioFrame(o.data)},e.connect(r),this._workletNode=r,!0}catch(n){return console.warn("[VoicePipeline] AudioWorklet 不可用，回退 ScriptProcessor:",n),!1}}_attachLegacyProcessor(t,e){const s=this._runId,n=t.createScriptProcessor(Fi,1,1);n.onaudioprocess=r=>{if(!this._currentRun(s))return;const o=r.inputBuffer.getChannelData(0);let c=0;for(let u=0;u<o.length;u++)c+=o[u]*o[u];const a=Math.sqrt(c/o.length),l=[],d=Math.floor(o.length/20)||1;for(let u=0;u<20;u++)l.push(Math.abs(o[u*d]||0));const h=new Int16Array(o.length);for(let u=0;u<o.length;u++){const p=Math.max(-1,Math.min(1,o[u]));h[u]=p<0?p*32768:p*32767}this._onAudioFrame({type:"frame",rms:a,wave:l,pcm16:h.buffer})},e.connect(n),n.connect(t.destination),this._legacyProcessor=n}_onAudioFrame(t){var e;if(this._isRunning&&(t==null?void 0:t.type)==="frame"){if(this._cb.onWaveData&&Array.isArray(t.wave)&&this._cb.onWaveData(t.wave),t.rms>=this.VAD_SILENCE_THRESHOLD)this._hasSpeechStarted=!0,this._vadSilenceCount=0;else if(this._hasSpeechStarted){if(this._vadSilenceCount++,this._vadSilenceCount>this.VAD_SILENCE_FRAMES){this._stopRecording();return}}else return;if(((e=this._sessionWs)==null?void 0:e.readyState)===WebSocket.OPEN&&t.pcm16)try{this._sessionWs.send(t.pcm16)}catch{}}}_stopRecording(){var t;if(this._isRunning){if(this._teardownAudioGraph(),((t=this._sessionWs)==null?void 0:t.readyState)===WebSocket.OPEN){try{this._sessionWs.send(JSON.stringify({type:"input_audio_buffer.commit"}))}catch{}try{this._sessionWs.send(new ArrayBuffer(0))}catch{}}this._emit("intent"),this._armIntentTimeout()}}_armIntentTimeout(){this._clearIntentTimeout(),this._intentTimeoutMs>0&&(this._intentTimeoutTimer=setTimeout(()=>{var e,s;if(!this._isRunning)return;const t=this._answerQuestionId?"语音等待超时，请查看这条建议的处理结果。":"AI 响应超时";(s=(e=this._cb).onError)==null||s.call(e,t),this._emit("error",t),this._cleanup()},this._intentTimeoutMs))}_clearIntentTimeout(){this._intentTimeoutTimer!==null&&(clearTimeout(this._intentTimeoutTimer),this._intentTimeoutTimer=null)}_teardownAudioGraph(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._inputNode){try{this._inputNode.disconnect()}catch{}this._inputNode=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._mediaStream&&(this._mediaStream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._mediaStream=null)}_resolveGatewayBaseUrl(){var e;const t=(e=this._options.gatewayBaseUrl)==null?void 0:e.trim();return t?t.replace(/\/$/,""):window.location.origin}_resolveScreenToken(){var t;return((t=this._options.screenToken)==null?void 0:t.trim())||localStorage.getItem("screen_token")||""}_buildAuthHeaders(t){return{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}async _createVoiceSession(t,e,s={}){var o;const n=await fetch(`${t}/api/v1/voice/session`,{method:"POST",headers:this._buildAuthHeaders(e),body:JSON.stringify({sample_rate:kt,audio_format:"pcm16",...s}),signal:(o=this._abort)==null?void 0:o.signal});let r={};try{r=await n.json()}catch{}if(!n.ok){const c=(r==null?void 0:r.error)||n.statusText;throw Object.assign(new Error(`Gateway 语音会话创建失败 (${n.status}): ${c||"unknown error"}`),{status:n.status})}return r}async _openGatewaySockets(t,e,s=this._runId){var m,f;const n=this._toWsBase(t),r=e.ws_url||e.wsUrl||`${n}/api/v1/voice/session?session_id=${encodeURIComponent(this._sessionId||"")}`,o=e.events_ws_url||e.eventsWsUrl||`${n}/api/v1/events?topic=voice&session_id=${encodeURIComponent(this._sessionId||"")}`,c=this._sessionWs=new WebSocket(r),a=this._eventsWs=new WebSocket(o);c.binaryType="arraybuffer";const l=D=>b=>{this._currentRun(s)&&D(b)},d=l(this._onGatewaySocketClosed),h=l(this._onSessionWsError),u=l(this._onEventsWsError),p=l(this._onEventsSocketMessage);c.addEventListener("close",d),c.addEventListener("error",h),a.addEventListener("message",p),a.addEventListener("close",d),a.addEventListener("error",u),this._socketCleanup=()=>{c.removeEventListener("close",d),c.removeEventListener("error",h),a.removeEventListener("message",p),a.removeEventListener("close",d),a.removeEventListener("error",u)},await Promise.all([this._waitSocketOpen(c,"voice session",(m=this._abort)==null?void 0:m.signal),this._waitSocketOpen(a,"voice events",(f=this._abort)==null?void 0:f.signal)])}_mapIncomingVoiceEvent(t){var s,n,r,o,c,a,l,d,h,u,p,m;const e=String((t==null?void 0:t.type)||(t==null?void 0:t.event)||(t==null?void 0:t.name)||"").trim();return e==="stt_result"?{type:"stt_result",text:(t==null?void 0:t.text)||((s=t==null?void 0:t.result)==null?void 0:s.text)||((r=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||""}:e==="intent_result"?{type:"intent_result",owner_question_id:t==null?void 0:t.owner_question_id,owner_question_answered:(t==null?void 0:t.owner_question_answered)===!0,owner_question_continue:(t==null?void 0:t.owner_question_continue)===!0,owner_question_answer_expires_at:t==null?void 0:t.owner_question_answer_expires_at,reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((c=t==null?void 0:t.result)==null?void 0:c.reply)||((u=(h=(d=(l=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:l.response)==null?void 0:d.speech)==null?void 0:h.plain)==null?void 0:u.speech)||""}:e==="tts_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((m=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:m.url)||""}:e==="done"?{type:"done"}:e==="error"?{type:"error",message:(t==null?void 0:t.message)||(t==null?void 0:t.error)||"语音管道错误"}:this._mapLegacyVoiceEvent(t,e)}_mapLegacyVoiceEvent(t,e){var s,n,r,o,c,a,l,d,h,u,p,m;return this._enableLegacyVoiceEventCompat?e==="stt-end"||e==="transcript_final"?{type:"stt_result",text:(t==null?void 0:t.text)||((s=t==null?void 0:t.result)==null?void 0:s.text)||((r=(n=t==null?void 0:t.data)==null?void 0:n.stt_output)==null?void 0:r.text)||((o=t==null?void 0:t.data)==null?void 0:o.text)||"",legacy_type:e}:e==="intent-end"||e==="reply"?{type:"intent_result",reply:(t==null?void 0:t.reply)||(t==null?void 0:t.text)||((c=t==null?void 0:t.result)==null?void 0:c.reply)||((u=(h=(d=(l=(a=t==null?void 0:t.data)==null?void 0:a.intent_output)==null?void 0:l.response)==null?void 0:d.speech)==null?void 0:h.plain)==null?void 0:u.speech)||"",legacy_type:e}:e==="tts-end"||e==="audio_url"?{type:"tts_url",url:(t==null?void 0:t.url)||(t==null?void 0:t.audio_url)||((m=(p=t==null?void 0:t.data)==null?void 0:p.tts_output)==null?void 0:m.url)||"",legacy_type:e}:e==="pipeline_end"||e==="session_end"?{type:"done",legacy_type:e}:null:null}_resolveMediaUrl(t){if(/^https?:\/\//i.test(t))return t;const e=this._resolveGatewayBaseUrl();return t.startsWith("/")?`${e}${t}`:`${e}/${t}`}_playTts(t){this._releaseAudioElem();const e=new Audio(t),s=this._runId,n=()=>{!this._currentRun(s)||this._audioElem!==e||(this._announcementPlayed=!0,this._finishReply())},r=()=>{var o,c;!this._currentRun(s)||this._audioElem!==e||(this._announcementDone?((c=(o=this._cb).onError)==null||c.call(o,"问题未播放成功，请点击播放问题重试，或使用按钮回答。"),this._emit("error")):this._emit("idle"),this._cleanup())};e.addEventListener("ended",n),e.addEventListener("error",r),this._audioElem=e,this._audioElemHandlers={ended:n,error:r},e.play().catch(r)}_finishReply(){var e;const t=((e=this._question)==null?void 0:e.retryAfterReply)&&this._currentQuestionId();this._cleanup(),t?this.start():this._emit("idle")}_releaseAudioElem(){const t=this._audioElem;if(t){try{t.pause()}catch{}this._audioElemHandlers.ended&&t.removeEventListener("ended",this._audioElemHandlers.ended),this._audioElemHandlers.error&&t.removeEventListener("error",this._audioElemHandlers.error);try{t.src="",t.load()}catch{}this._audioElem=null,this._audioElemHandlers={}}}_emit(t,e){var s,n;this._stage=t,(n=(s=this._cb).onStageChange)==null||n.call(s,t,e)}_cleanup(){var t,e,s;if(this._runId++,(t=this._abort)==null||t.abort(),this._abort=void 0,(e=this._announcementDone)==null||e.call(this,{played:this._announcementPlayed,sessionId:this._sessionId||""}),this._announcementDone=void 0,this._questionTimer!==null&&clearTimeout(this._questionTimer),this._questionTimer=null,this._isRunning=!1,this._closingByClient=!0,this._stage="idle",this._hasSpeechStarted=!1,this._clearIntentTimeout(),(s=this._socketCleanup)==null||s.call(this),this._socketCleanup=void 0,this._sessionWs&&this._sessionWs.readyState<2)try{this._sessionWs.close(1e3,"client_cleanup")}catch{}if(this._eventsWs&&this._eventsWs.readyState<2)try{this._eventsWs.close(1e3,"client_cleanup")}catch{}this._sessionWs=null,this._eventsWs=null,this._sessionId=null,this._answerQuestionId=void 0,this._teardownAudioGraph(),this._releaseAudioElem()}_toWsBase(t){return t.startsWith("https://")?`wss://${t.slice(8)}`:t.startsWith("http://")?`ws://${t.slice(7)}`:t}_waitSocketOpen(t,e,s){return new Promise((n,r)=>{if(t.readyState===WebSocket.OPEN){n();return}if(s!=null&&s.aborted||t.readyState>=2){r(new Error(`${e} 已关闭`));return}const o=()=>{l(),n()},c=()=>{l(),r(new Error(`${e} 连接失败`))},a=()=>{l(),r(new Error(`${e} 已关闭`))},l=()=>{t.removeEventListener("open",o),t.removeEventListener("error",c),t.removeEventListener("close",a),s==null||s.removeEventListener("abort",a)};t.addEventListener("open",o),t.addEventListener("error",c),t.addEventListener("close",a),s==null||s.addEventListener("abort",a,{once:!0})})}_normalizeError(t){const e=(t==null?void 0:t.name)||"",s=(t==null?void 0:t.message)||String(t||"未知错误");return e==="NotAllowedError"||/permission/i.test(s)?"请允许浏览器使用麦克风":e==="NotFoundError"?"未检测到可用麦克风设备":e==="NotReadableError"?"麦克风被其他应用占用":`语音链路错误: ${s}`}}class Hn{constructor(t){this._state="stopped",this._audioCtx=null,this._stream=null,this._source=null,this._workletNode=null,this._legacyProcessor=null,this._activationFrames=0,this.ACTIVATION_THRESHOLD=7,this.ENERGY_THRESHOLD=.02,this._cooldownTimer=null,this.COOLDOWN_MS=8e3,this._onActivated=t}get isListening(){return this._state==="listening"}async start(){if(this._state!=="stopped")return this._state==="listening";try{return this._stream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:kt,channelCount:1,echoCancellation:!0,noiseSuppression:!0}}),this._audioCtx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:kt}),this._source=this._audioCtx.createMediaStreamSource(this._stream),await this._tryAttachWorklet(this._audioCtx,this._source)||this._attachLegacyProcessor(this._audioCtx,this._source),this._state="listening",!0}catch(t){return console.warn("[AlwaysOnVAD] 麦克风访问失败，免唤醒模式不可用:",(t==null?void 0:t.message)||t),this._teardown(),this._state="stopped",!1}}pause(){this._state==="listening"&&(this._state="paused")}resume(){this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._state==="paused"&&(this._cooldownTimer=setTimeout(()=>{if(this._cooldownTimer=null,this._state==="paused"){if(!this._stream){this._state="stopped",this.start();return}this._state="listening",this._activationFrames=0}},this.COOLDOWN_MS))}stop(){this._state="stopped",this._cooldownTimer!==null&&(clearTimeout(this._cooldownTimer),this._cooldownTimer=null),this._teardown()}async _tryAttachWorklet(t,e){if(!t.audioWorklet)return!1;try{const s=ns(Un,"vad");await t.audioWorklet.addModule(s);const n=new AudioWorkletNode(t,"vad-energy-processor",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{chunkSize:Li}});return n.port.onmessage=r=>{const o=r.data;!o||o.type!=="energy"||this._handleEnergy(o.rms||0)},e.connect(n),this._workletNode=n,!0}catch(s){return console.warn("[AlwaysOnVAD] AudioWorklet 不可用，回退 ScriptProcessor:",s),!1}}_attachLegacyProcessor(t,e){const s=t.createScriptProcessor(Li,1,1);s.onaudioprocess=n=>{if(this._state!=="listening")return;const r=n.inputBuffer.getChannelData(0);let o=0;for(let a=0;a<r.length;a++)o+=r[a]*r[a];const c=Math.sqrt(o/r.length);this._handleEnergy(c)},e.connect(s),s.connect(t.destination),this._legacyProcessor=s}_handleEnergy(t){this._state==="listening"&&(t>this.ENERGY_THRESHOLD?(this._activationFrames++,this._activationFrames>=this.ACTIVATION_THRESHOLD&&(this._activationFrames=0,this._state="paused",this._teardown(),this._onActivated())):this._activationFrames=0)}_teardown(){if(this._workletNode){try{this._workletNode.port.onmessage=null,this._workletNode.disconnect()}catch{}this._workletNode=null}if(this._legacyProcessor){try{this._legacyProcessor.disconnect(),this._legacyProcessor.onaudioprocess=null}catch{}this._legacyProcessor=null}if(this._source){try{this._source.disconnect()}catch{}this._source=null}if(this._audioCtx){const t=this._audioCtx;this._audioCtx=null,t.close().catch(()=>{})}this._stream&&(this._stream.getTracks().forEach(t=>{try{t.stop()}catch{}}),this._stream=null)}}const Vn="smartagent.user_explicit_control_confirmation.v0.1",Wn="0.1",qe=/^uecc_[0-9a-f]{32}$/,Gn=/^[0-9a-f]{64}$/;function ht(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:null}function Jn(i){if(!i)return!1;const t=Date.parse(i);return Number.isFinite(t)}function Kn(i){return`/api/v1/devices/control-confirmations/${encodeURIComponent(i)}/confirm`}function Yn(i,t){const e=Kn(t);return i===e}function qi(...i){for(const t of i){const e=String(t||"").trim();if(e)return e}return""}function At(i){const t=String(i||"").trim().toLowerCase();return Gn.test(t)?t:null}function Qn(i){return`/api/v1/devices/${encodeURIComponent(i)}/control`}function Xn(i,t){const e=ht(i.data)??{},s={};for(const[n,r]of Object.entries(e))n!=="entity_id"&&(s[n]=r);return{request_id:t,service:String(i.service||"").trim(),params:s}}function Ui(i){const t=ht(i);if(!t||t.error!=="confirmation_required")return null;const e=ht(t.confirmation);if(!e)return null;const s=String(e.confirm_path||"").trim(),n=String(e.claim_id||"").trim();if(!s||!n||!qe.test(n)||!Yn(s,n))return null;const r=String(e.schema_version||"").trim();if(r!==Vn||e.required!==!0)return null;const c=At(e.binding_digest);if(!c)return null;const a=String(e.expires_at||"").trim();if(!Jn(a))return null;const l=String(e.risk_level||"").trim().toLowerCase();return l?{schemaVersion:r,claimId:n,bindingDigest:c,confirmPath:s,expiresAt:a,riskLevel:l,required:!0}:null}function Zn(i,t,e,s){const n=ht(i),r=ht(n==null?void 0:n.manual_control_receipt),o=String((r==null?void 0:r.request_id)||"").trim();if(!n||!r||!t||o!==t||String(r.receipt_version||"").trim()!==Wn||r.retry_allowed!==!1||r.execution_class!=="user_explicit_control"||r.active_ai_governed!==!1)return null;const c=String(r.transaction_id||"").trim(),a=String(r.claim_id||"").trim();if(!qe.test(c)||a!==c)return null;const l=At(r.binding_digest),d=At(r.execution_pair_digest),h=At(r.receipt_digest);if(!l||!d||!h||d!==h)return null;const u=String(n.transaction_id||"").trim();if(u&&u!==c)return null;if(e!==void 0){const b=At(e);if(!b||b!==l)return null}if(s!==void 0){const b=String(s||"").trim();if(!qe.test(b)||b!==u||b!==c||b!==a)return null}const p=String(r.effect_status||"").trim().toLowerCase(),m=String(r.workflow_status||"").trim().toLowerCase();let f="";if(p==="verified_success"&&m==="completed"?f="verified_success":(p==="effect_unknown"&&m==="reconciliation_required"||p==="pending"&&n.effect_status==="effect_unknown"&&n.workflow_status==="reconciliation_required"&&n.retryable===!1)&&(f="effect_unknown"),!f||f==="verified_success"&&u!==c)return null;const D=ht(n.state_confirmation);return{transactionId:c,claimId:a,bindingDigest:l,executionPairDigest:d,receiptDigest:h,requestId:o,effectStatus:f,reason:qi(r.reason,r.reason_code,n.reason,n.error,n.error_type,D==null?void 0:D.reason),stage:qi(r.stage,n.stage,m,n.workflow_status)}}function tr(i){return i?g`
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
  `:""}function er(i){return i?g`
    <div style="position:absolute; bottom:130px; left:50%; transform:translateX(-50%); width:90%; background:linear-gradient(90deg, var(--ai-purple), var(--ai-cyan)); padding:20px 40px; border-radius:32px; box-shadow:0 15px 50px rgba(0,229,255,0.3); animation:slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display:flex; align-items:center; gap:20px;">
      <span class="icon-main" style="color:white; font-size:32px;">auto_awesome</span>
      <span style="font-size:18px; font-weight:800; color:white;">${i}</span>
    </div>
  `:""}function ir(i,t,e){return i?g`
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
  `:""}function sr(i,t,e,s,n,r,o){return i?g`
    <div class="critical-overlay" role="dialog" aria-modal="true" aria-label="设备控制确认" @click="${r}">
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
                ${s(i.entityId)}
                将执行“${n(i.detail)}”。
                中控屏不会重发命令，确认后只向网关提交一次确认请求。
              </div>
            </div>
          </div>
          <button
            style="width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.05); color:white; cursor:pointer;"
            ?disabled="${t}"
            @click="${r}"
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
          <button class="confirmation-btn" ?disabled="${t}" @click="${r}">取消</button>
          <button class="confirmation-btn primary" ?disabled="${t}" @click="${o}">
            ${t?"确认中...":"确认执行"}
          </button>
        </div>
      </div>
    </div>
  `:""}function nr(i,t){return i?g`
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
  `:""}var rr=Object.defineProperty,or=Object.getOwnPropertyDescriptor,O=(i,t,e,s)=>{for(var n=s>1?void 0:s?or(t,e):t,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=(s?o(t,e,n):o(n))||n);return s&&n&&rr(t,e,n),n};let I=class extends M{constructor(){super(...arguments),this.activeRoomId="all",this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],voiceStatus:"idle",voiceReply:"",lastStt:""},this.devices=[],this.feedState={ai:"loading",energy:"loading",frigate:"loading",observedAt:""},this.energyStats=[],this.frigateEvents=[],this.criticalEvent=null,this.activeDetailEntity=null,this.isRecording=!1,this.isConnected=!1,this.isConfiguring=!1,this.connectionError="",this.isPairingStep=!1,this.gatewayBase="",this.screenToken="",this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.isPairing=!1,this.voiceText="点击开始语音指令",this.voiceReply="",this.waveData=new Array(20).fill(0),this.pipelineStage="idle",this.theme="dark",this.actionNotice=null,this.pendingDeviceControlConfirmation=null,this.isConfirmingDeviceControl=!1,this._voicePipeline=null,this._questionAnnouncement=!1,this._alwaysOnVad=null,this._lastStt="",this._actionNoticeTimer=null,this.alwaysOnEnabled=!1,this._expressWatchTimer=null,this._sceneRefreshTimer=null,this._removeStateListener=null,this._removeAuthorizationFailureListener=null,this.rooms=[{id:"all",name:"全部"}],this.scenes=[],this.probeStatus=""}firstUpdated(){const i=localStorage.getItem("sa-theme");i&&(this.theme=i,i==="light"&&this.classList.add("theme-light")),Promise.resolve().then(()=>this._initConnection())}_toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",this.theme==="light"?this.classList.add("theme-light"):this.classList.remove("theme-light"),localStorage.setItem("sa-theme",this.theme)}async _initConnection(){const i=new URLSearchParams(window.location.search),t=i.get("screen_token");if(t){this.screenToken=t,localStorage.setItem("screen_token",t);try{i.delete("screen_token");const e=i.toString(),s=window.location.pathname+(e?`?${e}`:"")+window.location.hash;window.history.replaceState({},"",s)}catch{}}else this.screenToken=localStorage.getItem("screen_token")||"";this.gatewayBase=window.location.origin,this.screenToken?this._tryConnect():(this.isConfiguring=!0,this.isPairingStep=!1,this._startExpressWatch())}_startExpressWatch(){this._stopExpressWatch();let i=0;const t=async()=>{if(!(this.isConnected||!this.isConfiguring||this.isPairing)){i++;try{const e=this.gatewayBase.trim(),s=`${e}/api/v1/device/pair/start`;this.probeStatus=`探测中 #${i}...`;const n=await fetch(s,{method:"POST",signal:AbortSignal.timeout(3e3)}),r=n.headers.get("content-type")||"";if(!n.ok||!r.includes("application/json"))throw await n.text().catch(()=>""),new Error("gateway_probe_unavailable");const o=await n.json();if(o.token){this.probeStatus="收到授权，正在连接...",this._stopExpressWatch();const c=o.screen_token||"";c&&(this.screenToken=c,localStorage.setItem("screen_token",c));const a=window.location.origin.includes(":5173");this.gatewayBase=a?"":o.url||e,this._tryConnect();return}this.probeStatus=`等待极速配对... (#${i})`}catch(e){console.warn(`[probe #${i}] 失败:`,e.message),this.probeStatus=`等待网关配对服务... (#${i})`}this.isConfiguring&&!this.isConnected&&!this.isPairing&&(this._expressWatchTimer=setTimeout(t,2e3))}};this._expressWatchTimer=setTimeout(t,1500)}_stopExpressWatch(){this._expressWatchTimer!==null&&(clearTimeout(this._expressWatchTimer),this._expressWatchTimer=null)}_handleScreenAuthorizationRequired(){var i,t;this._stopExpressWatch(),(i=this._voicePipeline)==null||i.stop(),this._voicePipeline=null,(t=this._alwaysOnVad)==null||t.stop(),this._alwaysOnVad=null,this.alwaysOnEnabled=!1,this.isRecording=!1,this._sceneRefreshTimer&&(clearInterval(this._sceneRefreshTimer),this._sceneRefreshTimer=null),localStorage.removeItem("screen_token"),this.screenToken="",this.isConnected=!1,this.isConfiguring=!0,this.isPairing=!1,this.isPairingStep=!1,this.connectionError="访问令牌无效或已过期，请重新配对。",this._startExpressWatch()}_subscribeToScreenState(){var i;(i=this._removeStateListener)==null||i.call(this),this._removeStateListener=wt.subscribe((t,e,s,n,r,o,c)=>{c&&(this.feedState={...c}),this.devices=[...t],this.aiState={...e},this.energyStats=[...s],this.frigateEvents=[...n],this.rooms=[...r],this.criticalEvent=o})}disconnectedCallback(){var i,t,e,s;super.disconnectedCallback(),(i=this._removeStateListener)==null||i.call(this),(t=this._removeAuthorizationFailureListener)==null||t.call(this),this._sceneRefreshTimer&&clearInterval(this._sceneRefreshTimer),this._stopExpressWatch(),(e=this._voicePipeline)==null||e.stop(),(s=this._alwaysOnVad)==null||s.stop()}_renderAiStatus(){return g`<div role="status">${le(this.feedState.ai)}</div>
      <ai-status-panel .aiState="${this.aiState}"></ai-status-panel>`}async _tryConnect(){var i;this._stopExpressWatch();try{if(this.connectionError="",!this.screenToken)throw new Error("SCREEN_TOKEN_REQUIRED");if((i=this._removeAuthorizationFailureListener)==null||i.call(this),this._removeAuthorizationFailureListener=wt.subscribeAuthorizationRequired(()=>{this._handleScreenAuthorizationRequired()}),!await wt.refreshManagedDevices())throw new Error("SCREEN_READ_MODEL_UNAVAILABLE");this.isConnected=!0,this.isConfiguring=!1;const s=localStorage.getItem("sa_voice_legacy_event_compat")==="1";this._voicePipeline=new jn({gatewayBaseUrl:this.gatewayBase||window.location.origin,screenToken:this.screenToken,enableLegacyVoiceEventCompat:s},{onStageChange:(n,r)=>{var o,c,a;this.pipelineStage=n,n==="starting"&&((o=this._alwaysOnVad)==null||o.pause(),this.voiceText=r||"正在连接语音…"),n==="stt"?(this.isRecording=!0,this.voiceText="正在聆听中..."):n==="intent"?(this.isRecording=!1,this._lastStt||(this.voiceText="AI 理解中...")):n==="tts"||n==="playing"?this.voiceText=this.voiceReply||"正在生成回复...":n==="idle"?(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"随时说话...":"点击开始语音指令",this.waveData=new Array(20).fill(0),this._lastStt="",setTimeout(()=>{this.voiceReply=""},8e3),this.alwaysOnEnabled&&!this._questionAnnouncement&&((c=this._alwaysOnVad)==null||c.resume())):n==="error"&&(this.isRecording=!1,this.voiceText=this.alwaysOnEnabled?"出错了，继续监听中...":r||"出现错误，请重试",this.waveData=new Array(20).fill(0),this._lastStt="",this.alwaysOnEnabled&&!this._questionAnnouncement&&((a=this._alwaysOnVad)==null||a.resume()))},onSttResult:n=>{this._lastStt=n,this.voiceText=`"${n}"`},onReply:n=>{this.voiceReply=n},onOwnerQuestionAnswered:()=>{window.dispatchEvent(new Event("owner-questions-changed"))},onError:n=>{var r;console.error("[VoicePipeline]",n),this.voiceText=n,this.isRecording=!1,this.alwaysOnEnabled&&!this._questionAnnouncement&&((r=this._alwaysOnVad)==null||r.resume())},onWaveData:n=>{this.waveData=[...n]}}),this._alwaysOnVad=new Hn(async()=>{!this._voicePipeline||this._voicePipeline.isRunning||this._questionAnnouncement||(this.voiceText="检测到语音，正在识别...",await this._voicePipeline.start())}),this._subscribeToScreenState(),await this._refreshAiScenes(),this._sceneRefreshTimer&&clearInterval(this._sceneRefreshTimer),this._sceneRefreshTimer=setInterval(()=>this._refreshAiScenes(),3e4)}catch(t){if(console.error("Connection failed",t),t.message==="AUTH_REQUIRED"){this._handleScreenAuthorizationRequired();return}this.isConnected=!1,this.isConfiguring=!0,t.message==="SCREEN_TOKEN_REQUIRED"?this.connectionError="缺少访问令牌：请通过一键配对获取授权，或重新打开配对入口。":t.message==="SCREEN_SCOPE_FORBIDDEN"?this.connectionError="当前屏幕会话缺少读取权限，配对状态已保留。":this.connectionError=t.message==="AUTH_REQUIRED"?"访问令牌无效或已过期，请重新配对。":"无法连接到 SmartAgent 网关，请确认 add-on 正在运行后重试。"}}async _toggleVoice(){if(!this._voicePipeline){this.voiceText="语音功能初始化中...";return}this._voicePipeline.isRunning?this._voicePipeline.stop():await this._voicePipeline.start()}async _announceOwnerQuestion(i,t=!1){var s,n;const e=this._voicePipeline;if(!e||e.isRunning||this._questionAnnouncement||document.visibilityState==="hidden")return!1;this._questionAnnouncement=!0,(s=this._alwaysOnVad)==null||s.pause();try{return await e.askOwnerQuestion(i,t,(r,o)=>this._postGatewayJson(`/owner-questions/${encodeURIComponent(i)}/voice-delivery`,{session_id:r.sessionId,played:r.played},o))}finally{this._questionAnnouncement=!1,this.alwaysOnEnabled&&!e.isRunning&&((n=this._alwaysOnVad)==null||n.resume())}}async _startRecording(){await this._toggleVoice()}async _stopRecording(){var i;(i=this._voicePipeline)==null||i.stop()}async _toggleAlwaysOn(){if(this._alwaysOnVad)if(this.alwaysOnEnabled)this._alwaysOnVad.stop(),this.alwaysOnEnabled=!1,this.voiceText="点击开始语音指令";else{const i=await this._alwaysOnVad.start();this.alwaysOnEnabled=i,this.voiceText=i?"随时说话...":"无法访问麦克风，免唤醒未开启"}}_renderActiveRoomView(){const i=this.activeRoomId,t=i==="all"?this.devices:this.devices.filter(r=>r.roomId===i);if(t.length===0&&i!=="all")return g`
        <div style="text-align: center; padding: 100px 20px; color: rgba(255,255,255,0.15);">
          <span class="icon-main" style="font-size: 64px; margin-bottom: 24px; display: block; opacity: 0.1;">devices_other</span>
          <div style="font-size: 16px; font-weight: 700;">该区域暂无托管设备</div>
        </div>
      `;const e=this.scenes.filter(r=>i==="all"?r.roomId==="all":r.roomId===i),s=this.devices.filter(r=>r.type==="scene"&&(i==="all"||r.roomId===i)),n=[{id:"light",name:"照明",icon:"lightbulb"},{id:"climate",name:"环境",icon:"thermostat"},{id:"cover",name:"遮蔽",icon:"curtains"},{id:"sensor",name:"感应",icon:"sensors"},{id:"other",name:"其他",icon:"more_horiz"}];return g`
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
        ${n.map(r=>{const o=t.filter(a=>r.id==="other"?!["light","climate","cover","sensor","scene"].includes(a.type):a.type===r.id);if(o.length===0)return"";let c=`${o.length} 个设备`;if(r.id==="light"){const a=o.filter(l=>l.state==="on").length;c=a===0?"灯全部关了":`${a} 盏灯开启中`}return g`
            <div class="category-group">
              <div class="section-label">
                <span class="icon-main">${r.icon}</span> ${r.name} <span style="opacity:0.4; font-size:13px; font-weight:600; margin-left:8px;">| ${c}</span>
              </div>
              <div class="device-grid-orb">
                ${o.map(a=>{const l=this.aiState.recentAiActions.includes(a.id);return a.type==="light"?g`<light-card .device="${a}" .isAiControlled="${l}"></light-card>`:a.type==="climate"?g`<climate-card .device="${a}" .isAiControlled="${l}"></climate-card>`:a.type==="cover"?g`<cover-card .device="${a}" .isAiControlled="${l}"></cover-card>`:a.type==="sensor"?g`<sensor-card .device="${a}"></sensor-card>`:g`<generic-device-card .device="${a}" .isAiControlled="${l}"></generic-device-card>`})}
              </div>
            </div>
          `})}
      </div>
    `}_energyKwhValue(i){for(const t of["today_kwh"]){const e=i==null?void 0:i[t];if(e==null||e==="")continue;const s=Number(e);if(Number.isFinite(s))return s}return null}_formatTodayEnergyKwh(i){let t=!1;const e=(i||[]).reduce((s,n)=>{const r=this._energyKwhValue(n);return r===null?s:(t=!0,s+r)},0);return t?e>=100?`${Math.round(e)}kWh`:`${e.toFixed(1)}kWh`:"暂无日统计"}_renderEnvironmentInsights(){const i=this.rooms.filter(r=>r.id!=="all").length,t=this.energyStats||[],e=this.frigateEvents||[],s=this.screenToken?"已授权":"等待授权",n=this.alwaysOnEnabled?"免唤醒监听":"点击唤醒";return g`
      <div class="room-content insights-strip" aria-label="环境洞察、能耗与诊断">
        <div class="insights-grid">
          <section class="insight-card">
            <div class="insight-heading">
              <div class="insight-title">
                <span class="icon-main">energy_savings_leaf</span>
                <span>能耗面板</span>
              </div>
              <span class="insight-subtitle">${le(this.feedState.energy)} · 表计当前读数</span>
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
              <span class="insight-subtitle">${le(this.feedState.frigate)} · ${e.length} 条近期事件</span>
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
                <span class="diagnostic-value">${s}</span>
              </div>
              <div class="diagnostic-row">
                <span class="diagnostic-label">语音模式</span>
                <span class="diagnostic-value">${n}</span>
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
    `}_gatewayApiBase(){let i=(this.gatewayBase||"").trim();return!i||window.location.origin.includes(":5173")?"":(i.startsWith("http")||(i="http://"+i),i.endsWith("/")?i.slice(0,-1):i)}_gatewayJsonHeaders(){const i={"Content-Type":"application/json"};return this.screenToken&&(i.Authorization=`Bearer ${this.screenToken}`),i}async _fetchGatewayJson(i){const t=await fetch(`${this._gatewayApiBase()}${i}`,{headers:this._gatewayJsonHeaders(),signal:AbortSignal.timeout(15e3)});return this._readGatewayJsonResponse(t)}async _postGatewayJson(i,t,e){const s=await fetch(`${this._gatewayApiBase()}${i}`,{method:"POST",headers:this._gatewayJsonHeaders(),body:JSON.stringify(t),signal:e?AbortSignal.any([e,AbortSignal.timeout(15e3)]):AbortSignal.timeout(15e3)});return this._readGatewayJsonResponse(s)}async _readGatewayJsonResponse(i){const t=await i.text();let e={},s=!t&&i.status!==204;if(t)try{e=JSON.parse(t)}catch{s=!0}if(!i.ok)throw i.status===401?(this._handleScreenAuthorizationRequired(),new Error("AUTH_REQUIRED")):new xt(i.status,e);if(s||e===null||typeof e!="object")throw new Error("gateway_json_response_invalid");return e}_extractRows(i,t){return bs(i,t)}async _refreshAiScenes(){try{const i=await this._fetchGatewayJson("/api/v1/ai-scenes"),e=this._extractRows(i,"scenes").map(s=>this._normalizeAiScene(s)).filter(s=>!!s);this.scenes=_s(e,cs(this.rooms))}catch(i){console.warn("[Scenes] 刷新 AI 场景失败:",i)}}_normalizeAiScene(i){if(!i||typeof i!="object")return null;const t=String(i.id??"").trim();if(!t)return null;const e=String(i.status||i.lifecycle_state||"").trim().toLowerCase();if(e&&!["approved","active"].includes(e)||!(typeof i.executable=="boolean"?i.executable:Number(i.action_count||i.raw_action_count||0)>0))return null;const n=String(i.source_id||"").trim(),r=String(i.title||i.name||n||`AI 场景 ${t}`).trim();return{id:t,name:r,icon:ls(i,n),isAi:!0,roomId:us(i,n,r),sourceId:n,gatewayTriggerPath:`/api/v1/ai-scenes/${encodeURIComponent(t)}/trigger`}}_knownRoomIdFromText(i){const t=i.toLowerCase();if(t.includes("全屋")||t.includes("全部")||t.includes("whole_home"))return"all";if(t.includes("厨房")||t.includes("kitchen"))return"kitchen";const e=t.includes("客厅")||t.includes("living"),s=t.includes("餐厅")||t.includes("dining");return e&&s?"living_dining":e?"living":s?"dining":t.includes("书房")||t.includes("study")?"study":t.includes("卧室")||t.includes("bedroom")?"bedroom":t.includes("卫生间")||t.includes("卫浴")||t.includes("bathroom")?"bathroom":t.includes("阳台")||t.includes("balcony")?"balcony":t.includes("玄关")||t.includes("entry")?"entry":t.includes("走廊")||t.includes("hallway")||t.includes("corridor")?"hallway":""}_mapRoomToId(i){const t=zt(i)||this._knownRoomIdFromText(i);return t||String(i||"").trim().toLowerCase().replace(/\s+/g,"_")}_commandEntityId(i){var n;const t=(n=i.data)==null?void 0:n.entity_id,e=Array.isArray(t)?t[0]:t,s=String(e||"").trim();return s?s.includes(".")||!i.domain?s:`${i.domain}.${s}`:""}async _executeServiceThroughGateway(i,t){const e=this._commandEntityId(i);if(!e||!i.service)throw new Error("invalid_screen_service_call");return this._postGatewayJson(Qn(e),Xn({service:i.service,data:i.data},t))}async _triggerAiSceneThroughGateway(i){const t=String(i||"").trim();if(!t)throw new Error("invalid_ai_scene_id");return this._postGatewayJson(`/api/v1/ai-scenes/${encodeURIComponent(t)}/trigger`,{})}_refreshDeviceStateAfterGatewayAction(){wt.refreshManagedDevices().catch(i=>{i instanceof Error&&i.message==="AUTH_REQUIRED"&&this._handleScreenAuthorizationRequired()}),setTimeout(()=>{wt.refreshManagedDevices().catch(i=>{i instanceof Error&&i.message==="AUTH_REQUIRED"&&this._handleScreenAuthorizationRequired()})},1200)}_showActionNotice(i,t,e){this._actionNoticeTimer&&(clearTimeout(this._actionNoticeTimer),this._actionNoticeTimer=null),this.actionNotice=e?{tone:i,text:t,receipt:e}:{tone:i,text:t},this._actionNoticeTimer=setTimeout(()=>{this.actionNotice=null,this._actionNoticeTimer=null},e?12e3:i==="error"?6500:4200)}_showDeviceControlTerminalReceipt(i,t,e,s){const n=Zn(i,t,e,s);return n?n.effectStatus==="verified_success"?(this._showActionNotice("success","设备状态已由网关回流验证成功",n),!0):(this._showActionNotice("warning","设备结果尚未确认，禁止自动重试",n),!0):!1}_executionFailureMessage(i){if(i instanceof xt){if(Ui(i.payload))return"该操作需要主人确认后才会执行";if(i.status===409)return"该操作已被网关拒绝，设备状态未改变";if(i.status===403)return yn(i.payload.error)}const t=i instanceof Error?i.message:String(i||"");return t.includes("invalid_screen_service_call")||t.includes("invalid_ai_scene_id")?"执行请求缺少必要字段，未发送动作":t.includes("AUTH")||t.includes("401")?"授权已失效，请重新配对后再执行":"执行请求未被网关接受，设备状态未改变"}_deviceControlChallengeFromError(i){if(!(i instanceof xt))return null;const t=Ui(i.payload);return t?{challenge:t,responsePayload:i.payload}:null}_deviceLabel(i){var t;return((t=this.devices.find(e=>e.id===i))==null?void 0:t.name)||i}_serviceLabel(i){const t=String(i||"").trim().toLowerCase();return{turn_on:"开启",turn_off:"关闭",open_cover:"打开",close_cover:"关闭",stop_cover:"停止",set_cover_position:"调节开合",set_temperature:"调节温度",set_hvac_mode:"切换模式",set_fan_mode:"调节风速"}[t]||t||"执行"}_actionDescription(i){const t=[this._serviceLabel(i.service)],e=i.data||{},s=u=>{const p=Number(u);return Number.isFinite(p)?p:null},n=s(e.brightness_pct);n!==null&&t.push(`亮度 ${n}%`);const r=s(e.color_temp_kelvin);r!==null&&t.push(`色温 ${r}K`);const o=s(e.temperature);o!==null&&t.push(`温度 ${o}°C`);const c=s(e.position);c!==null&&t.push(`开合 ${c}%`);const a=s(e.transition);a!==null&&t.push(`过渡 ${a} 秒`);const l=String(e.hvac_mode||"").trim();l&&t.push(`模式 ${l}`);const d=String(e.fan_mode||"").trim();d&&t.push(`风速 ${d}`);const h=Array.isArray(e.rgb_color)?e.rgb_color.map(Number):[];return h.length===3&&h.every(Number.isFinite)&&t.push(`颜色 RGB(${h.join(", ")})`),t.join("，")}_riskLabel(i){const t=String(i||"").trim().toLowerCase();return t==="medium"?"中风险":t==="high"?"高风险":t==="critical"?"极高风险":t==="low"?"低风险":"需确认"}_dismissPendingDeviceControlConfirmation(){this.isConfirmingDeviceControl||(this.pendingDeviceControlConfirmation=null)}async _confirmPendingDeviceControl(){const i=this.pendingDeviceControlConfirmation;if(!(!i||this.isConfirmingDeviceControl)){this.isConfirmingDeviceControl=!0,this._showActionNotice("info","确认请求已提交，等待设备状态回流确认");try{const t=await this._postGatewayJson(i.challenge.confirmPath,{});this.pendingDeviceControlConfirmation=null,this._showDeviceControlTerminalReceipt(t,i.requestId,i.challenge.bindingDigest,i.challenge.claimId)||this._showActionNotice("info","确认请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(t){if(t instanceof xt&&this._showDeviceControlTerminalReceipt(t.payload,i.requestId,i.challenge.bindingDigest,i.challenge.claimId)){this.pendingDeviceControlConfirmation=null,this._refreshDeviceStateAfterGatewayAction();return}const e=this._deviceControlChallengeFromError(t);e?this.pendingDeviceControlConfirmation={...i,challenge:e.challenge,responsePayload:e.responsePayload}:this.pendingDeviceControlConfirmation=null,console.error("[DeviceControl] 确认执行失败:",t),this._showActionNotice("error",this._executionFailureMessage(t))}finally{this.isConfirmingDeviceControl=!1}}}async _handleServiceCall(i){var n;const t=i.detail;if(t.domain==="smart_agent"&&t.service==="trigger_ai_scene"){try{await this._triggerAiSceneThroughGateway(String(((n=t.data)==null?void 0:n.scene_id)||"")),this._showActionNotice("info","场景请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(r){console.error("[SceneTrigger] AI 场景触发失败:",r),this._showActionNotice("error",this._executionFailureMessage(r))}return}const e=`screen-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s=this._commandEntityId(t);this._showActionNotice("info","执行请求已提交，等待设备状态回流确认");try{const r=await this._executeServiceThroughGateway(t,e);this.pendingDeviceControlConfirmation=null,this._showDeviceControlTerminalReceipt(r,e)||this._showActionNotice("info","执行请求已提交，等待设备状态回流确认"),this._refreshDeviceStateAfterGatewayAction()}catch(r){if(r instanceof xt&&this._showDeviceControlTerminalReceipt(r.payload,e)){this.pendingDeviceControlConfirmation=null,this._refreshDeviceStateAfterGatewayAction();return}const o=this._deviceControlChallengeFromError(r);if(o){this.pendingDeviceControlConfirmation={entityId:s,detail:t,requestId:e,challenge:o.challenge,responsePayload:o.responsePayload};return}console.error("[ServiceCall] 指令发送失败:",r),this._showActionNotice("error",this._executionFailureMessage(r))}}async _startPairing(){if(!this.isPairing){this._stopExpressWatch(),this.isPairing=!0,this.pairingCode="",this.authUrl="",this.qrDataUrl="",this.connectionError="";try{let i=this.gatewayBase.trim();i&&!i.startsWith("http")&&(i="http://"+i),i.endsWith("/")&&(i=i.slice(0,-1));const t=await fetch(`${i}/api/v1/device/pair/start`,{method:"POST"});let e={};try{e=await t.json()}catch{e={}}if(!t.ok){const s=String((e==null?void 0:e.error)||(e==null?void 0:e.message)||`HTTP_${t.status}`);throw t.status===409&&s==="pairing_window_not_open"?new Error("PAIRING_WINDOW_NOT_OPEN"):new Error(s||"API_FAILED")}if(e.token){const s=e.screen_token||"";s&&(this.screenToken=s,localStorage.setItem("screen_token",s));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||i,this.isPairing=!1,this._tryConnect();return}this.pairingCode=e.code||"",this.authUrl=e.auth_url||"",this.authUrl&&(this.qrDataUrl=await un.toDataURL(this.authUrl,{width:200,margin:1,color:{dark:"#1a1a2e",light:"#ffffff"}})),this.isPairingStep=!1,this._pollPairingStatus(i)}catch(i){console.error("Pairing failed",i),this.connectionError=(i==null?void 0:i.message)==="PAIRING_WINDOW_NOT_OPEN"?"请先在 8234 管理端「授权」页面点击开启配对，然后 60 秒内回到中控屏点击一键连接":"无法连接到配对服务器",this.isPairingStep=!1,this.isPairing=!1}}}async _pollPairingStatus(i){if(this.isPairing)try{const t=await fetch(`${i}/api/v1/device/pair/confirm`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:this.pairingCode})}),e=await t.json();if(!t.ok)throw new Error(String((e==null?void 0:e.error)||"API_FAILED"));if(e.ok){const s=e.screen_token||"";s&&(this.screenToken=s,localStorage.setItem("screen_token",s));const n=window.location.origin.includes(":5173");this.gatewayBase=n?"":e.url||i,this.isPairing=!1,this.isPairingStep=!0,this._tryConnect()}else e.error==="EXPIRED"?(this.connectionError='配对码已过期，请重新点击"一键连接"',this.isPairing=!1,this.isPairingStep=!1):setTimeout(()=>this._pollPairingStatus(i),2e3)}catch(t){console.warn("Polling pairing status failed",t),setTimeout(()=>this._pollPairingStatus(i),5e3)}}_renderConfigScreen(){return g`
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
    `}render(){return this.isConfiguring?this._renderConfigScreen():this.isConnected?g`
      <div class="container" 
        @service-call="${this._handleServiceCall}"
        @show-detail="${i=>{const t=this.devices.find(e=>e.id===i.detail.entityId);t&&(this.activeDetailEntity=t)}}"
      >
        <!-- 1. 侧边栏：AI 状态模块 -->
        <div class="sidebar">
          <div class="ai-brain-module">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
              <span class="icon-main" style="color:var(--ai-purple); font-size:32px;">auto_awesome</span>
              <div style="font-size:18px; font-weight:900;">AI 领航员</div>
            </div>
            ${this._renderAiStatus()}
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
              <span class="status-value">${this._formatTodayEnergyKwh(this.energyStats)}</span>
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
              ${this.rooms.map(i=>g`
                <div 
                  class="room-tab ${this.activeRoomId===i.id?"active":""}"
                  @click="${()=>this.activeRoomId=i.id}"
                >${i.name}</div>
              `)}
            </div>
          </div>
          ${this._renderEnvironmentInsights()}
          <owner-questions .read=${i=>this._fetchGatewayJson(i)} .send=${(i,t)=>this._postGatewayJson(i,t)} .announce=${(i,t)=>this._announceOwnerQuestion(i,t)} .onPendingChanged=${i=>{var t;return(t=this._voicePipeline)==null?void 0:t.retainOwnerQuestions(i)}}></owner-questions>
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

          ${tr(this.actionNotice)}

          <!-- AI Reply Overlay (Ambient) -->
          ${er(this.voiceReply)}
        </div>

        <!-- 5. 关键视觉事件大图弹出 (Critical Event Overlay) -->
        ${ir(this.criticalEvent,this.gatewayBase,()=>this.criticalEvent=null)}

        ${sr(this.pendingDeviceControlConfirmation,this.isConfirmingDeviceControl,i=>this._riskLabel(i),i=>this._deviceLabel(i),i=>this._actionDescription(i),()=>this._dismissPendingDeviceControlConfirmation(),()=>this._confirmPendingDeviceControl())}

        <!-- 6. 设备深度控制面板 (Detail Overlay) -->
        ${nr(this.activeDetailEntity,()=>this.activeDetailEntity=null)}
      </div>
    `:g`<div style="display:flex; height:100vh; align-items:center; justify-content:center;">正在连接...</div>`}};I.styles=[B,N`
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
    `];O([R()],I.prototype,"activeRoomId",2);O([R()],I.prototype,"aiState",2);O([R()],I.prototype,"devices",2);O([R()],I.prototype,"feedState",2);O([R()],I.prototype,"energyStats",2);O([R()],I.prototype,"frigateEvents",2);O([R()],I.prototype,"criticalEvent",2);O([R()],I.prototype,"activeDetailEntity",2);O([R()],I.prototype,"isRecording",2);O([R()],I.prototype,"isConnected",2);O([R()],I.prototype,"isConfiguring",2);O([R()],I.prototype,"connectionError",2);O([R()],I.prototype,"isPairingStep",2);O([R()],I.prototype,"gatewayBase",2);O([R()],I.prototype,"screenToken",2);O([R()],I.prototype,"pairingCode",2);O([R()],I.prototype,"authUrl",2);O([R()],I.prototype,"qrDataUrl",2);O([R()],I.prototype,"isPairing",2);O([R()],I.prototype,"voiceText",2);O([R()],I.prototype,"voiceReply",2);O([R()],I.prototype,"waveData",2);O([R()],I.prototype,"pipelineStage",2);O([R()],I.prototype,"theme",2);O([R()],I.prototype,"actionNotice",2);O([R()],I.prototype,"pendingDeviceControlConfirmation",2);O([R()],I.prototype,"isConfirmingDeviceControl",2);O([R()],I.prototype,"alwaysOnEnabled",2);O([R()],I.prototype,"rooms",2);O([R()],I.prototype,"scenes",2);O([R()],I.prototype,"probeStatus",2);I=O([z("smart-app-shell")],I);
