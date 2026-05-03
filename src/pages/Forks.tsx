import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Forks() {
  return (
    <PageContainer
      title="Forks"
      subtitle="O modelo do open source: copie um projeto para sua conta, modifique livremente e proponha mudanças via Pull Request."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Fork"}</strong> {' — '} {"cópia do repo na sua conta; PR original aceita contribuições."}
          </li>
        <li>
            <strong>{"upstream"}</strong> {' — '} {"convenção: remoto apontando para o repo original."}
          </li>
        <li>
            <strong>{"Sync"}</strong> {' — '} {"git fetch upstream; git merge upstream/main mantém atualizado."}
          </li>
        <li>
            <strong>{"PR"}</strong> {' — '} {"Pull Request — propõe merge do seu fork no upstream."}
          </li>
        <li>
            <strong>{"Squash and merge"}</strong> {' — '} {"PR vira único commit no upstream."}
          </li>
        </ul>
        <p>
        Um <strong>fork</strong> é uma cópia completa de um repositório feita no servidor (GitHub, GitLab, etc.), associada à sua conta. Ele é a base do <strong>fork & pull workflow</strong> — como contribuições funcionam em projetos onde você não tem permissão de push direto.
      </p>

      <AlertBox type="tip" title="Fork ≠ branch">
        Branch é dentro do mesmo repositório. Fork é um <strong>repositório novo</strong> na sua conta, conectado ao original. Você tem permissão total nele, e abre PRs do seu fork para o original.
      </AlertBox>

      <h2>O fluxo completo do fork</h2>
      <CodeBlock
        title="Visão geral"
        language="markdown"
        code={`     [original/repo]              ← upstream (não tem permissão)
            │
            │ fork
            ▼
     [seu-user/repo]              ← origin (você tem TUDO)
            │
            │ clone
            ▼
     [/local/repo] ─→ branches → push para origin → PR para upstream
`}
      />

      <h2>Forkando</h2>
      <CodeBlock
        title="3 jeitos de forkar"
        language="bash"
        code={`# Opção A — pelo botão "Fork" no GitHub

# Opção B — gh CLI (★ mais prático)
gh repo fork original-org/projeto --clone
# Faz fork, clona localmente, configura origin (seu fork) e upstream (original)

# Opção C — manual
# 1. Forkar pela web
# 2. Clonar seu fork
git clone git@github.com:seu-user/projeto.git
cd projeto
# 3. Adicionar upstream
git remote add upstream https://github.com/original-org/projeto.git

# Verificar
git remote -v
# origin     git@github.com:seu-user/projeto.git    (fetch/push)
# upstream   https://github.com/original-org/projeto.git (fetch/push)
`}
      />

      <h2>Mantendo seu fork sincronizado</h2>
      <CodeBlock
        title="Sync com upstream"
        language="bash"
        code={`# Buscar mudanças do projeto original
git fetch upstream

# Ver o que mudou
git log main..upstream/main --oneline

# Atualizar seu main local
git switch main
git rebase upstream/main             # (★ histórico linear)
# ou: git merge upstream/main

# Atualizar seu fork no GitHub
git push                             # se sua main está rastreando origin

# OU em um comando com gh (mais novo)
gh repo sync seu-user/projeto

# OU pelo botão "Sync fork" no GitHub
`}
      />

      <AlertBox type="warning" title="Nunca trabalhe direto no main do fork">
        Mantenha o <code>main</code> do seu fork como <strong>espelho do upstream</strong>. Crie SEMPRE branches de feature para suas mudanças. Isso evita conflitos quando atualizar.
      </AlertBox>

      <h2>Fluxo de contribuição</h2>
      <CodeBlock
        title="Passo a passo"
        language="bash"
        code={`# 1. Sincronize main com upstream
git fetch upstream
git switch main
git rebase upstream/main
git push

# 2. Crie branch de feature
git switch -c fix/typo-readme

# 3. Faça as mudanças
# ... edita ...
git commit -am "docs: corrige typo em README"

# 4. Push para SEU fork
git push -u origin fix/typo-readme

# 5. Abra PR para o upstream
gh pr create --repo original-org/projeto --base main \\
  --title "docs: corrige typo em README" --fill

# 6. Atenda reviews — commits adicionais vão pro mesmo branch/PR
git commit --amend     # ou novos commits
git push --force-with-lease

# 7. Após merge, limpe
git switch main
git fetch upstream
git rebase upstream/main
git branch -d fix/typo-readme
git push origin --delete fix/typo-readme
`}
      />

      <h2>Atualizando uma feature branch que ficou velha</h2>
      <CodeBlock
        title="Quando o upstream avançou muito"
        language="bash"
        code={`# Você abriu PR semanas atrás, upstream/main avançou 50 commits
# CI agora reclama de conflitos / merge base velho

git switch fix/algo
git fetch upstream
git rebase upstream/main           # reaplica seus commits em cima do novo main
# resolva conflitos (veja Conflitos)
git push --force-with-lease

# O PR no GitHub atualiza automaticamente
`}
      />

      <h2>Aceitando contribuições no SEU fork</h2>
      <CodeBlock
        title="Quando alguém forkou seu fork"
        language="bash"
        code={`# Adicione o fork dela como remote
git remote add maria git@github.com:maria/projeto.git
git fetch maria

# Veja a feature dela
git log main..maria/feat-x --oneline

# Teste localmente
git switch -c teste-maria maria/feat-x
npm test

# Cherry-pick commits específicos no seu main
git switch main
git cherry-pick maria/feat-x
`}
      />

      <h2>Alterando seu fork após muito tempo</h2>
      <CodeBlock
        title="Fork divergente — reset hard"
        language="bash"
        code={`# Cenário: seu fork está MUITO atrás, mexido demais, quer recomeçar
# do zero a partir do upstream atual

git fetch upstream
git switch main
git reset --hard upstream/main    # ⚠️ destrói histórico local de main
git push --force-with-lease

# Isso só é seguro porque main do fork não deveria ter trabalho exclusivo
`}
      />

      <h2>Forks privados de repos públicos</h2>
      <p>Por design, forks no GitHub herdam a visibilidade do repo original. Para um <strong>fork privado</strong> de um repo público:</p>

      <CodeBlock
        title="Estratégia: bare clone + push para repo novo"
        language="bash"
        code={`# 1. Clone bare do original
git clone --bare https://github.com/original/projeto.git

# 2. Crie um repo PRIVADO novo na sua conta (vazio, sem README)

# 3. Push mirror para seu repo
cd projeto.git
git push --mirror git@github.com:seu-user/projeto-privado.git

# 4. Clone normalmente
cd ..
git clone git@github.com:seu-user/projeto-privado.git
cd projeto-privado

# 5. Adicione o original como upstream READ-ONLY
git remote add upstream https://github.com/original/projeto.git
git remote set-url --push upstream NO-PUSH

# Sincronizar futuramente:
git fetch upstream
git rebase upstream/main
git push
`}
      />

      <h2>Etiqueta de contribuição</h2>
      <ul>
        <li><strong>Leia CONTRIBUTING.md</strong> antes de abrir o primeiro PR.</li>
        <li><strong>Abra issue antes</strong> em features grandes — para não fazer trabalho que será rejeitado.</li>
        <li><strong>1 PR = 1 propósito</strong>. Não misture refactor + feature + fix.</li>
        <li><strong>Siga o estilo</strong> do projeto, não o seu.</li>
        <li><strong>Adicione testes</strong>.</li>
        <li><strong>Atualize docs</strong> se mudar comportamento público.</li>
        <li><strong>Seja paciente</strong>. Maintainers são voluntários.</li>
        <li><strong>Sign your commits</strong> se o projeto exigir DCO ou GPG.</li>
      </ul>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos do fork workflow"
        language="bash"
        code={`gh repo fork org/repo --clone               # forkar e clonar
git remote add upstream <url>               # adicionar original
git fetch upstream                          # baixar mudanças do original
git rebase upstream/main                    # atualizar
gh repo sync seu-user/repo                  # sync via gh

git switch -c feat/x                        # branch de trabalho
git push -u origin feat/x                   # push pro fork
gh pr create --repo original/repo --fill    # PR upstream

git push --force-with-lease                 # após rebase
gh pr checkout 123 --repo org/repo          # testar PR de outro
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/pull-requests">Pull Requests</Link> — etiqueta de PR detalhada</li>
        <li><Link href="/github">Usando GitHub</Link> — gh CLI completo</li>
        <li><Link href="/signing">Signing</Link> — DCO sign-off para projetos enterprise</li>
      </ul>
    </PageContainer>
  );
}
