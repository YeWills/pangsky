(function(){var e={782:function(e,t,n){"use strict";const{PassThrough:r}=n(781);e.exports=e=>{e={...e};const{array:t}=e;let{encoding:n}=e;const o=n==="buffer";let i=false;if(t){i=!(n||o)}else{n=n||"utf8"}if(o){n=null}const s=new r({objectMode:i});if(n){s.setEncoding(n)}let a=0;const c=[];s.on("data",(e=>{c.push(e);if(i){a=c.length}else{a+=e.length}}));s.getBufferedValue=()=>{if(t){return c}return o?Buffer.concat(c,a):c.join("")};s.getBufferedLength=()=>a;return s}},981:function(e,t,n){"use strict";const{constants:r}=n(300);const o=n(781);const{promisify:i}=n(837);const s=n(782);const a=i(o.pipeline);class MaxBufferError extends Error{constructor(){super("maxBuffer exceeded");this.name="MaxBufferError"}}async function getStream(e,t){if(!e){throw new Error("Expected a stream")}t={maxBuffer:Infinity,...t};const{maxBuffer:n}=t;const o=s(t);await new Promise(((t,i)=>{const rejectPromise=e=>{if(e&&o.getBufferedLength()<=r.MAX_LENGTH){e.bufferedData=o.getBufferedValue()}i(e)};(async()=>{try{await a(e,o);t()}catch(e){rejectPromise(e)}})();o.on("data",(()=>{if(o.getBufferedLength()>n){rejectPromise(new MaxBufferError)}}))}));return o.getBufferedValue()}e.exports=getStream;e.exports.buffer=(e,t)=>getStream(e,{...t,encoding:"buffer"});e.exports.array=(e,t)=>getStream(e,{...t,array:true});e.exports.MaxBufferError=MaxBufferError},853:function(e,t,n){"use strict";const{PassThrough:r}=n(781);e.exports=function(){var e=[];var t=new r({objectMode:true});t.setMaxListeners(0);t.add=add;t.isEmpty=isEmpty;t.on("unpipe",remove);Array.prototype.slice.call(arguments).forEach(add);return t;function add(n){if(Array.isArray(n)){n.forEach(add);return this}e.push(n);n.once("end",remove.bind(null,n));n.once("error",t.emit.bind(t,"error"));n.pipe(t,{end:false});return this}function isEmpty(){return e.length==0}function remove(n){e=e.filter((function(e){return e!==n}));if(!e.length&&t.readable){t.end()}}}},580:function(e,t,n){var r=global.process;const processOk=function(e){return e&&typeof e==="object"&&typeof e.removeListener==="function"&&typeof e.emit==="function"&&typeof e.reallyExit==="function"&&typeof e.listeners==="function"&&typeof e.kill==="function"&&typeof e.pid==="number"&&typeof e.on==="function"};if(!processOk(r)){e.exports=function(){return function(){}}}else{var o=n(491);var i=n(357);var s=/^win/i.test(r.platform);var a=n(361);if(typeof a!=="function"){a=a.EventEmitter}var c;if(r.__signal_exit_emitter__){c=r.__signal_exit_emitter__}else{c=r.__signal_exit_emitter__=new a;c.count=0;c.emitted={}}if(!c.infinite){c.setMaxListeners(Infinity);c.infinite=true}e.exports=function(e,t){if(!processOk(global.process)){return function(){}}o.equal(typeof e,"function","a callback must be provided for exit handler");if(l===false){p()}var n="exit";if(t&&t.alwaysLast){n="afterexit"}var remove=function(){c.removeListener(n,e);if(c.listeners("exit").length===0&&c.listeners("afterexit").length===0){u()}};c.on(n,e);return remove};var u=function unload(){if(!l||!processOk(global.process)){return}l=false;i.forEach((function(e){try{r.removeListener(e,f[e])}catch(e){}}));r.emit=g;r.reallyExit=m;c.count-=1};e.exports.unload=u;var d=function emit(e,t,n){if(c.emitted[e]){return}c.emitted[e]=true;c.emit(e,t,n)};var f={};i.forEach((function(e){f[e]=function listener(){if(!processOk(global.process)){return}var t=r.listeners(e);if(t.length===c.count){u();d("exit",null,e);d("afterexit",null,e);if(s&&e==="SIGHUP"){e="SIGINT"}r.kill(r.pid,e)}}}));e.exports.signals=function(){return i};var l=false;var p=function load(){if(l||!processOk(global.process)){return}l=true;c.count+=1;i=i.filter((function(e){try{r.on(e,f[e]);return true}catch(e){return false}}));r.emit=y;r.reallyExit=b};e.exports.load=p;var m=r.reallyExit;var b=function processReallyExit(e){if(!processOk(global.process)){return}r.exitCode=e||0;d("exit",r.exitCode,null);d("afterexit",r.exitCode,null);m.call(r,r.exitCode)};var g=r.emit;var y=function processEmit(e,t){if(e==="exit"&&processOk(global.process)){if(t!==undefined){r.exitCode=t}var n=g.apply(this,arguments);d("exit",r.exitCode,null);d("afterexit",r.exitCode,null);return n}else{return g.apply(this,arguments)}}}},357:function(e){e.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"];if(process.platform!=="win32"){e.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT")}if(process.platform==="linux"){e.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")}},491:function(e){"use strict";e.exports=require("assert")},300:function(e){"use strict";e.exports=require("buffer")},361:function(e){"use strict";e.exports=require("events")},781:function(e){"use strict";e.exports=require("stream")},837:function(e){"use strict";e.exports=require("util")}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var o=t[n]={exports:{}};var i=true;try{e[n](o,o.exports,__nccwpck_require__);i=false}finally{if(i)delete t[n]}return o.exports}!function(){__nccwpck_require__.d=function(e,t){for(var n in t){if(__nccwpck_require__.o(t,n)&&!__nccwpck_require__.o(e,n)){Object.defineProperty(e,n,{enumerable:true,get:t[n]})}}}}();!function(){__nccwpck_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}();!function(){__nccwpck_require__.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})}}();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};!function(){"use strict";__nccwpck_require__.r(n);__nccwpck_require__.d(n,{execa:function(){return execa},execaCommand:function(){return execaCommand},execaCommandSync:function(){return execaCommandSync},execaNode:function(){return execaNode},execaSync:function(){return execaSync}});var e=require("buffer");var t=require("path");var r=require("child_process");var o=require("process");var i=require("@pskyjs/utils/compiled/cross-spawn");function stripFinalNewline(e){const t=typeof e==="string"?"\n":"\n".charCodeAt();const n=typeof e==="string"?"\r":"\r".charCodeAt();if(e[e.length-1]===t){e=e.slice(0,-1)}if(e[e.length-1]===n){e=e.slice(0,-1)}return e}var s=require("url");function pathKey(e={}){const{env:t=process.env,platform:n=process.platform}=e;if(n!=="win32"){return"PATH"}return Object.keys(t).reverse().find((e=>e.toUpperCase()==="PATH"))||"Path"}function npmRunPath(e={}){const{cwd:n=o.cwd(),path:r=o.env[pathKey()],execPath:i=o.execPath}=e;let a;const c=n instanceof URL?s.fileURLToPath(n):n;let u=t.resolve(c);const d=[];while(a!==u){d.push(t.join(u,"node_modules/.bin"));a=u;u=t.resolve(u,"..")}d.push(t.resolve(c,i,".."));return[...d,r].join(t.delimiter)}function npmRunPathEnv({env:e=o.env,...t}={}){e={...e};const n=pathKey({env:e});t.path=e[n];e[n]=npmRunPath(t);return e}const copyProperty=(e,t,n,r)=>{if(n==="length"||n==="prototype"){return}if(n==="arguments"||n==="caller"){return}const o=Object.getOwnPropertyDescriptor(e,n);const i=Object.getOwnPropertyDescriptor(t,n);if(!canCopyProperty(o,i)&&r){return}Object.defineProperty(e,n,i)};const canCopyProperty=function(e,t){return e===undefined||e.configurable||e.writable===t.writable&&e.enumerable===t.enumerable&&e.configurable===t.configurable&&(e.writable||e.value===t.value)};const changePrototype=(e,t)=>{const n=Object.getPrototypeOf(t);if(n===Object.getPrototypeOf(e)){return}Object.setPrototypeOf(e,n)};const wrappedToString=(e,t)=>`/* Wrapped ${e}*/\n${t}`;const a=Object.getOwnPropertyDescriptor(Function.prototype,"toString");const c=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name");const changeToString=(e,t,n)=>{const r=n===""?"":`with ${n.trim()}() `;const o=wrappedToString.bind(null,r,t.toString());Object.defineProperty(o,"name",c);Object.defineProperty(e,"toString",{...a,value:o})};function mimicFunction(e,t,{ignoreNonConfigurable:n=false}={}){const{name:r}=e;for(const r of Reflect.ownKeys(t)){copyProperty(e,t,r,n)}changePrototype(e,t);changeToString(e,t,r);return e}const u=new WeakMap;const onetime=(e,t={})=>{if(typeof e!=="function"){throw new TypeError("Expected a function")}let n;let r=0;const o=e.displayName||e.name||"<anonymous>";const onetime=function(...i){u.set(onetime,++r);if(r===1){n=e.apply(this,i);e=null}else if(t.throw===true){throw new Error(`Function \`${o}\` can only be called once`)}return n};mimicFunction(onetime,e);u.set(onetime,r);return onetime};onetime.callCount=e=>{if(!u.has(e)){throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`)}return u.get(e)};var d=onetime;var f=require("os");const getRealtimeSignals=function(){const e=p-l+1;return Array.from({length:e},getRealtimeSignal)};const getRealtimeSignal=function(e,t){return{name:`SIGRT${t+1}`,number:l+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}};const l=34;const p=64;const m=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:true},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:true},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:true},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];const getSignals=function(){const e=getRealtimeSignals();const t=[...m,...e].map(normalizeSignal);return t};const normalizeSignal=function({name:e,number:t,description:n,action:r,forced:o=false,standard:i}){const{signals:{[e]:s}}=f.constants;const a=s!==undefined;const c=a?s:t;return{name:e,number:c,description:n,supported:a,action:r,forced:o,standard:i}};const getSignalsByName=function(){const e=getSignals();return e.reduce(getSignalByName,{})};const getSignalByName=function(e,{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}}};const b=getSignalsByName();const getSignalsByNumber=function(){const e=getSignals();const t=p+1;const n=Array.from({length:t},((t,n)=>getSignalByNumber(n,e)));return Object.assign({},...n)};const getSignalByNumber=function(e,t){const n=findSignalByNumber(e,t);if(n===undefined){return{}}const{name:r,description:o,supported:i,action:s,forced:a,standard:c}=n;return{[e]:{name:r,number:e,description:o,supported:i,action:s,forced:a,standard:c}}};const findSignalByNumber=function(e,t){const n=t.find((({name:t})=>f.constants.signals[t]===e));if(n!==undefined){return n}return t.find((t=>t.number===e))};const g=getSignalsByNumber();const getErrorPrefix=({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:o,exitCode:i,isCanceled:s})=>{if(e){return`timed out after ${t} milliseconds`}if(s){return"was canceled"}if(n!==undefined){return`failed with ${n}`}if(r!==undefined){return`was killed with ${r} (${o})`}if(i!==undefined){return`failed with exit code ${i}`}return"failed"};const makeError=({stdout:e,stderr:t,all:n,error:r,signal:o,exitCode:i,command:s,escapedCommand:a,timedOut:c,isCanceled:u,killed:d,parsed:{options:{timeout:f}}})=>{i=i===null?undefined:i;o=o===null?undefined:o;const l=o===undefined?undefined:b[o].description;const p=r&&r.code;const m=getErrorPrefix({timedOut:c,timeout:f,errorCode:p,signal:o,signalDescription:l,exitCode:i,isCanceled:u});const g=`Command ${m}: ${s}`;const y=Object.prototype.toString.call(r)==="[object Error]";const x=y?`${g}\n${r.message}`:g;const h=[x,t,e].filter(Boolean).join("\n");if(y){r.originalMessage=r.message;r.message=h}else{r=new Error(h)}r.shortMessage=x;r.command=s;r.escapedCommand=a;r.exitCode=i;r.signal=o;r.signalDescription=l;r.stdout=e;r.stderr=t;if(n!==undefined){r.all=n}if("bufferedData"in r){delete r.bufferedData}r.failed=true;r.timedOut=Boolean(c);r.isCanceled=u;r.killed=d&&!c;return r};const y=["stdin","stdout","stderr"];const hasAlias=e=>y.some((t=>e[t]!==undefined));const normalizeStdio=e=>{if(!e){return}const{stdio:t}=e;if(t===undefined){return y.map((t=>e[t]))}if(hasAlias(e)){throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${y.map((e=>`\`${e}\``)).join(", ")}`)}if(typeof t==="string"){return t}if(!Array.isArray(t)){throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``)}const n=Math.max(t.length,y.length);return Array.from({length:n},((e,n)=>t[n]))};const normalizeStdioNode=e=>{const t=normalizeStdio(e);if(t==="ipc"){return"ipc"}if(t===undefined||typeof t==="string"){return[t,t,t,"ipc"]}if(t.includes("ipc")){return t}return[...t,"ipc"]};var x=require("os");var h=__nccwpck_require__(580);const S=1e3*5;const spawnedKill=(e,t="SIGTERM",n={})=>{const r=e(t);setKillTimeout(e,t,n,r);return r};const setKillTimeout=(e,t,n,r)=>{if(!shouldForceKill(t,n,r)){return}const o=getForceKillAfterTimeout(n);const i=setTimeout((()=>{e("SIGKILL")}),o);if(i.unref){i.unref()}};const shouldForceKill=(e,{forceKillAfterTimeout:t},n)=>isSigterm(e)&&t!==false&&n;const isSigterm=e=>e===x.constants.signals.SIGTERM||typeof e==="string"&&e.toUpperCase()==="SIGTERM";const getForceKillAfterTimeout=({forceKillAfterTimeout:e=true})=>{if(e===true){return S}if(!Number.isFinite(e)||e<0){throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)}return e};const spawnedCancel=(e,t)=>{const n=e.kill();if(n){t.isCanceled=true}};const timeoutKill=(e,t,n)=>{e.kill(t);n(Object.assign(new Error("Timed out"),{timedOut:true,signal:t}))};const setupTimeout=(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(t===0||t===undefined){return r}let o;const i=new Promise(((r,i)=>{o=setTimeout((()=>{timeoutKill(e,n,i)}),t)}));const s=r.finally((()=>{clearTimeout(o)}));return Promise.race([i,s])};const validateTimeout=({timeout:e})=>{if(e!==undefined&&(!Number.isFinite(e)||e<0)){throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)}};const setExitHandler=async(e,{cleanup:t,detached:n},r)=>{if(!t||n){return r}const o=h((()=>{e.kill()}));return r.finally((()=>{o()}))};function isStream(e){return e!==null&&typeof e==="object"&&typeof e.pipe==="function"}function isWritableStream(e){return isStream(e)&&e.writable!==false&&typeof e._write==="function"&&typeof e._writableState==="object"}function isReadableStream(e){return isStream(e)&&e.readable!==false&&typeof e._read==="function"&&typeof e._readableState==="object"}function isDuplexStream(e){return isWritableStream(e)&&isReadableStream(e)}function isTransformStream(e){return isDuplexStream(e)&&typeof e._transform==="function"}var w=__nccwpck_require__(981);var _=__nccwpck_require__(853);const handleInput=(e,t)=>{if(t===undefined||e.stdin===undefined){return}if(isStream(t)){t.pipe(e.stdin)}else{e.stdin.end(t)}};const makeAllStream=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr){return}const n=_();if(e.stdout){n.add(e.stdout)}if(e.stderr){n.add(e.stderr)}return n};const getBufferedData=async(e,t)=>{if(!e){return}e.destroy();try{return await t}catch(e){return e.bufferedData}};const getStreamPromise=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(!e||!n){return}if(t){return w(e,{encoding:t,maxBuffer:r})}return w.buffer(e,{maxBuffer:r})};const getSpawnedResult=async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:i},s)=>{const a=getStreamPromise(e,{encoding:r,buffer:o,maxBuffer:i});const c=getStreamPromise(t,{encoding:r,buffer:o,maxBuffer:i});const u=getStreamPromise(n,{encoding:r,buffer:o,maxBuffer:i*2});try{return await Promise.all([s,a,c,u])}catch(r){return Promise.all([{error:r,signal:r.signal,timedOut:r.timedOut},getBufferedData(e,a),getBufferedData(t,c),getBufferedData(n,u)])}};const validateInputSync=({input:e})=>{if(isStream(e)){throw new TypeError("The `input` option cannot be a stream in sync mode")}};const v=(async()=>{})().constructor.prototype;const I=["then","catch","finally"].map((e=>[e,Reflect.getOwnPropertyDescriptor(v,e)]));const mergePromise=(e,t)=>{for(const[n,r]of I){const o=typeof t==="function"?(...e)=>Reflect.apply(r.value,t(),e):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}return e};const getSpawnedPromise=e=>new Promise(((t,n)=>{e.on("exit",((e,n)=>{t({exitCode:e,signal:n})}));e.on("error",(e=>{n(e)}));if(e.stdin){e.stdin.on("error",(e=>{n(e)}))}}));const normalizeArgs=(e,t=[])=>{if(!Array.isArray(t)){return[e]}return[e,...t]};const C=/^[\w.-]+$/;const T=/"/g;const escapeArg=e=>{if(typeof e!=="string"||C.test(e)){return e}return`"${e.replace(T,'\\"')}"`};const joinCommand=(e,t)=>normalizeArgs(e,t).join(" ");const getEscapedCommand=(e,t)=>normalizeArgs(e,t).map((e=>escapeArg(e))).join(" ");const G=/ +/g;const parseCommand=e=>{const t=[];for(const n of e.trim().split(G)){const e=t[t.length-1];if(e&&e.endsWith("\\")){t[t.length-1]=`${e.slice(0,-1)} ${n}`}else{t.push(n)}}return t};const P=1e3*1e3*100;const getEnv=({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:i})=>{const s=t?{...o.env,...e}:e;if(n){return npmRunPathEnv({env:s,cwd:r,execPath:i})}return s};const handleArguments=(e,n,r={})=>{const s=i._parse(e,n,r);e=s.command;n=s.args;r=s.options;r={maxBuffer:P,buffer:true,stripFinalNewline:true,extendEnv:true,preferLocal:false,localDir:r.cwd||o.cwd(),execPath:o.execPath,encoding:"utf8",reject:true,cleanup:true,all:false,windowsHide:true,...r};r.env=getEnv(r);r.stdio=normalizeStdio(r);if(o.platform==="win32"&&t.basename(e,".exe")==="cmd"){n.unshift("/q")}return{file:e,args:n,options:r,parsed:s}};const handleOutput=(t,n,r)=>{if(typeof n!=="string"&&!e.Buffer.isBuffer(n)){return r===undefined?undefined:""}if(t.stripFinalNewline){return stripFinalNewline(n)}return n};function execa(e,t,n){const o=handleArguments(e,t,n);const i=joinCommand(e,t);const s=getEscapedCommand(e,t);validateTimeout(o.options);let a;try{a=r.spawn(o.file,o.args,o.options)}catch(e){const t=new r.ChildProcess;const n=Promise.reject(makeError({error:e,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:o,timedOut:false,isCanceled:false,killed:false}));return mergePromise(t,n)}const c=getSpawnedPromise(a);const u=setupTimeout(a,o.options,c);const f=setExitHandler(a,o.options,u);const l={isCanceled:false};a.kill=spawnedKill.bind(null,a.kill.bind(a));a.cancel=spawnedCancel.bind(null,a,l);const handlePromise=async()=>{const[{error:e,exitCode:t,signal:n,timedOut:r},c,u,d]=await getSpawnedResult(a,o.options,f);const p=handleOutput(o.options,c);const m=handleOutput(o.options,u);const b=handleOutput(o.options,d);if(e||t!==0||n!==null){const c=makeError({error:e,exitCode:t,signal:n,stdout:p,stderr:m,all:b,command:i,escapedCommand:s,parsed:o,timedOut:r,isCanceled:l.isCanceled||(o.options.signal?o.options.signal.aborted:false),killed:a.killed});if(!o.options.reject){return c}throw c}return{command:i,escapedCommand:s,exitCode:0,stdout:p,stderr:m,all:b,failed:false,timedOut:false,isCanceled:false,killed:false}};const p=d(handlePromise);handleInput(a,o.options.input);a.all=makeAllStream(a,o.options);return mergePromise(a,p)}function execaSync(e,t,n){const o=handleArguments(e,t,n);const i=joinCommand(e,t);const s=getEscapedCommand(e,t);validateInputSync(o.options);let a;try{a=r.spawnSync(o.file,o.args,o.options)}catch(e){throw makeError({error:e,stdout:"",stderr:"",all:"",command:i,escapedCommand:s,parsed:o,timedOut:false,isCanceled:false,killed:false})}const c=handleOutput(o.options,a.stdout,a.error);const u=handleOutput(o.options,a.stderr,a.error);if(a.error||a.status!==0||a.signal!==null){const e=makeError({stdout:c,stderr:u,error:a.error,signal:a.signal,exitCode:a.status,command:i,escapedCommand:s,parsed:o,timedOut:a.error&&a.error.code==="ETIMEDOUT",isCanceled:false,killed:a.signal!==null});if(!o.options.reject){return e}throw e}return{command:i,escapedCommand:s,exitCode:0,stdout:c,stderr:u,failed:false,timedOut:false,isCanceled:false,killed:false}}function execaCommand(e,t){const[n,...r]=parseCommand(e);return execa(n,r,t)}function execaCommandSync(e,t){const[n,...r]=parseCommand(e);return execaSync(n,r,t)}function execaNode(e,t,n={}){if(t&&!Array.isArray(t)&&typeof t==="object"){n=t;t=[]}const r=normalizeStdioNode(n);const i=o.execArgv.filter((e=>!e.startsWith("--inspect")));const{nodePath:s=o.execPath,nodeOptions:a=i}=n;return execa(s,[...a,e,...Array.isArray(t)?t:[]],{...n,stdin:undefined,stdout:undefined,stderr:undefined,stdio:r,shell:false})}}();module.exports=n})();