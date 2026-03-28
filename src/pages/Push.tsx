import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Push() {
  return (
    <PageContainer
      title="Push e Pull"
      subtitle="Como sincronizar seu trabalho local com o repositório remoto usando git push e git pull."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <p>
        O <code>git push</code> envia seus commits locais para o repositório remoto. O <code>git pull</code> traz os commits do remoto para o seu repositório local. Esses dois comandos são o coração da colaboração no Git.
      </p>

      <h2>git push — Enviando Commits</h2>
      <CodeBlock
        title="Como usar git push"
        code={`# Enviar o branch atual para o remoto
git push

# Enviar para um remoto e branch específicos
git push origin main

# Enviar um branch novo (primeira vez)
git push -u origin feature/nova-funcionalidade
# -u define o tracking: futuras chamadas de 'git push' funcionarão sem argumentos

# Enviar todas as tags junto com os commits
git push --follow-tags

# Enviar todos os branches locais
git push --all origin`}
      />

      <AlertBox type="warning" title="Push Rejeitado?">
        Se o <code>git push</code> for rejeitado, é porque o remoto tem commits que você não tem localmente. Você precisa primeiro fazer <code>git pull</code> (ou <code>git pull --rebase</code>), resolver possíveis conflitos e depois tentar o push novamente.
      </AlertBox>

      <h2>git pull — Recebendo Commits</h2>
      <CodeBlock
        title="Como usar git pull"
        code={`# Trazer e integrar mudanças do branch atual
git pull

# Equivale a:
git fetch origin
git merge origin/main

# Pull com rebase (histórico mais limpo — recomendado)
git pull --rebase

# Pull de um branch específico
git pull origin main

# Pull de outro branch para o atual
git pull origin feature/outra-feature`}
      />

      <h2>git fetch vs git pull</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">git fetch</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Baixa as mudanças do remoto</li>
            <li>• NÃO altera o working directory</li>
            <li>• Você decide quando integrar</li>
            <li>• Mais seguro e controlado</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">git pull</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Fetch + Merge automaticamente</li>
            <li>• Altera o working directory</li>
            <li>• Mais rápido para uso cotidiano</li>
            <li>• Pode criar merge commits</li>
          </ul>
        </div>
      </div>

      <h2>Push com Force (Cuidado!)</h2>
      <CodeBlock
        title="Force push — use com extrema cautela"
        code={`# NUNCA use em branches compartilhados!
git push --force origin feature/meu-branch

# Versão mais segura do force push
# Falha se alguém fez push enquanto você preparava o seu
git push --force-with-lease origin feature/meu-branch

# Quando usar force push:
# - Após git commit --amend em branch local
# - Após git rebase -i em branch próprio
# - NUNCA em main, dev ou branches compartilhados`}
      />

      <h2>Deletando Branch Remoto</h2>
      <CodeBlock
        title="Gerenciando branches no remoto"
        code={`# Deletar um branch no repositório remoto
git push origin --delete feature/branch-antigo
# ou
git push origin :feature/branch-antigo

# Sincronizar branches deletados (limpeza local)
git fetch --prune
# Remove referências locais de branches remotos que não existem mais`}
      />

      <AlertBox type="success" title="Workflow recomendado">
        Antes de começar a trabalhar: <code>git pull</code>. Antes de fazer push: <code>git pull --rebase</code>. Isso minimiza conflitos e mantém o histórico limpo.
      </AlertBox>
    </PageContainer>
  );
}
