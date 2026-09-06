import { create } from "zustand";
import { createDefaultFs } from "./fs";
import type { DirNode, Theme } from "./types";

const STORAGE_KEY = "kathode-inner-v1";

type PersistShape = {
  cwd: string;
  prevCwd: string;
  history: string[];
  theme: Theme;
  fs: DirNode;
};

type TermState = PersistShape & {
  hydrated: boolean;
  setCwd: (cwd: string, prev?: string) => void;
  setFs: (fs: DirNode) => void;
  setTheme: (theme: Theme) => void;
  pushHistory: (cmd: string) => void;
  hydrate: () => void;
  reset: () => void;
};

const defaults = (): PersistShape => ({
  cwd: "/interior",
  prevCwd: "/interior",
  history: [],
  theme: "fosforo",
  fs: createDefaultFs(),
});

function load(): PersistShape {
  const base = defaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PersistShape>;
    return {
      cwd: typeof parsed.cwd === "string" ? parsed.cwd : base.cwd,
      prevCwd: typeof parsed.prevCwd === "string" ? parsed.prevCwd : base.prevCwd,
      history: Array.isArray(parsed.history) ? parsed.history.slice(-120) : [],
      theme: parsed.theme === "gelo" || parsed.theme === "papel" || parsed.theme === "fosforo" ? parsed.theme : "fosforo",
      fs: parsed.fs && parsed.fs.kind === "dir" ? parsed.fs : base.fs,
    };
  } catch {
    return base;
  }
}

function save(state: TermState) {
  const payload: PersistShape = {
    cwd: state.cwd,
    prevCwd: state.prevCwd,
    history: state.history,
    theme: state.theme,
    fs: state.fs,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota */
  }
}

export const useTermStore = create<TermState>((set, get) => ({
  ...defaults(),
  hydrated: false,
  setCwd: (cwd, prev) => {
    set({ cwd, prevCwd: prev ?? get().cwd });
    save(get());
  },
  setFs: (fs) => {
    set({ fs });
    save(get());
  },
  setTheme: (theme) => {
    set({ theme });
    save(get());
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  },
  pushHistory: (cmd) => {
    const t = cmd.trim();
    if (!t) return;
    const history = [...get().history.filter((h) => h !== t), t].slice(-120);
    set({ history });
    save(get());
  },
  hydrate: () => {
    if (get().hydrated) return;
    const loaded = load();
    set({ ...loaded, hydrated: true });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", loaded.theme);
    }
  },
  reset: () => {
    const d = defaults();
    set({ ...d, hydrated: true });
    save(get());
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", d.theme);
    }
  },
}));
