import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Merge() {
  return (
    <PageContainer
      title="Merge"
      subtitle="Como integrar branches com git merge e entender os diferentes tipos de merge."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <p>
        O <code>git merge</code> integra o histórico de dois branches. Depois de trabalhar em uma funcionalidade em um branch separado, você usa merge para trazer essas mudanças de volta ao branch principal.
      </p>

      <h2>Tipos de Merge</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold text-primary mb-2 border-0 mt-0">Fast-forward Merge</h4>
          <p className="text-sm text-muted-foreground">Ocorre quando o branch principal não avançou desde a criação do branch de feature. O Git simplesmente move o ponteiro para frente — sem criar commit de merge.</p>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold text-primary mb-2 border-0 mt-0">Three-way Merge</h4>
          <p className="text-sm text-muted-foreground">Ocorre quando ambos os branches avançaram. O Git cria um "merge commit" especial com dois pais, preservando o histórico de ambos os branches.</p>
        </div>
      </div>

      <CodeBlock
        title="Fazendo merge"
        code={`# Primeiro, vá para o branch que receberá o merge
git switch main

# Faça o merge do branch de feature
git merge feature/nova-funcionalidade

# Merge com mensagem customizada
git merge feature/nova-funcionalidade -m "Merge: adiciona funcionalidade de exportação"

# Forçar a criação de um merge commit (mesmo se fast-forward fosse possível)
git merge --no-ff feature/nova-funcionalidade

# Ver quais commits serão mergeados antes de executar
git log main..feature/nova-funcionalidade --oneline`}
      />

      <AlertBox type="info" title="--no-ff: Merge sem Fast-forward">
        Muitas equipes usam <code>--no-ff</code> para sempre criar um merge commit. Isso preserva no histórico o contexto de que aquele trabalho foi feito em um branch separado, facilitando a leitura do histórico.
      </AlertBox>

      <h2>Merge com Squash</h2>
      <p>
        O <code>--squash</code> junta todos os commits do branch em um único commit no branch principal, mantendo o histórico mais limpo.
      </p>

      <CodeBlock
        title="Squash merge"
        code={`# Traz todas as mudanças do branch como staged, sem criar merge commit
git merge --squash feature/nova-funcionalidade

# Você precisa criar o commit manualmente
git commit -m "feat: adiciona nova funcionalidade de exportação"

# Resultado: apenas 1 commit no main, ao invés de 10 commits do feature`}
      />

      <h2>Cancelando um Merge</h2>
      <CodeBlock
        title="Abortando um merge em andamento"
        code={`# Se houver conflitos e você quiser cancelar o merge
git merge --abort

# Se o merge já foi completado mas você quer desfazer
git reset --hard HEAD~1   # só se ainda não fez push!`}
      />

      <h2>Estratégias de Merge</h2>
      <CodeBlock
        title="Estratégias avançadas de merge"
        code={`# Merge preferindo a versão do branch atual em caso de conflito
git merge -X ours feature/branch

# Merge preferindo a versão do branch sendo mergeado
git merge -X theirs feature/branch

# Ver o que seria mergeado sem fazer o merge
git merge --no-commit --no-ff feature/branch
# Para ver o resultado:
git diff --cached
# Para cancelar:
git merge --abort`}
      />

      <h2>Após o Merge</h2>
      <CodeBlock
        title="Limpando depois do merge"
        code={`# Após o merge bem-sucedido, delete o branch local
git branch -d feature/nova-funcionalidade

# Delete também o branch remoto (se existir)
git push origin --delete feature/nova-funcionalidade

# Confirme que o merge foi bem-sucedido
git log --oneline --graph -10`}
      />

      <AlertBox type="success" title="Quando usar Merge vs Rebase">
        Use <strong>merge</strong> para integrar branches de longa duração (feature branches, hotfixes) ao main — preserva o contexto histórico. Use <strong>rebase</strong> para manter seu branch de feature atualizado com o main durante o desenvolvimento — cria um histórico mais linear.
      </AlertBox>
    </PageContainer>
  );
}
