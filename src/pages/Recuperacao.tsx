import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Recuperacao() {
  return (
    <PageContainer
      title="Recuperação de Desastres"
      subtitle="Apaguei branch, dei reset --hard, force-pushed por engano. Calma — quase nada se perde de verdade no Git. Aqui está o manual de resgate."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git reflog"}</strong> {' — '} {"registra todo movimento do HEAD por 90 dias."}
          </li>
        <li>
            <strong>{"Recuperar commit"}</strong> {' — '} {"git checkout <hash> ou git branch nome <hash>."}
          </li>
        <li>
            <strong>{"git fsck --lost-found"}</strong> {' — '} {"encontra objetos órfãos."}
          </li>
        <li>
            <strong>{"Stash perdido"}</strong> {' — '} {"git stash list após reflog stash."}
          </li>
        <li>
            <strong>{"Backup remoto"}</strong> {' — '} {"sempre push frequente é o melhor seguro."}
          </li>
        </ul>
        <p>
        Pânico é o pior conselheiro. Antes de qualquer coisa: <strong>respire</strong>. O Git mantém os objetos por <strong>30 a 90 dias</strong> mesmo depois que parecem ter sido apagados. Este capítulo é um guia de emergência por sintoma — vá direto ao seu cenário.
      </p>

      <AlertBox type="danger" title="Regra de ouro do socorro">
        Antes de tentar consertar, <strong>não rode <code>git gc</code> nem <code>git prune</code></strong>. Eles é que apagam de verdade os objetos órfãos. Tudo o que você precisa para recuperar costuma estar lá — basta achar.
      </AlertBox>

      <h2>1. "Apaguei o branch errado"</h2>
      <CodeBlock
        title="Recuperar branch deletado"
        language="bash"
        code={`# Cenário: você fez 'git branch -D feature/login' sem querer
# O branch some, mas o último commit dele continua no reflog

git reflog --all | grep feature/login
# 4a2b1c8 refs/heads/feature/login@{0}: commit: WIP login
# (achou! 4a2b1c8 é o último commit do branch)

# Recriar o branch nesse commit
git branch feature/login 4a2b1c8

# Pronto, branch restaurado com TODO o histórico
git log feature/login --oneline -5
`}
      />

      <p>
        Se nem o reflog ajudar (improvável em branch recente), use <code>git fsck</code>:
      </p>
      <CodeBlock
        title="Vasculhar objetos órfãos"
        language="bash"
        code={`# Lista TODOS os commits que não estão em nenhum branch nem tag
git fsck --lost-found
# dangling commit 4a2b1c8d3e2...
# dangling commit 9f8e7d6c5b4...

# Inspecione um a um
git show 4a2b1c8d3e2

# Quando achar o certo, recrie o branch
git branch feature/login 4a2b1c8d3e2
`}
      />

      <h2>2. "Dei <code>reset --hard</code> e perdi commits"</h2>
      <CodeBlock
        title="Voltar de um reset destrutivo"
        language="bash"
        code={`# Você fez 'git reset --hard HEAD~5' e percebeu que precisava daqueles commits
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~5
# def5678 HEAD@{1}: commit: estado que eu QUERIA preservar
# 9876aaa HEAD@{2}: commit: ...
# ...

# Voltar exatamente para o estado anterior ao reset
git reset --hard HEAD@{1}

# Ou, mais explícito, para o commit pelo hash
git reset --hard def5678

# Tudo de volta
git log --oneline -5
`}
      />

      <h2>3. "Apaguei arquivos com <code>git clean -fd</code>"</h2>
      <p>
        <strong>Difícil</strong>. <code>git clean</code> apaga arquivos que <em>nunca</em> foram trackeados — então o Git nunca os conheceu. Tente:
      </p>
      <ul>
        <li>Lixeira do sistema operacional (em alguns casos os arquivos vão pra lá).</li>
        <li>Ferramentas de undelete (TestDisk, PhotoRec) — quanto antes, melhor.</li>
        <li><strong>IDE</strong> (VSCode, IntelliJ) frequentemente mantém histórico local em <em>Local History</em> independente do Git.</li>
      </ul>
      <AlertBox type="tip" title="Lição">
        Use sempre <code>git clean -nfd</code> primeiro (com <code>-n</code> de <em>dry-run</em>) para ver o que vai sumir antes de apertar o gatilho.
      </AlertBox>

      <h2>4. "Força-pushei e sobrescrevi commits do colega"</h2>
      <CodeBlock
        title="Restaurar histórico no remoto"
        language="bash"
        code={`# Antes de qualquer coisa: NÃO faça outro push
# Pegue o estado anterior do remoto via reflog (se você forçou,
# o reflog do SEU local guarda o estado de antes do push)

git reflog
# (encontre o commit anterior ao force-push, digamos 'feedface')

# Restaure local ao estado bom e force-push de volta com lease
git reset --hard feedface
git push --force-with-lease origin main
`}
      />
      <p>
        Se você não tem mais o reflog mas o colega tem o branch local, o jeito é ele empurrar de volta:
      </p>
      <CodeBlock
        title="Resgate via colega"
        language="bash"
        code={`# Colega que ainda tem o branch local:
git fetch origin
git log origin/main..main         # vê commits que ainda existem só localmente
git push --force-with-lease origin main
`}
      />
      <AlertBox type="warning" title="Sempre --force-with-lease">
        Use <code>--force-with-lease</code> em vez de <code>--force</code>: ele recusa o push se alguém empurrou no meio tempo, evitando que <em>você</em> sobrescreva commits novos.
      </AlertBox>

      <h2>5. "Commitei um arquivo gigante / segredo / .env"</h2>
      <p>
        Se ainda <strong>não fez push</strong>:
      </p>
      <CodeBlock
        title="Remover do último commit"
        language="bash"
        code={`# Tirar o arquivo do último commit (mantém o conteúdo no disco)
git rm --cached caminho/arquivo
echo "caminho/arquivo" >> .gitignore
git add .gitignore
git commit --amend --no-edit
`}
      />

      <p>
        Se já <strong>está no histórico remoto</strong>: precisa reescrever histórico. Use <code>git filter-repo</code> (sucessor moderno do <code>filter-branch</code>):
      </p>
      <CodeBlock
        title="Apagar arquivo de TODO o histórico"
        language="bash"
        code={`# Instalar (uma vez)
brew install git-filter-repo
# ou: pip install git-filter-repo

# Remover por caminho
git filter-repo --path caminho/segredo.env --invert-paths

# Remover por conteúdo (ex: regex de chave de API)
git filter-repo --replace-text <(echo 'sk_live_***==>***REMOVED***')

# Force-push (avise o time antes!)
git push --force --all
git push --force --tags
`}
      />

      <AlertBox type="danger" title="Segredo vazado = segredo comprometido">
        Se um <strong>token, senha, chave</strong> foi pra um repo público, <strong>rotacione imediatamente</strong>. Apagar do histórico não basta — ferramentas de scraping copiam em segundos. <Link href="/configuracao" className="text-primary underline">Use variáveis de ambiente</Link> daqui pra frente.
      </AlertBox>

      <h2>6. "Conflito de merge e estraguei tudo"</h2>
      <CodeBlock
        title="Abortar e tentar de novo"
        language="bash"
        code={`# Cancelar o merge em andamento e voltar ao estado anterior
git merge --abort

# Idem para rebase
git rebase --abort

# Idem para cherry-pick
git cherry-pick --abort

# Após abortar, sua árvore de trabalho volta exatamente ao que era
git status
`}
      />
      <p>
        Veja também <Link href="/conflitos" className="text-primary underline">Conflitos</Link> para resolução metódica.
      </p>

      <h2>7. "Commitei na branch errada"</h2>
      <CodeBlock
        title="Mover commits para branch correta"
        language="bash"
        code={`# Você commitou 3 mudanças em main, mas era pra ser em feature/x
# 1. Crie/mude para a branch certa nesse mesmo ponto
git branch feature/x          # cria, mas não muda
# (ou: git switch -c feature/x se ainda não existir)

# 2. Volte main para o estado anterior aos 3 commits
git checkout main
git reset --hard HEAD~3

# 3. Os commits estão preservados em feature/x
git log feature/x --oneline -5
`}
      />

      <h2>8. "Stash sumiu"</h2>
      <CodeBlock
        title="Recuperar stash dropado"
        language="bash"
        code={`# git stash drop por engano? procure entre objetos órfãos
git fsck --unreachable | grep commit
# unreachable commit a1b2c3d4...

# Inspecione (stash entries são commits especiais, com 2 ou 3 parents)
git show a1b2c3d4

# Re-aplicar como stash
git stash apply a1b2c3d4
# ou recriar a entrada no stash
git stash store -m "stash recuperado" a1b2c3d4
`}
      />

      <h2>Diagnóstico: quando está realmente perdido</h2>
      <CodeBlock
        title="Checklist antes de desistir"
        language="bash"
        code={`# 1. Reflog local (90 dias por padrão)
git reflog --date=iso

# 2. Reflog de TODAS as refs (não só HEAD)
git reflog --all

# 3. Objetos órfãos (commits e blobs sem parent)
git fsck --lost-found
git fsck --unreachable

# 4. Cópia local em outro lugar?
find ~ -name ".git" -type d 2>/dev/null | xargs -I {} dirname {}

# 5. Outros clones (colegas, CI, deploy server)
# A maior chance de salvação geralmente está aqui

# 6. Backups do sistema, Time Machine, snapshots de disco

# 7. GitHub mantém branches deletadas por algum tempo via API
#    https://api.github.com/repos/USER/REPO/events
`}
      />

      <h2>Prevenção: hábitos que salvam</h2>
      <ul>
        <li><strong>Aumente o reflog</strong> em repos importantes:
          <CodeBlock language="bash" code={`git config --global gc.reflogExpire "365 days"
git config --global gc.reflogExpireUnreachable "90 days"`} />
        </li>
        <li><strong>Crie branch temporária antes de operações arriscadas</strong>:
          <CodeBlock language="bash" code={`git branch backup-$(date +%Y%m%d-%H%M%S)
# agora pode rebase/reset à vontade — sempre pode voltar`} />
        </li>
        <li><strong><code>--force-with-lease</code></strong> em vez de <code>--force</code> sempre.</li>
        <li><strong><code>git stash</code></strong> antes de operações em árvore suja.</li>
        <li><strong>Push frequente para branch remoto pessoal</strong> — backup automático.</li>
      </ul>

      <h2>Cheat-sheet de emergência</h2>
      <CodeBlock
        title="Cole na geladeira"
        language="bash"
        code={`git reflog                   # histórico de movimentos do HEAD
git reflog --all             # idem para TODAS as refs
git fsck --lost-found        # objetos sem dono
git fsck --unreachable       # tudo que GC apagaria
git branch <nome> <hash>     # ressuscita branch num commit
git reset --hard HEAD@{N}    # volta para o N-ésimo estado anterior
git stash apply <hash>       # restaura stash dropado
git merge --abort            # cancela merge em andamento
git rebase --abort           # cancela rebase
git cherry-pick --abort      # cancela cherry-pick
git push --force-with-lease  # nunca --force puro
`}
      />

      <h2>Próximos passos</h2>
      <p>
        Estude o <Link href="/reflog" className="text-primary underline">Reflog</Link> em profundidade — é a sua principal ferramenta de seguro. Veja também <Link href="/reset" className="text-primary underline">Reset e Revert</Link> para entender o que cada operação realmente faz, e <Link href="/manutencao" className="text-primary underline">Manutenção</Link> para configurar GC e retenção corretamente.
      </p>
    </PageContainer>
  );
}
