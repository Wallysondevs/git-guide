import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Branches() {
    return (
      <PageContainer
        title="Branches"
        subtitle="Crie, navegue e gerencie branches para trabalhar em paralelo sem afetar o código principal."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <p>
          Branches são referências leves a commits. Criar um branch custa quase nada no Git — é apenas um ponteiro. Eles permitem que você trabalhe em features, correções e experimentos em paralelo, sem afetar o código principal.
        </p>

        <h2>Criando e navegando branches</h2>
        <CodeBlock
          title="Comandos essenciais de branch"
          code={`# Listar branches locais
  git branch
  # * main (asterisco = branch atual)
  #   feature/login
  #   hotfix/bug-123

  # Listar branches remotos
  git branch -r

  # Listar todos (local + remoto)
  git branch -a

  # Criar branch (sem fazer checkout)
  git branch feature/nova-funcionalidade

  # Criar E fazer checkout (método moderno — recomendado)
  git switch -c feature/nova-funcionalidade

  # Criar branch a partir de um commit ou tag específica
  git switch -c hotfix/v1.2.1 v1.2.0
  git switch -c recuperado abc1234

  # Fazer checkout de branch existente
  git switch main
  git switch feature/login`}
        />

        <h2>Nomeando branches com padrão</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Prefixo</th>
                <th className="p-3 text-left">Uso</th>
                <th className="p-3 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["feature/", "Nova funcionalidade", "feature/adicionar-pagamento-pix"],
                ["fix/", "Correção de bug", "fix/calculo-errado-de-frete"],
                ["hotfix/", "Correção urgente em produção", "hotfix/vazamento-dados-sessao"],
                ["release/", "Preparação de versão", "release/v2.3.0"],
                ["chore/", "Manutenção, sem feature/fix", "chore/atualizar-dependencias"],
                ["docs/", "Documentação apenas", "docs/guia-de-contribuicao"],
                ["refactor/", "Refatoração de código", "refactor/simplificar-autenticacao"],
              ].map(([pref, uso, ex], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{pref}</td>
                  <td className="p-3 text-muted-foreground text-sm">{uso}</td>
                  <td className="p-3 text-sm">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Gerenciando branches</h2>
        <CodeBlock
          title="Operações de gerenciamento"
          code={`# Renomear branch atual
  git branch -m novo-nome

  # Renomear branch específico
  git branch -m nome-antigo novo-nome

  # Deletar branch local (seguro — falha se não foi mergeado)
  git branch -d feature/login

  # Deletar branch local forçadamente
  git branch -D feature/experimento-que-nao-funcionou

  # Deletar branch remoto
  git push origin --delete feature/login
  git push origin :feature/login  # sintaxe alternativa

  # Ver branches já mergeados no main (candidatos à deleção)
  git branch --merged main
  git branch --no-merged main  # branches NÃO mergeados

  # Limpar branches locais já mergeados
  git branch --merged main | grep -v main | xargs git branch -d`}
        />

        <h2>Tracking — conectando local ao remoto</h2>
        <CodeBlock
          title="Configurando tracking de branches"
          code={`# Ver branches com tracking configurado
  git branch -vv
  # * main       abc1234 [origin/main] feat: login
  #   feature/x  def5678 [origin/feature/x: ahead 2] wip

  # Configurar tracking ao fazer push pela primeira vez
  git push -u origin feature/x

  # Configurar tracking manualmente
  git branch --set-upstream-to=origin/main main
  git branch -u origin/feature/x feature/x

  # Fazer checkout de branch remoto com tracking automático
  git switch feature/remota-que-existe-no-origin
  # Git detecta automaticamente e configura tracking`}
        />

        <AlertBox type="info" title="git switch vs git checkout">
          O comando <code>git switch</code> foi introduzido no Git 2.23 para substituir o uso de <code>git checkout</code> para branches. Use <code>switch</code> para branches e <code>git restore</code> para arquivos — é mais claro e menos propenso a erros.
        </AlertBox>

        <h2>Branches remotos e tracking</h2>
        <CodeBlock
          title="Trabalhando com branches remotos"
          code={`# Atualizar lista de branches remotos
  git fetch --prune  # --prune remove refs de branches deletados

  # Fazer checkout de branch remoto
  git switch --track origin/feature/nova
  # Equivale a: git switch -c nova origin/feature/nova

  # Ver diferença entre local e remoto
  git log main..origin/main --oneline  # no remoto, não local
  git log origin/main..main --oneline  # local, não no remoto`}
        />

        <AlertBox type="success" title="Mantenha branches de curta duração">
          O maior problema com branches não é técnico — é humano. Branches com mais de uma semana de vida acumulam divergência do main e tornam o merge mais complexo. Quebre features grandes em PRs menores e independentes.
        </AlertBox>
      </PageContainer>
    );
  }
  