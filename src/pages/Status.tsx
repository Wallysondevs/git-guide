import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Status() {
    return (
      <PageContainer
        title="git status"
        subtitle="Entenda o estado completo do seu repositório — staged, unstaged, untracked e muito mais."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          O <code>git status</code> é o comando mais usado no dia a dia. Ele mostra o estado atual do working directory e da staging area — quais arquivos foram modificados, quais estão prontos para commit e quais o Git não conhece.
        </p>

        <h2>Lendo a saída do git status</h2>
        <CodeBlock
          title="Saída completa do git status"
          code={`git status

  # Saída típica:
  On branch feature/login
  Your branch is ahead of 'origin/feature/login' by 2 commits.
    (use "git push" to publish your local commits)

  Changes to be committed:    ← STAGED (vão no próximo commit)
    (use "git restore --staged <file>..." to unstage)
          new file:   src/auth/login.js
          modified:   src/app.js

  Changes not staged for commit:   ← UNSTAGED (não vão no commit)
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
          modified:   src/utils.js

  Untracked files:    ← Git não conhece esses arquivos
    (use "git add <file>..." to include in what will be committed)
          src/auth/oauth.js
          .env.local`}
        />

        <h2>Formatos de exibição</h2>
        <CodeBlock
          title="Variações do git status"
          code={`# Formato padrão (verboso, com instruções)
  git status

  # Formato curto (conciso)
  git status -s
  git status --short
  # Saída:
  # A  src/auth/login.js     (A = added/staged)
  # M  src/app.js            (M na 1ª coluna = staged)
  #  M src/utils.js          (M na 2ª coluna = unstaged)
  # ?? src/auth/oauth.js     (?? = untracked)

  # Com informação de branch
  git status -sb
  # ## feature/login...origin/feature/login [ahead 2]
  # A  src/auth/login.js

  # Mostrar arquivos ignorados também
  git status --ignored`}
        />

        <h2>Entendendo os indicadores do formato curto</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Símbolo</th>
                <th className="p-3 text-left">Coluna 1 (staged)</th>
                <th className="p-3 text-left">Coluna 2 (unstaged)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["M", "Modificado e staged", "Modificado mas não staged"],
                ["A", "Arquivo novo adicionado ao stage", "-"],
                ["D", "Deletado e staged", "Deletado mas não staged"],
                ["R", "Renomeado", "-"],
                ["C", "Copiado", "-"],
                ["U", "Atualizado mas não mergeado (conflito)", "Atualizado mas não mergeado"],
                ["?? ", "- ", "Arquivo não rastreado (untracked)"],
                ["!!", "- ", "Arquivo ignorado (.gitignore)"],
              ].map(([sim, col1, col2], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-base font-bold">{sim}</td>
                  <td className="p-3 text-muted-foreground text-sm">{col1}</td>
                  <td className="p-3 text-muted-foreground text-sm">{col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Status e informações de branch</h2>
        <CodeBlock
          title="Informações de sincronização com remoto"
          code={`git status
  # On branch main
  # Your branch is ahead of 'origin/main' by 3 commits.
  #   → Você tem 3 commits para fazer push

  # Your branch is behind 'origin/main' by 5 commits.
  #   → Precisa de pull para atualizar

  # Your branch and 'origin/main' have diverged,
  # and have 2 and 3 different commits each, respectively.
  #   → Você e o remoto divergiram — precisa merge ou rebase

  # Nothing to commit, working tree clean
  #   → Tudo em ordem, sem mudanças pendentes`}
        />

        <h2>Integrando status no workflow</h2>
        <CodeBlock
          title="Uso do git status no dia a dia"
          code={`# Antes de começar a trabalhar
  git status  # ver estado atual
  git pull    # se necessário atualizar

  # Antes de commitar
  git status  # verificar o que vai ser commitado
  git diff --staged  # ver exatamente o que está staged

  # Antes de fazer push
  git status  # confirmar que está no branch certo

  # Verificar estado de merge em andamento
  git status
  # On branch main
  # You have unmerged paths.
  #   (fix conflicts and run "git commit")
  #   both modified: src/app.js`}
        />

        <AlertBox type="success" title="Dica: git status -sb para uso rápido">
          Configure um alias: <code>git config --global alias.s 'status -sb'</code>. Com isso, <code>git s</code> mostra o status de forma ultra-compacta — branch atual, sincronização com remoto e lista de arquivos modificados, tudo em poucas linhas.
        </AlertBox>
      </PageContainer>
    );
  }
  