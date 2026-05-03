import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Hooks() {
  return (
    <PageContainer
      title="Git Hooks"
      subtitle="Scripts que rodam automaticamente em eventos do Git — bloquear commits ruins, rodar testes, formatar código antes do push."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Hook"}</strong> {' — '} {"script disparado por evento Git (pre-commit, pre-push, etc)."}
          </li>
        <li>
            <strong>{".git/hooks/"}</strong> {' — '} {"pasta local; não é versionada por padrão."}
          </li>
        <li>
            <strong>{"Husky"}</strong> {' — '} {"gerencia hooks no JS/TS, versionados via package.json."}
          </li>
        <li>
            <strong>{"lint-staged"}</strong> {' — '} {"roda linter só nos arquivos staged."}
          </li>
        <li>
            <strong>{"pre-receive"}</strong> {' — '} {"no servidor: rejeita pushes inválidos."}
          </li>
        </ul>
        <p>
        <strong>Hooks</strong> são scripts que o Git executa em momentos específicos: antes de um commit, depois de um merge, antes de um push. Eles são a base de toda automação local — desde lint até validação de mensagens, geração de docs e bloqueio de segredos.
      </p>

      <AlertBox type="tip" title="Onde moram">
        Por padrão em <code>.git/hooks/</code> — que <strong>não é versionado</strong>. Para compartilhar hooks com o time, use <code>core.hooksPath</code> apontando para uma pasta versionada.
      </AlertBox>

      <h2>Estrutura de um hook</h2>
      <CodeBlock
        title="Anatomia"
        language="bash"
        code={`# Hooks são scripts executáveis em qualquer linguagem
ls .git/hooks/
# applypatch-msg.sample
# commit-msg.sample
# pre-commit.sample
# pre-push.sample
# ... etc

# Os .sample não rodam — só servem de exemplo
# Para ATIVAR, remova o .sample e dê chmod +x

cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
nano .git/hooks/pre-commit
`}
      />

      <h2>Os hooks mais úteis</h2>
      <CodeBlock
        title="Mapa rápido"
        language="markdown"
        code={`CLIENT-SIDE (no seu computador)
  pre-commit          → ANTES do editor abrir / commit ser feito
  prepare-commit-msg  → Antes do editor de mensagem abrir (preencher template)
  commit-msg          → Validar a mensagem de commit
  post-commit         → Após commit (notificações, logs)
  pre-push            → Antes de push para remoto
  pre-rebase          → Antes de rebase começar
  post-merge          → Após merge concluído (npm install, migrations)
  post-checkout       → Após troca de branch (limpar caches)

SERVER-SIDE (no servidor Git)
  pre-receive         → Antes de aceitar push
  update              → Para cada branch que vai ser atualizada
  post-receive        → Após aceitar push (notificar, deploy)
`}
      />

      <h2>pre-commit — o mais útil</h2>
      <CodeBlock
        title="Bloqueia console.log e prettier check"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/pre-commit

# Bloquear console.log em arquivos staged
if git diff --cached --name-only --diff-filter=ACM | xargs grep -l 'console\\.log' 2>/dev/null; then
  echo "❌ console.log detectado nos arquivos staged. Remova antes de commitar."
  exit 1
fi

# Rodar prettier check
npx prettier --check $(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|jsx|tsx|css|md)$') 2>/dev/null

if [ $? -ne 0 ]; then
  echo "❌ Prettier check falhou. Rode: npx prettier --write ."
  exit 1
fi

# Rodar ESLint só nos arquivos staged
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|jsx|tsx)$')
if [ -n "$files" ]; then
  npx eslint $files
  if [ $? -ne 0 ]; then
    echo "❌ ESLint encontrou problemas."
    exit 1
  fi
fi

exit 0
`}
      />

      <CodeBlock
        title="Bloquear arquivos grandes (> 5MB)"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/pre-commit

max_size=5242880    # 5MB em bytes
oversize=$(git diff --cached --name-only --diff-filter=ACM | while read f; do
  if [ -f "$f" ]; then
    size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
    if [ "$size" -gt "$max_size" ]; then
      echo "$f ($size bytes)"
    fi
  fi
done)

if [ -n "$oversize" ]; then
  echo "❌ Arquivos grandes detectados:"
  echo "$oversize"
  echo "Use Git LFS ou ajuste .gitignore"
  exit 1
fi
`}
      />

      <CodeBlock
        title="Detectar segredos vazados"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/pre-commit

# Padrões de segredos
patterns='(api[_-]?key|secret|password|token|aws[_-]?access)\\s*[=:]\\s*["\\x27]?[a-zA-Z0-9]{20,}'

leaks=$(git diff --cached -U0 | grep -iE "$patterns" | grep -v '^---\\|^+++')

if [ -n "$leaks" ]; then
  echo "❌ Possível segredo detectado:"
  echo "$leaks"
  echo ""
  echo "Para forçar (NÃO recomendado): git commit --no-verify"
  exit 1
fi
`}
      />

      <h2>commit-msg — validar mensagens</h2>
      <CodeBlock
        title="Conventional Commits validator"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/commit-msg
# Recebe o caminho do arquivo de mensagem como $1

msg=$(cat "$1")
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\([a-z0-9-]+\\))?!?: .{1,72}$'

# Pula se for merge ou revert
if echo "$msg" | grep -qE '^(Merge|Revert)'; then
  exit 0
fi

if ! echo "$msg" | head -1 | grep -qE "$pattern"; then
  echo "❌ Mensagem fora do padrão Conventional Commits"
  echo ""
  echo "Formato: tipo(escopo opcional): descrição (até 72 chars)"
  echo ""
  echo "Tipos válidos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
  echo ""
  echo "Exemplos:"
  echo "  feat: adiciona login"
  echo "  fix(auth): corrige timeout"
  echo "  refactor!: remove API legada"
  exit 1
fi
`}
      />

      <h2>pre-push — testes antes do push</h2>
      <CodeBlock
        title="Roda CI local"
        language="bash"
        code={`#!/bin/sh
# .git/hooks/pre-push

# Recebe stdin: <local-ref> <local-sha> <remote-ref> <remote-sha>
# Por branch sendo pushado

# Bloqueia push em main direto
protected="main master production"
while read local_ref local_sha remote_ref remote_sha; do
  branch=\${remote_ref##refs/heads/}
  for p in $protected; do
    if [ "$branch" = "$p" ]; then
      echo "❌ Push direto em '$branch' bloqueado. Use Pull Request."
      exit 1
    fi
  done
done

# Roda testes
echo "🧪 Rodando testes..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Testes falharam. Push cancelado."
  exit 1
fi

# Roda build
echo "🏗  Rodando build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build falhou. Push cancelado."
  exit 1
fi
`}
      />

      <h2>Compartilhando hooks com o time</h2>
      <CodeBlock
        title="core.hooksPath versionado"
        language="bash"
        code={`# 1. Crie pasta versionada
mkdir .githooks

# 2. Mova/crie hooks lá dentro
cat > .githooks/pre-commit <<'EOF'
#!/bin/sh
npm run lint
EOF
chmod +x .githooks/pre-commit

# 3. Configure o Git pra usar a pasta
git config core.hooksPath .githooks

# 4. Comite — todo mundo do time herda
git add .githooks
git commit -m "chore: hooks compartilhados"

# 5. Para que NOVOS clones aplique automaticamente, adicione um setup script:
cat > scripts/setup.sh <<'EOF'
#!/bin/sh
git config core.hooksPath .githooks
echo "✓ Hooks configurados"
EOF

# Use postinstall do package.json:
# "scripts": { "postinstall": "sh scripts/setup.sh" }
`}
      />

      <h2>Husky — gerenciador de hooks moderno</h2>
      <CodeBlock
        title="Para projetos Node.js"
        language="bash"
        code={`# Instalar
npm install --save-dev husky lint-staged

# Inicializar
npx husky init

# Adicionar hook
echo "npx lint-staged" > .husky/pre-commit

# package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{md,json,yml}": ["prettier --write"]
  }
}

# Commit + push do .husky/ — todo mundo recebe
`}
      />

      <h2>pre-commit framework — universal</h2>
      <CodeBlock
        title="Para qualquer linguagem"
        language="bash"
        code={`# pip install pre-commit  ou  brew install pre-commit
# Cria .pre-commit-config.yaml na raiz

cat > .pre-commit-config.yaml <<'EOF'
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
        args: ['--maxkb=500']
      - id: detect-private-key

  - repo: https://github.com/psf/black
    rev: 24.0.0
    hooks:
      - id: black

  - repo: https://github.com/commitizen-tools/commitizen
    rev: v3.13.0
    hooks:
      - id: commitizen
        stages: [commit-msg]
EOF

# Instalar os hooks
pre-commit install
pre-commit install --hook-type commit-msg

# Rodar manualmente em todos os arquivos
pre-commit run --all-files
`}
      />

      <h2>post-merge — automação útil</h2>
      <CodeBlock
        title="Auto-install após pull"
        language="bash"
        code={`#!/bin/sh
# .githooks/post-merge

# Detecta se package.json mudou e roda npm install
changed_files=$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)
if echo "$changed_files" | grep -q "package-lock.json"; then
  echo "📦 package-lock.json mudou — rodando npm ci"
  npm ci
fi

# Detecta migrations
if echo "$changed_files" | grep -q "^migrations/"; then
  echo "🗄️  Migrations novas — rodando..."
  npm run db:migrate
fi
`}
      />

      <h2>Pulando hooks (quando necessário)</h2>
      <CodeBlock
        title="--no-verify"
        language="bash"
        code={`# Pular pre-commit + commit-msg
git commit --no-verify -m "..."
git commit -n -m "..."

# Pular pre-push
git push --no-verify

# Variável de ambiente
HUSKY=0 git commit -m "..."
`}
      />

      <AlertBox type="warning" title="Use --no-verify com responsabilidade">
        Hooks existem por razões. Pular ocasionalmente é ok (commit "wip" no fim do dia). Pular sempre vira "para que serve isso então?".
      </AlertBox>

      <h2>Hooks server-side (auto-hospedado)</h2>
      <CodeBlock
        title="pre-receive — bloquear no servidor"
        language="bash"
        code={`#!/bin/sh
# hooks/pre-receive (em repo bare no servidor)

while read oldrev newrev refname; do
  branch=\${refname##refs/heads/}

  # Bloqueia force-push em main
  if [ "$branch" = "main" ] && [ "$oldrev" != "0000000000000000000000000000000000000000" ]; then
    base=$(git merge-base "$oldrev" "$newrev")
    if [ "$base" != "$oldrev" ]; then
      echo "❌ Force-push em main bloqueado"
      exit 1
    fi
  fi

  # Validar todas as mensagens dos novos commits
  for sha in $(git rev-list "$oldrev..$newrev"); do
    msg=$(git log -1 --format=%s "$sha")
    if ! echo "$msg" | grep -qE '^(feat|fix|docs|chore|refactor|perf|test|ci|build)(\\(.+\\))?!?: '; then
      echo "❌ Commit $sha fora do padrão Conventional Commits"
      exit 1
    fi
  done
done
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Hooks essenciais"
        language="bash"
        code={`# Ativar (remover .sample, chmod +x)
chmod +x .git/hooks/<hook>

# Compartilhar
mkdir .githooks
git config core.hooksPath .githooks

# Pular
git commit --no-verify

# Husky (Node.js)
npm i -D husky lint-staged
npx husky init

# pre-commit (universal)
pip install pre-commit
pre-commit install

# Hooks mais úteis:
# pre-commit, commit-msg, pre-push, post-merge
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/configuracao">Configurações</Link> — outras automações</li>
        <li><Link href="/conventional-commits">Conventional Commits</Link> — padrão para validar</li>
        <li><Link href="/signing">Signing</Link> — hooks que exigem assinatura</li>
      </ul>
    </PageContainer>
  );
}
