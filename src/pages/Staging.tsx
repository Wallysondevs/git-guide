import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Staging() {
  return (
    <PageContainer
      title="Staging Area"
      subtitle="A área de preparação do Git — uma das funcionalidades mais poderosas e exclusivas do Git."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        A <strong>Staging Area</strong> (também chamada de <em>Index</em> ou <em>Área de Preparação</em>) é um dos conceitos mais únicos e poderosos do Git. Ela permite que você monte commits cirurgicamente, escolhendo exatamente o que vai no próximo commit.
      </p>

      <h2>Por que a Staging Area existe?</h2>
      <p>
        Imagine que você trabalhou durante horas e fez diversas mudanças: corrigiu um bug, adicionou uma nova funcionalidade e refatorou um arquivo. São três histórias diferentes. A staging area permite que você quebre isso em três commits separados e organizados.
      </p>

      <CodeBlock
        title="O conceito da staging area"
        code={`# Você modificou 3 arquivos com propósitos diferentes:
# - bug.js    (correção de bug)
# - feature.js (nova funcionalidade)  
# - util.js   (refatoração)

# Commit 1: apenas a correção de bug
git add bug.js
git commit -m "Corrige: login não funciona com email em maiúsculo"

# Commit 2: apenas a nova funcionalidade
git add feature.js
git commit -m "Adiciona: exportar dados em formato CSV"

# Commit 3: a refatoração
git add util.js
git commit -m "Refatora: extrai função formatDate para utilitários"`}
      />

      <h2>git add — Adicionando à Staging Area</h2>
      <CodeBlock
        title="Diferentes formas de git add"
        code={`# Adicionar um arquivo específico
git add arquivo.txt

# Adicionar múltiplos arquivos
git add arquivo1.js arquivo2.js

# Adicionar todos os arquivos modificados e novos
git add .
git add -A

# Adicionar todos os arquivos com uma extensão
git add "*.js"
git add src/*.ts

# Adicionar um diretório inteiro
git add src/

# Modo interativo — escolhe linha por linha
git add -p    # ou --patch`}
      />

      <h2>git add -p — Staging Interativo</h2>
      <p>
        O <code>git add -p</code> é um dos recursos mais poderosos do Git. Ele divide as mudanças em "hunks" e pergunta um a um o que você quer adicionar.
      </p>

      <CodeBlock
        title="Staging interativo (-p / --patch)"
        code={`git add -p arquivo.js

# O Git mostra cada hunk e pergunta:
# Stage this hunk [y,n,q,a,d,/,s,?]?

# Opções:
# y = sim, adicionar este hunk
# n = não, pular este hunk
# s = dividir em hunks menores
# q = sair e não adicionar mais nada
# a = adicionar este e todos os hunks restantes
# d = não adicionar este nem os restantes
# ? = ajuda`}
      />

      <AlertBox type="info" title="Dica Profissional">
        Usar <code>git add -p</code> regularmente melhora muito a qualidade dos seus commits. Você evita commitar código de debug, <code>console.log</code> esquecidos e mudanças não relacionadas.
      </AlertBox>

      <h2>Removendo da Staging Area</h2>
      <CodeBlock
        title="Desfazendo git add"
        code={`# Remove um arquivo da staging area (mantém as mudanças no working dir)
git restore --staged arquivo.txt

# Remove todos os arquivos da staging area
git restore --staged .

# Forma antiga (ainda funciona)
git reset HEAD arquivo.txt`}
      />

      <h2>Descartando Mudanças</h2>
      <CodeBlock
        title="Desfazendo mudanças no working directory"
        code={`# Descarta mudanças de um arquivo (IRREVERSÍVEL!)
git restore arquivo.txt

# Descarta TODAS as mudanças não staged (CUIDADO!)
git restore .

# Forma antiga (ainda funciona)
git checkout -- arquivo.txt`}
      />

      <AlertBox type="danger" title="Atenção: Ação Irreversível">
        <code>git restore arquivo.txt</code> descarta permanentemente as mudanças não commitadas. O Git não tem "lixeira" — essas mudanças são perdidas para sempre. Tenha certeza antes de executar.
      </AlertBox>

      <h2>Visualizando o que está Staged</h2>
      <CodeBlock
        title="Inspecionando a staging area"
        code={`# Ver o que está na staging area vs último commit
git diff --staged

# Ver apenas os nomes dos arquivos staged
git diff --staged --name-only

# Status detalhado
git status -v`}
      />
    </PageContainer>
  );
}
