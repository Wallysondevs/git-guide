import{j as e,L as o}from"./index-By_zGcNR.js";import{P as r,A as a,C as i}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(r,{title:"Fetch",subtitle:"O comando que separa o usuário casual do power user. Baixa mudanças sem aplicar — você inspeciona antes de integrar.",difficulty:"intermediario",timeToRead:"9 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git fetch"})," "," — "," ","baixa commits remotos sem mexer em branches locais."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"origin/main"})," "," — "," ","branch de tracking remoto — cópia local do que o servidor tinha."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"fetch --prune"})," "," — "," ","remove referências a branches deletados no remoto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"fetch --all"})," "," — "," ","traz de todos os remotos configurados."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs pull"})," "," — "," ","pull = fetch + merge (ou rebase com --rebase)."]})]}),e.jsxs("p",{children:[e.jsx("code",{children:"git fetch"})," baixa commits, branches e tags do remoto para os ",e.jsx("strong",{children:"refs locais de tracking"})," (",e.jsx("code",{children:"origin/main"}),", ",e.jsx("code",{children:"origin/feature/x"}),") — ",e.jsx("strong",{children:"sem tocar"}),' nos seus arquivos ou no seu branch atual. É o equivalente a "olha, o servidor tem novidades, mas eu não vou aplicar nada ainda".']}),e.jsxs(a,{type:"tip",title:"Por que adotar fetch como padrão",children:["Você sempre vê o que vem antes de mesclar. Zero surpresas. ",e.jsx("code",{children:"pull"}),' mistura "ver" e "aplicar" em um passo só — em equipes grandes, isso causa caos.']}),e.jsx("h2",{children:"Comandos básicos"}),e.jsx(i,{title:"Variações de fetch",language:"bash",code:`# Fetch do origin (padrão)
git fetch

# De um remote específico
git fetch upstream

# De TODOS os remotes configurados
git fetch --all

# De um branch específico
git fetch origin main

# Limpando refs órfãs (branches deletadas no remoto)
git fetch --prune
git fetch -p

# Inclui tags removidas
git fetch --prune --prune-tags

# Configurar prune como padrão (★ recomendado)
git config --global fetch.prune true
`}),e.jsx("h2",{children:"O que fetch faz por dentro"}),e.jsx(i,{title:"Refs de tracking",language:"bash",code:`# Antes do fetch
git log origin/main --oneline -3
# a1b2c3d feat: ...
# e5f6g7h fix: ...
# 9i0j1k2 chore: ...

# Servidor recebeu novos commits...

git fetch
# remote: Counting objects: 5, done.
# remote: Compressing objects: 100% (3/3), done.
# Unpacking objects: 100% (5/5), done.
# From github.com:user/repo
#    a1b2c3d..7p8q9r0  main       -> origin/main

# Agora origin/main aponta para o NOVO commit
git log origin/main --oneline -3
# 7p8q9r0 feat: nova feature ★
# 5l6m7n8 fix: correção
# a1b2c3d feat: ...

# MAS seu branch local main NÃO mudou
git log main --oneline -1
# a1b2c3d feat: ...   ← ainda no commit antigo
`}),e.jsx("h2",{children:"Inspecionando o que veio"}),e.jsx(i,{title:"Antes de mesclar",language:"bash",code:`# Quais commits novos vieram?
git log HEAD..origin/main --oneline
# 7p8q9r0 feat: nova feature
# 5l6m7n8 fix: correção

# Quais arquivos mudaram?
git diff HEAD origin/main --stat

# Diff completo
git diff HEAD origin/main

# Quem mandou os commits?
git shortlog HEAD..origin/main

# Você tem coisa que eles não têm?
git log origin/main..HEAD --oneline
# (commits locais não pushados)

# Visualização lado a lado
git log --left-right --oneline HEAD...origin/main
# < a1b2c3d local commit
# > 7p8q9r0 remote commit
`}),e.jsx("h2",{children:"Aplicando depois de inspecionar"}),e.jsx(i,{title:"Merge ou rebase manual",language:"bash",code:`# Após git fetch, você decide:

# Opção A — merge (cria merge commit se divergir)
git merge origin/main

# Opção B — rebase (linear)
git rebase origin/main

# Opção C — fast-forward só
git merge --ff-only origin/main

# Opção D — descartar local e usar o remoto
git reset --hard origin/main      # ⚠️ perde commits locais

# Opção E — não fazer nada, esperar mais
# (você só queria ver, sem aplicar)
`}),e.jsx("h2",{children:'Fetch + reset para "resetar minha branch para o remoto"'}),e.jsx(i,{title:"Caso comum",language:"bash",code:`# Cenário: bagunçou local, quer apenas espelhar o remoto exatamente
git fetch origin
git switch main
git reset --hard origin/main

# OU em uma linha:
git fetch origin && git reset --hard origin/main
`}),e.jsxs(a,{type:"danger",title:"reset --hard descarta tudo",children:["Mudanças não commitadas SOMEM. Commits locais não pushados também. Faça ",e.jsx("code",{children:"git stash"})," antes se houver dúvida — ou ",e.jsx("code",{children:"git branch backup"})," para guardar o estado atual."]}),e.jsx("h2",{children:"Refspecs — controle fino"}),e.jsxs("p",{children:["Quando você adiciona um remote, o Git define um ",e.jsx("strong",{children:"refspec"}),' — um mapeamento de "onde buscar" para "onde guardar localmente".']}),e.jsx(i,{title:"Refspec padrão",language:"ini",code:`# .git/config
[remote "origin"]
    url = git@github.com:user/repo.git
    fetch = +refs/heads/*:refs/remotes/origin/*

# Lê-se: "ao fazer fetch, traga TODAS as branches (refs/heads/*) do remoto
#  e guarde sob refs/remotes/origin/* localmente"
# O '+' permite atualização não-fast-forward (necessário para força/rebase no remoto)
`}),e.jsx(i,{title:"Refspecs customizados",language:"bash",code:`# Trazer SÓ uma branch específica
git config --add remote.origin.fetch "+refs/heads/main:refs/remotes/origin/main"

# Trazer notas (notes)
git config --add remote.origin.fetch "+refs/notes/*:refs/notes/*"

# Trazer pull requests do GitHub (truque famoso!)
git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"
git fetch origin
git switch pr/123      # entra no estado do PR #123
`}),e.jsx("h2",{children:"Atualização em background"}),e.jsx(i,{title:"Auto-fetch periódico",language:"bash",code:`# Configurar fetch automático em background (Git ≥ 2.31)
git maintenance start

# Adicionar este repo ao maintenance
git maintenance register

# Ver agendamento
git maintenance run --schedule=daily

# O Git roda fetch + gc + commit-graph automaticamente
# Resultado: git status / log são instantâneos mesmo em repos enormes

# Desativar
git maintenance unregister
git maintenance stop
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(o,{href:"/manutencao",children:"Manutenção e Performance"}),"."]}),e.jsx("h2",{children:"Negotiation — protocol v2"}),e.jsx(i,{title:"Fetch mais rápido",language:"bash",code:`# Habilitar protocolo v2 (★ muito mais rápido em repos grandes)
git config --global protocol.version 2

# Desde Git 2.26 é o padrão para HTTPS, então geralmente já está ativo
git config --get protocol.version

# Para fetches MUITO grandes, aumente o buffer
git config --global http.postBuffer 524288000   # 500MB
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Olhar uma feature de um colega sem trocar de branch"}),e.jsx(i,{title:"Inspeção segura",language:"bash",code:`git fetch origin

# Veja o log da branch dele
git log origin/feature/maria --oneline -10

# Diff vs main
git diff main origin/feature/maria

# Quer testar? Crie branch local
git switch -c teste-maria origin/feature/maria
`}),e.jsx("h3",{children:"2. Sincronizar TUDO (todos os remotes)"}),e.jsx(i,{title:"Em projetos com origin + upstream",language:"bash",code:`git fetch --all --prune --tags
`}),e.jsx("h3",{children:"3. Verificar se tem update sem mexer em nada"}),e.jsx(i,{title:"Useful em scripts",language:"bash",code:`# Atualiza refs e mostra o status sem aplicar
git fetch
git status -sb
# ## main...origin/main [behind 3]    ← 3 commits novos no remoto
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(i,{title:"Comandos de fetch",language:"bash",code:`git fetch                                # do origin
git fetch --all                          # de todos os remotes
git fetch --prune                        # limpa refs órfãs
git fetch upstream                       # de remote específico
git fetch origin main                    # branch específica

git log HEAD..origin/main --oneline      # o que veio (★)
git diff HEAD origin/main                # diff completo
git shortlog HEAD..origin/main           # quem mandou

git merge origin/main                    # aplicar via merge
git rebase origin/main                   # aplicar via rebase
git reset --hard origin/main             # espelhar remoto (perde local)

git config --global fetch.prune true     # auto-prune
git maintenance start                    # background fetch
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/push",children:"Push e Pull"})," — quando inevitável usar pull"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/remotos",children:"Repositórios Remotos"})," — múltiplos remotes"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/manutencao",children:"Manutenção"})," — auto-maintenance e gc"]})]})]})}export{n as default};
