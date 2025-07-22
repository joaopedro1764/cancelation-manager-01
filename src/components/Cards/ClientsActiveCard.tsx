import { TrendingDown,  Users } from "lucide-react";


export function ClientsActiveCard() {
  return (
   <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <p className="text-xl font-bold">Ativos (mês)</p>
        <p className="text-5xl font-bold text-gray-900">780</p>
        <p className="text-sm text-red-600 font-semibold flex items-center">
          <TrendingDown className="h-4 w-4 mr-1" />
          - 5% referente ao mês passado
        </p>
      </div>
      <Users className="h-12 w-12 text-blue-500" />
    </div>
  </div>
  );
}
