"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { ConferenceItem } from "@/app/types/timeline";

interface ConferenceFormProps {
  conference?: ConferenceItem;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function ConferenceForm({ conference, action }: ConferenceFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await action(formData);
    setPending(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="id">ID único</Label>
          <Input
            id="id"
            name="id"
            defaultValue={conference?.id}
            readOnly={!!conference}
            required
            placeholder="ej. alejandria-sueno-alejandro"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            defaultValue={conference?.title}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Input id="type" name="type" defaultValue={conference?.type ?? "conferencia"} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Año</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={conference?.year ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={conference?.date ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organización</Label>
          <Input
            id="organization"
            name="organization"
            defaultValue={conference?.organization}
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" defaultValue={conference?.url ?? ""} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="youtubeUrl">URL de YouTube</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            defaultValue={conference?.youtubeUrl ?? ""}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="infoAdicional">Info adicional</Label>
          <Input
            id="infoAdicional"
            name="infoAdicional"
            defaultValue={conference?.infoAdicional ?? ""}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={conference?.description}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="summary">Resumen</Label>
          <textarea
            id="summary"
            name="summary"
            rows={4}
            defaultValue={conference?.summary}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="topics">Temas (separados por comas)</Label>
          <Input
            id="topics"
            name="topics"
            defaultValue={conference?.topics.join(", ")}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="characters">Personajes (separados por comas)</Label>
          <Input
            id="characters"
            name="characters"
            defaultValue={conference?.characters.join(", ")}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="civilizations">
            Civilizaciones (separadas por comas)
          </Label>
          <Input
            id="civilizations"
            name="civilizations"
            defaultValue={conference?.civilizations.join(", ")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración</Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={conference?.duration ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Input
            id="language"
            name="language"
            defaultValue={conference?.language ?? "es"}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="source">Fuente</Label>
          <Input
            id="source"
            name="source"
            defaultValue={conference?.source ?? ""}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="mediaType">Tipo de medio</Label>
          <select
            id="mediaType"
            name="mediaType"
            defaultValue={conference?.mediaType ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">—</option>
            <option value="video">video</option>
            <option value="audio">audio</option>
            <option value="web">web</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando..." : conference ? "Guardar cambios" : "Crear conferencia"}
        </Button>
        <a
          href="/admin/conferences"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
