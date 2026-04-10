import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function CherryPick() {
    return (
      <PageContainer
        title="git cherry-pick"
        subtitle="Aplique commits específicos de qualquer branch no seu branch atual com precisão cirúrgica."
        difficulty="intermediario"
        timeToRead="12 min"
      >
        <p>
          O <code>git cherry-pick</code> copia um commit de qualquer branch e o aplica no branch atual. Diferente do merge (que traz tudo) ou do rebase (que reaplica uma sequência), o cherry-pick é cirúrgico — você escolhe exatamente quais commits quer.
        </p>

        <h2>Quando usar cherry-pick</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { titulo: "Hotfix em múltiplos branches", desc: "Você corrigiu um bug crítico no main e precisa aplicar a mesma correção em v1.x, v2.x e develop sem fazer merge de tudo." },
            { titulo: "Resgatando commits perdidos", desc: "Você fez commits no branch errado. Cherry-pick move os commits para o branch correto, então você deleta do branch errado." },
            { titulo: "Feature parcial", desc: "Um branch tem 10 commits de uma feature, mas você só quer 3 específicos no main agora. Cherry-pick seleciona exatamente esses 3." },
            { titulo: "Portando correções entre versões", desc: "Manter múltiplas versões em produção: um bugfix do v3 precisa ir para v2 e v1 também." },
          ].map((item) => (
            <div key={item.titulo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm">{item.titulo}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          title="Uso básico"
          code={`# Aplicar um commit específico no branch atual
  git cherry-pick abc1234

  # Aplicar múltiplos commits (ordem importa)
  git cherry-pick abc1234 def5678 ghi9012

  # Aplicar um intervalo de commits (inclusivo)
  git cherry-pick abc1234..ghi9012

  # Aplicar sem criar commit (fica staged para você commitar)
  git cherry-pick --no-commit abc1234
  git cherry-pick -n abc1234  # abreviação`}
        />

        <AlertBox type="info" title="Cherry-pick cria um novo commit com SHA diferente">
          O commit copiado tem o mesmo conteúdo e mensagem, mas um SHA diferente. Isso é importante: o commit original continua existindo onde estava. Você está <em>copiando</em>, não movendo.
        </AlertBox>

        <h2>Fluxo de cherry-pick de hotfix</h2>
        <CodeBlock
          title="Exemplo prático: hotfix em múltiplos branches"
          code={`# 1. Você está no main e corrigiu um bug crítico
  git log --oneline -3
  # a1b2c3d fix: corrige vazamento de memória no parser
  # ...

  # 2. Precisa aplicar em release/v2.0 também
  git switch release/v2.0

  # 3. Cherry-pick do commit do fix
  git cherry-pick a1b2c3d
  # [release/v2.0 f4e5d6c] fix: corrige vazamento de memória no parser

  # 4. O commit está agora em release/v2.0 com SHA diferente
  git log --oneline -2
  # f4e5d6c fix: corrige vazamento de memória no parser
  # ...

  # 5. Push para o remoto
  git push origin release/v2.0`}
        />

        <h2>Resolvendo conflitos durante cherry-pick</h2>
        <CodeBlock
          title="Fluxo de resolução de conflitos"
          code={`# Se cherry-pick encontrar conflito:
  git cherry-pick abc1234
  # Auto-merging src/app.js
  # CONFLICT (content): Merge conflict in src/app.js
  # error: could not apply abc1234... feat: nova funcionalidade

  # 1. Ver arquivos em conflito
  git status
  git diff

  # 2. Resolver conflitos manualmente nos arquivos

  # 3. Marcar como resolvido
  git add src/app.js

  # 4. Continuar o cherry-pick
  git cherry-pick --continue

  # OU abortar completamente
  git cherry-pick --abort

  # OU pular este commit e continuar com próximos
  git cherry-pick --skip`}
        />

        <h2>Opções avançadas</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Opção</th>
                <th className="p-3 text-left">Efeito</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["-n / --no-commit", "Aplica mudanças mas não cria commit — você commita manualmente"],
                ["-e / --edit", "Abre editor para modificar a mensagem do commit"],
                ["-x", "Adiciona referência ao commit original na mensagem"],
                ["--signoff", "Adiciona linha Signed-off-by à mensagem"],
                ["--allow-empty", "Permite cherry-pick de commits vazios"],
                ["--strategy-option=theirs", "Em conflito, usa a versão do commit sendo aplicado"],
              ].map(([opt, efeito], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{opt}</td>
                  <td className="p-3 text-muted-foreground text-sm">{efeito}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          title="Cherry-pick com rastreabilidade"
          code={`# Usar -x para adicionar referência ao commit original
  git cherry-pick -x abc1234
  # A mensagem do commit fica:
  # fix: corrige bug no login
  #
  # (cherry picked from commit abc1234)

  # Usar -e para editar a mensagem
  git cherry-pick -e abc1234
  # Abre editor — você pode adicionar contexto

  # Cherry-pick em loop (script)
  for commit in abc123 def456 ghi789; do
    git cherry-pick -x $commit
  done`}
        />

        <AlertBox type="warning" title="Cherry-pick com cuidado em contexto de equipe">
          O cherry-pick duplica commits (mesmo conteúdo, SHA diferente). Se outro desenvolvedor fizer merge do branch original depois, o Git pode tentar aplicar o mesmo patch novamente, criando commits duplicados. Use com moderação e prefira merge/rebase quando possível.
        </AlertBox>
      </PageContainer>
    );
  }
  