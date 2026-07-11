import{j as e,L as i}from"./index-By_zGcNR.js";import{P as s,A as a,C as o}from"./AlertBox-CZTB6a28.js";function m(){return e.jsxs(s,{title:"Fazendo Commits",subtitle:"Como criar commits claros, atômicos e significativos que transformam o histórico em documentação viva.",difficulty:"iniciante",timeToRead:"14 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Commit"})," "," — "," ","snapshot da árvore + metadados (autor, msg, parent)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SHA-1/SHA-256"})," "," — "," ","hash que identifica unicamente o commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git commit -m"})," "," — "," ","mensagem inline; -am inclui add de arquivos rastreados."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mensagem boa"})," "," — "," ",'imperativo no presente: "Add", "Fix", "Remove".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Amend"})," "," — "," ","git commit --amend altera o último commit (perigoso após push)."]})]}),e.jsxs("p",{children:["Um commit é uma ",e.jsx("strong",{children:"fotografia do projeto + mensagem explicativa"}),". Mas mais que isso: bons commits são leitura técnica para quem chega depois (incluindo seu eu de daqui a 6 meses). Esta é uma das habilidades mais subestimadas da carreira."]}),e.jsxs(a,{type:"tip",title:"A regra de ouro",children:["Cada commit responde a duas perguntas: ",e.jsx("strong",{children:"O que mudou?"})," (resumo) e ",e.jsx("strong",{children:"Por que mudou?"})," (contexto). Se você não consegue escrever isso em uma linha, o commit é grande demais."]}),e.jsx("h2",{children:"Anatomia da mensagem ideal"}),e.jsx(o,{title:"Estrutura recomendada",language:"markdown",code:`feat(auth): adiciona MFA via TOTP                      ← TÍTULO (≤ 72 char)
                                                          ← LINHA EM BRANCO
Implementa autenticação de dois fatores usando             ← CORPO (por quê)
TOTP (RFC 6238). O secret é gerado por usuário e
guardado encriptado com AES-256-GCM.

Trade-offs considerados:
- TOTP > SMS por não depender de operadora
- 30s de janela é o equilíbrio entre UX e segurança

Closes #234                                                ← RODAPÉ (refs)
Reviewed-by: Maria <maria@empresa.com>
`}),e.jsx("h2",{children:"Comandos de commit"}),e.jsx(o,{title:"As variações",language:"bash",code:`# Mensagem inline
git commit -m "feat: adiciona validação de CPF"

# Título + corpo (dois -m geram linha em branco entre eles)
git commit -m "feat: adiciona validação de CPF" \\
           -m "Usa cpf-cnpj-validator. Closes #234"

# Abre o editor (recomendado para mensagens > 1 linha)
git commit

# Stage + commit em um passo (só tracked)
git commit -am "fix: corrige cálculo de desconto"

# Commit vazio (útil para forçar CI/redeploy)
git commit --allow-empty -m "chore: trigger redeploy"

# Pula hooks (use com cautela)
git commit --no-verify -m "..."
`}),e.jsx("h2",{children:"Os 7 mandamentos da boa mensagem"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Título no imperativo"}),': "adiciona", "corrige", "remove" — não "adicionado" ou "adicionando".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Máximo 72 caracteres no título"})," (o GitHub trunca em ~50 na lista)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sem ponto final"})," no título."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Linha em branco"})," entre título e corpo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Corpo explica o porquê"}),", não o quê (o diff já mostra o quê)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Quebre o corpo em ~80 colunas"})," (legibilidade no terminal)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use rodapés padronizados"})," (Closes, Refs, Co-authored-by)."]})]}),e.jsx("h2",{children:"Convenção de prefixos: Conventional Commits"}),e.jsxs("p",{children:["A convenção ",e.jsx(i,{href:"/conventional-commits",children:"Conventional Commits"})," é o padrão de fato da indústria. Vale a pena adotar:"]}),e.jsx(o,{title:"Tipos mais comuns",language:"markdown",code:`feat:     nova funcionalidade
fix:      correção de bug
docs:     mudança só em documentação
style:    formatação (sem mudar comportamento)
refactor: reescrita sem mudança funcional
perf:     melhoria de performance
test:     adiciona/corrige testes
build:    sistema de build, dependências
ci:       configuração de CI/CD
chore:    manutenção, sem código de produção
revert:   reverte commit anterior

# Com escopo:
feat(auth): adiciona MFA
fix(api): trata 429 do upstream
`}),e.jsx("h2",{children:"Corrigindo o último commit"}),e.jsx(o,{title:"git commit --amend",language:"bash",code:`# Mudou só a mensagem
git commit --amend -m "mensagem corrigida"

# Esqueceu de adicionar um arquivo no commit
git add esquecido.ts
git commit --amend --no-edit
# (--no-edit mantém a mensagem anterior)

# Mudar autor do último commit
git commit --amend --author="Nome <email@exemplo.com>"

# Mudar a data do commit
git commit --amend --date="2025-10-15T10:00:00"
`}),e.jsxs(a,{type:"danger",title:"--amend reescreve o histórico",children:["O ",e.jsx("code",{children:"--amend"})," cria um ",e.jsx("strong",{children:"commit novo"})," com hash diferente. Se o anterior já foi pushado, você precisará de ",e.jsx("code",{children:"git push --force-with-lease"})," e isso pode quebrar o trabalho de outros. Só use em commits locais."]}),e.jsx("h2",{children:"Commits assinados (verificados)"}),e.jsx(o,{title:"Sign-off e signing",language:"bash",code:`# Sign-off (DCO — Developer Certificate of Origin) — só adiciona linha "Signed-off-by"
git commit -s -m "feat: ..."

# Assinatura criptográfica (GPG ou SSH) — verificação real de autoria
git commit -S -m "feat: ..."

# Assinar todos os commits por padrão
git config --global commit.gpgSign true
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(i,{href:"/signing",children:"Assinatura GPG/SSH"}),"."]}),e.jsx("h2",{children:"Co-autoria (pair programming)"}),e.jsx(o,{title:"Creditando colegas",language:"markdown",code:`# No final da mensagem, deixe uma linha em branco e adicione:

Co-authored-by: Maria Silva <maria@empresa.com>
Co-authored-by: João Souza <joao@empresa.com>

# O GitHub renderiza os avatares de todos os co-autores no commit.
`}),e.jsx("h2",{children:"Boas práticas de granularidade"}),e.jsx(o,{title:"Atômico vs salvo",language:"diff",code:`# ❌ Commit "salvo do dia"
- "muitas mudanças no auth e algumas correções"

# ✅ Sequência atômica
+ refactor(auth): extrai validação de token para função pura
+ feat(auth): adiciona suporte a refresh tokens
+ fix(auth): corrige timeout de cookies em Safari iOS
+ test(auth): adiciona cobertura para refresh
+ docs(auth): documenta novo fluxo no README
`}),e.jsx("h2",{children:"Reescrevendo histórico antes do push"}),e.jsx(o,{title:"git rebase -i — agrupando commits",language:"bash",code:`# Reescreve os últimos 5 commits interativamente
git rebase -i HEAD~5

# Abre o editor com:
# pick a1b2c3d feat: começa MFA
# pick e5f6g7h wip
# pick 9i0j1k2 fix typo
# pick 3l4m5n6 wip2
# pick 7o8p9q0 finaliza MFA

# Mude para:
# pick   a1b2c3d feat: adiciona MFA via TOTP
# squash e5f6g7h wip
# squash 9i0j1k2 fix typo
# squash 3l4m5n6 wip2
# squash 7o8p9q0 finaliza MFA
# (resultado: 1 commit limpo)
`}),e.jsxs("p",{children:["Detalhes completos em ",e.jsx(i,{href:"/rebase",children:"Rebase"}),"."]}),e.jsx("h2",{children:"Templates de mensagem"}),e.jsx(o,{title:"Configurar template padrão",language:"bash",code:`# Crie ~/.gitmessage com seu template
cat > ~/.gitmessage <<'EOF'
# tipo(escopo): assunto curto (≤ 50 chars)
#
# Por que esta mudança é necessária?
#
# Como ela resolve o problema?
#
# Refs: #
EOF

# Configure como template global
git config --global commit.template ~/.gitmessage

# Agora "git commit" abre o editor já com o template
`}),e.jsx("h2",{children:"Verificação prévia com hooks"}),e.jsx(o,{title:"hook pre-commit que valida formato",language:"bash",code:`# .git/hooks/commit-msg
#!/bin/sh
pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .{1,72}$"
if ! grep -qE "$pattern" "$1"; then
  echo "❌ Mensagem fora do padrão Conventional Commits"
  echo "Formato: tipo(escopo opcional): descrição"
  exit 1
fi

chmod +x .git/hooks/commit-msg
`}),e.jsxs("p",{children:["Veja mais em ",e.jsx(i,{href:"/hooks",children:"Git Hooks"}),"."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Comandos de commit",language:"bash",code:`git commit                       # abre editor
git commit -m "msg"              # mensagem inline
git commit -am "msg"             # add + commit (só tracked)
git commit --amend               # corrige último
git commit --amend --no-edit     # idem, mantendo msg
git commit --allow-empty -m ""   # commit vazio
git commit -s -m ""              # sign-off DCO
git commit -S -m ""              # signed cryptographically
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{href:"/conventional-commits",children:"Conventional Commits"})," — adote o padrão completo"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/historico",children:"Histórico de Commits"})," — explore ",e.jsx("code",{children:"git log"})," a fundo"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/rebase",children:"Rebase"})," — reescreva e organize commits"]}),e.jsxs("li",{children:[e.jsx(i,{href:"/signing",children:"Assinatura GPG/SSH"}),' — adicione o badge "verified"']})]})]})}export{m as default};
