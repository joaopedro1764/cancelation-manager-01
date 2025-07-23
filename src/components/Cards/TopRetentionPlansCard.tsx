import { usePlanilha } from "@/api/planilha";
import { Trophy, Crown, Medal, Award } from "lucide-react";
import { useMemo } from "react";

export function TopRetentionPlansCard() {
  const { data: retencoes, isLoading, error } = usePlanilha({ 
    aba: "Retenções Outros Setores" 
  });

  const { topPlanos } = useMemo(() => {
    if (!retencoes?.length) {
      return { topPlanos: [], totalRetencoes: 0 };
    }

    const normalizarPlano = (plano: string) => 
      plano.replace(/^\d+\s*/, "").trim() || "Plano Desconhecido";

    const contagemPlanos = retencoes.reduce((acc, item) => {
      const planoOriginal = item.plano ?? "";
      if (!planoOriginal.trim()) return acc;
      
      const plano = normalizarPlano(planoOriginal);
      acc[plano] = (acc[plano] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPlanos = Object.entries(contagemPlanos)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([plano, quantidade], index) => ({
        plano,
        quantidade,
        posicao: index + 1,
        porcentagem: Math.round((quantidade / retencoes.length) * 100)
      }));

    return {
      topPlanos,
      totalRetencoes: retencoes.length
    };
  }, [retencoes]);

  if (isLoading) {
    return <LoadingCard />;
  }

  if (error) {
    return <ErrorCard />;
  }

  if (topPlanos.length === 0) {
    return <EmptyCard />;
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-600" />;
      case 2: return <Medal className="h-5 w-5 text-gray-500" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <Trophy className="h-4 w-4 text-blue-500" />;
    }
  };

  const getRankColors = (position: number) => {
    switch (position) {
      case 1: return {
        bg: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200',
        badge: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white',
        text: 'text-yellow-800',
        number: 'text-yellow-700'
      };
      case 2: return {
        bg: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200',
        badge: 'bg-gradient-to-r from-gray-400 to-slate-400 text-white',
        text: 'text-gray-800',
        number: 'text-gray-700'
      };
      case 3: return {
        bg: 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200',
        badge: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white',
        text: 'text-orange-800',
        number: 'text-orange-700'
      };
      default: return {
        bg: 'bg-blue-50 border-blue-200',
        badge: 'bg-blue-500 text-white',
        text: 'text-blue-800',
        number: 'text-blue-700'
      };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-6 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Ranking de Planos
              </h3>
              <p className="text-gray-200 text-sm">
                Top 3 planos mais retidos
              </p>
            </div>
          </div>
        
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full flex flex-col mt-10">
       <div className="space-y-2">
          {topPlanos.map((item) => {
            const colors = getRankColors(item.posicao);
            
            return (
              <div 
                key={item.plano}
                className={`relative p-3 rounded-lg border transition-all duration-200 hover:scale-[1.01] ${colors.bg}`}
              >
                {/* Ribbon compacto para 1º lugar */}
                {item.posicao === 1 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                    🏆
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Lado Esquerdo */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Badge de Posição compacto */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colors.badge} shadow-md`}>
                      <span className="text-sm font-bold">
                        {item.posicao}
                      </span>
                    </div>

                    {/* Informações do Plano */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        {getRankIcon(item.posicao)}
                        <h4 className={`font-semibold text-sm truncate ${colors.text}`}>
                          {item.plano}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {item.quantidade} retenções
                      </p>
                    </div>
                  </div>

                  {/* Lado Direito - Métricas compactas */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${colors.number}`}>
                        {item.porcentagem}%
                      </div>
                      <div className="text-xs text-gray-500">
                        do total
                      </div>
                    </div>
                    
                    {/* Barra de progresso vertical compacta */}
                    <div className="w-2 h-8 bg-white/60 rounded-full overflow-hidden">
                      <div 
                        className={`w-full transition-all duration-700 ease-out ${
                          item.posicao === 1 ? 'bg-gradient-to-t from-yellow-400 to-amber-500' :
                          item.posicao === 2 ? 'bg-gradient-to-t from-gray-400 to-slate-500' :
                          'bg-gradient-to-t from-orange-400 to-amber-500'
                        }`}
                        style={{ 
                          height: `${Math.min(item.porcentagem * 2, 100)}%`,
                          alignSelf: 'flex-end'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats compacto */}
        <div className="mt-6 pt-2 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Top 3: <span className="font-bold text-blue-600">
                {topPlanos.reduce((sum, item) => sum + item.porcentagem, 0)}%
              </span> das retenções
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-10 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="w-2 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6">
      <div className="text-center">
        <div className="p-3 bg-red-50 rounded-full w-fit mx-auto mb-4">
          <Trophy className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Erro ao carregar ranking
        </h3>
        <p className="text-sm text-gray-500">
          Não foi possível carregar os dados de retenção
        </p>
      </div>
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="text-center">
        <div className="p-3 bg-blue-50 rounded-full w-fit mx-auto mb-4">
          <Trophy className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma retenção encontrada
        </h3>
        <p className="text-sm text-gray-500">
          Não há dados de retenção para este período
        </p>
      </div>
    </div>
  );
}