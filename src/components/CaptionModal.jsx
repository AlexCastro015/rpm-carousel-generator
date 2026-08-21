import React, { useState } from 'react';
import { Copy, Check, MessageSquare, X, Sparkles } from 'lucide-react';

export default function CaptionModal({ isOpen, onClose, caption, onUpdateCaption }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#15181C] border border-[#2B3036] rounded-2xl w-full max-w-xl overflow-hidden flex flex-col shadow-2xl">
        
        <div className="px-6 py-4 border-b border-[#2B3036] flex items-center justify-between bg-[#1A1E23]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFC400]/15 text-[#FFC400] flex items-center justify-center border border-[#FFC400]/30">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-barlow font-bold text-lg text-[#F7F7F7] tracking-wide">
                COPY & HASHTAGS DE INSTAGRAM
              </h3>
              <p className="text-xs text-[#AAAAAA]">
                Optimizado para conversión hacia WhatsApp (+56 9 7546 7525)
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

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
              Texto del Post (Editable):
            </label>
            <textarea
              rows={10}
              value={caption}
              onChange={(e) => onUpdateCaption(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs leading-relaxed focus:outline-none focus:border-[#FFC400] font-mono resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#1A1E23]/60 border border-[#2B3036] flex items-center justify-between text-xs">
            <span className="text-[#AAAAAA]">Incluye CTA a WhatsApp y Locales Quilpué / Viña</span>
            <span className="text-[#FFC400] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Alto CTR
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 rounded-xl bg-[#FFC400] hover:bg-[#FFD13A] text-black font-barlow font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FFC400]/15 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>¡COPIADO AL PORTAPAPELES!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR TEXTO Y HASHTAGS</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
