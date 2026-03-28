import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Rebase() {
  return (
    <PageContainer
      title="Rebase"
      subtitle="Rebase é uma forma alternativa de integrar branches que cria um histórico mais linear e limpo."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <p>
        O <code>git rebase</code> reaplica os commits de um branch sobre a ponta de outro branch. O resultado é um histórico linear, como se você tivesse desenvolvido sua feature diretamente a partir do último commit do main.
      </p>

      <h2>Rebase vs Merge</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Merge</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Preserva o histórico exato</li>
            <li>• Cria um "merge commit"</li>
            <li>• Histórico pode ficar complexo</li>
            <li>• Não reescreve commits existentes</li>
            <li>• Seguro para branches públicos</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Rebase</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Histórico linear e limpo</li>
            <li>• Sem merge commits extras</li>
            <li>• Mais fácil de ler e navegar</li>
            <li>• Reescreve commits (novos hashes!)</li>
            <li>• NUNCA use em branches públicos</li>
          </ul>
        </div>
      </div>

      <h2>Rebase Básico</h2>
      <CodeBlock
        title="Como fazer rebase"
        code={`# Você está em feature/minha-funcionalidade
# O main avançou enquanto você trabalhava
# Você quer atualizar seu branch com as mudanças do main

git switch feature/minha-funcionalidade
git rebase main

# O Git irá:
# 1. Encontrar os commits do seu branch que não estão no main
# 2. Salvar essas mudanças temporariamente
# 3. Mover seu branch para a ponta do main
# 4. Reaplicar seus commits um a um`}
      />

      <AlertBox type="danger" title="Regra de Ouro do Rebase">
        <strong>Nunca faça rebase de um branch que outros desenvolvedores estão usando.</strong> O rebase reescreve o histórico (novos hashes de commit), o que causa conflitos sérios para quem tem a versão antiga. Só faça rebase de branches que são exclusivamente seus.
      </AlertBox>

      <h2>Rebase Interativo</h2>
      <p>
        O rebase interativo (<code>-i</code>) é um dos recursos mais poderosos do Git. Ele permite editar, reorganizar, combinar e eliminar commits antes de integrá-los.
      </p>

      <CodeBlock
        title="git rebase -i — Interativo"
        code={`# Rebase interativo dos últimos 3 commits
git rebase -i HEAD~3

# O editor abrirá mostrando os commits:
# pick abc1234 Adiciona validação de email
# pick def5678 Corrige typo no README
# pick ghi9012 WIP: continua validação

# Comandos disponíveis:
# pick    = mantém o commit como está
# reword  = muda a mensagem do commit
# edit    = para e permite editar o commit
# squash  = combina com o commit anterior (mantém ambas mensagens)
# fixup   = combina com o commit anterior (descarta esta mensagem)
# drop    = remove o commit completamente
# exec    = executa um comando shell`}
      />

      <CodeBlock
        title="Casos de uso do rebase interativo"
        code={`# Combinar 5 commits WIP em 1 commit limpo
git rebase -i HEAD~5
# Mude todos menos o primeiro de 'pick' para 'fixup'

# Reordenar commits (apenas mude a ordem das linhas)
# Editar a mensagem de um commit antigo (mude para 'reword')

# Dividir um commit em dois:
# 1. Mude para 'edit'
# 2. Quando o Git pausar: git reset HEAD~1
# 3. Faça os commits separados
# 4. git rebase --continue`}
      />

      <h2>Resolvendo Conflitos durante Rebase</h2>
      <CodeBlock
        title="Conflitos no rebase"
        code={`# Se houver conflitos durante o rebase:

# 1. O Git para e mostra quais arquivos têm conflito
# 2. Resolva os conflitos manualmente nos arquivos
# 3. Adicione os arquivos resolvidos
git add arquivo-com-conflito.js

# 4. Continue o rebase
git rebase --continue

# Se quiser cancelar e voltar ao estado original
git rebase --abort

# Se quiser pular este commit (raramente recomendado)
git rebase --skip`}
      />

      <h2>git pull --rebase</h2>
      <CodeBlock
        title="Atualizando com rebase (ao invés de merge)"
        code={`# Ao invés de criar um merge commit ao puxar mudanças
git pull            # cria merge commit

# Use rebase para manter histórico linear
git pull --rebase   # reaplica seus commits sobre os remotos

# Configurar como padrão
git config --global pull.rebase true`}
      />

      <AlertBox type="success" title="Quando usar Rebase">
        Use rebase para manter seu feature branch atualizado com o main durante o desenvolvimento. Isso facilita o merge final e reduz conflitos. Mas nunca no branch principal ou em branches compartilhados.
      </AlertBox>
    </PageContainer>
  );
}
