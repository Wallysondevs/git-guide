import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Signing() {
  return (
    <PageContainer
      title="Assinatura de Commits"
      subtitle="Prove que foi você quem fez o commit. GPG e SSH signing — o selo 'Verified' do GitHub e por que ele importa."
      difficulty="avancado"
      timeToRead="11 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Commit signing"}</strong> {' — '} {"assina commits com GPG ou SSH."}
          </li>
        <li>
            <strong>{"gpg-key"}</strong> {' — '} {"gera com gpg --full-generate-key; configure user.signingkey."}
          </li>
        <li>
            <strong>{"SSH signing (Git 2.34+)"}</strong> {' — '} {"reusa sua chave SSH para assinar."}
          </li>
        <li>
            <strong>{"Verified badge"}</strong> {' — '} {"GitHub mostra \"Verified\" se assinatura bate."}
          </li>
        <li>
            <strong>{"commit.gpgsign true"}</strong> {' — '} {"assina automaticamente."}
          </li>
        </ul>
        <p>
        Por padrão, qualquer pessoa pode criar um commit no <em>seu</em> nome — basta configurar <code>user.name</code> e <code>user.email</code> com seus dados. <strong>Assinatura criptográfica</strong> resolve isso: cada commit (ou tag) carrega uma assinatura que só você consegue gerar, e qualquer um pode verificar.
      </p>

      <AlertBox type="tip" title="TL;DR">
        Configure uma chave (GPG ou SSH), diga ao Git para usá-la (<code>commit.gpgsign true</code>), e adicione a chave pública no GitHub. Pronto: seus commits ganham o selo verde <strong>Verified</strong>.
      </AlertBox>

      <h2>Por que assinar?</h2>
      <ul>
        <li><strong>Autoria comprovada</strong> — ninguém pode forjar commits "como você".</li>
        <li><strong>Integridade</strong> — se alguém alterar o commit depois (até por accident), a assinatura quebra.</li>
        <li><strong>Compliance</strong> — empresas reguladas (finanças, saúde) frequentemente exigem assinatura.</li>
        <li><strong>Confiança em open source</strong> — manutentores assinam tags de release para você poder verificar autenticidade.</li>
      </ul>

      <AlertBox type="warning" title="Email forjável">
        Sem assinatura, eu posso clonar seu repo, configurar <code>user.email = "voce@empresa.com"</code> e empurrar commits que aparecem como seus no GitHub. Assinatura previne isso.
      </AlertBox>

      <h2>SSH signing (mais simples — recomendado)</h2>
      <p>
        Desde o Git 2.34 dá pra assinar com a <em>mesma chave SSH</em> que você já usa para autenticar no GitHub. Sem GPG, sem keyring, sem complicação.
      </p>

      <CodeBlock
        title="Configurar SSH signing"
        language="bash"
        code={`# 1. Você já tem uma chave SSH? (geralmente sim)
ls ~/.ssh/id_ed25519.pub
# Se não, gere uma:
ssh-keygen -t ed25519 -C "voce@email.com"

# 2. Diga ao Git para usar SSH (não GPG)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# 3. Ative assinatura por padrão em commits e tags
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# 4. Faça um commit assinado e verifique
git commit -am "primeiro commit assinado"
git log --show-signature -1
`}
      />

      <h3>Adicionar a chave como signing key no GitHub</h3>
      <p>
        Não basta a chave estar cadastrada como <em>auth key</em>: ela precisa ser também <em>signing key</em>. São cadastros separados.
      </p>
      <ol>
        <li>GitHub → <strong>Settings → SSH and GPG keys</strong></li>
        <li>Clique <strong>New SSH key</strong></li>
        <li>Em <strong>Key type</strong>, escolha <code>Signing Key</code> (não Authentication)</li>
        <li>Cole o conteúdo de <code>~/.ssh/id_ed25519.pub</code></li>
      </ol>

      <CodeBlock
        title="allowed_signers (verificação local)"
        language="bash"
        code={`# Para o Git verificar localmente (git log --show-signature),
# crie um arquivo de signers confiáveis
mkdir -p ~/.config/git
echo "voce@email.com $(cat ~/.ssh/id_ed25519.pub)" >> ~/.config/git/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.config/git/allowed_signers

# Agora git log mostra "Good signature"
git log --show-signature -3
`}
      />

      <h2>GPG signing (clássico)</h2>
      <p>
        GPG (GnuPG) é a forma tradicional. Mais complicada que SSH, mas suportada em qualquer versão do Git e amplamente usada em open source.
      </p>

      <CodeBlock
        title="Gerar e configurar chave GPG"
        language="bash"
        code={`# 1. Gerar chave (escolha RSA 4096 ou ed25519)
gpg --full-generate-key
# Tipo: (1) RSA and RSA
# Tamanho: 4096
# Validade: 2y (renove depois)
# Nome / email: precisam BATER com user.name / user.email do Git

# 2. Listar e pegar o ID
gpg --list-secret-keys --keyid-format=long
# sec   rsa4096/ABCDEF1234567890 2024-01-15 [SC]
#       ID é "ABCDEF1234567890"

# 3. Exportar a chave pública (vai pro GitHub)
gpg --armor --export ABCDEF1234567890

# 4. Configurar Git
git config --global user.signingkey ABCDEF1234567890
git config --global commit.gpgsign true
git config --global tag.gpgsign true
git config --global gpg.format openpgp   # padrão; só explicitando

# 5. Em macOS / Linux, pode precisar:
export GPG_TTY=$(tty)
echo 'export GPG_TTY=$(tty)' >> ~/.bashrc
`}
      />

      <h3>Cadastrar GPG no GitHub</h3>
      <p>
        Settings → SSH and GPG keys → <strong>New GPG key</strong> → cole a saída de <code>gpg --armor --export &lt;ID&gt;</code> (incluindo as linhas <code>BEGIN/END PGP PUBLIC KEY BLOCK</code>).
      </p>

      <h2>Verificando commits assinados</h2>
      <CodeBlock
        title="Inspeção local"
        language="bash"
        code={`# Ver assinatura do último commit
git log --show-signature -1

# Saída esperada (SSH):
# commit abc123...
# Good "git" signature for voce@email.com with ED25519 key SHA256:...
# Author: Você <voce@email.com>

# Ver assinaturas de todo o histórico
git log --show-signature

# Apenas a flag (G=good, B=bad, U=unknown, N=none)
git log --pretty="%h %G? %s"
# abc1234 G Adiciona feature de login   <- assinado e válido
# def5678 N Hotfix sem assinatura        <- não assinado
# 9876abc B Tentativa de forjar           <- BAD (assinatura quebrada)
`}
      />

      <h2>Assinando commits antigos (rebase)</h2>
      <CodeBlock
        title="Re-assinar histórico já feito"
        language="bash"
        code={`# Re-assinar os últimos N commits (vai rescrever hashes!)
git rebase --exec 'git commit --amend --no-edit -S' -i HEAD~10

# Ou para TODO o histórico (perigoso em repo compartilhado)
git rebase --exec 'git commit --amend --no-edit -S' --root
`}
      />

      <AlertBox type="danger" title="Histórico mudou">
        Re-assinar reescreve commits, ou seja, muda os hashes. Só faça isso em branches que <strong>você</strong> controla, antes do push, ou avise o time inteiro antes de force-push. Veja <Link href="/rebase" className="text-primary underline">rebase</Link>.
      </AlertBox>

      <h2>Armadilhas comuns</h2>
      <ul>
        <li><strong>"gpg failed to sign the data"</strong> → falta <code>export GPG_TTY=$(tty)</code> ou o pinentry não está configurado.</li>
        <li><strong>Commit assinado mas GitHub mostra "Unverified"</strong> → email do commit não bate com email cadastrado na GPG/SSH key, OU a chave foi cadastrada apenas como Authentication, não como Signing.</li>
        <li><strong>Chave SSH expirou no GitHub</strong> → você precisa cadastrar como Signing Key separadamente, mesmo que já exista como Auth Key.</li>
        <li><strong>Múltiplos identidades</strong> (trabalho/pessoal) → use <code>includeIf</code> no <code>~/.gitconfig</code> apontando <code>user.signingkey</code> diferente por pasta.</li>
      </ul>

      <h2>Forçar assinatura no servidor</h2>
      <p>
        No GitHub, em <strong>Settings → Branches → Branch protection rules</strong>, marque <em>"Require signed commits"</em>. Pushes sem assinatura serão rejeitados — ótima política para branches de produção.
      </p>

      <h2>Cheat-sheet</h2>
      <CodeBlock
        title="Comandos essenciais"
        language="bash"
        code={`# Status da config
git config --global --get-regexp '^(user|commit|tag|gpg)\\.'

# Assinar um commit pontual
git commit -S -m "mensagem"

# Assinar uma tag (sempre faça isso em releases)
git tag -s v1.0.0 -m "Release 1.0.0"
git tag -v v1.0.0    # verificar tag assinada

# Desativar pra um commit específico (raro)
git commit --no-gpg-sign -m "mensagem"

# Ver chaves GPG
gpg --list-secret-keys --keyid-format=long
gpg --list-keys

# Listar chaves SSH disponíveis
ssh-add -L
`}
      />

      <h2>Próximos passos</h2>
      <p>
        Com commits assinados, sua autoria fica criptograficamente comprovada. Continue para <Link href="/conventional-commits" className="text-primary underline">Conventional Commits</Link> (padronizar mensagens), <Link href="/tags" className="text-primary underline">Tags</Link> (assinar releases) ou <Link href="/hooks" className="text-primary underline">Hooks</Link> (forçar boas práticas localmente).
      </p>
    </PageContainer>
  );
}
