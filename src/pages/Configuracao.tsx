import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Configuracao() {
  return (
    <PageContainer
      title="Configurações do Git"
      subtitle="Personalize o Git para se adaptar ao seu fluxo de trabalho com configurações avançadas."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <p>
        O Git é altamente configurável. Conhecer as principais opções de configuração pode tornar seu trabalho muito mais eficiente.
      </p>

      <h2>Estrutura do arquivo .gitconfig</h2>
      <CodeBlock
        title="~/.gitconfig completo"
        language="ini"
        code={`[user]
    name = Seu Nome Completo
    email = seu@email.com
    signingkey = SEU_ID_GPG   # para commits assinados

[core]
    editor = code --wait     # VS Code como editor padrão
    autocrlf = input         # Linux/Mac: input | Windows: true
    fileMode = false         # ignora mudanças de permissão de arquivo

[init]
    defaultBranch = main     # branch padrão ao criar repos

[pull]
    rebase = false           # git pull usa merge (padrão) | true para rebase

[push]
    default = current        # git push envia o branch atual

[color]
    ui = auto                # colorir saída automaticamente

[diff]
    tool = vscode

[merge]
    tool = vscode

[credential]
    helper = store           # salva credenciais em texto plano
    # helper = manager       # Windows (Git Credential Manager)`}
      />

      <h2>Configurações Essenciais</h2>
      <CodeBlock
        title="Configurando o Git do zero"
        code={`# Identidade (obrigatório)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Branch padrão como 'main'
git config --global init.defaultBranch main

# Editor padrão
git config --global core.editor "code --wait"   # VS Code
git config --global core.editor "nano"           # Nano
git config --global core.editor "vim"            # Vim

# Pull com rebase ao invés de merge (opcional)
git config --global pull.rebase false

# Empurrar branch atual por padrão
git config --global push.default current`}
      />

      <h2>Configurações por Projeto</h2>
      <CodeBlock
        title="Sobrescrever configurações em um projeto"
        code={`# Dentro do projeto, use --local (sem a flag, é --local por padrão dentro de um repo)
cd /caminho/para/projeto-trabalho
git config user.email "nome@empresa.com"   # só afeta este projeto
git config user.name "Nome Profissional"

# Verificar configurações locais
git config --list --local

# Ver a origem de cada configuração
git config --list --show-origin`}
      />

      <h2>Assinando Commits com GPG</h2>
      <CodeBlock
        title="Configurar assinatura GPG"
        code={`# Listar chaves GPG disponíveis
gpg --list-secret-keys --keyid-format=long

# Configurar o Git para usar sua chave
git config --global user.signingkey SEU_ID_CHAVE_GPG

# Assinar commits automaticamente
git config --global commit.gpgsign true

# Assinar uma tag
git tag -s v1.0.0 -m "Release assinada"

# Verificar assinatura de um commit
git verify-commit abc1234
git log --show-signature -1`}
      />

      <h2>Configurando Ferramentas de Diff e Merge</h2>
      <CodeBlock
        title="Configurar VS Code como ferramenta de diff e merge"
        code={`# Diff com VS Code
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'

# Merge com VS Code
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Usar as ferramentas
git difftool     # abre o diff no VS Code
git mergetool    # resolve conflitos no VS Code`}
      />

      <AlertBox type="info" title="Configurações por Projeto de Trabalho">
        Se você usa o Git tanto para projetos pessoais (com seu e-mail pessoal) quanto para trabalho (e-mail corporativo), use configurações locais por projeto ao invés de alterar a configuração global.
      </AlertBox>
    </PageContainer>
  );
}
