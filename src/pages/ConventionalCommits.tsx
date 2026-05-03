import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function ConventionalCommits() {
  return (
    <PageContainer
      title="Conventional Commits"
      subtitle="Um padrão simples para mensagens de commit que destrava changelog automático, versionamento semântico e CI inteligente."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Conventional Commits"}</strong> {' — '} {"padrão: tipo(escopo): descrição."}
          </li>
        <li>
            <strong>{"Tipos"}</strong> {' — '} {"feat, fix, docs, style, refactor, test, chore, build, ci."}
          </li>
        <li>
            <strong>{"Breaking change"}</strong> {' — '} {"! depois do escopo OU footer \"BREAKING CHANGE:\"."}
          </li>
        <li>
            <strong>{"Semantic-release"}</strong> {' — '} {"automatiza versão + changelog a partir das mensagens."}
          </li>
        <li>
            <strong>{"Commitlint"}</strong> {' — '} {"valida formato em pre-commit ou CI."}
          </li>
        </ul>
        <p>
        <strong>Conventional Commits</strong> é uma especificação leve para escrever mensagens de commit. A ideia: um prefixo padronizado (<code>feat:</code>, <code>fix:</code>, <code>docs:</code>...) que <em>máquinas</em> conseguem ler. Resultado: changelog gerado automaticamente, versão calculada sozinha (semver), e mensagens uniformes no histórico inteiro.
      </p>

      <AlertBox type="tip" title="TL;DR">
        Formato: <code>&lt;tipo&gt;(escopo opcional): descrição curta</code>. Exemplos: <code>feat(auth): adiciona login com Google</code>, <code>fix: corrige overflow no menu mobile</code>, <code>chore: atualiza dependências</code>.
      </AlertBox>

      <h2>Estrutura completa</h2>
      <CodeBlock
        title="Anatomia"
        language="markdown"
        code={`<tipo>(<escopo opcional>)<!>: <descrição>
                                  ↑
                       o "!" indica BREAKING CHANGE

<corpo opcional, separado por linha em branco>

<rodapé opcional, separado por linha em branco>
BREAKING CHANGE: <descrição da quebra>
Refs: #123, #456
Co-authored-by: Fulano <fulano@email.com>`}
      />

      <h2>Tipos padrão</h2>
      <CodeBlock
        title="Os 11 tipos mais usados"
        language="bash"
        code={`feat:     # nova funcionalidade para o usuário (MINOR no semver)
fix:      # correção de bug visível ao usuário (PATCH no semver)
docs:     # só documentação (README, comentários, JSDoc)
style:    # formatação, espaços, ponto-e-vírgula — sem mudar lógica
refactor: # mudança interna sem alterar comportamento
perf:     # melhora de performance
test:     # adicionar ou corrigir testes
build:    # build system, dependências (webpack, npm, docker)
ci:       # config de CI/CD (GitHub Actions, GitLab CI)
chore:    # tarefas manutenção que não entram em changelog
revert:   # reverter um commit anterior
`}
      />

      <h2>Exemplos reais</h2>
      <CodeBlock
        title="Bons commits"
        language="bash"
        code={`# Simples
feat: adiciona suporte a tema escuro
fix: previne crash quando usuário desloga durante upload
docs: atualiza instruções de instalação no README

# Com escopo (módulo, pasta ou área afetada)
feat(api): expõe endpoint /users/me
fix(auth): corrige expiração de token JWT
refactor(checkout): extrai validação para hook próprio
perf(home): lazy-load imagens abaixo da dobra
test(utils): cobre casos extremos de formatDate

# BREAKING CHANGE (com !) — força MAJOR no semver
feat(api)!: muda contrato de /users (id agora é UUID)

# Com corpo e rodapé
feat(notifications): envia email após cadastro

Usa o template "welcome.hbs" e o serviço SES.
Trabalha em background via Bull para não travar o request.

Refs: #234
Co-authored-by: Maria <maria@email.com>
`}
      />

      <h2>Por que adotar?</h2>
      <ul>
        <li><strong>Changelog automático</strong> — ferramentas como <code>standard-version</code>, <code>semantic-release</code> e <code>git-cliff</code> leem os commits e geram <code>CHANGELOG.md</code> sozinhas.</li>
        <li><strong>Versionamento semântico (semver)</strong> automático: <code>fix:</code> → <strong>patch</strong> (1.2.3 → 1.2.4), <code>feat:</code> → <strong>minor</strong> (1.2.3 → 1.3.0), <code>feat!:</code> → <strong>major</strong> (1.2.3 → 2.0.0).</li>
        <li><strong>Histórico legível</strong> — <code>git log --oneline</code> conta uma história clara.</li>
        <li><strong>CI inteligente</strong> — pode pular tasks: <code>chore:</code> e <code>docs:</code> não disparam build de produção.</li>
        <li><strong>Code review focado</strong> — revisor entende o <em>tipo</em> da mudança antes de abrir o diff.</li>
      </ul>

      <h2>Forçando o padrão (commitlint + husky)</h2>
      <p>
        Em projetos JavaScript, a combinação <strong>commitlint + husky</strong> bloqueia commits que não seguem o padrão antes mesmo de eles serem feitos.
      </p>

      <CodeBlock
        title="Setup completo"
        language="bash"
        code={`# Instalar
pnpm add -D @commitlint/cli @commitlint/config-conventional husky

# Config do commitlint
echo "export default { extends: ['@commitlint/config-conventional'] };" \\
  > commitlint.config.mjs

# Inicializar husky
pnpm exec husky init

# Adicionar hook commit-msg
echo 'pnpm exec commitlint --edit "$1"' > .husky/commit-msg
chmod +x .husky/commit-msg
`}
      />

      <CodeBlock
        title="Testando"
        language="bash"
        code={`git commit -m "alterei umas coisas"
# ⧗   input: alterei umas coisas
# ✖   subject may not be empty [subject-empty]
# ✖   type may not be empty [type-empty]
# husky - commit-msg hook exited with code 1 (error)

git commit -m "feat: adiciona seletor de tema"
# ✓ tudo certo, commit feito
`}
      />

      <h2>Gerando changelog</h2>
      <CodeBlock
        title="Com git-cliff (Rust, rápido, agnóstico de linguagem)"
        language="bash"
        code={`# Instalar
cargo install git-cliff
# ou: brew install git-cliff
# ou: pnpm add -D git-cliff

# Gerar changelog do zero
git cliff -o CHANGELOG.md

# Apenas mudanças desde a última tag
git cliff --latest -o CHANGELOG.md

# Bump de versão sugerido (lê os commits e diz: "deveria ser MINOR")
git cliff --bumped-version
`}
      />

      <CodeBlock
        title="Com semantic-release (Node, totalmente automático no CI)"
        language="bash"
        code={`pnpm add -D semantic-release \\
  @semantic-release/changelog \\
  @semantic-release/git

# No CI (GitHub Actions, etc), no merge para main:
pnpm exec semantic-release
# 1. Lê os commits desde a última release
# 2. Calcula próxima versão (semver)
# 3. Gera CHANGELOG.md
# 4. Cria a tag
# 5. Cria o release no GitHub
# 6. Publica no npm
# Tudo automático.
`}
      />

      <h2>Armadilhas comuns</h2>
      <ul>
        <li><strong>Esqueceu o "!" em breaking change</strong> → semantic-release não vai bumpar major. Sempre use <code>feat!:</code> ou rodapé <code>BREAKING CHANGE:</code>.</li>
        <li><strong>Misturar tipos</strong> ("feat e fix no mesmo commit") → divida em commits separados. <Link href="/staging" className="text-primary underline">Staging</Link> com <code>git add -p</code> ajuda.</li>
        <li><strong>Mensagem muito longa no título</strong> → mantenha &lt; 72 caracteres. Detalhes vão no corpo.</li>
        <li><strong>Modo imperativo</strong> → escreva "adiciona" não "adicionado". Pense no commit como uma <em>ordem</em>: "se aplicado, este commit vai...".</li>
      </ul>

      <AlertBox type="note" title="Convenção, não religião">
        Conventional Commits é uma <em>ferramenta</em> — adote se trouxer benefício real (changelog automático, semver). Em projeto pequeno, sem release publicado, pode ser overkill. Use o que serve.
      </AlertBox>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Resumo de bolso"
        language="bash"
        code={`feat:      nova funcionalidade           → MINOR
fix:       correção de bug                → PATCH
docs:      só documentação                → nada
style:     formatação                     → nada
refactor:  mudança interna                → nada
perf:      melhora de performance         → PATCH
test:      adicionar/corrigir testes      → nada
build:     build system, deps             → nada
ci:        config de CI/CD                → nada
chore:     manutenção                     → nada
revert:    reverter commit                → contexto
feat!:     breaking change                → MAJOR
`}
      />

      <h2>Próximos passos</h2>
      <p>
        Combine com <Link href="/signing" className="text-primary underline">commits assinados</Link> e <Link href="/hooks" className="text-primary underline">hooks</Link> para um fluxo profissional. Veja também <Link href="/commits" className="text-primary underline">Commits</Link> para boas práticas gerais e <Link href="/tags" className="text-primary underline">Tags</Link> para gerenciar releases.
      </p>
    </PageContainer>
  );
}
