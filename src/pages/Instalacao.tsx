import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Instalacao() {
  return (
    <PageContainer
      title="Instalação e Configuração"
      subtitle="Como instalar o Git em Windows, macOS e Linux e configurar seu ambiente pela primeira vez."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        Antes de começar a usar o Git, você precisa instalá-lo no seu sistema e fazer a configuração inicial. Esta configuração é feita uma única vez e identifica você em todos os seus commits.
      </p>

      <h2>Instalando no Windows</h2>
      <p>
        A forma mais simples de instalar o Git no Windows é baixar o instalador oficial do site <strong>git-scm.com</strong>. O instalador inclui o <strong>Git Bash</strong>, um terminal Unix-like para Windows.
      </p>
      <CodeBlock
        title="Windows — via winget (recomendado)"
        language="powershell"
        code={`# Instalar via Windows Package Manager (winget)
winget install --id Git.Git -e --source winget

# Verificar a instalação
git --version`}
      />
      <CodeBlock
        title="Windows — via Chocolatey"
        language="powershell"
        code={`# Se você tem o Chocolatey instalado
choco install git

# Ou via Scoop
scoop install git`}
      />

      <h2>Instalando no macOS</h2>
      <CodeBlock
        title="macOS — via Homebrew (recomendado)"
        code={`# Instalar via Homebrew
brew install git

# Verificar a instalação
git --version

# Alternativa: instalar as Xcode Command Line Tools
# (já inclui o Git)
xcode-select --install`}
      />

      <h2>Instalando no Linux</h2>
      <CodeBlock
        title="Linux — Distribuições baseadas em Debian/Ubuntu"
        code={`# Atualizar lista de pacotes e instalar
sudo apt update
sudo apt install git

# Verificar
git --version`}
      />
      <CodeBlock
        title="Linux — Arch Linux / Manjaro"
        code={`# Instalar via pacman
sudo pacman -S git`}
      />
      <CodeBlock
        title="Linux — Fedora / RHEL / CentOS"
        code={`# Fedora
sudo dnf install git

# RHEL/CentOS
sudo yum install git`}
      />

      <h2>Configuração Inicial</h2>
      <p>
        Após instalar o Git, você precisa configurar seu nome e e-mail. Essas informações são gravadas em cada commit que você fizer, identificando o autor da mudança.
      </p>

      <AlertBox type="warning" title="Obrigatório">
        A configuração de nome e e-mail é obrigatória. O Git não permite fazer commits sem essas informações.
      </AlertBox>

      <CodeBlock
        title="Configuração global (recomendado)"
        code={`# Seu nome completo
git config --global user.name "Seu Nome Completo"

# Seu e-mail (use o mesmo do GitHub/GitLab)
git config --global user.email "seu@email.com"

# Definir o editor padrão (VS Code, Vim, Nano...)
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "nano"           # Nano
git config --global core.editor "vim"            # Vim

# Definir o branch padrão como 'main' (padrão moderno)
git config --global init.defaultBranch main`}
      />

      <h2>Níveis de Configuração</h2>
      <p>
        O Git tem três níveis de configuração, do mais específico para o mais geral:
      </p>
      <ul>
        <li><code>--local</code> — só afeta o repositório atual (<code>.git/config</code>)</li>
        <li><code>--global</code> — afeta todos os repositórios do usuário (<code>~/.gitconfig</code>)</li>
        <li><code>--system</code> — afeta todos os usuários do sistema</li>
      </ul>

      <CodeBlock
        title="Visualizando e editando configurações"
        code={`# Ver todas as configurações ativas
git config --list

# Ver uma configuração específica
git config user.name
git config user.email

# Ver de onde cada configuração vem
git config --list --show-origin

# Abrir o arquivo de configuração global no editor
git config --global --edit`}
      />

      <h2>Configurações Recomendadas</h2>
      <CodeBlock
        title="Configurações extras úteis"
        code={`# Colorir a saída do Git (já ativo por padrão em versões modernas)
git config --global color.ui auto

# Configurar o comportamento do 'git pull'
# 'rebase' é mais limpo que 'merge' para pulls
git config --global pull.rebase false

# Salvar credenciais (para não digitar senha toda hora)
git config --global credential.helper store     # Linux/Mac
git config --global credential.helper manager  # Windows

# Mostrar o branch no prompt do terminal
# (adicione ao seu .bashrc ou .zshrc)
# PS1='[\\u@\\h \\W$(git branch --show-current)]\\ '`}
      />

      <AlertBox type="success" title="Pronto para usar!">
        Com o Git instalado e configurado, você já pode criar seu primeiro repositório. Vá para a próxima seção e aprenda os primeiros passos.
      </AlertBox>
    </PageContainer>
  );
}
