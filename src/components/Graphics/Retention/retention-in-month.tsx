import React, { useState, type JSX } from 'react';
import { TrendingUp, Users, Target, DollarSign, Wrench, Headphones, Shield } from 'lucide-react';
import type { RetentionProps } from '@/utils';
import { usePlanilha } from '@/api/planilha';
import { ColaboradoresRetencaoModal } from './ColaboradoresRetencaoModal';

export function RetentionInMonth() {
  const { data: retencoes } = usePlanilha({ aba: "Retenções Outros Setores" });

  const [hoveredSetor, setHoveredSetor] = useState<string | null>(null);
  const [selectedSetor, setSelectedSetor] = useState<string | null>(null);
  const [openModalRetencao, setOpenModalRetencao] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RetentionProps>();

  // Calcular total corretamente - assumindo que cada item representa uma retenção
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

    // Assumindo que existe um campo colaborador ou nome no item
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
        className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : isHovered
            ? 'border-gray-300 bg-blue-300 shadow-md border-0'
            : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        onMouseEnter={() => setHoveredSetor(item.setor)}
        onMouseLeave={() => setHoveredSetor(null)}
        onClick={() => handleClick(item)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              {setorIcons[item.setor] || setorIcons.default}
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.setor}</p>
              <p className="text-sm text-gray-600">{percentage.toFixed(1)}% do total</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{item.quantidade}</p>
            <p className="text-sm text-gray-500">retenções</p>
          </div>
        </div>
      </div>
    );
  };

  const setorIcons: Record<string, JSX.Element> = {
    Suporte: <Headphones className="h-5 w-5 text-blue-600" />,
    Financeiro: <DollarSign className="h-5 w-5 text-blue-600" />,
    Comercial: <Users className="h-5 w-5 text-blue-600" />,
    Técnico: <Wrench className="h-5 w-5 text-blue-600" />,
    Cancelamento: <Shield className="h-5 w-5 text-blue-600" />,
    default: <Target className="h-5 w-5 text-blue-600" />
  };

  // Encontrar o setor com mais retenções para o insight
  const setorComMaisRetencoes = contagemRetencoesPorSetor
    ? Object.entries(contagemRetencoesPorSetor).reduce((max, [setor, dados]) =>
      dados.quantidade > max.quantidade ? { setor, quantidade: dados.quantidade } : max,
      { setor: "", quantidade: 0 })
    : { setor: "", quantidade: 0 };

  const percentualMaiorSetor = total > 0 ? (setorComMaisRetencoes.quantidade / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-auto [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar-track]:bg-gray-100 
  [&::-webkit-scrollbar-thumb]:bg-blue-200 
  [&::-webkit-scrollbar-thumb]:rounded-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Retenções por Setor no mês de Maio</h2>
            <p className="text-sm text-gray-600">Total: {total} retenções</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Ativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Retenções por setor</h3>

          {contagemRetencoesPorSetor &&
            Object.entries(contagemRetencoesPorSetor)
              .sort(([, a], [, b]) => b.quantidade - a.quantidade) // Ordenar por quantidade
              .map(([setor, dados]) => {
                const item: RetentionProps = {
                  ...dados.itemOriginal,
                  setor,
                  quantidade: dados.quantidade,
                  colaboradores: Array.from(dados.colaboradores.entries()).map(([nome, quantidade]) => ({
                    nome,
                    quantidade,
                    comissao: "" // Adiciona valor padrão para comissao
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

          {/* Insights */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Insight Principal</p>
                <p className="text-sm text-blue-700">
                  O setor de <strong>{setorComMaisRetencoes.setor}</strong> representa{' '}
                  {percentualMaiorSetor.toFixed(1)}% das retenções, indicando maior atividade
                  neste departamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColaboradoresRetencaoModal setSelectedSetor={setSelectedSetor} setOpen={setOpenModalRetencao} selectedItem={selectedItem ?? null} open={openModalRetencao} />
    </div>
  );
}