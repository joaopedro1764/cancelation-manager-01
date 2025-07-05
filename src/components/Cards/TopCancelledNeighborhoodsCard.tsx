import { MapPin } from "lucide-react";
export function TopCancelledNeighborhoodsCard() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">Bairros Mais Cancelados</p>
                    <p className="text-sm text-gray-600">Últimos 30 dias</p>
                </div>
                <MapPin className="h-8 w-8 text-cyan-500" />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Centro</span>
                    <span className="text-sm font-bold">15 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Jardim América</span>
                    <span className="text-sm font-bold">12 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Vila São José</span>
                    <span className="text-sm font-bold">9 cancelamentos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Parque Imperial</span>
                    <span className="text-sm font-bold">8 cancelamentos</span>
                </div>
            </div>
        </div>
    )
}