import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Aliases() {
  return (
    <PageContainer
      title="Aliases"
      subtitle="Crie atalhos para os comandos Git que você mais usa e turbine sua produtividade."
      difficulty="intermediario"
      timeToRead="8 min"
    >
      <p>
        Os aliases do Git permitem que você crie atalhos para comandos longos ou frequentes. Ao invés de digitar <code>git status</code>, você pode configurar <code>git st</code>. Ao invés de <code>git log --oneline --graph --all --decorate</code>, apenas <code>git lg</code>.
      </p>

      <h2>Criando Aliases Básicos</h2>
      <CodeBlock
        title="Os aliases mais populares"
        code={`# Atalhos para comandos frequentes
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.sw switch
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.df diff

# Uso:
git st      # git status
git sw main # git switch main
git br -a   # git branch -a`}
      />

      <h2>Aliases com Parâmetros</h2>
      <CodeBlock
        title="Aliases mais avançados"
        code={`# Log bonito com gráfico (um dos mais amados pela comunidade)
git config --global alias.lg "log --oneline --graph --all --decorate"

# Log com mais informações
git config --global alias.ll "log --pretty=format:'%C(yellow)%h%Creset %C(blue)%ad%Creset %s %C(red)[%an]%Creset' --date=short"

# Desfazer o último commit (mantendo mudanças)
git config --global alias.undo "reset --soft HEAD~1"

# Ver o que mudou no último commit
git config --global alias.last "log -1 HEAD --stat"

# Stash de forma rápida
git config --global alias.save "stash push"
git config --global alias.pop "stash pop"

# Uso:
git lg
git undo
git last`}
      />

      <h2>Aliases com Shell Commands</h2>
      <p>
        Você pode criar aliases que executam comandos do shell usando o prefixo <code>!</code>:
      </p>
      <CodeBlock
        title="Aliases com shell scripts"
        code={`# Abrir o repositório no navegador (macOS)
git config --global alias.browse '!open $(git remote get-url origin)'

# Listar os aliases configurados
git config --global alias.aliases "config --get-regexp '^alias\.'"

# Limpar branches já mergeados
git config --global alias.cleanup '!git branch --merged | grep -v "\*\|main\|master\|dev" | xargs -n 1 git branch -d'

# Adicionar e commitar de uma vez
git config --global alias.ac '!git add -A && git commit -m'
# Uso: git ac "mensagem do commit"`}
      />

      <h2>Editando o .gitconfig diretamente</h2>
      <CodeBlock
        title="Arquivo ~/.gitconfig com aliases"
        language="ini"
        code={`[alias]
    # Atalhos básicos
    st = status
    co = checkout
    sw = switch
    br = branch
    ci = commit
    df = diff

    # Log bonito
    lg = log --oneline --graph --all --decorate
    ll = log --pretty=format:'%C(yellow)%h%Creset %C(blue)%ad%Creset %s %C(red)[%an]%Creset' --date=short

    # Operações comuns
    undo = reset --soft HEAD~1
    last = log -1 HEAD --stat
    aliases = config --get-regexp '^alias\\.'

    # Stash
    save = stash push
    pop = stash pop`}
      />

      <AlertBox type="info" title="Dica: git config --global --edit">
        Use <code>git config --global --edit</code> para abrir o arquivo <code>.gitconfig</code> no seu editor e editar todos os aliases de uma vez.
      </AlertBox>
    </PageContainer>
  );
}
