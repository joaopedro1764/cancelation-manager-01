import { Building2 } from "lucide-react";

export function TopCancelledCondosCard() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Condomínios Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Últimos 30 dias</p>
                </div>
                <Building2 className="h-8 w-8 text-cyan-500" />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Residencial Sunset</span>
                    <span className="text-sm font-bold ">18 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Condomínio Vila Verde</span>
                    <span className="text-sm font-bold ">14 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Edifício Central Park</span>
                    <span className="text-sm font-bold">11 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Condomínio Bella Vista</span>
                    <span className="text-sm font-bold ">9 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Residencial Primavera</span>
                    <span className="text-sm font-bold ">7 cancelamentos</span>
                </div>
            </div>
        </div>
    )
}