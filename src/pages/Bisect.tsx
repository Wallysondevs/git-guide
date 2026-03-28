import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Bisect() {
  return (
    <PageContainer
      title="Bisect"
      subtitle="Encontre em qual commit um bug foi introduzido usando busca binária automatizada."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <p>
        O <code>git bisect</code> usa busca binária para encontrar o commit exato que introduziu um bug. Ao invés de verificar commit por commit manualmente (podendo ser centenas), o bisect divide o problema ao meio em cada passo, encontrando o commit culpado em pouquíssimas iterações.
      </p>

      <h2>Como funciona o Bisect</h2>
      <p>
        Você diz ao Git: "Agora está quebrado, mas em algum commit antigo estava funcionando." O Git então vai verificando commits no meio do intervalo até isolar o commit que causou o problema.
      </p>

      <CodeBlock
        title="git bisect — fluxo básico"
        code={`# 1. Inicie o bisect
git bisect start

# 2. Marque o commit atual como ruim (tem o bug)
git bisect bad

# 3. Marque um commit antigo onde estava funcionando como bom
git bisect good v1.0.0    # use uma tag, hash ou referência

# O Git vai fazer checkout de um commit no meio do intervalo
# Você testa se o bug existe:
npm test   # ou teste manualmente

# 4a. Se o bug EXISTE neste commit:
git bisect bad

# 4b. Se o bug NÃO EXISTE neste commit:
git bisect good

# Continue até o Git encontrar o commit culpado:
# "abc1234 is the first bad commit"

# 5. Ao terminar, sempre volte ao estado normal
git bisect reset`}
      />

      <h2>Bisect Automatizado</h2>
      <p>
        Se você tem um script que retorna 0 (sucesso) quando está bom e 1 (falha) quando tem o bug, o bisect pode ser totalmente automatizado:
      </p>

      <CodeBlock
        title="Automatizando o bisect com um script"
        code={`# Inicia o bisect
git bisect start
git bisect bad                   # commit atual está quebrado
git bisect good v1.0.0           # versão 1.0.0 estava ok

# Executa o script automaticamente em cada commit testado
git bisect run npm test

# Ou com script personalizado
git bisect run ./scripts/check-bug.sh

# O Git vai testar automaticamente cada commit
# e encontrar o culpado sem intervenção manual`}
      />

      <AlertBox type="info" title="Eficiência logarítmica">
        O bisect usa busca binária: para 1.000 commits, você precisa testar no máximo ~10 vezes (log₂(1000) ≈ 10). Para 1.000.000 commits, apenas ~20 testes! É dramaticamente mais eficiente que verificar commit por commit.
      </AlertBox>

      <h2>Salvando o Histórico do Bisect</h2>
      <CodeBlock
        title="Outros comandos do bisect"
        code={`# Ver o log do processo de bisect atual
git bisect log

# Salvar o log em um arquivo
git bisect log > bisect.log

# Ver os commits que ainda precisam ser testados
git bisect visualize --oneline

# Pular um commit (ex: build quebrado que não permite testar)
git bisect skip

# Pular um intervalo de commits
git bisect skip abc1234..def5678`}
      />
    </PageContainer>
  );
}
