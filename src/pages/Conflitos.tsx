import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link } from "wouter";

export default function Conflitos() {
  return (
    <PageContainer
      title="Resolvendo Conflitos"
      subtitle="Quando duas pessoas mudam a mesma linha, o Git para e pede sua ajuda. Aqui está como resolver com tranquilidade."
      difficulty="intermediario"
      timeToRead="13 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Familiaridade com terminal e noções básicas de versionamento. Se ainda não viu o capítulo de instalação ou primeiros passos, comece por lá.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Conflito"}</strong> {' — '} {"duas branches mexeram na mesma linha — Git pede ajuda."}
          </li>
        <li>
            <strong>{"<<<<<<< HEAD"}</strong> {' — '} {"marcador do lado atual; ======= separa; >>>>>>> branch é o entrante."}
          </li>
        <li>
            <strong>{"git status"}</strong> {' — '} {"lista arquivos com conflito (Unmerged paths)."}
          </li>
        <li>
            <strong>{"Mergetool"}</strong> {' — '} {"git mergetool abre ferramenta visual configurada."}
          </li>
        <li>
            <strong>{"Abortar"}</strong> {' — '} {"git merge --abort / rebase --abort volta ao estado anterior."}
          </li>
        </ul>
        <p>
        Conflitos não são bugs — são <strong>uma feature</strong>. O Git só te avisa quando ele <em>não tem como decidir sozinho</em> o que é o resultado correto. Saber resolver conflitos com calma é o que separa o iniciante do desenvolvedor confiante.
      </p>

      <AlertBox type="tip" title="A primeira regra">
        <strong>Não entre em pânico.</strong> Tudo é reversível com <code>git merge --abort</code> ou <code>git rebase --abort</code>. Você nunca está preso.
      </AlertBox>

      <h2>O que causa um conflito</h2>
      <ul>
        <li>Duas branches editaram <strong>a mesma linha</strong> de forma diferente.</li>
        <li>Uma branch editou um arquivo que outra <strong>deletou</strong>.</li>
        <li>Duas branches <strong>renomearam</strong> o mesmo arquivo para nomes diferentes.</li>
        <li>Mudanças em modos de arquivo (executável vs não-executável).</li>
      </ul>

      <h2>Anatomia de um conflito</h2>
      <CodeBlock
        title="O Git marca o arquivo assim"
        language="diff"
        code={`function login(user) {
<<<<<<< HEAD                   ← início do "nosso" lado (onde estamos)
  if (!user) throw new Error('user required');
  return verify(user, { strict: true });
=======                        ← divisor
  if (!user) return null;
  return verify(user);
>>>>>>> feature/auth           ← fim do "deles" (o que está vindo)
}
`}
      />

      <h2>O fluxo completo de resolução</h2>
      <CodeBlock
        title="Passo a passo"
        language="bash"
        code={`# 1. Tente o merge
git merge feature/auth
# CONFLICT (content): Merge conflict in src/auth.ts
# Automatic merge failed; fix conflicts and then commit the result.

# 2. Veja quais arquivos têm conflito
git status
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   src/auth.ts

# Lista enxuta:
git diff --name-only --diff-filter=U

# 3. Abra cada arquivo, edite e remova os marcadores
nano src/auth.ts

# 4. Marque como resolvido
git add src/auth.ts

# 5. Conclua o merge (se for merge) ou continue rebase
git commit                    # se foi merge
git rebase --continue         # se foi rebase
`}
      />

      <h2>Estratégias na hora de editar</h2>
      <CodeBlock
        title="As 4 escolhas comuns"
        language="bash"
        code={`# Escolha A — manter SOMENTE o nosso (HEAD)
# Apague desde ======= até >>>>>>>, incluindo o marcador <<<<<<<

# Escolha B — manter SOMENTE o deles
# Apague desde <<<<<<< até =======, incluindo o marcador >>>>>>>

# Escolha C — combinar os dois
# Manualmente edite mantendo o melhor de cada lado

# Escolha D — algo totalmente novo
# Reescreva o trecho como faz mais sentido depois das duas mudanças

# Em TODOS os casos: APAGUE TODOS os marcadores <<<<<<<, =======, >>>>>>>
`}
      />

      <h2>Atalhos para escolher um lado inteiro</h2>
      <CodeBlock
        title="git checkout --ours / --theirs"
        language="bash"
        code={`# Aceitar TUDO do nosso lado neste arquivo
git checkout --ours src/auth.ts

# Aceitar TUDO do lado deles
git checkout --theirs src/auth.ts

# Não esqueça de marcar como resolvido
git add src/auth.ts

# CUIDADO: --ours e --theirs INVERTEM no rebase!
# - merge: ours = HEAD (sua branch), theirs = branch que vem
# - rebase: ours = onde você está rebaseando (ex: main), theirs = seus commits
`}
      />

      <AlertBox type="warning" title="Inversão no rebase">
        Durante <strong>merge</strong>: <code>ours</code> é a sua branch. Durante <strong>rebase</strong>: <code>ours</code> é a branch BASE (em cima da qual você está rebaseando). É contraintuitivo — sempre dê <code>git status</code> para confirmar.
      </AlertBox>

      <h2>Vendo as 3 versões: base, ours, theirs</h2>
      <CodeBlock
        title="Three-way diff"
        language="bash"
        code={`# Mostrar as 3 versões em formato de diff
git diff
# diff --cc src/auth.ts
# index a1b2c3d,e5f6g7h..0000000
# (mostra as 2 mudanças contra a base)

# Mostrar conteúdo do arquivo em cada lado
git show :1:src/auth.ts > base.txt      # ancestral comum
git show :2:src/auth.ts > ours.txt      # nosso
git show :3:src/auth.ts > theirs.txt    # deles

# Visualização melhorada (mostra o ancestral também)
git checkout --conflict=diff3 src/auth.ts
# Agora o conflito mostra também a "base" original entre ||||||| e =======:
#
# <<<<<<< HEAD
# nosso código
# ||||||| base
# código original
# =======
# código deles
# >>>>>>> feature/auth

# Configure como padrão
git config --global merge.conflictstyle diff3
# OU ainda melhor:
git config --global merge.conflictstyle zdiff3
`}
      />

      <h2>Mergetool — interface visual</h2>
      <CodeBlock
        title="Ferramentas gráficas"
        language="bash"
        code={`# Configurar (faça uma vez)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.keepBackup false

# Outras opções populares:
# - meld         (Linux GUI clássica)
# - kdiff3       (cross-platform)
# - p4merge      (gratuito, muito bom)
# - vimdiff      (terminal)

# Abrir todos os conflitos
git mergetool

# Para arquivo específico
git mergetool src/auth.ts
`}
      />

      <h2>Cancelando — voltar atrás</h2>
      <CodeBlock
        title="Abort"
        language="bash"
        code={`# Cancelar merge em andamento (volta TUDO ao estado de antes)
git merge --abort

# Cancelar rebase em andamento
git rebase --abort

# Cancelar cherry-pick
git cherry-pick --abort

# Cancelar revert
git revert --abort
`}
      />

      <h2>Conflitos especiais</h2>

      <h3>Arquivo deletado em um lado, modificado no outro</h3>
      <CodeBlock
        title="add/delete conflict"
        language="bash"
        code={`# Saída:
# CONFLICT (modify/delete): src/legado.ts deleted in feature
# and modified in HEAD.

# Decida:
# Manter o arquivo (com modificações)
git add src/legado.ts

# OU: aceitar a deleção
git rm src/legado.ts
`}
      />

      <h3>Arquivos renomeados de forma diferente</h3>
      <CodeBlock
        title="rename/rename conflict"
        language="bash"
        code={`# Você renomeou auth.ts → authentication.ts
# Eles renomearam auth.ts → login.ts

# Decida o nome final, apague os outros
git mv authentication.ts auth-final.ts
git rm login.ts
git add auth-final.ts
`}
      />

      <h2>rerere — Reuse Recorded Resolution</h2>
      <p>O Git pode <strong>memorizar</strong> como você resolveu um conflito e aplicar a mesma solução automaticamente da próxima vez. Útil para rebases longos onde o mesmo conflito reaparece.</p>

      <CodeBlock
        title="Habilitando rerere"
        language="bash"
        code={`# Habilitar globalmente
git config --global rerere.enabled true

# Quando você resolve um conflito e dá "git add", o Git memoriza
# Da próxima vez que aparecer o mesmo conflito, ele resolve sozinho

# Ver resoluções memorizadas
git rerere status
git rerere diff

# Esquecer uma resolução
git rerere forget src/auth.ts
`}
      />

      <h2>Prevenindo conflitos</h2>
      <ul>
        <li><strong>Sincronize com main frequentemente</strong> (rebase ou merge regular).</li>
        <li><strong>Branches curtas</strong> — quanto mais antiga, mais conflitos.</li>
        <li><strong>Comunique grandes refactors</strong> antes de fazer.</li>
        <li><strong>Formatadores automáticos</strong> (Prettier, Black) eliminam conflitos de estilo.</li>
        <li><strong>Bons commits atômicos</strong> facilitam revisar e mergear.</li>
      </ul>

      <h2>Cheat-sheet de emergência</h2>
      <CodeBlock
        title="Quando der ruim"
        language="bash"
        code={`# Não sei o que aconteceu, quero parar tudo
git merge --abort     # ou rebase/cherry-pick/revert --abort

# Quais arquivos estão em conflito?
git diff --name-only --diff-filter=U

# Aceitar tudo do MEU lado (em merge)
git checkout --ours .
git add .
git commit

# Aceitar tudo DELES (em merge)
git checkout --theirs .
git add .
git commit

# Já resolvi e quero ver se está tudo ok
git diff --check         # detecta marcadores esquecidos

# Memorize resoluções para o futuro
git config --global rerere.enabled true
`}
      />

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/merge">Merge</Link> — entenda o que gera os conflitos</li>
        <li><Link href="/rebase">Rebase</Link> — outra fonte comum de conflitos</li>
        <li><Link href="/recuperacao">Recuperação de Desastres</Link> — quando algo dá MUITO errado</li>
        <li><Link href="/dicas">Dicas e Truques</Link> — atalhos e configurações úteis</li>
      </ul>
    </PageContainer>
  );
}
