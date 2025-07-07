import { RetentionTable } from "./retention-table";
import { RetentionFilter } from "./retention-filter";
import { TopRetentionEmployeeCard } from "@/components/Cards/TopRetentionEmployeeCard";
import { TopRetentionOfferCard } from "@/components/Cards/TopRetentionOfferCard";
import { TopRetentionPlansCard } from "@/components/Cards/TopRetentionPlansCard";

export function Retencoes() {
  return (

    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
        <TopRetentionPlansCard />
        <TopRetentionOfferCard />
        <TopRetentionEmployeeCard />
      </div>
      <div className="w-full p-4 rounded-xl border border-gray-200 bg-white shadow-md">

        <h2 className="text-xl font-bold flex text-blue-600 mb-4">
          Clientes retenções
        </h2>

        <p className="text-gray-500 text-sm mb-2">
          Aqui você pode visualizar e gerenciar as retenções registradas.
        </p>
        <RetentionFilter />
        <RetentionTable />
      </div>
    </div>

  );
}
