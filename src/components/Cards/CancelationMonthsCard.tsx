import { CalendarDays } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function CancelationMonthsCard() {
  return (
    <Card className="bg-gray-50 shadow rounded-md gap-3 cursor-pointer hover:transform hover:translate-y-3 duration-500">
      <CardHeader>
        <CardTitle className="font-bold flex gap-2 items-center text-2xl">
          <CalendarDays strokeWidth={3} className="w-7 h-7 text-[#3B82F6]" />
          Cancelamentos (mês)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 font-semibold">
        <CardDescription className="flex flex-col">
          <span className="text-2xl text-black font-black">80</span>
          <span className="text-blue-400 font-semibold">
            + 20% referente ao mês passado
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
