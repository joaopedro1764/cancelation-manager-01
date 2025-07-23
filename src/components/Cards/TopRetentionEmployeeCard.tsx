import { usePlanilha } from "@/api/planilha";
import type { CancelamentoItem } from "@/utils";
import {  Star, TrendingUp, User, Award, Crown } from "lucide-react";
import { useMemo } from "react";



interface TopEmployee {
  name: string;
  count: number;
  percentage: number;
  mostUsedProposal: string;
  initials: string;
}

export function TopRetentionEmployeeCard() {
  const { data: retencoes, isLoading, error } = usePlanilha({ aba: "Retenções Outros Setores" });

  const topEmployee: TopEmployee | null = useMemo(() => {
    if (!retencoes?.length) return null;

    const totalRetencoes = retencoes.length;
    const employeeRetentions = retencoes.reduce((acc, item) => {
      if (!item.responsavel?.trim()) return acc;
      const responsavel = item.responsavel.trim();
      if (!acc[responsavel]) acc[responsavel] = [];
      acc[responsavel].push(item);
      return acc;
    }, {} as Record<string, CancelamentoItem[]>);

    const topEntry = Object.entries(employeeRetentions)
      .map(([name, retentions]) => ({ name, count: retentions.length, retentions }))
      .sort((a, b) => b.count - a.count)[0];

    if (!topEntry) return null;

    const { name, count, retentions } = topEntry;
    const percentage = Math.round((count / totalRetencoes) * 100);

    const proposalCounts = retentions.reduce((acc, item) => {
      const proposta = item.retencaoAplicada?.trim() || "Não especificada";
      acc[proposta] = (acc[proposta] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const [mostUsedProposal] = Object.entries(proposalCounts)
      .sort((a, b) => b[1] - a[1])[0] || ["Não especificada", 0];

    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');

    return { name, count, percentage, mostUsedProposal, initials };
  }, [retencoes]);

  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-xl mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-3"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !topEmployee) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-500">Top Retenção</p>
          <User className="h-5 w-5 text-gray-300" />
        </div>
        <div className="text-center text-gray-400">
          <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <p className="text-sm">Sem dados</p>
        </div>
      </div>
    );
  }

  return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header com gradiente e ícone */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 pb-0 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Destaque Retenção</h3>
            <p className="text-sm text-blue-100">Colaborador com mais retenções</p>
          </div>
        </div>
      </div>

      {/* Perfil do funcionário */}
      <div className="p-6 pt-0 relative">
        {/* Avatar centralizado sobreposto */}
        <div className="flex justify-center -mt-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-xl font-bold text-white">{topEmployee.initials}</span>
            </div>
            {/* Badge de estrela */}
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <Star className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Informações do funcionário */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-1">
            {topEmployee.name.split(' ').slice(0, 2).join(' ')}
          </h4>
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-700">Suporte</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="space-y-2">
          {/* Métricas principais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-blue-600 mb-1">{topEmployee.count}</div>
              <div className="text-sm text-blue-600/80 font-medium">Retenções</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-emerald-600">{topEmployee.percentage}%</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-sm text-emerald-600/80 font-medium">Do total</div>
            </div>
          </div>

          {/* Estratégia principal */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-600">Estratégia Principal</span>
            </div>
            <p className="text-sm font-medium text-gray-800 leading-relaxed" title={topEmployee.mostUsedProposal}>
              {topEmployee.mostUsedProposal.length > 35 
                ? `${topEmployee.mostUsedProposal.substring(0, 35)}...` 
                : topEmployee.mostUsedProposal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}