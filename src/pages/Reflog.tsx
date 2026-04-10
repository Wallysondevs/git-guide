import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Reflog() {
    return (
      <PageContainer
        title="git reflog"
        subtitle="O histórico secreto do Git — recupere commits, branches e trabalho que parecem perdidos."
        difficulty="avancado"
        timeToRead="12 min"
      >
        <p>
          O <code>git reflog</code> (reference log) registra cada movimento do HEAD — cada commit, checkout, merge, rebase, reset que você fez. É o mecanismo de recuperação de desastres do Git: trabalho que parece perdido geralmente está aqui.
        </p>

        <AlertBox type="success" title="O Git raramente apaga dados de verdade">
          Commits "perdidos" por reset --hard, rebase, ou branch deletado ainda existem na object store do Git por pelo menos 30 dias (padrão). O reflog te ajuda a encontrá-los.
        </AlertBox>

        <h2>Visualizando o reflog</h2>
        <CodeBlock
          title="Lendo o reflog"
          code={`# Ver o reflog do HEAD
  git reflog
  # Saída:
  # abc1234 (HEAD -> main) HEAD@{0}: commit: feat: adiciona login
  # def5678 HEAD@{1}: merge feature/auth: Merge made by the 'ort' strategy.
  # ghi9012 HEAD@{2}: checkout: moving from feature/auth to main
  # jkl3456 HEAD@{3}: reset: moving to HEAD~2
  # mno7890 HEAD@{4}: commit: wip: trabalho em progresso

  # Ver reflog de um branch específico
  git reflog main
  git reflog feature/login

  # Ver reflog com datas
  git reflog --date=iso

  # Formato mais legível
  git reflog --pretty=format:"%h %ar %gs"`}
        />

        <h2>Recuperando commits perdidos</h2>
        <CodeBlock
          title="Cenário 1: reset --hard acidental"
          code={`# Você fez:
  git reset --hard HEAD~3
  # Agora seus 3 últimos commits "sumiram"

  # 1. Ver o reflog para encontrá-los
  git reflog
  # abc1234 HEAD@{0}: reset: moving to HEAD~3
  # def5678 HEAD@{1}: commit: feat: formulário de contato  ← você quer este
  # ghi9012 HEAD@{2}: commit: feat: validação de email
  # jkl3456 HEAD@{3}: commit: feat: campo de telefone

  # 2. Restaurar o estado anterior ao reset
  git reset --hard def5678
  # OU criar um branch no commit perdido
  git branch recuperado def5678
  git switch recuperado`}
        />

        <CodeBlock
          title="Cenário 2: branch deletado acidentalmente"
          code={`# Você deletou um branch sem fazer merge
  git branch -D feature/minha-feature
  # Deleted branch feature/minha-feature (was abc1234).

  # 1. Usar o SHA impresso na mensagem de delete
  git branch feature/minha-feature abc1234

  # 2. OU encontrar via reflog
  git reflog
  # abc1234 HEAD@{5}: commit: feat: funcionalidade incrível

  # 3. Recriar o branch
  git branch feature/minha-feature abc1234
  git switch feature/minha-feature`}
        />

        <CodeBlock
          title="Cenário 3: rebase deu errado"
          code={`# Rebase transformou histórico de forma inesperada
  git rebase main  # resultado ruim

  # Encontrar estado antes do rebase no reflog
  git reflog
  # abc1234 HEAD@{0}: rebase (finish): returning to refs/heads/feature
  # def5678 HEAD@{1}: rebase (pick): último commit bom
  # ...
  # ghi9012 HEAD@{8}: checkout: moving from main to feature  ← antes do rebase

  # Voltar ao estado pré-rebase
  git reset --hard ghi9012
  # Branch restaurado exatamente como estava antes`}
        />

        <h2>Reflog por referência</h2>
        <CodeBlock
          title="Sintaxe de referência do reflog"
          code={`# HEAD@{N} = N movimentos atrás
  git checkout HEAD@{1}   # estado de 1 operação atrás
  git diff HEAD@{0} HEAD@{3}  # diferença entre agora e 3 ops atrás

  # main@{N} = N movimentos atrás no branch main
  git show main@{5}

  # Tempo relativo
  git show main@{2.hours.ago}
  git show HEAD@{yesterday}
  git diff HEAD@{1.week.ago} HEAD

  # Listar commits desde uma data
  git log main@{2024-01-01}..main`}
        />

        <h2>Limpeza e expiração do reflog</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Configuração</th>
                <th className="p-3 text-left">Padrão</th>
                <th className="p-3 text-left">Significado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["gc.reflogExpire", "90 dias", "Entradas acessíveis expiram em 90 dias"],
                ["gc.reflogExpireUnreachable", "30 dias", "Commits inacessíveis expiram em 30 dias"],
                ["core.logAllRefUpdates", "true", "Ativa/desativa o reflog (não desative!)"],
              ].map(([conf, pad, sig], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{conf}</td>
                  <td className="p-3 text-yellow-400 text-sm">{pad}</td>
                  <td className="p-3 text-muted-foreground text-sm">{sig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="warning" title="git gc pode apagar dados do reflog">
          O comando <code>git gc</code> (garbage collection) aplica as políticas de expiração. Entradas com mais de 30 dias (inacessíveis) podem ser apagadas permanentemente. Se você perdeu algo, procure <em>antes</em> de rodar gc.
        </AlertBox>
      </PageContainer>
    );
  }
  