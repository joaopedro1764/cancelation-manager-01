import { useState, useMemo } from "react";
import { format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, AlertTriangle, RefreshCcw, BarChart3, Users } from "lucide-react";
import { usePlanilha } from "@/api/planilha";
import { DateRangePicker } from "../../ui/date-range-picker";
import { CancelationInPeriodSkeleton } from "./cancelation-in-period-skeleton";
import type { DateRange } from "react-day-picker";

interface CancelamentoData {
  id: string;
  motivo: string;
  motivoInsatisfacao: string;
  quantidade: number;
  porcentagem: number;
  setor: string;
  mes: string;
  dataCancelamento: Date;
}

const CORES_GRAFICO = [
  "bg-blue-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-500",
  "bg-sky-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
  "bg-red-600"
];


const definirSetor = (motivo: string): string => {
  const motivoLower = motivo.toLowerCase();

  if (motivoLower.includes("valor") || motivoLower.includes("preço") || motivoLower.includes("financeiro")) {
    return "Financeiro";
  }
  if (motivoLower.includes("suporte") || motivoLower.includes("atendimento")) {
    return "Suporte";
  }
  if (motivoLower.includes("técnico") || motivoLower.includes("instalação") || motivoLower.includes("inviabilidade")) {
    return "Técnico";
  }
  if (motivoLower.includes("comercial") || motivoLower.includes("contrato")) {
    return "Comercial";
  }

  return "Outros";
};

const capitalizarPrimeiraLetra = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatarData = (rawDate: string): Date | null => {
  if (!rawDate) return null;

  const data = parse(rawDate, "M/d/yy", new Date());
  return isValid(data) ? data : null;
};



const ItemGrafico = ({
  item,
  index,
  maxValue
}: {
  item: CancelamentoData;
  index: number;
  maxValue: number;
}) => {
  const corBarra = CORES_GRAFICO[index % CORES_GRAFICO.length];
  const porcentagemBarra = (item.quantidade / maxValue) * 100;

  return (
    <div className="relative group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm font-medium text-gray-700 truncate" title={item.motivo}>
            {item.motivo}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-semibold text-gray-900">
            {item.quantidade}
          </span>
          <span className="text-xs text-gray-500">
            ({item.porcentagem}%)
          </span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ease-out ${corBarra} relative`}
          style={{ width: `${porcentagemBarra}%` }}
          role="progressbar"
          aria-valuenow={item.quantidade}
          aria-valuemax={maxValue}
          aria-label={`${item.motivo}: ${item.quantidade} cancelamentos (${item.porcentagem}%)`}
        />
      </div>

      {/* Tooltip responsivo */}
      <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-2 px-3 z-10 max-w-xs">
        <span className="font-medium">{item.motivo}</span>
        <div className="text-gray-300">{item.quantidade} cancelamentos ({item.porcentagem}%)</div>
      </div>
    </div>
  );
};


export function CancelationInPeriod() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 4, 30),
  });

  const { data: cancelamentos, isLoading } = usePlanilha({ aba: "ClientesMaio2025" })

  const { resumo: cancelamentosProcessados, bairrosInviabilidade, motivosInsatisfacao, provedoreTrocados } = useMemo(() => {
    if (!cancelamentos || !Array.isArray(cancelamentos)) {
      return { resumo: [], bairrosInviabilidade: [], motivosInsatisfacao: [], provedoreTrocados: [] };
    }

    const { from, to } = dateRange || {};

    // Utilitários de agrupamento
    const contagemMap = new Map();
    const bairrosMap = new Map();
    const provedoresMap = new Map();
    const insatisfacaoMap = new Map();

    const filtrados = cancelamentos.filter((item) => {
      const data = formatarData(item.dataCancelamento);
      return data && (!from || data >= from) && (!to || data <= to);
    });

    filtrados.forEach((item) => {
      const data = formatarData(item.dataCancelamento);
      if (!data) return;

      const motivo = item.motivoReal?.trim() || "Motivo não informado";
      const motivoInsatisfacao = item.motivoInsatisfacao?.trim() || "";
      const localInviabilidade = item.localInviabilidade?.trim() || "";

      // Agrupamento principal
      const chaveMotivo = motivo;
      const entry = contagemMap.get(chaveMotivo);
      if (entry) {
        entry.quantidade += 1;
        entry.datas.push(data);
      } else {
        contagemMap.set(chaveMotivo, {
          motivo,
          motivoInsatisfacao,
          localInviabilidade,
          quantidade: 1,
          datas: [data],
        });
      }

      // Mudança de endereço
      if (motivo === "Mudanca de Endereco (Inviabilidade Tecnica)") {
        const bairro = localInviabilidade || "Bairro não informado";
        bairrosMap.set(bairro, {
          quantidade: (bairrosMap.get(bairro)?.quantidade || 0) + 1,
        });
      }

      // Troca de provedor
      if (motivo.includes("Trocou de Provedor")) {
        const provedor = item.provedor?.trim() || "Provedor não informado";
        provedoresMap.set(provedor, {
          quantidade: (provedoresMap.get(provedor)?.quantidade || 0) + 1,
        });
      }

      // Insatisfação
      if (motivo === "Insatisfacao com servico prestado") {
        const motivoInsat = motivoInsatisfacao || "Motivo não informado";
        insatisfacaoMap.set(motivoInsat, {
          quantidade: (insatisfacaoMap.get(motivoInsat)?.quantidade || 0) + 1,
        });
      }
    });

    // Resultado principal
    const mesAtual = format(new Date(), "MMMM/yyyy", { locale: ptBR });
    const resultadoPrincipal = Array.from(contagemMap.entries())
      .map(([_, { motivo, motivoInsatisfacao, quantidade, datas }], index) => ({
        id: String(index + 1),
        motivo,
        motivoInsatisfacao,
        quantidade,
        porcentagem: filtrados.length > 0 ? Math.round((quantidade / filtrados.length) * 100) : 0,
        setor: definirSetor(motivo),
        mes: capitalizarPrimeiraLetra(mesAtual),
        dataCancelamento: datas[0],
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    // Bairros
    const bairrosInviabilidade = Array.from(bairrosMap.entries())
      .map(([bairro, { quantidade }], index) => ({
        id: String(index + 1),
        bairro,
        quantidade,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    // Provedores
    const provedoreTrocados = Array.from(provedoresMap.entries())
      .map(([provedor, { quantidade }], index) => ({
        id: String(index + 1),
        provedor,
        quantidade,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    // Insatisfação
    const motivosInsatisfacao = Array.from(insatisfacaoMap.entries())
      .map(([motivoInsatisfacao, { quantidade }], index) => ({
        id: String(index + 1),
        motivoInsatisfacao,
        quantidade,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    return {
      resumo: resultadoPrincipal,
      bairrosInviabilidade,
      motivosInsatisfacao,
      provedoreTrocados,
    };
  }, [cancelamentos, dateRange]);

  const EstatisticasResumo = ({ dados }: { dados: CancelamentoData[] }) => {

    const principalMotivo = dados.length > 0 ? dados[0] : null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Card Troca de Provedor */}
        <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full -translate-y-12 translate-x-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                  <RefreshCcw className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Troca de Provedor</h4>
                  <p className="text-xs text-gray-500">Por operadora</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <p className="font-medium text-blue-900 text-sm leading-relaxed">
                  Troca de provedor (pacotes de dados móveis incluso)
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {provedoreTrocados.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Nenhum cancelamento por troca de provedor</p>
                </div>
              ) : (
                provedoreTrocados.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                    <span className="font-medium text-gray-800">{item.provedor}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-blue-700">{item.quantidade}</span>
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
                          style={{ width: `${(item.quantidade / Math.max(...provedoreTrocados.map(p => p.quantidade))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Card Principal Motivo */}
        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl shadow-lg border border-orange-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full -translate-y-12 translate-x-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Principal Motivo</h4>
                  <p className="text-xs text-gray-500">Inviabilidade técnica</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <p className="font-medium text-orange-900 text-sm leading-relaxed">
                  {principalMotivo?.motivo || "Mudança de Endereço (Inviabilidade Técnica)"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Principais regiões:</p>
              {bairrosInviabilidade.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/30 rounded-lg">
                  <span className="text-sm font-medium text-gray-800">{item.bairro}</span>
                  <span className="font-bold text-orange-700">{item.quantidade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Motivos Insatisfação */}
        <div className="relative bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl shadow-lg border border-red-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full -translate-y-12 translate-x-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Insatisfação</h4>
                  <p className="text-xs text-gray-500">Principais motivos</p>
                </div>
              </div>
            </div>


  <div className="mb-4">
              <div className="bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <p className="font-medium text-rose-900 text-sm leading-relaxed">
                  Lentidão e oscilação (Somente WI-FI)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {motivosInsatisfacao.slice(0, 3).map((item, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 leading-tight flex-1">
                      {item.motivoInsatisfacao}
                    </span>
                    <span className="font-bold text-red-700 ml-2">{item.quantidade}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-red-500 to-pink-600 h-1.5 rounded-full"
                      style={{ width: `${(item.quantidade / Math.max(...motivosInsatisfacao.map(m => m.quantidade))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const maxValue = cancelamentosProcessados.length > 0
    ? Math.max(...cancelamentosProcessados.map(item => item.quantidade))
    : 1;

  return (
    <div className="w-full max-w-7xl h-[calc(100vh-260px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar-track]:bg-gray-100 
  [&::-webkit-scrollbar-thumb]:bg-transparent 
  [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Análise de Cancelamentos</h3>
                <p className="text-sm text-gray-600">Visualize os principais dados e motivos dos cancelamentos</p>
              </div>
            </div>


            <span className="text-sm font-medium text-gray-700">
              <DateRangePicker OnDateChange={setDateRange} date={dateRange} />
            </span>

          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{352}</span>
            <span className="text-gray-600">cancelamentos no período selecionado</span>
          </div>
        </div>

        <div className="">
          {isLoading ? (
            <CancelationInPeriodSkeleton />
          ) : cancelamentosProcessados.length > 0 ? (
            <div className="p-4 sm:p-6">
              <EstatisticasResumo dados={cancelamentosProcessados} />

              <div className="my-8">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Cancelamentos por assunto:
                </h3>
                <div className="space-y-6">
                  {cancelamentosProcessados.map((item, index) => (
                    <ItemGrafico
                      key={item.id}
                      item={item}
                      index={index}
                      maxValue={maxValue}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum dado encontrado
              </h3>
              <p className="text-gray-500 max-w-md">
                Não foram encontrados cancelamentos no período selecionado.
                Tente ajustar as datas ou verificar se há dados disponíveis.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}