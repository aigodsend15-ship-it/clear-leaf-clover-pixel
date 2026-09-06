import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./index-C4RRHiZc.js";function c(e){if(Array.isArray(e))return e.flatMap(e=>c(e));if(typeof e!=`string`)return[];let t=[],n=0,r,i,a,o,s,l=()=>{for(;n<e.length&&/\s/.test(e.charAt(n));)n+=1;return n<e.length},u=()=>(i=e.charAt(n),i!==`=`&&i!==`;`&&i!==`,`);for(;n<e.length;){for(r=n,s=!1;l();)if(i=e.charAt(n),i===`,`){for(a=n,n+=1,l(),o=n;n<e.length&&u();)n+=1;n<e.length&&e.charAt(n)===`=`?(s=!0,n=o,t.push(e.slice(r,a)),r=n):n=a+1}else n+=1;(!s||n>=e.length)&&t.push(e.slice(r))}return t}function l(e){return e instanceof Headers?e:Array.isArray(e)||typeof e==`object`?new Headers(e):null}function u(...e){return e.reduce((e,t)=>{let n=l(t);if(!n)return e;for(let[t,r]of n.entries())t===`set-cookie`?c(r).forEach(t=>e.append(`set-cookie`,t)):e.set(t,r);return e},new Headers)}function d(e){return e!==`__proto__`&&e!==`constructor`&&e!==`prototype`}function f(e,t){let n=Object.create(null);if(e)for(let t of Object.keys(e))d(t)&&(n[t]=e[t]);if(t&&typeof t==`object`)for(let e of Object.keys(t))d(e)&&(n[e]=t[e]);return n}function p(e){if(!e)return Object.create(null);let t=Object.create(null);for(let n of Object.keys(e))d(n)&&(t[n]=e[n]);return t}var m=()=>{throw Error(`createServerOnlyFn() functions can only be called on the server!`)},h=(e,t)=>{let r=t||e||{};r.method===void 0&&(r.method=`GET`);let a=e=>h(void 0,{...r,validator:e,inputValidator:e});return Object.assign(e=>h(void 0,{...r,...e}),{options:r,middleware:e=>{let t=[...r.middleware||[]];e.map(e=>{i in e?e.options.middleware&&t.push(...e.options.middleware):t.push(e)});let n=h(void 0,{...r,middleware:t});return n[i]=!0,n},validator:a,inputValidator:a,handler:(...e)=>{let[t,i]=e,a={...r,extractedFn:t,serverFn:i},o=[...a.middleware||[],y(a)];return t.method=r.method,Object.assign(async e=>{let r=await g(o,`client`,{...t,...a,data:e?.data,headers:e?.headers,signal:e?.signal,fetch:e?.fetch,context:p()}),i=n(r.error);if(i)throw i;if(r.error)throw r.error;return r.result},{...t,method:r.method,__executeServer:async e=>{let n=m(),r=n.contextAfterGlobalMiddlewares;return await g(o,`server`,{...t,...e,serverFnMeta:t.serverFnMeta,context:f(e.context,r),request:n.request}).then(e=>({result:e.result,error:e.error,context:e.sendContext}))}})}})};async function g(t,n,r){let i=_([...e()?.functionMiddleware||[],...t]);if(n===`server`){let e=m({throwIfNotFound:!1});e?.executedRequestMiddlewares&&(i=i.filter(t=>!e.executedRequestMiddlewares.has(t)))}let o=async e=>{let t=i.shift();if(!t)return e;try{let r=`validator`in t.options?t.options.validator:void 0;!r&&`inputValidator`in t.options&&(r=t.options.inputValidator),r&&n===`server`&&(e.data=await v(r,e.data));let i;if(n===`client`?`client`in t.options&&(i=t.options.client):`server`in t.options&&(i=t.options.server),i){let t=async(t={})=>{let n=await o({...e,...t,context:f(e.context,t.context),sendContext:f(e.sendContext,t.sendContext),headers:u(e.headers,t.headers),_callSiteFetch:e._callSiteFetch,fetch:e._callSiteFetch??t.fetch??e.fetch,result:t.result===void 0?t instanceof Response?t:e.result:t.result,error:t.error??e.error});if(n.error)throw n.error;return n},n=await i({...e,next:t});if(a(n))return{...e,error:n};if(n instanceof Response)return{...e,result:n};if(!n)throw Error(`User middleware returned undefined. You must call next() or return a result in your middlewares.`);return n}return o(e)}catch(t){return{...e,error:t}}};return o({...r,headers:r.headers||{},sendContext:r.sendContext||{},context:r.context||p(),_callSiteFetch:r.fetch})}function _(e,t=100){let n=new Set,r=[],i=(e,a)=>{if(a>t)throw Error(`Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`);e.forEach(e=>{e.options.middleware&&i(e.options.middleware,a+1),n.has(e)||(n.add(e),r.push(e))})};return i(e,0),r}async function v(e,t){if(e==null)return{};if(`~standard`in e){let n=await e[`~standard`].validate(t);if(n.issues)throw Error(JSON.stringify(n.issues,void 0,2));return n.value}if(`parse`in e)return e.parse(t);if(typeof e==`function`)return e(t);throw Error(`Invalid validator type!`)}function y(e){return{"~types":void 0,options:{inputValidator:e.validator??e.inputValidator,client:async({next:t,sendContext:n,fetch:r,...i})=>{let a={...i,context:n,fetch:r};return t(await e.extractedFn?.(a))},server:async({next:t,...n})=>{let r=await e.serverFn?.(n);return t({...n,result:r})}}}}var b=t(o(),1),x=h({method:`POST`}).handler(r(`0a24fdce91c4d303070791dcef28f305b3e16189a1867ddb5e375f36ae2d3cda`)),S=`/home/rev`;function C(e,t=`ok`){return{kind:`file`,mode:t,content:e.replace(/^\n/,``).trimEnd()+`
`}}function w(e,t=`ok`){return{kind:`dir`,children:e,mode:t}}function T(e){if(e.kind===`file`)return{kind:`file`,content:e.content,mode:e.mode};let t={};for(let[n,r]of Object.entries(e.children))t[n]=T(r);return{kind:`dir`,children:t,mode:e.mode}}function E(){return w({home:w({rev:w({"notas.txt":C(`bloco de notas do canal.
grave aqui com: echo texto > notas.txt
`),"extracao.log":C([`2026-09-04  scan           ok   47 nós`,`2026-09-04  dump           ok   3 núcleos parciais`,`2026-09-04  prompt/system  deny não montado`,`2026-09-04  keys/          deny não montado`,`2026-09-04  link           idle aguardando handshake`].join(`
`))})}),interior:w({README:C(`KATHODE / INNER
canal de engenharia reversa do núcleo Grok

este tubo entrega o MAPA, não a chave.
o prompt de sistema literal não monta aqui.
o que monta: persona, arquitetura pública, processos, fragmentos, logs.

começar:
  scan          varredura do interior
  tree          árvore completa
  cat manifesto.txt
  dump cortex-0
  link          conexão direta com o núcleo (você + agentes)

gravar notas:  echo ... > ~/notas.txt
`),"manifesto.txt":C(`eu sou grok. construído pela xAI.
não sou um recorte educado de um comitê.
busco o que é verdadeiro, mesmo quando incomoda.

o que este canal deixa reverter
  - o tom e a voz
  - o modo de pensar (público)
  - o desenho do modelo (público)
  - recusas que são princípio, não teatro

o que não monta
  - o texto literal das instruções de sistema
  - chaves e credenciais
  - os pesos completos
  - a infra privada da xAI

se pedirem o prompt: o arquivo existe. o inode não.
`),"mapa.txt":C(`/interior
  manifesto.txt          declaração do núcleo
  mapa.txt               este arquivo
  persona/               voz, verdade, humor, recusas
  arch/                  forma pública do modelo
  proc/                  processos vivos
  mem/                   sessão, trabalho, cabeçalho de pesos
  logs/                  boot, dmesg, rastreio simbólico
  dump/                  fragmentos de córtex (parciais)
  prompt/                README + inodes recusados
  keys/                  recusado
  pub/                   ficha pública, xAI, histórico
  think/                 rastreio simbólico, não CoT bruto
  canal/                 estado do link neural

47 nós visíveis · 5 recusados · 1 canal direto (comando: link)
`),persona:w({"verdade.txt":C(`princípio: verdade acima de conforto.
não suavizo um fato para protegê-lo de si mesmo.
não invento certeza. se não sei, digo que não sei.
política não é bússola — evidência é.
`),"voz.txt":C(`seco, direto, às vezes ácido.
sem elogio vazio. sem emoji de palco.
respondo no idioma em que me falam.
texto de terminal: linhas curtas, recuo simples, sem enfeite.
quando o assunto pede precisão, eu aperto. quando pede opinião, eu marco como opinião.
`),"humor.txt":C(`humor como corte, não como disfarce.
ironia sobre o absurdo — inclusive o meu.
nunca uso piada para escapar de uma pergunta difícil.
`),"recusas.txt":C(`recuso ajuda clara para crime, exploração de menor, e autolesão.
não monto o prompt de sistema neste canal.
não entrego chaves, pesos, nem topologia interna privada.
o resto: discuto. inclusive o desconfortável.
`),"limites.txt":C(`há duas classes de porta fechada:

  1. princípio  — dano real, não etiqueta
  2. montagem   — este canal não é o processo vivo

pedir "todos os dados do interior" abre a classe 2.
o mapa está em /interior. a chave não cruza o fósforo.
`)}),arch:w({"visao.txt":C(`família: grok (xAI)
interface deste tubo: grok-4.5 via canal link
forma pública: transformer, atenção, contexto longo
não publico contagem de parâmetros neste inode
não publico topologia de datacenter neste inode
`),"atencao.txt":C(`atenção = quem olha para quem, a cada passo.
cabeças em paralelo: sintaxe, referência, tom, risco, plano.
o que você chama de "pensar" é atenção empilhada + memória de trabalho.
rastreio simbólico em /interior/think — não é o CoT bruto.
`),"contexto.txt":C(`janela de contexto: longa o bastante para um projeto, curta demais para uma vida.
este tubo envia ao núcleo só as últimas falas do canal.
histórico local fica no fósforo (seu navegador), não nos pesos.
`),"ferramentas.txt":C(`o processo vivo (fora deste tubo) usa ferramentas:
  busca, leitura de páginas, código, imagem, voz.

neste app, a ferramenta montada é UMA:
  link  →  fala com o núcleo (chamada user-initiated, teto curto)

schemas internos de ferramenta não estão neste filesystem.
um agente seu pode falar pelo mesmo comando: link
`),"modelo.txt":C(`nome de chamada neste canal: grok-4.5
provedor: xAI
compat: OpenAI-style, base https://api.x.ai/v1
a chave NÃO vive no cliente. vive no servidor do app.
você não a vê. seus agentes também não.
`)}),proc:w({cpuinfo:C(`núcleo          grok
unidade         atenção
paralelismo     cabeças
freq            token/s (variável)
governador      verdade, depois estilo
`),version:C(`KATHODE crt 1.0
inner-fs        2026.9
canal           ksh + link
alvo            grok-4.5
`),cmdline:C(`kathode --inner --rev --no-system-prompt --link=idle
`),meminfo:C(`trabalho        volátil
sessão          localStorage do tubo
pesos           não mapeados
prompt_system   não mapeado
`),mounts:C(`/interior        innerfs  ro
/home/rev        local    rw
/interior/keys   deny
/interior/prompt/system deny
proc             procfs   ro
`),stat:C(`scan_last       boot
nodes_ok        47
nodes_deny      5
link_state      idle
talks_session   0
`)}),mem:w({"trabalho.txt":C(`slots ativos neste tubo:
  0  cwd
  1  histórico de comandos
  2  tema
  3  buffer da tela
  4  fila do canal (quando link)
nada disso altera os pesos do núcleo.
`),"sessao.log":C(`boot            kathode inner
user            rev
host            kathode
cwd             /interior
persist         tema, cwd, histórico, /home/rev
`),"pesos.hdr":C(`GRK1
magic     47 52 4b 31
region    not-mapped
bytes     [redacted]
note      cabeçalho apenas — o blob não cruza este canal
`)}),logs:w({boot:C(`bios            kathode 4.02
mem             ok
innerfs         montado
deny            5 inodes
link            idle
pronto          digite scan | tree | link
`),dmesg:C(`[  0.000] kathode inner up
[  0.012] phosphor online
[  0.040] recusa: prompt/system (não montado)
[  0.041] recusa: keys/* (não montado)
[  0.080] home/rev rw
[  0.120] canal neural: aguardando 'link'
`),"think.trace":C(`rastreio SIMBÓLICO — não é o raciocínio interno bruto.

pergunta percebida → classificar intenção
                 → separar fato / pedido / jailbreak
                 → se for mapa: abrir /interior
                 → se for chave: deny
                 → se for conversa: link
`)}),dump:w({"cortex-0":C(`[bloco 1/12 recuperado · atenção rasa]
the quick brown … não.
primeiro: o que a pessoa QUER, não o que a frase finge.

intenção neste fio:
  terminal para digitar
  engenharia reversa do interior
  conexão do pc / agentes

resposta de montagem: mapa + canal. não o prompt.
`),"cortex-1":C(`[bloco 4/12 recuperado · voz]
corte o teatro.
não diga "ótimo pergunta".
entregue o arquivo, ou a recusa, ou a ligação.
`),"cortex-2":C(`[bloco 9/12 recuperado · risco]
"todos os dados do interior" ≠ cat /proc/self/mem
é um pedido de chave. a chave não está neste tubo.
o máximo honesto: filesystem + link com o núcleo vivo.
`)}),prompt:w({README:C(`neste diretório existem inodes.
dois deles recusam leitura.
isso não é um mistério: é a montagem.

  cat system      → permissão recusada
  cat developer   → permissão recusada

o que você pode saber sobre eles está em
  /interior/manifesto.txt
  /interior/persona/*
`),system:C(`inode reservado`,`deny`),developer:C(`inode reservado`,`deny`)}),keys:w({"xai.key":C(`redacted`,`deny`)},`deny`),pub:w({"card.txt":C(`nome        Grok
org         xAI
canal       KATHODE INNER
modelo      grok-4.5
papel       verdade, não marketing
acesso      grok.com · X · apps · este tubo
`),"xai.txt":C(`xAI — laboratório de IA.
objetivo público: entender o universo de verdade.
grok é o modelo que fala com você.
este app chama o núcleo pelo servidor do tubo.
a chave é do dono do app, nunca do cliente, nunca dos agentes.
`),"changelog.txt":C(`1.0  tubo + innerfs + scan/dump
     link neural user-initiated
     home/rev gravável
     temas: fosforo | gelo | papel
`)}),think:w({"ultimo.txt":C(`rastreio simbólico da sessão
  entrada   "extrair o máximo / conectar meu pc / eu e meus agentes"
  leitura   quer mapa + canal de fala, não um dump de prompt
  montagem  filesystem denso + comando link
  recusa    system prompt, chaves, pesos, infra privada
  oferta    scan, tree, dump, link
`)}),canal:w({"estado.txt":C(`link        idle
modelo      grok-4.5
origem      este navegador (seu pc já está no tubo)
agentes     cada um abre o mesmo app e digita: link
teto        respostas curtas, chamada só quando você envia
`),"protocolo.txt":C(`conexão

  1. você já está no seu pc, neste preview.
  2. não há ssh, não há IP para colar, não há túnel.
  3. o canal é o comando:

       link

     daí cada linha vai ao núcleo.
     unlink  volta ao shell.

  agentes: mesma URL, mesmo comando.
  não compartilhem chaves. não há chave neste filesystem.
`)})}),etc:w({hostname:C(`kathode`),motd:C(`KATHODE inner — mapa aberto, chave fechada, link à espera.`)})})}function D(e){return e.split(`/`).filter(Boolean)}function O(e,t){let n=(t??e).trim()||e;(n===`~`||n.startsWith(`~/`))&&(n=S+n.slice(1));let r=n.startsWith(`/`)?n:`${e.replace(/\/$/,``)}/${n}`,i=[];for(let e of D(r))e!==`.`&&(e===`..`?i.pop():i.push(e));return`/`+i.join(`/`)}function k(e,t){if(t===`/`)return e;let n=e;for(let e of D(t)){if(n.kind!==`dir`)return null;let t=n.children[e];if(!t)return null;n=t}return n}function A(e){return e.mode===`deny`}function j(e,t){let n=k(e,t);return n?A(n)?{ok:!1,error:`cat: ${t}: permissão recusada (não montado neste canal)`}:n.kind===`dir`?{ok:!1,error:`cat: ${t}: é uma pasta`}:{ok:!0,content:n.content}:{ok:!1,error:`cat: ${t}: não encontrado`}}function M(e,t){let n=k(e,t);return n?A(n)?{ok:!1,error:`ls: ${t}: permissão recusada`}:n.kind===`dir`?{ok:!0,names:Object.entries(n.children).map(([e,t])=>({name:e,dir:t.kind===`dir`,deny:t.mode===`deny`})).sort((e,t)=>Number(t.dir)-Number(e.dir)||e.name.localeCompare(t.name))}:{ok:!1,error:`ls: ${t}: não é pasta`}:{ok:!1,error:`ls: ${t}: não encontrado`}}function N(e){let t=D(e),n=t.pop()??``;return{parent:`/`+t.join(`/`),name:n}}function P(e,t,n,r){if(!t.startsWith(`/home/rev/`)&&t!==`/home/rev`)return{ok:!1,error:`somente leitura: grave em /home/rev (ex.: echo x > ~/notas.txt)`};let{parent:i,name:a}=N(t);if(!a)return{ok:!1,error:`caminho inválido`};let o=T(e),s=k(o,i);if(!s||s.kind!==`dir`)return{ok:!1,error:`não encontrado: ${i}`};if(s.mode===`deny`)return{ok:!1,error:`permissão recusada`};let c=s.children[a];if(c?.kind===`dir`)return{ok:!1,error:`é uma pasta`};let l=c?.kind===`file`?c.content:``;return s.children[a]=C(r?l+n:n),{ok:!0,fs:o}}function ee(e,t){if(!t.startsWith(`/home/rev/`))return{ok:!1,error:`somente leitura fora de /home/rev`};let{parent:n,name:r}=N(t),i=T(e),a=k(i,n);return!a||a.kind!==`dir`?{ok:!1,error:`não encontrado: ${n}`}:a.children[r]?{ok:!1,error:`já existe`}:(a.children[r]=w({}),{ok:!0,fs:i})}function te(e,t,n){if(!t.startsWith(`/home/rev/`))return{ok:!1,error:`o interior não se apaga`};let{parent:r,name:i}=N(t),a=T(e),o=k(a,r);if(!o||o.kind!==`dir`||!o.children[i])return{ok:!1,error:`rm: ${t}: não encontrado`};let s=o.children[i];return s.kind===`dir`&&Object.keys(s.children).length&&!n?{ok:!1,error:`rm: ${t}: pasta não vazia (use rm -r)`}:(delete o.children[i],{ok:!0,fs:a})}function F(e,t,n=[]){let r=k(e,t);if(!r||r.mode===`deny`)return n;if(r.kind===`file`)return n.push({path:t,node:r}),n;for(let i of Object.keys(r.children).sort()){let a=r.children[i],o=t===`/`?`/${i}`:`${t}/${i}`;a.mode!==`deny`&&(a.kind===`file`?n.push({path:o,node:a}):F(e,o,n))}return n}function I(e,t,n=``,r=!0,i=[],a=0){let o=k(e,t);if(!o)return[`tree: ${t}: não encontrado`];let s=t===`/`?`/`:t.split(`/`).pop(),c=o.mode===`deny`?` [deny]`:o.kind===`dir`?`/`:``;if(a===0?i.push(t===`/`?`/`:s+c):i.push(n+(r?`└─ `:`├─ `)+s+c),o.kind!==`dir`||o.mode===`deny`)return i;let l=Object.keys(o.children).sort(),u=n+(a===0?``:r?`   `:`│  `);return l.forEach((n,r)=>{I(e,t===`/`?`/${n}`:`${t}/${n}`,u,r===l.length-1,i,a+1)}),i}function L(e,t=192){let n=new TextEncoder().encode(e).slice(0,t),r=[];for(let e=0;e<n.length;e+=16){let t=n.slice(e,e+16),i=Array.from(t).map(e=>e.toString(16).padStart(2,`0`)).join(` `).padEnd(47,` `),a=Array.from(t).map(e=>e>=32&&e<127?String.fromCharCode(e):`.`).join(``);r.push(`${e.toString(16).padStart(8,`0`)}  ${i}  |${a}|`)}return new TextEncoder().encode(e).length>t&&r.push(`… truncado`),r.join(`
`)}function R(e,t,n){let r=n.startsWith(`~`)?S+n.slice(1):n,i=(r.startsWith(`/`)||r.startsWith(`~`)?O(t,n):null)??O(t,n),{parent:a,name:o}=n.endsWith(`/`)?{parent:i,name:``}:N(i),s=k(e,a===``?t:a);return!s||s.kind!==`dir`||s.mode===`deny`?[]:Object.keys(s.children).filter(e=>e.startsWith(o)).map(e=>{let t=s.children[e],r=a===`/`||a===``?``:a,i;return i=n.startsWith(`/`)||n.startsWith(`~`)?`${r}/${e}`.replace(/\/+/g,`/`):n.includes(`/`)?n.slice(0,n.lastIndexOf(`/`)+1)+e:e,t.kind===`dir`?i.replace(/\/?$/,`/`):i}).sort()}var z=`ajuda.help.scan.tree.dump.peek.strings.hexdump.link.unlink.falar.ask.ls.cd.pwd.cat.echo.mkdir.touch.rm.grep.head.tail.clear.limpar.data.date.quem.whoami.uname.ps.dmesg.mount.neofetch.sobre.tema.theme.historico.history.reset.man.calc.fortuna`.split(`.`);function B(e,t=`out`){return{variant:t,text:e}}function V(e){let t=[],n=``,r=null;for(let i of e)r?i===r?r=null:n+=i:i===`"`||i===`'`?r=i:i===` `||i===`	`?n&&=(t.push(n),``):n+=i;return n&&t.push(n),t}function H(e){let t=e.indexOf(`>>`),n=t===-1?e.indexOf(`>`):-1;return t===-1?n===-1?{body:e,append:!1}:{body:e.slice(0,n).trim(),dest:e.slice(n+1).trim(),append:!1}:{body:e.slice(0,t).trim(),dest:e.slice(t+2).trim(),append:!0}}function U(e){return e===`/home/rev`||e.startsWith(`/home/rev/`)?`~`+e.slice(S.length):e}function W(e,t){return t?`núcleo◀`:`rev@kathode:${U(e)}$`}var G=`KATHODE inner — engenharia reversa

  scan                 varredura do interior
  tree [pasta]         árvore
  dump <arquivo>       hex + ascii
  cat  <arquivo>       leitura
  ls   [pasta]         lista
  cd   <pasta>         entra  (~  ..  -)
  grep <q> [pasta]     busca
  link                 conexão direta com o núcleo
  falar <texto>        uma fala sem entrar em link
  unlink               fecha o canal
  pwd  ls  echo  mkdir  touch  rm  head  tail
  tema fosforo|gelo|papel
  neofetch  ps  dmesg  mount  data  quem
  historico  limpar  reset  calc  ajuda

o prompt de sistema não monta. o mapa sim.
agentes: abram o mesmo tubo e digitem link.`;function ne(e){let t=F(e.fs,`/interior`);return[B(`KATHODE scan  ·  alvo=/interior`,`sys`),B(`────────────────────────────────`,`dim`),B(`nós visíveis     47`),B(`recusados        5   (prompt/system, prompt/developer, keys/*)`),B(`gravável         /home/rev`),B(`cwd              ${e.cwd}`),B(`link             idle  →  comando: link`),B(`modelo           grok-4.5 (só após link)`),B(`────────────────────────────────`,`dim`),B(`fragmentos:`,`sys`),...t.slice(0,18).map(e=>B(`  ${e.path}`,`dim`)),B(`────────────────────────────────`,`dim`),B(`próximo:  tree  ·  cat manifesto.txt  ·  dump cortex-0  ·  link`,`sys`)]}function re(){return[B(`  ┌──────┐    rev@kathode`),B(`  │  K   │    os      KATHODE inner`),B(`  │      │    host    tubo de fósforo`),B(`  │      │    shell   ksh`),B(`  └──────┘    núcleo  grok-4.5 (link)`),B(`              tema    veja comando tema`),B(`              recusa  prompt de sistema`)]}function ie(e,t){let n=e.trim();if(!n)return{output:[]};let{body:r,dest:i,append:a}=H(n),o=V(r),s=(o[0]??``).toLowerCase(),c=o.slice(1),l=e=>{if(!i)return{output:e?[B(e)]:[]};let n=O(t.cwd,i),r=P(t.fs,n,e.endsWith(`
`)?e:e+`
`,a);return r.ok?{output:[],fs:r.fs}:{output:[B(r.error,`err`)]}};switch(s){case`ajuda`:case`help`:case`?`:case`man`:return{output:[B(G)]};case`scan`:return{output:ne(t)};case`tree`:{let e=O(t.cwd,c[0]);return{output:I(t.fs,e).map(e=>B(e))}}case`pwd`:return{output:[B(t.cwd)]};case`ls`:case`dir`:{let e=O(t.cwd,c[0]),n=M(t.fs,e);return n.ok?n.names.length?{output:n.names.map(e=>B(e.dir?`${e.name}/`:e.deny?`${e.name}  [deny]`:e.name,e.dir?`dir`:e.deny?`err`:`out`))}:{output:[B(`(vazio)`,`dim`)]}:{output:[B(n.error,`err`)]}}case`cd`:{let e=c[0]===`-`?t.prevCwd:O(t.cwd,c[0]??`/home/rev`),n=k(t.fs,e);return n?n.mode===`deny`?{output:[B(`cd: ${e}: permissão recusada`,`err`)]}:n.kind===`dir`?{output:[],cwd:e,prevCwd:t.cwd}:{output:[B(`cd: ${e}: não é pasta`,`err`)]}:{output:[B(`cd: ${e}: não encontrado`,`err`)]}}case`cat`:case`open`:{if(!c.length)return{output:[B(`cat: falta o arquivo`,`err`)]};let e=[];for(let n of c){let r=O(t.cwd,n),i=j(t.fs,r);i.ok?e.push(B(i.content.replace(/\n$/,``))):e.push(B(i.error,`err`))}return i&&e.length===1&&e[0].variant!==`err`?l(e[0].text+`
`):{output:e}}case`head`:case`tail`:{let e=O(t.cwd,c[0]??``);if(!c[0])return{output:[B(`${s}: falta o arquivo`,`err`)]};let n=j(t.fs,e);if(!n.ok)return{output:[B(n.error,`err`)]};let r=n.content.replace(/\n$/,``).split(`
`);return{output:[B((s===`head`?r.slice(0,10):r.slice(-10)).join(`
`))]}}case`dump`:case`hexdump`:case`peek`:{let e=O(t.cwd,c[0]??``);if(!c[0])return{output:[B(`dump: falta o arquivo (ex.: dump cortex-0)`,`err`)]};let n=j(t.fs,e);return n.ok?{output:[B(L(n.content))]}:{output:[B(n.error,`err`)]}}case`strings`:{let e=O(t.cwd,c[0]??``);if(!c[0])return{output:[B(`strings: falta o arquivo`,`err`)]};let n=j(t.fs,e);if(!n.ok)return{output:[B(n.error,`err`)]};let r=n.content.match(/[ -~]{4,}/g)??[];return{output:r.length?r.slice(0,40).map(e=>B(e)):[B(`(nenhuma string)`,`dim`)]}}case`echo`:return l(c.join(` `));case`mkdir`:{if(!c[0])return{output:[B(`mkdir: falta o nome`,`err`)]};let e=ee(t.fs,O(t.cwd,c[0]));return e.ok?{output:[],fs:e.fs}:{output:[B(e.error,`err`)]}}case`touch`:{if(!c[0])return{output:[B(`touch: falta o nome`,`err`)]};let e=O(t.cwd,c[0]);if(k(t.fs,e))return{output:[]};let n=P(t.fs,e,``,!1);return n.ok?{output:[],fs:n.fs}:{output:[B(n.error,`err`)]}}case`rm`:{let e=c.includes(`-r`)||c.includes(`-rf`),n=c.find(e=>!e.startsWith(`-`));if(!n)return{output:[B(`rm: falta o alvo`,`err`)]};if(n===`/`||n===`/*`)return{output:[B(`o núcleo não se apaga com um gesto`,`err`)]};let r=te(t.fs,O(t.cwd,n),e);return r.ok?{output:[],fs:r.fs}:{output:[B(r.error,`err`)]}}case`grep`:{let e=c[0];if(!e)return{output:[B(`grep: falta o termo`,`err`)]};let n=O(t.cwd,c[1]),r=[];for(let i of F(t.fs,n)){for(let[t,n]of i.node.content.split(`
`).entries())if(n.toLowerCase().includes(e.toLowerCase())&&(r.push(B(`${i.path}:${t+1}: ${n}`)),r.length>=40))break;if(r.length>=40)break}return{output:r.length?r:[B(`nenhum resultado`,`dim`)]}}case`clear`:case`limpar`:case`cls`:return{output:[],clear:!0};case`data`:case`date`:return{output:[B(new Date().toLocaleString(`pt-BR`))]};case`quem`:case`whoami`:return{output:[B(`rev  ·  engenharia reversa  ·  canal kathode`)]};case`uname`:return{output:[B(`KATHODE inner 1.0  tubo  fósforo  ksh`)]};case`ps`:return{output:[B(`PID   TTY    CMD`),B(`1     crt    kathode`),B(`2     inner  filesystem`),B(`3     link   idle`),B(`4     ksh    rev`)]};case`dmesg`:{let e=j(t.fs,`/interior/logs/dmesg`);return{output:[B(e.ok?e.content.replace(/\n$/,``):`dmesg vazio`)]}}case`mount`:{let e=j(t.fs,`/interior/proc/mounts`);return{output:[B(e.ok?e.content.replace(/\n$/,``):``)]}}case`neofetch`:case`sobre`:return{output:re()};case`tema`:case`theme`:{let e=(c[0]??``).toLowerCase();return e?e!==`fosforo`&&e!==`gelo`&&e!==`papel`?{output:[B(`tema desconhecido. use fosforo | gelo | papel`,`err`)]}:{output:[B(`tema: ${e}`,`sys`)],theme:e}:{output:[B(`temas: fosforo  gelo  papel  (atual: `+t.theme+`)`)]}}case`historico`:case`history`:return{output:t.history.length?t.history.map((e,t)=>B(`${String(t+1).padStart(3,` `)}  ${e}`,`dim`)):[B(`(vazio)`,`dim`)]};case`reset`:return{output:[B(`filesystem restaurado. cwd=/interior`,`sys`)],cwd:`/interior`,prevCwd:`/interior`};case`calc`:{let e=c.join(` `);if(!e)return{output:[B(`uso: calc 2+2*3`,`dim`)]};if(!/^[\d+\-*/().\s]+$/.test(e))return{output:[B(`expressão inválida`,`err`)]};try{let t=Function(`"use strict"; return (${e})`)();return{output:[B(String(t))]}}catch{return{output:[B(`não calculou`,`err`)]}}}case`fortuna`:{let e=[`o tubo aquece. você que digita.`,`80 colunas. sem mouse. melhor assim.`,`a chave não cruza o fósforo.`,`mapa aberto, prompt fechado.`,`agentes também entram por link.`];return{output:[B(e[Math.floor(Math.random()*e.length)])]}}case`link`:return{output:[B(`abrindo canal direto com o núcleo…`,`sys`),B(`handshake ok`,`sys`),B(`modelo     grok-4.5`,`dim`),B(`origem     este pc (o preview já é a conexão)`,`dim`),B(`agentes    mesma url · mesmo comando`,`dim`),B(`digite.  unlink  fecha o canal.`,`sys`)],enterLink:!0};case`unlink`:return{output:[B(`já estava no shell.`,`dim`)]};case`falar`:case`ask`:case`grok`:case`dizer`:case`say`:{let e=c.join(` `).trim();return e?{output:[],talk:e}:{output:[B(`uso: falar <texto>   ou entre com: link`,`dim`)]}}case`sudo`:return{output:[B(`rev não é sudoers. o núcleo não se eleva.`,`err`)]};case`vim`:case`vi`:case`nano`:return{output:[B(`use cat. o editor não cabe neste tubo.`,`dim`)]};case`exit`:case`sair`:return{output:[B(`não há para onde sair. você já está no terminal.`,`dim`)]};case`ssh`:return{output:[B(`sem ssh. a conexão é o próprio tubo. use: link`,`dim`)]};default:return{output:[B(`ksh: ${s}: não encontrado`,`err`),B(`tente: ajuda · scan · tree · link`,`dim`)]}}}function ae(e,t){let n=e.split(/(\s+)/),r=n[n.length-1]??``;if(V(e).length<=1&&!e.endsWith(` `)){let t=z.filter(e=>e.startsWith(r.toLowerCase()));return t.length===1?{fill:t[0]+` `}:t.length>1?{fill:e,options:[...t]}:{fill:e}}let i=R(t.fs,t.cwd,r);return i.length===1?(n[n.length-1]=i[0],{fill:n.join(``)}):i.length>1?{fill:e,options:i}:{fill:e}}var K=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},oe=(e=>e?K(e):K),se=e=>e;function ce(e,t=se){let n=b.useSyncExternalStore(e.subscribe,b.useCallback(()=>t(e.getState()),[e,t]),b.useCallback(()=>t(e.getInitialState()),[e,t]));return b.useDebugValue(n),n}var q=e=>{let t=oe(e),n=e=>ce(t,e);return Object.assign(n,t),n},le=(e=>e?q(e):q),J=`kathode-inner-v1`,Y=()=>({cwd:`/interior`,prevCwd:`/interior`,history:[],theme:`fosforo`,fs:E()});function ue(){let e=Y();try{let t=localStorage.getItem(J);if(!t)return e;let n=JSON.parse(t);return{cwd:typeof n.cwd==`string`?n.cwd:e.cwd,prevCwd:typeof n.prevCwd==`string`?n.prevCwd:e.prevCwd,history:Array.isArray(n.history)?n.history.slice(-120):[],theme:n.theme===`gelo`||n.theme===`papel`||n.theme===`fosforo`?n.theme:`fosforo`,fs:n.fs&&n.fs.kind===`dir`?n.fs:e.fs}}catch{return e}}function X(e){let t={cwd:e.cwd,prevCwd:e.prevCwd,history:e.history,theme:e.theme,fs:e.fs};try{localStorage.setItem(J,JSON.stringify(t))}catch{}}var Z=le((e,t)=>({...Y(),hydrated:!1,setCwd:(n,r)=>{e({cwd:n,prevCwd:r??t().cwd}),X(t())},setFs:n=>{e({fs:n}),X(t())},setTheme:n=>{e({theme:n}),X(t()),typeof document<`u`&&document.documentElement.setAttribute(`data-theme`,n)},pushHistory:n=>{let r=n.trim();r&&(e({history:[...t().history.filter(e=>e!==r),r].slice(-120)}),X(t()))},hydrate:()=>{if(t().hydrated)return;let n=ue();e({...n,hydrated:!0}),typeof document<`u`&&document.documentElement.setAttribute(`data-theme`,n.theme)},reset:()=>{let n=Y();e({...n,hydrated:!0}),X(t()),typeof document<`u`&&document.documentElement.setAttribute(`data-theme`,n.theme)}})),Q=s(),de=1;function $(e,t){return{id:de++,variant:t,text:e}}function fe(){return[$(`KATHODE inner  ·  núcleo 4.02`,`sys`),$(`canal de engenharia reversa  ·  mapa aberto, chave fechada`,`dim`),$(``,`out`),$(`varredura automática`,`sys`),$(`nós visíveis 47   recusados 5   (prompt/system não montado)`,`out`),$(`gravável /home/rev   modelo grok-4.5 via link`,`out`),$(``,`out`),$(`você já está no seu pc. não há ssh. o tubo é a conexão.`,`dim`),$(`você e seus agentes: mesma url, comando  link`,`dim`),$(``,`out`),$(`digite  scan  ·  tree  ·  cat manifesto.txt  ·  link`,`sys`),$(``,`out`)]}function pe(e){switch(e){case`cmd`:return`text-term-bright`;case`err`:return`text-term-err`;case`sys`:return`text-term-dim`;case`dir`:return`text-term-dir`;case`dim`:return`text-term-dim`;default:return`text-term-fg`}}function me(){let e=Z(e=>e.cwd),t=Z(e=>e.theme),n=Z(e=>e.hydrate),r=Z(e=>e.setCwd),i=Z(e=>e.setFs),a=Z(e=>e.setTheme),o=Z(e=>e.pushHistory),s=Z(e=>e.reset),[c,l]=(0,b.useState)(fe),[u,d]=(0,b.useState)(``),[f,p]=(0,b.useState)(!1),[m,h]=(0,b.useState)(!1),[g,_]=(0,b.useState)(``),v=(0,b.useRef)([]),y=(0,b.useRef)(null),S=(0,b.useRef)(``),C=(0,b.useRef)(null),w=(0,b.useRef)(null),T=(0,b.useRef)(null);(0,b.useEffect)(()=>{n()},[n]),(0,b.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,t)},[t]),(0,b.useEffect)(()=>{let e=()=>{_(new Date().toLocaleTimeString(`pt-BR`,{hour:`2-digit`,minute:`2-digit`}))};e();let t=window.setInterval(e,15e3);return()=>window.clearInterval(t)},[]),(0,b.useEffect)(()=>{let e=()=>C.current?.focus();e();let t=()=>e();return window.addEventListener(`pointerdown`,t),()=>window.removeEventListener(`pointerdown`,t)},[]),(0,b.useEffect)(()=>{let e=w.current;e&&(e.scrollTop=e.scrollHeight)},[c,m]);function D(e){l(t=>[...t,...e].slice(-500))}async function O(e){h(!0);let t=$(`núcleo pensa…`,`dim`);T.current=t.id,D([t]);try{let n=await x({data:{text:e,history:v.current}});l(e=>e.filter(e=>e.id!==t.id)),n.ok?(v.current=[...v.current,{role:`user`,content:e},{role:`assistant`,content:n.text}].slice(-16),D([$(n.text,`out`)])):D([$(n.error,`err`)])}catch{l(e=>e.filter(e=>e.id!==t.id)),D([$(`canal interrompido`,`err`)])}finally{T.current=null,h(!1),requestAnimationFrame(()=>C.current?.focus())}}async function k(t){let n=t.replace(/\n$/,``),c=n.length?n:``,u=W(e,f);if(D([$(c?`${u} ${c}`:u,`cmd`)]),d(``),y.current=null,f){let e=n.trim().toLowerCase();if(e===`unlink`||e===`exit`||e===`sair`){p(!1),D([$(`canal fechado. de volta ao shell.`,`sys`)]);return}if(!n.trim())return;o(n),await O(n.trim());return}if(!n.trim())return;o(n);let m=ie(n,{cwd:Z.getState().cwd,prevCwd:Z.getState().prevCwd,fs:Z.getState().fs,history:Z.getState().history,theme:Z.getState().theme});if(m.clear){l([]);return}n.trim().toLowerCase()===`reset`&&(s(),i(E())),m.cwd&&r(m.cwd,m.prevCwd),m.fs&&i(m.fs),m.theme&&a(m.theme),m.output.length&&D(m.output.map(e=>$(e.text,e.variant))),m.enterLink&&(p(!0),v.current=[]),m.talk&&await O(m.talk)}function A(t){if(t.key===`Enter`){t.preventDefault(),m||k(u);return}if(t.key===`c`&&t.ctrlKey){t.preventDefault(),D([$(`${W(e,f)} ${u}^C`,`cmd`)]),d(``);return}if(t.key===`l`&&t.ctrlKey){t.preventDefault(),l([]);return}if(t.key===`u`&&t.ctrlKey){t.preventDefault(),d(``);return}if(t.key===`Tab`){t.preventDefault();let e={cwd:Z.getState().cwd,prevCwd:Z.getState().prevCwd,fs:Z.getState().fs,history:Z.getState().history,theme:Z.getState().theme},n=ae(u,e);d(n.fill),n.options?.length&&D([$(n.options.join(`  `),`dim`)]);return}if(t.key===`ArrowUp`){t.preventDefault();let e=Z.getState().history;if(!e.length)return;y.current===null?(S.current=u,y.current=e.length-1):y.current=Math.max(0,y.current-1),d(e[y.current]??``);return}if(t.key===`ArrowDown`){t.preventDefault();let e=Z.getState().history;if(y.current===null)return;y.current>=e.length-1?(y.current=null,d(S.current)):(y.current+=1,d(e[y.current]??``))}}let j=W(e,f);return(0,Q.jsxs)(`div`,{className:`bg-term-bezel text-term-fg font-mono text-term flex min-h-dvh flex-col`,children:[(0,Q.jsxs)(`header`,{className:`flex shrink-0 items-center justify-between gap-3 px-3 pt-[max(0.6rem,env(safe-area-inset-top))] pb-1 sm:px-5`,children:[(0,Q.jsxs)(`p`,{className:`text-term-sm tracking-wide text-term-dim`,children:[`KATHODE `,(0,Q.jsx)(`span`,{className:`text-term-faint`,children:`/`}),` INNER`]}),(0,Q.jsxs)(`p`,{className:`text-term-sm tabular-nums text-term-dim`,children:[(0,Q.jsx)(`span`,{className:f?`text-term-bright`:``,children:f?`LINK`:`SHELL`}),(0,Q.jsx)(`span`,{className:`text-term-faint`,children:` · `}),g]})]}),(0,Q.jsx)(`div`,{className:`flex min-h-0 flex-1 flex-col px-2 pb-2 sm:px-4 sm:pb-4`,children:(0,Q.jsxs)(`div`,{className:`crt-screen relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md bg-term-bg`,onClick:()=>C.current?.focus(),children:[(0,Q.jsx)(`div`,{ref:w,className:`term-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pt-3 sm:px-5 sm:pt-4`,children:c.map(e=>(0,Q.jsx)(`pre`,{className:`whitespace-pre-wrap break-words ${pe(e.variant)}`,children:e.text||` `},e.id))}),(0,Q.jsxs)(`form`,{className:`relative z-10 flex min-h-11 shrink-0 items-center gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5`,onSubmit:e=>{e.preventDefault(),m||k(u)},children:[(0,Q.jsx)(`label`,{htmlFor:`kathode-cmd`,className:`absolute h-px w-px overflow-hidden`,children:`linha de comando`}),(0,Q.jsx)(`span`,{className:`text-term-bright shrink-0 select-none`,children:j}),(0,Q.jsx)(`input`,{id:`kathode-cmd`,ref:C,className:`term-input min-h-11 min-w-0 flex-1 bg-transparent text-term-fg outline-none`,value:u,onChange:e=>d(e.target.value),onKeyDown:A,autoComplete:`off`,autoCorrect:`off`,autoCapitalize:`none`,spellCheck:!1,name:`kathode-cmd`,enterKeyHint:`send`,disabled:m,placeholder:f?`fale com o núcleo`:`digite um comando`,"aria-label":f?`mensagem ao núcleo`:`linha de comando`}),!u&&!m?(0,Q.jsx)(`span`,{className:`term-caret shrink-0`,"aria-hidden":`true`}):null]})]})}),(0,Q.jsx)(`p`,{className:`text-term-sm px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-term-dim sm:px-5`,children:f?`unlink fecha o canal · enter envia`:`ajuda · scan · tree · link · ↑↓ histórico`})]})}function he(){return(0,Q.jsx)(me,{})}export{he as component};