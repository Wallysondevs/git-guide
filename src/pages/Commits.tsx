import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Commits() {
  return (
    <PageContainer
      title="Fazendo Commits"
      subtitle="Como criar commits claros, atômicos e significativos que transformam o histórico em documentação viva."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <p>
        Um commit é uma <strong>fotografia do projeto + mensagem explicativa</strong>. Mas mais que isso: bons commits são leitura técnica para quem chega depois (incluindo seu eu de daqui a 6 meses). Esta é uma das habilidades mais subestimadas da carreira.
      </p>

      <AlertBox type="tip" title="A regra de ouro">
        Cada commit responde a duas perguntas: <strong>O que mudou?</strong> (resumo) e <strong>Por que mudou?</strong> (contexto). Se você não consegue escrever isso em uma linha, o commit é grande demais.
      </AlertBox>

      <h2>Anatomia da mensagem ideal</h2>
      <CodeBlock
        title="Estrutura recomendada"
        language="markdown"
        code={`feat(auth): adiciona MFA via TOTP                      ← TÍTULO (≤ 72 char)
                                                          ← LINHA EM BRANCO
Implementa autenticação de dois fatores usando             ← CORPO (por quê)
TOTP (RFC 6238). O secret é gerado por usuário e
guardado encriptado com AES-256-GCM.

Trade-offs considerados:
- TOTP > SMS por não depender de operadora
- 30s de janela é o equilíbrio entre UX e segurança

Closes #234                                                ← RODAPÉ (refs)
Reviewed-by: Maria <maria@empresa.com>
`}
      />

      <h2>Comandos de commit</h2>
      <CodeBlock
        title="As variações"
        language="bash"
        code={`# Mensagem inline
git commit -m "feat: adiciona validação de CPF"

# Título + corpo (dois -m geram linha em branco entre eles)
git commit -m "feat: adiciona validação de CPF" \\
           -m "Usa cpf-cnpj-validator. Closes #234"

# Abre o editor (recomendado para mensagens > 1 linha)
git commit

# Stage + commit em um passo (só tracked)
git commit -am "fix: corrige cálculo de desconto"

# Commit vazio (útil para forçar CI/redeploy)
git commit --allow-empty -m "chore: trigger redeploy"

# Pula hooks (use com cautela)
git commit --no-verify -m "..."
`}
      />

      <h2>Os 7 mandamentos da boa mensagem</h2>
      <ul>
        <li><strong>Título no imperativo</strong>: "adiciona", "corrige", "remove" — não "adicionado" ou "adicionando".</li>
        <li><strong>Máximo 72 caracteres no título</strong> (o GitHub trunca em ~50 na lista).</li>
        <li><strong>Sem ponto final</strong> no título.</li>
        <li><strong>Linha em branco</strong> entre título e corpo.</li>
        <li><strong>Corpo explica o porquê</strong>, não o quê (o diff já mostra o quê).</li>
        <li><strong>Quebre o corpo em ~80 colunas</strong> (legibilidade no terminal).</li>
        <li><strong>Use rodapés padronizados</strong> (Closes, Refs, Co-authored-by).</li>
      </ul>

      <h2>Convenção de prefixos: Conventional Commits</h2>
      <p>
        A convenção <Link href="/conventional-commits">Conventional Commits</Link> é o padrão de fato da indústria. Vale a pena adotar:
      </p>

      <CodeBlock
        title="Tipos mais comuns"
        language="markdown"
        code={`feat:     nova funcionalidade
fix:      correção de bug
docs:     mudança só em documentação
style:    formatação (sem mudar comportamento)
refactor: reescrita sem mudança funcional
perf:     melhoria de performance
test:     adiciona/corrige testes
build:    sistema de build, dependências
ci:       configuração de CI/CD
chore:    manutenção, sem código de produção
revert:   reverte commit anterior

# Com escopo:
feat(auth): adiciona MFA
fix(api): trata 429 do upstream
`}
      />

      <h2>Corrigindo o último commit</h2>
      <CodeBlock
        title="git commit --amend"
        language="bash"
        code={`# Mudou só a mensagem
git commit --amend -m "mensagem corrigida"

# Esqueceu de adicionar um arquivo no commit
git add esquecido.ts
git commit --amend --no-edit
# (--no-edit mantém a mensagem anterior)

# Mudar autor do último commit
git commit --amend --author="Nome <email@exemplo.com>"

# Mudar a data do commit
git commit --amend --date="2025-10-15T10:00:00"
`}
      />

      <AlertBox type="danger" title="--amend reescreve o histórico">
        O <code>--amend</code> cria um <strong>commit novo</strong> com hash diferente. Se o anterior já foi pushado, você precisará de <code>git push --force-with-lease</code> e isso pode quebrar o trabalho de outros. Só use em commits locais.
      </AlertBox>

      <h2>Commits assinados (verificados)</h2>
      <CodeBlock
        title="Sign-off e signing"
        language="bash"
        code={`# Sign-off (DCO — Developer Certificate of Origin) — só adiciona linha "Signed-off-by"
git commit -s -m "feat: ..."

# Assinatura criptográfica (GPG ou SSH) — verificação real de autoria
git commit -S -m "feat: ..."

# Assinar todos os commits por padrão
git config --global commit.gpgSign true
`}
      />
      <p>Detalhes em <Link href="/signing">Assinatura GPG/SSH</Link>.</p>

      <h2>Co-autoria (pair programming)</h2>
      <CodeBlock
        title="Creditando colegas"
        language="markdown"
        code={`# No final da mensagem, deixe uma linha em branco e adicione:

Co-authored-by: Maria Silva <maria@empresa.com>
Co-authored-by: João Souza <joao@empresa.com>

# O GitHub renderiza os avatares de todos os co-autores no commit.
`}
      />

      <h2>Boas práticas de granularidade</h2>
      <CodeBlock
        title="Atômico vs salvo"
        language="diff"
        code={`# ❌ Commit "salvo do dia"
- "muitas mudanças no auth e algumas correções"

# ✅ Sequência atômica
+ refactor(auth): extrai validação de token para função pura
+ feat(auth): adiciona suporte a refresh tokens
+ fix(auth): corrige timeout de cookies em Safari iOS
+ test(auth): adiciona cobertura para refresh
+ docs(auth): documenta novo fluxo no README
`}
      />

      <h2>Reescrevendo histórico antes do push</h2>
      <CodeBlock
        title="git rebase -i — agrupando commits"
        language="bash"
        code={`# Reescreve os últimos 5 commits interativamente
git rebase -i HEAD~5

# Abre o editor com:
# pick a1b2c3d feat: começa MFA
# pick e5f6g7h wip
# pick 9i0j1k2 fix typo
# pick 3l4m5n6 wip2
# pick 7o8p9q0 finaliza MFA

# Mude para:
# pick   a1b2c3d feat: adiciona MFA via TOTP
# squash e5f6g7h wip
# squash 9i0j1k2 fix typo
# squash 3l4m5n6 wip2
# squash 7o8p9q0 finaliza MFA
# (resultado: 1 commit limpo)
`}
      />

      <p>Detalhes completos em <Link href="/rebase">Rebase</Link>.</p>

      <h2>Templates de mensagem</h2>
      <CodeBlock
        title="Configurar template padrão"
        language="bash"
        code={`# Crie ~/.gitmessage com seu template
cat > ~/.gitmessage <<'EOF'
# tipo(escopo): assunto curto (≤ 50 chars)
#
# Por que esta mudança é necessária?
#
# Como ela resolve o problema?
#
# Refs: #
EOF

# Configure como template global
git config --global commit.template ~/.gitmessage

# Agora "git commit" abre o editor já com o template
`}
      />

      <h2>Verificação prévia com hooks</h2>
      <CodeBlock
        title="hook pre-commit que valida formato"
        language="bash"
        code={`# .git/hooks/commit-msg
#!/bin/sh
pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .{1,72}$"
if ! grep -qE "$pattern" "$1"; then
  echo "❌ Mensagem fora do padrão Conventional Commits"
  echo "Formato: tipo(escopo opcional): descrição"
  exit 1
fi

chmod +x .git/hooks/commit-msg
`}
      />

      <p>Veja mais em <Link href="/hooks">Git Hooks</Link>.</p>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos de commit"
        language="bash"
        code={`git commit                       # abre editor
git commit -m "msg"              # mensagem inline
git commit -am "msg"             # add + commit (só tracked)
git commit --amend               # corrige último
git commit --amend --no-edit     # idem, mantendo msg
git commit --allow-empty -m ""   # commit vazio
git commit -s -m ""              # sign-off DCO
git commit -S -m ""              # signed cryptographically
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/conventional-commits">Conventional Commits</Link> — adote o padrão completo</li>
        <li><Link href="/historico">Histórico de Commits</Link> — explore <code>git log</code> a fundo</li>
        <li><Link href="/rebase">Rebase</Link> — reescreva e organize commits</li>
        <li><Link href="/signing">Assinatura GPG/SSH</Link> — adicione o badge "verified"</li>
      </ul>
    </PageContainer>
  );
}
