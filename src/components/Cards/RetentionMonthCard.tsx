import { TrendingUp, UserCheck } from "lucide-react";


export function RetentionMonthCard() {
  return (
     <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:-translate-y-3 duration-500 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Retenções (mês)</p>
        <p className="text-3xl font-bold text-gray-900">90</p>
        <p className="text-sm text-green-600 flex font-semibold items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          + 50% referente ao mês passado
        </p>
      </div>
      <UserCheck className="h-12 w-12 text-green-500" />
    </div>
  </div>
  );
}
