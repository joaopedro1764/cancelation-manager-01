import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

type CancelamentoModalDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
};


export function CancelamentoModalDetails({ isOpen, onClose, cliente }: CancelamentoModalDetailsProps) {
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);



  const Item: React.FC<{ label: string; value: any }> = ({ label, value }) => (
    <div className="flex flex-col print:text-xs">
      <span className="text-xs font-semibold text-gray-500">{label}</span>
      <span className="text-sm text-gray-800">{value || "—"}</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && cliente && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur p-4 print:p-0"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-gray-200 relative print:max-h-full print:rounded-none print:shadow-none"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-10 print:hidden">
              <h2 className="text-lg font-semibold">Detalhes do Cancelamento</h2>
              <div className="flex">
                <button
                  onClick={onClose}
                  className="hover:bg-white/20 p-1 rounded-full transition"
                  aria-label="Fechar modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 print:p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2">
                <Item label="Data Ativação" value={format(cliente.dataAtivacao, "dd/MM/yyyy")} />
                <Item label="Data Cancelamento" value={format(cliente.dataCancelamento, "dd/MM/yyyy")} />
                <Item label="Tempo Ativo" value={cliente.tempoAtivo} />
                <Item label="ID Cliente" value={cliente.idCliente} />
                <Item label="ID Contrato" value={cliente.idContrato} />
                <Item label="ID Atendimento" value={cliente.idAtendimento} />
                <Item label="Plano" value={cliente.plano} />
                <Item label="Nome" value={cliente.nome} />
                <Item label="Sexo" value={cliente.sexo} />
                <Item label="Rua" value={cliente.rua} />
                <Item label="Bairro" value={cliente.bairro} />
                {cliente.condominio && (
                  <Item label="Condomínio" value={cliente.condominio} />
                )}
                <Item label="Motivo Real" value={cliente.motivoReal || cliente.motivoCancelamento} />
                {
                  cliente.motivoReal === "Mudanca de Endereco (Inviabilidade Tecnica)" && (
                    <Item label="Local Inviabilidade" value={cliente.localInviabilidade} />
                  )
                }
                {cliente.motivoReal === "Insatisfacao com servico prestado" && (
                  <Item label="Motivo Insatisfação" value={cliente.motivoInsatisfacao} />
                )}
                <Item label="Dificuldade" value={cliente.dificuldade} />
                <Item label="Responsável" value={cliente.responsavel} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};