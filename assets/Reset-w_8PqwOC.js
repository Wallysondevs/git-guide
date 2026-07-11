import{j as e,L as o}from"./index-By_zGcNR.js";import{P as i,A as a,C as r}from"./AlertBox-CZTB6a28.js";function d(){return e.jsxs(i,{title:"Reset e Revert",subtitle:"Desfazendo mudanças com cirurgia. A diferença entre reset, revert e checkout — e quando usar cada um sem perder trabalho.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"--soft"})," "," — "," ","move HEAD; preserva index e working."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--mixed (default)"})," "," — "," ","move HEAD + reseta index; preserva working."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--hard"})," "," — "," ","move HEAD + reseta index + working — DESTRUTIVO."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs revert"})," "," — "," ","reset reescreve; revert cria commit que desfaz."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs checkout"})," "," — "," ","reset move branch; checkout move HEAD ou restaura arquivos."]})]}),e.jsxs("p",{children:['Existem três comandos para "desfazer" no Git, e usá-los errado pode ',e.jsx("strong",{children:"perder código"}),". ",e.jsx("code",{children:"reset"})," move o ponteiro do branch. ",e.jsx("code",{children:"revert"})," cria commit novo que desfaz outro. ",e.jsx("code",{children:"checkout/restore"})," mexe nos arquivos. Aqui você vai entender exatamente quando usar cada um."]}),e.jsxs(a,{type:"tip",title:"Modelo mental",children:['Antes de qualquer "desfazer", pergunte: ',e.jsx("strong",{children:"os commits já foram pushados?"})," Se sim, use ",e.jsx("code",{children:"revert"}),". Se não, use ",e.jsx("code",{children:"reset"}),". Esse é 90% da decisão."]}),e.jsx("h2",{children:"git reset — três variantes"}),e.jsx(r,{title:"--soft, --mixed, --hard",language:"bash",code:`# Estado inicial:
# - Working dir: seus arquivos editados
# - Staging:     o que você deu git add
# - HEAD:        o último commit

# --soft: só MOVE o ponteiro do branch
git reset --soft HEAD~1
# - Working dir: INALTERADO
# - Staging:     INALTERADO (com mudanças do commit "desfeito" no stage)
# - HEAD:        recuou 1 commit

# --mixed (★ padrão): move ponteiro + ESVAZIA staging
git reset HEAD~1
git reset --mixed HEAD~1
# - Working dir: INALTERADO
# - Staging:     limpo (mudanças voltam ao "modified")
# - HEAD:        recuou 1 commit

# --hard: move ponteiro + ESVAZIA staging + RESETA working dir
git reset --hard HEAD~1
# - Working dir: PERDE mudanças (volta exatamente ao commit-alvo)
# - Staging:     limpo
# - HEAD:        recuou 1 commit
# ⚠️  DESTRUTIVO — mudanças não commitadas SOMEM
`}),e.jsx("h2",{children:"Casos práticos por cenário"}),e.jsx("h3",{children:'1. "Esqueci de adicionar um arquivo no último commit"'}),e.jsx(r,{title:"commit --amend é o ideal",language:"bash",code:`git add esquecido.ts
git commit --amend --no-edit
`}),e.jsx("h3",{children:'2. "Fiz commit errado — quero refazer"'}),e.jsx(r,{title:"Soft reset",language:"bash",code:`# Desfaz o último commit, deixa as mudanças no stage
git reset --soft HEAD~1

# Edite o que precisa, refaça o commit
git commit -m "feat: mensagem corrigida"
`}),e.jsx("h3",{children:'3. "Commitei mas quero descartar TUDO desse commit"'}),e.jsx(r,{title:"Hard reset",language:"bash",code:`# ⚠️  Você perde as mudanças daquele commit!
git reset --hard HEAD~1

# Faça backup primeiro se houver dúvida
git tag backup-$(date +%s)
git reset --hard HEAD~1
`}),e.jsx("h3",{children:'4. "Quero voltar 5 commits atrás"'}),e.jsx(r,{title:"Por hash ou offset",language:"bash",code:`# Por offset
git reset --hard HEAD~5

# Por hash exato
git reset --hard abc1234

# Por relação relativa
git reset --hard origin/main         # iguala ao remoto
git reset --hard ORIG_HEAD           # estado antes do último merge/rebase
`}),e.jsx("h3",{children:'5. "Bagunçou tudo, quero voltar pro último estado limpo"'}),e.jsx(r,{title:"Reset hard + clean",language:"bash",code:`# Volta arquivos ao último commit
git reset --hard HEAD

# Remove TAMBÉM arquivos não-rastreados
git clean -fd
# -f = force, -d = pastas
# -n = dry-run (preview)
# -x = inclui ignorados (.gitignore)

# Tudo de uma vez
git reset --hard && git clean -fdx
`}),e.jsxs(a,{type:"danger",title:"reset --hard + clean = NUCLEAR",children:["Essa combinação ",e.jsx("strong",{children:"destrói absolutamente tudo"})," que não está commitado, inclusive arquivos novos. Sempre faça ",e.jsx("code",{children:"-n"})," antes do clean para preview, ou ",e.jsx("code",{children:"git stash -u"})," se houver dúvida."]}),e.jsx("h2",{children:"Reset de arquivo específico"}),e.jsx(r,{title:"Apenas um arquivo",language:"bash",code:`# Tirar do stage (não muda o working)
git reset HEAD arquivo.ts
git restore --staged arquivo.ts        # forma moderna

# Restaurar arquivo do último commit (descarta edições)
git checkout -- arquivo.ts
git restore arquivo.ts                 # forma moderna

# Restaurar de outro commit
git checkout abc1234 -- arquivo.ts
git restore --source=abc1234 arquivo.ts
`}),e.jsx("h2",{children:"git revert — desfazendo commits PUBLICADOS"}),e.jsxs("p",{children:["Quando o commit já foi pushado e outros já clonaram, você não pode reescrever. ",e.jsx("code",{children:"revert"})," cria um ",e.jsx("strong",{children:"commit novo"})," que aplica as mudanças inversas."]}),e.jsx(r,{title:"Revert básico",language:"bash",code:`# Reverte o último commit
git revert HEAD

# Reverte um commit específico
git revert abc1234

# Reverte vários
git revert HEAD~3..HEAD            # últimos 3
git revert abc1234 def5678         # múltiplos hashes

# Reverter sem commit automático (deixa stage para você editar)
git revert --no-commit abc1234
git status        # mudanças no stage
git commit -m "revert: ..."

# Cancelar revert em andamento
git revert --abort
`}),e.jsx("h2",{children:"Revert de merge commit"}),e.jsx(r,{title:"-m mainline",language:"bash",code:`# Merge commit tem 2 pais — você precisa indicar qual manter
git revert -m 1 <hash-do-merge>
# -m 1 = pai 1 (geralmente main)
# -m 2 = pai 2 (geralmente o branch que veio)

# Ver os pais antes de decidir
git show <hash-do-merge> --no-patch
# parent: a1b2c3d (main)
# parent: e5f6g7h (feature/x)
`}),e.jsxs(a,{type:"warning",title:"Revert de merge é tricky",children:["Se você reverter um merge e depois quiser ",e.jsx("strong",{children:"re-mergear"})," a mesma feature, o Git vai pular as mudanças (acha que já foram aplicadas e revertidas). Solução: revert do revert, ou cherry-pick dos commits originais."]}),e.jsx("h2",{children:"Diferença prática: reset vs revert"}),e.jsx(r,{title:"Cenário",language:"markdown",code:`Histórico:
  A───B───C───D───E ← main (HEAD)

git reset --hard B          (modo destrutivo, branch local)
  A───B ← main (HEAD)
  ★ C, D, E somem do histórico (mas ficam no reflog ~30 dias)

git revert D                (modo seguro, branch publicado)
  A───B───C───D───E───D' ← main (HEAD)
  ★ D' desfaz o que D fez. E continua intocado.
`}),e.jsx("h2",{children:"Revert vs reset — guia de decisão"}),e.jsx(r,{title:"Tabela",language:"markdown",code:`Use RESET quando:
  ✓ Branch é local (não pushado)
  ✓ Você quer reescrever o histórico
  ✓ Erros pequenos (último commit, amend não basta)

Use REVERT quando:
  ✓ Commit JÁ FOI pushado e/ou outros têm
  ✓ Branch é compartilhada (main, develop)
  ✓ Você quer manter rastro do "isso foi desfeito"
  ✓ Em produção, nunca arrisque histórico
`}),e.jsx("h2",{children:"Commit cirúrgico de revert"}),e.jsx(r,{title:"Reverter só PARTE de um commit",language:"bash",code:`# Cenário: o commit X mudou 5 arquivos, você quer desfazer só 2

git revert --no-commit X
# Aplica todas as inversões no stage

# Tira do stage as inversões dos arquivos que você QUER manter desfeitos
git reset HEAD arquivo3.ts arquivo4.ts arquivo5.ts
git restore arquivo3.ts arquivo4.ts arquivo5.ts

# Comita só o revert dos 2 arquivos
git commit -m "revert: desfaz parte de X (arquivos 1 e 2)"
`}),e.jsx("h2",{children:'Recuperando após reset --hard "errado"'}),e.jsx(r,{title:"Reflog salva sua vida",language:"bash",code:`# Ai não, fiz reset --hard e perdi 3 commits!

git reflog
# 1f2g3h4 HEAD@{0}: reset: moving to abc1234
# 7i8j9k0 HEAD@{1}: commit: feat: ...      ← perdido!
# 5l6m7n8 HEAD@{2}: commit: fix: ...       ← perdido!
# 3o4p5q6 HEAD@{3}: commit: refactor: ...  ← perdido!

# Volta para o commit anterior ao reset
git reset --hard HEAD@{1}

# OU crie branch a partir do estado anterior
git switch -c salvos HEAD@{1}
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(o,{href:"/reflog",children:"Reflog"})," e ",e.jsx(o,{href:"/recuperacao",children:"Recuperação"}),"."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(r,{title:"Reset, revert, restore",language:"bash",code:`# RESET (move ponteiro)
git reset --soft HEAD~1            # só ponteiro (mantém stage e working)
git reset HEAD~1                   # ponteiro + esvazia stage
git reset --hard HEAD~1            # tudo (PERDE mudanças)
git reset --hard origin/main       # iguala ao remoto

# REVERT (commit novo)
git revert HEAD                    # desfaz último
git revert abc1234                 # desfaz commit X
git revert -m 1 <merge-hash>       # desfaz merge
git revert --no-commit X           # sem commit automático
git revert --abort                 # cancelar

# RESTORE (modifica arquivos)
git restore arquivo.ts             # descarta edição
git restore --staged arquivo.ts    # tira do stage
git restore --source=X arquivo.ts  # de outro commit

# CLEAN (remove untracked)
git clean -n                       # preview
git clean -fd                      # remove
git clean -fdx                     # inclui ignorados
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/reflog",children:"Reflog"})," — sua rede de segurança"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/recuperacao",children:"Recuperação de Desastres"})," — quando reset deu errado"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/cherry-pick",children:"Cherry-pick"})," — pegar commits sem merge"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/stash",children:"Stash"})," — guardar antes de resetar"]})]})]})}export{d as default};
