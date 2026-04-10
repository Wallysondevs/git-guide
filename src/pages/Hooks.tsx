import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Hooks() {
    return (
      <PageContainer
        title="Git Hooks"
        subtitle="Automatize tarefas com scripts executados automaticamente em eventos do Git."
        difficulty="avancado"
        timeToRead="14 min"
      >
        <p>
          Hooks são scripts executados automaticamente pelo Git antes ou depois de eventos como commit, push e merge. Eles permitem automatizar linting, testes, formatação e validações sem depender de memória humana.
        </p>

        <h2>Tipos de hooks disponíveis</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Hook</th>
                <th className="p-3 text-left">Quando executa</th>
                <th className="p-3 text-left">Uso típico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["pre-commit", "Antes de criar o commit", "Lint, testes unitários, formatação"],
                ["commit-msg", "Após digitar a mensagem", "Validar formato da mensagem (Conventional Commits)"],
                ["post-commit", "Após commit ser criado", "Notificações, logs"],
                ["pre-push", "Antes de enviar para remoto", "Testes de integração, build"],
                ["pre-rebase", "Antes de iniciar rebase", "Avisos de proteção de branch"],
                ["post-merge", "Após merge ser completado", "npm install se package.json mudou"],
                ["post-checkout", "Após trocar de branch", "Atualizar dependências, ambiente"],
                ["pre-receive", "Lado do servidor — recebe push", "Validações no servidor Git"],
              ].map(([hook, quando, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{hook}</td>
                  <td className="p-3 text-muted-foreground text-sm">{quando}</td>
                  <td className="p-3 text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Criando um hook manualmente</h2>
        <CodeBlock
          title="Hook pre-commit simples"
          code={`# Os hooks ficam em .git/hooks/
  ls .git/hooks/
  # pre-commit.sample  commit-msg.sample  ...

  # Criar hook pre-commit
  cat > .git/hooks/pre-commit << 'EOF'
  #!/bin/sh
  # Roda ESLint antes de cada commit
  npm run lint
  if [ $? -ne 0 ]; then
    echo "❌ Lint falhou! Commit bloqueado."
    exit 1
  fi
  echo "✅ Lint passou!"
  exit 0
  EOF

  chmod +x .git/hooks/pre-commit

  # Testar o hook
  git commit -m "test"  # vai rodar o lint automaticamente`}
        />

        <AlertBox type="warning" title="Hooks em .git/hooks não são versionados">
          A pasta <code>.git/</code> não é commitada. Hooks criados diretamente lá não são compartilhados com a equipe. Use ferramentas como Husky ou lefthook para versionar e distribuir hooks.
        </AlertBox>

        <h2>Husky — hooks versionados e compartilhados</h2>
        <CodeBlock
          title="Configurando Husky em projeto Node.js"
          code={`# Instalar Husky
  npm install --save-dev husky

  # Inicializar
  npx husky init

  # Isso cria:
  # .husky/pre-commit  (arquivo de hook)
  # e adiciona ao package.json:
  # "prepare": "husky"

  # Configurar hook pre-commit
  echo "npm run lint" > .husky/pre-commit
  echo "npm test" >> .husky/pre-commit

  # Configurar hook commit-msg (validar mensagem)
  echo "npx commitlint --edit $1" > .husky/commit-msg

  # Commitar os hooks
  git add .husky package.json
  git commit -m "chore: adiciona hooks com Husky"`}
        />

        <h2>commit-msg — validando mensagens</h2>
        <CodeBlock
          title="Validando Conventional Commits"
          code={`# Instalar commitlint
  npm install --save-dev @commitlint/cli @commitlint/config-conventional

  # Criar configuração
  echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

  # Hook commit-msg
  cat > .husky/commit-msg << 'EOF'
  npx commitlint --edit "$1"
  EOF

  # Agora commits com mensagens inválidas são bloqueados:
  git commit -m "alterações"
  # ✖ subject may not be empty [subject-empty]
  # ✖ type may not be empty [type-empty]

  # Mensagem válida:
  git commit -m "feat: adiciona validação de email"`}
        />

        <h2>Pular hooks em emergências</h2>
        <CodeBlock
          title="Ignorando hooks temporariamente"
          code={`# Pular hooks de pre-commit e commit-msg
  git commit --no-verify -m "WIP: commit de emergência"
  git commit -n -m "fix: hotfix urgente"  # -n = --no-verify

  # Pular hook de pre-push
  git push --no-verify

  # Desabilitar Husky temporariamente (env var)
  HUSKY=0 git commit -m "deploy de emergência"
  HUSKY=0 git push`}
        />

        <AlertBox type="success" title="Hooks são o seu QA automatizado local">
          Um bom conjunto de hooks evita que erros óbvios (código com lint errors, testes quebrados, mensagens de commit inválidas) cheguem ao repositório remoto. Invista tempo configurando-os — economizará muito mais tempo em revisões.
        </AlertBox>
      </PageContainer>
    );
  }
  