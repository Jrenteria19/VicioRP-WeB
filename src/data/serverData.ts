export interface RuleSectionItem {
  id: string;
  category: 'VFR Bomberos' | 'VMS Médicos' | 'Ilegales' | 'Conceptos de Rol' | 'Códigos 10' | 'VPD Policía';
  title: string;
  badge?: string;
  badgeType?: 'default' | 'danger' | 'warning' | 'success' | 'info';
  summary: string;
  details: string[];
  doList?: string[];
  dontList?: string[];
  subsections?: {
    title: string;
    level?: 'leve' | 'grave' | 'muy_grave' | 'normal';
    items: string[];
    sanction?: string;
  }[];
}

export interface RadioCode {
  code: string;
  meaning: string;
  usage: string;
}

export const SERVER_CONFIG = {
  name: "VicioRP",
  platform: "FIVE M",
  tagline: "El servidor de GTA V Roleplay en español que estabas buscando",
  discordUrl: "https://discord.gg/CYBx2ZWgjT",
  version: "v4.5 FiveM",
};

export const ADMIN_DISCLAIMER = {
  title: "Aviso Administrativo Importante",
  points: [
    "El desconocimiento de cualquier normativa no te deslinda de las consecuencias y sanciones que ellas conllevan.",
    "El veredicto final e inapelable lo tiene siempre el miembro del Staff / Administrativo a cargo de tu caso.",
    "Procura leer y repasar este reglamento mínimo una vez a la semana, ya que estará sujeto a constantes actualizaciones y mejoras según la evolución de la ciudad."
  ]
};

export const RADIO_CODES: RadioCode[] = [
  { code: "10-4", meaning: "Mensaje Recibido / Entendido", usage: "Confirmación de instrucciones por radio" },
  { code: "10-8", meaning: "En Servicio / Disponible", usage: "Al ingresar a turno y estar listo para llamados" },
  { code: "10-7", meaning: "Fuera de Servicio", usage: "Al terminar el turno o retirarse de la guardia" },
  { code: "10-20", meaning: "Ubicación Actual", usage: "¿Cuál es tu 10-20? o 'Mi 10-20 es Garaje Central'" },
  { code: "10-23", meaning: "En el Lugar / Llegada a la Escena", usage: "Al arribar al punto de la emergencia" },
  { code: "10-76", meaning: "En Camino al Punto", usage: "Respondiendo a una llamada de auxilio" },
  { code: "10-97", meaning: "Llegando a la Escena (Inmediato)", usage: "A escasos metros del objetivo" },
  { code: "10-99", meaning: "EMERGENCIA MÁXIMA / OFICIAL O UNIDAD EN PELIGRO", usage: "Situaciones de riesgo inminente de vida" },
];

export const ALL_RULES: RuleSectionItem[] = [
  // ==================== 🚒 VFR | VICIO FIRE & RESCUE ====================
  {
    id: "vfr-general",
    category: "VFR Bomberos",
    title: "VFR • Normas Generales y Conducta",
    badge: "Lema: Proteger • Rescatar • Servir",
    badgeType: "warning",
    summary: "Bases de comportamiento ético y profesionalismo para todo miembro del cuerpo de bomberos y rescate.",
    details: [
      "1.1 Todo miembro de VFR deberá mantener una conducta profesional, respetuosa y acorde al Roleplay en todo momento.",
      "1.2 El ingreso a VFR implica la aceptación y cumplimiento estricto de esta normativa y de las reglas generales de Vicio RP.",
      "1.3 Queda terminantemente prohibido utilizar el rango, uniforme, vehículos o equipamiento de VFR para beneficio personal.",
      "1.4 Todo miembro deberá tratar con máximo respeto a civiles, compañeros y a las demás facciones de la ciudad."
    ]
  },
  {
    id: "vfr-servicio",
    category: "VFR Bomberos",
    title: "VFR • Protocolo En Servicio vs Fuera de Servicio",
    badge: "Operativo",
    badgeType: "info",
    summary: "Diferenciación clara de deberes y restricciones al estar con uniforme o de civil.",
    details: [],
    subsections: [
      {
        title: "🟢 En Servicio (10-8)",
        level: "normal",
        items: [
          "Utilizar el uniforme y equipamiento reglamentario correspondiente a su rango.",
          "Mantenerse disponible y alerta ante cualquier despacho de emergencia.",
          "Utilizar únicamente vehículos oficiales autorizados para su rango.",
          "Mantener comunicación activa y disciplinada por radio.",
          "Respetar de forma irrestricta la cadena de mando."
        ]
      },
      {
        title: "⚪ Fuera de Servicio (10-7)",
        level: "normal",
        items: [
          "No utilizar bajo ninguna circunstancia vehículos ni equipamiento oficial de VFR.",
          "No intervenir en situaciones de emergencia civil haciéndose pasar por bombero en funciones.",
          "No utilizar su rango ni credenciales para obtener ventajas, beneficios o inmunidad personal."
        ]
      }
    ]
  },
  {
    id: "vfr-radio",
    category: "VFR Bomberos",
    title: "VFR • Uso de Radio y Códigos 10",
    badge: "Comunicaciones",
    badgeType: "info",
    summary: "La frecuencia de radio de VFR es de uso estrictamente profesional para coordinación de emergencias.",
    details: [
      "La radio será exclusivamente para comunicaciones operativas relacionadas con el servicio.",
      "Uso obligatorio de los Códigos 10 oficiales: 10-4, 10-8, 10-7, 10-20, 10-23, 10-76, 10-97, 10-99."
    ],
    dontList: [
      "Saturar la radio con conversaciones personales o irrelevantes.",
      "Hacer bromas, risas o chistes por frecuencia oficial.",
      "Reproducir sonidos, memes, efectos o música a través del micrófono.",
      "Interrumpir comunicaciones de emergencia o transmisiones de mandos."
    ]
  },
  {
    id: "vfr-vehiculos",
    category: "VFR Bomberos",
    title: "VFR • Parque Vehicular y Conducción",
    badge: "Flota Oficial",
    badgeType: "warning",
    summary: "Normas de resguardo y conducción responsable para camiones de bomberos y unidades de rescate.",
    details: [
      "4.1 Los vehículos de VFR son de uso exclusivo para actividades de servicio y rescate.",
      "4.2 Deberán conducirse con alta responsabilidad, utilizando sirenas y luces de emergencia únicamente cuando se acuda a un llamado real.",
      "4.3 Todo daño mecánico, abolladura o accidente vial deberá ser reportado inmediatamente a los mandos.",
      "4.4 Al terminar la guardia, todas las unidades deben regresar a la estación de bomberos y quedar perfectamente estacionadas."
    ]
  },
  {
    id: "vfr-incendios",
    category: "VFR Bomberos",
    title: "VFR • Protocolo en Incendios y Rescates",
    badge: "Procedimiento",
    badgeType: "danger",
    summary: "Guía paso a paso obligatoria para responder ante siniestros de fuego y siniestros de rescate.",
    details: [
      "Paso 1: Llegar al lugar de los hechos y confirmar estado.",
      "Paso 2: Informar llegada por radio oficial (10-23).",
      "Paso 3: Evaluar la magnitud de la situación y tipo de riesgo.",
      "Paso 4: Establecer un perímetro seguro para evitar víctimas civiles.",
      "Paso 5: Evacuar o rescatar a personas atrapadas cuando las condiciones lo permitan.",
      "Paso 6: Extinguir las llamas o controlar la emergencia técnica.",
      "Paso 7: Solicitar apoyo adicional de policía o EMS si la situación lo requiere.",
      "Paso 8: Informar el cierre del incidente y retorno a base."
    ],
    dontList: [
      "Realizar rescates imposibles desafiando la física o el realismo (Powergaming).",
      "Entrar innecesariamente en situaciones de fuego extremo sin equipamiento ignífugo.",
      "Provocar incendios o crear emergencias falsas únicamente para generar actividad ficticia."
    ]
  },
  {
    id: "vfr-coordinacion",
    category: "VFR Bomberos",
    title: "VFR • Coordinación Interfaccional",
    badge: "Cooperación",
    badgeType: "success",
    summary: "Reparto de competencias con Policía (VPD) y Servicios Médicos (VMS).",
    details: [
      "🚓 Policía (VPD): Responsables de la seguridad perimetral, control de tránsito y neutralización de amenazas armadas.",
      "🚑 EMS (VMS): Responsables de la atención médica, estabilización y traslado de heridos o intoxicados.",
      "🚒 VFR: Responsables de la extinción de incendios, rescates técnicos, cortes de vehículos y emergencias de materiales peligrosos.",
      "Principio: Cada facción deberá respetar escrupulosamente las funciones, autonomía y competencias de las demás."
    ]
  },
  {
    id: "vfr-jerarquia",
    category: "VFR Bomberos",
    title: "VFR • Escalafón Jerárquico y Ascensos",
    badge: "Cadena de Mando",
    badgeType: "default",
    summary: "Organigrama de rangos dentro de Vicio Fire & Rescue.",
    details: [
      "Cadete → Bombero → Bombero II → Sargento → Teniente → Capitán → Subjefe → Jefe de Bomberos",
      "Los ascensos dependerán de la actividad demostrada, desempeño en emergencias, disciplina, calidad de rol y capacidad de trabajo en equipo.",
      "Nota clave: La antigüedad por sí sola no garantiza ningún ascenso; se premia la excelencia y el liderazgo."
    ]
  },
  {
    id: "vfr-disciplina",
    category: "VFR Bomberos",
    title: "VFR • Régimen Disciplinario y Sanciones",
    badge: "Régimen Interno",
    badgeType: "danger",
    summary: "Catálogo de faltas clasificadas según su gravedad con sus respectivas sanciones administrativas.",
    details: [],
    subsections: [
      {
        title: "🟡 Faltas Leves",
        level: "leve",
        items: [
          "Uso incorrecto o descuidado de la radio.",
          "Descuidar la limpieza y estado de los vehículos oficiales.",
          "Incumplimientos menores de horario o uniformidad.",
          "Conducta poco profesional o desatenta con civiles."
        ],
        sanction: "Sanción: Advertencia formal por escrito o suspensión temporal de servicio."
      },
      {
        title: "🟠 Faltas Graves",
        level: "grave",
        items: [
          "Abuso indebido de vehículos de emergencia o equipamiento especial.",
          "Desobediencia reiterada a las órdenes de oficiales de mayor rango.",
          "Abandono injustificado de una emergencia activa.",
          "Romper el rol deliberadamente durante una intervención."
        ],
        sanction: "Sanción: Suspensión de empleo, degradación de rango o expulsión directa."
      },
      {
        title: "🔴 Faltas Muy Graves",
        level: "muy_grave",
        items: [
          "Corrupción dentro de la institución.",
          "Abuso flagrante de autoridad.",
          "Uso de recursos o vehículos de VFR para actividades ilegales o delictivas.",
          "Filtración de información interna confidencial a civiles o bandas.",
          "Perjudicar deliberadamente la imagen o operatividad de la facción."
        ],
        sanction: "Sanción: Expulsión irrevocable, inclusión en lista negra y reporte administrativo."
      }
    ]
  },
  {
    id: "vfr-principios",
    category: "VFR Bomberos",
    title: "VFR • Los 5 Principios Fundamentales",
    badge: "Valores",
    badgeType: "warning",
    summary: "Pilares morales innegociables para portar la placa de bombero.",
    details: [
      "🔥 VALOR — Actuar con valentía y responsabilidad ante las situaciones de mayor peligro.",
      "🛡️ HONOR — Mantener una conducta profesional intachable dentro y fuera del cuartel.",
      "🤝 SERVICIO — Dedicación y vocación constante para socorrer a toda la ciudadanía.",
      "🚒 DISCIPLINA — Respeto absoluto a los protocolos de seguridad, órdenes y jerarquía.",
      "❤️ RESPETO — Tratar con dignidad humana a compañeros, pacientes y ciudadanos sin distinción."
    ]
  },

  // ==================== 🚑 VMS | VICIO MEDICAL SERVICES ====================
  {
    id: "vms-hotzones",
    category: "VMS Médicos",
    title: "VMS • 1. Hotzones (Zonas de Conflicto Activo)",
    badge: "Seguridad Vital",
    badgeType: "danger",
    summary: "Protocolo de aproximación e ingreso a zonas de tiroteo.",
    details: [
      "No se entra bajo ningún concepto a un área de tiroteo activo hasta que la policía (VPD) haya asegurado completamente el perímetro y dé el visto bueno formal.",
      "Si los paramédicos escuchan disparos al llegar, deberán replegarse inmediatamente a una distancia segura y esperar confirmación policial."
    ]
  },
  {
    id: "vms-valorar-vida",
    category: "VMS Médicos",
    title: "VMS • 2. Valorar la Vida (VLV Médica)",
    badge: "Regla de Oro",
    badgeType: "danger",
    summary: "Reacción y conducta obligatoria al ser encañonado o amenazado.",
    details: [
      "Si te encañonan o secuestran, debes cooperar plenamente respetando el entorno y las limitaciones de tu personaje.",
      "Un médico no es un militar de asalto; debe actuar con el miedo natural y preservar su integridad física."
    ]
  },
  {
    id: "vms-neutralidad",
    category: "VMS Médicos",
    title: "VMS • 3. Neutralidad Absoluta",
    badge: "Ética Médica",
    badgeType: "info",
    summary: "Independencia e imparcialidad total frente a todas las facciones.",
    details: [
      "Un miembro de VMS no debe pertenecer a ningún bando ni organización criminal.",
      "No participa en tiroteos bajo ninguna circunstancia.",
      "No porta armas de fuego de ningún tipo.",
      "No auxilia de forma preferencial o encubierta a facciones ilegales en zonas de conflicto activo."
    ]
  },
  {
    id: "vms-prioridad-vida",
    category: "VMS Médicos",
    title: "VMS • 4. Prioridad de Vida y Coordinación Policial",
    badge: "Juramento Hipocrático",
    badgeType: "success",
    summary: "El valor sagrado de la vida de cualquier ser humano en la ciudad.",
    details: [
      "La vida de cualquier ciudadano es la máxima prioridad del hospital, sin importar si es delincuente, civil inocente o agente de policía.",
      "En conjunto con la regla de Hotzones, se debe respetar el roleo de la policía (VPD) y atender a los heridos solamente cuando los agentes aseguren el área."
    ]
  },
  {
    id: "vms-despachos",
    category: "VMS Médicos",
    title: "VMS • 5. Llamadas y Despachos de Emergencia",
    badge: "Triage",
    badgeType: "info",
    summary: "Criterios para responder y ordenar las alertas médicas en el mapa.",
    details: [
      "Las respuestas a alertas en el mapa deben atenderse por orden de llegada o por gravedad del cuadro médico.",
      "Se utilizará Código 3 (luces y sirenas continuas) exclusivamente para tiroteos, paros cardíacos y accidentes de tráfico de extrema gravedad."
    ]
  },
  {
    id: "vms-parque-vehicular",
    category: "VMS Médicos",
    title: "VMS • 6. Parque Vehicular y Rendimiento",
    badge: "Optimización",
    badgeType: "warning",
    summary: "Cuidado de ambulancias y vehículos de rescate hospitalarios.",
    details: [
      "Todo vehículo de emergencia debe devolverse obligatoriamente al garaje del hospital al concluir la guardia.",
      "Esta medida evita que queden ambulancias abandonadas por la ciudad afectando el rendimiento y FPS de los demás jugadores."
    ]
  },
  {
    id: "vms-confidencialidad",
    category: "VMS Médicos",
    title: "VMS • 7. Confidencialidad y Secreto Médico",
    badge: "Privacidad",
    badgeType: "default",
    summary: "Protección rigurosa de los historiales y diagnósticos clínicos.",
    details: [
      "Queda terminantemente prohibido compartir información sobre la identidad, estado de salud o resultados toxicológicos de los pacientes con terceras personas.",
      "Excepción: Solo se entregará información médica ante una orden judicial explícita o requerimiento legal de la policía."
    ]
  },
  {
    id: "vms-facturacion",
    category: "VMS Médicos",
    title: "VMS • 8. Facturación Obligatoria y Radio",
    badge: "Administrativo",
    badgeType: "info",
    summary: "Cobro de aranceles y enlace radial conjunto con las fuerzas de seguridad.",
    details: [
      "Facturación: Todo servicio médico o quirúrgico debe ser facturado conforme a la tabla de tarifas vigentes del hospital.",
      "Uso de Radio: Es obligatorio para comunicarse con el Director o rango más alto en turno y entre compañeros.",
      "Operaciones Conjuntas: En operativos masivos nos conectaremos al canal unificado junto con la LSPD/VPD."
    ]
  },

  // ==================== 🔪 VICIO RP | REGLAMENTO DE FACCIONES E ILEGALES ====================
  {
    id: "ilegal-general",
    category: "Ilegales",
    title: "Ilegales • 1. Principios Generales y FairPlay",
    badge: "FairPlay Obligatorio",
    badgeType: "warning",
    summary: "La normativa delictiva tiene como fin mantener un equilibrio justo entre civiles, delincuentes y policías.",
    details: [
      "FairPlay: El objetivo primordial del rol ilegal es generar historias interesantes, tensión dramática y narrativa, no 'ganar' a toda costa. Se prohíbe el comportamiento tóxico y antideportivo.",
      "Cop Baiting: Queda estrictamente prohibido provocar a la policía de manera absurda (derrapar frente a comisarías, tocar bocina, insultar sin motivo) solo para forzar una persecución o tiroteo sin trasfondo de rol previo."
    ]
  },
  {
    id: "ilegal-agrupacion",
    category: "Ilegales",
    title: "Ilegales • Límites de Agrupación (Pico de Banda)",
    badge: "Límites Estrictos",
    badgeType: "danger",
    summary: "Cantidad máxima de participantes permitidos en actos delictivos por bando.",
    details: [],
    subsections: [
      {
        title: "Robos Menores y Conflictos de Calle",
        level: "normal",
        items: [
          "Mínimo: 1 persona por bando.",
          "Máximo: 4 personas por bando.",
          "Aplica a: Robos a civiles, atracos a tiendas de conveniencia, peleas callejeras."
        ]
      },
      {
        title: "Robos Mayores y Eventos Ilícitos",
        level: "grave",
        items: [
          "Mínimo: 2 personas por bando.",
          "Máximo: 6 personas por bando.",
          "Aplica a: Banco Central, Joyería Vangelico, yates, sedes federales (salvo eventos especiales autorizados por Staff)."
        ]
      }
    ]
  },
  {
    id: "ilegal-armas",
    category: "Ilegales",
    title: "Ilegales • Restricción Territorial de Armamento",
    badge: "Normativa de Calibres",
    badgeType: "danger",
    summary: "Regulación de uso de armas automáticas y armamento de donación VIP.",
    details: [],
    subsections: [
      {
        title: "Armas Automáticas (Subfusiles / Rifles de Asalto)",
        level: "grave",
        items: [
          "❌ PROHIBIDAS EN LA CIUDAD (ZONA SUR): Queda estrictamente prohibido el uso, porte visible o tiroteos con armas automáticas en el área urbana de Los Santos.",
          "✅ PERMITIDAS EN EL NORTE: Únicamente se podrán utilizar en la zona norte del mapa (Sandy Shores, Paleto Bay y áreas rurales despobladas)."
        ]
      },
      {
        title: "Armamento VIP",
        level: "grave",
        items: [
          "❌ PROHIBIDO CONTRA LA POLICÍA: Queda terminantemente prohibido emplear armamento VIP en tiroteos o enfrentamientos contra las fuerzas policiales.",
          "✅ Excepciones: Permitido exclusivamente dentro de eventos especiales o situaciones de igualdad de condiciones autorizadas expresamente por la administración."
        ]
      }
    ]
  },
  {
    id: "ilegal-cateo-manos",
    category: "Ilegales",
    title: "Ilegales • Cateo: Manos Arriba Obligatorio",
    badge: "Cateo",
    badgeType: "warning",
    summary: "Al ser bajado, el jugador debe levantar las manos sí o sí para poder ser cateado.",
    details: [
      "Al ser bajado (obligado a descender del vehículo) o reducido durante un acto delictivo, el jugador debe levantar las manos sí o sí para que se le pueda catear.",
      "El cateo solo es válido cuando la víctima levanta las manos y coopera con la escena; no se puede catear a alguien que no lo haya hecho.",
      "Si el jugador no levanta las manos, no puede ser cateado y la escena debe resolverse mediante el rol."
    ],
    doList: [
      "✅ Levantar las manos al ser bajado para permitir el cateo.",
      "✅ Cooperar con la escena de cateo manteniendo el rol en todo momento."
    ],
    dontList: [
      "❌ Catear a un jugador que no ha levantado las manos.",
      "❌ Negarse a levantar las manos y aun así pretender participar del cateo."
    ]
  },
  {
    id: "ilegal-arma-normal-cateo",
    category: "Ilegales",
    title: "Ilegales • Arma Normal Obligatoria para Cateo",
    badge: "Armas",
    badgeType: "danger",
    summary: "Todo delictivo debe portar un arma normal para poder ser cateado; no se puede usar solamente armas VIP.",
    details: [
      "Todo jugador que rolee como delictivo necesita portar un arma normal (no VIP) para que el cateo sea válido.",
      "No se puede usar únicamente armas VIP para rolear el delito ni para justificar el cateo.",
      "El arma normal debe estar portada/equipada por el personaje durante la escena delictiva."
    ],
    doList: [
      "✅ Portar un arma normal durante el acto delictivo para que el cateo sea válido.",
      "✅ Usar el arma normal como parte del rol y no solo armamento VIP."
    ],
    dontList: [
      "❌ Rolear un delito armado usando solamente armas VIP.",
      "❌ Pretender ser cateado sin portar un arma normal."
    ]
  },
  {
    id: "ilegal-atracos",
    category: "Ilegales",
    title: "Ilegales • 2. Atracos, Rehenes y Negociación",
    badge: "Atracos",
    badgeType: "warning",
    summary: "Reglas para asaltos organizados, manejo ético de rehenes y tiempos de recarga.",
    details: [
      "Rehenes Reales: Debe existir interacción genuina con el rehén. Queda terminantemente prohibido usar 'rehenes falsos' (amigos, conocidos o miembros de la misma banda disfrazados de civiles).",
      "Vida del Rehén: No se puede ejecutar a un rehén si este cumple con todas las exigencias y coopera de forma realista con los asaltantes.",
      "Prioridad de Negociación: Siempre se debe dar prioridad absoluta a la negociación pacífica con el negociador policial antes de abrir fuego.",
      "Beneficios por Rehén: Por cada rehén retenido se puede pactar un beneficio razonable (ej: huida limpia, no uso de clavos/pinchos, tiempo de ventaja)."
    ],
    subsections: [
      {
        title: "⏱️ CoolDown Obligatorio (Tiempos de Espera)",
        level: "normal",
        items: [
          "Robos a tiendas locales: 30 minutos de espera mínima para la misma agrupación.",
          "Robos grandes (Bancos / Joyería): 2 horas de espera mínima para la misma agrupación."
        ]
      }
    ]
  },
  {
    id: "ilegal-secuestros",
    category: "Ilegales",
    title: "Ilegales • 3. Secuestros y Muertes (PKT / CK)",
    badge: "Extrema Gravedad",
    badgeType: "danger",
    summary: "Condiciones indispensables para secuestrar civiles o policías y aplicar muertes de personaje.",
    details: [
      "Secuestro a Civil: Requiere un motivo de rol sólido y comprobable + un mínimo de 2 policías en servicio en la ciudad.",
      "Secuestro a Policía: Requiere una razón de peso extrema + un mínimo de 4 agentes de policía activos en servicio.",
      "Player Kill Total (PKT): Pérdida de memoria específica e irreversible sobre los sucesos de la escena delictiva en cuestión.",
      "Character Kill (CK): Muerte definitiva y eliminación del personaje. Requiere la presentación y aprobación previa de un ticket formal ante el Staff de Vicio RP."
    ]
  },
  {
    id: "ilegal-zonas-seguras",
    category: "Ilegales",
    title: "Ilegales • 4. Zonas Seguras y Anti-Campeo",
    badge: "Zonas Protegidas",
    badgeType: "danger",
    summary: "Lugares donde está prohibido cualquier acto hostil y protección de zonas de farmeo.",
    details: [
      "Zonas Seguras (SafeZones): Queda prohibido iniciar cualquier acto delictivo (atracar, secuestrar, apuntar o disparar) dentro o hacia: Comisaría de Policía, Hospitales, Garajes públicos, Punto de Spawn inicial, Inmobiliaria y Sedes administrativas.",
      "Anti-Campeo: Prohibido esperar o acampar en puntos de recolección, procesamiento o venta de drogas y materiales para asaltar sistemáticamente a los jugadores sin una historia o rol previo."
    ]
  },
  {
    id: "ilegal-staff",
    category: "Ilegales",
    title: "Ilegales • 5. Intervención y Normativa de Staff",
    badge: "Transparencia Total",
    badgeType: "info",
    summary: "Normas de estricta neutralidad e imparcialidad para moderadores y administradores.",
    details: [
      "No Pausar el Rol: Ningún miembro del Staff pausará o intervendrá en una escena delictiva en curso, salvo por faltas gravísimas (uso flagrante de hacks o exploits evidentes). Toda revisión se gestionará mediante ticket con grabación (clip) al finalizar la escena.",
      "Imparcialidad Absoluta: Integrantes del Staff que participen como jugadores tienen terminantemente prohibido utilizar comandos administrativos (revivir, spectate, noclip, spawn de armas/autos) a favor de su banda. Todas las acciones se auditan en consola.",
      "Sanciones Especiales: Cualquier abuso de privilegios administrativos en roles delictivos conllevará una sanción ejemplar que puede implicar la expulsión directa del equipo administrativo."
    ]
  },

  // ==================== 🎭 CONCEPTOS GENERALES DE ROL ====================
  {
    id: "gen-rp-ic-ooc",
    category: "Conceptos de Rol",
    title: "Conceptos • RP, IC y OOC",
    badge: "Fundamento",
    badgeType: "default",
    summary: "Separar la vida real del personaje en el servidor.",
    details: [
      "Roleplay (RP): Interpretar de forma coherente y creíble la personalidad, miedos y decisiones de un personaje ficticio.",
      "In Character (IC): Todo lo que ocurre o se dice dentro del mundo del juego a través de tu personaje.",
      "Out Of Character (OOC): Conversaciones fuera del personaje (tu vida real, problemas técnicos, etc.). Solo permitido mediante chat /b o canales administrativos."
    ],
    doList: [
      "✅ Interpretar miedo cuando te apuntan con un arma, aunque sepas que no te matarán.",
      "✅ Usar /b o Discord para reportar bugs técnicos en vez de romper el rol."
    ],
    dontList: [
      "❌ Hablar de tu vida real por el micrófono del juego (ej: 'ya me tengo que ir a cenar').",
      "❌ Llamar a alguien por su nombre de usuario en vez de su nombre IC."
    ]
  },
  {
    id: "gen-rdm-vdm",
    category: "Conceptos de Rol",
    title: "Conceptos • RDM y VDM",
    badge: "Sanción Inmediata",
    badgeType: "danger",
    summary: "Agresiones sin justificación o uso de autos como armas.",
    details: [
      "Random Deathmatch (RDM): Agredir, disparar o asesinar a otro jugador sin interacción previa ni motivo argumental válido.",
      "Vehicle Deathmatch (VDM): Utilizar vehículos para atropellar, aplastar o embestir deliberadamente a jugadores sin justificación de rol."
    ],
    doList: [
      "✅ Tener una discusión IC previa antes de cualquier agresión física o armada.",
      "✅ Dar oportunidad de reacción al otro jugador antes de usar fuerza letal."
    ],
    dontList: [
      "❌ Disparar a alguien nada más verlo sin mediar palabra (RDM puro).",
      "❌ Atropellar adrede a un grupo de personas con tu auto (VDM)."
    ]
  },
  {
    id: "gen-pg-mg",
    category: "Conceptos de Rol",
    title: "Conceptos • Powergaming y Metagaming",
    badge: "Faltas Graves",
    badgeType: "warning",
    summary: "Fuerzas sobrehumanas o información externa al juego.",
    details: [
      "Powergaming (PG): Hacer cosas imposibles en la vida real (caer de un 4to piso y salir corriendo) o forzar las acciones de otro jugador sin darle chance de responder.",
      "Metagaming (MG): Utilizar información obtenida fuera del juego (Discord, directos de Twitch, llamadas) para beneficiar a tu personaje dentro del servidor."
    ],
    doList: [
      "✅ Cojear o rolear heridas tras una caída de altura moderada.",
      "✅ Olvidar IC la ubicación de alguien que solo viste en un stream de Twitch."
    ],
    dontList: [
      "❌ Saltar de un edificio alto y seguir corriendo como si nada (PG).",
      "❌ Ir directo a la ubicación de un rival porque lo viste en un directo de Twitch (MG)."
    ]
  },
  {
    id: "gen-comandos",
    category: "Conceptos de Rol",
    title: "Conceptos • Comandos /me y /do",
    badge: "Comandos Textuales",
    badgeType: "info",
    summary: "Cómo narrar acciones y consultar el entorno de rol.",
    details: [
      "Comando /me: Describe acciones físicas que las animaciones del juego no permiten (ej: /me saca la billetera y entrega su documento).",
      "Comando /do: Describe el entorno, heridas o pregunta sobre la escena sin mentir (ej: /do ¿Se encontrarían restos de sangre en el suelo?). Está prohibido forzar respuestas irreales."
    ],
    doList: [
      "✅ /me revisa los bolsillos del sospechoso con cuidado → Describe una acción que el juego no puede animar.",
      "✅ /do Se escucharía música fuerte desde dentro del local → Narra algo del entorno de forma honesta."
    ],
    dontList: [
      "❌ /me esquiva las 5 balas haciendo una voltereta → Powergaming con /me.",
      "❌ /do No, no hay cámaras (cuando sí las hay IC) → Mentir con /do."
    ]
  },
  {
    id: "gen-anon",
    category: "Conceptos de Rol",
    title: "Conceptos • Uso del /anon (Anónimo)",
    badge: "Solo IC",
    badgeType: "warning",
    summary: "El /anon es exclusivamente para mensajes anónimos dentro del rol (IC); su mal uso conlleva sanción.",
    details: [
      "Comando /anon: Sirve para que tu personaje envíe un mensaje anónimo dentro del rol (filtraciones, avisos, denuncias IC, etc.).",
      "Uso exclusivamente IC: Todo lo que publiques por /anon debe tener sentido dentro de la historia de la ciudad.",
      "Prohibido usarlo para OOC: insultar, tirar hate, hablar de la vida real, filtrar información de Discord o molestar a otros jugadores.",
      "El mal uso del /anon (OOC, toxicidad, metagaming, acoso o suplantación) se considera falta y lleva sanción."
    ],
    doList: [
      "✅ Usar /anon para que tu personaje filtre información con sentido dentro del rol.",
      "✅ Mantener el anonimato solo como recurso IC, sin faltar al respeto a nadie."
    ],
    dontList: [
      "❌ Usar /anon para hablar OOC, insultar o burlarte de otros jugadores.",
      "❌ Filtrar información obtenida fuera del juego (Discord, directos) mediante /anon (metagaming)."
    ]
  },
  {
    id: "gen-reportes",
    category: "Conceptos de Rol",
    title: "Conceptos • Reportes: Bugs y Problemas de Rol",
    badge: "Cómo Reportar",
    badgeType: "info",
    summary: "Dónde y cómo reportar un bug o un problema sin romper la escena de rol en curso.",
    details: [
      "Problemas que afectan al rol (RDM, VDM, PG, no valorar la vida, evasión de rol, etc.): repórtalos con el comando /report dentro del juego o abriendo un ticket en Discord.",
      "Primero continúa el rol en escena: si algo pasa durante una escena, sigue roleando siempre que no vaya a más; no cortes la escena ni salgas del juego.",
      "Bugs técnicos o fallos del servidor: repórtalos por el Discord oficial (canal de soporte) para que el Staff los revise.",
      "No uses el rol como excusa para vengarte ni resuelvas conflictos OOC dentro del juego."
    ],
    doList: [
      "✅ Terminar la escena y luego reportar la falta por /report o por Discord con pruebas (clip/captura).",
      "✅ Avisar por Discord si tienes un bug técnico en lugar de romper el rol."
    ],
    dontList: [
      "❌ Parar la escena o gritar por OOC para reportar en medio del rol.",
      "❌ Resolver problemas OOC dentro del juego o por el chat IC."
    ]
  },
  {
    id: "gen-evasion-rol",
    category: "Conceptos de Rol",
    title: "Conceptos • Evasión de Rol (F8 / Desconexión)",
    badge: "Falta Grave",
    badgeType: "danger",
    summary: "Salir del juego, usar F8 → Quit o desconectarse para escapar de una escena de rol está prohibido.",
    details: [
      "Evasión de Rol: Abandonar la escena, cerrar el juego por F8 → Quit, desconectarse, cambiar de personaje o activar el modo pasivo para evitar las consecuencias del rol.",
      "Si te vas por un problema técnico real (corte de internet, crash), avisa por Discord al Staff y retoma el rol apenas puedas.",
      "La evasión de rol se considera falta grave y conlleva sanción, independientemente del motivo aparente."
    ],
    doList: [
      "✅ Avisar por Discord si te desconectas de verdad y regresar a terminar la escena.",
      "✅ Asumir las consecuencias del rol (detención, robo, etc.) sin intentar escapar por OOC."
    ],
    dontList: [
      "❌ Darle F8 → Quit para evitar que te detengan, te roben o te maten en el rol.",
      "❌ Desconectarte o cambiar de personaje al verte en desventaja en una escena."
    ]
  },
  {
    id: "gen-forzar-rol",
    category: "Conceptos de Rol",
    title: "Conceptos • Prohibido Forzar Rol",
    badge: "Prohibido",
    badgeType: "danger",
    summary: "Nadie puede obligar a otro jugador a participar en una escena ni a aceptar acciones sin darle opción de responder.",
    details: [
      "Forzar Rol: Obligar a otro jugador a participar en una escena, a aceptar consecuencias irreales o a seguir tu guion sin darle oportunidad de reaccionar.",
      "Cada jugador tiene derecho a negarse a líneas de rol incómodas y a decidir las reacciones y el miedo de su personaje.",
      "No se puede obligar a nadie a rolear contenido con el que no está cómodo."
    ],
    doList: [
      "✅ Dar espacio al otro jugador antes de forzar una interacción física o un desenlace.",
      "✅ Respetar la decisión del otro personaje y adaptar tu rol a sus reacciones."
    ],
    dontList: [
      "❌ Obligar a alguien a aceptar que le robaste o mataste sin darle opción de responder.",
      "❌ Insistir con líneas de rol incómodas después de que la otra persona se negó."
    ]
  },

  // ==================== 👮 VPD | VICIO POLICE DEPARTMENT / CICPC ====================
  {
    id: "vpd-general",
    category: "VPD Policía",
    title: "VPD • Normas Generales de Conducta",
    badge: "Lema: Proteger y Servir",
    badgeType: "warning",
    summary: "Todo agente de la VPD/CICPC debe mantener una conducta ejemplar dentro y fuera de servicio.",
    details: [
      "Sé respetuoso con todos los ciudadanos, compañeros y facciones sin excepción.",
      "Sé responsable de tus actos y decisiones dentro del rol como representante de la ley.",
      "Debes tener disponibilidad y compromiso con la facción, el rol y la comunidad.",
      "Siempre mantente conectado a la frecuencia de radio mientras estés en servicio.",
      "Porta tu uniforme completo y reglamentario en todo momento mientras estés de servicio."
    ],
    doList: [
      "✅ Saludar cordialmente al ciudadano antes de cualquier procedimiento policial.",
      "✅ Explicar el motivo de una detención de forma clara y respetuosa.",
      "✅ Coordinar con tu compañero de patrulla antes de actuar en una situación."
    ],
    dontList: [
      "❌ Insultar o faltar al respeto a civiles bajo custodia.",
      "❌ Actuar de forma violenta sin motivo de rol previo.",
      "❌ Ignorar la cadena de mando o desobedecer órdenes directas de un superior."
    ]
  },
  {
    id: "vpd-requisitos-permanencia",
    category: "VPD Policía",
    title: "VPD • Requisitos de Permanencia",
    badge: "Obligatorio",
    badgeType: "danger",
    summary: "Requisitos mínimos que todo aspirante y miembro activo de la VPD debe cumplir de forma permanente.",
    details: [],
    subsections: [
      {
        title: "📅 Edad Mínima (OOC)",
        level: "normal",
        items: [
          "El aspirante o miembro debe contar con un mínimo de 13 años de edad.",
          "Debe demostrar total madurez conductual en sus acciones dentro de la ciudad.",
          "Comportamientos infantiles, tóxicos o inmaduros pueden llevar a la baja inmediata."
        ]
      },
      {
        title: "🎤 Comunicación y Micrófono",
        level: "normal",
        items: [
          "Es estrictamente obligatorio poseer un micrófono funcional de buena calidad.",
          "Debe poder coordinarse efectivamente por radio sin ruidos de fondo, eco o distorsión.",
          "No se aceptan micrófonos de baja calidad que dificulten la comunicación operativa."
        ]
      },
      {
        title: "⏱️ Actividad Mínima Requerida",
        level: "grave",
        items: [
          "Todo elemento debe disponer de un mínimo de 5 horas a la semana en servicio activo.",
          "No cumplir con las horas mínimas resultará en baja automática por inactividad.",
          "En caso de ausencia justificada, se debe notificar al mando con anticipación."
        ],
        sanction: "Sanción por incumplimiento: Baja automática del cuerpo policial."
      },
      {
        title: "📖 Conocimiento General",
        level: "grave",
        items: [
          "Es obligatorio poseer conocimientos de rol y conocer a la perfección las normativas generales de Vicio RP.",
          "Conocer los conceptos: Rol serio, RDM, VDM, Metagaming, Powergaming, NLR, Zona Segura.",
          "Conocer la normativa interna policial de la VPD/CICPC.",
          "Desconocer las normativas no exime de las consecuencias por incumplirlas."
        ]
      },
      {
        title: "🛡️ Actitud y Compromiso",
        level: "normal",
        items: [
          "Demostrar interés genuino por el Roleplay y el desarrollo de historias.",
          "Tener disposición para aprender, adaptarse y mejorar continuamente.",
          "Mostrar compañerismo, trabajo en equipo y respeto a la cadena de mando.",
          "Mantener estabilidad emocional y no dejarse llevar por situaciones de estrés IC."
        ]
      }
    ],
    doList: [
      "✅ Notificar con tiempo tu ausencia si sabes que no cumplirás las horas mínimas.",
      "✅ Estudiar la normativa semanalmente para estar al día con las actualizaciones."
    ],
    dontList: [
      "❌ Entrar a la facción sin haber leído la normativa general del servidor.",
      "❌ Estar AFK (ausente) durante largos períodos mientras estás en servicio activo."
    ]
  },
  {
    id: "vpd-radio-comunicacion",
    category: "VPD Policía",
    title: "VPD • Protocolo de Radio y Comunicación",
    badge: "Comunicaciones",
    badgeType: "info",
    summary: "Uso correcto y disciplinado de la frecuencia de radio policial para coordinación operativa.",
    details: [
      "Mantente siempre conectado a la frecuencia de radio mientras estés en servicio (10-8).",
      "Utiliza los Códigos 10 oficiales para comunicaciones rápidas y eficientes.",
      "Reporta tu ubicación (10-20) al iniciar y finalizar cada procedimiento.",
      "Confirma recepción de instrucciones con 10-4 siempre que un mando transmita."
    ],
    doList: [
      "✅ '10-4 Central, me dirijo a la 10-20 en Vinewood, 10-76 en camino.' → Comunicación profesional y clara.",
      "✅ Reportar estado al inicio de turno: 'Agente [nombre] 10-8, patrullando sector 3.'"
    ],
    dontList: [
      "❌ Saturar la radio con conversaciones personales o bromas fuera de contexto.",
      "❌ Gritar, reproducir música o hacer ruidos por la frecuencia oficial.",
      "❌ No reportar tu 10-7 al finalizar servicio, dejando la frecuencia sin actualizar."
    ]
  },
  {
    id: "vpd-uniformidad",
    category: "VPD Policía",
    title: "VPD • Uniformidad y Equipamiento",
    badge: "Reglamentario",
    badgeType: "warning",
    summary: "Porte obligatorio del uniforme completo y equipamiento asignado según rango.",
    details: [
      "Todo agente debe portar su uniforme reglamentario completo durante el servicio activo.",
      "El equipamiento (arma reglamentaria, taser, esposas, radio) debe estar siempre disponible.",
      "Fuera de servicio, queda prohibido el uso de uniformes, insignias o vehículos oficiales.",
      "Los vehículos patrulla deben regresar al estacionamiento oficial al finalizar turno."
    ],
    doList: [
      "✅ Vestir uniforme completo antes de entrar a patrullar.",
      "✅ Devolver el vehículo patrulla al garaje de la comisaría al terminar servicio."
    ],
    dontList: [
      "❌ Patrullar con ropa de civil o uniforme incompleto.",
      "❌ Utilizar vehículos policiales para actividades personales fuera de servicio.",
      "❌ Portar insignias o credenciales para obtener beneficios personales estando 10-7."
    ]
  },
  {
    id: "vpd-disciplina",
    category: "VPD Policía",
    title: "VPD • Régimen Disciplinario",
    badge: "Régimen Interno",
    badgeType: "danger",
    summary: "Sanciones clasificadas por gravedad para mantener la integridad del cuerpo policial.",
    details: [],
    subsections: [
      {
        title: "🟡 Faltas Leves",
        level: "leve",
        items: [
          "Uso incorrecto del uniforme o equipamiento menor.",
          "Falta de comunicación por radio en procedimientos rutinarios.",
          "Impuntualidad reiterada en llamados o despachos.",
          "Conducta poco profesional con civiles sin consecuencias graves."
        ],
        sanction: "Sanción: Advertencia verbal o escrita registrada en expediente."
      },
      {
        title: "🟠 Faltas Graves",
        level: "grave",
        items: [
          "Abuso de autoridad en detenciones o procedimientos policiales.",
          "Desobediencia directa a órdenes de un oficial superior.",
          "Abandono de puesto o servicio sin autorización durante una emergencia.",
          "Uso indebido de armamento o fuerza excesiva sin justificación.",
          "No cumplir con el mínimo de 5 horas semanales de actividad."
        ],
        sanction: "Sanción: Suspensión temporal, degradación de rango o baja directa."
      },
      {
        title: "🔴 Faltas Muy Graves",
        level: "muy_grave",
        items: [
          "Corrupción policial: colaborar con organizaciones criminales.",
          "Filtración de información confidencial a civiles o bandas.",
          "Abuso extremo de autoridad que perjudique gravemente el rol de otros jugadores.",
          "Uso de comandos administrativos o privilegios para beneficio personal.",
          "Cualquier forma de acoso, discriminación o toxicidad hacia otros miembros."
        ],
        sanction: "Sanción: Expulsión irrevocable del cuerpo policial, lista negra y reporte administrativo."
      }
    ]
  }
];

export const SERVER_FEATURES = [
  {
    id: "economia",
    title: "Economía Real y Negocios Propios",
    iconName: "Briefcase",
    points: [
      "Crea tu propia empresa legal desde el sistema de gestión.",
      "Concesionarios, talleres, discotecas y más negocios disponibles.",
      "Trabajos públicos dinámicos para empezar a ganar tus primeros dólares."
    ]
  },
  {
    id: "optimizacion",
    title: "Optimización y Scripts Exclusivos",
    iconName: "Cpu",
    points: [
      "Rendimiento impecable (FPS estables) incluso en zonas de alta carga.",
      "Mapeados únicos, vehículos reales modificados y ropa personalizada.",
      "Sistemas de inventario, garage y telefonía de última generación."
    ]
  },
  {
    id: "streamers",
    title: "Entorno Friendly para Streamers",
    iconName: "Tv",
    points: [
      "Comunidad activa con creadores de contenido diarios.",
      "Herramientas específicas para facilitar las transmisiones en vivo.",
      "Eventos globales organizados por el Staff para generar contenido único."
    ]
  },
  {
    id: "moderacion",
    title: "Rol Serio y Moderación Estricta",
    iconName: "Scale",
    points: [
      "Administración madura, activa y completamente neutral 24/7.",
      "Sistema de Whitelist para asegurar la calidad de la comunidad.",
      "Normativa clara que premia la interpretación de personaje sobre el 'ganar-ganar'."
    ]
  }
];
