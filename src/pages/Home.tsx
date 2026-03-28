import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import {
  GitBranch, GitCommit, GitMerge, GitPullRequest,
  BookOpen, Settings, ChevronRight, Globe, Shield, Layers, History
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const categories = [
    {
      title: "Fundamentos",
      icon: <GitCommit className="w-6 h-6" />,
      description: "Instalação, primeiro repositório e commits básicos.",
      links: [
        { name: "O que é Git", href: "/historia" },
        { name: "Instalação e Configuração", href: "/instalacao" },
        { name: "Primeiros Passos", href: "/primeiros-passos" },
        { name: "Status e Diff", href: "/status" },
      ]
    },
    {
      title: "Commits e Histórico",
      icon: <History className="w-6 h-6" />,
      description: "Staging area, commits e navegação pelo histórico.",
      links: [
        { name: "Staging Area", href: "/staging" },
        { name: "Fazendo Commits", href: "/commits" },
        { name: "Histórico de Commits", href: "/historico" },
        { name: "Tags e Versões", href: "/tags" },
      ]
    },
    {
      title: "Branches",
      icon: <GitBranch className="w-6 h-6" />,
      description: "Criação, merge, rebase e resolução de conflitos.",
      links: [
        { name: "Trabalhando com Branches", href: "/branches" },
        { name: "Merge", href: "/merge" },
        { name: "Rebase", href: "/rebase" },
        { name: "Resolvendo Conflitos", href: "/conflitos" },
      ]
    },
    {
      title: "Recuperação",
      icon: <Shield className="w-6 h-6" />,
      description: "Stash, reset, revert e reflog para recuperar trabalho.",
      links: [
        { name: "Stash", href: "/stash" },
        { name: "Reset e Revert", href: "/reset" },
        { name: "Reflog", href: "/reflog" },
      ]
    },
    {
      title: "Repositórios Remotos",
      icon: <Globe className="w-6 h-6" />,
      description: "Clone, push, pull e fetch com repositórios remotos.",
      links: [
        { name: "Repositórios Remotos", href: "/remotos" },
        { name: "Clone", href: "/clone" },
        { name: "Push e Pull", href: "/push" },
        { name: "Fetch", href: "/fetch" },
      ]
    },
    {
      title: "GitHub e Colaboração",
      icon: <GitPullRequest className="w-6 h-6" />,
      description: "GitHub, pull requests e forks para trabalho em equipe.",
      links: [
        { name: "Usando GitHub", href: "/github" },
        { name: "Pull Requests", href: "/pull-requests" },
        { name: "Forks", href: "/forks" },
      ]
    },
    {
      title: "Configuração",
      icon: <Settings className="w-6 h-6" />,
      description: ".gitignore, aliases, hooks e configurações avançadas.",
      links: [
        { name: ".gitignore", href: "/gitignore" },
        { name: "Configurações", href: "/configuracao" },
        { name: "Aliases", href: "/aliases" },
        { name: "Git Hooks", href: "/hooks" },
      ]
    },
    {
      title: "Recursos Avançados",
      icon: <Layers className="w-6 h-6" />,
      description: "Submódulos, cherry-pick, bisect e fluxos de trabalho.",
      links: [
        { name: "Submódulos", href: "/submodulos" },
        { name: "Cherry-pick", href: "/cherry-pick" },
        { name: "Bisect", href: "/bisect" },
        { name: "Fluxos de Trabalho", href: "/fluxos" },
      ]
    }
  ];

  return (
    <PageContainer
      title="Guia Definitivo do Git"
      subtitle="Domine o controle de versão mais usado no mundo. Do básico ao avançado, com exemplos práticos em Português."
    >
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 border-0 mt-0">
              <GitBranch className="text-primary" /> Por que Git?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Git é o sistema de controle de versão distribuído mais utilizado no mundo. Ele registra cada mudança no código, permite trabalhar em equipe sem conflitos e possibilita voltar a qualquer ponto da história do projeto.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" /> Controle total do histórico do projeto
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" /> Colaboração eficiente em equipe
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" /> Trabalho offline e sincronização posterior
              </li>
            </ul>
          </div>
          <div className="bg-accent/5 border border-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 border-0 mt-0">
              <BookOpen className="text-accent" /> Como usar este guia?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este material foi estruturado para iniciantes e profissionais. Cada página contém exemplos reais que você pode copiar e executar diretamente no terminal.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium">Iniciante</span>
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs font-medium">Intermediário</span>
              <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">Avançado</span>
            </div>
          </div>
        </div>

        <AlertBox type="info" title="Dica de Ouro">
          O Git não é apenas uma ferramenta — é um superpoder para desenvolvedores. Com ele, você nunca mais vai perder código e vai colaborar com qualquer pessoa no mundo.
        </AlertBox>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Navegue pelas Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 border-0 mt-0">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {cat.links.map((link, li) => (
                      <Link
                        key={li}
                        to={link.href}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <ChevronRight className="w-3 h-3" /> {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16 bg-[#1e1e1e] rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <GitMerge size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 border-0 mt-0">Experimente Agora</h2>
          <p className="text-gray-400 mb-6 max-w-2xl">
            Abra seu terminal e execute esses comandos para verificar se o Git está instalado e ver sua versão.
          </p>
          <CodeBlock
            title="Verificando a instalação do Git"
            code={`# Verifica a versão instalada do Git
git --version

# Configura seu nome e e-mail (obrigatório para commits)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Veja todas as configurações ativas
git config --list`}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Próximos Passos</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Se você nunca usou Git, comece pela seção <strong>O que é Git</strong> para entender os conceitos, depois siga para a <strong>Instalação</strong>.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link to="/historia">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity">
              Começar do Zero
            </button>
          </Link>
          <Link to="/dicas">
            <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-bold hover:opacity-90 transition-opacity">
              Ver Dicas Rápidas
            </button>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
