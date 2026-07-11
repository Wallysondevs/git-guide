import{j as e,L as r}from"./index-By_zGcNR.js";import{P as s,A as o,C as a}from"./AlertBox-CZTB6a28.js";function c(){return e.jsxs(s,{title:"Reflog",subtitle:"O histórico secreto de TUDO que aconteceu localmente. A rede de segurança que recupera commits 'perdidos' por reset, rebase ou checkout.",difficulty:"intermediario",timeToRead:"10 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Reflog"})," "," — "," ","log local de todos os movimentos do HEAD."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"git reflog"})," "," — "," ","vê histórico; cada entrada tem HEAD@{N}."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Recuperar HEAD"})," "," — "," ","git reset --hard HEAD@{2}."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Branch reflog"})," "," — "," ","git reflog show nome-do-branch."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Expiração"})," "," — "," ","padrão 90 dias para alcançáveis, 30 para inalcançáveis."]})]}),e.jsxs("p",{children:["O ",e.jsx("strong",{children:"reflog"})," é uma ",e.jsx("em",{children:"caixa preta"}),": cada vez que ",e.jsx("code",{children:"HEAD"})," ou um branch se move (commit, checkout, reset, rebase, merge), o Git registra. Tudo isso fica gravado por ",e.jsx("strong",{children:"30 a 90 dias"}),", mesmo que os commits não estejam mais em nenhum branch. Isso significa que ",e.jsx("strong",{children:"quase nada se perde de verdade"})," no Git."]}),e.jsx(o,{type:"tip",title:"Mantra do Git",children:'"Se você commitou pelo menos uma vez, você pode recuperar." O reflog é a razão. Apaga branch, reseta hard, rebaseia errado — tudo fica gravado.'}),e.jsx("h2",{children:"O comando básico"}),e.jsx(a,{title:"git reflog",language:"bash",code:`git reflog
# a1b2c3d HEAD@{0}: commit: feat: nova feature
# 7p8q9r0 HEAD@{1}: rebase finished: returning to refs/heads/main
# 5l6m7n8 HEAD@{2}: rebase: feat: ...
# 3o4p5q6 HEAD@{3}: checkout: moving from feature to main
# 1m2n3o4 HEAD@{4}: pull --rebase: ...

# Mostra:
# - hash do commit
# - referência (HEAD@{N})
# - tipo da operação
# - mensagem/contexto

# Reflog de um branch específico
git reflog show feature/x
git reflog feature/x

# Com formato customizado
git reflog --pretty=format:'%h %gd %gs %s' --date=relative
`}),e.jsxs("h2",{children:["Notação HEAD@",N]}),e.jsx(a,{title:"Formas de referenciar",language:"bash",code:`HEAD@{0}     ← onde você está agora
HEAD@{1}     ← onde estava antes
HEAD@{2}     ← anterior a isso
...

# Por tempo (não índice)
HEAD@{1.hour.ago}
HEAD@{yesterday}
HEAD@{2.weeks.ago}
HEAD@{2026-03-15.10:00:00}

# Por nome de branch
main@{1}     ← onde main estava antes
feature@{0}  ← onde feature está agora

# Para usar:
git show HEAD@{2}
git diff HEAD HEAD@{1}
git checkout HEAD@{3}
git reset --hard HEAD@{1}
`}),e.jsx("h2",{children:"Cenários de recuperação"}),e.jsx("h3",{children:'1. "Resetei hard e perdi commits!"'}),e.jsx(a,{title:"Recuperando reset --hard",language:"bash",code:`# Você fez:
git reset --hard HEAD~3      # ⚠️ perdeu 3 commits

# Solução
git reflog
# 1f2g3h4 HEAD@{0}: reset: moving to HEAD~3
# 7i8j9k0 HEAD@{1}: commit: feat: ...     ← perdido
# 5l6m7n8 HEAD@{2}: commit: fix: ...      ← perdido
# 3o4p5q6 HEAD@{3}: commit: refactor: ... ← perdido

# Volte para o estado anterior ao reset
git reset --hard HEAD@{1}

# OU crie um branch novo do estado perdido
git switch -c salvos HEAD@{1}
`}),e.jsx("h3",{children:'2. "Apaguei um branch que tinha commits!"'}),e.jsx(a,{title:"Recuperando branch deletado",language:"bash",code:`# Você fez:
git branch -D feature/importante
# Deleted branch feature/importante (was a1b2c3d)

# Solução: o hash apareceu no warning. Crie branch novo:
git switch -c feature/importante a1b2c3d

# Se você não capturou o hash, procure no reflog
git reflog | grep feature/importante
# OU encontre commits órfãos
git fsck --lost-found
git log --all --oneline | grep "feat: o que era da feature"
`}),e.jsx("h3",{children:'3. "Rebase deu ruim, quero voltar atrás"'}),e.jsx(a,{title:"Recuperando rebase",language:"bash",code:`# Após rebase mal-sucedido
git reflog
# a1b2c3d HEAD@{0}: rebase finished
# 7p8q9r0 HEAD@{1}: rebase: feat: ...
# 5l6m7n8 HEAD@{2}: rebase: ...
# c3d4e5f HEAD@{3}: feat: estado ANTES do rebase ★

# Volte para antes do rebase
git reset --hard c3d4e5f
git reset --hard HEAD@{3}

# Truque: ORIG_HEAD aponta para o estado pré-rebase
git reset --hard ORIG_HEAD
`}),e.jsx("h3",{children:'4. "Stashe drop por engano!"'}),e.jsx(a,{title:"Recuperando stash dropped",language:"bash",code:`# Você fez:
git stash drop stash@{0}     # oops!

# Procure no reflog (stashes têm refs próprias)
git fsck --unreachable | grep commit
# unreachable commit a1b2c3d
# unreachable commit 7p8q9r0

# Inspecione cada um
git show a1b2c3d
git show 7p8q9r0

# Achou? Recupere
git stash apply a1b2c3d
git checkout -b recovered a1b2c3d
`}),e.jsx("h3",{children:'5. "Fiz force-push errado e o remoto perdeu commits"'}),e.jsx(a,{title:"Recuperando do reflog LOCAL",language:"bash",code:`# Os commits perdidos no remoto ainda estão no SEU reflog local
# (desde que você os tinha em algum momento)

git reflog
# Ache o estado anterior
git push origin <hash-do-estado-bom>:main --force-with-lease

# Se foi outro dev que fez force-push, peça pra ele recuperar do reflog DELE
# Se ninguém tem mais — perdido (a menos que tenha CI/Reflog server)
`}),e.jsx("h2",{children:"Reflog vs log"}),e.jsx(a,{title:"Diferença fundamental",language:"markdown",code:`git log
  → mostra o histórico LINEAR a partir de HEAD
  → segue a árvore de commits (parents)
  → visão "histórica"

git reflog
  → mostra o histórico de OPERAÇÕES locais
  → cronológico, em ordem que aconteceram
  → inclui commits órfãos (sem branch apontando)
  → visão "operacional" / debug
`}),e.jsx("h2",{children:"Inspecionando reflog específico"}),e.jsx(a,{title:"Por ref",language:"bash",code:`# Reflog do HEAD (padrão)
git reflog
git reflog HEAD

# Reflog de um branch
git reflog main
git reflog feature/x

# Reflog do stash
git reflog stash

# Reflog de uma tag
git reflog v1.0.0

# Mostrar TUDO
git reflog --all
`}),e.jsx("h2",{children:"Configurando expiração"}),e.jsx(a,{title:"Quanto tempo o reflog guarda",language:"bash",code:`# Padrões:
# - Refs alcançáveis: 90 dias
# - Refs não-alcançáveis: 30 dias

git config --global gc.reflogExpire "90 days"
git config --global gc.reflogExpireUnreachable "30 days"

# AUMENTAR (mais segurança, mais disco)
git config --global gc.reflogExpire "1 year"
git config --global gc.reflogExpireUnreachable "90 days"

# Nunca expirar (CUIDADO — repo cresce)
git config --global gc.reflogExpire never
git config --global gc.reflogExpireUnreachable never
`}),e.jsx("h2",{children:"Limpando o reflog (raro)"}),e.jsx(a,{title:"Force expire",language:"bash",code:`# Expirar entries antigas (segue regras de gc.reflogExpire)
git reflog expire --expire=now --all
git reflog expire --expire-unreachable=now --all

# Forçar GC para limpar objetos órfãos
git gc --prune=now

# ⚠️  Depois disso, recuperação fica MUITO mais difícil
# Use só se realmente precisa de espaço
`}),e.jsxs(o,{type:"danger",title:"Limpar reflog é irreversível",children:["Após ",e.jsx("code",{children:"reflog expire"})," + ",e.jsx("code",{children:"gc --prune=now"}),", commits órfãos somem para SEMPRE. Faça apenas em repos onde você tem certeza de não precisar de recovery."]}),e.jsx("h2",{children:"git fsck — encontrando ovos perdidos"}),e.jsx(a,{title:"Quando reflog não basta",language:"bash",code:`# Lista commits e árvores não-alcançáveis (órfãos)
git fsck --unreachable
git fsck --lost-found
# unreachable commit a1b2c3d
# unreachable blob 7p8q9r0
# unreachable tree 5l6m7n8

# Inspecionar cada commit órfão
for hash in $(git fsck --no-reflogs --unreachable | grep commit | awk '{print $3}'); do
  echo "──── $hash ────"
  git show --stat "$hash" | head -5
  echo ""
done

# Recuperar criando branch
git switch -c recuperado a1b2c3d
`}),e.jsx("h2",{children:"Workflow defensivo: tag antes de operações arriscadas"}),e.jsx(a,{title:"Backup antes de reset/rebase",language:"bash",code:`# Antes de rebase grande
git tag backup-pre-rebase
git rebase -i HEAD~50

# Se der ruim
git reset --hard backup-pre-rebase
git tag -d backup-pre-rebase

# Truque: alias automatizado
git config --global alias.safe-rebase '!f() { \\
  git tag "backup-$(date +%s)" && \\
  git rebase "$@"; \\
}; f'
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(a,{title:"Reflog essencial",language:"bash",code:`git reflog                      # ver tudo
git reflog show <branch>        # de um branch
git reflog --all                # todas as refs

# Recuperação
git reset --hard HEAD@{N}       # volta N operações atrás
git reset --hard ORIG_HEAD      # antes do último merge/rebase
git switch -c novo HEAD@{N}     # cria branch do estado anterior

# Encontrar órfãos
git fsck --lost-found
git fsck --unreachable

# Configuração
git config gc.reflogExpire "1 year"
git config gc.reflogExpireUnreachable "90 days"

# Limpar (com CUIDADO)
git reflog expire --expire=now --all
git gc --prune=now
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{href:"/recuperacao",children:"Recuperação de Desastres"})," — guia completo"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/reset",children:"Reset"}),' — reflog é o "antídoto"']}),e.jsxs("li",{children:[e.jsx(r,{href:"/manutencao",children:"Manutenção"})," — gc, prune e como tudo funciona"]})]})]})}export{c as default};
