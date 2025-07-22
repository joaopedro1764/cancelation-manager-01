import { usePlanilha } from "@/api/planilha";
import { TrendingUp, UserMinus } from "lucide-react";


export function CancelationMonthsCard() {

  const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" })
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <p className="text-xl font-bold">Cancelamentos (mês)</p>
        <p className="text-5xl font-bold text-gray-900">{cancelamentos?.length}</p>
        <p className="text-sm text-red-600 font-semibold flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          - 5% referente ao mês passado
        </p>
      </div>
      <UserMinus className="h-12 w-12 text-orange-500" />
    </div>
  </div>
  );
}
