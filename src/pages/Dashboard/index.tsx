import { CancelationDayCard } from "@/components/Cards/CancelationDayCard";
import { CancelationMonthsCard } from "@/components/Cards/CancelationMonthsCard";
import { CancelationWeek } from "@/components/Cards/CancelationWeek";
import { ClientsActiveCard } from "@/components/Cards/ClientsActiveCard";
import { CancelationInPeriod } from "@/components/Graphics/Cancelation/cancelation-in-period";
import { RetentionInMonth } from "@/components/Graphics/Retention/retention-in-month";

export function Dashboard() {
  return (

    <main className="flex flex-col h-full">
      <div className="grid grid-cols-4 gap-4">
        <ClientsActiveCard />
        <CancelationMonthsCard />
        <CancelationDayCard />
        <CancelationWeek />
       {/*  <RetentionMonthCard /> */}
      </div>
      <div className="w-full space-x-4 flex flex-col xl:flex-row mt-5 overflow-hidden">
        <CancelationInPeriod />
        <RetentionInMonth />
      </div>
    </main>
  );
}
