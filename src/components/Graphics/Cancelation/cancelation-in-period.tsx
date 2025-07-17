import { useState, useMemo } from "react";
import { format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Info, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { usePlanilha } from "@/api/planilha";
import { DateRangePicker } from "../../ui/date-range-picker";
import { CancelationInPeriodSkeleton } from "./cancelation-in-period-skeleton";
import type { DateRange } from "react-day-picker";

interface CancelamentoData {
  id: string;
  motivo: string;
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

const EstatisticasResumo = ({ dados }: { dados: CancelamentoData[] }) => {
  const totalCancelamentos = dados.reduce((sum, item) => sum + item.quantidade, 0);
  const principalMotivo = dados.length > 0 ? dados[0] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <span className="text-sm font-medium text-blue-900">Total no Período</span>
        </div>
        <p className="text-2xl font-bold text-blue-900">
          {totalCancelamentos.toLocaleString('pt-BR')}
        </p>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-orange-600 flex-shrink-0" />
          <span className="text-sm font-medium text-orange-900">Principal Motivo</span>
        </div>
        <p className="text-sm font-bold text-orange-900 leading-tight" title={principalMotivo?.motivo}>
          {principalMotivo?.motivo && principalMotivo.motivo.length > 25
            ? `${principalMotivo.motivo.substring(0, 25)}...`
            : principalMotivo?.motivo || "N/A"}
        </p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200 transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-medium text-red-900">Motivos Únicos</span>
        </div>
        <p className="text-2xl font-bold text-red-900">
          {dados.length}
        </p>
      </div>
    </div>
  );
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
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 whitespace-nowrap">
            {item.setor}
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

const InsightsAutomaticos = ({ dados }: { dados: CancelamentoData[] }) => {
  const principalMotivo = dados.length > 0 ? dados[0] : null;
  const motivosTecnicos = dados.filter(item => item.setor === "Técnico");
  const totalTecnicos = motivosTecnicos.reduce((sum, item) => sum + item.quantidade, 0);
  const totalGeral = dados.reduce((sum, item) => sum + item.quantidade, 0);

  const insights = [];

  if (principalMotivo && principalMotivo.porcentagem > 30) {
    insights.push({
      tipo: "alerta",
      titulo: "Alto Índice de Cancelamento",
      descricao: `${principalMotivo.motivo} representa ${principalMotivo.porcentagem}% dos cancelamentos.`,
      acao: "Revisar processo relacionado a este motivo."
    });
  }

  if (totalTecnicos > 0 && (totalTecnicos / totalGeral) > 0.4) {
    insights.push({
      tipo: "tecnico",
      titulo: "Problemas Técnicos Recorrentes",
      descricao: `${Math.round((totalTecnicos / totalGeral) * 100)}% dos cancelamentos são por motivos técnicos.`,
      acao: "Considerar melhorias na infraestrutura técnica."
    });
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border transition-all hover:shadow-md ${insight.tipo === "alerta"
            ? "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
            : "bg-blue-50 border-blue-200 hover:bg-blue-100"
            }`}
        >
          <div className="flex items-start gap-3">
            <Info className={`h-5 w-5 mt-0.5 flex-shrink-0 ${insight.tipo === "alerta" ? "text-yellow-600" : "text-blue-600"
              }`} />
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${insight.tipo === "alerta" ? "text-yellow-800" : "text-blue-800"
                }`}>
                {insight.titulo}
              </p>
              <p className={`text-sm mt-1 ${insight.tipo === "alerta" ? "text-yellow-700" : "text-blue-700"
                }`}>
                {insight.descricao}
              </p>
              <p className={`text-xs mt-2 font-medium ${insight.tipo === "alerta" ? "text-yellow-600" : "text-blue-600"
                }`}>
                💡 {insight.acao}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export function CancelationInPeriod() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 4, 30),
  });

  const { data: cancelamentos, isLoading } = usePlanilha({ aba: "ClientesMaio2025" })

  const cancelamentosProcessados = useMemo(() => {
    if (!cancelamentos || !Array.isArray(cancelamentos)) return [];

    const { from, to } = dateRange || {};

    // Filtrar por data
    const filtrados = cancelamentos.filter((item) => {
      const data = formatarData(item.dataCancelamento);
      if (!data) return false;

      if (from && data < from) return false;
      if (to && data > to) return false;

      return true;
    });

    // Agrupar por motivo
    const contagemMap = new Map();

    filtrados.forEach((item) => {
      const motivo = item.motivoReal?.trim() || "Motivo não informado";
      const data = formatarData(item.dataCancelamento);

      if (!data) return;

      const entry = contagemMap.get(motivo);
      if (entry) {
        entry.quantidade += 1;
        entry.datas.push(data);
      } else {
        contagemMap.set(motivo, { quantidade: 1, datas: [data] });
      }
    });

    // Converter para array e calcular percentuais
    const total = filtrados.length;
    const mesAtual = format(new Date(), "MMMM/yyyy", { locale: ptBR });

    return Array.from(contagemMap.entries())
      .map(([motivo, { quantidade, datas }], index) => ({
        id: String(index + 1),
        motivo,
        quantidade,
        porcentagem: total > 0 ? Math.round((quantidade / total) * 100) : 0,
        setor: definirSetor(motivo),
        mes: capitalizarPrimeiraLetra(mesAtual),
        dataCancelamento: datas[0],
      }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }, [cancelamentos, dateRange]);

  const maxValue = cancelamentosProcessados.length > 0
    ? Math.max(...cancelamentosProcessados.map(item => item.quantidade))
    : 1;

  return (
    <div className="w-full max-w-7xl h-[calc(100vh-240px)] overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Análise de Cancelamentos
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Insights detalhados sobre cancelamentos no período
              </p>
            </div>
            <DateRangePicker className="font-bold" date={dateRange} OnDateChange={setDateRange} />
          </div>
        </div>

        <div className="">
          {isLoading ? (
            <CancelationInPeriodSkeleton />
          ) : cancelamentosProcessados.length > 0 ? (
            <div className="p-4 sm:p-6">
              <EstatisticasResumo dados={cancelamentosProcessados} />

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Distribuição por Motivo
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Insights e Recomendações
                </h3>
                <InsightsAutomaticos dados={cancelamentosProcessados} />
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