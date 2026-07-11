import{j as e,L as s}from"./index-By_zGcNR.js";import{P as o,A as i,C as t}from"./AlertBox-CZTB6a28.js";function c(){return e.jsxs(o,{title:"Bisect",subtitle:"Busca binária no histórico para encontrar exatamente qual commit introduziu um bug — em log(N) passos.",difficulty:"avancado",timeToRead:"10 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git bisect"})," "," — "," ","busca binária para achar o commit que introduziu bug."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"bisect start/good/bad"})," "," — "," ","marca pontos conhecidos; Git escolhe o meio."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"bisect run script.sh"})," "," — "," ","automatiza testando cada commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"bisect reset"})," "," — "," ","volta ao HEAD original."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"bisect skip"})," "," — "," ","pula commit sem afetar a busca (build quebrado, etc)."]})]}),e.jsxs("p",{children:["Você sabe que algo funcionava na versão 1.0 e quebrou na 1.5. Entre elas, 500 commits. Como achar o culpado? ",e.jsx("code",{children:"git bisect"}),' faz busca binária: você marca commits como "good" ou "bad", e o Git divide o intervalo em 9 testes para identificar exatamente o commit que introduziu o bug.']}),e.jsxs(i,{type:"tip",title:"Matemática",children:["500 commits → 9 passos. 1000 commits → 10 passos. 1 milhão → 20 passos. Bisect é poderoso porque é ",e.jsx("strong",{children:"logarítmico"}),"."]}),e.jsx("h2",{children:"Workflow básico"}),e.jsx(t,{title:"git bisect manual",language:"bash",code:`# 1. Inicia o bisect
git bisect start

# 2. Marca o estado atual como bad (bug presente)
git bisect bad
git bisect bad HEAD

# 3. Marca um ponto antigo como good (bug não estava lá)
git bisect good v1.0.0
git bisect good abc1234

# Saída:
# Bisecting: 250 revisions left to test after this (roughly 9 steps)
# [7p8q9r0] commit do meio

# 4. Testa o commit que o Git checkou
npm test                    # ou rode o app, ou faça o teste manual

# 5. Se passou → "good", se falhou → "bad"
git bisect good
# OU
git bisect bad

# Repita 3-5 até o Git anunciar:
# 7p8q9r0 is the first bad commit
# Author: Maria
# Date: ...
# feat: refactor login

# 6. Encerra o bisect (volta ao estado anterior)
git bisect reset
`}),e.jsx("h2",{children:"Bisect automatizado — o ouro"}),e.jsxs("p",{children:["Se você tem um ",e.jsx("strong",{children:"script"})," que retorna 0 (good) ou 1 (bad), o Git faz tudo sozinho."]}),e.jsx(t,{title:"git bisect run",language:"bash",code:`# Bisect totalmente automático
git bisect start HEAD v1.0.0
git bisect run npm test

# O Git vai:
# 1. Checkout no commit do meio
# 2. Rodar npm test
# 3. Marcar good (exit 0) ou bad (exit ≠ 0)
# 4. Repetir até achar
# 5. Imprimir o commit culpado

# Exit codes especiais:
# 125 = "skip" (commit não pode ser testado, ex: build quebrado)
# 0   = good
# 1-124, 126-127 = bad
# 128+ = aborta o bisect
`}),e.jsx(t,{title:"Script de teste customizado",language:"bash",code:`# .bisect-test.sh
#!/bin/bash
set -e

# Build (se quebrar, skip — não é nosso bug)
npm install || exit 125
npm run build || exit 125

# Teste o caso específico do bug
result=$(node -e 'console.log(require("./dist").calc(10, 5))')

if [ "$result" = "15" ]; then
  exit 0   # good
else
  exit 1   # bad
fi
`}),e.jsx(t,{title:"Usando o script",language:"bash",code:`chmod +x .bisect-test.sh

git bisect start HEAD v1.0.0
git bisect run ./.bisect-test.sh

# Saída final:
# 7p8q9r0 is the first bad commit
# 50 commits testados, 9 iterações
`}),e.jsx("h2",{children:"Termos customizados"}),e.jsx("p",{children:'Em vez de "good/bad", você pode usar termos que fazem sentido pro seu caso:'}),e.jsx(t,{title:"--term",language:"bash",code:`# Para investigar regressão de performance
git bisect start --term-old fast --term-new slow
git bisect slow HEAD
git bisect fast v1.0.0

# Para feature que parou de funcionar
git bisect start --term-old works --term-new broken
git bisect broken
git bisect works v1.5.0
`}),e.jsx("h2",{children:"Gerenciando o bisect"}),e.jsx(t,{title:"Comandos úteis durante bisect",language:"bash",code:`# Ver onde você está
git bisect log
git bisect visualize         # abre gitk com o range restante
git bisect view              # mesma coisa

# Pular um commit que não pode ser testado
git bisect skip
git bisect skip v1.2..v1.3   # pular range inteiro

# Voltar atrás (oops, marquei errado)
git bisect log > /tmp/bisect.log
# Edite /tmp/bisect.log removendo as linhas erradas
git bisect reset
git bisect replay /tmp/bisect.log

# Encerrar e voltar ao estado anterior
git bisect reset
`}),e.jsx("h2",{children:"Caso prático completo"}),e.jsx(t,{title:"Encontrando regressão",language:"bash",code:`# Bug: API retorna 500 desde "ontem"
# Última versão sabida boa: v1.5.0

git bisect start
git bisect bad
git bisect good v1.5.0

# Crie script de teste rápido
cat > test-bug.sh <<'EOF'
#!/bin/bash
npm install --silent || exit 125
npm run build --silent || exit 125
npm start --silent &
SERVER=$!
sleep 3
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users)
kill $SERVER 2>/dev/null
[ "$status" = "200" ] && exit 0 || exit 1
EOF
chmod +x test-bug.sh

git bisect run ./test-bug.sh

# Output:
# 7p8q9r0 is the first bad commit
# Author: João
# Date: 2 days ago
# refactor: simplifica handler de users

git show 7p8q9r0     # examine o problema
git bisect reset

# Avise o autor, abra issue, faça fix
`}),e.jsx("h2",{children:"Preparando seu repo para bisect eficiente"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Commits atômicos"})," — quanto menores, mais preciso bisect."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cada commit deve buildar"})," — senão você vai dar muito skip."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Testes rápidos"})," — bisect roda 9-20 vezes; se cada teste leva 10min, são 3 horas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CI por commit"})," — se todo commit já está testado, bisect é trivial."]})]}),e.jsx("h2",{children:"Bisect em monorepos"}),e.jsx(t,{title:"Restrito a um caminho",language:"bash",code:`# Só considera commits que mexeram em src/auth/
git bisect start -- src/auth/
git bisect bad
git bisect good v1.5.0
git bisect run ./test-auth.sh

# Diminui drasticamente o número de commits testados
`}),e.jsx("h2",{children:"Bisect remoto — colaborativo"}),e.jsx(t,{title:"Compartilhar progresso",language:"bash",code:`# Salvar o log do bisect
git bisect log > bisect.log

# Outro dev pode continuar de onde você parou
git bisect start
git bisect replay bisect.log
# ... continua os passos
`}),e.jsx("h2",{children:"Visualizando o que sobrou"}),e.jsx(t,{title:"Range remanescente",language:"bash",code:`# Quantos commits restam para testar?
git bisect view --oneline
git rev-list --count refs/bisect/bad..refs/bisect/good

# GUI
git bisect visualize    # abre gitk
gitk refs/bisect/bad..refs/bisect/good
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(t,{title:"Workflow bisect",language:"bash",code:`# Manual
git bisect start
git bisect bad [HEAD]
git bisect good v1.0.0
git bisect good / bad     # repita
git bisect skip           # se commit não testável
git bisect reset          # encerrar

# Automático (★)
git bisect start HEAD v1.0.0
git bisect run ./test.sh

# Outras
git bisect log            # ver histórico
git bisect log > f && git bisect replay f   # reproduzir
git bisect visualize      # GUI
git bisect start -- path  # restringir a caminho

# Termos custom
git bisect start --term-old works --term-new broken
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/historico",children:"Histórico"})," — outras formas de investigar"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/reflog",children:"Reflog"})," — histórico de operações locais"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/dicas",children:"Dicas e Truques"})," — mais ferramentas de investigação"]})]})]})}export{c as default};
