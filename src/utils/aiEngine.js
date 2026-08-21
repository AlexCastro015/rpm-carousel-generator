/**
 * AI Content & Automotive Image Generation Engine for Repuestos RPM
 * Generates tailored viral copywriting + Instagram-first dynamic archetypes (VS, Stat, Checklist, Quote, Hook, CTA).
 */

// Curated high-res automotive studio assets as instant baseline
export const AUTOMOTIVE_IMAGE_PRESETS = {
  frenos_nuevo: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=1080&q=80',
  frenos_disco: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1080&q=80',
  motor_turbo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1080&q=80',
  embrague_transmision: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1080&q=80',
  suspension_amortiguador: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1080&q=80',
  bujias_electrico: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1080&q=80',
  taller_diagnostico: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1080&q=80',
  auto_estudio: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1080&q=80',
  chery_tiggo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1080&q=80',
  whatsapp_cta: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1080&q=80'
};

/**
 * Builds a dynamic AI Image URL based on a photorealistic prompt
 */
export function generateAIImageUrl(prompt, seed = Math.floor(Math.random() * 10000)) {
  const cleanPrompt = encodeURIComponent(
    prompt + ', automotive studio photography, 8k resolution, cinematic lighting, dark background, yellow rim light accent, hyperrealistic, sharp focus, magazine commercial quality'
  );
  return 'https://image.pollinations.ai/prompt/' + cleanPrompt + '?width=1080&height=1350&seed=' + seed + '&nologo=true';
}

/**
 * AI Copilot: Rewrites or morphs a slide on-the-fly inside the Editor
 */
export function rewriteSlideWithAI(currentSlide, actionType, category = 'general') {
  const slide = { ...currentSlide };

  switch (actionType) {
    case 'viral':
      slide.title = '🚨 ' + (slide.title || 'ALERTA TÉCNICA').replace(/^[🚨⚠️💡❌✅\s]+/, '').toUpperCase();
      slide.badge = 'VIRAL REEL';
      if (slide.description) {
        slide.description = 'Si sientes esto al conducir, detén el auto de inmediato. ' + slide.description;
      }
      slide.keyTakeaway = 'Revisión urgente: Ignorarlo triplica el costo de la reparación.';
      break;

    case 'technical':
      slide.badge = 'ANÁLISIS MECÁNICO';
      slide.title = (slide.title || 'DIAGNÓSTICO TÉCNICO').replace(/^[🚨⚠️💡❌✅\s]+/, '').toUpperCase();
      slide.description = (slide.description || '') + ' Tolerancia de fábrica y desgaste por fricción térmica acumulada.';
      slide.keyTakeaway = 'Cotiza con Marca, Modelo, Año y Cilindrada para verificar tolerancia milimétrica.';
      break;

    case 'concise':
      if (slide.title && slide.title.length > 45) {
        slide.title = slide.title.substring(0, 42).trim() + '...';
      }
      if (slide.description && slide.description.length > 130) {
        slide.description = slide.description.substring(0, 125).trim() + '.';
      }
      slide.badge = 'SÍNTOMA CLAVE';
      break;

    case 'to_vs':
      slide.type = 'vs';
      slide.title = slide.title || 'ERROR COMÚN VS PRÁCTICA CORRECTA';
      slide.badge = 'COMPARATIVA';
      slide.vsWrong = slide.vsWrong || 'Instalar pastillas sobre discos rayados o piezas usadas de dudosa procedencia.';
      slide.vsRight = slide.vsRight || 'Instalar repuestos 100% nuevos garantizados con rectificación o discos nuevos.';
      slide.keyTakeaway = 'Un repuesto nuevo garantiza tu frenado y seguridad.';
      break;

    case 'to_checklist':
      slide.type = 'checklist';
      slide.title = slide.title || 'TEST DE DIAGNÓSTICO RÁPIDO';
      slide.badge = 'AUTO-EVALUACIÓN';
      slide.checklistItems = slide.checklistItems || [
        'Vibración anormal en el volante o pedal',
        'Chirrido metálico al accionar el sistema',
        'Pérdida de respuesta o pedal esponjoso',
        'Olor a fricción o temperatura elevada'
      ];
      slide.keyTakeaway = 'Si marcas 2 o más, cotiza el repuesto antes de salir a carretera.';
      break;

    case 'to_stat':
      slide.type = 'stat';
      slide.title = slide.title || 'LÍMITE CRÍTICO DE SEGURIDAD';
      slide.badge = 'DATO CRÍTICO';
      slide.statNumber = slide.statNumber || (category === 'frenos' ? '2 MM' : category === 'embrague' ? '80.000' : '90°C');
      slide.statLabel = slide.statLabel || (category === 'frenos' ? 'Grosor mínimo seguro de pastilla' : category === 'embrague' ? 'Kilómetros promedio de vida útil' : 'Temperatura de trabajo');
      slide.description = slide.description || 'Llegar a este límite desgasta componentes adyacentes costosos.';
      slide.keyTakeaway = 'No esperes a la falla total para hacer el cambio preventivo.';
      break;

    case 'to_quote':
      slide.type = 'quote';
      slide.title = slide.title || 'REGLA DE ORO REPUESTOS RPM';
      slide.badge = 'CONSEJO DE AUTORIDAD';
      slide.quoteText = slide.quoteText || '«Un repuesto 100% nuevo no solo repara la pana, previene que se dañe el resto del sistema de tu vehículo.»';
      slide.quoteAuthor = 'Equipo Técnico Repuestos RPM';
      break;

    default:
      break;
  }

  return slide;
}

/**
 * 1-Click AI Transformation of Sort Feed transcripts into Instagram-first dynamic carousels
 */
export function generateFullRPMCarouselFromAI(rawContent, topicTitle = '') {
  const clean = String(rawContent || '').trim();
  const baseTitle = (topicTitle || clean.split(/\r?\n/)[0] || 'MANTENCIÓN PREVENTIVA DE TU VEHÍCULO')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/#[\w_]+/gi, '')
    .replace(/^[0-9#\-\*.\s\:👉⚠️🚨🔧]+/, '')
    .trim()
    .toUpperCase();

  // Detect automotive part or theme
  const lower = (clean + ' ' + baseTitle).toLowerCase();
  let partType = 'general';
  let defaultImage = AUTOMOTIVE_IMAGE_PRESETS.motor_turbo;

  if (lower.includes('freno') || lower.includes('pastilla') || lower.includes('disco') || lower.includes('caliper')) {
    partType = 'frenos';
    defaultImage = AUTOMOTIVE_IMAGE_PRESETS.frenos_disco;
  } else if (lower.includes('embrague') || lower.includes('clutch') || lower.includes('caja') || lower.includes('transmision')) {
    partType = 'embrague';
    defaultImage = AUTOMOTIVE_IMAGE_PRESETS.embrague_transmision;
  } else if (lower.includes('suspension') || lower.includes('amortiguador') || lower.includes('bandeja') || lower.includes('rotula')) {
    partType = 'suspension';
    defaultImage = AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador;
  } else if (lower.includes('bujia') || lower.includes('sensor') || lower.includes('alternador') || lower.includes('bateria')) {
    partType = 'electrico';
    defaultImage = AUTOMOTIVE_IMAGE_PRESETS.bujias_electrico;
  }

  // Extract structured steps from text
  const lines = clean.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const detectedPoints = [];
  let currentPoint = null;

  lines.slice(1).forEach(line => {
    if (line.startsWith('#')) return;
    const matchNumber = line.match(/^(\d+)[\.\)\-\:\s]+(.*)/);
    const matchBullet = line.match(/^[\-\*•–—]\s*(.*)/);

    if (matchNumber) {
      if (currentPoint) detectedPoints.push(currentPoint);
      currentPoint = {
        title: matchNumber[2].replace(/#[\w_]+/g, '').trim().toUpperCase(),
        body: ''
      };
    } else if (matchBullet && (!currentPoint || currentPoint.body.length > 0)) {
      if (currentPoint) detectedPoints.push(currentPoint);
      currentPoint = {
        title: matchBullet[1].replace(/#[\w_]+/g, '').trim().toUpperCase(),
        body: ''
      };
    } else if (currentPoint) {
      currentPoint.body += (currentPoint.body ? ' ' : '') + line;
    } else if (line.length > 15 && !line.startsWith('http')) {
      currentPoint = {
        title: line.substring(0, 45).toUpperCase(),
        body: line
      };
    }
  });

  if (currentPoint) detectedPoints.push(currentPoint);

  // Dynamic Multi-Archetype Slide Flow for Instagram (Visual Rhythm)
  const slides = [];

  // 1. Hook / Cover Slide
  const hookPrompt = 'cinematic photo of isolated automotive ' + (partType === 'frenos' ? 'performance brake caliper and slotted rotor' : partType === 'embrague' ? 'heavy duty clutch kit' : 'car engine part') + ', dramatic studio rim lighting with RPM yellow glow, dark graphite background';
  slides.push({
    type: 'hook',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: baseTitle.length > 70 ? baseTitle.substring(0, 70) : baseTitle,
    subtitle: 'Aprende a diagnosticarlo a tiempo y cotiza la pieza exacta antes de que cause una pana mayor.',
    highlightText: 'REPUESTOS RPM',
    badge: 'ALERTA TÉCNICA',
    image: defaultImage,
    imagePrompt: hookPrompt,
    imageLayout: 'card-3d',
    footerNote: 'Desliza para ver la guía completa 👉'
  });

  // 2. Stat / Impact Metric Slide
  const statNum = partType === 'frenos' ? '2 MM' : partType === 'embrague' ? '80.000' : '30.000 KM';
  const statLabel = partType === 'frenos' ? 'Límite de desgaste crítico en pastillas' : partType === 'embrague' ? 'Kilómetros promedio de vida útil' : 'Intervalo de inspección preventiva';
  slides.push({
    type: 'stat',
    title: 'EL LÍMITE QUE NO DEBES SUPERAR',
    statNumber: statNum,
    statLabel,
    description: 'Conducir con componentes al límite de fricción sobrecalienta los metales y provoca fallas en cadena.',
    badge: 'DATO TÉCNICO',
    keyTakeaway: 'Revisa periódicamente el grosor y estado visual de tus piezas.'
  });

  // 3. Comparison VS Slide (Error vs Correct)
  slides.push({
    type: 'vs',
    title: 'ERROR COMÚN VS SOLUCIÓN RPM',
    badge: 'COMPARATIVA',
    vsWrong: partType === 'frenos'
      ? 'Instalar pastillas nuevas sobre discos alabeados o rayados por ahorrar tiempo.'
      : 'Seguir forzando la marcha cuando el embrague patina en subidas.',
    vsRight: partType === 'frenos'
      ? 'Instalar pastillas 100% nuevas con discos en tolerancia o rectificados.'
      : 'Cambiar el kit de embrague completo (disco, prensa y rodamiento) 100% nuevo.',
    keyTakeaway: 'Un cambio a medias siempre cuesta el doble a mediano plazo.'
  });

  // 4. Checklist Slide
  slides.push({
    type: 'checklist',
    title: 'TEST DE DIAGNÓSTICO RÁPIDO',
    badge: 'CHECKLIST RPM',
    checklistItems: [
      '¿Sientes vibraciones extrañas en el volante o pedal?',
      '¿Escuchas chirridos o ruidos metálicos al accionar?',
      '¿Notas pérdida de tracción, frenado o respuesta?',
      '¿El pedal se siente esponjoso o excesivamente duro?'
    ],
    keyTakeaway: 'Si cumples 2 o más síntomas, cotiza tu repuesto de inmediato por WhatsApp.'
  });

  // 5. Golden Rule / Authority Quote Slide
  slides.push({
    type: 'quote',
    title: 'LA REGLA DE ORO DE LA MECÁNICA',
    badge: 'CONSEJO DE AUTORIDAD',
    quoteText: '«Un repuesto 100% nuevo garantiza tolerancias de fábrica, máxima durabilidad y la tranquilidad de tu familia en ruta.»',
    quoteAuthor: 'Equipo Técnico · Repuestos RPM',
    keyTakeaway: 'Cotiza siempre con Marca, Modelo, Año y Cilindrada del motor.'
  });

  // 6. WhatsApp CTA Slide
  slides.push({
    type: 'cta',
    eyebrow: '¿BUSCAS ESTE REPUESTO PARA TU AUTO?',
    title: 'COTIZA DIRECTAMENTE POR WHATSAPP',
    subtitle: 'Envíanos Marca, Modelo, Año y Motor. Revisamos disponibilidad y compatibilidad de inmediato con nuestro equipo técnico.',
    ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
    locations: '📍 Quilpué: Chorrillos 782 · Viña del Mar: Local 11, Galería San Antonio',
    badge: 'REPUESTOS 100% NUEVOS',
    image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
    imagePrompt: 'luxury modern car front view in dark studio, yellow headlights, sleek reflections',
    imageLayout: 'full-bleed'
  });

  const caption = '🚗 ' + baseTitle + '\n\n' +
    '¿Has notado alguno de estos síntomas en tu vehículo?\n\n' +
    'En Repuestos RPM te ayudamos a identificar la pieza 100% compatible y nueva para tu auto con la mejor asesoría técnica.\n\n' +
    '📲 Cotiza al instante por WhatsApp al +56 9 7546 7525 con tu Marca, Modelo y Año.\n\n' +
    '📍 Retiro en nuestros locales de Quilpué y Viña del Mar.\n\n' +
    '#RepuestosRPM #MecanicaChile #Quilpue #VinaDelMar #RepuestosNuevos #AutosChile #MantencionPreventiva';

  return {
    id: 'ai-carousel-' + Date.now(),
    title: baseTitle,
    category: partType === 'frenos' ? 'Frenos & Fricción' : partType === 'embrague' ? 'Embrague & Transmisión' : 'Mecánica & Diagnóstico',
    source: 'RPM Dynamic AI Studio Engine',
    slides,
    caption
  };
}
