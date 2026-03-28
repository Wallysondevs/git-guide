import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Reflog() {
  return (
    <PageContainer
      title="Reflog"
      subtitle="O reflog é o histórico secreto do Git — sua rede de segurança para recuperar qualquer coisa perdida."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <p>
        O <strong>reflog</strong> (reference log) é um registro local de todos os movimentos do HEAD — cada checkout, commit, reset, merge e rebase. É a sua rede de segurança definitiva: mesmo depois de um <code>git reset --hard</code>, o reflog guarda os commits por pelo menos 90 dias.
      </p>

      <AlertBox type="success" title="Você nunca perde dados com o reflog">
        Sempre que você achar que destruiu algo com um reset ou rebase, calma! O reflog quase certamente tem o que você precisa para recuperar.
      </AlertBox>

      <h2>Visualizando o Reflog</h2>
      <CodeBlock
        title="Como ler o reflog"
        code={`# Ver o reflog completo
git reflog

# Saída típica:
# abc1234 HEAD@{0}: reset: moving to HEAD~3
# def5678 HEAD@{1}: commit: feat: nova funcionalidade
# ghi9012 HEAD@{2}: checkout: moving from main to feature/x
# jkl3456 HEAD@{3}: merge: Fast-forward
# ...

# O reflog do branch específico
git reflog show main
git reflog show feature/minha-branch`}
      />

      <h2>Recuperando Commits Perdidos</h2>
      <CodeBlock
        title="Recuperando commits após git reset --hard"
        code={`# Cenário: você deu git reset --hard e perdeu commits importantes

# 1. Ver o reflog para encontrar os commits perdidos
git reflog

# 2. Identificar o hash do commit antes do reset
# HEAD@{2}: commit: feat: funcionalidade importantíssima

# 3a. Recuperar criando um branch no ponto perdido
git branch recuperacao HEAD@{2}

# 3b. Ou fazer checkout diretamente
git checkout HEAD@{2}

# 4. Criar um branch e trazer os commits de volta
git switch -c recuperacao-emergencia`}
      />

      <CodeBlock
        title="Recuperando branch deletado"
        code={`# Você deletou um branch por engano!
git branch -D feature/importante

# 1. Encontrar o último commit desse branch no reflog
git reflog | grep feature/importante

# 2. Recriar o branch no commit encontrado
git branch feature/importante abc1234

# Alternativa: usar o fsck para encontrar commits "órfãos"
git fsck --lost-found`}
      />

      <h2>Reflog e Expiração</h2>
      <CodeBlock
        title="Configurações de expiração do reflog"
        code={`# O reflog mantém entradas por 90 dias por padrão
# (30 dias para commits sem referência)

# Ver configurações de expiração
git config gc.reflogExpire       # padrão: 90 days
git config gc.reflogExpireUnreachable  # padrão: 30 days

# Limpar reflog manualmente (não recomendado)
git reflog expire --expire=now --all

# O garbage collector limpa automaticamente
# commits sem referência após 30 dias
git gc`}
      />

      <AlertBox type="warning" title="Reflog é local">
        O reflog é um histórico puramente local — não é enviado para o servidor remoto com <code>git push</code>. Se alguém clonar seu repositório ou se você perder o <code>.git</code>, o reflog não existe. Faça backups regulares de repositórios importantes.
      </AlertBox>
    </PageContainer>
  );
}
