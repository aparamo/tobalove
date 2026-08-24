"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

const conferenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().default("conferencia"),
  date: z.string().nullable(),
  year: z.coerce.number().nullable(),
  organization: z.string().min(1),
  url: z.string().nullable(),
  youtubeUrl: z.string().nullable(),
  infoAdicional: z.string().nullable(),
  description: z.string().default(""),
  summary: z.string().default(""),
  topics: z.string().default(""),
  characters: z.string().default(""),
  civilizations: z.string().default(""),
  duration: z.string().nullable(),
  language: z.string().default("es"),
  source: z.string().default(""),
  mediaType: z.string().nullable(),
});

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createConference(formData: FormData) {
  await requireAdmin();

  const parsed = conferenceSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    type: formData.get("type"),
    date: formData.get("date") || null,
    year: formData.get("year") || null,
    organization: formData.get("organization"),
    url: formData.get("url") || null,
    youtubeUrl: formData.get("youtubeUrl") || null,
    infoAdicional: formData.get("infoAdicional") || null,
    description: formData.get("description"),
    summary: formData.get("summary"),
    topics: formData.get("topics"),
    characters: formData.get("characters"),
    civilizations: formData.get("civilizations"),
    duration: formData.get("duration") || null,
    language: formData.get("language"),
    source: formData.get("source"),
    mediaType: formData.get("mediaType") || null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const data = parsed.data;

  try {
    await prisma.conference.create({
      data: {
        ...data,
        topics: parseList(data.topics),
        characters: parseList(data.characters),
        civilizations: parseList(data.civilizations),
      },
    });
  } catch {
    return { error: "No se pudo crear la conferencia. Comprueba el ID." };
  }

  revalidatePath("/database");
  revalidatePath("/videos");
  revalidatePath("/timeline");
  redirect("/admin/conferences");
}

export async function updateConference(formData: FormData) {
  await requireAdmin();

  const parsed = conferenceSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    type: formData.get("type"),
    date: formData.get("date") || null,
    year: formData.get("year") || null,
    organization: formData.get("organization"),
    url: formData.get("url") || null,
    youtubeUrl: formData.get("youtubeUrl") || null,
    infoAdicional: formData.get("infoAdicional") || null,
    description: formData.get("description"),
    summary: formData.get("summary"),
    topics: formData.get("topics"),
    characters: formData.get("characters"),
    civilizations: formData.get("civilizations"),
    duration: formData.get("duration") || null,
    language: formData.get("language"),
    source: formData.get("source"),
    mediaType: formData.get("mediaType") || null,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const data = parsed.data;

  await prisma.conference.update({
    where: { id: data.id },
    data: {
      ...data,
      topics: parseList(data.topics),
      characters: parseList(data.characters),
      civilizations: parseList(data.civilizations),
    },
  });

  revalidatePath("/database");
  revalidatePath("/videos");
  revalidatePath("/timeline");
  redirect("/admin/conferences");
}

export async function deleteConference(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing id");

  await prisma.conference.delete({
    where: { id },
  });

  revalidatePath("/database");
  revalidatePath("/videos");
  revalidatePath("/timeline");
}

export async function updateUserRole(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const role = formData.get("role") as "USER" | "ADMIN";

  if (!id || !role) throw new Error("Missing fields");

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing id");

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
