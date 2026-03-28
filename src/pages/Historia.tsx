import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Historia() {
  return (
    <PageContainer
      title="O que é Git"
      subtitle="A história do sistema de controle de versão mais usado no mundo e por que ele é essencial para todo desenvolvedor."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <p>
        Git é um sistema de controle de versão distribuído criado por Linus Torvalds em 2005. Ele permite que você registre o histórico completo de um projeto, trabalhe em equipe sem sobrescrever o trabalho alheio e experimente novas funcionalidades sem medo de quebrar o código principal.
      </p>

      <h2>A História do Git</h2>
      <p>
        Antes do Git, o kernel Linux usava um sistema chamado <strong>BitKeeper</strong> para gerenciar o código. Em 2005, após uma disputa sobre a licença do BitKeeper, Linus Torvalds decidiu criar sua própria solução — e em apenas algumas semanas, o Git nasceu.
      </p>
      <p>
        Linus tinha objetivos claros: o sistema precisava ser rápido, simples, suportar desenvolvimento não-linear (muitos branches em paralelo) e funcionar de forma distribuída — sem um servidor central obrigatório.
      </p>

      <AlertBox type="info" title="Curiosidade">
        O próprio Linus Torvalds deu o nome "Git" ao sistema. Em gíria britânica, "git" significa uma pessoa desagradável e difícil. Ele brincou: "Sou egoísta e chamo todos os meus projetos com o meu nome. Primeiro Linux, agora Git."
      </AlertBox>

      <h2>Controle de Versão: Por que precisamos?</h2>
      <p>
        Imagine que você está desenvolvendo um sistema e, após uma semana trabalhando em uma nova funcionalidade, percebe que ela quebrou tudo. Sem controle de versão, você precisaria desfazer tudo manualmente. Com o Git, você simplesmente volta para o ponto anterior.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-red-500/5">
          <h4 className="font-bold text-red-400 mb-2 border-0 mt-0">Sem Controle de Versão</h4>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Arquivos como "projeto_final_v2_DEFINITIVO.zip"</li>
            <li>• Impossível saber quem mudou o quê</li>
            <li>• Colaboração via e-mail ou pendrive</li>
            <li>• Uma mudança pode destruir tudo</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-green-500/5">
          <h4 className="font-bold text-green-400 mb-2 border-0 mt-0">Com Git</h4>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Histórico completo e detalhado</li>
            <li>• Quem mudou o quê e quando</li>
            <li>• Colaboração em tempo real</li>
            <li>• Reverter qualquer mudança em segundos</li>
          </ul>
        </div>
      </div>

      <h2>Git vs. Outros Sistemas</h2>
      <p>
        O Git é um sistema <strong>distribuído</strong>, o que o diferencia de sistemas centralizados como SVN e CVS. Isso significa que cada desenvolvedor tem uma cópia completa do repositório, incluindo todo o histórico.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-xl bg-primary/5">
          <h4 className="font-bold text-primary mb-2 border-0 mt-0">Git (Distribuído)</h4>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Cada cópia tem o histórico completo</li>
            <li>• Funciona sem conexão com a internet</li>
            <li>• Operações locais são extremamente rápidas</li>
            <li>• Sem ponto único de falha</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-xl bg-muted">
          <h4 className="font-bold mb-2 border-0 mt-0">SVN/CVS (Centralizado)</h4>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Histórico só existe no servidor</li>
            <li>• Requer internet para a maioria das operações</li>
            <li>• Se o servidor cair, o trabalho para</li>
            <li>• Operações podem ser lentas</li>
          </ul>
        </div>
      </div>

      <h2>Os Três Estados do Git</h2>
      <p>
        Entender os três estados do Git é fundamental para trabalhar com ele de forma eficiente:
      </p>
      <ul>
        <li><strong>Working Directory (Diretório de Trabalho):</strong> onde você edita seus arquivos normalmente.</li>
        <li><strong>Staging Area (Área de Preparação):</strong> onde você prepara as mudanças que farão parte do próximo commit.</li>
        <li><strong>Repository (Repositório):</strong> onde o Git armazena o histórico permanentemente.</li>
      </ul>

      <CodeBlock
        title="O fluxo básico do Git"
        code={`# 1. Você edita um arquivo (Working Directory)
echo "Olá, Git!" > arquivo.txt

# 2. Você adiciona o arquivo à Staging Area
git add arquivo.txt

# 3. Você cria um commit (vai para o Repositório)
git commit -m "Adiciona arquivo.txt com saudação"

# O Git registrou essa mudança para sempre!
git log --oneline`}
      />

      <h2>O Modelo de Dados do Git</h2>
      <p>
        O Git armazena dados como uma série de <strong>snapshots</strong> (fotografias) do projeto, não como diferenças entre arquivos. Cada commit é uma fotografia completa de todos os arquivos no momento do commit, com um ponteiro para o commit anterior.
      </p>

      <AlertBox type="success" title="Conclusão">
        Git é a habilidade mais valiosa que um desenvolvedor pode ter, independente da linguagem ou tecnologia que usa. Praticamente toda empresa de tecnologia usa Git. Dominar o Git é dominar a base do desenvolvimento moderno.
      </AlertBox>
    </PageContainer>
  );
}
