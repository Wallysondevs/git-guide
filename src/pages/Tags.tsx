import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Tags() {
  return (
    <PageContainer
      title="Tags e Versões"
      subtitle="Tags marcam pontos específicos e importantes no histórico do projeto, como releases e versões."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <p>
        Tags são referências fixas a commits específicos. Diferente dos branches (que se movem com novos commits), uma tag sempre aponta para o mesmo commit. São ideais para marcar releases e versões do software.
      </p>

      <h2>Tipos de Tags</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Tag Leve (Lightweight)</h4>
          <p className="text-sm text-muted-foreground">Apenas um ponteiro para um commit. Sem informações extras. Boa para uso temporário/pessoal.</p>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Tag Anotada (Annotated)</h4>
          <p className="text-sm text-muted-foreground">Objeto completo com nome do tagger, data, mensagem e pode ser assinada com GPG. Recomendada para releases públicos.</p>
        </div>
      </div>

      <h2>Criando Tags</h2>
      <CodeBlock
        title="Como criar tags"
        code={`# Tag anotada (recomendada para releases)
git tag -a v1.0.0 -m "Release v1.0.0: primeira versão estável"

# Tag leve (simples e rápida)
git tag v1.0.0-beta

# Tag em um commit específico (não o atual)
git tag -a v0.9.0 abc1234 -m "Versão beta"

# Ver todas as tags
git tag

# Ver tags filtradas
git tag -l "v1.*"    # tags começando com v1.`}
      />

      <h2>Versionamento Semântico</h2>
      <p>
        A convenção mais usada para versionar software é o <strong>Semantic Versioning (SemVer)</strong>: <code>MAJOR.MINOR.PATCH</code>
      </p>

      <CodeBlock
        title="Como escolher o número de versão"
        language="text"
        code={`v1.0.0
 │ │ └── PATCH: Correções de bug retrocompatíveis
 │ └──── MINOR: Nova funcionalidade retrocompatível
 └────── MAJOR: Mudança incompatível com versão anterior (breaking change)

Exemplos:
v1.0.0 → v1.0.1   Correção de bug
v1.0.1 → v1.1.0   Nova funcionalidade
v1.1.0 → v2.0.0   API incompatível`}
      />

      <h2>Inspecionando Tags</h2>
      <CodeBlock
        title="Ver informações de uma tag"
        code={`# Ver detalhes de uma tag anotada
git show v1.0.0

# Comparar entre versões
git diff v1.0.0 v1.1.0

# Ver log entre versões
git log v1.0.0..v1.1.0 --oneline`}
      />

      <h2>Publicando Tags no Remoto</h2>
      <CodeBlock
        title="Enviando tags para o GitHub/GitLab"
        code={`# git push NÃO envia tags por padrão!

# Enviar uma tag específica
git push origin v1.0.0

# Enviar todas as tags de uma vez
git push origin --tags

# Enviar apenas tags anotadas (recomendado)
git push origin --follow-tags`}
      />

      <h2>Deletando Tags</h2>
      <CodeBlock
        title="Removendo tags"
        code={`# Deletar tag local
git tag -d v1.0.0-beta

# Deletar tag no repositório remoto
git push origin --delete v1.0.0-beta
# ou
git push origin :refs/tags/v1.0.0-beta`}
      />

      <AlertBox type="info" title="Tags e GitHub Releases">
        No GitHub, cada tag pode ser transformada em um "Release" com notas de versão, arquivos binários e changelog. Quando você cria uma tag e faz push, o GitHub oferece a opção de criar um Release automaticamente.
      </AlertBox>
    </PageContainer>
  );
}
