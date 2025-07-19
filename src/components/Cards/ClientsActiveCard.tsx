import { TrendingUp, Users } from "lucide-react";


export function ClientsActiveCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Clientes ativos (mês)</p>
          <p className="text-3xl font-bold text-gray-900">765</p>
          <p className="text-sm text-green-600 font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            + 20% referente vs mês anterior
          </p>
        </div>
        <Users className="h-12 w-12 text-blue-500" />
      </div>
    </div>
  );
}
