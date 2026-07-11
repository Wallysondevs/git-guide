import{j as e,L as a}from"./index-By_zGcNR.js";import{P as s,A as i,C as o}from"./AlertBox-CZTB6a28.js";function d(){return e.jsxs(s,{title:"Staging Area",subtitle:"O conceito mais característico do Git e por que ele te dá superpoderes que nenhum outro VCS oferece.",difficulty:"iniciante",timeToRead:"11 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Staging area / index"})," "," — "," ","snapshot proposto para o próximo commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git add"})," "," — "," ","move arquivo do working para staging."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git add -p"})," "," — "," ","interativo: escolhe hunks específicos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git restore --staged"})," "," — "," ","desfaz add (reverso)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git diff vs --staged"})," "," — "," ","mostra mudanças no working vs staging."]})]}),e.jsxs("p",{children:["A ",e.jsx("strong",{children:"staging area"})," (também chamada ",e.jsx("em",{children:"index"}),") é o que separa o Git de quase todos os outros sistemas de controle de versão. Ela é uma área intermediária entre seus arquivos editados e o histórico permanente — um ",e.jsx("strong",{children:"rascunho do próximo commit"}),"."]}),e.jsxs(i,{type:"tip",title:"Por que isso importa",children:['Sem staging, todo commit seria "tudo o que mudou desde o último". Com staging, você compõe commits com cirurgia: ',e.jsx("strong",{children:"esta linha sim, aquela não, este arquivo agora, o resto depois"}),"."]}),e.jsx("h2",{children:"O modelo dos 3 estados"}),e.jsx(o,{title:"A jornada de um arquivo",language:"markdown",code:`     [ Working Directory ]    ← você edita aqui
              ↓ git add
     [   Staging Area    ]    ← rascunho do próximo commit
              ↓ git commit
     [   Repositório      ]    ← histórico permanente (.git/objects)

Para voltar:
- git restore <arquivo>             → working ← staging (descarta edição)
- git restore --staged <arquivo>    → staging ← working (unstage)
- git checkout <hash> -- <arquivo>  → working ← repositório
`}),e.jsx("h2",{children:"Adicionando ao stage"}),e.jsx(o,{title:"git add — variações",language:"bash",code:`# Arquivo específico
git add src/auth.ts

# Múltiplos arquivos
git add src/auth.ts src/login.ts

# Todos os arquivos modificados E novos da pasta atual
git add .

# Todos os tracked modificados (NÃO inclui novos)
git add -u
git add --update

# Tudo do projeto inteiro (de qualquer subpasta)
git add -A
git add --all

# Por padrão de glob
git add "src/**/*.ts"
git add "*.md"
`}),e.jsx("h2",{children:"O modo interativo — o superpoder"}),e.jsxs("p",{children:["O modo ",e.jsx("code",{children:"-p"}),' (patch) divide cada arquivo em "hunks" e te pergunta um por um o que adicionar. ',e.jsx("strong",{children:"Mude sua vida com isso."})]}),e.jsx(o,{title:"git add -p",language:"bash",code:`git add -p src/auth.ts
# diff --git a/src/auth.ts b/src/auth.ts
# @@ -10,3 +10,5 @@
#  function login(user) {
# +  console.log('debug', user)   ← não quero este
#    return verify(user)
# +  // TODO: rate limit          ← este sim
#  }
# Stage this hunk [y,n,q,a,d,s,e,?]?
#
# y = sim
# n = não
# q = sair
# a = sim para este e todos os próximos do arquivo
# d = não para este e todos os próximos do arquivo
# s = SPLIT em hunks menores ★
# e = EDIT manualmente (escolhe linha por linha) ★
# ? = ajuda
`}),e.jsxs(i,{type:"note",title:"Split e Edit são ouro",children:["Quando o hunk é grande demais, aperte ",e.jsx("code",{children:"s"})," para dividi-lo. Quando ainda assim ficar misturado, ",e.jsx("code",{children:"e"})," abre seu editor para escolher LINHA POR LINHA o que stage."]}),e.jsx("h2",{children:"Removendo do stage (unstage)"}),e.jsx(o,{title:"git restore --staged",language:"bash",code:`# Tirar um arquivo do stage (mantém edições no working)
git restore --staged src/auth.ts

# Tirar tudo
git restore --staged .

# Forma antiga (ainda funciona em scripts/CI)
git reset HEAD src/auth.ts

# Tirar do stage interativamente
git reset -p
`}),e.jsx("h2",{children:"Vendo o que está staged"}),e.jsx(o,{title:"Inspecionando o índice",language:"bash",code:`# Diff do que está no stage vs último commit
git diff --staged
git diff --cached       # mesmo comando

# Lista os arquivos que estão no stage
git diff --staged --name-only

# Estatísticas do que vai no próximo commit
git diff --staged --stat

# Mostra o conteúdo exato de um arquivo no índice
git show :src/auth.ts
`}),e.jsx("h2",{children:"Casos práticos do dia a dia"}),e.jsx("h3",{children:"Cenário 1: misturei 2 features no mesmo arquivo"}),e.jsx(o,{title:"Separando em 2 commits",language:"bash",code:`# Você editou login.ts com bugfix + nova feature, sem querer
git add -p login.ts
# Aceite só os hunks do bugfix (y/n hunk a hunk)
git commit -m "fix: corrige timeout no login"

# Agora os hunks restantes (a feature) ainda estão no working
git add login.ts
git commit -m "feat: adiciona MFA opcional"
`}),e.jsx("h3",{children:"Cenário 2: descartar mudanças não commitadas"}),e.jsx(o,{title:"git restore",language:"bash",code:`# Descartar edições de um arquivo (volta ao último commit)
git restore src/auth.ts

# Descartar TUDO no working directory
git restore .

# Restaurar um arquivo de outro commit
git restore --source=HEAD~3 src/legado.ts

# Restaurar tanto staging quanto working
git restore --staged --worktree src/auth.ts
`}),e.jsxs(i,{type:"danger",title:"git restore é destrutivo",children:[e.jsx("code",{children:"git restore arquivo"})," apaga edições ",e.jsx("strong",{children:"sem confirmação e sem volta"})," (não vai pro reflog). Tenha certeza antes de usar. Em caso de dúvida, prefira ",e.jsx("code",{children:"git stash"}),"."]}),e.jsx("h3",{children:"Cenário 3: arquivos novos que ainda não quero rastrear"}),e.jsx(o,{title:"Untracked vs ignored",language:"bash",code:`# Adicione ao .gitignore para o Git parar de avisar
echo "config.local.json" >> .gitignore
git add .gitignore
git commit -m "chore: ignora config local"

# Para um arquivo já trackeado: pare de rastrear sem apagar
git rm --cached config.json
echo "config.json" >> .gitignore
git commit -m "chore: remove config do tracking"
`}),e.jsx("h3",{children:"Cenário 4: um arquivo enorme demais — quero excluir do commit que estou prestes a fazer"}),e.jsx(o,{title:"Excluindo padrões do add",language:"bash",code:`# Adicionar tudo EXCETO certos arquivos
git add . ':!*.log' ':!dist/'

# Equivalente com --pathspec
git add . ':(exclude)dist/' ':(exclude,glob)*.log'
`}),e.jsx("h2",{children:"O índice por dentro"}),e.jsx(o,{title:"Inspecionando .git/index",language:"bash",code:`# Lista o conteúdo completo do índice
git ls-files --stage
# 100644 a1b2c3d... 0    src/auth.ts
# 100644 e5f6g7h... 0    src/login.ts
# (modo)  (hash)   (estágio) (caminho)

# Estágio 0 = normal
# Estágios 1, 2, 3 = conflito de merge (base, ours, theirs)

# Esvaziar completamente o índice (sem tocar working)
git rm -r --cached .

# Re-adicionar tudo (útil após mudar .gitignore)
git add .
`}),e.jsx("h2",{children:"Padrão profissional: micro-commits"}),e.jsxs("p",{children:["Use a staging area para fazer commits ",e.jsx("strong",{children:"pequenos, atômicos e bem delimitados"}),'. Cada commit deve representar UMA mudança lógica — não um "salvo do dia".']}),e.jsx(o,{title:"Bom vs ruim",language:"diff",code:`# ❌ Ruim
- "muitas coisas"
- "wip"
- "fix tudo"

# ✅ Bom
+ "feat(auth): adiciona MFA via TOTP"
+ "fix(auth): timeout aumentado para 30s"
+ "refactor(auth): extrai validação para módulo"
+ "test(auth): cobre cenário de token expirado"
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos da staging area",language:"bash",code:`git add <arquivo>           # ao stage
git add -p                  # interativo (★)
git add -A                  # tudo do projeto
git add -u                  # só tracked modificados

git restore --staged <f>    # remove do stage
git restore <f>             # descarta edição (cuidado!)

git diff                    # working vs stage
git diff --staged           # stage vs último commit
git ls-files --stage        # ver índice cru

git rm --cached <f>         # parar de rastrear sem apagar
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(a,{href:"/commits",children:"Fazendo Commits"})," — agora que você sabe stagear, escreva commits exemplares"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/stash",children:"Stash"})," — guarde mudanças sem commitar"]}),e.jsxs("li",{children:[e.jsx(a,{href:"/reset",children:"Reset e Revert"})," — desfazendo commits que já existem"]})]})]})}export{d as default};
