import { z } from "zod";
export const motivosCancelamento = [
  {
    id: "1",
    motivo: "Corte de gastos",
    quantidade: 3,
    porcentagem: 28,
    setor: "Cancelamento",
    mes: "Junho/2025",
  },
  {
    id: "2",
    motivo: "Problemas financeiros",
    quantidade: 8,
    porcentagem: 22,
    setor: "Financeiro",
    mes: "Junho/2025",
  },
  {
    id: "3",
    motivo: "Insatisfação",
    quantidade: 24,
    porcentagem: 16,
    setor: "Suporte",
    mes: "Junho/2025",
  },
  {
    id: "4",
    motivo: "Local sem viabilidade",
    quantidade: 4,
    porcentagem: 12,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "5",
    motivo: "Trocou de provedor",
    quantidade: 30,
    porcentagem: 10,
    setor: "Cobrança",
    mes: "Junho/2025",
  },
  {
    id: "6",
    motivo: "Mudança de Endereço (Inviabilidade Técnica)",
    quantidade: 2,
    porcentagem: 4,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "7",
    motivo: "Pessoal não Detalhado",
    quantidade: 1,
    porcentagem: 2,
    setor: "Cancelamento",
    mes: "Junho/2025",
  },
  {
    id: "8",
    motivo: "Falecimento do Titular",
    quantidade: 1,
    porcentagem: 1,
    setor: "Cancelamento",
    mes: "Junho/2025",
  },
  {
    id: "9",
    motivo: "Solicitação de agendamento não atendida",
    quantidade: 2,
    porcentagem: 2,
    setor: "Suporte",
    mes: "Junho/2025",
  },
  {
    id: "10",
    motivo: "Mudança para local que já possui Nmultifibra",
    quantidade: 1,
    porcentagem: 1,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "11",
    motivo: "Empresa fechou",
    quantidade: 1,
    porcentagem: 1,
    setor: "Cancelamento",
    mes: "Junho/2025",
  },
  {
    id: "12",
    motivo: "Insatisfação com serviço prestado",
    quantidade: 5,
    porcentagem: 4,
    setor: "Suporte",
    mes: "Junho/2025",
  },
  {
    id: "13",
    motivo: "Insatisfação com valor do serviço",
    quantidade: 4,
    porcentagem: 3,
    setor: "Financeiro",
    mes: "Junho/2025",
  },
  {
    id: "14",
    motivo: "Insatisfação com atendimento",
    quantidade: 3,
    porcentagem: 2,
    setor: "Atendimento",
    mes: "Junho/2025",
  },
  {
    id: "15",
    motivo: "Trocou de provedor (Pacote dados móveis incluso)",
    quantidade: 2,
    porcentagem: 2,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "16",
    motivo: "Trocou de provedor (Pacote de TV incluso)",
    quantidade: 1,
    porcentagem: 1,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "17",
    motivo: "Término de contrato",
    quantidade: 2,
    porcentagem: 2,
    setor: "Financeiro",
    mes: "Junho/2025",
  },
  {
    id: "18",
    motivo: "Trocou de Provedor (Melhor Proposta Financeira)",
    quantidade: 6,
    porcentagem: 5,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: "19",
    motivo: "Pausa no Contrato",
    quantidade: 2,
    porcentagem: 2,
    setor: "Financeiro",
    mes: "Junho/2025",
  },
  {
    id: "20",
    motivo: "Fraude na contratação",
    quantidade: 1,
    porcentagem: 1,
    setor: "Segurança",
    mes: "Junho/2025",
  },
  {
    id: 21,
    motivo: "Direito do Consumidor 7 dias",
    quantidade: 2,
    porcentagem: 2,
    setor: "Comercial",
    mes: "Junho/2025",
  },
  {
    id: 22,
    motivo: "Insatisfação com Streaming",
    quantidade: 3,
    porcentagem: 2,
    setor: "Streaming",
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
  dataCancelamento?: string;
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

export const newSearchRetention = z.object({
  userId: z.string().optional(),
  clientName: z.string().optional(),
  neighborhood: z.string().optional(),
  reason: z.string().optional(),
  sector: z.string().optional(),
  plan: z.string().optional(),
  condominium: z.string().optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});



export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const setores = [
  "Cancelamento",
  "Suporte",
  "Comercial",
  "Financeiro",
  "Cobrança",
];

export const motivosCancelamentos = [
  "Mudanca de Endereco (Inviabilidade Tecnica)",
  "Corte de gastos",
  "Pessoal nao Detalhado",
  "Falecimento do Titular",
  "Solicitacao de agendamento nao atendida",
  "Mudanca para local que ja possui Nmultifibra",
  "Empresa fechou",
  "Insatisfacao com servico prestado",
  "Insatisfacao com valor do servico",
  "Insatisfacao com atendimento",
  "Trocou de provedor (Pacote dados moveis incluso)",
  "Trocou de provedor (Pacote de TV incluso)",
  "Termino de contrato",
  "Trocou de Provedor (Melhor Proposta Financeira)",
  "Pausa no Contrato",
  "Fraude na contratação",
  "Direito do Consumidor 7 dias",
  "Insatisfação com Streaming",
];

export const motivosRetencoes = [
  "Isenção de uma mensalidade",
  "Upgrade de plano, 3 meses da mensalidade atual",
  "Desconto por 3 meses",
  "Desconto por 6 meses",
  "Desconto por 1 ano",
  "Troca de titularidade concluída",
  "Downgrade do plano",
  "Encaixe de ordem de serviço",
  "Diálogo e retratação",
  "Upgrade do plano",
  "Diálogo com ênfase em nossa qualidade",
  "Upgrade de plano e troca de equipamento",
  "Realizado suporte remoto",
  "Mediante visita técnica",
  "Implantação novo endereço",
  "Troca de equipamento",
  "Desconto pontual, redução de 1 mensalidade",
  "Postergado data de vencimento",
  "Redução taxa de serviço",
  "Isenção taxa de serviço",
  "Apenas retirado juros da mensalidade",
  "Proposta Black Friday",
  "Cancelou e reativou no mesmo mês",
  "Retenção - Reativou após pausa no"
]


export type CancelamentoItem = {
  idCliente?: string | number;
  nome?: string;
  idContrato?: string | number;
  idAtendimento?: string | number;
  tempoAtivo?: string;
  bairro?: string;
  motivoReal?: string;
  dataCancelamento: string;
  condominio?: string;
  [key: string]: any;
};

export type RetencoesItem = {
  idCliente?: string | number;
  nome?: string;
  idContrato?: string | number;
  idAtendimento?: string | number;
  motivoCancelamento: string;
  plano: string;
  retencaoAplicada: string;
  responsavel: string;
  [key: string]: any;
};

export const bairrosCotia = [
  "Centro",
  "Jardim da Glória",
  "Jardim Caiapia",
  "Jardim Sabiá",
  "Granja Viana",
  "Parque Rizzo",
  "Jardim Petrópolis",
  "Jardim Sandra",
  "Atalaia",
  "Jardim Arco-Íris",
  "Vila Monte Serrat",
  "Jardim Colibri",
  "Jardim Torino",
  "Jardim São Miguel",
  "Jardim Nova Coimbra",
  "Jardim Passargada",
  "Jardim Nomura",
  "Parque São George",
  "Vila Santa Catarina",
  "Jardim Santa Isabel",
  "Caputera",
  "Chácara Cantagalo",
  "Jardim Leonor",
  "Jardim Ísis",
  "Jardim Barro Branco",
  "Chácara Tropical",
  "Jardim Rio das Pedras",
  "Parque Miguel Mirizola",
  "Paisagem Renoir",
  "Vila Santo Antônio",
  "Parque Dom Henrique",
  "Residencial Parque das Rosas",
  "Jardim Japão",
  "Jardim das Flores",
  "Jardim São Vicente",
  "Jardim dos Ipês",
  "Jardim Santa Maria",
  "Jardim Belizário"
];


export type CustomTooltipProps = {
  active?: boolean;
  payload?: { payload: RetentionProps }[];
  label?: string;
};

export type CustomLegend = {
  payload?: { value: string; color: string; payload: RetentionProps }[];
}

export const allPlans = [
  "COMBO MULTI 30 PROMOCIONAL",
  "COMBO MULTI 250 + BASIC TV",
  "COMBO MULTI 250 + POWER TV",
  "COMBO MULTI 300 PROMOCIONAL",
  "COMBO MULTI 500 + BASIC TV",
  "COMBO MULTI 500 PROMOCIONAL",
  "MULTI 50",
  "COMBO MULTI 50 PROMOCIONAL",
  "COMBO MULTI PREMIUM",
  "COMBO MULTI 500",
  "COMBO MULTI 150 PROMOCIONAL",
  "MULTI 150 EMPRESA",
  "MULTI 300 EMPRESA",
  "MULTI 500 EMPRESA",
  "CORPORATIVO MULTI 100",
  "CORPORATIVO MULTI 250",
  "CORPORATIVO MULTI 500",
  "MULTI 200",
  "MULTI 100",

]

export const condominios = [


  "Condominio Evidence",
  "Condominio Nova Zelandia I",
  "Condominio Terra Nobre Granja Vianna",
  "Condominio Vila Real do Moinho Velho",
  "Condomínio Andorinhas - Reserva das Aves",
  "Condomínio Araras",
  "Condomínio Arco Iris I",
  "Condomínio Associação Residencial dos Ipês",
  "Condomínio Astoria III",
  "Condomínio Beija Flor - Reserva das Aves",
  "Condomínio Bem-te-vi (Lageado)",
  "Condomínio Bosque Clube ",
  "Condomínio Buona Vitta",
  "Condomínio Canários - Reserva das Aves",
  "Condomínio Club & Home Bosque dos Pássaros",
  "Condomínio Conquista Cotia",
  "Condomínio Costa Verde",
  "Condomínio Cotia C (CDHU do Panorama)",
  "Condomínio Green Land",
  "Condomínio Jardim dos Alpes",
  "Condomínio Juritis - Reserva das Aves",
  "Condomínio Le Mont I",
  "Condomínio Le Mont II",
  "Condomínio Nova Zelândia II",
  "Condomínio Novo Horizonte",
  "Condomínio Parque Real",
  "Condomínio Portal de Cotia",
  "Condomínio Refúgio Cantagalo III",
  "Condomínio Reserva Samambaia",
  "Condomínio Residencial Bento XXI",
  "Condomínio Residencial Florença",
  "Condomínio Residencial Valle Verde",
  "Condomínio Residencial Viva Vida",
  "Condomínio Residêncial Porto Seguro",
  "Condomínio Residêncial Praça Paraíso",
  "Condomínio Residêncial Vila Verde",
  "Condomínio Sindona Parque 01",
  "Condomínio Tangará",
  "Condomínio Veredas (CDHU do São Miguel)",
  "Condomínio Vida Plena",
  "Condomínio Villa Residêncial do Bosque",
  "Condomínio Vista Verde",
  "Condomínio Vitoria",
  "Edifício Narciso",
  "Edifício Pedra Diamante",
  "Edifício Pedra Zafira",
  "Edifício São Sebastião",
  "Parque Industrial San José",
  "Parque Vivere Cotia",
  "Residencial Barcelona",
  "Residencial Bem-te-vi",
  "Residencial Cellebra Cotia",
  "Residencial Granja Caiapia",
  "Residencial Ilha de Capri",
  "Residencial Las Vegas",
  "Residencial Mônaco",
  "Residencial Napoles",
  "Residencial Nativo Clube",
  "Residencial Paris",
  "Residencial Positano",
  "Residencial Quinta de Santa Ana",
  "Residencial Sidney",
  "Residencial Vida Nova",
  "Residencial Villa D'Este",
  "Shopping Granja Vianna",
  "Shopping Open Mall The Square",
  "Vila das Flores",
  "Villagio di Lux"
]



