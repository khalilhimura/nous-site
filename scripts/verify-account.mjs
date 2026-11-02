import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';
const cwd=process.cwd();
const evidence=process.env.ACCOUNT_EVIDENCE_DIR || '/tmp/nous-build-evidence'; await fs.mkdir(evidence,{recursive:true});
const profile=await fs.mkdtemp(path.join(os.tmpdir(),'nous-browser-'));
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.ttf':'font/ttf','.png':'image/png','.ico':'image/x-icon','.txt':'text/plain'};
let server;
let baseUrl=process.env.ACCOUNT_BASE_URL;
if(!baseUrl){
 server=http.createServer(async(req,res)=>{try {
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname.endsWith('/'))pathname+='index.html';
  let file=path.resolve(cwd,'out','.'+pathname);
  if(!file.startsWith(path.join(cwd,'out')+path.sep))throw Error('Invalid path');
  let data;
  try{data=await fs.readFile(file);}catch(error){
   if(!['ENOENT','EISDIR'].includes(error.code)||path.extname(file))throw error;
   file+='.html';data=await fs.readFile(file);
  }
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 baseUrl=`http://127.0.0.1:${server.address().port}`;
}
const browser=spawn(process.env.BROWSER_EXECUTABLE || '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
let ws; let next=0; const pending=new Map(); const errors=[]; const results=[];
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function assert(value,message){if(!value)throw Error(message); results.push(message);}
try {
 let debug;
 for(let i=0;i<100;i++){try{debug=await fs.readFile(path.join(profile,'DevToolsActivePort'),'utf8');break;}catch{await wait(100);}}
 if(!debug)throw Error('Browser did not expose debugging port');
 const debugPort=Number(debug.split('\n')[0]);
 const tabs=await fetch(`http://127.0.0.1:${debugPort}/json/list`).then(r=>r.json());
 ws=new WebSocket(tabs[0].webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p.reject(Error(JSON.stringify(m.error)));else p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const click=async text=>evaluate(`(()=>{const e=[...document.querySelectorAll('button,a,summary')].find(e=>(e.textContent.trim()===${JSON.stringify(text)}||e.getAttribute('aria-label')===${JSON.stringify(text)})&&e.getBoundingClientRect().height>0);if(!e)throw Error('Missing control: '+${JSON.stringify(text)});e.focus();e.click();return true})()`);
 const shot=async name=>{const s=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(evidence,name+'.png'),Buffer.from(s.data,'base64'));};
 const resize=async(width,height)=>{await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await wait(80);};
 const navigate=async suffix=>{
  await send('Page.navigate',{url:new URL('/'+suffix,baseUrl).href});
  if(suffix===''){
   let running=false;
   for(let i=0;i<150&&!running;i++){
    running=await evaluate("window.__accountHeroObserved||[...document.querySelectorAll('[data-entrance]')].some(e=>e.getAnimations().some(a=>a.playState==='running'))");
    if(!running)await wait(20);
   }
   assert(running,'Hero entrance observed running in the browser');
  }
  await wait(300);await evaluate('document.fonts.ready');await wait(150);
 };
 await send('Page.enable');await send('Runtime.enable');
 // Record running entrances from document creation so protocol round trips
 // cannot miss an animation that completed before the first external poll.
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`
  window.__accountHeroObserved=false;
  const deadline=performance.now()+10000;
  const observeHero=()=>{
   window.__accountHeroObserved=[...document.querySelectorAll('[data-entrance]')].some(e=>e.getAnimations().some(a=>a.playState==='running'));
   if(!window.__accountHeroObserved&&performance.now()<deadline)requestAnimationFrame(observeHero);
  };requestAnimationFrame(observeHero);
 `});
 await resize(1505,1045);
 await navigate('');
 assert(await evaluate("document.querySelector('h1')?.textContent==='NOUSACCOUNT'"),'Account page renders Nous Account');
 const fontState=await evaluate(`(()=>({checks:[document.fonts.check('400 48px "Dela Gothic One"'),document.fonts.check('400 16px "Zen Kaku Gothic New"'),document.fonts.check('500 16px "Zen Kaku Gothic New"')],faces:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status}))}))()`);
 await fs.writeFile(path.join(evidence,'fonts.json'),JSON.stringify(fontState,null,2));
 assert(fontState.checks.every(Boolean)&&[['Dela Gothic One','400'],['Zen Kaku Gothic New','400'],['Zen Kaku Gothic New','500']].every(([family,weight])=>fontState.faces.some(f=>f.family.replace(/['"]/g,'')===family&&f.weight===weight&&f.status==='loaded')),'All three approved font files load at actual family and weight');
 assert(await evaluate("document.querySelectorAll('[data-entrance-started=true]').length===3"),'Hero entrance is wired to all three intended groups');
 await shot('entry-desktop');
 await click('Open menu');await wait(80);await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait(50);assert(await evaluate("!document.getElementById('account-menu')&&document.activeElement.getAttribute('aria-label')==='Open menu'"),'Escape closes navigation and restores toggle focus');
 await click('Preview email sign-in');assert(await evaluate("document.querySelector('#email-error')?.textContent==='Enter a valid email address.'"),'Email validation exposes associated error');
 await evaluate(`(()=>{const e=document.getElementById('sign-in-email');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,'alex@example.com');e.dispatchEvent(new Event('input',{bubbles:true}));})()`);await wait(80);await click('Preview email sign-in');await wait(100);
 assert(await evaluate("document.body.textContent.includes('Demo email link')"),'Email preview never claims real delivery');
 await click('View expired-link example');await wait(80);assert(await evaluate("document.body.textContent.includes('This link has expired')"),'Expired-link recovery is reachable');
 await click('Request another link');await wait(80);await click('Preview Google sign-in');await wait(80);assert(await evaluate("document.body.textContent.includes('Google sign-in example')"),'Google example does not impersonate authentication');
 await click('Cancel');await wait(80);await click('Explore demo account');await wait(250);
 assert(await evaluate("document.querySelectorAll('main section').length===4"),'Demo exposes all four planned compositions');
 assert(await evaluate("document.querySelector('.desktop-nav a[aria-current]')?.textContent==='Account'"),'Account overview is identified as the current navigation destination');
 await click('Open menu');await click('Data controls');await wait(150);
 assert(await evaluate("document.activeElement.id==='data_controls'"),'Data controls navigation moves keyboard focus to its destination');
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
 assert(await evaluate("document.activeElement.tagName==='SUMMARY'&&document.activeElement.closest('section').id==='data_controls'"),'Tab continues from the data controls destination to its first disclosure');
 await click('Account');await wait(150);
 await shot('overview-desktop');
 await click('Edit profile');await wait(200);await shot('workspace-desktop');
 await click('Security');await wait(100);await evaluate('history.back()');await wait(150);
 assert(await evaluate("document.getElementById('task-heading').textContent==='Profile'"),'Browser back restores the previous account task');
 await evaluate('history.forward()');await wait(150);
 assert(await evaluate("document.getElementById('task-heading').textContent==='Security'&&document.querySelector('.desktop-nav a[aria-current]')?.textContent==='Security'"),'Browser forward restores task content and selected navigation together');
 await click('Profile');await wait(100);
 await evaluate(`(()=>{const e=document.getElementById('profile-name');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,'Alex Example Edited');e.dispatchEvent(new Event('input',{bubbles:true}));})()`);await wait(80);
 await click('Security');await wait(100);await click('Profile');await wait(100);assert(await evaluate("document.getElementById('profile-name').value==='Alex Example Edited'"),'Profile drafts survive view changes');
 await click('Save profile');await wait(80);assert(await evaluate("document.body.textContent.includes('Demo profile updated.')"),'Profile changes update only the demo model');
 await click('Security');await wait(80);await click('Connect Google');await wait(80);assert(await evaluate("document.querySelector('dialog').open"),'Linking uses an accessible modal review');await click('Cancel');
 await click('Credits');await wait(80);await click('Review top-up');await wait(80);assert(await evaluate("document.querySelector('dialog').textContent.includes('No top-up options are available.')"),'Credits do not invent commercial offers');await click('Close');
 await click('Billing');await wait(80);await click('Review billing');await wait(80);await click('Close');
 await evaluate("document.getElementById('data_controls').scrollIntoView()");await wait(200);await shot('data-desktop');
 await click('Review export');await wait(100);await click('Preview export');await wait(80);assert(await evaluate("document.body.textContent.includes('No private records were downloaded.')"),'Data controls create a local preview only');await click('Cancel');
 await click('Delete account');await wait(80);await click('Review account deletion');await wait(80);await click('Preview deletion request');await wait(80);assert(await evaluate("document.body.textContent.includes('No account was changed.')"),'Deletion preview makes no destructive changes');await click('Cancel');
 // History can unmount the workspace without going through its exit dialog.
 await navigate('');await click('Explore demo account');await wait(150);
 await evaluate(`(()=>{const e=document.getElementById('profile-name');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,'Unsaved draft');e.dispatchEvent(new Event('input',{bubbles:true}));})()`);await wait(80);
 assert(await evaluate("(()=>{const e=new Event('beforeunload',{cancelable:true});window.dispatchEvent(e);return e.defaultPrevented})()"),'An edited demo profile sets the unsaved-change guard');
 await evaluate('history.back()');await wait(150);
 assert(await evaluate("!document.querySelector('.workspace-frame')&&(()=>{const e=new Event('beforeunload',{cancelable:true});window.dispatchEvent(e);return !e.defaultPrevented})()"),'Leaving the demo through history clears its unsaved-change guard');
 await evaluate("document.querySelector('.wordmark').click()");await wait(80);
 assert(await evaluate("!document.querySelector('dialog')"),'Entry navigation does not show a discarded-draft warning');
 await click('Explore demo account');await wait(150);
 assert(await evaluate("document.getElementById('profile-name').value==='Alex Example'&&(()=>{const e=new Event('beforeunload',{cancelable:true});window.dispatchEvent(e);return !e.defaultPrevented})()"),'A fresh demo starts with a clean profile and no stale exit guard');
 // All initially deferred groups must finish once and remain readable through scroll and resize.
 await navigate('?mode=demo');
 const pendingReveal=await evaluate("[...document.querySelectorAll('[data-reveal]')].some(e=>e.dataset.revealPlayed!=='true')");assert(pendingReveal,'Below-viewport reveals are prepared separately from visible content');
 await evaluate("document.getElementById('account_overview').scrollIntoView()");await wait(80);
 const moving=await evaluate("document.querySelectorAll('.destination-card')[0].getAnimations().some(a=>a.playState==='running')");
 const workspaceMovingEarly=await evaluate("document.querySelector('.workspace-frame').getAnimations().some(a=>a.playState==='running')"); assert(moving,'Overview reveal runs after scrolling');await wait(850);
 await evaluate("document.getElementById('account_workspace').scrollIntoView()");await wait(80);assert(workspaceMovingEarly || await evaluate("document.querySelector('.workspace-frame').getAnimations().some(a=>a.playState==='running')"),'Workspace has a distinct scroll entrance');
 await wait(650);
 await evaluate("document.querySelector('.data-disclosures details').scrollIntoView()");await wait(80);
 assert(await evaluate("document.querySelector('.data-disclosures details').getAnimations().some(a=>a.playState==='running')"),'Data disclosures have their planned scroll entrance');
 await wait(650);
 for(let i=0;i<2;i++){await evaluate('scrollTo(0,document.body.scrollHeight)');await wait(100);await evaluate('scrollTo(0,0)');await wait(100);}
 await wait(800);
 assert(await evaluate("[...document.querySelectorAll('[data-reveal]')].every(e=>e.dataset.revealPlayed==='true'&&Number(getComputedStyle(e).opacity)===1)"),'Rapid down/up scrolling twice leaves visited groups visible');
 const responsive=[];
 for(const width of [320,390,768,834,1440,1505]){
  await resize(width,width===1505?1045:844);
  for(const id of ['account_entry','account_overview','account_workspace','data_controls']){
   await evaluate(`document.getElementById('${id}').scrollIntoView()`);await wait(100);
   const audit=await evaluate(`(()=>({overflow:document.documentElement.scrollWidth>innerWidth,small:[...document.querySelectorAll('a,button,input,select,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&r.top<innerHeight&&r.bottom>0&&!e.matches('.skip-link')&&(r.width<43.9||r.height<43.9)}).map(e=>({text:e.textContent?.trim().slice(0,60)||e.id,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))}))()`);
   responsive.push({width,section:id,...audit});
   if(width===390||width===1505)await shot(`${id}-${width}`);
  }
 }
 await fs.writeFile(path.join(evidence,'responsive.json'),JSON.stringify(responsive,null,2));
 assert(responsive.every(r=>!r.overflow),'No horizontal overflow at 320, 390, 768, 834, 1440 and 1505px');
 assert(responsive.every(r=>r.small.length===0),'All visible clickable targets meet 44px hit areas');
 assert(await evaluate("[...document.querySelectorAll('[data-reveal]')].every(e=>e.dataset.revealPlayed==='true'&&e.getAnimations().length===0)"),'Resizing does not replay completed scroll entrances');
 await resize(390,844);
 for(const task of ['security','apps','credits','billing','profile']){
  await evaluate(`(()=>{const a=document.querySelector('.workspace-tabs a[href*="view=${task}"]');a.click()})()`);await wait(100);
  assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),`Mobile ${task} view has no horizontal overflow`);
 }
 await evaluate(`(()=>{const e=document.getElementById('profile-name');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,'A'.repeat(100));e.dispatchEvent(new Event('input',{bubbles:true}));})()`);await wait(80);
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Long profile identifiers wrap without viewport overflow');await click('Discard changes');
 await evaluate("document.querySelector('.account-end button').click()");await wait(150);
 await navigate('?mode=demo&view=profile#account_workspace');
 await resize(752,522);
 assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Effective 200 percent zoom width retains content without overflow');
 await shot('zoom-reflow');
 // Capture full section geometry at desktop and compact content widths.
 for(const width of [390,1505]){
  await resize(width,width===1505?1045:844);await navigate('?mode=demo');
  for(const id of ['account_entry','account_overview','account_workspace','data_controls']){
   for(const index of await evaluate(`Array.from(document.getElementById('${id}').querySelectorAll('[data-reveal]')).map((_,i)=>i)`)){await evaluate(`document.getElementById('${id}').querySelectorAll('[data-reveal]')[${index}].scrollIntoView()`);await wait(800);} await evaluate(`document.getElementById('${id}').scrollIntoView()`);await wait(850);
   const clip=await evaluate(`(()=>{const r=document.getElementById('${id}').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height,scale:1}})()`);
   const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});await fs.writeFile(path.join(evidence,`${id}-full-${width}.png`),Buffer.from(shot.data,'base64'));
  }
 }
 // Restore middle-position visibility, reduced motion before load and during playback.
 for(const width of [1440,390]){
  await resize(width,width===1440?1000:844);await navigate('?mode=demo#account_workspace');await wait(650);
  // Sample from document creation, not after an entrance could already have finished.
  const sampler=await send('Page.addScriptToEvaluateOnNewDocument',{source:`
   window.__accountReloadSamples=[];window.__accountReloadStop=false;
   const sample=()=>{
    const e=document.querySelector('.workspace-frame');
    if(e){const r=e.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)window.__accountReloadSamples.push({top:r.top,opacity:getComputedStyle(e).opacity,animations:e.getAnimations().length,scrollY});}
    if(!window.__accountReloadStop)requestAnimationFrame(sample);
   };requestAnimationFrame(sample);
  `});
  await send('Page.reload');await wait(100);
  for(let i=0;i<100;i++){
   if(await evaluate('window.__accountReloadSamples?.length>0'))break;
   await wait(50);
  }
  await wait(800);
  const samples=await evaluate('(()=>{window.__accountReloadStop=true;return window.__accountReloadSamples})()');
  await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:sampler.identifier});
  await fs.writeFile(path.join(evidence,`reload-samples-${width}.json`),JSON.stringify(samples,null,2));
  assert(samples?.length>0&&samples.every(s=>s.opacity==='1'&&s.animations===0&&s.scrollY>0),`Restored workspace stays visible from its first viewport frame at ${width}px`);
  for(let i=0;i<2;i++){await evaluate('scrollTo(0,document.body.scrollHeight)');await wait(100);await evaluate("document.getElementById('account_workspace').scrollIntoView()");await wait(100);}
  await resize(width===1440?1099:320,844);
  assert(await evaluate("getComputedStyle(document.querySelector('.workspace-frame')).opacity==='1'&&document.querySelector('.workspace-frame').getAnimations().length===0"),`Restored workspace does not replay after rapid scrolling and resize from ${width}px`);
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await navigate('?mode=demo');
 assert(await evaluate("[...document.querySelectorAll('[data-reveal]')].every(e=>getComputedStyle(e).opacity==='1')"),'Reduced motion shows final readable states');
 await shot('reduced-motion');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await navigate('?mode=demo');await evaluate("document.getElementById('account_overview').scrollIntoView()");await wait(50);
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(80);
 assert(await evaluate("[...document.querySelectorAll('[data-reveal]')].every(e=>getComputedStyle(e).opacity==='1'&&e.getAnimations().length===0)"),'Changing reduced motion during playback restores visibility and cancels owned reveals');
 assert(await evaluate("[...document.querySelectorAll('.account-legal a')].map(a=>a.getAttribute('href')).join(',')==='/privacy-policy,/terms-of-service'"),'Account footer retains access to both legal policies');
 for(const [route,title] of [['privacy-policy','Privacy Policy'],['terms-of-service','Terms of Service']]){
  await navigate(route);
  assert(await evaluate(`document.querySelector('.legal-page h1')?.textContent===${JSON.stringify(title)}`),`${title} renders through its exported route`);
  assert(await evaluate("!document.querySelector('link[rel=preload][href*=\"/fonts/\"]')&&!performance.getEntriesByType('resource').some(e=>e.name.includes('/fonts/'))"),`${title} does not preload or fetch unused account fonts`);
  assert(await evaluate("(()=>{const h=document.querySelector('.legal-page h1');const a=document.querySelector('.legal-page main header a');return getComputedStyle(h).fontFamily.includes('Geist')&&parseFloat(getComputedStyle(h).marginTop)>=20&&getComputedStyle(a).textDecorationLine.includes('underline')})()"),`${title} retains its typography, spacing and link affordance`);
  assert(await evaluate("getComputedStyle(document.querySelector('.legal-page section a')).color==='rgb(0, 78, 66)'"),`${title} uses readable dark teal policy links`);
  for(const width of [390,1440]){
   await resize(width,844);
   assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),`${title} has no horizontal overflow at ${width}px`);
   await shot(`${route}-${width}`);
  }
 }
 assert(errors.length===0,'No uncaught browser runtime exceptions');
 await fs.writeFile(path.join(evidence,'results.json'),JSON.stringify({results,errors,fontState,responsive},null,2));
 console.log(JSON.stringify({passed:results.length,evidence,results},null,2));
} catch(error){await fs.writeFile(path.join(evidence,'failure.json'),JSON.stringify({error:error.message,results,errors},null,2));console.error(error);process.exitCode=1;}
finally{ws?.close();browser.kill();if(server)await new Promise(resolve=>server.close(resolve));await fs.rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:150});}
