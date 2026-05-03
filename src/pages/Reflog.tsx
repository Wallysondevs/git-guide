import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Reflog() {
  return (
    <PageContainer
      title="Reflog"
      subtitle="O histórico secreto de TUDO que aconteceu localmente. A rede de segurança que recupera commits 'perdidos' por reset, rebase ou checkout."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <p>
        O <strong>reflog</strong> é uma <em>caixa preta</em>: cada vez que <code>HEAD</code> ou um branch se move (commit, checkout, reset, rebase, merge), o Git registra. Tudo isso fica gravado por <strong>30 a 90 dias</strong>, mesmo que os commits não estejam mais em nenhum branch. Isso significa que <strong>quase nada se perde de verdade</strong> no Git.
      </p>

      <AlertBox type="tip" title="Mantra do Git">
        "Se você commitou pelo menos uma vez, você pode recuperar." O reflog é a razão. Apaga branch, reseta hard, rebaseia errado — tudo fica gravado.
      </AlertBox>

      <h2>O comando básico</h2>
      <CodeBlock
        title="git reflog"
        language="bash"
        code={`git reflog
# a1b2c3d HEAD@{0}: commit: feat: nova feature
# 7p8q9r0 HEAD@{1}: rebase finished: returning to refs/heads/main
# 5l6m7n8 HEAD@{2}: rebase: feat: ...
# 3o4p5q6 HEAD@{3}: checkout: moving from feature to main
# 1m2n3o4 HEAD@{4}: pull --rebase: ...

# Mostra:
# - hash do commit
# - referência (HEAD@{N})
# - tipo da operação
# - mensagem/contexto

# Reflog de um branch específico
git reflog show feature/x
git reflog feature/x

# Com formato customizado
git reflog --pretty=format:'%h %gd %gs %s' --date=relative
`}
      />

      <h2>Notação HEAD@{N}</h2>
      <CodeBlock
        title="Formas de referenciar"
        language="bash"
        code={`HEAD@{0}     ← onde você está agora
HEAD@{1}     ← onde estava antes
HEAD@{2}     ← anterior a isso
...

# Por tempo (não índice)
HEAD@{1.hour.ago}
HEAD@{yesterday}
HEAD@{2.weeks.ago}
HEAD@{2026-03-15.10:00:00}

# Por nome de branch
main@{1}     ← onde main estava antes
feature@{0}  ← onde feature está agora

# Para usar:
git show HEAD@{2}
git diff HEAD HEAD@{1}
git checkout HEAD@{3}
git reset --hard HEAD@{1}
`}
      />

      <h2>Cenários de recuperação</h2>

      <h3>1. "Resetei hard e perdi commits!"</h3>
      <CodeBlock
        title="Recuperando reset --hard"
        language="bash"
        code={`# Você fez:
git reset --hard HEAD~3      # ⚠️ perdeu 3 commits

# Solução
git reflog
# 1f2g3h4 HEAD@{0}: reset: moving to HEAD~3
# 7i8j9k0 HEAD@{1}: commit: feat: ...     ← perdido
# 5l6m7n8 HEAD@{2}: commit: fix: ...      ← perdido
# 3o4p5q6 HEAD@{3}: commit: refactor: ... ← perdido

# Volte para o estado anterior ao reset
git reset --hard HEAD@{1}

# OU crie um branch novo do estado perdido
git switch -c salvos HEAD@{1}
`}
      />

      <h3>2. "Apaguei um branch que tinha commits!"</h3>
      <CodeBlock
        title="Recuperando branch deletado"
        language="bash"
        code={`# Você fez:
git branch -D feature/importante
# Deleted branch feature/importante (was a1b2c3d)

# Solução: o hash apareceu no warning. Crie branch novo:
git switch -c feature/importante a1b2c3d

# Se você não capturou o hash, procure no reflog
git reflog | grep feature/importante
# OU encontre commits órfãos
git fsck --lost-found
git log --all --oneline | grep "feat: o que era da feature"
`}
      />

      <h3>3. "Rebase deu ruim, quero voltar atrás"</h3>
      <CodeBlock
        title="Recuperando rebase"
        language="bash"
        code={`# Após rebase mal-sucedido
git reflog
# a1b2c3d HEAD@{0}: rebase finished
# 7p8q9r0 HEAD@{1}: rebase: feat: ...
# 5l6m7n8 HEAD@{2}: rebase: ...
# c3d4e5f HEAD@{3}: feat: estado ANTES do rebase ★

# Volte para antes do rebase
git reset --hard c3d4e5f
git reset --hard HEAD@{3}

# Truque: ORIG_HEAD aponta para o estado pré-rebase
git reset --hard ORIG_HEAD
`}
      />

      <h3>4. "Stashe drop por engano!"</h3>
      <CodeBlock
        title="Recuperando stash dropped"
        language="bash"
        code={`# Você fez:
git stash drop stash@{0}     # oops!

# Procure no reflog (stashes têm refs próprias)
git fsck --unreachable | grep commit
# unreachable commit a1b2c3d
# unreachable commit 7p8q9r0

# Inspecione cada um
git show a1b2c3d
git show 7p8q9r0

# Achou? Recupere
git stash apply a1b2c3d
git checkout -b recovered a1b2c3d
`}
      />

      <h3>5. "Fiz force-push errado e o remoto perdeu commits"</h3>
      <CodeBlock
        title="Recuperando do reflog LOCAL"
        language="bash"
        code={`# Os commits perdidos no remoto ainda estão no SEU reflog local
# (desde que você os tinha em algum momento)

git reflog
# Ache o estado anterior
git push origin <hash-do-estado-bom>:main --force-with-lease

# Se foi outro dev que fez force-push, peça pra ele recuperar do reflog DELE
# Se ninguém tem mais — perdido (a menos que tenha CI/Reflog server)
`}
      />

      <h2>Reflog vs log</h2>
      <CodeBlock
        title="Diferença fundamental"
        language="markdown"
        code={`git log
  → mostra o histórico LINEAR a partir de HEAD
  → segue a árvore de commits (parents)
  → visão "histórica"

git reflog
  → mostra o histórico de OPERAÇÕES locais
  → cronológico, em ordem que aconteceram
  → inclui commits órfãos (sem branch apontando)
  → visão "operacional" / debug
`}
      />

      <h2>Inspecionando reflog específico</h2>
      <CodeBlock
        title="Por ref"
        language="bash"
        code={`# Reflog do HEAD (padrão)
git reflog
git reflog HEAD

# Reflog de um branch
git reflog main
git reflog feature/x

# Reflog do stash
git reflog stash

# Reflog de uma tag
git reflog v1.0.0

# Mostrar TUDO
git reflog --all
`}
      />

      <h2>Configurando expiração</h2>
      <CodeBlock
        title="Quanto tempo o reflog guarda"
        language="bash"
        code={`# Padrões:
# - Refs alcançáveis: 90 dias
# - Refs não-alcançáveis: 30 dias

git config --global gc.reflogExpire "90 days"
git config --global gc.reflogExpireUnreachable "30 days"

# AUMENTAR (mais segurança, mais disco)
git config --global gc.reflogExpire "1 year"
git config --global gc.reflogExpireUnreachable "90 days"

# Nunca expirar (CUIDADO — repo cresce)
git config --global gc.reflogExpire never
git config --global gc.reflogExpireUnreachable never
`}
      />

      <h2>Limpando o reflog (raro)</h2>
      <CodeBlock
        title="Force expire"
        language="bash"
        code={`# Expirar entries antigas (segue regras de gc.reflogExpire)
git reflog expire --expire=now --all
git reflog expire --expire-unreachable=now --all

# Forçar GC para limpar objetos órfãos
git gc --prune=now

# ⚠️  Depois disso, recuperação fica MUITO mais difícil
# Use só se realmente precisa de espaço
`}
      />

      <AlertBox type="danger" title="Limpar reflog é irreversível">
        Após <code>reflog expire</code> + <code>gc --prune=now</code>, commits órfãos somem para SEMPRE. Faça apenas em repos onde você tem certeza de não precisar de recovery.
      </AlertBox>

      <h2>git fsck — encontrando ovos perdidos</h2>
      <CodeBlock
        title="Quando reflog não basta"
        language="bash"
        code={`# Lista commits e árvores não-alcançáveis (órfãos)
git fsck --unreachable
git fsck --lost-found
# unreachable commit a1b2c3d
# unreachable blob 7p8q9r0
# unreachable tree 5l6m7n8

# Inspecionar cada commit órfão
for hash in $(git fsck --no-reflogs --unreachable | grep commit | awk '{print $3}'); do
  echo "──── $hash ────"
  git show --stat "$hash" | head -5
  echo ""
done

# Recuperar criando branch
git switch -c recuperado a1b2c3d
`}
      />

      <h2>Workflow defensivo: tag antes de operações arriscadas</h2>
      <CodeBlock
        title="Backup antes de reset/rebase"
        language="bash"
        code={`# Antes de rebase grande
git tag backup-pre-rebase
git rebase -i HEAD~50

# Se der ruim
git reset --hard backup-pre-rebase
git tag -d backup-pre-rebase

# Truque: alias automatizado
git config --global alias.safe-rebase '!f() { \\
  git tag "backup-$(date +%s)" && \\
  git rebase "$@"; \\
}; f'
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Reflog essencial"
        language="bash"
        code={`git reflog                      # ver tudo
git reflog show <branch>        # de um branch
git reflog --all                # todas as refs

# Recuperação
git reset --hard HEAD@{N}       # volta N operações atrás
git reset --hard ORIG_HEAD      # antes do último merge/rebase
git switch -c novo HEAD@{N}     # cria branch do estado anterior

# Encontrar órfãos
git fsck --lost-found
git fsck --unreachable

# Configuração
git config gc.reflogExpire "1 year"
git config gc.reflogExpireUnreachable "90 days"

# Limpar (com CUIDADO)
git reflog expire --expire=now --all
git gc --prune=now
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/recuperacao">Recuperação de Desastres</Link> — guia completo</li>
        <li><Link href="/reset">Reset</Link> — reflog é o "antídoto"</li>
        <li><Link href="/manutencao">Manutenção</Link> — gc, prune e como tudo funciona</li>
      </ul>
    </PageContainer>
  );
}
