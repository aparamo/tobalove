"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleWatchedConference(conferenceId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const existing = await prisma.userWatchedConference.findUnique({
    where: {
      userId_conferenceId: {
        userId,
        conferenceId,
      },
    },
  });

  if (existing) {
    await prisma.userWatchedConference.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.userWatchedConference.create({
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
