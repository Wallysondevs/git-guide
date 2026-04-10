import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Staging() {
    return (
      <PageContainer
        title="Staging Area"
        subtitle="O índice do Git — como preparar commits precisos usando a área de staging."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          A staging area (também chamada de "índice" ou "index") é uma camada intermediária entre o working directory e os commits. Ela permite que você prepare exatamente o que vai entrar no próximo commit, com precisão cirúrgica.
        </p>

        <h2>Os três estados de um arquivo no Git</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { estado: "Working Directory", icone: "📝", desc: "Onde você edita os arquivos. Mudanças aqui são 'unstaged' — o Git sabe que mudaram mas não vai incluir no próximo commit.", cmd: "git diff" },
            { estado: "Staging Area", icone: "📋", desc: "Mudanças preparadas para o próximo commit. Você decide explicitamente o que vai aqui. 'Staged' ou 'indexed'.", cmd: "git diff --staged" },
            { estado: "Repositório", icone: "🔒", desc: "Commits permanentes. Uma vez aqui, o conteúdo está salvo no histórico e pode ser recuperado a qualquer momento.", cmd: "git log" },
          ].map((item) => (
            <div key={item.estado} className="p-4 border border-border rounded-xl bg-card text-center">
              <div className="text-3xl mb-2">{item.icone}</div>
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm">{item.estado}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs text-primary">{item.cmd}</code>
            </div>
          ))}
        </div>

        <h2>Adicionando à staging area</h2>
        <CodeBlock
          title="git add — formas de usar"
          code={`# Adicionar arquivo específico
  git add src/auth.js

  # Adicionar múltiplos arquivos
  git add src/auth.js src/user.js

  # Adicionar pasta inteira
  git add src/components/

  # Adicionar tudo (tracked + untracked)
  git add .
  git add -A  # equivalente — inclui deletados

  # Adicionar APENAS arquivos tracked (não novos)
  git add -u

  # Adicionar interativamente — escolher hunks
  git add -p src/app.js
  git add --patch src/app.js  # equivalente`}
        />

        <AlertBox type="info" title="git add -p — o comando mais importante que você não usa">
          O modo interativo (<code>-p</code>) permite adicionar partes específicas de um arquivo — não o arquivo inteiro. Essencial para criar commits atômicos quando você fez múltiplas mudanças no mesmo arquivo.
        </AlertBox>

        <h2>Staging interativo — modo patch</h2>
        <CodeBlock
          title="Comandos do modo patch (git add -p)"
          code={`# Iniciar modo interativo
  git add -p src/app.js

  # O Git mostra cada "hunk" (trecho de mudança) e pergunta:
  # Stage this hunk [y,n,q,a,d,s,e,?]?
  #
  # y = sim, adicionar este hunk
  # n = não, pular este hunk
  # q = sair, não adicionar mais nada
  # a = adicionar todos os hunks restantes
  # d = pular todos os hunks restantes no arquivo
  # s = dividir hunk em partes menores
  # e = editar o hunk manualmente
  # ? = ajuda

  # Após selecionar os hunks desejados:
  git status   # ver o que está staged
  git diff     # ver o que ficou fora (unstaged)
  git diff --staged  # ver o que vai no commit`}
        />

        <h2>Desfazendo staging</h2>
        <CodeBlock
          title="Removendo arquivos da staging area"
          code={`# Remover arquivo específico da staging area
  git restore --staged src/app.js
  # Mantém as mudanças no working directory — apenas desfaz o git add

  # Remover tudo da staging area
  git restore --staged .

  # Sintaxe antiga (ainda funciona)
  git reset HEAD src/app.js

  # Ver diferença entre staged e working directory
  git diff src/app.js           # working dir vs staged
  git diff --staged src/app.js  # staged vs último commit`}
        />

        <h2>Inspecionando a staging area</h2>
        <CodeBlock
          title="Verificando o que está staged"
          code={`# Ver status resumido
  git status
  git status -s  # formato curto (M = modified, A = added, ?? = untracked)

  # Ver diff das mudanças staged
  git diff --staged
  git diff --cached  # sinônimo de --staged

  # Ver lista de arquivos staged
  git diff --staged --name-only

  # Ver estatísticas (quantas linhas)
  git diff --staged --stat

  # Ver o conteúdo exato que vai no commit
  git show :src/app.js  # versão staged do arquivo`}
        />

        <h2>Workflow típico com staging</h2>
        <CodeBlock
          title="Criando commits atômicos com staging"
          code={`# Você editou auth.js (correção de bug) e user.js (nova feature)
  # Quer criar dois commits separados

  # Commit 1: correção de bug em auth.js
  git add src/auth.js
  git commit -m "fix: corrige validação de token expirado"

  # Commit 2: nova feature em user.js
  git add src/user.js
  git commit -m "feat: adiciona campo de preferências do usuário"

  # Ou com staging interativo para o mesmo arquivo:
  git add -p src/utils.js  # seleciona apenas o trecho do bugfix
  git commit -m "fix: corrige cálculo de data"
  git add src/utils.js     # adiciona o resto (nova feature)
  git commit -m "feat: adiciona formatação de data relativa"`}
        />

        <AlertBox type="success" title="A staging area é seu rascunho antes do commit">
          Pense na staging area como preparar um e-mail antes de enviar. Você monta tudo, revisa, ajusta — e só então commita. Use <code>git diff --staged</code> sempre antes de commitar para confirmar que o que vai no commit é exatamente o que você quer.
        </AlertBox>
      </PageContainer>
    );
  }
  