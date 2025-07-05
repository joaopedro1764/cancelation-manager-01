import { MessageSquare } from "lucide-react";

export function CancellationReasonsCard() {

    return (

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Motivos de Cancelamento</p>
                    <p className="text-sm text-gray-600">Últimos 30 dias</p>
                </div>
                <MessageSquare className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Mudança de endereço</span>
                    <span className="text-sm font-bold text-red-600">32%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Preço</span>
                    <span className="text-sm font-bold text-red-600">28%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Problemas técnicos</span>
                    <span className="text-sm font-bold text-red-600">22%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Atendimento</span>
                    <span className="text-sm font-bold text-red-600">18%</span>
                </div>
            </div>
        </div>
    )
}