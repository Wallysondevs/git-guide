import{j as e,L as o}from"./index-By_zGcNR.js";import{P as s,A as r,C as a}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(s,{title:"Recuperação de Desastres",subtitle:"Apaguei branch, dei reset --hard, force-pushed por engano. Calma — quase nada se perde de verdade no Git. Aqui está o manual de resgate.",difficulty:"intermediario",timeToRead:"13 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git reflog"})," "," — "," ","registra todo movimento do HEAD por 90 dias."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Recuperar commit"})," "," — "," ","git checkout <hash> ou git branch nome <hash>."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git fsck --lost-found"})," "," — "," ","encontra objetos órfãos."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stash perdido"})," "," — "," ","git stash list após reflog stash."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Backup remoto"})," "," — "," ","sempre push frequente é o melhor seguro."]})]}),e.jsxs("p",{children:["Pânico é o pior conselheiro. Antes de qualquer coisa: ",e.jsx("strong",{children:"respire"}),". O Git mantém os objetos por ",e.jsx("strong",{children:"30 a 90 dias"})," mesmo depois que parecem ter sido apagados. Este capítulo é um guia de emergência por sintoma — vá direto ao seu cenário."]}),e.jsxs(r,{type:"danger",title:"Regra de ouro do socorro",children:["Antes de tentar consertar, ",e.jsxs("strong",{children:["não rode ",e.jsx("code",{children:"git gc"})," nem ",e.jsx("code",{children:"git prune"})]}),". Eles é que apagam de verdade os objetos órfãos. Tudo o que você precisa para recuperar costuma estar lá — basta achar."]}),e.jsx("h2",{children:'1. "Apaguei o branch errado"'}),e.jsx(a,{title:"Recuperar branch deletado",language:"bash",code:`# Cenário: você fez 'git branch -D feature/login' sem querer
# O branch some, mas o último commit dele continua no reflog

git reflog --all | grep feature/login
# 4a2b1c8 refs/heads/feature/login@{0}: commit: WIP login
# (achou! 4a2b1c8 é o último commit do branch)

# Recriar o branch nesse commit
git branch feature/login 4a2b1c8

# Pronto, branch restaurado com TODO o histórico
git log feature/login --oneline -5
`}),e.jsxs("p",{children:["Se nem o reflog ajudar (improvável em branch recente), use ",e.jsx("code",{children:"git fsck"}),":"]}),e.jsx(a,{title:"Vasculhar objetos órfãos",language:"bash",code:`# Lista TODOS os commits que não estão em nenhum branch nem tag
git fsck --lost-found
# dangling commit 4a2b1c8d3e2...
# dangling commit 9f8e7d6c5b4...

# Inspecione um a um
git show 4a2b1c8d3e2

# Quando achar o certo, recrie o branch
git branch feature/login 4a2b1c8d3e2
`}),e.jsxs("h2",{children:['2. "Dei ',e.jsx("code",{children:"reset --hard"}),' e perdi commits"']}),e.jsx(a,{title:"Voltar de um reset destrutivo",language:"bash",code:`# Você fez 'git reset --hard HEAD~5' e percebeu que precisava daqueles commits
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
`}),e.jsxs("h2",{children:['3. "Apaguei arquivos com ',e.jsx("code",{children:"git clean -fd"}),'"']}),e.jsxs("p",{children:[e.jsx("strong",{children:"Difícil"}),". ",e.jsx("code",{children:"git clean"})," apaga arquivos que ",e.jsx("em",{children:"nunca"})," foram trackeados — então o Git nunca os conheceu. Tente:"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Lixeira do sistema operacional (em alguns casos os arquivos vão pra lá)."}),e.jsx("li",{children:"Ferramentas de undelete (TestDisk, PhotoRec) — quanto antes, melhor."}),e.jsxs("li",{children:[e.jsx("strong",{children:"IDE"})," (VSCode, IntelliJ) frequentemente mantém histórico local em ",e.jsx("em",{children:"Local History"})," independente do Git."]})]}),e.jsxs(r,{type:"tip",title:"Lição",children:["Use sempre ",e.jsx("code",{children:"git clean -nfd"})," primeiro (com ",e.jsx("code",{children:"-n"})," de ",e.jsx("em",{children:"dry-run"}),") para ver o que vai sumir antes de apertar o gatilho."]}),e.jsx("h2",{children:'4. "Força-pushei e sobrescrevi commits do colega"'}),e.jsx(a,{title:"Restaurar histórico no remoto",language:"bash",code:`# Antes de qualquer coisa: NÃO faça outro push
# Pegue o estado anterior do remoto via reflog (se você forçou,
# o reflog do SEU local guarda o estado de antes do push)

git reflog
# (encontre o commit anterior ao force-push, digamos 'feedface')

# Restaure local ao estado bom e force-push de volta com lease
git reset --hard feedface
git push --force-with-lease origin main
`}),e.jsx("p",{children:"Se você não tem mais o reflog mas o colega tem o branch local, o jeito é ele empurrar de volta:"}),e.jsx(a,{title:"Resgate via colega",language:"bash",code:`# Colega que ainda tem o branch local:
git fetch origin
git log origin/main..main         # vê commits que ainda existem só localmente
git push --force-with-lease origin main
`}),e.jsxs(r,{type:"warning",title:"Sempre --force-with-lease",children:["Use ",e.jsx("code",{children:"--force-with-lease"})," em vez de ",e.jsx("code",{children:"--force"}),": ele recusa o push se alguém empurrou no meio tempo, evitando que ",e.jsx("em",{children:"você"})," sobrescreva commits novos."]}),e.jsx("h2",{children:'5. "Commitei um arquivo gigante / segredo / .env"'}),e.jsxs("p",{children:["Se ainda ",e.jsx("strong",{children:"não fez push"}),":"]}),e.jsx(a,{title:"Remover do último commit",language:"bash",code:`# Tirar o arquivo do último commit (mantém o conteúdo no disco)
git rm --cached caminho/arquivo
echo "caminho/arquivo" >> .gitignore
git add .gitignore
git commit --amend --no-edit
`}),e.jsxs("p",{children:["Se já ",e.jsx("strong",{children:"está no histórico remoto"}),": precisa reescrever histórico. Use ",e.jsx("code",{children:"git filter-repo"})," (sucessor moderno do ",e.jsx("code",{children:"filter-branch"}),"):"]}),e.jsx(a,{title:"Apagar arquivo de TODO o histórico",language:"bash",code:`# Instalar (uma vez)
brew install git-filter-repo
# ou: pip install git-filter-repo

# Remover por caminho
git filter-repo --path caminho/segredo.env --invert-paths

# Remover por conteúdo (ex: regex de chave de API)
git filter-repo --replace-text <(echo 'sk_live_***==>***REMOVED***')

# Force-push (avise o time antes!)
git push --force --all
git push --force --tags
`}),e.jsxs(r,{type:"danger",title:"Segredo vazado = segredo comprometido",children:["Se um ",e.jsx("strong",{children:"token, senha, chave"})," foi pra um repo público, ",e.jsx("strong",{children:"rotacione imediatamente"}),". Apagar do histórico não basta — ferramentas de scraping copiam em segundos. ",e.jsx(o,{href:"/configuracao",className:"text-primary underline",children:"Use variáveis de ambiente"})," daqui pra frente."]}),e.jsx("h2",{children:'6. "Conflito de merge e estraguei tudo"'}),e.jsx(a,{title:"Abortar e tentar de novo",language:"bash",code:`# Cancelar o merge em andamento e voltar ao estado anterior
git merge --abort

# Idem para rebase
git rebase --abort

# Idem para cherry-pick
git cherry-pick --abort

# Após abortar, sua árvore de trabalho volta exatamente ao que era
git status
`}),e.jsxs("p",{children:["Veja também ",e.jsx(o,{href:"/conflitos",className:"text-primary underline",children:"Conflitos"})," para resolução metódica."]}),e.jsx("h2",{children:'7. "Commitei na branch errada"'}),e.jsx(a,{title:"Mover commits para branch correta",language:"bash",code:`# Você commitou 3 mudanças em main, mas era pra ser em feature/x
# 1. Crie/mude para a branch certa nesse mesmo ponto
git branch feature/x          # cria, mas não muda
# (ou: git switch -c feature/x se ainda não existir)

# 2. Volte main para o estado anterior aos 3 commits
git checkout main
git reset --hard HEAD~3

# 3. Os commits estão preservados em feature/x
git log feature/x --oneline -5
`}),e.jsx("h2",{children:'8. "Stash sumiu"'}),e.jsx(a,{title:"Recuperar stash dropado",language:"bash",code:`# git stash drop por engano? procure entre objetos órfãos
git fsck --unreachable | grep commit
# unreachable commit a1b2c3d4...

# Inspecione (stash entries são commits especiais, com 2 ou 3 parents)
git show a1b2c3d4

# Re-aplicar como stash
git stash apply a1b2c3d4
# ou recriar a entrada no stash
git stash store -m "stash recuperado" a1b2c3d4
`}),e.jsx("h2",{children:"Diagnóstico: quando está realmente perdido"}),e.jsx(a,{title:"Checklist antes de desistir",language:"bash",code:`# 1. Reflog local (90 dias por padrão)
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
`}),e.jsx("h2",{children:"Prevenção: hábitos que salvam"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Aumente o reflog"})," em repos importantes:",e.jsx(a,{language:"bash",code:`git config --global gc.reflogExpire "365 days"
git config --global gc.reflogExpireUnreachable "90 days"`})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Crie branch temporária antes de operações arriscadas"}),":",e.jsx(a,{language:"bash",code:`git branch backup-$(date +%Y%m%d-%H%M%S)
# agora pode rebase/reset à vontade — sempre pode voltar`})]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"--force-with-lease"})})," em vez de ",e.jsx("code",{children:"--force"})," sempre."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"git stash"})})," antes de operações em árvore suja."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Push frequente para branch remoto pessoal"})," — backup automático."]})]}),e.jsx("h2",{children:"Cheat-sheet de emergência"}),e.jsx(a,{title:"Cole na geladeira",language:"bash",code:`git reflog                   # histórico de movimentos do HEAD
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
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Estude o ",e.jsx(o,{href:"/reflog",className:"text-primary underline",children:"Reflog"})," em profundidade — é a sua principal ferramenta de seguro. Veja também ",e.jsx(o,{href:"/reset",className:"text-primary underline",children:"Reset e Revert"})," para entender o que cada operação realmente faz, e ",e.jsx(o,{href:"/manutencao",className:"text-primary underline",children:"Manutenção"})," para configurar GC e retenção corretamente."]})]})}export{n as default};
