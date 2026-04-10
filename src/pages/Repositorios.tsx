import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Repositorios() {
    return (
      <PageContainer
        title="Repositórios"
        subtitle="Crie, clone e configure repositórios Git do zero com as melhores práticas."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          Um repositório Git é um diretório que contém seu projeto e a pasta <code>.git/</code> onde todo o histórico é armazenado. Você pode criar um repositório do zero ou clonar um existente.
        </p>

        <h2>Criando repositórios</h2>
        <CodeBlock
          title="Inicializar e criar repositórios"
          code={`# Criar repositório no diretório atual
  git init

  # Criar repositório em novo diretório
  git init meu-projeto

  # Criar repositório bare (servidor — sem working directory)
  git init --bare projeto.git

  # Clonar repositório existente
  git clone https://github.com/usuario/projeto.git

  # Clonar em diretório específico
  git clone https://github.com/usuario/projeto.git minha-pasta

  # Clonar apenas o último commit (shallow clone — mais rápido)
  git clone --depth 1 https://github.com/usuario/projeto.git

  # Clonar branch específico
  git clone -b develop https://github.com/usuario/projeto.git`}
        />

        <h2>Estrutura de um repositório Git</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Caminho</th>
                <th className="p-3 text-left">Conteúdo</th>
              </tr>
            </thead>
            <tbody>
              {[
                [".git/", "O repositório Git em si — todo o histórico e configuração"],
                [".git/objects/", "Todos os objetos (commits, trees, blobs, tags)"],
                [".git/refs/", "Referências: branches (heads) e tags"],
                [".git/HEAD", "Ponteiro para o branch atual"],
                [".git/config", "Configuração local do repositório"],
                [".git/COMMIT_EDITMSG", "Última mensagem de commit (para edição)"],
                [".git/index", "Staging area (índice)"],
                [".git/hooks/", "Scripts de hooks locais"],
              ].map(([caminho, conteudo], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{caminho}</td>
                  <td className="p-3 text-muted-foreground text-sm">{conteudo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Configurando novo repositório no GitHub</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { n: "1", acao: "Crie no GitHub", desc: "Em github.com/new — escolha nome, visibilidade (público/privado), adicione README e .gitignore se quiser." },
            { n: "2", acao: "Clone ou conecte local", desc: "Se criou no GitHub: git clone <url>. Se tem projeto local: git remote add origin <url>" },
            { n: "3", acao: "Configurar branch principal", desc: "Certifique que o branch se chama 'main': git branch -M main" },
            { n: "4", acao: "Push inicial", desc: "git push -u origin main" },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-1">{item.acao}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock
          title="Conectar projeto local ao GitHub"
          code={`# 1. Inicializar (se ainda não é repositório)
  git init

  # 2. Criar commit inicial
  git add .
  git commit -m "chore: commit inicial"

  # 3. Renomear branch para main (se necessário)
  git branch -M main

  # 4. Conectar ao GitHub
  git remote add origin https://github.com/usuario/projeto.git
  # ou SSH:
  git remote add origin git@github.com:usuario/projeto.git

  # 5. Push inicial
  git push -u origin main`}
        />

        <h2>Tipos de repositório</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { tipo: "Repositório local", desc: "Apenas na sua máquina. Sem colaboração. Útil para projetos pessoais ou experimentação.", cmd: "git init" },
            { tipo: "Repositório remoto", desc: "Hospedado no GitHub, GitLab, Bitbucket etc. Permite colaboração e backup.", cmd: "git clone <url>" },
            { tipo: "Bare repository", desc: "Sem working directory — só o histórico. Usado como servidor central em ambientes privados.", cmd: "git init --bare" },
          ].map((item) => (
            <div key={item.tipo} className="p-4 border border-border rounded-xl bg-card">
              <h4 className="font-bold mb-1 mt-0 border-0 text-sm">{item.tipo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs text-primary">{item.cmd}</code>
            </div>
          ))}
        </div>

        <AlertBox type="info" title="Arquivando e transferindo repositórios">
          Para arquivar um repositório no GitHub (somente leitura): Settings → Archive this repository. Para transferir para outra conta: Settings → Transfer. Para criar um bundle portável: <code>git bundle create repo.bundle --all</code>
        </AlertBox>
      </PageContainer>
    );
  }
  