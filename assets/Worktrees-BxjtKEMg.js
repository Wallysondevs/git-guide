import{j as e,L as o}from"./index-By_zGcNR.js";import{P as t,A as a,C as r}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(t,{title:"Worktrees",subtitle:"Múltiplos branches checados em pastas paralelas — sem stash, sem context switch, sem dor.",difficulty:"avancado",timeToRead:"11 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git worktree add"})," "," — "," ","cria checkout adicional do mesmo repo em outra pasta."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Uso"})," "," — "," ","trabalhar em 2 branches sem stash."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"list"})," "," — "," ","git worktree list mostra todos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"remove"})," "," — "," ","git worktree remove caminho."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"prune"})," "," — "," ","git worktree prune limpa worktrees mortas."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Git worktrees"})," resolvem um problema clássico: você está no meio de uma feature, precisa olhar outra branch, mas não quer parar tudo. Em vez de ",e.jsx("code",{children:"stash + switch"}),", você abre a outra branch em ",e.jsx("em",{children:"outra pasta"}),", paralela. Como ter múltiplos clones, mas compartilhando o mesmo ",e.jsx("code",{children:".git"})," (e portanto o mesmo histórico)."]}),e.jsx(a,{type:"tip",title:"Quando vale a pena",children:"Code review de PRs sem perder seu trabalho. Build de produção em paralelo ao desenvolvimento. Trabalhar em hotfix urgente sem mexer na feature. Comparar comportamento entre versões."}),e.jsx("h2",{children:"O básico"}),e.jsx(r,{title:"Adicionando uma worktree",language:"bash",code:`# Estrutura inicial
~/projeto/                 ← worktree principal (main)
└── .git/                  ← repositório real

# Adicionar worktree para outra branch
git worktree add ../projeto-feature feature/x

# Agora:
~/projeto/                 ← main (continua aqui)
~/projeto-feature/         ← feature/x (nova worktree)
   └── .git                ← arquivo (não pasta) apontando para o real

# Ambas compartilham objetos e configs
`}),e.jsx("h2",{children:"Listando worktrees"}),e.jsx(r,{title:"git worktree list",language:"bash",code:`git worktree list
# /home/voce/projeto                a1b2c3d [main]
# /home/voce/projeto-feature        7p8q9r0 [feature/x]
# /home/voce/projeto-hotfix         5l6m7n8 [hotfix/urgente]

# Detalhado
git worktree list --verbose
`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx("h3",{children:"1. Code review sem stash"}),e.jsx(r,{title:"Workflow",language:"bash",code:`# Você está mexendo em feature/login (com mudanças não commitadas)
# Maria pede review de PR #123 (branch feature/payments)

# Opção lenta:
git stash push -u -m "wip"
git switch feature/payments
# ... testa ...
git switch feature/login
git stash pop

# Opção worktree (★ instantânea):
git worktree add ../projeto-pr123 origin/feature/payments
cd ../projeto-pr123
npm install                 # talvez precise se package.json difere
npm test
# ... testa ...
cd ../projeto              # volta ao seu trabalho intacto
git worktree remove ../projeto-pr123
`}),e.jsx("h3",{children:"2. Hotfix urgente em paralelo"}),e.jsx(r,{title:"Sem perder contexto",language:"bash",code:`# Em feature/x, no meio de algo grande
# Bug crítico em produção precisa de hotfix em main

git worktree add ../meu-repo-hotfix -b hotfix/urgente main
cd ../meu-repo-hotfix
# ... fix rápido, commit, push ...
gh pr create --fill --label hotfix
cd ../meu-repo
# Continue exatamente onde estava
`}),e.jsx("h3",{children:"3. Build longo sem bloquear"}),e.jsx(r,{title:"Build em background",language:"bash",code:`# Adicionar worktree para build de release
git worktree add ../release-build v1.5.0

# Em outro terminal, rode o build pesado lá
cd ../release-build
npm run build:production    # demora 10 min

# Enquanto isso, continue codando na worktree principal
cd ../meu-repo
`}),e.jsx("h3",{children:"4. Comparar duas versões side-by-side"}),e.jsx(r,{title:"A/B testing manual",language:"bash",code:`git worktree add ../app-v1 v1.0.0
git worktree add ../app-v2 v2.0.0

# Abra editores em ambas, compare comportamento, rode benchmarks
diff -r ../app-v1/src ../app-v2/src
`}),e.jsx("h3",{children:"5. Worktree para gh-pages (deploy)"}),e.jsx(r,{title:"Branch órfã isolada",language:"bash",code:`# Branch gh-pages tem conteúdo TOTALMENTE diferente do main
# Worktree é perfeito para gerenciá-la

git worktree add ../meu-repo-pages gh-pages
cd ../meu-repo-pages
# Aqui só tem index.html, assets do site
# Build do main é copiado para cá e committado
`}),e.jsx("h2",{children:"Removendo worktrees"}),e.jsx(r,{title:"Cleanup",language:"bash",code:`# Remover worktree (apaga a pasta também!)
git worktree remove ../projeto-feature

# Force (se houver mudanças não commitadas)
git worktree remove --force ../projeto-feature

# Remover só a referência (se a pasta já foi deletada manualmente)
git worktree prune

# Listar worktrees "perdidas" (pasta sumiu mas ref ficou)
git worktree list --porcelain
git worktree prune --dry-run
`}),e.jsx("h2",{children:"Criando worktree de novo branch"}),e.jsx(r,{title:"Atalhos",language:"bash",code:`# Worktree + branch novo a partir de main
git worktree add -b feature/nova ../projeto-nova main

# Worktree em detached HEAD (não cria branch)
git worktree add --detach ../projeto-explore HEAD

# Worktree de uma tag
git worktree add ../projeto-v1 v1.0.0

# Worktree rastreando remoto
git worktree add --track -b feature/maria ../projeto-maria origin/feature/maria
`}),e.jsx("h2",{children:"Limitações importantes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Mesma branch em duas worktrees não pode"})," — Git bloqueia para evitar caos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hooks compartilhados"})," — todas as worktrees usam ",e.jsx("code",{children:".git/hooks/"})," do principal."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cuidado com node_modules"})," — você vai ter uma pasta para cada worktree (espaço!)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git submodule"})," precisa de atenção extra (cada worktree precisa de update)."]})]}),e.jsxs(a,{type:"warning",title:"Se precisar mesma branch em 2 lugares",children:["Use ",e.jsx("code",{children:"git worktree add --force"})," para forçar (mas você assume os riscos), ou faça ",e.jsx("code",{children:"git switch --detach"})," em uma das worktrees."]}),e.jsx("h2",{children:"Configurações por worktree"}),e.jsx(r,{title:"Config independente",language:"bash",code:`# Config local geral (afeta todas as worktrees)
git config --local user.email "..."

# Config SÓ desta worktree
git config --worktree user.email "diferente@empresa.com"

# Habilitar (precisa de feature flag)
git config extensions.worktreeConfig true

# Ver onde está cada config
git config --list --show-origin
`}),e.jsx("h2",{children:"Workflow profissional"}),e.jsx(r,{title:"Setup recomendado",language:"bash",code:`# Estrutura de pastas
~/repos/projeto/              # main worktree (default)
├── .git/                     # repositório real (~ 200MB)
├── src/
└── ...

~/repos/projeto.worktrees/    # pasta para worktrees
├── pr-review/                # use e jogue fora
├── hotfix/
└── release-build/

# Função zsh/bash
worktree-pr() {
  local pr=$1
  local target="$(git rev-parse --show-toplevel).worktrees/pr-$pr"
  gh pr checkout $pr --branch "pr-$pr" --detach
  git worktree add "$target" "pr-$pr"
  cd "$target"
}
`}),e.jsx("h2",{children:"Worktrees para sparse-checkout"}),e.jsx(r,{title:"Em monorepos",language:"bash",code:`# Worktree separado com sparse-checkout diferente
git worktree add ../mono-frontend main
cd ../mono-frontend
git sparse-checkout init --cone
git sparse-checkout set apps/web

# Outra worktree, outro escopo
git worktree add ../mono-backend main
cd ../mono-backend
git sparse-checkout init --cone
git sparse-checkout set services/api

# Cada uma vê só sua parte do monorepo
`}),e.jsx("h2",{children:"Manutenção"}),e.jsx(r,{title:"Cuidados",language:"bash",code:`# Verificar integridade
git worktree list

# Reparar worktree movida manualmente
cd /novo/local/projeto-feature
git worktree repair

# Limpar refs órfãs
git worktree prune

# Desabilitar uma worktree temporariamente (lock)
git worktree lock --reason "build em andamento" ../projeto-build

# Reabilitar
git worktree unlock ../projeto-build
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(r,{title:"Comandos de worktree",language:"bash",code:`git worktree list                       # listar
git worktree add <path> <branch>        # adicionar
git worktree add -b novo <path> base    # branch nova
git worktree add --detach <path> <ref>  # detached HEAD
git worktree remove <path>              # remover
git worktree remove --force <path>      # com mudanças
git worktree prune                      # limpar órfãs
git worktree repair                     # após mover pasta
git worktree lock <path>                # proteger
git worktree unlock <path>

# Não pode mesma branch em duas worktrees (use --force ou --detach)
# Hooks são compartilhados via .git/hooks/
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/branches",children:"Branches"})," — entenda branches antes de worktrees"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/clone",children:"Clone"})," — sparse-checkout combina com worktrees"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/manutencao",children:"Manutenção"})," — para repos grandes com muitas worktrees"]})]})]})}export{n as default};
