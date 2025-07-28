import React, { useState, type JSX } from 'react';
import { Users, Target, DollarSign, Wrench, Headphones, Shield, Calendar, Activity, ArrowUp } from 'lucide-react';
import { usePlanilha } from '@/api/planilha';
import { ColaboradoresRetencaoModal } from './ColaboradoresRetencaoModal';
import type { RetentionProps } from '@/utils';




export function RetentionInMonth() {

  const { data: retencoes } = usePlanilha({ aba: "Retenções Outros Setores" })

  const [hoveredSetor, setHoveredSetor] = useState<string | null>(null);
  const [selectedSetor, setSelectedSetor] = useState<string | null>(null);
  const [openModalRetencao, setOpenModalRetencao] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RetentionProps>();

  const total = retencoes?.length || 0;

  const handleClick = (entry: RetentionProps) => {
    setSelectedSetor(entry.setor);
    setSelectedItem(entry);
    setOpenModalRetencao(true);
  };

  const contagemRetencoesPorSetor = retencoes?.reduce((acc, item) => {
    const setor = item.setor || "";

    if (!acc[setor]) {
      acc[setor] = {
        quantidade: 0,
        colaboradores: new Map(),
        itemOriginal: {
          ...item,
          setor: item.setor || "",
          quantidade: 1,
          porcentagem: 0,
          colaboradores: []
        }
      };
    }

    acc[setor].quantidade += 1;

    const responsavel = item.responsavel || item.nome || "Não informado";
    if (acc[setor].colaboradores.has(responsavel)) {
      acc[setor].colaboradores.set(
        responsavel,
        (acc[setor].colaboradores.get(responsavel) ?? 0) + 1
      );
    } else {
      acc[setor].colaboradores.set(responsavel, 1);
    }

    return acc;
  }, {} as Record<string, { quantidade: number, colaboradores: Map<string, number>, itemOriginal: RetentionProps }>);

  type StatCardProps = {
    item: RetentionProps;
    isHovered: boolean;
    isSelected: boolean;
  };

  const StatCard: React.FC<StatCardProps> = ({ item, isHovered, isSelected }) => {
    const percentage = total > 0 ? ((item.quantidade || 0) / total) * 100 : 0;

    return (
      <div
        className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group overflow-hidden ${isSelected
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]'
            : isHovered
              ? 'border-blue-300 bg-gradient-to-br from-blue-25 to-blue-50 shadow-md transform scale-[1.01]'
              : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
          }`}
        onMouseEnter={() => setHoveredSetor(item.setor)}
        onMouseLeave={() => setHoveredSetor(null)}
        onClick={() => handleClick(item)}
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/30 opacity-0 transition-opacity duration-300 ${isHovered || isSelected ? 'opacity-100' : ''
          }`} />

        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${isSelected ? 'bg-blue-200 shadow-lg' : 'bg-blue-100 group-hover:bg-blue-150'
              }`}>
              {setorIcons[item.setor] || setorIcons.default}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">{item.setor}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2 w-16 rounded-full bg-gray-200 overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-blue-600">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {item.quantidade}
              </p>
            </div>
            <p className="text-sm text-gray-500 font-medium">retenções</p>
          </div>
        </div>

        {/* Hover effect border */}
        <div className={`absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''
          }`} />
      </div>
    );
  };

  const setorIcons: Record<string, JSX.Element> = {
    Suporte: <Headphones className="h-6 w-6 text-blue-600" />,
    Financeiro: <DollarSign className="h-6 w-6 text-blue-600" />,
    Comercial: <Users className="h-6 w-6 text-blue-600" />,
    Técnico: <Wrench className="h-6 w-6 text-blue-600" />,
    Cancelamento: <Shield className="h-6 w-6 text-blue-600" />,
    default: <Target className="h-6 w-6 text-blue-600" />
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar-thumb]:bg-transparent 
  h-full">
      {/* Header Moderno */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-5 w-5 text-blue-200" />
                <h2 className="text-2xl font-bold text-white">Retenções</h2>
              </div>
              <p className="text-blue-100 font-medium">Maio 2024</p>
              <p className="text-blue-100 font-medium text-sm">Clique sobre o setor e veja a retenção por cada colaborador.</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Activity className="h-5 w-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Ativo</span>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{total}</p>
              <p className="text-blue-200 text-sm">Total</p>
            </div>
          </div>
        </div>
      </div>


      <div className="p-6 overflow-auto h-full bg-gradient-to-b from-gray-50/50 to-white">
        <div className="space-y-4">
          {contagemRetencoesPorSetor &&
            Object.entries(contagemRetencoesPorSetor)
              .sort(([, a], [, b]) => b.quantidade - a.quantidade)
              .map(([setor, dados]) => {
                const item: RetentionProps = {
                  ...dados.itemOriginal,
                  setor,
                  quantidade: dados.quantidade,
                  colaboradores: Array.from(dados.colaboradores.entries()).map(([nome, quantidade]) => ({
                    nome,
                    quantidade,
                  }))
                };

                return (
                  <StatCard

                    key={setor}
                    item={item}
                    isHovered={hoveredSetor === setor}
                    isSelected={selectedSetor === setor}
                  />
                );
              })}
        </div>
      </div>
      <ColaboradoresRetencaoModal setSelectedSetor={setSelectedSetor} setOpen={setOpenModalRetencao}  selectedItem={selectedItem ?? null} open={openModalRetencao} />
    </div>
  );
}