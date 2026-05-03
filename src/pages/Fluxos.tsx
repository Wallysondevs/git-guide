import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Fluxos() {
  return (
    <PageContainer
      title="Fluxos de Trabalho"
      subtitle="Git Flow, GitHub Flow, GitLab Flow e Trunk-based — qual escolher para sua equipe e por quê."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <p>
        O Git é uma ferramenta — <strong>fluxo de trabalho</strong> é como você usa essa ferramenta em equipe. Existem 4 grandes famílias, cada uma adequada a um tamanho de time, ritmo de release e nível de risco diferente. Escolher errado é caro.
      </p>

      <AlertBox type="tip" title="Regra geral">
        Quanto mais rápido você quer entregar, mais simples deve ser o fluxo. <strong>Trunk-based</strong> é o padrão de quem faz deploy 50x ao dia. <strong>Git Flow</strong> é para releases versionadas a cada 1-3 meses.
      </AlertBox>

      <h2>1. GitHub Flow — simples e poderoso</h2>
      <p>O fluxo recomendado pela maioria dos times modernos. Uma branch <code>main</code> sempre deployable, branches de feature curtas, deploy contínuo.</p>

      <CodeBlock
        title="Fluxo"
        language="markdown"
        code={`main:    A───B───C───────G───H ← sempre deployable
              \\         /
feat-x:        D───E───F (PR aberto, revisado, mergeado)

Regras:
1. main é sagrada e sempre deployable
2. Crie branch curta a partir de main
3. Commit, push, abra PR
4. CI roda, time revisa
5. Após aprovado: squash merge em main
6. Deploy automático
7. Delete branch
`}
      />

      <CodeBlock
        title="Implementação"
        language="bash"
        code={`# 1. Comece de main atualizada
git switch main && git pull

# 2. Crie branch
git switch -c feat/AUTH-123-mfa

# 3. Trabalhe e commite
git add -p && git commit -m "feat(auth): adiciona TOTP"

# 4. Push e PR
git push -u origin feat/AUTH-123-mfa
gh pr create --fill

# 5. Atualize com main se necessário
git fetch origin main && git rebase origin/main
git push --force-with-lease

# 6. Após merge
gh pr merge --squash --delete-branch
git switch main && git pull
`}
      />

      <p><strong>Quando usar:</strong> Times pequenos a médios (≤ 50 devs), SaaS, deploy contínuo, releases não-versionadas.</p>

      <h2>2. Trunk-based Development</h2>
      <p>O extremo do GitHub Flow. Branches super-curtas (≤ 1 dia) ou direto na main com feature flags. É o que Google, Facebook, Netflix usam.</p>

      <CodeBlock
        title="Fluxo"
        language="markdown"
        code={`main:    A───B───C───D───E───F───G ← branches duram horas, não dias

Regras:
1. Branches morrem em ≤ 1 dia
2. Mudanças incompletas vão atrás de feature flag
3. CI roda em CADA commit
4. Pair programming reduz necessidade de PR
5. Deploys múltiplos por dia
`}
      />

      <CodeBlock
        title="Feature flag — exemplo"
        language="javascript"
        code={`// Em vez de bloquear merge até feature pronta, escondemos atrás de flag

function checkout(user) {
  if (featureFlag('new_payment_flow', user)) {
    return newCheckout(user);   // 5% dos users
  }
  return legacyCheckout(user);
}

// Quando estiver pronto e validado:
// 1. Aumenta % gradualmente (canary)
// 2. Remove código legado
// 3. Remove a flag
`}
      />

      <p><strong>Quando usar:</strong> Times grandes (50+ devs), engenharia disciplinada, CI maduro, cobertura alta.</p>

      <h2>3. Git Flow — o clássico</h2>
      <p>Criado por Vincent Driessen em 2010. Múltiplas branches de longa duração: <code>main</code>, <code>develop</code>, <code>release/*</code>, <code>hotfix/*</code>, <code>feature/*</code>. Mais cerimônia, mais controle.</p>

      <CodeBlock
        title="Fluxo"
        language="markdown"
        code={`main:        A───────────────M───────────H ← só releases (tags v1.0, v1.0.1)
              \\               /  \\         /
release/1.0:   \\          R───R'  \\       /
                \\        /         \\     /
develop:    A───B───C───D───E───────F───G ← integração de features
                \\       /   \\     /
feature/x:       D───E       \\   /
feature/y:               H───I

Branches:
  main        → produção (estável, com tags)
  develop     → integração (próxima release)
  feature/*   → novas features (saem de develop)
  release/*   → preparação de release (saem de develop, vão pra main+develop)
  hotfix/*    → fixes urgentes (saem de main, vão pra main+develop)
`}
      />

      <CodeBlock
        title="git-flow CLI"
        language="bash"
        code={`# Instalar
brew install git-flow-avh
sudo apt install git-flow

# Inicializar
git flow init        # responde aos prompts

# Feature
git flow feature start nova-feature
# ... commits ...
git flow feature finish nova-feature       # merge em develop, deleta branch

# Release
git flow release start 1.5.0
# ... ajustes finais, bump versão ...
git flow release finish 1.5.0              # merge em main + develop, cria tag

# Hotfix
git flow hotfix start 1.5.1
# ... fix ...
git flow hotfix finish 1.5.1               # merge em main + develop, tag
`}
      />

      <AlertBox type="warning" title="Git Flow caiu de moda">
        Em 2020 o próprio criador disse que <strong>NÃO usaria Git Flow hoje</strong> para a maioria dos projetos web. Ainda é válido para software com releases versionadas (apps mobile, SDKs, libs), mas para SaaS prefira GitHub Flow ou Trunk-based.
      </AlertBox>

      <h2>4. GitLab Flow</h2>
      <p>Híbrido: GitHub Flow + branches de ambiente. Adequado quando você tem múltiplos ambientes (staging, production) e quer rastreio claro.</p>

      <CodeBlock
        title="Variante 1: environment branches"
        language="markdown"
        code={`main:        A───B───C───D───E───F ← integração
                  \\           \\
pre-prod:          B───────────E    ← staging
                                \\
production:                      E  ← prod

Deploy fluindo: main → pre-prod → production
Cherry-pick ou merge entre elas
Hotfix vai pra production e cherry-pick de volta
`}
      />

      <CodeBlock
        title="Variante 2: release branches"
        language="markdown"
        code={`main:        A───B───C───D───E ← desenvolvimento
                  \\         \\
release/1.5:       B─────────D ← se torna v1.5.x
release/1.6:                 E ← se torna v1.6.x

Cada release tem sua branch para hotfixes.
Útil quando suporta múltiplas versões em produção.
`}
      />

      <p><strong>Quando usar:</strong> Software self-hosted vendido a clientes (precisa manter v1, v2, v3 simultaneamente).</p>

      <h2>Comparativo</h2>
      <CodeBlock
        title="Tabela de decisão"
        language="markdown"
        code={`                        GitHub  Trunk    Git    GitLab
                        Flow    Based    Flow   Flow

Branches longas         1       1        4+     2-3
Cerimônia               Baixa   Mínima   Alta   Média
Velocidade de deploy    Alta    Máxima   Baixa  Média
Cobertura de testes     Alta    Crítica  Média  Alta
Feature flags           Útil    Crítico  Raro   Útil
Tamanho ideal de time   ≤ 50    ≤ ∞      ≤ 30   ≤ 50
Releases versionadas    Não     Não      Sim    Sim
Múltiplos ambientes     1-2     1        1-2    3+
`}
      />

      <h2>Padrões transversais (para qualquer fluxo)</h2>

      <h3>Branch protection rules</h3>
      <CodeBlock
        title="Mínimo recomendado para main"
        language="markdown"
        code={`✓ Require pull request before merging
  ✓ Require 1+ approval
  ✓ Dismiss stale reviews on new commits

✓ Require status checks
  ✓ ci/test, ci/lint, ci/build
  ✓ Require branches up-to-date

✓ Require signed commits        (em projetos críticos)
✓ Require linear history        (com squash merge)
✗ Allow force push              (mantenha DESLIGADO)
✗ Allow deletions
`}
      />

      <h3>Convenção de commits</h3>
      <p>Adote <Link href="/conventional-commits">Conventional Commits</Link> em qualquer fluxo. Habilita changelog automático, semantic-release e clareza no histórico.</p>

      <h3>Estratégia de merge</h3>
      <CodeBlock
        title="Recomendações"
        language="markdown"
        code={`Squash merge
  ✓ Padrão para PRs com múltiplos "wip"
  ✓ 1 PR = 1 commit em main
  ✓ Histórico ultra-limpo

Rebase merge
  ✓ Histórico linear preservando commits atômicos
  ✓ Bom em times disciplinados

Merge commit
  ✓ Útil para integrar releases (Git Flow)
  ✗ Histórico ramificado, mais difícil de seguir
`}
      />

      <h2>Anti-patterns comuns</h2>
      <ul>
        <li><strong>Branches que vivem semanas/meses</strong> — vira inferno de conflitos.</li>
        <li><strong>Merge direto em main sem PR</strong> — sem code review.</li>
        <li><strong>Push --force em main</strong> — perde trabalho de outros.</li>
        <li><strong>Commits sem padrão</strong> — histórico vira ruído.</li>
        <li><strong>"Branch develop" eterna</strong> divergindo de main — pesadelo de merge.</li>
        <li><strong>Reverter merge em vez de fix-forward</strong> — quebra cherry-picks futuros.</li>
      </ul>

      <h2>Workflow recomendado para 90% dos projetos</h2>
      <CodeBlock
        title="GitHub Flow + Conventional Commits"
        language="bash"
        code={`# Setup inicial (uma vez)
git config --global pull.rebase true
git config --global push.autoSetupRemote true
git config --global rerere.enabled true

# No GitHub:
# - Branch protection em main
# - Require PR + 1 approval + CI green
# - Squash merge como default

# Workflow diário
git switch main && git pull
git switch -c feat/XYZ-123-descricao
# ... commits seguindo Conventional Commits ...
git push -u origin HEAD
gh pr create --fill --reviewer maria
# (CI verde, review aprovado)
gh pr merge --squash --delete-branch
git switch main && git pull
git fetch --prune
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Decisão rápida"
        language="markdown"
        code={`SaaS web/mobile, 5-50 devs       → GitHub Flow ★
Time grande, deploy contínuo     → Trunk-based
SDK / app mobile com releases    → Git Flow
Software self-hosted multi-versão → GitLab Flow

Em qualquer caso:
  ✓ Branch protection em main
  ✓ Conventional Commits
  ✓ Squash merge default
  ✓ CI obrigatório
  ✓ Linear history
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/conventional-commits">Conventional Commits</Link> — base para qualquer fluxo</li>
        <li><Link href="/pull-requests">Pull Requests</Link> — coração do GitHub Flow</li>
        <li><Link href="/dicas">Dicas e Truques</Link> — produtividade no dia a dia</li>
      </ul>
    </PageContainer>
  );
}
