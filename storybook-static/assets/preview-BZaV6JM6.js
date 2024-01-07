import{_ as a}from"./iframe-DzJHxz7n.js";var i=Object.defineProperty,s=(e,r)=>{for(var t in r)i(e,t,{get:r[t],enumerable:!0})},_={};s(_,{parameters:()=>d});var p=Object.entries(globalThis.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),d={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-CFRXHY34-DXSNqxJI.js").then(r=>r.D),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>p[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{d as parameters};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./DocsRenderer-CFRXHY34-DXSNqxJI.js","./iframe-DzJHxz7n.js","./index-yBBFVILh.js","./jsx-runtime-BjG_zV1W.js","./react-18-DkxpHe4L.js","./index-CZRLl98W.js","./index-DrFu-skq.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
