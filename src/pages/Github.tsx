import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Github() {
    return (
      <PageContainer
        title="GitHub"
        subtitle="Domine o GitHub — Issues, Actions, Pages, releases e funcionalidades essenciais da plataforma."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <p>
          O GitHub é a maior plataforma de hospedagem de código do mundo. Além de armazenar repositórios Git, oferece Issues, Pull Requests, GitHub Actions (CI/CD), GitHub Pages, e muito mais.
        </p>

        <h2>Funcionalidades principais do GitHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { titulo: "Issues", desc: "Sistema de rastreamento de bugs, features e tarefas. Suporta labels, milestones, assignees e templates. Integra com PRs e commits." },
            { titulo: "Pull Requests", desc: "O coração da colaboração — proposta de mudanças, revisão de código, discussão, CI e merge. Conecta Issue ao código." },
            { titulo: "GitHub Actions", desc: "CI/CD integrado. Automatiza builds, testes, deploys e qualquer workflow usando YAML." },
            { titulo: "GitHub Pages", desc: "Hospedagem estática gratuita a partir de um branch ou pasta dist/. Ideal para documentação e sites de projetos." },
            { titulo: "Releases", desc: "Empacotamento de versões com changelogs, assets (binários) e tags. Baseado em tags Git." },
            { titulo: "GitHub Codespaces", desc: "Ambiente de desenvolvimento completo na nuvem, diretamente no browser, configurado via devcontainer." },
          ].map((item) => (
            <div key={item.titulo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm text-primary">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>GitHub Actions — CI/CD básico</h2>
        <CodeBlock
          title="Workflow básico de CI"
          code={`# .github/workflows/ci.yml
  name: CI

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

        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'

        - name: Instalar dependências
          run: npm ci

        - name: Executar testes
          run: npm test

        - name: Build
          run: npm run build`}
        />

        <h2>GitHub Pages — deploy automático</h2>
        <CodeBlock
          title="Deploy no GitHub Pages via Actions"
          code={`# .github/workflows/deploy.yml
  name: Deploy GitHub Pages

  on:
    push:
      branches: [main]

  permissions:
    contents: read
    pages: write
    id-token: write

  jobs:
    deploy:
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm ci && npm run build
        - uses: actions/upload-pages-artifact@v3
          with:
            path: dist/
        - uses: actions/deploy-pages@v4
          id: deployment`}
        />

        <h2>Issues e referências cruzadas</h2>
        <CodeBlock
          title="Vinculando commits e PRs a Issues"
          code={`# Fechar issue automaticamente ao mergear PR:
  git commit -m "feat: adiciona filtro de busca

  Closes #42"

  # Palavras-chave que fecham issues:
  # close, closes, closed
  # fix, fixes, fixed
  # resolve, resolves, resolved

  # Referenciar sem fechar:
  git commit -m "fix: parte da solução, ref #42"

  # Referenciar issue de outro repositório:
  "Closes usuario/outro-repo#15"

  # No PR, referenciar issue no corpo da descrição:
  # "This PR closes #42 and partially addresses #38"`}
        />

        <h2>Atalhos úteis no GitHub</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Atalho</th>
                <th className="p-3 text-left">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["t", "Pesquisar arquivo no repositório (file finder)"],
                [".", "Abrir o repositório no VS Code na web (github.dev)"],
                ["b", "Abrir blame view do arquivo atual"],
                ["y", "Transformar URL em link permanente ao commit atual"],
                ["?", "Ver lista completa de atalhos"],
                ["Ctrl+K / Cmd+K", "Abrir command palette do GitHub"],
              ].map(([atalho, acao], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{atalho}</td>
                  <td className="p-3 text-muted-foreground text-sm">{acao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="success" title="GitHub CLI — controle total via terminal">
          Instale o GitHub CLI (<code>gh</code>) para gerenciar Issues, PRs, Actions e releases diretamente do terminal. <code>gh pr create</code>, <code>gh issue list</code>, <code>gh run watch</code> são mais rápidos que a interface web para fluxos repetitivos.
        </AlertBox>
      </PageContainer>
    );
  }
  