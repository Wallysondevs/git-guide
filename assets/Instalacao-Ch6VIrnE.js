import{j as e,L as o}from"./index-By_zGcNR.js";import{P as s,A as a,C as i}from"./AlertBox-CZTB6a28.js";function r(){return e.jsxs(s,{title:"Instalação e Setup",subtitle:"Instale o Git em qualquer sistema e faça a configuração inicial que você só faz uma vez na vida.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Linux"})," "," — "," ","apt install git / dnf install git / pacman -S git."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"macOS"})," "," — "," ","brew install git ou xcode-select --install."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Windows"})," "," — "," ","Git for Windows traz git, bash e SSH."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git --version"})," "," — "," ","confirma instalação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Configuração inicial"})," "," — "," ","git config --global user.name + user.email."]})]}),e.jsx("p",{children:"Em 5 minutos você terá o Git instalado, identidade configurada e pronto para clonar ou criar repositórios. Esta configuração inicial é a base de tudo — vale a pena fazer com calma."}),e.jsxs(a,{type:"tip",title:"Versão recomendada",children:["Use sempre a versão mais recente do Git (≥ 2.40). Versões antigas têm comportamento diferente para ",e.jsx("code",{children:"git pull"}),", branches padrão e segurança."]}),e.jsx("h2",{children:"Linux"}),e.jsx(i,{title:"Instalação por distro",language:"bash",code:`# Debian / Ubuntu / Mint
sudo apt update && sudo apt install -y git

# Fedora / RHEL / Rocky
sudo dnf install -y git

# Arch / Manjaro / EndeavourOS
sudo pacman -S --needed git

# openSUSE
sudo zypper install git

# Verificar instalação
git --version
# git version 2.46.0
`}),e.jsx("h2",{children:"macOS"}),e.jsx(i,{title:"Três caminhos no Mac",language:"bash",code:`# Opção 1 — Xcode Command Line Tools (mais simples)
xcode-select --install

# Opção 2 — Homebrew (recomendado, sempre atualizado)
brew install git

# Opção 3 — instalador oficial
# https://git-scm.com/download/mac

git --version
`}),e.jsx("h2",{children:"Windows"}),e.jsx(i,{title:"Três caminhos no Windows",language:"bash",code:`# Opção 1 — instalador oficial Git for Windows (inclui Git Bash)
# https://git-scm.com/download/win

# Opção 2 — winget (Windows 11 / 10 com App Installer)
winget install --id Git.Git -e --source winget

# Opção 3 — Scoop / Chocolatey
scoop install git
choco install git

git --version
`}),e.jsxs(a,{type:"note",title:"Git Bash no Windows",children:["O instalador oficial do Windows inclui o ",e.jsx("strong",{children:"Git Bash"})," — um terminal estilo Unix que é muito mais agradável que o CMD ou PowerShell para usar Git. Recomendado."]}),e.jsx("h2",{children:"Configuração inicial obrigatória"}),e.jsx("p",{children:"Toda instalação nova precisa destas 3 configurações antes do primeiro commit:"}),e.jsx(i,{title:"Identidade — quem é você",language:"bash",code:`# Nome e email aparecem em CADA commit que você fizer
git config --global user.name "Seu Nome Completo"
git config --global user.email "voce@exemplo.com"

# Se você usa GitHub e quer privacidade, use o email noreply do GitHub:
# git config --global user.email "12345+seu-user@users.noreply.github.com"
`}),e.jsx(i,{title:"Branch padrão e editor",language:"bash",code:`# Nome do branch inicial em novos repositórios (padrão moderno: main)
git config --global init.defaultBranch main

# Editor para mensagens de commit, rebase interativo, etc.
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "nvim"          # Neovim
git config --global core.editor "nano"          # Nano (mais simples)

# Quebra de linha (importante em equipes mistas Win/Linux/Mac)
git config --global core.autocrlf input    # Linux/macOS
git config --global core.autocrlf true     # Windows
`}),e.jsx(i,{title:"Comportamento do pull e merge",language:"bash",code:`# Sem isso, git pull dá warning toda vez (a partir do Git 2.27)
git config --global pull.rebase false      # merge (padrão seguro)
# OU
git config --global pull.rebase true       # rebase (histórico linear)

# Push só do branch atual — evita push acidental de tudo
git config --global push.default simple
git config --global push.autoSetupRemote true   # cria upstream automático
`}),e.jsx("h2",{children:"Verificando sua configuração"}),e.jsx(i,{title:"Inspecionar configs",language:"bash",code:`# Listar todas as configs ativas (e em qual arquivo estão)
git config --list --show-origin

# Ver uma config específica
git config user.email
git config --get user.name

# Editar manualmente o arquivo global (~/.gitconfig)
git config --global --edit
`}),e.jsx("h2",{children:"Configurações úteis (opcionais mas recomendadas)"}),e.jsx(i,{title:"Quality of life",language:"bash",code:`# Cores no terminal
git config --global color.ui auto

# Mostrar status enxuto e útil
git config --global status.short true
git config --global status.branch true

# Diff melhor (com palavras em vez de linhas inteiras)
git config --global diff.algorithm histogram

# Auto-corrige typos (espera 1.5s antes de aceitar)
git config --global help.autocorrect 15

# Reusar resoluções de conflito (mágica para rebases longos)
git config --global rerere.enabled true

# Pruna refs deletados ao fazer fetch
git config --global fetch.prune true
`}),e.jsx("h2",{children:"Configuração SSH (recomendado para GitHub/GitLab)"}),e.jsx(i,{title:"Gerar chave SSH ed25519",language:"bash",code:`# Gerar par de chaves (mais seguro e rápido que RSA)
ssh-keygen -t ed25519 -C "voce@exemplo.com"
# Aperte Enter para localização padrão (~/.ssh/id_ed25519)
# Defina uma senha (opcional mas recomendado)

# Iniciar agente SSH e adicionar a chave
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar chave pública para colar no GitHub/GitLab
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAC3Nz... voce@exemplo.com

# Testar conexão com GitHub
ssh -T git@github.com
# Hi seu-usuario! You've successfully authenticated...
`}),e.jsxs(a,{type:"warning",title:"HTTPS vs SSH",children:["Se você usar HTTPS, vai digitar usuário/token a cada push. Com SSH, autentica uma vez e esquece. Para máquinas pessoais, prefira ",e.jsx("strong",{children:"SSH"}),". Para CI/servidores, use tokens HTTPS."]}),e.jsx("h2",{children:"Cheat-sheet de configuração inicial"}),e.jsx(i,{title:"Copy-paste para máquina nova",language:"bash",code:`git config --global user.name "Seu Nome"
git config --global user.email "voce@exemplo.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global push.autoSetupRemote true
git config --global core.editor "nano"
git config --global color.ui auto
git config --global rerere.enabled true
git config --global fetch.prune true

ssh-keygen -t ed25519 -C "voce@exemplo.com"
cat ~/.ssh/id_ed25519.pub   # cole no GitHub Settings → SSH Keys
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/primeiros-passos",children:"Primeiros Passos"})," — crie seu primeiro repositório agora"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/configuracao",children:"Configurações Avançadas"})," — aliases, includes condicionais e mais"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/signing",children:"Assinatura GPG/SSH"})," — verifique seus commits no GitHub"]})]})]})}export{r as default};
