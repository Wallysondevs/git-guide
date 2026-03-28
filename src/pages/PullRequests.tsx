import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PullRequests() {
  return (
    <PageContainer
      title="Pull Requests"
      subtitle="Pull Requests são a forma principal de colaboração no GitHub — propor, revisar e integrar mudanças."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <p>
        Um Pull Request (PR) é uma proposta para integrar mudanças de um branch em outro. É o centro da colaboração no GitHub: você propõe suas mudanças, outros revisam, discutem e aprovam antes de integrar.
      </p>

      <h2>O Fluxo de um Pull Request</h2>
      <div className="grid grid-cols-1 gap-3 my-6">
        {[
          { n: "1", title: "Crie um branch", desc: "Sempre trabalhe em um branch separado — nunca diretamente no main." },
          { n: "2", title: "Faça commits", desc: "Implemente a funcionalidade com commits bem descritos." },
          { n: "3", title: "Abra o PR", desc: "No GitHub, compare seu branch com o main e clique em 'New Pull Request'." },
          { n: "4", title: "Aguarde a revisão", desc: "Outros desenvolvedores revisam, comentam e sugerem mudanças." },
          { n: "5", title: "Atualize se necessário", desc: "Faça novos commits no branch — o PR atualiza automaticamente." },
          { n: "6", title: "Merge!", desc: "Após aprovação, o PR é mergeado ao branch principal." },
        ].map((step, i) => (
          <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
              {step.n}
            </div>
            <div>
              <strong>{step.title}</strong>
              <p className="text-sm text-muted-foreground mt-1 mb-0">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Preparando um PR de Qualidade</h2>
      <CodeBlock
        title="Antes de abrir o PR"
        code={`# 1. Certifique-se de estar no branch certo
git status

# 2. Atualize seu branch com o main (evita conflitos)
git fetch origin
git rebase origin/main   # ou git merge origin/main

# 3. Execute os testes localmente
npm test    # ou o comando de teste do seu projeto

# 4. Faça push do branch
git push -u origin feature/minha-funcionalidade

# 5. O GitHub mostrará um banner para criar o PR!
# Ou crie via CLI:
gh pr create --title "feat: adiciona autenticação OAuth" \
  --body "## O que mudou\n\n- Integra login com Google\n- Adiciona testes\n\nFixes #42"`}
      />

      <h2>Escrevendo uma Boa Descrição de PR</h2>
      <CodeBlock
        title="Template de PR"
        language="markdown"
        code={`## Descrição
Breve descrição do que foi feito e por quê.

## Tipo de mudança
- [ ] Bug fix (correção de bug)
- [x] Nova funcionalidade
- [ ] Breaking change

## Como testar
1. Acesse a página de login
2. Clique em "Entrar com Google"
3. Verifique se o redirecionamento funciona

## Checklist
- [x] Testes passando
- [x] Código revisado
- [x] Documentação atualizada

Closes #42`}
      />

      <h2>Revisando um PR</h2>
      <CodeBlock
        title="Revisando o código de outros"
        code={`# Baixar e testar o PR localmente
gh pr checkout 42    # GitHub CLI

# Ou manualmente:
git fetch origin pull/42/head:pr-42
git switch pr-42

# Após revisar, aprovar via CLI
gh pr review 42 --approve
gh pr review 42 --request-changes --body "Pode extrair essa lógica em uma função?"

# Fazer merge via CLI (após aprovação)
gh pr merge 42 --squash
gh pr merge 42 --merge
gh pr merge 42 --rebase`}
      />

      <AlertBox type="info" title="Draft Pull Requests">
        Você pode abrir um PR como "Draft" para mostrar o trabalho em andamento e obter feedback antecipado, sem que seja mergeado por acidente. No GitHub, clique na seta ao lado de "Create Pull Request" e escolha "Create Draft Pull Request".
      </AlertBox>

      <AlertBox type="success" title="Code Review: Boas práticas">
        Ao revisar: seja construtivo, não pessoal. Ao receber: não leve para o lado pessoal — revisão é sobre o código, não sobre você. Um bom PR tem menos de 400 linhas alteradas — fica mais fácil de revisar e aprovar rapidamente.
      </AlertBox>
    </PageContainer>
  );
}
