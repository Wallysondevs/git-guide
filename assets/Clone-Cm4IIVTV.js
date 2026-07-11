import{j as e,L as s}from"./index-By_zGcNR.js";import{P as a,A as i,C as o}from"./AlertBox-CZTB6a28.js";function c(){return e.jsxs(a,{title:"Clone",subtitle:"Bem mais que copiar arquivos — clone tem flags para clones rasos, sparse, parciais e bare. Essencial para repos grandes.",difficulty:"iniciante",timeToRead:"11 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git clone URL"})," "," — "," ","baixa repo + cria remoto origin + checkout do default branch."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--depth N"})," "," — "," ","shallow clone; só os últimos N commits — rápido em CI."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--branch X"})," "," — "," ","já clona em branch específico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--bare"})," "," — "," ","clone sem working tree; usado em servers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SSH vs HTTPS"})," "," — "," ","SSH usa chave; HTTPS usa token (PAT)."]})]}),e.jsxs("p",{children:[e.jsx("code",{children:"git clone"})," faz três coisas em um comando: cria a pasta, baixa o repositório completo e configura ",e.jsx("code",{children:"origin"}),". Mas tem flags poderosas que mudam radicalmente o comportamento — e podem reduzir um clone de 4GB para 200MB."]}),e.jsxs(i,{type:"tip",title:"Para repos grandes",children:["Combine ",e.jsx("code",{children:"--filter=blob:none"})," + ",e.jsx("code",{children:"--no-checkout"})," + ",e.jsx("code",{children:"sparse-checkout"})," para clonar só o que você precisa. Pode ser 10-100x mais rápido em monorepos."]}),e.jsx("h2",{children:"Clone básico"}),e.jsx(o,{title:"Variações simples",language:"bash",code:`# Clone padrão (HTTPS)
git clone https://github.com/usuario/repo.git

# Via SSH (recomendado)
git clone git@github.com:usuario/repo.git

# Em uma pasta com nome diferente
git clone https://github.com/usuario/repo.git minha-pasta

# Em uma pasta específica do sistema
git clone git@github.com:usuario/repo.git ~/projetos/repo
`}),e.jsx("h2",{children:"Clone raso (shallow)"}),e.jsx("p",{children:"Baixa apenas os últimos N commits — economiza muita banda e disco em repos com longa história."}),e.jsx(o,{title:"--depth",language:"bash",code:`# Só o último commit (perfeito para CI/builds)
git clone --depth 1 https://github.com/usuario/repo.git

# Últimos 50 commits
git clone --depth 50 https://github.com/usuario/repo.git

# Combinado com branch específica
git clone --depth 1 --branch v1.5.0 https://github.com/usuario/repo.git

# Aprofundar depois (se precisar de mais histórico)
git fetch --depth 100
git fetch --unshallow      # baixa o resto, vira clone normal
`}),e.jsxs(i,{type:"warning",title:"Limitações de shallow clones",children:["Shallow clones ",e.jsx("strong",{children:"não podem fazer alguns rebases"})," ou ver blame antigo. Para CI/CD onde você só quer build & test, é perfeito. Para desenvolvimento, prefira clone completo."]}),e.jsx("h2",{children:"Clone parcial — partial clone"}),e.jsxs("p",{children:["Mais novo e mais flexível que shallow: baixa ",e.jsx("strong",{children:"só metadata"}),", e pega arquivos sob demanda."]}),e.jsx(o,{title:"--filter",language:"bash",code:`# Sem nenhum blob (arquivo) — só commits e árvores
git clone --filter=blob:none https://github.com/usuario/repo.git

# Sem blobs maiores que 1MB
git clone --filter=blob:limit=1m https://github.com/usuario/repo.git

# Sem árvores (lazier ainda)
git clone --filter=tree:0 https://github.com/usuario/repo.git

# O Git baixa cada arquivo automaticamente quando você acessa
# (com checkout, log -p, blame, etc.)
`}),e.jsx("h2",{children:"Sparse checkout — só algumas pastas"}),e.jsxs("p",{children:["Em monorepos, você pode ter 50 projetos mas só trabalhar em 1. ",e.jsx("strong",{children:"Sparse checkout"})," faz o working directory mostrar só o que você quer."]}),e.jsx(o,{title:"Sparse checkout moderno",language:"bash",code:`# Clone sem checkout
git clone --no-checkout --filter=blob:none https://github.com/empresa/monorepo.git
cd monorepo

# Habilitar sparse-checkout
git sparse-checkout init --cone

# Definir pastas a baixar
git sparse-checkout set apps/web libs/shared

# Agora faça o checkout
git checkout main

# Ver o que está em sparse
git sparse-checkout list

# Adicionar pasta extra depois
git sparse-checkout add apps/api

# Voltar a clonar tudo
git sparse-checkout disable
`}),e.jsx("h2",{children:"Clone bare — sem working directory"}),e.jsx(o,{title:"Para servidores",language:"bash",code:`# Clone bare (só o conteúdo do .git/)
git clone --bare git@github.com:user/repo.git
# Cria pasta repo.git/ com HEAD, config, objects, refs

# Mirror — bare + todas as refs (branches, tags, notes)
git clone --mirror git@github.com:user/repo.git
# Útil para backups e migração de servidor
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(s,{href:"/repositorios",children:"Criando Repositórios"}),"."]}),e.jsx("h2",{children:"Clone com submódulos"}),e.jsx(o,{title:"--recurse-submodules",language:"bash",code:`# Clone + inicializa submódulos em um comando
git clone --recurse-submodules https://github.com/user/repo.git

# Equivalente em 3 passos
git clone https://github.com/user/repo.git
cd repo
git submodule update --init --recursive

# Em paralelo (mais rápido se tem vários submódulos)
git clone --recurse-submodules -j 8 https://github.com/user/repo.git
`}),e.jsxs("p",{children:["Veja ",e.jsx(s,{href:"/submodulos",children:"Submódulos"})," para o guia completo."]}),e.jsx("h2",{children:"Branch específica e single-branch"}),e.jsx(o,{title:"Mais economia",language:"bash",code:`# Clonar checkando uma branch específica (mas baixa tudo)
git clone --branch feature/x https://github.com/user/repo.git

# Clonar SÓ uma branch (ignora as outras completamente)
git clone --single-branch --branch main https://github.com/user/repo.git

# Combo de máxima economia: 1 commit, 1 branch
git clone --depth 1 --single-branch --branch main https://github.com/user/repo.git
`}),e.jsx("h2",{children:"Clone com Git LFS"}),e.jsx(o,{title:"Arquivos grandes",language:"bash",code:`# Por padrão, --filter já baixa LFS sob demanda
git clone --filter=blob:none https://github.com/user/repo.git

# Para baixar todos os LFS de uma vez
git lfs install
git lfs pull

# Para CLONAR sem baixar nenhum binário LFS
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git

# Depois, baixar só os que você precisa
git lfs pull --include "assets/*"
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(s,{href:"/lfs",children:"Git LFS"}),"."]}),e.jsx("h2",{children:"Clone via local filesystem"}),e.jsx(o,{title:"Repositórios locais",language:"bash",code:`# Clone de pasta local (cria hardlinks para economizar disco)
git clone /caminho/para/repo /caminho/destino

# Forçar cópia em vez de hardlink (se vai mexer em ambos)
git clone --no-hardlinks /caminho/origem /caminho/destino

# Via file://
git clone file:///caminho/para/repo
`}),e.jsx("h2",{children:"Templates e configs no clone"}),e.jsx(o,{title:"Customizando clones",language:"bash",code:`# Pular execução de hooks no clone (útil em CI)
git clone --no-hardlinks --template /dev/null repo

# Aplicar config local específica
git clone -c http.sslVerify=false https://...
git clone -c user.email="ci@empresa.com" https://...

# Clone via proxy
HTTPS_PROXY=http://proxy:8080 git clone https://...
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Clone para CI (otimizado)"}),e.jsx(o,{title:"GitHub Actions / GitLab CI",language:"bash",code:`# O mais rápido possível — só o commit que vai testar
git clone --depth 1 --single-branch --branch $BRANCH \\
  --filter=blob:none --no-tags \\
  https://github.com/empresa/repo.git
`}),e.jsx("h3",{children:"2. Clone para investigar histórico"}),e.jsx(o,{title:"Sem economia, mas otimizado",language:"bash",code:`# Tudo, mas com background fetch para acelerar
git clone --filter=blob:none https://github.com/user/repo.git
# Os blobs vêm sob demanda quando você dá log -p, blame, etc.
`}),e.jsx("h3",{children:"3. Clone de um monorepo gigante (Linux kernel, Chromium)"}),e.jsx(o,{title:"Sparse + partial",language:"bash",code:`# Clone vazio
git clone --filter=blob:none --no-checkout \\
  https://github.com/torvalds/linux.git
cd linux

# Só os subsystems que te interessam
git sparse-checkout init --cone
git sparse-checkout set drivers/net/wireless include/net

# Checkout
git checkout master
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos de clone",language:"bash",code:`git clone <url>                        # padrão
git clone <url> <pasta>                # pasta customizada
git clone --depth 1 <url>              # shallow (só último)
git clone --branch <ref> <url>         # branch ou tag específica
git clone --single-branch <url>        # ignora outras branches
git clone --filter=blob:none <url>     # partial (sem arquivos)
git clone --no-checkout <url>          # sem extrair arquivos
git clone --bare <url>                 # sem working directory
git clone --mirror <url>               # bare + todas refs
git clone --recurse-submodules <url>   # com submódulos
git clone -c key=value <url>           # config local
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/remotos",children:"Repositórios Remotos"})," — gerencie origin e upstream"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/submodulos",children:"Submódulos"})," — repos dentro de repos"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/lfs",children:"Git LFS"})," — para projetos com binários grandes"]})]})]})}export{c as default};
