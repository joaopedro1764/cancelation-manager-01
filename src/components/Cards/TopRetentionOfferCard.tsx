import { usePlanilha } from "@/api/planilha";
import { TrendingUp, Award, BarChart3, Crown, Target } from "lucide-react";
import { useMemo } from "react";


export function TopRetentionOfferCard() {
  const { data: retencoes, isLoading, error } = usePlanilha({ 
    aba: "Retenções Outros Setores" 
  });

  const { propostaMaisUsada, totalDaMaisUsada, porcentagemUso, totalRetencoes } = useMemo(() => {
    if (!retencoes?.length) {
      return {
        propostaMaisUsada: "Nenhuma",
        totalDaMaisUsada: 0,
        porcentagemUso: 0,
        totalRetencoes: 0
      };
    }

    const totalRetencoes = retencoes.length;
    
    const contagemPropostas = retencoes.reduce((acc, item) => {
      const retencao = item.retencaoAplicada?.trim();
      if (!retencao) return acc;
      
      acc[retencao] = (acc[retencao] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const entries = Object.entries(contagemPropostas);
    if (entries.length === 0) {
      return {
        propostaMaisUsada: "Nenhuma",
        totalDaMaisUsada: 0,
        porcentagemUso: 0,
        totalRetencoes
      };
    }

    const [propostaMaisUsada, totalDaMaisUsada] = entries
      .sort((a, b) => b[1] - a[1])[0];

    const porcentagemUso = Math.round((totalDaMaisUsada / totalRetencoes) * 100);

    return {
      propostaMaisUsada,
      totalDaMaisUsada,
      porcentagemUso,
      totalRetencoes
    };
  }, [retencoes]);

  if (isLoading) {
    return <LoadingCard />;
  }

  if (error) {
    return <ErrorCard />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header com gradiente igual ao card anterior */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 pb-0 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Proposta Destaque</h3>
            <p className="text-sm text-blue-100">Mais utilizada para retenção</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-0 relative">
        {/* Ícone centralizado sobreposto */}
        <div className="flex justify-center -mt-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
              <Award className="w-10 h-10 text-white" />
            </div>
            {/* Badge de destaque */}
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <Crown className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Proposta Principal */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100 mb-4">
              <p className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                {propostaMaisUsada.length > 40 
                  ? `${propostaMaisUsada.substring(0, 40)}...` 
                  : propostaMaisUsada}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Proposta mais aplicada
              </p>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{porcentagemUso}%</div>
              <div className="text-sm text-blue-600/80 font-medium">Taxa de uso</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{totalDaMaisUsada}</div>
              <div className="text-sm text-emerald-600/80 font-medium">Retenções</div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">
                {totalDaMaisUsada} de {totalRetencoes} retenções neste período
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100">
      <div className="text-center">
        <div className="p-3 bg-red-50 rounded-full w-fit mx-auto mb-4">
          <TrendingUp className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Erro ao carregar dados
        </h3>
        <p className="text-sm text-gray-500">
          Não foi possível carregar as informações de retenção
        </p>
      </div>
    </div>
  );
}