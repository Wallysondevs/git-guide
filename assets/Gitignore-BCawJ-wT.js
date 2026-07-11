import{j as e,L as s}from"./index-By_zGcNR.js";import{P as r,A as i,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(r,{title:".gitignore",subtitle:"Bloqueie arquivos do tracking — segredos, builds, caches e logs. A diferença entre um repo limpo e um lixão.",difficulty:"iniciante",timeToRead:"10 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:".gitignore"})," "," — "," ","padrões de arquivos que o Git ignora."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Globs"})," "," — "," ","*, **, !negação, /raiz, dir/."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Local vs global"})," "," — "," ","~/.gitignore_global para padrões pessoais (DS_Store)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"gitignore.io"})," "," — "," ","gerador online por linguagem/IDE."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Já rastreado?"})," "," — "," ","git rm --cached arquivo, depois adicione ao .gitignore."]})]}),e.jsxs("p",{children:["O ",e.jsx("code",{children:".gitignore"}),' é um arquivo de texto que diz ao Git "esses arquivos eu nem quero ver". Ele protege você de commitar acidentalmente segredos, dependências (',e.jsx("code",{children:"node_modules"}),", ",e.jsx("code",{children:"venv"}),") ou artefatos de build — coisas que poluem o repo e causam conflitos."]}),e.jsxs(i,{type:"warning",title:"Configure ANTES do primeiro commit",children:["Se você commitou algo errado e depois adicionou ao ",e.jsx("code",{children:".gitignore"}),', o arquivo continua no histórico. Veja a seção "Removendo arquivos já commitados".']}),e.jsx("h2",{children:"Sintaxe básica"}),e.jsx(o,{title:".gitignore — padrões",language:"bash",code:`# Comentário começa com #

# Arquivo específico
config.local.json

# Todos os arquivos com extensão
*.log
*.tmp

# Pasta inteira (e tudo dentro)
node_modules/
dist/
build/

# Arquivo só na raiz (com / inicial)
/secret.env

# Arquivo em qualquer lugar (sem / inicial)
.DS_Store
Thumbs.db

# Subpastas específicas
src/**/temp/
docs/**/*.draft.md

# Arquivos numa pasta específica
logs/*.log
!logs/.gitkeep         ← exceção: este SIM é trackeado

# Negação (descomenta exclusão anterior)
*.log
!important.log         ← este sim, mesmo casando *.log

# Coringas
[Tt]humbs.db          ← T ou t
config.??.json        ← config.en.json, config.pt.json
docs/[!._]*           ← qualquer coisa que NÃO comece com . ou _
`}),e.jsx("h2",{children:"Templates por linguagem"}),e.jsxs("p",{children:["O GitHub mantém uma coleção oficial em ",e.jsx("a",{href:"https://github.com/github/gitignore",target:"_blank",rel:"noopener noreferrer",children:"github/gitignore"}),". Use como ponto de partida."]}),e.jsx(o,{title:"Node.js",language:"bash",code:`# Dependências
node_modules/
.pnp/
.pnp.js

# Builds
dist/
build/
out/
.next/
.nuxt/
.cache/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
pnpm-debug.log*

# Testes
coverage/
.nyc_output/

# Editores
.vscode/
.idea/
*.swp
.DS_Store

# Env
.env
.env.local
.env.*.local
!.env.example
`}),e.jsx(o,{title:"Python",language:"bash",code:`# Bytecode
__pycache__/
*.py[cod]
*$py.class

# Distribuição
*.egg-info/
dist/
build/
*.egg

# Venv
venv/
env/
.venv/
ENV/
.python-version

# Testes
.pytest_cache/
.coverage
htmlcov/
.tox/

# Jupyter
.ipynb_checkpoints/

# Editores
.vscode/
.idea/
*.swp
`}),e.jsx(o,{title:"Genérico — todo projeto",language:"bash",code:`# OS
.DS_Store
Thumbs.db
desktop.ini
.Trashes

# Editores
.vscode/
.idea/
*.swp
*.swo
*~
.netrwhist

# Secrets — NUNCA commitar
.env
.env.local
*.pem
*.key
secrets/
credentials.json

# Backup
*.bak
*.backup
`}),e.jsx("h2",{children:"Hierarquia de .gitignore"}),e.jsxs("p",{children:["Você pode ter ",e.jsx("code",{children:".gitignore"})," em ",e.jsx("strong",{children:"qualquer"})," pasta do projeto — eles são aplicados cumulativamente."]}),e.jsx(o,{title:"Estrutura típica",language:"markdown",code:`projeto/
├── .gitignore                 ← raiz: regras do projeto inteiro
├── src/
│   └── .gitignore             ← regras específicas de src/
├── docs/
│   └── .gitignore             ← regras específicas de docs/
└── tests/
    └── fixtures/
        └── .gitignore         ← regras locais
`}),e.jsx("h2",{children:"gitignore global — para todas as máquinas"}),e.jsx(o,{title:"Configuração de usuário",language:"bash",code:`# Crie ~/.gitignore_global com regras pessoais
cat > ~/.gitignore_global <<'EOF'
# Editores que SÓ EU uso (outros podem usar outros)
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Backups pessoais
*~
.swp
.cursor/
EOF

# Configure o Git para usá-lo
git config --global core.excludesFile ~/.gitignore_global
`}),e.jsxs(i,{type:"note",title:"Por que gitignore global",children:["Coisas como ",e.jsx("code",{children:".DS_Store"})," ou ",e.jsx("code",{children:".idea/"})," são ",e.jsx("strong",{children:"do seu setup"}),", não do projeto. Não force seu time a mantê-las no ",e.jsx("code",{children:".gitignore"})," dele — bote no global."]}),e.jsx("h2",{children:"Ignore local — só nesta cópia"}),e.jsx(o,{title:".git/info/exclude",language:"bash",code:`# Não-versionado, válido só para SEU clone
echo "experiment.local.js" >> .git/info/exclude

# Útil para arquivos temporários que você não quer commitar
# nem botar no .gitignore (porque é específico da sua máquina)
`}),e.jsx("h2",{children:"Removendo arquivos já commitados"}),e.jsx(o,{title:"Quando o estrago já foi feito",language:"bash",code:`# Cenário: você commitou node_modules/ por engano
# Adicionar ao .gitignore agora NÃO remove o que já está rastreado

# 1. Adicione ao .gitignore
echo "node_modules/" >> .gitignore

# 2. Remova do tracking (mas mantém no disco!)
git rm -r --cached node_modules/

# 3. Confirme
git status
# deleted: node_modules/...

# 4. Commite
git add .gitignore
git commit -m "chore: ignora node_modules"
git push

# Para arquivo único:
git rm --cached config.local.json
echo "config.local.json" >> .gitignore
git commit -am "chore: ignora config local"
`}),e.jsx("h2",{children:"Removendo do HISTÓRICO completo"}),e.jsxs("p",{children:["Se você commitou um ",e.jsx("strong",{children:"segredo"})," (API key, senha), removê-lo do tracking não basta — ele ainda está em commits antigos. Para limpar de verdade, use ",e.jsx("code",{children:"git filter-repo"}),"."]}),e.jsx(o,{title:"git filter-repo (★ moderno, substitui filter-branch)",language:"bash",code:`# Instalar
brew install git-filter-repo
pip install git-filter-repo

# Remover arquivo de TODO o histórico
git filter-repo --invert-paths --path config/secrets.json

# Remover por padrão
git filter-repo --invert-paths --path-glob '*.pem'

# Remover linha contendo certo texto
git filter-repo --replace-text <(echo 'API_KEY=sk-abc===>REMOVED')

# IMPORTANTE: isso reescreve TODO o histórico
# Force push e avise o time:
git push --force --all
git push --force --tags
`}),e.jsxs(i,{type:"danger",title:"Segredo vazado: ROTACIONE",children:["Mesmo após limpar do histórico, considere o segredo ",e.jsx("strong",{children:"comprometido"}),". Ele já passou pelos clones de outras pessoas, CIs, backups. ",e.jsx("strong",{children:"Sempre"})," revogue/rotacione a chave/senha imediatamente."]}),e.jsx("h2",{children:"Verificando se um arquivo está ignorado"}),e.jsx(o,{title:"git check-ignore",language:"bash",code:`# É ignorado?
git check-ignore -v node_modules/express/package.json
# .gitignore:1:node_modules/   node_modules/express/package.json

# Listar arquivos ignorados que existem no working
git ls-files --others --ignored --exclude-standard

# Listar arquivos NÃO trackeados (incluindo os ignorados)
git status --ignored
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Manter pasta vazia no Git"}),e.jsx(o,{title:".gitkeep convention",language:"bash",code:`# Git não rastreia pastas vazias. Convenção:
mkdir logs
touch logs/.gitkeep

# E no .gitignore:
logs/*
!logs/.gitkeep
# (ignora tudo dentro de logs/, exceto .gitkeep)
`}),e.jsx("h3",{children:"2. Forçar tracking de um arquivo ignorado"}),e.jsx(o,{title:"-f",language:"bash",code:`# Se .env está no .gitignore mas você quer commitar UMA versão exemplo:
git add -f .env.example
`}),e.jsx("h3",{children:"3. Ignorar mudanças LOCAIS em arquivo já trackeado"}),e.jsx(o,{title:"assume-unchanged e skip-worktree",language:"bash",code:`# Cenário: config.json é trackeado mas você modifica localmente
# (não quer commitar suas mudanças nem que apareça no status)

# Opção A — assume-unchanged (Git PODE atualizar do remoto)
git update-index --assume-unchanged config.json
# Reverter:
git update-index --no-assume-unchanged config.json

# Opção B — skip-worktree (Git PROTEGE de qualquer atualização)
git update-index --skip-worktree config.json
# Reverter:
git update-index --no-skip-worktree config.json

# Listar arquivos com essas flags
git ls-files -v | grep "^[hsS]"
`}),e.jsxs(i,{type:"warning",title:"assume-unchanged é gambiarra",children:["Esses comandos são ",e.jsx("strong",{children:"workarounds"}),", não solução real. A solução correta para configs locais é commitar um ",e.jsx("code",{children:"config.example.json"})," e ignorar ",e.jsx("code",{children:"config.local.json"}),"."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:".gitignore na prática",language:"bash",code:`# Sintaxe
*.log              # arquivos por extensão
node_modules/      # pasta
/secret            # só na raiz
**/temp/           # qualquer profundidade
!important.log     # exceção

# Comandos
git check-ignore -v <arquivo>          # checar regra
git ls-files --ignored --exclude-std   # listar ignorados
git rm -r --cached <pasta>             # destrackear
git status --ignored                   # ver tudo

# Configs
git config --global core.excludesFile ~/.gitignore_global
.git/info/exclude                       # ignore local

# Histórico (segredo vazado)
git filter-repo --invert-paths --path X
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/configuracao",children:"Configurações do Git"})," — gitignore global e mais"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/lfs",children:"Git LFS"})," — alternativa para arquivos grandes (em vez de ignorar)"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/recuperacao",children:"Recuperação"})," — se commitou segredo"]})]})]})}export{n as default};
