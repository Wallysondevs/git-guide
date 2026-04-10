import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Reset() {
    return (
      <PageContainer
        title="git reset"
        subtitle="Desfaça commits, limpe a staging area ou reverta o working directory — com precisão e segurança."
        difficulty="intermediario"
        timeToRead="14 min"
      >
        <p>
          O <code>git reset</code> move o HEAD (e opcionalmente o branch atual) para um commit anterior. Dependendo do modo, pode ou não afetar a staging area e o working directory. É uma das ferramentas mais poderosas e potencialmente destrutivas do Git.
        </p>

        <AlertBox type="danger" title="git reset é destrutivo em branches públicos">
          Nunca use <code>git reset</code> em commits que já foram enviados para um repositório compartilhado. Use <code>git revert</code> em vez disso para desfazer de forma segura.
        </AlertBox>

        <h2>Os três modos do git reset</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { modo: "--soft", desc: "Move o HEAD para o commit anterior. Mudanças ficam na staging area (prontas para novo commit). Mais seguro.", uso: "Refazer o último commit", cor: "text-green-400" },
            { modo: "--mixed (padrão)", desc: "Move o HEAD E limpa a staging area. Mudanças voltam para o working directory como não staged.", uso: "Desfazer staging, refazer commits", cor: "text-yellow-400" },
            { modo: "--hard", desc: "Move o HEAD, limpa staging E descarta mudanças do working directory. Dados podem ser perdidos.", uso: "Descartar completamente mudanças indesejadas", cor: "text-destructive" },
          ].map((item) => (
            <div key={item.modo} className="p-4 border border-border rounded-xl bg-card">
              <code className={"font-bold text-base mb-2 block " + item.cor}>{item.modo}</code>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <p className="text-xs"><strong>Uso ideal:</strong> {item.uso}</p>
            </div>
          ))}
        </div>

        <h2>Exemplos práticos</h2>
        <CodeBlock
          title="git reset --soft — refazendo commits"
          code={`# Desfazer o último commit, mantendo mudanças staged
  git reset --soft HEAD~1

  # Agora você pode:
  git status  # mudanças estão staged
  git commit -m "nova mensagem melhorada"

  # Caso de uso: você commitou mas quer mudar a mensagem
  # (alternativa: git commit --amend)

  # Combinar 3 últimos commits em um
  git reset --soft HEAD~3
  git commit -m "feat: implementa sistema de notificações"`}
        />

        <CodeBlock
          title="git reset --mixed — limpando staging"
          code={`# Desfazer git add (mais comum)
  git reset HEAD src/app.js
  # equivale a: git restore --staged src/app.js

  # Desfazer o último commit, mudanças voltam para working dir
  git reset HEAD~1  # --mixed é o padrão

  # Desfazer múltiplos commits
  git reset HEAD~3  # 3 commits atrás

  # Após reset --mixed:
  git status  # arquivos aparecem como "Changes not staged for commit"`}
        />

        <CodeBlock
          title="git reset --hard — descartando tudo"
          code={`# Descartar TODAS as mudanças não commitadas
  git reset --hard HEAD

  # Voltar para um commit específico, descartando tudo depois
  git reset --hard abc1234

  # CUIDADO: isso apaga mudanças do working directory
  # Mas ainda é recuperável via reflog (por ~30 dias):
  git reflog
  # HEAD@{1}: commit: o que você perdeu
  git reset --hard HEAD@{1}  # recuperar!`}
        />

        <h2>Reset vs Revert vs Restore</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Comando</th>
                <th className="p-3 text-left">O que faz</th>
                <th className="p-3 text-left">Seguro em público?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["git reset", "Move HEAD para trás — reescreve histórico", "❌ Não"],
                ["git revert", "Cria novo commit que desfaz mudanças — histórico preservado", "✅ Sim"],
                ["git restore", "Desfaz mudanças em arquivos individuais (não muda commits)", "✅ Sim (sem commits)"],
                ["git restore --staged", "Remove arquivo da staging area sem alterar arquivo", "✅ Sim (sem commits)"],
              ].map(([cmd, oque, seg], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{cmd}</td>
                  <td className="p-3 text-muted-foreground text-sm">{oque}</td>
                  <td className="p-3 text-sm">{seg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="success" title="Regra de ouro: use revert em branches públicos">
          Se você precisa desfazer algo que já foi para o <code>main</code> ou está em um PR revisado por outros, use <code>git revert</code>. Ele cria um novo commit que desfaz o anterior, sem reescrever o histórico.
        </AlertBox>

        <CodeBlock
          title="Casos de uso do dia a dia"
          code={`# Remover arquivo do stage (esqueceu de adicionar ao .gitignore)
  git reset HEAD segredo.env
  # ou modernamente:
  git restore --staged segredo.env

  # Desfazer o último commit (mantendo mudanças)
  git reset --soft HEAD~1

  # Limpar TUDO e voltar ao estado limpo do main
  git fetch origin
  git reset --hard origin/main

  # Desfazer reset acidental (reflog ao resgate)
  git reflog
  git reset --hard HEAD@{2}`}
        />
      </PageContainer>
    );
  }
  