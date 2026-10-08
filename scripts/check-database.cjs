require('dotenv').config({path:'.env',quiet:true});
const {Client}=require('pg');
const url=new URL(process.env.POSTGRES_URL_NON_POOLING);url.searchParams.set('sslmode','verify-full');
const client=new Client({connectionString:url.toString(),connectionTimeoutMillis:15000});
(async()=>{try{await client.connect();const result=await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");console.log(JSON.stringify({connected:true,tables:result.rows.map(r=>r.table_name)}));}catch(e){console.log(JSON.stringify({connected:false,code:e.code??'connection_failed',reason:e.message?.replace(/postgres(?:ql)?:\/\/\S+/g,'[conexão]')}));process.exitCode=1;}finally{await client.end()}})();
