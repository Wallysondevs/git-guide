import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Gitignore() {
  return (
    <PageContainer
      title=".gitignore"
      subtitle="Bloqueie arquivos do tracking — segredos, builds, caches e logs. A diferença entre um repo limpo e um lixão."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{".gitignore"}</strong> {' — '} {"padrões de arquivos que o Git ignora."}
          </li>
        <li>
            <strong>{"Globs"}</strong> {' — '} {"*, **, !negação, /raiz, dir/."}
          </li>
        <li>
            <strong>{"Local vs global"}</strong> {' — '} {"~/.gitignore_global para padrões pessoais (DS_Store)."}
          </li>
        <li>
            <strong>{"gitignore.io"}</strong> {' — '} {"gerador online por linguagem/IDE."}
          </li>
        <li>
            <strong>{"Já rastreado?"}</strong> {' — '} {"git rm --cached arquivo, depois adicione ao .gitignore."}
          </li>
        </ul>
        <p>
        O <code>.gitignore</code> é um arquivo de texto que diz ao Git "esses arquivos eu nem quero ver". Ele protege você de commitar acidentalmente segredos, dependências (<code>node_modules</code>, <code>venv</code>) ou artefatos de build — coisas que poluem o repo e causam conflitos.
      </p>

      <AlertBox type="warning" title="Configure ANTES do primeiro commit">
        Se você commitou algo errado e depois adicionou ao <code>.gitignore</code>, o arquivo continua no histórico. Veja a seção "Removendo arquivos já commitados".
      </AlertBox>

      <h2>Sintaxe básica</h2>
      <CodeBlock
        title=".gitignore — padrões"
        language="bash"
        code={`# Comentário começa com #

# Arquivo específico
config.local.json

# Todos os arquivos com extensão
*.log
*.tmp

# Pasta inteira (e tudo dentro)
node_modules/
dist/
build/

# Arquivo só na raiz (com / inicial)
/secret.env

# Arquivo em qualquer lugar (sem / inicial)
.DS_Store
Thumbs.db

# Subpastas específicas
src/**/temp/
docs/**/*.draft.md

# Arquivos numa pasta específica
logs/*.log
!logs/.gitkeep         ← exceção: este SIM é trackeado

# Negação (descomenta exclusão anterior)
*.log
!important.log         ← este sim, mesmo casando *.log

# Coringas
[Tt]humbs.db          ← T ou t
config.??.json        ← config.en.json, config.pt.json
docs/[!._]*           ← qualquer coisa que NÃO comece com . ou _
`}
      />

      <h2>Templates por linguagem</h2>
      <p>O GitHub mantém uma coleção oficial em <a href="https://github.com/github/gitignore" target="_blank" rel="noopener noreferrer">github/gitignore</a>. Use como ponto de partida.</p>

      <CodeBlock
        title="Node.js"
        language="bash"
        code={`# Dependências
node_modules/
.pnp/
.pnp.js

# Builds
dist/
build/
out/
.next/
.nuxt/
.cache/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
pnpm-debug.log*

# Testes
coverage/
.nyc_output/

# Editores
.vscode/
.idea/
*.swp
.DS_Store

# Env
.env
.env.local
.env.*.local
!.env.example
`}
      />

      <CodeBlock
        title="Python"
        language="bash"
        code={`# Bytecode
__pycache__/
*.py[cod]
*$py.class

# Distribuição
*.egg-info/
dist/
build/
*.egg

# Venv
venv/
env/
.venv/
ENV/
.python-version

# Testes
.pytest_cache/
.coverage
htmlcov/
.tox/

# Jupyter
.ipynb_checkpoints/

# Editores
.vscode/
.idea/
*.swp
`}
      />

      <CodeBlock
        title="Genérico — todo projeto"
        language="bash"
        code={`# OS
.DS_Store
Thumbs.db
desktop.ini
.Trashes

# Editores
.vscode/
.idea/
*.swp
*.swo
*~
.netrwhist

# Secrets — NUNCA commitar
.env
.env.local
*.pem
*.key
secrets/
credentials.json

# Backup
*.bak
*.backup
`}
      />

      <h2>Hierarquia de .gitignore</h2>
      <p>Você pode ter <code>.gitignore</code> em <strong>qualquer</strong> pasta do projeto — eles são aplicados cumulativamente.</p>

      <CodeBlock
        title="Estrutura típica"
        language="markdown"
        code={`projeto/
├── .gitignore                 ← raiz: regras do projeto inteiro
├── src/
│   └── .gitignore             ← regras específicas de src/
├── docs/
│   └── .gitignore             ← regras específicas de docs/
└── tests/
    └── fixtures/
        └── .gitignore         ← regras locais
`}
      />

      <h2>gitignore global — para todas as máquinas</h2>
      <CodeBlock
        title="Configuração de usuário"
        language="bash"
        code={`# Crie ~/.gitignore_global com regras pessoais
cat > ~/.gitignore_global <<'EOF'
# Editores que SÓ EU uso (outros podem usar outros)
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Backups pessoais
*~
.swp
.cursor/
EOF

# Configure o Git para usá-lo
git config --global core.excludesFile ~/.gitignore_global
`}
      />

      <AlertBox type="note" title="Por que gitignore global">
        Coisas como <code>.DS_Store</code> ou <code>.idea/</code> são <strong>do seu setup</strong>, não do projeto. Não force seu time a mantê-las no <code>.gitignore</code> dele — bote no global.
      </AlertBox>

      <h2>Ignore local — só nesta cópia</h2>
      <CodeBlock
        title=".git/info/exclude"
        language="bash"
        code={`# Não-versionado, válido só para SEU clone
echo "experiment.local.js" >> .git/info/exclude

# Útil para arquivos temporários que você não quer commitar
# nem botar no .gitignore (porque é específico da sua máquina)
`}
      />

      <h2>Removendo arquivos já commitados</h2>
      <CodeBlock
        title="Quando o estrago já foi feito"
        language="bash"
        code={`# Cenário: você commitou node_modules/ por engano
# Adicionar ao .gitignore agora NÃO remove o que já está rastreado

# 1. Adicione ao .gitignore
echo "node_modules/" >> .gitignore

# 2. Remova do tracking (mas mantém no disco!)
git rm -r --cached node_modules/

# 3. Confirme
git status
# deleted: node_modules/...

# 4. Commite
git add .gitignore
git commit -m "chore: ignora node_modules"
git push

# Para arquivo único:
git rm --cached config.local.json
echo "config.local.json" >> .gitignore
git commit -am "chore: ignora config local"
`}
      />

      <h2>Removendo do HISTÓRICO completo</h2>
      <p>Se você commitou um <strong>segredo</strong> (API key, senha), removê-lo do tracking não basta — ele ainda está em commits antigos. Para limpar de verdade, use <code>git filter-repo</code>.</p>

      <CodeBlock
        title="git filter-repo (★ moderno, substitui filter-branch)"
        language="bash"
        code={`# Instalar
brew install git-filter-repo
pip install git-filter-repo

# Remover arquivo de TODO o histórico
git filter-repo --invert-paths --path config/secrets.json

# Remover por padrão
git filter-repo --invert-paths --path-glob '*.pem'

# Remover linha contendo certo texto
git filter-repo --replace-text <(echo 'API_KEY=sk-abc===>REMOVED')

# IMPORTANTE: isso reescreve TODO o histórico
# Force push e avise o time:
git push --force --all
git push --force --tags
`}
      />

      <AlertBox type="danger" title="Segredo vazado: ROTACIONE">
        Mesmo após limpar do histórico, considere o segredo <strong>comprometido</strong>. Ele já passou pelos clones de outras pessoas, CIs, backups. <strong>Sempre</strong> revogue/rotacione a chave/senha imediatamente.
      </AlertBox>

      <h2>Verificando se um arquivo está ignorado</h2>
      <CodeBlock
        title="git check-ignore"
        language="bash"
        code={`# É ignorado?
git check-ignore -v node_modules/express/package.json
# .gitignore:1:node_modules/   node_modules/express/package.json

# Listar arquivos ignorados que existem no working
git ls-files --others --ignored --exclude-standard

# Listar arquivos NÃO trackeados (incluindo os ignorados)
git status --ignored
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Manter pasta vazia no Git</h3>
      <CodeBlock
        title=".gitkeep convention"
        language="bash"
        code={`# Git não rastreia pastas vazias. Convenção:
mkdir logs
touch logs/.gitkeep

# E no .gitignore:
logs/*
!logs/.gitkeep
# (ignora tudo dentro de logs/, exceto .gitkeep)
`}
      />

      <h3>2. Forçar tracking de um arquivo ignorado</h3>
      <CodeBlock
        title="-f"
        language="bash"
        code={`# Se .env está no .gitignore mas você quer commitar UMA versão exemplo:
git add -f .env.example
`}
      />

      <h3>3. Ignorar mudanças LOCAIS em arquivo já trackeado</h3>
      <CodeBlock
        title="assume-unchanged e skip-worktree"
        language="bash"
        code={`# Cenário: config.json é trackeado mas você modifica localmente
# (não quer commitar suas mudanças nem que apareça no status)

# Opção A — assume-unchanged (Git PODE atualizar do remoto)
git update-index --assume-unchanged config.json
# Reverter:
git update-index --no-assume-unchanged config.json

# Opção B — skip-worktree (Git PROTEGE de qualquer atualização)
git update-index --skip-worktree config.json
# Reverter:
git update-index --no-skip-worktree config.json

# Listar arquivos com essas flags
git ls-files -v | grep "^[hsS]"
`}
      />

      <AlertBox type="warning" title="assume-unchanged é gambiarra">
        Esses comandos são <strong>workarounds</strong>, não solução real. A solução correta para configs locais é commitar um <code>config.example.json</code> e ignorar <code>config.local.json</code>.
      </AlertBox>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title=".gitignore na prática"
        language="bash"
        code={`# Sintaxe
*.log              # arquivos por extensão
node_modules/      # pasta
/secret            # só na raiz
**/temp/           # qualquer profundidade
!important.log     # exceção

# Comandos
git check-ignore -v <arquivo>          # checar regra
git ls-files --ignored --exclude-std   # listar ignorados
git rm -r --cached <pasta>             # destrackear
git status --ignored                   # ver tudo

# Configs
git config --global core.excludesFile ~/.gitignore_global
.git/info/exclude                       # ignore local

# Histórico (segredo vazado)
git filter-repo --invert-paths --path X
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/configuracao">Configurações do Git</Link> — gitignore global e mais</li>
        <li><Link href="/lfs">Git LFS</Link> — alternativa para arquivos grandes (em vez de ignorar)</li>
        <li><Link href="/recuperacao">Recuperação</Link> — se commitou segredo</li>
      </ul>
    </PageContainer>
  );
}
