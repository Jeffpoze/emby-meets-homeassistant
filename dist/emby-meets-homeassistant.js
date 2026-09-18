/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,y=u?u.emptyScript:"",g=m.reactiveElementPolyfillSupport,f=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!n(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??b)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[f("elementProperties")]=new Map,v[f("finalized")]=new Map,g?.({ReactiveElement:v}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,S=w.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,T=document,U=()=>T.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,M=/>/g,D=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,q=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),j=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,V=T.createTreeWalker(T,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<s;e++){const s=t[e];let n,l,h=-1,c=0;for(;c<s.length&&(a.lastIndex=c,l=a.exec(s),null!==l);)c=a.lastIndex,a===R?"!--"===l[1]?a=H:void 0!==l[1]?a=M:void 0!==l[2]?(z.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=r??R,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?D:'"'===l[3]?q:L):a===q||a===L?a=D:a===H||a===M?a=R:(a=D,r=void 0);const d=a===D&&t[e+1].startsWith("/>")?" ":"";o+=a===R?s+P:h>=0?(i.push(n),s.slice(0,h)+I+s.slice(h)+E+d):s+E+(-2===h?e:d)}return[K(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,h]=Y(t,e);if(this.el=G.createElement(l,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(I)){const e=h[o++],s=i.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),V.nextNode(),n.push({type:2,index:++r});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===j)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=k(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);V.currentNode=i;let r=V.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Z(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new it(r,this,t)),this._$AV.push(e),n=s[++a]}o!==n?.index&&(r=V.nextNode(),o++)}return V.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),k(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Z(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const i=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=J(this,i[s+a],e,a),n===j&&(n=this._$AH[a]),o||=!k(n)||n!==this._$AH[a],n===W?t=W:t!==W&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??W)===j)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(G,Z),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Z(e.insertBefore(U(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const nt=ot.litElementPolyfillSupport;nt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const lt="emby-meets-homeassistant",ht="emby-meets-homeassistant-editor",ct={CONTINUE_WATCHING:"Continue Watching",NEXT_UP:"Next Up",RECENTLY_ADDED:"Recently Added"},dt="http";class pt extends Error{constructor(t,e,s){super(t),this.status=e,this.url=s,this.name="EmbyRequestError"}}const mt="Overview,Genres,ProductionYear,CommunityRating,OfficialRating,RunTimeTicks,SeriesId,SeriesName,SeasonId,ParentIndexNumber,IndexNumber,People,Studios,BackdropImageTags";function ut(t){return{id:t.Id,name:t.Name,type:t.Type,overview:t.Overview,productionYear:t.ProductionYear,communityRating:t.CommunityRating,officialRating:t.OfficialRating,runTimeTicks:t.RunTimeTicks,genres:t.Genres,seriesId:t.SeriesId,seriesName:t.SeriesName,seasonId:t.SeasonId,parentIndexNumber:t.ParentIndexNumber,indexNumber:t.IndexNumber,userData:t.UserData&&{played:t.UserData.Played,playbackPositionTicks:t.UserData.PlaybackPositionTicks,playedPercentage:t.UserData.PlayedPercentage,unplayedItemCount:t.UserData.UnplayedItemCount},imageTags:t.ImageTags,backdropImageTags:t.BackdropImageTags,people:t.People,studios:t.Studios}}function yt(t){return{id:t.Id,deviceId:t.DeviceId,deviceName:t.DeviceName,client:t.Client,userId:t.UserId,supportsRemoteControl:!!t.SupportsRemoteControl,playableMediaTypes:t.PlayableMediaTypes||[],nowPlayingItem:t.NowPlayingItem?ut(t.NowPlayingItem):void 0}}function gt(t){return{id:t.Id,name:t.Name,channelId:t.ChannelId,startDate:t.StartDate,endDate:t.EndDate,overview:t.Overview}}class ft{constructor(t,e,s,i){this.host=t,this.port=e,this.protocol=s,this.apiKey=i}baseUrl(){const t=this.port?`:${this.port}`:"";return`${this.protocol}://${this.host}${t}/emby`}buildUrl(t,e={}){const s=new URL(`${this.baseUrl()}${t}`);return Object.entries(e).forEach(([t,e])=>{null!=e&&""!==e&&s.searchParams.set(t,String(e))}),s.toString()}async request(t,e,s){const i=this.buildUrl(t,e),r=await fetch(i,{...s,headers:{"X-Emby-Token":this.apiKey,"Content-Type":"application/json",...s?.headers||{}}});if(!r.ok)throw new pt(`Emby request failed: ${r.status} ${r.statusText}`,r.status,i);if(204===r.status)return;const o=await r.text();return o?JSON.parse(o):void 0}async getUsers(){return(await this.request("/Users")).map(t=>({id:t.Id,name:t.Name}))}async getViews(t){return(await this.request(`/Users/${t}/Views`)).Items.map(t=>({id:t.Id,name:t.Name,collectionType:t.CollectionType}))}async getItems(t,e={}){return(await this.request(`/Users/${t}/Items`,{ParentId:e.parentId,IncludeItemTypes:e.includeItemTypes,Recursive:e.recursive??!0,SortBy:e.sortBy,SortOrder:e.sortOrder,Limit:e.limit,Fields:e.fields??mt})).Items.map(ut)}async getItem(t,e){return ut(await this.request(`/Users/${t}/Items/${e}`,{Fields:mt}))}async getResume(t,e={}){return(await this.request(`/Users/${t}/Items/Resume`,{Limit:e.limit??50,Recursive:!0,MediaTypes:"Video",ParentId:e.parentId,Fields:mt})).Items.map(ut)}async getNextUp(t,e={}){return(await this.request("/Shows/NextUp",{UserId:t,Limit:e.limit??50,Fields:mt})).Items.map(ut)}async getLatest(t,e={}){return(await this.request(`/Users/${t}/Items/Latest`,{Limit:e.limit??50,ParentId:e.parentId,Fields:mt})).map(ut)}async getSeasons(t,e){return(await this.request(`/Shows/${t}/Seasons`,{UserId:e,Fields:mt})).Items.map(ut)}async getEpisodes(t,e,s){return(await this.request(`/Shows/${t}/Episodes`,{UserId:e,SeasonId:s,Fields:mt})).Items.map(ut)}async getCollections(t){return this.getItems(t,{includeItemTypes:"BoxSet"})}async getPlaylistItems(t,e){return(await this.request(`/Playlists/${t}/Items`,{UserId:e,Fields:mt})).Items.map(ut)}async getLiveTvChannels(t){return(await this.request("/LiveTv/Channels",{UserId:t,Fields:mt})).Items.map(ut)}async getEpg(t){return(await this.request("/LiveTv/EPG",{ChannelIds:t.join(",")})).Items.map(gt)}async getSessions(t){return(await this.request("/Sessions",{ControllableByUserId:t})).map(yt)}imageUrl(t,e="Primary",s={}){return this.buildUrl(`/Items/${t}/Images/${e}`,{maxWidth:s.maxWidth,maxHeight:s.maxHeight,tag:s.tag,quality:s.quality??90,api_key:this.apiKey})}streamUrl(t){return this.buildUrl(`/Videos/${t}/stream`,{Static:!0,api_key:this.apiKey})}async playbackInfo(t,e){return this.request(`/Items/${t}/PlaybackInfo`,{UserId:e},{method:"POST"})}async playOnSession(t,e,s={}){await this.request(`/Sessions/${t}/Playing`,{ItemIds:e.join(","),PlayCommand:"PlayNow",StartPositionTicks:s.startPositionTicks},{method:"POST"})}async sendPlaystateCommand(t,e,s){await this.request(`/Sessions/${t}/Playing/${e}`,{SeekPositionTicks:s},{method:"POST"})}}function _t(t){return t.startsWith("media_player.")}class bt{constructor(t,e,s){this.hass=t,this.emby=e,this.devices=s}setHass(t){this.hass=t}async resolveTarget(){if(!this.devices?.length)return null;let t;for(const e of this.devices){if(_t(e)){const t=this.hass.states[e];if(t&&"unavailable"!==t.state&&"unknown"!==t.state)return{kind:"cast",entityId:e,label:t.attributes?.friendly_name||e};continue}t||(t=await this.emby.getSessions());const s=t.find(t=>t.supportsRemoteControl&&(t.deviceName?.toLowerCase()===e.toLowerCase()||t.client?.toLowerCase()===e.toLowerCase()));if(s)return{kind:"session",sessionId:s.id,label:s.deviceName||s.client}}return null}async runScript(t){if(!t)return;const e=t.split(".")[0];await this.hass.callService(e,"turn_on",{entity_id:t})}async play(t,e,s={}){s.runBefore&&await this.runScript(s.runBefore),"cast"===e.kind&&e.entityId?await this.hass.callService("media_player","play_media",{entity_id:e.entityId,media_content_id:this.emby.streamUrl(t.id),media_content_type:"Audio"===t.type?"music":"video"}):"session"===e.kind&&e.sessionId&&await this.emby.playOnSession(e.sessionId,[t.id]),s.runAfter&&await this.runScript(s.runAfter)}async command(t,e,s){if("cast"===t.kind&&t.entityId){const s={Pause:"media_pause",Unpause:"media_play",Stop:"media_stop"}[e];return void(s&&await this.hass.callService("media_player",s,{entity_id:t.entityId}))}"session"===t.kind&&t.sessionId&&await this.emby.sendPlaystateCommand(t.sessionId,e,s)}}function $t(t,e,s){const i=t.trim().replace(/\/+$/,"");if(/^https?:\/\//i.test(i)){const t=new URL(i);return{protocol:t.protocol.replace(":",""),host:t.hostname,port:t.port?Number(t.port):void 0}}return{protocol:e,host:i,port:s}}const vt=o`
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
`;class wt extends at{constructor(){super(...arguments),this.imageUrl="",this.canPlay=!1}onClick(){this.dispatchEvent(new CustomEvent("emby-select",{detail:this.item,bubbles:!0,composed:!0}))}onPlayClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("emby-play",{detail:this.item,bubbles:!0,composed:!0}))}render(){const t=this.item?.userData?.playedPercentage,e=this.item?.userData?.unplayedItemCount;return B`
      <div class="tile" style="background-image:url(${this.imageUrl})" @click=${this.onClick} tabindex="0">
        ${this.canPlay?B`<div class="play" @click=${this.onPlayClick}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>`:W}
        ${e?B`<div class="badge">${e}</div>`:W}
        ${t?B`<div class="progress"><div style="width:${t}%"></div></div>`:W}
      </div>
      <div class="title">${this.item?.name}</div>
      ${this.item?.productionYear?B`<div class="meta">${this.item.productionYear}</div>`:W}
    `}}wt.properties={item:{type:Object},imageUrl:{type:String,attribute:"image-url"},canPlay:{type:Boolean,attribute:"can-play"}},wt.styles=[vt,o`
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
    `],customElements.define("emby-poster-card",wt);class xt extends at{constructor(){super(...arguments),this.rowTitle="",this.items=[],this.horizontal=!1,this.minWidth=150,this.getImageUrl=()=>"",this.canPlay=()=>!0}render(){const t=`--row-min-width:${this.minWidth}px`;return B`
      ${this.rowTitle?B`<h2>${this.rowTitle}</h2>`:""}
      <div class="${this.horizontal?"carousel":"grid"}" style=${t}>
        ${this.items.map(t=>B`
            <emby-poster-card
              .item=${t}
              image-url=${this.getImageUrl(t)}
              ?can-play=${this.canPlay(t)}
            ></emby-poster-card>
          `)}
      </div>
    `}}xt.properties={rowTitle:{type:String,attribute:"row-title"},items:{type:Array},horizontal:{type:Boolean},minWidth:{type:Number,attribute:"min-width"},getImageUrl:{attribute:!1},canPlay:{attribute:!1}},xt.styles=[vt,o`
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
    `],customElements.define("emby-poster-grid",xt);class St extends at{constructor(){super(...arguments),this.value="",this.emit=function(t,e){let s;return(...i)=>{s&&clearTimeout(s),s=setTimeout(()=>t(...i),e)}}(t=>{this.dispatchEvent(new CustomEvent("emby-search",{detail:t,bubbles:!0,composed:!0}))},200)}onInput(t){const e=t.target.value;this.emit(e)}render(){return B`<input type="text" placeholder="Search…" .value=${this.value} @input=${this.onInput} />`}}St.properties={value:{type:String}},St.styles=[vt,o`
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
    `],customElements.define("emby-search-bar",St);class At extends at{constructor(){super(...arguments),this.userId="",this.canPlay=!1,this._seasons=[],this._episodes=[]}updated(t){t.has("item")&&"Series"===this.item?.type&&this._loadSeasons()}async _loadSeasons(){this._seasons=await this.emby.getSeasons(this.item.id,this.userId),this._seasons.length&&this._selectSeason(this._seasons[0].id)}async _selectSeason(t){this._selectedSeasonId=t,this._episodes=await this.emby.getEpisodes(this.item.id,this.userId,t)}_play(t=this.item){this.dispatchEvent(new CustomEvent("emby-play",{detail:t,bubbles:!0,composed:!0}))}_close(){this.dispatchEvent(new CustomEvent("emby-close",{bubbles:!0,composed:!0}))}render(){if(!this.item)return W;const t=this.item.genres?.join(", ");return B`
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
            ${this.item.runTimeTicks?B`<span>${function(t){const e=Math.round(function(t){return t?t/1e7:0}(t)/60);if(!e)return"";const s=Math.floor(e/60),i=e%60;return s&&i?`${s}h ${i}m`:s?`${s}h`:`${i}m`}(this.item.runTimeTicks)}</span>`:W}
          </div>
          ${this.item.overview?B`<div class="overview">${this.item.overview}</div>`:W}
          ${t?B`<div class="meta-row">Genres: ${t}</div>`:W}
          <button class="play-button" ?disabled=${!this.canPlay} @click=${()=>this._play()}>▶ Play</button>
        </div>
      </div>
      ${this._seasons.length?B`
            <div class="season-tabs">
              ${this._seasons.map(t=>B`
                  <button
                    class=${t.id===this._selectedSeasonId?"active":""}
                    @click=${()=>this._selectSeason(t.id)}
                  >
                    ${t.name}
                  </button>
                `)}
            </div>
            <emby-poster-grid
              .items=${this._episodes}
              .getImageUrl=${t=>this.emby.imageUrl(t.id,"Primary",{maxWidth:300})}
              .canPlay=${()=>this.canPlay}
              min-width="220"
              @emby-select=${t=>this._play(t.detail)}
              @emby-play=${t=>this._play(t.detail)}
            ></emby-poster-grid>
          `:W}
    `}}At.properties={item:{type:Object},emby:{attribute:!1},userId:{type:String},canPlay:{type:Boolean,attribute:"can-play"},_seasons:{state:!0},_episodes:{state:!0},_selectedSeasonId:{state:!0}},At.styles=[vt,o`
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
    `],customElements.define("emby-detail-panel",At);const It=[{name:"host",required:!0,selector:{text:{}}},{name:"port",selector:{number:{mode:"box"}}},{name:"protocol",selector:{select:{options:["http","https"],mode:"dropdown"}}},{name:"apiKey",required:!0,selector:{text:{}}}];class Et extends at{constructor(){super(...arguments),this._users=[],this._views=[]}setConfig(t){this._config={...t},this._refreshServerData()}async _refreshServerData(){if(this._config?.host&&this._config?.apiKey)try{const{protocol:t,host:e,port:s}=$t(this._config.host,this._config.protocol??dt,this._config.port??8096),i=new ft(e,s,t,this._config.apiKey);this._users=await i.getUsers(),this._config.userId&&(this._views=await i.getViews(this._config.userId))}catch{}}_valueChanged(t){const e={...this._config,...t.detail.value};this._config=e,this._fireChanged(),this._refreshServerData()}_fieldChanged(t,e){this._config={...this._config,[t]:e},this._fireChanged(),this._refreshServerData()}_fireChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){if(!this._config)return W;const t=[...Object.values(ct),...this._views.map(t=>t.name)];return B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${It}
        .computeLabel=${t=>t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"userId",required:!0,selector:{select:{mode:"dropdown",options:this._users.map(t=>({value:t.id,label:t.name}))}}}]}
        .computeLabel=${()=>"Emby user"}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"libraryName",required:!0,selector:t.length?{select:{mode:"dropdown",options:t,custom_value:!0}}:{text:{}}}]}
        .computeLabel=${()=>"Library"}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-textfield
        label="Devices (comma-separated: media_player.* entities for Cast, or Emby device/client names)"
        .value=${(this._config.devices??[]).join(", ")}
        @change=${t=>this._fieldChanged("devices",t.target.value.split(",").map(t=>t.trim()).filter(Boolean))}
        style="display:block;margin-top:16px;width:100%;"
      ></ha-textfield>

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"title",selector:{text:{}}},{name:"showSearch",selector:{boolean:{}}},{name:"showExtras",selector:{boolean:{}}},{name:"playTrailer",selector:{boolean:{}}},{name:"useHorizontalScroll",selector:{boolean:{}}},{name:"minWidth",selector:{number:{mode:"box"}}},{name:"sort",selector:{text:{}}},{name:"sortOrder",selector:{select:{options:["Ascending","Descending"],mode:"dropdown"}}},{name:"maxCount",selector:{number:{mode:"box"}}},{name:"runBefore",selector:{entity:{domain:"script"}}},{name:"runAfter",selector:{entity:{domain:"script"}}}]}
        .computeLabel=${t=>t.name}
        @value-changed=${this._valueChanged}
        style="display:block;margin-top:16px;"
      ></ha-form>
    `}}Et.properties={hass:{attribute:!1},_config:{state:!0},_users:{state:!0},_views:{state:!0}},customElements.define(ht,Et);const Ct={movies:"Movie",tvshows:"Series",music:"MusicAlbum",musicvideos:"MusicVideo",homevideos:"Video",books:"Book"};class Pt extends at{constructor(){super(...arguments),this._items=[],this._rowTitle="",this._searchTerm="",this._loading=!0,this._error="",this._getImageUrl=t=>this.emby.imageUrl(t.id,"Primary",{maxWidth:2*(this._config.minWidth??150)}),this._canPlay=()=>!!this._config.devices?.length}setConfig(t){if(!t.host)throw new Error('emby-meets-homeassistant: "host" is required');if(!t.apiKey)throw new Error('emby-meets-homeassistant: "apiKey" is required');if(!t.userId)throw new Error('emby-meets-homeassistant: "userId" is required');if(!t.libraryName)throw new Error('emby-meets-homeassistant: "libraryName" is required');this._config={protocol:dt,showSearch:!0,showExtras:!0,minWidth:150,useHorizontalScroll:!0,...t};const{protocol:e,host:s,port:i}=$t(this._config.host,this._config.protocol??dt,this._config.port??8096);this.emby=new ft(s,i,e,this._config.apiKey),this.playController=new bt(this.hass,this.emby,this._config.devices??[]),this._loadData()}getCardSize(){return 5}static getConfigElement(){return document.createElement(ht)}static getStubConfig(){return{host:"192.168.1.50",apiKey:"",userId:"",libraryName:"Movies"}}willUpdate(t){t.has("hass")&&this.playController&&this.playController.setHass(this.hass)}async _loadData(){this._loading=!0,this._error="";try{const{libraryName:t,userId:e}=this._config;if(Object.values(ct).includes(t))this._rowTitle=this._config.title??t,t===ct.CONTINUE_WATCHING?this._items=await this.emby.getResume(e,{limit:this._config.maxCount}):t===ct.NEXT_UP?this._items=await this.emby.getNextUp(e,{limit:this._config.maxCount}):t===ct.RECENTLY_ADDED&&(this._items=await this.emby.getLatest(e,{limit:this._config.maxCount}));else{const s=await this.emby.getViews(e);if(this.view=s.find(e=>e.name===t),!this.view)throw new Error(`Library "${t}" not found on this Emby server`);this._rowTitle=this._config.title??this.view.name,this._items=await this.emby.getItems(e,{parentId:this.view.id,includeItemTypes:this.view.collectionType?Ct[this.view.collectionType]:void 0,sortBy:this._config.sort,sortOrder:this._config.sortOrder,limit:this._config.maxCount})}}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}async _onSelect(t){this._selectedItem=t.detail,this._selectedItemFull=await this.emby.getItem(this._config.userId,t.detail.id)}_onClose(){this._selectedItem=void 0,this._selectedItemFull=void 0}async _onPlay(t){const e=t.detail,s=await this.playController.resolveTarget();s?await this.playController.play(e,s,{runBefore:this._config.runBefore,runAfter:this._config.runAfter}):this._error="No configured device is currently available to play on."}get _filteredItems(){return this._searchTerm?this._items.filter(t=>function(t,...e){const s=t.trim().toLowerCase();if(!s)return!0;const i=s.split(/\s+/).filter(Boolean),r=e.filter(Boolean).join(" ").toLowerCase();return i.every(t=>r.includes(t))}(this._searchTerm,t.name,t.seriesName,t.genres?.join(" "))):this._items}render(){return B`
      <ha-card>
        <div class="header">
          <div class="title">${this._rowTitle||this._config?.title||""}</div>
          ${this._config?.showSearch?B`<div class="search-wrap">
                <emby-search-bar @emby-search=${t=>this._searchTerm=t.detail}></emby-search-bar>
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
    `}}Pt.properties={hass:{attribute:!1},_config:{state:!0},_items:{state:!0},_rowTitle:{state:!0},_selectedItem:{state:!0},_selectedItemFull:{state:!0},_searchTerm:{state:!0},_loading:{state:!0},_error:{state:!0}},Pt.styles=[vt,o`
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
    `],customElements.define(lt,Pt),window.customCards=window.customCards||[],window.customCards.push({type:lt,name:"Emby Meets Home Assistant",preview:!1,description:"Browse and play your Emby libraries from a Netflix-style card."});export{Pt as EmbyMeetsHomeAssistant};
