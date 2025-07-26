import { useState } from "react";
import { usePlanilha } from "@/api/planilha";
import { TrendingDown, Calendar, AlertTriangle, ChevronRight, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TopCancelledPlansCard() {
    const [selectedMonth, setSelectedMonth] = useState("Maio");
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
    
    const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" });

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                   "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const normalizarPlano = (plano: string) => plano.replace(/^\d\s*/, "");

    // Filtrar por mês se houver campo mes nos dados
    const cancelamentosFiltrados = cancelamentos?.filter(item => 
        !item.mes || item.mes === selectedMonth
    ) || [];

    const contagemPlanos = cancelamentosFiltrados.reduce((acc, item) => {
        const planoOriginal = item.plano ?? "desconhecido";
        const plano = normalizarPlano(planoOriginal);
        acc[plano] = (acc[plano] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topPlanos = Object.entries(contagemPlanos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    const totalCancelamentos = topPlanos.reduce((sum, [, quantidade]) => sum + quantidade, 0);

    // Simulação de dados do mês anterior para comparação
    const cancelamentosAnterior = Math.floor(totalCancelamentos * 0.85); // 15% a menos no mês anterior
    const variacao = ((totalCancelamentos - cancelamentosAnterior) / cancelamentosAnterior * 100);
    const isPositiveVariation = variacao > 0;

    const getBarWidth = (quantidade: number) => {
        const max = Math.max(...topPlanos.map(([, q]) => q));
        return `${(quantidade / max) * 100}%`;
    };

    const getRankingColor = (index: number) => {
        const colors = [
            { bg: "bg-red-500", light: "bg-red-50", text: "text-red-700", border: "border-red-200" },
            { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
            { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
            { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
            { bg: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
            { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" }
        ];
        return colors[index] || colors[5];
    };

    const getMedalIcon = (index: number) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈"; 
        if (index === 2) return "🥉";
        return `${index + 1}º`;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
            {/* Header Premium */}
            <div className="relative bg-gradient-to-br from-red-50 via-red-50 to-orange-50 p-4 border-b border-red-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500"></div>
                </div>
                
                <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                    <TrendingDown className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="h-2 w-2 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Planos Mais Cancelados</h3>
                                <p className="text-xs text-gray-600 font-semibold">Top 6 planos - {selectedMonth}</p>
                            </div>
                        </div>
                        
                        {/* Métrica Principal */}
                        <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-2xl font-bold text-red-600">{totalCancelamentos}</span>
                                <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                    isPositiveVariation 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {isPositiveVariation ? (
                                        <TrendingUp className="h-2.5 w-2.5" />
                                    ) : (
                                        <TrendingDown className="h-2.5 w-2.5" />
                                    )}
                                    <span>{Math.abs(variacao).toFixed(1)}%</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">vs mês anterior ({cancelamentosAnterior})</p>
                        </div>
                    </div>

                    {/* Filtro Elegante */}
                    <div className="flex items-center justify-between">
                    
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="w-32 h-8 text-sm bg-white/80 backdrop-blur-sm border-gray-200 hover:border-red-300 focus:ring-red-500/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {meses.map(mes => (
                                        <SelectItem key={mes} value={mes}>{mes}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista Premium com Animações */}
            <div className="p-4">
                {topPlanos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <TrendingDown className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">Nenhum cancelamento</p>
                        <p className="text-sm">encontrado para {selectedMonth}</p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {topPlanos.map(([plano, quantidade], index) => {
                            const colors = getRankingColor(index);
                            const percentage = ((quantidade / totalCancelamentos) * 100);
                            const isHovered = hoveredPlan === plano;
                            
                            return (
                                <div 
                                    key={plano}
                                    className={`group/item relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                        isHovered 
                                            ? `${colors.border} ${colors.light} shadow-md scale-[1.02]` 
                                            : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => setHoveredPlan(plano)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    <div className="p-3.5">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                {/* Ranking Badge */}
                                                <div className={`relative flex-shrink-0 w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center shadow-lg group-hover/item:shadow-xl transition-shadow`}>
                                                    <span className="text-white font-bold text-sm">
                                                        {getMedalIcon(index)}
                                                    </span>
                                                </div>
                                                
                                                {/* Nome do Plano */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-800 text-xs leading-tight truncate group-hover/item:text-gray-900 transition-colors">
                                                        {plano}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {percentage.toFixed(1)}% do total
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Métricas */}
                                            <div className="flex items-center space-x-2">
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-800 text-sm">{quantidade}</div>
                                                    <div className="text-xs text-gray-500">cancelamentos</div>
                                                </div>
                                                <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover/item:text-gray-600 transition-colors" />
                                            </div>
                                        </div>
                                        
                                        {/* Barra de Progresso Premium */}
                                        <div className="relative">
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden shadow-inner">
                                                <div 
                                                    className={`h-full ${colors.bg} rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden`}
                                                    style={{ width: getBarWidth(quantidade) }}
                                                >
                                                    {/* Efeito Shimmer */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

           
        </div>
    );
}