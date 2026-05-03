import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Stash() {
  return (
    <PageContainer
      title="Stash"
      subtitle="Guarde mudanças no bolso para limpar o working directory sem commitar — e recupere quando quiser."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git stash"}</strong> {' — '} {"guarda mudanças não commitadas em pilha."}
          </li>
        <li>
            <strong>{"stash pop / apply"}</strong> {' — '} {"aplica + remove / aplica e mantém."}
          </li>
        <li>
            <strong>{"stash -u"}</strong> {' — '} {"inclui untracked."}
          </li>
        <li>
            <strong>{"stash list"}</strong> {' — '} {"lista todos os stashes (stash@{0}, etc)."}
          </li>
        <li>
            <strong>{"stash branch"}</strong> {' — '} {"cria branch novo a partir do stash."}
          </li>
        </ul>
        <p>
        <strong>Stash</strong> é o "ctrl+x mental" do Git. Você está no meio de um trabalho, precisa trocar de branch para ver outra coisa, mas não quer commitar lixo. Stash guarda tudo, limpa o working, e devolve depois quando você pedir.
      </p>

      <AlertBox type="tip" title="Quando usar stash">
        Quando você tem mudanças não commitadas e precisa: <strong>trocar de branch</strong>, <strong>fazer um pull</strong>, <strong>rebasear</strong>, ou só <strong>limpar temporariamente</strong>. Para guardar trabalho a longo prazo, prefira commitar em um branch.
      </AlertBox>

      <h2>Comandos básicos</h2>
      <CodeBlock
        title="Stash flow"
        language="bash"
        code={`# Guardar todas as mudanças (tracked)
git stash
# Saved working directory and index state WIP on main: a1b2c3d feat: ...

# Versão moderna (mesma coisa, mais explícita)
git stash push

# Com mensagem descritiva (★ recomendado)
git stash push -m "wip: investigando bug do Stripe"

# Listar tudo que está stashed
git stash list
# stash@{0}: On main: wip: investigando bug do Stripe
# stash@{1}: WIP on feature/login: a1b2c3d feat: ...

# Aplicar o último stash (e REMOVÊ-LO da pilha)
git stash pop

# Aplicar o último mas MANTER na pilha
git stash apply

# Aplicar um específico
git stash apply stash@{2}
git stash pop stash@{2}
`}
      />

      <h2>Incluindo arquivos novos (untracked)</h2>
      <CodeBlock
        title="-u e -a"
        language="bash"
        code={`# Por padrão, git stash IGNORA arquivos não-rastreados (untracked)
# Para incluí-los:
git stash -u
git stash --include-untracked

# Para incluir até IGNORADOS (do .gitignore)
git stash -a
git stash --all
`}
      />

      <AlertBox type="warning" title="Untracked é a pegadinha mais comum">
        Por padrão, <code>git stash</code> NÃO guarda arquivos novos que você ainda não <code>git add</code>-ou. Se você criar um arquivo novo e fizer stash, ele continua no working — pode parecer que sumiu. Use sempre <code>-u</code> para incluir.
      </AlertBox>

      <h2>Stash parcial — só alguns arquivos</h2>
      <CodeBlock
        title="Pathspec e patch"
        language="bash"
        code={`# Stash apenas arquivos específicos
git stash push src/auth.ts src/login.ts -m "wip: auth"

# Modo interativo (escolhe hunks como em git add -p)
git stash push -p
git stash --patch

# Stash mantendo o que já está STAGED
git stash push --keep-index
# (útil quando você quer testar SÓ o que vai commitar)
`}
      />

      <h2>Inspecionando stashes</h2>
      <CodeBlock
        title="Ver o conteúdo"
        language="bash"
        code={`# Resumo (estatísticas)
git stash show
git stash show stash@{1}

# Diff completo
git stash show -p
git stash show -p stash@{1}

# Ver só os arquivos
git stash show --name-only

# Buscar texto em todos os stashes
git stash list -p | grep "rateLimit"
`}
      />

      <h2>Removendo stashes</h2>
      <CodeBlock
        title="Limpeza"
        language="bash"
        code={`# Remover um stash específico
git stash drop stash@{0}

# Limpar TODOS os stashes (CUIDADO)
git stash clear
`}
      />

      <AlertBox type="danger" title="stash drop e clear são destrutivos">
        Stashes apagados <strong>somem do reflog também</strong> em poucas semanas. Se descartar o errado, recuperar é difícil (mas possível — veja <Link href="/recuperacao">Recuperação</Link>).
      </AlertBox>

      <h2>Conflitos ao aplicar stash</h2>
      <CodeBlock
        title="Quando o pop dá ruim"
        language="bash"
        code={`git stash pop
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
# The stash entry is kept in case you need it again.
# (★ pop NÃO removeu o stash porque deu conflito)

# Resolva os conflitos como em qualquer merge
nano src/auth.ts
git add src/auth.ts

# Agora descarte o stash manualmente
git stash drop
`}
      />

      <h2>Transformando stash em branch</h2>
      <CodeBlock
        title="git stash branch"
        language="bash"
        code={`# Cria branch a partir do commit onde o stash foi feito,
# aplica o stash, e remove o stash da pilha
git stash branch experimental-fix stash@{0}

# Útil quando o stash ficou velho e dá conflito ao aplicar
# (este comando aplica em cima do contexto original, sem conflito)
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Trocar de branch no meio do trabalho</h3>
      <CodeBlock
        title="Cenário clássico"
        language="bash"
        code={`# Você está mexendo em feature/auth, mas precisa olhar feature/payments
git stash push -u -m "wip: investigando bug auth"
git switch feature/payments
# ... investiga ...
git switch feature/auth
git stash pop
`}
      />

      <h3>2. Pull rejeitado por mudanças locais</h3>
      <CodeBlock
        title="Stash + pull + pop"
        language="bash"
        code={`git pull
# error: Your local changes to the following files would be overwritten by merge:
# 	src/auth.ts

git stash
git pull
git stash pop

# OU em uma linha (Git ≥ 2.6):
git pull --autostash
# Configure como padrão:
git config --global rebase.autoStash true
`}
      />

      <h3>3. Testar como o código fica SEM as mudanças atuais</h3>
      <CodeBlock
        title="Stash temporário"
        language="bash"
        code={`# Guarda
git stash

# Testa
npm test

# Recupera
git stash pop
`}
      />

      <h3>4. Aplicar mesmo trabalho em 2 branches</h3>
      <CodeBlock
        title="Apply em vários lugares"
        language="bash"
        code={`# No branch A
git stash push -m "fix common"

# Aplique em A
git stash apply
git commit -am "fix: ..."

# Vá pra B e aplique o MESMO stash
git switch feature-b
git stash apply
git commit -am "fix: ..."

# Quando terminar, descarte
git stash drop
`}
      />

      <h2>Stash não é eterno</h2>
      <p>Stashes ficam no <code>refs/stash</code> e seguem regras do reflog: por padrão, expiram em <strong>30 dias após drop</strong> e <strong>90 dias se nunca aplicados</strong>. Para trabalho importante, sempre prefira commit em uma branch (até temporária).</p>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de stash"
        language="bash"
        code={`git stash                          # guarda (tracked)
git stash -u                       # inclui untracked (★)
git stash push -m "msg"            # com mensagem
git stash push -p                  # interativo
git stash list                     # ver pilha
git stash show -p [stash@{N}]      # diff
git stash pop                      # aplica e remove
git stash apply [stash@{N}]        # aplica e mantém
git stash drop [stash@{N}]         # remove
git stash clear                    # remove todos
git stash branch <nome> [stash@{N}] # vira branch
git pull --autostash               # pull com stash automático
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/branches">Branches</Link> — para trabalho mais persistente que stash</li>
        <li><Link href="/reset">Reset e Revert</Link> — outras formas de manipular o estado</li>
        <li><Link href="/recuperacao">Recuperação</Link> — se você dropou o stash errado</li>
      </ul>
    </PageContainer>
  );
}
