import { pieData, type RetentionProps } from "@/utils";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
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

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RetentionProps>();
  const [search, setSearch] = useState("");

  const handleClick = (entry: RetentionProps) => {
    setSelectedItem(entry);
    setOpen(true);
  };

  return (
    <div className="w-[40%] h-full border p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-blue-600">
        Retenções por setor
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart style={{ fontSize: 12 }}>
          <Pie
            onClick={handleClick}
            data={pieData}
            dataKey="quantidade"
            nameKey="nome"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={64}
            strokeWidth={8}
            labelLine={false}
            /* ▸ 4. Rótulo personalizado: Nome + quantidade */
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 12 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              const { setor } = pieData[index];

              return (
                <text
                  x={x}
                  y={y}
                  className="fill-muted-foreground text-xs font-bold text-black"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {/* corta nome longo para não sobrepor */}
                  {setor.length > 12 ? setor.slice(0, 12) + "…" : setor} (
                  {value})
                </text>
              );
            }}
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ALT_COLORS[index % ALT_COLORS.length]}
                className="stroke-background hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
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
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
