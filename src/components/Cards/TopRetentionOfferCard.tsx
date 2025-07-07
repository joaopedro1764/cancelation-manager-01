import { TrendingUp } from "lucide-react";

export function TopRetentionOfferCard() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Proposta Destaque</p>
                    <p className="text-sm text-gray-600">Mais utilizada para reter</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">30%</span>
                </div>
                <p className="text-lg font-bold text-gray-900">Desconto 30% por 6 meses</p>
                <p className="text-sm text-gray-600">Proposta Premium</p>
                <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">89%</p>
                    <p className="text-sm text-blue-600">Taxa de sucesso</p>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    <p>Utilizada em <span className="font-semibold">234 retenções</span> este mês</p>
                </div>
            </div>
        </div>
    );
}