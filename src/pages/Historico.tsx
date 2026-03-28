import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Historico() {
  return (
    <PageContainer
      title="Histórico de Commits"
      subtitle="Como navegar, filtrar e entender o histórico completo do seu projeto com git log."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        O histórico de commits é a memória do seu projeto. Com <code>git log</code> e seus inúmeros modificadores, você pode encontrar qualquer informação sobre o passado do seu código.
      </p>

      <h2>git log — Básico</h2>
      <CodeBlock
        title="Visualizando o histórico"
        code={`# Histórico completo (pressione Q para sair)
git log

# Uma linha por commit (mais compacto)
git log --oneline

# Com gráfico ASCII de branches e merges
git log --oneline --graph --all

# Últimos N commits
git log -5
git log -10 --oneline`}
      />

      <h2>Formatando a Saída do git log</h2>
      <CodeBlock
        title="Formatos customizados"
        code={`# Formato compacto com cores
git log --pretty=format:"%h %an %ar - %s"

# %h = hash curto, %an = nome do autor
# %ar = data relativa, %s = assunto do commit

# Formato bonito para terminal
git log --oneline --decorate --graph --all

# Formato com data completa
git log --format="%C(yellow)%h%Creset %C(green)%ad%Creset %s %C(red)[%an]%Creset" --date=short`}
      />

      <h2>Filtrando o Histórico</h2>
      <CodeBlock
        title="Filtros poderosos do git log"
        code={`# Por autor
git log --author="João Silva"

# Por data
git log --after="2024-01-01"
git log --before="2024-12-31"
git log --after="2024-01-01" --before="2024-06-30"

# Últimas 2 semanas
git log --since="2 weeks ago"

# Por mensagem de commit (usa regex)
git log --grep="fix"
git log --grep="feat:" --oneline

# Por conteúdo do código (busca no diff)
git log -S "nomeDaFuncao"    # commits que adicionaram/removeram
git log -G "padrão regex"   # commits cujo diff bate com regex

# Por arquivo
git log -- src/app.js
git log -- "*.css"

# Combinando filtros
git log --author="Maria" --after="2024-01-01" --oneline`}
      />

      <h2>Navegando entre Commits</h2>
      <CodeBlock
        title="Acessando versões antigas"
        code={`# Ver o conteúdo de um commit específico
git show abc1234

# Ver um arquivo em uma versão específica
git show abc1234:src/app.js

# Checkout temporário para um commit antigo (detached HEAD)
git checkout abc1234

# Voltar para o branch atual
git checkout main   # ou git switch main`}
      />

      <AlertBox type="warning" title="Detached HEAD">
        Quando você faz checkout de um commit (não um branch), entra no estado "detached HEAD". Você pode ver o código antigo, mas qualquer commit feito aqui se perderá quando você voltar ao branch. Crie um branch se quiser trabalhar a partir desse ponto.
      </AlertBox>

      <h2>Comparando Versões</h2>
      <CodeBlock
        title="Diferenças entre commits e branches"
        code={`# Diferença entre dois commits
git diff abc1234 def5678

# Diferença entre dois branches
git diff main feature/nova-funcionalidade

# Diferença entre branch atual e remoto
git diff main origin/main

# Ver quais arquivos mudaram entre dois commits
git diff --name-only abc1234 def5678

# Estatísticas de mudanças
git diff --stat abc1234 def5678`}
      />

      <h2>git bisect — Encontrando Bugs</h2>
      <p>
        O <code>git bisect</code> usa busca binária para encontrar em qual commit um bug foi introduzido.
      </p>
      <CodeBlock
        title="Encontrando qual commit introduziu um bug"
        code={`# Inicia o bisect
git bisect start

# Marca o commit atual como ruim (tem o bug)
git bisect bad

# Marca um commit antigo onde estava funcionando como bom
git bisect good v1.0.0    # ou use um hash

# O Git vai checkout um commit intermediário
# Teste se o bug existe e marque:
git bisect good    # ou
git bisect bad

# Continue até o Git identificar o commit problemático
# Ao terminar:
git bisect reset`}
      />

      <AlertBox type="info" title="Dica: Aliases para git log">
        Crie aliases para seus formatos favoritos de log. Por exemplo: <code>git config --global alias.lg "log --oneline --graph --all"</code>. Depois use apenas <code>git lg</code>.
      </AlertBox>
    </PageContainer>
  );
}
