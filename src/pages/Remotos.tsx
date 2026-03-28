import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Remotos() {
  return (
    <PageContainer
      title="Repositórios Remotos"
      subtitle="Como conectar seu repositório local a servidores remotos como GitHub, GitLab e Bitbucket."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <p>
        Um repositório remoto é uma versão do seu projeto hospedada na internet ou em uma rede local. É onde você sincroniza o trabalho com colaboradores e mantém um backup seguro do código.
      </p>

      <h2>Gerenciando Remotos</h2>
      <CodeBlock
        title="Comandos básicos para remotos"
        code={`# Ver os remotos configurados
git remote -v

# Saída típica:
# origin  https://github.com/usuario/projeto.git (fetch)
# origin  https://github.com/usuario/projeto.git (push)

# Adicionar um novo remoto
git remote add origin https://github.com/usuario/projeto.git

# Adicionar um segundo remoto (útil para forks)
git remote add upstream https://github.com/original/projeto.git

# Ver informações detalhadas de um remoto
git remote show origin`}
      />

      <h2>O Remoto "origin"</h2>
      <p>
        Por convenção, o remoto principal é chamado de <strong>origin</strong>. Quando você clona um repositório, o Git automaticamente cria um remoto chamado "origin" apontando para o repositório de origem.
      </p>

      <h2>Modificando Remotos</h2>
      <CodeBlock
        title="Editando configuração de remotos"
        code={`# Renomear um remoto
git remote rename origin github

# Remover um remoto
git remote remove upstream

# Alterar a URL de um remoto existente
git remote set-url origin https://github.com/novo-usuario/projeto.git

# Útil quando você muda o repo para uma organização no GitHub
git remote set-url origin git@github.com:organizacao/projeto.git`}
      />

      <h2>HTTPS vs SSH</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">HTTPS</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Funciona em qualquer lugar</li>
            <li>• Pede usuário/senha (ou token)</li>
            <li>• Mais fácil de configurar</li>
            <li>• Recomendado para iniciantes</li>
          </ul>
          <code className="text-xs block mt-2">https://github.com/usuario/repo.git</code>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">SSH</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Autenticação via chave criptográfica</li>
            <li>• Não precisa de senha no push/pull</li>
            <li>• Mais seguro</li>
            <li>• Requer configuração inicial</li>
          </ul>
          <code className="text-xs block mt-2">git@github.com:usuario/repo.git</code>
        </div>
      </div>

      <h2>Configurando SSH para GitHub</h2>
      <CodeBlock
        title="Criando e adicionando chave SSH"
        code={`# Gerar um par de chaves SSH
ssh-keygen -t ed25519 -C "seu@email.com"
# Pressione Enter para aceitar os padrões

# Iniciar o agente SSH
eval "$(ssh-agent -s)"

# Adicionar a chave ao agente
ssh-add ~/.ssh/id_ed25519

# Copiar a chave pública (adicione esta no GitHub)
cat ~/.ssh/id_ed25519.pub

# Testar a conexão com o GitHub
ssh -T git@github.com
# Esperado: "Hi username! You've successfully authenticated..."`}
      />

      <AlertBox type="info" title="Token de Acesso Pessoal">
        O GitHub não aceita mais senha simples para HTTPS desde 2021. Você precisa criar um <strong>Personal Access Token (PAT)</strong> em Configurações → Developer settings → Personal access tokens. Use o token como senha quando o Git solicitar.
      </AlertBox>

      <h2>Branches de Rastreamento</h2>
      <CodeBlock
        title="Entendendo origin/main"
        code={`# Branches remotos aparecem como 'origin/main', 'origin/dev', etc.
git branch -r   # ver branches remotos
git branch -a   # ver todos (local + remoto)

# O Git mantém cópias locais dos branches remotos
# Elas são atualizadas com git fetch
git fetch origin

# Ver diferença entre local e remoto
git diff main origin/main`}
      />
    </PageContainer>
  );
}
