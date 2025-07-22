import { useState, useMemo } from "react";
import { format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, AlertTriangle, RefreshCcw } from "lucide-react";
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

    const totalCancelamentos = dados.reduce((sum, item) => sum + item.quantidade, 0);
    const principalMotivo = dados.length > 0 ? dados[0] : null;

    return (
      <>
        <div className="flex mb-2 -my-8">
          <span className="bg-blue-50 shadow text-black/70 font-bold rounded px-3 py-1.5">
            {totalCancelamentos} cancelamentos no período selecionado: {""}
            {dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "N/A"} - {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "N/A"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCcw className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Troca de provedor</span>
            </div>
            <div className="flex flex-col  space-y-5">

              {
                provedoreTrocados.length === 0 && (
                  <span className="text-sm text-center font-bold text-blue-900">Nenhum cancelamento por troca de provedor</span>
                )
              }
              {
                provedoreTrocados?.slice(0,3).map((item) => (
                  <p className="font-bold text-blue-900 leading-tight">
                    {item.provedor}: {""} {item.quantidade}
                  </p>
                ))
              }

            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-900">Principal Motivo</span>
            </div>
            <p className="text-sm font-bold text-orange-900 leading-tight" title={principalMotivo?.motivo}>
              {principalMotivo?.motivo && principalMotivo.motivo.length > 25
                ? `${principalMotivo.motivo}`
                : principalMotivo?.motivo || "N/A"}
              <div className="space-y-3 mt-2">
                {
                  bairrosInviabilidade.slice(0, 3).map((item) => (
                    <p>{item.bairro}: {item.quantidade}</p>
                  ))
                }
              </div>
            </p>

          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200 transition-all sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-sm font-medium text-red-900">Motivos insatisfação:</span>
            </div>
            <div className="flex flex-col justify-between flex-1 space-y-3 font-bold text-red-900">
              {
                motivosInsatisfacao.slice(0, 3).map((item) => (
                  <p className="text-sm">{item.motivoInsatisfacao}: {item.quantidade}</p>
                ))
              }
            </div>
          </div>
        </div>
      </>
    );
  };

  const maxValue = cancelamentosProcessados.length > 0
    ? Math.max(...cancelamentosProcessados.map(item => item.quantidade))
    : 1;

  return (
    <div className="w-full max-w-7xl h-[calc(100vh-240px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar-track]:bg-gray-100 
  [&::-webkit-scrollbar-thumb]:bg-blue-200 
  [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Análise de Cancelamentos
              </h2>
              <p className="text-sm text-gray-600">
                Visualize os principais dados e motivos dos cancelamentos ocorridos no período selecionado.
              </p>
            </div>
            <div>
              <span className="text-sm font-bold">Filtrar período:</span>
              <DateRangePicker className="font-bold" date={dateRange} OnDateChange={setDateRange} />
            </div>
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