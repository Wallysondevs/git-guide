import{j as i,L as o}from"./index-By_zGcNR.js";import{P as t,A as a,C as e}from"./AlertBox-CZTB6a28.js";function n(){return i.jsxs(t,{title:"Primeiros Passos",subtitle:"Do diretório vazio ao primeiro commit em 5 minutos. O ciclo fundamental que você vai repetir mil vezes.",difficulty:"iniciante",timeToRead:"10 min",children:[i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"git init"})," "," — "," ","cria .git/ no diretório atual."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"git add"})," "," — "," ","move arquivo para staging."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"git commit"})," "," — "," ","grava snapshot do staging."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"git status"})," "," — "," ","o que mudou desde o último commit."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"git log"})," "," — "," ","histórico de commits."]})]}),i.jsxs("p",{children:["Aqui você vai aprender o ",i.jsx("strong",{children:"ciclo básico do Git"}),": criar repositório → editar arquivo → adicionar ao stage → commitar. Esses 4 passos são 80% do que você faz no dia a dia."]}),i.jsxs(a,{type:"tip",title:"Pré-requisitos",children:["Tenha o Git instalado e seu nome/email configurados. Se não tiver, volte para ",i.jsx(o,{href:"/instalacao",children:"Instalação e Setup"}),"."]}),i.jsx("h2",{children:"1. Crie um repositório"}),i.jsxs("p",{children:["Existem dois caminhos: começar do zero (",i.jsx("code",{children:"git init"}),") ou clonar um existente (",i.jsx("code",{children:"git clone"}),")."]}),i.jsx(e,{title:"Do zero — git init",language:"bash",code:`# Criar pasta e entrar nela
mkdir meu-projeto && cd meu-projeto

# Inicializar repositório Git
git init
# Initialized empty Git repository in /home/voce/meu-projeto/.git/

# Verificar — agora existe uma pasta .git oculta
ls -la
# .  ..  .git
`}),i.jsx(e,{title:"De um repositório existente — git clone",language:"bash",code:`# Clonar via HTTPS
git clone https://github.com/usuario/repositorio.git

# Clonar via SSH (recomendado se você tem chave configurada)
git clone git@github.com:usuario/repositorio.git

# Clonar em uma pasta com nome diferente
git clone https://github.com/usuario/repositorio.git minha-pasta

# Clonar só a versão mais recente (mais rápido para repos grandes)
git clone --depth 1 https://github.com/usuario/repositorio.git
`}),i.jsx("h2",{children:"2. Crie um arquivo"}),i.jsx(e,{title:"Primeiro arquivo do projeto",language:"bash",code:`echo "# Meu Projeto" > README.md
echo "console.log('hello git')" > app.js

ls
# README.md  app.js
`}),i.jsx("h2",{children:"3. Verifique o status"}),i.jsxs("p",{children:[i.jsx("code",{children:"git status"})," é o comando que você mais vai usar — mostra o que mudou, o que está staged e o que está untracked."]}),i.jsx(e,{title:"git status",language:"bash",code:`git status
# On branch main
#
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         README.md
#         app.js
#
# nothing added to commit but untracked files present
`}),i.jsx("h2",{children:"4. Adicione ao staging"}),i.jsx(e,{title:"git add — preparando para o commit",language:"bash",code:`# Adicionar um arquivo específico
git add README.md

# Adicionar vários arquivos
git add README.md app.js

# Adicionar TUDO que mudou (cuidado — adiciona até arquivos novos)
git add .

# Adicionar interativamente (escolhe pedaço por pedaço)
git add -p

# Ver o que está staged
git status
`}),i.jsxs(a,{type:"warning",title:"Cuidado com git add .",children:[i.jsx("code",{children:"git add ."})," adiciona ",i.jsx("strong",{children:"tudo"}),", incluindo arquivos que talvez você não queira (logs, builds, secrets). Sempre rode ",i.jsx("code",{children:"git status"})," antes de commitar e configure um bom ",i.jsx(o,{href:"/gitignore",children:".gitignore"}),"."]}),i.jsx("h2",{children:"5. Faça o commit"}),i.jsx(e,{title:"git commit",language:"bash",code:`# Commit com mensagem inline
git commit -m "feat: setup inicial do projeto"

# Saída esperada:
# [main (root-commit) a1b2c3d] feat: setup inicial do projeto
#  2 files changed, 2 insertions(+)
#  create mode 100644 README.md
#  create mode 100644 app.js
`}),i.jsx("h2",{children:"6. Veja o histórico"}),i.jsx(e,{title:"git log",language:"bash",code:`# Histórico completo
git log

# Versão compacta — uma linha por commit
git log --oneline

# Com gráfico ASCII de branches
git log --oneline --graph --all

# Últimos 5 commits formatados
git log -5 --pretty=format:"%h %an: %s"
`}),i.jsx("h2",{children:"O ciclo completo, de novo"}),i.jsx(e,{title:"Seu fluxo diário",language:"bash",code:`# 1. Veja o que mudou
git status
git diff

# 2. Adicione as mudanças que quer commitar
git add arquivo1.js arquivo2.js
# ou: git add -p   (interativo, recomendado)

# 3. Confirme com mensagem clara
git commit -m "fix: corrige cálculo de desconto"

# 4. Envie para o remoto (se houver)
git push
`}),i.jsx("h2",{children:"Desfazendo erros comuns"}),i.jsx(e,{title:"Cenários frequentes",language:"bash",code:`# Adicionei um arquivo errado ao stage
git restore --staged arquivo-errado.js

# Quero descartar mudanças não commitadas em um arquivo
git restore arquivo.js
# ⚠️  isso APAGA suas mudanças, sem volta

# Esqueci de adicionar um arquivo no último commit
git add esquecido.js
git commit --amend --no-edit

# Errei a mensagem do último commit
git commit --amend -m "mensagem corrigida"
`}),i.jsxs(a,{type:"danger",title:"Cuidado com --amend após push",children:["Use ",i.jsx("code",{children:"--amend"})," só em commits que ",i.jsx("strong",{children:"ainda não foram pushados"}),". Se já foram, você reescreve o histórico e pode quebrar o trabalho de outros."]}),i.jsx("h2",{children:"Cheat-sheet do iniciante"}),i.jsx(e,{title:"Os 10 comandos que resolvem 90% dos casos",language:"bash",code:`git init                  # criar repo
git clone <url>           # baixar repo existente
git status                # ver o que mudou
git diff                  # ver as mudanças linha a linha
git add <arquivo>         # preparar para commit
git add -p                # adicionar pedaço a pedaço (interativo)
git commit -m "msg"       # commitar
git log --oneline         # ver histórico
git push                  # enviar para remoto
git pull                  # baixar mudanças do remoto
`}),i.jsx("h2",{children:"Próximos passos"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx(o,{href:"/status",children:"Status e Diff"})," — entenda o que cada estado significa"]}),i.jsxs("li",{children:[i.jsx(o,{href:"/staging",children:"Staging Area"})," — o conceito mais característico do Git"]}),i.jsxs("li",{children:[i.jsx(o,{href:"/commits",children:"Fazendo Commits"})," — escreva mensagens que fazem sentido"]}),i.jsxs("li",{children:[i.jsx(o,{href:"/branches",children:"Branches"})," — trabalhe em múltiplas coisas em paralelo"]})]})]})}export{n as default};
