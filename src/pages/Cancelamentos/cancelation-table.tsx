import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import type { CancelamentoItem } from "@/utils";

export function CancelationTable() {
  const [cancelamentos, setCancelamentos] = useState<
    Record<string, CancelamentoItem[]>
  >({});
  const [abaAtiva, setAbaAtiva] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(cancelamentosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = cancelamentosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page: number) => setCurrentPage(page);


  const getVisiblePageNumbers = () => {
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    const pages = [];

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    return pages;
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [clientName, userId, reason]);

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-300px)] scroll-smooth motion-safe:will-change-transform">
      <Table>
        <TableHeader className="sticky top-0 bg-gray-50 tracking-wide z-10 border-b border-gray-200 text-gray-700 text-sm">
          <TableRow className="bg-gray-50">
            <TableHead className="font-bold">ID cliente</TableHead>
            <TableHead className="font-bold">Cliente</TableHead>
            <TableHead className="font-bold">ID contrato</TableHead>
            <TableHead className="font-bold">ID atendimento</TableHead>
            <TableHead className="font-bold">Tempo ativo</TableHead>
            <TableHead className="font-bold">Bairro</TableHead>
            <TableHead className="font-bold">Motivo real</TableHead>
            <TableHead className="font-bold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="hover:cursor-pointer">
          {paginatedItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          ) : (
            paginatedItems.map((item, index) => (
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
                <TableCell
                  title={item.motivoReal}
                  className="whitespace-nowrap max-w-[140px] truncate"
                >
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


      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, cancelamentosFiltrados.length)} de {cancelamentosFiltrados.length} resultados
            </span>
          </div>

          <div className="flex items-center gap-1">

            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Primeira página"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>


            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>


            {currentPage > 3 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 py-2 text-sm text-gray-500">...</span>
                )}
              </>
            )}

            {getVisiblePageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`px-3 py-2 rounded-md border text-sm font-medium ${pageNumber === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {pageNumber}
              </button>
            ))}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 py-2 text-sm text-gray-500">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Próxima página"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Última página"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}