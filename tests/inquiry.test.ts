import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queueInquiry, safePage } from '../src/lib/inquiry-submit';
import { acceptInquiry, deliverInquiry, drainInquiries, type Store, type Inquiry, SAFE_EMAIL_RETRY_MS } from '../src/lib/inquiry-delivery';
import { inquiryStorageOptions } from '../src/lib/inquiry-store';
import { authorized } from '../src/lib/inquiry-auth';
const id='5f0e1d2c-3b4a-4968-8776-5a4b3c2d1e0f';
const crm={url:'https://crm.example.test/intake',source:'fixture-source',token:'fixture'};
const input={id,fingerprintPayload:{name:'Test'},email:{from:'sender@example.test',to:['owner@example.test'],subject:'Test',text:'Test',html:'Test'},crmPayload:{name:'Test',phone:'6365550100',message:'Test'}};
function memory(){const data=new Map<string,unknown>(); const store:Store={async read<T>(key:string){return structuredClone(data.get(key)??null) as T|null},async create<T>(key:string,value:T){if(!data.has(key))data.set(key,structuredClone(value));return structuredClone(data.get(key)) as T},async remove(key){data.delete(key)},async list(){return {keys:[...data.keys()].filter(k=>k.includes('/pending/'))}}};return {store,data}}

test('durable intake and provider retry guarantees',async t=>{
 const env={...process.env}, originalFetch=globalThis.fetch;
 Object.assign(process.env,{RESEND_API_KEY:'fixture',CRM_INTAKE_ENABLED:'true',CRM_INTAKE_URL:crm.url,CRM_INTAKE_SOURCE:crm.source,CRM_INTAKE_TOKEN:crm.token,INQUIRY_BLOB_STORE_ID:'store_private_fixture',CRON_SECRET:'fixture'});
 delete process.env.VERCEL_ENV;
 let emailDown=false,crmDown=false,lostAck=false;
 let calls=0;const emails=new Map<string,unknown>(),inquiries=new Map<string,unknown>();
 globalThis.fetch=async(url,options)=>{calls++; const body=JSON.parse(String(options?.body));if(String(url).includes('resend.com')){if(emailDown)return Response.json({}, {status:503});const key=(options?.headers as Record<string,string>)['Idempotency-Key'];emails.set(key,body);if(lostAck)throw Error('timeout');return Response.json({id:'mail-fixture'});}if(crmDown)return Response.json({}, {status:503});inquiries.set(body.submission_id,body);return Response.json({ok:true});};
 async function submit(store:Store, value=input){const jobs:Array<()=>Promise<void>>=[];const result=await queueInquiry(value,job=>jobs.push(job),store);for(const job of jobs)await job();return result;}
 try {
 await t.test('saved success, duplicate browser requests and concurrent workers do not duplicate delivery',async()=>{const {store,data}=memory();emails.clear();inquiries.clear();await Promise.all([submit(store),submit(store)]);await drainInquiries(store,crm);assert.equal(emails.size,1);assert.equal(inquiries.size,1);assert.ok(![...data.keys()].some(k=>k.includes('/pending/')||k.includes('/delivery/')));const before=calls;await submit(store);assert.equal(calls,before);});
 await t.test('CRM failure recovers without resending accepted email',async()=>{const {store}=memory();emails.clear();inquiries.clear();crmDown=true;await submit(store);crmDown=false;await drainInquiries(store,crm);assert.equal(emails.size,1);assert.equal(inquiries.size,1);});
 await t.test('email failure still saves CRM and a later worker recovers',async()=>{const {store}=memory();emails.clear();inquiries.clear();emailDown=true;await submit(store);assert.equal(inquiries.size,1);emailDown=false;await drainInquiries(store,crm);assert.equal(emails.size,1);});
 await t.test('lost provider acknowledgement reuses the immutable idempotency key',async()=>{const {store}=memory();emails.clear();lostAck=true;await submit(store);lostAck=false;await drainInquiries(store,crm);assert.equal(emails.size,1);});
 await t.test('storage failure cannot report success or call providers',async()=>{const {store}=memory();store.create=async()=>{throw Error('down')};const before=calls;await assert.rejects(submit(store));assert.equal(calls,before);});
 await t.test('same ID changed payload rejected',async()=>{const {store}=memory();await submit(store);await assert.rejects(submit(store,{...input,fingerprintPayload:{name:'Changed'}}));});
 await t.test('source change cannot send an old pending inquiry to another client',async()=>{const {store}=memory();crmDown=true;await submit(store);crmDown=false;const before=calls;assert.equal(await deliverInquiry(store,id,{...crm,source:'wrong'}),'attention');assert.equal(calls,before);});
 await t.test('uncertain email held after provider idempotency window',async()=>{const {store,data}=memory();lostAck=true;await submit(store);lostAck=false;const before=emails.size;assert.equal(await deliverInquiry(store,id,crm,Date.now()+SAFE_EMAIL_RETRY_MS+1000),'attention');assert.equal(emails.size,before);assert.ok(data.has(`inquiries/v1/pending/${id}.json`));});
 await t.test('preview blocks storage, email, CRM even when configured',async()=>{const {store,data}=memory();process.env.VERCEL_ENV='preview';const before=calls;assert.equal(await submit(store),true);assert.equal(data.size,0);assert.equal(calls,before);delete process.env.VERCEL_ENV;});
 await t.test('incomplete enabled configuration fails closed',async()=>{const {store}=memory();delete process.env.CRM_INTAKE_TOKEN;await assert.rejects(submit(store));process.env.CRM_INTAKE_TOKEN=crm.token;});
 await t.test('visualizer lead survives crash before rendering; fallback waits and then delivers',async()=>{const {store}=memory();emails.clear();await submit(store,{...input,emailReadyAt:Date.now()+180000} as typeof input);assert.equal(emails.size,0);assert.equal(await deliverInquiry(store,id,crm,Date.now()+181000),'complete');assert.equal(emails.size,1);});
 await t.test('render enrichment used once, late changes cannot alter email on retry',async()=>{const {store}=memory();emails.clear();await submit(store,{...input,emailReadyAt:Date.now()+180000} as typeof input);await store.create(`inquiries/v1/enriched/${id}.json`,{email:{...input.email,subject:'Rendered'}});lostAck=true;await deliverInquiry(store,id,crm);lostAck=false;await store.remove(`inquiries/v1/enriched/${id}.json`);await store.create(`inquiries/v1/enriched/${id}.json`,{email:{...input.email,subject:'Late change'}});await deliverInquiry(store,id,crm);assert.equal(emails.size,1);assert.equal((Array.from(emails.values())[0] as {subject:string}).subject,'Rendered');});
 await t.test('private outbox explicitly selects its own store even alongside public images',()=>{process.env.BLOB_STORE_ID='store_public_images';assert.equal(inquiryStorageOptions().storeId,'store_private_fixture');});
 await t.test('scheduler authorization and URL privacy',()=>{assert.equal(authorized('Bearer wrong','correct'),false);assert.equal(authorized('Bearer correct','correct'),true);assert.equal(safePage('https://example.test/contact?email=private#section'),'https://example.test/contact');assert.equal(safePage('javascript:alert(1)'),null);});
 }finally{globalThis.fetch=originalFetch;for(const key of Object.keys(process.env))if(!(key in env))delete process.env[key];Object.assign(process.env,env)}
});
