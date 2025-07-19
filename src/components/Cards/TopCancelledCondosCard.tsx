import { usePlanilha } from "@/api/planilha";
import { Building2 } from "lucide-react";

export function TopCancelledCondosCard() {

    const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" })

    const contagemCondominios = cancelamentos?.reduce((acc, item) => {
        if (!item.condominio) {
            return acc;
        }
        const condominio = item.condominio ?? "desconhecido";
        acc[condominio] = (acc[condominio] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const top6Condominios = Object.entries(contagemCondominios ?? {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);



    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-bold text-blue-700">Condomínios Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Mês de Maio</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-3">
                {
                    top6Condominios.map(([condominio, quantidade]) => (
                        <div key={condominio} className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-700">{condominio}</span>
                            <span className="text-sm font-bold">{quantidade} cancelamentos</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}