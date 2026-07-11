import{j as e,L as r}from"./index-By_zGcNR.js";import{P as c,A as a,C as i}from"./AlertBox-CZTB6a28.js";function s(){return e.jsxs(c,{title:"Cherry-pick",subtitle:"Pegue commits específicos de outras branches sem fazer merge — perfeito para hotfixes em release branches.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git cherry-pick"})," "," — "," ","copia commit específico para o branch atual."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Conflito"})," "," — "," ","resolve, git add, git cherry-pick --continue."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"-x"})," "," — "," ",'adiciona linha "(cherry picked from commit ...)".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"-n"})," "," — "," ","aplica mudanças sem commitar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Range"})," "," — "," ","cherry-pick A..B aplica vários commits em sequência."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Cherry-pick"})," aplica um commit específico (de qualquer branch) na sua branch atual, criando um ",e.jsx("em",{children:"commit novo"}),' com as mesmas mudanças. É como dizer "eu não quero todo o branch dele, só esse commit aqui".']}),e.jsxs(a,{type:"tip",title:"Cenário clássico",children:["Você consertou um bug em ",e.jsx("code",{children:"main"})," mas precisa do mesmo fix em uma branch de release antiga (",e.jsx("code",{children:"release/1.5"}),"). Cherry-pick é a ferramenta certa."]}),e.jsx("h2",{children:"Comando básico"}),e.jsx(i,{title:"git cherry-pick",language:"bash",code:`# Aplicar UM commit no branch atual
git cherry-pick abc1234

# Vários commits
git cherry-pick abc1234 def5678 9i0j1k2

# Range de commits (do parent de A até B, inclusive)
git cherry-pick abc1234^..def5678

# Sem commit automático (deixa as mudanças no stage)
git cherry-pick --no-commit abc1234
git cherry-pick -n abc1234

# Adicionar referência ao commit original
git cherry-pick -x abc1234
# Adiciona "(cherry picked from commit abc1234)" na mensagem
`}),e.jsx("h2",{children:"Conflitos no cherry-pick"}),e.jsx(i,{title:"Resolver e continuar",language:"bash",code:`git cherry-pick abc1234
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
# error: could not apply abc1234

# Resolva os conflitos
nano src/auth.ts
git add src/auth.ts

# Continue
git cherry-pick --continue

# OU pular este commit
git cherry-pick --skip

# OU cancelar tudo
git cherry-pick --abort
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Hotfix de main em release antiga"}),e.jsx(i,{title:"Fluxo clássico",language:"bash",code:`# Você corrigiu um bug em main:
git switch main
# (commit a1b2c3d "fix: corrige timeout")

# Precisa aplicar o mesmo fix em release/1.5 (que está em produção)
git switch release/1.5
git cherry-pick a1b2c3d
git push

# Crie tag para a nova versão
git tag -a v1.5.1 -m "Patch v1.5.1: fix timeout"
git push origin v1.5.1
`}),e.jsx("h3",{children:'2. "Salvar" trabalho de uma branch que vai ser descartada'}),e.jsx(i,{title:"Resgate seletivo",language:"bash",code:`# A branch experimental tem 20 commits, só 3 valem a pena
git log feature/experimental --oneline
# 1aa... commit ruim
# 2bb... commit bom ★
# 3cc... commit bom ★
# 4dd... commit ruim
# 5ee... commit bom ★
# ... (mais 15 ruins)

git switch main
git cherry-pick 2bb 3cc 5ee
`}),e.jsx("h3",{children:"3. Mover commit do branch errado"}),e.jsx(i,{title:"Você commitou na branch errada",language:"bash",code:`# Estava em main, fez commit que devia ir em feature/x
git log --oneline -1
# abc1234 feat: nova feature

# Vá para feature/x e traga o commit
git switch feature/x
git cherry-pick abc1234

# Volte e remova de main
git switch main
git reset --hard HEAD~1     # se ainda não pushou
# ou: git revert abc1234    # se já pushou
`}),e.jsx("h3",{children:"4. Backport de feature"}),e.jsx(i,{title:"Range para múltiplos commits",language:"bash",code:`# Trazer commits A..D (4 commits) de feature/new para release/old
git switch release/old
git cherry-pick A^..D
# A^ = parent de A (incluindo A no range)
`}),e.jsx("h2",{children:"Opções úteis"}),e.jsx(i,{title:"Variações",language:"bash",code:`# Manter o autor original do commit (você fica como committer)
git cherry-pick abc1234         # ★ comportamento padrão

# Sobrescrever o autor para você
git cherry-pick --reset-author abc1234

# Adicionar Sign-off (DCO)
git cherry-pick -s abc1234

# Adicionar referência ao commit original (auditoria)
git cherry-pick -x abc1234
# A mensagem ganha:
#   feat: ...
#
#   (cherry picked from commit abc1234)

# Estratégia de resolução em conflito
git cherry-pick -X ours abc1234     # prefere nosso lado
git cherry-pick -X theirs abc1234   # prefere o lado deles

# Cherry-pick "vazio" — quando o commit já está aplicado
git cherry-pick --allow-empty abc1234
`}),e.jsx("h2",{children:"Cherry-pick de merge commits"}),e.jsx(i,{title:"-m mainline",language:"bash",code:`# Merge commits têm 2 pais — escolha qual usar como base
git cherry-pick -m 1 <merge-hash>
# -m 1 = main (preserva mudanças do branch que VEIO no merge)
# -m 2 = inverso

# Geralmente -m 1 é o que você quer
`}),e.jsx("h2",{children:"Verificando antes de aplicar"}),e.jsx(i,{title:"Preview",language:"bash",code:`# Veja o commit completo antes
git show abc1234

# Veja só o diff
git show abc1234 --stat

# Simula a aplicação sem commitar
git cherry-pick --no-commit abc1234
git status
git diff --staged

# Decida:
git commit              # aceitar
git reset --hard HEAD   # descartar
`}),e.jsx("h2",{children:"Histórico paralelo: o problema dos hashes diferentes"}),e.jsxs("p",{children:["Cherry-pick cria um ",e.jsx("strong",{children:"commit novo"})," com hash diferente, mesmo que o conteúdo seja igual. Isso pode causar confusão:"]}),e.jsx(i,{title:"Cherry-pick vs merge",language:"markdown",code:`Branch original:
  main:    A───B───C───D───E
                              \\
  release/1.5: A───B───C───X      ← hotfix X cherry-picked de E

Hashes:
  E (em main):       a1b2c3d
  X (em release):    7p8q9r0     ← MESMO conteúdo, hash diferente

Implicação: ao mergear release/1.5 → main no futuro,
o Git pode tratar X como "commit novo" e haver conflito (mesmo conteúdo).

Solução: use git rebase --interactive ou git merge -s ours.
Ou prefira cherry-pick -x para deixar claro o link.
`}),e.jsxs(a,{type:"warning",title:"Não abuse de cherry-pick",children:["Cherry-pick é ótimo para hotfixes e backports pontuais. Se você está fazendo cherry-pick de 20+ commits, talvez você devesse fazer ",e.jsx("code",{children:"merge"})," ou ",e.jsx("code",{children:"rebase"}),". Cherry-pick excessivo divergem históricos."]}),e.jsx("h2",{children:"Workflow profissional: backports automatizados"}),e.jsx(i,{title:"Script para múltiplas releases",language:"bash",code:`#!/bin/bash
# backport.sh — aplica fix em múltiplas branches de release

COMMIT=$1
RELEASES="release/1.5 release/1.6 release/2.0"

for branch in $RELEASES; do
  echo "→ Backportando $COMMIT para $branch"
  git switch "$branch"
  git pull
  git cherry-pick -x "$COMMIT" || {
    echo "❌ Conflito em $branch — resolva manualmente"
    exit 1
  }
  git push
done

git switch main
echo "✓ Backport completo"

# Uso:
# ./backport.sh a1b2c3d
`}),e.jsx("h2",{children:"Detectando o que falta backportar"}),e.jsx(i,{title:"git cherry",language:"bash",code:`# "Quais commits de main NÃO estão em release/1.5?"
git cherry release/1.5 main
# + a1b2c3d feat: ...     ← está em main, falta em release
# - 7p8q9r0 fix: ...      ← já backportado (cherry-pick detectado)

# Resumo
git cherry release/1.5 main -v | grep '^+' | wc -l
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(i,{title:"Comandos de cherry-pick",language:"bash",code:`git cherry-pick <hash>             # aplicar 1 commit
git cherry-pick A B C              # vários
git cherry-pick A^..B              # range
git cherry-pick -x <hash>          # com referência ao original
git cherry-pick -n <hash>          # sem commit automático
git cherry-pick -m 1 <merge>       # de merge commit

git cherry-pick --continue         # após resolver conflito
git cherry-pick --skip             # pular commit
git cherry-pick --abort            # cancelar

git cherry <upstream> <branch>     # ver o que falta backportar
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{href:"/rebase",children:"Rebase"})," — alternativa para histórico linear"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/merge",children:"Merge"})," — para integrar branch inteira"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/conflitos",children:"Conflitos"})," — quando cherry-pick conflitar"]})]})]})}export{s as default};
