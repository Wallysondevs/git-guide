import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Tags() {
  return (
    <PageContainer
      title="Tags e Versões"
      subtitle="Marque pontos importantes do histórico — releases, deploys, snapshots — com tags leves ou anotadas."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <p>
        <strong>Tags</strong> são ponteiros <em>imutáveis</em> para um commit específico. Diferente de branches, que se movem, tags ficam paradas — perfeitas para marcar releases, versões e estados estáveis do código.
      </p>

      <AlertBox type="tip" title="Dois tipos de tag">
        <strong>Lightweight</strong>: só um apelido para o hash. <strong>Annotated</strong>: objeto Git completo com autor, data, mensagem e (opcionalmente) assinatura. Para releases públicas, use <em>sempre</em> annotated.
      </AlertBox>

      <h2>Criando tags</h2>
      <CodeBlock
        title="Lightweight vs Annotated"
        language="bash"
        code={`# Lightweight — só um nome para o commit atual
git tag v1.0.0

# Annotated (★ recomendado para releases)
git tag -a v1.0.0 -m "Release 1.0.0 — primeira versão estável"

# Annotated assinada (criptograficamente)
git tag -s v1.0.0 -m "Release 1.0.0"
# (precisa de chave GPG/SSH configurada — veja Signing)

# Tag em commit específico (não no atual)
git tag -a v0.9.5 abc1234 -m "..."
`}
      />

      <h2>Listando tags</h2>
      <CodeBlock
        title="Várias formas de ver"
        language="bash"
        code={`# Todas as tags
git tag

# Filtrando por padrão
git tag -l "v1.*"
git tag --list "v2.0.*"

# Com mensagem (para annotated)
git tag -n
git tag -n5         # mostra até 5 linhas da mensagem

# Ordenadas por versão semântica
git tag --sort=-v:refname

# Ordenadas por data de criação
git tag --sort=-creatordate

# A última tag (versão semântica)
git describe --tags --abbrev=0

# A última tag + commits desde então
git describe --tags
# v1.0.0-3-ga1b2c3d   ← 3 commits depois de v1.0.0, no commit a1b2c3d
`}
      />

      <h2>Inspecionando tags</h2>
      <CodeBlock
        title="git show"
        language="bash"
        code={`# Ver tag annotated (mensagem + commit + diff)
git show v1.0.0

# Saída de annotated:
# tag v1.0.0
# Tagger: Maria <maria@empresa.com>
# Date:   Fri Mar 1 14:00:00 2026 -0300
#
# Release 1.0.0 — primeira versão estável
#
# commit a1b2c3d (tag: v1.0.0)
# Author: ...
# ...

# Para lightweight, mostra direto o commit
git show v0.9.0

# Diff entre 2 tags
git diff v1.0.0..v1.1.0
git log v1.0.0..v1.1.0 --oneline
`}
      />

      <h2>Pushando tags</h2>
      <CodeBlock
        title="Tags NÃO vão no push padrão"
        language="bash"
        code={`# Tag específica
git push origin v1.0.0

# Todas as tags de uma vez
git push origin --tags

# Só annotated tags (filtra leves)
git push origin --follow-tags

# Configurar para SEMPRE incluir annotated tags em git push
git config --global push.followTags true
`}
      />

      <AlertBox type="warning" title="--tags vs --follow-tags">
        <code>--tags</code> envia <strong>todas</strong>, inclusive lightweight pessoais que você não quer compartilhar. <code>--follow-tags</code> envia só as annotated relacionadas aos commits sendo pushados — é o que você quer 99% das vezes.
      </AlertBox>

      <h2>Deletando tags</h2>
      <CodeBlock
        title="Local e remoto"
        language="bash"
        code={`# Deletar local
git tag -d v0.9.0

# Deletar remoto
git push origin --delete v0.9.0
git push origin :refs/tags/v0.9.0     # forma antiga, mesmo efeito

# Mover uma tag (deletar e recriar)
git tag -d v1.0.0
git tag -a v1.0.0 abc1234 -m "..."
git push origin --delete v1.0.0
git push origin v1.0.0
`}
      />

      <AlertBox type="danger" title="Mover tag publicada é problemático">
        Tags são uma "promessa": <code>v1.0.0</code> deve sempre apontar para o mesmo commit. Se você mover, quem já clonou tem a tag <em>antiga</em> — gera confusão e quebra builds reproduzíveis. Crie uma nova versão (<code>v1.0.1</code>).
      </AlertBox>

      <h2>Checkout de tags</h2>
      <CodeBlock
        title="Voltando no tempo"
        language="bash"
        code={`# Trocar para o estado de uma tag (entra em detached HEAD)
git switch --detach v1.0.0
git checkout v1.0.0

# Para fazer modificações, crie um branch a partir da tag
git switch -c hotfix-1.0.1 v1.0.0
`}
      />

      <h2>Versionamento semântico (SemVer)</h2>
      <p>O padrão mais usado para tags de release é o <strong>SemVer</strong>: <code>MAJOR.MINOR.PATCH</code>.</p>

      <CodeBlock
        title="Exemplo de SemVer"
        language="markdown"
        code={`v1.0.0      ← primeira release estável
v1.0.1      ← bugfix (PATCH)
v1.1.0      ← nova feature compatível (MINOR)
v2.0.0      ← breaking change (MAJOR)

Pré-releases:
v2.0.0-alpha.1
v2.0.0-beta.2
v2.0.0-rc.1   ← release candidate

Build metadata:
v1.0.0+build.20260301
`}
      />

      <h2>Generando changelog automaticamente</h2>
      <CodeBlock
        title="Entre 2 tags"
        language="bash"
        code={`# Lista commits entre tags
git log v1.0.0..v1.1.0 --oneline

# Formatado como changelog markdown
git log v1.0.0..v1.1.0 --pretty=format:"- %s (%h)"

# Filtrando só feat e fix (Conventional Commits)
git log v1.0.0..v1.1.0 --pretty=format:"- %s" --grep="^feat\\|^fix"

# Agrupado por autor
git shortlog v1.0.0..v1.1.0
`}
      />

      <p>Para automatizar 100%, veja ferramentas como <code>standard-version</code>, <code>release-please</code> ou <code>semantic-release</code> — todas baseadas em <Link href="/conventional-commits">Conventional Commits</Link>.</p>

      <h2>Workflow de release</h2>
      <CodeBlock
        title="Release de v1.5.0"
        language="bash"
        code={`# 1. Garanta main atualizada
git switch main
git pull

# 2. Rode testes, build, smoke tests
npm test && npm run build

# 3. Atualize versão no package.json (ou outro arquivo)
npm version 1.5.0 --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore(release): v1.5.0"

# 4. Crie a tag annotated
git tag -a v1.5.0 -m "Release 1.5.0"

# 5. Push commits + tag
git push origin main
git push origin v1.5.0
# OU em uma linha (se push.followTags=true):
git push --follow-tags

# 6. Publique no GitHub Releases (gh CLI)
gh release create v1.5.0 --generate-notes
`}
      />

      <h2>Tags assinadas (verified releases)</h2>
      <CodeBlock
        title="GPG/SSH signed tags"
        language="bash"
        code={`# Configurar (uma vez)
git config --global user.signingkey <KEY-ID>
git config --global tag.gpgSign true

# Criar tag assinada
git tag -s v1.5.0 -m "Release 1.5.0"

# Verificar
git tag -v v1.5.0
# object a1b2c3d
# type commit
# tag v1.5.0
# tagger Maria <maria@empresa.com>
# gpg: Good signature from "Maria <maria@empresa.com>"
`}
      />

      <p>Detalhes em <Link href="/signing">Assinatura GPG/SSH</Link>.</p>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de tag"
        language="bash"
        code={`git tag                            # listar
git tag v1.0.0                     # criar lightweight
git tag -a v1.0.0 -m "msg"         # annotated (★)
git tag -s v1.0.0 -m "msg"         # signed
git tag -d v0.9.0                  # deletar local
git push origin v1.0.0             # push uma
git push --follow-tags             # push annotated junto com commits
git push origin --delete v0.9.0    # deletar remoto
git describe --tags                # tag mais recente + offset
git show v1.0.0                    # inspecionar
git diff v1.0.0..v1.1.0            # entre tags
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/conventional-commits">Conventional Commits</Link> — combina perfeitamente com SemVer</li>
        <li><Link href="/signing">Assinatura GPG/SSH</Link> — releases verificadas</li>
        <li><Link href="/github">Usando GitHub</Link> — Releases, drafts e CI</li>
      </ul>
    </PageContainer>
  );
}
