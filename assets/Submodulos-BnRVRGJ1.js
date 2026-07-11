import{j as e,L as s}from"./index-By_zGcNR.js";import{P as a,A as i,C as o}from"./AlertBox-CZTB6a28.js";function u(){return e.jsxs(a,{title:"Submódulos",subtitle:"Repositórios dentro de repositórios. Poderoso para integrar libs externas, mas com várias armadilhas — entenda antes de adotar.",difficulty:"avancado",timeToRead:"14 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Submodule"})," "," — "," ","repo dentro de outro repo, fixado em commit específico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git submodule add URL"})," "," — "," ","adiciona; cria .gitmodules."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"init/update"})," "," — "," ","clona e checa out os submódulos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--recurse-submodules"})," "," — "," ","clone/pull já trata submódulos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Atualização"})," "," — "," ","cd submodule + git pull + commit no parent."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Submódulos"})," permitem incluir um repositório Git ",e.jsx("em",{children:"dentro"})," de outro, fixado em um commit específico. Útil para libs internas compartilhadas, themes de site, ou dependências que você quer trackear como código-fonte."]}),e.jsxs(i,{type:"warning",title:"Pense duas vezes antes de adotar",children:["Submódulos são uma das features mais incompreendidas do Git. Considere alternativas: ",e.jsx("strong",{children:"monorepo"})," (workspaces), ",e.jsx("strong",{children:"package manager"})," (npm/pip), ou ",e.jsx("strong",{children:"git subtree"}),". Use submódulos quando você realmente precisa de versionamento independente."]}),e.jsx("h2",{children:"Adicionando um submódulo"}),e.jsx(o,{title:"git submodule add",language:"bash",code:`# Em um repo existente
git submodule add https://github.com/user/lib.git lib/external

# Cria:
# - pasta lib/external/ com clone do repo
# - arquivo .gitmodules com a URL e o path
# - entrada no .git/config

git status
# new file:   .gitmodules
# new file:   lib/external

git commit -m "chore: adiciona submódulo lib/external"
git push
`}),e.jsx(o,{title:".gitmodules — o manifesto",language:"ini",code:`# Arquivo .gitmodules (versionado, todos veem)
[submodule "lib/external"]
    path = lib/external
    url = https://github.com/user/lib.git
    branch = main         # opcional — qual branch acompanhar
`}),e.jsx("h2",{children:"Clonando um repo COM submódulos"}),e.jsx(o,{title:"--recurse-submodules",language:"bash",code:`# Clone + inicializa submódulos automaticamente
git clone --recurse-submodules https://github.com/user/repo.git

# Em paralelo (mais rápido)
git clone --recurse-submodules -j 8 https://github.com/user/repo.git

# OU em 3 passos (se já clonou sem)
git clone https://github.com/user/repo.git
cd repo
git submodule update --init --recursive

# Configurar para SEMPRE recursar nos pulls/checkouts
git config --global submodule.recurse true
`}),e.jsxs(i,{type:"danger",title:"Pasta de submódulo vazia ≠ erro",children:["Se você clonar SEM ",e.jsx("code",{children:"--recurse-submodules"}),", as pastas dos submódulos ficam vazias. Não é bug — é design. Sempre rode ",e.jsx("code",{children:"git submodule update --init --recursive"})," depois."]}),e.jsx("h2",{children:"Atualizando submódulos"}),e.jsx(o,{title:"git submodule update",language:"bash",code:`# Atualiza CADA submódulo para o commit que o repo principal espera
git submodule update --init --recursive

# Forçar — descarta mudanças locais nos submódulos
git submodule update --init --recursive --force

# Atualiza para o ÚLTIMO commit do branch configurado (não o que estava fixado)
git submodule update --remote
git submodule update --remote lib/external      # só um

# Combinado: atualiza para latest e merge automático
git submodule update --remote --merge
git submodule update --remote --rebase

# Após atualizar, NÃO ESQUEÇA de commitar a nova "fixação" no repo principal
git add lib/external
git commit -m "chore: bump submódulo lib/external"
`}),e.jsx("h2",{children:"Trabalhando dentro de um submódulo"}),e.jsx(o,{title:"Edits no submódulo",language:"bash",code:`cd lib/external

# Você está em "detached HEAD" por padrão!
git status
# HEAD detached at abc1234

# Para fazer mudanças, crie um branch
git switch -c minha-mudanca

# Edite, commite
# ...
git add .
git commit -m "fix: ..."
git push origin minha-mudanca

# Volte ao repo principal e atualize a referência
cd ../..
git status
# modified:   lib/external (new commits)

git add lib/external
git commit -m "chore: bump lib/external com fix"
git push
`}),e.jsx("h2",{children:"Listando e inspecionando"}),e.jsx(o,{title:"Status de submódulos",language:"bash",code:`# Estado atual
git submodule status
# +abc1234 lib/external (heads/main)
# (-) sufixo = não inicializado
# (+) prefixo = checkout difere do esperado pelo repo pai
# (U) = conflito de merge

# Foreach — roda comando em cada submódulo
git submodule foreach 'git status -sb'
git submodule foreach 'git fetch'
git submodule foreach --recursive 'git checkout main && git pull'

# Diff dos submódulos (mostra hash, não conteúdo)
git diff --submodule=log
git diff --submodule=diff      # mostra diff REAL (mais útil)

# Configurar como padrão
git config --global diff.submodule log
git config --global status.submoduleSummary true
`}),e.jsx("h2",{children:"Removendo um submódulo"}),e.jsx(o,{title:"Processo completo (não trivial)",language:"bash",code:`# 1. Desinicializa
git submodule deinit -f lib/external

# 2. Remove do repo principal
git rm -f lib/external

# 3. Limpa o .git/modules/
rm -rf .git/modules/lib/external

# 4. Comita
git commit -m "chore: remove submódulo lib/external"

# Atalho moderno (Git ≥ 2.34):
git submodule deinit -f lib/external
git rm -rf lib/external
git commit -m "chore: remove submódulo"
`}),e.jsx("h2",{children:"Mudando URL de um submódulo"}),e.jsx(o,{title:"Migração de origem",language:"bash",code:`# Editar .gitmodules
git config --file .gitmodules submodule.lib/external.url https://nova-url

# Sincronizar com .git/config
git submodule sync

# Reinicializar
git submodule update --init --recursive --remote

git commit -am "chore: muda URL do submódulo"
`}),e.jsx("h2",{children:"Pinning vs floating"}),e.jsx(o,{title:"Estratégias",language:"markdown",code:`PINNING (★ recomendado)
  - Submódulo fixo em commit específico
  - Build reproduzível, previsível
  - Atualização explícita (commit + bump)

FLOATING
  - Configurar branch em .gitmodules
  - "git submodule update --remote" sempre pega último
  - Builds podem mudar comportamento sem você atualizar
  - Útil só para libs internas com CI rigoroso
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Lib compartilhada entre vários projetos"}),e.jsx(o,{title:"UI components reutilizada",language:"bash",code:`# projeto-web
git submodule add https://github.com/empresa/ui-components.git lib/ui

# projeto-mobile (mesma lib)
git submodule add https://github.com/empresa/ui-components.git lib/ui

# Ambos usam o mesmo commit, atualizado quando você quiser
`}),e.jsx("h3",{children:"2. Tema de site (Hugo, Jekyll)"}),e.jsx(o,{title:"Tema externo",language:"bash",code:`# Adiciona o tema como submódulo
git submodule add https://github.com/theme-author/cool-theme.git themes/cool

# Atualiza para a última versão do tema
git submodule update --remote themes/cool
git commit -am "chore: atualiza tema"
`}),e.jsx("h3",{children:"3. Documentação compartilhada (mkdocs)"}),e.jsx(o,{title:"Docs em repo próprio",language:"bash",code:`git submodule add https://github.com/empresa/api-docs.git docs/api

# Os docs são desenvolvidos no repo deles e versionados aqui
`}),e.jsx("h2",{children:"Subtree — alternativa sem as dores"}),e.jsx(o,{title:"git subtree",language:"bash",code:`# Adiciona repo externo COMO PARTE do seu (não submódulo)
git subtree add --prefix=lib/external https://github.com/user/lib.git main --squash

# Atualizar
git subtree pull --prefix=lib/external https://github.com/user/lib.git main --squash

# Push de mudanças locais para o repo externo
git subtree push --prefix=lib/external https://github.com/user/lib.git main

# Vantagens vs submódulo:
# ✓ Nada para clonar adicionalmente
# ✓ Sem .gitmodules
# ✓ Histórico do externo fica integrado (com --squash, fica resumido)
# ✗ Histórico do repo principal cresce mais
# ✗ Atualizar exige saber o comando subtree (não auto)
`}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("strong",{children:["Esquecer ",e.jsx("code",{children:"--recurse-submodules"})]})," ao clonar — pasta vazia."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trabalhar em detached HEAD"})," — commits ficam órfãos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de pushar o submódulo"})," antes de bumpar — colega clona quebrado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Esquecer de bumpar a referência"})," no repo pai após atualizar — outros não ganham as mudanças."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Conflito em ponteiro"})," — duas branches bumparam o submódulo para commits diferentes."]})]}),e.jsxs(i,{type:"tip",title:"Configuração que evita 80% das dores",children:[e.jsx("code",{children:"git config --global submodule.recurse true"})," e ",e.jsx("code",{children:"git config --global push.recurseSubmodules check"}),". O Git checa que você pushou os submódulos antes de pushar o pai."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos de submódulo",language:"bash",code:`git submodule add <url> <path>          # adicionar
git submodule init                       # ler .gitmodules
git submodule update --init --recursive  # clonar/atualizar
git submodule update --remote            # pegar último (não fixado)
git submodule status                     # ver estado
git submodule foreach 'cmd'              # rodar em cada
git submodule deinit -f <path>           # remover (parte 1)
git rm -f <path>                         # remover (parte 2)
git submodule sync                       # após mudar URL

git clone --recurse-submodules <url>     # clone com tudo
git config --global submodule.recurse true
git config --global push.recurseSubmodules check
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/clone",children:"Clone"})," — opções para repos com submódulos"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/lfs",children:"Git LFS"})," — outra forma de gerenciar arquivos externos"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/manutencao",children:"Manutenção"})," — performance em monorepos"]})]})]})}export{u as default};
