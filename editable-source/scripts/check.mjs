import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname,join,extname} from 'node:path';
import {cases} from '../src/cases.js';
const root=resolve('dist');
const walk=p=>readdirSync(p).flatMap(n=>{const q=join(p,n);return statSync(q).isDirectory()?walk(q):[q]});
const files=walk(root),pages=files.filter(p=>p.endsWith('.html')),errors=[];
const ids=s=>[...s.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const path of pages){
 const html=readFileSync(path,'utf8'),pageIds=ids(html);
 {
  if(html.includes('undefined')||html.includes('{{'))errors.push(`${path}: unresolved content`);
  const duplicates=pageIds.filter((id,i)=>pageIds.indexOf(id)!==i);
  if(duplicates.length)errors.push(`${path}: duplicate IDs ${duplicates}`);
  for(const ref of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g))for(const id of ref[1].split(/\s+/))if(!pageIds.includes(id))errors.push(`${path}: missing ARIA target ${id}`);
 }
 // SVG <use> references: inline symbols on the page, or the shared logo sprite.
 for(const u of html.matchAll(/<use href="([^"#]*)#([^"]+)"/g)){const file=u[1]?join(root,u[1]):path;if(!existsSync(file)||!readFileSync(file,'utf8').includes(`id="${u[2]}"`))errors.push(`${path}: missing symbol ${u[1]}#${u[2]}`);}
 for(const link of html.matchAll(/<(?:a|link|script)\b[^>]*?(?:href|src)="([^"]+)"/g)){
  if(/^[a-z][a-z\d+.-]*:|^\/\//i.test(link[1]))continue;
  const [url,fragment]=link[1].split('#');const pathname=url.split('?')[0];
  let target=pathname?(pathname.startsWith('/')?join(root,decodeURIComponent(pathname)):resolve(dirname(path),decodeURIComponent(pathname))):path;
  if(existsSync(target)&&statSync(target).isDirectory())target=join(target,'index.html');
  if(!existsSync(target)){errors.push(`${path}: missing ${link[1]}`);continue;}
  if(fragment&&extname(target)==='.html'&&!ids(readFileSync(target,'utf8')).includes(fragment))errors.push(`${path}: missing fragment ${link[1]}`);
 }
}
for(const c of cases){
 const path=join(root,'work',c.slug,'index.html');
 if(!existsSync(path)){errors.push(`Missing case route: ${c.slug}`);continue;}
 const html=readFileSync(path,'utf8');
 if(!html.includes('prior experience'))errors.push(`${c.slug}: missing attribution to prior team experience`);
 for(const metric of c.metrics)for(const value of [metric.value,metric.label,metric.note])if(!html.includes(esc(value)))errors.push(`${c.slug}: missing metric or qualification`);
}
// Verify the supplied interactive export's entire relative module closure.
for(const p of files.filter(p=>p.endsWith('.js'))){
 const js=readFileSync(p,'utf8');
 for(const match of js.matchAll(/(?:from\s*|import\s*\(?\s*)["'](\.{1,2}\/[^"']+)["']/g)){
  const target=resolve(dirname(p),match[1].split('?')[0]);
  if(!existsSync(target))errors.push(`${p}: missing imported module ${match[1]}`);
 }
}
// Client request: the homepage must not mention Zoho anywhere (copy, links or metadata).
const homeHtml=readFileSync(join(root,'index.html'),'utf8');
if(/zoho/i.test(homeHtml))errors.push('index.html: the homepage mentions Zoho');
for(const required of ['services/index.html','business-anatomy/index.html'])if(!existsSync(join(root,required)))errors.push(`Missing page: ${required}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${pages.length} HTML pages, ${cases.length} detailed case studies, local routes, asset/module links (including dynamic imports), fragments, SVG symbol references, ARIA references, original metric qualifiers, and a Zoho-free homepage.`);
console.log('Browser layout and runtime interaction QA remain separate checks.');
