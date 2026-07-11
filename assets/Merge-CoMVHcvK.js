import{j as e,L as r}from"./index-By_zGcNR.js";import{P as i,A as o,C as a}from"./AlertBox-CZTB6a28.js";function n(){return e.jsxs(i,{title:"Merge",subtitle:"Combine branches preservando o histórico — fast-forward, three-way merge, squash e quando usar cada um.",difficulty:"intermediario",timeToRead:"14 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Fast-forward"})," "," — "," ","HEAD avança porque não há divergência."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"3-way merge"})," "," — "," ","combina mudanças de duas linhas que divergiram."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--no-ff"})," "," — "," ","força commit de merge mesmo se daria fast-forward."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"--squash"})," "," — "," ","combina branch inteira em um único commit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Octopus"})," "," — "," ","merge de 3+ branches ao mesmo tempo (raro)."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Merge"})," é como você integra trabalho feito em uma branch de volta para outra. O Git tem 3 estratégias principais — escolher a certa em cada situação preserva clareza no histórico e evita conflitos desnecessários."]}),e.jsxs(o,{type:"tip",title:"Merge vs Rebase em uma frase",children:[e.jsx("strong",{children:"Merge preserva"})," a história real (com bifurcações). ",e.jsx("strong",{children:"Rebase reescreve"})," para parecer linear. Não existe certo — existe contexto."]}),e.jsx("h2",{children:"O comando básico"}),e.jsx(a,{title:"git merge",language:"bash",code:`# Estando em main, traz feature
git switch main
git merge feature/login

# Saída possível 1 — fast-forward
# Updating a1b2c3d..e5f6g7h
# Fast-forward
#  src/auth.ts | 24 ++++++++++++++++++++++++
#  1 file changed, 24 insertions(+)

# Saída possível 2 — three-way merge (cria merge commit)
# Merge made by the 'ort' strategy.
#  src/auth.ts | 24 ++++++++++++++++++++++++
#  1 file changed, 24 insertions(+)
`}),e.jsx("h2",{children:'Fast-forward — quando o Git só "anda"'}),e.jsx(a,{title:"Visualizando",language:"markdown",code:`Antes:
  main:    A───B───C
                    \\
  feature:           D───E

Após "git merge feature" (fast-forward):
  main:    A───B───C───D───E
  feature:             D───E

Não há divergência — main só "alcança" feature.
Nenhum merge commit é criado.
`}),e.jsx(a,{title:"Forçar / proibir fast-forward",language:"bash",code:`# Forçar criação de merge commit (mesmo se ff fosse possível)
git merge --no-ff feature/login

# Só permitir se for fast-forward (senão falha)
git merge --ff-only feature/login

# Configurar globalmente para sempre criar merge commit
git config --global merge.ff false

# Configurar para só permitir ff (no pull, força rebase em conflito)
git config --global pull.ff only
`}),e.jsxs(o,{type:"note",title:"--no-ff é controverso, mas útil",children:["Forçar merge commit (",e.jsx("code",{children:"--no-ff"}),") torna explícito ",e.jsx("strong",{children:"quando uma feature foi integrada"}),". Útil para auditoria, releases e changelogs. Times que preferem histórico linear evitam isso."]}),e.jsx("h2",{children:"Three-way merge — quando há divergência"}),e.jsx(a,{title:"Visualizando",language:"markdown",code:`Antes:
  main:    A───B───C───F   ← main avançou também
                    \\
  feature:           D───E

Após "git merge feature":
  main:    A───B───C───F───M    ← merge commit
                    \\     /
  feature:           D───E

M = merge commit, com 2 pais (F e E).
Estado final é a "soma" das mudanças de F e E.
`}),e.jsx("h2",{children:"Squash merge — comprime tudo em 1 commit"}),e.jsx(a,{title:"git merge --squash",language:"bash",code:`git switch main
git merge --squash feature/login
# Não cria commit automaticamente — coloca tudo no stage

git status
# Changes to be committed:
#         modified:   src/auth.ts
#         new file:   src/totp.ts

git commit -m "feat(auth): MFA via TOTP (#234)"
# Único commit com TODO o trabalho da feature
`}),e.jsx(a,{title:"Visualização do squash",language:"markdown",code:`Antes:
  main:    A───B
              \\
  feature:    D───E───F (3 commits "wip")

Após squash:
  main:    A───B───S   ← S = único commit com soma de D+E+F
  feature: D───E───F   ← intacta, mas "esquecida"
`}),e.jsx("h2",{children:"Quando usar cada estratégia"}),e.jsx(a,{title:"Guia de decisão",language:"markdown",code:`Fast-forward
  ✓ branches curtas, isoladas, sem divergência
  ✗ perde a noção de "quando uma feature entrou"

Merge commit (--no-ff)
  ✓ features importantes, releases, branches longas
  ✓ preserva contexto histórico
  ✗ histórico fica "ramificado"

Squash merge
  ✓ muitos commits "wip" / "fix typo" que não querem ir pro histórico
  ✓ PRs pequenos com 1 mudança lógica
  ✗ perde rastro de quem contribuiu pedaços

Rebase + merge ff
  ✓ histórico linear puro (estilo trunk-based)
  ✗ reescreve commits — não fazer em branches compartilhadas
`}),e.jsx("h2",{children:"Estratégias de merge (algoritmos)"}),e.jsx(a,{title:"-X e -s",language:"bash",code:`# Estratégia padrão: ort (octopus recursive)
git merge feature

# Resolver conflitos preferindo "nosso" lado em ambíguos
git merge -X ours feature

# Resolver preferindo "deles"
git merge -X theirs feature

# Ignorar mudanças de espaço em branco
git merge -X ignore-all-space feature

# Estratégia "ours" — DESCARTA totalmente as mudanças de feature, mas
# mantém o merge commit (útil para "marcar" branches abandonadas)
git merge -s ours feature

# Resolução de subárvores
git merge -s subtree subprojeto-branch
`}),e.jsxs(o,{type:"warning",title:"Não confunda -X ours com -s ours",children:[e.jsx("code",{children:"-X ours"})," resolve ",e.jsx("strong",{children:"conflitos"})," a favor do nosso lado (mas integra o resto). ",e.jsx("code",{children:"-s ours"})," ",e.jsx("strong",{children:"descarta tudo"}),' do outro branch, criando um merge "fake".']}),e.jsx("h2",{children:"Cancelando um merge em andamento"}),e.jsx(a,{title:"Abort",language:"bash",code:`# Conflito apareceu, você quer desistir
git merge --abort

# Volta tudo ao estado anterior ao merge
# (--abort funciona enquanto há conflito não resolvido)
`}),e.jsx("h2",{children:"Desfazendo um merge JÁ COMMITADO"}),e.jsx(a,{title:"Reset vs Revert",language:"bash",code:`# Cenário: o merge ainda não foi pushado
git reset --hard HEAD~1
# (volta o ponteiro para antes do merge)

# Cenário: o merge JÁ foi pushado e outros já clonaram
git revert -m 1 <hash-do-merge>
# (cria um commit novo que desfaz o merge — seguro)
# -m 1 indica qual "mainline" preservar (geralmente main = pai 1)
`}),e.jsxs("p",{children:["Detalhes em ",e.jsx(r,{href:"/reset",children:"Reset e Revert"}),"."]}),e.jsx("h2",{children:"Pré-visualizando um merge"}),e.jsx(a,{title:"Veja o que vai acontecer",language:"bash",code:`# Quais commits seriam trazidos?
git log main..feature --oneline

# Quais arquivos mudariam?
git diff main..feature --name-status

# Diff completo
git diff main...feature

# Simulação real (sem commitar)
git merge --no-commit --no-ff feature
# inspecione, depois:
git merge --abort         # desistir
# OU
git commit                # confirmar
`}),e.jsx("h2",{children:"Cenário prático: integrar feature longa"}),e.jsx(a,{title:"Workflow seguro",language:"bash",code:`# 1. Atualize main
git switch main
git pull

# 2. Vá para a feature e atualize com main (rebase ou merge)
git switch feature/x
git rebase main           # OU: git merge main

# 3. Resolva conflitos se houver, rode testes
npm test

# 4. Volte para main e mergeie (escolha a estratégia)
git switch main
git merge --no-ff feature/x -m "Merge feature/x: adiciona X"

# 5. Pushe
git push

# 6. Limpe a branch
git branch -d feature/x
git push origin --delete feature/x
`}),e.jsx("h2",{children:"Resolvendo conflitos"}),e.jsxs("p",{children:["Quando o Git não consegue mesclar automaticamente, ele para e marca arquivos com ",e.jsx("code",{children:"<<<<<<<"}),". Para o passo a passo completo, veja ",e.jsx(r,{href:"/conflitos",children:"Resolvendo Conflitos"}),"."]}),e.jsx(a,{title:"Resumo rápido",language:"bash",code:`# Após "git merge feature" dar conflito:
git status
# both modified:   src/auth.ts

# Edite o arquivo, escolha entre <<<<<<< HEAD e >>>>>>> feature
nano src/auth.ts

# Marque como resolvido
git add src/auth.ts

# Conclua o merge
git commit
`}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(a,{title:"Comandos de merge",language:"bash",code:`git merge feature              # merge padrão
git merge --no-ff feature      # força merge commit
git merge --ff-only feature    # só ff, falha senão
git merge --squash feature     # tudo em 1 commit
git merge --abort              # cancelar em andamento
git merge -X ours feature      # prefere nosso lado em conflitos
git merge -X theirs feature    # prefere o lado deles
git revert -m 1 <merge-hash>   # desfaz merge pushado

git log main..feature          # preview: o que viria
git diff main...feature        # preview: diff completo
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{href:"/conflitos",children:"Resolvendo Conflitos"})," — guia completo"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/rebase",children:"Rebase"})," — alternativa que linearize histórico"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/cherry-pick",children:"Cherry-pick"})," — leve commits específicos sem merge"]}),e.jsxs("li",{children:[e.jsx(r,{href:"/fluxos",children:"Fluxos de Trabalho"})," — quando usar merge vs rebase"]})]})]})}export{n as default};
