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
            <p className="text-sm text-muted-foreground">Cria um commit de merge que une dois branches. O histórico mostra exatamente como e quando cada feature foi desenvolvida e integrada.</p>
            <code className="text-xs text-muted-foreground mt-2 block">git merge feature/login</code>
          </div>
          <div className="p-4 border border-border rounded-xl bg-primary/5">
            <h4 className="font-bold mb-2 mt-0 border-0">Rebase — histórico linear</h4>
            <p className="text-sm text-muted-foreground">Reaplica commits do feature sobre o main atual. Histórico fica linear sem commits de merge, como se a feature tivesse sido escrita depois das mudanças do main.</p>
            <code className="text-xs text-muted-foreground mt-2 block">git rebase main</code>
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
  # drop   = deletar o commit completamente`}
        />

        <AlertBox type="info" title="Rebase interativo é a forma mais segura de rebase">
          Rebase interativo em commits <em>ainda não enviados</em> é completamente seguro. É a ferramenta certa para limpar mensagens confusas, remover commits de debug, e combinar WIPs antes de abrir um PR.
        </AlertBox>

        <h2>Casos de uso comuns</h2>
        <CodeBlock
          title="Atualizar feature branch com main"
          code={`git switch feature/x
  git fetch origin
  git rebase origin/main`}
        />

        <CodeBlock
          title="Limpar commits antes do PR"
          code={`git rebase -i HEAD~5
  # Squash WIPs, reword mensagens, drop commits de debug`}
        />

        <CodeBlock
          title="Separar um commit em dois"
          code={`git rebase -i HEAD~1
  # Selecione 'edit' no commit — o Git para no commit para edição
  git reset HEAD~1        # desfaz o commit mas mantém as mudanças staged
  git add -p              # adicionar primeira parte interativamente
  git commit -m "fix: primeira mudança"
  git add .               # adicionar o resto
  git commit -m "feat: segunda mudança"
  git rebase --continue   # terminar o rebase`}
        />

        <h2>git pull --rebase</h2>
        <CodeBlock
          title="Pull com rebase em vez de merge"
          code={`# Em vez de: git pull (que cria commit de merge)
  git pull --rebase

  # Configura como padrão
  git config --global pull.rebase true
  # Agora 'git pull' sempre faz rebase

  # Para um único pull sem alterar o default:
  git pull --no-rebase`}
        />

        <h2>Rebase onto — mover commits entre branches</h2>
        <CodeBlock
          title="Rebase --onto para reestruturar branches"
          code={`# Situação: feature-b foi criada a partir de feature-a,
  # mas agora precisa ir direto para o main

  git rebase --onto main feature-a feature-b
  # Sintaxe: --onto <novo-base> <ponto-de-corte> <branch-a-mover>`}
        />

        <h2>Comparativo rápido</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Critério</th>
                <th className="p-3 text-left">Merge</th>
                <th className="p-3 text-left">Rebase</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Histórico", "Preserva como aconteceu (bifurcações)", "Linear e limpo (sem bifurcações)"],
                ["Commit extra", "Sim — commit de merge", "Não"],
                ["Seguro em público", "✅ Sempre", "❌ Nunca (reescreve histórico)"],
                ["Conflitos", "Resolve uma vez", "Pode resolver por commit"],
                ["Uso ideal", "Integrar features finalizadas no main", "Atualizar branch local antes do PR"],
              ].map(([crit, merge, rebase], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{crit}</td>
                  <td className="p-3 text-green-400 text-sm">{merge}</td>
                  <td className="p-3 text-blue-400 text-sm">{rebase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="success" title="Quando usar rebase, quando usar merge">
          <strong>Rebase:</strong> antes de abrir um PR (para atualizar com main e limpar commits), sempre em branches locais. <strong>Merge:</strong> ao fechar um PR no main, ao integrar releases. Combine os dois: rebase para manter, merge para integrar.
        </AlertBox>
      </PageContainer>
    );
  }
  