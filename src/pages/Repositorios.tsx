import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Repositorios() {
  return (
    <PageContainer
      title="Criando Repositórios"
      subtitle="Como iniciar um repositório Git do zero ou a partir de um projeto existente."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <p>
        Um repositório Git (ou "repo") é um diretório que o Git está monitorando. Você pode criar um repositório novo a partir de um diretório vazio ou clonar um repositório existente da internet.
      </p>

      <h2>git init — Novo Repositório</h2>
      <p>
        O comando <code>git init</code> transforma qualquer diretório em um repositório Git, criando a pasta oculta <code>.git</code>.
      </p>

      <CodeBlock
        title="Iniciando um repositório"
        code={`# Cria uma nova pasta e inicia um repositório
mkdir meu-app
cd meu-app
git init

# Ou inicia em um diretório já existente
cd /caminho/para/projeto-existente
git init

# Inicia com um branch padrão diferente
git init --initial-branch=main`}
      />

      <h2>Estrutura da Pasta .git</h2>
      <p>
        Após o <code>git init</code>, a pasta <code>.git</code> contém toda a mágica do Git:
      </p>

      <CodeBlock
        title="Explorando a pasta .git"
        code={`ls -la .git/

# Saída típica:
# HEAD        - Aponta para o branch atual
# config      - Configurações locais do repositório
# description - Descrição (usada pelo GitWeb)
# hooks/      - Scripts automáticos (git hooks)
# info/       - Informações de exclusão
# objects/    - Armazena commits, trees e blobs
# refs/       - Referências para branches e tags`}
      />

      <AlertBox type="warning" title="Nunca edite a pasta .git manualmente">
        A pasta <code>.git</code> é gerenciada exclusivamente pelo Git. Editar seus arquivos manualmente pode corromper seu repositório. Use sempre os comandos Git.
      </AlertBox>

      <h2>Adicionando um README</h2>
      <p>
        Todo bom repositório começa com um <strong>README.md</strong>. É o primeiro arquivo que as pessoas veem ao acessar seu projeto no GitHub.
      </p>

      <CodeBlock
        title="Criando um README profissional"
        code={`# Cria o README
cat > README.md << 'EOF'
# Nome do Projeto

Breve descrição do que o projeto faz.

## Instalação

\`\`\`bash
npm install
\`\`\`

## Como usar

\`\`\`bash
npm start
\`\`\`

## Contribuição

Pull requests são bem-vindos!

## Licença

MIT
EOF

# Adiciona e commita
git add README.md
git commit -m "Adiciona README inicial"`}
      />

      <h2>Repositório Bare</h2>
      <p>
        Um repositório <strong>bare</strong> não tem working directory — ele é usado apenas como servidor central para compartilhar código entre membros de uma equipe.
      </p>

      <CodeBlock
        title="Repositório bare (servidor)"
        code={`# Cria um repositório bare
git init --bare meu-projeto.git

# Repositórios bare têm a extensão .git por convenção
# e são usados como repositórios remotos`}
      />

      <h2>Verificando o Estado do Repositório</h2>
      <CodeBlock
        title="Comandos essenciais de inspeção"
        code={`# Estado atual (sempre use antes de commitar)
git status

# Lista de commits
git log --oneline

# Mostra informações sobre o repositório
git remote -v    # Repositórios remotos conectados
git branch -a    # Todos os branches
git tag          # Tags existentes`}
      />

      <AlertBox type="success" title="Dica Pro">
        Sempre crie um <code>.gitignore</code> logo no início do projeto para evitar commitar arquivos desnecessários como <code>node_modules/</code>, <code>.env</code>, arquivos de build, etc.
      </AlertBox>
    </PageContainer>
  );
}
