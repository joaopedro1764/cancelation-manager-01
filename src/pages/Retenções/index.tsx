import { RetentionTable } from "./retention-table";
import { RetentionFilter } from "./retention-filter";

export function Retencoes() {
  return (
    <div>
    <div className="space-y-6 m-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Tabela de retenções</h2>
            <RetentionFilter />
            <RetentionTable />
          </div>
        </div>
    </div>
  );
}
