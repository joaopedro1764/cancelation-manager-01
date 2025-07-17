import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlanilha } from "@/api/planilha";
import { Pagination } from "@/components/Pagination";

export function RetentionTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchParams] = useSearchParams();
  const clientNameParam = searchParams.get("clientName");
  const userIdParam = searchParams.get("userId");
  const reasonParam = searchParams.get("reason");
  const sectorParam = searchParams.get("sector");

  const { data: retencoes, isLoading } = usePlanilha({ aba: "Retenções Outros Setores" });

  const retencoesFiltradas = retencoes?.filter((item) => {
    if (!item.nome) return;
    const nome = item.nome?.toLowerCase() ?? "";
    const idCliente = String(item.idCliente ?? "").toLowerCase();
    const motivo = item.motivoCancelamento?.toLowerCase() ?? "";
    const sector = item.setor?.toLowerCase() ?? "";
    return (
      (!clientNameParam || nome.includes(clientNameParam.toLowerCase())) &&
      (!userIdParam || idCliente.includes(userIdParam.toLowerCase())) &&
      (!sectorParam || sector.includes(sectorParam.toLowerCase())) &&
      (!reasonParam || motivo.includes(`retencao - ${reasonParam.toLowerCase()}`))
    );
  });

  const totalPages = Math.ceil((retencoesFiltradas?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = (retencoesFiltradas ?? []).slice(
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
  }, [clientNameParam, userIdParam, reasonParam]);

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-300px)] scroll-smooth motion-safe:will-change-transform">
      <Table>
        <TableHeader className="sticky top-0 bg-gray-50 tracking-wide z-10 border-b border-gray-200 text-gray-700 text-sm">
          <TableRow className="bg-gray-50">
            <TableHead className="font-bold">ID cliente</TableHead>
            <TableHead className="font-bold">Cliente</TableHead>
            <TableHead className="font-bold">ID contrato</TableHead>
            <TableHead className="font-bold">ID atendimento</TableHead>
            <TableHead className="font-bold">Plano</TableHead>
            <TableHead className="font-bold">Motivo cancelamento</TableHead>
            <TableHead className="font-bold">Retenção aplicada</TableHead>
            <TableHead className="font-bold">Responsável</TableHead>
            <TableHead className="font-bold">Setor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="hover:cursor-pointer">
          {
            isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            )
          }
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
                <TableCell className="whitespace-nowrap max-w-[180px] truncate">
                  {item.plano || "N/A"}
                </TableCell>
                <TableCell title={item.motivoCancelamento} className="max-w-[180px] truncate whitespace-nowrap">
                  {item.motivoCancelamento}
                </TableCell>
                <TableCell
                  title={item.retençãoAplicada}
                  className="whitespace-nowrap max-w-[140px] truncate"
                >
                  {item.retençãoAplicada}
                </TableCell>
                <TableCell
                  className="whitespace-nowrap max-w-[140px] truncate"
                >
                  {item.responsavel}
                </TableCell>
                <TableCell
                  className="whitespace-nowrap max-w-[140px] truncate"
                >
                  {item.setor}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={retencoesFiltradas?.length ?? 0}
        startIndex={startIndex}
        getVisiblePageNumbers={getVisiblePageNumbers}
        goToFirstPage={goToFirstPage}
        goToPreviousPage={goToPreviousPage}
        goToPage={goToPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage}
      />
    </div>
  );
}