import { CancelationDayCard } from "@/components/Cards/CancelationDayCard";
import { CancelationMonthsCard } from "@/components/Cards/CancelationMonthsCard";
import { ClientsActiveCard } from "@/components/Cards/ClientsActiveCard";
import { RetentionMonthCard } from "@/components/Cards/RetentionMonthCard";
import { CancelationInPeriod } from "@/components/Graphics/CancelationInPeriod";
import { RetentionByMonth } from "@/components/Graphics/RetentionByMonth";


export function Dashboard() {
  return (

    <main className="flex flex-col h-full">
      <div className="grid grid-cols-4 gap-4">
        <ClientsActiveCard />
        <CancelationMonthsCard />
        <CancelationDayCard />
        <RetentionMonthCard />
      </div>

      <div className="w-full space-x-4 flex justify-center flex-col xl:flex-row mt-10">
        <CancelationInPeriod />
       <RetentionByMonth/>
      </div>
    </main>
  );
}
