import { AUTOMOTIVE_IMAGE_PRESETS } from '../utils/aiEngine.js';

export const AUTOMOTIVE_PRESETS = [
  {
    id: 'frenos-5-senales',
    title: '5 Señales de que tus Frenos están por Morir',
    category: 'Frenos y Seguridad',
    source: 'Viral Instagram Hook (#Outlier)',
    slides: [
      {
        type: 'hook',
        eyebrow: 'SEGURIDAD VITAL · REPUESTOS RPM',
        title: '5 SEÑALES DE QUE TUS FRENOS ESTÁN POR MORIR',
        subtitle: 'Ignorar el número 4 puede destruir tus discos y duplicar el costo de la reparación.',
        highlightText: '5 SEÑALES',
        badge: 'ALERTA MECÁNICA',
        image: AUTOMOTIVE_IMAGE_PRESETS.frenos_disco,
        imagePrompt: 'cinematic studio photography of isolated automotive ventilated brake rotor and caliper, yellow rim lighting, dark titanium background',
        imageLayout: 'card-3d',
        footerNote: 'Desliza para revisar tu auto 👉'
      },
      {
        type: 'point',
        stepNumber: '01',
        title: 'CHIRRIDO METÁLICO AL FRENAR',
        description: 'Las pastillas tienen un testigo acústico. Si suena fierro con fierro, la pastilla ya no tiene material de fricción y está rayando el disco.',
        badge: 'FRECUENCIA ALTA',
        image: AUTOMOTIVE_IMAGE_PRESETS.frenos_nuevo,
        imagePrompt: 'close-up photo of new vs worn brake pads on dark table, studio light',
        imageLayout: 'card-3d',
        keyTakeaway: 'Reemplazo inmediato de pastillas antes de perder el disco.'
      },
      {
        type: 'point',
        stepNumber: '02',
        title: 'VIBRACIÓN EN EL VOLANTE O PEDAL',
        description: 'Si al presionar el freno sientes pulsaciones en el pedal o el volante tiembla, tus discos de freno están alabeados por exceso de calor.',
        badge: 'DESGASTE TÉRMICO',
        image: AUTOMOTIVE_IMAGE_PRESETS.taller_diagnostico,
        imagePrompt: 'mechanic measuring brake disc thickness in workshop, dramatic lighting',
        imageLayout: 'card-3d',
        keyTakeaway: 'Requiere cambio de discos nuevos o rectificación.'
      },
      {
        type: 'point',
        stepNumber: '03',
        title: 'PEDAL DE FRENO ESPONJOSO O BAJO',
        description: 'Pisas el pedal y se va al fondo con poca resistencia. Significa aire en el circuito hidráulico, líquido degradado o fuga en los cálipers.',
        badge: 'PELIGRO INMEDIATO',
        image: AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
        imagePrompt: 'engine bay brake fluid master cylinder with dot4 reservoir',
        imageLayout: 'card-3d',
        keyTakeaway: 'Purgado del sistema + líquido DOT4 nuevo.'
      },
      {
        type: 'point',
        stepNumber: '04',
        title: 'EL AUTO SE CARGA HACIA UN LADO',
        description: 'Al frenar en línea recta el vehículo tira hacia un costado. Ocurre cuando un cáliper se traba o los flexibles de freno están obstruidos.',
        badge: 'ESTABILIDAD',
        image: AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador,
        imagePrompt: 'car suspension and wheel hub assembly close up, high quality studio light',
        imageLayout: 'card-3d',
        keyTakeaway: 'Revisión urgente de mordaza y flexibles de freno.'
      },
      {
        type: 'cta',
        eyebrow: '¿BUSCAS PASTILLAS O DISCOS NUEVOS?',
        title: 'COTIZA EL REPUESTO EXACTO PARA TU AUTO',
        subtitle: 'Envíame por WhatsApp tu Marca, Modelo, Año y Motor. Revisamos compatibilidad y disponibilidad en minutos.',
        ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
        locations: '📍 Quilpué (Chorrillos 782) · Viña del Mar (Local 11, Galería San Antonio)',
        badge: 'REPUESTOS 100% NUEVOS',
        image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
        imagePrompt: 'luxury modern car in dark studio with yellow headlights and reflections',
        imageLayout: 'full-bleed'
      }
    ],
    caption: '⚠️ 5 Señales de que tus frenos necesitan cambio urgente.\n\nIgnorar los ruidos o el pedal esponjoso pone en riesgo tu seguridad y daña los discos.\n\n📲 Escríbenos al WhatsApp +56 9 7546 7525 con tu Marca, Modelo y Año para cotizar pastillas y discos nuevos garantizados.\n\n📍 Locales en Quilpué y Viña del Mar.\n\n#RepuestosRPM #FrenosAutos #MecanicaChile #Quilpue #ViñadelMar #RepuestosNuevos'
  },
  {
    id: 'embrague-muerte-anunciada',
    title: 'Kit de Embrague: Cuándo Cambiarlo Antes de Quedar en Pana',
    category: 'Transmisión y Motor',
    source: 'Viral TikTok/Reels Script (#SortFeed)',
    slides: [
      {
        type: 'hook',
        eyebrow: 'GUÍA TÉCNICA · REPUESTOS RPM',
        title: '¿CÓMO SABER SI TU EMBRAGUE ESTÁ POR MORIR?',
        subtitle: '3 pruebas simples que puedes hacer hoy mismo antes de quedarte botado en subida.',
        highlightText: 'EMBRAGUE',
        badge: 'PANA EVITABLE',
        image: AUTOMOTIVE_IMAGE_PRESETS.embrague_transmision,
        imagePrompt: 'isolated brand new car clutch kit with pressure plate and release bearing, dark background, yellow rim light',
        imageLayout: 'card-3d',
        footerNote: 'Guarda este post para tu próxima revisión 💾'
      },
      {
        type: 'point',
        stepNumber: '01',
        title: 'EL MOTOR SE ACELERA PERO EL AUTO NO AVANZA',
        description: 'Pisas el acelerador a fondo, las RPM suben de golpe pero la velocidad apenas aumenta. El disco de embrague está patinando por desgaste de fricción.',
        badge: 'PATINAMIENTO',
        image: AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
        imagePrompt: 'car tachometer revving high rpm close up',
        imageLayout: 'card-3d',
        keyTakeaway: 'El forro del disco llegó a su límite de vida útil.'
      },
      {
        type: 'point',
        stepNumber: '02',
        title: 'PEDAL DURO COMO PIEDRA O CON CRUJIDO',
        description: 'Si para presionar el pedal necesitas hacer demasiada fuerza, el diafragma de la prensa ha perdido elasticidad y dañará el bombín.',
        badge: 'PRENSA FATIGADA',
        image: AUTOMOTIVE_IMAGE_PRESETS.taller_diagnostico,
        imagePrompt: 'clutch pedal mechanism automotive footwell',
        imageLayout: 'card-3d',
        keyTakeaway: 'Prensa fatigada termina quebrando la piola o bomba hidráulica.'
      },
      {
        type: 'point',
        stepNumber: '03',
        title: 'DIFICULTAD PARA ENTRAR 1ª Y RETROCESO',
        description: 'Cuesta meter cambios desde neutro o la reversa "raspa". La prensa no desacopla completamente el disco del volante de motor.',
        badge: 'DESACOPLE INCOMPLETO',
        image: AUTOMOTIVE_IMAGE_PRESETS.bujias_electrico,
        imagePrompt: 'manual transmission gear shifter inside modern car cockpit',
        imageLayout: 'card-3d',
        keyTakeaway: 'Revisa también la bomba y bombín auxiliar de embrague.'
      },
      {
        type: 'cta',
        eyebrow: '¿NECESITAS KIT DE EMBRAGUE NUEVO?',
        title: 'COTIZA TU KIT CON ASESORÍA EXPERTA',
        subtitle: 'Trabajamos kits nuevos para Chery, Chevrolet, Toyota, Nissan, Hyundai, Suzuki, Great Wall, MG y más.',
        ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
        locations: '📍 Quilpué y Viña del Mar · Pedidos especiales en 2 a 3 días hábiles',
        badge: 'REPUESTOS RPM',
        image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
        imagePrompt: 'sleek performance car studio shot with yellow reflections',
        imageLayout: 'full-bleed'
      }
    ],
    caption: '🚗 ¿Sientes el pedal duro o tu auto patina en las subidas?\n\n💡 Consejo RPM: Cambia siempre el kit completo (disco, prensa y rodamiento) para evitar pagar mano de obra dos veces.\n\n📲 Cotiza tu kit nuevo por WhatsApp al +56 9 7546 7525.\n\n#RepuestosRPM #KitEmbrague #Mecanica #Quilpue #VinaDelMar'
  },
  {
    id: 'distribucion-rotura-valvulas',
    title: 'Kit de Distribución: No Cambiarlo Te Costará un Motor Nuevo',
    category: 'Motor y Distribución',
    source: 'Viral Sort Feed (#HookPeligro)',
    slides: [
      {
        type: 'hook',
        eyebrow: 'RIESGO CRÍTICO · REPUESTOS RPM',
        title: 'EL ERROR DE $1.500.000 QUE MUCHOS COMETEN AL NO CAMBIAR LA CORREA',
        subtitle: 'Si se corta en marcha, los pistones doblan las válvulas al instante. Descubre cuándo cambiarla.',
        highlightText: 'DISTRIBUCIÓN',
        badge: 'PELIGRO DE MOTOR',
        image: AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
        imagePrompt: 'car engine timing belt with pulleys close up studio lighting',
        imageLayout: 'card-3d',
        footerNote: 'Desliza antes de que sea demasiado tarde 👉'
      },
      {
        type: 'point',
        stepNumber: '01',
        title: 'CUMPLE KILOMETRAJE O TIEMPO LÍMITE',
        description: 'La correa de distribución tiene una vida útil estricta: cada 50.000 a 80.000 km o cada 4 años. El caucho se reseca aunque uses poco el auto.',
        badge: 'VIDA ÚTIL',
        image: AUTOMOTIVE_IMAGE_PRESETS.taller_diagnostico,
        imagePrompt: 'mechanic inspecting engine belt tension in workshop',
        imageLayout: 'card-3d',
        keyTakeaway: 'Reemplaza siempre el kit completo: correa, tensores y bomba de agua.'
      },
      {
        type: 'point',
        stepNumber: '02',
        title: 'CHIRRIDO O ZUMBIDO EN EL MOTOR',
        description: 'Un rodamiento tensor desgastado o la polea guía trabada generan fricción excesiva y pueden cortar la correa en cualquier acelerada.',
        badge: 'RUIDO TENSOR',
        image: AUTOMOTIVE_IMAGE_PRESETS.motor_turbo,
        imagePrompt: 'car engine compartment detailed view',
        imageLayout: 'card-3d',
        keyTakeaway: 'Nunca cambies solo la correa si el tensor tiene holgura.'
      },
      {
        type: 'point',
        stepNumber: '03',
        title: 'FUGAS DE REFRIGERANTE O ACEITE',
        description: 'Si el retén de cigüeñal o la bomba de agua filtran sobre la correa, los químicos degradan el caucho hasta desgranar los dientes.',
        badge: 'DEGRADACIÓN QUÍMICA',
        image: AUTOMOTIVE_IMAGE_PRESETS.frenos_disco,
        imagePrompt: 'automotive fluid leak inspection',
        imageLayout: 'card-3d',
        keyTakeaway: 'Corrige fugas de retenes en el mismo desarme.'
      },
      {
        type: 'cta',
        eyebrow: '¿BUSCAS KIT DE DISTRIBUCIÓN O BOMBA DE AGUA?',
        title: 'COTIZA TU KIT 100% NUEVO Y GARANTIZADO',
        subtitle: 'Envíanos tu Patente o Marca, Modelo, Año y Motor. Confirmamos compatibilidad de inmediato.',
        ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
        locations: '📍 Retiro en Quilpué (Chorrillos 782) y Viña del Mar (Galería San Antonio)',
        badge: 'REPUESTOS RPM',
        image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
        imagePrompt: 'supercar front in dark garage with yellow accents',
        imageLayout: 'full-bleed'
      }
    ],
    caption: '⚠️ ¿Sabías que cortar la correa de distribución puede destruir la culata y doblar válvulas?\n\n💡 En Repuestos RPM te recomendamos cambiar el kit completo con bomba de agua para máxima tranquilidad.\n\n📲 Envíanos tu patente o modelo por WhatsApp al +56 9 7546 7525 para cotizar tu kit nuevo.\n\n📍 Locales en Quilpué y Viña del Mar.\n\n#RepuestosRPM #DistribucionAutomotriz #CorreaDistribucion #MecanicaChile #Quilpue #ViñadelMar'
  },
  {
    id: 'suspension-golpeteos',
    title: '¿Tu Auto Golpea en Baches? Tren Delantero y Amortiguadores',
    category: 'Suspensión y Dirección',
    source: 'Viral TikTok (#Diagnostico)',
    slides: [
      {
        type: 'hook',
        eyebrow: 'CONFORT Y CONTROL · REPUESTOS RPM',
        title: 'RUIDOS Y GOLPETEOS EN BACHES: ¿QUÉ SE ROMPIÓ EN TU TREN DELANTERO?',
        subtitle: 'Identifica si es amortiguador, cazoleta, bieleta o bandeja antes de que desgaste tus neumáticos.',
        highlightText: 'TREN DELANTERO',
        badge: 'DIAGNÓSTICO RÁPIDO',
        image: AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador,
        imagePrompt: 'car strut suspension assembly isolated on dark background',
        imageLayout: 'card-3d',
        footerNote: 'Desliza para revisar cada componente 👉'
      },
      {
        type: 'point',
        stepNumber: '01',
        title: 'CLONK SECO AL PASAR LOMOS DE TORO',
        description: 'La cazoleta o rodamiento de amortiguador cedió. Produce un golpe seco en la parte superior y hace que la dirección se sienta imprecisa.',
        badge: 'CAZOLETA FATIGADA',
        image: AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador,
        imagePrompt: 'strut mount and shock absorber close up',
        imageLayout: 'card-3d',
        keyTakeaway: 'Revisa siempre cazoletas al cambiar amortiguadores.'
      },
      {
        type: 'point',
        stepNumber: '02',
        title: 'GOLPETEO METÁLICO CONTINUO EN PAVIMENTO IRREGULAR',
        description: 'Bieletas de barra estabilizadora con juego en sus rótulas. Es un repuesto económico cuyo cambio elimina el 80% de los ruidos molestos.',
        badge: 'BIELETAS ESTABILIZADORAS',
        image: AUTOMOTIVE_IMAGE_PRESETS.taller_diagnostico,
        imagePrompt: 'sway bar link stabilizer bar mechanism in car suspension',
        imageLayout: 'card-3d',
        keyTakeaway: 'Cambio rápido y de bajo costo para recuperar silencio de marcha.'
      },
      {
        type: 'point',
        stepNumber: '03',
        title: 'EL AUTO REBOTA O SE BALANCEA EN CURVAS',
        description: 'El amortiguador perdió su aceite o gas hidráulico. Aumenta la distancia de frenado hasta un 20% y gasta neumáticos de forma despareja.',
        badge: 'AMORTIGUADOR REVENTADO',
        image: AUTOMOTIVE_IMAGE_PRESETS.suspension_amortiguador,
        imagePrompt: 'gas shock absorber with yellow spring suspension',
        imageLayout: 'card-3d',
        keyTakeaway: 'Se deben cambiar siempre por pares (eje delantero o trasero).'
      },
      {
        type: 'cta',
        eyebrow: '¿NECESITAS AMORTIGUADORES, BIELETAS O BANDEJAS?',
        title: 'COTIZA EL TREN DELANTERO COMPLETO',
        subtitle: 'Envíanos Marca, Modelo, Año y Cilindrada. Disponibilidad inmediata y pedidos especiales.',
        ctaButtonText: 'COTIZAR POR WHATSAPP (+56 9 7546 7525)',
        locations: '📍 Quilpué: Chorrillos 782 · Viña del Mar: Galería San Antonio Local 11',
        badge: 'REPUESTOS NUEVOS',
        image: AUTOMOTIVE_IMAGE_PRESETS.whatsapp_cta,
        imagePrompt: 'modern performance vehicle in showroom dark aesthetic',
        imageLayout: 'full-bleed'
      }
    ],
    caption: '🚗 ¿Sientes golpeteos al pasar por adoquines o baches?\n\nRecupera el confort y la estabilidad de tu auto con repuestos 100% nuevos para tren delantero.\n\n📲 Cotiza bieletas, amortiguadores y bandejas por WhatsApp al +56 9 7546 7525.\n\n📍 Quilpué y Viña del Mar.\n\n#RepuestosRPM #SuspensionChile #TrenDelantero #Amortiguadores #MecanicaChile'
  }
];

