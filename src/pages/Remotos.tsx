import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Remotos() {
    return (
      <PageContainer
        title="Repositórios Remotos"
        subtitle="Configure e gerencie conexões com repositórios remotos — origin, upstream e múltiplos remotos."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          Remotos são apelidos (aliases) para URLs de repositórios Git. O remoto <code>origin</code> é criado automaticamente ao clonar — mas você pode adicionar, remover e renomear remotos conforme sua necessidade.
        </p>

        <h2>Gerenciando remotos</h2>
        <CodeBlock
          title="Operações essenciais com remotos"
          code={`# Listar remotos configurados
  git remote
  git remote -v  # com URLs (verboso)
  # origin  https://github.com/usuario/projeto.git (fetch)
  # origin  https://github.com/usuario/projeto.git (push)

  # Adicionar um novo remoto
  git remote add origin https://github.com/usuario/projeto.git
  git remote add upstream https://github.com/original/projeto.git

  # Renomear remoto
  git remote rename origin novo-nome
  git remote rename upstream origin  # trocar origin por upstream

  # Remover remoto
  git remote remove upstream
  git remote rm upstream  # abreviação

  # Ver detalhes de um remoto específico
  git remote show origin
  # Mostra: URL, branches de tracking, push e fetch status`}
        />

        <h2>origin e upstream — o padrão de fork</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-primary/5">
            <h4 className="font-bold mb-2 mt-0 border-0">origin</h4>
            <p className="text-sm text-muted-foreground">Seu fork ou o repositório ao qual você tem acesso de push. Criado automaticamente no <code>git clone</code>.</p>
            <code className="text-xs mt-2 block">git push origin meu-branch</code>
          </div>
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">upstream</h4>
            <p className="text-sm text-muted-foreground">Convenção para o repositório original do qual você fez fork. Usado para sincronizar mudanças do projeto original.</p>
            <code className="text-xs mt-2 block">git fetch upstream && git merge upstream/main</code>
          </div>
        </div>

        <CodeBlock
          title="Configuração completa para contribuição via fork"
          code={`# 1. Clonar seu fork
  git clone git@github.com:seu-usuario/projeto.git
  cd projeto

  # 2. Adicionar o repositório original como upstream
  git remote add upstream https://github.com/original/projeto.git

  # 3. Verificar configuração
  git remote -v
  # origin    git@github.com:seu-usuario/projeto.git (fetch)
  # origin    git@github.com:seu-usuario/projeto.git (push)
  # upstream  https://github.com/original/projeto.git (fetch)
  # upstream  https://github.com/original/projeto.git (push)

  # 4. Sincronizar com upstream periodicamente
  git fetch upstream
  git switch main
  git merge upstream/main
  git push origin main  # atualizar seu fork`}
        />

        <h2>Mudando a URL de um remoto</h2>
        <CodeBlock
          title="Atualizar URL do remoto"
          code={`# Situação: você mudou de HTTPS para SSH (ou vice-versa)
  git remote set-url origin git@github.com:usuario/projeto.git

  # Verificar
  git remote get-url origin

  # Adicionar URL de push diferente da de fetch (avançado)
  git remote set-url --push origin git@github.com:usuario/fork.git

  # Situação: repositório foi movido para nova organização
  git remote set-url origin https://github.com/nova-org/projeto.git`}
        />

        <h2>Trabalhando com múltiplos remotos</h2>
        <CodeBlock
          title="Cenários com múltiplos remotos"
          code={`# Mirror: backup em dois serviços simultaneamente
  git remote add backup git@gitlab.com:usuario/projeto.git

  # Push para os dois remotos
  git push origin main
  git push backup main

  # Ou via push multiple (avançado)
  git remote set-url --add --push origin git@gitlab.com:usuario/projeto.git

  # Ver todos os branches de todos os remotos
  git branch -r

  # Fazer fetch de todos
  git fetch --all

  # Configurar push padrão para não precisar especificar
  git push -u origin meu-branch  # -u configura tracking`}
        />

        <h2>Referências de branches remotos</h2>
        <CodeBlock
          title="Como referenciar branches remotos"
          code={`# Formato: remoto/branch
  origin/main
  upstream/develop
  backup/production

  # Comparar branch local com remoto
  git diff main origin/main

  # Criar branch local a partir de remoto
  git switch --track origin/develop
  # ou
  git switch -c develop origin/develop

  # Ver em qual branch remoto o local está configurado
  git branch -vv`}
        />

        <AlertBox type="success" title="Dica: git remote show origin">
          O comando <code>git remote show origin</code> mostra um resumo completo: URL do remoto, branches locais configurados para push/fetch, e quais branches remotos são rastreados. Muito útil para entender a configuração atual.
        </AlertBox>
      </PageContainer>
    );
  }
  