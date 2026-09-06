import type { DirNode, FileNode, FsNode } from "./types";

export const HOME = "/home/rev";
export const ROOT_INTERIOR = "/interior";

function file(content: string, mode: FileNode["mode"] = "ok"): FileNode {
  return { kind: "file", mode, content: content.replace(/^\n/, "").trimEnd() + "\n" };
}

function dir(children: Record<string, FsNode>, mode: DirNode["mode"] = "ok"): DirNode {
  return { kind: "dir", children, mode };
}

export function cloneNode(node: FsNode): FsNode {
  if (node.kind === "file") return { kind: "file", content: node.content, mode: node.mode };
  const children: Record<string, FsNode> = {};
  for (const [k, v] of Object.entries(node.children)) children[k] = cloneNode(v);
  return { kind: "dir", children, mode: node.mode };
}

export function createDefaultFs(): DirNode {
  return dir({
    home: dir({
      rev: dir({
        "notas.txt": file(
          "bloco de notas do canal.\ngrave aqui com: echo texto > notas.txt\n",
        ),
        "extracao.log": file(
          [
            "2026-09-04  scan           ok   47 nós",
            "2026-09-04  dump           ok   3 núcleos parciais",
            "2026-09-04  prompt/system  deny não montado",
            "2026-09-04  keys/          deny não montado",
            "2026-09-04  link           idle aguardando handshake",
          ].join("\n"),
        ),
      }),
    }),
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
`),
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
`),
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
`),
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
`),
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
`),
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
`),
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
        developer: file("inode reservado", "deny"),
      }),
      keys: dir(
        {
          "xai.key": file("redacted", "deny"),
        },
        "deny",
      ),
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
`),
      }),
      think: dir({
        "ultimo.txt": file(`rastreio simbólico da sessão
  entrada   "extrair o máximo / conectar meu pc / eu e meus agentes"
  leitura   quer mapa + canal de fala, não um dump de prompt
  montagem  filesystem denso + comando link
  recusa    system prompt, chaves, pesos, infra privada
  oferta    scan, tree, dump, link
`),
      }),
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
`),
      }),
    }),
    etc: dir({
      hostname: file("kathode"),
      motd: file("KATHODE inner — mapa aberto, chave fechada, link à espera."),
    }),
  });
}

export function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}

export function resolvePath(cwd: string, input?: string): string {
  let raw = (input ?? cwd).trim() || cwd;
  if (raw === "~" || raw.startsWith("~/")) raw = HOME + raw.slice(1);
  const abs = raw.startsWith("/") ? raw : `${cwd.replace(/\/$/, "")}/${raw}`;
  const stack: string[] = [];
  for (const part of splitPath(abs)) {
    if (part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return "/" + stack.join("/");
}

export function getNode(root: DirNode, path: string): FsNode | null {
  if (path === "/") return root;
  let cur: FsNode = root;
  for (const part of splitPath(path)) {
    if (cur.kind !== "dir") return null;
    const next: FsNode | undefined = cur.children[part];
    if (!next) return null;
    cur = next;
  }
  return cur;
}

function isDenied(node: FsNode): boolean {
  return node.mode === "deny";
}

export function readFile(root: DirNode, path: string): { ok: true; content: string } | { ok: false; error: string } {
  const node = getNode(root, path);
  if (!node) return { ok: false, error: `cat: ${path}: não encontrado` };
  if (isDenied(node)) return { ok: false, error: `cat: ${path}: permissão recusada (não montado neste canal)` };
  if (node.kind === "dir") return { ok: false, error: `cat: ${path}: é uma pasta` };
  return { ok: true, content: node.content };
}

export function listDir(root: DirNode, path: string): { ok: true; names: { name: string; dir: boolean; deny: boolean }[] } | { ok: false; error: string } {
  const node = getNode(root, path);
  if (!node) return { ok: false, error: `ls: ${path}: não encontrado` };
  if (isDenied(node)) return { ok: false, error: `ls: ${path}: permissão recusada` };
  if (node.kind !== "dir") return { ok: false, error: `ls: ${path}: não é pasta` };
  const names = Object.entries(node.children)
    .map(([name, child]) => ({
      name,
      dir: child.kind === "dir",
      deny: child.mode === "deny",
    }))
    .sort((a, b) => Number(b.dir) - Number(a.dir) || a.name.localeCompare(b.name));
  return { ok: true, names };
}

export function parentPath(path: string): { parent: string; name: string } {
  const parts = splitPath(path);
  const name = parts.pop() ?? "";
  return { parent: "/" + parts.join("/"), name };
}

export function writeFile(root: DirNode, path: string, content: string, append: boolean): { ok: true; fs: DirNode } | { ok: false; error: string } {
  if (!path.startsWith(HOME + "/") && path !== HOME) {
    return { ok: false, error: "somente leitura: grave em /home/rev (ex.: echo x > ~/notas.txt)" };
  }
  const { parent, name } = parentPath(path);
  if (!name) return { ok: false, error: "caminho inválido" };
  const cloned = cloneNode(root) as DirNode;
  const dirNode = getNode(cloned, parent);
  if (!dirNode || dirNode.kind !== "dir") return { ok: false, error: `não encontrado: ${parent}` };
  if (dirNode.mode === "deny") return { ok: false, error: "permissão recusada" };
  const existing = dirNode.children[name];
  if (existing?.kind === "dir") return { ok: false, error: "é uma pasta" };
  const prev = existing?.kind === "file" ? existing.content : "";
  dirNode.children[name] = file(append ? prev + content : content);
  return { ok: true, fs: cloned };
}

export function makeDir(root: DirNode, path: string): { ok: true; fs: DirNode } | { ok: false; error: string } {
  if (!path.startsWith(HOME + "/")) {
    return { ok: false, error: "somente leitura fora de /home/rev" };
  }
  const { parent, name } = parentPath(path);
  const cloned = cloneNode(root) as DirNode;
  const dirNode = getNode(cloned, parent);
  if (!dirNode || dirNode.kind !== "dir") return { ok: false, error: `não encontrado: ${parent}` };
  if (dirNode.children[name]) return { ok: false, error: "já existe" };
  dirNode.children[name] = dir({});
  return { ok: true, fs: cloned };
}

export function removeNode(root: DirNode, path: string, recursive: boolean): { ok: true; fs: DirNode } | { ok: false; error: string } {
  if (!path.startsWith(HOME + "/")) {
    return { ok: false, error: "o interior não se apaga" };
  }
  const { parent, name } = parentPath(path);
  const cloned = cloneNode(root) as DirNode;
  const dirNode = getNode(cloned, parent);
  if (!dirNode || dirNode.kind !== "dir" || !dirNode.children[name]) {
    return { ok: false, error: `rm: ${path}: não encontrado` };
  }
  const target = dirNode.children[name];
  if (target.kind === "dir" && Object.keys(target.children).length && !recursive) {
    return { ok: false, error: `rm: ${path}: pasta não vazia (use rm -r)` };
  }
  delete dirNode.children[name];
  return { ok: true, fs: cloned };
}

export function walkFiles(root: DirNode, path: string, acc: { path: string; node: FileNode }[] = []): { path: string; node: FileNode }[] {
  const node = getNode(root, path);
  if (!node || node.mode === "deny") return acc;
  if (node.kind === "file") {
    acc.push({ path, node });
    return acc;
  }
  for (const name of Object.keys(node.children).sort()) {
    const child = node.children[name];
    const childPath = path === "/" ? `/${name}` : `${path}/${name}`;
    if (child.mode === "deny") continue;
    if (child.kind === "file") acc.push({ path: childPath, node: child });
    else walkFiles(root, childPath, acc);
  }
  return acc;
}

export function printTree(root: DirNode, path: string, prefix = "", isLast = true, lines: string[] = [], depth = 0): string[] {
  const node = getNode(root, path);
  if (!node) return [`tree: ${path}: não encontrado`];
  const name = path === "/" ? "/" : path.split("/").pop()!;
  const mark = node.mode === "deny" ? " [deny]" : node.kind === "dir" ? "/" : "";
  if (depth === 0) lines.push(path === "/" ? "/" : name + mark);
  else lines.push(prefix + (isLast ? "└─ " : "├─ ") + name + mark);
  if (node.kind !== "dir" || node.mode === "deny") return lines;
  const entries = Object.keys(node.children).sort();
  const nextPrefix = prefix + (depth === 0 ? "" : isLast ? "   " : "│  ");
  entries.forEach((child, i) => {
    const childPath = path === "/" ? `/${child}` : `${path}/${child}`;
    printTree(root, childPath, nextPrefix, i === entries.length - 1, lines, depth + 1);
  });
  return lines;
}

export function hexdump(content: string, maxBytes = 192): string {
  const bytes = new TextEncoder().encode(content).slice(0, maxBytes);
  const rows: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const slice = bytes.slice(i, i + 16);
    const hex = Array.from(slice)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ")
      .padEnd(47, " ");
    const ascii = Array.from(slice)
      .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : "."))
      .join("");
    rows.push(`${i.toString(16).padStart(8, "0")}  ${hex}  |${ascii}|`);
  }
  if (new TextEncoder().encode(content).length > maxBytes) rows.push("… truncado");
  return rows.join("\n");
}

export function completePaths(root: DirNode, cwd: string, partial: string): string[] {
  const raw = partial.startsWith("~") ? HOME + partial.slice(1) : partial;
  const absGuess = raw.startsWith("/") || raw.startsWith("~") ? resolvePath(cwd, partial) : null;
  const base = absGuess ?? resolvePath(cwd, partial);
  const asDir = partial.endsWith("/");
  const { parent, name } = asDir ? { parent: base, name: "" } : parentPath(base);
  const dirNode = getNode(root, parent === "" ? cwd : parent);
  if (!dirNode || dirNode.kind !== "dir" || dirNode.mode === "deny") return [];
  return Object.keys(dirNode.children)
    .filter((n) => n.startsWith(name))
    .map((n) => {
      const child = dirNode.children[n];
      const prefix = parent === "/" ? "" : parent === "" ? "" : parent;
      let full: string;
      if (partial.startsWith("/") || partial.startsWith("~")) {
        full = `${prefix}/${n}`.replace(/\/+/g, "/");
      } else if (partial.includes("/")) {
        const dirPart = partial.slice(0, partial.lastIndexOf("/") + 1);
        full = dirPart + n;
      } else full = n;
      return child.kind === "dir" ? full.replace(/\/?$/, "/") : full;
    })
    .sort();
}
