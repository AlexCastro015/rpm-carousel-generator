import { parseSortFeedCSV, parseSortFeedJSON, convertTextToRPMCarousel } from './src/utils/sortFeedParser.js';
import { generateFullRPMCarouselFromAI, generateAIImageUrl, AUTOMOTIVE_IMAGE_PRESETS, rewriteSlideWithAI } from './src/utils/aiEngine.js';
import { AUTOMOTIVE_PRESETS } from './src/data/presets.js';
import { THEMES } from './src/data/themes.js';
import { executeMultiAgentCarouselPipeline, SUBAGENTS_MANIFEST } from './src/utils/agents/orchestrator.js';
import { runTrendAnalystAgent } from './src/utils/agents/trendAnalystAgent.js';
import { runCopywriterAgent } from './src/utils/agents/copywriterAgent.js';
import { runVisualPromptAgent } from './src/utils/agents/visualPromptAgent.js';
import { runSocialCaptionAgent } from './src/utils/agents/socialCaptionAgent.js';
import { runLayoutQAAgent } from './src/utils/agents/layoutQAAgent.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log('  ✅ PASS: ' + message);
    passed++;
  } else {
    console.error('  ❌ FAIL: ' + message);
    failed++;
  }
}

console.log('\n==================================================');
console.log('🧪 RPM CAROUSEL STUDIO — SUITE COMPLETA DE TESTING');
console.log('==================================================\n');

// ----------------------------------------------------
// 1. TESTING CSV PARSER (RFC-4180 & Multi-Line)
// ----------------------------------------------------
console.log('📦 1. Testing de Parsers de Sort Feed:');

const sampleCSVCommas = `"Caption","Likes","Views","Comments","URL"
"5 Señales de que tu kit de embrague está muriendo\n\n1. Patina en 3ra\n2. Pedal duro\n3. Olor a quemado",1450,25400,89,"https://instagram.com/p/123"
"Por qué nunca debes mezclar pastillas usadas con discos nuevos",980,18200,45,"https://instagram.com/p/456"`;

const parsedCommas = parseSortFeedCSV(sampleCSVCommas);
assert(parsedCommas.length === 2, 'CSV con comas y saltos de línea internos detecta 2 posts');
assert(parsedCommas[0].likes === 1450, 'Métrica Likes parseada correctamente (1450)');
assert(parsedCommas[0].views === 25400, 'Métrica Views parseada correctamente (25400)');
assert(parsedCommas[0].caption.includes('Patina en 3ra'), 'Preserva saltos de línea internos en el campo');

const sampleCSVSemicolons = `Post Caption;Reproducciones;Me Gusta;Enlace
"Termostato trabado en Chevrolet Sail: Síntomas de calentamiento";45000;2300;https://instagram.com/p/789`;

const parsedSemicolons = parseSortFeedCSV(sampleCSVSemicolons);
assert(parsedSemicolons.length === 1, 'CSV con punto y coma (regional) detectado automáticamente');
assert(parsedSemicolons[0].views === 45000, 'Mapea columna "Reproducciones" a views');
assert(parsedSemicolons[0].likes === 2300, 'Mapea columna "Me Gusta" a likes');

// ----------------------------------------------------
// 2. TESTING JSON PARSER
// ----------------------------------------------------
console.log('\n📦 2. Testing de Ingesta JSON:');

const sampleJSON = JSON.stringify([
  {
    caption: 'Fallas comunes en tren delantero Chery Tiggo 2',
    video_transcript: 'Si sientes golpes en adoquines revisa terminales de dirección y bujes de bandeja',
    view_count: 89000,
    like_count: 4200
  }
]);

const parsedJSON = parseSortFeedJSON(sampleJSON);
assert(parsedJSON.length === 1, 'JSON parsea correctamente array de posts');
assert(parsedJSON[0].transcript.includes('terminales de dirección'), 'Extrae video_transcript con precisión');
assert(parsedJSON[0].views === 89000, 'Normaliza view_count a views numérico');

// ----------------------------------------------------
// 3. TESTING MOTOR DE IA & ARQUETIPOS DINÁMICOS INSTAGRAM
// ----------------------------------------------------
console.log('\n🤖 3. Testing del Motor de IA y Arquetipos Dinámicos de Instagram:');

const aiGenerated = generateFullRPMCarouselFromAI(
  '5 Señales de que tu bomba de agua está fallando:\n1. Fuga de refrigerante.\n2. Sonido chirriante.\n3. Aguja sube en subidas.',
  'BOMBA DE AGUA CHEVROLET SAIL'
);

assert(aiGenerated !== null && typeof aiGenerated === 'object', 'Generación de carrusel retorna objeto válido');
assert(aiGenerated.slides.length === 6, 'Genera estructura oficial de exactamente 6 diapositivas (generó ' + aiGenerated.slides.length + ')');
assert(aiGenerated.slides[0].type === 'hook', 'Slide 1 es Portada (hook)');
assert(aiGenerated.slides[1].type === 'point' && aiGenerated.slides[1].stepNumber === '02', 'Slide 2 es Diagnóstico de síntoma (point)');
assert(aiGenerated.slides[2].type === 'point' && aiGenerated.slides[2].stepNumber === '03', 'Slide 3 es Riesgo / Daño en cadena (point)');
assert(aiGenerated.slides[3].type === 'kit_vs_partial', 'Slide 4 es Comparativa Kit Completo vs Parcial (kit_vs_partial)');
assert(aiGenerated.slides[4].type === 'benefits', 'Slide 5 son 3 Cápsulas de Beneficios doradas (benefits)');
assert(aiGenerated.slides[5].type === 'cta', 'Slide 6 es Cierre WhatsApp Oficial (cta)');

// AI Copilot Mutation Tests
const baseSlide = { type: 'point', title: 'Frenos gastados', description: 'Revisa las pastillas' };
const viralSlide = rewriteSlideWithAI(baseSlide, 'viral');
assert(viralSlide.title.includes('🚨'), 'AI Copilot "viral" añade gancho visual con alerta');

const vsSlide = rewriteSlideWithAI(baseSlide, 'to_vs');
assert(vsSlide.type === 'vs' && Boolean(vsSlide.vsWrong) && Boolean(vsSlide.vsRight), 'AI Copilot "to_vs" transforma a Comparativa con campos vsWrong y vsRight');

const checkSlide = rewriteSlideWithAI(baseSlide, 'to_checklist');
assert(checkSlide.type === 'checklist' && Array.isArray(checkSlide.checklistItems), 'AI Copilot "to_checklist" genera array de síntomas interactivo');

const statSlide = rewriteSlideWithAI(baseSlide, 'to_stat');
assert(statSlide.type === 'stat' && Boolean(statSlide.statNumber), 'AI Copilot "to_stat" genera número de impacto destacado');

// ----------------------------------------------------
// 4. TESTING DE BRAND KIT & COMPLIANCE REPUESTOS RPM
// ----------------------------------------------------
console.log('\n🛡️ 4. Testing de Brand Kit & Reglas de Negocio Repuestos RPM:');

const ctaSlide = aiGenerated.slides[aiGenerated.slides.length - 1];
assert(ctaSlide.ctaButtonText.includes('+56 9 7546 7525'), 'CTA incluye el WhatsApp oficial de RPM (+56 9 7546 7525)');
assert(ctaSlide.locations.includes('Quilpué') && ctaSlide.locations.includes('Viña del Mar'), 'CTA incluye locales físicos de Quilpué y Viña del Mar');
assert(ctaSlide.eyebrow.includes('REPUESTOS RPM') || ctaSlide.badge.includes('ALERTA'), 'Header institucional oficial presente');

// Check forbidden terms in templates
const forbiddenWords = ['usado', 'usados', 'desarme', 'desarmaduria', 'instalacion gratis', 'instalamos'];
let hasForbidden = false;

AUTOMOTIVE_PRESETS.forEach(preset => {
  preset.slides.forEach(slide => {
    const text = (slide.title + ' ' + (slide.subtitle || '') + ' ' + (slide.description || '')).toLowerCase();
    forbiddenWords.forEach(badWord => {
      if (text.includes(badWord)) {
        hasForbidden = true;
        console.error('Palabra prohibida encontrada: ' + badWord);
      }
    });
  });
});
assert(!hasForbidden, 'Ninguna plantilla contiene términos prohibidos (usados, desarme, instalación)');

// Verify Brand Kit Tokens in Themes
const rpmTheme = THEMES.find(t => t.id === 'rpm-dark-steel');
assert(rpmTheme !== undefined, 'Tema oficial RPM Dark Steel existe');
assert(rpmTheme.accent === '#FFC400', 'Acento primario es Amarillo RPM #FFC400');
assert(rpmTheme.bgCard === '#1A1E23', 'Superficie de tarjeta es #1A1E23');
assert(rpmTheme.textPrimary === '#F7F7F7', 'Texto primario es Off-White #F7F7F7');

// ----------------------------------------------------
// 5. TESTING DE ARQUITECTURA MULTI-AGENTE
// ----------------------------------------------------
console.log('\n🤖 5. Testing de Pipeline y Subagentes Especializados:');

assert(SUBAGENTS_MANIFEST.length === 5, 'Manifiesto declara 5 subagentes especializados');

// Unit Test Subagent 1
const trendOut = runTrendAnalystAgent({
  caption: 'Fallas comunes en pastillas de freno y disco alabeado en Chery Tiggo',
  views: 54000,
  likes: 2100
});
assert(trendOut.status === 'success' && trendOut.data.systemCategory === 'frenos', 'Subagente 1 (Trend Analyst) categoriza sistema como "frenos"');
assert(trendOut.data.urgencyLevel === 'alta', 'Detecta nivel de urgencia "alta" para frenos');

// Unit Test Subagent 2
const copyOut = runCopywriterAgent(trendOut.data);
assert(copyOut.status === 'success', 'Subagente 2 (Copywriter) genera guion estructurado');
assert(copyOut.data.slideCount >= 6, 'Genera al menos 6 diapositivas dinámicas (generó ' + copyOut.data.slideCount + ')');

// Unit Test Subagent 3
const visualOut = runVisualPromptAgent(copyOut.data);
assert(visualOut.status === 'success', 'Subagente 3 (Visual Prompt) genera prompts de estudio y asigna assets');
assert(visualOut.data.slides[0].imagePrompt.includes('8k resolution'), 'Prompt visual contiene resolución 8k');

// Unit Test Subagent 4
const seoOut = runSocialCaptionAgent(trendOut.data, copyOut.data);
assert(seoOut.status === 'success', 'Subagente 4 (Social Caption) genera copy para feed');
assert(seoOut.data.caption.includes('Quilpué') && seoOut.data.caption.includes('+56 9 7546 7525'), 'Copy contiene WhatsApp y sucursal Quilpué');

// Unit Test Subagent 5
const qaOut = runLayoutQAAgent(visualOut.data);
assert(qaOut.status === 'success', 'Subagente 5 (Layout QA) aprueba proporciones 4:5 y contraste');
assert(qaOut.data.metrics.aspectRatio === '4:5 (1080x1350)', 'Métrica de relación de aspecto es 4:5');
assert(qaOut.data.metrics.archetypesDetected.length >= 4, 'QA detecta múltiples arquetipos dinámicos en el carrusel');

// Orchestrator Integration Test
const fullPipelineResult = await executeMultiAgentCarouselPipeline({
  caption: '3 Ruidos extraños en la suspensión delantera: cómo saber si es amortiguador o cazoleta',
  views: 32000,
  likes: 1500
});

assert(fullPipelineResult.carousel !== null, 'Orquestador ejecuta pipeline completo con éxito');
assert(fullPipelineResult.telemetry.length >= 5, 'Orquestador registra telemetría de todos los subagentes');
assert(fullPipelineResult.carousel.slides.length >= 6, 'Carrusel final tiene diapositivas ricas validadas por QA');

// ----------------------------------------------------
// RESULTADOS FINALES
// ----------------------------------------------------
console.log('\n==================================================');
console.log('📊 RESULTADO DE LAS PRUEBAS:');
console.log('  Total tests ejecutados: ' + (passed + failed));
console.log('  ✅ Tests Aprobados:    ' + passed);
console.log('  ❌ Tests Fallidos:     ' + failed);
console.log('==================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
