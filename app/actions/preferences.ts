"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserPreferences(
  userId: string,
  preferences: {
    showNonYoutubeEvents?: boolean;
    showAllPeoples?: boolean;
  }
) {
  await prisma.userPreferences.upsert({
    where: { userId },
    create: {
      userId,
      showNonYoutubeEvents: preferences.showNonYoutubeEvents ?? false,
      showAllPeoples: preferences.showAllPeoples ?? false,
    },
    update: {
      showNonYoutubeEvents: preferences.showNonYoutubeEvents,
      showAllPeoples: preferences.showAllPeoples,
    },
  });

  revalidatePath("/timeline");
  revalidatePath("/profile/preferences");
}
