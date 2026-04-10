import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Fetch() {
    return (
      <PageContainer
        title="git fetch"
        subtitle="Sincronize seu repositório local com as mudanças remotas sem modificar seu trabalho atual."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          O <code>git fetch</code> baixa commits, branches e tags do repositório remoto para o seu repositório local — mas não toca no seu working directory nem faz merge automático. É a forma segura de ver o que mudou sem afetar seu trabalho.
        </p>

        <h2>Fetch vs Pull — a diferença fundamental</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-primary/5">
            <h4 className="font-bold mb-2 mt-0 border-0 text-primary">git fetch (seguro)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Baixa mudanças do remoto</li>
              <li>✅ Não modifica working directory</li>
              <li>✅ Você decide quando integrar</li>
              <li>✅ Pode revisar antes de incorporar</li>
              <li>ℹ️ fetch = download sem merge</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-xl bg-destructive/5">
            <h4 className="font-bold mb-2 mt-0 border-0 text-destructive">git pull (automático)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>⚠️ Faz fetch + merge automaticamente</li>
              <li>⚠️ Modifica o branch atual</li>
              <li>⚠️ Pode criar conflitos inesperados</li>
              <li>ℹ️ pull = fetch + merge (ou rebase)</li>
            </ul>
          </div>
        </div>

        <h2>Uso básico</h2>
        <CodeBlock
          title="git fetch — comandos essenciais"
          code={`# Buscar de todos os remotos
  git fetch

  # Buscar de um remoto específico
  git fetch origin

  # Buscar de todos os remotos configurados
  git fetch --all

  # Buscar um branch específico
  git fetch origin main
  git fetch origin feature/login

  # Buscar e remover branches remotos deletados
  git fetch --prune
  git fetch -p  # abreviação de --prune`}
        />

        <AlertBox type="success" title="Use sempre git fetch antes de começar a trabalhar">
          Fazer <code>git fetch origin</code> antes de começar o dia garante que você sabe o que mudou. Combine com <code>git log origin/main..HEAD</code> para ver a diferença entre seu branch e o remoto.
        </AlertBox>

        <h2>Inspecionando o que foi baixado</h2>
        <CodeBlock
          title="Revisando mudanças após fetch"
          code={`# Ver commits que existem no remoto mas não no local
  git log main..origin/main --oneline

  # Ver commits locais que não foram para o remoto
  git log origin/main..main --oneline

  # Ver diferença completa dos arquivos
  git diff main origin/main

  # Ver branches remotos disponíveis
  git branch -r

  # Ver todos os branches (local + remoto)
  git branch -a

  # Ver o estado de sincronização
  git status
  # Mostra: "Your branch is behind 'origin/main' by 3 commits"`}
        />

        <h2>Integrando após o fetch</h2>
        <CodeBlock
          title="Opções para integrar após fetch"
          code={`# Opção 1: merge (cria commit de merge)
  git fetch origin
  git merge origin/main

  # Opção 2: rebase (histórico linear)
  git fetch origin
  git rebase origin/main

  # Opção 3: fast-forward apenas (seguro, falha se divergiu)
  git fetch origin
  git merge --ff-only origin/main

  # Verificar antes de integrar
  git fetch origin
  git log --oneline --graph main..origin/main  # ver o que vem
  git merge origin/main  # incorporar`}
        />

        <AlertBox type="info" title="git pull = git fetch + git merge">
          <code>git pull</code> é equivalente a fazer <code>git fetch</code> seguido de <code>git merge</code> (ou <code>git rebase</code> se configurado). Prefira <code>fetch + rebase</code> para manter histórico linear: <code>git pull --rebase</code>.
        </AlertBox>

        <h2>Configurando fetch automático</h2>
        <CodeBlock
          title="Configurações úteis de fetch"
          code={`# Configurar pull para fazer rebase em vez de merge (globalmente)
  git config --global pull.rebase true

  # Fetch automático com prune (remove refs de branches deletados)
  git config --global fetch.prune true

  # Ver configuração atual
  git config --list | grep fetch

  # Fetch + ver log do que mudou (script útil)
  git fetch --prune && git log --oneline --graph ORIG_HEAD..HEAD`}
        />

        <h2>Trabalhando com múltiplos remotos</h2>
        <CodeBlock
          title="Fetch com vários remotos"
          code={`# Adicionar segundo remoto (ex: upstream de um fork)
  git remote add upstream https://github.com/original/projeto.git

  # Buscar de todos os remotos
  git fetch --all

  # Ver branches de todos os remotos
  git branch -r
  # origin/main
  # origin/develop
  # upstream/main
  # upstream/feature/nova

  # Integrar mudanças do upstream
  git fetch upstream
  git merge upstream/main
  # ou
  git rebase upstream/main`}
        />

        <h2>Removendo referências obsoletas</h2>
        <CodeBlock
          title="Limpeza de branches remotos deletados"
          code={`# Ver quais refs seriam removidas (dry run)
  git fetch --prune --dry-run

  # Remover refs de branches que foram deletados no remoto
  git fetch --prune

  # Remover refs antigas manualmente
  git remote prune origin

  # Ver branches que já foram mergeados no main
  git branch -r --merged main

  # Configurar prune automático em todo fetch
  git config --global fetch.prune true`}
        />

        <AlertBox type="warning" title="Fetch não baixa tags automaticamente">
          Por padrão, <code>git fetch</code> baixa tags anotadas que apontem para commits baixados. Para baixar todas as tags explicitamente: <code>git fetch --tags</code>. Para fetch de uma tag específica: <code>git fetch origin refs/tags/v2.0:refs/tags/v2.0</code>.
        </AlertBox>
      </PageContainer>
    );
  }
  