import { usePlanilha } from "@/api/planilha";
import { CreditCard } from "lucide-react";

export function TopCancelledPlansCard() {

    const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" })


    const normalizarPlano = (plano: string) => plano.replace(/^\d\s*/, "");

    const contagemPlanos = cancelamentos?.reduce((acc, item) => {
        const planoOriginal = item.plano ?? "desconhecido";
        const plano = normalizarPlano(planoOriginal);
        acc[plano] = (acc[plano] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const top4Planos = Object.entries(contagemPlanos ?? {})
        .sort((a, b) => b[1] - a[1])
        .slice(0,6 ); 


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 hover:-translate-y-3 duration-700 ease-in-out">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Planos Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Mês de Maio</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-3">
                {
                    top4Planos.map(([plano, quantidade]) => (
                        <div key={plano} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{plano}</span>
                            <span className="text-sm font-bold">{quantidade} cancelamentos</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}