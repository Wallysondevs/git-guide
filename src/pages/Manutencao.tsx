import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Manutencao() {
  return (
    <PageContainer
      title="Manutenção do Repositório"
      subtitle="GC, fsck, repack, prune e maintenance — manter seu repo rápido, enxuto e saudável conforme ele cresce."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <p>
        Repositórios Git acumulam <em>cruft</em> com o tempo: objetos soltos, packs não otimizados, refs órfãs, branches remotas que já não existem. Em projetos grandes isso se traduz em <strong>clones lentos, status pesado, push demorado</strong>. Este capítulo mostra os comandos de manutenção e como automatizá-los.
      </p>

      <AlertBox type="tip" title="TL;DR">
        Para a maioria dos projetos basta rodar <code>git maintenance start</code> uma vez — daí em diante o Git mantém o repo sozinho em background. O resto deste capítulo é para entender <em>o que</em> ele faz e quando intervir manualmente.
      </AlertBox>

      <h2>O que cresce no .git/</h2>
      <CodeBlock
        title="Anatomia de um repo grande"
        language="bash"
        code={`du -sh .git/
# 412M    .git/

du -sh .git/objects/*
# 312M    .git/objects/pack/    <- arquivos otimizados
#  84M    .git/objects/aa/      <- objetos soltos (loose) — devem ser raros
#  ...

# Objetos soltos = cada commit/tree/blob como arquivo individual
# Packs = arquivos compactados que agrupam milhares de objetos

# Quando você faz commits, eles entram como soltos
# Eventualmente, gc os empacota e ganha 5-10x compressão`}
      />

      <h2>Garbage Collection (gc)</h2>
      <CodeBlock
        title="git gc — o faxineiro"
        language="bash"
        code={`# Roda automaticamente quando há "demais" objetos soltos
# Você pode forçar:
git gc

# Faz mais agressivo (renumera deltas, demora mais, comprime melhor)
git gc --aggressive

# Mostra o que aconteceu
git count-objects -vH
# count: 23                        <- objetos soltos
# size: 184.00 KiB
# in-pack: 8943                    <- objetos empacotados
# packs: 3
# size-pack: 12.45 MiB
# prune-packable: 0
# garbage: 0
`}
      />

      <AlertBox type="warning" title="Não rode gc no meio de uma operação">
        Evite <code>git gc</code> com merge/rebase/bisect em andamento. Em repos compartilhados em servidor, garanta que ninguém está empurrando no momento. <Link href="/recuperacao" className="text-primary underline">Lembre</Link>: gc apaga objetos órfãos — é o que limpa, mas também o que destrói recuperabilidade.
      </AlertBox>

      <h2>Repack (otimizar packs)</h2>
      <CodeBlock
        title="git repack — comprimir manualmente"
        language="bash"
        code={`# Junta TODOS os packs num único arquivo otimizado
git repack -a -d --depth=250 --window=250

# -a   inclui objetos de packs antigos
# -d   apaga packs antigos depois (ganha espaço)
# --depth e --window controlam quanto o Git "pensa" para achar deltas
#   maiores = pack menor, mas demora muito mais

# Em repos enormes (> 1GB), faça em horário ocioso
`}
      />

      <h2>Prune (remover órfãos)</h2>
      <CodeBlock
        title="git prune — apaga o inalcançável"
        language="bash"
        code={`# Lista o que SERIA removido (sem apagar)
git prune --dry-run --verbose

# Apaga objetos não-alcançáveis HÁ MAIS DE 2 SEMANAS (default)
git prune

# Apaga TUDO que está inalcançável agora (perigoso — sem rede de proteção)
git prune --expire=now

# Limpa também o reflog (útil para garantir privacidade ao publicar repo)
git reflog expire --expire=now --all
git gc --prune=now
`}
      />

      <AlertBox type="danger" title="Prune é definitivo">
        Depois de <code>git prune --expire=now</code> + <code>git gc --prune=now</code>, os objetos órfãos somem para sempre. Recuperação via <Link href="/recuperacao" className="text-primary underline">reflog/fsck</Link> não funciona mais. Faça <em>backup</em> antes em qualquer dúvida.
      </AlertBox>

      <h2>Fsck (verificar integridade)</h2>
      <CodeBlock
        title="git fsck — checa o object store"
        language="bash"
        code={`# Verifica a integridade de TODOS os objetos
git fsck --full --strict

# O que esperar:
# Checking object directories: 100% (256/256), done.
# Checking objects: 100% (12345/12345), done.
# (silêncio = tudo bem)

# Se houver problema, sai algo como:
# error: object 4a2b1c8...: badEmail: invalid author/committer line
# missing blob 9f8e7d6...

# Inclui informações sobre objetos órfãos
git fsck --unreachable --no-reflogs

# Útil em pós-crash, disco com erro, ou após operação interrompida
`}
      />

      <h2>Manutenção automática (a forma moderna)</h2>
      <CodeBlock
        title="git maintenance — agendado em background"
        language="bash"
        code={`# Habilita manutenção automática (cria um cron/systemd timer)
git maintenance start

# Por padrão roda:
#   - hourly:  prefetch (só busca, não atualiza branches locais)
#   - daily:   loose-objects, incremental-repack
#   - weekly:  pack-refs, gc

# Ver o que está agendado
git maintenance run --dry-run --task=gc
git maintenance run --dry-run --task=commit-graph

# Forçar rodar agora
git maintenance run

# Desabilitar
git maintenance stop
`}
      />
      <AlertBox type="tip" title="Recomendação geral">
        Se você usa Git diariamente em vários repos grandes, rode <code>git maintenance start</code> em cada um. Custo zero, ganho perceptível em <code>status</code>, <code>log</code> e <code>fetch</code>.
      </AlertBox>

      <h2>Limpeza de branches remotas obsoletas</h2>
      <CodeBlock
        title="Remover refs cujo branch já foi deletado no remoto"
        language="bash"
        code={`# Lista branches remotas que existem localmente mas não no remoto
git remote prune origin --dry-run

# Apaga
git remote prune origin

# Ou já em todo fetch (recomendado)
git config --global fetch.prune true
git config --global fetch.pruneTags true
`}
      />

      <h2>Commit-graph (acelera log e merge)</h2>
      <CodeBlock
        title="Cache pré-calculado do grafo de commits"
        language="bash"
        code={`# Cria/atualiza o commit-graph (cache otimizado)
git commit-graph write --reachable --changed-paths

# Ganhos:
#  - git log --graph    de 12s → 0.4s em monorepos enormes
#  - git log -- arquivo de 8s → 0.2s
#  - git merge-base mais rápido (essencial para rebase)

# Para sempre manter atualizado, ative em config
git config --global core.commitGraph true
git config --global gc.writeCommitGraph true

# 'git maintenance' também cuida disso automaticamente
`}
      />

      <h2>Sparse-checkout & partial clone (repos gigantes)</h2>
      <CodeBlock
        title="Trabalhar em monorepos sem baixar tudo"
        language="bash"
        code={`# Partial clone — baixa só os blobs que você acessar
git clone --filter=blob:none https://github.com/org/monorepo.git

# Sparse-checkout — só checa fora certas pastas
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set apps/meu-time/ libs/comum/

# Agora seu working tree só tem 2 pastas, mas é git completo
ls   # apps/  libs/   (só)

# Adicionar mais pastas depois
git sparse-checkout add apps/outro-time/
`}
      />

      <h2>Reescrever histórico para emagrecer (filter-repo)</h2>
      <p>
        Removeu um arquivo gigante mas o repo continua pesado? É porque o blob ainda está no histórico. Para emagrecer de verdade:
      </p>
      <CodeBlock
        title="Análise + cirurgia"
        language="bash"
        code={`# Instalar
brew install git-filter-repo
# ou: pip install git-filter-repo

# 1. Análise — descobrir os maiores blobs do histórico
git filter-repo --analyze
cat .git/filter-repo/analysis/blob-shas-and-paths.txt | head -20

# 2. Remover por caminho
git filter-repo --path videos/demo.mp4 --invert-paths

# 3. Remover blobs maiores que 50MB onde quer que estejam
git filter-repo --strip-blobs-bigger-than 50M

# 4. Force-push para o remoto (AVISE O TIME!)
git push --force --all
git push --force --tags

# Após isso, todos precisam re-clonar (rebase do histórico velho não funciona)
`}
      />

      <AlertBox type="danger" title="Re-escrita = nova história">
        <code>filter-repo</code> reescreve hashes. Quem tinha clones antigos terá conflitos enormes — o caminho mais simples é todo mundo apagar e re-clonar. Coordenar é obrigatório.
      </AlertBox>

      <h2>Métricas — quão saudável está seu repo?</h2>
      <CodeBlock
        title="Diagnóstico rápido"
        language="bash"
        code={`# Tamanho total
du -sh .git/

# Quebra por categoria
git count-objects -vH

# Top 10 maiores arquivos atualmente em HEAD
git ls-tree -rl HEAD | sort -k4 -n -r | head

# Top 10 maiores objetos no histórico
git rev-list --objects --all \\
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \\
  | grep blob | sort -k3 -n -r | head

# Quantos commits no total
git rev-list --count --all

# Branches que não foram mergeadas em main
git branch --no-merged main
`}
      />

      <h2>Checklist mensal (repo grande, time)</h2>
      <ul>
        <li><code>git maintenance run</code> ou confirmar que <code>git maintenance start</code> está ativo.</li>
        <li><code>git remote prune origin</code> ou <code>fetch.prune=true</code>.</li>
        <li>Apagar branches mergeadas: <code>git branch --merged main | grep -v main | xargs git branch -d</code>.</li>
        <li>Rodar <code>git fsck --full</code> para detectar corrupção precoce.</li>
        <li>Verificar tamanho do <code>.git/</code> — se cresceu desproporcional, investigar com <code>filter-repo --analyze</code>.</li>
        <li>Backup completo (rsync, snapshot do disco, espelho em outro remote).</li>
      </ul>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de bolso"
        language="bash"
        code={`git maintenance start          # ativa manutenção em background
git maintenance run            # roda agora
git gc                         # coleta de lixo
git gc --aggressive            # mais agressivo
git repack -ad                 # otimiza packs
git prune --dry-run            # o que seria apagado
git fsck --full --strict       # integridade
git count-objects -vH          # quantos/quanto
git remote prune origin        # remove refs órfãs
git commit-graph write         # acelera operações
git filter-repo --analyze      # análise para emagrecer
`}
      />

      <h2>Próximos passos</h2>
      <p>
        Para emergências, vá ao capítulo <Link href="/recuperacao" className="text-primary underline">Recuperação</Link>. Para entender quando rebase + force-push fazem sentido, veja <Link href="/rebase" className="text-primary underline">Rebase</Link>. Para quem orquestra repos compartilhados, complete a leitura com <Link href="/fluxos" className="text-primary underline">Fluxos de trabalho</Link>.
      </p>
    </PageContainer>
  );
}
