import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Hooks() {
  return (
    <PageContainer
      title="Git Hooks"
      subtitle="Scripts automáticos que rodam em momentos específicos do ciclo de vida do Git."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <p>
        Git Hooks são scripts executáveis que o Git roda automaticamente em eventos específicos — antes ou depois de commits, pushes, merges, etc. Eles permitem automatizar verificações de qualidade e fluxos de trabalho.
      </p>

      <h2>Hooks Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Hooks do Cliente</h4>
          <ul className="text-sm space-y-1 text-muted-foreground font-mono">
            <li>pre-commit</li>
            <li>prepare-commit-msg</li>
            <li>commit-msg</li>
            <li>post-commit</li>
            <li>pre-push</li>
            <li>pre-rebase</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Hooks do Servidor</h4>
          <ul className="text-sm space-y-1 text-muted-foreground font-mono">
            <li>pre-receive</li>
            <li>update</li>
            <li>post-receive</li>
          </ul>
        </div>
      </div>

      <h2>Onde ficam os Hooks</h2>
      <CodeBlock
        title="Localização dos hooks"
        code={`# Hooks ficam em .git/hooks/
ls .git/hooks/

# O Git cria exemplos com .sample (desabilitados)
# Para ativar: remova o .sample ou crie um novo arquivo

# Exemplos de hooks desabilitados por padrão:
# pre-commit.sample
# commit-msg.sample
# pre-push.sample`}
      />

      <h2>Criando um Hook Pre-commit</h2>
      <CodeBlock
        title="Hook que roda linting antes de commitar"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/pre-commit

# Rodar ESLint nos arquivos staged
echo "Rodando ESLint..."
npx eslint --ext .js,.ts,.tsx $(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|tsx)$')

# Se ESLint falhar, aborta o commit
if [ $? -ne 0 ]; then
  echo "ESLint falhou! Corrija os erros antes de commitar."
  exit 1
fi

echo "Tudo OK!"`}
      />

      <CodeBlock
        title="Ativando o hook"
        code={`# Crie o arquivo e torne-o executável
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
npx eslint . && npx tsc --noEmit
EOF

chmod +x .git/hooks/pre-commit

# Testar o hook
git commit -m "teste"  # O hook rodará antes do commit`}
      />

      <h2>Hook commit-msg — Validar Mensagens</h2>
      <CodeBlock
        title="Validar formato da mensagem de commit"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/commit-msg
# Valida que a mensagem segue o padrão Conventional Commits

COMMIT_MSG=$(cat "$1")
PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|build|ci|revert)(\(.+\))?: .{1,72}"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "❌ Mensagem de commit inválida!"
  echo ""
  echo "Formato esperado: tipo(escopo): descrição"
  echo "Exemplo: feat(auth): adiciona login com Google"
  echo ""
  echo "Tipos válidos: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi`}
      />

      <h2>Husky — Hooks no Package.json</h2>
      <p>
        O <strong>Husky</strong> é uma ferramenta que facilita o gerenciamento de hooks em projetos Node.js, permitindo compartilhá-los com a equipe via <code>package.json</code>:
      </p>

      <CodeBlock
        title="Instalando e configurando Husky"
        code={`# Instalar Husky
npm install --save-dev husky

# Ativar hooks
npx husky init

# Editar o hook pre-commit
echo "npx lint-staged" > .husky/pre-commit

# Configurar lint-staged no package.json
# "lint-staged": {
#   "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
#   "*.{css,scss}": ["prettier --write"]
# }`}
      />

      <AlertBox type="warning" title="Hooks locais não são compartilhados">
        Os hooks em <code>.git/hooks/</code> não são versionados pelo Git — cada desenvolvedor precisa configurá-los manualmente. Use Husky ou similar para garantir que toda a equipe use os mesmos hooks.
      </AlertBox>
    </PageContainer>
  );
}
