import { CancelationFilter } from "./cancelation-filter";
import { CancelationTable } from "./cancelation-table";
export function Cancelamentos() {
  return (
    <div className="m-4">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <h2 className="text-xl font-bold flex text-blue-600 mb-4">
          Tabela de cancelamentos
        </h2>
        <CancelationFilter />
        <CancelationTable />
      </div>
    </div>
  );
}
