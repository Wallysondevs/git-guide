import{j as e,L as i}from"./index-By_zGcNR.js";import{P as t,A as s,C as a}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(t,{title:"Dicas e Truques",subtitle:"Atalhos, comandos pouco conhecidos e padrões que separam o usuário casual do power user.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx(s,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git switch -"})," "," — "," ","volta ao branch anterior (igual cd -)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git restore --source=X"})," "," — "," ","recupera versão de arquivo de commit X."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git log --oneline --graph"})," "," — "," ","histórico visual compacto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git reflog"})," "," — "," ","salva-vidas: registra todos os movimentos do HEAD."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git stash pop"})," "," — "," ","aplica + remove stash em uma operação."]})]}),e.jsxs("p",{children:["Coletânea de macetes que vão acelerar seu uso diário do Git. Cada um deles parece pequeno, mas somados economizam ",e.jsx("strong",{children:"horas por mês"}),"."]}),e.jsx("h2",{children:"Navegação no histórico"}),e.jsx(a,{title:"Refs especiais",language:"bash",code:`HEAD          # commit atual
HEAD~3        # 3 commits atrás (linear)
HEAD^         # parent (mesmo que HEAD~1)
HEAD^2        # parent #2 (em merge commits)
HEAD^^        # avô (HEAD~2)

ORIG_HEAD     # estado antes do último merge/rebase/reset
FETCH_HEAD    # último fetch
MERGE_HEAD    # outro lado do merge em andamento
CHERRY_PICK_HEAD
REVERT_HEAD

@             # alias para HEAD (Git ≥ 1.8.5)
@{u}          # upstream do branch atual
@{push}       # destino de push (geralmente == @{u})
@{1}          # estado anterior do branch (do reflog)
@{1.day.ago}  # branch como estava ontem
`}),e.jsx("h2",{children:"Comandos utilíssimos pouco conhecidos"}),e.jsx(a,{title:"git switch - (último branch)",language:"bash",code:`# Volta para o branch onde você estava antes
git switch -

# Equivalente a "cd -" do shell
# Útil para alternar entre 2 branches rapidamente
`}),e.jsx(a,{title:"git restore com source",language:"bash",code:`# Restaura UM arquivo de outro commit (sem afetar o resto)
git restore --source=HEAD~3 src/legado.ts

# Restaura de outro branch
git restore --source=feature src/auth.ts

# Restaura tanto stage quanto working
git restore --source=HEAD~3 --staged --worktree src/x.ts
`}),e.jsx(a,{title:"git diff entre commits e arquivos",language:"bash",code:`# Diff entre 2 versões DE OUTROS commits, sem mexer no working
git diff HEAD~5 HEAD~2 -- src/auth.ts

# Diff de um arquivo entre branches
git diff main feature -- src/auth.ts

# Diff word-by-word (em vez de line-by-line)
git diff --word-diff
git diff --color-words

# Diff ignorando whitespace
git diff -w
`}),e.jsx(a,{title:"git log com filtros poderosos",language:"bash",code:`# Quem editou esta linha hoje?
git log --since="midnight" -L 42,42:src/auth.ts

# Commits que ADICIONARAM ou REMOVERAM uma string específica (★)
git log -S "rateLimit" --pickaxe-regex
git log -S "rateLimit" -p     # com diff

# Commits que mudaram um regex
git log -G "rate.?limit"

# Commits que mudaram entre N1 e N2 linhas de um arquivo
git log -L 10,20:src/auth.ts

# Commits que tocaram em determinada função
git log -L :functionName:src/auth.ts
`}),e.jsx(a,{title:"git grep — buscar no código versionado",language:"bash",code:`# Busca em todos os arquivos rastreados (ignora node_modules etc)
git grep "rateLimit"

# Em uma versão antiga
git grep "rateLimit" v1.0.0

# Em vários commits
git grep "rateLimit" main feature v1.0.0

# Mostrar nome de função/contexto
git grep -p "rateLimit"

# Apenas nomes de arquivo
git grep -l "rateLimit"

# Case insensitive + número da linha
git grep -in "rateLimit"
`}),e.jsx("h2",{children:"Workflow tricks"}),e.jsx(a,{title:"WIP rápido",language:"bash",code:`# Salvando rápido com data
git stash push -u -m "wip $(date +%H:%M)"

# Commit "wip" temporário (vai sumir no próximo rebase)
git commit -am "wip" --no-verify

# Para ser auto-removido em rebase
git commit -am "fixup! commit-anterior"
git rebase -i --autosquash main
`}),e.jsx(a,{title:"Encontrar onde estava ontem",language:"bash",code:`# Onde HEAD estava ontem 18h?
git log -1 main@{yesterday.18:00}

# Volta para esse estado
git switch -c ontem main@{yesterday.18:00}
`}),e.jsx(a,{title:"Commit fixup automático",language:"bash",code:`# Você tem commit a1b2c3d "feat: login"
# Encontra um bug, quer fundir o fix nele

git commit --fixup=a1b2c3d
git rebase -i --autosquash main
# Pronto, fix incorporado sem editor manual
`}),e.jsx(a,{title:"Push sem subir tudo",language:"bash",code:`# Pushar até um commit específico (não os mais recentes)
git push origin abc1234:main

# Útil quando você tem 5 commits locais mas só 3 estão prontos
`}),e.jsx("h2",{children:"Performance e qualidade"}),e.jsx(a,{title:"Detectar conflitos antes de commitar",language:"bash",code:`# Verifica se há marcadores <<<<<< esquecidos no diff
git diff --check

# Verifica em todo o working
git diff HEAD --check
`}),e.jsx(a,{title:"Verificar antes de push",language:"bash",code:`# Lista commits que serão pushados
git log @{u}..

# Lista arquivos
git diff @{u}.. --name-only

# Estatísticas
git diff @{u}.. --stat

# Diff completo
git diff @{u}..
`}),e.jsx(a,{title:"Checkup do repo",language:"bash",code:`# Verificar integridade
git fsck --full

# Estatísticas de objetos
git count-objects -vH

# Tamanho do repo
du -sh .git/

# Limpar e otimizar (★ rode mensalmente)
git gc --aggressive --prune=now
`}),e.jsx("h2",{children:"Truques visuais"}),e.jsx(a,{title:"Log bonito (alias lg)",language:"bash",code:`git config --global alias.lg "log --color --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s%C(red)%d%Creset' --abbrev-commit --date=relative --all"

git lg
git lg -10
git lg --since="1 week"
`}),e.jsx(a,{title:"Diff com delta (★ ferramenta excelente)",language:"bash",code:`# Instalar
brew install git-delta
sudo apt install git-delta
cargo install git-delta

# Configurar
git config --global core.pager delta
git config --global interactive.diffFilter "delta --color-only"
git config --global delta.line-numbers true
git config --global delta.side-by-side true
git config --global delta.navigate true
git config --global delta.syntax-theme "Monokai Extended"

# Resultado: diffs com numeração, syntax highlight, navegação fácil
`}),e.jsx("h2",{children:"Salvando configs como gist"}),e.jsx(a,{title:"Backup do .gitconfig",language:"bash",code:`# Suba seu .gitconfig para gist (privado)
gh gist create ~/.gitconfig --filename gitconfig --secret

# Em outra máquina, baixe e aplique
gh gist clone <gist-id>
cp gist-<id>/gitconfig ~/.gitconfig
`}),e.jsx("h2",{children:"Worktrees — múltiplos branches em paralelo"}),e.jsxs("p",{children:["Em vez de stash + switch, abra outra pasta para outra branch. Detalhes em ",e.jsx(i,{href:"/worktrees",children:"Worktrees"}),"."]}),e.jsx(a,{title:"Quick example",language:"bash",code:`# Trabalhando em feature/x na pasta principal
# Precisa ver hotfix em paralelo, sem stashear nada:
git worktree add ../meu-repo-hotfix hotfix/urgente
cd ../meu-repo-hotfix
# trabalhe lá, volte quando quiser
`}),e.jsx("h2",{children:"Atalhos de pathspec"}),e.jsx(a,{title:"Magia do git add / git diff",language:"bash",code:`# Excluir arquivos do operação
git add . ':!*.log' ':!dist/'
git diff -- ':!yarn.lock'

# Só arquivos com certa extensão
git add '*.ts'

# Case insensitive
git add ':(icase)readme'

# De cima da árvore (top-level)
git add ':(top)src/auth.ts'

# Glob recursivo
git add 'src/**/*.test.ts'
`}),e.jsx("h2",{children:"Ferramentas úteis externas"}),e.jsx(a,{title:"Lista curada",language:"markdown",code:`tig             — TUI elegante para git log/diff/blame
lazygit         — TUI completa, super produtiva
delta           — pager bonito para diffs
git-extras      — comandos extras: git changelog, git ignore, etc.
git-absorb      — autosquash inteligente
gitui           — alternativa rust ao lazygit
gh              — CLI oficial do GitHub
glab            — CLI oficial do GitLab
git-filter-repo — substituto moderno do filter-branch
diff-so-fancy   — outro pager bonito
git-quick-stats — estatísticas de contribuição
`}),e.jsx("h2",{children:"Aliases de shell úteis"}),e.jsx(a,{title:"~/.bashrc ou ~/.zshrc",language:"bash",code:`alias g='git'
alias gs='git status -sb'
alias gd='git diff'
alias gds='git diff --staged'
alias gp='git push'
alias gpl='git pull --rebase'
alias gco='git switch'
alias gcm='git commit -m'
alias gca='git commit --amend --no-edit'

# Função: criar branch + push
gnew() { git switch -c "$1" && git push -u origin "$1"; }

# Limpar branches mergeados
gcleanup() {
  git branch --merged main | grep -vE '^\\*|main$|master$' | xargs -n 1 git branch -d
}

# Branch atual no clipboard
gcb() { git branch --show-current | tr -d '\\n' | pbcopy; }    # macOS
gcb() { git branch --show-current | tr -d '\\n' | xclip -sel clip; }  # Linux

# Stats do dia
gtoday() {
  git log --since=midnight --author="$(git config user.name)" --oneline
}
`}),e.jsx("h2",{children:"Detecção de coisas estranhas"}),e.jsx(a,{title:"Investigação",language:"bash",code:`# Maiores arquivos do histórico (★ útil pra detectar binários acidentais)
git rev-list --objects --all |
  git cat-file --batch-check='%(objectname) %(objecttype) %(objectsize) %(rest)' |
  sed -n 's/^blob //p' |
  sort -nrk2 |
  head -10 |
  cut -c1-12,41-

# Arquivos rastreados que estão no .gitignore (configuração errada)
git ls-files -i --exclude-standard

# Branches sem upstream (provavelmente órfãos)
git branch -vv | grep -v 'origin/'

# Última atividade por branch
git for-each-ref --sort=-committerdate refs/heads/ \\
  --format='%(committerdate:short) %(authorname) %(refname:short)'
`}),e.jsx("h2",{children:"Cheat-sheet final"}),e.jsx(a,{title:"Top 25 truques",language:"bash",code:`# Navegação
git switch -                          # último branch
git diff @{u}..                       # vs upstream
git log @{1.day.ago}                  # branch como estava ontem

# Investigação
git log -S "string"                   # pickaxe (★)
git log -L 10,20:arquivo              # história de linhas
git grep "pattern"                    # buscar no código
git blame -w -M -C arquivo            # blame ignorando whitespace
git log --follow arquivo              # segue renames

# Composição
git add -p                            # adicionar interativo
git commit --fixup=<hash>             # fixup auto
git rebase -i --autosquash main       # aplicar fixups

# Limpeza
git diff --check                      # marcadores esquecidos
git fsck && git gc --prune=now        # checkup mensal
git branch --merged main | xargs git branch -d   # limpar mergeados

# Atalho
git switch -c novo --track origin/x   # criar tracking
git push -u origin HEAD               # push branch atual + upstream
git push origin --delete <branch>     # deletar remoto

# Recuperação
git reflog                            # achar tudo
git fsck --lost-found                 # commits órfãos
git stash branch <nome>               # stash → branch
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{href:"/aliases",children:"Aliases"})," — automatize esses truques"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/configuracao",children:"Configurações"})," — todas as opções úteis"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/manutencao",children:"Manutenção"})," — performance em larga escala"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/referencias",children:"Referências"})," — recursos para aprofundar"]})]})]})}export{n as default};
