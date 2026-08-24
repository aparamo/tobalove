"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Video,
  AudioLines,
  Globe,
  ExternalLink,
  Database,
  Columns,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getYouTubeUrl } from "@/lib/youtube";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ConferenceItem } from "@/app/types/timeline";
import { cn } from "@/lib/utils";

export interface EnrichedConferenceItem extends ConferenceItem {
  historicalStartYear: number | null;
  historicalEndYear: number | null;
  historicalDateLabel: string | null;
  historicalPeriod: string | null;
  relatedPeoples: string[];
}

type SortKey =
  | "title"
  | "historicalStartYear"
  | "historicalPeriod"
  | "civilizations"
  | "year"
  | "organization";

interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}

type VisibleColumns = Record<SortKey, boolean>;

interface ConferenceDatabaseProps {
  conferences: EnrichedConferenceItem[];
}

const sortLabels: Record<SortKey, string> = {
  title: "Título",
  historicalStartYear: "Fecha histórica",
  historicalPeriod: "Período",
  civilizations: "Civilización / Pueblo",
  year: "Año conferencia",
  organization: "Organización",
};

function sortConferences(
  items: EnrichedConferenceItem[],
  sort: SortConfig
): EnrichedConferenceItem[] {
  const sorted = [...items];
  sorted.sort((a, b) => {
    let comparison = 0;
    switch (sort.key) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "historicalStartYear": {
        const yearA = a.historicalStartYear ?? Number.POSITIVE_INFINITY;
        const yearB = b.historicalStartYear ?? Number.POSITIVE_INFINITY;
        comparison = yearA - yearB;
        break;
      }
      case "historicalPeriod": {
        const periodA = a.historicalPeriod ?? "";
        const periodB = b.historicalPeriod ?? "";
        comparison = periodA.localeCompare(periodB);
        break;
      }
      case "civilizations": {
        const civA = a.civilizations[0] ?? "";
        const civB = b.civilizations[0] ?? "";
        comparison = civA.localeCompare(civB);
        break;
      }
      case "year": {
        const yearA = a.year ?? Number.POSITIVE_INFINITY;
        const yearB = b.year ?? Number.POSITIVE_INFINITY;
        comparison = yearA - yearB;
        break;
      }
      case "organization":
        comparison = a.organization.localeCompare(b.organization);
        break;
    }
    return sort.direction === "asc" ? comparison : -comparison;
  });
  return sorted;
}

function MediaIcon({ mediaType, url }: { mediaType: string | null; url: string | null }) {
  if (!url) return null;
  if (mediaType === "video") return <Video className="h-4 w-4" />;
  if (mediaType === "audio") return <AudioLines className="h-4 w-4" />;
  if (mediaType === "web") return <Globe className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}

interface SortButtonProps {
  sortKey: SortKey;
  sort: SortConfig;
  onSort: (key: SortKey) => void;
}

function SortButton({ sortKey, sort, onSort }: SortButtonProps) {
  const active = sort.key === sortKey;
  const Icon = active
    ? sort.direction === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {sortLabels[sortKey]}
      <Icon className="h-3 w-3" />
    </button>
  );
}

export function ConferenceDatabase({ conferences }: ConferenceDatabaseProps) {
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedCivilization, setSelectedCivilization] = useState<string | null>(null);
  const [sort, setSort] = useState<SortConfig>({
    key: "historicalStartYear",
    direction: "asc",
  });
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    title: true,
    historicalStartYear: true,
    historicalPeriod: true,
    civilizations: true,
    year: false,
    organization: false,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [onlyYouTube, setOnlyYouTube] = useState(false);

  const allPeriods = useMemo(() => {
    const set = new Set<string>();
    for (const c of conferences) {
      if (c.historicalPeriod) set.add(c.historicalPeriod);
    }
    return Array.from(set).sort();
  }, [conferences]);

  const allCivilizations = useMemo(() => {
    const set = new Set<string>();
    for (const c of conferences) {
      for (const civ of c.civilizations) set.add(civ);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [conferences]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return conferences.filter((c) => {
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.organization.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.summary.toLowerCase().includes(term) ||
        c.civilizations.some((x) => x.toLowerCase().includes(term)) ||
        c.characters.some((x) => x.toLowerCase().includes(term)) ||
        c.topics.some((x) => x.toLowerCase().includes(term)) ||
        c.relatedPeoples.some((x) => x.toLowerCase().includes(term));
      const matchesPeriod = !selectedPeriod || c.historicalPeriod === selectedPeriod;
      const matchesCiv =
        !selectedCivilization || c.civilizations.includes(selectedCivilization);
      const matchesYouTube = !onlyYouTube || getYouTubeUrl(c) !== null;
      return matchesSearch && matchesPeriod && matchesCiv && matchesYouTube;
    });
  }, [conferences, search, selectedPeriod, selectedCivilization, onlyYouTube]);

  const sorted = useMemo(
    () => sortConferences(filtered, sort),
    [filtered, sort]
  );

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Database className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Base de datos de conferencias
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
          Consulta el catálogo completo de conferencias de Eva Tobalina. Ordena
          por fecha histórica, período, civilización, título u organización.
        </p>
        <p className="mt-2 text-sm text-muted-foreground/80">
          {sorted.length} de {conferences.length} conferencias
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, organización, tema, personaje..."
            className="w-full rounded-lg border border-border/60 bg-background py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Período histórico
            </label>
            <select
              value={selectedPeriod ?? ""}
              onChange={(e) => setSelectedPeriod(e.target.value || null)}
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Todos los períodos</option>
              {allPeriods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Civilización / Pueblo
            </label>
            <select
              value={selectedCivilization ?? ""}
              onChange={(e) => setSelectedCivilization(e.target.value || null)}
              className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Todas las civilizaciones</option>
              {allCivilizations.map((civ) => (
                <option key={civ} value={civ}>
                  {civ}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-none">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Columnas
            </label>
            <button
              type="button"
              onClick={() => setShowColumnMenu((prev) => !prev)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              <Columns className="h-4 w-4" />
              Columnas
            </button>
            {showColumnMenu && (
              <div className="absolute right-0 top-full z-10 mt-2 w-60 rounded-lg border border-border/60 bg-card p-3 shadow-lg">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mostrar columnas
                </p>
                <div className="space-y-2">
                  {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[key]}
                        onChange={(e) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-border/60 text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">{sortLabels[key]}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyYouTube}
            onChange={(e) => setOnlyYouTube(e.target.checked)}
            className="h-4 w-4 rounded border-border/60 text-primary focus:ring-primary"
          />
          <span className="text-foreground">Solo videos de YouTube</span>
          <span className="text-xs text-muted-foreground">
            ({conferences.filter((c) => getYouTubeUrl(c) !== null).length})
          </span>
        </label>

        {(selectedPeriod || selectedCivilization || onlyYouTube) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Filtros activos:</span>
            {onlyYouTube && (
              <Badge variant="secondary" className="gap-1">
                Solo videos de YouTube
                <button onClick={() => setOnlyYouTube(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPeriod && (
              <Badge variant="secondary" className="gap-1">
                {selectedPeriod}
                <button onClick={() => setSelectedPeriod(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCivilization && (
              <Badge variant="secondary" className="gap-1">
                {selectedCivilization}
                <button onClick={() => setSelectedCivilization(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <button
              onClick={() => {
                setSelectedPeriod(null);
                setSelectedCivilization(null);
                setOnlyYouTube(false);
              }}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {visibleColumns.title && (
                  <TableHead className="min-w-[280px]">
                    <SortButton sortKey="title" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
                {visibleColumns.historicalStartYear && (
                  <TableHead className="min-w-[150px]">
                    <SortButton sortKey="historicalStartYear" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
                {visibleColumns.historicalPeriod && (
                  <TableHead className="min-w-[140px]">
                    <SortButton sortKey="historicalPeriod" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
                {visibleColumns.civilizations && (
                  <TableHead className="min-w-[180px]">
                    <SortButton sortKey="civilizations" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
                {visibleColumns.year && (
                  <TableHead className="min-w-[120px]">
                    <SortButton sortKey="year" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
                {visibleColumns.organization && (
                  <TableHead className="min-w-[200px]">
                    <SortButton sortKey="organization" sort={sort} onSort={toggleSort} />
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((conf) => (
                <TableRow key={conf.id}>
                  {visibleColumns.title && (
                    <TableCell>
                      <div className="space-y-1">
                        {getYouTubeUrl(conf) || conf.url ? (
                          <a
                            href={getYouTubeUrl(conf) ?? conf.url ?? undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1.5 font-medium text-foreground hover:text-primary hover:underline"
                          >
                            <span className="line-clamp-2">{conf.title}</span>
                            <MediaIcon mediaType={conf.mediaType} url={getYouTubeUrl(conf) ?? conf.url} />
                          </a>
                        ) : (
                          <span className="line-clamp-2 font-medium text-foreground">
                            {conf.title}
                          </span>
                        )}
                        {conf.topics.length > 0 && (
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {conf.topics.slice(0, 4).join(" · ")}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.historicalStartYear && (
                    <TableCell>
                      {conf.historicalDateLabel ? (
                        <span className="text-sm font-medium text-foreground">
                          {conf.historicalDateLabel}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.historicalPeriod && (
                    <TableCell>
                      {conf.historicalPeriod ? (
                        <Badge variant="outline" className="text-xs">
                          {conf.historicalPeriod}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.civilizations && (
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {conf.civilizations.length > 0 ? (
                          conf.civilizations.map((civ) => (
                            <Badge
                              key={civ}
                              variant="secondary"
                              className="cursor-pointer text-xs"
                              onClick={() => setSelectedCivilization(civ)}
                            >
                              {civ}
                            </Badge>
                          ))
                        ) : conf.relatedPeoples.length > 0 ? (
                          conf.relatedPeoples.map((p) => (
                            <Badge
                              key={p}
                              variant="secondary"
                              className="cursor-pointer text-xs"
                              onClick={() => setSearch(p)}
                            >
                              {p}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.year && (
                    <TableCell>
                      <span className="text-sm text-foreground">
                        {conf.year ?? "—"}
                      </span>
                    </TableCell>
                  )}
                  {visibleColumns.organization && (
                    <TableCell>
                      <span className="text-sm text-foreground">
                        {conf.organization}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {sorted.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">
            No se encontraron conferencias con los filtros actuales.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedPeriod(null);
              setSelectedCivilization(null);
              setOnlyYouTube(false);
            }}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
