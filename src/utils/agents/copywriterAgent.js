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

  // Generate Instagram-First Multi-Archetype Slide Blueprints (Official 6-Slide Master Pattern)
  const draftSlides = [];

  // Slide 1: Hook / Cover
  draftSlides.push({
    type: 'hook',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedHook.length > 60 ? detectedHook.substring(0, 60) : detectedHook,
    subtitle: 'Aprende a diagnosticarlo a tiempo y cotiza la pieza exacta antes de que cause una pana mayor.',
    highlightText: systemCategory === 'frenos' ? 'FRENOS' : systemCategory === 'embrague' ? 'EMBRAGUE' : 'MOTOR',
    badge: 'ALERTA TÉCNICA',
    footerNote: 'Desliza para ver la guía completa 👈'
  });

  // Slide 2: Diagnostic / Symptoms
  draftSlides.push({
    type: 'point',
    stepNumber: '02',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedPoints[0]?.title ? `¿CÓMO SABER SI **${detectedPoints[0].title}**?` : '¿CÓMO SABER SI EL **REPUESTO ESTÁ GASTADO?**',
    description: detectedPoints[0]?.body || 'El disco y componentes de fricción se desgastan con el kilometraje, reduciendo la respuesta y seguridad.',
    highlightText: 'ESTÁ GASTADO?',
    badge: 'ALERTA TÉCNICA',
    keyTakeaway: 'Señales claras = hora de revisar.'
  });

  // Slide 3: Risk / Consequence
  draftSlides.push({
    type: 'point',
    stepNumber: '03',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: detectedPoints[1]?.title ? `¿QUÉ PASA SI **NO SE CAMBIA A TIEMPO?**` : '¿QUÉ PASA SI **SE IGNORA EL DESGASTE?**',
    description: detectedPoints[1]?.body || 'Seguir forzando el vehículo daña componentes adyacentes de alto costo y triplica el presupuesto final.',
    highlightText: 'NO SE CAMBIA A TIEMPO?',
    badge: 'ALERTA TÉCNICA',
    keyTakeaway: 'Una pana evitable que puede dejarte botado en ruta.'
  });

  // Slide 4: Kit Completo vs Parcial
  draftSlides.push({
    type: 'kit_vs_partial',
    stepNumber: '04',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: 'KIT COMPLETO = **RENDIMIENTO SEGURO**',
    description: 'Cambiar solo una parte del sistema puede generar desgaste prematuro y nuevos costos de mano de obra.',
    highlightText: 'RENDIMIENTO SEGURO',
    badge: 'ALERTA TÉCNICA',
    partialTitle: 'CAMBIO PARCIAL',
    partialPoint1: 'Más desgaste',
    partialPoint2: 'Vida útil reducida',
    completeTitle: 'KIT COMPLETO',
    completePoint1: 'Funcionamiento óptimo',
    completePoint2: 'Mayor durabilidad'
  });

  // Slide 5: Benefits (3 Golden Pills)
  draftSlides.push({
    type: 'benefits',
    stepNumber: '05',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: 'MANTÉN LA **RESPUESTA DE TU VEHÍCULO**',
    description: 'Instalar repuestos 100% nuevos garantiza tolerancias de fábrica, confort y tranquilidad en ruta.',
    highlightText: 'RESPUESTA DE TU VEHÍCULO',
    badge: 'ALERTA TÉCNICA',
    benefit1: 'Más seguridad',
    benefit2: 'Mejor rendimiento',
    benefit3: 'Cero ruidos',
    keyTakeaway: 'Revisar a tiempo evita daños mayores en el sistema.'
  });

  // Slide 6: Final WhatsApp CTA
  draftSlides.push({
    type: 'cta',
    eyebrow: 'MECÁNICA VITAL · REPUESTOS RPM',
    title: 'COTIZA DIRECTAMENTE POR WHATSAPP',
    subtitle: 'Envíanos Marca, Modelo, Año y Motor. Revisamos disponibilidad y compatibilidad de inmediato con nuestro equipo técnico.',
    highlightText: 'COTIZA DIRECTAMENTE',
    ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
    locations: '📍 Quilpué: Chorrillos 782 · Viña del Mar: Local 11, Galería San Antonio',
    badge: 'ALERTA TÉCNICA'
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
