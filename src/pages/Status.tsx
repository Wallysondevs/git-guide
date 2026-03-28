import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Status() {
  return (
    <PageContainer
      title="Status e Diff"
      subtitle="Entenda o estado atual do repositório e veja as diferenças entre versões dos seus arquivos."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        Dois dos comandos mais usados no dia a dia são <code>git status</code> e <code>git diff</code>. Eles respondem às perguntas: "O que mudou?" e "Como exatamente mudou?".
      </p>

      <h2>git status</h2>
      <p>
        O <code>git status</code> mostra o estado de todos os arquivos no repositório em relação ao último commit.
      </p>

      <CodeBlock
        title="Interpretando o git status"
        code={`$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/utils.js       # Novo arquivo na staging area
        modified:   src/app.js         # Arquivo modificado e staged

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   README.md          # Modificado, mas não staged

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        temp.log                       # Arquivo não rastreado pelo Git`}
      />

      <CodeBlock
        title="Versão resumida do status"
        code={`# Versão curta e compacta
git status -s    # ou --short

# Saída:
# M  src/app.js    (M = modified, first column = staged)
# ?? temp.log      (?? = untracked)
# A  src/utils.js  (A = added/staged)
#  M README.md     (M na segunda coluna = não staged)`}
      />

      <h2>git diff</h2>
      <p>
        O <code>git diff</code> mostra exatamente o que mudou nos arquivos — linha por linha.
      </p>

      <CodeBlock
        title="git diff — diferenças no working directory"
        code={`# Mostra o que mudou mas NÃO está na staging area
git diff

# Saída típica:
# diff --git a/README.md b/README.md
# index abc1234..def5678 100644
# --- a/README.md    (versão antiga)
# +++ b/README.md    (versão nova)
# @@ -1,3 +1,4 @@
#  # Meu Projeto
# +
# +Esta é uma nova linha adicionada.   (+ = adicionado)
# -Esta linha foi removida.            (- = removido)
#  Esta linha não mudou.`}
      />

      <CodeBlock
        title="Variações do git diff"
        code={`# Diferenças entre working directory e último commit
git diff

# Diferenças na staging area (o que vai no próximo commit)
git diff --staged   # ou --cached

# Diferenças entre dois commits
git diff abc1234 def5678

# Diferenças entre dois branches
git diff main feature/nova-funcionalidade

# Diferenças de um arquivo específico
git diff README.md

# Resumo estatístico das mudanças
git diff --stat`}
      />

      <h2>git show</h2>
      <p>
        Para ver o conteúdo completo de um commit específico:
      </p>

      <CodeBlock
        title="Inspecionando commits"
        code={`# Mostra o último commit completo
git show

# Mostra um commit específico pelo hash
git show abc1234

# Mostra apenas os arquivos mudados em um commit
git show --name-only abc1234

# Mostra um arquivo específico em um commit
git show abc1234:src/app.js`}
      />

      <h2>Rastreando um Arquivo Específico</h2>
      <CodeBlock
        title="Histórico de um arquivo"
        code={`# Ver todos os commits que tocaram um arquivo
git log -- src/app.js

# Ver as mudanças em cada commit para um arquivo
git log -p -- src/app.js

# Ver quem escreveu cada linha (blame)
git blame src/app.js

# Ver blame de um trecho específico
git blame -L 10,20 src/app.js`}
      />

      <AlertBox type="info" title="Dica: git diff com ferramentas visuais">
        Você pode usar ferramentas visuais para ver diffs de forma mais clara. Configure com: <code>git config --global diff.tool vscode</code>. Depois use <code>git difftool</code> ao invés de <code>git diff</code>.
      </AlertBox>
    </PageContainer>
  );
}
