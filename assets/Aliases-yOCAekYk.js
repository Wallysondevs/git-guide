import{j as e,L as a}from"./index-By_zGcNR.js";import{P as t,A as s,C as i}from"./AlertBox-CZTB6a28.js";function l(){return e.jsxs(t,{title:"Aliases",subtitle:"Transforme comandos longos em atalhos. Coleção curada de aliases que vão acelerar seu dia.",difficulty:"iniciante",timeToRead:"9 min",children:[e.jsx(s,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git config --global alias.X"})," "," — "," ","registra apelido global; vale para todos os repos do usuário."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"~/.gitconfig"})," "," — "," ","arquivo onde aliases moram, na seção [alias]."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"! prefix"})," "," — "," ",'! sh "comando" — alias roda comando shell, não só git.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Composição"})," "," — "," ","alias que chama outro alias funciona normalmente."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Listagem"})," "," — "," ","git config --get-regexp ^alias\\. lista todos."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Aliases"})," são apelidos para comandos do Git. Em vez de digitar ",e.jsx("code",{children:"git log --graph --oneline --decorate --all"}),", você digita ",e.jsx("code",{children:"git lg"}),". Pequenos acúmulos viram horas economizadas por ano."]}),e.jsxs(s,{type:"tip",title:"Onde aliases moram",children:["Em ",e.jsx("code",{children:"~/.gitconfig"}),", na seção ",e.jsx("code",{children:"[alias]"}),". Você pode adicionar via comando ou editar o arquivo direto."]}),e.jsx("h2",{children:"Sintaxe básica"}),e.jsx(i,{title:"Criando aliases",language:"bash",code:`# Alias simples
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
`}),e.jsx("h2",{children:"Editando ~/.gitconfig diretamente"}),e.jsx(i,{title:"Mais legível para muitos aliases",language:"ini",code:`[alias]
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
`}),e.jsx("h2",{children:"Aliases com shell — o superpoder"}),e.jsxs("p",{children:["Prefixe com ",e.jsx("code",{children:"!"})," para rodar comandos shell arbitrários."]}),e.jsx(i,{title:"Aliases dinâmicos com !",language:"ini",code:`[alias]
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
`}),e.jsx("h2",{children:"Top 20 aliases mais úteis"}),e.jsx(i,{title:"Curadoria",language:"ini",code:`[alias]
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
`}),e.jsx("h2",{children:"Aliases para Conventional Commits"}),e.jsx(i,{title:"Commits padronizados em segundos",language:"ini",code:`[alias]
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
`}),e.jsx("h2",{children:"Alias para deletar tudo do GitHub PR aprovado"}),e.jsx(i,{title:"Limpeza pós-merge",language:"ini",code:`[alias]
    done = "!f() { \\
      git switch main && \\
      git pull --rebase && \\
      git branch -d \\"$1\\" && \\
      git push origin --delete \\"$1\\"; \\
    }; f"

# Uso após merge do PR:
# git done feature/login
`}),e.jsx("h2",{children:"Aliases que evitam catástrofes"}),e.jsx(i,{title:"Wrappers seguros",language:"ini",code:`[alias]
    # Reset --hard que faz backup primeiro
    safe-reset = "!f() { \\
      git tag backup-$(date +%s) && \\
      git reset --hard \\"$1\\"; \\
    }; f"

    # Push sem --force (bloqueia force puro)
    safe-push = "!git push --force-with-lease --force-if-includes"

    # Quem está usando push --force? (audit)
    forces = log --diff-filter=R --pretty=format:'%h %an %ar' --grep='--force'
`}),e.jsx("h2",{children:"Visualizando todos os aliases"}),e.jsx(i,{title:"Discovery",language:"bash",code:`# Listar todos
git config --get-regexp ^alias\\.

# Pretty print
git config --get-regexp ^alias\\. | sed 's/alias\\.//' | column -t -s' '

# Ver o que um alias faz
git config alias.lg
`}),e.jsx("h2",{children:"Bash/Zsh — atalhos no shell"}),e.jsx(i,{title:"Indo além do git config",language:"bash",code:`# ~/.bashrc ou ~/.zshrc — atalhos do shell que economizam ainda mais
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
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(i,{title:"Comandos de alias",language:"bash",code:`git config --global alias.<nome> "<comando>"     # criar
git config --global --unset alias.<nome>          # remover
git config --get-regexp ^alias\\.                   # listar todos
git config --global --edit                         # editar arquivo

# Sintaxe:
# alias.X = comando-git              → simples
# alias.X = "!comando-shell"         → shell (! prefix)
# alias.X = "!f() { ...; }; f"       → função com args
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(a,{href:"/configuracao",children:"Configurações do Git"})," — outras configs essenciais"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/hooks",children:"Git Hooks"})," — automatize ações em eventos do Git"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/dicas",children:"Dicas e Truques"})," — mais produtividade"]})]})]})}export{l as default};
