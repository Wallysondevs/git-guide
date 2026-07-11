import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLessonByPath,
  getNextLesson,
  getPrevLesson,
  markLessonComplete,
  isLessonCompleted,
  getCourseProgress,
  type Lesson,
} from "@/lib/course";

interface LessonNavProps {
  onComplete?: () => void;
}

export function LessonNav({ onComplete }: LessonNavProps) {
  const [location] = useLocation();
  const [completed, setCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 });

  useEffect(() => {
    const lesson = getLessonByPath(location);
    if (lesson) {
      setCompleted(isLessonCompleted(lesson.id));
      setProgress(getCourseProgress());
    }
  }, [location]);

  const handleComplete = () => {
    const lesson = getLessonByPath(location);
    if (!lesson) return;

    markLessonComplete(lesson.id);
    setCompleted(true);
    setProgress(getCourseProgress());
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    onComplete?.();
  };

  const nextLesson = getNextLesson(location);
  const prevLesson = getPrevLesson(location);
  const currentLesson = getLessonByPath(location);

  if (!currentLesson || location === "/") return null;

  return (
    <>
      {/* Toast de confirmação */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25"
          >
            ✓ Capítulo marcado como concluído!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegação fixa no bottom */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-72 bg-card/95 backdrop-blur-xl border-t border-border/60 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Anterior */}
            <div className="flex-1">
              {prevLesson && (
                <Link
                  href={prevLesson.path}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate hidden sm:inline">{prevLesson.title}</span>
                  <span className="truncate sm:hidden">Anterior</span>
                </Link>
              )}
            </div>

            {/* Progress + Botão */}
            <div className="flex items-center gap-3">
              {/* Progress mini */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <span>{progress.completed}/{progress.total}</span>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <span>{progress.percentage}%</span>
              </div>

              {/* Botão marcar */}
              <Button
                size="sm"
                variant={completed ? "secondary" : "default"}
                onClick={handleComplete}
                className="gap-2"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Concluído
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    Marcar concluído
                  </>
                )}
              </Button>
            </div>

            {/* Próximo */}
            <div className="flex-1 text-right">
              {nextLesson ? (
                <Link
                  href={nextLesson.path}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="truncate hidden sm:inline">{nextLesson.title}</span>
                  <span className="truncate sm:hidden">Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Início
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
