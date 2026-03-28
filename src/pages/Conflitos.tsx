import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Conflitos() {
  return (
    <PageContainer
      title="Resolvendo Conflitos"
      subtitle="Conflitos de merge são normais e inevitáveis. Aprenda a resolvê-los com confiança."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <p>
        Um conflito de merge ocorre quando o Git não consegue integrar automaticamente as mudanças de dois branches porque ambos modificaram a mesma parte de um arquivo de formas diferentes. Conflitos não são erros — são uma situação normal que você aprenderá a resolver rapidamente.
      </p>

      <h2>Como os Conflitos Acontecem</h2>
      <CodeBlock
        title="Situação que gera conflito"
        code={`# No branch 'main', alguém mudou a linha 10 do arquivo.js
# No branch 'feature', você também mudou a linha 10 do arquivo.js
# Quando tentar fazer merge:
git merge feature/minha-funcionalidade

# Git responde:
# Auto-merging arquivo.js
# CONFLICT (content): Merge conflict in arquivo.js
# Automatic merge failed; fix conflicts and then commit the result.`}
      />

      <h2>A Marcação de Conflito</h2>
      <p>
        Quando um conflito ocorre, o Git marca o arquivo com indicadores especiais:
      </p>

      <CodeBlock
        title="Como um conflito aparece no arquivo"
        language="javascript"
        code={`function calcularTotal(itens) {
<<<<<<< HEAD
  // Versão do branch atual (main)
  return itens.reduce((acc, item) => acc + item.preco, 0);
=======
  // Versão do branch sendo mergeado (feature)
  return itens.reduce((total, item) => total + item.valor * item.quantidade, 0);
>>>>>>> feature/calculo-avancado
}`}
      />

      <ul>
        <li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> — início da versão do branch atual</li>
        <li><code>=======</code> — separador entre as versões</li>
        <li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/calculo-avancado</code> — versão do branch sendo mergeado</li>
      </ul>

      <h2>Resolvendo o Conflito</h2>
      <CodeBlock
        title="Passo a passo para resolver conflitos"
        code={`# 1. Ver quais arquivos têm conflito
git status

# 2. Abra o arquivo com conflito no seu editor
# Edite manualmente, escolhendo qual versão manter
# (ou combinando as duas)

# 3. Após editar, o arquivo deve ficar assim:
# function calcularTotal(itens) {
#   return itens.reduce((total, item) => total + item.valor * item.quantidade, 0);
# }

# 4. Remova TODOS os marcadores de conflito (<<<<, ====, >>>>)

# 5. Adicione o arquivo resolvido à staging area
git add arquivo.js

# 6. Conclua o merge
git commit   # Git gera uma mensagem padrão automaticamente
# ou
git commit -m "Merge: resolve conflito em calcularTotal"`}
      />

      <h2>Ferramentas Visuais para Conflitos</h2>
      <CodeBlock
        title="Usando mergetools"
        code={`# Configurar a ferramenta visual de merge
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Abrir a ferramenta de merge para todos os arquivos com conflito
git mergetool

# Outras ferramentas populares:
# git config --global merge.tool vimdiff
# git config --global merge.tool meld`}
      />

      <h2>Estratégias para Evitar Conflitos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-green-500/20 rounded-xl bg-green-500/5">
          <h4 className="font-bold text-green-400 mb-2 border-0 mt-0">Boas Práticas</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Faça pull/rebase frequentemente</li>
            <li>• Branches de curta duração</li>
            <li>• Comunicação com a equipe</li>
            <li>• Commits pequenos e frequentes</li>
            <li>• Divida o trabalho por módulos/arquivos</li>
          </ul>
        </div>
        <div className="p-4 border border-red-500/20 rounded-xl bg-red-500/5">
          <h4 className="font-bold text-red-400 mb-2 border-0 mt-0">O que evitar</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Branches de longa duração sem sync</li>
            <li>• Reformatação global de código</li>
            <li>• Várias pessoas editando o mesmo arquivo</li>
            <li>• Commits grandes com muitas mudanças</li>
          </ul>
        </div>
      </div>

      <AlertBox type="info" title="Conflito = Trabalho Paralelo">
        Conflitos não são erros do Git nem culpa de ninguém. São simplesmente o sinal de que duas pessoas trabalharam na mesma parte do código. O Git precisou da sua inteligência humana para decidir qual versão é a correta.
      </AlertBox>
    </PageContainer>
  );
}
