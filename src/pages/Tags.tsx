import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Tags() {
    return (
      <PageContainer
        title="Tags do Git"
        subtitle="Marque pontos específicos da história com versões, releases e marcos importantes do projeto."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          Tags são referências imutáveis a commits específicos. Diferente de branches, que avançam com novos commits, uma tag sempre aponta para o mesmo ponto na história. Usadas principalmente para marcar versões de release: <code>v1.0.0</code>, <code>v2.3.1</code>.
        </p>

        <h2>Tipos de tags</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">Tag leve (lightweight)</h4>
            <p className="text-sm text-muted-foreground mb-2">Apenas um ponteiro para um commit. Sem metadados extras. Mais simples, menos informação.</p>
            <code className="text-xs text-primary">git tag v1.0.0</code>
          </div>
          <div className="p-4 border border-border rounded-xl bg-primary/5">
            <h4 className="font-bold mb-2 mt-0 border-0">Tag anotada (annotated) ⭐</h4>
            <p className="text-sm text-muted-foreground mb-2">Objeto completo com autor, data, mensagem e pode ser assinada com GPG. Recomendada para releases públicas.</p>
            <code className="text-xs text-primary">git tag -a v1.0.0 -m "Release 1.0.0"</code>
          </div>
        </div>

        <h2>Criando e gerenciando tags</h2>
        <CodeBlock
          title="Operações com tags"
          code={`# Tag leve no commit atual
  git tag v1.0.0

  # Tag anotada com mensagem (recomendado para releases)
  git tag -a v1.0.0 -m "Release 1.0.0 — estável para produção"

  # Tag em um commit específico (qualquer ponto da história)
  git tag -a v0.9.0 abc1234 -m "Beta release"

  # Listar todas as tags
  git tag
  git tag -l  # equivalente

  # Listar tags com padrão
  git tag -l "v1.*"    # todas v1.x.x
  git tag -l "v2.0.*"  # v2.0.x apenas

  # Ver detalhes de uma tag anotada
  git show v1.0.0

  # Verificar qual commit uma tag aponta
  git rev-parse v1.0.0`}
        />

        <AlertBox type="info" title="Tags não são enviadas automaticamente com git push">
          Diferente de branches, <code>git push</code> não envia tags. Você precisa enviá-las explicitamente.
        </AlertBox>

        <h2>Compartilhando tags (push)</h2>
        <CodeBlock
          title="Enviando tags para o remoto"
          code={`# Enviar uma tag específica
  git push origin v1.0.0

  # Enviar TODAS as tags de uma vez
  git push origin --tags

  # Enviar todas as tags anotadas (não as leves)
  git push origin --follow-tags

  # Deletar uma tag do remoto
  git push origin --delete v1.0.0
  git push origin :refs/tags/v1.0.0  # sintaxe alternativa`}
        />

        <h2>Navegando por tags</h2>
        <CodeBlock
          title="Usando tags para navegar no histórico"
          code={`# Fazer checkout de uma tag (detached HEAD)
  git checkout v1.0.0

  # Criar um branch a partir de uma tag
  git switch -c hotfix/v1.0.1 v1.0.0

  # Comparar diferenças entre versões
  git diff v1.0.0 v2.0.0
  git diff v1.0.0 v2.0.0 -- src/app.js  # arquivo específico

  # Log entre duas versões
  git log v1.0.0..v2.0.0 --oneline

  # Ver qual tag descreve o commit atual
  git describe --tags
  # Saída: v1.0.0-15-gabc1234
  # = 15 commits depois da tag v1.0.0, no commit abc1234`}
        />

        <h2>Versionamento semântico com tags</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Versão</th>
                <th className="p-3 text-left">Incrementar quando</th>
                <th className="p-3 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MAJOR (X.0.0)", "Mudanças incompatíveis com versão anterior (breaking changes)", "v1.0.0 → v2.0.0"],
                ["MINOR (0.X.0)", "Nova funcionalidade compatível com versão anterior", "v1.0.0 → v1.1.0"],
                ["PATCH (0.0.X)", "Correção de bugs compatível com versão anterior", "v1.0.0 → v1.0.1"],
                ["Pre-release", "Versões de teste antes da release oficial", "v2.0.0-alpha.1, v2.0.0-rc.1"],
              ].map(([versao, quando, ex], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{versao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{quando}</td>
                  <td className="p-3 text-sm">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="success" title="Automatize tags com GitHub Actions">
          Configure um workflow para criar tags automaticamente ao fazer push em main, baseando-se nos prefixos dos commits (feat: → minor, fix: → patch, breaking: → major). Ferramentas como semantic-release fazem isso.
        </AlertBox>
      </PageContainer>
    );
  }
  