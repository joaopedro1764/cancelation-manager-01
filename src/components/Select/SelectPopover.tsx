import { Controller } from "react-hook-form"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectPopoverFieldProps {
  name: string
  control: any
  options: string[]
  placeholder?: string
  emptyText?: string
}

export const SelectPopoverField: React.FC<SelectPopoverFieldProps> = ({
  name,
  control,
  options,
  placeholder = "Selecione uma opção",
  emptyText = "Nenhum item encontrado.",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full justify-between h-8 max-w-3xl truncate whitespace-nowrap overflow-hidden")}
            >
              {field.value || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
              <CommandInput placeholder="Buscar..." />
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup className="overflow-y-auto h-auto max-h-[250px]">
                {options.map((item) => (
                  <CommandItem
               
                    key={item}
                    onSelect={() => field.onChange(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.trim() === field.value?.trim()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
