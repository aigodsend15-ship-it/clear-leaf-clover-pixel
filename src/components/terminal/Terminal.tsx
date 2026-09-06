import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { speakToCore, type ChatTurn } from "@/lib/terminal/ask";
import { complete, promptOf, runCommand } from "@/lib/terminal/commands";
import { createDefaultFs } from "@/lib/terminal/fs";
import { useTermStore } from "@/lib/terminal/store";
import type { LineVariant, TermLine } from "@/lib/terminal/types";

let seq = 1;
function line(text: string, variant: LineVariant): TermLine {
  return { id: seq++, variant, text };
}

function motd(): TermLine[] {
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
    line("", "out"),
  ];
}

function variantClass(v: LineVariant): string {
  switch (v) {
    case "cmd":
      return "text-term-bright";
    case "err":
      return "text-term-err";
    case "sys":
      return "text-term-dim";
    case "dir":
      return "text-term-dir";
    case "dim":
      return "text-term-dim";
    default:
      return "text-term-fg";
  }
}

export function Terminal() {
  const cwd = useTermStore((s) => s.cwd);
  const theme = useTermStore((s) => s.theme);
  const hydrate = useTermStore((s) => s.hydrate);
  const setCwd = useTermStore((s) => s.setCwd);
  const setFs = useTermStore((s) => s.setFs);
  const setTheme = useTermStore((s) => s.setTheme);
  const pushHistory = useTermStore((s) => s.pushHistory);
  const reset = useTermStore((s) => s.reset);

  const [lines, setLines] = useState<TermLine[]>(motd);
  const [value, setValue] = useState("");
  const [link, setLink] = useState(false);
  const [busy, setBusy] = useState(false);
  const [clock, setClock] = useState("");
  const chatRef = useRef<ChatTurn[]>([]);
  const histIdx = useRef<number | null>(null);
  const draft = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thinkId = useRef<number | null>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    focus();
    const onPointer = () => focus();
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  function append(extra: TermLine[]) {
    setLines((prev) => [...prev, ...extra].slice(-500));
  }

  async function talk(text: string) {
    setBusy(true);
    const thinking = line("núcleo pensa…", "dim");
    thinkId.current = thinking.id;
    append([thinking]);
    try {
      const res = await speakToCore({ data: { text, history: chatRef.current } });
      setLines((prev) => prev.filter((l) => l.id !== thinking.id));
      if (!res.ok) {
        append([line(res.error, "err")]);
      } else {
        chatRef.current = [
          ...chatRef.current,
          { role: "user" as const, content: text },
          { role: "assistant" as const, content: res.text },
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

  async function submit(raw: string) {
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

    const ctx = {
      cwd: useTermStore.getState().cwd,
      prevCwd: useTermStore.getState().prevCwd,
      fs: useTermStore.getState().fs,
      history: useTermStore.getState().history,
      theme: useTermStore.getState().theme,
    };
    const result = runCommand(text, ctx);

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
    if (result.output.length) {
      append(result.output.map((o) => line(o.text, o.variant)));
    }
    if (result.enterLink) {
      setLink(true);
      chatRef.current = [];
    }
    if (result.talk) await talk(result.talk);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!busy) void submit(value);
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
        theme: useTermStore.getState().theme,
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

  return (
    <div className="bg-term-bezel text-term-fg font-mono text-term flex min-h-dvh flex-col">
      <header className="flex shrink-0 items-center justify-between gap-3 px-3 pt-[max(0.6rem,env(safe-area-inset-top))] pb-1 sm:px-5">
        <p className="text-term-sm tracking-wide text-term-dim">
          KATHODE <span className="text-term-faint">/</span> INNER
        </p>
        <p className="text-term-sm tabular-nums text-term-dim">
          <span className={link ? "text-term-bright" : ""}>{link ? "LINK" : "SHELL"}</span>
          <span className="text-term-faint"> · </span>
          {clock}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-2 pb-2 sm:px-4 sm:pb-4">
        <div
          className="crt-screen relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md bg-term-bg"
          onClick={() => inputRef.current?.focus()}
        >
          <div
            ref={scrollRef}
            className="term-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pt-3 sm:px-5 sm:pt-4"
          >
            {lines.map((l) => (
              <pre key={l.id} className={`whitespace-pre-wrap break-words ${variantClass(l.variant)}`}>
                {l.text || " "}
              </pre>
            ))}
          </div>

          <form
            className="relative z-10 flex min-h-11 shrink-0 items-center gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!busy) void submit(value);
            }}
          >
            <label htmlFor="kathode-cmd" className="absolute h-px w-px overflow-hidden">
              linha de comando
            </label>
            <span className="text-term-bright shrink-0 select-none">{prompt}</span>
            <input
              id="kathode-cmd"
              ref={inputRef}
              className="term-input min-h-11 min-w-0 flex-1 bg-transparent text-term-fg outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              name="kathode-cmd"
              enterKeyHint="send"
              disabled={busy}
              placeholder={link ? "fale com o núcleo" : "digite um comando"}
              aria-label={link ? "mensagem ao núcleo" : "linha de comando"}
            />
            {!value && !busy ? <span className="term-caret shrink-0" aria-hidden="true" /> : null}
          </form>
        </div>
      </div>

      <p className="text-term-sm px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-term-dim sm:px-5">
        {link ? "unlink fecha o canal · enter envia" : "ajuda · scan · tree · link · ↑↓ histórico"}
      </p>
    </div>
  );
}
