import React, { useState, useEffect } from "react";
import { X, Lock, ShieldCheck, CheckCircle2, QrCode, CreditCard, Copy, FileText, Download, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  onPurchaseSuccess: (paymentMethod: string) => void;
}

type PaymentMethod = "pix" | "card" | "boleto";

export default function PurchaseModal({
  isOpen,
  onClose,
  productName,
  price,
  onPurchaseSuccess
}: PurchaseModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Progress states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Pix simulation
  const [pixCopied, setPixCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (!isOpen) {
      // Reset states
      setIsProcessing(false);
      setIsSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setPixCopied(false);
      setTimeLeft(600);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && method === "pix" && !isSuccess) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, method, isSuccess]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyPix = () => {
    const mockPixKey = "00020126580014br.gov.bcb.pix0136desbloqueiemedodedirigir1700540417005802BR5925DesbloqueieMedo6009SaoPaulo62070503***6304CA39";
    navigator.clipboard.writeText(mockPixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Por favor, preencha o seu nome e e-mail para receber o material.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate server side payment authentication pipeline
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onPurchaseSuccess(method);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div 
        id="purchase-modal-container"
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-pink-100 overflow-hidden relative flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-5 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-pink-300 font-semibold mb-1">
              <ShieldCheck size={14} className="text-pink-400" />
              <span>Ambiente 100% Seguro, Acolhedor e Criptografado</span>
            </div>
            <h3 className="font-bold text-base md:text-lg font-display">Adquirir Solução Completa</h3>
          </div>
          <button
            id="close-purchase-modal-btn"
            onClick={onClose}
            className="text-pink-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Product Summary */}
                <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-indigo-950 text-sm md:text-base">{productName}</h4>
                    <p className="text-xs text-purple-650 mt-0.5">Acesso Vitalício + Bônus Inclusos</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-purple-450 line-through block">De R$ 97,00</span>
                    <span className="text-pink-650 font-extrabold text-base md:text-lg">{price}</span>
                  </div>
                </div>

                {/* Step 1: Identification */}
                <div className="space-y-3">
                  <h5 className="font-bold text-xs text-purple-400 uppercase tracking-wider font-mono">1. Dados de Recebimento</h5>
                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-purple-700 mb-1">Seu Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Ana Maria Silva"
                        className="w-full text-sm border border-purple-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-purple-50/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-purple-700 mb-1">Seu E-mail Principal * (Para entrega do E-book)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: ana@exemplo.com"
                        className="w-full text-sm border border-purple-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-purple-50/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-purple-700 mb-1">Celular com WhatsApp * (Para avisos de suporte)</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full text-sm border border-purple-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-purple-50/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Payment Method Selection */}
                <div className="space-y-3">
                  <h5 className="font-bold text-xs text-purple-400 uppercase tracking-wider font-mono">2. Forma de Pagamento</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod("pix")}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-semibold gap-1.5 transition ${
                        method === "pix"
                          ? "border-pink-500 bg-pink-50/80 text-pink-900 font-bold"
                          : "border-pink-100 hover:bg-pink-50/30 text-purple-500"
                      }`}
                    >
                      <QrCode size={20} className={method === "pix" ? "text-pink-600" : ""} />
                      <span>PIX</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("card")}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-semibold gap-1.5 transition ${
                        method === "card"
                          ? "border-pink-500 bg-pink-50/80 text-pink-900 font-bold"
                          : "border-pink-100 hover:bg-pink-50/30 text-purple-500"
                      }`}
                    >
                      <CreditCard size={20} className={method === "card" ? "text-pink-600" : ""} />
                      <span>Cartão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("boleto")}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-semibold gap-1.5 transition ${
                        method === "boleto"
                          ? "border-pink-500 bg-pink-50/80 text-pink-900 font-bold"
                          : "border-pink-100 hover:bg-pink-50/30 text-purple-500"
                      }`}
                    >
                      <FileText size={20} className={method === "boleto" ? "text-pink-600" : ""} />
                      <span>Boleto</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Payment Forms */}
                <div className="p-4 bg-pink-50/30 rounded-2xl border border-pink-100/50 min-h-[140px] flex flex-col justify-center">
                  {isProcessing ? (
                    <div className="text-center py-6">
                      <div className="w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="font-bold text-purple-950 text-sm">Criptografando dados de acesso seguro...</p>
                      <p className="text-xs text-purple-450 mt-1 font-medium">Processando pagamento do seu diagnóstico pessoal</p>
                    </div>
                  ) : method === "pix" ? (
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-pink-600 font-bold">
                        <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                        <span>PIX Gerado com Sucesso! Aguardando Confirmação</span>
                      </div>
                      
                      {/* CSS QR Code Vector */}
                      <div className="w-28 h-28 bg-white mx-auto border border-pink-100 rounded-lg p-2 flex items-center justify-center relative shadow-xs">
                        <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-80">
                          {[...Array(16)].map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-xs ${
                                i % 3 === 0 || i % 7 === 1 || i % 5 === 2 || i === 0 || i === 3 || i === 12 || i === 15
                                  ? "bg-purple-950"
                                  : "bg-white"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                          <QrCode size={40} className="text-purple-900 bg-white p-1 rounded border shadow-xs" />
                        </div>
                      </div>

                      <div className="text-[11px] text-purple-650 font-medium">
                        Expira em: <span className="font-mono text-pink-650 font-bold">{formatTime(timeLeft)}</span>
                      </div>

                      <button
                        type="button"
                        id="copy-pix-btn"
                        onClick={handleCopyPix}
                        className="mx-auto flex items-center gap-2 px-4 py-2 bg-pink-100/60 hover:bg-pink-100 text-pink-700 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <Copy size={12} />
                        <span>{pixCopied ? "Capiado!" : "Copiar Código Pix Copia e Cola"}</span>
                      </button>

                      <div className="text-[10px] text-purple-450 mt-2 font-medium leading-relaxed">
                        A liberação do e-book é instantânea. Após o pagamento, o link de acesso será entregue imediatamente em seu e-mail e WhatsApp cadastrados.
                      </div>
                    </div>
                  ) : method === "card" ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-purple-600 mb-0.5">Número do Cartão de Crédito</label>
                        <input
                          type="text"
                          required={method === "card"}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          placeholder="4000 1234 5678 9010"
                          className="w-full text-xs border border-purple-100 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-purple-600 mb-0.5">Validade (MM/AA)</label>
                          <input
                            type="text"
                            required={method === "card"}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                            placeholder="12/29"
                            className="w-full text-xs border border-purple-100 rounded-lg px-3 py-2 bg-white focus:outline-none text-center focus:ring-1 focus:ring-pink-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-purple-600 mb-0.5">CVV (Código)</label>
                          <input
                            type="text"
                            required={method === "card"}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="123"
                            className="w-full text-xs border border-purple-100 rounded-lg px-3 py-2 bg-white focus:outline-none text-center focus:ring-1 focus:ring-pink-500"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2 space-y-1">
                      <FileText size={24} className="text-purple-400 mx-auto" />
                      <p className="font-bold text-purple-900 text-xs">Boleto de Compensação Bancária</p>
                      <p className="text-[10px] text-purple-450 leading-relaxed">Liberação automática em até 48 horas úteis após o pagamento.</p>
                      <p className="text-[10.5px] text-pink-600 font-bold mt-1">Dica acolhedora: Use o PIX para receber e ler o livro imediatamente!</p>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                {!isProcessing && (
                  <button
                    type="submit"
                    id="submit-payment-btn"
                    className="w-full py-4 bg-pink-600 hover:bg-pink-550 text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-pink-600/10 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={15} />
                    <span>
                      {method === "pix"
                        ? "PAGUEI O PIX (LIBERAR LINK)"
                        : method === "card"
                        ? `CONFIRMAR INSCRIÇÃO POR ${price}`
                        : `GERAR BOLETO SEGURO POR ${price}`}
                    </span>
                  </button>
                )}
                
                {/* Micro Guarantee Label */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-purple-450">
                  <span>Plataforma blindada SSL</span>
                  <span>·</span>
                  <span>Garantia de felicidade de 7 dias</span>
                </div>
              </form>
            ) : (
              /* Core success receipt screen and actual download claim */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} className="animate-bounce text-pink-600" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-purple-950 font-display">Acesso Liberado com Sucesso!</h3>
                  <p className="text-sm text-purple-600 max-w-sm mx-auto leading-relaxed">
                    Parabéns, {name || "Querida amiga"}! O seu pagamento foi processado com absoluto sucesso e seu diagnóstico emocional junto com o e-book já foram destravados.
                  </p>
                </div>

                <div className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100/60 max-w-sm mx-auto text-left space-y-2">
                  <div className="flex justify-between text-xs text-purple-650">
                    <span>Inscrição / Pedido:</span>
                    <span className="font-mono text-pink-700">#DMD-{Math.floor(Math.random() * 900000 + 100000)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-purple-650">
                    <span>E-mail para suporte:</span>
                    <span className="font-semibold text-purple-800">{email || "seu-email@exemplo.com"}</span>
                  </div>
                  <div className="flex justify-between text-xs text-purple-650">
                    <span>Status da Compra:</span>
                    <span className="text-pink-600 uppercase font-black font-mono">APROVADA</span>
                  </div>
                  <div className="border-t border-pink-100 pt-2 flex justify-between text-sm font-bold text-pink-900">
                    <span>Solução Completa:</span>
                    <span>{price}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-purple-450 mb-3 leading-relaxed">
                    Você também recebeu os links em seu e-mail e WhatsApp, mas pode baixar o seu E-book e bônus <strong>exclusivos agora mesmo</strong> tocando no botão abaixo:
                  </p>
                  
                  {/* Actual Download PDF Trigger */}
                  <a
                    href="https://ai.studio"
                    id="download-book-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full max-w-sm items-center justify-center gap-2.5 py-4 bg-pink-600 hover:bg-pink-550 text-white rounded-2xl font-extrabold text-sm shadow-md transition transform active:scale-95"
                  >
                    <Download size={18} />
                    <span>BAIXAR MEU E-BOOK COMPLETO (PDF)</span>
                  </a>
                </div>

                <div className="text-[10px] text-purple-450 flex items-center justify-center gap-1.5 font-medium">
                  <Heart size={10} className="text-rose-500 fill-rose-500" />
                  <span>Você deu o primeiro grande passo em prol da sua autonomia e liberdade!</span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
