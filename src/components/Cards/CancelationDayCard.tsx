import { CalendarMinus, TrendingDown } from "lucide-react";

export function CancelationDayCard() {
  return (
    <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-cyan-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-300/10 to-blue-300/10 rounded-full translate-y-10 -translate-x-10"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
              <CalendarMinus className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelamentos</p>
              <p className="text-xs text-gray-500">Hoje</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-full">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-xs font-semibold text-red-600">5%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">12</span>
            <span className="text-sm text-gray-500">cancelamentos</span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="text-red-600 font-medium">↓ 5% menor</span> que ontem
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1.5 rounded-full w-3/5"></div>
        </div>
      </div>
    </div>
  );
}
