import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Historia() {
    return (
      <PageContainer
        title="Histórico do Git"
        subtitle="Explore, filtre e visualize o histórico de commits com git log e ferramentas relacionadas."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          O <code>git log</code> é a janela para o histórico do projeto. Saber filtrar, formatar e navegar por esse histórico é essencial para entender mudanças, encontrar bugs e compreender o contexto de cada decisão.
        </p>

        <h2>git log — formatos e filtros</h2>
        <CodeBlock
          title="Variações mais úteis do git log"
          code={`# Log padrão (verbose)
  git log

  # Uma linha por commit
  git log --oneline

  # Com gráfico de branches
  git log --oneline --graph --decorate --all

  # Limitar quantidade de commits
  git log -10  # últimos 10
  git log -1   # último commit (equivale a git show)

  # Por autor
  git log --author="João"
  git log --author="joao@email.com"

  # Por data
  git log --since="2024-01-01"
  git log --after="1 week ago"
  git log --before="2024-06-01"
  git log --since="2 weeks ago" --until="1 week ago"

  # Por mensagem
  git log --grep="feat:"
  git log --grep="login" -i  # case insensitive

  # Commits que afetaram um arquivo específico
  git log -- src/auth.js
  git log --follow -- src/auth.js  # rastreia renames`}
        />

        <h2>Formatos customizados de log</h2>
        <CodeBlock
          title="Formatos avançados"
          code={`# Formato colorido com graph (o famoso 'git lg')
  git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

  # Placeholders disponíveis:
  # %h  = SHA abreviado
  # %H  = SHA completo
  # %s  = assunto (primeira linha da mensagem)
  # %b  = corpo da mensagem
  # %an = nome do autor
  # %ae = email do autor
  # %ar = data relativa (ex: "3 hours ago")
  # %ad = data absoluta
  # %d  = refs (branches, tags)
  # %Cred %Cgreen %Cblue %Creset = cores

  # Apenas datas e commits
  git log --format="%ad %h %s" --date=short

  # Estatísticas por arquivo
  git log --stat

  # Patches completos
  git log -p  # verbose!`}
        />

        <h2>Explorando mudanças específicas</h2>
        <CodeBlock
          title="git show e git diff no histórico"
          code={`# Ver detalhes de um commit específico
  git show abc1234
  git show HEAD    # último commit
  git show HEAD~2  # 2 commits atrás

  # Ver apenas os arquivos mudados em um commit
  git show --name-only abc1234
  git show --name-status abc1234  # com M/A/D

  # Diferença entre dois commits
  git diff abc1234..def5678
  git diff v1.0..v2.0

  # Diferença em arquivo específico
  git diff main..feature/login -- src/app.js

  # Quem mudou uma linha específica (git blame)
  git blame src/app.js
  git blame -L 10,20 src/app.js  # apenas linhas 10-20`}
        />

        <h2>Buscando no histórico</h2>
        <CodeBlock
          title="git log -S e -G — busca por conteúdo"
          code={`# Encontrar quando uma string foi adicionada/removida
  git log -S "calcularDesconto"
  git log -S "senha123" --all  # em todos os branches (segurança!)

  # Buscar por regex no conteúdo dos diffs
  git log -G "function.*login"

  # Buscar por arquivo
  git log --all --full-history -- "**/login.js"

  # Combinar filtros
  git log -S "bug" --author="Maria" --since="1 month ago"

  # Encontrar commits que introduziram/removeram função
  git log --pickaxe-regex -S "function calcularImposto"`}
        />

        <AlertBox type="success" title="Alias para log visual — configure uma vez, use sempre">
          Adicione ao seu <code>.gitconfig</code>: <code>lg = log --oneline --graph --decorate --all</code>. O comando <code>git lg</code> vai se tornar seu comando mais usado para visualizar o estado de todos os branches de uma forma clara.
        </AlertBox>

        <h2>Navegando entre commits</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Referência</th>
                <th className="p-3 text-left">Significa</th>
                <th className="p-3 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["HEAD", "Commit atual", "git show HEAD"],
                ["HEAD~1 ou HEAD^", "1 commit antes", "git diff HEAD~1"],
                ["HEAD~3", "3 commits antes", "git reset HEAD~3"],
                ["abc1234", "SHA específico", "git show abc1234"],
                ["main@{yesterday}", "Estado de ontem", "git diff main@{yesterday}"],
                ["v1.0.0", "Tag específica", "git log v1.0.0..HEAD"],
              ].map(([ref, sig, ex], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{ref}</td>
                  <td className="p-3 text-muted-foreground text-sm">{sig}</td>
                  <td className="p-3 font-mono text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>
    );
  }
  