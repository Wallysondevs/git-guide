import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Submodulos() {
  return (
    <PageContainer
      title="Submódulos"
      subtitle="Repositórios dentro de repositórios. Poderoso para integrar libs externas, mas com várias armadilhas — entenda antes de adotar."
      difficulty="avancado"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Submodule"}</strong> {' — '} {"repo dentro de outro repo, fixado em commit específico."}
          </li>
        <li>
            <strong>{"git submodule add URL"}</strong> {' — '} {"adiciona; cria .gitmodules."}
          </li>
        <li>
            <strong>{"init/update"}</strong> {' — '} {"clona e checa out os submódulos."}
          </li>
        <li>
            <strong>{"--recurse-submodules"}</strong> {' — '} {"clone/pull já trata submódulos."}
          </li>
        <li>
            <strong>{"Atualização"}</strong> {' — '} {"cd submodule + git pull + commit no parent."}
          </li>
        </ul>
        <p>
        <strong>Submódulos</strong> permitem incluir um repositório Git <em>dentro</em> de outro, fixado em um commit específico. Útil para libs internas compartilhadas, themes de site, ou dependências que você quer trackear como código-fonte.
      </p>

      <AlertBox type="warning" title="Pense duas vezes antes de adotar">
        Submódulos são uma das features mais incompreendidas do Git. Considere alternativas: <strong>monorepo</strong> (workspaces), <strong>package manager</strong> (npm/pip), ou <strong>git subtree</strong>. Use submódulos quando você realmente precisa de versionamento independente.
      </AlertBox>

      <h2>Adicionando um submódulo</h2>
      <CodeBlock
        title="git submodule add"
        language="bash"
        code={`# Em um repo existente
git submodule add https://github.com/user/lib.git lib/external

# Cria:
# - pasta lib/external/ com clone do repo
# - arquivo .gitmodules com a URL e o path
# - entrada no .git/config

git status
# new file:   .gitmodules
# new file:   lib/external

git commit -m "chore: adiciona submódulo lib/external"
git push
`}
      />

      <CodeBlock
        title=".gitmodules — o manifesto"
        language="ini"
        code={`# Arquivo .gitmodules (versionado, todos veem)
[submodule "lib/external"]
    path = lib/external
    url = https://github.com/user/lib.git
    branch = main         # opcional — qual branch acompanhar
`}
      />

      <h2>Clonando um repo COM submódulos</h2>
      <CodeBlock
        title="--recurse-submodules"
        language="bash"
        code={`# Clone + inicializa submódulos automaticamente
git clone --recurse-submodules https://github.com/user/repo.git

# Em paralelo (mais rápido)
git clone --recurse-submodules -j 8 https://github.com/user/repo.git

# OU em 3 passos (se já clonou sem)
git clone https://github.com/user/repo.git
cd repo
git submodule update --init --recursive

# Configurar para SEMPRE recursar nos pulls/checkouts
git config --global submodule.recurse true
`}
      />

      <AlertBox type="danger" title="Pasta de submódulo vazia ≠ erro">
        Se você clonar SEM <code>--recurse-submodules</code>, as pastas dos submódulos ficam vazias. Não é bug — é design. Sempre rode <code>git submodule update --init --recursive</code> depois.
      </AlertBox>

      <h2>Atualizando submódulos</h2>
      <CodeBlock
        title="git submodule update"
        language="bash"
        code={`# Atualiza CADA submódulo para o commit que o repo principal espera
git submodule update --init --recursive

# Forçar — descarta mudanças locais nos submódulos
git submodule update --init --recursive --force

# Atualiza para o ÚLTIMO commit do branch configurado (não o que estava fixado)
git submodule update --remote
git submodule update --remote lib/external      # só um

# Combinado: atualiza para latest e merge automático
git submodule update --remote --merge
git submodule update --remote --rebase

# Após atualizar, NÃO ESQUEÇA de commitar a nova "fixação" no repo principal
git add lib/external
git commit -m "chore: bump submódulo lib/external"
`}
      />

      <h2>Trabalhando dentro de um submódulo</h2>
      <CodeBlock
        title="Edits no submódulo"
        language="bash"
        code={`cd lib/external

# Você está em "detached HEAD" por padrão!
git status
# HEAD detached at abc1234

# Para fazer mudanças, crie um branch
git switch -c minha-mudanca

# Edite, commite
# ...
git add .
git commit -m "fix: ..."
git push origin minha-mudanca

# Volte ao repo principal e atualize a referência
cd ../..
git status
# modified:   lib/external (new commits)

git add lib/external
git commit -m "chore: bump lib/external com fix"
git push
`}
      />

      <h2>Listando e inspecionando</h2>
      <CodeBlock
        title="Status de submódulos"
        language="bash"
        code={`# Estado atual
git submodule status
# +abc1234 lib/external (heads/main)
# (-) sufixo = não inicializado
# (+) prefixo = checkout difere do esperado pelo repo pai
# (U) = conflito de merge

# Foreach — roda comando em cada submódulo
git submodule foreach 'git status -sb'
git submodule foreach 'git fetch'
git submodule foreach --recursive 'git checkout main && git pull'

# Diff dos submódulos (mostra hash, não conteúdo)
git diff --submodule=log
git diff --submodule=diff      # mostra diff REAL (mais útil)

# Configurar como padrão
git config --global diff.submodule log
git config --global status.submoduleSummary true
`}
      />

      <h2>Removendo um submódulo</h2>
      <CodeBlock
        title="Processo completo (não trivial)"
        language="bash"
        code={`# 1. Desinicializa
git submodule deinit -f lib/external

# 2. Remove do repo principal
git rm -f lib/external

# 3. Limpa o .git/modules/
rm -rf .git/modules/lib/external

# 4. Comita
git commit -m "chore: remove submódulo lib/external"

# Atalho moderno (Git ≥ 2.34):
git submodule deinit -f lib/external
git rm -rf lib/external
git commit -m "chore: remove submódulo"
`}
      />

      <h2>Mudando URL de um submódulo</h2>
      <CodeBlock
        title="Migração de origem"
        language="bash"
        code={`# Editar .gitmodules
git config --file .gitmodules submodule.lib/external.url https://nova-url

# Sincronizar com .git/config
git submodule sync

# Reinicializar
git submodule update --init --recursive --remote

git commit -am "chore: muda URL do submódulo"
`}
      />

      <h2>Pinning vs floating</h2>
      <CodeBlock
        title="Estratégias"
        language="markdown"
        code={`PINNING (★ recomendado)
  - Submódulo fixo em commit específico
  - Build reproduzível, previsível
  - Atualização explícita (commit + bump)

FLOATING
  - Configurar branch em .gitmodules
  - "git submodule update --remote" sempre pega último
  - Builds podem mudar comportamento sem você atualizar
  - Útil só para libs internas com CI rigoroso
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Lib compartilhada entre vários projetos</h3>
      <CodeBlock
        title="UI components reutilizada"
        language="bash"
        code={`# projeto-web
git submodule add https://github.com/empresa/ui-components.git lib/ui

# projeto-mobile (mesma lib)
git submodule add https://github.com/empresa/ui-components.git lib/ui

# Ambos usam o mesmo commit, atualizado quando você quiser
`}
      />

      <h3>2. Tema de site (Hugo, Jekyll)</h3>
      <CodeBlock
        title="Tema externo"
        language="bash"
        code={`# Adiciona o tema como submódulo
git submodule add https://github.com/theme-author/cool-theme.git themes/cool

# Atualiza para a última versão do tema
git submodule update --remote themes/cool
git commit -am "chore: atualiza tema"
`}
      />

      <h3>3. Documentação compartilhada (mkdocs)</h3>
      <CodeBlock
        title="Docs em repo próprio"
        language="bash"
        code={`git submodule add https://github.com/empresa/api-docs.git docs/api

# Os docs são desenvolvidos no repo deles e versionados aqui
`}
      />

      <h2>Subtree — alternativa sem as dores</h2>
      <CodeBlock
        title="git subtree"
        language="bash"
        code={`# Adiciona repo externo COMO PARTE do seu (não submódulo)
git subtree add --prefix=lib/external https://github.com/user/lib.git main --squash

# Atualizar
git subtree pull --prefix=lib/external https://github.com/user/lib.git main --squash

# Push de mudanças locais para o repo externo
git subtree push --prefix=lib/external https://github.com/user/lib.git main

# Vantagens vs submódulo:
# ✓ Nada para clonar adicionalmente
# ✓ Sem .gitmodules
# ✓ Histórico do externo fica integrado (com --squash, fica resumido)
# ✗ Histórico do repo principal cresce mais
# ✗ Atualizar exige saber o comando subtree (não auto)
`}
      />

      <h2>Armadilhas comuns</h2>
      <ul>
        <li><strong>Esquecer <code>--recurse-submodules</code></strong> ao clonar — pasta vazia.</li>
        <li><strong>Trabalhar em detached HEAD</strong> — commits ficam órfãos.</li>
        <li><strong>Esquecer de pushar o submódulo</strong> antes de bumpar — colega clona quebrado.</li>
        <li><strong>Esquecer de bumpar a referência</strong> no repo pai após atualizar — outros não ganham as mudanças.</li>
        <li><strong>Conflito em ponteiro</strong> — duas branches bumparam o submódulo para commits diferentes.</li>
      </ul>

      <AlertBox type="tip" title="Configuração que evita 80% das dores">
        <code>git config --global submodule.recurse true</code> e <code>git config --global push.recurseSubmodules check</code>. O Git checa que você pushou os submódulos antes de pushar o pai.
      </AlertBox>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de submódulo"
        language="bash"
        code={`git submodule add <url> <path>          # adicionar
git submodule init                       # ler .gitmodules
git submodule update --init --recursive  # clonar/atualizar
git submodule update --remote            # pegar último (não fixado)
git submodule status                     # ver estado
git submodule foreach 'cmd'              # rodar em cada
git submodule deinit -f <path>           # remover (parte 1)
git rm -f <path>                         # remover (parte 2)
git submodule sync                       # após mudar URL

git clone --recurse-submodules <url>     # clone com tudo
git config --global submodule.recurse true
git config --global push.recurseSubmodules check
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/clone">Clone</Link> — opções para repos com submódulos</li>
        <li><Link href="/lfs">Git LFS</Link> — outra forma de gerenciar arquivos externos</li>
        <li><Link href="/manutencao">Manutenção</Link> — performance em monorepos</li>
      </ul>
    </PageContainer>
  );
}
