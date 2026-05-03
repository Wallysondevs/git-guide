import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function PullRequests() {
  return (
    <PageContainer
      title="Pull Requests"
      subtitle="O ritual social do código moderno: como abrir, revisar e mergear PRs que viram parte limpa do histórico."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"PR"}</strong> {' — '} {"Pull Request — proposta de merge revisada."}
          </li>
        <li>
            <strong>{"Code review"}</strong> {' — '} {"comentários inline + aprovação obrigatória."}
          </li>
        <li>
            <strong>{"Draft PR"}</strong> {' — '} {"marca como work-in-progress; não notifica reviewers."}
          </li>
        <li>
            <strong>{"Linked issue"}</strong> {' — '} {"PR fecha automaticamente issue: \"Closes #123\"."}
          </li>
        <li>
            <strong>{"Squash/merge/rebase"}</strong> {' — '} {"3 estratégias para integrar PR."}
          </li>
        </ul>
        <p>
        Um <strong>Pull Request</strong> (ou Merge Request no GitLab) é uma proposta de mudança: "olha, fiz isso aqui, dá uma olhada e me diga se posso mergear?". Ele combina código + discussão + revisão + CI em um só lugar — é onde o trabalho vira de fato parte do projeto.
      </p>

      <AlertBox type="tip" title="Boa cultura de PR">
        PRs pequenos (≤ 400 linhas) são revisados em minutos. PRs gigantes ficam abertos dias e raramente são revisados de verdade. <strong>Quebre features grandes em PRs menores</strong>.
      </AlertBox>

      <h2>O fluxo completo</h2>
      <CodeBlock
        title="Do branch ao merge"
        language="bash"
        code={`# 1. Sync com main
git switch main
git pull

# 2. Crie branch de feature
git switch -c feature/AUTH-123-mfa

# 3. Trabalhe e commite (atomicamente)
git add -p
git commit -m "feat(auth): adiciona TOTP"
git commit -m "test(auth): cobertura de TOTP"

# 4. Pushe
git push -u origin feature/AUTH-123-mfa

# 5. Abra PR (3 opções)
# Opção A — gh CLI
gh pr create --fill --base main --reviewer maria,joao

# Opção B — link mágico no terminal após push
# (o GitHub imprime "Create a pull request: https://...")

# Opção C — pelo navegador
gh repo view --web

# 6. Espere CI + reviews

# 7. Atualize com main se necessário
git fetch origin main
git rebase origin/main           # ou: git merge origin/main
git push --force-with-lease

# 8. Merge (no GitHub)
gh pr merge --squash --delete-branch
`}
      />

      <h2>Anatomia de um bom PR</h2>
      <CodeBlock
        title="Template ideal"
        language="markdown"
        code={`# feat(auth): adiciona MFA via TOTP

## O que mudou
Implementa autenticação de dois fatores usando TOTP (RFC 6238).

## Por que
Issue #234 — usuários enterprise pediram MFA. SMS foi descartado
por dependência de operadoras.

## Como
- Novo módulo \`src/auth/totp.ts\`
- Migration adiciona coluna \`mfa_secret\` (encrypted, AES-256-GCM)
- UI em /settings/security com QR code

## Como testar
1. \`npm run db:migrate\`
2. Criar conta, ir em /settings/security
3. Escanear QR no Google Authenticator
4. Login deve pedir código

## Screenshots
[antes] [depois]

## Checklist
- [x] Testes adicionados (cobertura 89%)
- [x] Migration reversível
- [x] Docs atualizadas em README + CHANGELOG
- [ ] Plano de rollout discutido com @security

Closes #234
`}
      />

      <h2>Estratégias de merge no GitHub</h2>
      <CodeBlock
        title="3 opções, 3 efeitos diferentes"
        language="markdown"
        code={`Create a merge commit
  → Cria merge commit, preserva todos os commits do branch
  ✓ Histórico fiel ao trabalho real
  ✗ Histórico "ramificado", mais difícil de seguir

Squash and merge
  → Junta TODOS os commits do PR em um único na main
  ✓ Histórico limpo, 1 PR = 1 commit
  ✓ Detalhes ficam na descrição do PR
  ✗ Perde rastro de wip/incremental

Rebase and merge
  → Reaplica cada commit do PR em cima do main
  ✓ Histórico LINEAR e detalhado
  ✗ Pode causar problemas se branch foi compartilhada
`}
      />

      <AlertBox type="note" title="Recomendação">
        Para a maioria dos times: <strong>Squash and merge</strong> + <strong>require linear history</strong>. Você ganha histórico limpo + facilidade de rollback (1 commit pra reverter por feature).
      </AlertBox>

      <h2>Revisando um PR de outra pessoa</h2>
      <CodeBlock
        title="Checkout local de PR"
        language="bash"
        code={`# Via gh CLI (mais fácil)
gh pr checkout 123
# Cria branch local "pr-123" rastreando o branch do autor

# Manual (sem gh)
git fetch origin pull/123/head:pr-123
git switch pr-123

# Configure refspec para sempre puxar PRs
git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"
git fetch
git switch --detach origin/pr/123
`}
      />

      <h2>Comentando reviews</h2>
      <CodeBlock
        title="gh pr review"
        language="bash"
        code={`# Aprovar
gh pr review 123 --approve

# Pedir mudanças
gh pr review 123 --request-changes -b "Falta tratamento de erro em login.ts"

# Comentário sem decisão
gh pr review 123 --comment -b "Considerar usar zod aqui"

# Ver review
gh pr view 123 --comments
`}
      />

      <h2>Resolvendo conflitos no PR</h2>
      <CodeBlock
        title="Conflict bar no GitHub"
        language="bash"
        code={`# O GitHub mostra "This branch has conflicts that must be resolved"
# Resolva LOCAL (mais seguro que web editor):

git switch feature/x
git fetch origin main

# Opção A — rebase (recomendado, histórico linear)
git rebase origin/main
# resolva conflitos
git add .
git rebase --continue
git push --force-with-lease

# Opção B — merge (preserva histórico)
git merge origin/main
# resolva conflitos
git add .
git commit
git push
`}
      />

      <p>Detalhes em <Link href="/conflitos">Resolvendo Conflitos</Link>.</p>

      <h2>Atualizando branch antes do merge</h2>
      <CodeBlock
        title="Branch out-of-date"
        language="bash"
        code={`# GitHub mostra "This branch is out-of-date with the base branch"

# Opção A — atualize via UI
# (botão "Update branch" — faz merge ou rebase conforme settings)

# Opção B — local com rebase
git switch feature/x
git pull --rebase origin main
git push --force-with-lease

# Opção C — local com merge
git switch feature/x
git merge origin/main
git push
`}
      />

      <h2>Drafts e WIP</h2>
      <CodeBlock
        title="PR como rascunho"
        language="bash"
        code={`# Abrir como draft (não pede review até estar pronto)
gh pr create --draft --title "WIP: auth refactor"

# Marcar como pronto
gh pr ready 123

# Reverter para draft
gh pr ready --undo 123
`}
      />

      <h2>Co-autoria em PR</h2>
      <CodeBlock
        title="Creditando colegas"
        language="markdown"
        code={`# Em qualquer commit do PR, no fim da mensagem:

Co-authored-by: Maria Silva <maria@empresa.com>
Co-authored-by: João Souza <joao@empresa.com>

# Avatares de todos aparecem no commit no GitHub
# Útil para pair programming
`}
      />

      <h2>Closing issues automaticamente</h2>
      <CodeBlock
        title="Keywords mágicas"
        language="markdown"
        code={`# Em qualquer commit ou descrição de PR:

Closes #123
Fixes #456
Resolves #789

# Quando o PR é mergeado em main, as issues são fechadas automaticamente
# Funciona com: close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved

# Cross-repo:
Closes outra-org/outro-repo#999
`}
      />

      <h2>Stacked PRs — features em camadas</h2>
      <CodeBlock
        title="Para mudanças grandes"
        language="bash"
        code={`# Em vez de 1 PR de 2000 linhas, faça 4 PRs de 500:
# PR 1 → main:           refactor base
# PR 2 → branch do PR 1: nova API
# PR 3 → branch do PR 2: feature parte 1
# PR 4 → branch do PR 3: feature parte 2

git switch main
git switch -c step-1-refactor
# ... commits ...
gh pr create --base main

git switch -c step-2-api
# ... commits ...
gh pr create --base step-1-refactor

# Quando step-1 é mergeado em main, troque a base de step-2:
gh pr edit step-2-api --base main

# Ferramentas que ajudam: graphite.dev, ghstack
`}
      />

      <h2>Atalhos do gh para PRs</h2>
      <CodeBlock
        title="Aliases úteis"
        language="bash"
        code={`# Listar SEUS PRs abertos
gh pr list --author "@me"

# PRs aguardando seu review
gh pr list --search "review-requested:@me"

# PR de um arquivo específico
gh pr list --search "involves:@me path:src/auth"

# Status de TODOS seus PRs (CI, reviews)
gh pr status

# Diff direto no terminal
gh pr diff 123

# Logs do CI
gh pr checks 123
gh run watch
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Workflow PR"
        language="bash"
        code={`gh pr create --fill                 # criar (título do último commit)
gh pr create --draft                # como rascunho
gh pr list / status                 # listar
gh pr view 123 --web                # abrir no browser
gh pr checkout 123                  # entrar no branch
gh pr diff 123                      # ver diff
gh pr review 123 --approve          # aprovar
gh pr ready 123                     # tirar do draft
gh pr merge 123 --squash --delete-branch
gh pr close 123                     # fechar sem merge
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/forks">Forks</Link> — PRs em projetos open source</li>
        <li><Link href="/conflitos">Conflitos</Link> — resolva conflitos com calma</li>
        <li><Link href="/conventional-commits">Conventional Commits</Link> — PRs que viram changelog automático</li>
      </ul>
    </PageContainer>
  );
}
