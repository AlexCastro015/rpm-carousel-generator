import React from 'react';
import { Download, FileText, UploadCloud, Copy, Phone } from 'lucide-react';

export default function Header({ 
  onOpenImporter, 
  onExportZip, 
  onExportPDF, 
  onOpenCaptionModal,
  onOpenWhatsAppCROModal,
  isExporting, 
  exportProgress
}) {
  return (
    <header className="border-b border-[#2B3036] bg-[#15181C]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Studio Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFC400] flex items-center justify-center font-barlow font-black text-black text-xl tracking-tighter shadow-md shadow-[#FFC400]/20">
              RPM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-barlow font-black text-lg tracking-wider text-[#F7F7F7]">CAROUSEL STUDIO</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#FFC400]/15 text-[#FFC400] border border-[#FFC400]/30">
                  Instagram 4:5
                </span>
              </div>
              <p className="text-xs text-[#AAAAAA]">Generador de Contenido Viral · Repuestos RPM & Sort Feed</p>
            </div>
          </div>

          <button 
            onClick={onOpenImporter}
            className="sm:hidden flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1A1E23] border border-[#2B3036] text-[#FFC400]"
          >
            <UploadCloud className="w-4 h-4" />
            Sort Feed
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          
          <button
            onClick={onOpenWhatsAppCROModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-600/40 text-emerald-400 text-xs font-semibold transition-all shadow-sm"
            title="Scripts de Cierre y Manejo de Objeciones en WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Scripts WhatsApp CRO</span>
          </button>

          <button
            onClick={onOpenImporter}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1A1E23] hover:bg-[#22272E] border border-[#2B3036] text-[#F7F7F7] text-xs font-semibold transition-all hover:border-[#FFC400]/50"
          >
            <UploadCloud className="w-4 h-4 text-[#FFC400]" />
            <span>Importar Sort Feed</span>
          </button>

          <button
            onClick={onOpenCaptionModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A1E23] hover:bg-[#22272E] border border-[#2B3036] text-[#F7F7F7] text-xs font-medium transition-all"
            title="Copiar texto y hashtags de Instagram"
          >
            <Copy className="w-3.5 h-3.5 text-[#AAAAAA]" />
            <span className="hidden md:inline">Copiar</span> Copy
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A1E23] hover:bg-[#22272E] border border-[#2B3036] text-[#F7F7F7] text-xs font-medium transition-all disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5 text-red-400" />
            <span>PDF</span>
          </button>

          <button
            onClick={onExportZip}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFC400] hover:bg-[#FFD13A] text-black font-barlow font-bold text-sm tracking-wide transition-all shadow-md shadow-[#FFC400]/15 active:scale-95 disabled:opacity-50"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-black border-t-transparent" />
                <span>{exportProgress.text || 'Exportando...'}</span>
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DESCARGAR PNGs (ZIP)</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

