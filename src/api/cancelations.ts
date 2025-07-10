import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as XLSX from "xlsx";
import type { CancelamentoItem } from "@/utils"; // ajuste esse import conforme seu projeto

export function usePlanilha() {
  return useQuery({
    queryKey: ["planilha"],
    queryFn: async () => {
      const response = await axios.get("/planilha.xlsx", {
        responseType: "arraybuffer", // importante para arquivos binários
      });

      const buffer = response.data;
      const workbook = XLSX.read(buffer, { type: "array" });
      const nomesDasAbas = workbook.SheetNames;

      const dados: Record<string, CancelamentoItem[]> = {};
      nomesDasAbas.forEach((aba) => {
        const sheet = workbook.Sheets[aba];
        const json = XLSX.utils.sheet_to_json<CancelamentoItem>(sheet, {
          defval: "", raw: false,
        });
        dados[aba] = json;
      });

      return {
        dados,
        nomesDasAbas,
        abaPadrao: nomesDasAbas[2] || nomesDasAbas[0],
      };
    },
  });
}
