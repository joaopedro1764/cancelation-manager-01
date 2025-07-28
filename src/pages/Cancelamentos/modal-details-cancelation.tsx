import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, User, Calendar, Clock, Home, AlertCircle } from "lucide-react";
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

  const InfoCard: React.FC<{ 
    icon?: React.ReactNode; 
    label: string; 
    value: any; 
    highlight?: boolean;
    urgent?: boolean;
  }> = ({ icon, label, value, highlight = false, urgent = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        group relative p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${highlight 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
          : urgent
          ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-sm'
          : 'bg-white border-gray-100 hover:border-gray-200'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`
            flex-shrink-0 p-2 rounded-xl
            ${highlight 
              ? 'bg-blue-100 text-blue-600' 
              : urgent
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
            }
          `}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={`
            text-xs font-medium mb-1 tracking-wide uppercase
            ${highlight 
              ? 'text-blue-600' 
              : urgent
              ? 'text-red-600'
              : 'text-gray-500'
            }
          `}>
            {label}
          </p>
          <p className={`
            text-sm leading-relaxed break-words
            ${highlight 
              ? 'text-blue-900 font-semibold' 
              : urgent
              ? 'text-red-900 font-semibold'
              : 'text-gray-800'
            }
          `}>
            {value || "—"}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );

  const modalContent = (
    <AnimatePresence>
      {isOpen && cliente && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 print:p-0"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-white w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl border border-gray-100 relative print:max-h-full print:rounded-none print:shadow-none"
            style={{
              position: 'relative',
              zIndex: 10000,
              maxWidth: 'min(95vw, 1152px)', // 6xl = 1152px
              maxHeight: '95vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com gradiente melhorado */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white px-8 py-6 flex items-center justify-between print:hidden">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Detalhes do Cancelamento</h2>
                <p className="text-blue-200 text-sm mt-1">Informações completas do cliente</p>
              </div>
              <button
                onClick={onClose}
                className="group hover:bg-white/10 p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Fechar modal"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Conteúdo scrollável */}
            <div className="overflow-y-auto max-h-[calc(95vh-100px)] print:max-h-full">
              <div className="p-8 print:p-4 space-y-8">
                {/* Status e Datas - Seção destacada */}
                <section>
                  <SectionHeader 
                    title="Status do Cancelamento" 
                    subtitle="Informações temporais do processo"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard
                      icon={<Calendar size={16} />}
                      label="Data de Ativação"
                      value={format(cliente.dataAtivacao, "dd/MM/yyyy")}
                      highlight
                    />
                    <InfoCard
                      icon={<Calendar size={16} />}
                      label="Data de Cancelamento"
                      value={format(cliente.dataCancelamento, "dd/MM/yyyy")}
                      urgent
                    />
                    <InfoCard
                      icon={<Clock size={16} />}
                      label="Tempo Ativo"
                      value={cliente.tempoAtivo}
                    />
                  </div>
                </section>

                {/* Informações do Cliente */}
                <section>
                  <SectionHeader 
                    title="Dados do Cliente" 
                    subtitle="Informações pessoais e identificação"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard
                      icon={<User size={16} />}
                      label="Nome Completo"
                      value={cliente.nome}
                      highlight
                    />
                    <InfoCard
                      label="ID Cliente"
                      value={cliente.idCliente}
                    />
                    <InfoCard
                      label="Sexo"
                      value={cliente.sexo === "M" ? "Masculino" : "Feminino"}
                    />
                    <InfoCard
                      label="ID Contrato"
                      value={cliente.idContrato}
                    />
                    <InfoCard
                      label="ID Atendimento"
                      value={cliente.idAtendimento}
                    />
                    <InfoCard
                      label="Plano"
                      value={cliente.plano}
                      highlight
                    />
                  </div>
                </section>

                {/* Endereço */}
                <section>
                  <SectionHeader 
                    title="Endereço" 
                    subtitle="Localização do serviço"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard
                      icon={<Home size={16} />}
                      label="Rua"
                      value={cliente.rua}
                    />
                    <InfoCard
                      label="Bairro"
                      value={cliente.bairro}
                    />
                    {cliente.condominio && (
                      <InfoCard
                        label="Condomínio"
                        value={cliente.condominio}
                      />
                    )}
                  </div>
                </section>

                {/* Motivos do Cancelamento */}
                <section>
                  <SectionHeader 
                    title="Análise do Cancelamento" 
                    subtitle="Motivos e circunstâncias"
                  />
                  <div className="space-y-4">
                    <InfoCard
                      icon={<AlertCircle size={16} />}
                      label="Motivo Principal"
                      value={cliente.motivoReal || cliente.motivoCancelamento}
                      urgent
                    />
                    
                    {cliente.motivoReal === "Mudanca de Endereco (Inviabilidade Tecnica)" && (
                      <InfoCard
                        label="Local de Inviabilidade"
                        value={cliente.localInviabilidade}
                      />
                    )}
                    
                    {cliente.motivoReal === "Insatisfacao com servico prestado" && (
                      <InfoCard
                        label="Detalhes da Insatisfação"
                        value={cliente.motivoInsatisfacao}
                      />
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard
                        label="Nível de Dificuldade"
                        value={cliente.dificuldade}
                      />
                      <InfoCard
                        icon={<User size={16} />}
                        label="Responsável pelo Atendimento"
                        value={cliente.responsavel}
                        highlight
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer com ações (opcional) */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 print:hidden">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Imprimir
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Renderiza o modal usando Portal diretamente no body
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : modalContent;
};