import{j as e,L as s}from"./index-By_zGcNR.js";import{P as a,A as o,C as i}from"./AlertBox-CZTB6a28.js";function l(){return e.jsxs(a,{title:"Git LFS",subtitle:"Para arquivos grandes (vídeos, PSDs, modelos 3D, datasets). Mantém o repo Git pequeno e rápido.",difficulty:"avancado",timeToRead:"12 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Git LFS"})," "," — "," ","Large File Storage — versiona binários grandes via ponteiros."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git lfs install"})," "," — "," ","registra hooks; rode 1x por máquina."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"track"})," "," — "," ",'git lfs track "*.psd" registra padrão; gera .gitattributes.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Custos"})," "," — "," ","GitHub cobra storage + bandwidth acima da cota."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Migração"})," "," — "," ",'git lfs migrate import --include="*.zip" reescreve histórico.']})]}),e.jsxs("p",{children:["Git foi projetado para ",e.jsx("strong",{children:"texto"}),". Coloque um vídeo de 200MB no histórico e seu repositório engasga: clones lentos, branches travadas, push pesado. ",e.jsx("strong",{children:"Git LFS"})," (Large File Storage) resolve isso substituindo arquivos grandes por ",e.jsx("em",{children:"ponteiros"})," no Git, e armazenando o conteúdo real em um servidor separado."]}),e.jsxs(o,{type:"warning",title:"Antes de usar LFS",children:["Pergunte: ",e.jsx("strong",{children:"esses arquivos precisam ser versionados?"})," Builds e dependências (",e.jsx("code",{children:"dist/"}),", ",e.jsx("code",{children:"node_modules/"}),") deveriam estar no ",e.jsx("code",{children:".gitignore"}),", não no LFS. LFS é para arquivos que mudam com o tempo e fazem parte da fonte (PSDs, modelos, vídeos master)."]}),e.jsx("h2",{children:"Como funciona"}),e.jsx(i,{title:"Antes vs depois",language:"markdown",code:`SEM LFS:
  meu-repo/.git/objects/   ← contém logo.psd (250MB)
  meu-repo/logo.psd        ← arquivo de 250MB
  Clone: 250MB. Cada commit que toca .psd: + 250MB no histórico.

COM LFS:
  meu-repo/.git/objects/   ← contém só o "ponteiro" (134 bytes)
  meu-repo/logo.psd        ← arquivo real (250MB), baixado via filtro
  servidor LFS:            ← guarda os 250MB de fato
  Clone: ~200KB de Git + LFS sob demanda.

O ponteiro:
  version https://git-lfs.github.com/spec/v1
  oid sha256:abcdef...123
  size 262144000
`}),e.jsx("h2",{children:"Instalação"}),e.jsx(i,{title:"git-lfs",language:"bash",code:`# Linux
sudo apt install git-lfs       # Debian/Ubuntu
sudo dnf install git-lfs       # Fedora
sudo pacman -S git-lfs         # Arch

# macOS
brew install git-lfs

# Windows
winget install GitHub.GitLFS

# Configurar (★ uma vez por usuário)
git lfs install
# Atualiza ~/.gitconfig com filtros e hooks

# Verificar
git lfs version
`}),e.jsx("h2",{children:"Configurando em um repositório"}),e.jsx(i,{title:"Por extensão",language:"bash",code:`# Em um repo existente, marcar tipos de arquivo para LFS
cd meu-projeto

git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "*.iso"
git lfs track "design/**/*.fig"      # com glob

# Cria/atualiza .gitattributes:
# *.psd filter=lfs diff=lfs merge=lfs -text
# *.mp4 filter=lfs diff=lfs merge=lfs -text

# IMPORTANTE: comite o .gitattributes!
git add .gitattributes
git commit -m "chore: configura git-lfs"

# Agora qualquer arquivo .psd novo vai automaticamente para LFS
git add design/logo.psd
git commit -m "feat: novo logo"
git push       # primeiro push pode demorar (sobe para servidor LFS)
`}),e.jsx(i,{title:"Por tamanho (não tipo)",language:"bash",code:`# LFS não tem regra direta por tamanho, mas você pode usar pre-commit hook:
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/sh
size_limit=10485760    # 10MB
git diff --cached --name-only | while read f; do
  if [ -f "$f" ] && [ "$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")" -gt "$size_limit" ]; then
    if ! git check-attr filter "$f" | grep -q lfs; then
      echo "❌ $f > 10MB e não está no LFS"
      echo "Adicione: git lfs track \\"$(basename $f)\\""
      exit 1
    fi
  fi
done
EOF
chmod +x .git/hooks/pre-commit
`}),e.jsx("h2",{children:"Listando o que está no LFS"}),e.jsx(i,{title:"Inspecionando",language:"bash",code:`# Ver padrões trackados
git lfs track

# Listar arquivos que estão como LFS no working
git lfs ls-files

# Status detalhado (quais foram baixados, locks, etc.)
git lfs status

# Tamanho ocupado pelo LFS (cache local)
du -sh .git/lfs/

# Listar locks (se você usa lock)
git lfs locks
`}),e.jsx("h2",{children:"Clonando repos com LFS"}),e.jsx(i,{title:"Clone normal",language:"bash",code:`# Se você tem git-lfs instalado, ele baixa automaticamente
git clone https://github.com/user/repo.git

# Clone SEM baixar binários LFS (só ponteiros) — útil para CI
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git
cd repo

# Depois, baixar só o que você precisa
git lfs pull --include "design/*"
git lfs pull --exclude "old/*"
git lfs fetch --all       # baixar TODOS, inclusive de outras branches
`}),e.jsx("h2",{children:"Operações comuns"}),e.jsx(i,{title:"Pull, fetch, push",language:"bash",code:`# git pull já baixa LFS automaticamente
git pull

# Forçar download/atualização de LFS
git lfs pull
git lfs fetch
git lfs checkout              # restaura arquivos do cache LFS local

# Forçar push de LFS (se git push não estiver enviando)
git lfs push --all origin

# Limpar cache LFS antigo (libera disco)
git lfs prune
`}),e.jsx("h2",{children:"Migrando arquivos JÁ commitados para LFS"}),e.jsx(i,{title:"git lfs migrate",language:"bash",code:`# Migrar tudo do tipo .psd no histórico para LFS
git lfs migrate import --include="*.psd" --everything

# Migrar arquivos > 10MB
git lfs migrate import --above=10MB --everything

# Migrar SÓ no branch atual
git lfs migrate import --include="*.psd"

# IMPORTANTE: isso reescreve o histórico!
# Force push e avise o time:
git push --force --all
git push --force --tags

# Reverter (mover de LFS de volta para Git)
git lfs migrate export --include="*.psd" --everything
`}),e.jsxs(o,{type:"danger",title:"Migrate reescreve hashes",children:[e.jsx("code",{children:"git lfs migrate import"})," muda os hashes de TODOS os commits afetados. Coordene com o time, faça force push, e todos precisam reclonar."]}),e.jsx("h2",{children:"File locking — para arquivos não-mergeable"}),e.jsx(i,{title:"Lock de PSDs e modelos",language:"bash",code:`# Marcar tipo como "lockable" no .gitattributes
echo "*.psd lockable" >> .gitattributes

# Antes de editar, faça lock
git lfs lock design/logo.psd
# Locked design/logo.psd

# O servidor agora bloqueia push de outros nesse arquivo

# Listar locks ativos
git lfs locks

# Liberar após terminar
git lfs unlock design/logo.psd

# Force unlock (admin)
git lfs unlock --force design/logo.psd

# Útil para times de design onde merge de binários é impossível
`}),e.jsx("h2",{children:"Limites e custos"}),e.jsx(i,{title:"Quotas comuns",language:"markdown",code:`GitHub (gratuito)
  - 1GB de armazenamento
  - 1GB/mês de banda
  - Acima disso: $5/mês para 50GB extras de cada

GitLab (gratuito)
  - 10GB de armazenamento
  - Sem limite de banda em grupos públicos

Bitbucket (gratuito)
  - 1GB de armazenamento
  - 1GB/mês de banda

Self-hosted (Gitea, GitLab, Gogs, gitolite)
  - Limites são os do seu disco / banda
`}),e.jsx("h2",{children:"Alternativas a Git LFS"}),e.jsx(i,{title:"Outras opções",language:"markdown",code:`git-annex             — Mais antigo, suporta múltiplos backends (S3, Dropbox, ...)
DVC (Data Version Control) — Para datasets ML (mantém só metadata no Git)
Git Fat               — Simples, esquemas customizados
Mercurial largefiles  — Se você usar hg em vez de Git
Cloud storage         — Apenas referencie URLs (S3, GCS, R2) e baixe via script

Quando NÃO usar LFS:
  ✗ Builds (.gitignore + CI gera)
  ✗ node_modules/ (.gitignore + lockfile)
  ✗ Datasets gigantes para ML (use DVC)
  ✗ Binários de release (use GitHub Releases)
`}),e.jsx("h2",{children:"Removendo LFS"}),e.jsx(i,{title:"Desfazendo",language:"bash",code:`# Remover do tracking (futuros arquivos não vão pro LFS)
git lfs untrack "*.psd"
git add .gitattributes
git commit -m "chore: remove .psd do LFS"

# Mover de volta para Git regular (cuidado: arquivos voltam pro repo)
git lfs migrate export --include="*.psd" --everything
git push --force --all

# Desinstalar git-lfs deste repo
git lfs uninstall

# Globalmente
git lfs uninstall --skip-repo
`}),e.jsx("h2",{children:"Workflow recomendado"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Decida cedo"}),". Adicionar LFS depois exige reescrever histórico."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Documente em README"})," que o repo usa LFS (clones falham silenciosamente sem o cliente)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Separe assets em pastas claras"})," (",e.jsx("code",{children:"design/"}),", ",e.jsx("code",{children:"media/"}),") para incluir/excluir facilmente."]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["Use ",e.jsx("code",{children:"GIT_LFS_SKIP_SMUDGE=1"})]})," em CI que não precisa dos binários."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Audite tamanho do LFS"})," regularmente: ",e.jsx("code",{children:"git lfs ls-files --size"}),"."]})]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(i,{title:"Comandos LFS",language:"bash",code:`# Setup
git lfs install                      # uma vez por máquina
git lfs track "*.psd"                # marcar tipo
git add .gitattributes               # SEMPRE comite

# Inspeção
git lfs ls-files                     # arquivos no LFS
git lfs status                       # status
git lfs track                        # padrões trackados

# Operações
git lfs pull                         # baixar binários
git lfs push --all origin            # forçar push
git lfs fetch --all                  # todas as branches
git lfs prune                        # limpar cache

# Migração
git lfs migrate import --include="*.psd" --everything
git lfs migrate export --include="*.psd"

# Locks
git lfs lock arquivo.psd
git lfs unlock arquivo.psd
git lfs locks

# Performance
GIT_LFS_SKIP_SMUDGE=1 git clone <url>    # clone sem binários
git lfs pull --include "design/*"        # baixa seletivo
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/gitignore",children:".gitignore"})," — primeiro filtro contra binários inúteis"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/clone",children:"Clone"})," — opções para repos grandes"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/manutencao",children:"Manutenção"})," — performance e gc"]})]})]})}export{l as default};
