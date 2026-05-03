import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Fetch() {
  return (
    <PageContainer
      title="Fetch"
      subtitle="O comando que separa o usuário casual do power user. Baixa mudanças sem aplicar — você inspeciona antes de integrar."
      difficulty="intermediario"
      timeToRead="9 min"
    >
      <p>
        <code>git fetch</code> baixa commits, branches e tags do remoto para os <strong>refs locais de tracking</strong> (<code>origin/main</code>, <code>origin/feature/x</code>) — <strong>sem tocar</strong> nos seus arquivos ou no seu branch atual. É o equivalente a "olha, o servidor tem novidades, mas eu não vou aplicar nada ainda".
      </p>

      <AlertBox type="tip" title="Por que adotar fetch como padrão">
        Você sempre vê o que vem antes de mesclar. Zero surpresas. <code>pull</code> mistura "ver" e "aplicar" em um passo só — em equipes grandes, isso causa caos.
      </AlertBox>

      <h2>Comandos básicos</h2>
      <CodeBlock
        title="Variações de fetch"
        language="bash"
        code={`# Fetch do origin (padrão)
git fetch

# De um remote específico
git fetch upstream

# De TODOS os remotes configurados
git fetch --all

# De um branch específico
git fetch origin main

# Limpando refs órfãs (branches deletadas no remoto)
git fetch --prune
git fetch -p

# Inclui tags removidas
git fetch --prune --prune-tags

# Configurar prune como padrão (★ recomendado)
git config --global fetch.prune true
`}
      />

      <h2>O que fetch faz por dentro</h2>
      <CodeBlock
        title="Refs de tracking"
        language="bash"
        code={`# Antes do fetch
git log origin/main --oneline -3
# a1b2c3d feat: ...
# e5f6g7h fix: ...
# 9i0j1k2 chore: ...

# Servidor recebeu novos commits...

git fetch
# remote: Counting objects: 5, done.
# remote: Compressing objects: 100% (3/3), done.
# Unpacking objects: 100% (5/5), done.
# From github.com:user/repo
#    a1b2c3d..7p8q9r0  main       -> origin/main

# Agora origin/main aponta para o NOVO commit
git log origin/main --oneline -3
# 7p8q9r0 feat: nova feature ★
# 5l6m7n8 fix: correção
# a1b2c3d feat: ...

# MAS seu branch local main NÃO mudou
git log main --oneline -1
# a1b2c3d feat: ...   ← ainda no commit antigo
`}
      />

      <h2>Inspecionando o que veio</h2>
      <CodeBlock
        title="Antes de mesclar"
        language="bash"
        code={`# Quais commits novos vieram?
git log HEAD..origin/main --oneline
# 7p8q9r0 feat: nova feature
# 5l6m7n8 fix: correção

# Quais arquivos mudaram?
git diff HEAD origin/main --stat

# Diff completo
git diff HEAD origin/main

# Quem mandou os commits?
git shortlog HEAD..origin/main

# Você tem coisa que eles não têm?
git log origin/main..HEAD --oneline
# (commits locais não pushados)

# Visualização lado a lado
git log --left-right --oneline HEAD...origin/main
# < a1b2c3d local commit
# > 7p8q9r0 remote commit
`}
      />

      <h2>Aplicando depois de inspecionar</h2>
      <CodeBlock
        title="Merge ou rebase manual"
        language="bash"
        code={`# Após git fetch, você decide:

# Opção A — merge (cria merge commit se divergir)
git merge origin/main

# Opção B — rebase (linear)
git rebase origin/main

# Opção C — fast-forward só
git merge --ff-only origin/main

# Opção D — descartar local e usar o remoto
git reset --hard origin/main      # ⚠️ perde commits locais

# Opção E — não fazer nada, esperar mais
# (você só queria ver, sem aplicar)
`}
      />

      <h2>Fetch + reset para "resetar minha branch para o remoto"</h2>
      <CodeBlock
        title="Caso comum"
        language="bash"
        code={`# Cenário: bagunçou local, quer apenas espelhar o remoto exatamente
git fetch origin
git switch main
git reset --hard origin/main

# OU em uma linha:
git fetch origin && git reset --hard origin/main
`}
      />

      <AlertBox type="danger" title="reset --hard descarta tudo">
        Mudanças não commitadas SOMEM. Commits locais não pushados também. Faça <code>git stash</code> antes se houver dúvida — ou <code>git branch backup</code> para guardar o estado atual.
      </AlertBox>

      <h2>Refspecs — controle fino</h2>
      <p>Quando você adiciona um remote, o Git define um <strong>refspec</strong> — um mapeamento de "onde buscar" para "onde guardar localmente".</p>

      <CodeBlock
        title="Refspec padrão"
        language="ini"
        code={`# .git/config
[remote "origin"]
    url = git@github.com:user/repo.git
    fetch = +refs/heads/*:refs/remotes/origin/*

# Lê-se: "ao fazer fetch, traga TODAS as branches (refs/heads/*) do remoto
#  e guarde sob refs/remotes/origin/* localmente"
# O '+' permite atualização não-fast-forward (necessário para força/rebase no remoto)
`}
      />

      <CodeBlock
        title="Refspecs customizados"
        language="bash"
        code={`# Trazer SÓ uma branch específica
git config --add remote.origin.fetch "+refs/heads/main:refs/remotes/origin/main"

# Trazer notas (notes)
git config --add remote.origin.fetch "+refs/notes/*:refs/notes/*"

# Trazer pull requests do GitHub (truque famoso!)
git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"
git fetch origin
git switch pr/123      # entra no estado do PR #123
`}
      />

      <h2>Atualização em background</h2>
      <CodeBlock
        title="Auto-fetch periódico"
        language="bash"
        code={`# Configurar fetch automático em background (Git ≥ 2.31)
git maintenance start

# Adicionar este repo ao maintenance
git maintenance register

# Ver agendamento
git maintenance run --schedule=daily

# O Git roda fetch + gc + commit-graph automaticamente
# Resultado: git status / log são instantâneos mesmo em repos enormes

# Desativar
git maintenance unregister
git maintenance stop
`}
      />

      <p>Detalhes em <Link href="/manutencao">Manutenção e Performance</Link>.</p>

      <h2>Negotiation — protocol v2</h2>
      <CodeBlock
        title="Fetch mais rápido"
        language="bash"
        code={`# Habilitar protocolo v2 (★ muito mais rápido em repos grandes)
git config --global protocol.version 2

# Desde Git 2.26 é o padrão para HTTPS, então geralmente já está ativo
git config --get protocol.version

# Para fetches MUITO grandes, aumente o buffer
git config --global http.postBuffer 524288000   # 500MB
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Olhar uma feature de um colega sem trocar de branch</h3>
      <CodeBlock
        title="Inspeção segura"
        language="bash"
        code={`git fetch origin

# Veja o log da branch dele
git log origin/feature/maria --oneline -10

# Diff vs main
git diff main origin/feature/maria

# Quer testar? Crie branch local
git switch -c teste-maria origin/feature/maria
`}
      />

      <h3>2. Sincronizar TUDO (todos os remotes)</h3>
      <CodeBlock
        title="Em projetos com origin + upstream"
        language="bash"
        code={`git fetch --all --prune --tags
`}
      />

      <h3>3. Verificar se tem update sem mexer em nada</h3>
      <CodeBlock
        title="Useful em scripts"
        language="bash"
        code={`# Atualiza refs e mostra o status sem aplicar
git fetch
git status -sb
# ## main...origin/main [behind 3]    ← 3 commits novos no remoto
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de fetch"
        language="bash"
        code={`git fetch                                # do origin
git fetch --all                          # de todos os remotes
git fetch --prune                        # limpa refs órfãs
git fetch upstream                       # de remote específico
git fetch origin main                    # branch específica

git log HEAD..origin/main --oneline      # o que veio (★)
git diff HEAD origin/main                # diff completo
git shortlog HEAD..origin/main           # quem mandou

git merge origin/main                    # aplicar via merge
git rebase origin/main                   # aplicar via rebase
git reset --hard origin/main             # espelhar remoto (perde local)

git config --global fetch.prune true     # auto-prune
git maintenance start                    # background fetch
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/push">Push e Pull</Link> — quando inevitável usar pull</li>
        <li><Link href="/remotos">Repositórios Remotos</Link> — múltiplos remotes</li>
        <li><Link href="/manutencao">Manutenção</Link> — auto-maintenance e gc</li>
      </ul>
    </PageContainer>
  );
}
