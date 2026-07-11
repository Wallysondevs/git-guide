/**
 * Curso de Git — estrutura de módulos e progresso.
 * Progresso salvo em localStorage (git-curso-progresso).
 */

export interface Lesson {
  id: string;
  path: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const COURSE_MODULES: Module[] = [
  {
    id: "introducao",
    title: "Introdução",
    description: "O que é Git, história e instalação",
    icon: "BookOpen",
    lessons: [
      { id: "inicio", path: "/", title: "Início" },
      { id: "historia", path: "/historia", title: "O que é Git" },
      { id: "instalacao", path: "/instalacao", title: "Instalação e Setup" },
    ],
  },
  {
    id: "fundamentos",
    title: "Fundamentos",
    description: "Comandos essenciais do dia a dia",
    icon: "Terminal",
    lessons: [
      { id: "primeiros-passos", path: "/primeiros-passos", title: "Primeiros Passos" },
      { id: "repositorios", path: "/repositorios", title: "Criando Repositórios" },
      { id: "status", path: "/status", title: "Status e Diff" },
      { id: "staging", path: "/staging", title: "Staging Area" },
      { id: "commits", path: "/commits", title: "Fazendo Commits" },
    ],
  },
  {
    id: "historico",
    title: "Histórico",
    description: "Navegando e versionando",
    icon: "History",
    lessons: [
      { id: "historico", path: "/historico", title: "Histórico de Commits" },
      { id: "tags", path: "/tags", title: "Tags e Versões" },
    ],
  },
  {
    id: "branches",
    title: "Branches",
    description: "Trabalho paralelo e seguro",
    icon: "GitBranch",
    lessons: [
      { id: "branches", path: "/branches", title: "Trabalhando com Branches" },
      { id: "merge", path: "/merge", title: "Merge" },
      { id: "rebase", path: "/rebase", title: "Rebase" },
      { id: "conflitos", path: "/conflitos", title: "Resolvendo Conflitos" },
      { id: "worktrees", path: "/worktrees", title: "Worktrees" },
    ],
  },
  {
    id: "stash-reset",
    title: "Stash, Reset & Recuperação",
    description: "Desfazer e recuperar trabalho",
    icon: "Archive",
    lessons: [
      { id: "stash", path: "/stash", title: "Stash" },
      { id: "reset", path: "/reset", title: "Reset e Revert" },
      { id: "reflog", path: "/reflog", title: "Reflog" },
      { id: "recuperacao", path: "/recuperacao", title: "Recuperação de Desastres" },
    ],
  },
  {
    id: "remotos",
    title: "Repositórios Remotos",
    description: "Clone, push, pull e fetch",
    icon: "Network",
    lessons: [
      { id: "remotos", path: "/remotos", title: "Repositórios Remotos" },
      { id: "clone", path: "/clone", title: "Clone" },
      { id: "push", path: "/push", title: "Push e Pull" },
      { id: "fetch", path: "/fetch", title: "Fetch" },
    ],
  },
  {
    id: "github",
    title: "GitHub e Colaboração",
    description: "Pull Requests e fluxo open source",
    icon: "Globe",
    lessons: [
      { id: "github", path: "/github", title: "Usando GitHub" },
      { id: "pull-requests", path: "/pull-requests", title: "Pull Requests" },
      { id: "forks", path: "/forks", title: "Forks" },
    ],
  },
  {
    id: "config",
    title: "Configuração e Automação",
    description: "Personalize e automatize",
    icon: "Settings",
    lessons: [
      { id: "gitignore", path: "/gitignore", title: ".gitignore" },
      { id: "configuracao", path: "/configuracao", title: "Configurações do Git" },
      { id: "aliases", path: "/aliases", title: "Aliases" },
      { id: "hooks", path: "/hooks", title: "Git Hooks" },
    ],
  },
  {
    id: "avancado",
    title: "Recursos Avançados",
    description: "Submódulos, signing, LFS",
    icon: "ShieldCheck",
    lessons: [
      { id: "submodulos", path: "/submodulos", title: "Submódulos" },
      { id: "cherry-pick", path: "/cherry-pick", title: "Cherry-pick" },
      { id: "bisect", path: "/bisect", title: "Bisect" },
      { id: "lfs", path: "/lfs", title: "Git LFS" },
      { id: "signing", path: "/signing", title: "Assinatura GPG/SSH" },
    ],
  },
  {
    id: "boas-praticas",
    title: "Boas Práticas",
    description: "Workflows e manutenção",
    icon: "Scale",
    lessons: [
      { id: "conventional-commits", path: "/conventional-commits", title: "Conventional Commits" },
      { id: "fluxos", path: "/fluxos", title: "Fluxos de Trabalho" },
      { id: "manutencao", path: "/manutencao", title: "Manutenção e Performance" },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    description: "Dicas e referências",
    icon: "Wrench",
    lessons: [
      { id: "dicas", path: "/dicas", title: "Dicas e Truques" },
      { id: "referencias", path: "/referencias", title: "Referências" },
    ],
  },
];

const STORAGE_KEY = "git-curso-progresso";

export function getProgress(): Set<string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

export function saveProgress(completed: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

export function markLessonComplete(lessonId: string): void {
  const completed = getProgress();
  completed.add(lessonId);
  saveProgress(completed);
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().has(lessonId);
}

export function getCourseProgress(): {
  completed: number;
  total: number;
  percentage: number;
} {
  const completed = getProgress();
  const allLesssons = COURSE_MODULES.flatMap((m) => m.lessons);
  const total = allLesssons.length;
  const done = allLesssons.filter((l) => completed.has(l.id)).length;
  return {
    completed: done,
    total,
    percentage: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}

export function getNextLesson(currentPath: string): Lesson | null {
  const allLesssons = COURSE_MODULES.flatMap((m) => m.lessons);
  const idx = allLesssons.findIndex((l) => l.path === currentPath);
  return idx >= 0 && idx < allLesssons.length - 1 ? allLesssons[idx + 1] : null;
}

export function getPrevLesson(currentPath: string): Lesson | null {
  const allLesssons = COURSE_MODULES.flatMap((m) => m.lessons);
  const idx = allLesssons.findIndex((l) => l.path === currentPath);
  return idx > 0 ? allLesssons[idx - 1] : null;
}

export function getLessonByPath(path: string): Lesson | undefined {
  return COURSE_MODULES.flatMap((m) => m.lessons).find((l) => l.path === path);
}

export function getModuleByLessonId(lessonId: string): Module | undefined {
  return COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === lessonId));
}
