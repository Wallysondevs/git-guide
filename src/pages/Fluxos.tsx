import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Fluxos() {
  return (
    <PageContainer
      title="Fluxos de Trabalho"
      subtitle="Os principais modelos de fluxo de trabalho com Git usados por equipes de desenvolvimento."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <p>
        Não existe um único jeito "certo" de usar o Git em equipe. Diferentes fluxos de trabalho (workflows) se adaptam melhor a diferentes tamanhos de equipe, cadência de release e complexidade do projeto.
      </p>

      <h2>1. Trunk-Based Development (Recomendado)</h2>
      <p>
        O fluxo mais simples e cada vez mais adotado: todos trabalham no branch principal (<code>main</code>), com branches de curta duração (geralmente menos de 1 dia) e integração contínua.
      </p>

      <CodeBlock
        title="Trunk-Based Development"
        code={`# Sempre parta do main atualizado
git switch main
git pull

# Crie um branch PEQUENO e focado
git switch -c feat/validar-email

# Trabalhe rapidamente (horas, não dias)
git commit -m "feat: adiciona validação de formato de email"

# Mantenha atualizado com o main
git fetch origin
git rebase origin/main

# Abra PR assim que estiver pronto (pequeno = revisão rápida)
git push -u origin feat/validar-email
# Abra o PR → revisão → merge → delete branch`}
      />

      <AlertBox type="info" title="Por que Trunk-Based?">
        Branches de curta duração reduzem conflitos, facilitam revisão de código e permitem integração contínua real. Times como Google e Facebook usam esse modelo com sucesso em projetos enormes.
      </AlertBox>

      <h2>2. Git Flow</h2>
      <p>
        O Git Flow é um modelo mais estruturado, ideal para projetos com releases versionadas e periodicidade bem definida:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Branches Principais</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li><code className="text-primary">main</code> — código em produção</li>
            <li><code className="text-primary">develop</code> — integração de features</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold mb-2 border-0 mt-0">Branches de Suporte</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li><code className="text-primary">feature/*</code> — novas funcionalidades</li>
            <li><code className="text-primary">release/*</code> — preparação de release</li>
            <li><code className="text-primary">hotfix/*</code> — correções urgentes em produção</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        title="Git Flow — Fluxo de uma feature"
        code={`# 1. Criar branch de feature a partir do develop
git switch develop
git pull
git switch -c feature/nova-funcionalidade

# 2. Desenvolver e commitar
git commit -m "feat: implementa nova funcionalidade"

# 3. Merge de volta ao develop
git switch develop
git merge --no-ff feature/nova-funcionalidade
git branch -d feature/nova-funcionalidade

# 4. Quando pronto para release
git switch -c release/v2.0.0
# Ajustes finais, bump de versão, etc.
git switch main && git merge --no-ff release/v2.0.0
git tag -a v2.0.0 -m "Release v2.0.0"
git switch develop && git merge --no-ff release/v2.0.0`}
      />

      <h2>3. GitHub Flow</h2>
      <p>
        Um fluxo simplificado do Git Flow, sem o branch <code>develop</code>. Muito popular para projetos web que fazem deploy contínuo:
      </p>

      <CodeBlock
        title="GitHub Flow"
        code={`# 1. Crie um branch descritivo a partir do main
git switch main && git pull
git switch -c fix/botao-nao-funciona-no-safari

# 2. Faça commits
git commit -m "fix: corrige event listener no Safari"

# 3. Abra um Pull Request cedo (pode ser draft)
git push -u origin fix/botao-nao-funciona-no-safari
gh pr create --draft

# 4. Discuta, revise e atualize

# 5. Deploy de teste antes do merge (opcional)

# 6. Merge ao main via PR
# 7. Delete o branch
git push origin --delete fix/botao-nao-funciona-no-safari`}
      />

      <h2>Comparando os Fluxos</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Critério</th>
              <th className="p-3 text-left">Trunk-Based</th>
              <th className="p-3 text-left">GitHub Flow</th>
              <th className="p-3 text-left">Git Flow</th>
            </tr>
          </thead>
          <tbody>
            {[
              { c: "Complexidade", t: "Baixa", g: "Baixa", gf: "Alta" },
              { c: "Ideal para", t: "Times ágeis", g: "SaaS / Web", gf: "Releases versionadas" },
              { c: "Duração dos branches", t: "Horas", g: "Dias", gf: "Semanas" },
              { c: "Deploy contínuo", t: "Sim", g: "Sim", gf: "Difícil" },
            ].map((row, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3 font-medium">{row.c}</td>
                <td className="p-3 text-green-400">{row.t}</td>
                <td className="p-3 text-blue-400">{row.g}</td>
                <td className="p-3 text-yellow-400">{row.gf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Recomendação">
        Para a maioria dos projetos modernos, comece com <strong>GitHub Flow</strong> ou <strong>Trunk-Based Development</strong>. São mais simples, promovem integração contínua e funcionam muito bem. O Git Flow faz sentido apenas quando você mantém múltiplas versões simultâneas em produção.
      </AlertBox>
    </PageContainer>
  );
}
