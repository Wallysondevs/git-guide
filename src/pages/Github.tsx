import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Github() {
  return (
    <PageContainer
      title="Usando GitHub"
      subtitle="O GitHub é a maior plataforma de hospedagem de código do mundo. Aprenda a usar seus recursos principais."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <p>
        O GitHub é muito mais do que um lugar para hospedar código Git. É uma plataforma completa de colaboração com issues, pull requests, actions (CI/CD), wikis, discussões e muito mais.
      </p>

      <h2>Criando seu Primeiro Repositório no GitHub</h2>
      <CodeBlock
        title="Conectando um projeto local ao GitHub"
        code={`# Opção 1: Criar o repo no GitHub primeiro, depois clonar
git clone https://github.com/seu-usuario/meu-projeto.git
cd meu-projeto
# Comece a trabalhar

# Opção 2: Conectar um projeto existente ao GitHub
cd projeto-existente
git init
git add .
git commit -m "Commit inicial"
git remote add origin https://github.com/seu-usuario/meu-projeto.git
git branch -M main
git push -u origin main`}
      />

      <h2>GitHub CLI (gh)</h2>
      <p>
        O <strong>GitHub CLI</strong> permite interagir com o GitHub diretamente do terminal, sem abrir o navegador:
      </p>

      <CodeBlock
        title="Usando o GitHub CLI"
        code={`# Instalar no Linux (via apt)
sudo apt install gh

# Instalar no macOS
brew install gh

# Autenticar
gh auth login

# Criar repositório
gh repo create meu-projeto --public --clone

# Criar pull request
gh pr create --title "feat: nova funcionalidade" --body "Descrição..."

# Listar issues
gh issue list

# Criar issue
gh issue create --title "Bug: crash ao logar" --body "Passos para reproduzir..."

# Ver status do workflow de CI/CD
gh run list`}
      />

      <h2>Issues</h2>
      <p>
        Issues são a forma de rastrear tarefas, bugs, melhorias e discussões no GitHub:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Boas práticas para Issues</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Título claro e descritivo</li>
            <li>• Passos para reproduzir (bugs)</li>
            <li>• Comportamento esperado vs atual</li>
            <li>• Labels para categorizar</li>
            <li>• Assign para responsáveis</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Referências em commits</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <code>#123</code> — menciona a issue</li>
            <li>• <code>closes #123</code> — fecha a issue</li>
            <li>• <code>fixes #123</code> — fecha a issue</li>
            <li>• <code>resolves #123</code> — fecha a issue</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        title="Commits que referenciam issues"
        code={`# Mencionar uma issue na mensagem de commit
git commit -m "fix: corrige validação de email

Closes #45
See also #32"

# Quando este commit for mergeado no main,
# a issue #45 será fechada automaticamente`}
      />

      <h2>GitHub Actions — CI/CD</h2>
      <p>
        O GitHub Actions automatiza testes, builds e deploys toda vez que você faz push ou abre um pull request:
      </p>

      <CodeBlock
        title="Workflow básico de CI"
        language="yaml"
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
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm test`}
      />

      <AlertBox type="success" title="GitHub é gratuito para projetos públicos">
        Repositórios públicos no GitHub são 100% gratuitos e incluem GitHub Actions com 2.000 minutos/mês. Para projetos open source, os limites são ainda mais generosos.
      </AlertBox>
    </PageContainer>
  );
}
