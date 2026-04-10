import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function PullRequests() {
    return (
      <PageContainer
        title="Pull Requests"
        subtitle="Como criar, revisar e gerenciar Pull Requests de forma eficiente no GitHub."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <p>
          Pull Requests (PRs) são o mecanismo de colaboração central no GitHub. Eles propõem mudanças, facilitam revisão de código, gatilham CI/CD e criam um registro histórico de por que cada decisão foi tomada. Um PR bem feito acelera o desenvolvimento da equipe.
        </p>

        <h2>Anatomia de um bom Pull Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { campo: "Título", desc: "Descreve o que foi feito — não como. Use prefixos: feat:, fix:, refactor:, docs:. Seja específico e conciso.", exemplo: "feat: adiciona autenticação via Google OAuth" },
            { campo: "Descrição", desc: "Explica o PORQUÊ da mudança. Inclua: contexto do problema, solução adotada, alternativas consideradas, e como testar.", exemplo: "Closes #123 — usuários pediam login social" },
            { campo: "Tamanho", desc: "PRs menores são revisados mais rápido e com mais qualidade. Prefira PRs de um único propósito.", exemplo: "< 400 linhas mudadas é o ideal" },
            { campo: "Reviewers", desc: "Selecione pessoas que têm contexto sobre a área modificada. Mínimo 1 reviewer antes de merge.", exemplo: "@colega-especialista-em-auth" },
          ].map((item) => (
            <div key={item.campo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm text-primary">{item.campo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs">{item.exemplo}</code>
            </div>
          ))}
        </div>

        <CodeBlock
          title="Criando um PR via GitHub CLI (gh)"
          code={`# Instalar GitHub CLI
  brew install gh  # macOS
  # ou baixe de cli.github.com

  # Autenticar
  gh auth login

  # Criar PR interativamente
  gh pr create

  # Criar PR com opções
  gh pr create \
    --title "feat: adiciona paginação na listagem de produtos" \
    --body "Closes #456. Implementa cursor-based pagination..." \
    --reviewer @colega1,@colega2 \
    --label enhancement \
    --draft  # abre como rascunho

  # Listar PRs abertos
  gh pr list

  # Ver PR atual (do branch)
  gh pr view

  # Fazer checkout de um PR para revisar localmente
  gh pr checkout 123`}
        />

        <h2>Processo de revisão de código</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { fase: "Como autor", acoes: ["Marque como draft enquanto trabalha", "Adicione description e contexto antes de pedir revisão", "Responda todos os comentários — even se apenas 'Feito, obrigado'", "Não force push após revisão começar (perde contexto)"] },
            { fase: "Como reviewer", acoes: ["Entenda o problema que o PR resolve antes de revisar o código", "Comente o que você não entende com perguntas, não acusações", "Diferencie: blocking (deve mudar) vs non-blocking (sugestão)", "Aprove quando estiver satisfeito — não exija perfeição"] },
          ].map((item) => (
            <div key={item.fase} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-2 mt-0 border-0 text-sm">{item.fase}</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {item.acoes.map((a, i) => <li key={i}>• {a}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2>Estratégias de merge no GitHub</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Estratégia</th>
                <th className="p-3 text-left">Histórico gerado</th>
                <th className="p-3 text-left">Quando usar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Create a merge commit", "Commit de merge + todos os commits do PR", "Quando quer preservar contexto completo do PR"],
                ["Squash and merge", "Um único commit com tudo do PR", "Commits do PR são WIP/bagunçados, quer histórico limpo no main"],
                ["Rebase and merge", "Commits do PR aplicados um a um (sem merge commit)", "Commits bem feitos, quer histórico linear sem commit de merge"],
              ].map(([strat, hist, quando], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{strat}</td>
                  <td className="p-3 text-muted-foreground text-sm">{hist}</td>
                  <td className="p-3 text-sm">{quando}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          title="Operações comuns com gh pr"
          code={`# Atualizar PR com novos commits
  git add .
  git commit -m "fix: endereça feedback da revisão"
  git push  # push para o mesmo branch, PR atualiza automaticamente

  # Solicitar nova revisão após mudanças
  gh pr review --request-changes  # reabre revisão

  # Fechar PR sem merge
  gh pr close 123

  # Merge via CLI
  gh pr merge 123 --squash --delete-branch

  # Ver status dos checks de CI
  gh pr checks

  # Adicionar comentário no PR
  gh pr comment -b "Deixa eu investigar o erro no CI antes de continuar"`}
        />

        <AlertBox type="success" title="Draft PRs para feedback antecipado">
          Abra um PR como Draft assim que tiver a estrutura inicial — mesmo antes de terminar. Isso permite que a equipe dê feedback cedo, quando mudanças ainda são baratas. Use <code>gh pr ready</code> para marcar como pronto para revisão.
        </AlertBox>
      </PageContainer>
    );
  }
  