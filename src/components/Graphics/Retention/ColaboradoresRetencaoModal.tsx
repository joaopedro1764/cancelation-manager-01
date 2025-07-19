import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User, Search, Users, Award } from "lucide-react";

interface Colaborador {
    nome: string;
    quantidade: number;
}

interface SelectedItem {
    setor: string;
    colaboradores: Colaborador[];
}

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    selectedItem: SelectedItem | null;
    setSelectedSetor: (value: string) => void;
}

export  function ColaboradoresRetencaoModal({
    open,
    setOpen,
    selectedItem,
    setSelectedSetor,
}: Props) {
    const [search, setSearch] = useState("");

    const colaboradoresFiltrados = selectedItem?.colaboradores
        ?.filter((item) =>
            item.nome.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.quantidade - a.quantidade);

    const totalColaboradores = selectedItem?.colaboradores?.length || 0;
    const totalRetencoes = selectedItem?.colaboradores?.reduce((acc, col) => acc + col.quantidade, 0) || 0;

    // Função para determinar a cor do badge baseada na quantidade
    const getBadgeColor = (quantidade: number) => {
        if (quantidade >= 10) return "bg-red-100 text-red-700 border-red-200";
        if (quantidade >= 5) return "bg-orange-100 text-orange-700 border-orange-200";
        if (quantidade >= 3) return "bg-yellow-100 text-yellow-700 border-yellow-200";
        return "bg-blue-100 text-blue-700 border-blue-200";
    };

    const getIconColor = (quantidade: number) => {
        if (quantidade >= 10) return "text-red-600";
        if (quantidade >= 5) return "text-orange-600";
        if (quantidade >= 3) return "text-yellow-600";
        return "text-blue-600";
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setSelectedSetor("");
                    setSearch("");
                }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0 overflow-auto">
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 p-6">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Award className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold text-gray-900">
                                    Informações de Retenção
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 mt-1">
                                    Detalhes dos colaboradores e suas retenções
                                </DialogDescription>
                            </div>
                        </div>

                        {/* Setor Info */}
                        <div className="flex items-center gap-2 bg-white/70 rounded-lg p-3 border border-white/50">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">Setor:</span>
                            <span className="font-semibold text-blue-700">
                                {selectedItem?.setor || "Nenhum setor selecionado"}
                            </span>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-white/70 rounded-lg p-3 border border-white/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Total Colaboradores</p>
                                        <p className="text-lg font-bold text-gray-900">{totalColaboradores}</p>
                                    </div>
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-3 border border-white/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Total Retenções</p>
                                        <p className="text-lg font-bold text-gray-900">{totalRetencoes}</p>
                                    </div>
                                    <Award className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Content Section */}
                <div className="flex flex-col h-full overflow-auto">
                    {/* Search Section */}
                    <div className="p-6 pb-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Buscar colaborador..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            />
                        </div>
                        {search && (
                            <p className="text-xs text-gray-500 mt-2">
                                {colaboradoresFiltrados?.length || 0} resultado(s) encontrado(s)
                            </p>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="flex-1 h-[400px] overflow-y-auto p-6 pt-4">
                        {colaboradoresFiltrados && colaboradoresFiltrados.length > 0 ? (
                            <div className="space-y-3 overflow-auto">
                                {colaboradoresFiltrados.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-200 transition-all duration-200 bg-white"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar do usuário */}
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                                                    <User className="w-5 h-5 text-blue-700" />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                                                        {item.nome}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantidade} retenç{item.quantidade === 1 ? "ão" : "ões"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Badge de quantidade */}
                                            <div className={`px-3 py-1.5 rounded-full border text-sm font-semibold transition-all ${getBadgeColor(item.quantidade)}`}>
                                                <div className="flex items-center gap-1.5">
                                                    <Award className={`w-3.5 h-3.5 ${getIconColor(item.quantidade)}`} />
                                                    {item.quantidade}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium">
                                    {search ? "Nenhum colaborador encontrado" : "Nenhum colaborador disponível"}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {search ? "Tente ajustar sua busca" : "Selecione um setor para ver os colaboradores"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}