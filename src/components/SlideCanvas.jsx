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
  Activity
} from 'lucide-react';

export default function SlideCanvas({
  slide,
  slideIndex,
  totalSlides,
  theme,
  brandConfig = {
    showLogo: true,
    showSwipeArrow: true,
    showAuthorTag: true,
    authorHandle: '@repuestos_rpm',
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

  return (
    <div
      ref={innerRef}
      id={'slide-canvas-' + slideIndex}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none transition-all duration-300 shadow-2xl"
      style={{
        background: theme.bg || '#15181C',
        color: theme.textPrimary || '#F7F7F7',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* 1. Full-Bleed Background Image Mode */}
      {hasImage && layout === 'full-bleed' && (
        <div className="absolute inset-0 z-0">
          <img 
            src={slide.image} 
            alt="Automotive Visual" 
            className="w-full h-full object-cover opacity-30 scale-105"
            crossOrigin="anonymous"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(21,24,28,0.75) 0%, rgba(16,19,23,0.92) 50%, #0B0D10 100%)'
            }}
          />
        </div>
      )}

      {/* Subtle Automotive Grid Pattern Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, ' + (theme.border || '#2B3036') + ' 1px, transparent 1px), linear-gradient(to bottom, ' + (theme.border || '#2B3036') + ' 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Radial Studio Top Glow */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 z-0"
        style={{ background: theme.accent || '#FFC400' }}
      />

      {/* ================= TOP BAR: Brand Header & Slide Counter ================= */}
      <div className="relative z-10 flex items-center justify-between border-b pb-3" style={{ borderColor: theme.border || '#2B3036' }}>
        {brandConfig.showLogo ? (
          <div className="flex items-center gap-2.5">
            <div 
              className="px-2.5 py-0.5 rounded-lg font-barlow font-black text-sm tracking-wider flex items-center gap-1 shadow-md"
              style={{ background: theme.accent || '#FFC400', color: '#000000' }}
            >
              <span>RPM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-barlow font-bold tracking-widest uppercase leading-none" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                REPUESTOS AUTOMOTRICES
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-emerald-400">
                100% NUEVOS Y GARANTIZADOS
              </span>
            </div>
          </div>
        ) : <div />}

        {/* Badge Superior */}
        <div className="flex items-center gap-2">
          {slide.badge && (
            <span 
              className="text-[10px] font-barlow font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm"
              style={{ 
                background: theme.badgeBg || '#1F242A', 
                color: theme.badgeText || theme.accent || '#FFC400',
                borderColor: theme.border || '#2B3036'
              }}
            >
              {slide.badge}
            </span>
          )}
        </div>
      </div>

      {/* ================= CENTER CONTENT CONTAINER ================= */}
      <div className="relative z-10 my-auto py-2 flex flex-col justify-center gap-3">

        {/* ================= 1. HOOK / COVER SLIDE ================= */}
        {slideType === 'hook' && (
          <div className="flex flex-col gap-3">
            {slide.eyebrow && (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: theme.accent || '#FFC400' }} />
                <span className="text-xs font-bold uppercase tracking-widest font-barlow" style={{ color: theme.accent || '#FFC400' }}>
                  {slide.eyebrow}
                </span>
              </div>
            )}

            <h1 
              className="font-barlow font-black text-3xl sm:text-4xl leading-[0.96] tracking-tight uppercase"
              style={{ color: theme.textPrimary || '#F7F7F7' }}
            >
              {slide.title}
            </h1>

            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border shadow-2xl group" style={{ borderColor: theme.border || '#2B3036' }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15181C] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-barlow font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#FFC400] border border-[#FFC400]/30">
                    DIAGNÓSTICO PREVENTIVO
                  </span>
                  <span className="text-[10px] font-semibold text-[#F7F7F7] bg-black/60 px-2 py-0.5 rounded">
                    ESTUDIO RPM
                  </span>
                </div>
              </div>
            )}

            {slide.subtitle && (
              <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
                {slide.subtitle}
              </p>
            )}

            <div 
              className="p-3 rounded-xl border flex items-center gap-3 backdrop-blur-md"
              style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036' }}
            >
              <div className="p-2 rounded-lg flex items-center justify-center shrink-0" style={{ background: theme.badgeBg || '#1F242A', color: theme.accent || '#FFC400' }}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                {slide.footerNote || 'Desliza para conocer la guía completa y evitar gastos innecesarios 👉'}
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. STAT / CRITICAL METRIC SLIDE ================= */}
        {slideType === 'stat' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4" style={{ color: theme.accent || '#FFC400' }} />
              <span className="text-xs font-bold uppercase tracking-widest font-barlow" style={{ color: theme.accent || '#FFC400' }}>
                MÉTRICA CRÍTICA DE DESGASTE
              </span>
            </div>

            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title || 'LÍMITE CRÍTICO DE SEGURIDAD'}
            </h2>

            {/* Huge Stat Box */}
            <div 
              className="p-5 rounded-2xl border text-center relative overflow-hidden shadow-2xl backdrop-blur-md"
              style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036' }}
            >
              <div 
                className="font-barlow font-black text-5xl sm:text-6xl tracking-tight leading-none"
                style={{ color: theme.accent || '#FFC400' }}
              >
                {slide.statNumber || '2 MM'}
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1 text-[#F7F7F7]">
                {slide.statLabel || 'Límite de desgaste antes de falla total'}
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
              {slide.description || 'Superar este límite de tolerancia produce recalentamiento térmico y destruye componentes adyacentes de alto costo.'}
            </p>

            {slide.keyTakeaway && (
              <div 
                className="p-3 rounded-xl border-l-4 border flex items-start gap-2.5 backdrop-blur-md"
                style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036', borderLeftColor: theme.accent || '#FFC400' }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent || '#FFC400' }} />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.accent || '#FFC400' }}>
                    💡 RECOMENDACIÓN RPM:
                  </span>
                  <span className="text-xs font-medium" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                    {slide.keyTakeaway}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. VS / COMPARISON SLIDE ================= */}
        {slideType === 'vs' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: theme.accent || '#FFC400' }} />
              <span className="text-xs font-bold uppercase tracking-widest font-barlow" style={{ color: theme.accent || '#FFC400' }}>
                COMPARATIVA TÉCNICA
              </span>
            </div>

            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title || 'ERROR COMÚN VS SOLUCIÓN RPM'}
            </h2>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {/* WRONG CARD */}
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 backdrop-blur-md flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-barlow font-bold uppercase tracking-wider text-red-400 block">
                    ❌ ERROR FATAL / PIEZA USADA:
                  </span>
                  <p className="text-xs font-medium text-red-200 leading-snug mt-0.5">
                    {slide.vsWrong || 'Instalar pastillas sobre discos desgastados o usar piezas de desarme.'}
                  </p>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 backdrop-blur-md flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-barlow font-bold uppercase tracking-wider text-emerald-400 block">
                    ✅ SOLUCIÓN REPUESTOS RPM:
                  </span>
                  <p className="text-xs font-medium text-emerald-100 leading-snug mt-0.5">
                    {slide.vsRight || 'Instalar repuestos 100% nuevos certificados con tolerancia de fábrica.'}
                  </p>
                </div>
              </div>
            </div>

            {slide.keyTakeaway && (
              <div 
                className="p-3 rounded-xl border flex items-center gap-2.5 backdrop-blur-md"
                style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036' }}
              >
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: theme.accent || '#FFC400' }} />
                <span className="text-xs font-medium" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                  {slide.keyTakeaway}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. CHECKLIST SLIDE ================= */}
        {slideType === 'checklist' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4" style={{ color: theme.accent || '#FFC400' }} />
              <span className="text-xs font-bold uppercase tracking-widest font-barlow" style={{ color: theme.accent || '#FFC400' }}>
                AUTO-EVALUACIÓN AUTOMOTRIZ
              </span>
            </div>

            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title || 'TEST DE DIAGNÓSTICO RÁPIDO'}
            </h2>

            {/* Checklist Items */}
            <div className="space-y-2">
              {(slide.checklistItems || [
                'Vibración anormal en el volante al frenar',
                'Chirrido o chillido agudo al accionar',
                'Pedal esponjoso o con recorrido largo',
                'Aumento en la distancia de frenado'
              ]).map((item, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl border flex items-center gap-3 backdrop-blur-md"
                  style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036' }}
                >
                  <div 
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border"
                    style={{ background: theme.badgeBg || '#1F242A', borderColor: theme.accent || '#FFC400', color: theme.accent || '#FFC400' }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-[#F7F7F7]">{item}</span>
                </div>
              ))}
            </div>

            {slide.keyTakeaway && (
              <div 
                className="p-3 rounded-xl border-l-4 border flex items-start gap-2.5 backdrop-blur-md"
                style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036', borderLeftColor: theme.accent || '#FFC400' }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent || '#FFC400' }} />
                <span className="text-xs font-medium" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                  {slide.keyTakeaway}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ================= 5. QUOTE / AUTHORITY SLIDE ================= */}
        {slideType === 'quote' && (
          <div className="flex flex-col gap-3 text-center items-center">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xl"
              style={{ background: theme.accent || '#FFC400', borderColor: '#FFFFFF', color: '#000000' }}
            >
              <Quote className="w-6 h-6 fill-current" />
            </div>

            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title || 'LA REGLA DE ORO DE LA MECÁNICA'}
            </h2>

            {/* Quote Card */}
            <div 
              className="p-5 rounded-2xl border relative overflow-hidden backdrop-blur-md shadow-2xl w-full"
              style={{ 
                background: theme.bgCard || '#1A1E23', 
                borderColor: theme.accent || '#FFC400'
              }}
            >
              <p className="font-barlow font-bold text-lg sm:text-xl leading-snug tracking-wide uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                {slide.quoteText || '«Un repuesto 100% nuevo garantiza tolerancias de fábrica, máxima durabilidad y la tranquilidad de tu familia en ruta.»'}
              </p>
              
              <div className="mt-3 pt-3 border-t border-white/10 text-xs font-semibold tracking-wider font-mono text-[#AAAAAA]">
                — {slide.quoteAuthor || 'Equipo Técnico · Repuestos RPM'}
              </div>
            </div>

            {slide.keyTakeaway && (
              <div className="text-xs font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
                💡 {slide.keyTakeaway}
              </div>
            )}
          </div>
        )}

        {/* ================= 6. POINT / STANDARD EDUCATIONAL SLIDE ================= */}
        {(slideType === 'point' || slideType === 'summary') && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span 
                  className="font-barlow font-black text-3xl leading-none px-3 py-1 rounded-xl border flex items-center justify-center shadow-md"
                  style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036', color: theme.accent || '#FFC400' }}
                >
                  {slide.stepNumber || currentStep}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest font-barlow" style={{ color: theme.accent || '#FFC400' }}>
                    {slide.type === 'summary' ? 'RESUMEN TÉCNICO' : 'SÍNTOMA DE FALLA'}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: theme.textMuted || '#AAAAAA' }}>
                    DIAGNÓSTICO AUTOMOTRIZ
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC400]/10 text-[#FFC400] border border-[#FFC400]/20">
                PUNTO {slide.stepNumber || currentStep}
              </span>
            </div>

            <h2 className="font-barlow font-black text-2xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title}
            </h2>

            {hasImage && layout !== 'full-bleed' && (
              <div className="relative w-full h-36 rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: theme.border || '#2B3036' }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15181C] via-transparent to-transparent opacity-60" />
              </div>
            )}

            <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
              {slide.description}
            </p>

            {slide.keyTakeaway && (
              <div 
                className="p-3 rounded-xl border-l-4 border flex items-start gap-2.5 backdrop-blur-md shadow-md"
                style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036', borderLeftColor: theme.accent || '#FFC400' }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent || '#FFC400' }} />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: theme.accent || '#FFC400' }}>
                    💡 CONSEJO RPM:
                  </span>
                  <span className="text-xs font-medium" style={{ color: theme.textPrimary || '#F7F7F7' }}>
                    {slide.keyTakeaway}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 7. CTA / WHATSAPP CLOSING SLIDE ================= */}
        {slideType === 'cta' && (
          <div className="flex flex-col gap-3 text-center items-center">
            {slide.eyebrow && (
              <span 
                className="text-[11px] font-barlow font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm"
                style={{ background: theme.badgeBg || '#1F242A', color: theme.accent || '#FFC400', borderColor: theme.border || '#2B3036' }}
              >
                {slide.eyebrow}
              </span>
            )}

            <h2 className="font-barlow font-black text-3xl leading-tight uppercase" style={{ color: theme.textPrimary || '#F7F7F7' }}>
              {slide.title || 'COTIZA TU REPUESTO POR WHATSAPP'}
            </h2>

            <p className="text-xs leading-relaxed max-w-sm font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
              {slide.subtitle || 'Envíanos Marca, Modelo, Año y Motor. Te confirmamos compatibilidad y disponibilidad al instante.'}
            </p>

            {/* High-Contrast WhatsApp CTA Button */}
            <div 
              className="w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 font-barlow font-black text-base sm:text-lg tracking-wider shadow-xl transform active:scale-95 transition-all cursor-pointer"
              style={{ background: theme.accent || '#FFC400', color: '#000000' }}
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>{slide.ctaButtonText || ('WHATSAPP: ' + brandConfig.whatsapp)}</span>
            </div>

            {/* Branch Locations & Guarantee Box */}
            <div 
              className="w-full p-3.5 rounded-xl border flex flex-col gap-1.5 text-left backdrop-blur-md shadow-md"
              style={{ background: theme.bgCard || '#1A1E23', borderColor: theme.border || '#2B3036' }}
            >
              <div className="flex items-center gap-2 text-xs font-bold" style={{ color: theme.accent || '#FFC400' }}>
                <MapPin className="w-4 h-4" />
                <span>PUNTOS DE ATENCIÓN & RETIRO:</span>
              </div>
              <p className="text-[11px] font-medium" style={{ color: theme.textMuted || '#AAAAAA' }}>
                {slide.locations || '📍 Quilpué: Chorrillos 782 · Viña del Mar: Galería San Antonio Local 11'}
              </p>
              
              <div className="flex items-center gap-2 pt-1 border-t border-white/5 text-[10px] font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Solo repuestos 100% nuevos · Pedidos en 2 a 3 días hábiles si no hay stock inmediato</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="relative z-10 flex items-center justify-between border-t pt-3" style={{ borderColor: theme.border || '#2B3036' }}>
        {brandConfig.showAuthorTag ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold font-mono" style={{ color: theme.textMuted || '#AAAAAA' }}>
              {brandConfig.authorHandle}
            </span>
            <span className="text-xs" style={{ color: theme.border || '#2B3036' }}>·</span>
            <span className="text-[11px] font-medium" style={{ color: theme.accent || '#FFC400' }}>
              {brandConfig.website}
            </span>
          </div>
        ) : <div />}

        {/* Swipe Prompt */}
        {brandConfig.showSwipeArrow && slideIndex < totalSlides - 1 && (
          <div className="flex items-center gap-1 text-xs font-barlow font-bold uppercase tracking-wider" style={{ color: theme.accent || '#FFC400' }}>
            <span>DESLIZA</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        )}

        {slideIndex === totalSlides - 1 && (
          <div className="flex items-center gap-1 text-xs font-barlow font-bold uppercase tracking-wider text-emerald-400">
            <span>GUARDA ESTE POST</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

    </div>
  );
}
