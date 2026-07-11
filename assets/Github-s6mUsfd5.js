import{j as e,L as o}from"./index-By_zGcNR.js";import{P as a,A as i,C as s}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(a,{title:"Usando GitHub",subtitle:"O que GitHub adiciona ao Git puro: SSH keys, gh CLI, branch protection, releases e Actions essenciais.",difficulty:"iniciante",timeToRead:"13 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Repository"})," "," — "," ","espelho remoto + issues, PRs, actions, pages."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SSH key"})," "," — "," ","adicione em settings/SSH keys; mais seguro que HTTPS."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Personal Access Token"})," "," — "," ","PAT substitui senha em HTTPS."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GitHub Pages"})," "," — "," ","hospedagem estática a partir de branch ou /docs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Actions"})," "," — "," ","CI/CD nativo; workflows em .github/workflows/."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Git ≠ GitHub."})," Git é o sistema de controle de versão; GitHub é uma plataforma que hospeda repositórios Git e adiciona em cima: pull requests, issues, actions, pages e mais. Este capítulo cobre o que você precisa saber para usá-lo bem."]}),e.jsxs(i,{type:"tip",title:"Alternativas válidas",children:["Tudo aqui se aplica também ao ",e.jsx("strong",{children:"GitLab"}),", ",e.jsx("strong",{children:"Bitbucket"}),", ",e.jsx("strong",{children:"Gitea"})," e ",e.jsx("strong",{children:"Codeberg"})," com pequenas variações de nome (Merge Requests vs Pull Requests). O Git por baixo é o mesmo."]}),e.jsx("h2",{children:"Configurando autenticação"}),e.jsx(s,{title:"SSH (recomendado para máquinas pessoais)",language:"bash",code:`# Gerar par de chaves
ssh-keygen -t ed25519 -C "voce@exemplo.com"

# Copiar pública
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAC3Nz... voce@exemplo.com

# Cole em: GitHub Settings → SSH and GPG keys → New SSH key

# Testar
ssh -T git@github.com
# Hi seu-usuario! You've successfully authenticated...
`}),e.jsx(s,{title:"HTTPS + Personal Access Token",language:"bash",code:`# Crie um token em: Settings → Developer settings → Personal access tokens
# Escolha escopos: repo (mínimo), workflow (se usar Actions)

# Use o token como senha
git push
# Username: seu-user
# Password: ghp_TOKEN_AQUI

# Salve para não digitar sempre
git config --global credential.helper cache --timeout=86400
`}),e.jsx("h2",{children:"GitHub CLI — gh"}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"gh"}),' é a ferramenta oficial. Ele transforma muita coisa de "abrir browser e clicar" em comando único.']}),e.jsx(s,{title:"Instalação e setup",language:"bash",code:`# Instalar
brew install gh                    # macOS
sudo apt install gh                # Ubuntu/Debian
sudo dnf install gh                # Fedora
winget install GitHub.cli          # Windows

# Login (configura SSH e credentials de uma vez)
gh auth login

# Verificar
gh auth status
`}),e.jsx(s,{title:"Operações comuns com gh",language:"bash",code:`# Criar repo (do diretório atual)
gh repo create meu-repo --public --source=. --push

# Clonar
gh repo clone usuario/repo

# Abrir o repo no browser
gh repo view --web
gh browse                  # arquivo atual no GitHub

# Forkar
gh repo fork usuario/repo --clone

# Issues
gh issue list
gh issue create --title "..." --body "..."
gh issue view 123
gh issue close 123

# Pull Requests
gh pr create --fill                   # usa último commit como título/body
gh pr list
gh pr view 456 --web
gh pr checkout 456                    # entra no branch do PR
gh pr merge 456 --squash --delete-branch

# Releases
gh release create v1.0.0 --generate-notes
gh release upload v1.0.0 build.zip

# Actions
gh run list
gh run view <run-id>
gh run watch                          # acompanha em tempo real
`}),e.jsx("h2",{children:"README — a porta de entrada"}),e.jsx(s,{title:"Estrutura recomendada",language:"markdown",code:`# Nome do Projeto

> Uma frase explicando o que ele faz.

[![CI](https://github.com/user/repo/actions/workflows/ci.yml/badge.svg)](...)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ⚡ Quick Start

\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`

## 📦 Instalação

...

## 🚀 Uso

...

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 Licença

MIT © Seu Nome
`}),e.jsx("h2",{children:"Branch Protection Rules"}),e.jsxs("p",{children:["Em ",e.jsx("strong",{children:"Settings → Branches → Add rule"}),", configure regras para a ",e.jsx("code",{children:"main"}),":"]}),e.jsx(s,{title:"Regras recomendadas para main",language:"markdown",code:`✓ Require a pull request before merging
  ✓ Require approvals: 1 (ou mais)
  ✓ Dismiss stale approvals when new commits are pushed

✓ Require status checks to pass before merging
  ✓ Require branches to be up to date before merging
  ✓ Status checks: ci/test, ci/lint, ...

✓ Require conversation resolution before merging
✓ Require signed commits     ← se o time usa signing
✓ Require linear history     ← força rebase ou squash (sem merge commits)
✓ Do not allow bypassing the above settings
✗ Allow force pushes         ← deixe DESLIGADO em main
✗ Allow deletions
`}),e.jsx("h2",{children:"GitHub Actions — CI básico"}),e.jsx(s,{title:".github/workflows/ci.yml",language:"yaml",code:`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
`}),e.jsx(s,{title:".github/workflows/release.yml",language:"yaml",code:`name: Release

on:
  push:
    tags: ['v*.*.*']

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: softprops/action-gh-release@v2
        with:
          files: dist/*
          generate_release_notes: true
`}),e.jsx("h2",{children:"GitHub Pages"}),e.jsx(s,{title:"Deploy de site estático",language:"yaml",code:`# .github/workflows/deploy.yml
name: Deploy to Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
      - id: deployment
        uses: actions/deploy-pages@v4
`}),e.jsx("h2",{children:"Issue / PR templates"}),e.jsx(s,{title:".github/ISSUE_TEMPLATE/bug_report.md",language:"markdown",code:`---
name: Bug Report
about: Reporte um bug encontrado
labels: bug
---

## Descrição
<!-- O que aconteceu? -->

## Reprodução
1.
2.
3.

## Esperado vs atual
**Esperado:**

**Atual:**

## Ambiente
- OS:
- Versão:
- Browser:
`}),e.jsx(s,{title:".github/pull_request_template.md",language:"markdown",code:`## O que mudou
<!-- Resumo em 1-2 linhas -->

## Por que
<!-- Contexto / link para issue -->
Closes #

## Checklist
- [ ] Testes adicionados / atualizados
- [ ] Documentação atualizada
- [ ] Breaking changes documentadas no CHANGELOG
- [ ] CI passou

## Screenshots (se UI)
`}),e.jsx("h2",{children:"Code review com CODEOWNERS"}),e.jsx(s,{title:".github/CODEOWNERS",language:"markdown",code:`# Sintaxe similar ao .gitignore
# Cada PR pede review automático dos donos

*                       @org/maintainers
/src/auth/              @org/security-team
/docs/                  @maria @joao
*.tsx                   @org/frontend
package.json            @org/devops
`}),e.jsx("h2",{children:"Dependabot — updates automatizados"}),e.jsx(s,{title:".github/dependabot.yml",language:"yaml",code:`version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      dev-deps:
        dependency-type: "development"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
`}),e.jsx("h2",{children:"Pull Requests — fluxo completo"}),e.jsxs("p",{children:["Detalhes em ",e.jsx(o,{href:"/pull-requests",children:"Pull Requests"}),"."]}),e.jsx("h2",{children:"Cheat-sheet do gh"}),e.jsx(s,{title:"Comandos mais usados",language:"bash",code:`gh auth login                        # autenticar
gh repo create / fork / clone        # repos
gh issue list / create / close       # issues
gh pr create --fill                  # PR rápido
gh pr checkout 123                   # entra no branch do PR
gh pr merge 123 --squash             # merge
gh release create v1.0.0             # release
gh run list / watch                  # actions
gh browse                            # abre no navegador
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{href:"/pull-requests",children:"Pull Requests"})," — o coração do GitHub"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/forks",children:"Forks"})," — contribuir em projetos open source"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/signing",children:"Signing"})," — commits verificados"]}),e.jsxs("li",{children:[e.jsx(o,{href:"/conventional-commits",children:"Conventional Commits"})," — releases automáticas"]})]})]})}export{n as default};
