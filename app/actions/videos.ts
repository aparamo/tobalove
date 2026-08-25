"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteConference(conferenceId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const existing = await prisma.userFavoriteConference.findUnique({
    where: {
      userId_conferenceId: {
        userId,
        conferenceId,
      },
    },
  });

  if (existing) {
    await prisma.userFavoriteConference.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.userFavoriteConference.create({
      data: {
        userId,
        conferenceId,
      },
    });
  }

  revalidatePath("/videos");
  revalidatePath("/database");
  revalidatePath("/mis-videos");
}

export async function toggleWatchlistConference(conferenceId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const existing = await prisma.userWatchlistConference.findUnique({
    where: {
      userId_conferenceId: {
        userId,
        conferenceId,
      },
    },
  });

  if (existing) {
    await prisma.userWatchlistConference.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.userWatchlistConference.create({
      data: {
        userId,
        conferenceId,
      },
    });
  }

  revalidatePath("/videos");
  revalidatePath("/database");
  revalidatePath("/mis-videos");
}
