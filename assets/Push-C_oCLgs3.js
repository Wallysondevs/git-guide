import{j as e,L as s}from"./index-By_zGcNR.js";import{P as a,A as i,C as o}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(a,{title:"Push e Pull",subtitle:"Sincronize seu trabalho com o servidor — quando usar pull, quando usar fetch+merge, e como evitar force-push perigoso.",difficulty:"iniciante",timeToRead:"13 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"git push"})," "," — "," ","envia commits locais para o remoto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"-u"})," "," — "," ","set upstream — configura tracking, próximas vezes só git push."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--force / --force-with-lease"})," "," — "," ","reescreve histórico remoto; lease é seguro."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Push tags"})," "," — "," ","git push --tags envia tags junto."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Protected branches"})," "," — "," ","servidor pode rejeitar push direto em main."]})]}),e.jsxs("p",{children:[e.jsx("code",{children:"push"})," manda seus commits para o remoto. ",e.jsx("code",{children:"pull"}),' traz commits do remoto para você. Soa simples — mas a maioria dos problemas de "Git quebrou" mora aqui. Este capítulo te dá modelos mentais sólidos para nunca mais ter medo desses comandos.']}),e.jsxs(i,{type:"tip",title:"Modelo mental",children:[e.jsx("code",{children:"git push"}),' = "envia o que está aqui pra lá". ',e.jsx("code",{children:"git pull"})," = ",e.jsx("code",{children:"git fetch"})," + ",e.jsx("code",{children:"git merge"})," (ou ",e.jsx("code",{children:"rebase"}),'). Toda confusão começa quando você esquece desse "merge embutido".']}),e.jsx("h2",{children:"git push — o básico"}),e.jsx(o,{title:"Variações",language:"bash",code:`# Push do branch atual para seu upstream
git push

# Especificando remote e branch
git push origin main

# Push criando upstream automático
git push -u origin feature/x
git push --set-upstream origin feature/x

# Configurar para SEMPRE criar upstream em push novo
git config --global push.autoSetupRemote true

# Push de TODOS os branches locais
git push --all origin

# Push de tags
git push origin --tags                # todas
git push origin v1.0.0                # uma específica
git push --follow-tags                # annotated tags relacionadas
`}),e.jsx("h2",{children:"git pull — o que ele REALMENTE faz"}),e.jsx(o,{title:"Decomposição",language:"bash",code:`# git pull é EXATAMENTE isso:
git pull = git fetch + git merge FETCH_HEAD

# OU se você configurou pull.rebase=true:
git pull = git fetch + git rebase FETCH_HEAD

# Variações
git pull                          # branch atual, upstream padrão
git pull origin main              # remote e branch específicos
git pull --rebase                 # força rebase em vez de merge
git pull --ff-only                # só permite fast-forward (sem merge commit)
git pull --autostash              # stash automático se working sujo

# Nunca crie merge commit ao puxar (recomendado para main)
git config --global pull.rebase true
git config --global pull.ff only
`}),e.jsx("h2",{children:"fetch vs pull — a distinção crucial"}),e.jsx(o,{title:"Por que fetch é mais seguro",language:"bash",code:`# fetch: BAIXA mudanças mas NÃO toca seus arquivos
git fetch
# Atualiza refs/remotes/origin/* mas seu working/branch local não muda

# Veja o que veio antes de aplicar
git log HEAD..origin/main --oneline
git diff HEAD origin/main

# Aplique só quando estiver pronto
git merge origin/main
# OU
git rebase origin/main
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(s,{href:"/fetch",children:"Fetch"}),"."]}),e.jsx("h2",{children:"Quando o push é rejeitado"}),e.jsx(o,{title:"non-fast-forward",language:"bash",code:`git push
# To github.com:user/repo.git
#  ! [rejected]        main -> main (non-fast-forward)
# error: failed to push some refs

# Significa: o remoto avançou enquanto você trabalhava
# Solução normal:
git pull --rebase       # traz as mudanças deles, reaplica suas em cima
git push                # agora vai
`}),e.jsx("h2",{children:"Force push — quando, como e por que NÃO"}),e.jsx(o,{title:"--force vs --force-with-lease",language:"bash",code:`# ❌ NUNCA use --force puro em branches compartilhadas
git push --force
git push -f
# Isso sobrescreve TUDO no remoto sem checar se alguém pushou em cima

# ✅ Use --force-with-lease — falha se o remoto mudou desde seu último fetch
git push --force-with-lease

# ✅ Ainda mais seguro: --force-if-includes (Git ≥ 2.30)
git push --force-with-lease --force-if-includes

# Configurar push --force-with-lease como padrão NÃO existe oficialmente
# (use alias):
git config --global alias.pushf "push --force-with-lease --force-if-includes"
`}),e.jsxs(i,{type:"danger",title:"Quando você PRECISA de force push",children:["Após ",e.jsx("code",{children:"rebase"}),", ",e.jsx("code",{children:"commit --amend"}),", ",e.jsx("code",{children:"filter-branch"})," ou ",e.jsx("code",{children:"reset"})," em branch já pushada. Isso é normal em ",e.jsx("strong",{children:"seu próprio branch de feature"})," — nunca em main/develop compartilhados."]}),e.jsx("h2",{children:"Bloqueando push em main"}),e.jsx(o,{title:"Proteção local com hook",language:"bash",code:`# Crie .git/hooks/pre-push
cat > .git/hooks/pre-push <<'EOF'
#!/bin/sh
protected="main master production"
current=$(git rev-parse --abbrev-ref HEAD)
for branch in $protected; do
  if [ "$current" = "$branch" ]; then
    echo "❌ Push direto em '$branch' bloqueado. Use Pull Request."
    exit 1
  fi
done
EOF
chmod +x .git/hooks/pre-push
`}),e.jsxs("p",{children:["No GitHub/GitLab, configure ",e.jsx("strong",{children:"branch protection rules"})," para bloquear no servidor. Veja ",e.jsx(s,{href:"/github",children:"Usando GitHub"}),"."]}),e.jsx("h2",{children:"Push parcial e seletivo"}),e.jsx(o,{title:"Push de refs específicas",language:"bash",code:`# Push de uma ref específica para nome diferente no remoto
git push origin local-name:remote-name

# Push de SHA específico para um branch remoto
git push origin abc1234:refs/heads/main

# Push deletando branch remoto
git push origin :feature/old        # forma clássica
git push origin --delete feature/old # forma moderna

# Push só se o destino não existir (criar branch novo no remoto)
git push origin main:novo-branch
`}),e.jsx("h2",{children:"push.default — comportamento sem args"}),e.jsx(o,{title:"O que git push faz por padrão",language:"bash",code:`# Modos:
# - nothing  : exige especificar tudo
# - current  : push do branch atual com mesmo nome no remoto
# - upstream : push para o upstream configurado
# - simple   : current + checa que upstream tem mesmo nome (★ padrão moderno)
# - matching : push de TODAS as branches que têm igual nome (perigoso, deprecated)

# O padrão moderno (Git ≥ 2.0) é "simple" — recomendado
git config --global push.default simple
`}),e.jsx("h2",{children:"Pull — estratégias de merge"}),e.jsx(o,{title:"3 modos",language:"bash",code:`# Modo 1 — merge (padrão histórico)
git pull
# Cria merge commit se houver divergência

# Modo 2 — rebase
git pull --rebase
# Aplica seus commits em cima do que veio

# Modo 3 — fast-forward only
git pull --ff-only
# Falha se houver divergência — você decide o que fazer

# Configurar globalmente
git config --global pull.rebase true       # ★ recomendado para devs solo
git config --global pull.ff only           # ★ recomendado para times grandes
`}),e.jsxs(i,{type:"note",title:"Recomendação prática",children:["Em projetos pessoais ou times pequenos: ",e.jsx("code",{children:"pull.rebase=true"}),". Em times grandes, prefira ",e.jsx("code",{children:"pull.ff=only"})," e resolva divergência manualmente — força você a pensar antes de mesclar."]}),e.jsx("h2",{children:"Workflow seguro para iniciantes"}),e.jsx(o,{title:"Fluxo passo a passo",language:"bash",code:`# 1. Sempre fetch primeiro (ver antes de aplicar)
git fetch

# 2. Veja o que veio
git log HEAD..origin/main --oneline
git diff HEAD origin/main --stat

# 3. Aplique
git merge origin/main             # ou rebase

# 4. Resolva conflitos se houver

# 5. Pushe
git push
`}),e.jsx("h2",{children:"Push em equipes — lease & races"}),e.jsx(o,{title:"Cenário de race condition",language:"bash",code:`# Você fez rebase de feature/x e tem 5 commits novos
# Maria também pushou um commit novo em feature/x sem você saber

git push --force-with-lease
# ! [rejected]   stale info
# (★ Git protegeu — sua "lease" expirou porque o remoto mudou)

# Investigue
git fetch
git log feature/x..origin/feature/x

# Decida: incorporar o trabalho dela e pushar
git rebase origin/feature/x
git push --force-with-lease
`}),e.jsx("h2",{children:"Push para múltiplos remotos"}),e.jsx(o,{title:"Mirror push",language:"bash",code:`# Adicionar mais um destino de push em origin
git remote set-url --add --push origin git@github.com:user/repo.git
git remote set-url --add --push origin git@gitlab.com:user/repo.git

# Agora "git push" envia para AMBOS
git push

# Push manual para um remote específico
git push backup main
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(o,{title:"Push e pull",language:"bash",code:`git push                                  # push branch atual
git push -u origin <branch>               # push + upstream
git push --tags / --follow-tags           # incluir tags
git push origin --delete <branch>         # deletar branch remoto
git push --force-with-lease               # force seguro
git push origin <local>:<remoto>          # mapear nomes

git pull                                  # fetch + merge
git pull --rebase                         # fetch + rebase
git pull --ff-only                        # só fast-forward
git pull --autostash                      # com stash automático

git fetch                                 # baixa sem aplicar (★)
git fetch --prune                         # limpa refs órfãs
git fetch --all                           # todos os remotes
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{href:"/fetch",children:"Fetch"})," — entenda profundamente o que pull esconde"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/conflitos",children:"Conflitos"})," — resolva quando o pull/push encontrar problemas"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/github",children:"Usando GitHub"})," — branch protection rules"]}),e.jsxs("li",{children:[e.jsx(s,{href:"/recuperacao",children:"Recuperação"})," — desfazendo force-push errado"]})]})]})}export{n as default};
