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
import dadosCancelamentos from "../../dados_cancelamentos.json";
import { months, setores } from "@/utils";
import { useState } from "react";
export function RetentionFilter() {
  const { register, handleSubmit, control } = useForm();

  const [showFilters, setShowFilters] = useState(false);

  function handleFilter() {
    console.log("teste");
  }

  function handleClearFilter() {
    return "";
  }
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
          <span className="text-sm font-semibold">Filtros</span>
          <Input
            {...register("userId")}
            className="h-8 w-auto"
            placeholder="ID do cliente"
          />
          <Input
            {...register("clientName")}
            className="h-8 w-[200px]"
            placeholder="Nome do cliente"
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
                    {dadosCancelamentos.map((item) => (
                      <SelectItem key={item.idcliente} value={item.nome}>
                        {item.motivo}
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
