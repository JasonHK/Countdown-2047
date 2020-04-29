!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=12)}({12:function(e,t,s){"use strict";s.r(t);try{self["workbox:core:4.3.1"]&&_()}catch(e){}const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class r extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const i=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:self.registration.scope},o=e=>[a.prefix,e,a.suffix].filter(e=>e.length>0).join("-"),c=e=>{Object.keys(a).forEach(t=>{void 0!==e[t]&&(a[t]=e[t])})},u=e=>e||o(a.precache),l=e=>e||o(a.runtime),h=e=>{const t=new URL(e,location);return t.origin===location.origin?t.pathname:t.href};const p="cacheDidUpdate",d="cacheKeyWillBeUsed",f="cacheWillUpdate",g="cachedResponseWillBeUsed",m="fetchDidFail",w="fetchDidSucceed",y="requestWillFetch",v=(e,t)=>e.filter(e=>t in e),q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const i=await caches.open(e),a=await R({plugins:r,request:t,mode:"read"});let o=await i.match(a,n);for(const t of r)g in t&&(o=await t[g].call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:o,request:a}));return o},O=async({request:e,response:t,event:s,plugins:n})=>{let r=t,i=!1;for(let t of n)if(f in t&&(i=!0,r=await t[f].call(t,{request:e,response:r,event:s}),!r))break;return i||(r=200===r.status?r:null),r||null},R=async({request:e,mode:t,plugins:s})=>{const n=v(s,d);let r=e;for(const e of n)r=await e[d].call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},b={put:async({cacheName:e,request:t,response:s,event:n,plugins:a=[],matchOptions:o}={})=>{const c=await R({plugins:a,request:t,mode:"write"});if(!s)throw new r("cache-put-with-no-response",{url:h(c.url)});let u=await O({event:n,plugins:a,response:s,request:c});if(!u)return void 0;const l=await caches.open(e),d=v(a,p);let f=d.length>0?await q({cacheName:e,matchOptions:o,request:c}):null;try{await l.put(c,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of i)await e()}(),e}for(let t of d)await t[p].call(t,{cacheName:e,event:n,oldResponse:f,newResponse:u,request:c})},match:q};class N{constructor(e,t,{onupgradeneeded:s,onversionchange:n=this._onversionchange}={}){this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n,this._db=null}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),e.target.result.close()):this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=({target:t})=>{const n=t.result;s?n.close():(n.onversionchange=this._onversionchange.bind(this),e(n))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(({key:e})=>e)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:r,includeKeys:i}={}){return await this.transaction([e],"readonly",(a,o)=>{const c=a.objectStore(e),u=t?c.index(t):c,l=[];u.openCursor(s,n).onsuccess=({target:e})=>{const t=e.result;if(t){const{primaryKey:e,key:s,value:n}=t;l.push(i?{primaryKey:e,key:s,value:n}:n),r&&l.length>=r?o(l):t.continue()}else o(l)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,r)=>{const i=this._db.transaction(e,t);i.onabort=({target:e})=>r(e.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,r)=>{s.objectStore(t)[e](...n).onsuccess=({target:e})=>{r(e.result)}})}_onversionchange(){this.close()}close(){this._db&&(this._db.close(),this._db=null)}}N.prototype.OPEN_TIMEOUT=2e3;const k={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(k))for(const s of t)s in IDBObjectStore.prototype&&(N.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const x=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if(s&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}"string"==typeof e&&(e=new Request(e));const i=v(n,m),a=i.length>0?e.clone():null;try{for(let t of n)y in t&&(e=await t[y].call(t,{request:e.clone(),event:s}))}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}let o=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)w in e&&(r=await e[w].call(e,{event:s,request:o,response:r}));return r}catch(e){0;for(const t of i)await t[m].call(t,{error:e,event:s,originalRequest:a.clone(),request:o.clone()});throw e}};try{self.workbox.v=self.workbox.v||{}}catch(e){}try{self["workbox:precaching:4.3.1"]&&_()}catch(e){}const T=[],U={get:()=>T,add(e){T.push(...e)}};function C(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location),i=new URL(s,location);return i.searchParams.set("__WB_REVISION__",t),{cacheKey:i.href,url:n.href}}class L{constructor(e){this._cacheName=u(e),this._urlsToCacheKeys=new Map}addToCacheList(e){for(const t of e){const{cacheKey:e,url:s}=C(t);if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});this._urlsToCacheKeys.set(s,e)}}async install({event:e,plugins:t}={}){const s=[],n=[],r=await caches.open(this._cacheName),i=await r.keys(),a=new Set(i.map(e=>e.url));for(const e of this._urlsToCacheKeys.values())a.has(e)?n.push(e):s.push(e);const o=s.map(s=>this._addURLToCache({event:e,plugins:t,url:s}));return await Promise.all(o),{updatedURLs:s,notUpdatedURLs:n}}async activate(){const e=await caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}async _addURLToCache({url:e,event:t,plugins:s}){const n=new Request(e,{credentials:"same-origin"});let i,a=await x({event:t,plugins:s,request:n});for(const e of s||[])"cacheWillUpdate"in e&&(i=e.cacheWillUpdate.bind(e));if(!(i?i({event:t,request:n,response:a}):a.status<400))throw new r("bad-precaching-response",{url:e,status:a.status});a.redirected&&(a=await async function(e){const t=e.clone(),s="body"in t?Promise.resolve(t.body):t.blob(),n=await s;return new Response(n,{headers:t.headers,status:t.status,statusText:t.statusText})}(a)),await b.put({event:t,plugins:s,request:n,response:a,cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location);return this._urlsToCacheKeys.get(t.href)}}let K;const E=()=>(K||(K=new L),K);const j=e=>{const t=E(),s=U.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},P=e=>{const t=E(),s=U.get();e.waitUntil(t.activate({event:e,plugins:s}))},S=e=>{E().addToCacheList(e),e.length>0&&(addEventListener("install",j),addEventListener("activate",P))};try{self["workbox:routing:4.3.1"]&&_()}catch(e){}const F=e=>e&&"object"==typeof e?e:{handle:e};class M{constructor(e,t,s){this.handler=F(t),this.match=e,this.method=s||"GET"}}class W extends M{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);return s?t.origin!==location.origin&&0!==s.index?null:s.slice(1):null},t,s)}}class A{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",async e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&(await s,e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location);if(!s.protocol.startsWith("http"))return void 0;let n,{params:r,route:i}=this.findMatchingRoute({url:s,request:e,event:t}),a=i&&i.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),a){try{n=a.handle({url:s,request:e,event:t,params:r})}catch(e){n=Promise.reject(e)}return n&&this._catchHandler&&(n=n.catch(e=>this._catchHandler.handle({url:s,event:t,err:e}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n,i=r.match({url:e,request:t,event:s});if(i)return(Array.isArray(i)&&i.length>0||i.constructor===Object&&Object.keys(i).length>0)&&(n=i),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=F(e)}setCatchHandler(e){this._catchHandler=F(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new r("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new r("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let H;const I=()=>(H||(H=new A,H.addFetchListener(),H.addCacheListener()),H),D=(e,t,s="GET")=>{let n;if("string"==typeof e){const r=new URL(e,location);0,n=new M(({url:e})=>e.href===r.href,t,s)}else if(e instanceof RegExp)n=new W(e,t,s);else if("function"==typeof e)n=new M(e,t,s);else{if(!(e instanceof M))throw new r("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return I().registerRoute(n),n};try{self["workbox:strategies:4.3.1"]&&_()}catch(e){}const B={cacheWillUpdate:({response:e})=>200===e.status||0===e.status?e:null};class G{constructor(e={}){if(this._cacheName=l(e.cacheName),this._plugins=e.plugins||[],e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[B,...e.plugins]}else this._plugins=[B];this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,i=await b.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{i=await s}catch(e){n=e}}if(!i)throw new r("no-response",{url:t.url,error:n});return i}async _getFromNetwork({request:e,event:t}){const s=await x({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=b.put({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}const J={cacheFirst:class{constructor(e={}){this._cacheName=l(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await b.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new r("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await x({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),r=b.put({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(r)}catch(e){0}return s}},cacheOnly:class{constructor(e={}){this._cacheName=l(e.cacheName),this._plugins=e.plugins||[],this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=await b.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(!s)throw new r("no-response",{url:t.url});return s}},networkFirst:class{constructor(e={}){if(this._cacheName=l(e.cacheName),e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[B,...e.plugins]}else this._plugins=[B];this._networkTimeoutSeconds=e.networkTimeoutSeconds,this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let i;if(this._networkTimeoutSeconds){const{id:r,promise:a}=this._getTimeoutPromise({request:t,event:e,logs:s});i=r,n.push(a)}const a=this._getNetworkPromise({timeoutId:i,request:t,event:e,logs:s});n.push(a);let o=await Promise.race(n);if(o||(o=await a),!o)throw new r("no-response",{url:t.url});return o}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let r,i;try{i=await x({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){r=e}if(e&&clearTimeout(e),r||!i)i=await this._respondFromCache({request:t,event:n});else{const e=i.clone(),s=b.put({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return i}_respondFromCache({event:e,request:t}){return b.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}},networkOnly:class{constructor(e={}){this._cacheName=l(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){let s,n;"string"==typeof t&&(t=new Request(t));try{n=await x({request:t,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){s=e}if(!n)throw new r("no-response",{url:t.url,error:s});return n}},staleWhileRevalidate:G},Q=e=>{const t=J[e];return e=>new t(e)};Q("cacheFirst"),Q("cacheOnly"),Q("networkFirst"),Q("networkOnly"),Q("staleWhileRevalidate");c({prefix:"Countdown2047",suffix:"2019.12.30",precache:"Precache",runtime:"Runtime"}),S(["./","./index.html","./favicon.ico","./manifest.json","./2047.js","./2047.css","./icons/favicon-16.png","./icons/favicon-32.png","./icons/icon-192.png","./icons/icon-512.png","./icons/safari.svg"]);var V=new G({matchOptions:{ignoreSearch:!0}});D("./",V),D("./index.html",V),D("./favicon.ico",V),D("./manifest.json",V),D(new RegExp("/[^/]*\\.js","i"),V),D(new RegExp("/[^/]*\\.css","i"),V),D(new RegExp("/icons/[^/]*\\.(png|svg)","i"),V),D(new RegExp("/fonts/[^/]*\\.(ttf|woff2)","i"),V)}});