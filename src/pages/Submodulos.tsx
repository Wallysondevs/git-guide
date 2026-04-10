import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Submodulos() {
    return (
      <PageContainer
        title="Submódulos do Git"
        subtitle="Inclua repositórios externos como dependências versionadas dentro do seu projeto."
        difficulty="avancado"
        timeToRead="15 min"
      >
        <p>
          Submódulos permitem incluir um repositório Git dentro de outro — uma referência a um commit específico de outro repositório. Útil para incluir bibliotecas, templates ou ferramentas compartilhadas que são gerenciadas em repositórios separados.
        </p>

        <AlertBox type="warning" title="Submódulos são complexos — considere alternativas primeiro">
          Antes de usar submódulos, considere: gerenciadores de pacotes (npm, pip, cargo), git subtree, ou simplesmente copiar o código. Submódulos têm curva de aprendizado alta e armadilhas para a equipe.
        </AlertBox>

        <h2>Quando usar submódulos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { titulo: "Use submódulos quando...", itens: ["Precisar de uma versão específica de um repositório externo", "O repositório externo não tem gerenciador de pacotes", "Quiser contribuir de volta para o repositório incluído", "Precisar de controle total sobre qual commit está sendo usado"], cor: "border-green-500/50" },
            { titulo: "Evite submódulos quando...", itens: ["Existir pacote npm/pip/cargo equivalente", "A equipe não tem experiência com Git avançado", "O repositório é atualizado com muita frequência", "Você só precisa de alguns arquivos do repositório"], cor: "border-destructive/50" },
          ].map((item) => (
            <div key={item.titulo} className={"p-4 border rounded-xl bg-card " + item.cor}>
              <h4 className="font-bold mb-2 mt-0 border-0 text-sm">{item.titulo}</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {item.itens.map((i, idx) => <li key={idx}>• {i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2>Adicionando e usando submódulos</h2>
        <CodeBlock
          title="Adicionar e clonar com submódulos"
          code={`# Adicionar um submódulo ao projeto
  git submodule add https://github.com/org/biblioteca.git libs/biblioteca
  # Cria:
  # .gitmodules (arquivo de configuração)
  # libs/biblioteca/ (diretório com o repositório)

  # Ver o arquivo .gitmodules gerado
  cat .gitmodules
  # [submodule "libs/biblioteca"]
  #     path = libs/biblioteca
  #     url = https://github.com/org/biblioteca.git

  # Commitar a adição
  git add .gitmodules libs/biblioteca
  git commit -m "chore: adiciona biblioteca como submódulo"

  # Clonar um repositório que tem submódulos
  git clone --recurse-submodules https://github.com/org/projeto.git

  # Ou inicializar depois de clonar sem --recurse-submodules
  git submodule init
  git submodule update`}
        />

        <h2>Atualizando submódulos</h2>
        <CodeBlock
          title="Gerenciar versão dos submódulos"
          code={`# Ver status dos submódulos
  git submodule status
  # -abc1234 libs/biblioteca  (não inicializado)
  # abc1234 libs/biblioteca (HEAD)
  #  abc1234 libs/biblioteca (mudanças não commitadas)

  # Atualizar submódulo para a versão mais recente do branch padrão
  cd libs/biblioteca
  git fetch
  git merge origin/main
  cd ../..
  git add libs/biblioteca
  git commit -m "chore: atualiza biblioteca para versão mais recente"

  # Atualizar todos os submódulos de uma vez
  git submodule update --remote

  # Atualizar para commit específico
  cd libs/biblioteca
  git checkout v2.1.0
  cd ../..
  git add libs/biblioteca
  git commit -m "chore: atualiza biblioteca para v2.1.0"`}
        />

        <h2>Comandos úteis para submódulos</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Comando</th>
                <th className="p-3 text-left">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["git submodule init", "Inicializa submódulos após clone sem --recurse-submodules"],
                ["git submodule update", "Faz checkout do commit registrado no repositório pai"],
                ["git submodule update --remote", "Atualiza para o HEAD do branch padrão do submódulo"],
                ["git submodule foreach git pull", "Executa 'git pull' em todos os submódulos"],
                ["git submodule deinit libs/bib", "Remove a inicialização do submódulo localmente"],
                ["git rm libs/biblioteca", "Remove o submódulo completamente do repositório"],
              ].map(([cmd, acao], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{cmd}</td>
                  <td className="p-3 text-muted-foreground text-sm">{acao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="info" title="Alternativa mais simples: git subtree">
          O <code>git subtree</code> inclui o código de outro repositório diretamente no seu repositório, sem a complexidade dos submódulos. Não requer configuração especial para quem clona o projeto. Para a maioria dos casos, subtree é mais fácil de usar.
        </AlertBox>
      </PageContainer>
    );
  }
  