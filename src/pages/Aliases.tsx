import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Aliases() {
    return (
      <PageContainer
        title="Aliases do Git"
        subtitle="Crie atalhos personalizados para seus comandos Git mais usados e aumente sua produtividade."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          Aliases do Git permitem criar atalhos para comandos longos ou sequências de comandos. Em vez de digitar <code>git status</code>, você digita <code>git st</code>. Pequenos ganhos que multiplicados por centenas de usos diários fazem grande diferença.
        </p>

        <h2>Criando aliases</h2>
        <CodeBlock
          title="Como criar aliases"
          code={`# Criar alias global (em ~/.gitconfig)
  git config --global alias.st status
  git config --global alias.co checkout
  git config --global alias.br branch
  git config --global alias.ci commit
  git config --global alias.d diff

  # Usar o alias
  git st     # equivale a: git status
  git co main  # equivale a: git checkout main

  # Ver todos os aliases configurados
  git config --global --list | grep alias

  # Editar .gitconfig diretamente
  git config --global --edit`}
        />

        <h2>Aliases essenciais — o conjunto básico</h2>
        <CodeBlock
          title="Aliases recomendados para todo desenvolvedor"
          code={`# No .gitconfig, seção [alias]:
  [alias]
    st = status
    co = checkout
    sw = switch
    br = branch
    ci = commit
    d  = diff
    ds = diff --staged
    p  = push
    pl = pull
    f  = fetch --prune

    # Logs visuais
    lg = log --oneline --graph --decorate
    lga = log --oneline --graph --decorate --all
    last = log -1 HEAD --stat

    # Desfazendo coisas
    undo = reset HEAD~1 --mixed
    unstage = restore --staged

    # Branches
    brd = branch -d
    brD = branch -D
    brr = branch -r`}
        />

        <AlertBox type="info" title="Aliases com ! (shell aliases)">
          Prefixe o alias com <code>!</code> para executar um comando shell em vez de um subcomando Git. Isso permite criar aliases que combinam múltiplos comandos.
        </AlertBox>

        <h2>Aliases poderosos com shell</h2>
        <CodeBlock
          title="Aliases que usam comandos shell"
          code={`[alias]
    # Abrir repositório no navegador (macOS)
    open-repo = !open $(git remote get-url origin | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git//')

    # Commitar com data no formato padrão
    today = !git log --since=midnight --oneline --author="$(git config user.name)"

    # Deletar branches já mergeados no main
    cleanup = !git branch --merged main | grep -v main | xargs git branch -d

    # Stash com timestamp automático
    save = !git stash push -m "manual save: $(date '+%Y-%m-%d %H:%M')"

    # Criar feature branch
    feature = !sh -c 'git switch -c feature/$1' -

    # Ver arquivos mais alterados no histórico
    churn = !git log --all --name-only --format="" | sort | uniq -c | sort -rn | head`}
        />

        <h2>Aliases de log e visualização</h2>
        <CodeBlock
          title="Logs informativos e visuais"
          code={`[alias]
    # Log colorido com graph
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

    # Log com estatísticas de arquivos
    ll = log --pretty=format:"%C(yellow)%h%Cred%d %Creset%s%Cblue [%cn]" --decorate --numstat

    # Commits do dia de hoje
    standup = !git log --since=yesterday --oneline --author="$(git config user.name)"

    # Diferença entre branches
    bdiff = !sh -c 'git diff $(git merge-base HEAD $1)' -`}
        />

        <h2>Aliases por projeto (local)</h2>
        <CodeBlock
          title="Aliases específicos de um repositório"
          code={`# Aliases locais ficam em .git/config do projeto
  git config alias.deploy "!npm run build && rsync -r dist/ server:/var/www/"
  git config alias.test-all "!npm test && npm run lint && npm run build"

  # Verificar aliases do projeto atual
  git config --local --list | grep alias

  # Os aliases locais têm prioridade sobre os globais`}
        />

        <h2>Compartilhando aliases com a equipe</h2>
        <CodeBlock
          title="Distribuindo aliases via .gitconfig"
          code={`# Criar um arquivo de aliases compartilhado
  # .gitaliases (no repositório da equipe)
  [alias]
    deploy = !./scripts/deploy.sh
    test = !./scripts/run-tests.sh

  # Cada membro inclui no seu .gitconfig global:
  [include]
    path = /path/to/projeto/.gitaliases`}
        />

        <AlertBox type="success" title="Dica: comece com 5 aliases e adicione gradualmente">
          Não tente memorizar dezenas de aliases de uma vez. Comece com os 5 mais usados (st, co, lg, ci, undo) e adicione novos quando perceber que está digitando o mesmo comando longo repetidamente.
        </AlertBox>
      </PageContainer>
    );
  }
  