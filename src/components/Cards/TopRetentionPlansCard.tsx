import { usePlanilha } from "@/api/planilha";
import { Trophy } from "lucide-react";

export function TopRetentionPlansCard() {
       const { data: retencoes } = usePlanilha({ aba: "ClientesMaio2025" })
   
   
       const normalizarPlano = (plano: string) => plano.replace(/^\d\s*/, "");
   
       const contagemPlanos = retencoes?.reduce((acc, item) => {
           const planoOriginal = item.plano ?? "";
           const plano = normalizarPlano(planoOriginal);
           acc[plano] = (acc[plano] || 0) + 1;
           return acc;
       }, {} as Record<string, number>);
   
       const top6Planos = Object.entries(contagemPlanos ?? {})
           .sort((a, b) => b[1] - a[1])
           .slice(0,3 ); 
   
   
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Ranking de Planos</p>
                    <p className="text-sm text-gray-600">Planos mais retidos</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-3">
                {top6Planos.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                                <p className="font-bold text-blue-600">{plan[0]}</p>
                                <p className="text-sm text-gray-600">{plan[1]}% taxa de retenção</p>
                            </div>
                        </div>
                       
                    </div>
                ))}
            </div>
        </div>
    );
}