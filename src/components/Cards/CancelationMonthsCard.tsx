import { usePlanilha } from "@/api/planilha";
import { TrendingUp, UserMinus } from "lucide-react";


export function CancelationMonthsCard() {

  const { data: cancelamentos } = usePlanilha({ aba: "ClientesMaio2025" })
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:-translate-y-3 duration-500 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Cancelamentos (mês)</p>
          <p className="text-3xl font-bold text-gray-900">{cancelamentos?.length}</p>
          <p className="text-sm text-green-600 font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            + 20% referente ao mês passado
          </p>
        </div>
        <UserMinus className="h-12 w-12 text-orange-500" />
      </div>
    </div>
  );
}
