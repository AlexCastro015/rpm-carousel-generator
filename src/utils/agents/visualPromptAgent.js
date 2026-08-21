/**
 * Subagent 3: Visual & Prompt Art Director (VisualPromptAgent)
 * Creates automotive studio photography prompts and assigns curated high-res assets.
 */

import { AUTOMOTIVE_IMAGE_PRESETS, generateAIImageUrl } from '../aiEngine.js';

export function runVisualPromptAgent(copywriterData, options = {}) {
  const { draftSlides, category, title } = copywriterData;

  const slidesWithImages = draftSlides.map((slide, index) => {
    let assignedImage = AUTOMOTIVE_IMAGE_PRESETS.motor_turbo;
    let imagePrompt = '';
    let imageLayout = 'card-3d';

    if (slide.type === 'hook') {
      let promptSubject = 'car engine part';
      if (category === 'frenos') {
        promptSubject = 'performance brake caliper with slotted ceramic rotor';
        assignedImage = AUTOMOTIVE_IMAGE_PRESETS.frenos_disco;
      } else if (category === 'embrague') {
        promptSubject = 'heavy duty clutch kit with pressure plate';
        assignedImage = AUTOMOTIVE_IMAGE_PRESETS.embrague_transmision;
      } else if (category === 'suspension') {
        promptSubject = 'high performance shock absorber and suspension arm';
        assignedImage = AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador;
      } else if (category === 'electrico') {
        promptSubject = 'iridium spark plug with electric glow spark';
        assignedImage = AUTOMOTIVE_IMAGE_PRESETS.bujias_electrico;
      }

      imagePrompt = `cinematic photography of isolated automotive ${promptSubject}, dramatic studio rim lighting with RPM yellow glow (#FFC400), dark graphite background, 8k resolution, crisp detail`;
      imageLayout = 'card-3d';

    } else if (slide.type === 'point') {
      const stepTitle = (slide.title || '').toLowerCase();
      imagePrompt = `macro close-up shot of automotive part ${stepTitle}, commercial automotive catalog photography, matte black studio background, golden hour rim reflections, sharp mechanical texture`;
      
      const stepPresets = [
        AUTOMOTIVE_IMAGE_PRESETS.frenos_nuevo,
        AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
        AUTOMOTIVE_IMAGE_PRESETS.embrague_transmision,
        AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador
      ];
      assignedImage = stepPresets[(index - 1) % stepPresets.length];
      imageLayout = 'card-3d';

    } else if (slide.type === 'cta') {
      imagePrompt = 'front view of modern aggressive car in dark studio, bright golden yellow headlights, glossy reflections, premium commercial atmosphere';
      assignedImage = AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta;
      imageLayout = 'full-bleed';
    }

    return {
      ...slide,
      image: assignedImage,
      imagePrompt,
      imageLayout
    };
  });

  return {
    agent: 'VisualPromptAgent',
    status: 'success',
    data: {
      slides: slidesWithImages,
      artDirection: {
        lighting: 'Studio Rim Light (RPM Yellow #FFC400)',
        background: 'Dark Steel #15181C',
        quality: '8K Hyperrealistic Studio Asset'
      }
    }
  };
}
