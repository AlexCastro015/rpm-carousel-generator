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

  // Dynamic Multi-Archetype Slide Flow for Instagram (Official 6-Slide Master Pattern)
  const slides = [];

  // Slide 1: Hook / Cover Slide
  const hookPrompt = 'cinematic photo of isolated automotive ' + (partType === 'frenos' ? 'performance brake caliper and slotted rotor' : partType === 'embrague' ? 'heavy duty clutch kit' : 'car engine part') + ', dramatic studio rim lighting with RPM yellow glow, dark graphite background';
  slides.push({
    type: 'hook',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: baseTitle.length > 60 ? baseTitle.substring(0, 60) : baseTitle,
    subtitle: 'Aprende a diagnosticarlo a tiempo y cotiza la pieza exacta antes de que cause una pana mayor.',
    highlightText: partType === 'frenos' ? 'FRENOS' : partType === 'embrague' ? 'EMBRAGUE' : 'MOTOR',
    badge: 'ALERTA TÉCNICA',
    image: defaultImage,
    imagePrompt: hookPrompt,
    imageLayout: 'card-3d',
    footerNote: 'Desliza para ver la guía completa 👈'
  });

  // Slide 2: Diagnostic / Symptoms
  slides.push({
    type: 'point',
    stepNumber: '02',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedPoints[0]?.title ? `¿CÓMO SABER SI **${detectedPoints[0].title}**?` : (partType === 'frenos' ? '¿CÓMO SABER SI LAS **PASTILLAS ESTÁN GASTADAS?**' : '¿CÓMO SABER SI EL **REPUESTO ESTÁ FATIGADO?**'),
    description: detectedPoints[0]?.body || 'El desgaste por fricción reduce la capacidad de respuesta y aumenta el esfuerzo mecánico en todo el sistema.',
    highlightText: 'ESTÁ GASTADO?',
    badge: 'ALERTA TÉCNICA',
    image: AUTOMOTIVE_IMAGE_PRESETS.taller_diagnostico,
    imagePrompt: 'mechanic inspecting car components in workshop with dramatic lighting',
    imageLayout: 'card-3d',
    keyTakeaway: 'Señales claras = hora de revisar.'
  });

  // Slide 3: Risk / Damage Cascade
  slides.push({
    type: 'point',
    stepNumber: '03',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedPoints[1]?.title ? `¿QUÉ PASA SI **NO SE CAMBIA A TIEMPO?**` : '¿QUÉ PASA SI **SE IGNORA EL DESGASTE?**',
    description: detectedPoints[1]?.body || 'Seguir forzando el vehículo con componentes fatigados daña piezas adyacentes más costosas y triplica el presupuesto.',
    highlightText: 'NO SE CAMBIA A TIEMPO?',
    badge: 'ALERTA TÉCNICA',
    image: AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
    imagePrompt: 'car engine transmission assembly closeup in dark studio lighting',
    imageLayout: 'card-3d',
    keyTakeaway: 'Una pana evitable que puede dejarte botado en ruta.'
  });

  // Slide 4: Kit Completo vs Cambio Parcial (Comparison)
  slides.push({
    type: 'kit_vs_partial',
    stepNumber: '04',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: 'KIT COMPLETO = **RENDIMIENTO SEGURO**',
    description: 'Cambiar solo una parte del sistema puede generar desgaste prematuro y nuevos costos de mano de obra.',
    highlightText: 'RENDIMIENTO SEGURO',
    badge: 'ALERTA TÉCNICA',
    image: defaultImage,
    imagePrompt: 'automotive kit components assembly with annotations',
    imageLayout: 'card-3d',
    partialTitle: 'CAMBIO PARCIAL',
    partialPoint1: 'Más desgaste',
    partialPoint2: 'Vida útil reducida',
    completeTitle: 'KIT COMPLETO',
    completePoint1: 'Funcionamiento óptimo',
    completePoint2: 'Mayor durabilidad'
  });

  // Slide 5: Benefits (3 Golden Pills)
  slides.push({
    type: 'benefits',
    stepNumber: '05',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: 'MANTÉN LA **RESPUESTA DE TU VEHÍCULO**',
    description: 'Instalar repuestos 100% nuevos garantiza tolerancias de fábrica, confort y tranquilidad en ruta.',
    highlightText: 'RESPUESTA DE TU VEHÍCULO',
    badge: 'ALERTA TÉCNICA',
    image: AUTOMOTIVE_IMAGE_PRESETS.auto_estudio,
    imagePrompt: 'modern car driving smoothly on road at sunset',
    imageLayout: 'card-3d',
    benefit1: 'Más seguridad',
    benefit2: 'Mejor rendimiento',
    benefit3: 'Cero ruidos',
    keyTakeaway: 'Revisar a tiempo evita daños mayores en el sistema.'
  });

  // Slide 6: Final WhatsApp CTA
  slides.push({
    type: 'cta',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: `¿NECESITAS ESTE **REPUESTO PARA TU AUTO?**`,
    subtitle: 'COTIZA POR WHATSAPP Y TE ASESORAMOS.',
    highlightText: 'REPUESTO PARA TU AUTO',
    ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
    locations: '📍 Quilpué: Chorrillos 782 · Viña del Mar: Local 11, Galería San Antonio',
    badge: 'ALERTA TÉCNICA',
    image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
    imagePrompt: 'car spare parts in official packaging box studio lighting',
    imageLayout: 'card-3d'
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
