import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Clone() {
    return (
      <PageContainer
        title="git clone"
        subtitle="Baixe repositórios completos com todo o histórico, branches e tags em um único comando."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          O <code>git clone</code> cria uma cópia completa de um repositório remoto na sua máquina local, incluindo todo o histórico de commits, branches e tags. É o ponto de partida para trabalhar em qualquer projeto existente.
        </p>

        <h2>Clonando um repositório</h2>
        <CodeBlock
          title="Formas de clonar"
          code={`# Clonar via HTTPS (mais simples, pede senha)
  git clone https://github.com/usuario/projeto.git

  # Clonar via SSH (recomendado, sem senha após configurar chave)
  git clone git@github.com:usuario/projeto.git

  # Clonar em um diretório com nome diferente
  git clone https://github.com/usuario/projeto.git meu-projeto

  # Clonar em um diretório específico
  git clone https://github.com/usuario/projeto.git /home/user/projetos/meu-app`}
        />

        <h2>Opções essenciais de clone</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Opção</th>
                <th className="p-3 text-left">Efeito</th>
                <th className="p-3 text-left">Quando usar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--depth 1", "Clona apenas o commit mais recente", "CI/CD, Docker builds, leitura rápida"],
                ["--branch nome", "Clona e faz checkout de um branch específico", "Quando só precisa de um branch"],
                ["--single-branch", "Não baixa histórico de outros branches", "Combinado com --branch para economizar"],
                ["--bare", "Sem working tree (só .git)", "Servidor Git, mirrors"],
                ["--mirror", "Clone completo incluindo refs de server-side", "Backup e mirrors completos"],
                ["--recurse-submodules", "Inicializa submódulos automaticamente", "Projetos com git submodules"],
                ["--shallow-since=data", "Histórico a partir de uma data", "Histórico parcial com contexto temporal"],
              ].map(([opt, efeito, quando], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{opt}</td>
                  <td className="p-3 text-muted-foreground text-sm">{efeito}</td>
                  <td className="p-3 text-sm">{quando}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          title="Clones especializados"
          code={`# Clone raso — só o histórico mais recente (muito mais rápido)
  git clone --depth 1 https://github.com/usuario/projeto.git

  # Clone de branch específico sem outros branches
  git clone --branch develop --single-branch https://github.com/usuario/projeto.git

  # Clone sem working tree (para servidores Git)
  git clone --bare https://github.com/usuario/projeto.git projeto.git

  # Clone com submódulos incluídos
  git clone --recurse-submodules https://github.com/usuario/projeto.git

  # Converter clone raso em clone completo depois
  git fetch --unshallow`}
        />

        <AlertBox type="info" title="Clone raso (shallow clone) para CI/CD">
          <code>--depth 1</code> é excelente para pipelines de CI/CD onde você só precisa do código mais recente. Um repositório com 10 anos de histórico pode ter centenas de MB — o clone raso baixa apenas MB. Para converter para clone completo depois: <code>git fetch --unshallow</code>.
        </AlertBox>

        <h2>O que acontece após o clone</h2>
        <CodeBlock
          title="Explorando o repositório clonado"
          code={`# Entre no diretório criado
  cd projeto

  # O remoto 'origin' foi configurado automaticamente
  git remote -v
  # origin  https://github.com/usuario/projeto.git (fetch)
  # origin  https://github.com/usuario/projeto.git (push)

  # Todos os branches remotos estão disponíveis
  git branch -a
  # * main
  #   remotes/origin/HEAD -> origin/main
  #   remotes/origin/develop
  #   remotes/origin/feature/login

  # Fazer checkout de um branch remoto
  git switch develop
  # Branch 'develop' set up to track remote branch 'develop' from 'origin'.

  # Ver histórico
  git log --oneline -10`}
        />

        <h2>Clonando repositórios privados</h2>
        <CodeBlock
          title="Clone com autenticação"
          code={`# Via HTTPS com Personal Access Token (GitHub)
  git clone https://TOKEN@github.com/usuario/repo-privado.git

  # Via SSH (recomendado para repos privados)
  # Primeiro configure a chave SSH:
  ssh-keygen -t ed25519 -C "seu@email.com"
  cat ~/.ssh/id_ed25519.pub  # Adicione no GitHub → Settings → SSH keys

  # Depois clone normalmente via SSH
  git clone git@github.com:usuario/repo-privado.git

  # Salvar credenciais HTTPS para não digitar sempre
  git config --global credential.helper store
  # Na próxima vez que pedir senha, salva automaticamente`}
        />

        <h2>Protocolo SSH vs HTTPS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">SSH</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Sem senha após configurar chave</li>
              <li>✅ Mais seguro para uso diário</li>
              <li>✅ Funciona com 2FA no GitHub</li>
              <li>❌ Requer configuração inicial</li>
              <li>❌ Pode ser bloqueado em firewalls corporativos</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-xl bg-card">
            <h4 className="font-bold mb-2 mt-0 border-0">HTTPS</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Funciona em qualquer rede</li>
              <li>✅ Configuração imediata</li>
              <li>✅ Não requer chave SSH</li>
              <li>❌ Pede token/senha frequentemente</li>
              <li>❌ Menos conveniente para uso diário</li>
            </ul>
          </div>
        </div>

        <h2>Solução de problemas comuns</h2>
        <CodeBlock
          title="Erros frequentes e soluções"
          code={`# Erro: Repository not found
  # → Verifique URL, caso, e se tem acesso ao repo

  # Erro: Permission denied (publickey)
  # → Configure chave SSH ou use HTTPS com token
  ssh -T git@github.com  # Testa conexão SSH

  # Erro: SSL certificate problem
  git clone -c http.sslVerify=false URL  # Temporário
  git config --global http.sslVerify false  # Global (cuidado)

  # Clone muito lento — use shallow
  git clone --depth 1 URL

  # Clonar apenas uma pasta específica (sparse checkout)
  git clone --filter=blob:none --sparse URL
  cd projeto
  git sparse-checkout set src/components`}
        />

        <AlertBox type="success" title="Dica: use SSH para projetos nos quais você contribui regularmente">
          Configure uma vez e esqueça — sem digitar senha em cada push. Para repositórios que você só lê (como dependências ou referências), HTTPS com clone raso é mais rápido e simples.
        </AlertBox>
      </PageContainer>
    );
  }
  