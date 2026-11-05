import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'docs/commerce-insights');
const names=['index.html','cases.html','app.js','cases.js','casebook.js','metrics.js','style.css','ga4-aggregates.json'];
assert.deepEqual(fs.readdirSync(dir).sort(),[...names].sort(),'Only the approved eight public assets may be published.');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const dataBytes=fs.readFileSync(path.join(dir,'ga4-aggregates.json'));
assert.equal(hash(dataBytes),'9c4d625af773c54a5cfd23a321dc9cffdca1891c5db7df6eaee4a48dfd1698e3','Public aggregate must match the verified export.');
const data=JSON.parse(dataBytes);
assert.deepEqual(Object.keys(data).sort(),['monthly','products','attributes','attribute_quality','daily','quality','metadata'].sort());
assert.equal(data.metadata.days,92);assert.equal(data.metadata.event_rows,4295584);
assert.equal(data.daily.length,92);assert.equal(data.monthly.length,3);
assert.equal(data.monthly.reduce((n,r)=>n+r.events,0),4295584);
assert.equal(data.monthly.reduce((n,r)=>n+r.purchase_revenue_usd,0),362165);
const forbiddenKeys=/^(user_pseudo_id|user_id|session_id|ga_session_id|transaction_id|event_timestamp|page_location|email|tenant_id|subject_id|owner_subject|api_key|access_token)$/i;
function inspect(value){if(!value||typeof value!=='object')return;for(const [key,item]of Object.entries(value)){assert(!forbiddenKeys.test(key),'Raw/private field: '+key);inspect(item);}}
inspect(data);
let bytes=0;
for(const name of names){
 const file=path.join(dir,name);assert(fs.lstatSync(file).isFile(),'Symlinks and directories are not public assets');
 const source=fs.readFileSync(file,'utf8');bytes+=Buffer.byteLength(source);
 assert(!/sk-proj-|A_ONLY_BLUE|B_ONLY_ORANGE|fixture-[ab]-|owner_subject|OPENAI_API_KEY|BEGIN PRIVATE KEY|\/Users\//.test(source),'Private content in '+name);
 assert(!/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(source),'Personal email in '+name);
 if(name.endsWith('.js')){
  assert(!/XMLHttpRequest|sendBeacon|WebSocket|EventSource|serviceWorker|localStorage|sessionStorage|document\.cookie|document\.write|innerHTML\s*=|insertAdjacentHTML|eval\s*\(|new\s+Function/.test(source),'Unapproved network/storage/HTML execution in '+name);
  for(const match of source.matchAll(/fetch\(([^)]+)\)/g))assert.equal(match[1].trim(),"'ga4-aggregates.json'",'Only the same-origin public JSON may be fetched');
  assert(!/https?:\/\/(?!www\.w3\.org\/2000\/svg)/.test(source),'No external script/API URLs');
 }
 if(name.endsWith('.html')){
  assert(source.includes('http-equiv="Content-Security-Policy"'));
  for(const token of ["script-src 'self'","connect-src 'self'","form-action 'none'","object-src 'none'","base-uri 'none'"])assert(source.includes(token),'CSP directive absent: '+token);
  assert(source.includes('name="referrer" content="no-referrer"'));
  assert(!/<(?:form|iframe|object|embed)\b|\son[a-z]+\s*=|javascript:/i.test(source),'No forms/embeds/inline handlers');
  assert(!/<script\b[^>]*>\s*[^<\s]/i.test(source),'No inline scripts');
  for(const match of source.matchAll(/(?:href|src)="([^"]+)"/g)){
   const link=match[1];if(link==='#'||link.startsWith('#')||link==='../'||link==='data:,')continue;
   if(link.startsWith('https://')){assert.equal(link,'https://developers.google.com/analytics/bigquery/web-ecommerce-demo-dataset');continue;}
   assert(names.includes(link),'Unpublished or external asset link: '+link);
  }
 }
}
assert(bytes<2_000_000,'The public demo should remain under 2 MB');
const require=createRequire(import.meta.url),book=require('../docs/commerce-insights/casebook.js');
const cases=book.build(data);assert.equal(cases.length,6);assert.equal(new Set(cases.map(c=>c.id)).size,6);
for(const c of cases){assert(c.facts.length);for(const f of c.facts)assert(f.value===null||Number.isFinite(f.value));}
console.log(JSON.stringify({approved_assets:names.length,bytes,aggregate_sha256:hash(dataBytes),cases:cases.length,raw_or_private_fields:'absent',external_api_tracking_or_input_submission:'absent'}));
