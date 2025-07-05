import { TopCancelledNeighborhoodsCard } from "@/components/Cards/TopCancelledNeighborhoodsCard";
import { CancelationFilter } from "./cancelation-filter";
import { CancelationTable } from "./cancelation-table";
import { TopCancelledPlansCard } from "@/components/Cards/TopCancelledPlansCard";
import { TopCancelledCondosCard } from "@/components/Cards/TopCancelledCondosCard";
export function Cancelamentos() {
  return (
  <div className="flex flex-col h-full">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
  <TopCancelledNeighborhoodsCard/>
  <TopCancelledPlansCard/>
  <TopCancelledCondosCard/>
  </div>
      <div className="w-full p-4 rounded-xl border border-gray-200 bg-white shadow-md">

        <h2 className="text-xl font-bold flex text-blue-600 mb-4">
        Clientes cancelados
        </h2>

        <p className="text-gray-500 text-sm mb-2">
          Aqui você pode visualizar e gerenciar os cancelamentos registrados.
        </p>
        <CancelationFilter />
        <CancelationTable />
      </div>
      </div>
  );
}
