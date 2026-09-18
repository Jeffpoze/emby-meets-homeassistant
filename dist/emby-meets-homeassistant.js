/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const s=this.t;if(t&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=i.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(s,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new r(i,e,s)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,y=u?u.emptyScript:"",g=m.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},_=(e,t)=>!n(e,t),v={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...d(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(t)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(t,s.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(void 0!==e){const o=this.constructor;if(!1===i&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??_)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,g?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=e=>e,S=w.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+I,P=`<${C}>`,T=document,k=()=>T.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,H=/>/g,M=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,q=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),j=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,F=T.createTreeWalker(T,129);function V(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const s=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=R;for(let t=0;t<s;t++){const s=e[t];let n,l,c=-1,h=0;for(;h<s.length&&(a.lastIndex=h,l=a.exec(s),null!==l);)h=a.lastIndex,a===R?"!--"===l[1]?a=L:void 0!==l[1]?a=H:void 0!==l[2]?(z.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=M):void 0!==l[3]&&(a=M):a===M?">"===l[0]?(a=r??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?M:'"'===l[3]?q:D):a===q||a===D?a=M:a===L||a===H?a=R:(a=M,r=void 0);const d=a===M&&e[t+1].startsWith("/>")?" ":"";o+=a===R?s+P:c>=0?(i.push(n),s.slice(0,c)+A+s.slice(c)+I+d):s+I+(-2===c?t:d)}return[V(e,o+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class G{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,n=this.parts,[l,c]=Y(e,t);if(this.el=G.createElement(l,s),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=F.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(A)){const t=c[o++],s=i.getAttribute(e).split(I),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?ee:"?"===a[1]?te:"@"===a[1]?se:Q}),i.removeAttribute(e)}else e.startsWith(I)&&(n.push({type:6,index:r}),i.removeAttribute(e));if(z.test(i.tagName)){const e=i.textContent.split(I),t=e.length-1;if(t>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],k()),F.nextNode(),n.push({type:2,index:++r});i.append(e[t],k())}}}else if(8===i.nodeType)if(i.data===C)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(I,e+1));)n.push({type:7,index:r}),e+=I.length-1}r++}}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}}function J(e,t,s=e,i){if(t===j)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=U(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);F.currentNode=i;let r=F.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new Z(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ie(r,this,e)),this._$AV.push(t),n=s[++a]}o!==n?.index&&(r=F.nextNode(),o++)}return F.currentNode=T,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),U(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=G.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new G(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Z(this.O(k()),this.O(k()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(void 0===r)e=J(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{const i=e;let a,n;for(e=r[0],a=0;a<r.length-1;a++)n=J(this,i[s+a],t,a),n===j&&(n=this._$AH[a]),o||=!U(n)||n!==this._$AH[a],n===W?e=W:e!==W&&(e+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends Q{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===j)return;const s=this._$AH,i=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(G,Z),(w.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new Z(t.insertBefore(k(),e),e,void 0,s??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const ne=oe.litElementPolyfillSupport;ne?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const le="emby-meets-homeassistant",ce="emby-meets-homeassistant-editor",he="emby-active-sessions",de="emby-active-sessions-editor",pe={CONTINUE_WATCHING:"Continue Watching",NEXT_UP:"Next Up",RECENTLY_ADDED:"Recently Added"},me=8096,ue="http";class ye extends Error{constructor(e,t,s){super(e),this.status=t,this.url=s,this.name="EmbyRequestError"}}const ge="Overview,Genres,ProductionYear,CommunityRating,OfficialRating,RunTimeTicks,SeriesId,SeriesName,SeasonId,ParentIndexNumber,IndexNumber,People,Studios,BackdropImageTags";function be(e){return{id:e.Id,name:e.Name,type:e.Type,overview:e.Overview,productionYear:e.ProductionYear,communityRating:e.CommunityRating,officialRating:e.OfficialRating,runTimeTicks:e.RunTimeTicks,genres:e.Genres,seriesId:e.SeriesId,seriesName:e.SeriesName,seasonId:e.SeasonId,parentIndexNumber:e.ParentIndexNumber,indexNumber:e.IndexNumber,userData:e.UserData&&{played:e.UserData.Played,playbackPositionTicks:e.UserData.PlaybackPositionTicks,playedPercentage:e.UserData.PlayedPercentage,unplayedItemCount:e.UserData.UnplayedItemCount},imageTags:e.ImageTags,backdropImageTags:e.BackdropImageTags,people:e.People,studios:e.Studios}}function fe(e){return{id:e.Id,deviceId:e.DeviceId,deviceName:e.DeviceName,client:e.Client,userId:e.UserId,supportsRemoteControl:!!e.SupportsRemoteControl,playableMediaTypes:e.PlayableMediaTypes||[],nowPlayingItem:e.NowPlayingItem?be(e.NowPlayingItem):void 0}}function _e(e){return{id:e.Id,name:e.Name,channelId:e.ChannelId,startDate:e.StartDate,endDate:e.EndDate,overview:e.Overview}}class ve{constructor(e,t,s,i){this.host=e,this.port=t,this.protocol=s,this.apiKey=i}baseUrl(){const e=this.port?`:${this.port}`:"";return`${this.protocol}://${this.host}${e}/emby`}buildUrl(e,t={}){const s=new URL(`${this.baseUrl()}${e}`);return Object.entries(t).forEach(([e,t])=>{null!=t&&""!==t&&s.searchParams.set(e,String(t))}),s.toString()}async request(e,t,s){const i=this.buildUrl(e,t),r=await fetch(i,{...s,headers:{"X-Emby-Token":this.apiKey,"Content-Type":"application/json",...s?.headers||{}}});if(!r.ok)throw new ye(`Emby request failed: ${r.status} ${r.statusText}`,r.status,i);if(204===r.status)return;const o=await r.text();return o?JSON.parse(o):void 0}async getUsers(){return(await this.request("/Users")).map(e=>({id:e.Id,name:e.Name}))}async getViews(e){return(await this.request(`/Users/${e}/Views`)).Items.map(e=>({id:e.Id,name:e.Name,collectionType:e.CollectionType}))}async getItems(e,t={}){return(await this.request(`/Users/${e}/Items`,{ParentId:t.parentId,IncludeItemTypes:t.includeItemTypes,Recursive:t.recursive??!0,SortBy:t.sortBy,SortOrder:t.sortOrder,Limit:t.limit,Fields:t.fields??ge})).Items.map(be)}async getItem(e,t){return be(await this.request(`/Users/${e}/Items/${t}`,{Fields:ge}))}async getResume(e,t={}){return(await this.request(`/Users/${e}/Items/Resume`,{Limit:t.limit??50,Recursive:!0,MediaTypes:"Video",ParentId:t.parentId,Fields:ge})).Items.map(be)}async getNextUp(e,t={}){return(await this.request("/Shows/NextUp",{UserId:e,Limit:t.limit??50,Fields:ge})).Items.map(be)}async getLatest(e,t={}){return(await this.request(`/Users/${e}/Items/Latest`,{Limit:t.limit??50,ParentId:t.parentId,Fields:ge})).map(be)}async getSeasons(e,t){return(await this.request(`/Shows/${e}/Seasons`,{UserId:t,Fields:ge})).Items.map(be)}async getEpisodes(e,t,s){return(await this.request(`/Shows/${e}/Episodes`,{UserId:t,SeasonId:s,Fields:ge})).Items.map(be)}async getCollections(e){return this.getItems(e,{includeItemTypes:"BoxSet"})}async getPlaylistItems(e,t){return(await this.request(`/Playlists/${e}/Items`,{UserId:t,Fields:ge})).Items.map(be)}async getLiveTvChannels(e){return(await this.request("/LiveTv/Channels",{UserId:e,Fields:ge})).Items.map(be)}async getEpg(e){return(await this.request("/LiveTv/EPG",{ChannelIds:e.join(",")})).Items.map(_e)}async getSessions(e){return(await this.request("/Sessions",{ControllableByUserId:e})).map(fe)}async refreshLibrary(){await this.request("/Library/Refresh",{},{method:"POST"})}imageUrl(e,t="Primary",s={}){return this.buildUrl(`/Items/${e}/Images/${t}`,{maxWidth:s.maxWidth,maxHeight:s.maxHeight,tag:s.tag,quality:s.quality??90,api_key:this.apiKey})}streamUrl(e){return this.buildUrl(`/Videos/${e}/stream`,{Static:!0,api_key:this.apiKey})}async playbackInfo(e,t){return this.request(`/Items/${e}/PlaybackInfo`,{UserId:t},{method:"POST"})}async playOnSession(e,t,s={}){await this.request(`/Sessions/${e}/Playing`,{ItemIds:t.join(","),PlayCommand:"PlayNow",StartPositionTicks:s.startPositionTicks},{method:"POST"})}async sendPlaystateCommand(e,t,s){await this.request(`/Sessions/${e}/Playing/${t}`,{SeekPositionTicks:s},{method:"POST"})}}function $e(e){return e.startsWith("media_player.")}class we{constructor(e,t,s){this.hass=e,this.emby=t,this.devices=s}setHass(e){this.hass=e}async resolveTarget(){if(!this.devices?.length)return null;let e;for(const t of this.devices){if($e(t)){const e=this.hass.states[t];if(e&&"unavailable"!==e.state&&"unknown"!==e.state)return{kind:"cast",entityId:t,label:e.attributes?.friendly_name||t};continue}e||(e=await this.emby.getSessions());const s=e.find(e=>e.supportsRemoteControl&&(e.deviceName?.toLowerCase()===t.toLowerCase()||e.client?.toLowerCase()===t.toLowerCase()));if(s)return{kind:"session",sessionId:s.id,label:s.deviceName||s.client}}return null}async runScript(e){if(!e)return;const t=e.split(".")[0];await this.hass.callService(t,"turn_on",{entity_id:e})}async play(e,t,s={}){s.runBefore&&await this.runScript(s.runBefore),"cast"===t.kind&&t.entityId?await this.hass.callService("media_player","play_media",{entity_id:t.entityId,media_content_id:this.emby.streamUrl(e.id),media_content_type:"Audio"===e.type?"music":"video"}):"session"===t.kind&&t.sessionId&&await this.emby.playOnSession(t.sessionId,[e.id]),s.runAfter&&await this.runScript(s.runAfter)}async command(e,t,s){if("cast"===e.kind&&e.entityId){const s={Pause:"media_pause",Unpause:"media_play",Stop:"media_stop"}[t];return void(s&&await this.hass.callService("media_player",s,{entity_id:e.entityId}))}"session"===e.kind&&e.sessionId&&await this.emby.sendPlaystateCommand(e.sessionId,t,s)}}function xe(e,t,s){const i=e.trim().replace(/\/+$/,"");if(/^https?:\/\//i.test(i)){const e=new URL(i);return{protocol:e.protocol.replace(":",""),host:e.hostname,port:e.port?Number(e.port):void 0}}return{protocol:t,host:i,port:s}}const Se=o`
  :host {
    --emby-card-background: var(--card-background-color, #141414);
    --emby-primary-text: var(--primary-text-color, #ffffff);
    --emby-secondary-text: var(--secondary-text-color, #b3b3b3);
    --emby-accent: var(--primary-color, #e50914);
    --emby-accent-secondary: var(--accent-color, var(--emby-accent));
    --emby-border-radius: var(--ha-card-border-radius, 8px);
    --emby-font: var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    --emby-min-width: 150px;
    --emby-grid-gap: 12px;
  }
`;class Ee extends ae{constructor(){super(...arguments),this.imageUrl="",this.canPlay=!1}onClick(){this.dispatchEvent(new CustomEvent("emby-select",{detail:this.item,bubbles:!0,composed:!0}))}onPlayClick(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("emby-play",{detail:this.item,bubbles:!0,composed:!0}))}render(){const e=this.item?.userData?.playedPercentage,t=this.item?.userData?.unplayedItemCount;return B`
      <div class="tile" style="background-image:url(${this.imageUrl})" @click=${this.onClick} tabindex="0">
        ${this.canPlay?B`<div class="play" @click=${this.onPlayClick}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>`:W}
        ${t?B`<div class="badge">${t}</div>`:W}
        ${e?B`<div class="progress"><div style="width:${e}%"></div></div>`:W}
      </div>
      <div class="title">${this.item?.name}</div>
      ${this.item?.productionYear?B`<div class="meta">${this.item.productionYear}</div>`:W}
    `}}Ee.properties={item:{type:Object},imageUrl:{type:String,attribute:"image-url"},canPlay:{type:Boolean,attribute:"can-play"}},Ee.styles=[Se,o`
      :host {
        display: block;
      }
      .tile {
        position: relative;
        border-radius: var(--emby-border-radius);
        overflow: hidden;
        aspect-ratio: 2 / 3;
        background: #222 center / cover no-repeat;
        cursor: pointer;
        transform: scale(1);
        transition: transform 200ms ease, box-shadow 200ms ease;
      }
      .tile:hover,
      .tile:focus-within {
        transform: scale(1.08);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
      .badge {
        position: absolute;
        top: 8px;
        right: 8px;
        min-width: 22px;
        height: 22px;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--emby-accent-secondary);
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      }
      .progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.25);
      }
      .progress > div {
        height: 100%;
        background: var(--emby-accent);
      }
      .play {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        background: rgba(0, 0, 0, 0.35);
        transition: opacity 150ms ease;
      }
      .tile:hover .play,
      .tile:focus-within .play {
        opacity: 1;
      }
      .play ha-icon,
      .play svg {
        width: 42px;
        height: 42px;
        color: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
      }
      .title {
        margin-top: 6px;
        font-size: 0.85rem;
        color: var(--emby-primary-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta {
        font-size: 0.75rem;
        color: var(--emby-secondary-text);
      }
    `],customElements.define("emby-poster-card",Ee);class Ae extends ae{constructor(){super(...arguments),this.rowTitle="",this.items=[],this.horizontal=!1,this.minWidth=150,this.getImageUrl=()=>"",this.canPlay=()=>!0}render(){const e=`--row-min-width:${this.minWidth}px`;return B`
      ${this.rowTitle?B`<h2>${this.rowTitle}</h2>`:""}
      <div class="${this.horizontal?"carousel":"grid"}" style=${e}>
        ${this.items.map(e=>B`
            <emby-poster-card
              .item=${e}
              image-url=${this.getImageUrl(e)}
              ?can-play=${this.canPlay(e)}
            ></emby-poster-card>
          `)}
      </div>
    `}}Ae.properties={rowTitle:{type:String,attribute:"row-title"},items:{type:Array},horizontal:{type:Boolean},minWidth:{type:Number,attribute:"min-width"},getImageUrl:{attribute:!1},canPlay:{attribute:!1}},Ae.styles=[Se,o`
      :host {
        display: block;
      }
      h2 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--emby-primary-text);
        margin: 0 0 8px 4px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--row-min-width, 150px), 1fr));
        gap: var(--emby-grid-gap);
      }
      .carousel {
        display: flex;
        gap: var(--emby-grid-gap);
        overflow-x: auto;
        scroll-snap-type: x proximity;
        padding-bottom: 4px;
      }
      .carousel emby-poster-card {
        flex: 0 0 auto;
        width: var(--row-min-width, 150px);
        scroll-snap-align: start;
      }
    `],customElements.define("emby-poster-grid",Ae);class Ie extends ae{constructor(){super(...arguments),this.value="",this.emit=function(e,t){let s;return(...i)=>{s&&clearTimeout(s),s=setTimeout(()=>e(...i),t)}}(e=>{this.dispatchEvent(new CustomEvent("emby-search",{detail:e,bubbles:!0,composed:!0}))},200)}onInput(e){const t=e.target.value;this.emit(t)}render(){return B`<input type="text" placeholder="Search…" .value=${this.value} @input=${this.onInput} />`}}Ie.properties={value:{type:String}},Ie.styles=[Se,o`
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px;
        border-radius: var(--emby-border-radius);
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.06);
        color: var(--emby-primary-text);
        font-size: 0.95rem;
      }
      input:focus {
        outline: none;
        border-color: var(--emby-accent);
      }
    `],customElements.define("emby-search-bar",Ie);class Ce extends ae{constructor(){super(...arguments),this.userId="",this.canPlay=!1,this._seasons=[],this._episodes=[]}updated(e){e.has("item")&&"Series"===this.item?.type&&this._loadSeasons()}async _loadSeasons(){this._seasons=await this.emby.getSeasons(this.item.id,this.userId),this._seasons.length&&this._selectSeason(this._seasons[0].id)}async _selectSeason(e){this._selectedSeasonId=e,this._episodes=await this.emby.getEpisodes(this.item.id,this.userId,e)}_play(e=this.item){this.dispatchEvent(new CustomEvent("emby-play",{detail:e,bubbles:!0,composed:!0}))}_close(){this.dispatchEvent(new CustomEvent("emby-close",{bubbles:!0,composed:!0}))}render(){if(!this.item)return W;const e=this.item.genres?.join(", ");return B`
      <div class="close" @click=${this._close}>✕</div>
      <div class="layout">
        <div
          class="poster"
          style="background-image:url(${this.emby.imageUrl(this.item.id,"Primary",{maxWidth:400})})"
        ></div>
        <div class="info">
          <h1>${this.item.name}</h1>
          <div class="meta-row">
            ${this.item.productionYear?B`<span>${this.item.productionYear}</span>`:W}
            ${this.item.officialRating?B`<span>${this.item.officialRating}</span>`:W}
            ${this.item.communityRating?B`<span>★ ${this.item.communityRating.toFixed(1)}</span>`:W}
            ${this.item.runTimeTicks?B`<span>${function(e){const t=Math.round(function(e){return e?e/1e7:0}(e)/60);if(!t)return"";const s=Math.floor(t/60),i=t%60;return s&&i?`${s}h ${i}m`:s?`${s}h`:`${i}m`}(this.item.runTimeTicks)}</span>`:W}
          </div>
          ${this.item.overview?B`<div class="overview">${this.item.overview}</div>`:W}
          ${e?B`<div class="meta-row">Genres: ${e}</div>`:W}
          <button class="play-button" ?disabled=${!this.canPlay} @click=${()=>this._play()}>▶ Play</button>
        </div>
      </div>
      ${this._seasons.length?B`
            <div class="season-tabs">
              ${this._seasons.map(e=>B`
                  <button
                    class=${e.id===this._selectedSeasonId?"active":""}
                    @click=${()=>this._selectSeason(e.id)}
                  >
                    ${e.name}
                  </button>
                `)}
            </div>
            <emby-poster-grid
              .items=${this._episodes}
              .getImageUrl=${e=>this.emby.imageUrl(e.id,"Primary",{maxWidth:300})}
              .canPlay=${()=>this.canPlay}
              min-width="220"
              @emby-select=${e=>this._play(e.detail)}
              @emby-play=${e=>this._play(e.detail)}
            ></emby-poster-grid>
          `:W}
    `}}Ce.properties={item:{type:Object},emby:{attribute:!1},userId:{type:String},canPlay:{type:Boolean,attribute:"can-play"},_seasons:{state:!0},_episodes:{state:!0},_selectedSeasonId:{state:!0}},Ce.styles=[Se,o`
      :host {
        display: block;
        background: var(--emby-card-background);
        border-radius: var(--emby-border-radius);
        padding: 20px;
        position: relative;
        color: var(--emby-primary-text);
      }
      .close {
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: pointer;
        color: var(--emby-secondary-text);
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .layout {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
      }
      .poster {
        width: 220px;
        min-width: 160px;
        aspect-ratio: 2 / 3;
        border-radius: var(--emby-border-radius);
        background: #222 center / cover no-repeat;
        flex-shrink: 0;
      }
      .info {
        flex: 1;
        min-width: 240px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 1.6rem;
      }
      .meta-row {
        color: var(--emby-secondary-text);
        font-size: 0.9rem;
        margin-bottom: 12px;
      }
      .meta-row span {
        margin-right: 12px;
      }
      .overview {
        line-height: 1.5;
        color: var(--emby-primary-text);
        margin-bottom: 16px;
      }
      .play-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--emby-accent);
        color: white;
        border: none;
        border-radius: var(--emby-border-radius);
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
      }
      .play-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .season-tabs {
        display: flex;
        gap: 8px;
        margin: 16px 0;
        flex-wrap: wrap;
      }
      .season-tabs button {
        background: rgba(255, 255, 255, 0.08);
        border: none;
        color: var(--emby-primary-text);
        padding: 6px 14px;
        border-radius: 16px;
        cursor: pointer;
      }
      .season-tabs button.active {
        background: var(--emby-accent);
      }
    `],customElements.define("emby-detail-panel",Ce);const Pe=[{name:"host",required:!0,selector:{text:{}}},{name:"port",selector:{number:{mode:"box"}}},{name:"protocol",selector:{select:{options:["http","https"],mode:"dropdown"}}},{name:"apiKey",required:!0,selector:{text:{}}}];class Te extends ae{constructor(){super(...arguments),this._users=[],this._views=[]}setConfig(e){this._config={...e},this._refreshServerData()}async _refreshServerData(){if(this._config?.host&&this._config?.apiKey)try{const{protocol:e,host:t,port:s}=xe(this._config.host,this._config.protocol??ue,this._config.port??me),i=new ve(t,s,e,this._config.apiKey);this._users=await i.getUsers(),this._config.userId&&(this._views=await i.getViews(this._config.userId))}catch{}}_valueChanged(e){const t={...this._config,...e.detail.value};this._config=t,this._fireChanged(),this._refreshServerData()}_fieldChanged(e,t){this._config={...this._config,[e]:t},this._fireChanged(),this._refreshServerData()}_fireChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){if(!this._config)return W;const e=[...Object.values(pe),...this._views.map(e=>e.name)];return B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Pe}
        .computeLabel=${e=>e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"userId",required:!0,selector:{select:{mode:"dropdown",options:this._users.map(e=>({value:e.id,label:e.name}))}}}]}
        .computeLabel=${()=>"Emby user"}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"libraryName",required:!0,selector:e.length?{select:{mode:"dropdown",options:e,custom_value:!0}}:{text:{}}}]}
        .computeLabel=${()=>"Library"}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-textfield
        label="Devices (comma-separated: media_player.* entities for Cast, or Emby device/client names)"
        .value=${(this._config.devices??[]).join(", ")}
        @change=${e=>this._fieldChanged("devices",e.target.value.split(",").map(e=>e.trim()).filter(Boolean))}
        style="display:block;margin-top:16px;width:100%;"
      ></ha-textfield>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"title",selector:{text:{}}},{name:"showSearch",selector:{boolean:{}}},{name:"showExtras",selector:{boolean:{}}},{name:"playTrailer",selector:{boolean:{}}},{name:"useHorizontalScroll",selector:{boolean:{}}},{name:"minWidth",selector:{number:{mode:"box"}}},{name:"sort",selector:{text:{}}},{name:"sortOrder",selector:{select:{options:["Ascending","Descending"],mode:"dropdown"}}},{name:"maxCount",selector:{number:{mode:"box"}}},{name:"runBefore",selector:{entity:{domain:"script"}}},{name:"runAfter",selector:{entity:{domain:"script"}}}]}
        .computeLabel=${e=>e.name}
        @value-changed=${this._valueChanged}
        style="display:block;margin-top:16px;"
      ></ha-form>
    `}}Te.properties={hass:{attribute:!1},_config:{state:!0},_users:{state:!0},_views:{state:!0}},customElements.define(ce,Te);const ke=[{name:"host",required:!0,selector:{text:{}}},{name:"port",selector:{number:{mode:"box"}}},{name:"protocol",selector:{select:{options:["http","https"],mode:"dropdown"}}},{name:"apiKey",required:!0,selector:{text:{}}},{name:"title",selector:{text:{}}},{name:"showScanLibrary",selector:{boolean:{}}}];class Ue extends ae{setConfig(e){this._config={...e}}_valueChanged(e){this._config={...this._config,...e.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ke}
        .computeLabel=${e=>e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W}}Ue.properties={hass:{attribute:!1},_config:{state:!0}},customElements.define(de,Ue);class Ne extends ae{constructor(){super(...arguments),this._sessions=[],this._loading=!0,this._error="",this._scanning=!1}setConfig(e){if(!e.host)throw new Error('emby-active-sessions: "host" is required');if(!e.apiKey)throw new Error('emby-active-sessions: "apiKey" is required');this._config={protocol:ue,showScanLibrary:!0,...e};const{protocol:t,host:s,port:i}=xe(this._config.host,this._config.protocol??ue,this._config.port??me);this.emby=new ve(s,i,t,this._config.apiKey),this._loadSessions()}getCardSize(){return 3}static getConfigElement(){return document.createElement(de)}static getStubConfig(){return{host:"192.168.1.50",apiKey:""}}connectedCallback(){super.connectedCallback(),this.emby&&this._loadSessions(),this.pollHandle=setInterval(()=>this._loadSessions(),1e4)}disconnectedCallback(){super.disconnectedCallback(),this.pollHandle&&clearInterval(this.pollHandle)}async _loadSessions(){try{const e=await this.emby.getSessions();this._sessions=e.filter(e=>e.deviceName),this._error=""}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{this._loading=!1}}async _scanLibrary(){this._scanning=!0;try{await this.emby.refreshLibrary()}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{setTimeout(()=>this._scanning=!1,2e3)}}render(){return B`
      <ha-card>
        <div class="header">
          <div class="title">${this._config?.title??"Active Sessions"}</div>
          <div class="count">${this._sessions.length}</div>
        </div>
        ${this._error?B`<div class="error">${this._error}</div>`:W}
        ${this._loading||this._sessions.length||this._error?W:B`<div class="empty">No active sessions</div>`}
        ${this._sessions.map(e=>B`
            <div class="session">
              <div class="dot ${e.nowPlayingItem?"playing":"idle"}"></div>
              <div class="session-info">
                <div class="device">${e.deviceName} · ${e.client}</div>
                <div class="now-playing">
                  ${e.nowPlayingItem?`Playing ${e.nowPlayingItem.name}`:"Idle"}
                </div>
              </div>
            </div>
          `)}
        ${this._config?.showScanLibrary?B`<button class="scan-button" ?disabled=${this._scanning} @click=${this._scanLibrary}>
              ${this._scanning?"Scanning…":"Scan Library"}
            </button>`:W}
      </ha-card>
    `}}Ne.properties={hass:{attribute:!1},_config:{state:!0},_sessions:{state:!0},_loading:{state:!0},_error:{state:!0},_scanning:{state:!0}},Ne.styles=[Se,o`
      :host {
        display: block;
        font-family: var(--emby-font);
      }
      ha-card {
        background: var(--emby-card-background);
        border-radius: var(--emby-border-radius);
        padding: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .title {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--emby-primary-text);
      }
      .count {
        background: var(--emby-accent-secondary);
        color: white;
        border-radius: 12px;
        padding: 2px 10px;
        font-size: 0.85rem;
        font-weight: 700;
      }
      .empty {
        color: var(--emby-secondary-text);
        padding: 12px 0;
      }
      .error {
        color: var(--error-color, #ff6b6b);
      }
      .session {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .session:first-of-type {
        border-top: none;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot.playing {
        background: var(--emby-accent);
      }
      .dot.idle {
        background: var(--emby-secondary-text);
      }
      .session-info {
        flex: 1;
        min-width: 0;
      }
      .device {
        color: var(--emby-primary-text);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .now-playing {
        color: var(--emby-secondary-text);
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .scan-button {
        margin-top: 16px;
        width: 100%;
        background: rgba(255, 255, 255, 0.08);
        color: var(--emby-primary-text);
        border: none;
        border-radius: var(--emby-border-radius);
        padding: 10px;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .scan-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `],customElements.define(he,Ne),window.customCards=window.customCards||[],window.customCards.push({type:he,name:"Emby Active Sessions",preview:!1,description:"Shows currently active Emby sessions and lets you trigger a library scan."});const Oe={movies:"Movie",tvshows:"Series",music:"MusicAlbum",musicvideos:"MusicVideo",homevideos:"Video",books:"Book"};class Re extends ae{constructor(){super(...arguments),this._items=[],this._rowTitle="",this._searchTerm="",this._loading=!0,this._error="",this._getImageUrl=e=>this.emby.imageUrl(e.id,"Primary",{maxWidth:2*(this._config.minWidth??150)}),this._canPlay=()=>!!this._config.devices?.length}setConfig(e){if(!e.host)throw new Error('emby-meets-homeassistant: "host" is required');if(!e.apiKey)throw new Error('emby-meets-homeassistant: "apiKey" is required');if(!e.userId)throw new Error('emby-meets-homeassistant: "userId" is required');if(!e.libraryName)throw new Error('emby-meets-homeassistant: "libraryName" is required');this._config={protocol:ue,showSearch:!0,showExtras:!0,minWidth:150,useHorizontalScroll:!0,...e};const{protocol:t,host:s,port:i}=xe(this._config.host,this._config.protocol??ue,this._config.port??me);this.emby=new ve(s,i,t,this._config.apiKey),this.playController=new we(this.hass,this.emby,this._config.devices??[]),this._loadData()}getCardSize(){return 5}static getConfigElement(){return document.createElement(ce)}static getStubConfig(){return{host:"192.168.1.50",apiKey:"",userId:"",libraryName:"Movies"}}willUpdate(e){e.has("hass")&&this.playController&&this.playController.setHass(this.hass)}async _loadData(){this._loading=!0,this._error="";try{const{libraryName:e,userId:t}=this._config;if(Object.values(pe).includes(e))this._rowTitle=this._config.title??e,e===pe.CONTINUE_WATCHING?this._items=await this.emby.getResume(t,{limit:this._config.maxCount}):e===pe.NEXT_UP?this._items=await this.emby.getNextUp(t,{limit:this._config.maxCount}):e===pe.RECENTLY_ADDED&&(this._items=await this.emby.getLatest(t,{limit:this._config.maxCount}));else{const s=await this.emby.getViews(t);if(this.view=s.find(t=>t.name===e),!this.view)throw new Error(`Library "${e}" not found on this Emby server`);this._rowTitle=this._config.title??this.view.name,this._items=await this.emby.getItems(t,{parentId:this.view.id,includeItemTypes:this.view.collectionType?Oe[this.view.collectionType]:void 0,sortBy:this._config.sort,sortOrder:this._config.sortOrder,limit:this._config.maxCount})}}catch(e){this._error=e instanceof Error?e.message:String(e)}finally{this._loading=!1}}async _onSelect(e){this._selectedItem=e.detail,this._selectedItemFull=await this.emby.getItem(this._config.userId,e.detail.id)}_onClose(){this._selectedItem=void 0,this._selectedItemFull=void 0}async _onPlay(e){const t=e.detail,s=await this.playController.resolveTarget();s?await this.playController.play(t,s,{runBefore:this._config.runBefore,runAfter:this._config.runAfter}):this._error="No configured device is currently available to play on."}get _filteredItems(){return this._searchTerm?this._items.filter(e=>function(e,...t){const s=e.trim().toLowerCase();if(!s)return!0;const i=s.split(/\s+/).filter(Boolean),r=t.filter(Boolean).join(" ").toLowerCase();return i.every(e=>r.includes(e))}(this._searchTerm,e.name,e.seriesName,e.genres?.join(" "))):this._items}render(){return B`
      <ha-card>
        <div class="header">
          <div class="title">${this._rowTitle||this._config?.title||""}</div>
          ${this._config?.showSearch?B`<div class="search-wrap">
                <emby-search-bar @emby-search=${e=>this._searchTerm=e.detail}></emby-search-bar>
              </div>`:W}
        </div>

        ${this._error?B`<div class="error">${this._error}</div>`:W}
        ${this._loading?B`<div class="loading">Loading…</div>`:W}

        ${this._selectedItem?B`
              <emby-detail-panel
                .item=${this._selectedItemFull??this._selectedItem}
                .emby=${this.emby}
                .userId=${this._config.userId}
                ?can-play=${this._canPlay()}
                @emby-close=${this._onClose}
                @emby-play=${this._onPlay}
              ></emby-detail-panel>
            `:this._loading||this._error?W:B`
                <emby-poster-grid
                  .items=${this._filteredItems}
                  .getImageUrl=${this._getImageUrl}
                  .canPlay=${this._canPlay}
                  ?horizontal=${this._config.useHorizontalScroll}
                  min-width=${this._config.minWidth??150}
                  @emby-select=${this._onSelect}
                  @emby-play=${this._onPlay}
                ></emby-poster-grid>
              `}
      </ha-card>
    `}}Re.properties={hass:{attribute:!1},_config:{state:!0},_items:{state:!0},_rowTitle:{state:!0},_selectedItem:{state:!0},_selectedItemFull:{state:!0},_searchTerm:{state:!0},_loading:{state:!0},_error:{state:!0}},Re.styles=[Se,o`
      :host {
        display: block;
        font-family: var(--emby-font);
      }
      ha-card {
        background: var(--emby-card-background);
        border-radius: var(--emby-border-radius);
        padding: 16px;
        overflow: hidden;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      .title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--emby-primary-text);
      }
      .search-wrap {
        min-width: 200px;
      }
      .error {
        color: var(--error-color, #ff6b6b);
        padding: 16px 0;
      }
      .loading {
        color: var(--emby-secondary-text);
        padding: 24px 0;
        text-align: center;
      }
    `],customElements.define(le,Re),window.customCards=window.customCards||[],window.customCards.push({type:le,name:"Emby Meets Home Assistant",preview:!1,description:"Browse and play your Emby libraries from a Netflix-style card."});export{Re as EmbyMeetsHomeAssistant};
