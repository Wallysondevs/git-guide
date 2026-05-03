import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen, GitBranch, GitCommit, GitMerge, GitPullRequest,
  Terminal, HardDrive, Shield, Settings, FileText,
  Network, History, X, Package, Code, FolderOpen, Key,
  Globe, Zap, Wrench, ChevronRight, RotateCcw, Tag,
  Upload, Download, Copy, Search, Layers, Archive,
  GitFork, Lock, ShieldCheck, FileCode, RefreshCw, HardDriveDownload, Scale
} from "lucide-react";

const NAVIGATION = [
  {
    title: "Introdução",
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/historia", label: "O que é Git", icon: History },
      { path: "/instalacao", label: "Instalação e Setup", icon: HardDrive },
    ]
  },
  {
    title: "Fundamentos",
    items: [
      { path: "/primeiros-passos", label: "Primeiros Passos", icon: Terminal },
      { path: "/repositorios", label: "Criando Repositórios", icon: FolderOpen },
      { path: "/status", label: "Status e Diff", icon: Search },
      { path: "/staging", label: "Staging Area", icon: Layers },
      { path: "/commits", label: "Fazendo Commits", icon: GitCommit },
    ]
  },
  {
    title: "Histórico",
    items: [
      { path: "/historico", label: "Histórico de Commits", icon: History },
      { path: "/tags", label: "Tags e Versões", icon: Tag },
    ]
  },
  {
    title: "Branches",
    items: [
      { path: "/branches", label: "Trabalhando com Branches", icon: GitBranch },
      { path: "/merge", label: "Merge", icon: GitMerge },
      { path: "/rebase", label: "Rebase", icon: RotateCcw },
      { path: "/conflitos", label: "Resolvendo Conflitos", icon: Shield },
      { path: "/worktrees", label: "Worktrees (paralelas)", icon: GitFork },
    ]
  },
  {
    title: "Stash, Reset e Recuperação",
    items: [
      { path: "/stash", label: "Stash", icon: Archive },
      { path: "/reset", label: "Reset e Revert", icon: RotateCcw },
      { path: "/reflog", label: "Reflog", icon: History },
      { path: "/recuperacao", label: "Recuperação de Desastres", icon: RefreshCw },
    ]
  },
  {
    title: "Repositórios Remotos",
    items: [
      { path: "/remotos", label: "Repositórios Remotos", icon: Network },
      { path: "/clone", label: "Clone", icon: Copy },
      { path: "/push", label: "Push e Pull", icon: Upload },
      { path: "/fetch", label: "Fetch", icon: Download },
    ]
  },
  {
    title: "GitHub e Colaboração",
    items: [
      { path: "/github", label: "Usando GitHub", icon: Globe },
      { path: "/pull-requests", label: "Pull Requests", icon: GitPullRequest },
      { path: "/forks", label: "Forks", icon: GitBranch },
    ]
  },
  {
    title: "Configuração e Automação",
    items: [
      { path: "/gitignore", label: ".gitignore", icon: FileText },
      { path: "/configuracao", label: "Configurações do Git", icon: Settings },
      { path: "/aliases", label: "Aliases", icon: Zap },
      { path: "/hooks", label: "Git Hooks", icon: Code },
    ]
  },
  {
    title: "Recursos Avançados",
    items: [
      { path: "/submodulos", label: "Submódulos", icon: Package },
      { path: "/cherry-pick", label: "Cherry-pick", icon: Key },
      { path: "/bisect", label: "Bisect", icon: Search },
      { path: "/lfs", label: "Git LFS (arquivos grandes)", icon: HardDriveDownload },
      { path: "/signing", label: "Assinatura GPG/SSH", icon: ShieldCheck },
    ]
  },
  {
    title: "Boas Práticas",
    items: [
      { path: "/conventional-commits", label: "Conventional Commits", icon: FileCode },
      { path: "/fluxos", label: "Fluxos de Trabalho", icon: Layers },
      { path: "/manutencao", label: "Manutenção e Performance", icon: Scale },
    ]
  },
  {
    title: "Extras",
    items: [
      { path: "/dicas", label: "Dicas e Truques", icon: Wrench },
      { path: "/referencias", label: "Referências", icon: BookOpen },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
        "bg-card/80 backdrop-blur-xl backdrop-saturate-150 border-r border-border/60",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                <GitBranch className="w-5 h-5 text-primary" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
              <div>
                <h2 className="text-base font-bold mt-0 mb-0 pb-0 border-0 leading-tight tracking-tight">Git</h2>
                <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">Guia Definitivo</p>
              </div>
            </Link>
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-6">
            {NAVIGATION.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.12em] mb-2 px-3 mt-0 border-0 pb-0">
                  {section.title}
                </h4>
                <ul className="space-y-0.5 list-none pl-0">
                  {section.items.map((item, i) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;
                    return (
                      <li key={i} className="pl-0 before:hidden">
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "relative flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-all duration-150",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                          )}
                          <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-primary" : "opacity-60")} strokeWidth={isActive ? 2.5 : 2} />
                          <span className="truncate">{item.label}</span>
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary shrink-0" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="px-3 pt-4 pb-2 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
                40 capítulos · pt-BR · sem dependência externa
              </p>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
