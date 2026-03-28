import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Stash() {
  return (
    <PageContainer
      title="Stash"
      subtitle="Guarde mudanças temporariamente sem commitar — o baú secreto do Git."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <p>
        O <code>git stash</code> salva temporariamente as mudanças não commitadas do seu working directory e da staging area, devolvendo o diretório para o estado do último commit. É perfeito para quando você precisa trocar de branch urgentemente sem querer commitar um trabalho incompleto.
      </p>

      <h2>Uso Básico</h2>
      <CodeBlock
        title="Guardando e recuperando mudanças"
        code={`# Você está no meio do trabalho e precisa trocar de branch urgentemente

# Guarda as mudanças atuais no stash
git stash

# Agora você pode trocar de branch tranquilamente
git switch hotfix/bug-critico

# ... faz o trabalho urgente, commita ...

# Volta para o branch original
git switch feature/minha-funcionalidade

# Recupera as mudanças que você guardou
git stash pop     # recupera e remove do stash
# ou
git stash apply   # recupera mas MANTÉM no stash`}
      />

      <h2>Gerenciando Múltiplos Stashes</h2>
      <CodeBlock
        title="Trabalhando com vários stashes"
        code={`# Criar stash com nome descritivo (recomendado!)
git stash push -m "WIP: trabalhando na validação de formulário"
git stash push -m "Experimento: nova abordagem de cache"

# Listar todos os stashes
git stash list

# Saída:
# stash@{0}: On feature: WIP: trabalhando na validação de formulário
# stash@{1}: On feature: Experimento: nova abordagem de cache

# Aplicar um stash específico pelo índice
git stash apply stash@{1}

# Ver o conteúdo de um stash antes de aplicar
git stash show -p stash@{0}

# Deletar um stash específico
git stash drop stash@{1}

# Limpar TODOS os stashes (CUIDADO!)
git stash clear`}
      />

      <h2>Opções do git stash push</h2>
      <CodeBlock
        title="Opções avançadas de stash"
        code={`# Incluir arquivos não rastreados (untracked)
git stash push -u
git stash push --include-untracked

# Incluir arquivos ignorados (.gitignore) também
git stash push -a
git stash push --all

# Guardar apenas arquivos específicos
git stash push -- arquivo1.js arquivo2.css

# Guardar de forma interativa (escolhe hunks)
git stash push -p`}
      />

      <h2>Criando Branch a partir de Stash</h2>
      <CodeBlock
        title="Branch a partir do stash"
        code={`# Cria um branch novo com o conteúdo do stash aplicado
# Útil quando o stash fica desatualizado e gera conflitos ao aplicar
git stash branch nova-funcionalidade-completa stash@{0}

# Isso:
# 1. Cria o branch a partir do commit onde o stash foi feito
# 2. Aplica o stash
# 3. Remove o stash da lista`}
      />

      <AlertBox type="warning" title="Stash não é substituto do commit">
        O stash é para situações temporárias e urgentes. Não use o stash como repositório de código em andamento por dias. Se você sabe que vai trabalhar naquilo depois, prefira um commit com "WIP:" (Work In Progress) no nome, que pode ser alterado com <code>git commit --amend</code>.
      </AlertBox>

      <AlertBox type="info" title="Dica: Stash parcial">
        Use <code>git stash push -p</code> para escolher interativamente quais partes do código guardar no stash, da mesma forma que o <code>git add -p</code>.
      </AlertBox>
    </PageContainer>
  );
}
