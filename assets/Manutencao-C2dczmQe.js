import{j as e,L as r}from"./index-By_zGcNR.js";import{P as i,A as o,C as a}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(i,{title:"Manutenção do Repositório",subtitle:"GC, fsck, repack, prune e maintenance — manter seu repo rápido, enxuto e saudável conforme ele cresce.",difficulty:"avancado",timeToRead:"12 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git gc"})," "," — "," ","garbage collection — compacta objetos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git fsck"})," "," — "," ","verifica integridade do repo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git prune"})," "," — "," ","remove objetos inalcançáveis."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git reflog expire"})," "," — "," ","limpa entradas antigas do reflog."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git maintenance"})," "," — "," ","agenda gc + commit-graph + prefetch automaticamente."]})]}),e.jsxs("p",{children:["Repositórios Git acumulam ",e.jsx("em",{children:"cruft"})," com o tempo: objetos soltos, packs não otimizados, refs órfãs, branches remotas que já não existem. Em projetos grandes isso se traduz em ",e.jsx("strong",{children:"clones lentos, status pesado, push demorado"}),". Este capítulo mostra os comandos de manutenção e como automatizá-los."]}),e.jsxs(o,{type:"tip",title:"TL;DR",children:["Para a maioria dos projetos basta rodar ",e.jsx("code",{children:"git maintenance start"})," uma vez — daí em diante o Git mantém o repo sozinho em background. O resto deste capítulo é para entender ",e.jsx("em",{children:"o que"})," ele faz e quando intervir manualmente."]}),e.jsx("h2",{children:"O que cresce no .git/"}),e.jsx(a,{title:"Anatomia de um repo grande",language:"bash",code:`du -sh .git/
# 412M    .git/

du -sh .git/objects/*
# 312M    .git/objects/pack/    <- arquivos otimizados
#  84M    .git/objects/aa/      <- objetos soltos (loose) — devem ser raros
#  ...

# Objetos soltos = cada commit/tree/blob como arquivo individual
# Packs = arquivos compactados que agrupam milhares de objetos

# Quando você faz commits, eles entram como soltos
# Eventualmente, gc os empacota e ganha 5-10x compressão`}),e.jsx("h2",{children:"Garbage Collection (gc)"}),e.jsx(a,{title:"git gc — o faxineiro",language:"bash",code:`# Roda automaticamente quando há "demais" objetos soltos
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
`}),e.jsxs(o,{type:"warning",title:"Não rode gc no meio de uma operação",children:["Evite ",e.jsx("code",{children:"git gc"})," com merge/rebase/bisect em andamento. Em repos compartilhados em servidor, garanta que ninguém está empurrando no momento. ",e.jsx(r,{href:"/recuperacao",className:"text-primary underline",children:"Lembre"}),": gc apaga objetos órfãos — é o que limpa, mas também o que destrói recuperabilidade."]}),e.jsx("h2",{children:"Repack (otimizar packs)"}),e.jsx(a,{title:"git repack — comprimir manualmente",language:"bash",code:`# Junta TODOS os packs num único arquivo otimizado
git repack -a -d --depth=250 --window=250

# -a   inclui objetos de packs antigos
# -d   apaga packs antigos depois (ganha espaço)
# --depth e --window controlam quanto o Git "pensa" para achar deltas
#   maiores = pack menor, mas demora muito mais

# Em repos enormes (> 1GB), faça em horário ocioso
`}),e.jsx("h2",{children:"Prune (remover órfãos)"}),e.jsx(a,{title:"git prune — apaga o inalcançável",language:"bash",code:`# Lista o que SERIA removido (sem apagar)
git prune --dry-run --verbose

# Apaga objetos não-alcançáveis HÁ MAIS DE 2 SEMANAS (default)
git prune

# Apaga TUDO que está inalcançável agora (perigoso — sem rede de proteção)
git prune --expire=now

# Limpa também o reflog (útil para garantir privacidade ao publicar repo)
git reflog expire --expire=now --all
git gc --prune=now
`}),e.jsxs(o,{type:"danger",title:"Prune é definitivo",children:["Depois de ",e.jsx("code",{children:"git prune --expire=now"})," + ",e.jsx("code",{children:"git gc --prune=now"}),", os objetos órfãos somem para sempre. Recuperação via ",e.jsx(r,{href:"/recuperacao",className:"text-primary underline",children:"reflog/fsck"})," não funciona mais. Faça ",e.jsx("em",{children:"backup"})," antes em qualquer dúvida."]}),e.jsx("h2",{children:"Fsck (verificar integridade)"}),e.jsx(a,{title:"git fsck — checa o object store",language:"bash",code:`# Verifica a integridade de TODOS os objetos
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
`}),e.jsx("h2",{children:"Manutenção automática (a forma moderna)"}),e.jsx(a,{title:"git maintenance — agendado em background",language:"bash",code:`# Habilita manutenção automática (cria um cron/systemd timer)
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
`}),e.jsxs(o,{type:"tip",title:"Recomendação geral",children:["Se você usa Git diariamente em vários repos grandes, rode ",e.jsx("code",{children:"git maintenance start"})," em cada um. Custo zero, ganho perceptível em ",e.jsx("code",{children:"status"}),", ",e.jsx("code",{children:"log"})," e ",e.jsx("code",{children:"fetch"}),"."]}),e.jsx("h2",{children:"Limpeza de branches remotas obsoletas"}),e.jsx(a,{title:"Remover refs cujo branch já foi deletado no remoto",language:"bash",code:`# Lista branches remotas que existem localmente mas não no remoto
git remote prune origin --dry-run

# Apaga
git remote prune origin

# Ou já em todo fetch (recomendado)
git config --global fetch.prune true
git config --global fetch.pruneTags true
`}),e.jsx("h2",{children:"Commit-graph (acelera log e merge)"}),e.jsx(a,{title:"Cache pré-calculado do grafo de commits",language:"bash",code:`# Cria/atualiza o commit-graph (cache otimizado)
git commit-graph write --reachable --changed-paths

# Ganhos:
#  - git log --graph    de 12s → 0.4s em monorepos enormes
#  - git log -- arquivo de 8s → 0.2s
#  - git merge-base mais rápido (essencial para rebase)

# Para sempre manter atualizado, ative em config
git config --global core.commitGraph true
git config --global gc.writeCommitGraph true

# 'git maintenance' também cuida disso automaticamente
`}),e.jsx("h2",{children:"Sparse-checkout & partial clone (repos gigantes)"}),e.jsx(a,{title:"Trabalhar em monorepos sem baixar tudo",language:"bash",code:`# Partial clone — baixa só os blobs que você acessar
git clone --filter=blob:none https://github.com/org/monorepo.git

# Sparse-checkout — só checa fora certas pastas
cd monorepo
git sparse-checkout init --cone
git sparse-checkout set apps/meu-time/ libs/comum/

# Agora seu working tree só tem 2 pastas, mas é git completo
ls   # apps/  libs/   (só)

# Adicionar mais pastas depois
git sparse-checkout add apps/outro-time/
`}),e.jsx("h2",{children:"Reescrever histórico para emagrecer (filter-repo)"}),e.jsx("p",{children:"Removeu um arquivo gigante mas o repo continua pesado? É porque o blob ainda está no histórico. Para emagrecer de verdade:"}),e.jsx(a,{title:"Análise + cirurgia",language:"bash",code:`# Instalar
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
`}),e.jsxs(o,{type:"danger",title:"Re-escrita = nova história",children:[e.jsx("code",{children:"filter-repo"})," reescreve hashes. Quem tinha clones antigos terá conflitos enormes — o caminho mais simples é todo mundo apagar e re-clonar. Coordenar é obrigatório."]}),e.jsx("h2",{children:"Métricas — quão saudável está seu repo?"}),e.jsx(a,{title:"Diagnóstico rápido",language:"bash",code:`# Tamanho total
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
`}),e.jsx("h2",{children:"Checklist mensal (repo grande, time)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"git maintenance run"})," ou confirmar que ",e.jsx("code",{children:"git maintenance start"})," está ativo."]}),e.jsxs("li",{children:[e.jsx("code",{children:"git remote prune origin"})," ou ",e.jsx("code",{children:"fetch.prune=true"}),"."]}),e.jsxs("li",{children:["Apagar branches mergeadas: ",e.jsx("code",{children:"git branch --merged main | grep -v main | xargs git branch -d"}),"."]}),e.jsxs("li",{children:["Rodar ",e.jsx("code",{children:"git fsck --full"})," para detectar corrupção precoce."]}),e.jsxs("li",{children:["Verificar tamanho do ",e.jsx("code",{children:".git/"})," — se cresceu desproporcional, investigar com ",e.jsx("code",{children:"filter-repo --analyze"}),"."]}),e.jsx("li",{children:"Backup completo (rsync, snapshot do disco, espelho em outro remote)."})]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(a,{title:"Comandos de bolso",language:"bash",code:`git maintenance start          # ativa manutenção em background
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
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Para emergências, vá ao capítulo ",e.jsx(r,{href:"/recuperacao",className:"text-primary underline",children:"Recuperação"}),". Para entender quando rebase + force-push fazem sentido, veja ",e.jsx(r,{href:"/rebase",className:"text-primary underline",children:"Rebase"}),". Para quem orquestra repos compartilhados, complete a leitura com ",e.jsx(r,{href:"/fluxos",className:"text-primary underline",children:"Fluxos de trabalho"}),"."]})]})}export{n as default};
