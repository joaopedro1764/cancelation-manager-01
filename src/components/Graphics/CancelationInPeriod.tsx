import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DateRangePicker } from "../ui/date-range-picker";
import { motivosCancelamento, type CustomTooltipProps } from "@/utils";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";
import { Filter, TrendingDown } from "lucide-react";
import { Label } from "../ui/label";

export function CancelationInPeriod() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
const colors = [
  // 🔵 Azuis vibrantes
  '#2563EB', // blue-600
  '#3B82F6', // blue-500
  '#0EA5E9', // sky-500

  // 🟢 Verdes vibrantes
  '#10B981', // emerald-500
  '#22C55E', // green-500
  '#4ADE80', // green-400

  // 🟡 Amarelos vibrantes
  '#EAB308', // yellow-500
  '#FACC15', // yellow-400
  '#FDE047', // yellow-300

  // 🔴 Vermelhos vibrantes
  '#EF4444', // red-500
  '#F87171', // red-400
  '#DC2626', // red-600

  // 🟢 Tons extras de verde/teal
  '#14B8A6', // teal-500
  '#0D9488', // teal-600

  // 🔵 Tons extras de azul
  '#1D4ED8', // blue-700
  '#3B5BDB', // custom strong blue
  '#0284C7', // sky-600

  // 🟠 Extra para contraste
  '#F97316', // orange-500
];



const CustomTooltip = ({ active, payload, label }:CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Cancelamentos:</span>
          <span className="font-bold text-blue-600">{payload[0].payload.quantidade}</span>
        </div>
      </div>
    );
  }
  return null;
};

const totalCancelamentos = motivosCancelamento.reduce((sum, item) => sum + item.quantidade, 0);

const motivosCancelamentoOrdenados = [...motivosCancelamento].sort((a, b) => b.quantidade - a.quantidade);

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-xl border border-gray-100">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingDown className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cancelamentos no período</h1>
            <p className="text-sm text-gray-500">Total: {totalCancelamentos} cancelamentos</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <Label className="text-sm font-medium text-gray-600">Período</Label>
          </div>
          <DateRangePicker date={dateRange} OnDateChange={setDateRange} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Maior Motivo</div>
          <div className="text-lg font-bold text-gray-800">{motivosCancelamento[0].motivo}</div>
          <div className="text-sm text-blue-600 font-medium">{motivosCancelamento[0].quantidade} casos</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Média por Motivo</div>
          <div className="text-lg font-bold text-gray-800">{Math.round(totalCancelamentos / motivosCancelamento.length)}</div>
          <div className="text-sm text-green-600 font-medium">cancelamentos</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Motivos Ativos</div>
          <div className="text-lg font-bold text-gray-800">{motivosCancelamento.length}</div>
          <div className="text-sm text-orange-600 font-medium">categorias</div>
        </div>
      </div>

      <div className="bg-white flex items-center justify-center rounded-2xl shadow-lg border border-gray-100 p-4 h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={motivosCancelamentoOrdenados}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              strokeOpacity={0.5}
              vertical={false}
            />
            
            <XAxis
              dataKey="motivo"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 500 }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={100}
              stroke="#6B7280"
              tickFormatter={(value) =>
                value.length > 15 ? value.slice(0, 15) + "..." : value
              }
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 500 }}
              stroke="#6B7280"
              tickFormatter={(value) => `${value}`}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="quantidade" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              {motivosCancelamento.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
