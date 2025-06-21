import { CancelationDayCard } from "@/components/Cards/CancelationDayCard";
import { CancelationMonthsCard } from "@/components/Cards/CancelationMonthsCard";
import { ClientsActiveCard } from "@/components/Cards/ClientsActiveCard";
import { RetentionMonthCard } from "@/components/Cards/RetentionMonthCard";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { motivosCancelamento } from "@/utils";
import { startOfMonth } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const pieData = [
    { setor: "Cancelamento", quantidades: 20, porcentagem: 10 },
    { setor: "Suporte", quantidades: 75, porcentagem: 75 },
    { setor: "Comercial", quantidades: 15, porcentagem: 5 },
    { setor: "Financeiro", quantidades: 5, porcentagem: 5 },
    { setor: "Cobrança", quantidades: 2, porcentagem: 2 },
  ];

  const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#94A3B8", "#CBD5E1"];

  const ALT_COLORS = ["#1E40AF", "#3B82F6", "#60A5FA", "#A0AEC0", "#adb5bd"];

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border p-2 rounded shadow text-sm text-gray-800">
          <p>
            <strong>Setor:</strong> {data.setor}
          </p>
          <p>
            <strong>Porcentagem:</strong> {data.porcentagem}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex flex-col m-10 h-full">
      <div className="grid grid-cols-4 gap-4">
        <ClientsActiveCard />
        <CancelationMonthsCard />
        <CancelationDayCard />
        <RetentionMonthCard />
      </div>

      <div className="w-full h-[500px] flex justify-center flex-col md:flex-row gap-6 mt-16">
        <div className="flex-1 h-full border p-4 rounded-lg shadow">
          <div className="flex justify-between items-center font-bold gap-3 mb-5">
            <h1 className="text-xl text-blue-400">Cancelamentos no período</h1>
            <div className="flex justify-end gap-3">
              <Label className="font-bold text-blue-400">Período</Label>
              <DateRangePicker date={dateRange} OnDateChange={setDateRange} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={motivosCancelamento}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis fontSize={12} fontWeight="bold" dataKey="motivo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill={COLORS[0]} barSize={60}>
                {motivosCancelamento.map((_, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="w-full mt-4 flex justify-between flex-wrap gap-4">
            {motivosCancelamento.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-bold text-gray-700">
                  {item.motivo}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[40%] h-full border p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4 text-blue-400">Retenções por setor</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />

              <Pie
                onClick={(data, index) => {
                  alert("Setor clicado:" + data.setor);
                  // você pode chamar uma função, setar um state, etc
                }}
                className="font-semibold"
                data={pieData}
                activeIndex={-1}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="porcentagem"
                label={({ porcentagem }) => porcentagem + "%"}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ALT_COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full mt-7 flex justify-between flex-wrap gap-4">
            {pieData.map((item, index) => (
              <div key={item.setor} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: ALT_COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-bold text-gray-700">
                  {item.setor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
