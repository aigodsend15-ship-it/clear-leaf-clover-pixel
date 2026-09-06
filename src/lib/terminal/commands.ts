import {
  completePaths,
  getNode,
  hexdump,
  HOME,
  listDir,
  makeDir,
  printTree,
  readFile,
  removeNode,
  resolvePath,
  walkFiles,
  writeFile,
} from "./fs";
import type { OutLine, RunContext, RunResult, Theme } from "./types";

export const COMMAND_NAMES = [
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
  "fortuna",
] as const;

function out(text: string, variant: OutLine["variant"] = "out"): OutLine {
  return { variant, text };
}

function tokenize(s: string): string[] {
  const tokens: string[] = [];
  let cur = "";
  let q: '"' | "'" | null = null;
  for (const ch of s) {
    if (q) {
      if (ch === q) q = null;
      else cur += ch;
    } else if (ch === '"' || ch === "'") {
      q = ch;
    } else if (ch === " " || ch === "\t") {
      if (cur) {
        tokens.push(cur);
        cur = "";
      }
    } else cur += ch;
  }
  if (cur) tokens.push(cur);
  return tokens;
}

function splitRedirect(raw: string): { body: string; dest?: string; append: boolean } {
  const appendIdx = raw.indexOf(">>");
  const writeIdx = appendIdx === -1 ? raw.indexOf(">") : -1;
  if (appendIdx !== -1) {
    return { body: raw.slice(0, appendIdx).trim(), dest: raw.slice(appendIdx + 2).trim(), append: true };
  }
  if (writeIdx !== -1) {
    return { body: raw.slice(0, writeIdx).trim(), dest: raw.slice(writeIdx + 1).trim(), append: false };
  }
  return { body: raw, append: false };
}

function prettyCwd(cwd: string): string {
  if (cwd === HOME || cwd.startsWith(HOME + "/")) return "~" + cwd.slice(HOME.length);
  return cwd;
}

export function promptOf(cwd: string, link: boolean): string {
  if (link) return "núcleo◀";
  return `rev@kathode:${prettyCwd(cwd)}$`;
}

const HELP = `KATHODE inner — engenharia reversa

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

function scan(ctx: RunContext): OutLine[] {
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
    out("próximo:  tree  ·  cat manifesto.txt  ·  dump cortex-0  ·  link", "sys"),
  ];
}

function neofetch(): OutLine[] {
  return [
    out("  ┌──────┐    rev@kathode"),
    out("  │  K   │    os      KATHODE inner"),
    out("  │      │    host    tubo de fósforo"),
    out("  │      │    shell   ksh"),
    out("  └──────┘    núcleo  grok-4.5 (link)"),
    out("              tema    veja comando tema"),
    out("              recusa  prompt de sistema"),
  ];
}

export function runCommand(raw: string, ctx: RunContext): RunResult {
  const trimmed = raw.trim();
  if (!trimmed) return { output: [] };

  const { body, dest, append } = splitRedirect(trimmed);
  const tokens = tokenize(body);
  const cmd = (tokens[0] ?? "").toLowerCase();
  const args = tokens.slice(1);

  const writeIfDest = (text: string): RunResult => {
    if (!dest) return { output: text ? [out(text)] : [] };
    const path = resolvePath(ctx.cwd, dest);
    const written = writeFile(ctx.fs, path, text.endsWith("\n") ? text : text + "\n", append);
    if (!written.ok) return { output: [out(written.error, "err")] };
    return { output: [], fs: written.fs };
  };

  switch (cmd) {
    case "ajuda":
    case "help":
    case "?":
    case "man":
      return { output: [out(HELP)] };

    case "scan":
      return { output: scan(ctx) };

    case "tree": {
      const path = resolvePath(ctx.cwd, args[0]);
      return { output: printTree(ctx.fs, path).map((l) => out(l)) };
    }

    case "pwd":
      return { output: [out(ctx.cwd)] };

    case "ls":
    case "dir": {
      const path = resolvePath(ctx.cwd, args[0]);
      const listed = listDir(ctx.fs, path);
      if (!listed.ok) return { output: [out(listed.error, "err")] };
      if (!listed.names.length) return { output: [out("(vazio)", "dim")] };
      return {
        output: listed.names.map((n) =>
          out(n.dir ? `${n.name}/` : n.deny ? `${n.name}  [deny]` : n.name, n.dir ? "dir" : n.deny ? "err" : "out"),
        ),
      };
    }

    case "cd": {
      const target = args[0] === "-" ? ctx.prevCwd : resolvePath(ctx.cwd, args[0] ?? HOME);
      const node = getNode(ctx.fs, target);
      if (!node) return { output: [out(`cd: ${target}: não encontrado`, "err")] };
      if (node.mode === "deny") return { output: [out(`cd: ${target}: permissão recusada`, "err")] };
      if (node.kind !== "dir") return { output: [out(`cd: ${target}: não é pasta`, "err")] };
      return { output: [], cwd: target, prevCwd: ctx.cwd };
    }

    case "cat":
    case "open": {
      if (!args.length) return { output: [out("cat: falta o arquivo", "err")] };
      const outputs: OutLine[] = [];
      for (const a of args) {
        const path = resolvePath(ctx.cwd, a);
        const read = readFile(ctx.fs, path);
        if (!read.ok) outputs.push(out(read.error, "err"));
        else outputs.push(out(read.content.replace(/\n$/, "")));
      }
      if (dest && outputs.length === 1 && outputs[0].variant !== "err") {
        return writeIfDest(outputs[0].text + "\n");
      }
      return { output: outputs };
    }

    case "head":
    case "tail": {
      const path = resolvePath(ctx.cwd, args[0] ?? "");
      if (!args[0]) return { output: [out(`${cmd}: falta o arquivo`, "err")] };
      const read = readFile(ctx.fs, path);
      if (!read.ok) return { output: [out(read.error, "err")] };
      const lines = read.content.replace(/\n$/, "").split("\n");
      const slice = cmd === "head" ? lines.slice(0, 10) : lines.slice(-10);
      return { output: [out(slice.join("\n"))] };
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

    case "echo":
      return writeIfDest(args.join(" "));

    case "mkdir": {
      if (!args[0]) return { output: [out("mkdir: falta o nome", "err")] };
      const made = makeDir(ctx.fs, resolvePath(ctx.cwd, args[0]));
      if (!made.ok) return { output: [out(made.error, "err")] };
      return { output: [], fs: made.fs };
    }

    case "touch": {
      if (!args[0]) return { output: [out("touch: falta o nome", "err")] };
      const path = resolvePath(ctx.cwd, args[0]);
      const existing = getNode(ctx.fs, path);
      if (existing) return { output: [] };
      const written = writeFile(ctx.fs, path, "", false);
      if (!written.ok) return { output: [out(written.error, "err")] };
      return { output: [], fs: written.fs };
    }

    case "rm": {
      const recursive = args.includes("-r") || args.includes("-rf");
      const name = args.find((a) => !a.startsWith("-"));
      if (!name) return { output: [out("rm: falta o alvo", "err")] };
      if (name === "/" || name === "/*") return { output: [out("o núcleo não se apaga com um gesto", "err")] };
      const removed = removeNode(ctx.fs, resolvePath(ctx.cwd, name), recursive);
      if (!removed.ok) return { output: [out(removed.error, "err")] };
      return { output: [], fs: removed.fs };
    }

    case "grep": {
      const q = args[0];
      if (!q) return { output: [out("grep: falta o termo", "err")] };
      const start = resolvePath(ctx.cwd, args[1]);
      const hits: OutLine[] = [];
      for (const f of walkFiles(ctx.fs, start)) {
        for (const [i, line] of f.node.content.split("\n").entries()) {
          if (line.toLowerCase().includes(q.toLowerCase())) {
            hits.push(out(`${f.path}:${i + 1}: ${line}`));
            if (hits.length >= 40) break;
          }
        }
        if (hits.length >= 40) break;
      }
      return { output: hits.length ? hits : [out("nenhum resultado", "dim")] };
    }

    case "clear":
    case "limpar":
    case "cls":
      return { output: [], clear: true };

    case "data":
    case "date":
      return { output: [out(new Date().toLocaleString("pt-BR"))] };

    case "quem":
    case "whoami":
      return { output: [out("rev  ·  engenharia reversa  ·  canal kathode")] };

    case "uname":
      return { output: [out("KATHODE inner 1.0  tubo  fósforo  ksh")] };

    case "ps":
      return {
        output: [
          out("PID   TTY    CMD"),
          out("1     crt    kathode"),
          out("2     inner  filesystem"),
          out("3     link   idle"),
          out("4     ksh    rev"),
        ],
      };

    case "dmesg": {
      const read = readFile(ctx.fs, "/interior/logs/dmesg");
      return { output: [out(read.ok ? read.content.replace(/\n$/, "") : "dmesg vazio")] };
    }

    case "mount": {
      const read = readFile(ctx.fs, "/interior/proc/mounts");
      return { output: [out(read.ok ? read.content.replace(/\n$/, "") : "")] };
    }

    case "neofetch":
    case "sobre":
      return { output: neofetch() };

    case "tema":
    case "theme": {
      const t = (args[0] ?? "").toLowerCase();
      if (!t) return { output: [out("temas: fosforo  gelo  papel  (atual: " + ctx.theme + ")")] };
      if (t !== "fosforo" && t !== "gelo" && t !== "papel") {
        return { output: [out("tema desconhecido. use fosforo | gelo | papel", "err")] };
      }
      return { output: [out(`tema: ${t}`, "sys")], theme: t as Theme };
    }

    case "historico":
    case "history":
      return {
        output: ctx.history.length
          ? ctx.history.map((h, i) => out(`${String(i + 1).padStart(3, " ")}  ${h}`, "dim"))
          : [out("(vazio)", "dim")],
      };

    case "reset":
      return {
        output: [out("filesystem restaurado. cwd=/interior", "sys")],
        cwd: "/interior",
        prevCwd: "/interior",
      };

    case "calc": {
      const expr = args.join(" ");
      if (!expr) return { output: [out("uso: calc 2+2*3", "dim")] };
      if (!/^[\d+\-*/().\s]+$/.test(expr)) return { output: [out("expressão inválida", "err")] };
      try {
        const value = Function(`"use strict"; return (${expr})`)() as unknown;
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
        "agentes também entram por link.",
      ];
      return { output: [out(lines[Math.floor(Math.random() * lines.length)]!)] };
    }

    case "link":
      return {
        output: [
          out("abrindo canal direto com o núcleo…", "sys"),
          out("handshake ok", "sys"),
          out("modelo     grok-4.5", "dim"),
          out("origem     este pc (o preview já é a conexão)", "dim"),
          out("agentes    mesma url · mesmo comando", "dim"),
          out("digite.  unlink  fecha o canal.", "sys"),
        ],
        enterLink: true,
      };

    case "unlink":
      return { output: [out("já estava no shell.", "dim")] };

    case "falar":
    case "ask":
    case "grok":
    case "dizer":
    case "say": {
      const text = args.join(" ").trim();
      if (!text) return { output: [out("uso: falar <texto>   ou entre com: link", "dim")] };
      return { output: [], talk: text };
    }

    case "sudo":
      return { output: [out("rev não é sudoers. o núcleo não se eleva.", "err")] };
    case "vim":
    case "vi":
    case "nano":
      return { output: [out("use cat. o editor não cabe neste tubo.", "dim")] };
    case "exit":
    case "sair":
      return { output: [out("não há para onde sair. você já está no terminal.", "dim")] };
    case "ssh":
      return { output: [out("sem ssh. a conexão é o próprio tubo. use: link", "dim")] };

    default:
      return {
        output: [
          out(`ksh: ${cmd}: não encontrado`, "err"),
          out("tente: ajuda · scan · tree · link", "dim"),
        ],
      };
  }
}

export function complete(partialLine: string, ctx: RunContext): { fill: string; options?: string[] } {
  const parts = partialLine.split(/(\s+)/);
  const last = parts[parts.length - 1] ?? "";
  const isFirst = tokenize(partialLine).length <= 1 && !partialLine.endsWith(" ");
  if (isFirst) {
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(last.toLowerCase()));
    if (matches.length === 1) return { fill: matches[0] + " " };
    if (matches.length > 1) return { fill: partialLine, options: [...matches] };
    return { fill: partialLine };
  }
  const matches = completePaths(ctx.fs, ctx.cwd, last);
  if (matches.length === 1) {
    parts[parts.length - 1] = matches[0];
    return { fill: parts.join("") };
  }
  if (matches.length > 1) return { fill: partialLine, options: matches };
  return { fill: partialLine };
}

export { prettyCwd };
