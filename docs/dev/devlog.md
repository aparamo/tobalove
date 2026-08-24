# Devlog

## 2026-08-24 — Línea de tiempo histórica de Eva Tobalina

### Contexto
Se parte de un proyecto Next.js 16 recién creado con `create-next-app` y un JSON
inicial en `/data/conferencias-eva-tobalina.json` que catalogaba conferencias y
entrevistas de Eva Tobalina. El objetivo pivotó: en lugar de catalogar videos,
la aplicación debe representar una **línea de tiempo de los hechos históricos**
que Eva Tobalina explica en sus conferencias.

### Trabajo realizado

#### Datos
- Se conservó el catálogo original de conferencias en
  `/data/conferencias-eva-tobalina.json` como fuente bibliográfica.
- Se creó `/data/linea-de-tiempo-eva-tobalina.json` con **34 eventos
  históricos** ordenables cronológicamente.
- Cada evento incluye:
  - `title`, `dateLabel`, `startYear`, `endYear`, `period`, `location`
  - `description`, `summary`, `consequences`
  - `characters`, `civilizations`, `topics`
  - `sourceConference` con título, organización, URL y fecha de la charla
    donde se trata el tema.
- Se validó el JSON con `python3 -m json.tool`.
- Se copió el JSON a `/tob-app/data/linea-de-tiempo-eva-tobalina.json` para
  permitir su importación directa desde Next.js.

#### Infraestructura y dependencias
- Se instaló `shadcn` usando `bunx shadcn@latest init -d -y`, compatible con
  Next.js 16 y Tailwind CSS v4.
- Se añadieron componentes de shadcn: `button`, `card`, `badge`,
  `separator`, `scroll-area`, `sheet`, `tooltip`.
- Se instaló `framer-motion` para animaciones.
- Se actualizó `app/globals.css` con el tema de shadcn y variables CSS.

#### Tipos
- Se creó `/tob-app/app/types/timeline.ts` con las interfaces
  `TimelineEvent`, `SourceConference`, `TimelineMeta` y `TimelineData`.

#### UI / UX
- `/tob-app/app/layout.tsx`:
  - Metadata en español.
  - Navegación sticky con enlaces a inicio y línea de tiempo.
  - `TooltipProvider` de shadcn.
  - Footer con atribución a Eva Tobalina.
- `/tob-app/app/page.tsx`:
  - Landing page con presentación de la línea de tiempo.
  - Tarjetas de civilizaciones, personajes y ubicaciones.
  - Botón de acceso a `/timeline` usando `buttonVariants` (el componente
    `Button` de shadcn v4 no expone `asChild`).
- `/tob-app/app/timeline/page.tsx`:
  - Server Component que importa el JSON, ordena eventos por `startYear` y
    renderiza el componente `Timeline`.
- `/tob-app/app/components/Timeline.tsx`:
  - Línea vertical central.
  - Layout alternado en desktop (izquierda/derecha).
  - Animaciones de entrada con `framer-motion`.
- `/tob-app/app/components/TimelineEvent.tsx`:
  - Tarjeta con descripción, resumen, consecuencias, badges de personajes,
    civilizaciones y temas.
  - Enlace a la fuente de la conferencia.
  - **Video de YouTube embebido en el lado opuesto de la línea** en desktop;
    en móvil se muestra al final de la tarjeta.
  - Helper `getYouTubeId` para extraer el ID del video desde la URL.

#### Verificación
- `bun run build` ✅ — prerenderizado estático de `/` y `/timeline`.
- `bun run lint` ✅ — sin errores de ESLint.

### Decisiones técnicas
- **JSON vs SQLite**: se mantuvo JSON porque los datos son de solo lectura y
  relativamente estables. SQLite se consideró overengineering para el alcance
  actual.
- **Server Component para `/timeline`**: aprovecha la importación directa del
  JSON sin hidratación innecesaria.
- **Client Component solo para animaciones**: `Timeline` y `TimelineEvent` son
  clientes porque usan `framer-motion`; la carga de datos sigue en el servidor.
- **Copia del JSON en `/tob-app/data/`**: Next.js no puede importar archivos
  fuera de su raíz de forma portable; la copia mantiene el archivo maestro en
  `/data` y permite el build de la app.

### Próximos pasos posibles
- Añadir filtros por civilización, personaje o tema.
- Implementar búsqueda full-text sobre descripciones y resúmenes.
- Convertir el JSON a SQLite si el volumen de eventos crece o se requieren
  consultas complejas.
- Mejorar la landing con imágenes o un hero visual.

## 2026-08-24 (continuación) — Expansión de datos y segunda línea de tiempo

### Contexto
El usuario pidió una búsqueda profunda de conferencias de Eva Tobalina para
complementar el catálogo sin repetir, una segunda línea de tiempo visual de
pueblos coexistientes, cards expandibles con todos los videos relacionados y una
flag que indique si cada conferencia tiene enlace a video/audio. También se
corrigió la percepción de que faltaban pueblos, conferencias y hechos históricos
en la visualización.

### Búsqueda y ampliación del catálogo
- Se intentó `WebSearch` (Moonshot), pero devolvió errores 500. Se recurrió a la
  API pública de Invidious (`https://y.com.sb/api/v1/search`) para verificar
  títulos e IDs reales de YouTube.
- Se integraron las conferencias del lote inicial proporcionado por el usuario
  (Value Tree, Museo Oiasso, Raíces de Europa, UNAB, Ateneo de Valencia, PUCV,
  Ivoox, Spotify, próximas actividades, etc.).
- Se integraron las conferencias del segundo lote (Alejandría, Ruta de la Seda
  fascinante, Roma: la Urbe, Imperio Hitita I, Tumba del Primer Emperador de
  China, Atenas de Fidias y Pericles, Livia, Anábasis, Tiberio, Heliogábalo,
  serie de Tragedia Griega). Se corrigieron URLs placeholder por IDs reales de
  YouTube obtenidos con Invidious.
- Total de conferencias: de 85 a **100**.

### Normalización de datos
- Se añadió el campo `mediaType` (`"video" | "audio" | "web" | null`) a cada
  conferencia, calculado a partir de la URL: YouTube → video, Ivoox/Spotify →
  audio, resto → web.
- Se corrigieron referencias rotas en la línea de tiempo y en pueblos
  coexistientes:
  - `caminos-de-la-seda-geografia-vitoria` → `ruta-seda-geografia-paisajes-2025`
  - `proxima-escorial-ruta-seda` → `ruta-seda-escorial-2026`
  - `proxima-cancho-roano` → `cancho-roano-2026`
  - `proxima-man-tumbas-reales-ur` → `tumbas-reales-ur-man-2027`
- Se agregó la conferencia faltante `ruta-seda-xuanzang-tang-2024`.

### Línea de tiempo de eventos ampliada
- De 41 a **46 eventos históricos**.
- Se rellenaron `relatedConferences` vacíos en eventos existentes (Egipto Antiguo,
  Egipto Nuevo, Egipto Ptolemaico, Fenicios, Judea, Angkor Wat, Cancho Roano,
  Hititas, familia imperial de Augusto, Tiberio, Ruta de la Seda).
- Se crearon eventos nuevos derivados de conferencias huérfanas:
  - Atenas en el siglo V a.C.
  - La Anábasis y los Diez Mil
  - Roma: de aldea a capital del mundo
  - Heliogábalo
  - Qin Shi Huang y la tumba del Primer Emperador
- Se eliminaron duplicados en `relatedConferences`.
- Resultado: de 39 conferencias huérfanas se pasó a **9** (entrevistas,
  presentaciones de libro y próximas conferencias sin tema detallado).

### Pueblos coexistientes
- Se creó `/data/pueblos-coexistientes.json` con población aproximada, años de
  inicio/apogeo/fin, color, región, descripción y conferencias relacionadas.
- De 25 a **30 pueblos** tras añadir Fenicia, Cartago, Imperio Qin, Macedonia y
  Atenas.
- Se sincronizó el archivo en `/tob-app/data/pueblos-coexistientes.json`.

### Tipos actualizados
- `tob-app/app/types/timeline.ts` ahora incluye:
  - `MediaType`
  - `ConferenceItem` con `mediaType`
  - `TimelineEvent` con `relatedConferences`
  - `PeopleGroup`, `PeoplesMeta` y `PeoplesData`

### UI / UX
- `tob-app/app/components/TimelineEvent.tsx`:
  - Reescrito con estado `expanded` y animación `AnimatePresence`.
  - Por defecto muestra información esencial; al expandir, muestra resumen,
    consecuencias, civilizaciones, personajes, temas y todos los videos
    relacionados.
  - Badge con conteo de videos.
  - Uso de helpers compartidos desde `lib/media.tsx`.
- `tob-app/lib/media.tsx` (creado):
  - `getYouTubeId`, `getMediaType` e `MediaIcon` compartidos entre componentes.
- `tob-app/app/components/PopulationTimeline.tsx` (creado):
  - Visualización de pueblos como franjas horizontales en el tiempo.
  - Eje X desde 3500 a.C. hasta 1500 d.C.
  - Grosor de franja proporcional a la población de apogeo con escala de raíz
    cuadrada.
  - Animaciones con `framer-motion`, tooltips detallados y leyenda de regiones.
- `tob-app/app/components/TimelineViewSelector.tsx` (creado):
  - Selector con toggle animado para alternar entre la línea de tiempo clásica
    de eventos y la gráfica de pueblos coexistientes.
- `tob-app/app/timeline/page.tsx`:
  - Integra el selector de vistas y pasa los datos de eventos, pueblos y
    conferencias.

### Decisiones técnicas
- **JSON vs SQLite**: se mantuvo JSON. Los datos siguen siendo de solo lectura y
  estáticos; SQLite seguiría siendo overengineering para el alcance actual.
- **Copia de JSON en `/tob-app/data/`**: se mantiene la sincronización manual
  entre `/data` (maestro) y `/tob-app/data/` (consumido por Next.js).
- **Base UI (shadcn v4 + Next.js 16)**: el `Tooltip` de base-ui usa `render`
  prop en lugar de `asChild`, lo que obligó a ajustar la composición del trigger
  en `PopulationTimeline`.

### Scripts auxiliares
- `scripts/add_new_conferences.py`: integra lotes de conferencias verificadas
  sin duplicar y calcula `mediaType`.
- `scripts/fix_references.py`: renombra IDs y corrige referencias rotas.
- `scripts/expand_timeline.py`: asigna conferencias huérfanas a eventos y crea
  eventos/pueblos nuevos.

### Verificación
- `bun run build` ✅ — prerenderizado estático de `/` y `/timeline`.

### Pendientes posibles
- Crear una sección aparte para entrevistas y presentaciones de libro.
- Añadir filtros por civilización/personaje/tema también en la vista de pueblos.
- Explorar una vista combinada que muestre eventos y pueblos simultáneamente.

## 2026-08-24 (continuación) — Pantalla "Base de datos", enfoque en videos de YouTube y completado de datos

### Contexto
El usuario pidió una nueva pantalla/tab "Base de datos" con una tabla completa de
conferencias, ordenable por fecha histórica, período, civilización/pueblo, título,
organización y año de conferencia. También solicitó ocultar/mostrar columnas por
defecto, un filtro para mostrar solo videos de YouTube, y un enfoque general de la
app como acompañante de las conferencias en video. Finalmente, se reportó
información faltante en dos conferencias específicas y se pidió completarla sin
modificar el resto.

### Base de datos de conferencias
- Se creó `/tob-app/app/database/page.tsx` como ruta independiente `/database`.
- Se creó `/tob-app/app/components/ConferenceDatabase.tsx`:
  - Tabla ordenable por todas las columnas principales.
  - Búsqueda global por título, organización, temas, personajes y pueblos.
  - Filtros por período histórico y civilización/pueblo.
  - Selector de columnas visibles; por defecto ocultas: "Año conferencia" y
    "Organización".
  - Filtro **"Solo videos de YouTube"** con contador.
- Se creó `/tob-app/components/ui/table.tsx` con componentes base `Table`,
  `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.
- Se añadieron enlaces de navegación a "Base de datos" en:
  - `/tob-app/app/layout.tsx` (header principal).
  - `/tob-app/app/components/TimelineViewSelector.tsx` (tabs junto a Eventos,
    Pueblos y Videos).

### Enfoque en videos de YouTube
- Se añadieron los campos `youtube_url` e `info_adicional` a `ConferenceItem` en
  `/tob-app/app/types/timeline.ts`.
- Se creó y ejecutó `scripts/migrate_youtube_urls.py`:
  - 69 conferencias pasaron a tener `youtube_url` (URLs de YouTube existentes).
  - 7 conferencias con otra URL conservan `url` como fuente original y
    `youtube_url` vacío.
  - 24 conferencias sin URL permanecen vacías, listas para completar manualmente.
- Se actualizó `/tob-app/lib/youtube.ts` con `getYouTubeUrl()` y `isYouTubeUrl()`.
- Se actualizó `/tob-app/lib/media.tsx` para reexportar `getYouTubeUrl`.
- Se actualizaron todos los componentes de video para usar `getYouTubeUrl()`:
  - `/tob-app/app/videos/page.tsx`
  - `/tob-app/app/components/VideoCard.tsx`
  - `/tob-app/app/components/VideoCompanion.tsx`
  - `/tob-app/app/components/TimelineEvent.tsx`
  - `/tob-app/app/components/PopulationTimeline.tsx`
- En `/database`, el enlace del título y el icono de medio usan `youtube_url` como
  prioridad, manteniendo `url` como enlace a la fuente original.

### Completado de datos reportados
- Se identificaron 12 conferencias sin evento relacionado en la línea de tiempo.
- Se añadieron dos eventos nuevos en `/data/linea-de-tiempo-eva-tobalina.json`:
  - **El Imperio Medio de Egipto: reunificación y esplendor** (2040-1786 a.C.),
    vinculado a `egipto-imperio-medio`.
  - **El Kanato Turco: pueblos nómadas de la estepa** (552-744 d.C.), vinculado
    a `pueblos-estepa-turcos-ivoox`.
- Se actualizó `meta.total_eventos` de 46 a 48.
- Las 10 conferencias restantes sin evento (entrevistas, presentaciones de libro y
  próximas actividades) se dejaron pendientes siguiendo la instrucción de no
  modificar lo demás.

### Scripts auxiliares
- `scripts/migrate_youtube_urls.py`: migra URLs de YouTube al campo
  `youtube_url`.
- `scripts/add_missing_timeline_events.py`: añade eventos históricos faltantes
  para conferencias reportadas.

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes no relacionados).
- `bun run build` ✅ — prerenderizado estático de `/`, `/timeline`, `/videos` y
  `/database`.

### Pendientes posibles
- Completar manualmente `youtube_url` o `info_adicional` para las 7 conferencias
  con URL no-YouTube y las 24 sin URL.
- Vincular las 10 conferencias restantes (entrevistas/presentaciones) a eventos
  históricos si aplica.

## 2026-08-24 (continuación) — Limpieza de duplicados, corrección de Alejandro Magno y ajustes históricos

### Contexto
El usuario pidió arreglar los 7 videos de YouTube duplicados detectados en la
auditoría y aplicar las correcciones históricas señaladas en `docs/fb/1.md`.

### Limpieza de duplicados de videos
- Se creó y ejecutó `scripts/clean_duplicates.py`.
- Se eliminaron 6 conferencias duplicadas, conservando la versión más completa:
  - `ruta-seda-america-unab-2025` → `ruta-de-la-seda-america-unab`
  - `cena-cultura-raices-ruta-seda` → `ruta-seda-fascinante`
  - `pueblos-estepa-hunos-atila-ivoox` → `pueblos-estepa-hunos`
  - `hititas` → `imperio-hitita-i`
  - `livia-emperatriz` → `livia-mujer-augusto`
  - `babilonia` → `babilonia-neobabilonico`
- Se corrigió `alejandro-magno-iii`: tenía la misma URL que la parte I, lo cual
  es un error de datos; se le quitó URL hasta encontrar la correcta.
- Total de conferencias: de 100 a **94**.
- Videos de YouTube: de 69 a **62** únicos, sin duplicados.

### Actualización de referencias
- Se reemplazaron los IDs eliminados en `relatedConferences` de:
  - `/data/linea-de-tiempo-eva-tobalina.json`
  - `/data/pueblos-coexistientes.json`
- Se verificó que no quedaran referencias rotas.

### Correcciones históricas en pueblos coexistientes
Aplicadas siguiendo el feedback de `docs/fb/1.md`:
- **Fenicia**: `endYear` de -800 a **-539** a.C.
- **Grecia clásica**: renombrada a **Grecia antigua** (el rango -800 a -323
  abarca Época Arcaica y Clásica).
- **Imperio Mongol**: `endYear` de 1368 a **1260** d.C. (fase unificada).
- **Asiria**: `startYear` de -2500 a **-911** a.C. (enfoque en el Imperio
  Neoasirio, coherente con el año de apogeo -700).
- **Babilonia**: descripción matizada para indicar que abarca los períodos
  paleobabilónico, casita y neobabilónico.
- **Hunos**: eliminado el bloque unificado y separado en dos entidades
  históricamente distintas:
  - **Xiongnu** (-209 a 93 d.C.)
  - **Hunos europeos** (370 a 469 d.C.)
- Total de pueblos: de 28 a **29**.

### Sincronización
- Se copiaron los JSON actualizados de `/data/` a `/tob-app/data/`.

### Verificación
- `bun run lint` ✅ — sin errores.
- `bun run build` ✅ — prerenderizado estático correcto.
- Auditoría interna: 0 referencias rotas, 0 URLs de YouTube duplicadas.

### Pendientes posibles
- Buscar las URLs correctas de `alejandro-magno-ii`, `alejandro-magno-iii` y
  `alejandro-magno-iv` para completar la serie.
- Revisar las 7 conferencias con URL no-YouTube y las sin URL para decidir si se
  añaden `youtube_url` o `info_adicional`.


## 2026-08-24 (continuación) — Integración de docs/fb/2.md y corrección del campo `period`

### Contexto
El usuario pidió integrar las conferencias adicionales documentadas en
`docs/fb/2.md`, verificar cada enlace de YouTube y reemplazar los enlaces
genéricos al canal por URLs exactas de video cuando fuera posible. También se
reportó que la información histórica de algunas conferencias seguía sin verse,
lo que llevó a detectar un bug en el campo `period` de la línea de tiempo.

### Integración de `docs/fb/2.md`
- Se creó `scripts/integrate_fb2.py` para:
  - Extraer los dos bloques JSON del markdown (29 ítems en total).
  - Normalizarlos al esquema `ConferenceItem` y calcular `mediaType`.
  - Desduplicar por ID y por URL contra el catálogo existente y entre los dos
    bloques internos.
- Resultado de la deduplicación:
  - **18 ítems descartados** por duplicidad interna o por existir ya en el
    catálogo (por ejemplo `atila-ascenso-caida` comparte URL con
    `pueblos-estepa-hunos`).
  - **11 conferencias nuevas** candidatas a añadir.

### Verificación de URLs con oEmbed de YouTube
Se usó el endpoint `https://www.youtube.com/oembed?url=...&format=json` para
validar existencia y coincidencia de título. Resultados:

| ID | Título | Estado |
|---|---|---|
| `biblioteca-alejandria-2014` | La Biblioteca de Alejandría... | ✅ Verificado |
| `historia-roma-i-fundacion` | Historia de Roma I (1). LA FUNDACIÓN DE ROMA... | ✅ Verificado |
| `fenomeno-oraculos` | EL FENÓMENO DE LOS ORÁCULOS... | ✅ Verificado |
| `exodo-egipto` | Conferencia ¿Existió el Éxodo de Egipto? | ❌ No verificado |
| `petra-nabateos` | Petra y los Nabateos | ❌ No verificado |
| `libano-helenistico-romano` | El Líbano en la época helenística y romana | ❌ No verificado |
| `puerta-mileto-berlin` | La Puerta Monumental del Mercado de Mileto... | ❌ No verificado |
| `oraculo-dioses-antiguedad` | El fenómeno del oráculo... | ❌ No verificado |
| `origen-mundo-creacion-hombre` | El origen del mundo y la creación del hombre | ❌ No verificado (ID apunta a otro video) |
| `jordania-omeyas` | Jordania y los Omeyas... | ❌ Placeholder del canal |
| `griegos-asia-alejandro` | Los Griegos de Asia... | ❌ Placeholder del canal |

- Las **3 conferencias verificadas** conservan `youtube_url` y `mediaType: "video"`.
- Las **6 no verificadas** se añadieron al catálogo con `url`/`youtube_url` a
  `null` y una nota en `info_adicional` indicando la URL original sugerida y su
  estado pendiente.
- Los **2 placeholders** (`7GXW4fPm4bI`, `BYzZ5t7HLR0`) se añadieron con URLs
  vacías y `info_adicional` señalando que se trata de un enlace genérico al canal
  de Raíces de Europa pendiente de identificación.
- Total de conferencias: de **94 a 105**.
- Videos de YouTube verificados: de **62 a 65**.

### Corrección del campo `period` en la línea de tiempo
- Se detectó que todos los eventos de `linea-de-tiempo-eva-tobalina.json` tenían
  `period` como valor booleano (`true`/`false`) en lugar del período histórico.
- Se creó un script puntual que asigna el período a partir de `startYear`:
  - `< -3500`: Prehistoria
  - `< 476`: Edad Antigua
  - `< 1453`: Edad Media
  - `< 1789`: Edad Moderna
  - `>= 1789`: Edad Contemporánea
- Se corrigieron **48 eventos**; los valores resultantes son `Edad Antigua` y
  `Edad Media`, coherentes con la cobertura actual.
- Se actualizó `app/types/timeline.ts`: `TimelineEvent.period` pasó de `boolean`
  a `string`.
- Se actualizó `meta.ultima_actualizacion`.

### Sincronización
- Se copiaron los tres JSON maestros (`conferencias`, `linea-de-tiempo`,
  `pueblos-coexistientes`) a `/tob-app/data/`.

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes no relacionados).
- `bun run build` ✅ — prerenderizado estático de `/`, `/timeline`, `/videos` y
  `/database`.
- Auditoría interna: 0 referencias rotas, 0 URLs de YouTube duplicadas.

### Pendientes posibles
- Localizar URLs exactas de las 6 conferencias verificadas como no disponibles y
  de los 2 placeholders del canal de Raíces de Europa.
- Revisar si alguna de las nuevas conferencias verificadas debe vincularse a un
  evento histórico existente o a uno nuevo.


## 2026-08-24 (continuación) — Búsqueda de URLs exactas para conferencias pendientes

### Contexto
Tras integrar `docs/fb/2.md`, quedaron 6 conferencias con URL no verificada y 2 con
enlaces placeholder del canal de Raíces de Europa. El usuario pidió buscar las URLs
exactas de esos 8 videos.

### Metodología
- Se usó el endpoint de búsqueda de YouTube (`/results?search_query=...`) y se
  parseó la variable `ytInitialData` para extraer los resultados de video.
- Para cada candidato se verificó autor y título mediante el endpoint oEmbed de
  YouTube.
- Se descartaron videos de otros canales (por ejemplo, el resultado para el Éxodo
  pertenecía al canal "Homo Narrans", no a Raíces de Europa).

### Resultados

| ID | Título | URL encontrada | Estado |
|---|---|---|---|
| `petra-nabateos` | Petra y los Nabateos | `JaeqZPIaTEM` | ✅ Verificado |
| `libano-helenistico-romano` | El Líbano en la época helenística y romana | `k7_2DASLg3g` | ✅ Verificado |
| `puerta-mileto-berlin` | La Puerta Monumental del Mercado de Mileto... | `C4N-5f8O_D0` | ✅ Verificado |
| `origen-mundo-creacion-hombre` | Mesopotamia y sus leyendas: el origen del mundo... | `pn63MQYAJyU` | ✅ Verificado |
| `jordania-omeyas` | Jordania y los Omeyas | `XPVKQCV-SfI` | ✅ Verificado |
| `griegos-asia-alejandro` | Los Griegos de Asia | `ynflGu7FPfA` | ✅ Verificado |
| `exodo-egipto` | Conferencia ¿Existió el Éxodo de Egipto? | — | ❌ No localizado |
| `oraculo-dioses-antiguedad` | El fenómeno del oráculo | — | Eliminado (duplicado) |

### Duplicado detectado y eliminado
- `oraculo-dioses-antiguedad` resultó ser el mismo video que `fenomeno-oraculos`
  (`L_i8zHiUG4A`: "EL FENÓMENO DE LOS ORÁCULOS por EVA TOBALINA"), por lo que se
  eliminó del catálogo para evitar duplicidad de URL.

### Conferencia no localizada
- `exodo-egipto` no se encontró en el canal de Raíces de Europa con el título
  "¿Existió el Éxodo de Egipto?". Se mantiene en el catálogo con `url`/`youtube_url`
  a `null` y una nota en `info_adicional` indicando que la URL exacta no fue
  localizada.

### Sincronización y verificación
- JSONs copiados de `/data/` a `/tob-app/data/`.
- `bun run lint` ✅ — sin errores (warnings preexistentes).
- `bun run build` ✅ — prerenderizado estático correcto.
- Total de conferencias: de 105 a **104** (por eliminación del duplicado).
- Videos de YouTube verificados: de 65 a **71**.

### Commit
- Commiteado en `tobalina/tob-app` con el mensaje descriptivo correspondiente.


## 2026-08-24 (continuación) — Completar fecha histórica y período de nuevas conferencias

### Contexto
El usuario reportó que varias conferencias recién integradas (Biblioteca de
Alejandría, Historia de Roma I, Fenómeno de los oráculos) mostraban "—" en las
columnas de fecha histórica y período de `/database`. Esto ocurría porque no
estaban vinculadas a ningún evento de la línea de tiempo.

### Solución
Se añadieron eventos históricos y se enlazaron las conferencias huérfanas:

#### Enlaces a eventos existentes
- `biblioteca-alejandria-2014` → `egipto-ptolemaico-evento` (332-30 a.C.)
- `historia-roma-i-fundacion` → `roma-ciudad-eterna` (c. 753 a.C. - 476 d.C.)
- `griegos-asia-alejandro` → `alejandro-magno` (356-323 a.C.)

#### Nuevos eventos creados
- **Los oráculos en la Antigüedad: la voz de los dioses** (c. 800 a.C. - 393 d.C.)
  - Vinculado a `fenomeno-oraculos`.
- **Los nabateos y la ciudad rosada de Petra** (c. 400 a.C. - 106 d.C.)
  - Vinculado a `petra-nabateos`.
- **El Líbano en la época helenística y romana** (333 a.C. - 395 d.C.)
  - Vinculado a `libano-helenistico-romano`.
- **Mileto en la Asia Menor romana: la Puerta del Mercado** (c. 120-200 d.C.)
  - Vinculado a `puerta-mileto-berlin`.
- **Mitos de creación: del mundo y del hombre** (c. 3000 a.C. - 500 d.C.)
  - Vinculado a `origen-mundo-creacion-hombre`.
- **El Califato Omeya: Jordania y el arte islámico temprano** (661-750 d.C.)
  - Vinculado a `jordania-omeyas`.

### Resultado
- Eventos históricos: de 48 a **54**.
- Conferencias huérfanas: de 20 a **11** (las restantes son entrevistas,
  presentaciones de libro, `exodo-egipto` sin URL verificada y una conferencia
  próxima sin fecha concreta).
- Las conferencias reportadas ahora muestran fecha histórica y período en
  `/database`.

### Verificación
- `bun run lint` ✅ — sin errores.
- `bun run build` ✅ — prerenderizado estático correcto.
- 0 referencias rotas, 0 URLs de YouTube duplicadas.

### Commit
- Commiteado en `tobalina/tob-app` con el mensaje descriptivo correspondiente.


## 2026-08-24 (continuación) — Nueva vista "Gráfica vertical" de pueblos coexistientes

### Contexto
El usuario pidió una segunda opción de línea de tiempo en `/timeline` que mantuviera
el legacy existente (eventos históricos y pueblos horizontales) pero añadiera una
nueva visualización tipo "gráfica animada hacia abajo". Los requisitos fueron:
- Franjas de color cuya anchura represente la población aproximada.
- Click para abrir un dialog con detalles y todos los videos relacionados.
- Enfoque primordial en conferencias con contenido de YouTube válido.
- Por defecto mostrar solo pueblos con videos de YouTube con enlace correcto.
- Similar a la línea de tiempo legacy, con medida temporal y línea central.
- Paginación de 10 en 10, infinite scroll, botón "Mostrar más" y navegación flotante.
- En la línea de tiempo actual, aumentar el tamaño de fechas e info de badges en
  desktop, evitando `text-xs` e incluso `text-sm`.

### UI / UX
- Se creó `/tob-app/components/ui/dialog.tsx` basado en `@base-ui/react/dialog`,
  siguiendo el mismo patrón que `sheet.tsx`.
- Se creó `/tob-app/app/components/VerticalPopulationTimeline.tsx`:
  - Vista "Gráfica vertical" accesible desde `TimelineViewSelector`.
  - Layout estilo legacy: línea vertical central, tarjetas a izquierda y derecha
    alternadas, posicionadas según el año de apogeo de cada pueblo.
  - Cada tarjeta incluye nombre, fechas, región, población, descripción y una
    franja de color cuyo ancho representa la población aproximada (escala de raíz
    cuadrada).
  - La línea central muestra el período de cada pueblo como franjas verticales de
    color en carriles paralelos, de modo que cuando varias civilizaciones coexisten
    en el mismo tiempo se ven múltiples colores simultáneamente.
  - Tanto las tarjetas como las franjas de la línea central son clicables y abren
    el mismo dialog con detalles del pueblo y todos los videos de YouTube
    relacionados.
  - Por defecto se filtran solo los pueblos que tienen al menos un video de YouTube
    relacionado; hay un toggle para mostrar todos.
  - Paginación de 10 en 10 con infinite scroll (IntersectionObserver) y botón
    "Mostrar más".
  - Botones flotantes abajo a la izquierda para navegar al punto anterior/siguiente
    de la línea del tiempo.
  - Animaciones de entrada con `framer-motion`.
- Se actualizó `/tob-app/app/components/TimelineViewSelector.tsx`:
  - Se añadió la pestaña "Gráfica vertical" junto a "Eventos históricos" y
    "Pueblos".
  - Se acortó la etiqueta "Pueblos coexistientes" a "Pueblos" para mejorar el
    espacio disponible.
- Se actualizó `/tob-app/app/components/TimelineEvent.tsx`:
  - Aumento de tamaño de texto en desktop para badges de fecha/ubicación/videos,
    descripción, secciones expandidas, listas, badges internos y botón de acción.
  - Se mantuvo el tamaño más pequeño en móvil siguiendo el enfoque mobile-first.
  - Mejoras en la tarjeta de video relacionado (`RelatedVideoCard`) para tamaños
    mayores en desktop.

### Tipos y helpers
- No se modificaron los tipos de `app/types/timeline.ts`; se reutilizaron
  `PeopleGroup` y `ConferenceItem`.
- Se reutilizaron `getYouTubeUrl` de `@/lib/youtube` y `getMediaType` / `MediaIcon`
  de `@/lib/media`.

### Datos
- No se modificaron los JSON maestros. El filtro por videos se aplica en tiempo de
  ejecución sobre `pueblos-coexistientes.json` y `conferencias-eva-tobalina.json`.
- Actualmente 25 de 29 pueblos tienen al menos un video de YouTube relacionado.

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes no relacionados).
- `bun run build` ✅ — prerenderizado estático correcto.

### Pendientes posibles
- Añadir conectores visuales entre las tarjetas y sus franjas en el eje central.
- Permitir que el usuario cambie la métrica de anchura de la franja de población
  (lineal vs raíz cuadrada).
- Evaluar si el filtro "solo con videos" debe aplicarse también a la vista
  horizontal de pueblos existente.


## 2026-08-24 (continuación) — Tooltip en las franjas verticales del eje central

### Contexto
El usuario pidió que las líneas verticales de color del eje central muestren un
tooltip al hacer hover con el nombre de la civilización y las fechas de inicio/fin.

### UI / UX
- Se envolvió cada franja vertical de la línea central con el componente `Tooltip`
  de shadcn/base-ui.
- Al hacer hover se muestra un tooltip con:
  - Nombre del pueblo/civilización.
  - Periodo: `startYear` — `endYear`.
  - Año de apogeo y región.
- Se mantuvo el click en la franja para abrir el dialog con detalles y videos.
- Se ajustó la animación `whileHover` para que la franja se ensanche desde el centro
  sin romper el layout de carriles.

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes).
- `bun run build` ✅ — prerenderizado estático correcto.


## 2026-08-24 (continuación) — Mejoras visuales de color en la gráfica vertical

### Contexto
Tras revisar los últimos screenshots, se decidió pulir la apariencia de colores en
la vista "Gráfica vertical" para dar más profundidad y legibilidad a las franjas
de población y a las bandas del eje central.

### UI / UX
- Se añadió el helper `hexToRgba` para convertir los colores hex de cada pueblo en
  valores rgba y poder aplicar degradados y sombras con opacidad.
- Se mejoró la barra de población dentro de cada tarjeta:
  - Degradado horizontal sutil (`90deg`, del color con opacidad al color sólido).
  - Sombra del mismo color con baja opacidad para un leve efecto de brillo.
  - Fondo de la pista con `shadow-inner` para dar sensación de profundidad.
- Se mejoraron las bandas verticales del eje central:
  - Ancho aumentado de 8 px a **10 px** y separación entre carriles de 2 px a **3 px**.
  - Degradado vertical del color sólido a una versión con 75 % de opacidad.
  - Sombra exterior del color para resaltar cada banda sobre el fondo.
  - Reflejo sutil en la parte superior (`inset 0 1px 0 rgba(255,255,255,0.25)`).

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes).
- `bun run build` ✅ — prerenderizado estático correcto.


## 2026-08-24 (continuación) — Aumento de tamaño de texto en tooltip

### Contexto
El usuario pidió que el texto del tooltip de las franjas verticales del eje central
fuera un poco más grande.

### UI / UX
- Se aumentó el tamaño de la tipografía dentro de `TooltipContent`:
  - Nombre del pueblo: `text-sm` en móvil, `text-base` en desktop.
  - Fechas y apogeo/región: `text-xs` en móvil, `text-sm` en desktop.
  - Se añadió un poco más de padding interno (`px-3 py-2`).

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes).
- `bun run build` ✅ — prerenderizado estático correcto.


## 2026-08-24 (resumen de la sesión) — Nuevas interacciones y pulido visual

### Contexto
Durante esta sesión se continuó iterando sobre la vista "Gráfica vertical" de
pueblos coexistientes que se había creado previamente. El foco estuvo en mejorar
la usabilidad, la estética y la información disponible sin modificar el legacy.

### Cambios adicionales de esta sesión
- **Tooltips en el eje central**: cada franja vertical de color muestra un tooltip
  al hacer hover con el nombre del pueblo, fechas de inicio/fin, año de apogeo y
  región.
- **Texto de tooltip más grande**: se aumentó la tipografía del tooltip para mejor
  legibilidad (`text-base` para el nombre y `text-sm` para fechas en desktop).
- **Pulido de colores**:
  - Ancho de las franjas del eje central aumentado a 10 px.
  - Degradado vertical y sombra exterior en las franjas del eje.
  - Degradado horizontal y brillo sutil en las barras de población de las tarjetas.
  - Helper `hexToRgba` para aplicar opacidades y sombras a partir de los colores
    hex de cada pueblo.
- **Click en franjas del eje**: se mantuvo y se integró con el tooltip; al hacer
  click se abre el dialog con detalles y videos.

### Verificación
- `bun run lint` ✅ — sin errores (warnings preexistentes).
- `bun run build` ✅ — prerenderizado estático correcto.
