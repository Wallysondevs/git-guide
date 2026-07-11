import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LessonNav } from "@/components/ui/LessonNav";

const Home = lazy(() => import("@/pages/Home"));
const Historia = lazy(() => import("@/pages/Historia"));
const Instalacao = lazy(() => import("@/pages/Instalacao"));
const PrimeirosPassos = lazy(() => import("@/pages/PrimeirosPassos"));
const Repositorios = lazy(() => import("@/pages/Repositorios"));
const Status = lazy(() => import("@/pages/Status"));
const Staging = lazy(() => import("@/pages/Staging"));
const Commits = lazy(() => import("@/pages/Commits"));
const Historico = lazy(() => import("@/pages/Historico"));
const Branches = lazy(() => import("@/pages/Branches"));
const Merge = lazy(() => import("@/pages/Merge"));
const Rebase = lazy(() => import("@/pages/Rebase"));
const Conflitos = lazy(() => import("@/pages/Conflitos"));
const Tags = lazy(() => import("@/pages/Tags"));
const Stash = lazy(() => import("@/pages/Stash"));
const Remotos = lazy(() => import("@/pages/Remotos"));
const Clone = lazy(() => import("@/pages/Clone"));
const Push = lazy(() => import("@/pages/Push"));
const Fetch = lazy(() => import("@/pages/Fetch"));
const Github = lazy(() => import("@/pages/Github"));
const PullRequests = lazy(() => import("@/pages/PullRequests"));
const Forks = lazy(() => import("@/pages/Forks"));
const Gitignore = lazy(() => import("@/pages/Gitignore"));
const Configuracao = lazy(() => import("@/pages/Configuracao"));
const Aliases = lazy(() => import("@/pages/Aliases"));
const Hooks = lazy(() => import("@/pages/Hooks"));
const Submodulos = lazy(() => import("@/pages/Submodulos"));
const Reset = lazy(() => import("@/pages/Reset"));
const CherryPick = lazy(() => import("@/pages/CherryPick"));
const Bisect = lazy(() => import("@/pages/Bisect"));
const Reflog = lazy(() => import("@/pages/Reflog"));
const Fluxos = lazy(() => import("@/pages/Fluxos"));
const Dicas = lazy(() => import("@/pages/Dicas"));
const Referencias = lazy(() => import("@/pages/Referencias"));
const Worktrees = lazy(() => import("@/pages/Worktrees"));
const Lfs = lazy(() => import("@/pages/Lfs"));
const Signing = lazy(() => import("@/pages/Signing"));
const ConventionalCommits = lazy(() => import("@/pages/ConventionalCommits"));
const Recuperacao = lazy(() => import("@/pages/Recuperacao"));
const Manutencao = lazy(() => import("@/pages/Manutencao"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageFallback() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-pulse">
      <div className="h-4 w-24 bg-muted rounded mb-6" />
      <div className="h-12 w-3/4 bg-muted rounded mb-4" />
      <div className="h-6 w-2/3 bg-muted/70 rounded mb-12" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-muted/60 rounded" />
        <div className="h-4 w-11/12 bg-muted/60 rounded" />
        <div className="h-4 w-10/12 bg-muted/60 rounded" />
        <div className="h-32 w-full bg-muted/40 rounded-xl mt-8" />
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useHashLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 pb-16">
          <Suspense fallback={<PageFallback />}>{children}</Suspense>
        </main>
      </div>
      <LessonNav />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/historia" component={Historia} />
        <Route path="/instalacao" component={Instalacao} />
        <Route path="/primeiros-passos" component={PrimeirosPassos} />
        <Route path="/repositorios" component={Repositorios} />
        <Route path="/status" component={Status} />
        <Route path="/staging" component={Staging} />
        <Route path="/commits" component={Commits} />
        <Route path="/historico" component={Historico} />
        <Route path="/branches" component={Branches} />
        <Route path="/merge" component={Merge} />
        <Route path="/rebase" component={Rebase} />
        <Route path="/conflitos" component={Conflitos} />
        <Route path="/tags" component={Tags} />
        <Route path="/stash" component={Stash} />
        <Route path="/remotos" component={Remotos} />
        <Route path="/clone" component={Clone} />
        <Route path="/push" component={Push} />
        <Route path="/fetch" component={Fetch} />
        <Route path="/github" component={Github} />
        <Route path="/pull-requests" component={PullRequests} />
        <Route path="/forks" component={Forks} />
        <Route path="/gitignore" component={Gitignore} />
        <Route path="/configuracao" component={Configuracao} />
        <Route path="/aliases" component={Aliases} />
        <Route path="/hooks" component={Hooks} />
        <Route path="/submodulos" component={Submodulos} />
        <Route path="/reset" component={Reset} />
        <Route path="/cherry-pick" component={CherryPick} />
        <Route path="/bisect" component={Bisect} />
        <Route path="/reflog" component={Reflog} />
        <Route path="/fluxos" component={Fluxos} />
        <Route path="/dicas" component={Dicas} />
        <Route path="/referencias" component={Referencias} />
        <Route path="/worktrees" component={Worktrees} />
        <Route path="/lfs" component={Lfs} />
        <Route path="/signing" component={Signing} />
        <Route path="/conventional-commits" component={ConventionalCommits} />
        <Route path="/recuperacao" component={Recuperacao} />
        <Route path="/manutencao" component={Manutencao} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Router />
    </WouterRouter>
  );
}
