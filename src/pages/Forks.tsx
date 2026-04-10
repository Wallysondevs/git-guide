import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Forks() {
    return (
      <PageContainer
        title="Forks no GitHub"
        subtitle="Como fazer fork, contribuir para projetos open source e manter seu fork sincronizado."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          Um fork é uma cópia completa de um repositório na sua conta do GitHub. Você usa forks para contribuir com projetos nos quais não tem permissão de push direto — o modelo padrão de contribuição open source.
        </p>

        <h2>Fork vs Clone — qual a diferença?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">Fork (GitHub)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Cópia na sua conta do GitHub</li>
              <li>✅ Você tem permissão total no fork</li>
              <li>✅ Pode abrir Pull Request para o original</li>
              <li>✅ GitHub mantém link com repositório original</li>
              <li>ℹ️ Operação no GitHub (não no terminal)</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">Clone (Git local)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Cópia local na sua máquina</li>
              <li>ℹ️ Não tem permissão de push no original</li>
              <li>ℹ️ Só para uso pessoal/leitura</li>
              <li>ℹ️ Não cria link no GitHub</li>
              <li>ℹ️ Operação no terminal</li>
            </ul>
          </div>
        </div>

        <h2>Fluxo completo de contribuição via fork</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { n: "1", titulo: "Fork no GitHub", desc: "Acesse o repositório original → clique em 'Fork' → escolha sua conta. O GitHub cria uma cópia em sua conta." },
            { n: "2", titulo: "Clone do seu fork", desc: "Clone o seu fork (não o original) para trabalhar localmente." },
            { n: "3", titulo: "Configure o upstream", desc: "Adicione o repositório original como remote 'upstream' para poder sincronizar." },
            { n: "4", titulo: "Crie um branch para sua contribuição", desc: "Nunca trabalhe direto no main do fork — crie um branch descritivo." },
            { n: "5", titulo: "Faça commits e push", desc: "Commite seu trabalho e faça push para o seu fork no GitHub." },
            { n: "6", titulo: "Abra um Pull Request", desc: "No GitHub, abra um PR do seu branch para o branch do repositório original." },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-1">{item.titulo}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock
          title="Configuração após fazer fork"
          code={`# 1. Clone o seu fork (substitua 'seu-usuario')
  git clone git@github.com:seu-usuario/projeto.git
  cd projeto

  # 2. Adicione o repositório original como 'upstream'
  git remote add upstream https://github.com/original/projeto.git

  # 3. Verifique os remotos
  git remote -v
  # origin    git@github.com:seu-usuario/projeto.git (fetch/push)
  # upstream  https://github.com/original/projeto.git (fetch/push)

  # 4. Crie um branch para sua contribuição
  git switch -c fix/corrige-erro-tipagem

  # 5. Faça suas mudanças, commit e push
  git add .
  git commit -m "fix: corrige erro de tipagem na função parse"
  git push -u origin fix/corrige-erro-tipagem`}
        />

        <h2>Mantendo seu fork sincronizado</h2>
        <CodeBlock
          title="Sincronizar fork com o repositório original"
          code={`# Buscar mudanças do repositório original
  git fetch upstream

  # Ver o que mudou
  git log upstream/main --oneline -10

  # Atualizar seu main local com o upstream
  git switch main
  git merge upstream/main
  # ou
  git rebase upstream/main

  # Atualizar seu fork no GitHub
  git push origin main

  # Automatizar — crie um alias:
  git config alias.sync "!git fetch upstream && git rebase upstream/main"`}
        />

        <AlertBox type="info" title="Sincronização pelo GitHub">
          O GitHub tem um botão "Sync fork" na interface web que sincroniza o main do seu fork com o original. Mas para sincronizar seus branches de feature, você ainda precisa fazer no terminal.
        </AlertBox>

        <h2>Boas práticas ao contribuir via fork</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Prática</th>
                <th className="p-3 text-left">Por quê</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sincronize antes de criar branch", "Evita conflitos com mudanças recentes do projeto"],
                ["Um branch por contribuição", "Facilita revisão e permite múltiplos PRs independentes"],
                ["Commits pequenos e descritivos", "Torna a revisão mais fácil para os mantenedores"],
                ["Leia CONTRIBUTING.md", "Cada projeto tem padrões específicos — siga-os"],
                ["Responda a revisões rapidamente", "PRs abandonados são fechados pelos mantenedores"],
                ["Não force push em branch de PR aberto", "Pode apagar o histórico de revisão"],
              ].map(([pratica, porq], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{pratica}</td>
                  <td className="p-3 text-muted-foreground text-sm">{porq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="success" title="Primeiro PR? Procure issues com label 'good first issue'">
          Projetos open source frequentemente marcam issues simples com <strong>good first issue</strong> ou <strong>beginner friendly</strong> para ajudar novos contribuidores a começar. É o caminho ideal para sua primeira contribuição.
        </AlertBox>
      </PageContainer>
    );
  }
  