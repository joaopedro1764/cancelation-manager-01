import { Trophy } from "lucide-react";

export function TopRetentionPlansCard() {
    const topPlans = [
        { name: "Plano Premium", retentions: 156, percentage: 85 },
        { name: "Plano Família", retentions: 132, percentage: 78 },
        { name: "Plano Básico", retentions: 98, percentage: 65 },
        { name: "Plano Empresarial", retentions: 87, percentage: 72 }
    ];

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
                {topPlans.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{plan.name}</p>
                                <p className="text-sm text-gray-600">{plan.percentage}% taxa de retenção</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{plan.retentions}</p>
                            <p className="text-xs text-gray-500">retenções</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}