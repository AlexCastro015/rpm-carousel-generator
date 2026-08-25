import React from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Zap,
  Wrench,
  XCircle,
  Check,
  Quote,
  Gauge,
  ListChecks,
  Activity,
  Award,
  PackageCheck,
  Layers,
  Settings
} from 'lucide-react';

/**
 * Helper to render titles with specific words highlighted in RPM Yellow (#FFC400)
 * Supports markdown bold **text** or explicit highlightText prop
 */
function renderHighlightedTitle(title = '', highlightText = '', accentColor = '#FFC400') {
  if (!title) return null;

  // If title contains **word**, render markdown bold as accent
  if (title.includes('**')) {
    const parts = title.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} style={{ color: accentColor }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  // If highlightText is provided, highlight those words
  if (highlightText && title.toUpperCase().includes(highlightText.toUpperCase())) {
    const regex = new RegExp(`(${highlightText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
    const parts = title.split(regex);
    return parts.map((part, i) => {
      if (part.toUpperCase() === highlightText.toUpperCase()) {
        return (
          <span key={i} style={{ color: accentColor }}>
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return <span>{title}</span>;
}

export default function SlideCanvas({
  slide,
  slideIndex,
  totalSlides,
  theme,
  brandConfig = {
    showLogo: true,
    showSwipeArrow: true,
    showAuthorTag: true,
    authorHandle: '@repuestos_pacifico',
    website: 'repuestosrpm.cl',
    whatsapp: '+56 9 7546 7525'
  },
  innerRef
}) {
  const currentStep = String(slideIndex + 1).padStart(2, '0');
  const totalStepsStr = String(totalSlides).padStart(2, '0');
  const hasImage = Boolean(slide.image);
  const layout = slide.imageLayout || 'card-3d';
  const slideType = slide.type || 'point';
  const isLastSlide = slideIndex === totalSlides - 1;

  const accent = theme.accent || '#FFC400';
  const bgCard = theme.bgCard || '#1A1E23';
  const border = theme.border || '#2B3036';
  const textPrimary = theme.textPrimary || '#F7F7F7';
  const textMuted = theme.textMuted || '#AAAAAA';

  return (
    <div
      ref={innerRef}
      id={'slide-canvas-' + slideIndex}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 select-none transition-all duration-300 shadow-2xl"
      style={{
        background: theme.bg || '#15181C',
        color: textPrimary,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* 1. Full-Bleed Background Image Mode */}
      {hasImage && layout === 'full-bleed' && (
        <div className="absolute inset-0 z-0">
          <img 
            src={slide.image} 
            alt="Automotive Visual" 
            className="w-full h-full object-cover opacity-85 scale-105"
            crossOrigin="anonymous"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(11,13,16,0.65) 0%, rgba(15,18,22,0.45) 45%, rgba(11,13,16,0.88) 100%)'
            }}
          />
        </div>
      )}

      {/* Subtle Automotive Grid Pattern Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${border} 1px, transparent 1px), linear-gradient(to bottom, ${border} 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Radial Studio Top Glow */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 z-0"
        style={{ background: accent }}
      />

      {/* ================= TOP BAR: Brand Header & Slide Counter ================= */}
      <div className="relative z-10 flex items-center justify-between border-b pb-2.5" style={{ borderColor: border }}>
        {/* Left: Brand Logo & Guarantee */}
        {brandConfig.showLogo ? (
          <div className="flex items-center gap-2">
            <div 
              className="px-2 py-0.5 rounded font-barlow font-black text-sm tracking-wider flex items-center gap-1 shadow-md"
              style={{ background: accent, color: '#000000' }}
            >
              <span>RPM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-barlow font-black tracking-wider uppercase leading-none" style={{ color: textPrimary }}>
                REPUESTOS AUTOMOTRICES
              </span>
              <span className="text-[8.5px] font-semibold tracking-wider text-[#8E95A0] mt-0.5">
                NUEVOS · GARANTÍA LEGAL APLICABLE
              </span>
            </div>
          </div>
        ) : <div />}

        {/* Center: Technical Alert Badge */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-[9.5px] font-barlow font-bold uppercase tracking-wider"
          style={{ 
            borderColor: accent + '60', 
            color: accent,
            background: 'rgba(0,0,0,0.4)'
          }}
        >
          <Settings className="w-3 h-3 text-inherit animate-spin-slow" />
          <span>{slide.badge || 'ALERTA TÉCNICA'}</span>
        </div>

        {/* Right: Step Counter (01 / 06) */}
        <div className="font-barlow font-black text-sm tracking-wider" style={{ color: accent }}>
          <span>{currentStep}</span>
          <span className="text-white/40 mx-1">/</span>
          <span className="text-white/60">{totalStepsStr}</span>
        </div>
      </div>

      {/* ================= CENTER CONTENT CONTAINER ================= */}
      <div className="relative z-10 my-auto py-1 flex flex-col justify-center gap-2.5">

        {/* Top Eyebrow Tag across all educational slides */}
        {slide.eyebrow && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <span className="text-[11px] font-barlow font-bold uppercase tracking-widest" style={{ color: accent }}>
              {slide.eyebrow}
            </span>
          </div>
        )}

        {/* ================= 1. HOOK / COVER SLIDE ================= */}
        {slideType === 'hook' && (
          <div className="flex flex-col gap-2.5">
            <h1 
              className="font-barlow font-black text-3xl sm:text-[38px] leading-[0.94] tracking-tight uppercase"
              style={{ color: textPrimary }}
            >
              {renderHighlightedTitle(slide.title, slide.highlightText || 'TIGGO 2', accent)}
            </h1>

            {slide.subtitle && (
              <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-[#C8CCD2]">
                {slide.subtitle}
              </p>
            )}

            {/* Callout Box */}
            <div 
              className="p-2.5 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
              style={{ background: bgCard, borderColor: accent + '60' }}
            >
              <div className="p-1 rounded-lg flex items-center justify-center shrink-0" style={{ color: accent }}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#F7F7F7]">
                {slide.footerNote || 'Desliza para ver la guía completa 👈'}
              </div>
            </div>

            {/* Product Image */}
            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border shadow-2xl group mt-1" style={{ borderColor: border }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/50 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[9px] font-barlow font-bold px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#FFC400] border border-[#FFC400]/40">
                    DIAGNÓSTICO PREVENTIVO
                  </span>
                  <span className="text-[9px] font-semibold text-[#F7F7F7] bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    REPUESTOS 100% NUEVOS
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 2. DIAGNOSTIC / STANDARD POINT SLIDE ================= */}
        {(slideType === 'point' || slideType === 'summary') && (
          <div className="flex flex-col gap-2.5">
            <h2 className="font-barlow font-black text-2xl sm:text-[28px] leading-[0.98] uppercase" style={{ color: textPrimary }}>
              {renderHighlightedTitle(slide.title, slide.highlightText || '', accent)}
            </h2>

            <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-[#C8CCD2]">
              {slide.description}
            </p>

            {/* Callout Box */}
            <div 
              className="p-2.5 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
              style={{ background: bgCard, borderColor: accent + '60' }}
            >
              <div className="p-1 rounded-lg flex items-center justify-center shrink-0" style={{ color: accent }}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#F7F7F7]">
                {slide.keyTakeaway || 'Señales claras = hora de revisar.'}
              </div>
            </div>

            {/* Image */}
            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border shadow-lg mt-1" style={{ borderColor: border }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 via-transparent to-transparent" />
              </div>
            )}
          </div>
        )}

        {/* ================= 3. KIT COMPLETO VS PARCIAL (COMPARISON BREAKDOWN) ================= */}
        {(slideType === 'vs' || slideType === 'kit_vs_partial') && (
          <div className="flex flex-col gap-2">
            <h2 className="font-barlow font-black text-2xl sm:text-[26px] leading-[0.98] uppercase" style={{ color: textPrimary }}>
              {renderHighlightedTitle(slide.title || 'KIT COMPLETO = RENDIMIENTO SEGURO', slide.highlightText || 'RENDIMIENTO SEGURO', accent)}
            </h2>

            <p className="text-xs leading-relaxed font-medium text-[#C8CCD2]">
              {slide.description || 'Cambiar solo una parte del sistema puede generar desgaste prematuro y nuevos costos.'}
            </p>

            {/* Image with part pointers */}
            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border shadow-lg my-0.5" style={{ borderColor: border }}>
                <img 
                  src={slide.image} 
                  alt="Kit Breakdown"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 via-transparent to-transparent" />
                
                {/* Pointer tags */}
                <div className="absolute top-2 right-3 text-[9px] font-barlow font-bold px-1.5 py-0.5 rounded bg-black/80 text-[#FFC400] border border-[#FFC400]/50 shadow-md">
                  Disco
                </div>
                <div className="absolute bottom-6 left-3 text-[9px] font-barlow font-bold px-1.5 py-0.5 rounded bg-black/80 text-[#FFC400] border border-[#FFC400]/50 shadow-md">
                  Prensa
                </div>
                <div className="absolute bottom-2 right-3 text-[9px] font-barlow font-bold px-1.5 py-0.5 rounded bg-black/80 text-[#FFC400] border border-[#FFC400]/50 shadow-md">
                  Rodamiento
                </div>
              </div>
            )}

            {/* Two Comparative Cards: Red vs Green */}
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              {/* Left Card: Red / Partial */}
              <div className="p-2.5 rounded-xl border border-red-500/60 bg-[#241215]/90 backdrop-blur-md flex flex-col gap-1 shadow-md">
                <div className="flex items-center gap-1.5 text-red-400 font-barlow font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{slide.partialTitle || 'CAMBIO PARCIAL'}</span>
                </div>
                <ul className="text-[11px] text-[#F0F0F0] space-y-0.5 font-medium pl-1">
                  <li>• {slide.partialPoint1 || 'Más desgaste'}</li>
                  <li>• {slide.partialPoint2 || 'Vida útil reducida'}</li>
                </ul>
              </div>

              {/* Right Card: Green / Full Kit */}
              <div className="p-2.5 rounded-xl border border-emerald-500/60 bg-[#102419]/90 backdrop-blur-md flex flex-col gap-1 shadow-md">
                <div className="flex items-center gap-1.5 text-emerald-400 font-barlow font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{slide.completeTitle || 'KIT COMPLETO'}</span>
                </div>
                <ul className="text-[11px] text-[#F0F0F0] space-y-0.5 font-medium pl-1">
                  <li>• {slide.completePoint1 || 'Funcionamiento óptimo'}</li>
                  <li>• {slide.completePoint2 || 'Mayor durabilidad'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. BENEFITS (3 GOLDEN PILLS + CALLOUT) ================= */}
        {slideType === 'benefits' && (
          <div className="flex flex-col gap-2.5">
            <h2 className="font-barlow font-black text-2xl sm:text-[28px] leading-[0.98] uppercase" style={{ color: textPrimary }}>
              {renderHighlightedTitle(slide.title || 'MANTÉN LA RESPUESTA DE TU VEHÍCULO', slide.highlightText || 'RESPUESTA DE TU VEHÍCULO', accent)}
            </h2>

            <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-[#C8CCD2]">
              {slide.description || 'Un embrague en buen estado permite una conducción suave, segura y sin tirones.'}
            </p>

            {/* Image */}
            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border shadow-lg my-0.5" style={{ borderColor: border }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 via-transparent to-transparent" />
              </div>
            )}

            {/* 3 Golden Badges */}
            <div className="grid grid-cols-3 gap-2 my-0.5">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-[#FFC400]/60 bg-[#1C1810] text-center gap-1 shadow-md">
                <ShieldCheck className="w-5 h-5" style={{ color: accent }} />
                <span className="text-[10.5px] font-barlow font-bold uppercase text-[#F7F7F7]">
                  {slide.benefit1 || 'Más seguridad'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-[#FFC400]/60 bg-[#1C1810] text-center gap-1 shadow-md">
                <Gauge className="w-5 h-5" style={{ color: accent }} />
                <span className="text-[10.5px] font-barlow font-bold uppercase text-[#F7F7F7]">
                  {slide.benefit2 || 'Mejor rendimiento'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-[#FFC400]/60 bg-[#1C1810] text-center gap-1 shadow-md">
                <Zap className="w-5 h-5" style={{ color: accent }} />
                <span className="text-[10.5px] font-barlow font-bold uppercase text-[#F7F7F7]">
                  {slide.benefit3 || 'Cambios precisos'}
                </span>
              </div>
            </div>

            {/* Callout Box */}
            <div 
              className="p-2.5 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
              style={{ background: bgCard, borderColor: accent + '60' }}
            >
              <div className="p-1 rounded-lg flex items-center justify-center shrink-0" style={{ color: accent }}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#F7F7F7]">
                {slide.keyTakeaway || 'Revisar a tiempo evita daños mayores en la caja de cambios.'}
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. STAT / METRIC SLIDE ================= */}
        {slideType === 'stat' && (
          <div className="flex flex-col gap-2.5">
            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: textPrimary }}>
              {slide.title || 'LÍMITE CRÍTICO DE SEGURIDAD'}
            </h2>

            <div 
              className="p-4 rounded-2xl border text-center relative overflow-hidden shadow-2xl backdrop-blur-md"
              style={{ background: bgCard, borderColor: border }}
            >
              <div 
                className="font-barlow font-black text-5xl sm:text-6xl tracking-tight leading-none"
                style={{ color: accent }}
              >
                {slide.statNumber || '2 MM'}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-[#F7F7F7]">
                {slide.statLabel || 'Límite de desgaste antes de falla total'}
              </div>
            </div>

            <p className="text-xs leading-relaxed font-medium text-[#C8CCD2]">
              {slide.description || 'Superar este límite desgasta componentes adyacentes de alto costo.'}
            </p>

            <div 
              className="p-2.5 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
              style={{ background: bgCard, borderColor: accent + '40' }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accent }} />
              <span className="text-xs font-semibold text-[#F7F7F7]">
                {slide.keyTakeaway || 'Revisión periódica recomendada.'}
              </span>
            </div>
          </div>
        )}

        {/* ================= 6. CHECKLIST & QUOTE SLIDES (Fallback) ================= */}
        {slideType === 'checklist' && (
          <div className="flex flex-col gap-2.5">
            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: textPrimary }}>
              {slide.title || 'TEST DE DIAGNÓSTICO RÁPIDO'}
            </h2>

            <div className="space-y-1.5">
              {(slide.checklistItems || [
                'Vibración anormal en el volante al frenar',
                'Chirrido o chillido agudo al accionar',
                'Pedal esponjoso o con recorrido largo',
                'Aumento en la distancia de frenado'
              ]).map((item, idx) => (
                <div 
                  key={idx}
                  className="p-2 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
                  style={{ background: bgCard, borderColor: border }}
                >
                  <div 
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                    style={{ background: 'rgba(0,0,0,0.4)', borderColor: accent, color: accent }}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-[#F7F7F7]">{item}</span>
                </div>
              ))}
            </div>

            {slide.keyTakeaway && (
              <div 
                className="p-2.5 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
                style={{ background: bgCard, borderColor: accent + '40' }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span className="text-xs font-semibold text-[#F7F7F7]">
                  {slide.keyTakeaway}
                </span>
              </div>
            )}
          </div>
        )}

        {slideType === 'quote' && (
          <div className="flex flex-col gap-3 text-center items-center">
            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: textPrimary }}>
              {slide.title || 'LA REGLA DE ORO DE LA MECÁNICA'}
            </h2>

            <div 
              className="p-4 rounded-2xl border relative overflow-hidden backdrop-blur-md shadow-2xl w-full"
              style={{ background: bgCard, borderColor: accent }}
            >
              <p className="font-barlow font-bold text-lg leading-snug tracking-wide uppercase text-[#F7F7F7]">
                {slide.quoteText || '«Un repuesto 100% nuevo garantiza tolerancias de fábrica, máxima durabilidad y la tranquilidad de tu familia en ruta.»'}
              </p>
              
              <div className="mt-2 pt-2 border-t border-white/10 text-xs font-semibold tracking-wider font-mono text-[#AAAAAA]">
                — {slide.quoteAuthor || 'Equipo Técnico · Repuestos RPM'}
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. CTA / WHATSAPP CLOSING SLIDE (Slide 06) ================= */}
        {slideType === 'cta' && (
          <div className="flex flex-col gap-2 text-center items-center">
            <h2 className="font-barlow font-black text-2xl sm:text-[30px] leading-[0.94] uppercase" style={{ color: textPrimary }}>
              {renderHighlightedTitle(slide.title || '¿NECESITAS UN KIT DE EMBRAGUE PARA TU TIGGO 2?', slide.highlightText || 'KIT DE EMBRAGUE', accent)}
            </h2>

            <p className="text-xs font-bold uppercase tracking-wider text-[#C8CCD2]">
              {slide.subtitle || 'COTIZA POR WHATSAPP Y TE ASESORAMOS.'}
            </p>

            {/* High-Contrast WhatsApp CTA Button */}
            <div 
              className="w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-3 font-barlow font-black text-lg sm:text-xl tracking-wider shadow-2xl transform active:scale-95 transition-all cursor-pointer mt-1"
              style={{ background: accent, color: '#000000' }}
            >
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Phone className="w-4 h-4 fill-current text-[#FFC400]" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-bold tracking-widest uppercase">COTIZAR POR WHATSAPP</span>
                <span className="text-base sm:text-lg font-black">{brandConfig.whatsapp || '+56 9 7546 7525'}</span>
              </div>
            </div>

            {/* 3 Trust Badges */}
            <div className="grid grid-cols-3 gap-1.5 w-full mt-1">
              <div className="p-2 rounded-xl border border-[#2B3036] bg-black/40 flex flex-col items-center text-center gap-1">
                <Award className="w-4 h-4" style={{ color: accent }} />
                <span className="text-[9.5px] font-bold text-[#F7F7F7] leading-tight">
                  Repuestos nuevos
                </span>
              </div>

              <div className="p-2 rounded-xl border border-[#2B3036] bg-black/40 flex flex-col items-center text-center gap-1">
                <ShieldCheck className="w-4 h-4" style={{ color: accent }} />
                <span className="text-[9.5px] font-bold text-[#F7F7F7] leading-tight">
                  Compatibilidad verificada
                </span>
              </div>

              <div className="p-2 rounded-xl border border-[#2B3036] bg-black/40 flex flex-col items-center text-center gap-1">
                <PackageCheck className="w-4 h-4" style={{ color: accent }} />
                <span className="text-[9.5px] font-bold text-[#F7F7F7] leading-tight">
                  Stock en locales y a pedido
                </span>
              </div>
            </div>

            {/* Branch Locations */}
            <div 
              className="w-full p-2.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-1 text-[10.5px] font-medium backdrop-blur-md mt-0.5"
              style={{ background: bgCard, borderColor: border }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="text-[#F7F7F7] font-semibold">Quilpué:</span>
                <span className="text-[#AAAAAA]">Chorrillos 782</span>
              </div>

              <div className="hidden sm:block text-white/20">|</div>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="text-[#F7F7F7] font-semibold">Viña del Mar:</span>
                <span className="text-[#AAAAAA]">Local 11, Galería San Antonio</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="relative z-10 flex items-center justify-between border-t pt-2.5" style={{ borderColor: border }}>
        {/* Left: Instagram Account Handle */}
        {brandConfig.showAuthorTag ? (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold font-mono text-[#8E95A0]">
              {brandConfig.authorHandle || '@repuestos_pacifico'}
            </span>
          </div>
        ) : <div />}

        {/* Right: DESLIZA >>> or ESCRÍBENOS >>> */}
        <div className="flex items-center gap-1 text-xs font-barlow font-black uppercase tracking-wider" style={{ color: accent }}>
          <span>{isLastSlide ? 'ESCRÍBENOS' : 'DESLIZA'}</span>
          <span className="tracking-tighter font-black text-sm">&gt;&gt;&gt;</span>
        </div>
      </div>

    </div>
  );
}

