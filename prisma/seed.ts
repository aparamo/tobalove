import "dotenv/config";
import conferencesData from "@/data/conferencias-eva-tobalina.json";
import timelineData from "@/data/linea-de-tiempo-eva-tobalina.json";
import peoplesData from "@/data/pueblos-coexistientes.json";
import { prisma } from "@/lib/prisma";

async function seed() {
  console.log("Seeding conferences...");
  for (const item of conferencesData.items) {
    await prisma.conference.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        type: item.type,
        date: item.date,
        year: item.year,
        organization: item.organization,
        url: item.url,
        youtubeUrl: item.youtube_url,
        infoAdicional: item.info_adicional,
        description: item.description,
        summary: item.summary,
        topics: item.topics,
        characters: item.characters,
        civilizations: item.civilizations,
        duration: item.duration,
        language: item.language,
        source: item.source,
        mediaType: item.mediaType,
      },
      create: {
        id: item.id,
        title: item.title,
        type: item.type,
        date: item.date,
        year: item.year,
        organization: item.organization,
        url: item.url,
        youtubeUrl: item.youtube_url,
        infoAdicional: item.info_adicional,
        description: item.description,
        summary: item.summary,
        topics: item.topics,
        characters: item.characters,
        civilizations: item.civilizations,
        duration: item.duration,
        language: item.language,
        source: item.source,
        mediaType: item.mediaType,
      },
    });
  }
  console.log(`Seeded ${conferencesData.items.length} conferences.`);

  console.log("Seeding timeline events...");
  for (const item of timelineData.items) {
    await prisma.timelineEvent.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        dateLabel: item.dateLabel,
        startYear: item.startYear,
        endYear: item.endYear,
        period: item.period,
        location: item.location,
        description: item.description,
        summary: item.summary,
        consequences: item.consequences,
        characters: item.characters,
        civilizations: item.civilizations,
        topics: item.topics,
        sourceConference: item.sourceConference,
        relatedConferences: item.relatedConferences,
      },
      create: {
        id: item.id,
        title: item.title,
        dateLabel: item.dateLabel,
        startYear: item.startYear,
        endYear: item.endYear,
        period: item.period,
        location: item.location,
        description: item.description,
        summary: item.summary,
        consequences: item.consequences,
        characters: item.characters,
        civilizations: item.civilizations,
        topics: item.topics,
        sourceConference: item.sourceConference,
        relatedConferences: item.relatedConferences,
      },
    });
  }
  console.log(`Seeded ${timelineData.items.length} timeline events.`);

  console.log("Seeding timeline meta...");
  await prisma.timelineMeta.upsert({
    where: { id: "default" },
    update: {
      autorContenido: timelineData.meta.autor_contenido,
      enfoque: timelineData.meta.enfoque,
      coberturaCronologica: timelineData.meta.cobertura_cronologica,
      totalEventos: timelineData.meta.total_eventos,
      fuentesPrincipales: timelineData.meta.fuentes_principales,
      ultimaActualizacion: timelineData.meta.ultima_actualizacion,
    },
    create: {
      id: "default",
      autorContenido: timelineData.meta.autor_contenido,
      enfoque: timelineData.meta.enfoque,
      coberturaCronologica: timelineData.meta.cobertura_cronologica,
      totalEventos: timelineData.meta.total_eventos,
      fuentesPrincipales: timelineData.meta.fuentes_principales,
      ultimaActualizacion: timelineData.meta.ultima_actualizacion,
    },
  });

  console.log("Seeding people groups...");
  for (const item of peoplesData.items) {
    await prisma.peopleGroup.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        startYear: item.startYear,
        endYear: item.endYear,
        peakYear: item.peakYear,
        peakPopulation: item.peakPopulation,
        color: item.color,
        region: item.region,
        description: item.description,
        civilizations: item.civilizations,
        relatedConferences: item.relatedConferences,
      },
      create: {
        id: item.id,
        name: item.name,
        startYear: item.startYear,
        endYear: item.endYear,
        peakYear: item.peakYear,
        peakPopulation: item.peakPopulation,
        color: item.color,
        region: item.region,
        description: item.description,
        civilizations: item.civilizations,
        relatedConferences: item.relatedConferences,
      },
    });
  }
  console.log(`Seeded ${peoplesData.items.length} people groups.`);

  console.log("Seeding peoples meta...");
  await prisma.peoplesMeta.upsert({
    where: { id: "default" },
    update: {
      autorContenido: peoplesData.meta.autor_contenido,
      enfoque: peoplesData.meta.enfoque,
      coberturaCronologica: peoplesData.meta.cobertura_cronologica,
      totalPueblos: peoplesData.meta.total_pueblos,
      unidadPoblacion: peoplesData.meta.unidad_poblacion,
      fuentesPrincipales: peoplesData.meta.fuentes_principales,
      ultimaActualizacion: peoplesData.meta.ultima_actualizacion,
    },
    create: {
      id: "default",
      autorContenido: peoplesData.meta.autor_contenido,
      enfoque: peoplesData.meta.enfoque,
      coberturaCronologica: peoplesData.meta.cobertura_cronologica,
      totalPueblos: peoplesData.meta.total_pueblos,
      unidadPoblacion: peoplesData.meta.unidad_poblacion,
      fuentesPrincipales: peoplesData.meta.fuentes_principales,
      ultimaActualizacion: peoplesData.meta.ultima_actualizacion,
    },
  });

  console.log("Seed completed.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
