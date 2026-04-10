import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Rebase() {
    return (
      <PageContainer
        title="git rebase"
        subtitle="Reescreva o histórico de commits para manter um histórico linear, limpo e fácil de entender."
        difficulty="avancado"
        timeToRead="16 min"
      >
        <p>
          O <code>git rebase</code> move ou reaplica commits de um branch sobre outro, como se você tivesse começado sua feature a partir do commit mais recente. Resulta em um histórico linear, sem commits de merge, mas reescreve o histórico — o que exige cuidado.
        </p>

        <AlertBox type="danger" title="Regra de ouro do rebase: nunca em branches públicos">
          Nunca faça rebase em commits que já foram enviados para um repositório compartilhado e outros podem estar usando. Você estaria reescrevendo a história que outras pessoas basearam seu trabalho — causando problemas sérios.
        </AlertBox>

        <h2>Rebase vs Merge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">Merge — preserva o histórico real</h4>
            <pre className="text-xs text-muted-foreground">A---B---C---M  (main + merge commit M)
       \     /
        D---E  (feature)</pre>
          </div>
          <div className="p-4 border border-border rounded-xl bg-primary/5">
            <h4 className="font-bold mb-2 mt-0 border-0">Rebase — histórico linear</h4>
            <pre className="text-xs text-muted-foreground">A---B---C---D'---E'  (linear, sem merge commit)
           ↑
       feature rebased sobre main</pre>
          </div>
        </div>

        <h2>Rebase básico</h2>
        <CodeBlock
          title="Uso típico — atualizar branch com main"
          code={`# Situação: você está em feature/login e main avançou
  git switch feature/login

  # Rebase sobre o main atual
  git rebase main

  # O que acontece internamente:
  # 1. Git identifica onde feature/login divergiu do main
  # 2. Salva os commits de feature/login temporariamente
  # 3. Move feature/login para o HEAD do main
  # 4. Reaplica cada commit salvo, um por um

  # Se houver conflito durante o rebase:
  git status  # ver arquivos em conflito
  # ... resolver conflitos ...
  git add src/app.js
  git rebase --continue  # aplicar próximo commit

  # Ou abortar o rebase completamente
  git rebase --abort`}
        />

        <h2>Rebase interativo — reescrita de histórico</h2>
        <CodeBlock
          title="git rebase -i — o mais poderoso"
          code={`# Reescrever os últimos 4 commits
  git rebase -i HEAD~4
  # Abre o editor com:
  # pick abc1234 feat: adiciona formulário de login
  # pick def5678 fix: corrige typo
  # pick ghi9012 wip: trabalho em progresso
  # pick jkl3456 feat: finaliza sistema de login

  # Você pode:
  # pick   = manter o commit
  # reword = alterar a mensagem
  # edit   = parar para alterar o commit
  # squash = combinar com o commit anterior (mantém mensagens)
  # fixup  = combinar com o anterior (descarta mensagem)
  # drop   = deletar o commit completamente

  # Resultado após squash/fixup:
  # pick abc1234 feat: adiciona formulário de login
  # fixup def5678  ← combina com abc1234
  # fixup ghi9012  ← combina com abc1234
  # reword jkl3456  ← nova mensagem`}
        />

        <AlertBox type="info" title="Rebase interativo é a forma mais segura de rebase">
          Rebase interativo em commits <em>ainda não enviados</em> é completamente seguro. É a ferramenta certa para limpar mensagens confusas, remover commits de debug, e combinar WIPs antes de abrir um PR.
        </AlertBox>

        <h2>Casos de uso comuns</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { caso: "Atualizar feature branch com main", cmd: "git switch feature/x
git fetch origin
git rebase origin/main" },
            { caso: "Limpar commits antes do PR", cmd: "git rebase -i HEAD~5
# Squash WIPs, reword mensagens, drop commits de debug" },
            { caso: "Mover commits para branch correto", cmd: "git rebase --onto main feature-old feature-new" },
            { caso: "Separar um commit em dois", cmd: "git rebase -i HEAD~1
# edite o commit: git reset HEAD~1
# git add -p  →  git commit  →  git commit
# git rebase --continue" },
          ].map((item) => (
            <div key={item.caso} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-2 mt-0 border-0 text-sm">{item.caso}</h4>
              <pre className="text-xs text-muted-foreground font-mono">{item.cmd}</pre>
            </div>
          ))}
        </div>

        <h2>git pull --rebase</h2>
        <CodeBlock
          title="Pull com rebase em vez de merge"
          code={`# Em vez de: git pull (que cria commit de merge)
  git pull --rebase

  # Configura como padrão
  git config --global pull.rebase true
  # Agora 'git pull' sempre faz rebase

  # Se preferir merges no pull (padrão antigo):
  git config --global pull.rebase false

  # Para um único pull sem alterar o default:
  git pull --no-rebase`}
        />

        <h2>Rebase onto — mover commits entre branches</h2>
        <CodeBlock
          title="Rebase --onto para reestruturar branches"
          code={`# Situação: feature-b foi criada de feature-a, mas agora
  # precisa ir direto para o main
  #
  # Antes:  main → A → B (feature-a) → C → D (feature-b)
  # Depois: main → A → B (feature-a)
  #                ↓
  #              C' → D' (feature-b agora sobre main)

  git rebase --onto main feature-a feature-b
  # Sintaxe: --onto <novo-base> <ponto-de-corte> <branch-a-mover>`}
        />

        <AlertBox type="success" title="Quando usar rebase, quando usar merge">
          <strong>Rebase:</strong> antes de abrir um PR (para atualizar com main e limpar commits), sempre em branches locais. <strong>Merge:</strong> ao fechar um PR no main, ao integrar releases. Combine os dois: rebase para manter, merge para integrar.
        </AlertBox>
      </PageContainer>
    );
  }
  