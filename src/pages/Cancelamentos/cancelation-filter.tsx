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
import { allPlans, bairrosCotia, condominios, motivosCancelamentos, type newSearchRetention } from "@/utils";
import { Filter, Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { type z } from "zod";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";


type NewSearchRetentionType = z.infer<typeof newSearchRetention>;

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
  const { handleSubmit, register, control } = useForm<NewSearchRetentionType>({
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

  function handleFilter({
    clientName,
    userId,
    reason,
    neighborhood,
    dateRange,
    plan,
    condominium
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
      if (plan) {
        state.set("plan", plan);
      } else {
        state.delete("plan");
      }
      if (condominium) {
        state.set("condominium", condominium);
      } else {
        state.delete("condominium");
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
      state.delete("plan")
       state.delete("condominium")
      return state;
    });
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
      {/* Filter Form */}
      {showFilters && (
        <div className="bg-muted/30 rounded-lg p-4 border duration-300 ease-in">
          <form onSubmit={handleSubmit(handleFilter)} className="space-y-3">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Input {...register("userId")} placeholder="ID do cliente" className="h-8" />
              <Input {...register("clientName")} placeholder="Nome do cliente" className="h-8" />
              <Controller
            
                name="plan"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select  onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPlans.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <DateRangePicker date={dateRangeCalendar} OnDateChange={setDateRangeCalendar}/>
              <Controller
                name="reason"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
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
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Selecione o bairro" />
                    </SelectTrigger>
                    <SelectContent>
                      {bairrosCotia.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="clientName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Selecione o condomínio" />
                    </SelectTrigger>
                    <SelectContent>
                      {condominios.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="flex flex-1 gap-2 lg:col-span-1 w-full">
                <Button type="submit" size="default" className="h-8 bg-blue-600 w-[200px] hover:bg-blue-700">
                  <Search className="h-3 w-3 mr-1" />
                  Filtrar
                </Button>
                <Button
                  onClick={handleClearFilter}
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-8 bg-transparent"
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
