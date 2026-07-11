import{j as e,L as a}from"./index-By_zGcNR.js";import{P as s,A as r,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(s,{title:"Resolvendo Conflitos",subtitle:"Quando duas pessoas mudam a mesma linha, o Git para e pede sua ajuda. Aqui está como resolver com tranquilidade.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Conflito"})," "," — "," ","duas branches mexeram na mesma linha — Git pede ajuda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"<<<<<<< HEAD"})," "," — "," ","marcador do lado atual; ======= separa; >>>>>>> branch é o entrante."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git status"})," "," — "," ","lista arquivos com conflito (Unmerged paths)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mergetool"})," "," — "," ","git mergetool abre ferramenta visual configurada."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Abortar"})," "," — "," ","git merge --abort / rebase --abort volta ao estado anterior."]})]}),e.jsxs("p",{children:["Conflitos não são bugs — são ",e.jsx("strong",{children:"uma feature"}),". O Git só te avisa quando ele ",e.jsx("em",{children:"não tem como decidir sozinho"})," o que é o resultado correto. Saber resolver conflitos com calma é o que separa o iniciante do desenvolvedor confiante."]}),e.jsxs(r,{type:"tip",title:"A primeira regra",children:[e.jsx("strong",{children:"Não entre em pânico."})," Tudo é reversível com ",e.jsx("code",{children:"git merge --abort"})," ou ",e.jsx("code",{children:"git rebase --abort"}),". Você nunca está preso."]}),e.jsx("h2",{children:"O que causa um conflito"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Duas branches editaram ",e.jsx("strong",{children:"a mesma linha"})," de forma diferente."]}),e.jsxs("li",{children:["Uma branch editou um arquivo que outra ",e.jsx("strong",{children:"deletou"}),"."]}),e.jsxs("li",{children:["Duas branches ",e.jsx("strong",{children:"renomearam"})," o mesmo arquivo para nomes diferentes."]}),e.jsx("li",{children:"Mudanças em modos de arquivo (executável vs não-executável)."})]}),e.jsx("h2",{children:"Anatomia de um conflito"}),e.jsx(o,{title:"O Git marca o arquivo assim",language:"diff",code:`function login(user) {
<<<<<<< HEAD                   ← início do "nosso" lado (onde estamos)
  if (!user) throw new Error('user required');
  return verify(user, { strict: true });
=======                        ← divisor
  if (!user) return null;
  return verify(user);
>>>>>>> feature/auth           ← fim do "deles" (o que está vindo)
}
`}),e.jsx("h2",{children:"O fluxo completo de resolução"}),e.jsx(o,{title:"Passo a passo",language:"bash",code:`# 1. Tente o merge
git merge feature/auth
# CONFLICT (content): Merge conflict in src/auth.ts
# Automatic merge failed; fix conflicts and then commit the result.

# 2. Veja quais arquivos têm conflito
git status
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   src/auth.ts

# Lista enxuta:
git diff --name-only --diff-filter=U

# 3. Abra cada arquivo, edite e remova os marcadores
nano src/auth.ts

# 4. Marque como resolvido
git add src/auth.ts

# 5. Conclua o merge (se for merge) ou continue rebase
git commit                    # se foi merge
git rebase --continue         # se foi rebase
`}),e.jsx("h2",{children:"Estratégias na hora de editar"}),e.jsx(o,{title:"As 4 escolhas comuns",language:"bash",code:`# Escolha A — manter SOMENTE o nosso (HEAD)
# Apague desde ======= até >>>>>>>, incluindo o marcador <<<<<<<

# Escolha B — manter SOMENTE o deles
# Apague desde <<<<<<< até =======, incluindo o marcador >>>>>>>

# Escolha C — combinar os dois
# Manualmente edite mantendo o melhor de cada lado

# Escolha D — algo totalmente novo
# Reescreva o trecho como faz mais sentido depois das duas mudanças

# Em TODOS os casos: APAGUE TODOS os marcadores <<<<<<<, =======, >>>>>>>
`}),e.jsx("h2",{children:"Atalhos para escolher um lado inteiro"}),e.jsx(o,{title:"git checkout --ours / --theirs",language:"bash",code:`# Aceitar TUDO do nosso lado neste arquivo
git checkout --ours src/auth.ts

# Aceitar TUDO do lado deles
git checkout --theirs src/auth.ts

# Não esqueça de marcar como resolvido
git add src/auth.ts

# CUIDADO: --ours e --theirs INVERTEM no rebase!
# - merge: ours = HEAD (sua branch), theirs = branch que vem
# - rebase: ours = onde você está rebaseando (ex: main), theirs = seus commits
`}),e.jsxs(r,{type:"warning",title:"Inversão no rebase",children:["Durante ",e.jsx("strong",{children:"merge"}),": ",e.jsx("code",{children:"ours"})," é a sua branch. Durante ",e.jsx("strong",{children:"rebase"}),": ",e.jsx("code",{children:"ours"})," é a branch BASE (em cima da qual você está rebaseando). É contraintuitivo — sempre dê ",e.jsx("code",{children:"git status"})," para confirmar."]}),e.jsx("h2",{children:"Vendo as 3 versões: base, ours, theirs"}),e.jsx(o,{title:"Three-way diff",language:"bash",code:`# Mostrar as 3 versões em formato de diff
git diff
# diff --cc src/auth.ts
# index a1b2c3d,e5f6g7h..0000000
# (mostra as 2 mudanças contra a base)

# Mostrar conteúdo do arquivo em cada lado
git show :1:src/auth.ts > base.txt      # ancestral comum
git show :2:src/auth.ts > ours.txt      # nosso
git show :3:src/auth.ts > theirs.txt    # deles

# Visualização melhorada (mostra o ancestral também)
git checkout --conflict=diff3 src/auth.ts
# Agora o conflito mostra também a "base" original entre ||||||| e =======:
#
# <<<<<<< HEAD
# nosso código
# ||||||| base
# código original
# =======
# código deles
# >>>>>>> feature/auth

# Configure como padrão
git config --global merge.conflictstyle diff3
# OU ainda melhor:
git config --global merge.conflictstyle zdiff3
`}),e.jsx("h2",{children:"Mergetool — interface visual"}),e.jsx(o,{title:"Ferramentas gráficas",language:"bash",code:`# Configurar (faça uma vez)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.keepBackup false

# Outras opções populares:
# - meld         (Linux GUI clássica)
# - kdiff3       (cross-platform)
# - p4merge      (gratuito, muito bom)
# - vimdiff      (terminal)

# Abrir todos os conflitos
git mergetool

# Para arquivo específico
git mergetool src/auth.ts
`}),e.jsx("h2",{children:"Cancelando — voltar atrás"}),e.jsx(o,{title:"Abort",language:"bash",code:`# Cancelar merge em andamento (volta TUDO ao estado de antes)
git merge --abort

# Cancelar rebase em andamento
git rebase --abort

# Cancelar cherry-pick
git cherry-pick --abort

# Cancelar revert
git revert --abort
`}),e.jsx("h2",{children:"Conflitos especiais"}),e.jsx("h3",{children:"Arquivo deletado em um lado, modificado no outro"}),e.jsx(o,{title:"add/delete conflict",language:"bash",code:`# Saída:
# CONFLICT (modify/delete): src/legado.ts deleted in feature
# and modified in HEAD.

# Decida:
# Manter o arquivo (com modificações)
git add src/legado.ts

# OU: aceitar a deleção
git rm src/legado.ts
`}),e.jsx("h3",{children:"Arquivos renomeados de forma diferente"}),e.jsx(o,{title:"rename/rename conflict",language:"bash",code:`# Você renomeou auth.ts → authentication.ts
# Eles renomearam auth.ts → login.ts

# Decida o nome final, apague os outros
git mv authentication.ts auth-final.ts
git rm login.ts
git add auth-final.ts
`}),e.jsx("h2",{children:"rerere — Reuse Recorded Resolution"}),e.jsxs("p",{children:["O Git pode ",e.jsx("strong",{children:"memorizar"})," como você resolveu um conflito e aplicar a mesma solução automaticamente da próxima vez. Útil para rebases longos onde o mesmo conflito reaparece."]}),e.jsx(o,{title:"Habilitando rerere",language:"bash",code:`# Habilitar globalmente
git config --global rerere.enabled true

# Quando você resolve um conflito e dá "git add", o Git memoriza
# Da próxima vez que aparecer o mesmo conflito, ele resolve sozinho

# Ver resoluções memorizadas
git rerere status
git rerere diff

# Esquecer uma resolução
git rerere forget src/auth.ts
`}),e.jsx("h2",{children:"Prevenindo conflitos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sincronize com main frequentemente"})," (rebase ou merge regular)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Branches curtas"})," — quanto mais antiga, mais conflitos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Comunique grandes refactors"})," antes de fazer."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Formatadores automáticos"})," (Prettier, Black) eliminam conflitos de estilo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bons commits atômicos"})," facilitam revisar e mergear."]})]}),e.jsx("h2",{children:"Cheat-sheet de emergência"}),e.jsx(o,{title:"Quando der ruim",language:"bash",code:`# Não sei o que aconteceu, quero parar tudo
git merge --abort     # ou rebase/cherry-pick/revert --abort

# Quais arquivos estão em conflito?
git diff --name-only --diff-filter=U

# Aceitar tudo do MEU lado (em merge)
git checkout --ours .
git add .
git commit

# Aceitar tudo DELES (em merge)
git checkout --theirs .
git add .
git commit

# Já resolvi e quero ver se está tudo ok
git diff --check         # detecta marcadores esquecidos

# Memorize resoluções para o futuro
git config --global rerere.enabled true
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(a,{href:"/merge",children:"Merge"})," — entenda o que gera os conflitos"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/rebase",children:"Rebase"})," — outra fonte comum de conflitos"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/recuperacao",children:"Recuperação de Desastres"})," — quando algo dá MUITO errado"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/dicas",children:"Dicas e Truques"})," — atalhos e configurações úteis"]})]})]})}export{n as default};
