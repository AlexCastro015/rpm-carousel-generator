/**
 * Subagent 1: Trend & Engagement Analyst (TrendAnalystAgent)
 * Analyzes video engagement metrics (views, likes, comments) and identifies the most viral automotive hook.
 */

export function runTrendAnalystAgent(inputData, options = {}) {
  const { caption = '', transcript = '', views = 0, likes = 0, comments = 0, title = '' } = 
    typeof inputData === 'string' ? { caption: inputData, transcript: inputData } : inputData;

  const combinedText = `${title}\n${caption}\n${transcript}`.trim();
  
  // Calculate engagement index if metrics available
  const engagementScore = (views > 0 || likes > 0)
    ? Math.round((likes * 3 + comments * 5 + (views * 0.05)))
    : 100;

  // Extract candidate hook lines
  const rawLines = combinedText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
  let detectedHook = title || '';
  if (!detectedHook && rawLines.length > 0) {
    // Pick the most impactful line from the top
    detectedHook = rawLines[0]
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/#[\w_]+/gi, '')
      .replace(/^[0-9#\-\*.\s\:👉⚠️🚨🔧]+/, '')
      .trim();
  }

  if (!detectedHook || detectedHook.length < 5) {
    detectedHook = 'MANTENCIÓN PREVENTIVA Y DIAGNÓSTICO';
  }

  // Detect automotive category and system
  const lower = combinedText.toLowerCase();
  let systemCategory = 'general';
  let urgencyLevel = 'moderada';

  if (lower.includes('freno') || lower.includes('pastilla') || lower.includes('disco') || lower.includes('caliper') || lower.includes('alabeo')) {
    systemCategory = 'frenos';
    urgencyLevel = 'alta';
  } else if (lower.includes('embrague') || lower.includes('clutch') || lower.includes('prensa') || lower.includes('disco embrague') || lower.includes('transmision')) {
    systemCategory = 'embrague';
    urgencyLevel = 'alta';
  } else if (lower.includes('suspension') || lower.includes('amortiguador') || lower.includes('bandeja') || lower.includes('rotula') || lower.includes('tren delantero')) {
    systemCategory = 'suspension';
    urgencyLevel = 'media';
  } else if (lower.includes('bujia') || lower.includes('bobina') || lower.includes('sensor') || lower.includes('alternador') || lower.includes('bateria') || lower.includes('inyeccion')) {
    systemCategory = 'electrico';
    urgencyLevel = 'media';
  } else if (lower.includes('distribucion') || lower.includes('correa') || lower.includes('cadena') || lower.includes('bomba de agua') || lower.includes('termostato')) {
    systemCategory = 'motor';
    urgencyLevel = 'critica';
  }

  return {
    agent: 'TrendAnalystAgent',
    status: 'success',
    data: {
      rawText: combinedText,
      detectedHook: detectedHook.toUpperCase(),
      systemCategory,
      urgencyLevel,
      engagementScore,
      analysisTimestamp: new Date().toISOString()
    }
  };
}
