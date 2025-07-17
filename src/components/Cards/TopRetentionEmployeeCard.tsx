import { usePlanilha } from "@/api/planilha";
import { Trophy } from "lucide-react";

export function TopRetentionEmployeeCard() {

  const { data: retencoes } = usePlanilha({ aba: "Retenções Outros Setores" })


  // Total geral de retenções
  const totalRetencoes = retencoes?.length ?? 0;

  // Contagem por colaborador
  const contagemRetencoesPorColaborador = retencoes?.reduce((acc, item) => {
    if (!item.responsavel) return acc;

    const responsavel = item.responsavel.trim() || "Desconhecido";
    acc[responsavel] = (acc[responsavel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top 1 colaborador
  const topColaborator = Object.entries(contagemRetencoesPorColaborador ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)[0]; // exemplo: ['Luis Chicuta', 12]

  // Extração do nome e total de retenções do top colaborador
  const [nomeTopColab, totalRetencoesTopColab] = topColaborator ?? ["", 0];

  // Cálculo da porcentagem
  const porcentagemTopColab = totalRetencoes > 0
    ? Math.round((totalRetencoesTopColab / totalRetencoes) * 100)
    : 0;

  // Filtra as retenções feitas apenas por ele
  const retencoesDoTop = retencoes?.filter(item => item.responsavel === nomeTopColab) ?? [];

  // Contagem das propostas utilizadas
  const contagemPropostas = retencoesDoTop.reduce((acc, item) => {
    const proposta = item.retençãoAplicada?.trim() || "Desconhecida";
    acc[proposta] = (acc[proposta] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Encontra a proposta mais usada
  const propostaMaisUsada = Object.entries(contagemPropostas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)[0]; // exemplo: ['10% desconto', 5]



  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-900">Colaborador Destaque</p>
          <p className="text-sm text-gray-600">Maior retenção do mês</p>
        </div>
        <Trophy className="h-8 w-8 text-blue-500" />
      </div>
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl font-bold text-blue-600">GM</span>
        </div>
        <p className="text-lg font-bold text-gray-900">{nomeTopColab}</p>
        <p className="text-sm text-gray-600">Atendimento</p>
        <div className="mt-3 p-2 space-y-3 bg-blue-100 rounded-lg">
          <div>
            <p className="text-2xl font-bold text-blue-600">{totalRetencoesTopColab}</p>
            <p className="text-sm text-blue-600">Retenções este mês</p>
          </div>
         {/*  <div>
            <p className="text-sm text-blue-600">Proposta mais usada:</p>
            <p className="font-bold text-sm text-gray-400">{propostaMaisUsada}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}