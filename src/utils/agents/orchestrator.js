/**
 * Master Subagent Orchestrator (Content Director)
 * Coordinates the full multi-agent pipeline for RPM Carousel Studio.
 */

import { runTrendAnalystAgent } from './trendAnalystAgent.js';
import { runCopywriterAgent } from './copywriterAgent.js';
import { runVisualPromptAgent } from './visualPromptAgent.js';
import { runSocialCaptionAgent } from './socialCaptionAgent.js';
import { runLayoutQAAgent } from './layoutQAAgent.js';

export const SUBAGENTS_MANIFEST = [
  { id: 'trend', name: 'Trend & Engagement Analyst', role: 'Extracción de ganchos virales automotrices' },
  { id: 'copywriter', name: 'Automotive Technical Copywriter', role: 'Estructuración de guion y tono de marca RPM' },
  { id: 'visual', name: 'Visual & Prompt Art Director', role: 'Fotografía de estudio 8K y asignación de assets' },
  { id: 'seo', name: 'Social Caption & SEO Strategist', role: 'Generación de copy IG con WhatsApp y sucursales' },
  { id: 'qa', name: 'Layout & Contrast QA Inspector', role: 'Auditoría de legibilidad y proporciones 4:5' }
];

/**
 * Runs the complete multi-agent pipeline with asynchronous telemetry callbacks.
 */
export async function executeMultiAgentCarouselPipeline(rawInput, onAgentProgress = null) {
  const telemetry = [];
  const logStep = (agentId, agentName, status, details) => {
    const entry = { agentId, agentName, status, details, timestamp: Date.now() };
    telemetry.push(entry);
    if (typeof onAgentProgress === 'function') {
      onAgentProgress(entry, telemetry);
    }
  };

  // Step 1: Trend & Engagement Analyst
  logStep('trend', 'Trend & Engagement Analyst', 'running', 'Analizando métricas de engagement y extrayendo gancho viral...');
  const trendResult = runTrendAnalystAgent(rawInput);
  logStep('trend', 'Trend & Engagement Analyst', 'completed', `Gancho detectado: "${trendResult.data.detectedHook}"`);

  // Step 2: Automotive Technical Copywriter
  logStep('copywriter', 'Automotive Technical Copywriter', 'running', 'Estructurando guion técnico y diapositivas de diagnóstico...');
  const copyResult = runCopywriterAgent(trendResult.data);
  logStep('copywriter', 'Automotive Technical Copywriter', 'completed', `${copyResult.data.slideCount} diapositivas técnicas generadas.`);

  // Step 3: Visual & Prompt Art Director
  logStep('visual', 'Visual & Prompt Art Director', 'running', 'Generando prompts fotográficos de estudio y asignando estética RPM...');
  const visualResult = runVisualPromptAgent(copyResult.data);
  logStep('visual', 'Visual & Prompt Art Director', 'completed', 'Presets fotográficos e iluminación Dark Steel asignados.');

  // Step 4: Social Caption & SEO Strategist (Parallel branch in pipeline)
  logStep('seo', 'Social Caption & SEO Strategist', 'running', 'Redactando copy de Instagram y configurando WhatsApp CTA...');
  const seoResult = runSocialCaptionAgent(trendResult.data, copyResult.data);
  logStep('seo', 'Social Caption & SEO Strategist', 'completed', 'Copy con geo-targeting (Quilpué / Viña) listo.');

  // Step 5: Layout & Contrast QA Inspector
  logStep('qa', 'Layout & Contrast QA Inspector', 'running', 'Auditando límites de texto y contraste 4:5...');
  const qaResult = runLayoutQAAgent(visualResult.data);
  logStep('qa', 'Layout & Contrast QA Inspector', 'completed', `QA Aprobado (${qaResult.data.metrics.totalSlides} diapositivas auditadas).`);

  const finalCarousel = {
    id: 'agent-carousel-' + Date.now(),
    title: copyResult.data.title,
    category: trendResult.data.systemCategory,
    source: 'RPM Multi-Agent Studio Engine',
    slides: qaResult.data.auditedSlides,
    caption: seoResult.data.caption,
    agentTelemetry: telemetry,
    qaMetrics: qaResult.data.metrics
  };

  return {
    carousel: finalCarousel,
    telemetry
  };
}
