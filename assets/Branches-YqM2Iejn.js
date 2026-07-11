import{j as e,L as r}from"./index-By_zGcNR.js";import{P as t,A as i,C as a}from"./AlertBox-CZTB6a28.js";function s(){return e.jsxs(t,{title:"Trabalhando com Branches",subtitle:"Branches no Git são quase grátis — entenda como, por que e quando usar para destravar todo seu workflow.",difficulty:"iniciante",timeToRead:"14 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Branch"})," "," — "," ","ponteiro de 41 bytes para um commit; criar é grátis."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"HEAD"})," "," — "," ","ponteiro especial para o branch/commit ativo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git switch -c nome"})," "," — "," ","cria e troca; preferido sobre checkout -b."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tracking"})," "," — "," ","branch local ligado a um remoto (origin/X)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Detached HEAD"})," "," — "," ","HEAD aponta para commit, não para branch."]})]}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"branch"})," no Git é literalmente um ",e.jsx("em",{children:"arquivo de 41 bytes"})," contendo o hash de um commit. Criar um é instantâneo. Trocar entre eles é instantâneo. Isso muda completamente como você trabalha — você experimenta, isola features e nunca quebra a main."]}),e.jsxs(i,{type:"tip",title:"Modelo mental",children:["Um branch é só um ponteiro ",e.jsx("strong",{children:"móvel"})," para um commit. ",e.jsx("code",{children:"HEAD"})," é o ponteiro para o branch atual. Quando você commita, o branch atual avança."]}),e.jsx("h2",{children:"Listando branches"}),e.jsx(a,{title:"git branch — listagem",language:"bash",code:`# Branches locais
git branch
#   feature/login
# * main                 ← * = branch atual
#   refactor/auth

# Locais + remotos
git branch -a
#   feature/login
# * main
#   remotes/origin/HEAD -> origin/main
#   remotes/origin/main
#   remotes/origin/feature/payments

# Com último commit de cada um
git branch -v

# Que já foram mergeados em main (candidatos a deletar)
git branch --merged main

# Que ainda NÃO foram mergeados em main
git branch --no-merged main

# Ordenado pela última atividade
git branch --sort=-committerdate
`}),e.jsx("h2",{children:"Criando branches"}),e.jsx(a,{title:"Variações",language:"bash",code:`# Criar (mas NÃO trocar)
git branch feature/login

# Criar a partir de outro branch / commit
git branch hotfix main
git branch hotfix v1.5.0
git branch hotfix abc1234

# Criar E trocar (forma moderna)
git switch -c feature/login
git switch -c feature/login main      # a partir de main explicitamente

# Forma clássica equivalente
git checkout -b feature/login
`}),e.jsx("h2",{children:"Trocando de branch"}),e.jsx(a,{title:"git switch (recomendado) e git checkout (legacy)",language:"bash",code:`# Trocar para branch existente
git switch main
git switch feature/login

# Trocar para o último branch onde você esteve
git switch -

# Forma clássica (ainda funciona)
git checkout main

# Detached HEAD — modo "só visualização" de um commit antigo
git switch --detach abc1234
git checkout abc1234
# Você pode ver, mas commits aqui ficam órfãos!
`}),e.jsxs(i,{type:"warning",title:"Detached HEAD: cuidado",children:["Quando você dá ",e.jsx("code",{children:"git switch --detach"})," ou ",e.jsx("code",{children:"git checkout <hash>"}),", qualquer commit que você fizer fica ",e.jsx("strong",{children:"sem branch apontando para ele"}),". Para preservar, crie um branch antes de sair: ",e.jsx("code",{children:"git switch -c novo-branch"}),"."]}),e.jsx("h2",{children:"Renomeando e deletando"}),e.jsx(a,{title:"Operações de manutenção",language:"bash",code:`# Renomear o branch atual
git branch -m novo-nome

# Renomear outro branch
git branch -m antigo novo

# Deletar branch local (seguro — só se foi mergeado)
git branch -d feature/login

# Deletar mesmo se NÃO foi mergeado (cuidado!)
git branch -D feature/wip

# Deletar branch remoto
git push origin --delete feature/login
git push origin :feature/login        # forma antiga, mesmo efeito

# Limpar refs locais de branches já deletados no remoto
git fetch --prune
git remote prune origin
`}),e.jsx("h2",{children:"Acompanhando branches remotos"}),e.jsx(a,{title:"Upstream tracking",language:"bash",code:`# Criar um branch local rastreando um remoto
git switch feature/payments
# Se já existe origin/feature/payments, ele fica como upstream automaticamente

# Definir upstream manualmente
git branch -u origin/feature/payments
git branch --set-upstream-to=origin/feature/payments

# Ver upstream de cada branch
git branch -vv
# * main             a1b2c3d [origin/main] feat: ...
#   feature/payments e5f6g7h [origin/feature/payments: ahead 2] ...

# Remover upstream
git branch --unset-upstream

# Push criando upstream automaticamente
git push -u origin feature/payments
# (depois disso, basta "git push" sem argumentos)

# Configure isso para sempre acontecer:
git config --global push.autoSetupRemote true
`}),e.jsx("h2",{children:"Convenções de nomenclatura"}),e.jsx(a,{title:"Padrões usados na indústria",language:"markdown",code:`feature/<descrição>     # nova funcionalidade
fix/<descrição>         # correção de bug
hotfix/<descrição>      # correção urgente em produção
chore/<descrição>       # tarefa de manutenção
refactor/<descrição>    # refatoração sem mudança funcional
docs/<descrição>        # só documentação
release/v1.5.0          # branch de release

# Com ticket/issue:
feature/AUTH-123-mfa-totp
fix/PAY-456-stripe-timeout

# Pessoais (em equipe pequena):
maria/wip-experimento
`}),e.jsx("h2",{children:"Comparando branches"}),e.jsx(a,{title:"Diff entre branches",language:"bash",code:`# Commits em feature que não estão em main
git log main..feature --oneline

# Diff de arquivos entre branches
git diff main feature
git diff main..feature

# Diff "de PR" (desde o ancestral comum) — recomendado
git diff main...feature

# Lista só nomes
git diff --name-only main feature
`}),e.jsx("h2",{children:"Workflow recomendado de feature branch"}),e.jsx(a,{title:"O ciclo completo",language:"bash",code:`# 1. Atualize a base
git switch main
git pull

# 2. Crie a feature branch
git switch -c feature/AUTH-123-mfa

# 3. Trabalhe e commite
# ... edita ...
git add -p
git commit -m "feat(auth): adiciona TOTP"

# 4. Mantenha sincronizado com main (rebase ou merge)
git fetch origin main:main
git rebase main
# ou: git merge main

# 5. Pushe
git push -u origin feature/AUTH-123-mfa

# 6. Abra Pull Request

# 7. Após mergeado, limpe
git switch main
git pull
git branch -d feature/AUTH-123-mfa
git fetch --prune
`}),e.jsx("h2",{children:"Branches especiais"}),e.jsx(a,{title:"orphan, --no-track e mais",language:"bash",code:`# Branch órfão (sem histórico anterior) — útil para gh-pages, docs
git switch --orphan gh-pages
git rm -rf .
echo "<h1>Hello</h1>" > index.html
git add index.html
git commit -m "init gh-pages"

# Branch sem rastrear remoto
git switch -c local-only --no-track

# Branch a partir de uma tag
git switch -c hotfix-1.5.1 v1.5.0
`}),e.jsx("h2",{children:"Limpando branches antigos em massa"}),e.jsx(a,{title:"Faxina periódica",language:"bash",code:`# Liste branches já mergeados em main (excluindo main)
git branch --merged main | grep -v "main\\|^*" | xargs -n 1 git branch -d

# Liste branches sem upstream (provavelmente órfãos)
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D

# Branches sem atividade nos últimos 6 meses
for b in $(git branch | sed 's/^..//'); do
  age=$(git log -1 --format="%cr" $b)
  echo "$age | $b"
done | sort
`}),e.jsxs(i,{type:"danger",title:"Antes de deletar em massa",children:["Branches têm trabalho que você pode ter esquecido. Sempre confira ",e.jsx("code",{children:"git log <branch>"})," antes. Se deletar errado, o ",e.jsx(r,{href:"/reflog",children:"reflog"})," e ",e.jsx(r,{href:"/recuperacao",children:"recuperação"})," ainda salvam por ~30 dias."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(a,{title:"Comandos essenciais",language:"bash",code:`git branch                        # listar
git branch -a                     # incluir remotos
git switch -c feat/x              # criar e trocar
git switch main                   # trocar
git switch -                      # trocar para anterior
git branch -m novo                # renomear atual
git branch -d feat/x              # deletar (seguro)
git branch -D feat/x              # deletar à força
git push origin --delete feat/x   # deletar remoto
git push -u origin feat/x         # push + upstream
git fetch --prune                 # limpar refs órfãs
git branch --merged main          # já mergeados
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{href:"/merge",children:"Merge"})," — combine branches"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/rebase",children:"Rebase"})," — reescreva e linearize histórico"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/conflitos",children:"Conflitos"})," — resolva quando o Git não consegue"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/worktrees",children:"Worktrees"})," — múltiplos branches em pastas paralelas"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/fluxos",children:"Fluxos de Trabalho"})," — Git Flow, GitHub Flow, Trunk-based"]})]})]})}export{s as default};
