import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Gitignore() {
  return (
    <PageContainer
      title=".gitignore"
      subtitle="Como configurar o Git para ignorar arquivos que não devem ser rastreados no repositório."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <p>
        O arquivo <code>.gitignore</code> diz ao Git quais arquivos e pastas ele deve ignorar completamente — como dependências instaladas, arquivos de build, variáveis de ambiente e arquivos temporários.
      </p>

      <h2>Sintaxe do .gitignore</h2>
      <CodeBlock
        title=".gitignore — exemplos de padrões"
        language="bash"
        code={`# Comentários começam com #

# Ignorar um arquivo específico
.env
secrets.json

# Ignorar todos os arquivos com essa extensão
*.log
*.tmp
*.bak

# Ignorar uma pasta inteira
node_modules/
dist/
build/
.cache/

# Ignorar qualquer pasta com esse nome (em qualquer nível)
**/node_modules/

# Ignorar arquivos em uma pasta específica
logs/*.log

# NÃO ignorar (exceção com !)
!.env.example
*.log
!important.log

# Ignorar pasta mas não subpasta
pasta/
!pasta/subpasta/`}
      />

      <h2>.gitignore para Projetos Comuns</h2>
      <CodeBlock
        title=".gitignore para Node.js / JavaScript"
        language="bash"
        code={`# Dependências
node_modules/
.pnp
.pnp.js

# Build
dist/
build/
out/
.next/
.nuxt/

# Variáveis de ambiente
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
.DS_Store
Thumbs.db`}
      />

      <CodeBlock
        title=".gitignore para Python"
        language="bash"
        code={`# Bytecode
__pycache__/
*.py[cod]
*.pyo

# Ambiente virtual
venv/
env/
.venv/

# Distribuição
dist/
build/
*.egg-info/

# Variáveis de ambiente
.env
*.env

# Testes
.pytest_cache/
.coverage
htmlcov/`}
      />

      <h2>Usando o gitignore.io</h2>
      <p>
        O site <strong>gitignore.io</strong> (ou <strong>toptal.com/developers/gitignore</strong>) gera arquivos .gitignore completos para qualquer linguagem ou framework:
      </p>
      <CodeBlock
        title="Gerar .gitignore via linha de comando"
        code={`# Via curl (substitua pelos seus ambientes)
curl -L https://www.toptal.com/developers/gitignore/api/node,react,vscode > .gitignore

# Via GitHub CLI (quando disponível)
# Ou pesquise em github.com/github/gitignore para templates oficiais`}
      />

      <h2>Comandos Úteis</h2>
      <CodeBlock
        title="Gerenciando arquivos ignorados"
        code={`# Ver quais arquivos seriam ignorados
git check-ignore -v arquivo.txt
git status --ignored

# Verificar se um arquivo está sendo ignorado
git check-ignore .env   # retorna o caminho se ignorado

# Parar de rastrear um arquivo já commitado
git rm --cached arquivo.txt
git rm --cached -r pasta/

# Após adicionar ao .gitignore, commite a remoção:
git add .gitignore
git commit -m "chore: adiciona .gitignore"

# Limpar arquivos não rastreados (dry-run)
git clean -n
# Executar de fato (CUIDADO — irreversível!)
git clean -fd`}
      />

      <AlertBox type="warning" title="Cuidado com o .env">
        NUNCA commite arquivos <code>.env</code> com senhas, tokens e chaves de API. Use <code>.env.example</code> com os nomes das variáveis (sem valores) e adicione <code>.env</code> no <code>.gitignore</code> imediatamente ao criar o projeto.
      </AlertBox>
    </PageContainer>
  );
}
