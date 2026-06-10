import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqData: FAQItem[] = [
    {
      question: "Como vou receber o método Desbloqueie o Medo de Dirigir?",
      answer: "Imediatamente após a aprovação do pagamento, você receberá um e-mail com as instruções de acesso ao nosso portal exclusivo. Lá você poderá fazer o download do e-book principal, áudios e bônus em qualquer dispositivo (celular, tablet ou computador)."
    },
    {
      question: "Eu tenho CNH há anos mas não dirijo. O método serve para mim?",
      answer: "Sim! Este método foi desenvolvido especificamente para mulheres habilitadas que se sentem paralisadas por bloqueios emocionais. Ele não foca em aprender a dirigir do zero, mas sim em eliminar os gatilhos mentais da ansiedade para que você consiga usar sua habilitação com tranquilidade."
    },
    {
      question: "Quanto tempo preciso dedicar por dia?",
      answer: "Apenas 10 a 15 minutos por dia são suficientes. O plano foi desenhado de forma progressiva com exercícios curtos que você pode praticar mentalmente ou dentro do carro parado no início."
    },
    {
      question: "E se o método não funcionar para mim?",
      answer: "Nós oferecemos uma garantia incondicional de 7 dias. Se você ler e sentir que o material não é para você, basta enviar um único e-mail e devolveremos 100% do seu dinheiro, sem perguntas ou burocracia."
    },
    {
      question: "O pagamento de R$ 17 é único ou mensalidade?",
      answer: "É uma taxa única! Você paga apenas R$ 17,00 hoje e garante acesso vitalício ao material completo e a todas as futuras atualizações. Sem taxas extras ou assinaturas ocultas."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="flex items-center gap-2 justify-center mb-6">
        <HelpCircle className="text-pink-600 w-5 h-5" />
        <h3 className="text-xl font-bold text-slate-800 font-display">Perguntas Frequentes</h3>
      </div>
      <div className="space-y-3">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-pink-100/50 shadow-xs overflow-hidden transition-all duration-200"
            >
              <button
                id={`faq-btn-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none hover:bg-pink-50/20"
              >
                <span className="font-semibold text-slate-800 text-sm md:text-base">
                  {item.question}
                </span>
                <span className="text-pink-600 shrink-0">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-pink-50/50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
