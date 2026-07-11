import{j as e,L as i}from"./index-By_zGcNR.js";import{P as o,A as a,C as s}from"./AlertBox-CZTB6a28.js";function t(){return e.jsxs(o,{title:"Assinatura de Commits",subtitle:"Prove que foi você quem fez o commit. GPG e SSH signing — o selo 'Verified' do GitHub e por que ele importa.",difficulty:"avancado",timeToRead:"11 min",children:[e.jsx(a,{type:"info",title:"Pré-requisitos",children:"Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá."}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Commit signing"})," "," — "," ","assina commits com GPG ou SSH."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"gpg-key"})," "," — "," ","gera com gpg --full-generate-key; configure user.signingkey."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SSH signing (Git 2.34+)"})," "," — "," ","reusa sua chave SSH para assinar."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Verified badge"})," "," — "," ",'GitHub mostra "Verified" se assinatura bate.']}),e.jsxs("li",{children:[e.jsx("strong",{children:"commit.gpgsign true"})," "," — "," ","assina automaticamente."]})]}),e.jsxs("p",{children:["Por padrão, qualquer pessoa pode criar um commit no ",e.jsx("em",{children:"seu"})," nome — basta configurar ",e.jsx("code",{children:"user.name"})," e ",e.jsx("code",{children:"user.email"})," com seus dados. ",e.jsx("strong",{children:"Assinatura criptográfica"})," resolve isso: cada commit (ou tag) carrega uma assinatura que só você consegue gerar, e qualquer um pode verificar."]}),e.jsxs(a,{type:"tip",title:"TL;DR",children:["Configure uma chave (GPG ou SSH), diga ao Git para usá-la (",e.jsx("code",{children:"commit.gpgsign true"}),"), e adicione a chave pública no GitHub. Pronto: seus commits ganham o selo verde ",e.jsx("strong",{children:"Verified"}),"."]}),e.jsx("h2",{children:"Por que assinar?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Autoria comprovada"}),' — ninguém pode forjar commits "como você".']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Integridade"})," — se alguém alterar o commit depois (até por accident), a assinatura quebra."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compliance"})," — empresas reguladas (finanças, saúde) frequentemente exigem assinatura."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Confiança em open source"})," — manutentores assinam tags de release para você poder verificar autenticidade."]})]}),e.jsxs(a,{type:"warning",title:"Email forjável",children:["Sem assinatura, eu posso clonar seu repo, configurar ",e.jsx("code",{children:'user.email = "voce@empresa.com"'})," e empurrar commits que aparecem como seus no GitHub. Assinatura previne isso."]}),e.jsx("h2",{children:"SSH signing (mais simples — recomendado)"}),e.jsxs("p",{children:["Desde o Git 2.34 dá pra assinar com a ",e.jsx("em",{children:"mesma chave SSH"})," que você já usa para autenticar no GitHub. Sem GPG, sem keyring, sem complicação."]}),e.jsx(s,{title:"Configurar SSH signing",language:"bash",code:`# 1. Você já tem uma chave SSH? (geralmente sim)
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
`}),e.jsx("h3",{children:"Adicionar a chave como signing key no GitHub"}),e.jsxs("p",{children:["Não basta a chave estar cadastrada como ",e.jsx("em",{children:"auth key"}),": ela precisa ser também ",e.jsx("em",{children:"signing key"}),". São cadastros separados."]}),e.jsxs("ol",{children:[e.jsxs("li",{children:["GitHub → ",e.jsx("strong",{children:"Settings → SSH and GPG keys"})]}),e.jsxs("li",{children:["Clique ",e.jsx("strong",{children:"New SSH key"})]}),e.jsxs("li",{children:["Em ",e.jsx("strong",{children:"Key type"}),", escolha ",e.jsx("code",{children:"Signing Key"})," (não Authentication)"]}),e.jsxs("li",{children:["Cole o conteúdo de ",e.jsx("code",{children:"~/.ssh/id_ed25519.pub"})]})]}),e.jsx(s,{title:"allowed_signers (verificação local)",language:"bash",code:`# Para o Git verificar localmente (git log --show-signature),
# crie um arquivo de signers confiáveis
mkdir -p ~/.config/git
echo "voce@email.com $(cat ~/.ssh/id_ed25519.pub)" >> ~/.config/git/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.config/git/allowed_signers

# Agora git log mostra "Good signature"
git log --show-signature -3
`}),e.jsx("h2",{children:"GPG signing (clássico)"}),e.jsx("p",{children:"GPG (GnuPG) é a forma tradicional. Mais complicada que SSH, mas suportada em qualquer versão do Git e amplamente usada em open source."}),e.jsx(s,{title:"Gerar e configurar chave GPG",language:"bash",code:`# 1. Gerar chave (escolha RSA 4096 ou ed25519)
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
`}),e.jsx("h3",{children:"Cadastrar GPG no GitHub"}),e.jsxs("p",{children:["Settings → SSH and GPG keys → ",e.jsx("strong",{children:"New GPG key"})," → cole a saída de ",e.jsx("code",{children:"gpg --armor --export <ID>"})," (incluindo as linhas ",e.jsx("code",{children:"BEGIN/END PGP PUBLIC KEY BLOCK"}),")."]}),e.jsx("h2",{children:"Verificando commits assinados"}),e.jsx(s,{title:"Inspeção local",language:"bash",code:`# Ver assinatura do último commit
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
`}),e.jsx("h2",{children:"Assinando commits antigos (rebase)"}),e.jsx(s,{title:"Re-assinar histórico já feito",language:"bash",code:`# Re-assinar os últimos N commits (vai rescrever hashes!)
git rebase --exec 'git commit --amend --no-edit -S' -i HEAD~10

# Ou para TODO o histórico (perigoso em repo compartilhado)
git rebase --exec 'git commit --amend --no-edit -S' --root
`}),e.jsxs(a,{type:"danger",title:"Histórico mudou",children:["Re-assinar reescreve commits, ou seja, muda os hashes. Só faça isso em branches que ",e.jsx("strong",{children:"você"})," controla, antes do push, ou avise o time inteiro antes de force-push. Veja ",e.jsx(i,{href:"/rebase",className:"text-primary underline",children:"rebase"}),"."]}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:'"gpg failed to sign the data"'})," → falta ",e.jsx("code",{children:"export GPG_TTY=$(tty)"})," ou o pinentry não está configurado."]}),e.jsxs("li",{children:[e.jsx("strong",{children:'Commit assinado mas GitHub mostra "Unverified"'})," → email do commit não bate com email cadastrado na GPG/SSH key, OU a chave foi cadastrada apenas como Authentication, não como Signing."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Chave SSH expirou no GitHub"})," → você precisa cadastrar como Signing Key separadamente, mesmo que já exista como Auth Key."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Múltiplos identidades"})," (trabalho/pessoal) → use ",e.jsx("code",{children:"includeIf"})," no ",e.jsx("code",{children:"~/.gitconfig"})," apontando ",e.jsx("code",{children:"user.signingkey"})," diferente por pasta."]})]}),e.jsx("h2",{children:"Forçar assinatura no servidor"}),e.jsxs("p",{children:["No GitHub, em ",e.jsx("strong",{children:"Settings → Branches → Branch protection rules"}),", marque ",e.jsx("em",{children:'"Require signed commits"'}),". Pushes sem assinatura serão rejeitados — ótima política para branches de produção."]}),e.jsx("h2",{children:"Cheat-sheet"}),e.jsx(s,{title:"Comandos essenciais",language:"bash",code:`# Status da config
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
`}),e.jsx("h2",{children:"Próximos passos"}),e.jsxs("p",{children:["Com commits assinados, sua autoria fica criptograficamente comprovada. Continue para ",e.jsx(i,{href:"/conventional-commits",className:"text-primary underline",children:"Conventional Commits"})," (padronizar mensagens), ",e.jsx(i,{href:"/tags",className:"text-primary underline",children:"Tags"})," (assinar releases) ou ",e.jsx(i,{href:"/hooks",className:"text-primary underline",children:"Hooks"})," (forçar boas práticas localmente)."]})]})}export{t as default};
