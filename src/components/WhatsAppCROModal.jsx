import React, { useState } from 'react';
import { 
  Phone, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  DollarSign, 
  HelpCircle, 
  Truck, 
  Sparkles, 
  Flame,
  MessageSquare
} from 'lucide-react';
import { CRO_SCRIPTS_DATABASE } from '../data/croScripts';

export default function WhatsAppCROModal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  const scripts = Object.values(CRO_SCRIPTS_DATABASE);
  const categories = ['all', 'Entrada y Filtro', 'Objeción de Precio', 'Garantía & Confianza', 'Urgencia y Cierre', 'Logística y Despacho', 'Cierre'];

  const filteredScripts = activeCategory === 'all' 
    ? scripts 
    : scripts.filter(s => s.category === activeCategory);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Entrada y Filtro': return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case 'Objeción de Precio': return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Garantía & Confianza': return <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />;
      case 'Urgencia y Cierre': return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'Logística y Despacho': return <Truck className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#FFC400]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#15181C] border border-[#2B3036] rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2B3036] flex items-center justify-between bg-[#1A1E23]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-md">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-barlow font-bold text-lg text-[#F7F7F7] tracking-wide">
                  SCRIPTS CRO & CIERRE WHATSAPP
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +56 9 7546 7525
                </span>
              </div>
              <p className="text-xs text-[#AAAAAA]">
                Respuestas persuasivas de alta conversión para objeciones comunes y cotizaciones rápidas.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#AAAAAA] hover:text-[#F7F7F7] p-1.5 rounded-lg hover:bg-[#2B3036] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-[#121418] border-b border-[#2B3036] overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={'px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ' + (
                activeCategory === cat
                  ? 'bg-[#FFC400] text-black shadow-sm'
                  : 'bg-[#1A1E23] text-[#AAAAAA] hover:text-[#F7F7F7] border border-[#2B3036]'
              )}
            >
              {cat === 'all' ? 'Ver Todos los Scripts' : cat}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScripts.map((script) => {
              const isCopied = copiedId === script.id;
              return (
                <div
                  key={script.id}
                  className="bg-[#1A1E23] border border-[#2B3036] rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-[#FFC400]/40 transition-all shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-barlow font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-[#AAAAAA] border border-white/5 flex items-center gap-1">
                        {getCategoryIcon(script.category)}
                        <span>{script.category}</span>
                      </span>
                    </div>

                    <h4 className="font-barlow font-bold text-base text-[#F7F7F7] leading-tight">
                      {script.title}
                    </h4>

                    <p className="text-[11px] text-[#8e8e8e]">
                      {script.description}
                    </p>

                    <div className="p-3 rounded-lg bg-[#121418] border border-[#2B3036] text-xs text-[#E1E4E8] font-mono leading-relaxed whitespace-pre-wrap select-all">
                      {script.text}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(script.id, script.text)}
                    className={'w-full py-2.5 rounded-lg font-barlow font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ' + (
                      isCopied
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#2B3036] hover:bg-[#FFC400] text-[#F7F7F7] hover:text-black'
                    )}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>¡COPIADO AL PORTAPAPELES!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPIAR RESPUESTA</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#2B3036] bg-[#1A1E23] flex items-center justify-between text-xs text-[#AAAAAA]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Estrategia de conversión oficial para WhatsApp (+56 9 7546 7525)
          </span>
          <span className="text-[#F7F7F7] font-semibold">Repuestos RPM</span>
        </div>

      </div>
    </div>
  );
}
