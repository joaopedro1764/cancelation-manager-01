import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import type { CancelamentoItem } from "@/utils";

export function CancelationTable() {
  const [cancelamentos, setCancelamentos] = useState<
    Record<string, CancelamentoItem[]>
  >({});
  const [abaAtiva, setAbaAtiva] = useState<string>("");

  const [searchParams] = useSearchParams();
  const clientName = searchParams.get("clientName");
  const userId = searchParams.get("userId");
  const reason = searchParams.get("reason");

  useEffect(() => {
    fetch("/planilha.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const nomesDasAbas = workbook.SheetNames;

        setAbaAtiva(nomesDasAbas[2] || nomesDasAbas[0]);

        const dados: Record<string, CancelamentoItem[]> = {};
        nomesDasAbas.forEach((aba) => {
          const sheet = workbook.Sheets[aba];
          const json = XLSX.utils.sheet_to_json<CancelamentoItem>(sheet, {
            defval: "",
          });
          dados[aba] = json;
        });

        setCancelamentos(dados);
      });
  }, []);

  const dadosDaAbaAtual = cancelamentos[abaAtiva] || [];

  const cancelamentosFiltrados = dadosDaAbaAtual.filter((item) => {
    const nome = item.nome?.toLowerCase() ?? "";
    const idCliente = String(item.idCliente ?? "").toLowerCase();
    const motivo = item.motivoReal?.toLowerCase() ?? "";

    return (
      (!clientName || nome.includes(clientName.toLowerCase())) &&
      (!userId || idCliente.includes(userId.toLowerCase())) &&
      (!reason || motivo.includes(reason.toLowerCase()))
    );
  });

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-250px)] p-4 space-y-4">
      <span className="float-right text-muted-foreground font-semibold mr-4">
        {cancelamentosFiltrados.length} Resultados
      </span>
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
          <TableRow className="bg-gray-50">
            <TableHead>ID Cliente</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>ID Contrato</TableHead>
            <TableHead>ID Atendimento</TableHead>
            <TableHead>Tempo Ativo</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Motivo Real</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cancelamentosFiltrados.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          ) : (
            cancelamentosFiltrados.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-100 transition">
                <TableCell>{item.idCliente}</TableCell>
                <TableCell className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                  {item.nome}
                </TableCell>
                <TableCell>{item.idContrato}</TableCell>
                <TableCell>{item.idAtendimento}</TableCell>
                <TableCell>
                  {item.tempoAtivo && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {item.tempoAtivo}
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                  {item.bairro}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.motivoReal}
                </TableCell>
                <TableCell>
                  <EllipsisVertical className="w-5 h-5" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
