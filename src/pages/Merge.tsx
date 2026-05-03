import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Merge() {
  return (
    <PageContainer
      title="Merge"
      subtitle="Combine branches preservando o histórico — fast-forward, three-way merge, squash e quando usar cada um."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Fast-forward"}</strong> {' — '} {"HEAD avança porque não há divergência."}
          </li>
        <li>
            <strong>{"3-way merge"}</strong> {' — '} {"combina mudanças de duas linhas que divergiram."}
          </li>
        <li>
            <strong>{"--no-ff"}</strong> {' — '} {"força commit de merge mesmo se daria fast-forward."}
          </li>
        <li>
            <strong>{"--squash"}</strong> {' — '} {"combina branch inteira em um único commit."}
          </li>
        <li>
            <strong>{"Octopus"}</strong> {' — '} {"merge de 3+ branches ao mesmo tempo (raro)."}
          </li>
        </ul>
        <p>
        <strong>Merge</strong> é como você integra trabalho feito em uma branch de volta para outra. O Git tem 3 estratégias principais — escolher a certa em cada situação preserva clareza no histórico e evita conflitos desnecessários.
      </p>

      <AlertBox type="tip" title="Merge vs Rebase em uma frase">
        <strong>Merge preserva</strong> a história real (com bifurcações). <strong>Rebase reescreve</strong> para parecer linear. Não existe certo — existe contexto.
      </AlertBox>

      <h2>O comando básico</h2>
      <CodeBlock
        title="git merge"
        language="bash"
        code={`# Estando em main, traz feature
git switch main
git merge feature/login

# Saída possível 1 — fast-forward
# Updating a1b2c3d..e5f6g7h
# Fast-forward
#  src/auth.ts | 24 ++++++++++++++++++++++++
#  1 file changed, 24 insertions(+)

# Saída possível 2 — three-way merge (cria merge commit)
# Merge made by the 'ort' strategy.
#  src/auth.ts | 24 ++++++++++++++++++++++++
#  1 file changed, 24 insertions(+)
`}
      />

      <h2>Fast-forward — quando o Git só "anda"</h2>
      <CodeBlock
        title="Visualizando"
        language="markdown"
        code={`Antes:
  main:    A───B───C
                    \\
  feature:           D───E

Após "git merge feature" (fast-forward):
  main:    A───B───C───D───E
  feature:             D───E

Não há divergência — main só "alcança" feature.
Nenhum merge commit é criado.
`}
      />

      <CodeBlock
        title="Forçar / proibir fast-forward"
        language="bash"
        code={`# Forçar criação de merge commit (mesmo se ff fosse possível)
git merge --no-ff feature/login

# Só permitir se for fast-forward (senão falha)
git merge --ff-only feature/login

# Configurar globalmente para sempre criar merge commit
git config --global merge.ff false

# Configurar para só permitir ff (no pull, força rebase em conflito)
git config --global pull.ff only
`}
      />

      <AlertBox type="note" title="--no-ff é controverso, mas útil">
        Forçar merge commit (<code>--no-ff</code>) torna explícito <strong>quando uma feature foi integrada</strong>. Útil para auditoria, releases e changelogs. Times que preferem histórico linear evitam isso.
      </AlertBox>

      <h2>Three-way merge — quando há divergência</h2>
      <CodeBlock
        title="Visualizando"
        language="markdown"
        code={`Antes:
  main:    A───B───C───F   ← main avançou também
                    \\
  feature:           D───E

Após "git merge feature":
  main:    A───B───C───F───M    ← merge commit
                    \\     /
  feature:           D───E

M = merge commit, com 2 pais (F e E).
Estado final é a "soma" das mudanças de F e E.
`}
      />

      <h2>Squash merge — comprime tudo em 1 commit</h2>
      <CodeBlock
        title="git merge --squash"
        language="bash"
        code={`git switch main
git merge --squash feature/login
# Não cria commit automaticamente — coloca tudo no stage

git status
# Changes to be committed:
#         modified:   src/auth.ts
#         new file:   src/totp.ts

git commit -m "feat(auth): MFA via TOTP (#234)"
# Único commit com TODO o trabalho da feature
`}
      />

      <CodeBlock
        title="Visualização do squash"
        language="markdown"
        code={`Antes:
  main:    A───B
              \\
  feature:    D───E───F (3 commits "wip")

Após squash:
  main:    A───B───S   ← S = único commit com soma de D+E+F
  feature: D───E───F   ← intacta, mas "esquecida"
`}
      />

      <h2>Quando usar cada estratégia</h2>
      <CodeBlock
        title="Guia de decisão"
        language="markdown"
        code={`Fast-forward
  ✓ branches curtas, isoladas, sem divergência
  ✗ perde a noção de "quando uma feature entrou"

Merge commit (--no-ff)
  ✓ features importantes, releases, branches longas
  ✓ preserva contexto histórico
  ✗ histórico fica "ramificado"

Squash merge
  ✓ muitos commits "wip" / "fix typo" que não querem ir pro histórico
  ✓ PRs pequenos com 1 mudança lógica
  ✗ perde rastro de quem contribuiu pedaços

Rebase + merge ff
  ✓ histórico linear puro (estilo trunk-based)
  ✗ reescreve commits — não fazer em branches compartilhadas
`}
      />

      <h2>Estratégias de merge (algoritmos)</h2>
      <CodeBlock
        title="-X e -s"
        language="bash"
        code={`# Estratégia padrão: ort (octopus recursive)
git merge feature

# Resolver conflitos preferindo "nosso" lado em ambíguos
git merge -X ours feature

# Resolver preferindo "deles"
git merge -X theirs feature

# Ignorar mudanças de espaço em branco
git merge -X ignore-all-space feature

# Estratégia "ours" — DESCARTA totalmente as mudanças de feature, mas
# mantém o merge commit (útil para "marcar" branches abandonadas)
git merge -s ours feature

# Resolução de subárvores
git merge -s subtree subprojeto-branch
`}
      />

      <AlertBox type="warning" title="Não confunda -X ours com -s ours">
        <code>-X ours</code> resolve <strong>conflitos</strong> a favor do nosso lado (mas integra o resto). <code>-s ours</code> <strong>descarta tudo</strong> do outro branch, criando um merge "fake".
      </AlertBox>

      <h2>Cancelando um merge em andamento</h2>
      <CodeBlock
        title="Abort"
        language="bash"
        code={`# Conflito apareceu, você quer desistir
git merge --abort

# Volta tudo ao estado anterior ao merge
# (--abort funciona enquanto há conflito não resolvido)
`}
      />

      <h2>Desfazendo um merge JÁ COMMITADO</h2>
      <CodeBlock
        title="Reset vs Revert"
        language="bash"
        code={`# Cenário: o merge ainda não foi pushado
git reset --hard HEAD~1
# (volta o ponteiro para antes do merge)

# Cenário: o merge JÁ foi pushado e outros já clonaram
git revert -m 1 <hash-do-merge>
# (cria um commit novo que desfaz o merge — seguro)
# -m 1 indica qual "mainline" preservar (geralmente main = pai 1)
`}
      />

      <p>Detalhes em <Link href="/reset">Reset e Revert</Link>.</p>

      <h2>Pré-visualizando um merge</h2>
      <CodeBlock
        title="Veja o que vai acontecer"
        language="bash"
        code={`# Quais commits seriam trazidos?
git log main..feature --oneline

# Quais arquivos mudariam?
git diff main..feature --name-status

# Diff completo
git diff main...feature

# Simulação real (sem commitar)
git merge --no-commit --no-ff feature
# inspecione, depois:
git merge --abort         # desistir
# OU
git commit                # confirmar
`}
      />

      <h2>Cenário prático: integrar feature longa</h2>
      <CodeBlock
        title="Workflow seguro"
        language="bash"
        code={`# 1. Atualize main
git switch main
git pull

# 2. Vá para a feature e atualize com main (rebase ou merge)
git switch feature/x
git rebase main           # OU: git merge main

# 3. Resolva conflitos se houver, rode testes
npm test

# 4. Volte para main e mergeie (escolha a estratégia)
git switch main
git merge --no-ff feature/x -m "Merge feature/x: adiciona X"

# 5. Pushe
git push

# 6. Limpe a branch
git branch -d feature/x
git push origin --delete feature/x
`}
      />

      <h2>Resolvendo conflitos</h2>
      <p>Quando o Git não consegue mesclar automaticamente, ele para e marca arquivos com <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>. Para o passo a passo completo, veja <Link href="/conflitos">Resolvendo Conflitos</Link>.</p>

      <CodeBlock
        title="Resumo rápido"
        language="bash"
        code={`# Após "git merge feature" dar conflito:
git status
# both modified:   src/auth.ts

# Edite o arquivo, escolha entre <<<<<<< HEAD e >>>>>>> feature
nano src/auth.ts

# Marque como resolvido
git add src/auth.ts

# Conclua o merge
git commit
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de merge"
        language="bash"
        code={`git merge feature              # merge padrão
git merge --no-ff feature      # força merge commit
git merge --ff-only feature    # só ff, falha senão
git merge --squash feature     # tudo em 1 commit
git merge --abort              # cancelar em andamento
git merge -X ours feature      # prefere nosso lado em conflitos
git merge -X theirs feature    # prefere o lado deles
git revert -m 1 <merge-hash>   # desfaz merge pushado

git log main..feature          # preview: o que viria
git diff main...feature        # preview: diff completo
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/conflitos">Resolvendo Conflitos</Link> — guia completo</li>
        <li><Link href="/rebase">Rebase</Link> — alternativa que linearize histórico</li>
        <li><Link href="/cherry-pick">Cherry-pick</Link> — leve commits específicos sem merge</li>
        <li><Link href="/fluxos">Fluxos de Trabalho</Link> — quando usar merge vs rebase</li>
      </ul>
    </PageContainer>
  );
}
