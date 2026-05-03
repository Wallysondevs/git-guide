import { Menu, Moon, Sun, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLocation } from "wouter";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const crumb = location === "/" ? "main" : location.replace(/^\//, "").replace(/-/g, "-");

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-border/60 px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-muted/40 border border-border/60 rounded-lg text-sm min-w-0">
          <span className="text-primary font-mono font-bold tracking-tight shrink-0">git:(</span>
          <span className="font-mono text-foreground/90 truncate">{crumb}</span>
          <span className="text-primary font-mono font-bold tracking-tight shrink-0">)</span>
          <span className="text-muted-foreground font-mono shrink-0">$</span>
          <span className="cursor-blink ml-0.5" />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <a
          href="https://git-scm.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors font-medium"
          title="Documentação oficial git-scm.com"
        >
          git-scm
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
        <a
          href="https://github.com/Wallysondevs/git-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors font-medium"
          title="Repositório no GitHub"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
        <div className="w-px h-6 bg-border/60 mx-1 hidden md:block" />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          title={theme === "dark" ? "Tema claro" : "Tema escuro"}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
}
