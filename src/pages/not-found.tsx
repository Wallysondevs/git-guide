import { Link } from "wouter";
import { GitBranch, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
        <GitBranch className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-6xl font-extrabold text-primary mb-4 border-0">404</h1>
      <h2 className="text-2xl font-bold mb-4 border-0">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        Parece que você se perdeu no histórico do Git. Vamos voltar ao branch principal?
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            <Home className="w-4 h-4" /> Ir para o Início
          </button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-muted text-foreground rounded-full font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
    </div>
  );
}
