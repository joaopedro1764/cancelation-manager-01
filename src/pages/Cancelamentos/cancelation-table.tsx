import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, isValid, isWithinInterval, parse } from "date-fns";
import { usePlanilha } from "@/api/planilha";
import { Pagination } from "@/components/Pagination";
import { CancelamentoModalDetails } from "./modal-details-cancelation";
import type { CancelamentoItem } from "@/utils";


export function CancelationTable() {

  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<CancelamentoItem>()
  
  function handleOpenAndCloseModal(itemCancelation: CancelamentoItem) {
    setSelectedItem(itemCancelation)
    setOpenModalDetails(!openModalDetails)
  }

  const { data: cancelamentos, isLoading } = usePlanilha({ aba: "ClientesMaio2025" });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [searchParams] = useSearchParams();
  const clientNameParam = searchParams.get("clientName");
  const userIdParam = searchParams.get("userId");
  const reasonParam = searchParams.get("reason");
  const neighborhoodParam = searchParams.get("neighborhood");
  const dateFromParam = searchParams.get("dateFrom");
  const dateToParam = searchParams.get("dateTo");
  const planParam = searchParams.get("plan");
  const condominiumParam = searchParams.get("condominium")

  const cancelamentosFiltrados = cancelamentos?.filter((item) => {
    const name = item.nome?.toLowerCase() ?? "";
    const idCliente = String(item.idCliente ?? "").toLowerCase();
    const reason = item.motivoReal?.toLowerCase() ?? "";
    const neighborhood = item.bairro?.toLowerCase() ?? "";
    const plan = item.plano?.toLowerCase() ?? "";
    const condominium = item.condominio?.toLowerCase() ?? ""
    const parsedDate = item.dataCancelamento && isValid(new Date(item.dataCancelamento))
      ? new Date(item.dataCancelamento)
      : null;

    const dataFrom = dateFromParam ? parse(dateFromParam, "dd/MM/yyyy", new Date()) : null;
    const dataTo = dateToParam ? parse(dateToParam, "dd/MM/yyyy", new Date()) : null;

    const isInDateRange = parsedDate && dataFrom && dataTo
      ? isWithinInterval(parsedDate, { start: dataFrom, end: dataTo })
      : true;

    return (
      (!clientNameParam || name.includes(clientNameParam.trim().toLowerCase())) &&
      (!neighborhoodParam || neighborhood.includes(neighborhoodParam.toLowerCase())) &&
      (!userIdParam || idCliente.includes(userIdParam.trim().toLowerCase())) &&
      (!planParam || plan.includes(planParam.trim().toLowerCase())) &&
      (!reasonParam || reason.includes(reasonParam.toLowerCase())) &&
      (!condominiumParam || condominium.includes(condominiumParam.toLowerCase())) &&
      isInDateRange
    );
  });

  const totalPages = Math.ceil((cancelamentosFiltrados?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = cancelamentosFiltrados?.slice(
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


  interface MotivoCores {
    [motivo: string]: string;
  }

  type GetMotivoColor = (motivo: string) => string;

  const getMotivoColor: GetMotivoColor = (motivo) => {
    const cores: MotivoCores = {
      "Mudanca de Endereco (Inviabilidade Tecnica)": "bg-blue-100 text-blue-800",
      "Solicitacao de agendamento nao atendida": "bg-blue-100 text-blue-800",
      "Insatisfacao com servico prestado": "bg-red-100 text-red-800",
      "Insatisfação com Streaming": "bg-red-100 text-red-800",
      "Corte de gastos": "bg-yellow-100 text-yellow-800",
      "Insatisfacao com valor do servico": "bg-yellow-100 text-yellow-800",
      "Trocou de Provedor (Melhor Proposta Financeira)": "bg-yellow-100 text-yellow-800",
      "Pessoal nao Detalhado": "bg-gray-100 text-gray-800",
      "Falecimento do Titular": "bg-gray-200 text-gray-700",
      "Empresa fechou": "bg-gray-200 text-gray-700",
      "Pausa no Contrato": "bg-gray-100 text-gray-800",
      "Insatisfacao com atendimento": "bg-pink-100 text-pink-800",
      "Trocou de provedor (Pacote dados moveis incluso)": "bg-purple-100 text-purple-800",
      "Trocou de provedor (Pacote de TV incluso)": "bg-purple-100 text-purple-800",
      "Mudanca para local que ja possui Nmultifibra": "bg-purple-100 text-purple-800",
      "Termino de contrato": "bg-green-100 text-green-800",
      "Fraude na contratação": "bg-orange-100 text-orange-800",
      "Direito do Consumidor 7 dias": "bg-orange-100 text-orange-800",
    };

    return cores[motivo] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-300px)] scroll-smooth motion-safe:will-change-transform">
      <CancelamentoModalDetails onClose={() => setOpenModalDetails(!openModalDetails)} cliente={selectedItem} isOpen={openModalDetails} />
      <Table>
        <TableHeader className="sticky top-0 bg-gray-50 tracking-wide z-10 border-b border-gray-200 text-gray-700 text-sm">

          <TableRow className="bg-gray-50">
            <TableHead className="font-bold">ID cliente</TableHead>
            <TableHead className="font-bold">Cliente</TableHead>
            <TableHead className="font-bold">Plano</TableHead>
            <TableHead className="font-bold">Motivo real</TableHead>
            <TableHead className="font-bold">Data cancelamento</TableHead>
            <TableHead className="font-bold">Bairro</TableHead>
            <TableHead className="font-bold">Condomínio</TableHead>
            <TableHead className="font-bold">Tempo ativo</TableHead>
            <TableHead className="font-bold">Detalhes</TableHead>
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
          {paginatedItems && paginatedItems?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
              <span className="font-bold text-gray-500">Nenhum resultado encontrado</span>
              </TableCell>
            </TableRow>
          ) : (
            paginatedItems && paginatedItems.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-100 transition">
                <TableCell className="w-[100px]">{item.idCliente}</TableCell>
                <TableCell title={item.nome} className="max-w-[140px] truncate whitespace-nowrap overflow-hidden">
                  {item.nome}
                </TableCell>
                <TableCell title={item.plano} className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">{item.plano}</TableCell>


                <TableCell>
                  {item.motivoReal && (
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold whitespace-nowrap ${getMotivoColor(item.motivoReal)}`}>
                      {item.motivoReal}
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                  <span className="inline-flex items-center font-medium px-3 py-1 rounded-full text-sm shadow-sm bg-gray-200 text-gray-800">

                    {item.dataCancelamento ? (
                      isValid(new Date(item.dataCancelamento)) ? (
                        format(parse(item.dataCancelamento, "M/d/yy", new Date()), "dd/MM/yyyy")
                      ) : (
                        item.dataCancelamento
                      )
                    ) : (
                      "N/A"
                    )}
                  </span>
                </TableCell>
                <TableCell className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                  {item.bairro}
                </TableCell>
                <TableCell className="max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                  {item.condominio || "Não é condomínio"}
                </TableCell>
                <TableCell>
                  {item.tempoAtivo && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 shadow-sm text-xs rounded-full max-w-[120px] truncate whitespace-nowrap overflow-hidden">
                      {item.tempoAtivo}
                    </span>
                  )}
                </TableCell>
                <TableCell className="flex justify-center">
                  <List onClick={() => handleOpenAndCloseModal(item)} className="w-6 h-6 text-blue-700 font-bold" />
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
        totalItems={cancelamentosFiltrados?.length ?? 0}
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