import{j as e,L as o}from"./index-By_zGcNR.js";import{P as t,A as i,C as a}from"./AlertBox-CZTB6a28.js";function l(){return e.jsxs(t,{title:"Histórico de Commits",subtitle:"git log é uma máquina do tempo. Veja como interrogar o histórico para encontrar QUANDO, QUEM e POR QUE.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git log"})," "," — "," ","lista commits do branch atual."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--oneline --graph --all"})," "," — "," ","visualização compacta de todos os branches."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--author / --grep"})," "," — "," ","filtra por autor ou mensagem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"-p"})," "," — "," ","mostra patch (diff) de cada commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Range"})," "," — "," ","git log A..B = commits em B mas não em A."]})]}),e.jsxs("p",{children:["Um repositório com 5 anos pode ter dezenas de milhares de commits. ",e.jsx("code",{children:"git log"})," é a ferramenta para encontrar agulhas no palheiro: o commit que introduziu o bug, quem mudou aquela linha, qual foi a última versão estável."]}),e.jsxs(i,{type:"tip",title:"Configuração que muda tudo",children:["Configure um alias ",e.jsx("code",{children:"git lg"})," para ",e.jsx("code",{children:"log --oneline --graph --decorate --all"}),". Você nunca mais vai usar ",e.jsx("code",{children:"git log"}),' "puro".']}),e.jsx("h2",{children:"git log — o básico"}),e.jsx(a,{title:"Variações fundamentais",language:"bash",code:`# Histórico completo (verboso)
git log

# Uma linha por commit
git log --oneline
# a1b2c3d (HEAD -> main, origin/main) feat: adiciona login
# e5f6g7h fix: corrige timeout
# 9i0j1k2 chore: bump deps

# Com gráfico de branches
git log --graph --oneline --decorate --all

# Últimos N commits
git log -5
git log -n 5
`}),e.jsx("h2",{children:"Filtrando o histórico"}),e.jsx(a,{title:"Por autor, data, mensagem",language:"bash",code:`# Por autor
git log --author="Maria"
git log --author="@empresa.com"

# Por mensagem (regex)
git log --grep="fix"
git log --grep="^feat\\|^fix" --extended-regexp

# Por data
git log --since="2 weeks ago"
git log --since="2025-01-01" --until="2025-06-30"
git log --since=yesterday

# Combinando filtros
git log --author="Maria" --since="1 month ago" --grep="auth"
`}),e.jsx("h2",{children:"Filtrando por arquivo / código"}),e.jsx(a,{title:"Pickaxe — encontrando código que sumiu",language:"bash",code:`# Histórico de mudanças em um arquivo
git log -- src/auth.ts

# Quem ESCREVEU/REMOVEU determinada string
git log -S "rateLimit" -- src/auth.ts
# ★ pickaxe: encontra o commit que adicionou ou removeu a string

# Mesma coisa, mas com regex
git log -G "rate.?limit" --pickaxe-regex

# Renomeações? Siga o arquivo no histórico
git log --follow src/auth.ts

# Mostra também o conteúdo (diff) de cada commit que mexeu
git log -p src/auth.ts

# Só os commits que mudaram entre N1 e N2 linhas
git log -L 10,30:src/auth.ts
`}),e.jsxs(i,{type:"note",title:"Pickaxe é mágico para investigação",children:[e.jsx("code",{children:'git log -S "stringQueSumiu"'})," encontra o commit exato que removeu (ou adicionou) aquela string. Isso resolve em 5 segundos investigações que sem isso levariam horas."]}),e.jsx("h2",{children:"Formatos customizados"}),e.jsx(a,{title:"--pretty=format",language:"bash",code:`# Formato customizado
git log --pretty=format:"%h | %an | %ar | %s"
# a1b2c3d | Maria | 2 hours ago | feat: adiciona login

# Placeholders úteis:
# %h  hash curto      %H  hash longo
# %an autor (nome)    %ae email
# %ar data relativa   %ad data absoluta
# %s  subject         %b  body
# %D  refs (branches/tags)
# %G? estado de assinatura

# Formatos pré-definidos
git log --pretty=oneline
git log --pretty=short
git log --pretty=full
git log --pretty=fuller
`}),e.jsx("h2",{children:"Estatísticas"}),e.jsx(a,{title:"O quanto cada commit muda",language:"bash",code:`# Resumo de arquivos por commit
git log --stat

# Stat compacto
git log --shortstat
# 3 files changed, 27 insertions(+), 4 deletions(-)

# Ranking de contribuidores
git shortlog -sn
git shortlog -sne          # com email
git shortlog -sn --since="1 year ago"

# Quem mais mexeu em um arquivo
git shortlog -sn -- src/auth.ts

# Linhas adicionadas/removidas por autor
git log --author="Maria" --pretty=tformat: --numstat | \\
  awk '{ a += $1; r += $2 } END { print "+"a, "-"r }'
`}),e.jsx("h2",{children:"Comparando branches"}),e.jsx(a,{title:"O que diverge",language:"bash",code:`# Commits em feature que NÃO estão em main
git log main..feature

# Commits em main que NÃO estão em feature
git log feature..main

# Commits que existem em UM dos dois mas não no outro (XOR)
git log main...feature --left-right
# < a1b2c3d feat: feature commit
# > e5f6g7h fix: main commit

# Commits em feature desde que ela divergiu de main
git log main...feature --left-right --oneline

# Visualizando lado a lado
git log --graph --oneline main feature
`}),e.jsx("h2",{children:"Visualização avançada"}),e.jsx(a,{title:"Gráficos bonitos",language:"bash",code:`# O comando "git lg" essencial
git log --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s %C(red)%d%Creset' --abbrev-commit --date=relative --all

# Salve como alias
git config --global alias.lg "log --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s %C(red)%d%Creset' --abbrev-commit --date=relative --all"

# Agora basta:
git lg
git lg -20

# GUI nativa do Git
gitk --all
git gui
`}),e.jsx("h2",{children:"Procurando bugs no tempo"}),e.jsx(a,{title:"Quando algo quebrou?",language:"bash",code:`# Mostra o último commit que mexeu numa linha específica
git log -L 10,15:src/auth.ts

# Quem mudou cada linha do arquivo (com hash de commit)
git blame src/auth.ts

# Blame de um intervalo
git blame -L 50,80 src/auth.ts

# Para investigação binária — veja Bisect
git bisect start
`}),e.jsxs("p",{children:["Para encontrar bugs por busca binária no histórico, veja ",e.jsx(o,{href:"/bisect",children:"git bisect"}),"."]}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:'1. "Quem foi que mudou esta linha e por quê?"'}),e.jsx(a,{title:"Investigação completa",language:"bash",code:`# 1. Descubra qual commit mudou a linha
git blame -L 42,42 src/auth.ts
# a1b2c3d (Maria 2025-08-12) function login(user, opts = {}) {

# 2. Veja o commit completo
git show a1b2c3d

# 3. Veja o contexto (commits ao redor)
git log -5 a1b2c3d
`}),e.jsx("h3",{children:'2. "O que entrou na release v1.5.0?"'}),e.jsx(a,{title:"Entre tags",language:"bash",code:`# Tudo entre 2 versões
git log v1.4.0..v1.5.0 --oneline

# Só features e fixes (assumindo Conventional Commits)
git log v1.4.0..v1.5.0 --oneline --grep="^feat\\|^fix"

# Agrupado por autor
git shortlog v1.4.0..v1.5.0
`}),e.jsx("h3",{children:'3. "Estou desde quando trabalhando neste branch?"'}),e.jsx(a,{title:"Idade do branch",language:"bash",code:`# Primeiro commit ÚNICO da branch
git log main..HEAD --reverse --oneline | head -1

# Quanto tempo desde o ancestral comum?
git log -1 --format=%ar $(git merge-base main HEAD)
# 6 days ago
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(a,{title:"Os essenciais",language:"bash",code:`git log --oneline --graph --all --decorate    # gráfico bonito
git log -10                                   # últimos 10
git log --author="Maria"                      # por autor
git log --since="1 week ago"                  # por data
git log --grep="fix"                          # por mensagem
git log -S "string"                           # pickaxe
git log -p arquivo                            # com diff
git log --follow arquivo                      # segue renames
git log main..feature                         # diverge
git shortlog -sn                              # ranking de autores
git blame arquivo                             # quem fez cada linha
git show <hash>                               # commit completo
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/bisect",children:"Bisect"})," — busca binária por bugs no histórico"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/reflog",children:"Reflog"})," — o histórico secreto que salva sua vida"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/tags",children:"Tags e Versões"})," — marque pontos importantes"]})]})]})}export{l as default};
