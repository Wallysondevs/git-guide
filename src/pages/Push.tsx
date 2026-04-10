import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Push() {
    return (
      <PageContainer
        title="git push"
        subtitle="Envie seus commits para o repositório remoto e compartilhe seu trabalho com a equipe."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          O <code>git push</code> envia commits do seu repositório local para um repositório remoto. É como "publicar" seu trabalho — tornando-o visível para colaboradores e integrando-o com CI/CD, backups e outros processos automatizados.
        </p>

        <h2>Uso básico</h2>
        <CodeBlock
          title="Comandos essenciais de push"
          code={`# Push do branch atual para o remoto configurado
  git push

  # Push explícito (remoto + branch)
  git push origin main
  git push origin feature/login

  # Primeiro push de um novo branch (configura tracking)
  git push -u origin meu-branch
  # -u = --set-upstream (próximos pushes só precisam de 'git push')

  # Push de todas as tags
  git push --tags
  git push --follow-tags  # só tags anotadas que apontem para commits empurrados

  # Push de todas as branches locais
  git push --all origin`}
        />

        <AlertBox type="info" title="Por que git push rejeita com 'non-fast-forward'?">
          O remoto tem commits que você não tem localmente. Faça <code>git pull --rebase</code> primeiro para integrar as mudanças remotas, depois push. O Git não deixa você sobrescrever o trabalho de outros por acidente.
        </AlertBox>

        <h2>Opções importantes</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Opção</th>
                <th className="p-3 text-left">Efeito</th>
                <th className="p-3 text-left">Cuidado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["-u / --set-upstream", "Configura o branch remoto de tracking", "Apenas no primeiro push do branch"],
                ["--force / -f", "Sobrescreve o remoto mesmo se divergiu", "⚠️ Nunca em branches compartilhados"],
                ["--force-with-lease", "Force push seguro: falha se alguém fez push enquanto você trabalhava", "✅ Prefira a este em vez de --force"],
                ["--dry-run", "Simula o push sem enviar nada", "Útil para verificar o que seria enviado"],
                ["--delete", "Deleta um branch remoto", "Irreversível para outros clones sem reflog"],
                ["--no-verify", "Pula hooks de pre-push", "⚠️ Use apenas em emergências"],
              ].map(([opt, efeito, cuidado], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{opt}</td>
                  <td className="p-3 text-muted-foreground text-sm">{efeito}</td>
                  <td className="p-3 text-sm">{cuidado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Force push seguro</h2>
        <CodeBlock
          title="--force-with-lease vs --force"
          code={`# Situação: você fez rebase e precisa atualizar o remoto
  git rebase -i origin/main

  # RUIM: --force pode sobrescrever trabalho de outros
  git push --force

  # BOM: --force-with-lease verifica antes
  git push --force-with-lease
  # Se alguém fez push enquanto você trabalhava → falha com erro
  # Isso previne sobrescrever o trabalho de outros acidentalmente

  # Após rebase interativo de branch local:
  git push --force-with-lease origin meu-branch`}
        />

        <h2>Deletando branches remotos</h2>
        <CodeBlock
          title="Gerenciando branches no remoto"
          code={`# Deletar branch remoto
  git push origin --delete feature/login
  git push origin :feature/login  # sintaxe alternativa

  # Ver branches remotos
  git branch -r

  # Limpar refs locais de branches remotos deletados
  git fetch --prune
  git remote prune origin

  # Configurar prune automático
  git config --global fetch.prune true`}
        />

        <h2>Configurando push padrão</h2>
        <CodeBlock
          title="Configurações de comportamento de push"
          code={`# Ver configuração atual
  git config push.default

  # Opções disponíveis:
  git config --global push.default simple
  # simple: push apenas para o branch de tracking (mais seguro, padrão Git 2.0+)

  git config --global push.default current
  # current: push para branch com mesmo nome no remoto

  git config --global push.default matching
  # matching: push todos os branches com mesmo nome (perigoso)

  # Configurar para não precisar de -u no primeiro push
  git config --global push.autoSetupRemote true
  # Git 2.37+: git push funciona mesmo sem upstream configurado`}
        />

        <h2>Solucionando erros comuns de push</h2>
        <div className="grid grid-cols-1 gap-3 my-6">
          {[
            { erro: "rejected — non-fast-forward", causa: "Remoto tem commits que você não tem", solucao: "git pull --rebase && git push" },
            { erro: "Permission denied (publickey)", causa: "Chave SSH não configurada ou não reconhecida", solucao: "Configure SSH key: ssh-keygen -t ed25519 e adicione no GitHub" },
            { erro: "error: src refspec main does not match any", causa: "Branch local com nome diferente do esperado", solucao: "git switch -c main ou git push origin HEAD:main" },
            { erro: "remote: Repository not found", causa: "URL errada ou sem permissão", solucao: "Verifique: git remote -v e acesso ao repositório" },
          ].map((item) => (
            <div key={item.erro} className="p-4 border border-border rounded-xl bg-card border-l-4 border-l-destructive">
              <h4 className="font-mono text-destructive text-xs mb-1">{item.erro}</h4>
              <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
              <p className="text-xs"><strong>Solução:</strong> {item.solucao}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Boa prática: push frequente em branches de feature">
          Faça push do seu branch de feature regularmente — não apenas quando terminar. Isso serve como backup, permite que colegas vejam seu progresso e facilita recuperação se algo der errado localmente.
        </AlertBox>
      </PageContainer>
    );
  }
  