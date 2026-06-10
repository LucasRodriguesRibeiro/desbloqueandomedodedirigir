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
    questionText: "Há quanto tempo você evita dirigir com regularidade?",
    type: "select",
    options: [
      { id: "2a", text: "Menos de 1 ano (ou estou iniciando na autoescola/processo)", score: 1 },
      { id: "2b", text: "Entre 1 e 5 anos sem dirigir ou treinar", score: 2 },
      { id: "2c", text: "Há mais de 5 ou 10 anos paralisada ou sem coragem de começar", score: 3 }
    ]
  },
  {
    id: 3,
    questionText: "Qual frase melhor descreve o que você sente ao sentar no banco do motorista?",
    type: "select",
    options: [
      { id: "3a", text: "Coração acelera, sinto suor frio e uma vontade enorme de desistir", score: 4 },
      { id: "3b", text: "Tenho medo de cometer erros bobos, deixar o carro morrer ou de passar vergonha", score: 3 },
      { id: "3c", text: "Sinto apenas uma insegurança leve, o que me falta mesmo é mais prática", score: 1 }
    ]
  },
  {
    id: 4,
    questionText: "Qual situação no trânsito mais te causa receio ou batedeira?",
    type: "select",
    options: [
      { id: "4a", text: "Pegar avenidas muito movimentadas, rodovias ou horários de pico", score: 4 },
      { id: "4b", text: "Controle em subidas, ladeiras ou parar em semáforos inclinados", score: 3 },
      { id: "4c", text: "Fazer baliza, estacionar em público ou manobrar com alguém assistindo", score: 2 },
      { id: "4d", text: "Dirigir sozinha à noite ou sob chuva forte", score: 2 }
    ]
  },
  {
    id: 5,
    questionText: "Você já deixou de realizar compromissos ou passeios por medo de dirigir?",
    type: "select",
    options: [
      { id: "5a", text: "Sim, evito constantemente e acabo dependendo sempre de carona ou Uber", score: 4 },
      { id: "5b", text: "Sim, algumas vezes quando sei que o caminho ou estacionamento é difícil", score: 3 },
      { id: "5c", text: "Raramente deixo de ir, mas procuro caminhos fáceis ou vou acompanhada", score: 2 },
      { id: "5d", text: "Nunca deixei de sair, mas sinto um estresse e ansiedade absurdos antes", score: 1 }
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
      "Autoestima impactada, com sentimentos de frustração por querer assumir a direção mas se sentir paralisada."
    ],
    recommendation: "Para o bloqueio intenso, métodos tradicionais de autoescola falham porque focam em técnica, quando o problema é puramente emocional. Você precisa de exercícios terapêuticos mapeados cientificamente para recondicionar o seu cérebro, exatamente o que o nosso e-book proporciona."
  }
};
