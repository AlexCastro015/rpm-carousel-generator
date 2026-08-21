import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Grid, 
  Layout, 
  Smartphone,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Upload
} from 'lucide-react';
import SlideCanvas from './SlideCanvas';
import { captureSlideAsBlob, downloadDataUrl } from '../utils/exportEngine';

export default function CarouselPreview({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onUpdateSlide,
  theme,
  brandConfig,
  slideRefs
}) {
  const [viewMode, setViewMode] = useState('single');
  const [isCapturingSingle, setIsCapturingSingle] = useState(false);
  const [dragOverSlide, setDragOverSlide] = useState(false);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  const handlePrev = () => {
    if (activeSlideIndex > 0) onSelectSlide(activeSlideIndex - 1);
  };

  const handleNext = () => {
    if (activeSlideIndex < slides.length - 1) onSelectSlide(activeSlideIndex + 1);
  };

  const handleDownloadCurrentSlide = async () => {
    try {
      setIsCapturingSingle(true);
      const element = slideRefs.current[activeSlideIndex];
      if (!element) return;

      const dataUrl = await captureSlideAsBlob(element);
      const slideNum = String(activeSlideIndex + 1).padStart(2, '0');
      downloadDataUrl(dataUrl, 'rpm-slide-' + slideNum + '.png');
    } catch (err) {
      console.error('Error al capturar slide:', err);
    } finally {
      setIsCapturingSingle(false);
    }
  };

  const handleSlideDrop = (e) => {
    e.preventDefault();
    setDragOverSlide(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (onUpdateSlide) {
          onUpdateSlide(activeSlideIndex, {
            ...activeSlide,
            image: ev.target.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121418] border border-[#2B3036] rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Preview Controls Bar */}
      <div className="px-4 py-3 border-b border-[#2B3036] bg-[#15181C] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#FFC400]" />
          <span className="text-xs font-bold text-[#F7F7F7] font-barlow tracking-wider">
            PREVISUALIZADOR INSTAGRAM (1080 × 1350 · 4:5)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#1A1E23] p-1 rounded-lg border border-[#2B3036] gap-1">
            <button
              onClick={() => setViewMode('single')}
              className={'px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ' + (
                viewMode === 'single'
                  ? 'bg-[#2B3036] text-[#FFC400]'
                  : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
              )}
              title="Vista Diapositiva Individual"
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Diapositiva</span>
            </button>

            <button
              onClick={() => setViewMode('mockup')}
              className={'px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ' + (
                viewMode === 'mockup'
                  ? 'bg-[#2B3036] text-[#FFC400]'
                  : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
              )}
              title="Simulador de Feed de Instagram"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Feed Instagram</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={'px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ' + (
                viewMode === 'grid'
                  ? 'bg-[#2B3036] text-[#FFC400]'
                  : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
              )}
              title="Vista Mosaico Completo"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mosaico ({slides.length})</span>
            </button>
          </div>

          {viewMode !== 'grid' && (
            <button
              onClick={handleDownloadCurrentSlide}
              disabled={isCapturingSingle}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1A1E23] hover:bg-[#22272E] border border-[#2B3036] text-[#F7F7F7] hover:border-[#FFC400]/50 transition-all"
              title="Descargar esta diapositiva como PNG"
            >
              <Download className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>PNG #{activeSlideIndex + 1}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Display Canvas Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex items-center justify-center relative bg-tech-grid">
        
        {/* ================= SINGLE SLIDE VIEW ================= */}
        {viewMode === 'single' && (
          <div className="relative flex flex-col items-center justify-center max-w-[430px] w-full">
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setDragOverSlide(true); }}
              onDragLeave={() => setDragOverSlide(false)}
              onDrop={handleSlideDrop}
              className={'w-full slide-shadow rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.008] relative ' + (
                dragOverSlide ? 'ring-4 ring-[#FFC400]' : ''
              )}
            >
              <SlideCanvas
                innerRef={(el) => (slideRefs.current[activeSlideIndex] = el)}
                slide={activeSlide}
                slideIndex={activeSlideIndex}
                totalSlides={slides.length}
                theme={theme}
                brandConfig={brandConfig}
              />

              {dragOverSlide && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 text-[#FFC400] font-barlow font-bold text-lg z-30">
                  <Upload className="w-8 h-8 animate-bounce" />
                  <span>Suelta aquí la foto para esta diapositiva</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full mt-4 px-2">
              <button
                onClick={handlePrev}
                disabled={activeSlideIndex === 0}
                className="p-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] hover:border-[#FFC400] disabled:opacity-25 transition-all shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 bg-[#1A1E23] px-3 py-1.5 rounded-full border border-[#2B3036]">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSlide(idx)}
                    className={'h-2 rounded-full transition-all ' + (
                      activeSlideIndex === idx
                        ? 'w-6 bg-[#FFC400]'
                        : 'w-2 bg-[#2B3036] hover:bg-[#AAAAAA]'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={activeSlideIndex === slides.length - 1}
                className="p-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] hover:border-[#FFC400] disabled:opacity-25 transition-all shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-[#AAAAAA] mt-2">
              💡 Tip: Puedes arrastrar una foto directamente sobre la diapositiva para cambiarla.
            </p>

          </div>
        )}

        {/* ================= INSTAGRAM FEED SIMULATION (MOCKUP) ================= */}
        {viewMode === 'mockup' && (
          <div className="w-full max-w-[420px] bg-black border border-[#262626] rounded-3xl overflow-hidden shadow-2xl">
            
            <div className="px-3.5 py-3 flex items-center justify-between border-b border-[#262626] bg-[#000000]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFC400] text-black font-barlow font-black text-xs flex items-center justify-center ring-2 ring-[#FFC400]/40">
                  RPM
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white leading-none">repuestos_rpm</span>
                    <span className="text-[10px] text-blue-400">✓</span>
                  </div>
                  <span className="text-[10px] text-[#8e8e8e]">Quilpué · Viña del Mar</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-white" />
            </div>

            <div className="w-full aspect-[4/5] overflow-hidden">
              <SlideCanvas
                innerRef={(el) => (slideRefs.current[activeSlideIndex] = el)}
                slide={activeSlide}
                slideIndex={activeSlideIndex}
                totalSlides={slides.length}
                theme={theme}
                brandConfig={brandConfig}
              />
            </div>

            <div className="p-3.5 space-y-2 bg-[#000000]">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  <MessageCircle className="w-6 h-6" />
                  <Send className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-1">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={'h-1.5 rounded-full transition-all ' + (
                        activeSlideIndex === idx ? 'w-4 bg-[#0095f6]' : 'w-1.5 bg-[#363636]'
                      )}
                    />
                  ))}
                </div>

                <Bookmark className="w-6 h-6" />
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-white">1.482 reproducciones</p>
                <p className="text-white line-clamp-2">
                  <span className="font-bold mr-1">repuestos_rpm</span>
                  {activeSlide.title} — Cotiza por WhatsApp al +56 9 7546 7525 con tu Marca, Modelo y Año.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                <button
                  onClick={handlePrev}
                  disabled={activeSlideIndex === 0}
                  className="text-xs font-semibold text-[#FFC400] disabled:opacity-20"
                >
                  ← Anterior
                </button>
                <span className="text-[11px] text-[#8e8e8e]">
                  Diapositiva {activeSlideIndex + 1} de {slides.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="text-xs font-semibold text-[#FFC400] disabled:opacity-20"
                >
                  Siguiente →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= GRID VIEW ================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
            {slides.map((s, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectSlide(idx);
                  setViewMode('single');
                }}
                className={'relative group cursor-pointer rounded-2xl overflow-hidden border transition-all ' + (
                  activeSlideIndex === idx
                    ? 'border-[#FFC400] ring-2 ring-[#FFC400]/40'
                    : 'border-[#2B3036] hover:border-[#FFC400]/60'
                )}
              >
                <SlideCanvas
                  innerRef={(el) => (slideRefs.current[idx] = el)}
                  slide={s}
                  slideIndex={idx}
                  totalSlides={slides.length}
                  theme={theme}
                  brandConfig={brandConfig}
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-xs font-bold font-barlow text-black bg-[#FFC400] px-3.5 py-2 rounded-xl shadow-xl">
                    EDITAR DIAPOSITIVA #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hidden Render Container */}
        {viewMode !== 'grid' && (
          <div className="absolute left-[-9999px] top-[-9999px] pointer-events-none opacity-0">
            {slides.map((s, idx) => {
              if (idx === activeSlideIndex) return null;
              return (
                <div key={idx} style={{ width: '1080px', height: '1350px' }}>
                  <SlideCanvas
                    innerRef={(el) => (slideRefs.current[idx] = el)}
                    slide={s}
                    slideIndex={idx}
                    totalSlides={slides.length}
                    theme={theme}
                    brandConfig={brandConfig}
                  />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
