import {cookies} from 'next/headers';
import {randomBytes,createHash,scryptSync,timingSafeEqual} from 'node:crypto';
import {db} from './db';
export function hashPassword(value:string){const salt=randomBytes(16).toString('hex');return 'scrypt:'+salt+':'+scryptSync(value,salt,64).toString('hex');}
export function verifyPassword(value:string,stored:string){if(!stored.startsWith('scrypt:')){const a=Buffer.from(value);const b=Buffer.from(stored);return a.length===b.length&&timingSafeEqual(a,b);}const [,salt,hash]=stored.split(':');if(!salt||!hash)return false;const a=scryptSync(value,salt,64);const b=Buffer.from(hash,'hex');return a.length===b.length&&timingSafeEqual(a,b);}
export function tokenHash(value:string){return createHash('sha256').update(value).digest('hex');}
export async function currentAccount(){const token=(await cookies()).get('sgee_session')?.value;if(!token)return null;const session=await db.session.findUnique({where:{tokenHash:tokenHash(token)},include:{account:true}});if(!session||session.expiresAt<new Date()||!session.account.active)return null;return session.account;}
export async function requireAccount(write=false,admin=false){const account=await currentAccount();if(!account)throw new Error('Sua sessão terminou. Entre novamente.');if(write&&account.passwordChangeRequired)throw new Error('Troque sua senha em Configurações antes de alterar registros.');if(admin&&account.role!=='ADMIN')throw new Error('Esta ação é exclusiva do administrador.');if(write&&account.role==='VIEWER')throw new Error('Seu perfil permite somente consulta.');return account;}
export async function createSession(email:string){const token=randomBytes(32).toString('hex');const expiresAt=new Date(Date.now()+8*60*60*1000);await db.session.create({data:{tokenHash:tokenHash(token),accountEmail:email,expiresAt}});(await cookies()).set('sgee_session',token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',expires:expiresAt});}



