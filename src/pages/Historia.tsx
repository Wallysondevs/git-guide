import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Historia() {
  return (
    <PageContainer
      title="O que é Git"
      subtitle="Por que o Git existe, como ele pensa e o que torna ele diferente de tudo que veio antes."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"2005"}</strong> {' — '} {"Linus Torvalds cria Git para o kernel Linux após briga com BitKeeper."}
          </li>
        <li>
            <strong>{"DVCS"}</strong> {' — '} {"sistema distribuído — todo clone é um repo completo."}
          </li>
        <li>
            <strong>{"Hashing"}</strong> {' — '} {"SHA-1 detecta qualquer corrupção; transição para SHA-256 em curso."}
          </li>
        <li>
            <strong>{"Plumbing vs porcelain"}</strong> {' — '} {"baixo nível (hash-object) vs alto nível (commit)."}
          </li>
        <li>
            <strong>{"10 dias"}</strong> {' — '} {"Linus escreveu a versão inicial em ~10 dias."}
          </li>
        </ul>
        <p>
        <strong>Git</strong> é um sistema de controle de versão distribuído criado em 2005 por <strong>Linus Torvalds</strong> — o mesmo do kernel Linux. Ele nasceu de uma necessidade prática: o BitKeeper (usado no kernel) deixou de ser gratuito, e nenhum sistema existente atendia aos requisitos de velocidade, integridade e descentralização que o Linux exigia.
      </p>

      <AlertBox type="tip" title="TL;DR — em uma frase">
        Git é uma <strong>máquina de tirar snapshots</strong> do seu projeto, indexados por um hash criptográfico, que pode ser sincronizada com qualquer cópia de qualquer lugar — sem servidor central obrigatório.
      </AlertBox>

      <h2>O problema que o Git resolve</h2>
      <p>
        Antes do Git, a maior parte do mundo usava SVN ou CVS — sistemas <em>centralizados</em>, onde todo commit precisava falar com um servidor. Isso significava: lentidão, dependência de rede, branches caros e merges sofríveis. O Git inverteu isso: <strong>cada clone é um repositório completo</strong>, com todo o histórico, e operações são locais.
      </p>

      <h2>Como o Git pensa: snapshots, não diffs</h2>
      <p>
        Esta é a virada de chave conceitual mais importante. SVN/CVS armazenam <em>diferenças</em> entre versões. O Git armazena <strong>fotografias inteiras</strong> do projeto (deduplicadas via hash). Cada commit é um snapshot completo da árvore de arquivos.
      </p>

      <CodeBlock
        title="Visualizando a estrutura interna"
        language="bash"
        code={`# Cada commit aponta para uma árvore (snapshot) e seus pais
git cat-file -p HEAD
# tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
# parent 7c54f9e2...
# author Você <voce@exemplo.com> 1730000000 -0300
# committer Você <voce@exemplo.com> 1730000000 -0300
#
# feat: adiciona login
`}
      />

      <h2>Os 3 estados de um arquivo</h2>
      <p>O modelo mental fundamental do Git:</p>
      <ul>
        <li><strong>Working directory</strong> — seus arquivos como você os vê no disco.</li>
        <li><strong>Staging area (index)</strong> — o que está preparado para o próximo commit.</li>
        <li><strong>Repositório (.git)</strong> — o histórico permanente de snapshots.</li>
      </ul>

      <CodeBlock
        title="O fluxo dos 3 estados"
        language="bash"
        code={`# editar arquivo  →  working directory (modified)
git add arquivo.js          # → staging area (staged)
git commit -m "msg"         # → repositório (.git/objects)
`}
      />

      <h2>Por que distribuído importa</h2>
      <ul>
        <li><strong>Funciona offline</strong> — você commita, faz branch, vê histórico, tudo sem internet.</li>
        <li><strong>Backup automático</strong> — cada clone é uma cópia completa do repositório.</li>
        <li><strong>Branches baratos</strong> — criar um branch é só escrever 41 bytes em um arquivo.</li>
        <li><strong>Sem ponto único de falha</strong> — qualquer clone pode virar o "central".</li>
      </ul>

      <h2>Hashes SHA-1: integridade por design</h2>
      <p>
        Cada objeto no Git (commit, árvore, blob) é identificado por um hash SHA-1 (40 caracteres hex). Mudar um único byte muda o hash. Isso significa que <strong>é matematicamente impossível</strong> alterar o histórico sem que apareça.
      </p>

      <CodeBlock
        title="O hash é o identificador"
        language="bash"
        code={`git log --oneline -3
# a1b2c3d (HEAD -> main) feat: adiciona login
# 9f8e7d6 fix: corrige cálculo de desconto
# 5e4f3a2 chore: setup inicial

# Você pode usar prefixos do hash (mínimo 4 chars, geralmente 7-8 são únicos)
git show a1b2c3d
`}
      />

      <AlertBox type="note" title="SHA-1 vs SHA-256">
        O Git já suporta SHA-256 desde a versão 2.29 (<code>git init --object-format=sha256</code>), mas SHA-1 ainda é o padrão por compatibilidade. Para repositórios pessoais e da maioria das empresas, SHA-1 é mais que suficiente.
      </AlertBox>

      <h2>O que Git NÃO é</h2>
      <ul>
        <li><strong>Não é GitHub.</strong> GitHub é uma plataforma de hospedagem; Git funciona perfeitamente sem ele (GitLab, Bitbucket, ou só local).</li>
        <li><strong>Não é backup completo.</strong> Branches não-publicados moram só na sua máquina.</li>
        <li><strong>Não é bom para arquivos binários grandes.</strong> Para isso veja <Link href="/lfs">Git LFS</Link>.</li>
        <li><strong>Não rastreia diretórios vazios.</strong> Convencionalmente coloca-se um <code>.gitkeep</code>.</li>
      </ul>

      <h2>Linha do tempo</h2>
      <CodeBlock
        title="Marcos da história"
        language="markdown"
        code={`2005-04 — Linus inicia o Git em ~10 dias após perda do BitKeeper
2005-06 — kernel do Linux migra oficialmente para Git
2008-04 — GitHub é lançado, popularizando o Git globalmente
2014    — Git ultrapassa SVN como VCS mais usado no mundo
2020    — Suporte experimental a SHA-256 (Git 2.29)
2024+   — Sparse checkout, partial clone, scalar — escala de monorepo
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/instalacao">Instalação e Setup</Link> — configure o Git na sua máquina</li>
        <li><Link href="/primeiros-passos">Primeiros Passos</Link> — seu primeiro repositório em 5 minutos</li>
        <li><Link href="/staging">Staging Area</Link> — entenda o conceito mais característico do Git</li>
      </ul>
    </PageContainer>
  );
}
