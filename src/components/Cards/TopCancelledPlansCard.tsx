import { CreditCard } from "lucide-react";

export function TopCancelledPlansCard() {

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Planos Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Últimos 30 dias</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">MULTI 50</span>
                    <span className="text-sm font-bold">25 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">COMBO MULTI 250 + BASIC TV</span>
                    <span className="text-sm font-bold">18 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">COMBO MULTI 30</span>
                    <span className="text-sm font-bold ">15 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">COMBO MULTI 300</span>
                    <span className="text-sm font-bold">12 cancelamentos</span>
                </div>
            </div>
        </div>
    )
}