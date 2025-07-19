import { TrendingDown, UserMinus } from "lucide-react";

export function CancelationDayCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">Cancelamentos (dia)</p>
        <p className="text-3xl font-bold text-gray-900">12</p>
        <p className="text-sm text-red-600 font-semibold flex items-center">
          <TrendingDown className="h-4 w-4 mr-1" />
          - 5% referente a ontem
        </p>
      </div>
      <UserMinus className="h-12 w-12 text-red-500" />
    </div>
  </div>
  );
}
