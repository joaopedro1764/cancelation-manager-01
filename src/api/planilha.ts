import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as XLSX from "xlsx";
import type { CancelamentoItem } from "@/utils";

interface PlanilhaResponse {
    aba: string;
}

export function usePlanilha({ aba }: PlanilhaResponse) {

    return useQuery({
        queryKey: ["planilha", aba],
        queryFn: async () => {
            const response = await axios.get("/planilha.xlsx", {
                responseType: "arraybuffer",
            });

            const buffer = response.data;
            const workbook = XLSX.read(buffer, { type: "array" });

            if (!workbook.SheetNames.includes(aba)) {
                throw new Error(`Aba "${aba}" não encontrada na planilha`);
            }

            const sheet = workbook.Sheets[aba];
            const dados = XLSX.utils.sheet_to_json<CancelamentoItem>(sheet, {
                defval: "", raw: false,
            }).filter((row) => {
                return row.motivoCancelamento?.trim() !== "";
            });
            return dados;
        },
        enabled: !!aba,
    });
}
