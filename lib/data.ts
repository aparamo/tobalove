import "server-only";

import { prisma } from "@/lib/prisma";

export async function getConferences() {
  return prisma.conference.findMany({
    orderBy: { year: "asc" },
  });
}

export async function getConferenceById(id: string) {
  return prisma.conference.findUnique({
    where: { id },
  });
}

export async function getTimelineEvents() {
  return prisma.timelineEvent.findMany({
    orderBy: { startYear: "asc" },
  });
}

export async function getPeoples() {
  return prisma.peopleGroup.findMany({
    orderBy: { startYear: "asc" },
  });
}

export async function getTimelineMeta() {
  return prisma.timelineMeta.findUnique({
    where: { id: "default" },
  });
}

export async function getPeoplesMeta() {
  return prisma.peoplesMeta.findUnique({
    where: { id: "default" },
  });
}

export async function getWatchedConferenceIds(userId: string) {
  const rows = await prisma.userWatchedConference.findMany({
    where: { userId },
    select: { conferenceId: true },
  });
  return new Set(rows.map((r) => r.conferenceId));
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
