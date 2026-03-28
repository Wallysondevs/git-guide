import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";
import { ExternalLink, BookOpen, GitBranch } from "lucide-react";

const commands = [
  {
    category: "Configuração",
    items: [
      { cmd: "git config --global user.name", desc: "Define seu nome" },
      { cmd: "git config --global user.email", desc: "Define seu e-mail" },
      { cmd: "git config --list", desc: "Lista todas as configurações" },
    ]
  },
  {
    category: "Repositório",
    items: [
      { cmd: "git init", desc: "Inicializa um repositório" },
      { cmd: "git clone <url>", desc: "Clona um repositório remoto" },
      { cmd: "git status", desc: "Mostra o estado do repositório" },
    ]
  },
  {
    category: "Staging e Commits",
    items: [
      { cmd: "git add <arquivo>", desc: "Adiciona arquivo à staging area" },
      { cmd: "git add .", desc: "Adiciona todos os arquivos" },
      { cmd: "git add -p", desc: "Adiciona interativamente (por hunk)" },
      { cmd: "git commit -m", desc: "Cria um commit com mensagem" },
      { cmd: "git commit --amend", desc: "Altera o último commit" },
    ]
  },
  {
    category: "Histórico",
    items: [
      { cmd: "git log --oneline", desc: "Histórico resumido" },
      { cmd: "git log --graph --all", desc: "Histórico com gráfico" },
      { cmd: "git diff", desc: "Diferenças no working directory" },
      { cmd: "git diff --staged", desc: "Diferenças na staging area" },
      { cmd: "git show <hash>", desc: "Mostra um commit específico" },
    ]
  },
  {
    category: "Branches",
    items: [
      { cmd: "git branch", desc: "Lista branches locais" },
      { cmd: "git branch -a", desc: "Lista todos os branches" },
      { cmd: "git switch -c <nome>", desc: "Cria e muda para novo branch" },
      { cmd: "git switch <nome>", desc: "Muda de branch" },
      { cmd: "git branch -d <nome>", desc: "Deleta branch (se mergeado)" },
      { cmd: "git branch -D <nome>", desc: "Força deleção do branch" },
    ]
  },
  {
    category: "Merge e Rebase",
    items: [
      { cmd: "git merge <branch>", desc: "Faz merge de um branch" },
      { cmd: "git merge --no-ff", desc: "Merge sempre criando merge commit" },
      { cmd: "git merge --squash", desc: "Squash de todos os commits" },
      { cmd: "git rebase main", desc: "Reaplica commits sobre main" },
      { cmd: "git rebase -i HEAD~N", desc: "Rebase interativo dos últimos N commits" },
      { cmd: "git cherry-pick <hash>", desc: "Aplica um commit específico" },
    ]
  },
  {
    category: "Remotos",
    items: [
      { cmd: "git remote -v", desc: "Lista remotos configurados" },
      { cmd: "git remote add origin <url>", desc: "Adiciona um remoto" },
      { cmd: "git push -u origin main", desc: "Push com tracking" },
      { cmd: "git pull", desc: "Fetch + merge do remoto" },
      { cmd: "git pull --rebase", desc: "Fetch + rebase do remoto" },
      { cmd: "git fetch --prune", desc: "Fetch e limpa branches deletados" },
    ]
  },
  {
    category: "Desfazer",
    items: [
      { cmd: "git restore <arquivo>", desc: "Descarta mudanças no arquivo" },
      { cmd: "git restore --staged <arquivo>", desc: "Remove da staging area" },
      { cmd: "git reset --soft HEAD~1", desc: "Desfaz commit, mantém staged" },
      { cmd: "git reset --hard HEAD~1", desc: "Desfaz commit e descarta tudo" },
      { cmd: "git revert HEAD", desc: "Cria commit que desfaz o último" },
      { cmd: "git stash", desc: "Salva mudanças temporariamente" },
      { cmd: "git stash pop", desc: "Recupera mudanças do stash" },
    ]
  },
  {
    category: "Avançado",
    items: [
      { cmd: "git reflog", desc: "Histórico de movimentos do HEAD" },
      { cmd: "git bisect start", desc: "Inicia busca binária por bugs" },
      { cmd: "git worktree add", desc: "Adiciona working tree extra" },
      { cmd: "git submodule update --init", desc: "Inicializa submódulos" },
      { cmd: "git tag -a v1.0.0 -m", desc: "Cria tag anotada" },
      { cmd: "git push --follow-tags", desc: "Push com tags anotadas" },
    ]
  }
];

const links = [
  { name: "Documentação Oficial do Git", url: "https://git-scm.com/doc", desc: "A referência completa e oficial" },
  { name: "Pro Git Book (gratuito)", url: "https://git-scm.com/book/pt-br/v2", desc: "O livro mais completo sobre Git, disponível em Português" },
  { name: "GitHub Docs", url: "https://docs.github.com", desc: "Documentação completa do GitHub" },
  { name: "GitHub CLI", url: "https://cli.github.com", desc: "GitHub pela linha de comando" },
  { name: "gitignore.io", url: "https://www.toptal.com/developers/gitignore", desc: "Gerador de .gitignore para qualquer linguagem" },
  { name: "Conventional Commits", url: "https://www.conventionalcommits.org/pt-br", desc: "Especificação para mensagens de commit padronizadas" },
  { name: "Semantic Versioning", url: "https://semver.org/lang/pt-BR", desc: "Como versionar software corretamente" },
  { name: "Oh My Git! (jogo)", url: "https://ohmygit.org", desc: "Aprenda Git jogando — gratuito e open source" },
  { name: "Learn Git Branching (interativo)", url: "https://learngitbranching.js.org/?locale=pt_BR", desc: "Tutorial visual e interativo sobre branches" },
];

export default function Referencias() {
  return (
    <PageContainer
      title="Referências"
      subtitle="Guia de referência rápida com os principais comandos Git e links para recursos externos."
    >
      <h2>Folha de Referência Rápida</h2>
      <p>Todos os comandos Git mais importantes em uma única página:</p>

      <div className="space-y-8 my-6">
        {commands.map((section, i) => (
          <div key={i}>
            <h3 className="text-lg font-bold mb-3 text-primary border-b border-primary/20 pb-2">{section.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {section.items.map((item, j) => (
                <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <code className="text-primary text-xs font-mono shrink-0">{item.cmd}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Recursos Externos</h2>
      <div className="grid grid-cols-1 gap-3 my-6">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 group flex items-start gap-4 no-underline"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0">{link.name}</p>
              <p className="text-sm text-muted-foreground mb-0">{link.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <AlertBox type="success" title="Parabéns por chegar até aqui!">
        Você agora tem uma base sólida para usar o Git com confiança. A melhor forma de aprender é praticando — crie repositórios, experimente os comandos e cometa erros em um ambiente seguro. O Git está sempre lá para ajudá-lo a recuperar!
      </AlertBox>

      <div className="flex gap-4 mt-8">
        <Link to="/">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Voltar ao Início
          </button>
        </Link>
        <Link to="/dicas">
          <button className="px-6 py-3 bg-muted text-foreground rounded-full font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            <GitBranch className="w-4 h-4" /> Ver Dicas e Truques
          </button>
        </Link>
      </div>
    </PageContainer>
  );
}
