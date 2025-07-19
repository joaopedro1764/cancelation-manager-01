import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { allPlans, bairrosCotia, condominiuns, motivosCancelamentos, type SearchProps } from "@/utils";
import { Filter, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectPopoverField } from "@/components/Select/SelectPopover";
import { format } from "date-fns";


type NewSearchRetentionType = z.infer<typeof SearchProps>;

export function CancelationFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const clientName = searchParams.get("clientName");
  const userId = searchParams.get("userId");
  const reason = searchParams.get("reason");
  const plan = searchParams.get("plan");
  const [dateRangeCalendar, setDateRangeCalendar] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 4, 30),
  });
  const { handleSubmit, register, control, reset } = useForm<NewSearchRetentionType>({
    values: {
      dateRange: {
        from: dateRangeCalendar?.to,
        to: dateRangeCalendar?.from,
      },
      clientName: clientName ?? "",
      userId: userId ?? "",
      reason: reason ?? "",
      plan: plan ?? "",
    },
  });

  function handleFilter(filters: NewSearchRetentionType) {
    setSearchParams((state) => {
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "dateRange" && value && typeof value === "object") {
          const { from, to } = value as { from?: Date; to?: Date };
          if (from) {
            state.set("dateFrom", format(from, "dd/MM/yyyy"));
          } else {
            state.delete("dateFrom");
          }
          if (to) {
            state.set("dateTo", format(to, "dd/MM/yyyy"));
          } else {
            state.delete("dateTo");
          }
        } else if (value && typeof value === "string") {
          state.set(key, value);
        } else {
          state.delete(key);
        }
      });

      return state;
    });
  }

  function handleClearAllFilters() {
    setSearchParams(new URLSearchParams());
    reset()
  };


  return (
    <div className="w-full space-y-3 mb-2">

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFilters((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        {showFilters ? "Ocultar filtros" : "Filtros"}

      </Button>

      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 border duration-300 ease-in">
          <form onSubmit={handleSubmit(handleFilter)} className="space-y-3">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

              <Input {...register("userId")} placeholder="ID do cliente" className="h-8" />

              <Input {...register("clientName")} placeholder="Nome do cliente" className="h-8" />

              <SelectPopoverField
                name="plan"
                control={control}
                options={allPlans}
                placeholder="Selecione o plano"
                emptyText="Nenhum plano encontrado."
              />

              <DateRangePicker className="w-full" date={dateRangeCalendar} OnDateChange={setDateRangeCalendar} />

              <SelectPopoverField
                name="reason"
                control={control}
                options={motivosCancelamentos}
                placeholder="Selecione o motivo"
                emptyText="Nenhum motivo encontrado."
              />

              <SelectPopoverField
                name="neighborhood"
                control={control}
                options={bairrosCotia}
                placeholder="Selecione o bairro"
                emptyText="Nenhum bairro encontrado."
              />

              <SelectPopoverField
                name="condominium"
                control={control}
                options={condominiuns}
                placeholder="Selecione o condominio"
                emptyText="Nenhum condominio encontrado."
              />

              <div className="flex flex-1 gap-2 lg:col-span-1 max-w-[300px] w-full">
                <Button type="submit" className="h-8 bg-blue-600 hover:bg-blue-700">
                  <Search className="h-3 w-3 mr-1" />
                  Filtrar
                </Button>
                <Button
                  onClick={handleClearAllFilters}
                  type="button"
                  variant="outline"
                  className="h-8 bg-transparent shadow-sm"
                >
                  
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
