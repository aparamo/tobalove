import { prisma } from '../lib/prisma';
import type { Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface Conference {
  id: string;
  title: string;
  youtube_url: string | null;
  url: string | null;
  organization: string;
  date: string | null;
  year: number | null;
  description: string;
  summary: string;
  topics: string[];
  characters: string[];
  civilizations: string[];
}

interface TimelineEvent {
  id: string;
  title: string;
  dateLabel: string;
  startYear: number;
  endYear: number;
  period: string;
  location: string;
  description: string;
  summary: string;
  consequences: string[];
  characters: string[];
  civilizations: string[];
  topics: string[];
  sourceConference?: {
    title?: string;
    organization?: string;
    url?: string;
    date?: string;
  } | null;
  relatedConferences: string[];
  isSecondary?: boolean;
  isYoutubeConference?: boolean;
}

interface PeopleGroup {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  peakYear: number;
  peakPopulation: number;
  color: string;
  region: string;
  description: string;
  civilizations: string[];
  relatedConferences: string[];
  isSecondary?: boolean;
}

function loadJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function findConfById(confs: Conference[], id: string): Conference | undefined {
  return confs.find((c) => c.id === id);
}

function sourceConf(conf: Conference) {
  return {
    title: conf.title,
    organization: conf.organization,
    url: conf.youtube_url ?? conf.url ?? undefined,
    date: conf.date ?? (conf.year ? String(conf.year) : undefined),
  };
}

async function main() {
  const cwd = process.cwd();
  const confPath = path.join(cwd, 'data', 'conferencias-eva-tobalina.json');
  const timelinePath = path.join(cwd, 'data', 'linea-de-tiempo-eva-tobalina.json');
  const peoplesPath = path.join(cwd, 'data', 'pueblos-coexistientes.json');

  const confData = loadJson<{ items: Conference[]; meta: Record<string, unknown> }>(confPath);
  const timelineData = loadJson<{ items: TimelineEvent[]; meta: Record<string, unknown> }>(timelinePath);
  const peoplesData = loadJson<{ items: PeopleGroup[]; meta: Record<string, unknown> }>(peoplesPath);

  const confs = confData.items;
  const events = timelineData.items;
  const peoples = peoplesData.items;

  // IDs de eventos de ciclo / no video de YouTube
  const cycleEventIds = new Set([
    'codigo-hammurabi',
    'imperio-hitita',
    'batalla-qadesh',
    'pueblos-del-mar',
    'imperio-neobabilonico',
    'caida-babilonia',
    'alejandro-magno',
    'ruta-de-la-seda',
    'iberos-principes-iberia-evento',
    'hispania-celtica-celtiberos',
  ]);

  // Renombrar títulos con "Ciclo"
  const titleRenames: Record<string, string> = {
    'alejandro-magno': 'Vida y conquistas de Alejandro Magno',
    'ruta-de-la-seda': 'Origen y apogeo de la Ruta de la Seda',
  };

  // Aplicar flags y renombres a eventos existentes
  for (const e of events) {
    e.isSecondary = e.isSecondary ?? false;
    e.isYoutubeConference = !cycleEventIds.has(e.id);
    if (titleRenames[e.id]) e.title = titleRenames[e.id];
  }

  // Nuevos eventos basados en conferencias de YouTube
  const newEvents: TimelineEvent[] = [
    {
      id: 'coliseo-roma-construccion',
      title: 'Construcción e inauguración del Coliseo de Roma',
      dateLabel: '72-80 d.C.',
      startYear: 72,
      endYear: 80,
      period: 'Edad Antigua',
      location: 'Roma, Italia',
      description: 'Vespasiano y Tito impulsan la construcción del mayor anfiteatro romano, símbolo del poder imperial y de los espectáculos públicos.',
      summary: 'El Coliseo se erige como centro de la vida social y política de Roma, albergando juegos, combates de gladiadores y naumaquias.',
      consequences: [
        'Consolidación del anfiteatro como modelo arquitectónico romano.',
        'Refuerzo de la imagen del emperador como benefactor del pueblo.',
        'Legado monumental que pervive como icono de la Antigüedad.'
      ],
      characters: ['Vespasiano', 'Tito'],
      civilizations: ['Imperio Romano'],
      topics: ['Coliseo', 'anfiteatro', 'espectáculos romanos', 'arquitectura romana'],
      relatedConferences: ['el-coliseo-de-roma-su-apasionante-historia-y-creacion-eva-to'],
    },
    {
      id: 'edicto-milan-constantino',
      title: 'Edicto de Milán y renovación imperial de Constantino',
      dateLabel: '313 d.C.',
      startYear: 313,
      endYear: 313,
      period: 'Edad Antigua',
      location: 'Imperio Romano',
      description: 'Constantino promulga el Edicto de Milán, que concede libertad de culto a los cristianos, y posteriormente funda Constantinopla.',
      summary: 'El reinado de Constantino transforma el Imperio Romano, favoreciendo al cristianismo y reorientando el centro político hacia Oriente.',
      consequences: [
        'Legalización del cristianismo en el Imperio Romano.',
        'Fundación de Constantinopla como nueva capital imperial.',
        'Sentido precedente para la futura cristianización del Imperio.'
      ],
      characters: ['Constantino el Grande'],
      civilizations: ['Imperio Romano'],
      topics: ['Constantino', 'Edicto de Milán', 'cristianismo', 'Constantinopla'],
      relatedConferences: ['constantino-el-grande-la-renovacion-del-imperio-romano-eva-t'],
    },
    {
      id: 'reinado-marco-aurelio',
      title: 'Reinado de Marco Aurelio y el estoicismo imperial',
      dateLabel: '161-180 d.C.',
      startYear: 161,
      endYear: 180,
      period: 'Edad Antigua',
      location: 'Imperio Romano',
      description: 'Marco Aurelio gobierna el Imperio Romano en uno de sus momentos de mayor esplendor, mientras cultiva el estoicismo en sus "Meditaciones".',
      summary: 'El emperador filósofo encarna la conjunción de poder político y reflexión ética en la Roma imperial.',
      consequences: [
        'Difusión del estoicismo como filosofía de vida imperial.',
        'Defensa de las fronteras del Imperio frente a pueblos germánicos.',
        'Legado literario y filosófico de las Meditaciones.'
      ],
      characters: ['Marco Aurelio'],
      civilizations: ['Imperio Romano'],
      topics: ['Marco Aurelio', 'estoicismo', 'filosofía romana', 'Imperio Romano'],
      relatedConferences: ['marco-aurelio-el-emperador-que-buscaba-la-sabiduaria-eva-tob'],
    },
    {
      id: 'roma-maxima-expansion-trajano',
      title: 'Roma alcanza su máxima expansión bajo Trajano',
      dateLabel: '98-117 d.C.',
      startYear: 98,
      endYear: 117,
      period: 'Edad Antigua',
      location: 'Imperio Romano',
      description: 'Trajano extiende los límites del Imperio Romano hasta su máxima extensión territorial, desde Mesopotamia hasta Escocia.',
      summary: 'El reinado de Trajano representa el apogeo territorial, militar y administrativo del Imperio Romano.',
      consequences: [
        'Máxima extensión territorial del Imperio Romano.',
        'Reformas administrativas y obras públicas destacadas.',
        'Modelo de "optimus princeps" para gobernantes posteriores.'
      ],
      characters: ['Trajano'],
      civilizations: ['Imperio Romano'],
      topics: ['Trajano', 'expansión romana', 'Imperio Romano', 'Dacia'],
      relatedConferences: ['trajano-el-emperador-con-quien-roma-alcanzo-su-maxima-expans'],
    },
    {
      id: 'dinastia-flavia-vespasiano',
      title: 'Vespasiano, la Dinastía Flavia y la Guerra de los Judíos',
      dateLabel: '69-79 d.C.',
      startYear: 69,
      endYear: 79,
      period: 'Edad Antigua',
      location: 'Imperio Romano',
      description: 'Vespasiano funda la Dinastía Flavia tras el año de los cuatro emperadores, sofoca la rebelión judía e inicia la construcción del Coliseo.',
      summary: 'El reinado de Vespasiano estabiliza el Imperio y deja una huella arquitectónica perdurable en Roma.',
      consequences: [
        'Fin de la crisis sucesoria del año 69 d.C.',
        'Destrucción del Segundo Templo de Jerusalén.',
        'Inicio de la construcción del Coliseo.'
      ],
      characters: ['Vespasiano', 'Tito'],
      civilizations: ['Imperio Romano'],
      topics: ['Vespasiano', 'Dinastía Flavia', 'Guerra de los Judíos', 'Coliseo'],
      relatedConferences: ['vespasiano-emperador-la-dinastia-flavia-la-guerra-contra-los'],
    },
    {
      id: 'auge-bizancio',
      title: 'Auge de Bizancio como capital imperial',
      dateLabel: '330-565 d.C.',
      startYear: 330,
      endYear: 565,
      period: 'Edad Antigua',
      location: 'Bizancio / Constantinopla',
      description: 'Constantinopla se consolida como capital de un Imperio Romano de Oriente que preserva y transforma la herencia clásica durante siglos.',
      summary: 'Bizancio emerge como centro político, religioso y cultural entre Oriente y Occidente.',
      consequences: [
        'Reorientación política y cultural del mundo mediterráneo.',
        'Desarrollo del cristianismo oriental y el arte bizantino.',
        'Supervivencia del Imperio Romano de Oriente hasta 1453.'
      ],
      characters: ['Constantino el Grande', 'Justiniano'],
      civilizations: ['Bizancio', 'Imperio Romano de Oriente'],
      topics: ['Bizancio', 'Constantinopla', 'Imperio Romano de Oriente', 'Edad Media'],
      relatedConferences: ['breve-historia-de-bizancio-radiografia-de-la-capital'],
    },
    {
      id: 'apogeo-magna-grecia',
      title: 'Apogeo de la Magna Grecia en el sur de Italia',
      dateLabel: 'siglos VIII-III a.C.',
      startYear: -800,
      endYear: -300,
      period: 'Edad Antigua',
      location: 'Sur de Italia y Sicilia',
      description: 'Las colonias griegas en el sur de Italia alcanzan un esplendor cultural y urbano que transforma la región en un crisol de civilización helena.',
      summary: 'La Magna Grecia difunde la lengua, el arte y la religión griegos en la península itálica.',
      consequences: [
        'Difusión de la cultura griega en Italia.',
        'Desarrollo urbano de ciudades como Paestum y Riaze.',
        'Intercambio cultural entre griegos, itálicos y romanos.'
      ],
      characters: [],
      civilizations: ['Magna Grecia', 'Grecia'],
      topics: ['Magna Grecia', 'colonización griega', 'Paestum', 'Riaze'],
      relatedConferences: ['la-magna-grecia-riaze-paestum-y-otras-maravillas-del-sur-de-'],
    },
    {
      id: 'esplendor-caida-minoico',
      title: 'Esplendor y caída de la civilización minoica en Creta',
      dateLabel: 'c. 2000-1450 a.C.',
      startYear: -2000,
      endYear: -1450,
      period: 'Edad Antigua',
      location: 'Creta',
      description: 'La civilización minoica florece en Creta con palacios como Cnosos y Festos, hasta su declive tras invasiones y catástrofes naturales.',
      summary: 'Creta alberga una de las primeras civilizaciones complejas del Egeo, predecesora de la cultura micénica.',
      consequences: [
        'Desarrollo del arte, la escritura lineal A y el comercio marítimo.',
        'Influencia en la cultura micénica continental.',
        'Legado arqueológico descubierto por Arthur Evans.'
      ],
      characters: ['Minos'],
      civilizations: ['Creta', 'Minoica'],
      topics: ['Creta', 'civilización minoica', 'Cnosos', 'Festos'],
      relatedConferences: ['creta-y-la-caida-del-mundo-minoico-eva-tobalina'],
    },
    {
      id: 'apogeo-micenas',
      title: 'Apogeo de Micenas y la civilización micénica',
      dateLabel: 'c. 1600-1100 a.C.',
      startYear: -1600,
      endYear: -1100,
      period: 'Edad Antigua',
      location: 'Grecia continental',
      description: 'Micenas lidera una red de palacios fortificados que domina el Egeo, fundando la base cultural de la posterior Grecia clásica.',
      summary: 'La civilización micénica representa la primera gran complejidad política y militar de la Grecia preclásica.',
      consequences: [
        'Difusión de la cultura griega arcaica por el Egeo.',
        'Desarrollo de la escritura lineal B.',
        'Legado mítico de Agamenón y la guerra de Troya.'
      ],
      characters: ['Agamenón'],
      civilizations: ['Grecia micénica', 'Micenas'],
      topics: ['Micenas', 'civilización micénica', 'Agamenón', 'Egeo'],
      relatedConferences: ['grandes-yacimientos-v-micenas-la-mitica-e-imponente-ciudad-d'],
    },
    {
      id: 'alejandro-contra-persia',
      title: 'Alejandro Magno contra el Imperio Persa',
      dateLabel: '334-330 a.C.',
      startYear: -334,
      endYear: -330,
      period: 'Edad Antigua',
      location: 'Imperio Persa Aqueménida',
      description: 'Alejandro Magno derrota a Darío III en una serie de campañas que destruyen el Imperio Persa Aqueménida y extienden el poder macedonio hasta Asia Central.',
      summary: 'La confrontación entre Macedonia y Persia redefine el mapa político y cultural del mundo antiguo.',
      consequences: [
        'Caída del Imperio Persa Aqueménida.',
        'Difusión de la cultura helenística por Oriente.',
        'Fundación de ciudades como Alejandría.'
      ],
      characters: ['Alejandro Magno', 'Darío III'],
      civilizations: ['Macedonia', 'Persia Aqueménida'],
      topics: ['Alejandro Magno', 'Imperio Persa', 'Darío III', 'helenismo'],
      relatedConferences: ['alejandro-magno-y-el-imperio-persa-por-eva-tobalina'],
    },
    {
      id: 'invasiones-pueblos-del-mar',
      title: 'Invasiones de los Pueblos del Mar y colapso del Bronce Final',
      dateLabel: 'c. 1200-1150 a.C.',
      startYear: -1200,
      endYear: -1150,
      period: 'Edad Antigua',
      location: 'Mediterráneo oriental',
      description: 'Coaliciones de pueblos nómadas y marítimos asolan las civilizaciones del Mediterráneo oriental, acelerando el colapso del Bronce Final.',
      summary: 'Los Pueblos del Mar alteran el equilibrio político de Egipto, Anatolia y el Levante, destruyendo reinos y replanteando mapas.',
      consequences: [
        'Crisis y colapso de varios reinos del Bronce Final.',
        'Migraciones y cambios demográficos en el Mediterráneo.',
        'Aparición de nuevas identidades culturales en la Edad del Hierro.'
      ],
      characters: [],
      civilizations: ['Egipto Antiguo', 'Hititas'],
      topics: ['Pueblos del Mar', 'Bronce Final', 'Mediterráneo oriental', 'invasiones'],
      relatedConferences: ['los-pueblos-del-mar-el-gran-misterio-de-la-antiguedad-mesopo'],
    },
    {
      id: 'atila-hunos-apogeo',
      title: 'Auge de Atila y los hunos en la estepa europea',
      dateLabel: '434-453 d.C.',
      startYear: 434,
      endYear: 453,
      period: 'Edad Antigua',
      location: 'Estepa europea',
      description: 'Atila reúne a las hordas hunas y presiona a los Imperios Romanos de Oriente y Occidente, alcanzando una hegemonía efímera pero temida.',
      summary: 'El llamado "Azote de Dios" encarna el poder nómada frente a los Estados sedentarios del final de la Antigüedad.',
      consequences: [
        'Presión sobre las fronteras del Imperio Romano.',
        'Movimientos de pueblos germánicos hacia el Imperio.',
        'Mito histórico de Atila en la cultura europea.'
      ],
      characters: ['Atila'],
      civilizations: ['Huna'],
      topics: ['Atila', 'hunos', 'Pueblos de la estepa', 'Imperio Romano'],
      relatedConferences: ['atila-ascenso-y-caida-del-azote-de-dios-eva-tobalina'],
    },
    {
      id: 'imperio-bulgaro-edad-media',
      title: 'Apogeo del Imperio Búlgaro en la Edad Media',
      dateLabel: 'siglos VII-XI d.C.',
      startYear: 681,
      endYear: 1018,
      period: 'Edad Media',
      location: 'Península Balcánica',
      description: 'El Primer Imperio Búlgaro alcanza su máximo esplendor político y cultural, desarrollando una literatura y una Iglesia propias.',
      summary: 'Bulgaria se consolida como potencia regional entre Bizancio y los pueblos de la estepa.',
      consequences: [
        'Desarrollo de la literatura y alfabetos eslavos.',
        'Conflictos y alianzas con el Imperio Bizantino.',
        'Legado cultural de los eslavos meridionales.'
      ],
      characters: ['Simeón I'],
      civilizations: ['Imperio Búlgaro', 'Bulgaria'],
      topics: ['Bulgaria', 'Imperio Búlgaro', 'Edad Media', 'Balcanes'],
      relatedConferences: ['bulgaria-y-su-apasionante-edad-media-eva-tobalina'],
    },
    {
      id: 'fundacion-esplendor-alejandria',
      title: 'Fundación y esplendor de Alejandría',
      dateLabel: '331 a.C. - 30 a.C.',
      startYear: -331,
      endYear: -30,
      period: 'Edad Antigua',
      location: 'Egipto',
      description: 'Alejandro Magno funda Alejandría, que bajo los Ptolomeos se convierte en el gran centro cultural, científico y comercial del mundo helenístico.',
      summary: 'Alejandría reúne bibliotecas, sabios y mercaderes de todo el Mediterráneo y Oriente.',
      consequences: [
        'Centro de difusión del conocimiento helenístico.',
        'Desarrollo de la Biblioteca y el Museo.',
        'Puente cultural entre Oriente y Occidente.'
      ],
      characters: ['Alejandro Magno', 'Ptolomeo I', 'Cleopatra VII'],
      civilizations: ['Egipto Ptolemaico', 'Macedonia'],
      topics: ['Alejandría', 'Alejandro Magno', 'Egipto Ptolemaico', 'helenismo'],
      relatedConferences: ['alejandria-sueno-alejandro'],
    },
  ];

  // Asignar sourceConference a nuevos eventos
  for (const e of newEvents) {
    const confId = e.relatedConferences[0];
    const conf = findConfById(confs, confId);
    if (conf) {
      e.sourceConference = sourceConf(conf);
    }
    e.isSecondary = false;
    e.isYoutubeConference = true;
  }

  const existingEventIds = new Set(events.map((e) => e.id));
  const eventsToAdd = newEvents.filter((e) => !existingEventIds.has(e.id));
  events.push(...eventsToAdd);

  // Aplicar isSecondary a pueblos existentes
  const secondaryPeopleIds = new Set([
    'tartessos',
    'numantia',
    'iberos',
    'iberos-principes-iberia',
    'celtiberos',
    'hispania-celtica',
  ]);

  for (const p of peoples) {
    p.isSecondary = p.isSecondary ?? secondaryPeopleIds.has(p.id);
  }

  // Nuevos pueblos
  const newPeoples: PeopleGroup[] = [
    {
      id: 'imperio-romano',
      name: 'Imperio Romano',
      startYear: -27,
      endYear: 476,
      peakYear: 117,
      peakPopulation: 70000000,
      color: '#8B0000',
      region: 'Cuenca del Mediterráneo',
      description: 'Imperio político y cultural que dominó el Mediterráneo y gran parte de Europa, Oriente Próximo y Norte de África durante siglos.',
      civilizations: ['Imperio Romano'],
      relatedConferences: ['roma-urbe', 'roma-fundacion', 'historia-roma-i-fundacion'],
    },
    {
      id: 'bizancio',
      name: 'Imperio Romano de Oriente / Bizancio',
      startYear: 330,
      endYear: 1453,
      peakYear: 565,
      peakPopulation: 20000000,
      color: '#4B0082',
      region: 'Constantinopla y Anatolia',
      description: 'Continuación del Imperio Romano en Oriente, con capital en Constantinopla, que preservó la herencia clásica y desarrolló una civilización griega cristiana.',
      civilizations: ['Bizancio', 'Imperio Romano de Oriente'],
      relatedConferences: ['breve-historia-de-bizancio-radiografia-de-la-capital'],
    },
    {
      id: 'grecia',
      name: 'Grecia',
      startYear: -800,
      endYear: -31,
      peakYear: -450,
      peakPopulation: 8000000,
      color: '#1E90FF',
      region: 'Grecia continental y Egeo',
      description: 'Conjunto de polis griegas que desarrollaron la democracia, la filosofía, el teatro y las artes clásicas, y expandieron su cultura por el Mediterráneo.',
      civilizations: ['Grecia', 'Grecia arcaica', 'Grecia clásica', 'Helenística'],
      relatedConferences: ['atenas-fidias-pericles', 'tragedia-griega-i-nacimiento'],
    },
    {
      id: 'persia',
      name: 'Persia',
      startYear: -550,
      endYear: 651,
      peakYear: -490,
      peakPopulation: 50000000,
      color: '#D2691E',
      region: 'Irán y Mesopotamia',
      description: 'Imperios aqueménida, parto y sasánida que dominaron el espacio entre el Mediterráneo y la India, rivales de Grecia y Roma.',
      civilizations: ['Persia', 'Imperio Persa', 'Persia Aqueménida', 'Persia Sasánida'],
      relatedConferences: ['imperio-persa', 'persia-sasanida', 'alejandro-magno-y-el-imperio-persa-por-eva-tobalina'],
    },
    {
      id: 'imperio-selucida',
      name: 'Imperio Seléucida',
      startYear: -312,
      endYear: -63,
      peakYear: -200,
      peakPopulation: 15000000,
      color: '#9932CC',
      region: 'Oriente Próximo y Asia Central',
      description: 'Imperio helenístico surgido tras la muerte de Alejandro Magno, que extendió la cultura griega por Mesopotamia, Persia y Asia Central.',
      civilizations: ['Imperio Seléucida', 'Helenística'],
      relatedConferences: ['alejandro-magno-y-el-imperio-persa-por-eva-tobalina'],
    },
    {
      id: 'partos',
      name: 'Imperio Parto',
      startYear: -247,
      endYear: 224,
      peakYear: -50,
      peakPopulation: 10000000,
      color: '#B8860B',
      region: 'Irán y Mesopotamia',
      description: 'Imperio iranio que dominó la Ruta de la Seda y fue un rival constante del Imperio Romano por el control de Oriente Próximo.',
      civilizations: ['Partos', 'Imperio Parto'],
      relatedConferences: ['imperio-persa'],
    },
    {
      id: 'india',
      name: 'India',
      startYear: -1500,
      endYear: 550,
      peakYear: -250,
      peakPopulation: 30000000,
      color: '#FF8C00',
      region: 'Subcontinente indio',
      description: 'Civilizaciones del valle del Indo y del Ganges, con desarrollos religiosos, políticos y culturales que influyeron en toda Asia.',
      civilizations: ['India'],
      relatedConferences: ['alejandro-magno-iv'],
    },
    {
      id: 'china',
      name: 'China',
      startYear: -2070,
      endYear: 1912,
      peakYear: 750,
      peakPopulation: 60000000,
      color: '#DC143C',
      region: 'China',
      description: 'Civilización milenaria que desarrolló dinastías, la Ruta de la Seda, inventos tecnológicos y sistemas filosóficos duraderos.',
      civilizations: ['China', 'China Han', 'China Tang', 'China Song'],
      relatedConferences: ['ruta-seda-recorrido', 'su-origen-china-tres-imperios'],
    },
    {
      id: 'imperio-otomano',
      name: 'Imperio Otomano',
      startYear: 1299,
      endYear: 1922,
      peakYear: 1600,
      peakPopulation: 30000000,
      color: '#2F4F4F',
      region: 'Anatolia, Balcanes y Oriente Próximo',
      description: 'Imperio turco que sucedió a Bizancio y dominó el sureste de Europa, Oriente Próximo y Norte de África durante siglos.',
      civilizations: ['Imperio Otomano'],
      relatedConferences: ['bizancio-vs-islam-siglo-vii-reformas-sociales-y-militares-bi'],
    },
  ];

  for (const p of newPeoples) {
    p.isSecondary = false;
  }

  const existingPeopleIds = new Set(peoples.map((p) => p.id));
  const peoplesToAdd = newPeoples.filter((p) => !existingPeopleIds.has(p.id));
  peoples.push(...peoplesToAdd);

  // Guardar JSONs
  timelineData.meta.totalEventos = events.length;
  (timelineData.meta as Record<string, unknown>).ultima_actualizacion = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(timelinePath, JSON.stringify(timelineData, null, 2), 'utf8');

  peoplesData.meta.totalPueblos = peoples.length;
  (peoplesData.meta as Record<string, unknown>).ultima_actualizacion = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(peoplesPath, JSON.stringify(peoplesData, null, 2), 'utf8');

  console.log(`✅ Línea de tiempo: ${events.length} eventos (${eventsToAdd.length} nuevos)`);
  console.log(`✅ Pueblos: ${peoples.length} pueblos (${peoplesToAdd.length} nuevos)`);

  // Sincronizar BD
  for (const e of events) {
    const data = {
      title: e.title,
      dateLabel: e.dateLabel,
      startYear: e.startYear,
      endYear: e.endYear,
      period: e.period,
      location: e.location,
      description: e.description,
      summary: e.summary,
      consequences: e.consequences,
      characters: e.characters,
      civilizations: e.civilizations,
      topics: e.topics,
      sourceConference: (e.sourceConference ?? null) as Prisma.InputJsonValue,
      relatedConferences: e.relatedConferences,
      isSecondary: e.isSecondary ?? false,
      isYoutubeConference: e.isYoutubeConference ?? true,
    };

    const existing = await prisma.timelineEvent.findUnique({ where: { id: e.id } });
    if (existing) {
      await prisma.timelineEvent.update({ where: { id: e.id }, data });
    } else {
      await prisma.timelineEvent.create({ data: { id: e.id, ...data } });
    }
  }

  for (const p of peoples) {
    const data = {
      name: p.name,
      startYear: p.startYear,
      endYear: p.endYear,
      peakYear: p.peakYear,
      peakPopulation: p.peakPopulation,
      color: p.color,
      region: p.region,
      description: p.description,
      civilizations: p.civilizations,
      relatedConferences: p.relatedConferences,
      isSecondary: p.isSecondary ?? false,
    };

    const existing = await prisma.peopleGroup.findUnique({ where: { id: p.id } });
    if (existing) {
      await prisma.peopleGroup.update({ where: { id: p.id }, data });
    } else {
      await prisma.peopleGroup.create({ data: { id: p.id, ...data } });
    }
  }

  console.log(`✅ BD sincronizada`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
