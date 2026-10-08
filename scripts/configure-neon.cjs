const fs=require('node:fs');
const raw=fs.readFileSync('.env','utf8');
const matches=raw.match(/postgres(?:ql)?:\/\/[^\s"'\x60]+/g);
if(!matches?.length)throw new Error('Nenhuma conexão PostgreSQL encontrada.');
const connection=matches[matches.length-1];const direct=new URL(connection);direct.hostname=direct.hostname.replace('-pooler.','.');const pooled=new URL(connection);if(!pooled.hostname.includes('-pooler.'))pooled.hostname=pooled.hostname.replace('.','-pooler.');
direct.searchParams.set('sslmode','require');pooled.searchParams.set('sslmode','require');
const remaining=raw.split(/\r?\n/).filter(line=>!line.includes('postgres://')&&!line.includes('postgresql://')&&!/^\s*POSTGRES_(PRISMA_URL|URL_NON_POOLING)\s*=/.test(line));
fs.writeFileSync('.env',remaining.join('\n').trim()+'\nPOSTGRES_PRISMA_URL="'+pooled.toString()+'"\nPOSTGRES_URL_NON_POOLING="'+direct.toString()+'"\n');
console.log('Conexões com e sem pooling configuradas. Credenciais não exibidas.');
