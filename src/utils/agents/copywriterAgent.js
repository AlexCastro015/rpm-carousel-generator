/**
 * Subagent 2: Automotive Technical Copywriter (CopywriterAgent)
 * Crafts educational, high-retention slides in Repuestos RPM brand voice with Instagram-first visual rhythm.
 */

export function runCopywriterAgent(trendData, options = {}) {
  const { detectedHook, systemCategory, rawText } = trendData;
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
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
        title: line.substring(0, 50).toUpperCase(),
        body: line
      };
    }
  });

  if (currentPoint) detectedPoints.push(currentPoint);

  // High-value fallback library for automotive issues
  if (detectedPoints.length === 0) {
    if (systemCategory === 'frenos') {
      detectedPoints.push({
        title: 'CHIRRIDO METÁLICO Y PÉRDIDA DE FRICCIÓN',
        body: 'El testigo acústico de las pastillas avisa cuando queda menos de 2 mm de material. Ignorarlo raya los discos de freno.'
      });
      detectedPoints.push({
        title: 'VIBRACIÓN EN EL VOLANTE AL FRENAR',
        body: 'Ocurre por sobrecalentamiento térmico que tuerce los discos (alabeo), reduciendo el agarre en frenadas de emergencia.'
      });
      detectedPoints.push({
        title: 'PEDAL ESPONJOSO O CON RECORRIDO LARGO',
        body: 'Presencia de aire en el circuito hidráulico o líquido de freno degradado por humedad acumulada.'
      });
    } else if (systemCategory === 'embrague') {
      detectedPoints.push({
        title: 'EL MOTOR SE ACELERA PERO NO TRACCIONA',
        body: 'En 3ª o 4ª marcha las RPM suben de golpe sin aumento de velocidad porque el disco patina sobre el volante.'
      });
      detectedPoints.push({
        title: 'PEDAL DURO COMO PIEDRA O CON CRUJIDOS',
        body: 'Fatiga de material en el diafragma de la prensa de embrague que sobrecarga la piola o el bombín hidráulico.'
      });
      detectedPoints.push({
        title: 'DIFICULTAD PARA ENGANCHAR 1ª Y RETROCESO',
        body: 'El disco no desacopla completamente del motor, forzando los sincronizadores de la caja de cambios.'
      });
    } else if (systemCategory === 'motor') {
      detectedPoints.push({
        title: 'TEMPERATURA ELEVADA O FUGAS VISIBLES',
        body: 'Fallas en bomba de agua o termostato provocan calentones que dañan la empaquetadura de culata.'
      });
      detectedPoints.push({
        title: 'RUIDOS O GOLPETEOS AL ENCENDER',
        body: 'Desgaste en tensores y correas de distribución pueden causar pérdida de sincronización y choque de válvulas.'
      });
      detectedPoints.push({
        title: 'PÉRDIDA DE PRESIÓN Y RENDIMIENTO',
        body: 'Filtros obstruidos y bujías desgastadas aumentan el consumo de combustible y ensucian sensores.'
      });
    } else {
      detectedPoints.push({
        title: 'DETECCIÓN TEMPRANA DE RUIDOS O VIBRACIONES',
        body: 'Identificar una anomalía mecánica a tiempo evita que el desgaste se propague a piezas complementarias más costosas.'
      });
      detectedPoints.push({
        title: 'PREFIERE SIEMPRE REPUESTOS 100% NUEVOS',
        body: 'Las piezas nuevas garantizan tolerancia de fábrica, máxima durabilidad y seguridad comprobada en ruta.'
      });
      detectedPoints.push({
        title: 'COTIZACIÓN CON DATOS EXACTOS DE PADRÓN',
        body: 'Verificar marca, modelo, año y cilindrada evita incompatibilidades y devoluciones innecesarias.'
      });
    }
  }

  // Generate Instagram-First Multi-Archetype Slide Blueprints
  const draftSlides = [];

  // Slide 1: Hook / Cover
  draftSlides.push({
    type: 'hook',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedHook.length > 70 ? detectedHook.substring(0, 70) : detectedHook,
    subtitle: 'Aprende a diagnosticarlo a tiempo y cotiza la pieza exacta antes de que cause una pana mayor.',
    highlightText: 'REPUESTOS RPM',
    badge: 'ALERTA TÉCNICA',
    footerNote: 'Desliza para ver la guía completa 👉'
  });

  // Slide 2: Stat / Critical Metric
  const statNum = systemCategory === 'frenos' ? '2 MM' : systemCategory === 'embrague' ? '80.000' : '30.000 KM';
  const statLabel = systemCategory === 'frenos' ? 'Límite de desgaste crítico en pastillas' : systemCategory === 'embrague' ? 'Kilómetros promedio de vida útil' : 'Intervalo de inspección preventiva';
  draftSlides.push({
    type: 'stat',
    title: 'EL LÍMITE QUE NO DEBES SUPERAR',
    statNumber: statNum,
    statLabel,
    description: 'Conducir con componentes al límite de fricción sobrecalienta los metales y desgasta piezas costosas.',
    badge: 'DATO TÉCNICO',
    keyTakeaway: 'Revisa periódicamente el grosor y estado visual de tus piezas.'
  });

  // Slide 3: Comparison VS Slide
  draftSlides.push({
    type: 'vs',
    title: 'ERROR COMÚN VS SOLUCIÓN RPM',
    badge: 'COMPARATIVA',
    vsWrong: systemCategory === 'frenos'
      ? 'Instalar pastillas nuevas sobre discos alabeados o rayados.'
      : 'Seguir forzando el auto cuando el embrague patina en subidas.',
    vsRight: systemCategory === 'frenos'
      ? 'Instalar pastillas 100% nuevas con discos en tolerancia o nuevos.'
      : 'Cambiar el kit de embrague completo (disco, prensa y rodamiento) 100% nuevo.',
    keyTakeaway: 'Un cambio a medias siempre termina costando el doble.'
  });

  // Slide 4: Checklist Slide
  draftSlides.push({
    type: 'checklist',
    title: 'TEST DE DIAGNÓSTICO RÁPIDO',
    badge: 'CHECKLIST RPM',
    checklistItems: [
      '¿Sientes vibraciones anormales en el volante o pedal?',
      '¿Escuchas chirridos o sonidos metálicos al accionar?',
      '¿Notas pérdida de tracción, frenado o respuesta?',
      '¿El pedal se siente esponjoso o excesivamente duro?'
    ],
    keyTakeaway: 'Si cumples 2 o más síntomas, cotiza tu repuesto de inmediato.'
  });

  // Slide 5: Authority Quote / Golden Rule
  draftSlides.push({
    type: 'quote',
    title: 'LA REGLA DE ORO DE LA MECÁNICA',
    badge: 'CONSEJO DE AUTORIDAD',
    quoteText: '«Un repuesto 100% nuevo garantiza tolerancias de fábrica, máxima durabilidad y la tranquilidad de tu familia en ruta.»',
    quoteAuthor: 'Equipo Técnico · Repuestos RPM',
    keyTakeaway: 'Cotiza siempre con Marca, Modelo, Año y Cilindrada del motor.'
  });

  // Slide 6: Final WhatsApp CTA
  draftSlides.push({
    type: 'cta',
    eyebrow: '¿BUSCAS ESTE REPUESTO PARA TU AUTO?',
    title: 'COTIZA DIRECTAMENTE POR WHATSAPP',
    subtitle: 'Envíanos Marca, Modelo, Año y Motor. Revisamos disponibilidad y compatibilidad de inmediato con nuestro equipo técnico.',
    ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
    locations: '📍 Quilpué: Chorrillos 782 · Viña del Mar: Local 11, Galería San Antonio',
    badge: 'REPUESTOS 100% NUEVOS'
  });

  return {
    agent: 'CopywriterAgent',
    status: 'success',
    data: {
      draftSlides,
      title: detectedHook,
      slideCount: draftSlides.length,
      category: systemCategory
    }
  };
}
