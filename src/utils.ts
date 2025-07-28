import { z } from "zod";


interface Colaboradores {
  nome: string;
  quantidade: number;
}

export interface RetentionProps {
  setor: string;
  quantidade: number;
  porcentagem: number;
  dataCancelamento?: string;
  colaboradores: Colaboradores[];
}

export interface CancelamentoData {
  dataAtivacao: string;             // Ex: "15/07/2020" (pode ser Date se você converter)
  dataCancelamento: string;         // Ex: "26/05/2025"
  tempoAtivo: string;               // Ex: "4 Anos, 10 Meses e 14 Dias"
  Dias: number;                     // Total de dias como número
  idCliente: string;
  idContrato: string;
  idAtendimento: string;
  plano: string;
  nome: string;
  sexo: "Masculino" | "Feminino" | string;
  rua: string;
  bairro: string;
  condominio?: string;
  motivoReal: string;
  localInviabilidade?: string;
  motivoInsatisfacao?: string;
  dificuldade?: string;
  ajustadoNoIXC?: string;
  responsavel?: string;
  quantidade?: number; // usado para agrupamentos (ex: total por motivo)
}

export const SearchProps = z.object({
  userId: z.string().optional(),
  contractId: z.string().optional(),
  attendanceId: z.string().optional(),
  clientName: z.string().optional(),
  neighborhood: z.string().optional(),
  colaborator: z.string().optional(),
  reason: z.string().optional(),
  retencaoAplicada: z.string().optional(),
  sector: z.string().optional(),
  month: z.string().optional(),
  plan: z.string().optional(),
  condominium: z.string().optional(),
  difficulty: z.string().optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});


export const sectors = [
  "Cancelamento",
  "Suporte",
  "Comercial",
  "Financeiro",
  "Cobrança",
  "Técnico"
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
  "Isencao de uma mensalidade",
  "Upgrade de plano, 3 meses da mensalidade atual",
  "Desconto por 3 meses",
  "Desconto por 6 meses",
  "Desconto por 1 ano",
  "Troca de titularidade concluida",
  "Downgrade do plano",
  "Encaixe de ordem de servico",
  "Dialogo e retratacao",
  "Upgrade do plano",
  "Dialogo com enfase em nossa qualidade",
  "Upgrade de plano e troca de equipamento",
  "Realizado suporte remoto",
  "Mediante visita tecnica",
  "Implantacao novo endereco",
  "Troca de equipamento",
  "Desconto pontual, reducao de 1 mensalidade",
  "Postergado data de vencimento",
  "Reducao taxa de servico",
  "Isencao taxa de servico",
  "Apenas retirado juros da mensalidade",
  "Proposta Black Friday",
  "Cancelou e reativou no mesmo mes",
  "Retencao - Reativou apos pausa no contrato",
  "Renegociacao de debitos",
  "Adicao de mais Mega"
]

export const difficultys = [
  "Baixa",
  "Normal",
  "Alta",
  "Crítica"
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
  retencaoAplicada?:string;
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

export const condominiuns = [
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

export const colaborators = [
  "Gabriel Rosa",
  "Rubens Ribeiro",
  "João Pedro Miyake",
  "Pedro Henrique",
  "Eduardo Tomaz",
  "Alison Da Silva",
  "João Pedro Gomes",
  "Rodrigo Akira",
  "Diego Sousa",
  "Gabriel Marques"
];



