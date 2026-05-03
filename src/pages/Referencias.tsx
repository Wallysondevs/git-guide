import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Referencias() {
  return (
    <PageContainer
      title="Referências"
      subtitle="Documentação oficial, livros, ferramentas e cursos para continuar aprofundando seus conhecimentos em Git."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <p>
        Este guia cobriu o essencial e o avançado, mas Git é um universo. Aqui está uma curadoria dos melhores recursos para você continuar aprendendo — todos gratuitos ou padrão da indústria.
      </p>

      <AlertBox type="tip" title="Começando">
        Se você ainda está nas primeiras semanas: leia o <strong>Pro Git Book</strong> (gratuito, em português). Ele é o livro de referência do projeto Git.
      </AlertBox>

      <h2>📚 Livros e documentação oficial</h2>
      <ul>
        <li>
          <a href="https://git-scm.com/book/pt-br/v2" target="_blank" rel="noopener noreferrer"><strong>Pro Git Book</strong></a>{" "}
          — O livro oficial. Gratuito, em português, escrito pelo time do Git. <em>O melhor recurso único existente.</em>
        </li>
        <li>
          <a href="https://git-scm.com/docs" target="_blank" rel="noopener noreferrer"><strong>Git Reference Manual</strong></a>{" "}
          — A documentação oficial de cada comando. Quando quiser detalhes profundos.
        </li>
        <li>
          <a href="https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain" target="_blank" rel="noopener noreferrer"><strong>Git Internals</strong></a>{" "}
          — Capítulo do Pro Git sobre como o Git funciona por dentro. Esclarecedor.
        </li>
        <li>
          <a href="https://maryrosecook.com/blog/post/git-from-the-inside-out" target="_blank" rel="noopener noreferrer"><strong>Git From the Inside Out</strong></a>{" "}
          (Mary Rose Cook) — Tutorial profundo sobre objetos, refs e como o Git pensa.
        </li>
        <li>
          <a href="https://wizardzines.com/zines/oh-shit-git/" target="_blank" rel="noopener noreferrer"><strong>Oh Shit, Git!?!</strong></a>{" "}
          (Julia Evans) — Zine ilustrada para se virar quando algo dá errado.
        </li>
      </ul>

      <h2>🌐 Sites interativos</h2>
      <ul>
        <li>
          <a href="https://learngitbranching.js.org" target="_blank" rel="noopener noreferrer"><strong>Learn Git Branching</strong></a>{" "}
          — Aprenda branches/rebase/merge visualmente, em formato de jogo. <em>Excelente para iniciantes.</em>
        </li>
        <li>
          <a href="https://ohshitgit.com" target="_blank" rel="noopener noreferrer"><strong>Oh Shit, Git!</strong></a>{" "}
          — Site irmão do zine, com receitas para sair de enrascadas.
        </li>
        <li>
          <a href="https://dangitgit.com" target="_blank" rel="noopener noreferrer"><strong>Dangit, Git!</strong></a>{" "}
          — Versão "polida" do Oh Shit, mesma ideia.
        </li>
        <li>
          <a href="https://onlywei.github.io/explain-git-with-d3/" target="_blank" rel="noopener noreferrer"><strong>Explain Git with D3</strong></a>{" "}
          — Sandbox visual para ver o efeito de cada comando.
        </li>
        <li>
          <a href="https://git-school.github.io/visualizing-git/" target="_blank" rel="noopener noreferrer"><strong>Visualizing Git</strong></a>{" "}
          — Outra visualização interativa.
        </li>
      </ul>

      <h2>🛠️ Ferramentas essenciais</h2>
      <ul>
        <li>
          <a href="https://cli.github.com" target="_blank" rel="noopener noreferrer"><strong>GitHub CLI (gh)</strong></a>{" "}
          — Operações de GitHub do terminal: PR, issues, releases.
        </li>
        <li>
          <a href="https://gitlab.com/gitlab-org/cli" target="_blank" rel="noopener noreferrer"><strong>GitLab CLI (glab)</strong></a>{" "}
          — Equivalente para GitLab.
        </li>
        <li>
          <a href="https://github.com/dandavison/delta" target="_blank" rel="noopener noreferrer"><strong>git-delta</strong></a>{" "}
          — Pager moderno para diffs (com syntax highlight, side-by-side).
        </li>
        <li>
          <a href="https://github.com/jesseduffield/lazygit" target="_blank" rel="noopener noreferrer"><strong>lazygit</strong></a>{" "}
          — TUI completa, mais produtiva que o terminal.
        </li>
        <li>
          <a href="https://github.com/jonas/tig" target="_blank" rel="noopener noreferrer"><strong>tig</strong></a>{" "}
          — TUI minimalista para log/diff/blame.
        </li>
        <li>
          <a href="https://github.com/newren/git-filter-repo" target="_blank" rel="noopener noreferrer"><strong>git-filter-repo</strong></a>{" "}
          — Substituto moderno para filter-branch (limpar histórico).
        </li>
        <li>
          <a href="https://git-lfs.com" target="_blank" rel="noopener noreferrer"><strong>Git LFS</strong></a>{" "}
          — Para arquivos grandes/binários. Veja <Link href="/lfs">capítulo</Link>.
        </li>
        <li>
          <a href="https://pre-commit.com" target="_blank" rel="noopener noreferrer"><strong>pre-commit</strong></a>{" "}
          — Framework para hooks em qualquer linguagem.
        </li>
      </ul>

      <h2>🎨 GUIs (clientes gráficos)</h2>
      <ul>
        <li>
          <a href="https://www.sourcetreeapp.com" target="_blank" rel="noopener noreferrer"><strong>Sourcetree</strong></a>{" "}
          (Atlassian, gratuito) — Mac/Windows.
        </li>
        <li>
          <a href="https://desktop.github.com" target="_blank" rel="noopener noreferrer"><strong>GitHub Desktop</strong></a>{" "}
          — Simples, ótimo para iniciantes.
        </li>
        <li>
          <a href="https://www.gitkraken.com" target="_blank" rel="noopener noreferrer"><strong>GitKraken</strong></a>{" "}
          — Pago, mas muito polido.
        </li>
        <li>
          <a href="https://www.git-tower.com" target="_blank" rel="noopener noreferrer"><strong>Tower</strong></a>{" "}
          — Pago, profissional.
        </li>
        <li>
          <a href="https://gitext.github.io" target="_blank" rel="noopener noreferrer"><strong>Git Extensions</strong></a>{" "}
          — Open source, Windows.
        </li>
      </ul>

      <h2>📋 Convenções e padrões</h2>
      <ul>
        <li>
          <a href="https://www.conventionalcommits.org/pt-br/v1.0.0/" target="_blank" rel="noopener noreferrer"><strong>Conventional Commits</strong></a>{" "}
          — Padrão de mensagens de commit. <Link href="/conventional-commits">Capítulo aqui</Link>.
        </li>
        <li>
          <a href="https://semver.org/lang/pt-BR/" target="_blank" rel="noopener noreferrer"><strong>Semantic Versioning</strong></a>{" "}
          — Como versionar releases. Veja <Link href="/tags">Tags</Link>.
        </li>
        <li>
          <a href="https://keepachangelog.com/pt-BR/" target="_blank" rel="noopener noreferrer"><strong>Keep a Changelog</strong></a>{" "}
          — Como escrever um CHANGELOG.md decente.
        </li>
        <li>
          <a href="https://developercertificate.org" target="_blank" rel="noopener noreferrer"><strong>Developer Certificate of Origin (DCO)</strong></a>{" "}
          — Padrão de sign-off em open source.
        </li>
      </ul>

      <h2>🚀 Automação de release</h2>
      <ul>
        <li>
          <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer"><strong>semantic-release</strong></a>{" "}
          — Releases 100% automáticas baseadas em Conventional Commits.
        </li>
        <li>
          <a href="https://github.com/googleapis/release-please" target="_blank" rel="noopener noreferrer"><strong>release-please</strong></a>{" "}
          (Google) — Cria PRs de release automaticamente.
        </li>
        <li>
          <a href="https://github.com/conventional-changelog/standard-version" target="_blank" rel="noopener noreferrer"><strong>standard-version</strong></a>{" "}
          — Gerador de changelog + bump de versão.
        </li>
        <li>
          <a href="https://changesets-docs.vercel.app" target="_blank" rel="noopener noreferrer"><strong>changesets</strong></a>{" "}
          — Para monorepos com múltiplos packages.
        </li>
      </ul>

      <h2>🎓 Cursos</h2>
      <ul>
        <li>
          <a href="https://www.youtube.com/playlist?list=PLEDXPC1ZmOuBVQc-O4BZ4_3tzFyeEUjV9" target="_blank" rel="noopener noreferrer"><strong>Curso de Git e GitHub</strong></a>{" "}
          (Curso em Vídeo, Gustavo Guanabara) — pt-BR, gratuito, didático.
        </li>
        <li>
          <a href="https://www.atlassian.com/git/tutorials" target="_blank" rel="noopener noreferrer"><strong>Atlassian Git Tutorials</strong></a>{" "}
          — Inglês, muito bons para fluxos.
        </li>
        <li>
          <a href="https://docs.github.com/pt/get-started" target="_blank" rel="noopener noreferrer"><strong>GitHub Docs — Get Started</strong></a>{" "}
          — Em português, oficial.
        </li>
      </ul>

      <h2>🐛 Investigação e debug</h2>
      <ul>
        <li>
          <a href="https://github.com/git/git/blob/master/Documentation/MyFirstContribution.txt" target="_blank" rel="noopener noreferrer"><strong>How to contribute to Git itself</strong></a>{" "}
          — Para quem quer mergulhar no código-fonte do Git.
        </li>
        <li>
          <a href="https://stackoverflow.com/questions/tagged/git?tab=Votes" target="_blank" rel="noopener noreferrer"><strong>Stack Overflow — Git tag</strong></a>{" "}
          — Quase qualquer dúvida você acha aqui (em inglês).
        </li>
      </ul>

      <h2>📜 Especificações importantes</h2>
      <CodeBlock
        title="RFC e specs relacionadas"
        language="markdown"
        code={`SHA-1                — RFC 3174
SHA-256              — FIPS 180-4
TOTP (MFA)           — RFC 6238
Git Protocol v2      — git-protocol-v2.txt
Git Object Format    — gitformat-pack.txt, gitformat-bundle.txt
Conventional Commits — https://www.conventionalcommits.org
SemVer 2.0.0         — https://semver.org
DCO                  — https://developercertificate.org
`}
      />

      <h2>🔐 Segurança e compliance</h2>
      <ul>
        <li>
          <a href="https://github.com/awslabs/git-secrets" target="_blank" rel="noopener noreferrer"><strong>git-secrets</strong></a>{" "}
          — Bloqueia commits com chaves AWS, Slack, etc.
        </li>
        <li>
          <a href="https://github.com/trufflesecurity/trufflehog" target="_blank" rel="noopener noreferrer"><strong>trufflehog</strong></a>{" "}
          — Scanner de segredos no histórico.
        </li>
        <li>
          <a href="https://github.com/gitleaks/gitleaks" target="_blank" rel="noopener noreferrer"><strong>gitleaks</strong></a>{" "}
          — Outro scanner popular.
        </li>
      </ul>

      <h2>📊 Estatísticas e análise</h2>
      <ul>
        <li>
          <a href="https://github.com/arzzen/git-quick-stats" target="_blank" rel="noopener noreferrer"><strong>git-quick-stats</strong></a>{" "}
          — Estatísticas detalhadas de contribuição.
        </li>
        <li>
          <a href="https://github.com/erikbern/git-of-theseus" target="_blank" rel="noopener noreferrer"><strong>git-of-theseus</strong></a>{" "}
          — Visualiza evolução do código ao longo do tempo.
        </li>
        <li>
          <a href="https://github.com/src-d/hercules" target="_blank" rel="noopener noreferrer"><strong>hercules</strong></a>{" "}
          — Análise profunda de repositórios.
        </li>
      </ul>

      <h2>💬 Comunidade</h2>
      <ul>
        <li><a href="https://lore.kernel.org/git/" target="_blank" rel="noopener noreferrer"><strong>git mailing list</strong></a> — Onde os mantenedores discutem.</li>
        <li><a href="https://www.reddit.com/r/git/" target="_blank" rel="noopener noreferrer"><strong>r/git</strong></a> — Comunidade ativa no Reddit.</li>
        <li><a href="https://www.reddit.com/r/programming/" target="_blank" rel="noopener noreferrer"><strong>r/programming</strong></a> — Discussões mais amplas.</li>
      </ul>

      <h2>Capítulos relacionados deste guia</h2>
      <ul>
        <li><Link href="/historia">O que é Git</Link></li>
        <li><Link href="/instalacao">Instalação</Link></li>
        <li><Link href="/conventional-commits">Conventional Commits</Link></li>
        <li><Link href="/fluxos">Fluxos de Trabalho</Link></li>
        <li><Link href="/recuperacao">Recuperação de Desastres</Link></li>
        <li><Link href="/manutencao">Manutenção e Performance</Link></li>
      </ul>

      <p className="mt-12 text-center text-muted-foreground italic">
        Bom git para você. — Wallyson Devs.
      </p>
    </PageContainer>
  );
}
