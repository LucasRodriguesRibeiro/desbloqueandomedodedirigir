import { QuizQuestion, ProfileType, QuizResultProfile } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionText: "Você possui CNH válida?",
    type: "select",
    options: [
      { id: "1a", text: "Sim", score: 0 },
      { id: "1b", text: "Não", score: 0 }
    ]
  },
  {
    id: 2,
    questionText: "Você possui acesso a um carro para dirigir?",
    type: "select",
    options: [
      { id: "2a", text: "Sim, carro próprio", score: 1 },
      { id: "2b", text: "Sim, carro da família", score: 2 },
      { id: "2c", text: "Não", score: 3 }
    ]
  },
  {
    id: 3,
    questionText: "Há quanto tempo você evita dirigir?",
    type: "select",
    options: [
      { id: "3a", text: "Menos de 30 dias", score: 1 },
      { id: "3b", text: "Entre 1 e 6 meses", score: 2 },
      { id: "3c", text: "Entre 6 meses e 1 ano", score: 3 },
      { id: "3d", text: "Mais de 1 ano", score: 4 }
    ]
  },
  {
    id: 4,
    questionText: "Quando você pensa em dirigir, o que sente primeiro?",
    type: "select",
    options: [
      { id: "4a", text: "Ansiedade", score: 4 },
      { id: "4b", text: "Medo de errar", score: 3 },
      { id: "4c", text: "Medo de bater", score: 4 },
      { id: "4d", text: "Nervosismo", score: 2 },
      { id: "4e", text: "Insegurança", score: 3 }
    ]
  },
  {
    id: 5,
    questionText: "Qual situação mais te assusta?",
    type: "select",
    options: [
      { id: "5a", text: "Trânsito movimentado", score: 3 },
      { id: "5b", text: "Estacionar", score: 2 },
      { id: "5c", text: "Rodovias", score: 4 },
      { id: "5d", text: "Subidas", score: 3 },
      { id: "5e", text: "Dirigir sozinha", score: 4 }
    ]
  },
  {
    id: 6,
    questionText: "Você já deixou de sair ou resolver algo por medo de dirigir?",
    type: "select",
    options: [
      { id: "6a", text: "Sim, várias vezes", score: 4 },
      { id: "6b", text: "Algumas vezes", score: 3 },
      { id: "6c", text: "Poucas vezes", score: 2 },
      { id: "6d", text: "Nunca", score: 1 }
    ]
  },
  {
    id: 7,
    questionText: "Seu carro fica parado por falta de confiança?",
    type: "select",
    options: [
      { id: "7a", text: "Sim", score: 4 },
      { id: "7b", text: "Às vezes", score: 2 },
      { id: "7c", text: "Não tenho carro", score: 1 }
    ]
  },
  {
    id: 8,
    questionText: "Quanto esse problema afeta sua liberdade?",
    type: "slider",
    options: [] // Managed via custom visual slider 1 to 10
  },
  {
    id: 9,
    questionText: "O que mais mudaria em sua vida se você voltasse a dirigir com confiança?",
    type: "select",
    options: [
      { id: "9a", text: "Mais independência", score: 2 },
      { id: "9b", text: "Mais liberdade", score: 2 },
      { id: "9c", text: "Menos ansiedade", score: 2 },
      { id: "9d", text: "Mais segurança", score: 1 },
      { id: "9e", text: "Todas as opções", score: 4 }
    ]
  },
  {
    id: 10,
    questionText: "Você estaria disposta a dedicar alguns minutos por dia para recuperar sua confiança ao volante?",
    type: "select",
    options: [
      { id: "10a", text: "Sim", score: 1 },
      { id: "10b", text: "Talvez", score: 2 },
      { id: "10c", text: "Não", score: 3 }
    ]
  }
];

export const PROFILE_DETAILS: Record<ProfileType, QuizResultProfile> = {
  [ProfileType.LEVE]: {
    type: ProfileType.LEVE,
    title: "BLOQUEIO LEVE",
    subtitle: "Você possui uma base promissora, precisando apenas de ajustes direcionados.",
    description: "Você já possui boa base para dirigir. Seu principal desafio está relacionado à falta de prática e à insegurança em situações específicas.",
    behaviorDetails: [
      "Insegurança ao realizar manobras complexas de estacionamento ou subidas íngremes.",
      "Necessidade de rituais de preparação ou companhia para se sentir segura.",
      "Ansiedade concentrada apenas em tráfego de alta velocidade ou vias desconhecidas."
    ],
    recommendation: "Com o seu nível de bloqueio leve, pequenos exercícios comportamentais diários e sequências de desensibilização farão você retomar o volante com segurança em poucos dias. O método foca precisamente em destravar estes pontos gatilhos."
  },
  [ProfileType.MODERADO]: {
    type: ProfileType.MODERADO,
    title: "BLOQUEIO MODERADO",
    subtitle: "A ansiedade e os pensamentos sabotadores estão restringindo suas asas.",
    description: "Seu resultado indica que você possui capacidade para dirigir, mas o medo e a ansiedade estão limitando sua confiança ao volante.",
    behaviorDetails: [
      "Focos de pânico moderado ao planejar a rota por medo de errar a marcha ou apagar o motor.",
      "Pensamentos constantes de antecipação negativa de julgamento de outros motoristas.",
      "Histórico de evitar saídas em horários de pico ou sob chuva leve."
    ],
    recommendation: "O bloqueio moderado necessita de um alinhamento entre a mentalidade e a resposta física ao volante. Nosso programa oferece ferramentas para cortar a espiral de ansiedade antes mesmo de colocar a chave na ignição."
  },
  [ProfileType.INTENSO]: {
    type: ProfileType.INTENSO,
    title: "BLOQUEIO INTENSO",
    subtitle: "O medo enraizado tomou o controle, gerando paralisação emocional.",
    description: "Seu medo de dirigir já está impactando sua liberdade e sua rotina. Quanto mais tempo esse bloqueio permanece, mais difícil se torna recuperar a confiança.",
    behaviorDetails: [
      "Sintomas físicos evidentes (taquicardia, suor nas mãos, tremor) só de pensar em conduzir.",
      "Evitamento severo, dependendo integralmente de terceiros, aplicativos de carona ou transporte público.",
      "Autoestima impactada, acompanhada de sentimentos de frustração por possuir a habilitação (CNH) e não usá-la."
    ],
    recommendation: "Para o bloqueio intenso, métodos tradicionais de autoescola falham porque focam em técnica, quando o problema é puramente emocional. Você precisa de exercícios terapêuticos mapeados cientificamente para recondicionar o seu cérebro, exatamente o que o nosso e-book proporciona."
  }
};
