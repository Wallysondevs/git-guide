import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function CherryPick() {
  return (
    <PageContainer
      title="Cherry-pick"
      subtitle="Aplique commits específicos de um branch em outro, como escolher cerejas de uma árvore."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <p>
        O <code>git cherry-pick</code> aplica as mudanças de um commit específico no branch atual, sem precisar fazer merge do branch inteiro. É como "pegar emprestado" um commit de outro lugar.
      </p>

      <h2>Uso Básico</h2>
      <CodeBlock
        title="Aplicando um commit específico"
        code={`# Aplicar um commit específico no branch atual
git cherry-pick abc1234

# Aplicar sem criar o commit automaticamente (mantém staged)
git cherry-pick abc1234 --no-commit

# Aplicar vários commits
git cherry-pick abc1234 def5678 ghi9012

# Aplicar um intervalo de commits (do mais antigo ao mais novo)
git cherry-pick abc1234..def5678

# Aplicar mantendo o autor original
git cherry-pick abc1234 --signoff`}
      />

      <h2>Casos de Uso Comuns</h2>

      <div className="grid grid-cols-1 gap-3 my-6">
        {[
          { title: "Hotfix em versão antiga", desc: "Você corrigiu um bug no main e precisa aplicar a mesma correção em uma branch de versão v1.x que ainda recebe suporte." },
          { title: "Pegar commit de branch errada", desc: "Você commitou em um branch errado e precisa trazer apenas aquele commit para o branch correto." },
          { title: "Features parciais", desc: "Você quer trazer apenas uma parte do trabalho de um feature branch que ainda não está pronto para merge completo." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
            <strong className="text-primary">{item.title}</strong>
            <p className="text-sm text-muted-foreground mt-1 mb-0">{item.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        title="Exemplo de hotfix em versão antiga"
        code={`# Cenário: você corrigiu um bug no main (commit abc1234)
# e precisa aplicar a correção na branch de suporte v1.x

# Anote o hash do commit com a correção
git log --oneline main -5
# abc1234 fix: corrige crash ao exportar PDF (este!)

# Mude para a branch de suporte
git switch v1.x

# Aplique apenas aquele commit
git cherry-pick abc1234

# Faça push
git push origin v1.x`}
      />

      <h2>Resolvendo Conflitos</h2>
      <CodeBlock
        title="Conflitos durante cherry-pick"
        code={`# Se houver conflitos durante o cherry-pick:
git cherry-pick abc1234

# Git para e indica conflitos:
# CONFLICT (content): Merge conflict in arquivo.js

# 1. Resolva os conflitos manualmente
# 2. Adicione os arquivos resolvidos
git add arquivo.js

# 3. Continue o cherry-pick
git cherry-pick --continue

# Para cancelar e voltar ao estado anterior:
git cherry-pick --abort`}
      />

      <AlertBox type="warning" title="Cherry-pick gera commits duplicados">
        Quando você faz cherry-pick, o Git cria um novo commit com o mesmo conteúdo mas um hash diferente. Se mais tarde você fizer merge do branch original, esse commit pode aparecer em duplicata no histórico. Use cherry-pick com moderação.
      </AlertBox>
    </PageContainer>
  );
}
