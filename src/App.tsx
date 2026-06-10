/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ScreenState, ProfileType, QuizOption } from "./types";
import { QUIZ_QUESTIONS, PROFILE_DETAILS } from "./questions";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import PurchaseModal from "./components/PurchaseModal";
import { motion, AnimatePresence } from "motion/react";
import { 
  Car, 
  ShieldCheck, 
  Lock, 
  Check, 
  X, 
  ArrowRight, 
  Users, 
  Clock, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Heart
} from "lucide-react";

// Import the generated product mockup image asset
import productMockupImg from "./assets/images/dirigir_sem_medo_1781117352824.png";

export default function App() {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> score
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({}); // questionId -> optionText
  const [sliderValue, setSliderValue] = useState<number>(5); // Default value for 1-10 slider
  const [scoreResult, setScoreResult] = useState<number>(0);
  const [profile, setProfile] = useState<ProfileType>(ProfileType.MODERADO);
  
  // Processing phase lines
  const [processingLineIndex, setProcessingLineIndex] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const startQuiz = () => {
    setScreen(ScreenState.QUIZ);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOptions({});
    setSliderValue(5);
  };

  const handleSelectOption = (option: QuizOption) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    
    const updatedAnswers = { ...answers, [currentQuestion.id]: option.score };
    const updatedSelectedOptions = { ...selectedOptions, [currentQuestion.id]: option.text };
    setAnswers(updatedAnswers);
    setSelectedOptions(updatedSelectedOptions);

    // Advancing logic with smooth delay for interaction feel
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Compute total and trigger final processes
        finishQuiz(updatedAnswers);
      }
    }, 280);
  };

  const handleSliderSubmit = () => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    
    // The score for Question 8 is the slider value itself (1-10)
    const updatedAnswers = { ...answers, [currentQuestion.id]: sliderValue };
    const updatedSelectedOptions = { ...selectedOptions, [currentQuestion.id]: `Escala: ${sliderValue}/10` };
    setAnswers(updatedAnswers);
    setSelectedOptions(updatedSelectedOptions);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const finishQuiz = (finalAnswers: Record<number, number>) => {
    // Calculando a pontuação total (ignorando Q1 que é 0)
    let totalScore = 0;
    Object.keys(finalAnswers).forEach((key) => {
      const qId = parseInt(key);
      if (qId !== 1) {
        totalScore += finalAnswers[qId] || 0;
      }
    });

    setScoreResult(totalScore);

    // Profile determination based on score rules (max score is 15)
    let profileType = ProfileType.MODERADO;
    if (totalScore <= 8) {
      profileType = ProfileType.LEVE;
    } else if (totalScore >= 12) {
      profileType = ProfileType.INTENSO;
    }
    setProfile(profileType);

    triggerProcessingScreen();
  };

  const triggerProcessingScreen = () => {
    setScreen(ScreenState.PROCESSING);
    setProcessingLineIndex(0);
    setProcessingProgress(0);

    // Simulate psychological diagnostics synthesis
    const intervals = [800, 1600, 2400, 3250];
    intervals.forEach((delay, index) => {
      setTimeout(() => {
        setProcessingLineIndex(index + 1);
      }, delay);
    });

    // Steady tick of progress bar
    const progressInterval = setInterval(() => {
      setProcessingProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 80);

    // End processing and show result lander
    setTimeout(() => {
      clearInterval(progressInterval);
      setScreen(ScreenState.RESULT);
    }, 4200);
  };

  const handlePurchaseClick = () => {
    setIsPurchaseOpen(true);
  };

  const handlePurchaseSuccess = (paymentMethod: string) => {
    // Logic on success
  };

  // Render variables
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100);
  const activeProfile = PROFILE_DETAILS[profile];

  return (
    <div className="min-h-screen bg-[#fdf8fa] flex flex-col antialiased items-center">
      {/* Visual Header / Brand Area */}
      <header className="w-full bg-white border-b border-pink-100/50 py-4 px-4 shadow-3xs flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-pink-50 text-pink-600 p-2 rounded-xl">
            <Car size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black text-purple-950 tracking-tight font-display">
              DESBLOQUEIE O MEDO DE DIRIGIR
            </h1>
            <p className="text-[10px] text-pink-500 font-mono tracking-wider font-semibold">DIAGNÓSTICO EMOCIONAL FEMININO</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-50/50 rounded-full border border-pink-100/30 text-xs text-purple-750 font-semibold select-none">
          <ShieldCheck size={14} className="text-pink-600" />
          <span className="hidden sm:inline">Portal Seguro para Mulheres</span>
          <span className="sm:hidden">Seguro</span>
        </div>
      </header>

      {/* Main Dynamic Viewport Box */}
      <main className="flex-1 w-full max-w-4xl px-4 py-8 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          
          {/* TELA 1: HOME/START SCREEN */}
          {screen === ScreenState.START && (
            <motion.div
              key="start-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 border border-pink-100/40 shadow-xl shadow-pink-100/10 text-center relative overflow-hidden"
            >
              {/* Soft decorative background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full"></div>

              {/* Top micro badges */}
              <div className="flex justify-center gap-2 mb-6">
                <span className="text-[10px] md:text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  ⏱️ Resposta rápida: 2 min
                </span>
                <span className="text-[10px] md:text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
                  97.4% de acerto psicotécnico
                </span>
              </div>

              {/* Main Landing Heading */}
              <h2 className="text-2xl md:text-3xl font-black text-purple-950 leading-tight tracking-tight font-display">
                Descubra em 2 minutos por que você ainda tem medo de dirigir
              </h2>
              
              <p className="text-purple-900/70 text-sm md:text-base mt-4 leading-relaxed max-w-lg mx-auto">
                Responda algumas perguntas simples e receba uma análise personalizada sobre o que está bloqueando sua confiança e autonomia ao volante.
              </p>

              {/* Visual trust block */}
              <div className="my-8 relative max-w-xs mx-auto">
                <div className="bg-pink-50/40 p-5 rounded-2xl border border-pink-100/50 flex items-center gap-4 text-left shadow-2xs">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-xs border border-pink-100 flex items-center justify-center text-pink-600 font-bold shrink-0 relative">
                    <Car size={24} className="stroke-[2.5] animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-purple-950 text-sm leading-tight">Mapeamento Psicoemocional</h4>
                    <p className="text-xs text-purple-700/60 mt-0.5">Identifique ansiedades e barreiras invisíveis no tráfego.</p>
                  </div>
                </div>
              </div>

              {/* Quiz start element with micro initial progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5 text-xs text-purple-400 font-semibold px-1">
                  <span>Progresso do diagnóstico</span>
                  <span className="text-pink-600 font-bold">Iniciando...</span>
                </div>
                <div className="w-full bg-pink-100/40 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-pink-500 h-full w-[5%] transition-all duration-300"></div>
                </div>
              </div>

              {/* Main high fidelity button with glow pulse effect */}
              <button
                id="start-quiz-btn"
                onClick={startQuiz}
                className="w-full py-4.5 px-6 bg-pink-600 hover:bg-pink-550 text-white rounded-2xl text-base font-extrabold tracking-wide uppercase transition-all duration-200 active:scale-98 shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>COMEÇAR DIAGNÓSTICO</span>
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition" />
              </button>

              <div className="flex justify-center items-center gap-4 mt-6 text-[11px] text-purple-500 font-medium">
                <span className="flex items-center gap-1">
                  <Lock size={12} className="text-pink-400" />
                  100% Protegido e Feminino
                </span>
                <span>•</span>
                <span>Apoio Psicológico Prático</span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: ACTIVE DYNAMIC QUIZ */}
          {screen === ScreenState.QUIZ && currentQuestion && (
            <motion.div
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 border border-pink-100/40 shadow-xl text-center flex flex-col justify-between"
            >
              {/* Minimalist Top Progress */}
              <div className="mb-6 space-y-2 text-center select-none">
                <div className="text-xs font-mono font-bold tracking-widest text-purple-700/80 uppercase">
                  Diagnóstico Emocional • Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                </div>
                <div className="w-full bg-pink-100/40 rounded-full h-1 relative overflow-hidden">
                  <div 
                    className="bg-pink-500 h-full transition-all duration-300"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  ></div>
                </div>
              </div>

              {/* Dynamic Question Body */}
              <div className="my-4 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-purple-950 leading-tight font-display px-2 mb-6">
                  {currentQuestion.questionText}
                </h3>

                <div className="space-y-2.5 max-w-md mx-auto text-left">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      id={`option-${opt.id}`}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full text-left px-5 py-3.5 bg-white hover:bg-pink-50/20 border border-pink-100 hover:border-pink-300 active:bg-pink-50 rounded-xl text-sm md:text-base text-purple-950 font-semibold transition duration-150 cursor-pointer shadow-3xs flex items-center justify-between group"
                    >
                      <span className="pr-4">{opt.text}</span>
                      <span className="w-6 h-6 border border-pink-100 group-hover:border-pink-350 rounded-full flex items-center justify-center bg-pink-50/30 group-hover:bg-pink-100 transition shrink-0">
                        <ChevronRight size={14} className="text-pink-400 group-hover:text-pink-700 transition" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Supportive micro tagline */}
              <div className="mt-6 pt-4 border-t border-pink-50 flex items-center justify-center gap-1.5 text-[11px] text-purple-400 font-semibold select-none">
                <ShieldCheck size={12} className="text-pink-500" />
                <span>Dados de privacidade seguros e protegidos</span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: NO CNH HALTED EXIT SCREEN */}
          {screen === ScreenState.HALTED && (
            <motion.div
              key="halted-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white rounded-3xl p-8 border border-pink-100/40 shadow-xl text-center"
            >
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <ShieldAlert size={28} />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-purple-950 font-display leading-tight">
                Habilitação Obrigatória
              </h3>
              
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 my-5 text-sm text-rose-800 leading-relaxed">
                Este diagnóstico comportamental foi desenhado e estruturado para <strong>mulheres que já possuem CNH emitida</strong>, mas enfrentam barreiras psicoemocionais na prática.
              </div>

              <p className="text-purple-900/60 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                Como nossa metodologia cruza dados sobre a direção em via ativa já homologada, perfis sem habilitação não possuem amostragem compatível com as de bloqueio pós-exame.
              </p>

              {/* supportive resource suggestions for user convenience */}
              <div className="space-y-2 mb-6 text-left p-4 bg-pink-50/30 rounded-2xl border border-pink-50/60">
                <h4 className="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest mb-2 font-mono">Dicas para seu momento atual:</h4>
                <div className="flex items-start gap-2 text-xs text-purple-900/80 font-medium">
                  <Check size={14} className="text-pink-650 mt-0.5" />
                  <span>Seu foco inicial deve ser as aulas teóricas e práticas regulamentares da autoescola.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-purple-900/80 font-medium mt-1.5">
                  <Check size={14} className="text-pink-650 mt-0.5" />
                  <span>Trabalhe os bônus após obter o seu documento definitivo.</span>
                </div>
              </div>

              <button
                id="reset-quiz-halt-btn"
                onClick={() => setScreen(ScreenState.START)}
                className="w-full py-3 px-4 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-bold transition duration-200 cursor-pointer"
              >
                Voltar ao Início
              </button>
            </motion.div>
          )}

          {/* SCREEN 4: PROCESSING INTERMEDIATE SCREEN */}
          {screen === ScreenState.PROCESSING && (
            <motion.div
              key="processing-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl p-8 border border-pink-100/40 shadow-xl text-center space-y-6"
            >
              {/* Spinner animation with outer glow ring */}
              <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-pink-50 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
                  style={{ animationDuration: "1s" }}
                ></div>
                <Sparkles size={24} className="text-pink-500 animate-pulse mt-0.5" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-purple-950 font-display">Cruzando Informações</h3>
                <p className="text-xs text-pink-600 font-bold uppercase tracking-widest font-mono">Processamento Seguro</p>
              </div>

              {/* Status processing checkmark items */}
              <div className="bg-pink-50/20 rounded-2xl p-4 text-left border border-pink-100/50 divide-y divide-pink-100/30 max-w-xs mx-auto">
                <div className="flex items-center justify-between pb-2 text-xs font-semibold">
                  <span className={`${processingLineIndex >= 1 ? "text-purple-950" : "text-purple-300"}`}>
                    Analisando respostas e fobia...
                  </span>
                  {processingLineIndex >= 1 ? (
                    <span className="text-pink-600 font-black font-mono text-xs">OK</span>
                  ) : (
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></span>
                  )}
                </div>
                <div className="flex items-center justify-between py-2 text-xs font-semibold">
                  <span className={`${processingLineIndex >= 2 ? "text-purple-950" : "text-purple-300"}`}>
                    Mapeando bloqueios inconscientes...
                  </span>
                  {processingLineIndex >= 2 ? (
                    <span className="text-pink-600 font-black font-mono text-xs">OK</span>
                  ) : processingLineIndex === 1 ? (
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between py-2 text-xs font-semibold">
                  <span className={`${processingLineIndex >= 3 ? "text-purple-950" : "text-purple-300"}`}>
                    Traçando grau de ansiedade...
                  </span>
                  {processingLineIndex >= 3 ? (
                    <span className="text-pink-600 font-black font-mono text-xs">OK</span>
                  ) : processingLineIndex === 2 ? (
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between pt-2 text-xs font-semibold">
                  <span className={`${processingLineIndex >= 4 ? "text-purple-950" : "text-purple-300"}`}>
                    Gerando manual e bônus...
                  </span>
                  {processingLineIndex >= 4 ? (
                    <span className="text-pink-600 font-black font-mono text-xs">OK</span>
                  ) : processingLineIndex === 3 ? (
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></span>
                  ) : null}
                </div>
              </div>

              {/* Progress dynamic percentage bar */}
              <div className="space-y-1.5 max-w-sm mx-auto">
                <div className="w-full bg-pink-50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-pink-500 h-full transition-all duration-100"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-purple-400 font-mono font-bold">
                  <span>Estruturando relatório...</span>
                  <span>{processingProgress}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: DIAGNOSTIC OUTCOMES & HIGH CONVERSION CONVERTING LANDING PAGE (SALES OFFER) */}
          {screen === ScreenState.RESULT && activeProfile && (
            <motion.div
              key="result-block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl space-y-8 pb-16"
            >
              {/* Header result notification banner */}
              <div className="text-center space-y-2 select-none">
                <span className="text-xs px-3 py-1 bg-pink-50 border border-pink-100 text-pink-700 font-extrabold tracking-widest uppercase rounded-full inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
                  DIAGNÓSTICO PSICOEMOCIONAL FINALIZADO
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-purple-950 font-display tracking-tight leading-tight">
                  Seu Diagnóstico de Bloqueio Emocional
                </h2>
              </div>

              {/* Profile Card details block */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100/40 shadow-xl relative overflow-hidden">
                {/* Decorative status header background */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-purple-800 via-pink-500 to-purple-800"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-pink-50">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest font-mono">Grau de Travamento Identificado</span>
                    <h3 className={`text-2xl font-black font-display ${
                      profile === ProfileType.INTENSO
                        ? "text-rose-600"
                        : profile === ProfileType.MODERADO
                        ? "text-purple-650"
                        : "text-pink-650"
                    }`}>
                      {activeProfile.title}
                    </h3>
                  </div>
                  <div className="shrink-0 bg-pink-50/40 border border-pink-100/50 rounded-2xl px-4 py-2 text-left">
                    <span className="text-[10px] text-purple-400 block font-bold font-mono">FORÇA DA BARREIRA:</span>
                    <span className="text-sm md:text-base font-extrabold text-purple-950">{scoreResult} de 15 pontos</span>
                  </div>
                </div>

                <div className="py-6 space-y-6">
                  {/* Behavioral diagnostic text */}
                  <div>
                    <p className="text-purple-900 font-bold text-base md:text-lg italic leading-relaxed">
                      "{activeProfile.description}"
                    </p>
                  </div>

                  {/* Bulleted checklist of common behaviors of the profile */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
                      Comportamentos Atuais que Combinam com Você:
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeProfile.behaviorDetails.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-pink-50/20 p-3 rounded-xl border border-pink-100/30">
                          <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-xs md:text-sm text-purple-950 leading-relaxed font-semibold">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis guidance */}
                  <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100/60">
                    <h4 className="text-xs font-extrabold text-pink-700 tracking-widest uppercase flex items-center gap-1.5 mb-2 font-display">
                      <Sparkles size={14} className="text-pink-600" />
                      <span>Recomendação e Plano Terapêutico</span>
                    </h4>
                    <p className="text-purple-900/80 text-xs md:text-sm leading-relaxed font-medium">
                      {activeProfile.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* SEÇÃO DE IDENTIFICAÇÃO: Emotional Connection Open Letter */}
              <div className="bg-[#1e0e33] bg-gradient-to-r from-[#1e0e33] to-[#0f0720] text-slate-100 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl text-center md:text-left border border-pink-100/10">
                {/* Visual vectors */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-pink-500/10 blur-3xl rounded-full"></div>
                
                <div className="relative max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Users size={12} />
                    <span>Lugar Acolhedor de Apoio</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white font-display leading-tight">
                    Mais de 80% das mulheres habilitadas com medo de dirigir passam exatamente pelo que você está passando hoje.
                  </h3>
                  
                  <div className="border-l-2 border-pink-500 pl-4 py-1 space-y-2.5 mt-4 text-left">
                    <p className="text-pink-100/80 text-sm md:text-base leading-relaxed">
                      O verdadeiro problema não é sua habilidade mecânica de soltar a embreagem ou virar o volante.
                    </p>
                    <p className="text-pink-300 font-extrabold text-sm md:text-base leading-relaxed">
                      O problema é o <strong>bloqueio amigdaliano (emocional)</strong> que aciona o reflexo inconsciente de lutar ou fugir assim que você assume a posição de motorista.
                    </p>
                  </div>
                </div>
              </div>

              {/* OFERTA PRODUCT HIGHLIGHT & BENEFITS PANEL */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100/40 shadow-xl space-y-8 relative">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                    SUA SOLUÇÃO CONCRETA
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-purple-950 font-display mt-2">
                    Acesso ao Método Passo a Passo
                  </h3>
                </div>

                {/* Main Product graphic and list block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Actual high fidelity packaging image bundle dynamically generated */}
                  <div className="flex justify-center p-2 relative group">
                    <div className="absolute inset-0 bg-pink-300/10 blur-xl rounded-2xl group-hover:bg-pink-300/15 transition-all"></div>
                    <img 
                      src={productMockupImg} 
                      alt="Método Desbloqueie o Medo de Dirigir - E-Book e Bônus"
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full max-w-[280px] h-auto object-contain rounded-2xl shadow-xl hover:scale-103 transition duration-300 pointer-events-none"
                    />
                  </div>

                  {/* List of benefits */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-purple-950 text-base font-display">
                      O que você vai receber imediatamente:
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center shrink-0 mt-1">
                          <Check size={12} className="stroke-[3]" />
                        </span>
                        <div>
                          <strong className="text-sm md:text-base font-black text-pink-800 font-display block">O Método Principal: Dirigir Sem Medo</strong>
                          <p className="text-xs md:text-sm text-purple-900/80 font-medium leading-relaxed mt-0.5">
                            O guia passo a passo com o Plano Progressivo. Você saberá exatamente o que fazer em cada etapa até estar dirigindo no trânsito real de forma calma e segura. Inclui todos os exercícios práticos guiados para controle imediato de ansiedade.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center shrink-0 mt-1">
                          <Check size={12} className="stroke-[3]" />
                        </span>
                        <div>
                          <strong className="text-sm md:text-base font-black text-pink-800 font-display block">BÔNUS 1 - Mecânica Básica para Mulheres</strong>
                          <p className="text-xs md:text-sm text-purple-900/80 font-medium leading-relaxed mt-0.5">
                            Aprenda de forma super simples a cuidar do seu carro. Saiba checar óleo, água, entender as luzes do painel e não seja mais enganada ou dependa de ninguém para o básico.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center shrink-0 mt-1">
                          <Check size={12} className="stroke-[3]" />
                        </span>
                        <div>
                          <strong className="text-sm md:text-base font-black text-pink-800 font-display block">BÔNUS 2 - Checklist de Segurança</strong>
                          <p className="text-xs md:text-sm text-purple-900/80 font-medium leading-relaxed mt-0.5">
                            Um guia rápido para você repassar mentalmente antes de dar a partida. Evite erros bobos que causam nervosismo e comece todo trajeto sentindo o controle absoluto da situação.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GATILHO DE DOR WARNING COST CALLOUT */}
              <div className="bg-rose-50/30 border border-rose-100 rounded-3xl p-6 md:p-8 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <ShieldAlert size={20} className="stroke-[2.5]" />
                  <h4 className="font-extrabold text-base md:text-lg font-display">
                    Quanto custa continuar com esse bloqueio?
                  </h4>
                </div>
                
                <p className="text-purple-900/70 text-xs md:text-sm leading-relaxed font-semibold">
                  Manter o carro aprisionado na vaga ou depender financeiramente de parentes e tarifas caras de transporte desgasta sua autoestima a longo prazo.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-rose-950 select-none">
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-xl border border-rose-50/80">
                    <X size={14} className="text-rose-600 shrink-0" />
                    <span>Perda de independência diária</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-xl border border-rose-50/80">
                    <X size={14} className="text-rose-600 shrink-0" />
                    <span>Insegurança persistente</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-xl border border-rose-50/80">
                    <X size={14} className="text-rose-600 shrink-0" />
                    <span>Medo infundado de multas</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-xl border border-rose-50/80">
                    <X size={14} className="text-rose-600 shrink-0" />
                    <span>Deixar o carro acumular poeira</span>
                  </div>
                </div>
              </div>

              {/* HIGH CONVERTING SALES CLOSING CTA PANEL */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100/40 shadow-xl text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/5 rounded-full blur-3xl"></div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-55 track-widest uppercase px-2.5 py-1 rounded-full">
                    Acesso Vitalício & download Imediato
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-purple-950 font-display mt-2">
                    Garanta Sua Solução com Preço Acolhedor
                  </h3>
                </div>

                <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100/40 max-w-sm mx-auto">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-purple-400">Preço Padrão de Lançamento</span>
                    <span className="text-purple-300 line-through">R$ 97,00</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 border-t border-pink-100/40 pt-2 text-pink-900 font-extrabold text-sm md:text-base">
                    <span>Inscrição Promocional Hoje</span>
                    <span className="text-lg md:text-2xl text-pink-650 font-black">APENAS R$ 17,00</span>
                  </div>
                </div>

                {/* Glow pulsating tactile CTA button */}
                <div className="space-y-4 max-w-md mx-auto">
                  <a
                    id="trigger-order-btn"
                    href="https://pay.hotmart.com/J104718348Y?checkoutMode=10&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=&sck="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 px-6 bg-pink-600 hover:bg-pink-550 text-white rounded-2xl text-base font-extrabold tracking-wide uppercase transition-all duration-300 transform active:scale-98 shadow-xl shadow-pink-600/10 animate-pulse-subtle flex items-center justify-center gap-2 group cursor-pointer text-center"
                  >
                    <span>SIM! QUERO DESBLOQUEAR O MEDO DE DIRIGIR</span>
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
                  </a>

                  {/* Trust details: 7 days guarantee element */}
                  <div className="bg-pink-50/20 p-4 rounded-xl border border-pink-50/50 flex items-start gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 shrink-0 flex items-center justify-center font-bold text-xs">
                      🛡️
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-purple-950">Garantia Prática de Envolvimento 7 Dias</h4>
                      <p className="text-[11px] text-purple-500 mt-0.5 leading-relaxed font-semibold">
                        Sinta a evolução. Se em até 7 dias você perceber que as técnicas psicoemocionais descritas não condizem com seu perfil, estornamos cada centavo investido. Risco zero para você.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TESTIMONIALS & TRUST PROOFS SEGMENT */}
              <Testimonials />

              {/* FAQ COLLAPSIBLE TOGGLEABLE ACCORDIONS */}
              <FAQ />

              {/* Footer Trust seals */}
              <div className="pt-8 border-t border-pink-100 text-center space-y-3">
                <p className="text-[11px] text-purple-400 max-w-md mx-auto leading-relaxed font-semibold">
                  Os depoimentos coletados são relatos reais de leitoras e seus resultados finais variam de acordo com a individualidade psicoemocional de cada condutora. Material pautado em autoconfiança consciente e reflexos adaptativos.
                </p>
                <div className="flex justify-center items-center gap-4 text-xs font-bold text-purple-450 uppercase tracking-widest select-none">
                  <span>SSL Autenticado</span>
                  <span>·</span>
                  <span>Garantia 100% de Conexão</span>
                  <span>·</span>
                  <span>Direitos Reservados © 2026</span>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Interactive checkout simulator modal container */}
      <PurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        productName="Ebook Desbloqueie o Medo de Dirigir (Premium)"
        price="R$ 17,00"
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </div>
  );
}
