import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
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


  return (
    <div className="flex-1 h-full border p-4 rounded-lg shadow">
      <div className="flex justify-between items-center font-bold gap-3">
        <h1 className="text-xl text-blue-600">Cancelamentos no período</h1>
        <div className="flex justify-end gap-3">
          <Label className="font-bold text-blue-400">Período</Label>
          <DateRangePicker date={dateRange} OnDateChange={setDateRange} />
        </div>
      </div>

      <ResponsiveContainer width="100%">
        <BarChart
          data={motivosCancelamento}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            className="text-[10px] font-bold"
            dataKey="motivo"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
            tickFormatter={(value) =>
              value.length > 15 ? value.slice(0, 15) + "..." : value
            }
          />

          <Tooltip />
          <Bar dataKey="quantidade" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
