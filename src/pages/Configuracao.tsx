import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Configuracao() {
    return (
      <PageContainer
        title="Configuração do Git"
        subtitle="Configure o Git do jeito certo desde o início — identidade, editor, aliases e comportamentos."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          Antes de usar o Git, você precisa configurar no mínimo seu nome e e-mail — eles são incluídos em cada commit que você cria. Mas há muito mais configurações que tornam o Git significativamente mais eficiente.
        </p>

        <h2>Configuração inicial obrigatória</h2>
        <CodeBlock
          title="Configurações mínimas"
          code={`# Nome e e-mail (aparecem em cada commit)
  git config --global user.name "Seu Nome Completo"
  git config --global user.email "seu@email.com"

  # Editor padrão para mensagens de commit
  git config --global core.editor "code --wait"  # VS Code
  git config --global core.editor "nano"          # nano
  git config --global core.editor "vim"           # vim

  # Branch padrão (recomendado: main)
  git config --global init.defaultBranch main

  # Ver configuração atual
  git config --global --list
  git config user.name  # ver valor específico`}
        />

        <h2>Níveis de configuração</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { nivel: "--system", arquivo: "/etc/gitconfig", desc: "Todos os usuários do sistema. Raramente usado.", prioridade: "Menor" },
            { nivel: "--global", arquivo: "~/.gitconfig", desc: "Seu usuário em todos os repositórios. Configurações pessoais.", prioridade: "Média" },
            { nivel: "--local", arquivo: ".git/config", desc: "Apenas o repositório atual. Sobrescreve global.", prioridade: "Maior" },
          ].map((item) => (
            <div key={item.nivel} className="p-4 border border-border rounded-xl bg-card">
              <code className="text-primary font-bold text-sm">{item.nivel}</code>
              <p className="text-xs text-muted-foreground mt-1 mb-1">{item.arquivo}</p>
              <p className="text-xs text-foreground">{item.desc}</p>
              <span className="text-xs bg-muted px-2 py-0.5 rounded mt-2 inline-block">Prioridade: {item.prioridade}</span>
            </div>
          ))}
        </div>

        <h2>Configurações recomendadas</h2>
        <CodeBlock
          title="O arquivo .gitconfig ideal"
          code={`[user]
    name = Seu Nome
    email = seu@email.com

  [core]
    editor = code --wait
    autocrlf = input     # Linux/Mac: normaliza line endings
    # autocrlf = true    # Windows: converte CRLF automaticamente

  [init]
    defaultBranch = main

  [pull]
    rebase = true        # git pull faz rebase em vez de merge

  [push]
    autoSetupRemote = true  # não precisa de -u na primeira vez

  [fetch]
    prune = true         # remove refs de branches deletados automaticamente

  [merge]
    conflictstyle = diff3  # mostra contexto em conflitos (muito útil!)

  [diff]
    algorithm = histogram  # diff mais legível

  [alias]
    st = status -sb
    lg = log --oneline --graph --decorate --all
    undo = reset HEAD~1 --mixed`}
        />

        <h2>Configurações por projeto (local)</h2>
        <CodeBlock
          title="Sobrescrever configurações para um projeto"
          code={`# Usar e-mail diferente em um repositório do trabalho
  cd /path/to/work-project
  git config --local user.email "joao@empresa.com"

  # Configurar remoto específico para o projeto
  git config --local branch.main.remote origin

  # Ver configuração efetiva (todas as fontes combinadas)
  git config --list --show-origin
  # Mostra: arquivo de origem + chave + valor`}
        />

        <h2>Line endings e compatibilidade</h2>
        <CodeBlock
          title="Configurando line endings para evitar conflitos"
          code={`# Linux e Mac (recomendado)
  git config --global core.autocrlf input
  # Converte CRLF→LF ao fazer commit, não muda ao checkout

  # Windows
  git config --global core.autocrlf true
  # Converte LF→CRLF ao checkout, CRLF→LF ao commit

  # Forçar sempre LF (recomendado para projetos cross-platform)
  # Criar arquivo .gitattributes no projeto:
  echo "* text=auto eol=lf" > .gitattributes
  git add .gitattributes
  git commit -m "chore: normaliza line endings para LF"`}
        />

        <AlertBox type="info" title="Credenciais e autenticação">
          Para evitar digitar senha toda vez, configure um credential helper: <code>git config --global credential.helper store</code> (armazena em texto plano) ou use SSH keys para autenticação sem senha — mais seguro.
        </AlertBox>

        <h2>Verificando e limpando configurações</h2>
        <CodeBlock
          title="Gerenciando configurações"
          code={`# Ver valor específico
  git config user.email
  git config --global core.editor

  # Remover uma configuração
  git config --global --unset alias.bad-alias

  # Editar o arquivo diretamente
  git config --global --edit

  # Listar tudo com origem dos valores
  git config --list --show-origin --show-scope`}
        />
      </PageContainer>
    );
  }
  