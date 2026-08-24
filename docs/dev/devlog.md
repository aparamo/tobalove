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
