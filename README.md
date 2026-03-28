# Guia Completo do Git

Um guia abrangente do Git em Português Brasileiro — do básico ao avançado com exemplos práticos e interativos.

🔗 **Acesse online:** [wallysondevs.github.io/git-guide](https://wallysondevs.github.io/git-guide)

## Conteúdo

34 capítulos cobrindo todos os aspectos do Git:

- **Fundamentos**: História, Instalação, Primeiros Passos, Repositórios
- **Fluxo básico**: Status, Staging, Commits, Histórico
- **Branches**: Branches, Merge, Rebase, Conflitos
- **Trabalho remoto**: Remotos, Clone, Push, Fetch, Pull Requests, Forks
- **Plataformas**: GitHub, GitIgnore
- **Avançado**: Tags, Stash, Aliases, Hooks, Submódulos, Reset, Cherry-Pick, Bisect, Reflog
- **Referências**: Fluxos de Trabalho, Dicas e Truques, Referências

## Tecnologias

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **Framer Motion** (animações)
- **Wouter** (hash-based routing — compatível com GitHub Pages)
- **React Syntax Highlighter** (blocos de código coloridos)

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build para produção

```bash
npm run build
```

O site é publicado automaticamente no GitHub Pages a cada push na branch `main` via GitHub Actions.

## Estrutura do projeto

```
src/
  components/
    layout/     # Sidebar, Header, PageContainer
    ui/         # CodeBlock, AlertBox, DifficultyBadge
  hooks/        # use-theme
  pages/        # 34 páginas do guia
  App.tsx       # Roteamento hash-based
  index.css     # Tema Git (laranja hsl(9,86%,57%))
```

## Licença

MIT
