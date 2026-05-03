import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  GitBranch, GitCommit, GitMerge, GitPullRequest, BookOpen, Settings,
  ChevronRight, Globe, Shield, Layers, History, Terminal, GitFork,
  ShieldCheck, HardDriveDownload, FileCode, RefreshCw, Scale, Zap,
  Rocket, Wrench, Search, Archive, Tag, Network, Code, FolderOpen, Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(800px 400px at 20% 10%, hsl(22 100% 60% / 0.18), transparent 60%), radial-gradient(700px 400px at 90% 0%, hsl(285 90% 70% / 0.15), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 prompt-tag mb-7">
              <Sparkles className="w-3.5 h-3.5" />
              40 capítulos · do iniciante ao expert · pt-BR
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-foreground">
              Domine o{" "}
              <span className="bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent text-glow-primary">
                Git
              </span>
              <br className="hidden sm:block" />
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-muted-foreground">
                de verdade.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Um guia completo, prático e em português — do{" "}
              <code className="text-foreground">git init</code> aos{" "}
              <code className="text-foreground">worktrees</code>, signing GPG,
              recuperação de desastres e manutenção de monorepos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link
                href="/primeiros-passos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold no-underline hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
              >
                <Rocket className="w-4 h-4" />
                Começar agora
              </Link>
              <Link
                href="/historia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/60 border border-border text-foreground font-semibold no-underline hover:bg-muted transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                O que é Git?
              </Link>
              <a
                href="https://git-scm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
              >
                git-scm.com →
              </a>
            </div>

            {/* Terminal preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 text-left"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[#1a1716] to-[#13110f] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-2 text-xs font-mono text-gray-400">
                  ~/projetos/meu-app — git
                </span>
              </div>
              <div className="bg-[#0b0d14] p-5 font-mono text-sm space-y-1.5">
                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-sky-400">~/meu-app</span>
                  <span className="text-primary"> git:(</span>
                  <span className="text-yellow-300">main</span>
                  <span className="text-primary">) </span>
                  <span className="text-gray-500">$</span>{" "}
                  <span className="text-gray-200">git checkout -b feat/login</span>
                </div>
                <div className="text-gray-500">Switched to a new branch 'feat/login'</div>
                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-sky-400">~/meu-app</span>
                  <span className="text-primary"> git:(</span>
                  <span className="text-yellow-300">feat/login</span>
                  <span className="text-primary">) </span>
                  <span className="text-gray-500">$</span>{" "}
                  <span className="text-gray-200">git commit -m "feat: add OAuth flow"</span>
                </div>
                <div className="text-gray-500">[feat/login a1b2c3d] feat: add OAuth flow</div>
                <div className="text-gray-500"> 4 files changed, 127 insertions(+), 3 deletions(-)</div>
                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-sky-400">~/meu-app</span>
                  <span className="text-primary"> git:(</span>
                  <span className="text-yellow-300">feat/login</span>
                  <span className="text-primary">) </span>
                  <span className="text-gray-500">$</span>{" "}
                  <span className="text-primary cursor-blink"></span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14"
          >
            {[
              { n: "40", l: "capítulos" },
              { n: "200+", l: "exemplos" },
              { n: "0", l: "dependências externas" },
              { n: "100%", l: "português" },
            ].map((s, i) => (
              <div key={i} className="card-premium px-5 py-4 text-center">
                <div className="text-3xl font-extrabold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  {s.n}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-mono">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 mt-0 border-0 pb-0">
            Trilha de aprendizado
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estruturado para te levar do primeiro <code>git init</code> ao
            domínio completo, com pedagogia consistente em cada capítulo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <Terminal className="w-5 h-5" />, color: "from-primary/20 to-primary/5",
              title: "Fundamentos",
              desc: "Instalação, primeiros comandos e conceitos.",
              links: [
                ["Instalação e Setup", "/instalacao"],
                ["Primeiros Passos", "/primeiros-passos"],
                ["Status e Diff", "/status"],
                ["Staging Area", "/staging"],
              ],
            },
            {
              icon: <GitCommit className="w-5 h-5" />, color: "from-orange-500/20 to-orange-500/5",
              title: "Commits e Histórico",
              desc: "Construa um histórico que conta uma história.",
              links: [
                ["Fazendo Commits", "/commits"],
                ["Histórico de Commits", "/historico"],
                ["Tags e Versões", "/tags"],
                ["Conventional Commits", "/conventional-commits"],
              ],
            },
            {
              icon: <GitBranch className="w-5 h-5" />, color: "from-amber-500/20 to-amber-500/5",
              title: "Branches",
              desc: "Trabalho paralelo, isolado e seguro.",
              links: [
                ["Branches", "/branches"],
                ["Merge", "/merge"],
                ["Rebase", "/rebase"],
                ["Conflitos", "/conflitos"],
                ["Worktrees", "/worktrees"],
              ],
            },
            {
              icon: <Archive className="w-5 h-5" />, color: "from-violet-500/20 to-violet-500/5",
              title: "Stash, Reset & Recuperação",
              desc: "Desfaça, salve e recupere trabalho perdido.",
              links: [
                ["Stash", "/stash"],
                ["Reset e Revert", "/reset"],
                ["Reflog", "/reflog"],
                ["Recuperação de Desastres", "/recuperacao"],
              ],
            },
            {
              icon: <Network className="w-5 h-5" />, color: "from-sky-500/20 to-sky-500/5",
              title: "Repositórios Remotos",
              desc: "Clone, push, pull e fetch como um pro.",
              links: [
                ["Repositórios Remotos", "/remotos"],
                ["Clone", "/clone"],
                ["Push e Pull", "/push"],
                ["Fetch", "/fetch"],
              ],
            },
            {
              icon: <Globe className="w-5 h-5" />, color: "from-emerald-500/20 to-emerald-500/5",
              title: "GitHub e Colaboração",
              desc: "Pull Requests, forks e fluxo open source.",
              links: [
                ["Usando GitHub", "/github"],
                ["Pull Requests", "/pull-requests"],
                ["Forks", "/forks"],
              ],
            },
            {
              icon: <Settings className="w-5 h-5" />, color: "from-pink-500/20 to-pink-500/5",
              title: "Configuração e Automação",
              desc: "Personalize o Git e automatize tudo.",
              links: [
                [".gitignore", "/gitignore"],
                ["Configurações", "/configuracao"],
                ["Aliases", "/aliases"],
                ["Hooks", "/hooks"],
              ],
            },
            {
              icon: <ShieldCheck className="w-5 h-5" />, color: "from-cyan-500/20 to-cyan-500/5",
              title: "Avançado",
              desc: "Submódulos, signing, LFS e bisect.",
              links: [
                ["Submódulos", "/submodulos"],
                ["Cherry-pick", "/cherry-pick"],
                ["Bisect", "/bisect"],
                ["Git LFS", "/lfs"],
                ["Assinatura GPG/SSH", "/signing"],
              ],
            },
            {
              icon: <Scale className="w-5 h-5" />, color: "from-rose-500/20 to-rose-500/5",
              title: "Boas Práticas",
              desc: "Workflows e manutenção em escala.",
              links: [
                ["Fluxos de Trabalho", "/fluxos"],
                ["Manutenção e Performance", "/manutencao"],
                ["Dicas e Truques", "/dicas"],
                ["Referências", "/referencias"],
              ],
            },
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              className="card-premium p-6 group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} border border-border/60 flex items-center justify-center mb-4 text-primary`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold mt-0 mb-1.5 pb-0 border-0 leading-tight">
                {cat.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.desc}</p>
              <ul className="space-y-1 list-none pl-0">
                {cat.links.map(([name, href], j) => (
                  <li key={j} className="pl-0 before:hidden">
                    <Link
                      href={href}
                      className="flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-primary transition-colors no-underline py-1 group/link"
                    >
                      <span className="truncate">{name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Why this guide */}
        <section className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mt-0 mb-3 pb-0 border-0">
              Por que este guia?
            </h2>
            <p className="text-muted-foreground">
              Pensado para te ensinar de verdade — não só comandos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Zap className="w-5 h-5" />, t: "Pedagogia consistente", d: "Motivação, conceito, exemplo, armadilhas, recuperação." },
              { icon: <Code className="w-5 h-5" />, t: "200+ exemplos reais", d: "Comandos copiáveis com cenários do mundo real." },
              { icon: <Shield className="w-5 h-5" />, t: "Recuperação de erros", d: "Cada capítulo mostra como desfazer e consertar." },
              { icon: <Wrench className="w-5 h-5" />, t: "Cheat-sheets", d: "Resumos rápidos no fim de cada tópico." },
            ].map((f, i) => (
              <div key={i} className="card-premium p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 text-primary">
                  {f.icon}
                </div>
                <h4 className="font-bold text-sm mt-0 mb-1.5 pb-0 border-0">{f.t}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 relative rounded-2xl overflow-hidden border border-border/60 p-10 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <div className="absolute inset-0 -z-10 opacity-30"
            style={{ background: 'radial-gradient(600px 200px at 50% 0%, hsl(22 100% 60% / 0.4), transparent 60%)' }}
          />
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-0 mb-3 pb-0 border-0">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            A jornada do <code>git init</code> ao monorepo de produção começa
            com um único comando.
          </p>
          <Link
            href="/primeiros-passos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold no-underline hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
          >
            Primeiros Passos
            <ChevronRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
