import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Commits() {
  return (
    <PageContainer
      title="Fazendo Commits"
      subtitle="Como criar commits bem escritos e significativos que contam a história do seu projeto."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <p>
        Um commit é a unidade fundamental do Git. Ele registra um snapshot permanente das mudanças que você escolheu na staging area. A qualidade dos seus commits determina a qualidade do seu histórico — e um bom histórico é inestimável quando você precisa entender o passado do projeto.
      </p>

      <h2>Criando um Commit</h2>
      <CodeBlock
        title="Formas de fazer commit"
        code={`# Commit com mensagem inline (mais comum)
git commit -m "Adiciona validação de email no formulário de cadastro"

# Commit que abre o editor de texto para mensagem longa
git commit

# Commit adicionando todos os arquivos JÁ RASTREADOS (atalho)
git commit -am "Corrige: remove console.log esquecido em produção"

# Commit sem rodar os hooks (útil em casos especiais)
git commit --no-verify -m "WIP: trabalho em progresso"`}
      />

      <h2>Anatomia de uma Boa Mensagem de Commit</h2>
      <p>
        A convenção mais aceita para mensagens de commit é:
      </p>

      <CodeBlock
        title="Formato de mensagem de commit recomendado"
        language="text"
        code={`tipo(escopo): descrição curta (máx. 72 caracteres)

Corpo explicativo opcional. Explica O QUÊ e POR QUÊ foi feito,
não COMO (o código já mostra isso). Use o imperativo:
"Adiciona", "Corrige", "Remove", ao invés de "Adicionei".

Referências: #123, closes #456`}
      />

      <h2>Tipos de Commits — Conventional Commits</h2>
      <p>
        O padrão <strong>Conventional Commits</strong> é amplamente adotado em projetos open source:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          { tipo: "feat", desc: "Nova funcionalidade", ex: "feat: adiciona autenticação OAuth" },
          { tipo: "fix", desc: "Correção de bug", ex: "fix: corrige overflow no mobile" },
          { tipo: "docs", desc: "Apenas documentação", ex: "docs: atualiza README com exemplos" },
          { tipo: "style", desc: "Formatação, sem lógica", ex: "style: aplica ESLint em todo projeto" },
          { tipo: "refactor", desc: "Refatoração de código", ex: "refactor: extrai lógica de validação" },
          { tipo: "test", desc: "Adiciona ou corrige testes", ex: "test: adiciona testes unitários para API" },
          { tipo: "chore", desc: "Tarefa de manutenção", ex: "chore: atualiza dependências" },
          { tipo: "perf", desc: "Melhoria de performance", ex: "perf: otimiza consulta ao banco" },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
            <code className="text-primary font-bold">{item.tipo}</code>
            <p className="text-xs text-muted-foreground mt-1 mb-1">{item.desc}</p>
            <code className="text-xs opacity-70">{item.ex}</code>
          </div>
        ))}
      </div>

      <h2>Alterando o Último Commit</h2>
      <CodeBlock
        title="git commit --amend"
        code={`# Corrigir a mensagem do último commit
git commit --amend -m "Nova mensagem corrigida"

# Adicionar arquivos esquecidos ao último commit
git add arquivo-esquecido.js
git commit --amend --no-edit    # --no-edit mantém a mensagem original

# IMPORTANTE: Só faça isso em commits que ainda NÃO foram publicados!
# Amend reescreve o commit, gerando um novo hash.`}
      />

      <AlertBox type="warning" title="Nunca faça amend em commits públicos">
        O <code>git commit --amend</code> reescreve o histórico. Se o commit já foi enviado para o repositório remoto (GitHub), você criará conflitos para todos os colaboradores do projeto. Use apenas em commits locais.
      </AlertBox>

      <h2>Commits Vazios</h2>
      <CodeBlock
        title="Commits especiais"
        code={`# Commit vazio (sem mudanças) — útil para disparar CI/CD
git commit --allow-empty -m "ci: força re-execução do pipeline"

# Commit com data específica (útil para migrações históricas)
git commit --date="2024-01-01T12:00:00" -m "Migração histórica"`}
      />

      <h2>Desfazendo Commits</h2>
      <CodeBlock
        title="Como desfazer commits"
        code={`# Desfaz o último commit, mantendo as mudanças staged
git reset --soft HEAD~1

# Desfaz o último commit, mantendo as mudanças no working directory
git reset --mixed HEAD~1   # (padrão)

# Desfaz o último commit E descarta as mudanças (CUIDADO!)
git reset --hard HEAD~1

# Cria um novo commit que desfaz o commit anterior (seguro para repos remotos)
git revert HEAD`}
      />

      <AlertBox type="info" title="Reset vs Revert">
        Use <code>git reset</code> para commits locais (reescreve histórico). Use <code>git revert</code> para commits já publicados (cria novo commit de desfazimento sem reescrever histórico).
      </AlertBox>
    </PageContainer>
  );
}
