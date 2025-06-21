import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function CancelationDayCard() {
  return (
    <Card className="bg-gray-50 shadow rounded-md gap-3 cursor-pointer hover:transform hover:translate-y-3 duration-500">
      <CardHeader>
        <CardTitle className="font-bold flex gap-2 items-center text-2xl">
          <Clock strokeWidth={3} className="w-7 h-7 text-[#3B82F6]" />
          Cancelamentos (dia)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 font-bold">
        <CardDescription className="flex flex-col">
          <span className="text-2xl text-black font-black">12</span>
          <span className="text-blue-400 font-semibold">
            - 5% referente a ontem
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
