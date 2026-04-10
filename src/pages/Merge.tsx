import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Merge() {
    return (
      <PageContainer
        title="git merge"
        subtitle="Combine o trabalho de diferentes branches preservando o histórico completo de cada um."
        difficulty="intermediario"
        timeToRead="14 min"
      >
        <p>
          O <code>git merge</code> integra as mudanças de um branch em outro. Existem diferentes estratégias de merge com trade-offs entre clareza do histórico e simplicidade — escolher a certa faz toda a diferença na legibilidade do projeto.
        </p>

        <h2>Tipos de merge</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { tipo: "Fast-Forward", desc: "Quando o branch alvo não divergiu: apenas move o ponteiro. Histórico linear, sem commit de merge.", cmd: "--ff (padrão)" },
            { tipo: "Merge Commit", desc: "Cria um commit extra que une os dois históricos. Preserva o contexto de quando cada feature foi desenvolvida.", cmd: "--no-ff" },
            { tipo: "Squash", desc: "Combina todos os commits do branch em um só no destino. Histórico limpo mas perde detalhes do desenvolvimento.", cmd: "--squash" },
          ].map((item) => (
            <div key={item.tipo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm text-primary">{item.tipo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">{item.cmd}</code>
            </div>
          ))}
        </div>

        <CodeBlock
          title="Exemplos de cada tipo de merge"
          code={`# Fast-Forward (padrão quando possível)
  git switch main
  git merge feature/login
  # Se não houve commits no main desde que feature/login divergiu:
  # → apenas move o ponteiro, sem criar commit de merge

  # Forçar merge commit (mesmo quando fast-forward seria possível)
  git merge --no-ff feature/login
  # Útil para manter registro visual de quando cada feature foi integrada

  # Squash: comprime todos os commits da feature em um
  git merge --squash feature/login
  git commit -m "feat: implementa sistema de login completo"
  # Os commits individuais não aparecem no histórico do main

  # Apenas verificar se há conflitos sem fazer merge
  git merge --no-commit --no-ff feature/login
  git merge --abort  # abortar se não quiser`}
        />

        <h2>Estratégias de merge</h2>
        <CodeBlock
          title="Estratégias avançadas"
          code={`# Estratégia ort (padrão no Git moderno)
  git merge -s ort feature/login

  # Estratégia recursive com opções
  git merge -X theirs feature/login  # em conflito, usa versão do branch
  git merge -X ours feature/login    # em conflito, usa versão do main

  # Ignorar mudanças de whitespace
  git merge -Xignore-all-space feature/login
  git merge -Xignore-space-change feature/login

  # Merge de um commit específico (sem branch)
  git merge abc1234`}
        />

        <AlertBox type="info" title="Quando usar --no-ff">
          Use <code>--no-ff</code> para features e releases. O commit de merge cria um "nó" visual no histórico que mostra claramente: "aqui a feature X foi integrada no dia Y". Sem isso, os commits da feature ficam misturados no histórico linear do main.
        </AlertBox>

        <h2>Resolvendo conflitos de merge</h2>
        <CodeBlock
          title="Fluxo completo de resolução de conflito"
          code={`# Merge que gera conflito
  git merge feature/login
  # CONFLICT (content): Merge conflict in src/auth.js
  # Automatic merge failed; fix conflicts and then commit the result.

  # 1. Ver arquivos em conflito
  git status
  # both modified: src/auth.js

  # 2. Abrir o arquivo e ver os marcadores
  # <<<<<<< HEAD (sua versão)
  # function login(user) { ... }
  # =======
  # function authenticate(credentials) { ... }
  # >>>>>>> feature/login (versão entrando)

  # 3. Usar uma ferramenta de merge visual
  git mergetool  # abre ferramenta configurada (vimdiff, meld, etc.)

  # 4. Após resolver cada arquivo
  git add src/auth.js

  # 5. Finalizar o merge
  git commit  # mensagem pré-preenchida com info do merge

  # OU abortar tudo
  git merge --abort`}
        />

        <h2>Comparando merge vs rebase</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Critério</th>
                <th className="p-3 text-left">git merge</th>
                <th className="p-3 text-left">git rebase</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Histórico", "Preserva exatamente como aconteceu", "Reescreve para ficar linear"],
                ["Commit extra", "Sim (commit de merge)", "Não"],
                ["Conflitos", "Resolve uma vez", "Pode resolver para cada commit"],
                ["Segurança", "Seguro em branches públicos", "Nunca em branches públicos/compartilhados"],
                ["Reversibilidade", "Fácil (reverter o commit de merge)", "Mais complexo"],
                ["Uso ideal", "Integrar features finalizadas", "Atualizar branch local antes do push"],
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

        <AlertBox type="success" title="Regra simples: merge para integrar, rebase para atualizar">
          Use merge ao integrar uma feature no main (cria registro histórico). Use rebase ao atualizar seu branch local com as mudanças do main (antes de abrir PR). Esta combinação dá o melhor dos dois mundos.
        </AlertBox>
      </PageContainer>
    );
  }
  