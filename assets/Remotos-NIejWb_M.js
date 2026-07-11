import{j as e,L as r}from"./index-By_zGcNR.js";import{P as t,A as i,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(t,{title:"Repositórios Remotos",subtitle:"Como o Git conversa com servidores. URLs, protocolos, múltiplos remotes e o conceito de tracking branches.",difficulty:"intermediario",timeToRead:"12 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Remote"})," "," — "," ","referência nomeada a outro repo (origin, upstream)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git remote -v"})," "," — "," ","lista remotes e URLs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git remote add"})," "," — "," ","cadastra novo remote."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Refspec"})," "," — "," ","+refs/heads/*:refs/remotes/origin/* — define mapping de fetch."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Multi-remote"})," "," — "," ","útil em forks (origin = seu, upstream = original)."]})]}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"remote"})," é um apelido para a URL de um repositório Git em outra máquina. Você não digita a URL toda vez — usa o apelido (geralmente ",e.jsx("code",{children:"origin"}),"). Entender remotes é entender como o Git distribuído funciona de verdade."]}),e.jsxs(i,{type:"tip",title:"origin não é especial",children:[e.jsx("code",{children:"origin"})," é só uma ",e.jsx("strong",{children:"convenção"})," — o nome padrão criado pelo ",e.jsx("code",{children:"git clone"}),". Você pode renomeá-lo, ter vários remotes, ou nenhum. Não há nada de mágico."]}),e.jsx("h2",{children:"Listando remotes"}),e.jsx(o,{title:"git remote",language:"bash",code:`# Listar nomes
git remote
# origin

# Com URLs
git remote -v
# origin  git@github.com:usuario/repo.git (fetch)
# origin  git@github.com:usuario/repo.git (push)

# Detalhes completos de um remote
git remote show origin
# * remote origin
#   Fetch URL: git@github.com:usuario/repo.git
#   Push  URL: git@github.com:usuario/repo.git
#   HEAD branch: main
#   Remote branches:
#     main                        tracked
#     feature/login               tracked
#   Local branches configured for 'git pull':
#     main merges with remote main
#   Local refs configured for 'git push':
#     main pushes to main (up to date)
`}),e.jsx("h2",{children:"Adicionando, removendo, renomeando"}),e.jsx(o,{title:"Operações básicas",language:"bash",code:`# Adicionar
git remote add upstream git@github.com:original/repo.git

# Renomear
git remote rename origin github

# Remover
git remote remove upstream
git remote rm upstream

# Mudar URL
git remote set-url origin git@github.com:novo-usuario/repo.git

# Ver URL específica
git remote get-url origin
`}),e.jsx("h2",{children:"Protocolos: HTTPS vs SSH vs Git"}),e.jsx(o,{title:"Comparação",language:"markdown",code:`HTTPS — https://github.com/user/repo.git
  ✓ Funciona em qualquer rede (até atrás de firewall corporativo)
  ✓ Boa para CI/automation com tokens
  ✗ Pede credencial a cada push (sem credential helper)

SSH — git@github.com:user/repo.git
  ✓ Sem digitar senha (com chave configurada)
  ✓ Mais seguro para máquinas pessoais
  ✗ Bloqueado em alguns firewalls (porta 22)

Git — git://github.com/user/repo.git (somente leitura)
  ✓ Mais rápido para clones públicos
  ✗ Não autenticado — não pode pushar
  ✗ GitHub aposentou em 2022

Local — /caminho/para/repo.git
  ✓ Para repositórios na mesma máquina
  ✓ Útil em testes
`}),e.jsx("h2",{children:"Credential helper — não digite senha de novo"}),e.jsx(o,{title:"HTTPS sem fricção",language:"bash",code:`# Linux: cache em memória por 15 min
git config --global credential.helper "cache --timeout=900"

# macOS: usa Keychain do sistema
git config --global credential.helper osxkeychain

# Windows: Git Credential Manager (vem com Git for Windows)
git config --global credential.helper manager

# Armazenar permanentemente em arquivo (TEXTO PURO — cuidado!)
git config --global credential.helper store

# GitHub CLI configura automaticamente
gh auth login
`}),e.jsxs(i,{type:"warning",title:"credential.helper store é texto puro",children:["O modo ",e.jsx("code",{children:"store"})," grava em ",e.jsx("code",{children:"~/.git-credentials"})," em texto plano. Em máquina pessoal pode passar; em servidor ou máquina compartilhada, NÃO use. Prefira keychain/manager."]}),e.jsx("h2",{children:"Tracking branches"}),e.jsxs("p",{children:["Um ",e.jsx("strong",{children:"tracking branch"}),' é um branch local que "sabe" qual branch remoto ele acompanha. Isso permite ',e.jsx("code",{children:"git push"})," e ",e.jsx("code",{children:"git pull"})," sem argumentos."]}),e.jsx(o,{title:"Configurando tracking",language:"bash",code:`# Criar branch local rastreando um remoto existente
git switch feature/payments
# Se origin/feature/payments existe, vira upstream automaticamente

# Definir upstream manualmente
git branch -u origin/feature/payments
git branch --set-upstream-to=origin/feature/payments feature/payments

# Ver upstreams
git branch -vv
# * main             a1b2c3d [origin/main] feat: ...
#   feature/payments e5f6g7h [origin/feature/payments: ahead 2, behind 1]

# Push criando upstream
git push -u origin feature/payments
# Depois disso: basta "git push"

# Auto-criar upstream em todo push novo
git config --global push.autoSetupRemote true
`}),e.jsx("h2",{children:"Múltiplos remotes — fluxo open source"}),e.jsx(o,{title:"origin + upstream (fork workflow)",language:"bash",code:`# 1. Você forkou um projeto no GitHub
# 2. Clonou seu fork
git clone git@github.com:seu-user/projeto.git
cd projeto

# 3. origin já aponta para seu fork
git remote -v
# origin  git@github.com:seu-user/projeto.git (fetch/push)

# 4. Adicione o repo original como "upstream"
git remote add upstream https://github.com/original-org/projeto.git

# 5. Mantenha sincronizado com upstream
git fetch upstream
git switch main
git rebase upstream/main      # ou: git merge upstream/main
git push                      # atualiza seu fork

# 6. Trabalhe em features no SEU fork (origin)
git switch -c feature/x
# ... edita ...
git push -u origin feature/x

# 7. Abra PR do seu fork para o upstream
gh pr create --repo original-org/projeto
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(r,{href:"/forks",children:"Forks"}),"."]}),e.jsx("h2",{children:"Push e fetch para múltiplos remotes"}),e.jsx(o,{title:"Mirror push",language:"bash",code:`# Pushar para origin E para backup ao mesmo tempo
git remote add backup git@gitlab.com:user/repo.git

# Configurar push múltiplo no origin (truque clássico)
git remote set-url --add --push origin git@github.com:user/repo.git
git remote set-url --add --push origin git@gitlab.com:user/repo.git

# Agora "git push origin" envia para AMBOS
git push origin main

# Ver:
git remote -v
# origin  git@github.com:user/repo.git (fetch)
# origin  git@github.com:user/repo.git (push)
# origin  git@gitlab.com:user/repo.git (push)
`}),e.jsx("h2",{children:"Limpando refs órfãs"}),e.jsx(o,{title:"Prune",language:"bash",code:`# Remove refs locais para branches que foram deletadas no remoto
git remote prune origin
git fetch --prune

# Configurar para sempre acontecer no fetch/pull
git config --global fetch.prune true
git config --global fetch.pruneTags true

# Listar branches "gone" (remoto deletado, local órfão)
git branch -vv | grep ': gone]'

# Deletar todos os locais órfãos
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
`}),e.jsx("h2",{children:"URL aliases — atalhos com insteadOf"}),e.jsx(o,{title:"Reescrever URLs",language:"bash",code:`# Encurtar GitHub via apelido
git config --global url."git@github.com:".insteadOf "gh:"

# Agora você pode clonar como:
git clone gh:usuario/repo.git

# Forçar SSH em vez de HTTPS para um host
git config --global url."git@github.com:".insteadOf "https://github.com/"

# Útil em ambientes corporativos com proxy
git config --global url."https://corp-proxy.com/github/".insteadOf "https://github.com/"
`}),e.jsx("h2",{children:"Repositórios espelho — bare clone"}),e.jsx(o,{title:"Backup completo",language:"bash",code:`# Clone espelho — TODAS as refs (branches, tags, notes, refs/remotes)
git clone --mirror git@github.com:user/repo.git

# Atualizar o espelho
cd repo.git
git remote update --prune

# Push espelho para outro lugar (migração de servidor)
git remote set-url origin git@gitlab.com:user/repo.git
git push --mirror
`}),e.jsx("h2",{children:"Anatomia: o que está em .git/config"}),e.jsx(o,{title:"Configuração de remotes",language:"ini",code:`[remote "origin"]
	url = git@github.com:usuario/repo.git
	fetch = +refs/heads/*:refs/remotes/origin/*

[remote "upstream"]
	url = https://github.com/original/repo.git
	fetch = +refs/heads/*:refs/remotes/upstream/*

[branch "main"]
	remote = origin
	merge = refs/heads/main
	rebase = true

# Você pode editar manualmente:
git config --edit
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos de remote",language:"bash",code:`git remote -v                              # listar com URLs
git remote add <nome> <url>                # adicionar
git remote rename <antigo> <novo>          # renomear
git remote remove <nome>                   # remover
git remote set-url <nome> <nova-url>       # mudar URL
git remote show <nome>                     # detalhes
git remote prune <nome>                    # limpar órfãos

git fetch --all                            # fetch de todos os remotes
git push -u origin <branch>                # push + upstream
git branch -vv                             # ver tracking branches
git config --global push.autoSetupRemote true  # auto-upstream
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{href:"/clone",children:"Clone"})," — variantes e flags importantes"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/push",children:"Push e Pull"})," — operações de sincronização"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/fetch",children:"Fetch"})," — entenda a diferença vs pull"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/forks",children:"Forks"})," — workflow de contribuição open source"]})]})]})}export{n as default};
