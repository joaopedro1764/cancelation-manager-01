import { CancelationDayCard } from "@/components/Cards/CancelationDayCard";
import { CancelationMonthsCard } from "@/components/Cards/CancelationMonthsCard";
import { CancelationWeek } from "@/components/Cards/CancelationWeek";
import { ClientsActiveCard } from "@/components/Cards/ClientsActiveCard";
import { CancelationInPeriod } from "@/components/Graphics/Cancelation/cancelation-in-period";
import { RetentionInMonth } from "@/components/Graphics/Retention/retention-in-month";

export function Dashboard() {
  return (

    <main className="flex flex-col h-full p-4">
      {/* Linha de cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ClientsActiveCard />
        <CancelationMonthsCard />
        <CancelationDayCard />
        <CancelationWeek />
        {/* <RetentionMonthCard /> */}
      </div>

      {/* Linha inferior com gráficos ou seções maiores */}
      <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:gap-4 overflow-hidden w-full">
        <div className="w-full xl:w-[70%]">
          <CancelationInPeriod />
        </div>
        <div className="w-full xl:w-[30%]">
          <RetentionInMonth />
        </div>
      </div>
    </main>
  )
}
