import React from "react";
import { Star, Quote, CheckCircle } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  age: number;
  city: string;
  avatarBg: string;
  avatarText: string;
  text: string;
  situationBefore: string;
  resultAfter: string;
}

export default function Testimonials() {
  const reviews: TestimonialItem[] = [
    {
      id: 1,
      name: "Mariana Souza",
      age: 34,
      city: "São Paulo - SP",
      avatarBg: "bg-purple-100 text-purple-800",
      avatarText: "MS",
      text: "Eu tinha CNH há 8 anos e o carro ficava na garagem pegando poeira. Sentia uma batedeira no peito só de olhar pra chave. O e-book me ensinou a encarar os pensamentos de pânico. Hoje levo meu filho na escola todos os dias dirigindo sozinha! Mudou minha vida por R$ 17.",
      situationBefore: "Carro parado por 8 anos",
      resultAfter: "Independência total diária"
    },
    {
      id: 2,
      name: "Sandra Regina",
      age: 42,
      city: "Belo Horizonte - MG",
      avatarBg: "bg-pink-100 text-pink-800",
      avatarText: "SR",
      text: "Sempre que meu marido viajava eu ficava dependente de Uber ou carona deles porque morria de medo de pegar trânsito movimentado. Pratiquei os exercícios de respiração e o plano de passos curtos. Na semana passada peguei a avenida principal e nem acredito que não travei!",
      situationBefore: "Pânico de avenidas cheias",
      resultAfter: "Primeira avenida sem acompanhante"
    },
    {
      id: 3,
      name: "Juliana Mendes",
      age: 29,
      city: "Curitiba - PR",
      avatarBg: "bg-indigo-100 text-indigo-800",
      avatarText: "JM",
      text: "O que me paralisava era o medo do julgamento dos outros, de deixar o carro morrer na subida ou errar a baliza. As técnicas mentais do livro me deram um colo enorme. Entendi que o bloqueio não era incapacidade. Vale infinitamente mais que sessões caras de terapia ou aulas extras.",
      situationBefore: "Medo de julgamento e subidas",
      resultAfter: "Voltou a dirigir com calma"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4">
      <div className="text-center mb-10">
        <span className="text-xs px-2.5 py-1 bg-pink-50 text-pink-700 font-bold tracking-widest uppercase rounded-full">
          Histórias Reais de Superação
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2 font-display">
          Mulheres que recuperaram sua liberdade ao volante
        </h3>
        <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl mx-auto">
          Veja os relatos de quem estava na mesma situação que você e decidiu dar um basta no bloqueio emocional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-pink-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic relative">
                <Quote size={28} className="absolute -top-3 -left-2 text-pink-100 -z-10" />
                "{rev.text}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-pink-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${rev.avatarBg}`}>
                  {rev.avatarText}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                    {rev.name}
                    <CheckCircle size={14} className="text-pink-500 fill-pink-50" />
                  </h4>
                  <p className="text-xs text-slate-400">
                    {rev.age} anos · {rev.city}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 bg-pink-50/20 p-2 rounded-lg text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Antes:</span>
                  <span className="font-semibold text-slate-700 text-right">{rev.situationBefore}</span>
                </div>
                <div className="flex justify-between text-pink-600 font-semibold">
                  <span>Hoje:</span>
                  <span className="text-right">{rev.resultAfter}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
