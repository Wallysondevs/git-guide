import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Fetch() {
  return (
    <PageContainer
      title="Fetch"
      subtitle="Como baixar mudanças do repositório remoto sem alterar seu trabalho local."
      difficulty="intermediario"
      timeToRead="8 min"
    >
      <p>
        O <code>git fetch</code> baixa objetos e referências de um repositório remoto, mas <strong>não modifica</strong> seus arquivos locais. É a forma mais segura de ver o que mudou no remoto antes de integrar.
      </p>

      <h2>Como funciona o Fetch</h2>
      <CodeBlock
        title="git fetch básico"
        code={`# Baixar todas as atualizações de todos os remotos
git fetch

# Baixar de um remoto específico
git fetch origin

# Baixar um branch específico
git fetch origin main

# Baixar todos os remotos configurados
git fetch --all

# Baixar e remover referências de branches deletados no remoto
git fetch --prune
git fetch -p   # versão curta`}
      />

      <h2>Inspecionando após o Fetch</h2>
      <CodeBlock
        title="Ver o que mudou no remoto"
        code={`# Após o fetch, veja o que mudou
git log HEAD..origin/main --oneline   # commits no remoto que não estão em local
git log origin/main..HEAD --oneline   # commits locais que não estão no remoto

# Ver diferença entre local e remoto
git diff main origin/main

# Ver todos os branches remotos atualizados
git branch -r

# Ver quem fez push e o quê
git log origin/main -10 --oneline`}
      />

      <h2>Fetch e depois Merge/Rebase</h2>
      <CodeBlock
        title="Integrando manualmente após fetch"
        code={`# Passo 1: baixar mudanças sem alterar nada
git fetch origin

# Passo 2: ver o que há de novo
git log HEAD..origin/main --oneline

# Passo 3a: integrar via merge
git merge origin/main

# Passo 3b: integrar via rebase (histórico mais limpo)
git rebase origin/main

# git pull = git fetch + git merge (automático)
# git pull --rebase = git fetch + git rebase (automático)`}
      />

      <AlertBox type="info" title="Por que usar fetch ao invés de pull?">
        O <code>git fetch</code> é preferível quando você quer inspecionar as mudanças antes de integrá-las, ou quando está trabalhando em um trecho delicado do código e quer ter total controle sobre quando e como as mudanças são aplicadas.
      </AlertBox>

      <h2>Atualizando Branches Locais de Rastreamento</h2>
      <CodeBlock
        title="Casos de uso avançados"
        code={`# Ver quais branches remotos existem
git ls-remote origin

# Criar um branch local a partir de um remoto
git fetch origin
git checkout -b feature/nova origin/feature/nova
# ou mais simples:
git switch feature/nova   # Git detecta automaticamente o branch remoto

# Comparar todos os branches com seus remotos
git for-each-ref --format="%(refname:short) %(upstream:track)" refs/heads`}
      />
    </PageContainer>
  );
}
