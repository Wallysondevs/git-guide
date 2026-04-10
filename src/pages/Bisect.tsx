import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Bisect() {
    return (
      <PageContainer
        title="git bisect"
        subtitle="Encontre exatamente qual commit introduziu um bug usando busca binária automatizada."
        difficulty="avancado"
        timeToRead="12 min"
      >
        <p>
          O <code>git bisect</code> usa busca binária no histórico de commits para encontrar qual commit introduziu um bug. Em vez de testar commit por commit (O(n)), o bisect testa O(log n) — em 1000 commits, você encontra o culpado testando apenas 10.
        </p>

        <h2>Como funciona a busca binária</h2>
        <p>
          Você informa dois pontos: um commit "ruim" (onde o bug existe) e um commit "bom" (onde funcionava). O Git escolhe o commit do meio para testar. Você diz se é bom ou ruim, e o Git divide novamente — até chegar no commit exato que introduziu o problema.
        </p>

        <CodeBlock
          title="Fluxo básico do bisect"
          code={`# 1. Iniciar a sessão de bisect
  git bisect start

  # 2. Marcar commit atual como ruim (tem o bug)
  git bisect bad
  # OU marcar um commit específico como ruim
  git bisect bad HEAD

  # 3. Marcar onde funcionava como bom
  git bisect good v1.0.0
  # OU por SHA
  git bisect good abc1234

  # Git automaticamente faz checkout do commit do meio
  # Bisecting: 50 revisions left to test after this
  # [def5678] Commit do meio

  # 4. Teste o código agora e informe o resultado
  git bisect good   # se está funcionando aqui
  git bisect bad    # se o bug já existe aqui

  # 5. Repita até o Git encontrar o commit culpado
  # "abc1234 is the first bad commit"

  # 6. Ao terminar
  git bisect reset  # volta ao branch original`}
        />

        <AlertBox type="success" title="Bisect automatizado com script">
          O poder real do bisect está na automação. Se você tem um script ou comando que retorna 0 para "bom" e 1 para "ruim", o Git roda o bisect completamente sozinho.
        </AlertBox>

        <h2>Bisect automático com script</h2>
        <CodeBlock
          title="Automatizando o bisect"
          code={`# Criar script de teste (deve retornar 0=bom, 1=ruim)
  cat > test_bug.sh << 'EOF'
  #!/bin/bash
  npm test -- --grep "login deve funcionar"
  exit $?
  EOF
  chmod +x test_bug.sh

  # Iniciar bisect automático
  git bisect start
  git bisect bad HEAD
  git bisect good v2.0.0

  # Deixar o Git testar sozinho
  git bisect run ./test_bug.sh
  # Git vai rodar o script em cada commit automaticamente
  # Ao final mostra: "abc123 is the first bad commit"

  # Para testes de compilação
  git bisect run sh -c "npm build && node -e 'require("./dist")'"

  # Para verificar se arquivo existe
  git bisect run test -f src/problematic-file.js`}
        />

        <h2>Comandos de controle da sessão</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Comando</th>
                <th className="p-3 text-left">Significado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["git bisect good", "Este commit funciona corretamente"],
                ["git bisect bad", "Este commit tem o bug"],
                ["git bisect skip", "Não consigo testar este commit (ex: não compila por outro motivo)"],
                ["git bisect reset", "Encerra bisect e volta ao HEAD original"],
                ["git bisect log", "Mostra o log das decisões tomadas na sessão"],
                ["git bisect replay log.txt", "Reproduce uma sessão de bisect de um arquivo de log"],
                ["git bisect visualize", "Abre gitk mostrando os commits restantes"],
              ].map(([cmd, sig], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{cmd}</td>
                  <td className="p-3 text-muted-foreground text-sm">{sig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Cenário real: encontrando regressão de performance</h2>
        <CodeBlock
          title="Exemplo prático com teste de performance"
          code={`# Script: verifica se operação demora mais de 2 segundos
  cat > perf_test.sh << 'EOF'
  #!/bin/bash
  time_ms=$(node -e "
    const start = Date.now();
    require('./src/heavy-operation');
    console.log(Date.now() - start);
  ")
  [ "$time_ms" -lt 2000 ]  # retorna 0 se < 2s (bom), 1 se >= 2s (ruim)
  EOF

  git bisect start
  git bisect bad HEAD        # lento agora
  git bisect good v3.0.0    # era rápido na v3
  git bisect run bash perf_test.sh

  # Resultado: "commit abc123 introduced the regression"
  git show abc123            # ver exatamente o que mudou`}
        />

        <AlertBox type="info" title="git bisect skip — commits que não podem ser testados">
          Se um commit não pode ser testado (não compila por um bug diferente, dependência faltando, etc.), use <code>git bisect skip</code>. O Git continuará com outro commit próximo. Se o commit culpado estiver entre os pulados, o Git avisará com uma lista de suspeitos.
        </AlertBox>

        <h2>Dicas avançadas</h2>
        <CodeBlock
          title="Técnicas avançadas de bisect"
          code={`# Salvar log do bisect para reprodução futura
  git bisect log > bisect_session.log

  # Reproduzir uma sessão salva
  git bisect replay bisect_session.log

  # Bisect com termos customizados (ex: "fast" / "slow")
  git bisect start --term-good=fast --term-bad=slow
  git bisect fast abc123
  git bisect slow HEAD

  # Ver quantos commits restam para testar
  git bisect visualize --oneline | wc -l

  # Bisect em repositório com submodules
  git bisect run sh -c "git submodule update && npm test"`}
        />
      </PageContainer>
    );
  }
  