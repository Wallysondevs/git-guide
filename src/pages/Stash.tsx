import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Stash() {
    return (
      <PageContainer
        title="git stash"
        subtitle="Guarde trabalho em andamento temporariamente e mude de contexto sem perder nada."
        difficulty="intermediario"
        timeToRead="12 min"
      >
        <p>
          O <code>git stash</code> "guarda na gaveta" suas mudanças não commitadas — tracked e untracked — para que você possa mudar de branch, fazer pull ou atender uma urgência, voltando ao seu trabalho exatamente como estava.
        </p>

        <h2>Uso básico</h2>
        <CodeBlock
          title="Comandos essenciais do stash"
          code={`# Guardar mudanças atuais
  git stash

  # Guardar com uma mensagem descritiva (recomendado)
  git stash push -m "wip: implementando validação de CPF"

  # Listar stashes salvos
  git stash list
  # stash@{0}: On main: wip: implementando validação de CPF
  # stash@{1}: WIP on feature/login: abc1234 feat: botão de login

  # Aplicar o stash mais recente (mantém o stash)
  git stash apply

  # Aplicar e remover da lista ao mesmo tempo
  git stash pop

  # Aplicar um stash específico
  git stash apply stash@{2}
  git stash pop stash@{1}`}
        />

        <AlertBox type="info" title="stash apply vs stash pop">
          Use <code>pop</code> quando tiver certeza que o stash foi aplicado com sucesso e não precisa mais dele. Use <code>apply</code> quando quiser manter o stash na lista como backup (útil se houver conflitos).
        </AlertBox>

        <h2>Opções avançadas do stash</h2>
        <CodeBlock
          title="Stash com mais controle"
          code={`# Incluir arquivos não rastreados (untracked)
  git stash push --include-untracked
  git stash push -u  # abreviação

  # Incluir TUDO: untracked e gitignored
  git stash push --all

  # Stash interativo — escolher quais hunks guardar
  git stash push --patch

  # Stash de um arquivo ou pasta específica
  git stash push -m "só src/" -- src/

  # Criar um branch a partir do stash
  git stash branch feature/nova-ideia stash@{0}
  # Cria branch, faz checkout e aplica o stash`}
        />

        <h2>Gerenciando a lista de stashes</h2>
        <CodeBlock
          title="Operações na lista de stashes"
          code={`# Ver conteúdo de um stash sem aplicar
  git stash show stash@{0}
  git stash show -p stash@{0}  # patch completo (diff)

  # Ver stash no formato de diff
  git stash show --stat stash@{1}

  # Remover um stash específico
  git stash drop stash@{0}

  # Limpar TODOS os stashes (cuidado!)
  git stash clear`}
        />

        <h2>Cenários comuns de uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            {
              titulo: "Urgência no meio do trabalho",
              code: "# Você está no meio de uma feature
# Surge um bug crítico em produção
git stash push -m 'wip: feature X'
git switch main
git switch -c hotfix/bug-critico
# ... corrige e faz PR ...
git switch feature/x
git stash pop",
            },
            {
              titulo: "Código no branch errado",
              code: "# Você commitou no main sem querer
# (se ainda não commitou — use stash)
git stash push -m 'trabalho no branch errado'
git switch feature/correta
git stash pop",
            },
          ].map((item) => (
            <div key={item.titulo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-2 mt-0 border-0 text-sm">{item.titulo}</h4>
              <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">{item.code}</pre>
            </div>
          ))}
        </div>

        <h2>Resolvendo conflitos ao aplicar stash</h2>
        <CodeBlock
          title="Stash com conflito"
          code={`# Ao aplicar stash que tem conflito
  git stash pop
  # Auto-merging src/app.js
  # CONFLICT (content): Merge conflict in src/app.js

  # O stash NÃO é removido da lista quando há conflito
  # Você precisa resolver e fazer drop manualmente

  # 1. Resolver conflitos
  git add src/app.js
  git restore --staged src/app.js  # ou commitar conforme necessário

  # 2. Remover o stash manualmente
  git stash drop stash@{0}`}
        />

        <AlertBox type="warning" title="Limite do stash: não é backup de longo prazo">
          O stash é para pausas curtas. Para trabalho que você vai retomar daqui a dias, prefira criar um branch: <code>git switch -c wip/minha-feature</code> e commitar como WIP. Branches têm mais visibilidade e segurança.
        </AlertBox>

        <h2>Fluxo recomendado com stash</h2>
        <CodeBlock
          title="Workflow ideal com stash"
          code={`# Antes de mudar de contexto:
  git status  # verificar o que tem pendente
  git stash push -m "contexto: descrição do que estava fazendo"

  # Fazer o trabalho no outro contexto...

  # Ao retornar:
  git stash list  # ver o que tem guardado
  git stash show -p stash@{0}  # revisar o que será aplicado
  git stash pop  # aplicar e remover`}
        />
      </PageContainer>
    );
  }
  