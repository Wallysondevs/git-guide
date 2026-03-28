import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Clone() {
  return (
    <PageContainer
      title="Clone"
      subtitle="Como baixar um repositório completo com todo seu histórico com git clone."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <p>
        O <code>git clone</code> cria uma cópia completa de um repositório remoto na sua máquina local, incluindo todo o histórico de commits, branches e tags.
      </p>

      <h2>Clonando um Repositório</h2>
      <CodeBlock
        title="Como clonar repositórios"
        code={`# Clonar via HTTPS
git clone https://github.com/usuario/projeto.git

# Clonar via SSH (requer chave SSH configurada)
git clone git@github.com:usuario/projeto.git

# Clonar em um diretório com nome diferente
git clone https://github.com/usuario/projeto.git meu-nome-local

# Clonar em um diretório específico
git clone https://github.com/usuario/projeto.git /caminho/para/diretorio`}
      />

      <h2>Opções de Clone</h2>
      <CodeBlock
        title="Clones especializados"
        code={`# Clone raso — apenas o histórico mais recente (mais rápido)
git clone --depth 1 https://github.com/usuario/projeto.git

# Clone apenas um branch específico
git clone --branch main --single-branch https://github.com/usuario/projeto.git

# Clone sem os arquivos (bare) — para servidores
git clone --bare https://github.com/usuario/projeto.git projeto.git

# Clone com submódulos incluídos
git clone --recurse-submodules https://github.com/usuario/projeto.git`}
      />

      <AlertBox type="info" title="Clone raso (shallow clone)">
        <code>--depth 1</code> é excelente para CI/CD ou quando você só precisa do código mais recente. O download é muito mais rápido em repositórios com histórico longo. Para converter para clone completo depois: <code>git fetch --unshallow</code>.
      </AlertBox>

      <h2>O que acontece após o Clone</h2>
      <CodeBlock
        title="Explorando o repositório clonado"
        code={`# Entre no diretório
cd projeto

# O remoto 'origin' foi automaticamente configurado
git remote -v

# Todos os branches remotos estão disponíveis
git branch -a

# O branch padrão (main/master) já está ativo
git status
git log --oneline -10`}
      />

      <h2>Clonando com Credenciais</h2>
      <CodeBlock
        title="Clone de repositório privado"
        code={`# Via HTTPS com token (GitHub)
git clone https://TOKEN@github.com/usuario/repo-privado.git

# Via SSH (recomendado para repos privados)
git clone git@github.com:usuario/repo-privado.git

# Com credenciais salvas no sistema
git config --global credential.helper store
# Na primeira vez, o Git pedirá usuário/senha
# Nas próximas, usará automaticamente`}
      />
    </PageContainer>
  );
}
