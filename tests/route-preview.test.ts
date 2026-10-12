import {test} from 'node:test';
import assert from 'node:assert/strict';
import {POST as contact} from '../src/app/api/contact/route';
test('API forms are isolated in preview and preserve success contracts',async()=>{
 const original=globalThis.fetch;process.env.VERCEL_ENV='preview';globalThis.fetch=async()=>{throw Error('Unexpected network side effect')};
 try {for(const [handler,body] of [[contact,{name:'Fixture',email:'test@example.test',phone:'6365550100',message:'Test'}]] as const){const response=await handler(new Request('https://example.test/api/form',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true,preview:true});}}finally{globalThis.fetch=original;delete process.env.VERCEL_ENV}
});
