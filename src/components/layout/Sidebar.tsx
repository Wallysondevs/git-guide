import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen, GitBranch, GitCommit, GitMerge, GitPullRequest,
  Terminal, HardDrive, Shield, Settings, FileText, Users,
  Network, History, X, Package, Code, FolderOpen, Key,
  Globe, Zap, Wrench, ChevronRight, RotateCcw, Tag,
  Upload, Download, Copy, Search, Layers, Archive
} from "lucide-react";

const NAVIGATION = [
  {
    title: "Introdução",
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/historia", label: "O que é Git", icon: History },
      { path: "/instalacao", label: "Instalação e Configuração", icon: HardDrive },
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
    ]
  },
  {
    title: "Stash e Recuperação",
    items: [
      { path: "/stash", label: "Stash", icon: Archive },
      { path: "/reset", label: "Reset e Revert", icon: RotateCcw },
      { path: "/reflog", label: "Reflog", icon: History },
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
      { path: "/fluxos", label: "Fluxos de Trabalho", icon: Layers },
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
        "fixed top-0 bottom-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between lg:justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GitBranch className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold mt-0 mb-0 pb-0 border-0 leading-tight">Git</h2>
                <p className="text-xs text-muted-foreground">Guia Completo</p>
              </div>
            </Link>
            <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-8">
            {NAVIGATION.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3 mt-0 border-0 pb-0">
                  {section.title}
                </h4>
                <ul className="space-y-1 list-none">
                  {section.items.map((item, i) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;
                    return (
                      <li key={i}>
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-70")} />
                          {item.label}
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
