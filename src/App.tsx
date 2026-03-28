import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import Home from "@/pages/Home";
import Historia from "@/pages/Historia";
import Instalacao from "@/pages/Instalacao";
import PrimeirosPassos from "@/pages/PrimeirosPassos";
import Repositorios from "@/pages/Repositorios";
import Status from "@/pages/Status";
import Staging from "@/pages/Staging";
import Commits from "@/pages/Commits";
import Historico from "@/pages/Historico";
import Branches from "@/pages/Branches";
import Merge from "@/pages/Merge";
import Rebase from "@/pages/Rebase";
import Conflitos from "@/pages/Conflitos";
import Tags from "@/pages/Tags";
import Stash from "@/pages/Stash";
import Remotos from "@/pages/Remotos";
import Clone from "@/pages/Clone";
import Push from "@/pages/Push";
import Fetch from "@/pages/Fetch";
import Github from "@/pages/Github";
import PullRequests from "@/pages/PullRequests";
import Forks from "@/pages/Forks";
import Gitignore from "@/pages/Gitignore";
import Configuracao from "@/pages/Configuracao";
import Aliases from "@/pages/Aliases";
import Hooks from "@/pages/Hooks";
import Submodulos from "@/pages/Submodulos";
import Reset from "@/pages/Reset";
import CherryPick from "@/pages/CherryPick";
import Bisect from "@/pages/Bisect";
import Reflog from "@/pages/Reflog";
import Fluxos from "@/pages/Fluxos";
import Dicas from "@/pages/Dicas";
import Referencias from "@/pages/Referencias";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

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
        <main className="flex-1">
          {children}
        </main>
      </div>
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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
