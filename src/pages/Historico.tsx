import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Historico() {
  return (
    <PageContainer
      title="Histórico de Commits"
      subtitle="git log é uma máquina do tempo. Veja como interrogar o histórico para encontrar QUANDO, QUEM e POR QUE."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git log"}</strong> {' — '} {"lista commits do branch atual."}
          </li>
        <li>
            <strong>{"--oneline --graph --all"}</strong> {' — '} {"visualização compacta de todos os branches."}
          </li>
        <li>
            <strong>{"--author / --grep"}</strong> {' — '} {"filtra por autor ou mensagem."}
          </li>
        <li>
            <strong>{"-p"}</strong> {' — '} {"mostra patch (diff) de cada commit."}
          </li>
        <li>
            <strong>{"Range"}</strong> {' — '} {"git log A..B = commits em B mas não em A."}
          </li>
        </ul>
        <p>
        Um repositório com 5 anos pode ter dezenas de milhares de commits. <code>git log</code> é a ferramenta para encontrar agulhas no palheiro: o commit que introduziu o bug, quem mudou aquela linha, qual foi a última versão estável.
      </p>

      <AlertBox type="tip" title="Configuração que muda tudo">
        Configure um alias <code>git lg</code> para <code>log --oneline --graph --decorate --all</code>. Você nunca mais vai usar <code>git log</code> "puro".
      </AlertBox>

      <h2>git log — o básico</h2>
      <CodeBlock
        title="Variações fundamentais"
        language="bash"
        code={`# Histórico completo (verboso)
git log

# Uma linha por commit
git log --oneline
# a1b2c3d (HEAD -> main, origin/main) feat: adiciona login
# e5f6g7h fix: corrige timeout
# 9i0j1k2 chore: bump deps

# Com gráfico de branches
git log --graph --oneline --decorate --all

# Últimos N commits
git log -5
git log -n 5
`}
      />

      <h2>Filtrando o histórico</h2>
      <CodeBlock
        title="Por autor, data, mensagem"
        language="bash"
        code={`# Por autor
git log --author="Maria"
git log --author="@empresa.com"

# Por mensagem (regex)
git log --grep="fix"
git log --grep="^feat\\|^fix" --extended-regexp

# Por data
git log --since="2 weeks ago"
git log --since="2025-01-01" --until="2025-06-30"
git log --since=yesterday

# Combinando filtros
git log --author="Maria" --since="1 month ago" --grep="auth"
`}
      />

      <h2>Filtrando por arquivo / código</h2>
      <CodeBlock
        title="Pickaxe — encontrando código que sumiu"
        language="bash"
        code={`# Histórico de mudanças em um arquivo
git log -- src/auth.ts

# Quem ESCREVEU/REMOVEU determinada string
git log -S "rateLimit" -- src/auth.ts
# ★ pickaxe: encontra o commit que adicionou ou removeu a string

# Mesma coisa, mas com regex
git log -G "rate.?limit" --pickaxe-regex

# Renomeações? Siga o arquivo no histórico
git log --follow src/auth.ts

# Mostra também o conteúdo (diff) de cada commit que mexeu
git log -p src/auth.ts

# Só os commits que mudaram entre N1 e N2 linhas
git log -L 10,30:src/auth.ts
`}
      />

      <AlertBox type="note" title="Pickaxe é mágico para investigação">
        <code>git log -S "stringQueSumiu"</code> encontra o commit exato que removeu (ou adicionou) aquela string. Isso resolve em 5 segundos investigações que sem isso levariam horas.
      </AlertBox>

      <h2>Formatos customizados</h2>
      <CodeBlock
        title="--pretty=format"
        language="bash"
        code={`# Formato customizado
git log --pretty=format:"%h | %an | %ar | %s"
# a1b2c3d | Maria | 2 hours ago | feat: adiciona login

# Placeholders úteis:
# %h  hash curto      %H  hash longo
# %an autor (nome)    %ae email
# %ar data relativa   %ad data absoluta
# %s  subject         %b  body
# %D  refs (branches/tags)
# %G? estado de assinatura

# Formatos pré-definidos
git log --pretty=oneline
git log --pretty=short
git log --pretty=full
git log --pretty=fuller
`}
      />

      <h2>Estatísticas</h2>
      <CodeBlock
        title="O quanto cada commit muda"
        language="bash"
        code={`# Resumo de arquivos por commit
git log --stat

# Stat compacto
git log --shortstat
# 3 files changed, 27 insertions(+), 4 deletions(-)

# Ranking de contribuidores
git shortlog -sn
git shortlog -sne          # com email
git shortlog -sn --since="1 year ago"

# Quem mais mexeu em um arquivo
git shortlog -sn -- src/auth.ts

# Linhas adicionadas/removidas por autor
git log --author="Maria" --pretty=tformat: --numstat | \\
  awk '{ a += $1; r += $2 } END { print "+"a, "-"r }'
`}
      />

      <h2>Comparando branches</h2>
      <CodeBlock
        title="O que diverge"
        language="bash"
        code={`# Commits em feature que NÃO estão em main
git log main..feature

# Commits em main que NÃO estão em feature
git log feature..main

# Commits que existem em UM dos dois mas não no outro (XOR)
git log main...feature --left-right
# < a1b2c3d feat: feature commit
# > e5f6g7h fix: main commit

# Commits em feature desde que ela divergiu de main
git log main...feature --left-right --oneline

# Visualizando lado a lado
git log --graph --oneline main feature
`}
      />

      <h2>Visualização avançada</h2>
      <CodeBlock
        title="Gráficos bonitos"
        language="bash"
        code={`# O comando "git lg" essencial
git log --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s %C(red)%d%Creset' --abbrev-commit --date=relative --all

# Salve como alias
git config --global alias.lg "log --graph --pretty=format:'%C(yellow)%h%Creset %C(cyan)%ad%Creset %C(green)%an%Creset %s %C(red)%d%Creset' --abbrev-commit --date=relative --all"

# Agora basta:
git lg
git lg -20

# GUI nativa do Git
gitk --all
git gui
`}
      />

      <h2>Procurando bugs no tempo</h2>
      <CodeBlock
        title="Quando algo quebrou?"
        language="bash"
        code={`# Mostra o último commit que mexeu numa linha específica
git log -L 10,15:src/auth.ts

# Quem mudou cada linha do arquivo (com hash de commit)
git blame src/auth.ts

# Blame de um intervalo
git blame -L 50,80 src/auth.ts

# Para investigação binária — veja Bisect
git bisect start
`}
      />

      <p>Para encontrar bugs por busca binária no histórico, veja <Link href="/bisect">git bisect</Link>.</p>

      <h2>Casos práticos</h2>

      <h3>1. "Quem foi que mudou esta linha e por quê?"</h3>
      <CodeBlock
        title="Investigação completa"
        language="bash"
        code={`# 1. Descubra qual commit mudou a linha
git blame -L 42,42 src/auth.ts
# a1b2c3d (Maria 2025-08-12) function login(user, opts = {}) {

# 2. Veja o commit completo
git show a1b2c3d

# 3. Veja o contexto (commits ao redor)
git log -5 a1b2c3d
`}
      />

      <h3>2. "O que entrou na release v1.5.0?"</h3>
      <CodeBlock
        title="Entre tags"
        language="bash"
        code={`# Tudo entre 2 versões
git log v1.4.0..v1.5.0 --oneline

# Só features e fixes (assumindo Conventional Commits)
git log v1.4.0..v1.5.0 --oneline --grep="^feat\\|^fix"

# Agrupado por autor
git shortlog v1.4.0..v1.5.0
`}
      />

      <h3>3. "Estou desde quando trabalhando neste branch?"</h3>
      <CodeBlock
        title="Idade do branch"
        language="bash"
        code={`# Primeiro commit ÚNICO da branch
git log main..HEAD --reverse --oneline | head -1

# Quanto tempo desde o ancestral comum?
git log -1 --format=%ar $(git merge-base main HEAD)
# 6 days ago
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Os essenciais"
        language="bash"
        code={`git log --oneline --graph --all --decorate    # gráfico bonito
git log -10                                   # últimos 10
git log --author="Maria"                      # por autor
git log --since="1 week ago"                  # por data
git log --grep="fix"                          # por mensagem
git log -S "string"                           # pickaxe
git log -p arquivo                            # com diff
git log --follow arquivo                      # segue renames
git log main..feature                         # diverge
git shortlog -sn                              # ranking de autores
git blame arquivo                             # quem fez cada linha
git show <hash>                               # commit completo
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/bisect">Bisect</Link> — busca binária por bugs no histórico</li>
        <li><Link href="/reflog">Reflog</Link> — o histórico secreto que salva sua vida</li>
        <li><Link href="/tags">Tags e Versões</Link> — marque pontos importantes</li>
      </ul>
    </PageContainer>
  );
}
