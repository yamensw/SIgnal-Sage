import {env} from 'cloudflare:workers';
export function secret(){return (env as unknown as {ADMIN_PASSWORD?:string}).ADMIN_PASSWORD||''}
async function signature(value:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret()),{name:'HMAC',hash:'SHA-256'},false,['sign']);return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function issueSession(){const expires=String(Date.now()+86400000);return expires+'.'+await signature(expires)}
export async function authorized(req:Request){if(!secret())return false;const value=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('sage_admin='))?.slice(11);if(!value)return false;const [expires,sig]=value.split('.');return Number(expires)>Date.now()&&sig===await signature(expires)}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
export async function guarded(req:Request){return sameOrigin(req)&&await authorized(req)}