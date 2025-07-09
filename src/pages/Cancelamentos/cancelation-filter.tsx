import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bairrosCotia, motivosCancelamentos, type newSearchRetention } from "@/utils";
import { Filter, Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import type { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";


type NewSearchRetentionType = z.infer<typeof newSearchRetention>;

export function CancelationFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const clientName = searchParams.get("clientName");
  const userId = searchParams.get("userId");
  /* const dateRange = searchParams.get("dateRange"); */
  const reason = searchParams.get("reason");

  const [dateRangeCalendar, setDateRangeCalendar] = useState<
    DateRange | undefined
  >({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const { handleSubmit, register, control } = useForm<NewSearchRetentionType>({
    values: {
      dateRange: {
        from: dateRangeCalendar?.to,
        to: dateRangeCalendar?.from,
      },
      clientName: clientName ?? "",
      userId: userId ?? "",
      reason: reason ?? "",
    },
  });

  function handleFilter({
    clientName,
    userId,
    reason,
    neighborhood,
    dateRange
  }: NewSearchRetentionType) {
    setSearchParams((state) => {
      if (userId) {
        state.set("userId", userId);
      } else {
        state.delete("userId");
      }
      if (clientName) {
        state.set("clientName", clientName);
      } else {
        state.delete("clientName");
      }
      if (reason) {
        state.set("reason", reason);
      } else {
        state.delete("reason");
      }
      if (dateRange?.from && dateRange?.to) {
        const formattedFrom = format(dateRange.from, "dd/MM/yyyy");
        const formattedTo = format(dateRange.to, "dd/MM/yyyy");

        state.set("dateFrom", formattedFrom);
        state.set("dateTo", formattedTo);
      } else {
        state.delete("dateFrom");
        state.delete("dateTo");
      }
      if (neighborhood) {
        state.set("neighborhood", neighborhood);
      } else {
        state.delete("neighborhood");
      }
      return state;
    });
  }

  const handleClearFilter = () => {
    setSearchParams((state) => {
      state.delete("userId");
      state.delete("clientName");
      state.delete("reason");
      state.delete("dateFrom");
      state.delete("dateTo");
      state.delete("neighborhood")
      return state;
    });
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
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="items-center flex gap-2 mb-3 flex-wrap"
        >
          <Input
            {...register("userId")}
            className="h-8 w-[200px]"
            placeholder="ID do cliente"
          />
          <Input
            {...register("clientName")}
            className="h-8 w-[250px]"
            placeholder="Nome do cliente"
          />

          <DateRangePicker
            {...register("dateRange")}
            date={dateRangeCalendar}
            OnDateChange={setDateRangeCalendar}
          />

          <Controller
            name="reason"
            control={control}
            render={({ field: { onChange, value, disabled, name } }) => (
              <Select
                onValueChange={onChange}
                disabled={disabled}
                name={name}
                value={value}
              >
                <SelectTrigger className="h-8 w-[250px]">
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent className="h-[280px]">
                  {motivosCancelamentos.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="neighborhood"
            control={control}
            render={({ field: { onChange, value, disabled, name } }) => (
              <Select
                onValueChange={onChange}
                disabled={disabled}
                name={name}
                value={value}
              >
                <SelectTrigger className="h-8 w-[250px]">
                  <SelectValue placeholder="Selecione o bairro" />
                </SelectTrigger>
                <SelectContent className="h-[280px]">
                  {bairrosCotia.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white"
          >
            <Search className="mr-2 h-4 w-4" /> Filtrar resultados
          </Button>
          <Button
            onClick={handleClearFilter}
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </Button>
        </form>
      )}
    </>
  );
}
