import { pieData, type CustomLegend, type CustomTooltipProps, type RetentionProps } from "@/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

import { DiamondPlus, TrendingUp, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";



export function RetentionByMonth() {

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RetentionProps>();
  const [search, setSearch] = useState("");

  const handleClick = (entry: RetentionProps) => {
    setSelectedItem(entry);
    setOpen(true);
  };


  const COLORS = [
    '#3B82F6', 
    '#8B5CF6', 
    '#EF4444', 
    '#F59E0B', 
    '#10B981', 
    '#F97316', 
    '#6366F1', 
    '#EC4899'  
  ];


  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg">
          <p className="font-semibold text-gray-800">{data.setor}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{data.quantidade}</span> retenções
          </p>
          <p className="text-xs text-gray-500">
            {((data.quantidade / 50) * 100).toFixed(1)}% do total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: CustomLegend) => {
    return (
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700 text-lg font-semibold">
              {entry.value.length > 12 ? entry.value.slice(0, 12) + "..." : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const totalRetentions = pieData.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="w-full lg:w-[30%] bg-white h-full border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md">
              <DiamondPlus className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Retenções por Setor
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} />
                <span>Total: <strong className="text-gray-700">{totalRetentions}</strong> Retenções</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Ativo</span>
          </div>
        </div>
      </div>

      
      <div className="p-">
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="quantidade"
              nameKey="setor"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={80}
              strokeWidth={3}
              stroke="#ffffff"
              onClick={handleClick}
              isAnimationActive={true}
              animationDuration={800}
              className="cursor-pointer focus:outline-none"
              label={({ value }) => `${value}`}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  tabIndex={0}
                  role="button"
                  aria-label={`${pieData[index].setor}: ${pieData[index].quantidade} retenções`}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />

            
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-800 text-lg font-bold"
            >
              {totalRetentions}
            </text>
            <text
              x="50%"
              y="50%"
              dy={20}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-500 text-sm"
            >
              Total
            </text>
          </PieChart>
        </ResponsiveContainer>

        
        <CustomLegend payload={pieData.map((item, index) => ({
          value: item.setor,
          color: COLORS[index % COLORS.length],
          payload: item
        }))} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[600px] overflow-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-lg">
              <strong>Informações de Retenção</strong>
            </DialogTitle>
            <DialogDescription>
              Setor: <strong className="text-blue-600">{selectedItem?.setor}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Input
              placeholder="Buscar colaborador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-3 mt-4 text-sm">
            {selectedItem?.colaboradores
              .filter((item) =>
                item.nome.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{item.nome}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantidade} retenç{item.quantidade === 1 ? 'ão' : 'ões'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {item.quantidade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
