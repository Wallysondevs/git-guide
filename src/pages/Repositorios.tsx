import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Repositorios() {
  return (
    <PageContainer
      title="Criando Repositórios"
      subtitle="Tudo o que você precisa saber sobre git init, repositórios bare, templates e o que mora dentro de .git/."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <p>
        Um <strong>repositório Git</strong> é qualquer pasta que tenha um diretório <code>.git/</code> dentro. Ele guarda todo o histórico, as configurações locais e as referências (branches, tags). Entender o que mora ali é o que separa o usuário casual do power user.
      </p>

      <AlertBox type="tip" title="TL;DR">
        Use <code>git init</code> para começar do zero, <code>git clone</code> para copiar um existente, e <code>git init --bare</code> para criar repositórios de servidor (sem working directory).
      </AlertBox>

      <h2>git init — do zero</h2>
      <CodeBlock
        title="Inicialização simples"
        language="bash"
        code={`# Inicializa repo na pasta atual
git init

# Inicializa em uma pasta específica (cria se não existir)
git init meu-novo-projeto

# Define o nome do branch inicial (override do init.defaultBranch)
git init --initial-branch=main
git init -b main

# Inicializa com SHA-256 em vez de SHA-1 (avançado)
git init --object-format=sha256
`}
      />

      <h2>O que é criado</h2>
      <CodeBlock
        title="Anatomia da pasta .git/"
        language="bash"
        code={`ls -la .git/

# HEAD              → ponteiro para o branch atual ("ref: refs/heads/main")
# config            → configuração local deste repo
# description       → usado por GitWeb (você raramente toca)
# hooks/            → scripts que rodam em eventos (pre-commit, etc.)
# info/             → exclude (gitignore local não-versionado)
# objects/          → TODOS os snapshots, comprimidos por hash
# refs/             → ponteiros para commits (branches e tags)
#   heads/main      → arquivo com hash do último commit do main
#   tags/v1.0.0     → arquivo com hash da tag
# packed-refs       → refs compactadas (após git gc)
`}
      />

      <AlertBox type="note" title="Tudo é texto e arquivos">
        A pasta <code>.git/</code> é puro filesystem. Você pode literalmente abrir <code>.git/refs/heads/main</code> em um editor e ver o hash do último commit. Isso torna o Git inspecionável e debugável.
      </AlertBox>

      <h2>Repositório bare — para servidores</h2>
      <p>Um repositório <strong>bare</strong> não tem working directory — só o conteúdo do <code>.git/</code> exposto na raiz. É o que você usa em servidores Git auto-hospedados (Gitea, GitLab self-hosted, ou um simples servidor SSH).</p>

      <CodeBlock
        title="Criando e usando bare repos"
        language="bash"
        code={`# Criar um bare repo (convenção: terminar com .git)
git init --bare /srv/git/meu-projeto.git

# Estrutura é o conteúdo do .git/ direto na raiz:
ls /srv/git/meu-projeto.git/
# HEAD  config  description  hooks  info  objects  refs

# Clonar de um bare repo
git clone /srv/git/meu-projeto.git
# ou via SSH:
git clone usuario@servidor:/srv/git/meu-projeto.git
`}
      />

      <h2>Convertendo um repo existente em bare</h2>
      <CodeBlock
        title="Migração de não-bare → bare"
        language="bash"
        code={`# Clonar como bare a partir do existente
git clone --bare meu-projeto meu-projeto.git

# Mover para o servidor
scp -r meu-projeto.git usuario@servidor:/srv/git/

# Atualizar o origin no clone original
cd meu-projeto
git remote set-url origin usuario@servidor:/srv/git/meu-projeto.git
`}
      />

      <h2>Templates de repositório</h2>
      <p>Você pode definir um <strong>template</strong> que o <code>git init</code> sempre copia para novos repos — útil para padronizar hooks, configs e arquivos iniciais em uma equipe.</p>

      <CodeBlock
        title="Criando e usando templates"
        language="bash"
        code={`# Estrutura de um template
mkdir -p ~/.git-template/hooks
cat > ~/.git-template/hooks/pre-commit <<'EOF'
#!/bin/sh
# bloqueia commit com console.log
if git diff --cached | grep -q "console.log"; then
  echo "❌ console.log detectado, remova antes de commitar"
  exit 1
fi
EOF
chmod +x ~/.git-template/hooks/pre-commit

# Definir como padrão
git config --global init.templateDir ~/.git-template

# Agora todo "git init" usa o template automaticamente
mkdir teste && cd teste && git init
ls .git/hooks/   # pre-commit já está lá
`}
      />

      <h2>Verificando integridade do repositório</h2>
      <CodeBlock
        title="git fsck — file system check"
        language="bash"
        code={`# Verifica integridade de todos os objetos
git fsck

# Inclui objetos não-alcançáveis (commits órfãos)
git fsck --lost-found

# Verifica também o reflog
git fsck --reflog

# Modo silencioso (só mostra problemas)
git fsck --no-progress 2>&1
`}
      />

      <h2>Onde o Git procura o repositório</h2>
      <p>Por padrão, o Git sobe na árvore de pastas até encontrar um <code>.git/</code> ou o root. É por isso que você pode rodar <code>git status</code> de uma subpasta.</p>

      <CodeBlock
        title="Inspecionar resolução"
        language="bash"
        code={`# Mostrar a raiz do repo atual
git rev-parse --show-toplevel
# /home/voce/meu-projeto

# Mostrar onde o .git está
git rev-parse --git-dir
# .git   (relativo) ou caminho absoluto

# Estamos dentro de um repo?
git rev-parse --is-inside-work-tree
# true / false

# Variável de ambiente para forçar local específico
GIT_DIR=/srv/git/repo.git git log
`}
      />

      <h2>Removendo o repositório (sem perder os arquivos)</h2>
      <CodeBlock
        title="Desfazer git init"
        language="bash"
        code={`# Apaga apenas o histórico — arquivos do projeto ficam
rm -rf .git

# No Windows PowerShell:
Remove-Item -Recurse -Force .git
`}
      />

      <AlertBox type="danger" title="Operação irreversível">
        Apagar <code>.git/</code> destrói <strong>todo o histórico local</strong>. Se houver branches não-pushados, eles desaparecem para sempre. Faça um <code>git push --all</code> antes se for o caso.
      </AlertBox>

      <h2>Workflows comuns</h2>
      <CodeBlock
        title="Cenário 1: começar projeto novo e mandar para o GitHub"
        language="bash"
        code={`mkdir meu-projeto && cd meu-projeto
git init -b main
echo "# Meu Projeto" > README.md
echo "node_modules/" > .gitignore
git add .
git commit -m "chore: setup inicial"

# Crie o repo vazio no GitHub primeiro, depois:
git remote add origin git@github.com:usuario/meu-projeto.git
git push -u origin main
`}
      />

      <CodeBlock
        title="Cenário 2: importar pasta existente que ainda não está no Git"
        language="bash"
        code={`cd projeto-existente
git init
git add .
git status                    # CONFIRA o que vai entrar
git commit -m "chore: importa código legado"

# Depois adicione um remoto e pushe
git remote add origin <url>
git push -u origin main
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/status">Status e Diff</Link> — saiba o estado do seu repo</li>
        <li><Link href="/gitignore">.gitignore</Link> — proteja-se de commitar lixo</li>
        <li><Link href="/remotos">Repositórios Remotos</Link> — conecte ao GitHub/GitLab</li>
        <li><Link href="/manutencao">Manutenção e Performance</Link> — gc, prune, repack</li>
      </ul>
    </PageContainer>
  );
}
