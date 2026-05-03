import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Clone() {
  return (
    <PageContainer
      title="Clone"
      subtitle="Bem mais que copiar arquivos — clone tem flags para clones rasos, sparse, parciais e bare. Essencial para repos grandes."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <p>
        <code>git clone</code> faz três coisas em um comando: cria a pasta, baixa o repositório completo e configura <code>origin</code>. Mas tem flags poderosas que mudam radicalmente o comportamento — e podem reduzir um clone de 4GB para 200MB.
      </p>

      <AlertBox type="tip" title="Para repos grandes">
        Combine <code>--filter=blob:none</code> + <code>--no-checkout</code> + <code>sparse-checkout</code> para clonar só o que você precisa. Pode ser 10-100x mais rápido em monorepos.
      </AlertBox>

      <h2>Clone básico</h2>
      <CodeBlock
        title="Variações simples"
        language="bash"
        code={`# Clone padrão (HTTPS)
git clone https://github.com/usuario/repo.git

# Via SSH (recomendado)
git clone git@github.com:usuario/repo.git

# Em uma pasta com nome diferente
git clone https://github.com/usuario/repo.git minha-pasta

# Em uma pasta específica do sistema
git clone git@github.com:usuario/repo.git ~/projetos/repo
`}
      />

      <h2>Clone raso (shallow)</h2>
      <p>Baixa apenas os últimos N commits — economiza muita banda e disco em repos com longa história.</p>

      <CodeBlock
        title="--depth"
        language="bash"
        code={`# Só o último commit (perfeito para CI/builds)
git clone --depth 1 https://github.com/usuario/repo.git

# Últimos 50 commits
git clone --depth 50 https://github.com/usuario/repo.git

# Combinado com branch específica
git clone --depth 1 --branch v1.5.0 https://github.com/usuario/repo.git

# Aprofundar depois (se precisar de mais histórico)
git fetch --depth 100
git fetch --unshallow      # baixa o resto, vira clone normal
`}
      />

      <AlertBox type="warning" title="Limitações de shallow clones">
        Shallow clones <strong>não podem fazer alguns rebases</strong> ou ver blame antigo. Para CI/CD onde você só quer build & test, é perfeito. Para desenvolvimento, prefira clone completo.
      </AlertBox>

      <h2>Clone parcial — partial clone</h2>
      <p>Mais novo e mais flexível que shallow: baixa <strong>só metadata</strong>, e pega arquivos sob demanda.</p>

      <CodeBlock
        title="--filter"
        language="bash"
        code={`# Sem nenhum blob (arquivo) — só commits e árvores
git clone --filter=blob:none https://github.com/usuario/repo.git

# Sem blobs maiores que 1MB
git clone --filter=blob:limit=1m https://github.com/usuario/repo.git

# Sem árvores (lazier ainda)
git clone --filter=tree:0 https://github.com/usuario/repo.git

# O Git baixa cada arquivo automaticamente quando você acessa
# (com checkout, log -p, blame, etc.)
`}
      />

      <h2>Sparse checkout — só algumas pastas</h2>
      <p>Em monorepos, você pode ter 50 projetos mas só trabalhar em 1. <strong>Sparse checkout</strong> faz o working directory mostrar só o que você quer.</p>

      <CodeBlock
        title="Sparse checkout moderno"
        language="bash"
        code={`# Clone sem checkout
git clone --no-checkout --filter=blob:none https://github.com/empresa/monorepo.git
cd monorepo

# Habilitar sparse-checkout
git sparse-checkout init --cone

# Definir pastas a baixar
git sparse-checkout set apps/web libs/shared

# Agora faça o checkout
git checkout main

# Ver o que está em sparse
git sparse-checkout list

# Adicionar pasta extra depois
git sparse-checkout add apps/api

# Voltar a clonar tudo
git sparse-checkout disable
`}
      />

      <h2>Clone bare — sem working directory</h2>
      <CodeBlock
        title="Para servidores"
        language="bash"
        code={`# Clone bare (só o conteúdo do .git/)
git clone --bare git@github.com:user/repo.git
# Cria pasta repo.git/ com HEAD, config, objects, refs

# Mirror — bare + todas as refs (branches, tags, notes)
git clone --mirror git@github.com:user/repo.git
# Útil para backups e migração de servidor
`}
      />

      <p>Detalhes em <Link href="/repositorios">Criando Repositórios</Link>.</p>

      <h2>Clone com submódulos</h2>
      <CodeBlock
        title="--recurse-submodules"
        language="bash"
        code={`# Clone + inicializa submódulos em um comando
git clone --recurse-submodules https://github.com/user/repo.git

# Equivalente em 3 passos
git clone https://github.com/user/repo.git
cd repo
git submodule update --init --recursive

# Em paralelo (mais rápido se tem vários submódulos)
git clone --recurse-submodules -j 8 https://github.com/user/repo.git
`}
      />

      <p>Veja <Link href="/submodulos">Submódulos</Link> para o guia completo.</p>

      <h2>Branch específica e single-branch</h2>
      <CodeBlock
        title="Mais economia"
        language="bash"
        code={`# Clonar checkando uma branch específica (mas baixa tudo)
git clone --branch feature/x https://github.com/user/repo.git

# Clonar SÓ uma branch (ignora as outras completamente)
git clone --single-branch --branch main https://github.com/user/repo.git

# Combo de máxima economia: 1 commit, 1 branch
git clone --depth 1 --single-branch --branch main https://github.com/user/repo.git
`}
      />

      <h2>Clone com Git LFS</h2>
      <CodeBlock
        title="Arquivos grandes"
        language="bash"
        code={`# Por padrão, --filter já baixa LFS sob demanda
git clone --filter=blob:none https://github.com/user/repo.git

# Para baixar todos os LFS de uma vez
git lfs install
git lfs pull

# Para CLONAR sem baixar nenhum binário LFS
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git

# Depois, baixar só os que você precisa
git lfs pull --include "assets/*"
`}
      />

      <p>Detalhes em <Link href="/lfs">Git LFS</Link>.</p>

      <h2>Clone via local filesystem</h2>
      <CodeBlock
        title="Repositórios locais"
        language="bash"
        code={`# Clone de pasta local (cria hardlinks para economizar disco)
git clone /caminho/para/repo /caminho/destino

# Forçar cópia em vez de hardlink (se vai mexer em ambos)
git clone --no-hardlinks /caminho/origem /caminho/destino

# Via file://
git clone file:///caminho/para/repo
`}
      />

      <h2>Templates e configs no clone</h2>
      <CodeBlock
        title="Customizando clones"
        language="bash"
        code={`# Pular execução de hooks no clone (útil em CI)
git clone --no-hardlinks --template /dev/null repo

# Aplicar config local específica
git clone -c http.sslVerify=false https://...
git clone -c user.email="ci@empresa.com" https://...

# Clone via proxy
HTTPS_PROXY=http://proxy:8080 git clone https://...
`}
      />

      <h2>Casos práticos</h2>

      <h3>1. Clone para CI (otimizado)</h3>
      <CodeBlock
        title="GitHub Actions / GitLab CI"
        language="bash"
        code={`# O mais rápido possível — só o commit que vai testar
git clone --depth 1 --single-branch --branch \$BRANCH \\
  --filter=blob:none --no-tags \\
  https://github.com/empresa/repo.git
`}
      />

      <h3>2. Clone para investigar histórico</h3>
      <CodeBlock
        title="Sem economia, mas otimizado"
        language="bash"
        code={`# Tudo, mas com background fetch para acelerar
git clone --filter=blob:none https://github.com/user/repo.git
# Os blobs vêm sob demanda quando você dá log -p, blame, etc.
`}
      />

      <h3>3. Clone de um monorepo gigante (Linux kernel, Chromium)</h3>
      <CodeBlock
        title="Sparse + partial"
        language="bash"
        code={`# Clone vazio
git clone --filter=blob:none --no-checkout \\
  https://github.com/torvalds/linux.git
cd linux

# Só os subsystems que te interessam
git sparse-checkout init --cone
git sparse-checkout set drivers/net/wireless include/net

# Checkout
git checkout master
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de clone"
        language="bash"
        code={`git clone <url>                        # padrão
git clone <url> <pasta>                # pasta customizada
git clone --depth 1 <url>              # shallow (só último)
git clone --branch <ref> <url>         # branch ou tag específica
git clone --single-branch <url>        # ignora outras branches
git clone --filter=blob:none <url>     # partial (sem arquivos)
git clone --no-checkout <url>          # sem extrair arquivos
git clone --bare <url>                 # sem working directory
git clone --mirror <url>               # bare + todas refs
git clone --recurse-submodules <url>   # com submódulos
git clone -c key=value <url>           # config local
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/remotos">Repositórios Remotos</Link> — gerencie origin e upstream</li>
        <li><Link href="/submodulos">Submódulos</Link> — repos dentro de repos</li>
        <li><Link href="/lfs">Git LFS</Link> — para projetos com binários grandes</li>
      </ul>
    </PageContainer>
  );
}
