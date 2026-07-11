import{j as e,L as i}from"./index-By_zGcNR.js";import{P as a,A as r,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(a,{title:"Forks",subtitle:"O modelo do open source: copie um projeto para sua conta, modifique livremente e proponha mudanças via Pull Request.",difficulty:"intermediario",timeToRead:"11 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Fork"})," "," — "," ","cópia do repo na sua conta; PR original aceita contribuições."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"upstream"})," "," — "," ","convenção: remoto apontando para o repo original."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sync"})," "," — "," ","git fetch upstream; git merge upstream/main mantém atualizado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PR"})," "," — "," ","Pull Request — propõe merge do seu fork no upstream."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Squash and merge"})," "," — "," ","PR vira único commit no upstream."]})]}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"fork"})," é uma cópia completa de um repositório feita no servidor (GitHub, GitLab, etc.), associada à sua conta. Ele é a base do ",e.jsx("strong",{children:"fork & pull workflow"})," — como contribuições funcionam em projetos onde você não tem permissão de push direto."]}),e.jsxs(r,{type:"tip",title:"Fork ≠ branch",children:["Branch é dentro do mesmo repositório. Fork é um ",e.jsx("strong",{children:"repositório novo"})," na sua conta, conectado ao original. Você tem permissão total nele, e abre PRs do seu fork para o original."]}),e.jsx("h2",{children:"O fluxo completo do fork"}),e.jsx(o,{title:"Visão geral",language:"markdown",code:`     [original/repo]              ← upstream (não tem permissão)
            │
            │ fork
            ▼
     [seu-user/repo]              ← origin (você tem TUDO)
            │
            │ clone
            ▼
     [/local/repo] ─→ branches → push para origin → PR para upstream
`}),e.jsx("h2",{children:"Forkando"}),e.jsx(o,{title:"3 jeitos de forkar",language:"bash",code:`# Opção A — pelo botão "Fork" no GitHub

# Opção B — gh CLI (★ mais prático)
gh repo fork original-org/projeto --clone
# Faz fork, clona localmente, configura origin (seu fork) e upstream (original)

# Opção C — manual
# 1. Forkar pela web
# 2. Clonar seu fork
git clone git@github.com:seu-user/projeto.git
cd projeto
# 3. Adicionar upstream
git remote add upstream https://github.com/original-org/projeto.git

# Verificar
git remote -v
# origin     git@github.com:seu-user/projeto.git    (fetch/push)
# upstream   https://github.com/original-org/projeto.git (fetch/push)
`}),e.jsx("h2",{children:"Mantendo seu fork sincronizado"}),e.jsx(o,{title:"Sync com upstream",language:"bash",code:`# Buscar mudanças do projeto original
git fetch upstream

# Ver o que mudou
git log main..upstream/main --oneline

# Atualizar seu main local
git switch main
git rebase upstream/main             # (★ histórico linear)
# ou: git merge upstream/main

# Atualizar seu fork no GitHub
git push                             # se sua main está rastreando origin

# OU em um comando com gh (mais novo)
gh repo sync seu-user/projeto

# OU pelo botão "Sync fork" no GitHub
`}),e.jsxs(r,{type:"warning",title:"Nunca trabalhe direto no main do fork",children:["Mantenha o ",e.jsx("code",{children:"main"})," do seu fork como ",e.jsx("strong",{children:"espelho do upstream"}),". Crie SEMPRE branches de feature para suas mudanças. Isso evita conflitos quando atualizar."]}),e.jsx("h2",{children:"Fluxo de contribuição"}),e.jsx(o,{title:"Passo a passo",language:"bash",code:`# 1. Sincronize main com upstream
git fetch upstream
git switch main
git rebase upstream/main
git push

# 2. Crie branch de feature
git switch -c fix/typo-readme

# 3. Faça as mudanças
# ... edita ...
git commit -am "docs: corrige typo em README"

# 4. Push para SEU fork
git push -u origin fix/typo-readme

# 5. Abra PR para o upstream
gh pr create --repo original-org/projeto --base main \\
  --title "docs: corrige typo em README" --fill

# 6. Atenda reviews — commits adicionais vão pro mesmo branch/PR
git commit --amend     # ou novos commits
git push --force-with-lease

# 7. Após merge, limpe
git switch main
git fetch upstream
git rebase upstream/main
git branch -d fix/typo-readme
git push origin --delete fix/typo-readme
`}),e.jsx("h2",{children:"Atualizando uma feature branch que ficou velha"}),e.jsx(o,{title:"Quando o upstream avançou muito",language:"bash",code:`# Você abriu PR semanas atrás, upstream/main avançou 50 commits
# CI agora reclama de conflitos / merge base velho

git switch fix/algo
git fetch upstream
git rebase upstream/main           # reaplica seus commits em cima do novo main
# resolva conflitos (veja Conflitos)
git push --force-with-lease

# O PR no GitHub atualiza automaticamente
`}),e.jsx("h2",{children:"Aceitando contribuições no SEU fork"}),e.jsx(o,{title:"Quando alguém forkou seu fork",language:"bash",code:`# Adicione o fork dela como remote
git remote add maria git@github.com:maria/projeto.git
git fetch maria

# Veja a feature dela
git log main..maria/feat-x --oneline

# Teste localmente
git switch -c teste-maria maria/feat-x
npm test

# Cherry-pick commits específicos no seu main
git switch main
git cherry-pick maria/feat-x
`}),e.jsx("h2",{children:"Alterando seu fork após muito tempo"}),e.jsx(o,{title:"Fork divergente — reset hard",language:"bash",code:`# Cenário: seu fork está MUITO atrás, mexido demais, quer recomeçar
# do zero a partir do upstream atual

git fetch upstream
git switch main
git reset --hard upstream/main    # ⚠️ destrói histórico local de main
git push --force-with-lease

# Isso só é seguro porque main do fork não deveria ter trabalho exclusivo
`}),e.jsx("h2",{children:"Forks privados de repos públicos"}),e.jsxs("p",{children:["Por design, forks no GitHub herdam a visibilidade do repo original. Para um ",e.jsx("strong",{children:"fork privado"})," de um repo público:"]}),e.jsx(o,{title:"Estratégia: bare clone + push para repo novo",language:"bash",code:`# 1. Clone bare do original
git clone --bare https://github.com/original/projeto.git

# 2. Crie um repo PRIVADO novo na sua conta (vazio, sem README)

# 3. Push mirror para seu repo
cd projeto.git
git push --mirror git@github.com:seu-user/projeto-privado.git

# 4. Clone normalmente
cd ..
git clone git@github.com:seu-user/projeto-privado.git
cd projeto-privado

# 5. Adicione o original como upstream READ-ONLY
git remote add upstream https://github.com/original/projeto.git
git remote set-url --push upstream NO-PUSH

# Sincronizar futuramente:
git fetch upstream
git rebase upstream/main
git push
`}),e.jsx("h2",{children:"Etiqueta de contribuição"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Leia CONTRIBUTING.md"})," antes de abrir o primeiro PR."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Abra issue antes"})," em features grandes — para não fazer trabalho que será rejeitado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"1 PR = 1 propósito"}),". Não misture refactor + feature + fix."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Siga o estilo"})," do projeto, não o seu."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Adicione testes"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Atualize docs"})," se mudar comportamento público."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Seja paciente"}),". Maintainers são voluntários."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sign your commits"})," se o projeto exigir DCO ou GPG."]})]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos do fork workflow",language:"bash",code:`gh repo fork org/repo --clone               # forkar e clonar
git remote add upstream <url>               # adicionar original
git fetch upstream                          # baixar mudanças do original
git rebase upstream/main                    # atualizar
gh repo sync seu-user/repo                  # sync via gh

git switch -c feat/x                        # branch de trabalho
git push -u origin feat/x                   # push pro fork
gh pr create --repo original/repo --fill    # PR upstream

git push --force-with-lease                 # após rebase
gh pr checkout 123 --repo org/repo          # testar PR de outro
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{href:"/pull-requests",children:"Pull Requests"})," — etiqueta de PR detalhada"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/github",children:"Usando GitHub"})," — gh CLI completo"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/signing",children:"Signing"})," — DCO sign-off para projetos enterprise"]})]})]})}export{n as default};
