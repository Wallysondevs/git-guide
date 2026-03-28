import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Forks() {
  return (
    <PageContainer
      title="Forks"
      subtitle="Como contribuir para projetos open source usando o modelo fork + pull request."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <p>
        Um fork é uma cópia completa de um repositório na sua conta do GitHub. É o modelo padrão de contribuição para projetos open source onde você não tem permissão de escrita no repositório original.
      </p>

      <h2>O Fluxo Fork → PR</h2>
      <CodeBlock
        title="Como contribuir para projetos open source"
        code={`# 1. Fork o repositório no GitHub (clique no botão Fork)
# Agora você tem: github.com/SEU-USUARIO/projeto-original

# 2. Clone o seu fork
git clone https://github.com/SEU-USUARIO/projeto-original.git
cd projeto-original

# 3. Adicione o repositório original como 'upstream'
git remote add upstream https://github.com/DONO/projeto-original.git

# 4. Confirme os remotos
git remote -v
# origin    https://github.com/SEU-USUARIO/projeto-original.git
# upstream  https://github.com/DONO/projeto-original.git`}
      />

      <h2>Mantendo seu Fork Atualizado</h2>
      <CodeBlock
        title="Sincronizando com o repositório original"
        code={`# Buscar as atualizações do repositório original
git fetch upstream

# Atualizar seu main local com o main do upstream
git switch main
git merge upstream/main

# Enviar para o seu fork no GitHub
git push origin main`}
      />

      <AlertBox type="info" title="GitHub tem recurso nativo de sync">
        No GitHub, no seu fork, há um botão <strong>"Sync fork"</strong> que atualiza automaticamente seu fork com o repositório original, sem precisar usar a linha de comando.
      </AlertBox>

      <h2>Fazendo sua Contribuição</h2>
      <CodeBlock
        title="Fluxo completo de contribuição"
        code={`# 1. Crie um branch para sua contribuição
git switch -c fix/corrigir-bug-no-login

# 2. Faça suas mudanças e commits
git add .
git commit -m "fix: corrige bug ao fazer login com email em maiúsculo"

# 3. Envie para o seu fork
git push origin fix/corrigir-bug-no-login

# 4. No GitHub, abra um Pull Request do seu fork para o repositório original
# GitHub mostrará um banner: "Compare & pull request"

# 5. Descreva bem sua contribuição e aguarde a revisão`}
      />

      <h2>Boas Práticas para Contribuir</h2>

      <div className="grid grid-cols-1 gap-3 my-6">
        {[
          { title: "Leia o CONTRIBUTING.md", desc: "Projetos sérios têm um arquivo explicando como contribuir. Leia antes de tudo." },
          { title: "Crie uma issue primeiro", desc: "Para mudanças grandes, abra uma issue para discussão antes de codar." },
          { title: "Branches pequenos e focados", desc: "Um PR deve fazer uma coisa só. Mais fácil de revisar e de aceitar." },
          { title: "Siga o estilo do projeto", desc: "Mantenha o estilo de código, formatação e convenções já existentes." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
            <strong className="text-primary">{item.title}</strong>
            <p className="text-sm text-muted-foreground mt-1 mb-0">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Resolvendo Conflitos no PR</h2>
      <CodeBlock
        title="Quando seu PR tem conflitos"
        code={`# 1. Buscar as atualizações mais recentes do upstream
git fetch upstream

# 2. Fazer rebase do seu branch sobre o main atualizado
git rebase upstream/main

# 3. Resolver conflitos (se houver)
# Edite os arquivos, salve, e:
git add arquivo-resolvido.js
git rebase --continue

# 4. Fazer force push (o histórico mudou com o rebase)
git push --force-with-lease origin fix/corrigir-bug-no-login
# O PR no GitHub atualiza automaticamente`}
      />
    </PageContainer>
  );
}
