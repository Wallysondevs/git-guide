import{j as s,L as e}from"./index-By_zGcNR.js";import{P as i,A as t,C as a}from"./AlertBox-CZTB6a28.js";function h(){return s.jsxs(i,{title:"Stash",subtitle:"Guarde mudanças no bolso para limpar o working directory sem commitar — e recupere quando quiser.",difficulty:"iniciante",timeToRead:"10 min",children:[s.jsx(t,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"git stash"})," "," — "," ","guarda mudanças não commitadas em pilha."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"stash pop / apply"})," "," — "," ","aplica + remove / aplica e mantém."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"stash -u"})," "," — "," ","inclui untracked."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"stash list"})," "," — "," ","lista todos os stashes (stash@{0}, etc)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"stash branch"})," "," — "," ","cria branch novo a partir do stash."]})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Stash"}),' é o "ctrl+x mental" do Git. Você está no meio de um trabalho, precisa trocar de branch para ver outra coisa, mas não quer commitar lixo. Stash guarda tudo, limpa o working, e devolve depois quando você pedir.']}),s.jsxs(t,{type:"tip",title:"Quando usar stash",children:["Quando você tem mudanças não commitadas e precisa: ",s.jsx("strong",{children:"trocar de branch"}),", ",s.jsx("strong",{children:"fazer um pull"}),", ",s.jsx("strong",{children:"rebasear"}),", ou só ",s.jsx("strong",{children:"limpar temporariamente"}),". Para guardar trabalho a longo prazo, prefira commitar em um branch."]}),s.jsx("h2",{children:"Comandos básicos"}),s.jsx(a,{title:"Stash flow",language:"bash",code:`# Guardar todas as mudanças (tracked)
git stash
# Saved working directory and index state WIP on main: a1b2c3d feat: ...

# Versão moderna (mesma coisa, mais explícita)
git stash push

# Com mensagem descritiva (★ recomendado)
git stash push -m "wip: investigando bug do Stripe"

# Listar tudo que está stashed
git stash list
# stash@{0}: On main: wip: investigando bug do Stripe
# stash@{1}: WIP on feature/login: a1b2c3d feat: ...

# Aplicar o último stash (e REMOVÊ-LO da pilha)
git stash pop

# Aplicar o último mas MANTER na pilha
git stash apply

# Aplicar um específico
git stash apply stash@{2}
git stash pop stash@{2}
`}),s.jsx("h2",{children:"Incluindo arquivos novos (untracked)"}),s.jsx(a,{title:"-u e -a",language:"bash",code:`# Por padrão, git stash IGNORA arquivos não-rastreados (untracked)
# Para incluí-los:
git stash -u
git stash --include-untracked

# Para incluir até IGNORADOS (do .gitignore)
git stash -a
git stash --all
`}),s.jsxs(t,{type:"warning",title:"Untracked é a pegadinha mais comum",children:["Por padrão, ",s.jsx("code",{children:"git stash"})," NÃO guarda arquivos novos que você ainda não ",s.jsx("code",{children:"git add"}),"-ou. Se você criar um arquivo novo e fizer stash, ele continua no working — pode parecer que sumiu. Use sempre ",s.jsx("code",{children:"-u"})," para incluir."]}),s.jsx("h2",{children:"Stash parcial — só alguns arquivos"}),s.jsx(a,{title:"Pathspec e patch",language:"bash",code:`# Stash apenas arquivos específicos
git stash push src/auth.ts src/login.ts -m "wip: auth"

# Modo interativo (escolhe hunks como em git add -p)
git stash push -p
git stash --patch

# Stash mantendo o que já está STAGED
git stash push --keep-index
# (útil quando você quer testar SÓ o que vai commitar)
`}),s.jsx("h2",{children:"Inspecionando stashes"}),s.jsx(a,{title:"Ver o conteúdo",language:"bash",code:`# Resumo (estatísticas)
git stash show
git stash show stash@{1}

# Diff completo
git stash show -p
git stash show -p stash@{1}

# Ver só os arquivos
git stash show --name-only

# Buscar texto em todos os stashes
git stash list -p | grep "rateLimit"
`}),s.jsx("h2",{children:"Removendo stashes"}),s.jsx(a,{title:"Limpeza",language:"bash",code:`# Remover um stash específico
git stash drop stash@{0}

# Limpar TODOS os stashes (CUIDADO)
git stash clear
`}),s.jsxs(t,{type:"danger",title:"stash drop e clear são destrutivos",children:["Stashes apagados ",s.jsx("strong",{children:"somem do reflog também"})," em poucas semanas. Se descartar o errado, recuperar é difícil (mas possível — veja ",s.jsx(e,{href:"/recuperacao",children:"Recuperação"}),")."]}),s.jsx("h2",{children:"Conflitos ao aplicar stash"}),s.jsx(a,{title:"Quando o pop dá ruim",language:"bash",code:`git stash pop
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
# The stash entry is kept in case you need it again.
# (★ pop NÃO removeu o stash porque deu conflito)

# Resolva os conflitos como em qualquer merge
nano src/auth.ts
git add src/auth.ts

# Agora descarte o stash manualmente
git stash drop
`}),s.jsx("h2",{children:"Transformando stash em branch"}),s.jsx(a,{title:"git stash branch",language:"bash",code:`# Cria branch a partir do commit onde o stash foi feito,
# aplica o stash, e remove o stash da pilha
git stash branch experimental-fix stash@{0}

# Útil quando o stash ficou velho e dá conflito ao aplicar
# (este comando aplica em cima do contexto original, sem conflito)
`}),s.jsx("h2",{children:"Casos práticos"}),s.jsx("h3",{children:"1. Trocar de branch no meio do trabalho"}),s.jsx(a,{title:"Cenário clássico",language:"bash",code:`# Você está mexendo em feature/auth, mas precisa olhar feature/payments
git stash push -u -m "wip: investigando bug auth"
git switch feature/payments
# ... investiga ...
git switch feature/auth
git stash pop
`}),s.jsx("h3",{children:"2. Pull rejeitado por mudanças locais"}),s.jsx(a,{title:"Stash + pull + pop",language:"bash",code:`git pull
# error: Your local changes to the following files would be overwritten by merge:
# 	src/auth.ts

git stash
git pull
git stash pop

# OU em uma linha (Git ≥ 2.6):
git pull --autostash
# Configure como padrão:
git config --global rebase.autoStash true
`}),s.jsx("h3",{children:"3. Testar como o código fica SEM as mudanças atuais"}),s.jsx(a,{title:"Stash temporário",language:"bash",code:`# Guarda
git stash

# Testa
npm test

# Recupera
git stash pop
`}),s.jsx("h3",{children:"4. Aplicar mesmo trabalho em 2 branches"}),s.jsx(a,{title:"Apply em vários lugares",language:"bash",code:`# No branch A
git stash push -m "fix common"

# Aplique em A
git stash apply
git commit -am "fix: ..."

# Vá pra B e aplique o MESMO stash
git switch feature-b
git stash apply
git commit -am "fix: ..."

# Quando terminar, descarte
git stash drop
`}),s.jsx("h2",{children:"Stash não é eterno"}),s.jsxs("p",{children:["Stashes ficam no ",s.jsx("code",{children:"refs/stash"})," e seguem regras do reflog: por padrão, expiram em ",s.jsx("strong",{children:"30 dias após drop"})," e ",s.jsx("strong",{children:"90 dias se nunca aplicados"}),". Para trabalho importante, sempre prefira commit em uma branch (até temporária)."]}),s.jsx("h2",{children:"Cheat-sheet"}),s.jsx(a,{title:"Comandos de stash",language:"bash",code:`git stash                          # guarda (tracked)
git stash -u                       # inclui untracked (★)
git stash push -m "msg"            # com mensagem
git stash push -p                  # interativo
git stash list                     # ver pilha
git stash show -p [stash@{N}]      # diff
git stash pop                      # aplica e remove
git stash apply [stash@{N}]        # aplica e mantém
git stash drop [stash@{N}]         # remove
git stash clear                    # remove todos
git stash branch <nome> [stash@{N}] # vira branch
git pull --autostash               # pull com stash automático
`}),s.jsx("h2",{children:"Próximos passos"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx(e,{href:"/branches",children:"Branches"})," — para trabalho mais persistente que stash"]}),s.jsxs("li",{children:[s.jsx(e,{href:"/reset",children:"Reset e Revert"})," — outras formas de manipular o estado"]}),s.jsxs("li",{children:[s.jsx(e,{href:"/recuperacao",children:"Recuperação"})," — se você dropou o stash errado"]})]})]})}export{h as default};
