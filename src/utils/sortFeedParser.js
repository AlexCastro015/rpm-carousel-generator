/**
 * Sort Feed Extension Importer & Automotive Content Transformer
 * High-tolerance CSV/JSON/Transcript parser with multi-line RFC-4180 support,
 * auto delimiter detection (, or ; or \t), and guaranteed carousel generation.
 */

export function parseSortFeedCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];
  const cleanText = csvText.trim();
  if (!cleanText) return [];

  // 1. Auto-detect delimiter
  const firstLine = cleanText.split(/\r?\n/)[0] || '';
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;

  let delimiter = ',';
  if (semicolonCount > commaCount && semicolonCount > tabCount) delimiter = ';';
  else if (tabCount > commaCount && tabCount > semicolonCount) delimiter = '\t';

  // 2. RFC-4180 compliant CSV state machine parser (handles multi-line quotes)
  const rows = parseFullCSV(cleanText, delimiter);
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => normalizeHeader(h));
  const results = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0 || row.every(cell => !cell.trim())) continue;

    const item = {};
    headers.forEach((colName, index) => {
      if (colName) item[colName] = (row[index] || '').trim();
    });

    // Flexible column matching
    const caption = item.caption || item.post_caption || item.postcaption || item.description || 
                    item.text || item.post_text || item.content || item.message || item.reel_caption || '';
    
    const transcript = item.transcript || item.video_transcript || item.subtitles || item.transcription || 
                       item.speech_to_text || item.audio_text || '';

    const title = item.title || item.video_title || item.post_title || item.name || '';

    const likes = parseNumeric(item.likes || item.like_count || item.reactions || item.me_gusta || item.favorites || '0');
    const views = parseNumeric(item.views || item.view_count || item.play_count || item.plays || item.reproducciones || item.vistas || '0');
    const comments = parseNumeric(item.comments || item.comment_count || item.comentarios || '0');
    const url = item.url || item.post_url || item.link || item.permalink || '';
    const author = item.author || item.username || item.creator || item.account || item.owner || '';

    const combinedText = transcript || caption || title;

    if (combinedText || title) {
      const hookTitle = extractHookTitle(title || transcript || caption) || ('Post #' + i + ' (Viral Sort Feed)');
      results.push({
        id: 'sortfeed-csv-' + i,
        caption,
        transcript,
        rawTitle: title,
        likes,
        views,
        comments,
        url,
        author,
        title: hookTitle
      });
    }
  }

  // Sort by highest engagement
  return results.sort((a, b) => (b.views || b.likes) - (a.views || a.likes));
}

function parseFullCSV(text, delimiter) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function normalizeHeader(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseNumeric(val) {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const clean = String(val).replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
}

export function parseSortFeedJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const list = Array.isArray(data) ? data : (data.items || data.posts || data.data || data.results || [data]);
    
    return list.map((item, i) => {
      const caption = item.caption || item.text || item.description || item.content || item.post_caption || item.message || '';
      const transcript = item.transcript || item.video_transcript || item.subtitles || '';
      const title = item.title || item.video_title || '';
      const likes = parseNumeric(item.likes || item.like_count || item.reactions || 0);
      const views = parseNumeric(item.views || item.view_count || item.play_count || item.plays || 0);
      const comments = parseNumeric(item.comments || item.comment_count || 0);
      const url = item.url || item.link || item.permalink || '';
      const author = item.author || item.username || item.creator || '';

      const hookTitle = extractHookTitle(title || transcript || caption) || ('Post #' + (i + 1));

      return {
        id: 'sortfeed-json-' + i,
        caption,
        transcript,
        rawTitle: title,
        likes,
        views,
        comments,
        url,
        author,
        title: hookTitle
      };
    });
  } catch (err) {
    console.error('Error al procesar JSON de Sort Feed:', err);
    return [];
  }
}

function extractHookTitle(text) {
  if (!text) return '';
  // Remove hashtags, links, emojis from start
  const clean = text
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/#[\w_]+/gi, '')
    .trim();
  
  const firstLine = clean.split(/\r?\n/)[0] || '';
  const trimmed = firstLine.trim();
  if (trimmed.length > 70) {
    return trimmed.substring(0, 70) + '...';
  }
  return trimmed || 'Guía Automotriz RPM';
}

/**
 * Transforms raw text/transcript into a guaranteed, high-converting 5 to 7 slide Instagram Carousel.
 */
export function convertTextToRPMCarousel(rawText = '', userTopic = '') {
  const clean = String(rawText || '').trim();
  const fallbackTopic = (userTopic || 'CONSEJOS DE MANTENCIÓN Y REPUESTOS').toUpperCase();

  // Extract clean lines
  const lines = clean
    ? clean.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    : [fallbackTopic];

  // 1. Extract Hook
  let rawHook = userTopic || lines[0] || fallbackTopic;
  // Clean emojis, hashtags and numbers from hook
  let hookClean = rawHook
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/#[\w_]+/gi, '')
    .replace(/^[0-9#\-\*.\s\:👉⚠️🚨🔧]+/, '')
    .trim()
    .toUpperCase();

  if (!hookClean || hookClean.length < 5) {
    hookClean = fallbackTopic;
  }

  // 2. Parse Points / Steps
  const detectedPoints = [];
  const contentLines = clean ? lines.slice(1) : [];
  let currentPoint = null;

  contentLines.forEach(line => {
    // Filter out plain hashtag lines
    if (line.startsWith('#') || line.includes('#Repuestos') || line.includes('#Mecanica')) return;

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

  // Fallback: If no structured points, split by sentences or paragraphs
  if (detectedPoints.length === 0 && clean.length > 30) {
    const sentences = clean
      .replace(/#[\w_]+/g, '')
      .split(/\.\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && !s.startsWith('http'));

    sentences.slice(0, 4).forEach((st, idx) => {
      detectedPoints.push({
        title: 'DETALLE CLAVE ' + (idx + 1),
        body: st + '.'
      });
    });
  }

  // Guaranteed fallback points if content was short
  if (detectedPoints.length === 0) {
    detectedPoints.push({
      title: 'DIAGNÓSTICO OPORTUNO DE LA FALLA',
      body: 'Detectar los primeros ruidos o pérdidas de rendimiento a tiempo evita averías mayores en componentes complementarios del motor o suspensión.'
    });
    detectedPoints.push({
      title: 'REPUESTOS 100% NUEVOS Y GARANTIZADOS',
      body: 'Optar por repuestos nuevos asegura la durabilidad original de tu vehículo y previene incompatibilidades que dañen tu seguridad.'
    });
    detectedPoints.push({
      title: 'COTIZACIÓN EXACTA CON TU PADRÓN',
      body: 'Revisa marca, modelo, año y cilindrada de motor antes de comprar para garantizar que la pieza sea compatible al 100%.'
    });
  }

  // Assemble Slides
  const slides = [];

  // Slide 1: Hook
  slides.push({
    type: 'hook',
    eyebrow: 'GUÍA TÉCNICA · REPUESTOS RPM',
    title: hookClean.length > 80 ? hookClean.substring(0, 80) : hookClean,
    subtitle: 'Conoce los síntomas, consejos de mantenimiento y cómo evitar gastos innecesarios en tu vehículo.',
    highlightText: 'REPUESTOS RPM',
    badge: 'MECÁNICA & PREVENCIÓN',
    footerNote: 'Desliza para ver la guía completa 👉'
  });

  // Slides 2..N: Points (up to 4)
  detectedPoints.slice(0, 4).forEach((pt, index) => {
    const stepNum = String(index + 1).padStart(2, '0');
    slides.push({
      type: 'point',
      stepNumber: stepNum,
      title: pt.title.length > 60 ? pt.title.substring(0, 60) : pt.title,
      description: pt.body || 'Revisión técnica recomendada para asegurar la vida útil de tu motor y tren de rodaje.',
      badge: 'PASO ' + stepNum,
      keyTakeaway: 'Verifica compatibilidad con tu padrón antes de instalar.'
    });
  });

  // Slide Final: WhatsApp CTA
  slides.push({
    type: 'cta',
    eyebrow: '¿BUSCAS ESTE REPUESTO PARA TU AUTO?',
    title: 'COTIZA DIRECTAMENTE POR WHATSAPP',
    subtitle: 'Envíanos Marca, Modelo, Año y Motor. Te confirmamos compatibilidad y disponibilidad de inmediato.',
    ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
    locations: '📍 Quilpué (Chorrillos 782) · Viña del Mar (Local 11, Galería San Antonio)',
    badge: 'SOLO REPUESTOS NUEVOS'
  });

  // Caption Generator
  const caption = '🚗 ' + hookClean + '\n\n' +
    'Mantener tu vehículo en óptimas condiciones es clave para tu seguridad y para evitar panas costosas en ruta.\n\n' +
    '💡 Consejo RPM: Para cotizar la pieza correcta a la primera, ten a mano tu padrón (marca, modelo, año y motor).\n\n' +
    '📲 Escríbenos al WhatsApp +56 9 7546 7525 para revisar disponibilidad y cotizar repuestos nuevos garantizados.\n\n' +
    '📍 Puntos de atención en Quilpué y Viña del Mar.\n\n' +
    '#RepuestosRPM #MecanicaChile #Quilpue #VinaDelMar #RepuestosNuevos #AutosChile #MantencionAutomotriz';

  return {
    id: 'sortfeed-converted-' + Date.now(),
    title: hookClean,
    category: 'Mecánica & Consejos',
    source: 'Sort Feed Transformer',
    slides,
    caption
  };
}
