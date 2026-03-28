import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Branches() {
  return (
    <PageContainer
      title="Trabalhando com Branches"
      subtitle="Branches permitem desenvolvimento paralelo sem interferência. Aprenda a criar, navegar e gerenciar branches."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <p>
        Branches (ramos) são um dos recursos mais poderosos do Git. Elas permitem que você trabalhe em novas funcionalidades, correções de bugs ou experimentos sem afetar o código principal — e depois integre o trabalho quando estiver pronto.
      </p>

      <h2>O que é um Branch?</h2>
      <p>
        Um branch é simplesmente um ponteiro móvel para um commit específico. O branch padrão costuma se chamar <strong>main</strong> (ou antigo <strong>master</strong>). Quando você cria um branch, o Git cria um novo ponteiro que começa a se mover independentemente.
      </p>

      <CodeBlock
        title="Criando e navegando em branches"
        code={`# Ver todos os branches locais
git branch

# Ver todos os branches (locais e remotos)
git branch -a

# Criar um novo branch
git branch nome-do-branch

# Criar e já mudar para o novo branch
git checkout -b nome-do-branch   # forma clássica
git switch -c nome-do-branch     # forma moderna (Git 2.23+)

# Mudar para um branch existente
git checkout main
git switch main   # forma moderna`}
      />

      <h2>Convenções de Nomenclatura</h2>
      <p>
        Nomes de branches devem ser descritivos e seguir uma convenção:
      </p>

      <CodeBlock
        title="Exemplos de nomes de branch"
        language="text"
        code={`feature/adicionar-login-google      # Nova funcionalidade
feature/exportar-relatorio-pdf
fix/corrigir-crash-ao-logout        # Correção de bug
fix/validacao-formulario-contato
hotfix/seguranca-xss                # Correção urgente em produção
release/v2.0.0                      # Preparação de release
chore/atualizar-dependencias        # Tarefa de manutenção
docs/atualizar-readme               # Documentação`}
      />

      <h2>Gerenciando Branches</h2>
      <CodeBlock
        title="Operações com branches"
        code={`# Renomear o branch atual
git branch -m novo-nome

# Renomear um branch específico
git branch -m nome-antigo novo-nome

# Deletar um branch (após merge)
git branch -d nome-do-branch

# Forçar deleção (mesmo sem merge — CUIDADO!)
git branch -D nome-do-branch

# Ver o último commit de cada branch
git branch -v

# Ver branches já mergeados no branch atual
git branch --merged

# Ver branches ainda não mergeados
git branch --no-merged`}
      />

      <AlertBox type="warning" title="Antes de deletar">
        Antes de deletar um branch com <code>git branch -d</code>, certifique-se de que o trabalho foi mergeado para outro branch. O Git vai avisar se houver commits não mergeados, mas <code>-D</code> (maiúsculo) força a deleção mesmo assim.
      </AlertBox>

      <h2>HEAD — O Ponteiro Especial</h2>
      <p>
        <strong>HEAD</strong> é um ponteiro especial que indica em qual branch (ou commit) você está atualmente. Quando você muda de branch, o HEAD se move junto.
      </p>

      <CodeBlock
        title="Trabalhando com HEAD"
        code={`# Ver para onde o HEAD aponta
cat .git/HEAD

# HEAD~1 = commit anterior ao HEAD
# HEAD~2 = dois commits atrás
# HEAD^  = mesmo que HEAD~1

git diff HEAD~3 HEAD   # diferença dos últimos 3 commits
git log HEAD~5..HEAD --oneline  # últimos 5 commits`}
      />

      <h2>git switch vs git checkout</h2>
      <p>
        A partir do Git 2.23, o comando <code>git switch</code> foi introduzido para substituir <code>git checkout</code> em operações com branches. É mais claro e menos propenso a erros:
      </p>

      <CodeBlock
        title="git switch (recomendado para branches)"
        code={`# Mudar para um branch existente
git switch main

# Criar e mudar para novo branch
git switch -c feature/nova-funcionalidade

# Criar branch a partir de um commit específico
git switch -c hotfix/bug-critico abc1234

# Voltar para o branch anterior
git switch -`}
      />

      <AlertBox type="success" title="Regra de Ouro">
        Nunca trabalhe diretamente no branch <code>main</code>. Sempre crie um branch para cada funcionalidade ou correção. Isso mantém o histórico limpo e facilita a revisão de código.
      </AlertBox>
    </PageContainer>
  );
}
