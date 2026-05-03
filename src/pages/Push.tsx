import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Push() {
  return (
    <PageContainer
      title="Push e Pull"
      subtitle="Sincronize seu trabalho com o servidor — quando usar pull, quando usar fetch+merge, e como evitar force-push perigoso."
      difficulty="iniciante"
      timeToRead="13 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git push"}</strong> {' — '} {"envia commits locais para o remoto."}
          </li>
        <li>
            <strong>{"-u"}</strong> {' — '} {"set upstream — configura tracking, próximas vezes só git push."}
          </li>
        <li>
            <strong>{"--force / --force-with-lease"}</strong> {' — '} {"reescreve histórico remoto; lease é seguro."}
          </li>
        <li>
            <strong>{"Push tags"}</strong> {' — '} {"git push --tags envia tags junto."}
          </li>
        <li>
            <strong>{"Protected branches"}</strong> {' — '} {"servidor pode rejeitar push direto em main."}
          </li>
        </ul>
        <p>
        <code>push</code> manda seus commits para o remoto. <code>pull</code> traz commits do remoto para você. Soa simples — mas a maioria dos problemas de "Git quebrou" mora aqui. Este capítulo te dá modelos mentais sólidos para nunca mais ter medo desses comandos.
      </p>

      <AlertBox type="tip" title="Modelo mental">
        <code>git push</code> = "envia o que está aqui pra lá". <code>git pull</code> = <code>git fetch</code> + <code>git merge</code> (ou <code>rebase</code>). Toda confusão começa quando você esquece desse "merge embutido".
      </AlertBox>

      <h2>git push — o básico</h2>
      <CodeBlock
        title="Variações"
        language="bash"
        code={`# Push do branch atual para seu upstream
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
`}
      />

      <h2>git pull — o que ele REALMENTE faz</h2>
      <CodeBlock
        title="Decomposição"
        language="bash"
        code={`# git pull é EXATAMENTE isso:
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
`}
      />

      <h2>fetch vs pull — a distinção crucial</h2>
      <CodeBlock
        title="Por que fetch é mais seguro"
        language="bash"
        code={`# fetch: BAIXA mudanças mas NÃO toca seus arquivos
git fetch
# Atualiza refs/remotes/origin/* mas seu working/branch local não muda

# Veja o que veio antes de aplicar
git log HEAD..origin/main --oneline
git diff HEAD origin/main

# Aplique só quando estiver pronto
git merge origin/main
# OU
git rebase origin/main
`}
      />

      <p>Detalhes em <Link href="/fetch">Fetch</Link>.</p>

      <h2>Quando o push é rejeitado</h2>
      <CodeBlock
        title="non-fast-forward"
        language="bash"
        code={`git push
# To github.com:user/repo.git
#  ! [rejected]        main -> main (non-fast-forward)
# error: failed to push some refs

# Significa: o remoto avançou enquanto você trabalhava
# Solução normal:
git pull --rebase       # traz as mudanças deles, reaplica suas em cima
git push                # agora vai
`}
      />

      <h2>Force push — quando, como e por que NÃO</h2>
      <CodeBlock
        title="--force vs --force-with-lease"
        language="bash"
        code={`# ❌ NUNCA use --force puro em branches compartilhadas
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
`}
      />

      <AlertBox type="danger" title="Quando você PRECISA de force push">
        Após <code>rebase</code>, <code>commit --amend</code>, <code>filter-branch</code> ou <code>reset</code> em branch já pushada. Isso é normal em <strong>seu próprio branch de feature</strong> — nunca em main/develop compartilhados.
      </AlertBox>

      <h2>Bloqueando push em main</h2>
      <CodeBlock
        title="Proteção local com hook"
        language="bash"
        code={`# Crie .git/hooks/pre-push
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
`}
      />

      <p>No GitHub/GitLab, configure <strong>branch protection rules</strong> para bloquear no servidor. Veja <Link href="/github">Usando GitHub</Link>.</p>

      <h2>Push parcial e seletivo</h2>
      <CodeBlock
        title="Push de refs específicas"
        language="bash"
        code={`# Push de uma ref específica para nome diferente no remoto
git push origin local-name:remote-name

# Push de SHA específico para um branch remoto
git push origin abc1234:refs/heads/main

# Push deletando branch remoto
git push origin :feature/old        # forma clássica
git push origin --delete feature/old # forma moderna

# Push só se o destino não existir (criar branch novo no remoto)
git push origin main:novo-branch
`}
      />

      <h2>push.default — comportamento sem args</h2>
      <CodeBlock
        title="O que git push faz por padrão"
        language="bash"
        code={`# Modos:
# - nothing  : exige especificar tudo
# - current  : push do branch atual com mesmo nome no remoto
# - upstream : push para o upstream configurado
# - simple   : current + checa que upstream tem mesmo nome (★ padrão moderno)
# - matching : push de TODAS as branches que têm igual nome (perigoso, deprecated)

# O padrão moderno (Git ≥ 2.0) é "simple" — recomendado
git config --global push.default simple
`}
      />

      <h2>Pull — estratégias de merge</h2>
      <CodeBlock
        title="3 modos"
        language="bash"
        code={`# Modo 1 — merge (padrão histórico)
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
`}
      />

      <AlertBox type="note" title="Recomendação prática">
        Em projetos pessoais ou times pequenos: <code>pull.rebase=true</code>. Em times grandes, prefira <code>pull.ff=only</code> e resolva divergência manualmente — força você a pensar antes de mesclar.
      </AlertBox>

      <h2>Workflow seguro para iniciantes</h2>
      <CodeBlock
        title="Fluxo passo a passo"
        language="bash"
        code={`# 1. Sempre fetch primeiro (ver antes de aplicar)
git fetch

# 2. Veja o que veio
git log HEAD..origin/main --oneline
git diff HEAD origin/main --stat

# 3. Aplique
git merge origin/main             # ou rebase

# 4. Resolva conflitos se houver

# 5. Pushe
git push
`}
      />

      <h2>Push em equipes — lease & races</h2>
      <CodeBlock
        title="Cenário de race condition"
        language="bash"
        code={`# Você fez rebase de feature/x e tem 5 commits novos
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
`}
      />

      <h2>Push para múltiplos remotos</h2>
      <CodeBlock
        title="Mirror push"
        language="bash"
        code={`# Adicionar mais um destino de push em origin
git remote set-url --add --push origin git@github.com:user/repo.git
git remote set-url --add --push origin git@gitlab.com:user/repo.git

# Agora "git push" envia para AMBOS
git push

# Push manual para um remote específico
git push backup main
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Push e pull"
        language="bash"
        code={`git push                                  # push branch atual
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
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/fetch">Fetch</Link> — entenda profundamente o que pull esconde</li>
        <li><Link href="/conflitos">Conflitos</Link> — resolva quando o pull/push encontrar problemas</li>
        <li><Link href="/github">Usando GitHub</Link> — branch protection rules</li>
        <li><Link href="/recuperacao">Recuperação</Link> — desfazendo force-push errado</li>
      </ul>
    </PageContainer>
  );
}
