import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Conflitos() {
    return (
      <PageContainer
        title="Resolvendo Conflitos"
        subtitle="Entenda, identifique e resolva conflitos de merge com confiança — ferramentas e estratégias práticas."
        difficulty="intermediario"
        timeToRead="15 min"
      >
        <p>
          Conflitos de merge acontecem quando o Git não consegue automaticamente combinar mudanças de dois branches que modificaram o mesmo trecho de código. Não são erros — são o Git pedindo que um humano tome uma decisão.
        </p>

        <h2>Por que conflitos acontecem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { causa: "Mesma linha editada", desc: "Dois branches modificaram a mesma linha do mesmo arquivo de formas diferentes. O Git não sabe qual versão manter." },
            { causa: "Arquivo deletado vs editado", desc: "Um branch deletou o arquivo, outro o modificou. O Git não sabe se deve manter ou deletar." },
            { causa: "Rename conflitante", desc: "Um branch renomeou o arquivo, outro modificou. O Git precisa de orientação sobre o novo caminho." },
          ].map((item) => (
            <div key={item.causa} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm text-destructive">{item.causa}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Lendo os marcadores de conflito</h2>
        <CodeBlock
          title="Anatomia de um conflito no arquivo"
          code={`<<<<<<< HEAD
  // Sua versão (branch atual)
  function calcularDesconto(preco, percentual) {
    return preco * (1 - percentual / 100);
  }
  =======
  // Versão que está entrando (branch a ser mergeado)
  function calcularDesconto(preco, taxa) {
    return preco - (preco * taxa);
  }
  >>>>>>> feature/refatorar-desconto

  // Para resolver, você escolhe uma versão, combina as duas,
  // ou escreve algo completamente diferente.
  // Depois REMOVE os marcadores <<<, ===, >>>
  // e adiciona o arquivo com git add`}
        />

        <h2>Fluxo de resolução de conflitos</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { n: "1", titulo: "Identificar arquivos em conflito", cmd: "git status
git diff --name-only --diff-filter=U" },
            { n: "2", titulo: "Abrir cada arquivo e resolver", cmd: "# Edite manualmente OU use uma ferramenta:
git mergetool" },
            { n: "3", titulo: "Marcar como resolvido", cmd: "git add arquivo-resolvido.js" },
            { n: "4", titulo: "Continuar o merge", cmd: "git commit  # para merge
git rebase --continue  # para rebase" },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{item.n}</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-2">{item.titulo}</h4>
                <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">{item.cmd}</pre>
              </div>
            </div>
          ))}
        </div>

        <h2>Ferramentas de merge visual</h2>
        <CodeBlock
          title="Configurando e usando mergetools"
          code={`# Configurar ferramenta preferida
  git config --global merge.tool vscode
  git config --global mergetool.vscode.cmd 'code --wait $MERGED'

  # Ferramentas populares:
  # - VS Code: builtin, excelente para a maioria
  # - vimdiff: terminal, sem dependências
  # - meld: GUI simples e gratuita
  # - P4Merge: gratuita, boa visualização
  # - IntelliJ/WebStorm: integrado na IDE

  # Usar a ferramenta
  git mergetool
  # Abre cada arquivo em conflito na ferramenta

  # Após resolver com a ferramenta:
  git status  # verificar que todos os conflitos foram resolvidos
  git commit`}
        />

        <h2>Estratégias para conflitos específicos</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Situação</th>
                <th className="p-3 text-left">Comando</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Manter minha versão em todos os conflitos", "git checkout --ours arquivo.js"],
                ["Manter a versão do branch entrando", "git checkout --theirs arquivo.js"],
                ["Arquivo deletado — manter a deleção", "git rm arquivo.js"],
                ["Arquivo deletado — manter o arquivo", "git add arquivo.js"],
                ["Abortar merge e voltar ao início", "git merge --abort"],
                ["Abortar rebase e voltar ao início", "git rebase --abort"],
              ].map(([situacao, cmd], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 text-muted-foreground text-sm">{situacao}</td>
                  <td className="p-3 font-mono text-primary text-xs">{cmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="warning" title="git checkout --ours/--theirs sobrescreve sem aviso">
          Esses comandos substituem o arquivo completamente com uma versão. Use apenas quando tem certeza que quer descartar completamente a outra versão. Para a maioria dos conflitos, a resposta correta é combinar as duas versões manualmente.
        </AlertBox>

        <h2>Prevenindo conflitos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { dica: "Branches curtos", desc: "Quanto mais tempo um branch existe sem ser integrado, mais provável o conflito. Faça PRs pequenos e frequentes." },
            { dica: "Sincronize frequentemente", desc: "git fetch + git rebase origin/main regularmente no seu branch. Conflitos menores resolvidos cedo = sem conflito gigante no merge." },
            { dica: "Comunicação na equipe", desc: "Avise colegas quando for refatorar arquivos muito usados. Coordenação previne conflitos de código." },
            { dica: "Linters e formatadores", desc: "Prettier/ESLint com configuração compartilhada eliminam conflitos de estilo — a fonte de conflitos mais evitável." },
          ].map((item) => (
            <div key={item.dica} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm">{item.dica}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  