"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateUserPreferences } from "@/app/actions/preferences";

interface PreferencesFormProps {
  userId: string;
  initialShowNonYoutubeEvents: boolean;
  initialShowAllPeoples: boolean;
}

export function PreferencesForm({
  userId,
  initialShowNonYoutubeEvents,
  initialShowAllPeoples,
}: PreferencesFormProps) {
  const router = useRouter();
  const [showNonYoutubeEvents, setShowNonYoutubeEvents] = useState(initialShowNonYoutubeEvents);
  const [showAllPeoples, setShowAllPeoples] = useState(initialShowAllPeoples);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateUserPreferences(userId, {
      showNonYoutubeEvents,
      showAllPeoples,
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Línea de tiempo</CardTitle>
          <CardDescription>
            Controla qué contenido se muestra en la página de línea de tiempo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="show-non-youtube-events" className="text-base font-medium">
                Mostrar eventos sin video de YouTube
              </Label>
              <p className="text-sm text-muted-foreground">
                Por defecto solo se muestran eventos vinculados a conferencias en YouTube.
                Activa esta opción para incluir también ciclos, eventos de ciclo y otros
                contenidos sin video.
              </p>
            </div>
            <Switch
              id="show-non-youtube-events"
              checked={showNonYoutubeEvents}
              onCheckedChange={setShowNonYoutubeEvents}
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="show-all-peoples" className="text-base font-medium">
                Mostrar todos los pueblos
              </Label>
              <p className="text-sm text-muted-foreground">
                Por defecto se muestran todos los pueblos que tienen al menos una conferencia
                relacionada. Activa esta opción para incluir también pueblos adicionales que
                aún no cuentan con conferencia en la base de datos.
              </p>
            </div>
            <Switch
              id="show-all-peoples"
              checked={showAllPeoples}
              onCheckedChange={setShowAllPeoples}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar preferencias"}
        </Button>
        {saved && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            Preferencias guardadas
          </span>
        )}
      </div>
    </form>
  );
}
