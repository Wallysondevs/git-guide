import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function CherryPick() {
  return (
    <PageContainer
      title="Cherry-pick"
      subtitle="Pegue commits específicos de outras branches sem fazer merge — perfeito para hotfixes em release branches."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git cherry-pick"}</strong> {' — '} {"copia commit específico para o branch atual."}
          </li>
        <li>
            <strong>{"Conflito"}</strong> {' — '} {"resolve, git add, git cherry-pick --continue."}
          </li>
        <li>
            <strong>{"-x"}</strong> {' — '} {"adiciona linha \"(cherry picked from commit ...)\"."}
          </li>
        <li>
            <strong>{"-n"}</strong> {' — '} {"aplica mudanças sem commitar."}
          </li>
        <li>
            <strong>{"Range"}</strong> {' — '} {"cherry-pick A..B aplica vários commits em sequência."}
          </li>
        </ul>
        <p>
        <strong>Cherry-pick</strong> aplica um commit específico (de qualquer branch) na sua branch atual, criando um <em>commit novo</em> com as mesmas mudanças. É como dizer "eu não quero todo o branch dele, só esse commit aqui".
      </p>

      <AlertBox type="tip" title="Cenário clássico">
        Você consertou um bug em <code>main</code> mas precisa do mesmo fix em uma branch de release antiga (<code>release/1.5</code>). Cherry-pick é a ferramenta certa.
      </AlertBox>

      <h2>Comando básico</h2>
      <CodeBlock
        title="git cherry-pick"
        language="bash"
        code={`# Aplicar UM commit no branch atual
git cherry-pick abc1234

# Vários commits
git cherry-pick abc1234 def5678 9i0j1k2

# Range de commits (do parent de A até B, inclusive)
git cherry-pick abc1234^..def5678

# Sem commit automático (deixa as mudanças no stage)
git cherry-pick --no-commit abc1234
git cherry-pick -n abc1234

# Adicionar referência ao commit original
git cherry-pick -x abc1234
# Adiciona "(cherry picked from commit abc1234)" na mensagem
`}
      />

      <h2>Conflitos no cherry-pick</h2>
      <CodeBlock
        title="Resolver e continuar"
        language="bash"
        code={`git cherry-pick abc1234
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
# error: could not apply abc1234

# Resolva os conflitos
nano src/auth.ts
git add src/auth.ts

# Continue
git cherry-pick --continue

# OU pular este commit
git cherry-pick --skip

# OU cancelar tudo
git cherry-pick --abort
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Hotfix de main em release antiga</h3>
      <CodeBlock
        title="Fluxo clássico"
        language="bash"
        code={`# Você corrigiu um bug em main:
git switch main
# (commit a1b2c3d "fix: corrige timeout")

# Precisa aplicar o mesmo fix em release/1.5 (que está em produção)
git switch release/1.5
git cherry-pick a1b2c3d
git push

# Crie tag para a nova versão
git tag -a v1.5.1 -m "Patch v1.5.1: fix timeout"
git push origin v1.5.1
`}
      />

      <h3>2. "Salvar" trabalho de uma branch que vai ser descartada</h3>
      <CodeBlock
        title="Resgate seletivo"
        language="bash"
        code={`# A branch experimental tem 20 commits, só 3 valem a pena
git log feature/experimental --oneline
# 1aa... commit ruim
# 2bb... commit bom ★
# 3cc... commit bom ★
# 4dd... commit ruim
# 5ee... commit bom ★
# ... (mais 15 ruins)

git switch main
git cherry-pick 2bb 3cc 5ee
`}
      />

      <h3>3. Mover commit do branch errado</h3>
      <CodeBlock
        title="Você commitou na branch errada"
        language="bash"
        code={`# Estava em main, fez commit que devia ir em feature/x
git log --oneline -1
# abc1234 feat: nova feature

# Vá para feature/x e traga o commit
git switch feature/x
git cherry-pick abc1234

# Volte e remova de main
git switch main
git reset --hard HEAD~1     # se ainda não pushou
# ou: git revert abc1234    # se já pushou
`}
      />

      <h3>4. Backport de feature</h3>
      <CodeBlock
        title="Range para múltiplos commits"
        language="bash"
        code={`# Trazer commits A..D (4 commits) de feature/new para release/old
git switch release/old
git cherry-pick A^..D
# A^ = parent de A (incluindo A no range)
`}
      />

      <h2>Opções úteis</h2>
      <CodeBlock
        title="Variações"
        language="bash"
        code={`# Manter o autor original do commit (você fica como committer)
git cherry-pick abc1234         # ★ comportamento padrão

# Sobrescrever o autor para você
git cherry-pick --reset-author abc1234

# Adicionar Sign-off (DCO)
git cherry-pick -s abc1234

# Adicionar referência ao commit original (auditoria)
git cherry-pick -x abc1234
# A mensagem ganha:
#   feat: ...
#
#   (cherry picked from commit abc1234)

# Estratégia de resolução em conflito
git cherry-pick -X ours abc1234     # prefere nosso lado
git cherry-pick -X theirs abc1234   # prefere o lado deles

# Cherry-pick "vazio" — quando o commit já está aplicado
git cherry-pick --allow-empty abc1234
`}
      />

      <h2>Cherry-pick de merge commits</h2>
      <CodeBlock
        title="-m mainline"
        language="bash"
        code={`# Merge commits têm 2 pais — escolha qual usar como base
git cherry-pick -m 1 <merge-hash>
# -m 1 = main (preserva mudanças do branch que VEIO no merge)
# -m 2 = inverso

# Geralmente -m 1 é o que você quer
`}
      />

      <h2>Verificando antes de aplicar</h2>
      <CodeBlock
        title="Preview"
        language="bash"
        code={`# Veja o commit completo antes
git show abc1234

# Veja só o diff
git show abc1234 --stat

# Simula a aplicação sem commitar
git cherry-pick --no-commit abc1234
git status
git diff --staged

# Decida:
git commit              # aceitar
git reset --hard HEAD   # descartar
`}
      />

      <h2>Histórico paralelo: o problema dos hashes diferentes</h2>
      <p>Cherry-pick cria um <strong>commit novo</strong> com hash diferente, mesmo que o conteúdo seja igual. Isso pode causar confusão:</p>

      <CodeBlock
        title="Cherry-pick vs merge"
        language="markdown"
        code={`Branch original:
  main:    A───B───C───D───E
                              \\
  release/1.5: A───B───C───X      ← hotfix X cherry-picked de E

Hashes:
  E (em main):       a1b2c3d
  X (em release):    7p8q9r0     ← MESMO conteúdo, hash diferente

Implicação: ao mergear release/1.5 → main no futuro,
o Git pode tratar X como "commit novo" e haver conflito (mesmo conteúdo).

Solução: use git rebase --interactive ou git merge -s ours.
Ou prefira cherry-pick -x para deixar claro o link.
`}
      />

      <AlertBox type="warning" title="Não abuse de cherry-pick">
        Cherry-pick é ótimo para hotfixes e backports pontuais. Se você está fazendo cherry-pick de 20+ commits, talvez você devesse fazer <code>merge</code> ou <code>rebase</code>. Cherry-pick excessivo divergem históricos.
      </AlertBox>

      <h2>Workflow profissional: backports automatizados</h2>
      <CodeBlock
        title="Script para múltiplas releases"
        language="bash"
        code={`#!/bin/bash
# backport.sh — aplica fix em múltiplas branches de release

COMMIT=$1
RELEASES="release/1.5 release/1.6 release/2.0"

for branch in $RELEASES; do
  echo "→ Backportando $COMMIT para $branch"
  git switch "$branch"
  git pull
  git cherry-pick -x "$COMMIT" || {
    echo "❌ Conflito em $branch — resolva manualmente"
    exit 1
  }
  git push
done

git switch main
echo "✓ Backport completo"

# Uso:
# ./backport.sh a1b2c3d
`}
      />

      <h2>Detectando o que falta backportar</h2>
      <CodeBlock
        title="git cherry"
        language="bash"
        code={`# "Quais commits de main NÃO estão em release/1.5?"
git cherry release/1.5 main
# + a1b2c3d feat: ...     ← está em main, falta em release
# - 7p8q9r0 fix: ...      ← já backportado (cherry-pick detectado)

# Resumo
git cherry release/1.5 main -v | grep '^+' | wc -l
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de cherry-pick"
        language="bash"
        code={`git cherry-pick <hash>             # aplicar 1 commit
git cherry-pick A B C              # vários
git cherry-pick A^..B              # range
git cherry-pick -x <hash>          # com referência ao original
git cherry-pick -n <hash>          # sem commit automático
git cherry-pick -m 1 <merge>       # de merge commit

git cherry-pick --continue         # após resolver conflito
git cherry-pick --skip             # pular commit
git cherry-pick --abort            # cancelar

git cherry <upstream> <branch>     # ver o que falta backportar
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/rebase">Rebase</Link> — alternativa para histórico linear</li>
        <li><Link href="/merge">Merge</Link> — para integrar branch inteira</li>
        <li><Link href="/conflitos">Conflitos</Link> — quando cherry-pick conflitar</li>
      </ul>
    </PageContainer>
  );
}
