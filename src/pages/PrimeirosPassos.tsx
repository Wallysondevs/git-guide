import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function PrimeirosPassos() {
  return (
    <PageContainer
      title="Primeiros Passos"
      subtitle="Do diretório vazio ao primeiro commit em 5 minutos. O ciclo fundamental que você vai repetir mil vezes."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"git init"}</strong> {' — '} {"cria .git/ no diretório atual."}
          </li>
        <li>
            <strong>{"git add"}</strong> {' — '} {"move arquivo para staging."}
          </li>
        <li>
            <strong>{"git commit"}</strong> {' — '} {"grava snapshot do staging."}
          </li>
        <li>
            <strong>{"git status"}</strong> {' — '} {"o que mudou desde o último commit."}
          </li>
        <li>
            <strong>{"git log"}</strong> {' — '} {"histórico de commits."}
          </li>
        </ul>
        <p>
        Aqui você vai aprender o <strong>ciclo básico do Git</strong>: criar repositório → editar arquivo → adicionar ao stage → commitar. Esses 4 passos são 80% do que você faz no dia a dia.
      </p>

      <AlertBox type="tip" title="Pré-requisitos">
        Tenha o Git instalado e seu nome/email configurados. Se não tiver, volte para <Link href="/instalacao">Instalação e Setup</Link>.
      </AlertBox>

      <h2>1. Crie um repositório</h2>
      <p>Existem dois caminhos: começar do zero (<code>git init</code>) ou clonar um existente (<code>git clone</code>).</p>

      <CodeBlock
        title="Do zero — git init"
        language="bash"
        code={`# Criar pasta e entrar nela
mkdir meu-projeto && cd meu-projeto

# Inicializar repositório Git
git init
# Initialized empty Git repository in /home/voce/meu-projeto/.git/

# Verificar — agora existe uma pasta .git oculta
ls -la
# .  ..  .git
`}
      />

      <CodeBlock
        title="De um repositório existente — git clone"
        language="bash"
        code={`# Clonar via HTTPS
git clone https://github.com/usuario/repositorio.git

# Clonar via SSH (recomendado se você tem chave configurada)
git clone git@github.com:usuario/repositorio.git

# Clonar em uma pasta com nome diferente
git clone https://github.com/usuario/repositorio.git minha-pasta

# Clonar só a versão mais recente (mais rápido para repos grandes)
git clone --depth 1 https://github.com/usuario/repositorio.git
`}
      />

      <h2>2. Crie um arquivo</h2>
      <CodeBlock
        title="Primeiro arquivo do projeto"
        language="bash"
        code={`echo "# Meu Projeto" > README.md
echo "console.log('hello git')" > app.js

ls
# README.md  app.js
`}
      />

      <h2>3. Verifique o status</h2>
      <p><code>git status</code> é o comando que você mais vai usar — mostra o que mudou, o que está staged e o que está untracked.</p>

      <CodeBlock
        title="git status"
        language="bash"
        code={`git status
# On branch main
#
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         README.md
#         app.js
#
# nothing added to commit but untracked files present
`}
      />

      <h2>4. Adicione ao staging</h2>
      <CodeBlock
        title="git add — preparando para o commit"
        language="bash"
        code={`# Adicionar um arquivo específico
git add README.md

# Adicionar vários arquivos
git add README.md app.js

# Adicionar TUDO que mudou (cuidado — adiciona até arquivos novos)
git add .

# Adicionar interativamente (escolhe pedaço por pedaço)
git add -p

# Ver o que está staged
git status
`}
      />

      <AlertBox type="warning" title="Cuidado com git add .">
        <code>git add .</code> adiciona <strong>tudo</strong>, incluindo arquivos que talvez você não queira (logs, builds, secrets). Sempre rode <code>git status</code> antes de commitar e configure um bom <Link href="/gitignore">.gitignore</Link>.
      </AlertBox>

      <h2>5. Faça o commit</h2>
      <CodeBlock
        title="git commit"
        language="bash"
        code={`# Commit com mensagem inline
git commit -m "feat: setup inicial do projeto"

# Saída esperada:
# [main (root-commit) a1b2c3d] feat: setup inicial do projeto
#  2 files changed, 2 insertions(+)
#  create mode 100644 README.md
#  create mode 100644 app.js
`}
      />

      <h2>6. Veja o histórico</h2>
      <CodeBlock
        title="git log"
        language="bash"
        code={`# Histórico completo
git log

# Versão compacta — uma linha por commit
git log --oneline

# Com gráfico ASCII de branches
git log --oneline --graph --all

# Últimos 5 commits formatados
git log -5 --pretty=format:"%h %an: %s"
`}
      />

      <h2>O ciclo completo, de novo</h2>
      <CodeBlock
        title="Seu fluxo diário"
        language="bash"
        code={`# 1. Veja o que mudou
git status
git diff

# 2. Adicione as mudanças que quer commitar
git add arquivo1.js arquivo2.js
# ou: git add -p   (interativo, recomendado)

# 3. Confirme com mensagem clara
git commit -m "fix: corrige cálculo de desconto"

# 4. Envie para o remoto (se houver)
git push
`}
      />

      <h2>Desfazendo erros comuns</h2>
      <CodeBlock
        title="Cenários frequentes"
        language="bash"
        code={`# Adicionei um arquivo errado ao stage
git restore --staged arquivo-errado.js

# Quero descartar mudanças não commitadas em um arquivo
git restore arquivo.js
# ⚠️  isso APAGA suas mudanças, sem volta

# Esqueci de adicionar um arquivo no último commit
git add esquecido.js
git commit --amend --no-edit

# Errei a mensagem do último commit
git commit --amend -m "mensagem corrigida"
`}
      />

      <AlertBox type="danger" title="Cuidado com --amend após push">
        Use <code>--amend</code> só em commits que <strong>ainda não foram pushados</strong>. Se já foram, você reescreve o histórico e pode quebrar o trabalho de outros.
      </AlertBox>

      <h2>Cheat-sheet do iniciante</h2>
      <CodeBlock
        title="Os 10 comandos que resolvem 90% dos casos"
        language="bash"
        code={`git init                  # criar repo
git clone <url>           # baixar repo existente
git status                # ver o que mudou
git diff                  # ver as mudanças linha a linha
git add <arquivo>         # preparar para commit
git add -p                # adicionar pedaço a pedaço (interativo)
git commit -m "msg"       # commitar
git log --oneline         # ver histórico
git push                  # enviar para remoto
git pull                  # baixar mudanças do remoto
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/status">Status e Diff</Link> — entenda o que cada estado significa</li>
        <li><Link href="/staging">Staging Area</Link> — o conceito mais característico do Git</li>
        <li><Link href="/commits">Fazendo Commits</Link> — escreva mensagens que fazem sentido</li>
        <li><Link href="/branches">Branches</Link> — trabalhe em múltiplas coisas em paralelo</li>
      </ul>
    </PageContainer>
  );
}
