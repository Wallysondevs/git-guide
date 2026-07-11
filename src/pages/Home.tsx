import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  GitBranch, GitCommit, BookOpen, ChevronRight, Sparkles,
  Terminal, Play, ArrowRight, CheckCircle2, Circle
} from "lucide-react";
import { COURSE_MODULES, getCourseProgress, type Module } from "@/lib/course";

// Animação de terminal ao vivo
function LiveTerminal() {
  const steps = [
    { cmd: "$ git init", out: "Initialized empty Git repository in /home/user/meu-app/.git/", delay: 800 },
    { cmd: "$ git add .", out: "", delay: 600 },
    { cmd: '$ git commit -m "feat: first commit"', out: "[main (root-commit) a1b2c3d] feat: first commit\n 3 files changed, 42 insertions(+)", delay: 900 },
    { cmd: "$ git checkout -b feat/login", out: "Switched to a new branch 'feat/login'", delay: 700 },
    { cmd: "$ git status", out: "On branch feat/login\nnothing to commit, working tree clean", delay: 600 },
  ];

  const [step, setStep] = useState(0);
  const [showOut, setShowOut] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    if (step >= steps.length) {
      const timer = setTimeout(() => { setStep(0); setShowOut(false); }, 3000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setShowOut(true), steps[step].delay);
    const nextTimer = setTimeout(() => { setStep((s) => s + 1); setShowOut(false); }, steps[step].delay + 1500);
    return () => { clearTimeout(timer); clearTimeout(nextTimer); };
  }, [step, isInView, steps]);

  const currentCmd = steps[Math.min(step, steps.length - 1)];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 text-left"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[#1a1716] to-[#13110f] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs font-mono text-gray-400">~/projetos/meu-app — git</span>
      </div>
      <div className="bg-[#0b0d14] p-5 font-mono text-sm min-h-[180px]">
        {steps.slice(0, step).map((s, i) => (
          <div key={i} className="mb-2">
            <div className="text-gray-200">{s.cmd}</div>
            {s.out && <div className="text-green-400/80 whitespace-pre-line">{s.out}</div>}
          </div>
        ))}
        {step < steps.length && (
          <div>
            <span className="text-gray-200">{currentCmd.cmd}</span>
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
            {showOut && currentCmd.out && (
              <div className="text-green-400/80 whitespace-pre-line">{currentCmd.out}</div>
            )}
          </div>
        )}
        {step >= steps.length && (
          <div className="text-muted-foreground">✓ Demo completa — reiniciando...</div>
        )}
      </div>
    </motion.div>
  );
}

// Card de módulo com progresso
function ModuleCard({ module, index, completedLessons }: { module: Module; index: number; completedLessons: Set<string> }) {
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => completedLessons.has(l.id)).length;
  const percentage = total > 0 ? (done / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-premium p-5 group relative overflow-hidden"
    >
      {/* Progress bar atrás do card */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" style={{ width: `${percentage}%` }} />

      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary">
          <GitBranch className="w-5 h-5" />
        </div>
        <span className="text-xs font-mono text-muted-foreground tabular-nums">
          {done}/{total}
        </span>
      </div>

      <h3 className="font-bold mb-1">{module.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{module.description}</p>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* Aulas */}
      <ul className="space-y-1">
        {module.lessons.slice(0, 4).map((lesson) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={lesson.path}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Circle className="w-3.5 h-3.5 opacity-30" />
                )}
                <span className="truncate">{lesson.title}</span>
              </Link>
            </li>
          );
        })}
        {module.lessons.length > 4 && (
          <li className="text-xs text-muted-foreground">+{module.lessons.length - 4} mais</li>
        )}
      </ul>
    </motion.div>
  );
}

export default function Home() {
  const progress = getCourseProgress();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("git-curso-progresso");
    if (saved) setCompletedLessons(new Set(JSON.parse(saved)));
  }, []);

  return (
    <div className="relative">
      {/* HERO animado */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Aurora/orbs background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={{
              background: [
                "radial-gradient(800px 400px at 20% 10%, hsl(22 100% 60% / 0.25), transparent 60%)",
                "radial-gradient(800px 400px at 80% 20%, hsl(285 90% 60% / 0.2), transparent 60%)",
                "radial-gradient(800px 400px at 50% 0%, hsl(22 100% 50% / 0.25), transparent 60%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            style={{ background: "radial-gradient(800px 400px at 20% 10%, hsl(22 100% 60% / 0.25), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-sm mb-7"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">Curso completo · 41 capítulos · 2026</span>
            </motion.div>

            {/* Título */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Domine o{" "}
              <span className="bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent">
                Git
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-muted-foreground">
                de verdade
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Do <code className="text-foreground">git init</code> aos worktrees, signing GPG,
              conventional commits e recuperação de desastres — <strong>em português</strong>.
            </p>

            {/* Progresso geral */}
            {progress.completed > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 max-w-md mx-auto"
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Seu progresso</span>
                  <span className="font-mono font-bold text-primary">{progress.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link
                href={progress.completed > 0 ? "/primeiros-passos" : "/primeiros-passos"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold no-underline hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
              >
                {progress.completed > 0 ? (
                  <>
                    <Play className="w-4 h-4" /> Continuar curso
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" /> Começar agora
                  </>
                )}
              </Link>
              <Link
                href="/historia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/60 border border-border text-foreground font-semibold no-underline hover:bg-muted transition-colors"
              >
                <BookOpen className="w-4 h-4" /> O que é Git?
              </Link>
            </div>

            {/* Terminal ao vivo */}
            <LiveTerminal />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14"
          >
            {[
              { n: "41", l: "capítulos" },
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

      {/* Trilha de módulos */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Trilha de aprendizado
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Progresso salvo automaticamente. Marque cada capítulo como concluído e avance no seu ritmo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSE_MODULES.map((module, i) => (
            <ModuleCard key={module.id} module={module} index={i} completedLessons={completedLessons} />
          ))}
        </div>

        {/* CTA final */}
        <section className="mt-20 relative rounded-2xl overflow-hidden border border-border/60 p-10 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            A jornada do <code>git init</code> ao monorepo de produção começa agora.
          </p>
          <Link
            href="/primeiros-passos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold no-underline hover:scale-[1.02] transition-transform shadow-lg shadow-primary/25"
          >
            Primeiros Passos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
