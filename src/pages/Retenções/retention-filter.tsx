import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { colaborators, difficultys, months, motivosRetencoes, SearchProps, sectors } from "@/utils";
import { useState } from "react";
import type { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { SelectPopoverField } from "@/components/Select/SelectPopover";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export type NewSearchRetentionType = z.infer<typeof SearchProps>;

export function RetentionFilter() {

  const [dateRangeCalendar, setDateRangeCalendar] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 4, 30),
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const clientName = searchParams.get("clientName");
  const userId = searchParams.get("userId");
  const reason = searchParams.get("reason");
  const sector = searchParams.get("sector");
  const { handleSubmit, register, control, reset } = useForm<NewSearchRetentionType>({
    values: {
      clientName: clientName ?? "",
      userId: userId ?? "",
      reason: reason ?? "",
      sector: sector ?? "",
       dateRange: {
        from: dateRangeCalendar?.to,
        to: dateRangeCalendar?.from,
      }
    },
  });

  function handleFilter(filters: NewSearchRetentionType) {
    setSearchParams((state) => {
      console.log(filters)
      Object.entries(filters).forEach(([key, value]) => {
        console.log("oi")
        if (key === "dateRange" && value && typeof value === "object") {
          console.log("oi")
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
          console.log("oi")
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
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFilters((prev) => !prev)}
        className="flex items-center gap-2 mb-4"
      >
        <Filter className="h-4 w-4" />
        {showFilters ? "Ocultar filtros" : "Exibir filtros"}
      </Button>

      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 border duration-300 ease-in">

          <form onSubmit={handleSubmit(handleFilter)} className="space-y-3">

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Input
                {...register("userId")}
                placeholder="ID do cliente"
                aria-label="ID do cliente"
                className=""
              />

              <Input
                {...register("contractId")}
                placeholder="ID do contrato"
                aria-label="ID do contrato"
                className="h-8"
              />

              <Input
                {...register("attendanceId")}
                placeholder="ID do atendimento"
                aria-label="ID do atendimento"
                className="h-8"
              />

              <Input
                {...register("clientName")}
                placeholder="Nome do cliente"
                aria-label="Nome do cliente"
                className="h-8"
              />

              <DateRangePicker
                {...register("dateRange")}
                date={dateRangeCalendar}
                OnDateChange={setDateRangeCalendar}
                aria-label="Período"
              />

              <SelectPopoverField
                name="reason"
                control={control}
                options={motivosRetencoes}
                placeholder="Selecione o motivo"
                emptyText="Nenhum motivo encontrado."
                aria-label="Motivo"
              />

              <SelectPopoverField
                name="month"
                control={control}
                options={months}
                placeholder="Selecione o mês"
                emptyText="Nenhum mês encontrado."
                aria-label="Mês"
              />

              <SelectPopoverField
                name="sector"
                control={control}
                options={sectors}
                placeholder="Selecione o setor"
                emptyText="Nenhum bairro encontrado."
                aria-label="Setor"
              />
              <SelectPopoverField
                name="colaborator"
                control={control}
                options={colaborators}
                placeholder="Selecione o colaborador"
                emptyText="Nenhum colaborador encontrado."
                aria-label="Colaborador"
              />
              <SelectPopoverField
                name="difficulty"
                control={control}
                options={difficultys}
                placeholder="Selecione a dificuldade"
                emptyText="Nenhum bairro encontrado."
                aria-label="Dificuldade"
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
                  Limpar
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
