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
import { Label } from "../ui/label";
import { motivosCancelamento } from "@/utils";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";

export function CancelationInPeriod() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#94A3B8", "#CBD5E1"];

  return (
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
              <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
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
  );
}
