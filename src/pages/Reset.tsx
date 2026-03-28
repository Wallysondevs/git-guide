import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Reset() {
  return (
    <PageContainer
      title="Reset e Revert"
      subtitle="Como desfazer commits e mudanças no Git — com segurança."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <p>
        O Git oferece duas formas principais de desfazer mudanças: <code>git reset</code> (reescreve o histórico) e <code>git revert</code> (cria um novo commit de desfazimento). A escolha entre eles depende de se o commit já foi compartilhado com outros.
      </p>

      <h2>git reset — Reescrevendo Histórico</h2>
      <p>
        O <code>git reset</code> move o ponteiro do branch para um commit anterior, efetivamente "removendo" commits do histórico. Mas atenção: os dados não são apagados imediatamente — o reflog os mantém por um tempo.
      </p>

      <div className="grid grid-cols-1 gap-3 my-6">
        {[
          { flag: "--soft", desc: "Move HEAD para o commit alvo. Mantém as mudanças na staging area.", cor: "text-green-400" },
          { flag: "--mixed", desc: "Move HEAD e limpa a staging area. Mantém as mudanças no working directory. (Padrão)", cor: "text-yellow-400" },
          { flag: "--hard", desc: "Move HEAD, limpa staging e descarta TODAS as mudanças. IRREVERSÍVEL!", cor: "text-red-400" },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border flex gap-3">
            <code className={`font-bold ${item.cor} shrink-0`}>{item.flag}</code>
            <p className="text-sm text-muted-foreground m-0">{item.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        title="git reset — exemplos"
        code={`# Desfazer o último commit, mantendo mudanças staged
git reset --soft HEAD~1

# Desfazer o último commit, mover mudanças para working directory
git reset HEAD~1     # --mixed é o padrão

# Desfazer os últimos 3 commits e descartar tudo (CUIDADO!)
git reset --hard HEAD~3

# Resetar para um commit específico
git reset --hard abc1234

# Resetar um arquivo específico da staging area
git reset HEAD src/app.js    # remove da staging, mantém mudanças`}
      />

      <AlertBox type="danger" title="git reset --hard é IRREVERSÍVEL">
        <code>git reset --hard</code> descarta permanentemente as mudanças não commitadas. Depois do hard reset, a única forma de recuperar dados é via <code>git reflog</code> (antes do garbage collector rodar). Use com extremo cuidado.
      </AlertBox>

      <h2>git revert — Desfazendo com Segurança</h2>
      <p>
        O <code>git revert</code> cria um novo commit que desfaz as mudanças de um commit anterior. É seguro para usar em branches públicos pois não reescreve o histórico.
      </p>

      <CodeBlock
        title="git revert — exemplos"
        code={`# Criar um commit que desfaz o commit mais recente
git revert HEAD

# Desfazer um commit específico (sem criar o commit imediatamente)
git revert abc1234 --no-commit

# Desfazer vários commits
git revert HEAD~3..HEAD

# Desfazer um merge commit
git revert -m 1 abc1234   # -m 1 = manter o primeiro pai`}
      />

      <h2>Quando usar Reset vs Revert</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-green-500/20 rounded-xl bg-green-500/5">
          <h4 className="font-bold text-green-400 mb-2 border-0 mt-0">Use git reset quando:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Os commits são apenas locais</li>
            <li>• Você ainda não fez push</li>
            <li>• Quer "limpar" commits de WIP</li>
          </ul>
        </div>
        <div className="p-4 border border-blue-500/20 rounded-xl bg-blue-500/5">
          <h4 className="font-bold text-blue-400 mb-2 border-0 mt-0">Use git revert quando:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• O commit já foi publicado</li>
            <li>• Outros colaboradores têm o commit</li>
            <li>• Precisa desfazer em branch principal</li>
          </ul>
        </div>
      </div>

      <h2>git restore — Descartando Mudanças</h2>
      <CodeBlock
        title="Descartando mudanças específicas"
        code={`# Descartar mudanças em um arquivo no working directory
git restore src/app.js

# Descartar todas as mudanças no working directory
git restore .

# Remover arquivo da staging area (manter no working dir)
git restore --staged src/app.js

# Restaurar arquivo para a versão de um commit específico
git restore --source=abc1234 src/app.js`}
      />
    </PageContainer>
  );
}
