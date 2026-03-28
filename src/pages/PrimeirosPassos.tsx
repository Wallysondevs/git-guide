import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PrimeirosPassos() {
  return (
    <PageContainer
      title="Primeiros Passos"
      subtitle="Aprenda o fluxo básico do Git: criar um repositório, fazer alterações e registrá-las com commits."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <p>
        Agora que o Git está instalado e configurado, vamos criar nosso primeiro repositório e entender o fluxo básico de trabalho: modificar arquivos → preparar mudanças → commitar.
      </p>

      <h2>Criando seu Primeiro Repositório</h2>
      <CodeBlock
        title="Iniciando um repositório do zero"
        code={`# Crie uma pasta para o projeto
mkdir meu-projeto
cd meu-projeto

# Inicializa o repositório Git
git init

# O Git cria uma pasta oculta '.git' que guarda todo o histórico
ls -la  # Você verá a pasta .git`}
      />

      <AlertBox type="info" title="O que é a pasta .git?">
        A pasta <code>.git</code> contém tudo que o Git precisa: histórico de commits, branches, configurações locais e muito mais. Nunca delete essa pasta ou você perderá todo o histórico do repositório.
      </AlertBox>

      <h2>O Fluxo Básico do Git</h2>
      <p>
        O fluxo de trabalho no Git segue sempre o mesmo padrão:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5 text-center">
          <div className="text-2xl mb-2">✏️</div>
          <h4 className="font-bold mb-2 border-0 mt-0">1. Modificar</h4>
          <p className="text-sm text-muted-foreground">Edite, crie ou delete arquivos no seu diretório de trabalho.</p>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5 text-center">
          <div className="text-2xl mb-2">📦</div>
          <h4 className="font-bold mb-2 border-0 mt-0">2. Preparar (Stage)</h4>
          <p className="text-sm text-muted-foreground">Selecione quais mudanças vão no próximo commit com <code>git add</code>.</p>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5 text-center">
          <div className="text-2xl mb-2">💾</div>
          <h4 className="font-bold mb-2 border-0 mt-0">3. Commitar</h4>
          <p className="text-sm text-muted-foreground">Salve permanentemente as mudanças no histórico com <code>git commit</code>.</p>
        </div>
      </div>

      <CodeBlock
        title="Seu primeiro commit"
        code={`# Crie um arquivo
echo "# Meu Projeto" > README.md

# Veja o status do repositório
git status

# Adicione o arquivo à staging area
git add README.md

# Verifique o status novamente
git status

# Faça o primeiro commit
git commit -m "Adiciona README inicial"

# Veja o histórico de commits
git log`}
      />

      <h2>Entendendo o git status</h2>
      <p>
        O comando <code>git status</code> é seu melhor amigo. Ele mostra o estado atual do repositório: quais arquivos foram modificados, quais estão na staging area e quais não estão sendo rastreados.
      </p>

      <CodeBlock
        title="Interpretando o git status"
        code={`$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   README.md        # Na staging area

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app.js            # Modificado, mas não staged

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        temp.txt                      # Arquivo novo, não rastreado`}
      />

      <h2>Adicionando Arquivos</h2>
      <CodeBlock
        title="Diferentes formas de usar git add"
        code={`# Adicionar um arquivo específico
git add arquivo.txt

# Adicionar vários arquivos
git add arquivo1.txt arquivo2.js

# Adicionar todos os arquivos modificados e novos
git add .

# Adicionar todos os arquivos com uma extensão
git add *.js

# Adicionar de forma interativa (escolhe linha a linha)
git add -p`}
      />

      <h2>Fazendo Commits</h2>
      <CodeBlock
        title="Fazendo o commit"
        code={`# Commit simples com mensagem
git commit -m "Descrição breve do que foi feito"

# Commit com mensagem mais detalhada (abre o editor)
git commit

# Adicionar todos os arquivos JÁ RASTREADOS e commitar de uma vez
# (não inclui arquivos novos/não rastreados)
git commit -am "Corrige bug no formulário de login"

# Alterar a mensagem do último commit (antes de fazer push)
git commit --amend -m "Nova mensagem corrigida"`}
      />

      <AlertBox type="warning" title="Boas Mensagens de Commit">
        Uma boa mensagem de commit deve explicar <strong>o quê</strong> e <strong>por quê</strong> foi feito, não como. Use o imperativo: "Adiciona", "Corrige", "Remove", "Refatora" ao invés de "Adicionado", "Corrigi".
      </AlertBox>

      <h2>Vendo o Histórico</h2>
      <CodeBlock
        title="Navegando pelo histórico"
        code={`# Histórico completo
git log

# Histórico resumido (uma linha por commit)
git log --oneline

# Histórico com gráfico de branches
git log --oneline --graph --all

# Últimos 5 commits
git log -5

# Commits de um autor específico
git log --author="Seu Nome"

# Commits que modificaram um arquivo
git log -- arquivo.txt`}
      />

      <AlertBox type="success" title="Parabéns!">
        Você já sabe o fluxo básico do Git: <code>git add</code> → <code>git commit</code> → <code>git log</code>. Isso é suficiente para trabalhar em projetos pessoais. Nas próximas seções, aprenderemos sobre branches, colaboração e recursos avançados.
      </AlertBox>
    </PageContainer>
  );
}
