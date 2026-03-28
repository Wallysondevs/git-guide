import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Dicas() {
  return (
    <PageContainer
      title="Dicas e Truques"
      subtitle="Comandos e técnicas avançadas que vão turbinar sua produtividade com Git."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <p>
        Esta seção reúne truques, atalhos e comandos menos conhecidos do Git que podem transformar seu fluxo de trabalho. Do simples ao avançado.
      </p>

      <h2>git worktree — Múltiplos Branches Simultâneos</h2>
      <p>
        O <code>git worktree</code> permite ter múltiplos branches do mesmo repositório abertos em diretórios diferentes ao mesmo tempo — sem clonar o repositório!
      </p>
      <CodeBlock
        title="git worktree"
        code={`# Criar um worktree para um branch existente
git worktree add ../projeto-hotfix hotfix/bug-critico

# Criar um worktree com um branch novo
git worktree add -b feat/nova-feature ../projeto-feature main

# Listar os worktrees
git worktree list

# Remover um worktree (após terminar o trabalho)
git worktree remove ../projeto-hotfix`}
      />

      <h2>Busca em Todo o Histórico</h2>
      <CodeBlock
        title="Encontrar qualquer coisa no histórico"
        code={`# Buscar uma string em todos os commits
git log -S "senha123" --oneline        # Commits que adicionaram/removeram
git log -G "padrão.*regex" --oneline  # Commits onde o diff bate com o regex

# Buscar em todos os arquivos de um commit
git grep "nomeDaFuncao" abc1234

# Buscar em todos os commits de todos os branches
git log --all --oneline -S "chave-secreta"

# Ver quem introduziu uma variável específica
git log -p -S "API_KEY" -- .env`}
      />

      <h2>Edição de Commits Antigos</h2>
      <CodeBlock
        title="Modificar commits mais antigos"
        code={`# Editar qualquer commit via rebase interativo
git rebase -i HEAD~5   # abre os últimos 5 commits

# Para editar um commit específico:
# 1. Mude 'pick' para 'edit' na linha do commit desejado
# 2. Salve e feche o editor
# 3. Faça as mudanças necessárias
# 4. git add arquivo-modificado.js
# 5. git commit --amend --no-edit
# 6. git rebase --continue`}
      />

      <h2>git notes — Anotações em Commits</h2>
      <CodeBlock
        title="Adicionar notas a commits sem modificá-los"
        code={`# Adicionar nota a um commit
git notes add -m "Descoberta: este commit causou o aumento de memória" abc1234

# Ver notas de um commit
git show abc1234

# Listar todos os commits com notas
git notes list`}
      />

      <h2>Limpeza do Repositório</h2>
      <CodeBlock
        title="Manter o repositório saudável"
        code={`# Verificar integridade do repositório
git fsck

# Limpar arquivos não rastreados (dry-run primeiro!)
git clean -n    # mostra o que seria removido
git clean -fd   # remove diretórios e arquivos

# Compactar o repositório (reduz espaço em disco)
git gc
git gc --aggressive   # compressão mais intensa (mais lento)

# Remover referências de branches remotos deletados
git remote prune origin
git fetch --prune`}
      />

      <h2>Comandos Rápidos</h2>
      <CodeBlock
        title="Truques do dia a dia"
        code={`# Ver o branch atual
git branch --show-current

# Copiar o hash do último commit para o clipboard (macOS)
git rev-parse HEAD | pbcopy

# Contar commits no repositório
git rev-list --count HEAD

# Contar commits por autor
git shortlog -sn --all

# Ver os arquivos mais modificados da história
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20

# Criar um patch de um commit
git format-patch -1 abc1234   # cria arquivo .patch

# Aplicar um patch
git apply arquivo.patch

# Verificar se um branch foi mergeado
git branch --merged main | grep feature/nome`}
      />

      <h2>Recuperação de Emergência</h2>
      <CodeBlock
        title="Quando tudo deu errado"
        code={`# Verifique o reflog PRIMEIRO
git reflog

# Recuperar um arquivo deletado
git checkout HEAD~1 -- arquivo-deletado.js

# Recuperar um branch deletado (via reflog)
git branch recuperado HEAD@{5}

# "Desfazer" um git reset --hard
git reset --hard HEAD@{1}   # volta para antes do reset!

# Criar um backup antes de operações arriscadas
git tag backup-antes-do-rebase
# (delete depois com: git tag -d backup-antes-do-rebase)`}
      />

      <AlertBox type="success" title="Regra de Ouro">
        Quando in dúvida, crie um branch ou tag de backup antes de operações potencialmente destrutivas (rebase, reset, amend). É rápido, seguro e você sempre pode deletar depois.
      </AlertBox>
    </PageContainer>
  );
}
