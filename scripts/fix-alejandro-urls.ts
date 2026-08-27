import { prisma } from '../lib/prisma';

async function main() {
  await prisma.conference.update({
    where: { id: 'alejandro-magno-i' },
    data: {
      url: 'https://www.youtube.com/watch?v=7K4S4i6HUcY',
      youtubeUrl: 'https://www.youtube.com/watch?v=7K4S4i6HUcY',
    },
  });
  console.log('✅ alejandro-magno-i actualizado a 7K4S4i6HUcY');

  await prisma.conference.update({
    where: { id: 'alejandro-magno-iii' },
    data: {
      url: 'https://www.youtube.com/watch?v=4qHAYtcd5IU',
      youtubeUrl: 'https://www.youtube.com/watch?v=4qHAYtcd5IU',
      mediaType: 'video',
    },
  });
  console.log('✅ alejandro-magno-iii actualizado a 4qHAYtcd5IU');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
