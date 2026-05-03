import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Rebase() {
  return (
    <PageContainer
      title="Rebase"
      subtitle="Reescreva história — para o bem. Linearize commits, agrupe wips e mantenha um histórico que conta uma história."
      difficulty="avancado"
      timeToRead="16 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git rebase"}</strong> {' — '} {"re-aplica commits sobre outra base — histórico linear."}
          </li>
        <li>
            <strong>{"Interactive"}</strong> {' — '} {"rebase -i permite editar/squash/reorder/drop commits."}
          </li>
        <li>
            <strong>{"vs merge"}</strong> {' — '} {"rebase reescreve história; merge preserva."}
          </li>
        <li>
            <strong>{"Golden rule"}</strong> {' — '} {"nunca rebase commits já compartilhados."}
          </li>
        <li>
            <strong>{"Conflito"}</strong> {' — '} {"resolve, git add, git rebase --continue."}
          </li>
        </ul>
        <p>
        <strong>Rebase</strong> pega seus commits e os "reaplica" em cima de outra base. O resultado é um histórico <em>linear</em>, como se você tivesse trabalhado a partir do código mais novo desde o começo. É a ferramenta mais poderosa — e mais perigosa — do Git.
      </p>

      <AlertBox type="danger" title="Regra de ouro do rebase">
        <strong>Nunca rebase commits que já foram pushados e usados por outras pessoas.</strong> Você reescreve hashes; quem clonou antes vai ter dor de cabeça. Use rebase para limpar trabalho LOCAL, antes de compartilhar.
      </AlertBox>

      <h2>Rebase básico — atualizando uma branch</h2>
      <CodeBlock
        title="O cenário mais comum"
        language="bash"
        code={`# Você está em feature, main avançou enquanto isso
git switch feature/login

# Reaplica seus commits em cima do main atualizado
git rebase main

# Equivale a: "fingir que comecei a feature a partir do main de agora"
`}
      />

      <CodeBlock
        title="Visualização"
        language="markdown"
        code={`Antes:
  main:     A───B───C───F
                    \\
  feature:           D───E

Após "git rebase main" (estando em feature):
  main:     A───B───C───F
                         \\
  feature:                D'───E'

D' e E' são commits NOVOS (hash diferente) com o mesmo conteúdo.
Os antigos D e E ficam órfãos (recuperáveis via reflog).
`}
      />

      <h2>Rebase interativo — a faxina do histórico</h2>
      <p>O <strong>rebase interativo</strong> (<code>-i</code>) abre um editor onde você decide o que fazer com cada commit: manter, juntar, reordenar, editar mensagem, etc.</p>

      <CodeBlock
        title="git rebase -i"
        language="bash"
        code={`# Edita os últimos 5 commits
git rebase -i HEAD~5

# OU edita desde o ancestral comum com main
git rebase -i main

# Abre seu editor com:
# pick a1b2c3d feat(auth): começa MFA
# pick e5f6g7h wip
# pick 9i0j1k2 fix typo
# pick 3l4m5n6 wip2
# pick 7o8p9q0 finaliza MFA
#
# # Comandos disponíveis:
# # p, pick     = manter como está
# # r, reword   = manter mas editar mensagem
# # e, edit     = parar para EDITAR o commit
# # s, squash   = juntar com o anterior, edita mensagem
# # f, fixup    = juntar com o anterior, descarta mensagem
# # d, drop     = deletar
# # x, exec     = roda comando shell
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Juntar 5 wips em 1 commit limpo (squash)</h3>
      <CodeBlock
        title="Squash flow"
        language="markdown"
        code={`Original:
  pick a1b2c3d feat(auth): começa MFA
  pick e5f6g7h wip
  pick 9i0j1k2 fix typo
  pick 3l4m5n6 wip2
  pick 7o8p9q0 finaliza MFA

Mude para:
  pick   a1b2c3d feat(auth): MFA via TOTP   ← este vira a base
  squash e5f6g7h wip
  squash 9i0j1k2 fix typo
  squash 3l4m5n6 wip2
  squash 7o8p9q0 finaliza MFA

Salve. O Git abre OUTRO editor para você criar a mensagem final.
Resultado: 1 único commit com todo o trabalho.
`}
      />

      <h3>2. Apagar mensagens "wip" mantendo o conteúdo (fixup)</h3>
      <CodeBlock
        title="Fixup é silencioso"
        language="markdown"
        code={`pick   a1b2c3d feat(auth): MFA via TOTP
fixup  e5f6g7h wip
fixup  9i0j1k2 fix typo

# fixup = "junta com o anterior e USA SÓ a mensagem do anterior"
# Sem abrir editor. Mais limpo que squash.
`}
      />

      <h3>3. Reordenar commits</h3>
      <CodeBlock
        title="Basta mudar a ordem das linhas"
        language="markdown"
        code={`# Original:
pick a1b2c3d feat: B
pick e5f6g7h feat: A
pick 9i0j1k2 feat: C

# Reescreva:
pick e5f6g7h feat: A
pick a1b2c3d feat: B
pick 9i0j1k2 feat: C

# ⚠️ Reordenar pode causar conflitos se commits dependem entre si.
`}
      />

      <h3>4. Editar um commit antigo (mudar conteúdo)</h3>
      <CodeBlock
        title="Edit pausa o rebase"
        language="bash"
        code={`# Marque o commit como "edit"
# pick   a1b2c3d feat: A
# edit   e5f6g7h feat: B   ← este
# pick   9i0j1k2 feat: C

# O Git para no commit B
git status      # você está em rebase

# Faça as mudanças que quiser
nano src/auth.ts
git add src/auth.ts
git commit --amend

# Continue o rebase
git rebase --continue
`}
      />

      <h3>5. Dividir um commit em vários (split)</h3>
      <CodeBlock
        title="Split com edit + reset"
        language="bash"
        code={`# Marque como "edit", então:
git rebase -i HEAD~3
# pick a1b2c3d feat: A
# edit e5f6g7h "muitas coisas"
# pick 9i0j1k2 feat: C

# Quando parar:
git reset HEAD^               # desfaz o commit, mantém arquivos
git add -p arquivo1
git commit -m "feat: parte 1"
git add -p arquivo2
git commit -m "feat: parte 2"

git rebase --continue
`}
      />

      <h2>Autosquash — workflow profissional</h2>
      <CodeBlock
        title="Marca commits para serem juntados depois"
        language="bash"
        code={`# Você tem um commit a1b2c3d "feat: adiciona login"
# Encontra um bug; quer corrigir e fazer parecer que sempre esteve no commit original

git commit --fixup=a1b2c3d
# Cria commit "fixup! feat: adiciona login"

# OU:
git commit --squash=a1b2c3d
# Cria "squash! feat: adiciona login"

# Quando rodar rebase com --autosquash, ele organiza tudo automaticamente
git rebase -i --autosquash main

# Configure como padrão
git config --global rebase.autoSquash true
`}
      />

      <AlertBox type="tip" title="Autosquash + autostash = paraíso">
        <code>git config --global rebase.autoStash true</code> faz <code>stash</code> automático ao rebasear se o working estiver sujo. Combinado com autoSquash, rebases ficam fluidos.
      </AlertBox>

      <h2>Resolvendo conflitos durante rebase</h2>
      <CodeBlock
        title="Fluxo de conflito"
        language="bash"
        code={`git rebase main
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
# error: could not apply e5f6g7h... feat: ...

# Edite o arquivo em conflito (veja Conflitos para detalhes)
nano src/auth.ts
git add src/auth.ts

# Continue
git rebase --continue

# OU: pular este commit (descarta as mudanças dele)
git rebase --skip

# OU: cancelar TUDO e voltar ao estado anterior
git rebase --abort
`}
      />

      <h2>Pull com rebase</h2>
      <CodeBlock
        title="Histórico linear no pull"
        language="bash"
        code={`# Em vez de criar merge commit ao puxar, rebase seus commits locais
git pull --rebase

# Configurar como padrão
git config --global pull.rebase true

# Por branch (recomendado para main)
git config branch.main.rebase true
`}
      />

      <h2>Rebase --onto — mover commits entre branches</h2>
      <CodeBlock
        title="O comando avançado"
        language="bash"
        code={`# Cenário: você fez commits em feature/x baseado em feature/y,
# mas y foi descartada. Você quer levar seus commits para main.

git rebase --onto main feature/y feature/x
# "Pegue os commits que estão em feature/x mas NÃO em feature/y,
#  e reaplique-os em cima de main"

# Visual:
# Antes:  main:    A
#         feat-y:  A───B
#         feat-x:  A───B───C───D
#
# Depois: main:    A
#         feat-x:  A───C'───D'
`}
      />

      <h2>Recuperando depois de rebase ruim</h2>
      <CodeBlock
        title="ORIG_HEAD e reflog"
        language="bash"
        code={`# Volta ao estado imediatamente anterior ao rebase
git reset --hard ORIG_HEAD

# OU: encontre via reflog
git reflog
# a1b2c3d HEAD@{0}: rebase finished: returning to refs/heads/feature
# 7f8g9h0 HEAD@{1}: rebase: feat: ...
# 5d6e7f8 HEAD@{2}: rebase: ...
# c3d4e5f HEAD@{3}: feat: estado antes do rebase ★

git reset --hard c3d4e5f
`}
      />

      <p>Detalhes em <Link href="/reflog">Reflog</Link> e <Link href="/recuperacao">Recuperação</Link>.</p>

      <h2>Push após rebase — force-with-lease</h2>
      <CodeBlock
        title="Force seguro"
        language="bash"
        code={`# Você rebaseou commits que já tinha pushado
git push
# ! [rejected]  feature -> feature (non-fast-forward)

# ❌ NÃO use --force puro (sobrescreve mesmo se alguém pushou em cima)
git push --force

# ✅ Use --force-with-lease (falha se houve push novo)
git push --force-with-lease

# Em branches compartilhadas, AVISE o time antes
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de rebase"
        language="bash"
        code={`git rebase main                    # rebase em cima de main
git rebase -i HEAD~5               # interativo, últimos 5
git rebase -i main                 # interativo desde main
git rebase --continue              # depois de resolver conflito
git rebase --skip                  # pula o commit problemático
git rebase --abort                 # cancela e volta tudo
git rebase --onto main y x         # move commits entre branches

git commit --fixup=<hash>          # marca para autosquash
git rebase -i --autosquash main    # aplica fixups automáticos

git pull --rebase                  # pull linearizando
git push --force-with-lease        # push após rebase (seguro)

git reflog                         # encontre o "antes" se errar
git reset --hard ORIG_HEAD         # volta ao antes do rebase
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/merge">Merge</Link> — a alternativa que preserva história</li>
        <li><Link href="/conflitos">Conflitos</Link> — guia detalhado de resolução</li>
        <li><Link href="/reflog">Reflog</Link> — sua rede de segurança</li>
        <li><Link href="/cherry-pick">Cherry-pick</Link> — pegando commits avulsos</li>
      </ul>
    </PageContainer>
  );
}
