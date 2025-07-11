import { usePlanilha } from "@/api/planilha";
import { MapPin } from "lucide-react";
export function TopCancelledNeighborhoodsCard() {


    const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" })

    const contagemBairros = cancelamentos?.reduce((acc, item) => {
        const bairro = item.bairro ?? "desconhecido";
        acc[bairro] = (acc[bairro] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const top4Bairros = Object.entries(contagemBairros ?? {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Bairros Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Mês de Maio</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-3">
                {
                    top4Bairros.map(([bairro, quantidade]) => (
                        <div key={bairro} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{bairro}</span>
                            <span className="text-sm font-bold">{quantidade} cancelamentos</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}