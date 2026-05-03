import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Status() {
  return (
    <PageContainer
      title="Status e Diff"
      subtitle="Veja o que mudou, o que está staged e o que está intocado. Os comandos que você roda 50 vezes por dia."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        <code>git status</code> e <code>git diff</code> são os <strong>olhos</strong> do desenvolvedor Git. Antes de qualquer commit, push ou rebase, você roda esses comandos. Dominar a saída deles é a diferença entre commitar com confiança e commitar no escuro.
      </p>

      <AlertBox type="tip" title="Hábito profissional">
        Configure um alias <code>git st</code> para <code>git status -sb</code> (curto e com branch). Vai economizar horas da sua vida.
      </AlertBox>

      <h2>git status — o estado do mundo</h2>
      <CodeBlock
        title="Modo normal (verboso)"
        language="bash"
        code={`git status
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:           ← STAGED (vão pro próximo commit)
#   (use "git restore --staged <file>..." to unstage)
#         modified:   src/auth.ts
#
# Changes not staged for commit:     ← MODIFICADOS mas não staged
#   (use "git add <file>..." to update what will be committed)
#         modified:   src/login.ts
#
# Untracked files:                   ← ARQUIVOS NOVOS, Git ainda não conhece
#   (use "git add <file>..." to include in what will be committed)
#         src/novo-arquivo.ts
`}
      />

      <CodeBlock
        title="Modo curto (recomendado para o dia a dia)"
        language="bash"
        code={`git status -s
# M  src/auth.ts        ← Maiúscula esquerda = staged
#  M src/login.ts       ← Maiúscula direita = não staged
# ?? src/novo-arquivo.ts ← untracked
# A  src/feature.ts     ← Added (novo, staged)
# D  arquivo-deletado.ts ← Deleted, staged
# R  velho.ts -> novo.ts ← Renamed
# UU conflito.ts        ← em conflito de merge

# Adicione -b para mostrar branch + sincronia
git status -sb
# ## main...origin/main [ahead 2, behind 1]
#  M src/login.ts
`}
      />

      <h2>Decifrando os símbolos</h2>
      <CodeBlock
        title="Tabela de códigos do status -s"
        language="markdown"
        code={`Coluna 1 = staging area    Coluna 2 = working directory

' '  inalterado
M    modified
A    added (novo arquivo)
D    deleted
R    renamed
C    copied
U    unmerged (conflito)
?    untracked (Git ainda não viu)
!    ignored (no .gitignore)

Exemplos:
 M    modificado, NÃO staged
M     modificado e staged
MM    staged + modificado de novo depois
A     novo arquivo staged
??    arquivo novo, não staged
UU    em conflito de merge não resolvido
`}
      />

      <h2>git diff — o que mudou exatamente</h2>
      <CodeBlock
        title="Os 4 modos principais"
        language="bash"
        code={`# 1. Working directory vs staging
git diff
# (mostra o que você ainda PRECISA dar git add)

# 2. Staging vs último commit
git diff --staged
git diff --cached       # alias

# 3. Working directory vs último commit (tudo que mudou desde HEAD)
git diff HEAD

# 4. Comparar entre commits
git diff abc123 def456
git diff main..feature
git diff HEAD~3 HEAD    # últimos 3 commits
`}
      />

      <h2>Diff aprimorado</h2>
      <CodeBlock
        title="Variações úteis"
        language="bash"
        code={`# Só nomes dos arquivos que mudaram (sem mostrar conteúdo)
git diff --name-only
git diff --name-status        # com letra do tipo de mudança

# Estatísticas (linhas adicionadas/removidas por arquivo)
git diff --stat
# src/auth.ts     | 24 ++++++++++++------
# src/login.ts    |  8 ++++----
# 2 files changed, 20 insertions(+), 12 deletions(-)

# Resumo super-compacto
git diff --shortstat

# Diff palavra-por-palavra (em vez de linha-por-linha)
git diff --word-diff
git diff --color-words

# Ignorar mudanças de espaço em branco
git diff -w
git diff --ignore-all-space

# Diff de um arquivo só
git diff -- src/auth.ts

# Diff entre 2 branches num arquivo
git diff main feature -- src/auth.ts
`}
      />

      <AlertBox type="note" title="diff --stat é poderoso pra revisar PRs">
        Antes de revisar um Pull Request, rode <code>git diff main...feature --stat</code> para ter uma visão de pássaro: quantos arquivos, qual a magnitude, onde focar a atenção.
      </AlertBox>

      <h2>git diff em commits específicos</h2>
      <CodeBlock
        title="Comparações temporais"
        language="bash"
        code={`# O que mudou no último commit?
git show HEAD
git diff HEAD~1 HEAD

# O que mudou entre 2 tags?
git diff v1.0.0..v1.1.0

# O que esta branch tem que main não tem?
git diff main...feature
# (3 pontos = diff desde o ancestral comum, ideal para revisar PRs)

# O que main tem que feature não tem?
git log feature..main --oneline
`}
      />

      <h2>Diff colorido e paginado melhor</h2>
      <CodeBlock
        title="Configurações de diff"
        language="bash"
        code={`# Diff com algoritmo melhor (mais legível em refatorações)
git config --global diff.algorithm histogram

# Cores nos espaços em branco problemáticos (trailing spaces, tabs)
git config --global core.whitespace trailing-space,space-before-tab

# Usar 'delta' como pager (instale com: brew/apt install git-delta)
git config --global core.pager delta
git config --global delta.line-numbers true
git config --global delta.side-by-side true
`}
      />

      <h2>Inspecionar arquivos no histórico</h2>
      <CodeBlock
        title="Show e blame"
        language="bash"
        code={`# Ver o conteúdo de um arquivo em um commit específico
git show abc1234:src/auth.ts

# Ver QUEM mudou cada linha de um arquivo
git blame src/auth.ts
# a1b2c3d (Maria 2025-08-12 10:23:45) function login() {
# e5f6g7h (João  2025-09-04 14:15:22)   if (!user) throw new Error()
# ...

# Blame de um intervalo de linhas
git blame -L 10,20 src/auth.ts

# Blame ignorando whitespace e movimentos de código
git blame -w -M -C src/auth.ts
`}
      />

      <h2>Workflow recomendado antes de commitar</h2>
      <CodeBlock
        title="O ritual do commit consciente"
        language="bash"
        code={`# 1. Visão geral
git status -sb

# 2. Detalhes das mudanças não staged
git diff

# 3. Adicione o que faz sentido (interativo é o melhor)
git add -p

# 4. Confira o que VAI ser commitado
git diff --staged

# 5. Commit
git commit -m "feat: adiciona algo"
`}
      />

      <AlertBox type="warning" title="git add -p é seu melhor amigo">
        O modo interativo (<code>-p</code>) força você a olhar cada pedaço (hunk) antes de aceitar. Reduz drasticamente a chance de commitar <code>console.log</code>, debug code ou mudanças não relacionadas.
      </AlertBox>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Os essenciais"
        language="bash"
        code={`git status -sb              # estado curto + branch
git diff                    # mudanças não staged
git diff --staged           # mudanças staged
git diff HEAD               # tudo desde último commit
git diff main...feature     # diff de PR
git diff --stat             # resumo numérico
git show HEAD               # último commit completo
git blame arquivo           # quem mudou cada linha
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/staging">Staging Area</Link> — entenda o segundo estado do Git</li>
        <li><Link href="/commits">Commits</Link> — escreva commits que valem a pena</li>
        <li><Link href="/historico">Histórico</Link> — explore <code>git log</code> a fundo</li>
      </ul>
    </PageContainer>
  );
}
