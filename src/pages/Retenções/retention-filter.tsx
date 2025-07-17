import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { months, motivosCancelamentos, newSearchRetention, setores } from "@/utils";
import { useState } from "react";
import type { z } from "zod";
import { useSearchParams } from "react-router-dom";

export type NewSearchRetentionType = z.infer<typeof newSearchRetention>;

export function RetentionFilter() {

  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const clientName = searchParams.get("clientName");
  const userId = searchParams.get("userId");
  const reason = searchParams.get("reason");
  const sector = searchParams.get("sector");
  const { handleSubmit, register, control } = useForm<NewSearchRetentionType>({
    values: {
      clientName: clientName ?? "",
      userId: userId ?? "",
      reason: reason ?? "",
      sector: sector ?? "",
    },
  });

  function handleFilter({
    clientName,
    userId,
    reason,
    sector,
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
      if (sector) {
        state.set("sector", sector);
      } else {
        state.delete("sector");
      }
      return state;
    });
  }

  const handleClearFilter = () => {
    setSearchParams((state) => {
      state.delete("userId");
      state.delete("clientName");
      state.delete("reason");
      state.delete("sector");
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
          className="flex items-center gap-2 mb-5"
        >
         
          <Input
            {...register("userId")}
            className="h-8 w-[100px]"
            placeholder="ID cliente"
          />
          <Input
            {...register("clientName")}
            className="h-8 w-[200px]"
            placeholder="Nome cliente"
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
                  <SelectValue placeholder="Selecione o mês" />
                  <SelectContent className="h-[280px]">
                    {months.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            )}
          />

          <Controller
            name="sector"
            control={control}
            render={({ field: { onChange, value, disabled, name } }) => (
              <Select
                onValueChange={onChange}
                disabled={disabled}
                name={name}
                value={value}
              >
                <SelectTrigger className="h-8 w-[250px]">
                  <SelectValue placeholder="Selecione o setor" />
                  <SelectContent>
                    {setores.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            )}
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
                  <SelectContent className="h-[280px]">
                    {motivosCancelamentos.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            )}
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
                  <SelectValue placeholder="Selecione o colaborador" />
                  <SelectContent className="h-[280px]">
                    {motivosCancelamentos.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
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
          >
            <X className="mr-2 h-4 w-4" /> Remover filtros
          </Button>
        </form>
      )}
    </>
  );
}
