export const motivosCancelamento = [
  {
    id: 1,
    motivo: "Corte de gastos",
    quantidade: 3,
    porcentagem: 28,
    setor: "Cancelamento",
    mes: "Junho/2025",
  },
  {
    id: 2,
    motivo: "Problemas financeiros",
    quantidade: 8,
    porcentagem: 22,
    setor: "Financeiro",
    mes: "Junho/2025",
  },
  {
    id: 3,
    motivo: "Insatisfação",
    quantidade: 24,
    porcentagem: 16,
    setor: "Suporte",
    mes: "Junho/2025",
  },
  {
    id: 4,
    motivo: "Local sem viabilidade",
    quantidade: 4,
    porcentagem: 12,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: 5,
    motivo: "Trocou de provedor",
    quantidade: 30,
    porcentagem: 10,
    setor: "Cobrança",
    mes: "Junho/2025",
  },
];

export interface PieChartPayload {
  name: number;
  value: number;
  dataKey: string;
  cx: string;
  cy: string;
  fill: string;
  stroke: string;
  payload: {
    porcentagem: number;
    quantidades: number;
    setor: string;
    [key: string]: any;
  };
  type?: string;
  className?: string;
}

interface Colaboradores {
  nome: string;
  quantidade: number;
  comissao: string;
}

export interface RetentionProps {
  setor: string;
  quantidade: number;
  porcentagem: number;
  colaboradores: Colaboradores[];
}

export const pieData: RetentionProps[] = [
  {
    setor: "Cancelamento",
    quantidade: 200,
    porcentagem: 30,
    colaboradores: [
      { nome: "João Silva", quantidade: 25, comissao: "250,00" },
      { nome: "Maria Oliveira", quantidade: 22, comissao: "220,00" },
      { nome: "Carlos Souza", quantidade: 18, comissao: "180,00" },
      { nome: "Ana Lima", quantidade: 20, comissao: "200,00" },
      { nome: "Pedro Costa", quantidade: 21, comissao: "210,00" },
      { nome: "Juliana Rocha", quantidade: 19, comissao: "190,00" },
      { nome: "Lucas Martins", quantidade: 17, comissao: "170,00" },
      { nome: "Fernanda Melo", quantidade: 23, comissao: "230,00" },
      { nome: "Bruno Almeida", quantidade: 16, comissao: "160,00" },
      { nome: "Isabela Nunes", quantidade: 19, comissao: "190,00" },
    ],
  },
  {
    setor: "Suporte",
    quantidade: 300,
    porcentagem: 45,
    colaboradores: [
      { nome: "Marcos Dias", quantidade: 32, comissao: "320,00" },
      { nome: "Tatiane Freitas", quantidade: 28, comissao: "280,00" },
      { nome: "Rodrigo Ramos", quantidade: 29, comissao: "290,00" },
      { nome: "Beatriz Cunha", quantidade: 30, comissao: "300,00" },
      { nome: "Vinícius Teixeira", quantidade: 27, comissao: "270,00" },
      { nome: "Amanda Cardoso", quantidade: 31, comissao: "310,00" },
      { nome: "Gabriel Pires", quantidade: 26, comissao: "260,00" },
      { nome: "Larissa Barbosa", quantidade: 28, comissao: "280,00" },
      { nome: "Felipe Andrade", quantidade: 25, comissao: "250,00" },
      { nome: "Camila Vieira", quantidade: 24, comissao: "240,00" },
    ],
  },
  {
    setor: "Comercial",
    quantidade: 150,
    porcentagem: 15,
    colaboradores: [
      { nome: "Eduardo Rezende", quantidade: 16, comissao: "160,00" },
      { nome: "Renata Silveira", quantidade: 15, comissao: "150,00" },
      { nome: "André Barreto", quantidade: 17, comissao: "170,00" },
      { nome: "Patrícia Brito", quantidade: 14, comissao: "140,00" },
      { nome: "Henrique Sampaio", quantidade: 13, comissao: "130,00" },
      { nome: "Vanessa Moura", quantidade: 16, comissao: "160,00" },
      { nome: "Thiago Lopes", quantidade: 15, comissao: "150,00" },
      { nome: "Jéssica Reis", quantidade: 17, comissao: "170,00" },
      { nome: "Luciana Castro", quantidade: 14, comissao: "140,00" },
      { nome: "Diego Farias", quantidade: 13, comissao: "130,00" },
    ],
  },
  {
    setor: "Financeiro",
    quantidade: 100,
    porcentagem: 7,
    colaboradores: [
      { nome: "Cristiane Azevedo", quantidade: 12, comissao: "120,00" },
      { nome: "Marcelo Tavares", quantidade: 11, comissao: "110,00" },
      { nome: "Débora Leite", quantidade: 10, comissao: "100,00" },
      { nome: "Rafael Gomes", quantidade: 13, comissao: "130,00" },
      { nome: "Sueli Dias", quantidade: 9, comissao: "90,00" },
      { nome: "Bruna Fernandes", quantidade: 8, comissao: "80,00" },
      { nome: "Otávio Moreira", quantidade: 10, comissao: "100,00" },
      { nome: "Silvana Costa", quantidade: 11, comissao: "110,00" },
      { nome: "Nelson Rocha", quantidade: 9, comissao: "90,00" },
      { nome: "Paula Mendes", quantidade: 7, comissao: "70,00" },
    ],
  },
  {
    setor: "Cobrança",
    quantidade: 50,
    porcentagem: 3,
    colaboradores: [
      { nome: "Fábio Assis", quantidade: 6, comissao: "60,00" },
      { nome: "Letícia Camargo", quantidade: 5, comissao: "50,00" },
      { nome: "Danilo Martins", quantidade: 4, comissao: "40,00" },
      { nome: "Helena Guimarães", quantidade: 6, comissao: "60,00" },
      { nome: "Igor Carvalho", quantidade: 5, comissao: "50,00" },
      { nome: "Adriana Batista", quantidade: 4, comissao: "40,00" },
      { nome: "Leonardo Ribeiro", quantidade: 6, comissao: "60,00" },
      { nome: "Elaine Pacheco", quantidade: 5, comissao: "50,00" },
      { nome: "Ricardo Nascimento", quantidade: 4, comissao: "40,00" },
      { nome: "Sabrina Correia", quantidade: 5, comissao: "50,00" },
    ],
  },
];
