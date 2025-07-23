import { CalendarMinus, TrendingDown } from "lucide-react";

export function CancelationDayCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500">
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <p className="text-xl font-bold">Cancelamentos (dia)</p>
        <p className="text-5xl font-bold text-gray-900">12</p>
        <p className="text-sm text-red-600 font-semibold flex items-center">
          <TrendingDown className="h-4 w-4 mr-1" />
          - 5% referente a ontem
        </p>
      </div>
      <CalendarMinus  className="h-12 w-12 text-cyan-500" />
    </div>
  </div>
  );
}
