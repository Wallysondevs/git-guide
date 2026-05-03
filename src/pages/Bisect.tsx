import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Bisect() {
  return (
    <PageContainer
      title="Bisect"
      subtitle="Busca binária no histórico para encontrar exatamente qual commit introduziu um bug — em log(N) passos."
      difficulty="avancado"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git bisect"}</strong> {' — '} {"busca binária para achar o commit que introduziu bug."}
          </li>
        <li>
            <strong>{"bisect start/good/bad"}</strong> {' — '} {"marca pontos conhecidos; Git escolhe o meio."}
          </li>
        <li>
            <strong>{"bisect run script.sh"}</strong> {' — '} {"automatiza testando cada commit."}
          </li>
        <li>
            <strong>{"bisect reset"}</strong> {' — '} {"volta ao HEAD original."}
          </li>
        <li>
            <strong>{"bisect skip"}</strong> {' — '} {"pula commit sem afetar a busca (build quebrado, etc)."}
          </li>
        </ul>
        <p>
        Você sabe que algo funcionava na versão 1.0 e quebrou na 1.5. Entre elas, 500 commits. Como achar o culpado? <code>git bisect</code> faz busca binária: você marca commits como "good" ou "bad", e o Git divide o intervalo em 9 testes para identificar exatamente o commit que introduziu o bug.
      </p>

      <AlertBox type="tip" title="Matemática">
        500 commits → 9 passos. 1000 commits → 10 passos. 1 milhão → 20 passos. Bisect é poderoso porque é <strong>logarítmico</strong>.
      </AlertBox>

      <h2>Workflow básico</h2>
      <CodeBlock
        title="git bisect manual"
        language="bash"
        code={`# 1. Inicia o bisect
git bisect start

# 2. Marca o estado atual como bad (bug presente)
git bisect bad
git bisect bad HEAD

# 3. Marca um ponto antigo como good (bug não estava lá)
git bisect good v1.0.0
git bisect good abc1234

# Saída:
# Bisecting: 250 revisions left to test after this (roughly 9 steps)
# [7p8q9r0] commit do meio

# 4. Testa o commit que o Git checkou
npm test                    # ou rode o app, ou faça o teste manual

# 5. Se passou → "good", se falhou → "bad"
git bisect good
# OU
git bisect bad

# Repita 3-5 até o Git anunciar:
# 7p8q9r0 is the first bad commit
# Author: Maria
# Date: ...
# feat: refactor login

# 6. Encerra o bisect (volta ao estado anterior)
git bisect reset
`}
      />

      <h2>Bisect automatizado — o ouro</h2>
      <p>Se você tem um <strong>script</strong> que retorna 0 (good) ou 1 (bad), o Git faz tudo sozinho.</p>

      <CodeBlock
        title="git bisect run"
        language="bash"
        code={`# Bisect totalmente automático
git bisect start HEAD v1.0.0
git bisect run npm test

# O Git vai:
# 1. Checkout no commit do meio
# 2. Rodar npm test
# 3. Marcar good (exit 0) ou bad (exit ≠ 0)
# 4. Repetir até achar
# 5. Imprimir o commit culpado

# Exit codes especiais:
# 125 = "skip" (commit não pode ser testado, ex: build quebrado)
# 0   = good
# 1-124, 126-127 = bad
# 128+ = aborta o bisect
`}
      />

      <CodeBlock
        title="Script de teste customizado"
        language="bash"
        code={`# .bisect-test.sh
#!/bin/bash
set -e

# Build (se quebrar, skip — não é nosso bug)
npm install || exit 125
npm run build || exit 125

# Teste o caso específico do bug
result=\$(node -e 'console.log(require("./dist").calc(10, 5))')

if [ "\$result" = "15" ]; then
  exit 0   # good
else
  exit 1   # bad
fi
`}
      />

      <CodeBlock
        title="Usando o script"
        language="bash"
        code={`chmod +x .bisect-test.sh

git bisect start HEAD v1.0.0
git bisect run ./.bisect-test.sh

# Saída final:
# 7p8q9r0 is the first bad commit
# 50 commits testados, 9 iterações
`}
      />

      <h2>Termos customizados</h2>
      <p>Em vez de "good/bad", você pode usar termos que fazem sentido pro seu caso:</p>

      <CodeBlock
        title="--term"
        language="bash"
        code={`# Para investigar regressão de performance
git bisect start --term-old fast --term-new slow
git bisect slow HEAD
git bisect fast v1.0.0

# Para feature que parou de funcionar
git bisect start --term-old works --term-new broken
git bisect broken
git bisect works v1.5.0
`}
      />

      <h2>Gerenciando o bisect</h2>
      <CodeBlock
        title="Comandos úteis durante bisect"
        language="bash"
        code={`# Ver onde você está
git bisect log
git bisect visualize         # abre gitk com o range restante
git bisect view              # mesma coisa

# Pular um commit que não pode ser testado
git bisect skip
git bisect skip v1.2..v1.3   # pular range inteiro

# Voltar atrás (oops, marquei errado)
git bisect log > /tmp/bisect.log
# Edite /tmp/bisect.log removendo as linhas erradas
git bisect reset
git bisect replay /tmp/bisect.log

# Encerrar e voltar ao estado anterior
git bisect reset
`}
      />

      <h2>Caso prático completo</h2>
      <CodeBlock
        title="Encontrando regressão"
        language="bash"
        code={`# Bug: API retorna 500 desde "ontem"
# Última versão sabida boa: v1.5.0

git bisect start
git bisect bad
git bisect good v1.5.0

# Crie script de teste rápido
cat > test-bug.sh <<'EOF'
#!/bin/bash
npm install --silent || exit 125
npm run build --silent || exit 125
npm start --silent &
SERVER=\$!
sleep 3
status=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users)
kill \$SERVER 2>/dev/null
[ "\$status" = "200" ] && exit 0 || exit 1
EOF
chmod +x test-bug.sh

git bisect run ./test-bug.sh

# Output:
# 7p8q9r0 is the first bad commit
# Author: João
# Date: 2 days ago
# refactor: simplifica handler de users

git show 7p8q9r0     # examine o problema
git bisect reset

# Avise o autor, abra issue, faça fix
`}
      />

      <h2>Preparando seu repo para bisect eficiente</h2>
      <ul>
        <li><strong>Commits atômicos</strong> — quanto menores, mais preciso bisect.</li>
        <li><strong>Cada commit deve buildar</strong> — senão você vai dar muito skip.</li>
        <li><strong>Testes rápidos</strong> — bisect roda 9-20 vezes; se cada teste leva 10min, são 3 horas.</li>
        <li><strong>CI por commit</strong> — se todo commit já está testado, bisect é trivial.</li>
      </ul>

      <h2>Bisect em monorepos</h2>
      <CodeBlock
        title="Restrito a um caminho"
        language="bash"
        code={`# Só considera commits que mexeram em src/auth/
git bisect start -- src/auth/
git bisect bad
git bisect good v1.5.0
git bisect run ./test-auth.sh

# Diminui drasticamente o número de commits testados
`}
      />

      <h2>Bisect remoto — colaborativo</h2>
      <CodeBlock
        title="Compartilhar progresso"
        language="bash"
        code={`# Salvar o log do bisect
git bisect log > bisect.log

# Outro dev pode continuar de onde você parou
git bisect start
git bisect replay bisect.log
# ... continua os passos
`}
      />

      <h2>Visualizando o que sobrou</h2>
      <CodeBlock
        title="Range remanescente"
        language="bash"
        code={`# Quantos commits restam para testar?
git bisect view --oneline
git rev-list --count refs/bisect/bad..refs/bisect/good

# GUI
git bisect visualize    # abre gitk
gitk refs/bisect/bad..refs/bisect/good
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Workflow bisect"
        language="bash"
        code={`# Manual
git bisect start
git bisect bad [HEAD]
git bisect good v1.0.0
git bisect good / bad     # repita
git bisect skip           # se commit não testável
git bisect reset          # encerrar

# Automático (★)
git bisect start HEAD v1.0.0
git bisect run ./test.sh

# Outras
git bisect log            # ver histórico
git bisect log > f && git bisect replay f   # reproduzir
git bisect visualize      # GUI
git bisect start -- path  # restringir a caminho

# Termos custom
git bisect start --term-old works --term-new broken
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/historico">Histórico</Link> — outras formas de investigar</li>
        <li><Link href="/reflog">Reflog</Link> — histórico de operações locais</li>
        <li><Link href="/dicas">Dicas e Truques</Link> — mais ferramentas de investigação</li>
      </ul>
    </PageContainer>
  );
}
