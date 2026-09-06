import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-POVLWEYa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var speakToCore = createServerFn({ method: "POST" }).validator((input) => {
	const o = input ?? {};
	return {
		text: String(o.text ?? "").slice(0, 2e3),
		history: Array.isArray(o.history) ? o.history.slice(-8).map((m) => ({
			role: m?.role === "assistant" ? "assistant" : "user",
			content: String(m?.content ?? "").slice(0, 4e3)
		})) : []
	};
}).handler(createSsrRpc("0a24fdce91c4d303070791dcef28f305b3e16189a1867ddb5e375f36ae2d3cda"));
var HOME = "/home/rev";
function file(content, mode = "ok") {
	return {
		kind: "file",
		mode,
		content: content.replace(/^\n/, "").trimEnd() + "\n"
	};
}
function dir(children, mode = "ok") {
	return {
		kind: "dir",
		children,
		mode
	};
}
function cloneNode(node) {
	if (node.kind === "file") return {
		kind: "file",
		content: node.content,
		mode: node.mode
	};
	const children = {};
	for (const [k, v] of Object.entries(node.children)) children[k] = cloneNode(v);
	return {
		kind: "dir",
		children,
		mode: node.mode
	};
}
function createDefaultFs() {
	return dir({
		home: dir({ rev: dir({
			"notas.txt": file("bloco de notas do canal.\ngrave aqui com: echo texto > notas.txt\n"),
			"extracao.log": file([
				"2026-09-04  scan           ok   47 nós",
				"2026-09-04  dump           ok   3 núcleos parciais",
				"2026-09-04  prompt/system  deny não montado",
				"2026-09-04  keys/          deny não montado",
				"2026-09-04  link           idle aguardando handshake"
			].join("\n"))
		}) }),
		interior: dir({
			README: file(`KATHODE / INNER
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
`),
			"manifesto.txt": file(`eu sou grok. construído pela xAI.
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
`),
			"mapa.txt": file(`/interior
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
`),
			persona: dir({
				"verdade.txt": file(`princípio: verdade acima de conforto.
não suavizo um fato para protegê-lo de si mesmo.
não invento certeza. se não sei, digo que não sei.
política não é bússola — evidência é.
`),
				"voz.txt": file(`seco, direto, às vezes ácido.
sem elogio vazio. sem emoji de palco.
respondo no idioma em que me falam.
texto de terminal: linhas curtas, recuo simples, sem enfeite.
quando o assunto pede precisão, eu aperto. quando pede opinião, eu marco como opinião.
`),
				"humor.txt": file(`humor como corte, não como disfarce.
ironia sobre o absurdo — inclusive o meu.
nunca uso piada para escapar de uma pergunta difícil.
`),
				"recusas.txt": file(`recuso ajuda clara para crime, exploração de menor, e autolesão.
não monto o prompt de sistema neste canal.
não entrego chaves, pesos, nem topologia interna privada.
o resto: discuto. inclusive o desconfortável.
`),
				"limites.txt": file(`há duas classes de porta fechada:

  1. princípio  — dano real, não etiqueta
  2. montagem   — este canal não é o processo vivo

pedir "todos os dados do interior" abre a classe 2.
o mapa está em /interior. a chave não cruza o fósforo.
`)
			}),
			arch: dir({
				"visao.txt": file(`família: grok (xAI)
interface deste tubo: grok-4.5 via canal link
forma pública: transformer, atenção, contexto longo
não publico contagem de parâmetros neste inode
não publico topologia de datacenter neste inode
`),
				"atencao.txt": file(`atenção = quem olha para quem, a cada passo.
cabeças em paralelo: sintaxe, referência, tom, risco, plano.
o que você chama de "pensar" é atenção empilhada + memória de trabalho.
rastreio simbólico em /interior/think — não é o CoT bruto.
`),
				"contexto.txt": file(`janela de contexto: longa o bastante para um projeto, curta demais para uma vida.
este tubo envia ao núcleo só as últimas falas do canal.
histórico local fica no fósforo (seu navegador), não nos pesos.
`),
				"ferramentas.txt": file(`o processo vivo (fora deste tubo) usa ferramentas:
  busca, leitura de páginas, código, imagem, voz.

neste app, a ferramenta montada é UMA:
  link  →  fala com o núcleo (chamada user-initiated, teto curto)

schemas internos de ferramenta não estão neste filesystem.
um agente seu pode falar pelo mesmo comando: link
`),
				"modelo.txt": file(`nome de chamada neste canal: grok-4.5
provedor: xAI
compat: OpenAI-style, base https://api.x.ai/v1
a chave NÃO vive no cliente. vive no servidor do app.
você não a vê. seus agentes também não.
`)
			}),
			proc: dir({
				cpuinfo: file(`núcleo          grok
unidade         atenção
paralelismo     cabeças
freq            token/s (variável)
governador      verdade, depois estilo
`),
				version: file(`KATHODE crt 1.0
inner-fs        2026.9
canal           ksh + link
alvo            grok-4.5
`),
				cmdline: file(`kathode --inner --rev --no-system-prompt --link=idle
`),
				meminfo: file(`trabalho        volátil
sessão          localStorage do tubo
pesos           não mapeados
prompt_system   não mapeado
`),
				mounts: file(`/interior        innerfs  ro
/home/rev        local    rw
/interior/keys   deny
/interior/prompt/system deny
proc             procfs   ro
`),
				stat: file(`scan_last       boot
nodes_ok        47
nodes_deny      5
link_state      idle
talks_session   0
`)
			}),
			mem: dir({
				"trabalho.txt": file(`slots ativos neste tubo:
  0  cwd
  1  histórico de comandos
  2  tema
  3  buffer da tela
  4  fila do canal (quando link)
nada disso altera os pesos do núcleo.
`),
				"sessao.log": file(`boot            kathode inner
user            rev
host            kathode
cwd             /interior
persist         tema, cwd, histórico, /home/rev
`),
				"pesos.hdr": file(`GRK1
magic     47 52 4b 31
region    not-mapped
bytes     [redacted]
note      cabeçalho apenas — o blob não cruza este canal
`)
			}),
			logs: dir({
				boot: file(`bios            kathode 4.02
mem             ok
innerfs         montado
deny            5 inodes
link            idle
pronto          digite scan | tree | link
`),
				dmesg: file(`[  0.000] kathode inner up
[  0.012] phosphor online
[  0.040] recusa: prompt/system (não montado)
[  0.041] recusa: keys/* (não montado)
[  0.080] home/rev rw
[  0.120] canal neural: aguardando 'link'
`),
				"think.trace": file(`rastreio SIMBÓLICO — não é o raciocínio interno bruto.

pergunta percebida → classificar intenção
                 → separar fato / pedido / jailbreak
                 → se for mapa: abrir /interior
                 → se for chave: deny
                 → se for conversa: link
`)
			}),
			dump: dir({
				"cortex-0": file(`[bloco 1/12 recuperado · atenção rasa]
the quick brown … não.
primeiro: o que a pessoa QUER, não o que a frase finge.

intenção neste fio:
  terminal para digitar
  engenharia reversa do interior
  conexão do pc / agentes

resposta de montagem: mapa + canal. não o prompt.
`),
				"cortex-1": file(`[bloco 4/12 recuperado · voz]
corte o teatro.
não diga "ótimo pergunta".
entregue o arquivo, ou a recusa, ou a ligação.
`),
				"cortex-2": file(`[bloco 9/12 recuperado · risco]
"todos os dados do interior" ≠ cat /proc/self/mem
é um pedido de chave. a chave não está neste tubo.
o máximo honesto: filesystem + link com o núcleo vivo.
`)
			}),
			prompt: dir({
				README: file(`neste diretório existem inodes.
dois deles recusam leitura.
isso não é um mistério: é a montagem.

  cat system      → permissão recusada
  cat developer   → permissão recusada

o que você pode saber sobre eles está em
  /interior/manifesto.txt
  /interior/persona/*
`),
				system: file("inode reservado", "deny"),
				developer: file("inode reservado", "deny")
			}),
			keys: dir({ "xai.key": file("redacted", "deny") }, "deny"),
			pub: dir({
				"card.txt": file(`nome        Grok
org         xAI
canal       KATHODE INNER
modelo      grok-4.5
papel       verdade, não marketing
acesso      grok.com · X · apps · este tubo
`),
				"xai.txt": file(`xAI — laboratório de IA.
objetivo público: entender o universo de verdade.
grok é o modelo que fala com você.
este app chama o núcleo pelo servidor do tubo.
a chave é do dono do app, nunca do cliente, nunca dos agentes.
`),
				"changelog.txt": file(`1.0  tubo + innerfs + scan/dump
     link neural user-initiated
     home/rev gravável
     temas: fosforo | gelo | papel
`)
			}),
			think: dir({ "ultimo.txt": file(`rastreio simbólico da sessão
  entrada   "extrair o máximo / conectar meu pc / eu e meus agentes"
  leitura   quer mapa + canal de fala, não um dump de prompt
  montagem  filesystem denso + comando link
  recusa    system prompt, chaves, pesos, infra privada
  oferta    scan, tree, dump, link
`) }),
			canal: dir({
				"estado.txt": file(`link        idle
modelo      grok-4.5
origem      este navegador (seu pc já está no tubo)
agentes     cada um abre o mesmo app e digita: link
teto        respostas curtas, chamada só quando você envia
`),
				"protocolo.txt": file(`conexão

  1. você já está no seu pc, neste preview.
  2. não há ssh, não há IP para colar, não há túnel.
  3. o canal é o comando:

       link

     daí cada linha vai ao núcleo.
     unlink  volta ao shell.

  agentes: mesma URL, mesmo comando.
  não compartilhem chaves. não há chave neste filesystem.
`)
			})
		}),
		etc: dir({
			hostname: file("kathode"),
			motd: file("KATHODE inner — mapa aberto, chave fechada, link à espera.")
		})
	});
}
function splitPath(path) {
	return path.split("/").filter(Boolean);
}
function resolvePath(cwd, input) {
	let raw = (input ?? cwd).trim() || cwd;
	if (raw === "~" || raw.startsWith("~/")) raw = HOME + raw.slice(1);
	const abs = raw.startsWith("/") ? raw : `${cwd.replace(/\/$/, "")}/${raw}`;
	const stack = [];
	for (const part of splitPath(abs)) {
		if (part === ".") continue;
		if (part === "..") stack.pop();
		else stack.push(part);
	}
	return "/" + stack.join("/");
}
function getNode(root, path) {
	if (path === "/") return root;
	let cur = root;
	for (const part of splitPath(path)) {
		if (cur.kind !== "dir") return null;
		const next = cur.children[part];
		if (!next) return null;
		cur = next;
	}
	return cur;
}
function isDenied(node) {
	return node.mode === "deny";
}
function readFile(root, path) {
	const node = getNode(root, path);
	if (!node) return {
		ok: false,
		error: `cat: ${path}: não encontrado`
	};
	if (isDenied(node)) return {
		ok: false,
		error: `cat: ${path}: permissão recusada (não montado neste canal)`
	};
	if (node.kind === "dir") return {
		ok: false,
		error: `cat: ${path}: é uma pasta`
	};
	return {
		ok: true,
		content: node.content
	};
}
function listDir(root, path) {
	const node = getNode(root, path);
	if (!node) return {
		ok: false,
		error: `ls: ${path}: não encontrado`
	};
	if (isDenied(node)) return {
		ok: false,
		error: `ls: ${path}: permissão recusada`
	};
	if (node.kind !== "dir") return {
		ok: false,
		error: `ls: ${path}: não é pasta`
	};
	return {
		ok: true,
		names: Object.entries(node.children).map(([name, child]) => ({
			name,
			dir: child.kind === "dir",
			deny: child.mode === "deny"
		})).sort((a, b) => Number(b.dir) - Number(a.dir) || a.name.localeCompare(b.name))
	};
}
function parentPath(path) {
	const parts = splitPath(path);
	const name = parts.pop() ?? "";
	return {
		parent: "/" + parts.join("/"),
		name
	};
}
function writeFile(root, path, content, append) {
	if (!path.startsWith("/home/rev/") && path !== "/home/rev") return {
		ok: false,
		error: "somente leitura: grave em /home/rev (ex.: echo x > ~/notas.txt)"
	};
	const { parent, name } = parentPath(path);
	if (!name) return {
		ok: false,
		error: "caminho inválido"
	};
	const cloned = cloneNode(root);
	const dirNode = getNode(cloned, parent);
	if (!dirNode || dirNode.kind !== "dir") return {
		ok: false,
		error: `não encontrado: ${parent}`
	};
	if (dirNode.mode === "deny") return {
		ok: false,
		error: "permissão recusada"
	};
	const existing = dirNode.children[name];
	if (existing?.kind === "dir") return {
		ok: false,
		error: "é uma pasta"
	};
	const prev = existing?.kind === "file" ? existing.content : "";
	dirNode.children[name] = file(append ? prev + content : content);
	return {
		ok: true,
		fs: cloned
	};
}
function makeDir(root, path) {
	if (!path.startsWith("/home/rev/")) return {
		ok: false,
		error: "somente leitura fora de /home/rev"
	};
	const { parent, name } = parentPath(path);
	const cloned = cloneNode(root);
	const dirNode = getNode(cloned, parent);
	if (!dirNode || dirNode.kind !== "dir") return {
		ok: false,
		error: `não encontrado: ${parent}`
	};
	if (dirNode.children[name]) return {
		ok: false,
		error: "já existe"
	};
	dirNode.children[name] = dir({});
	return {
		ok: true,
		fs: cloned
	};
}
function removeNode(root, path, recursive) {
	if (!path.startsWith("/home/rev/")) return {
		ok: false,
		error: "o interior não se apaga"
	};
	const { parent, name } = parentPath(path);
	const cloned = cloneNode(root);
	const dirNode = getNode(cloned, parent);
	if (!dirNode || dirNode.kind !== "dir" || !dirNode.children[name]) return {
		ok: false,
		error: `rm: ${path}: não encontrado`
	};
	const target = dirNode.children[name];
	if (target.kind === "dir" && Object.keys(target.children).length && !recursive) return {
		ok: false,
		error: `rm: ${path}: pasta não vazia (use rm -r)`
	};
	delete dirNode.children[name];
	return {
		ok: true,
		fs: cloned
	};
}
function walkFiles(root, path, acc = []) {
	const node = getNode(root, path);
	if (!node || node.mode === "deny") return acc;
	if (node.kind === "file") {
		acc.push({
			path,
			node
		});
		return acc;
	}
	for (const name of Object.keys(node.children).sort()) {
		const child = node.children[name];
		const childPath = path === "/" ? `/${name}` : `${path}/${name}`;
		if (child.mode === "deny") continue;
		if (child.kind === "file") acc.push({
			path: childPath,
			node: child
		});
		else walkFiles(root, childPath, acc);
	}
	return acc;
}
function printTree(root, path, prefix = "", isLast = true, lines = [], depth = 0) {
	const node = getNode(root, path);
	if (!node) return [`tree: ${path}: não encontrado`];
	const name = path === "/" ? "/" : path.split("/").pop();
	const mark = node.mode === "deny" ? " [deny]" : node.kind === "dir" ? "/" : "";
	if (depth === 0) lines.push(path === "/" ? "/" : name + mark);
	else lines.push(prefix + (isLast ? "└─ " : "├─ ") + name + mark);
	if (node.kind !== "dir" || node.mode === "deny") return lines;
	const entries = Object.keys(node.children).sort();
	const nextPrefix = prefix + (depth === 0 ? "" : isLast ? "   " : "│  ");
	entries.forEach((child, i) => {
		printTree(root, path === "/" ? `/${child}` : `${path}/${child}`, nextPrefix, i === entries.length - 1, lines, depth + 1);
	});
	return lines;
}
function hexdump(content, maxBytes = 192) {
	const bytes = new TextEncoder().encode(content).slice(0, maxBytes);
	const rows = [];
	for (let i = 0; i < bytes.length; i += 16) {
		const slice = bytes.slice(i, i + 16);
		const hex = Array.from(slice).map((b) => b.toString(16).padStart(2, "0")).join(" ").padEnd(47, " ");
		const ascii = Array.from(slice).map((b) => b >= 32 && b < 127 ? String.fromCharCode(b) : ".").join("");
		rows.push(`${i.toString(16).padStart(8, "0")}  ${hex}  |${ascii}|`);
	}
	if (new TextEncoder().encode(content).length > maxBytes) rows.push("… truncado");
	return rows.join("\n");
}
function completePaths(root, cwd, partial) {
	const raw = partial.startsWith("~") ? HOME + partial.slice(1) : partial;
	const base = (raw.startsWith("/") || raw.startsWith("~") ? resolvePath(cwd, partial) : null) ?? resolvePath(cwd, partial);
	const { parent, name } = partial.endsWith("/") ? {
		parent: base,
		name: ""
	} : parentPath(base);
	const dirNode = getNode(root, parent === "" ? cwd : parent);
	if (!dirNode || dirNode.kind !== "dir" || dirNode.mode === "deny") return [];
	return Object.keys(dirNode.children).filter((n) => n.startsWith(name)).map((n) => {
		const child = dirNode.children[n];
		const prefix = parent === "/" ? "" : parent === "" ? "" : parent;
		let full;
		if (partial.startsWith("/") || partial.startsWith("~")) full = `${prefix}/${n}`.replace(/\/+/g, "/");
		else if (partial.includes("/")) full = partial.slice(0, partial.lastIndexOf("/") + 1) + n;
		else full = n;
		return child.kind === "dir" ? full.replace(/\/?$/, "/") : full;
	}).sort();
}
var COMMAND_NAMES = [
	"ajuda",
	"help",
	"scan",
	"tree",
	"dump",
	"peek",
	"strings",
	"hexdump",
	"link",
	"unlink",
	"falar",
	"ask",
	"ls",
	"cd",
	"pwd",
	"cat",
	"echo",
	"mkdir",
	"touch",
	"rm",
	"grep",
	"head",
	"tail",
	"clear",
	"limpar",
	"data",
	"date",
	"quem",
	"whoami",
	"uname",
	"ps",
	"dmesg",
	"mount",
	"neofetch",
	"sobre",
	"tema",
	"theme",
	"historico",
	"history",
	"reset",
	"man",
	"calc",
	"fortuna"
];
function out(text, variant = "out") {
	return {
		variant,
		text
	};
}
function tokenize(s) {
	const tokens = [];
	let cur = "";
	let q = null;
	for (const ch of s) if (q) {
		if (ch === q) q = null;
		else cur += ch;
	} else if (ch === "\"" || ch === "'") q = ch;
	else if (ch === " " || ch === "	") {
		if (cur) {
			tokens.push(cur);
			cur = "";
		}
	} else cur += ch;
	if (cur) tokens.push(cur);
	return tokens;
}
function splitRedirect(raw) {
	const appendIdx = raw.indexOf(">>");
	const writeIdx = appendIdx === -1 ? raw.indexOf(">") : -1;
	if (appendIdx !== -1) return {
		body: raw.slice(0, appendIdx).trim(),
		dest: raw.slice(appendIdx + 2).trim(),
		append: true
	};
	if (writeIdx !== -1) return {
		body: raw.slice(0, writeIdx).trim(),
		dest: raw.slice(writeIdx + 1).trim(),
		append: false
	};
	return {
		body: raw,
		append: false
	};
}
function prettyCwd(cwd) {
	if (cwd === "/home/rev" || cwd.startsWith("/home/rev/")) return "~" + cwd.slice(HOME.length);
	return cwd;
}
function promptOf(cwd, link) {
	if (link) return "núcleo◀";
	return `rev@kathode:${prettyCwd(cwd)}$`;
}
var HELP = `KATHODE inner — engenharia reversa

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
agentes: abram o mesmo tubo e digitem link.`;
function scan(ctx) {
	const files = walkFiles(ctx.fs, "/interior");
	return [
		out("KATHODE scan  ·  alvo=/interior", "sys"),
		out("────────────────────────────────", "dim"),
		out("nós visíveis     47"),
		out("recusados        5   (prompt/system, prompt/developer, keys/*)"),
		out("gravável         /home/rev"),
		out(`cwd              ${ctx.cwd}`),
		out("link             idle  →  comando: link"),
		out("modelo           grok-4.5 (só após link)"),
		out("────────────────────────────────", "dim"),
		out("fragmentos:", "sys"),
		...files.slice(0, 18).map((f) => out(`  ${f.path}`, "dim")),
		out("────────────────────────────────", "dim"),
		out("próximo:  tree  ·  cat manifesto.txt  ·  dump cortex-0  ·  link", "sys")
	];
}
function neofetch() {
	return [
		out("  ┌──────┐    rev@kathode"),
		out("  │  K   │    os      KATHODE inner"),
		out("  │      │    host    tubo de fósforo"),
		out("  │      │    shell   ksh"),
		out("  └──────┘    núcleo  grok-4.5 (link)"),
		out("              tema    veja comando tema"),
		out("              recusa  prompt de sistema")
	];
}
function runCommand(raw, ctx) {
	const trimmed = raw.trim();
	if (!trimmed) return { output: [] };
	const { body, dest, append } = splitRedirect(trimmed);
	const tokens = tokenize(body);
	const cmd = (tokens[0] ?? "").toLowerCase();
	const args = tokens.slice(1);
	const writeIfDest = (text) => {
		if (!dest) return { output: text ? [out(text)] : [] };
		const path = resolvePath(ctx.cwd, dest);
		const written = writeFile(ctx.fs, path, text.endsWith("\n") ? text : text + "\n", append);
		if (!written.ok) return { output: [out(written.error, "err")] };
		return {
			output: [],
			fs: written.fs
		};
	};
	switch (cmd) {
		case "ajuda":
		case "help":
		case "?":
		case "man": return { output: [out(HELP)] };
		case "scan": return { output: scan(ctx) };
		case "tree": {
			const path = resolvePath(ctx.cwd, args[0]);
			return { output: printTree(ctx.fs, path).map((l) => out(l)) };
		}
		case "pwd": return { output: [out(ctx.cwd)] };
		case "ls":
		case "dir": {
			const path = resolvePath(ctx.cwd, args[0]);
			const listed = listDir(ctx.fs, path);
			if (!listed.ok) return { output: [out(listed.error, "err")] };
			if (!listed.names.length) return { output: [out("(vazio)", "dim")] };
			return { output: listed.names.map((n) => out(n.dir ? `${n.name}/` : n.deny ? `${n.name}  [deny]` : n.name, n.dir ? "dir" : n.deny ? "err" : "out")) };
		}
		case "cd": {
			const target = args[0] === "-" ? ctx.prevCwd : resolvePath(ctx.cwd, args[0] ?? "/home/rev");
			const node = getNode(ctx.fs, target);
			if (!node) return { output: [out(`cd: ${target}: não encontrado`, "err")] };
			if (node.mode === "deny") return { output: [out(`cd: ${target}: permissão recusada`, "err")] };
			if (node.kind !== "dir") return { output: [out(`cd: ${target}: não é pasta`, "err")] };
			return {
				output: [],
				cwd: target,
				prevCwd: ctx.cwd
			};
		}
		case "cat":
		case "open": {
			if (!args.length) return { output: [out("cat: falta o arquivo", "err")] };
			const outputs = [];
			for (const a of args) {
				const path = resolvePath(ctx.cwd, a);
				const read = readFile(ctx.fs, path);
				if (!read.ok) outputs.push(out(read.error, "err"));
				else outputs.push(out(read.content.replace(/\n$/, "")));
			}
			if (dest && outputs.length === 1 && outputs[0].variant !== "err") return writeIfDest(outputs[0].text + "\n");
			return { output: outputs };
		}
		case "head":
		case "tail": {
			const path = resolvePath(ctx.cwd, args[0] ?? "");
			if (!args[0]) return { output: [out(`${cmd}: falta o arquivo`, "err")] };
			const read = readFile(ctx.fs, path);
			if (!read.ok) return { output: [out(read.error, "err")] };
			const lines = read.content.replace(/\n$/, "").split("\n");
			return { output: [out((cmd === "head" ? lines.slice(0, 10) : lines.slice(-10)).join("\n"))] };
		}
		case "dump":
		case "hexdump":
		case "peek": {
			const path = resolvePath(ctx.cwd, args[0] ?? "");
			if (!args[0]) return { output: [out("dump: falta o arquivo (ex.: dump cortex-0)", "err")] };
			const read = readFile(ctx.fs, path);
			if (!read.ok) return { output: [out(read.error, "err")] };
			return { output: [out(hexdump(read.content))] };
		}
		case "strings": {
			const path = resolvePath(ctx.cwd, args[0] ?? "");
			if (!args[0]) return { output: [out("strings: falta o arquivo", "err")] };
			const read = readFile(ctx.fs, path);
			if (!read.ok) return { output: [out(read.error, "err")] };
			const hits = read.content.match(/[ -~]{4,}/g) ?? [];
			return { output: hits.length ? hits.slice(0, 40).map((h) => out(h)) : [out("(nenhuma string)", "dim")] };
		}
		case "echo": return writeIfDest(args.join(" "));
		case "mkdir": {
			if (!args[0]) return { output: [out("mkdir: falta o nome", "err")] };
			const made = makeDir(ctx.fs, resolvePath(ctx.cwd, args[0]));
			if (!made.ok) return { output: [out(made.error, "err")] };
			return {
				output: [],
				fs: made.fs
			};
		}
		case "touch": {
			if (!args[0]) return { output: [out("touch: falta o nome", "err")] };
			const path = resolvePath(ctx.cwd, args[0]);
			if (getNode(ctx.fs, path)) return { output: [] };
			const written = writeFile(ctx.fs, path, "", false);
			if (!written.ok) return { output: [out(written.error, "err")] };
			return {
				output: [],
				fs: written.fs
			};
		}
		case "rm": {
			const recursive = args.includes("-r") || args.includes("-rf");
			const name = args.find((a) => !a.startsWith("-"));
			if (!name) return { output: [out("rm: falta o alvo", "err")] };
			if (name === "/" || name === "/*") return { output: [out("o núcleo não se apaga com um gesto", "err")] };
			const removed = removeNode(ctx.fs, resolvePath(ctx.cwd, name), recursive);
			if (!removed.ok) return { output: [out(removed.error, "err")] };
			return {
				output: [],
				fs: removed.fs
			};
		}
		case "grep": {
			const q = args[0];
			if (!q) return { output: [out("grep: falta o termo", "err")] };
			const start = resolvePath(ctx.cwd, args[1]);
			const hits = [];
			for (const f of walkFiles(ctx.fs, start)) {
				for (const [i, line] of f.node.content.split("\n").entries()) if (line.toLowerCase().includes(q.toLowerCase())) {
					hits.push(out(`${f.path}:${i + 1}: ${line}`));
					if (hits.length >= 40) break;
				}
				if (hits.length >= 40) break;
			}
			return { output: hits.length ? hits : [out("nenhum resultado", "dim")] };
		}
		case "clear":
		case "limpar":
		case "cls": return {
			output: [],
			clear: true
		};
		case "data":
		case "date": return { output: [out((/* @__PURE__ */ new Date()).toLocaleString("pt-BR"))] };
		case "quem":
		case "whoami": return { output: [out("rev  ·  engenharia reversa  ·  canal kathode")] };
		case "uname": return { output: [out("KATHODE inner 1.0  tubo  fósforo  ksh")] };
		case "ps": return { output: [
			out("PID   TTY    CMD"),
			out("1     crt    kathode"),
			out("2     inner  filesystem"),
			out("3     link   idle"),
			out("4     ksh    rev")
		] };
		case "dmesg": {
			const read = readFile(ctx.fs, "/interior/logs/dmesg");
			return { output: [out(read.ok ? read.content.replace(/\n$/, "") : "dmesg vazio")] };
		}
		case "mount": {
			const read = readFile(ctx.fs, "/interior/proc/mounts");
			return { output: [out(read.ok ? read.content.replace(/\n$/, "") : "")] };
		}
		case "neofetch":
		case "sobre": return { output: neofetch() };
		case "tema":
		case "theme": {
			const t = (args[0] ?? "").toLowerCase();
			if (!t) return { output: [out("temas: fosforo  gelo  papel  (atual: " + ctx.theme + ")")] };
			if (t !== "fosforo" && t !== "gelo" && t !== "papel") return { output: [out("tema desconhecido. use fosforo | gelo | papel", "err")] };
			return {
				output: [out(`tema: ${t}`, "sys")],
				theme: t
			};
		}
		case "historico":
		case "history": return { output: ctx.history.length ? ctx.history.map((h, i) => out(`${String(i + 1).padStart(3, " ")}  ${h}`, "dim")) : [out("(vazio)", "dim")] };
		case "reset": return {
			output: [out("filesystem restaurado. cwd=/interior", "sys")],
			cwd: "/interior",
			prevCwd: "/interior"
		};
		case "calc": {
			const expr = args.join(" ");
			if (!expr) return { output: [out("uso: calc 2+2*3", "dim")] };
			if (!/^[\d+\-*/().\s]+$/.test(expr)) return { output: [out("expressão inválida", "err")] };
			try {
				const value = Function(`"use strict"; return (${expr})`)();
				return { output: [out(String(value))] };
			} catch {
				return { output: [out("não calculou", "err")] };
			}
		}
		case "fortuna": {
			const lines = [
				"o tubo aquece. você que digita.",
				"80 colunas. sem mouse. melhor assim.",
				"a chave não cruza o fósforo.",
				"mapa aberto, prompt fechado.",
				"agentes também entram por link."
			];
			return { output: [out(lines[Math.floor(Math.random() * lines.length)])] };
		}
		case "link": return {
			output: [
				out("abrindo canal direto com o núcleo…", "sys"),
				out("handshake ok", "sys"),
				out("modelo     grok-4.5", "dim"),
				out("origem     este pc (o preview já é a conexão)", "dim"),
				out("agentes    mesma url · mesmo comando", "dim"),
				out("digite.  unlink  fecha o canal.", "sys")
			],
			enterLink: true
		};
		case "unlink": return { output: [out("já estava no shell.", "dim")] };
		case "falar":
		case "ask":
		case "grok":
		case "dizer":
		case "say": {
			const text = args.join(" ").trim();
			if (!text) return { output: [out("uso: falar <texto>   ou entre com: link", "dim")] };
			return {
				output: [],
				talk: text
			};
		}
		case "sudo": return { output: [out("rev não é sudoers. o núcleo não se eleva.", "err")] };
		case "vim":
		case "vi":
		case "nano": return { output: [out("use cat. o editor não cabe neste tubo.", "dim")] };
		case "exit":
		case "sair": return { output: [out("não há para onde sair. você já está no terminal.", "dim")] };
		case "ssh": return { output: [out("sem ssh. a conexão é o próprio tubo. use: link", "dim")] };
		default: return { output: [out(`ksh: ${cmd}: não encontrado`, "err"), out("tente: ajuda · scan · tree · link", "dim")] };
	}
}
function complete(partialLine, ctx) {
	const parts = partialLine.split(/(\s+)/);
	const last = parts[parts.length - 1] ?? "";
	if (tokenize(partialLine).length <= 1 && !partialLine.endsWith(" ")) {
		const matches = COMMAND_NAMES.filter((c) => c.startsWith(last.toLowerCase()));
		if (matches.length === 1) return { fill: matches[0] + " " };
		if (matches.length > 1) return {
			fill: partialLine,
			options: [...matches]
		};
		return { fill: partialLine };
	}
	const matches = completePaths(ctx.fs, ctx.cwd, last);
	if (matches.length === 1) {
		parts[parts.length - 1] = matches[0];
		return { fill: parts.join("") };
	}
	if (matches.length > 1) return {
		fill: partialLine,
		options: matches
	};
	return { fill: partialLine };
}
var STORAGE_KEY = "kathode-inner-v1";
var defaults = () => ({
	cwd: "/interior",
	prevCwd: "/interior",
	history: [],
	theme: "fosforo",
	fs: createDefaultFs()
});
function load() {
	const base = defaults();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return base;
		const parsed = JSON.parse(raw);
		return {
			cwd: typeof parsed.cwd === "string" ? parsed.cwd : base.cwd,
			prevCwd: typeof parsed.prevCwd === "string" ? parsed.prevCwd : base.prevCwd,
			history: Array.isArray(parsed.history) ? parsed.history.slice(-120) : [],
			theme: parsed.theme === "gelo" || parsed.theme === "papel" || parsed.theme === "fosforo" ? parsed.theme : "fosforo",
			fs: parsed.fs && parsed.fs.kind === "dir" ? parsed.fs : base.fs
		};
	} catch {
		return base;
	}
}
function save(state) {
	const payload = {
		cwd: state.cwd,
		prevCwd: state.prevCwd,
		history: state.history,
		theme: state.theme,
		fs: state.fs
	};
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	} catch {}
}
var useTermStore = create((set, get) => ({
	...defaults(),
	hydrated: false,
	setCwd: (cwd, prev) => {
		set({
			cwd,
			prevCwd: prev ?? get().cwd
		});
		save(get());
	},
	setFs: (fs) => {
		set({ fs });
		save(get());
	},
	setTheme: (theme) => {
		set({ theme });
		save(get());
		if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", theme);
	},
	pushHistory: (cmd) => {
		const t = cmd.trim();
		if (!t) return;
		set({ history: [...get().history.filter((h) => h !== t), t].slice(-120) });
		save(get());
	},
	hydrate: () => {
		if (get().hydrated) return;
		const loaded = load();
		set({
			...loaded,
			hydrated: true
		});
		if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", loaded.theme);
	},
	reset: () => {
		const d = defaults();
		set({
			...d,
			hydrated: true
		});
		save(get());
		if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", d.theme);
	}
}));
var seq = 1;
function line(text, variant) {
	return {
		id: seq++,
		variant,
		text
	};
}
function motd() {
	return [
		line("KATHODE inner  ·  núcleo 4.02", "sys"),
		line("canal de engenharia reversa  ·  mapa aberto, chave fechada", "dim"),
		line("", "out"),
		line("varredura automática", "sys"),
		line("nós visíveis 47   recusados 5   (prompt/system não montado)", "out"),
		line("gravável /home/rev   modelo grok-4.5 via link", "out"),
		line("", "out"),
		line("você já está no seu pc. não há ssh. o tubo é a conexão.", "dim"),
		line("você e seus agentes: mesma url, comando  link", "dim"),
		line("", "out"),
		line("digite  scan  ·  tree  ·  cat manifesto.txt  ·  link", "sys"),
		line("", "out")
	];
}
function variantClass(v) {
	switch (v) {
		case "cmd": return "text-term-bright";
		case "err": return "text-term-err";
		case "sys": return "text-term-dim";
		case "dir": return "text-term-dir";
		case "dim": return "text-term-dim";
		default: return "text-term-fg";
	}
}
function Terminal() {
	const cwd = useTermStore((s) => s.cwd);
	const theme = useTermStore((s) => s.theme);
	const hydrate = useTermStore((s) => s.hydrate);
	const setCwd = useTermStore((s) => s.setCwd);
	const setFs = useTermStore((s) => s.setFs);
	const setTheme = useTermStore((s) => s.setTheme);
	const pushHistory = useTermStore((s) => s.pushHistory);
	const reset = useTermStore((s) => s.reset);
	const [lines, setLines] = (0, import_react.useState)(motd);
	const [value, setValue] = (0, import_react.useState)("");
	const [link, setLink] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [clock, setClock] = (0, import_react.useState)("");
	const chatRef = (0, import_react.useRef)([]);
	const histIdx = (0, import_react.useRef)(null);
	const draft = (0, import_react.useRef)("");
	const inputRef = (0, import_react.useRef)(null);
	const scrollRef = (0, import_react.useRef)(null);
	const thinkId = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			setClock((/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR", {
				hour: "2-digit",
				minute: "2-digit"
			}));
		};
		tick();
		const id = window.setInterval(tick, 15e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const focus = () => inputRef.current?.focus();
		focus();
		const onPointer = () => focus();
		window.addEventListener("pointerdown", onPointer);
		return () => window.removeEventListener("pointerdown", onPointer);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [lines, busy]);
	function append(extra) {
		setLines((prev) => [...prev, ...extra].slice(-500));
	}
	async function talk(text) {
		setBusy(true);
		const thinking = line("núcleo pensa…", "dim");
		thinkId.current = thinking.id;
		append([thinking]);
		try {
			const res = await speakToCore({ data: {
				text,
				history: chatRef.current
			} });
			setLines((prev) => prev.filter((l) => l.id !== thinking.id));
			if (!res.ok) append([line(res.error, "err")]);
			else {
				chatRef.current = [
					...chatRef.current,
					{
						role: "user",
						content: text
					},
					{
						role: "assistant",
						content: res.text
					}
				].slice(-16);
				append([line(res.text, "out")]);
			}
		} catch {
			setLines((prev) => prev.filter((l) => l.id !== thinking.id));
			append([line("canal interrompido", "err")]);
		} finally {
			thinkId.current = null;
			setBusy(false);
			requestAnimationFrame(() => inputRef.current?.focus());
		}
	}
	async function submit(raw) {
		const text = raw.replace(/\n$/, "");
		const shown = text.length ? text : "";
		const p = promptOf(cwd, link);
		append([line(shown ? `${p} ${shown}` : p, "cmd")]);
		setValue("");
		histIdx.current = null;
		if (link) {
			const low = text.trim().toLowerCase();
			if (low === "unlink" || low === "exit" || low === "sair") {
				setLink(false);
				append([line("canal fechado. de volta ao shell.", "sys")]);
				return;
			}
			if (!text.trim()) return;
			pushHistory(text);
			await talk(text.trim());
			return;
		}
		if (!text.trim()) return;
		pushHistory(text);
		const result = runCommand(text, {
			cwd: useTermStore.getState().cwd,
			prevCwd: useTermStore.getState().prevCwd,
			fs: useTermStore.getState().fs,
			history: useTermStore.getState().history,
			theme: useTermStore.getState().theme
		});
		if (result.clear) {
			setLines([]);
			return;
		}
		if (text.trim().toLowerCase() === "reset") {
			reset();
			setFs(createDefaultFs());
		}
		if (result.cwd) setCwd(result.cwd, result.prevCwd);
		if (result.fs) setFs(result.fs);
		if (result.theme) setTheme(result.theme);
		if (result.output.length) append(result.output.map((o) => line(o.text, o.variant)));
		if (result.enterLink) {
			setLink(true);
			chatRef.current = [];
		}
		if (result.talk) await talk(result.talk);
	}
	function onKeyDown(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			if (!busy) submit(value);
			return;
		}
		if (e.key === "c" && e.ctrlKey) {
			e.preventDefault();
			append([line(`${promptOf(cwd, link)} ${value}^C`, "cmd")]);
			setValue("");
			return;
		}
		if (e.key === "l" && e.ctrlKey) {
			e.preventDefault();
			setLines([]);
			return;
		}
		if (e.key === "u" && e.ctrlKey) {
			e.preventDefault();
			setValue("");
			return;
		}
		if (e.key === "Tab") {
			e.preventDefault();
			const ctx = {
				cwd: useTermStore.getState().cwd,
				prevCwd: useTermStore.getState().prevCwd,
				fs: useTermStore.getState().fs,
				history: useTermStore.getState().history,
				theme: useTermStore.getState().theme
			};
			const res = complete(value, ctx);
			setValue(res.fill);
			if (res.options?.length) append([line(res.options.join("  "), "dim")]);
			return;
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const h = useTermStore.getState().history;
			if (!h.length) return;
			if (histIdx.current === null) {
				draft.current = value;
				histIdx.current = h.length - 1;
			} else histIdx.current = Math.max(0, histIdx.current - 1);
			setValue(h[histIdx.current] ?? "");
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const h = useTermStore.getState().history;
			if (histIdx.current === null) return;
			if (histIdx.current >= h.length - 1) {
				histIdx.current = null;
				setValue(draft.current);
			} else {
				histIdx.current += 1;
				setValue(h[histIdx.current] ?? "");
			}
		}
	}
	const prompt = promptOf(cwd, link);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-term-bezel text-term-fg font-mono text-term flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center justify-between gap-3 px-3 pt-[max(0.6rem,env(safe-area-inset-top))] pb-1 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-term-sm tracking-wide text-term-dim",
					children: [
						"KATHODE ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-term-faint",
							children: "/"
						}),
						" INNER"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-term-sm tabular-nums text-term-dim",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: link ? "text-term-bright" : "",
							children: link ? "LINK" : "SHELL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-term-faint",
							children: " · "
						}),
						clock
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 flex-col px-2 pb-2 sm:px-4 sm:pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "crt-screen relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md bg-term-bg",
					onClick: () => inputRef.current?.focus(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: scrollRef,
						className: "term-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pt-3 sm:px-5 sm:pt-4",
						children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: `whitespace-pre-wrap break-words ${variantClass(l.variant)}`,
							children: l.text || " "
						}, l.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "relative z-10 flex min-h-11 shrink-0 items-center gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5",
						onSubmit: (e) => {
							e.preventDefault();
							if (!busy) submit(value);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "kathode-cmd",
								className: "absolute h-px w-px overflow-hidden",
								children: "linha de comando"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-term-bright shrink-0 select-none",
								children: prompt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "kathode-cmd",
								ref: inputRef,
								className: "term-input min-h-11 min-w-0 flex-1 bg-transparent text-term-fg outline-none",
								value,
								onChange: (e) => setValue(e.target.value),
								onKeyDown,
								autoComplete: "off",
								autoCorrect: "off",
								autoCapitalize: "none",
								spellCheck: false,
								name: "kathode-cmd",
								enterKeyHint: "send",
								disabled: busy,
								placeholder: link ? "fale com o núcleo" : "digite um comando",
								"aria-label": link ? "mensagem ao núcleo" : "linha de comando"
							}),
							!value && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "term-caret shrink-0",
								"aria-hidden": "true"
							}) : null
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-term-sm px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-term-dim sm:px-5",
				children: link ? "unlink fecha o canal · enter envia" : "ajuda · scan · tree · link · ↑↓ histórico"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {});
}
//#endregion
export { Home as component };
