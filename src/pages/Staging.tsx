import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Staging() {
  return (
    <PageContainer
      title="Staging Area"
      subtitle="O conceito mais característico do Git e por que ele te dá superpoderes que nenhum outro VCS oferece."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Staging area / index"}</strong> {' — '} {"snapshot proposto para o próximo commit."}
          </li>
        <li>
            <strong>{"git add"}</strong> {' — '} {"move arquivo do working para staging."}
          </li>
        <li>
            <strong>{"git add -p"}</strong> {' — '} {"interativo: escolhe hunks específicos."}
          </li>
        <li>
            <strong>{"git restore --staged"}</strong> {' — '} {"desfaz add (reverso)."}
          </li>
        <li>
            <strong>{"git diff vs --staged"}</strong> {' — '} {"mostra mudanças no working vs staging."}
          </li>
        </ul>
        <p>
        A <strong>staging area</strong> (também chamada <em>index</em>) é o que separa o Git de quase todos os outros sistemas de controle de versão. Ela é uma área intermediária entre seus arquivos editados e o histórico permanente — um <strong>rascunho do próximo commit</strong>.
      </p>

      <AlertBox type="tip" title="Por que isso importa">
        Sem staging, todo commit seria "tudo o que mudou desde o último". Com staging, você compõe commits com cirurgia: <strong>esta linha sim, aquela não, este arquivo agora, o resto depois</strong>.
      </AlertBox>

      <h2>O modelo dos 3 estados</h2>
      <CodeBlock
        title="A jornada de um arquivo"
        language="markdown"
        code={`     [ Working Directory ]    ← você edita aqui
              ↓ git add
     [   Staging Area    ]    ← rascunho do próximo commit
              ↓ git commit
     [   Repositório      ]    ← histórico permanente (.git/objects)

Para voltar:
- git restore <arquivo>             → working ← staging (descarta edição)
- git restore --staged <arquivo>    → staging ← working (unstage)
- git checkout <hash> -- <arquivo>  → working ← repositório
`}
      />

      <h2>Adicionando ao stage</h2>
      <CodeBlock
        title="git add — variações"
        language="bash"
        code={`# Arquivo específico
git add src/auth.ts

# Múltiplos arquivos
git add src/auth.ts src/login.ts

# Todos os arquivos modificados E novos da pasta atual
git add .

# Todos os tracked modificados (NÃO inclui novos)
git add -u
git add --update

# Tudo do projeto inteiro (de qualquer subpasta)
git add -A
git add --all

# Por padrão de glob
git add "src/**/*.ts"
git add "*.md"
`}
      />

      <h2>O modo interativo — o superpoder</h2>
      <p>O modo <code>-p</code> (patch) divide cada arquivo em "hunks" e te pergunta um por um o que adicionar. <strong>Mude sua vida com isso.</strong></p>

      <CodeBlock
        title="git add -p"
        language="bash"
        code={`git add -p src/auth.ts
# diff --git a/src/auth.ts b/src/auth.ts
# @@ -10,3 +10,5 @@
#  function login(user) {
# +  console.log('debug', user)   ← não quero este
#    return verify(user)
# +  // TODO: rate limit          ← este sim
#  }
# Stage this hunk [y,n,q,a,d,s,e,?]?
#
# y = sim
# n = não
# q = sair
# a = sim para este e todos os próximos do arquivo
# d = não para este e todos os próximos do arquivo
# s = SPLIT em hunks menores ★
# e = EDIT manualmente (escolhe linha por linha) ★
# ? = ajuda
`}
      />

      <AlertBox type="note" title="Split e Edit são ouro">
        Quando o hunk é grande demais, aperte <code>s</code> para dividi-lo. Quando ainda assim ficar misturado, <code>e</code> abre seu editor para escolher LINHA POR LINHA o que stage.
      </AlertBox>

      <h2>Removendo do stage (unstage)</h2>
      <CodeBlock
        title="git restore --staged"
        language="bash"
        code={`# Tirar um arquivo do stage (mantém edições no working)
git restore --staged src/auth.ts

# Tirar tudo
git restore --staged .

# Forma antiga (ainda funciona em scripts/CI)
git reset HEAD src/auth.ts

# Tirar do stage interativamente
git reset -p
`}
      />

      <h2>Vendo o que está staged</h2>
      <CodeBlock
        title="Inspecionando o índice"
        language="bash"
        code={`# Diff do que está no stage vs último commit
git diff --staged
git diff --cached       # mesmo comando

# Lista os arquivos que estão no stage
git diff --staged --name-only

# Estatísticas do que vai no próximo commit
git diff --staged --stat

# Mostra o conteúdo exato de um arquivo no índice
git show :src/auth.ts
`}
      />

      <h2>Casos práticos do dia a dia</h2>

      <h3>Cenário 1: misturei 2 features no mesmo arquivo</h3>
      <CodeBlock
        title="Separando em 2 commits"
        language="bash"
        code={`# Você editou login.ts com bugfix + nova feature, sem querer
git add -p login.ts
# Aceite só os hunks do bugfix (y/n hunk a hunk)
git commit -m "fix: corrige timeout no login"

# Agora os hunks restantes (a feature) ainda estão no working
git add login.ts
git commit -m "feat: adiciona MFA opcional"
`}
      />

      <h3>Cenário 2: descartar mudanças não commitadas</h3>
      <CodeBlock
        title="git restore"
        language="bash"
        code={`# Descartar edições de um arquivo (volta ao último commit)
git restore src/auth.ts

# Descartar TUDO no working directory
git restore .

# Restaurar um arquivo de outro commit
git restore --source=HEAD~3 src/legado.ts

# Restaurar tanto staging quanto working
git restore --staged --worktree src/auth.ts
`}
      />

      <AlertBox type="danger" title="git restore é destrutivo">
        <code>git restore arquivo</code> apaga edições <strong>sem confirmação e sem volta</strong> (não vai pro reflog). Tenha certeza antes de usar. Em caso de dúvida, prefira <code>git stash</code>.
      </AlertBox>

      <h3>Cenário 3: arquivos novos que ainda não quero rastrear</h3>
      <CodeBlock
        title="Untracked vs ignored"
        language="bash"
        code={`# Adicione ao .gitignore para o Git parar de avisar
echo "config.local.json" >> .gitignore
git add .gitignore
git commit -m "chore: ignora config local"

# Para um arquivo já trackeado: pare de rastrear sem apagar
git rm --cached config.json
echo "config.json" >> .gitignore
git commit -m "chore: remove config do tracking"
`}
      />

      <h3>Cenário 4: um arquivo enorme demais — quero excluir do commit que estou prestes a fazer</h3>
      <CodeBlock
        title="Excluindo padrões do add"
        language="bash"
        code={`# Adicionar tudo EXCETO certos arquivos
git add . ':!*.log' ':!dist/'

# Equivalente com --pathspec
git add . ':(exclude)dist/' ':(exclude,glob)*.log'
`}
      />

      <h2>O índice por dentro</h2>
      <CodeBlock
        title="Inspecionando .git/index"
        language="bash"
        code={`# Lista o conteúdo completo do índice
git ls-files --stage
# 100644 a1b2c3d... 0    src/auth.ts
# 100644 e5f6g7h... 0    src/login.ts
# (modo)  (hash)   (estágio) (caminho)

# Estágio 0 = normal
# Estágios 1, 2, 3 = conflito de merge (base, ours, theirs)

# Esvaziar completamente o índice (sem tocar working)
git rm -r --cached .

# Re-adicionar tudo (útil após mudar .gitignore)
git add .
`}
      />

      <h2>Padrão profissional: micro-commits</h2>
      <p>Use a staging area para fazer commits <strong>pequenos, atômicos e bem delimitados</strong>. Cada commit deve representar UMA mudança lógica — não um "salvo do dia".</p>

      <CodeBlock
        title="Bom vs ruim"
        language="diff"
        code={`# ❌ Ruim
- "muitas coisas"
- "wip"
- "fix tudo"

# ✅ Bom
+ "feat(auth): adiciona MFA via TOTP"
+ "fix(auth): timeout aumentado para 30s"
+ "refactor(auth): extrai validação para módulo"
+ "test(auth): cobre cenário de token expirado"
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos da staging area"
        language="bash"
        code={`git add <arquivo>           # ao stage
git add -p                  # interativo (★)
git add -A                  # tudo do projeto
git add -u                  # só tracked modificados

git restore --staged <f>    # remove do stage
git restore <f>             # descarta edição (cuidado!)

git diff                    # working vs stage
git diff --staged           # stage vs último commit
git ls-files --stage        # ver índice cru

git rm --cached <f>         # parar de rastrear sem apagar
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/commits">Fazendo Commits</Link> — agora que você sabe stagear, escreva commits exemplares</li>
        <li><Link href="/stash">Stash</Link> — guarde mudanças sem commitar</li>
        <li><Link href="/reset">Reset e Revert</Link> — desfazendo commits que já existem</li>
      </ul>
    </PageContainer>
  );
}
