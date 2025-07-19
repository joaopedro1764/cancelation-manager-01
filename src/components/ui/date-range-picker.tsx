import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import type { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface DataRangePickerProps extends React.ComponentProps<"div"> {
  date: DateRange | undefined;
  OnDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({
  OnDateChange,
  className,
  date,
}: DataRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd'/'MM'/'yyyy", { locale: ptBR })} -{" "}
                  {format(date.to, "dd'/'MM'/'yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' LLLL 'de' yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}

          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={OnDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
