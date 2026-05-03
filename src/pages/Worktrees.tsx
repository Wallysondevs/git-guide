import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Worktrees() {
  return (
    <PageContainer
      title="Worktrees"
      subtitle="Múltiplos branches checados em pastas paralelas — sem stash, sem context switch, sem dor."
      difficulty="avancado"
      timeToRead="11 min"
    >
      <p>
        <strong>Git worktrees</strong> resolvem um problema clássico: você está no meio de uma feature, precisa olhar outra branch, mas não quer parar tudo. Em vez de <code>stash + switch</code>, você abre a outra branch em <em>outra pasta</em>, paralela. Como ter múltiplos clones, mas compartilhando o mesmo <code>.git</code> (e portanto o mesmo histórico).
      </p>

      <AlertBox type="tip" title="Quando vale a pena">
        Code review de PRs sem perder seu trabalho. Build de produção em paralelo ao desenvolvimento. Trabalhar em hotfix urgente sem mexer na feature. Comparar comportamento entre versões.
      </AlertBox>

      <h2>O básico</h2>
      <CodeBlock
        title="Adicionando uma worktree"
        language="bash"
        code={`# Estrutura inicial
~/projeto/                 ← worktree principal (main)
└── .git/                  ← repositório real

# Adicionar worktree para outra branch
git worktree add ../projeto-feature feature/x

# Agora:
~/projeto/                 ← main (continua aqui)
~/projeto-feature/         ← feature/x (nova worktree)
   └── .git                ← arquivo (não pasta) apontando para o real

# Ambas compartilham objetos e configs
`}
      />

      <h2>Listando worktrees</h2>
      <CodeBlock
        title="git worktree list"
        language="bash"
        code={`git worktree list
# /home/voce/projeto                a1b2c3d [main]
# /home/voce/projeto-feature        7p8q9r0 [feature/x]
# /home/voce/projeto-hotfix         5l6m7n8 [hotfix/urgente]

# Detalhado
git worktree list --verbose
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Code review sem stash</h3>
      <CodeBlock
        title="Workflow"
        language="bash"
        code={`# Você está mexendo em feature/login (com mudanças não commitadas)
# Maria pede review de PR #123 (branch feature/payments)

# Opção lenta:
git stash push -u -m "wip"
git switch feature/payments
# ... testa ...
git switch feature/login
git stash pop

# Opção worktree (★ instantânea):
git worktree add ../projeto-pr123 origin/feature/payments
cd ../projeto-pr123
npm install                 # talvez precise se package.json difere
npm test
# ... testa ...
cd ../projeto              # volta ao seu trabalho intacto
git worktree remove ../projeto-pr123
`}
      />

      <h3>2. Hotfix urgente em paralelo</h3>
      <CodeBlock
        title="Sem perder contexto"
        language="bash"
        code={`# Em feature/x, no meio de algo grande
# Bug crítico em produção precisa de hotfix em main

git worktree add ../meu-repo-hotfix -b hotfix/urgente main
cd ../meu-repo-hotfix
# ... fix rápido, commit, push ...
gh pr create --fill --label hotfix
cd ../meu-repo
# Continue exatamente onde estava
`}
      />

      <h3>3. Build longo sem bloquear</h3>
      <CodeBlock
        title="Build em background"
        language="bash"
        code={`# Adicionar worktree para build de release
git worktree add ../release-build v1.5.0

# Em outro terminal, rode o build pesado lá
cd ../release-build
npm run build:production    # demora 10 min

# Enquanto isso, continue codando na worktree principal
cd ../meu-repo
`}
      />

      <h3>4. Comparar duas versões side-by-side</h3>
      <CodeBlock
        title="A/B testing manual"
        language="bash"
        code={`git worktree add ../app-v1 v1.0.0
git worktree add ../app-v2 v2.0.0

# Abra editores em ambas, compare comportamento, rode benchmarks
diff -r ../app-v1/src ../app-v2/src
`}
      />

      <h3>5. Worktree para gh-pages (deploy)</h3>
      <CodeBlock
        title="Branch órfã isolada"
        language="bash"
        code={`# Branch gh-pages tem conteúdo TOTALMENTE diferente do main
# Worktree é perfeito para gerenciá-la

git worktree add ../meu-repo-pages gh-pages
cd ../meu-repo-pages
# Aqui só tem index.html, assets do site
# Build do main é copiado para cá e committado
`}
      />

      <h2>Removendo worktrees</h2>
      <CodeBlock
        title="Cleanup"
        language="bash"
        code={`# Remover worktree (apaga a pasta também!)
git worktree remove ../projeto-feature

# Force (se houver mudanças não commitadas)
git worktree remove --force ../projeto-feature

# Remover só a referência (se a pasta já foi deletada manualmente)
git worktree prune

# Listar worktrees "perdidas" (pasta sumiu mas ref ficou)
git worktree list --porcelain
git worktree prune --dry-run
`}
      />

      <h2>Criando worktree de novo branch</h2>
      <CodeBlock
        title="Atalhos"
        language="bash"
        code={`# Worktree + branch novo a partir de main
git worktree add -b feature/nova ../projeto-nova main

# Worktree em detached HEAD (não cria branch)
git worktree add --detach ../projeto-explore HEAD

# Worktree de uma tag
git worktree add ../projeto-v1 v1.0.0

# Worktree rastreando remoto
git worktree add --track -b feature/maria ../projeto-maria origin/feature/maria
`}
      />

      <h2>Limitações importantes</h2>
      <ul>
        <li><strong>Mesma branch em duas worktrees não pode</strong> — Git bloqueia para evitar caos.</li>
        <li><strong>Hooks compartilhados</strong> — todas as worktrees usam <code>.git/hooks/</code> do principal.</li>
        <li><strong>Cuidado com node_modules</strong> — você vai ter uma pasta para cada worktree (espaço!).</li>
        <li><strong>git submodule</strong> precisa de atenção extra (cada worktree precisa de update).</li>
      </ul>

      <AlertBox type="warning" title="Se precisar mesma branch em 2 lugares">
        Use <code>git worktree add --force</code> para forçar (mas você assume os riscos), ou faça <code>git switch --detach</code> em uma das worktrees.
      </AlertBox>

      <h2>Configurações por worktree</h2>
      <CodeBlock
        title="Config independente"
        language="bash"
        code={`# Config local geral (afeta todas as worktrees)
git config --local user.email "..."

# Config SÓ desta worktree
git config --worktree user.email "diferente@empresa.com"

# Habilitar (precisa de feature flag)
git config extensions.worktreeConfig true

# Ver onde está cada config
git config --list --show-origin
`}
      />

      <h2>Workflow profissional</h2>
      <CodeBlock
        title="Setup recomendado"
        language="bash"
        code={`# Estrutura de pastas
~/repos/projeto/              # main worktree (default)
├── .git/                     # repositório real (~ 200MB)
├── src/
└── ...

~/repos/projeto.worktrees/    # pasta para worktrees
├── pr-review/                # use e jogue fora
├── hotfix/
└── release-build/

# Função zsh/bash
worktree-pr() {
  local pr=\$1
  local target="\$(git rev-parse --show-toplevel).worktrees/pr-\$pr"
  gh pr checkout \$pr --branch "pr-\$pr" --detach
  git worktree add "\$target" "pr-\$pr"
  cd "\$target"
}
`}
      />

      <h2>Worktrees para sparse-checkout</h2>
      <CodeBlock
        title="Em monorepos"
        language="bash"
        code={`# Worktree separado com sparse-checkout diferente
git worktree add ../mono-frontend main
cd ../mono-frontend
git sparse-checkout init --cone
git sparse-checkout set apps/web

# Outra worktree, outro escopo
git worktree add ../mono-backend main
cd ../mono-backend
git sparse-checkout init --cone
git sparse-checkout set services/api

# Cada uma vê só sua parte do monorepo
`}
      />

      <h2>Manutenção</h2>
      <CodeBlock
        title="Cuidados"
        language="bash"
        code={`# Verificar integridade
git worktree list

# Reparar worktree movida manualmente
cd /novo/local/projeto-feature
git worktree repair

# Limpar refs órfãs
git worktree prune

# Desabilitar uma worktree temporariamente (lock)
git worktree lock --reason "build em andamento" ../projeto-build

# Reabilitar
git worktree unlock ../projeto-build
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de worktree"
        language="bash"
        code={`git worktree list                       # listar
git worktree add <path> <branch>        # adicionar
git worktree add -b novo <path> base    # branch nova
git worktree add --detach <path> <ref>  # detached HEAD
git worktree remove <path>              # remover
git worktree remove --force <path>      # com mudanças
git worktree prune                      # limpar órfãs
git worktree repair                     # após mover pasta
git worktree lock <path>                # proteger
git worktree unlock <path>

# Não pode mesma branch em duas worktrees (use --force ou --detach)
# Hooks são compartilhados via .git/hooks/
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/branches">Branches</Link> — entenda branches antes de worktrees</li>
        <li><Link href="/clone">Clone</Link> — sparse-checkout combina com worktrees</li>
        <li><Link href="/manutencao">Manutenção</Link> — para repos grandes com muitas worktrees</li>
      </ul>
    </PageContainer>
  );
}
