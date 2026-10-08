import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';
const globalDb=globalThis as unknown as {sgeePrisma?:PrismaClient};
function connection(){const url=new URL(process.env.POSTGRES_PRISMA_URL??'postgresql://localhost/sgee');url.searchParams.set('sslmode','verify-full');return url.toString();}
export const db=globalDb.sgeePrisma??new PrismaClient(process.env.SGEE_LOCAL_PREVIEW==='true'?undefined:{adapter:new PrismaPg({connectionString:connection(),connectionTimeoutMillis:15000})});
if(process.env.NODE_ENV!=='production')globalDb.sgeePrisma=db;
