import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Submodulos() {
  return (
    <PageContainer
      title="Submódulos"
      subtitle="Inclua repositórios Git dentro de outros repositórios com git submodule."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <p>
        Os submódulos do Git permitem que você inclua um repositório Git dentro de outro como uma dependência. É útil quando você precisa incluir código de outro projeto que tem seu próprio repositório.
      </p>

      <AlertBox type="warning" title="Submódulos são complexos">
        Submódulos são poderosos mas têm uma curva de aprendizado acentuada. Para a maioria dos casos de uso, ferramentas como npm, yarn ou pip são mais simples. Use submódulos apenas quando realmente precisar.
      </AlertBox>

      <h2>Adicionando um Submódulo</h2>
      <CodeBlock
        title="Como adicionar um submódulo"
        code={`# Adicionar um repositório como submódulo
git submodule add https://github.com/usuario/biblioteca.git libs/biblioteca

# Isso cria:
# - A pasta libs/biblioteca com o código
# - O arquivo .gitmodules com a configuração

# Ver o arquivo .gitmodules
cat .gitmodules
# [submodule "libs/biblioteca"]
#     path = libs/biblioteca
#     url = https://github.com/usuario/biblioteca.git

# Commitar a adição do submódulo
git add .gitmodules libs/biblioteca
git commit -m "chore: adiciona submódulo biblioteca"`}
      />

      <h2>Clonando com Submódulos</h2>
      <CodeBlock
        title="Clone que inclui submódulos"
        code={`# Clonar e já inicializar os submódulos
git clone --recurse-submodules https://github.com/usuario/projeto.git

# Se você já clonou sem os submódulos
git submodule init
git submodule update

# Forma mais moderna (equivalente ao init + update)
git submodule update --init --recursive`}
      />

      <h2>Atualizando Submódulos</h2>
      <CodeBlock
        title="Mantendo submódulos atualizados"
        code={`# Atualizar todos os submódulos para o commit mais recente
git submodule update --remote

# Atualizar um submódulo específico
git submodule update --remote libs/biblioteca

# Ver o status dos submódulos
git submodule status

# Entrar no submódulo e fazer operações Git normalmente
cd libs/biblioteca
git pull origin main
cd ../../

# O repositório pai vê o submódulo como modificado
git status
git add libs/biblioteca
git commit -m "chore: atualiza submódulo biblioteca para v2.0"`}
      />

      <h2>Removendo um Submódulo</h2>
      <CodeBlock
        title="Como remover um submódulo"
        code={`# 1. Desinicializar o submódulo
git submodule deinit -f libs/biblioteca

# 2. Remover do .git/modules
rm -rf .git/modules/libs/biblioteca

# 3. Remover a pasta
git rm -f libs/biblioteca

# 4. Commitar
git commit -m "chore: remove submódulo biblioteca"`}
      />

      <h2>Executando Comandos em Todos os Submódulos</h2>
      <CodeBlock
        title="foreach — rodar comandos em todos os submódulos"
        code={`# Rodar git pull em todos os submódulos
git submodule foreach git pull origin main

# Rodar qualquer comando em todos os submódulos
git submodule foreach 'echo "=== $name ===" && git status'

# Rodar recursivamente (submódulos de submódulos)
git submodule foreach --recursive git fetch`}
      />
    </PageContainer>
  );
}
