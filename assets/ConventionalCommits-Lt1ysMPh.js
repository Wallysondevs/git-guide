import{j as e,L as a}from"./index-By_zGcNR.js";import{P as s,A as i,C as o}from"./AlertBox-CZTB6a28.js";function t(){return e.jsxs(s,{title:"Conventional Commits",subtitle:"Um padrão simples para mensagens de commit que destrava changelog automático, versionamento semântico e CI inteligente.",difficulty:"iniciante",timeToRead:"9 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Conventional Commits"})," "," — "," ","padrão: tipo(escopo): descrição."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tipos"})," "," — "," ","feat, fix, docs, style, refactor, test, chore, build, ci."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Breaking change"})," "," — "," ",'! depois do escopo OU footer "BREAKING CHANGE:".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Semantic-release"})," "," — "," ","automatiza versão + changelog a partir das mensagens."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Commitlint"})," "," — "," ","valida formato em pre-commit ou CI."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Conventional Commits"})," é uma especificação leve para escrever mensagens de commit. A ideia: um prefixo padronizado (",e.jsx("code",{children:"feat:"}),", ",e.jsx("code",{children:"fix:"}),", ",e.jsx("code",{children:"docs:"}),"...) que ",e.jsx("em",{children:"máquinas"})," conseguem ler. Resultado: changelog gerado automaticamente, versão calculada sozinha (semver), e mensagens uniformes no histórico inteiro."]}),e.jsxs(i,{type:"tip",title:"TL;DR",children:["Formato: ",e.jsx("code",{children:"<tipo>(escopo opcional): descrição curta"}),". Exemplos: ",e.jsx("code",{children:"feat(auth): adiciona login com Google"}),", ",e.jsx("code",{children:"fix: corrige overflow no menu mobile"}),", ",e.jsx("code",{children:"chore: atualiza dependências"}),"."]}),e.jsx("h2",{children:"Estrutura completa"}),e.jsx(o,{title:"Anatomia",language:"markdown",code:`<tipo>(<escopo opcional>)<!>: <descrição>
                                  ↑
                       o "!" indica BREAKING CHANGE

<corpo opcional, separado por linha em branco>

<rodapé opcional, separado por linha em branco>
BREAKING CHANGE: <descrição da quebra>
Refs: #123, #456
Co-authored-by: Fulano <fulano@email.com>`}),e.jsx("h2",{children:"Tipos padrão"}),e.jsx(o,{title:"Os 11 tipos mais usados",language:"bash",code:`feat:     # nova funcionalidade para o usuário (MINOR no semver)
fix:      # correção de bug visível ao usuário (PATCH no semver)
docs:     # só documentação (README, comentários, JSDoc)
style:    # formatação, espaços, ponto-e-vírgula — sem mudar lógica
refactor: # mudança interna sem alterar comportamento
perf:     # melhora de performance
test:     # adicionar ou corrigir testes
build:    # build system, dependências (webpack, npm, docker)
ci:       # config de CI/CD (GitHub Actions, GitLab CI)
chore:    # tarefas manutenção que não entram em changelog
revert:   # reverter um commit anterior
`}),e.jsx("h2",{children:"Exemplos reais"}),e.jsx(o,{title:"Bons commits",language:"bash",code:`# Simples
feat: adiciona suporte a tema escuro
fix: previne crash quando usuário desloga durante upload
docs: atualiza instruções de instalação no README

# Com escopo (módulo, pasta ou área afetada)
feat(api): expõe endpoint /users/me
fix(auth): corrige expiração de token JWT
refactor(checkout): extrai validação para hook próprio
perf(home): lazy-load imagens abaixo da dobra
test(utils): cobre casos extremos de formatDate

# BREAKING CHANGE (com !) — força MAJOR no semver
feat(api)!: muda contrato de /users (id agora é UUID)

# Com corpo e rodapé
feat(notifications): envia email após cadastro

Usa o template "welcome.hbs" e o serviço SES.
Trabalha em background via Bull para não travar o request.

Refs: #234
Co-authored-by: Maria <maria@email.com>
`}),e.jsx("h2",{children:"Por que adotar?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Changelog automático"})," — ferramentas como ",e.jsx("code",{children:"standard-version"}),", ",e.jsx("code",{children:"semantic-release"})," e ",e.jsx("code",{children:"git-cliff"})," leem os commits e geram ",e.jsx("code",{children:"CHANGELOG.md"})," sozinhas."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Versionamento semântico (semver)"})," automático: ",e.jsx("code",{children:"fix:"})," → ",e.jsx("strong",{children:"patch"})," (1.2.3 → 1.2.4), ",e.jsx("code",{children:"feat:"})," → ",e.jsx("strong",{children:"minor"})," (1.2.3 → 1.3.0), ",e.jsx("code",{children:"feat!:"})," → ",e.jsx("strong",{children:"major"})," (1.2.3 → 2.0.0)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Histórico legível"})," — ",e.jsx("code",{children:"git log --oneline"})," conta uma história clara."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CI inteligente"})," — pode pular tasks: ",e.jsx("code",{children:"chore:"})," e ",e.jsx("code",{children:"docs:"})," não disparam build de produção."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Code review focado"})," — revisor entende o ",e.jsx("em",{children:"tipo"})," da mudança antes de abrir o diff."]})]}),e.jsx("h2",{children:"Forçando o padrão (commitlint + husky)"}),e.jsxs("p",{children:["Em projetos JavaScript, a combinação ",e.jsx("strong",{children:"commitlint + husky"})," bloqueia commits que não seguem o padrão antes mesmo de eles serem feitos."]}),e.jsx(o,{title:"Setup completo",language:"bash",code:`# Instalar
pnpm add -D @commitlint/cli @commitlint/config-conventional husky

# Config do commitlint
echo "export default { extends: ['@commitlint/config-conventional'] };" \\
  > commitlint.config.mjs

# Inicializar husky
pnpm exec husky init

# Adicionar hook commit-msg
echo 'pnpm exec commitlint --edit "$1"' > .husky/commit-msg
chmod +x .husky/commit-msg
`}),e.jsx(o,{title:"Testando",language:"bash",code:`git commit -m "alterei umas coisas"
# ⧗   input: alterei umas coisas
# ✖   subject may not be empty [subject-empty]
# ✖   type may not be empty [type-empty]
# husky - commit-msg hook exited with code 1 (error)

git commit -m "feat: adiciona seletor de tema"
# ✓ tudo certo, commit feito
`}),e.jsx("h2",{children:"Gerando changelog"}),e.jsx(o,{title:"Com git-cliff (Rust, rápido, agnóstico de linguagem)",language:"bash",code:`# Instalar
cargo install git-cliff
# ou: brew install git-cliff
# ou: pnpm add -D git-cliff

# Gerar changelog do zero
git cliff -o CHANGELOG.md

# Apenas mudanças desde a última tag
git cliff --latest -o CHANGELOG.md

# Bump de versão sugerido (lê os commits e diz: "deveria ser MINOR")
git cliff --bumped-version
`}),e.jsx(o,{title:"Com semantic-release (Node, totalmente automático no CI)",language:"bash",code:`pnpm add -D semantic-release \\
  @semantic-release/changelog \\
  @semantic-release/git

# No CI (GitHub Actions, etc), no merge para main:
pnpm exec semantic-release
# 1. Lê os commits desde a última release
# 2. Calcula próxima versão (semver)
# 3. Gera CHANGELOG.md
# 4. Cria a tag
# 5. Cria o release no GitHub
# 6. Publica no npm
# Tudo automático.
`}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:'Esqueceu o "!" em breaking change'})," → semantic-release não vai bumpar major. Sempre use ",e.jsx("code",{children:"feat!:"})," ou rodapé ",e.jsx("code",{children:"BREAKING CHANGE:"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Misturar tipos"}),' ("feat e fix no mesmo commit") → divida em commits separados. ',e.jsx(a,{href:"/staging",className:"text-primary underline",children:"Staging"})," com ",e.jsx("code",{children:"git add -p"})," ajuda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mensagem muito longa no título"})," → mantenha < 72 caracteres. Detalhes vão no corpo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Modo imperativo"}),' → escreva "adiciona" não "adicionado". Pense no commit como uma ',e.jsx("em",{children:"ordem"}),': "se aplicado, este commit vai...".']})]}),e.jsxs(i,{type:"note",title:"Convenção, não religião",children:["Conventional Commits é uma ",e.jsx("em",{children:"ferramenta"})," — adote se trouxer benefício real (changelog automático, semver). Em projeto pequeno, sem release publicado, pode ser overkill. Use o que serve."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Resumo de bolso",language:"bash",code:`feat:      nova funcionalidade           → MINOR
fix:       correção de bug                → PATCH
docs:      só documentação                → nada
style:     formatação                     → nada
refactor:  mudança interna                → nada
perf:      melhora de performance         → PATCH
test:      adicionar/corrigir testes      → nada
build:     build system, deps             → nada
ci:        config de CI/CD                → nada
chore:     manutenção                     → nada
revert:    reverter commit                → contexto
feat!:     breaking change                → MAJOR
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Combine com ",e.jsx(a,{href:"/signing",className:"text-primary underline",children:"commits assinados"})," e ",e.jsx(a,{href:"/hooks",className:"text-primary underline",children:"hooks"})," para um fluxo profissional. Veja também ",e.jsx(a,{href:"/commits",className:"text-primary underline",children:"Commits"})," para boas práticas gerais e ",e.jsx(a,{href:"/tags",className:"text-primary underline",children:"Tags"})," para gerenciar releases."]})]})}export{t as default};
