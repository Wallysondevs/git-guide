import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Configuracao() {
  return (
    <PageContainer
      title="Configurações do Git"
      subtitle="A hierarquia de configs, includes condicionais, ferramentas de diff/merge e personalizações que mudam sua produtividade."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <p>
        O Git tem um sistema de configuração em camadas: <strong>system</strong> (toda a máquina) → <strong>global</strong> (seu usuário) → <strong>local</strong> (este repositório) → <strong>worktree</strong>. Configs mais específicas sobrescrevem as gerais. Saber onde colocar cada coisa evita muita dor.
      </p>

      <AlertBox type="tip" title="Onde está cada config">
        <code>git config --list --show-origin</code> mostra <strong>todas</strong> as configurações ativas e em qual arquivo cada uma está. Indispensável para debugar.
      </AlertBox>

      <h2>Hierarquia de configs</h2>
      <CodeBlock
        title="Locais e precedência"
        language="markdown"
        code={`Precedência (do mais geral ao mais específico — cada nível sobrescreve o anterior):

1. system     /etc/gitconfig                  (toda a máquina)
2. global     ~/.gitconfig                    (seu usuário)
3. local      .git/config                     (este repositório)
4. worktree   .git/config.worktree            (worktree específica)

Comandos:
git config --system  user.name "X"   # exige sudo
git config --global  user.name "X"   # ★ default para configs pessoais
git config --local   user.name "X"   # só este repo
git config --worktree user.name "X"  # só esta worktree
`}
      />

      <h2>Operações básicas</h2>
      <CodeBlock
        title="Ler, escrever, remover"
        language="bash"
        code={`# Ler uma config
git config user.name
git config --get user.name

# Listar TODAS (com origem)
git config --list --show-origin
git config -l --show-scope

# Editar arquivo manualmente
git config --global --edit
git config --local --edit

# Remover
git config --global --unset alias.lg
git config --global --unset-all remote.origin.url    # remove TODAS as ocorrências

# Listar de uma seção
git config --get-regexp ^alias\\.
git config --get-regexp ^remote\\.
`}
      />

      <h2>Configurações essenciais</h2>
      <CodeBlock
        title="Identidade"
        language="bash"
        code={`git config --global user.name "Seu Nome Completo"
git config --global user.email "voce@exemplo.com"

# Email no-reply do GitHub (preserva privacidade)
git config --global user.email "12345+seu-user@users.noreply.github.com"
`}
      />

      <CodeBlock
        title="Editor e merge tool"
        language="bash"
        code={`# Editor para mensagens, rebase interativo, etc.
git config --global core.editor "code --wait"     # VS Code
git config --global core.editor "nvim"            # Neovim
git config --global core.editor "nano"            # Nano

# Merge tool (para git mergetool)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.keepBackup false

# Diff tool externo (opcional)
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
`}
      />

      <CodeBlock
        title="Comportamento de pull, push, branch"
        language="bash"
        code={`# Branch padrão em novos repos
git config --global init.defaultBranch main

# Pull rebase (sem merge commits acidentais)
git config --global pull.rebase true
git config --global pull.ff only

# Push: só branch atual, com upstream automático
git config --global push.default simple
git config --global push.autoSetupRemote true
git config --global push.followTags true

# Fetch limpa refs órfãs automaticamente
git config --global fetch.prune true
git config --global fetch.pruneTags true

# Rebase memoriza resoluções
git config --global rerere.enabled true

# Auto-stash em rebase quando working sujo
git config --global rebase.autoStash true
git config --global rebase.autoSquash true
`}
      />

      <CodeBlock
        title="Visual e UX"
        language="bash"
        code={`# Cores no terminal
git config --global color.ui auto

# Status mais informativo
git config --global status.short true
git config --global status.branch true
git config --global status.showStash true

# Diff melhor (algoritmo histogram)
git config --global diff.algorithm histogram
git config --global diff.colorMoved zebra
git config --global merge.conflictStyle zdiff3

# Auto-correção de typos (1.5s antes de aceitar)
git config --global help.autocorrect 15

# Pager bonito (instale git-delta)
git config --global core.pager "delta --line-numbers --side-by-side"
`}
      />

      <h2>End-of-line — CRLF vs LF</h2>
      <CodeBlock
        title="core.autocrlf"
        language="bash"
        code={`# Linux/macOS — preserva LF, converte CRLF de fora para LF ao commitar
git config --global core.autocrlf input

# Windows — checkout converte LF→CRLF, commit converte CRLF→LF
git config --global core.autocrlf true

# Equipe mista — MELHOR forçar via .gitattributes (resto desativado)
git config --global core.autocrlf false
`}
      />

      <CodeBlock
        title=".gitattributes (recomendado em equipes)"
        language="bash"
        code={`# Crie .gitattributes na raiz do projeto
* text=auto

# Forçar LF para arquivos de código
*.js     text eol=lf
*.ts     text eol=lf
*.css    text eol=lf
*.html   text eol=lf
*.md     text eol=lf

# Forçar CRLF para scripts Windows
*.bat    text eol=crlf
*.cmd    text eol=crlf
*.ps1    text eol=crlf

# Binários (Git nem tenta tratar como texto)
*.png    binary
*.jpg    binary
*.pdf    binary
*.zip    binary
`}
      />

      <h2>Includes condicionais — perfis múltiplos</h2>
      <p>Use email/SSH key diferente para projetos pessoais vs trabalho? <strong>includeIf</strong> é a solução elegante.</p>

      <CodeBlock
        title="~/.gitconfig"
        language="ini"
        code={`[user]
    name = Maria Silva
    email = maria@pessoal.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:~/clientes/empresa-x/"]
    path = ~/.gitconfig-empresa-x

# E em ~/.gitconfig-work:
[user]
    email = maria@empresa.com
    signingkey = WORK-KEY-ID
[core]
    sshCommand = "ssh -i ~/.ssh/id_work"
[commit]
    gpgSign = true
`}
      />

      <CodeBlock
        title="Outras condições"
        language="ini"
        code={`# Por branch atual
[includeIf "onbranch:main"]
    path = ~/.gitconfig-main

# Por URL do remote
[includeIf "hasconfig:remote.*.url:git@github.com:empresa/**"]
    path = ~/.gitconfig-empresa

# Por hostname
[includeIf "gitdir/i:c:/work/"]
    path = ~/.gitconfig-work
`}
      />

      <h2>SSH config — múltiplas chaves</h2>
      <CodeBlock
        title="~/.ssh/config"
        language="bash"
        code={`# Conta pessoal
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_pessoal

# Conta de trabalho — use outra URL fictícia
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
    IdentitiesOnly yes

# Cloning:
git clone git@github.com:pessoal/repo.git           # usa id_pessoal
git clone git@github-work:empresa/repo.git          # usa id_work
`}
      />

      <h2>Hooks padronizados via core.hooksPath</h2>
      <CodeBlock
        title="Hooks compartilháveis"
        language="bash"
        code={`# Por padrão, hooks moram em .git/hooks (não vai pro repo)
# Crie uma pasta versionada e aponte o Git para ela:

mkdir .githooks
cat > .githooks/pre-commit <<'EOF'
#!/bin/sh
npm run lint
EOF
chmod +x .githooks/pre-commit

git config core.hooksPath .githooks

# Comite e todo mundo do time herda os hooks
git add .githooks
git commit -m "chore: hooks compartilhados"
`}
      />

      <p>Detalhes em <Link href="/hooks">Git Hooks</Link>.</p>

      <h2>Configurações de repositório (.git/config)</h2>
      <CodeBlock
        title="Exemplo completo"
        language="ini"
        code={`[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true

[remote "origin"]
    url = git@github.com:user/repo.git
    fetch = +refs/heads/*:refs/remotes/origin/*

[branch "main"]
    remote = origin
    merge = refs/heads/main
    rebase = true

[user]
    email = work@empresa.com    # override do global

[commit]
    gpgSign = true              # override do global

[alias]
    deploy = "!sh -c 'npm run build && rsync ...'"   # alias só deste repo
`}
      />

      <h2>Configs avançadas úteis</h2>
      <CodeBlock
        title="Performance e segurança"
        language="bash"
        code={`# Buffer maior para clones/pushes grandes
git config --global http.postBuffer 524288000        # 500MB

# Compressão mais agressiva (CPU↑, banda↓)
git config --global core.compression 9
git config --global pack.compression 9

# Protocolo v2 (mais rápido, padrão moderno)
git config --global protocol.version 2

# Verificação de integridade rigorosa
git config --global transfer.fsckObjects true
git config --global fetch.fsckObjects true
git config --global receive.fsckObjects true

# Timeout maior para operações lentas
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 60
`}
      />

      <h2>Resetando configs</h2>
      <CodeBlock
        title="Limpeza"
        language="bash"
        code={`# Ver tudo de uma seção
git config --get-regexp ^alias\\.

# Remover tudo de uma seção
git config --global --remove-section alias

# Remover uma config específica
git config --global --unset core.editor

# Reset completo (CUIDADO)
rm ~/.gitconfig
`}
      />

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Configurações essenciais"
        language="bash"
        code={`# Inspecionar
git config --list --show-origin              # tudo + arquivo
git config user.email                        # uma config
git config --global --edit                   # editar arquivo

# Identidade
git config --global user.name "..."
git config --global user.email "..."

# Comportamento
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global push.autoSetupRemote true
git config --global fetch.prune true
git config --global rerere.enabled true

# Visual
git config --global color.ui auto
git config --global diff.algorithm histogram
git config --global merge.conflictStyle zdiff3

# Includes condicionais
git config --global include.path ~/.gitconfig-work
[includeIf "gitdir:~/work/"]
    path = ...
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/aliases">Aliases</Link> — atalhos personalizados</li>
        <li><Link href="/hooks">Hooks</Link> — automação em eventos do Git</li>
        <li><Link href="/signing">Signing</Link> — assinatura GPG/SSH</li>
      </ul>
    </PageContainer>
  );
}
