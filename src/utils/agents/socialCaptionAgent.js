/**
 * Subagent 4: Social Caption & SEO Strategist (SocialCaptionAgent)
 * Crafts high-converting Instagram caption with geo-targeted hashtags and WhatsApp CTA.
 */

export function runSocialCaptionAgent(trendData, copywriterData, options = {}) {
  const { detectedHook, systemCategory } = trendData;
  const { title } = copywriterData;

  const categoryHashtags = {
    frenos: '#FrenosChile #PastillasDeFreno #DiscosDeFreno #FrenosNuevos',
    embrague: '#EmbragueChile #KitDeEmbrague #ClutchChile #TransmisionChile',
    suspension: '#SuspensionChile #AmortiguadoresChile #TrenDelantero',
    electrico: '#ElectricidadAutomotriz #BujiasChile #AlternadorChile',
    motor: '#MotorChile #DistribucionChile #BombaDeAgua',
    general: '#MecanicaAutomotriz #MantencionPreventiva #MecanicaChile'
  };

  const specificTags = categoryHashtags[systemCategory] || categoryHashtags.general;

  const caption = [
    `🚗 ${title || detectedHook}`,
    '',
    '¿Has notado alguno de estos síntomas en tu vehículo?',
    '',
    'En Repuestos RPM te ayudamos a diagnosticar y cotizar la pieza 100% nueva y compatible con tu vehículo antes de que cause una pana mayor.',
    '',
    '📲 Cotiza al instante por WhatsApp al +56 9 7546 7525 con:',
    '👉 Marca, Modelo, Año y Cilindrada del motor.',
    '',
    '📍 Locales Comerciales con Retiro Inmediato:',
    '• Quilpué: Chorrillos 782',
    '• Viña del Mar: Local 11, Galería San Antonio',
    '',
    `#RepuestosRPM #RepuestosNuevos #Quilpue #VinaDelMar #Valparaiso #AutosChile ${specificTags}`
  ].join('\n');

  return {
    agent: 'SocialCaptionAgent',
    status: 'success',
    data: {
      caption,
      primaryCTA: 'WhatsApp (+56 9 7546 7525)',
      geoTargeting: ['Quilpué', 'Viña del Mar', 'Valparaíso', 'Chile']
    }
  };
}
