const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
const localFile=path.join(process.cwd(),'.env.local');
const contents=fs.existsSync(localFile)?fs.readFileSync(localFile,'utf8'):'';
const local=process.env.SGEE_LOCAL_PREVIEW==='true'||/^SGEE_LOCAL_PREVIEW=true\s*$/m.test(contents);
if(local){const value=contents.match(/^SGEE_LOCAL_DATABASE_URL=["']?([^"']+)["']?\s*$/m)?.[1];if(value)process.env.SGEE_LOCAL_DATABASE_URL=value.trim();}
const command=process.argv[2]||'generate';const args=command==='push'?['db','push']:['generate'];
const result=spawnSync(process.execPath,[require.resolve('prisma/build/index.js'),...args,'--schema',local?'prisma/schema.local.prisma':'prisma/schema.prisma'],{stdio:'inherit',env:process.env});
process.exit(result.status??1);
