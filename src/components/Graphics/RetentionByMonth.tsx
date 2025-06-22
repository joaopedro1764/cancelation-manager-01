import { pieData, type PieChartPayload, type RetentionProps } from "@/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";

export function RetentionByMonth() {
  const ALT_COLORS = ["#1E40AF", "#3B82F6", "#60A5FA", "#A0AEC0", "#adb5bd"];

  const CustomPieTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: PieChartPayload[];
  }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;

      return (
        <div className="bg-white border p-2 rounded shadow text-sm">
          <p>
            <strong>Setor:</strong> {data.setor}
          </p>
          <p>
            <strong>Quantidade:</strong> {data.quantidade}
          </p>
          <p>
            <strong>Porcentagem:</strong> {data.porcentagem}%
          </p>
        </div>
      );
    }

    return null;
  };

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RetentionProps>();
  const [search, setSearch] = useState("");

  const handleClick = (entry: RetentionProps) => {
    setSelectedItem(entry);
    setOpen(true);
  };

  return (
    <div className="w-[40%] h-full border p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-blue-400">
        Retenções por setor
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Tooltip content={<CustomPieTooltip />} />

          <Pie
            onClick={handleClick}
            className="font-semibold"
            data={pieData}
            activeIndex={-1}
            cx="50%"
            cy="50%"
            outerRadius={140}
            dataKey="porcentagem"
            label={({ porcentagem }) => porcentagem + "%"}
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ALT_COLORS[index % ALT_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="w-full mt-7 flex justify-between flex-wrap gap-4">
        {pieData.map((item, index) => (
          <div key={item.setor} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: ALT_COLORS[index % ALT_COLORS.length] }}
            ></div>
            <span className="text-sm font-bold text-gray-700">
              {item.setor}
            </span>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[700px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Informação de retenção dos colaboradores</DialogTitle>
            <DialogDescription>
              Setor: <strong>{selectedItem?.setor}</strong>
            </DialogDescription>
          </DialogHeader>

        
          <div className="mt-4">
            <Input
              placeholder="Buscar colaborador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

      
          <div className="space-y-4 mt-4">
            {selectedItem?.colaboradores
              .filter((item) =>
                item.nome.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <p>
                    <strong>Colaborador:</strong> {item.nome}
                  </p>
                  <p>
                    <strong>Quantidade de Retenções:</strong> {item.quantidade}
                  </p>
                  <p>
                    <strong>Comissão:</strong> R$ {item.comissao}
                  </p>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
