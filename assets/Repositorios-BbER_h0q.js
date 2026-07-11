import{j as e,L as i}from"./index-By_zGcNR.js";import{P as t,A as r,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(t,{title:"Criando Repositórios",subtitle:"Tudo o que você precisa saber sobre git init, repositórios bare, templates e o que mora dentro de .git/.",difficulty:"iniciante",timeToRead:"11 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:".git/"})," "," — "," ","diretório que armazena objetos, refs, configs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Working tree"})," "," — "," ","arquivos visíveis no filesystem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Index/Staging"})," "," — "," ","área intermediária entre working e commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bare"})," "," — "," ","repo sem working tree, usado em servers."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Worktree"})," "," — "," ","cópias adicionais do mesmo repo (git worktree add)."]})]}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"repositório Git"})," é qualquer pasta que tenha um diretório ",e.jsx("code",{children:".git/"})," dentro. Ele guarda todo o histórico, as configurações locais e as referências (branches, tags). Entender o que mora ali é o que separa o usuário casual do power user."]}),e.jsxs(r,{type:"tip",title:"TL;DR",children:["Use ",e.jsx("code",{children:"git init"})," para começar do zero, ",e.jsx("code",{children:"git clone"})," para copiar um existente, e ",e.jsx("code",{children:"git init --bare"})," para criar repositórios de servidor (sem working directory)."]}),e.jsx("h2",{children:"git init — do zero"}),e.jsx(o,{title:"Inicialização simples",language:"bash",code:`# Inicializa repo na pasta atual
git init

# Inicializa em uma pasta específica (cria se não existir)
git init meu-novo-projeto

# Define o nome do branch inicial (override do init.defaultBranch)
git init --initial-branch=main
git init -b main

# Inicializa com SHA-256 em vez de SHA-1 (avançado)
git init --object-format=sha256
`}),e.jsx("h2",{children:"O que é criado"}),e.jsx(o,{title:"Anatomia da pasta .git/",language:"bash",code:`ls -la .git/

# HEAD              → ponteiro para o branch atual ("ref: refs/heads/main")
# config            → configuração local deste repo
# description       → usado por GitWeb (você raramente toca)
# hooks/            → scripts que rodam em eventos (pre-commit, etc.)
# info/             → exclude (gitignore local não-versionado)
# objects/          → TODOS os snapshots, comprimidos por hash
# refs/             → ponteiros para commits (branches e tags)
#   heads/main      → arquivo com hash do último commit do main
#   tags/v1.0.0     → arquivo com hash da tag
# packed-refs       → refs compactadas (após git gc)
`}),e.jsxs(r,{type:"note",title:"Tudo é texto e arquivos",children:["A pasta ",e.jsx("code",{children:".git/"})," é puro filesystem. Você pode literalmente abrir ",e.jsx("code",{children:".git/refs/heads/main"})," em um editor e ver o hash do último commit. Isso torna o Git inspecionável e debugável."]}),e.jsx("h2",{children:"Repositório bare — para servidores"}),e.jsxs("p",{children:["Um repositório ",e.jsx("strong",{children:"bare"})," não tem working directory — só o conteúdo do ",e.jsx("code",{children:".git/"})," exposto na raiz. É o que você usa em servidores Git auto-hospedados (Gitea, GitLab self-hosted, ou um simples servidor SSH)."]}),e.jsx(o,{title:"Criando e usando bare repos",language:"bash",code:`# Criar um bare repo (convenção: terminar com .git)
git init --bare /srv/git/meu-projeto.git

# Estrutura é o conteúdo do .git/ direto na raiz:
ls /srv/git/meu-projeto.git/
# HEAD  config  description  hooks  info  objects  refs

# Clonar de um bare repo
git clone /srv/git/meu-projeto.git
# ou via SSH:
git clone usuario@servidor:/srv/git/meu-projeto.git
`}),e.jsx("h2",{children:"Convertendo um repo existente em bare"}),e.jsx(o,{title:"Migração de não-bare → bare",language:"bash",code:`# Clonar como bare a partir do existente
git clone --bare meu-projeto meu-projeto.git

# Mover para o servidor
scp -r meu-projeto.git usuario@servidor:/srv/git/

# Atualizar o origin no clone original
cd meu-projeto
git remote set-url origin usuario@servidor:/srv/git/meu-projeto.git
`}),e.jsx("h2",{children:"Templates de repositório"}),e.jsxs("p",{children:["Você pode definir um ",e.jsx("strong",{children:"template"})," que o ",e.jsx("code",{children:"git init"})," sempre copia para novos repos — útil para padronizar hooks, configs e arquivos iniciais em uma equipe."]}),e.jsx(o,{title:"Criando e usando templates",language:"bash",code:`# Estrutura de um template
mkdir -p ~/.git-template/hooks
cat > ~/.git-template/hooks/pre-commit <<'EOF'
#!/bin/sh
# bloqueia commit com console.log
if git diff --cached | grep -q "console.log"; then
  echo "❌ console.log detectado, remova antes de commitar"
  exit 1
fi
EOF
chmod +x ~/.git-template/hooks/pre-commit

# Definir como padrão
git config --global init.templateDir ~/.git-template

# Agora todo "git init" usa o template automaticamente
mkdir teste && cd teste && git init
ls .git/hooks/   # pre-commit já está lá
`}),e.jsx("h2",{children:"Verificando integridade do repositório"}),e.jsx(o,{title:"git fsck — file system check",language:"bash",code:`# Verifica integridade de todos os objetos
git fsck

# Inclui objetos não-alcançáveis (commits órfãos)
git fsck --lost-found

# Verifica também o reflog
git fsck --reflog

# Modo silencioso (só mostra problemas)
git fsck --no-progress 2>&1
`}),e.jsx("h2",{children:"Onde o Git procura o repositório"}),e.jsxs("p",{children:["Por padrão, o Git sobe na árvore de pastas até encontrar um ",e.jsx("code",{children:".git/"})," ou o root. É por isso que você pode rodar ",e.jsx("code",{children:"git status"})," de uma subpasta."]}),e.jsx(o,{title:"Inspecionar resolução",language:"bash",code:`# Mostrar a raiz do repo atual
git rev-parse --show-toplevel
# /home/voce/meu-projeto

# Mostrar onde o .git está
git rev-parse --git-dir
# .git   (relativo) ou caminho absoluto

# Estamos dentro de um repo?
git rev-parse --is-inside-work-tree
# true / false

# Variável de ambiente para forçar local específico
GIT_DIR=/srv/git/repo.git git log
`}),e.jsx("h2",{children:"Removendo o repositório (sem perder os arquivos)"}),e.jsx(o,{title:"Desfazer git init",language:"bash",code:`# Apaga apenas o histórico — arquivos do projeto ficam
rm -rf .git

# No Windows PowerShell:
Remove-Item -Recurse -Force .git
`}),e.jsxs(r,{type:"danger",title:"Operação irreversível",children:["Apagar ",e.jsx("code",{children:".git/"})," destrói ",e.jsx("strong",{children:"todo o histórico local"}),". Se houver branches não-pushados, eles desaparecem para sempre. Faça um ",e.jsx("code",{children:"git push --all"})," antes se for o caso."]}),e.jsx("h2",{children:"Workflows comuns"}),e.jsx(o,{title:"Cenário 1: começar projeto novo e mandar para o GitHub",language:"bash",code:`mkdir meu-projeto && cd meu-projeto
git init -b main
echo "# Meu Projeto" > README.md
echo "node_modules/" > .gitignore
git add .
git commit -m "chore: setup inicial"

# Crie o repo vazio no GitHub primeiro, depois:
git remote add origin git@github.com:usuario/meu-projeto.git
git push -u origin main
`}),e.jsx(o,{title:"Cenário 2: importar pasta existente que ainda não está no Git",language:"bash",code:`cd projeto-existente
git init
git add .
git status                    # CONFIRA o que vai entrar
git commit -m "chore: importa código legado"

# Depois adicione um remoto e pushe
git remote add origin <url>
git push -u origin main
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{href:"/status",children:"Status e Diff"})," — saiba o estado do seu repo"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/gitignore",children:".gitignore"})," — proteja-se de commitar lixo"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/remotos",children:"Repositórios Remotos"})," — conecte ao GitHub/GitLab"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/manutencao",children:"Manutenção e Performance"})," — gc, prune, repack"]})]})]})}export{n as default};
