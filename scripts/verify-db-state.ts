import { prisma } from '../lib/prisma';

async function main() {
  const events = await prisma.timelineEvent.findMany();
  const peoples = await prisma.peopleGroup.findMany();
  const cycleEvents = events.filter((e: any) => e.isYoutubeConference === false);
  const secondaryEvents = events.filter((e: any) => e.isSecondary === true);
  const secondaryPeoples = peoples.filter((p: any) => p.isSecondary === true);
  console.log('BD eventos:', events.length);
  console.log('BD pueblos:', peoples.length);
  console.log('Eventos ciclo (isYoutubeConference=false):', cycleEvents.length);
  console.log('Eventos secundarios (isSecondary=true):', secondaryEvents.length);
  console.log('Pueblos secundarios (isSecondary=true):', secondaryPeoples.length);
  console.log('Eventos ciclo:', cycleEvents.map((e: any) => e.id).join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
