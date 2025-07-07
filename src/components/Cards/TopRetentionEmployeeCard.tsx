import { Trophy } from "lucide-react";

export function TopRetentionEmployeeCard(){

    return(
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-lg font-semibold text-gray-900">Colaborador Destaque</p>
        <p className="text-sm text-gray-600">Maior retenção do mês</p>
      </div>
      <Trophy className="h-8 w-8 text-blue-500" />
    </div>
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl font-bold text-blue-600">JS</span>
      </div>
      <p className="text-lg font-bold text-gray-900">João Silva</p>
      <p className="text-sm text-gray-600">Atendimento</p>
      <div className="mt-3 p-2 bg-blue-100 rounded-lg">
        <p className="text-2xl font-bold text-blue-600">45</p>
        <p className="text-sm text-blue-600">Retenções este mês</p>
      </div>
    </div>
  </div>
    )
}