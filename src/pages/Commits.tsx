import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Commits() {
    return (
      <PageContainer
        title="Commits"
        subtitle="Como criar commits claros, consistentes e significativos que contam a história do projeto."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <p>
          Um commit é uma fotografia do estado do projeto em um momento específico, acompanhada de uma mensagem que explica o que e por que mudou. Commits bem escritos transformam o histórico do Git em documentação viva do projeto.
        </p>

        <h2>Criando commits</h2>
        <CodeBlock
          title="Comandos básicos de commit"
          code={`# Commit simples com mensagem inline
  git commit -m "feat: adiciona validação de CPF"

  # Commit com título e descrição detalhada
  git commit -m "feat: adiciona validação de CPF" -m "
  Implementa validação de formato e dígitos verificadores do CPF.
  Usa a biblioteca cpf-cnpj-validator para cálculo dos dígitos.

  Closes #234"

  # Abrir editor para escrever a mensagem (recomendado para mensagens longas)
  git commit

  # Stage e commit de arquivos já tracked em um comando
  git commit -am "fix: corrige cálculo de desconto"
  # -a = git add de todos tracked antes de commit

  # Corrigir o último commit (mensagem ou conteúdo)
  git commit --amend
  git commit --amend -m "mensagem corrigida"`}
        />

        <h2>Conventional Commits — o padrão da indústria</h2>
        <p>
          Conventional Commits é uma convenção que estrutura as mensagens para serem processáveis por ferramentas — geradores de changelog, bumpers de versão, e scripts de CI.
        </p>
        <CodeBlock
          title="Formato: tipo(escopo): descrição"
          code={`# Estrutura:
  # tipo(escopo opcional): descrição breve
  #
  # Corpo opcional — o porquê da mudança
  #
  # Footer opcional — breaking changes, issues fechadas

  # Tipos principais:
  feat:     # Nova funcionalidade
  fix:      # Correção de bug
  docs:     # Documentação apenas
  style:    # Formatação (sem mudança de lógica)
  refactor: # Refatoração (sem feat nem fix)
  test:     # Adiciona ou corrige testes
  chore:    # Build, deps, ferramentas (sem produção)
  perf:     # Melhoria de performance
  ci:       # Mudanças em CI/CD

  # Exemplos:
  feat(auth): adiciona login com Google OAuth
  fix(cart): corrige cálculo de frete para endereços internacionais
  docs(readme): atualiza instruções de instalação
  chore(deps): atualiza dependências para versões estáveis`}
        />

        <h2>Commits atômicos — um conceito essencial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-destructive/5">
            <h4 className="font-bold mb-2 mt-0 border-0 text-sm">❌ Commit ruim</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• "fix several bugs and add new feature"</li>
              <li>• Mistura refatoração com bugfix</li>
              <li>• 50 arquivos em um commit</li>
              <li>• "WIP" ou "various changes"</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-xl bg-green-500/5">
            <h4 className="font-bold mb-2 mt-0 border-0 text-sm">✅ Commit atômico</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Um único propósito por commit</li>
              <li>• Pode ser revertido isoladamente</li>
              <li>• O projeto compila a partir deste commit</li>
              <li>• A mensagem explica completamente o commit</li>
            </ul>
          </div>
        </div>

        <h2>Staging interativo para commits atômicos</h2>
        <CodeBlock
          title="Selecionando exatamente o que commitar"
          code={`# Adicionar arquivo completo
  git add src/auth.js

  # Adicionar interativamente — escolher hunks (partes) de um arquivo
  git add -p src/app.js
  # Opções: y (sim), n (não), s (dividir hunk), e (editar manualmente)

  # Ver o que está staged antes de commitar
  git diff --staged

  # Desfazer staging de um arquivo
  git restore --staged src/app.js`}
        />

        <h2>Amend e rebase interativo</h2>
        <CodeBlock
          title="Corrigindo commits antes do push"
          code={`# Corrigir o último commit (mensagem ou adicionar arquivo esquecido)
  git add arquivo-esquecido.js
  git commit --amend --no-edit  # mantém a mensagem

  # Reescrever os últimos 3 commits interativamente
  git rebase -i HEAD~3
  # Opções disponíveis:
  # pick = manter como está
  # reword = alterar mensagem
  # edit = parar para editar
  # squash = combinar com anterior
  # fixup = combinar com anterior (sem mensagem)
  # drop = deletar o commit`}
        />

        <AlertBox type="info" title="Amend e rebase só em commits ainda não enviados">
          Depois de fazer push, outros podem ter baseado trabalho nos seus commits. Amend ou rebase após push requer --force-with-lease e deve ser comunicado à equipe.
        </AlertBox>

        <h2>Verificando commits</h2>
        <CodeBlock
          title="Inspecionando commits"
          code={`# Ver detalhes do último commit
  git show
  git show HEAD

  # Ver commit específico
  git show abc1234

  # Ver só as mudanças de um arquivo em um commit
  git show abc1234 -- src/app.js

  # Verificar integridade de um commit
  git verify-commit abc1234  # requer GPG

  # Buscar commit por mensagem
  git log --grep="validação de CPF"`}
        />

        <AlertBox type="success" title="Commit como comunicação">
          Escreva mensagens de commit como se estivesse explicando para um colega (ou para você mesmo daqui 6 meses) o que você mudou e por quê — não o como. O diff já mostra o como. A mensagem explica o motivo.
        </AlertBox>
      </PageContainer>
    );
  }
  