import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Aliases() {
  return (
    <PageContainer
      title="Aliases"
      subtitle="Transforme comandos longos em atalhos. Coleção curada de aliases que vão acelerar seu dia."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git config --global alias.X"}</strong> {' — '} {"registra apelido global; vale para todos os repos do usuário."}
          </li>
        <li>
            <strong>{"~/.gitconfig"}</strong> {' — '} {"arquivo onde aliases moram, na seção [alias]."}
          </li>
        <li>
            <strong>{"! prefix"}</strong> {' — '} {"! sh \"comando\" — alias roda comando shell, não só git."}
          </li>
        <li>
            <strong>{"Composição"}</strong> {' — '} {"alias que chama outro alias funciona normalmente."}
          </li>
        <li>
            <strong>{"Listagem"}</strong> {' — '} {"git config --get-regexp ^alias\\. lista todos."}
          </li>
        </ul>
        <p>
        <strong>Aliases</strong> são apelidos para comandos do Git. Em vez de digitar <code>git log --graph --oneline --decorate --all</code>, você digita <code>git lg</code>. Pequenos acúmulos viram horas economizadas por ano.
      </p>

      <AlertBox type="tip" title="Onde aliases moram">
        Em <code>~/.gitconfig</code>, na seção <code>[alias]</code>. Você pode adicionar via comando ou editar o arquivo direto.
      </AlertBox>

      <h2>Sintaxe básica</h2>
      <CodeBlock
        title="Criando aliases"
        language="bash"
        code={`# Alias simples
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# Agora:
git st
git co main
git br -a

# Alias com argumentos
git config --global alias.unstage "reset HEAD --"
git unstage arquivo.ts        # equivale a: git reset HEAD -- arquivo.ts

# Ver todos os aliases
git config --get-regexp ^alias\\.

# Editar manualmente
git config --global --edit
`}
      />

      <h2>Editando ~/.gitconfig diretamente</h2>
      <CodeBlock
        title="Mais legível para muitos aliases"
        language="ini"
        code={`[alias]
    # Status & info
    st = status -sb
    s  = status
    df = diff
    ds = diff --staged

    # Branches
    br = branch
    co = checkout
    sw = switch
    swc = switch -c

    # Commits
    ci = commit
    cm = commit -m
    cam = commit -am
    amend = commit --amend --no-edit
    fixup = "!f() { git commit --fixup=$1; }; f"

    # Log bonito
    lg = log --color --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s%C(red)%d%Creset' --abbrev-commit --date=relative
    lga = lg --all
    last = log -1 HEAD --stat

    # Push & pull
    p  = push
    pf = push --force-with-lease --force-if-includes
    pl = pull --rebase
    f  = fetch --all --prune

    # Stash
    sl = stash list
    sp = stash pop
    ss = stash push
    su = stash push -u

    # Remote
    r  = remote -v

    # Reset
    unstage = reset HEAD --
    undo = reset --soft HEAD~1
    nuke = reset --hard HEAD~1
`}
      />

      <h2>Aliases com shell — o superpoder</h2>
      <p>Prefixe com <code>!</code> para rodar comandos shell arbitrários.</p>

      <CodeBlock
        title="Aliases dinâmicos com !"
        language="ini"
        code={`[alias]
    # Função shell — recebe argumentos via $1, $2, ...
    fix = "!f() { git commit -am \\"fix: $@\\"; }; f"
    feat = "!f() { git commit -am \\"feat: $@\\"; }; f"

    # Uso:
    # git fix corrige timeout       → git commit -am "fix: corrige timeout"
    # git feat adiciona MFA          → git commit -am "feat: adiciona MFA"

    # Listar branches por última atividade
    recent = "!git for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short)' | head -10"

    # Limpar branches já mergeados em main
    cleanup = "!git branch --merged main | grep -v '^\\\\*\\\\|main\\\\|master' | xargs -n 1 git branch -d"

    # Quem mais contribuiu recentemente
    contrib = "!git shortlog -sn --since='3 months ago'"

    # Abrir repo no GitHub
    open = "!gh browse"

    # Stats deste repo
    stats = "!git log --shortstat --pretty=oneline | awk '/files? changed/ {f+=$1; i+=$4; d+=$6} END {print \\"files: \\" f, \\"+\\" i, \\"-\\" d}'"
`}
      />

      <h2>Top 20 aliases mais úteis</h2>
      <CodeBlock
        title="Curadoria"
        language="ini"
        code={`[alias]
    # ── INFO RÁPIDA ────────────────────────────────────
    st = status -sb
    lg = log --color --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s%C(red)%d%Creset' --abbrev-commit --date=relative
    last = show --stat HEAD
    today = log --since=midnight --author='\${USER}' --oneline

    # ── BRANCHES ────────────────────────────────────────
    sw = switch
    swc = switch -c
    sw- = switch -
    cleanup = "!git branch --merged main | grep -vE '^\\\\*|main$|master$' | xargs -n 1 git branch -d"
    recent = "!git for-each-ref --sort=-committerdate refs/heads --format='%(committerdate:short) %(refname:short)' | head -10"

    # ── COMMITS ─────────────────────────────────────────
    cm = commit -m
    amend = commit --amend --no-edit
    fixup = "!f() { git commit --fixup=$1; }; f"
    wip = !git add -A && git commit -m 'wip'

    # ── DIFF & REVIEW ───────────────────────────────────
    ds = diff --staged
    dw = diff --word-diff
    review = log --left-right --graph --cherry-pick --oneline

    # ── REMOTOS ─────────────────────────────────────────
    pf = push --force-with-lease --force-if-includes
    pl = pull --rebase
    f = fetch --all --prune --tags

    # ── DESFAZER ────────────────────────────────────────
    undo = reset --soft HEAD~1                       # desfaz último commit, mantém staged
    unstage = reset HEAD --                          # tira do stage
    discard = checkout --                            # descarta edição (cuidado!)

    # ── INVESTIGAÇÃO ────────────────────────────────────
    who = shortlog -sn --no-merges
    when = log --pretty=format:'%h %ad %s' --date=short
    find = "!f() { git log --all --grep \\"$1\\" --oneline; }; f"
    pickaxe = "!f() { git log --all -S\\"$1\\" --oneline; }; f"
`}
      />

      <h2>Aliases para Conventional Commits</h2>
      <CodeBlock
        title="Commits padronizados em segundos"
        language="ini"
        code={`[alias]
    feat = "!f() { git commit -m \\"feat: $@\\"; }; f"
    fix  = "!f() { git commit -m \\"fix: $@\\"; }; f"
    docs = "!f() { git commit -m \\"docs: $@\\"; }; f"
    refactor = "!f() { git commit -m \\"refactor: $@\\"; }; f"
    test = "!f() { git commit -m \\"test: $@\\"; }; f"
    chore = "!f() { git commit -m \\"chore: $@\\"; }; f"

# Uso:
# git feat adiciona login MFA
# git fix corrige timeout do Stripe
# git docs atualiza README
`}
      />

      <h2>Alias para deletar tudo do GitHub PR aprovado</h2>
      <CodeBlock
        title="Limpeza pós-merge"
        language="ini"
        code={`[alias]
    done = "!f() { \\
      git switch main && \\
      git pull --rebase && \\
      git branch -d \\"$1\\" && \\
      git push origin --delete \\"$1\\"; \\
    }; f"

# Uso após merge do PR:
# git done feature/login
`}
      />

      <h2>Aliases que evitam catástrofes</h2>
      <CodeBlock
        title="Wrappers seguros"
        language="ini"
        code={`[alias]
    # Reset --hard que faz backup primeiro
    safe-reset = "!f() { \\
      git tag backup-$(date +%s) && \\
      git reset --hard \\"$1\\"; \\
    }; f"

    # Push sem --force (bloqueia force puro)
    safe-push = "!git push --force-with-lease --force-if-includes"

    # Quem está usando push --force? (audit)
    forces = log --diff-filter=R --pretty=format:'%h %an %ar' --grep='--force'
`}
      />

      <h2>Visualizando todos os aliases</h2>
      <CodeBlock
        title="Discovery"
        language="bash"
        code={`# Listar todos
git config --get-regexp ^alias\\.

# Pretty print
git config --get-regexp ^alias\\. | sed 's/alias\\.//' | column -t -s' '

# Ver o que um alias faz
git config alias.lg
`}
      />

      <h2>Bash/Zsh — atalhos no shell</h2>
      <CodeBlock
        title="Indo além do git config"
        language="bash"
        code={`# ~/.bashrc ou ~/.zshrc — atalhos do shell que economizam ainda mais
alias g='git'
alias gs='git status -sb'
alias gd='git diff'
alias gl='git lg'
alias gp='git push'
alias gpl='git pull --rebase'
alias gco='git checkout'
alias gsw='git switch'
alias gcm='git commit -m'

# Função para criar branch + push
gnew() {
  git switch -c "$1" && git push -u origin "$1"
}

# Função pra mover-se rápido entre branches
gswfzf() {
  local branch=$(git branch | fzf | sed 's/^..//')
  [ -n "$branch" ] && git switch "$branch"
}
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de alias"
        language="bash"
        code={`git config --global alias.<nome> "<comando>"     # criar
git config --global --unset alias.<nome>          # remover
git config --get-regexp ^alias\\.                   # listar todos
git config --global --edit                         # editar arquivo

# Sintaxe:
# alias.X = comando-git              → simples
# alias.X = "!comando-shell"         → shell (! prefix)
# alias.X = "!f() { ...; }; f"       → função com args
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/configuracao">Configurações do Git</Link> — outras configs essenciais</li>
        <li><Link href="/hooks">Git Hooks</Link> — automatize ações em eventos do Git</li>
        <li><Link href="/dicas">Dicas e Truques</Link> — mais produtividade</li>
      </ul>
    </PageContainer>
  );
}
