import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dadosRetenções from "../../dados_retenções.json";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import type { CancelamentoItem, RetencoesItem } from "@/utils";
export function RetentionTable() {
 const [abaAtiva, setAbaAtiva] = useState<string>("");
const [retencoes, setRetencoes] = useState<Record<string, RetencoesItem[]>>(
  
)
    useEffect(() => {
      fetch("/planilha.xlsx")
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: "array" });
          const nomesDasAbas = workbook.SheetNames;
  
          setAbaAtiva(nomesDasAbas[4] || nomesDasAbas[0]);
  
          const dados: Record<string, CancelamentoItem[]> = {};
          nomesDasAbas.forEach((aba) => {
            const sheet = workbook.Sheets[aba];
            const json = XLSX.utils.sheet_to_json<RetencoesItem>(sheet, {
              defval: "",
            });
            dados[aba] = json;
          });
  
          setRetencoes(dados);
        });
    }, []);

  return (
    
    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 rounded-lg text-blue-800">
            <TableHead>ID cliente</TableHead>
            <TableHead>Nome cliente</TableHead>
            <TableHead>Motivo Retenção</TableHead>
            <TableHead>Colaborador</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosRetenções.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
          {dadosRetenções.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 transition">
              <TableCell className=" cursor-pointer transition">
                {Math.random().toString(36).substring(2, 9)}
              </TableCell>
              <TableCell className=" cursor-pointer transition">
                {item.nomeCliente}
              </TableCell>
              <TableCell className="cursor-pointer transition">
                {item.motivoRetencao}
              </TableCell>
              <TableCell className="cursor-pointer transition">
                {item.nomeColaborador}
              </TableCell>
              <TableCell className="cursor-pointer transition">
                {format(new Date(item.dataRetencao), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="cursor-pointer transition">
                <span
                  className={`px-3 py-1 text-xs text-white rounded-full ${
                    item.status === "concluido" ? "bg-green-300" : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </div>
  );
}
