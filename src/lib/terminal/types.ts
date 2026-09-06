export type Theme = "fosforo" | "gelo" | "papel";

export type FileNode = {
  kind: "file";
  content: string;
  mode?: "ok" | "deny";
};

export type DirNode = {
  kind: "dir";
  children: Record<string, FsNode>;
  mode?: "ok" | "deny";
};

export type FsNode = FileNode | DirNode;

export type LineVariant = "cmd" | "out" | "err" | "sys" | "dir" | "dim";

export type TermLine = {
  id: number;
  variant: LineVariant;
  text: string;
};

export type OutLine = {
  variant: LineVariant;
  text: string;
};

export type RunContext = {
  cwd: string;
  prevCwd: string;
  fs: DirNode;
  history: string[];
  theme: Theme;
};

export type RunResult = {
  output: OutLine[];
  cwd?: string;
  prevCwd?: string;
  fs?: DirNode;
  theme?: Theme;
  clear?: boolean;
  enterLink?: boolean;
  leaveLink?: boolean;
  talk?: string;
};
