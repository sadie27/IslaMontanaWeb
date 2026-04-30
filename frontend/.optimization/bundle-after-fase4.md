# Bundle After Fase 4

**Fecha**: 2026-04-30
**Branch**: refactor/fase-4-datos-assets-bundle
**Next.js**: 14.2.35

## Build output (npm run build + ANALYZE=true)

```
Route (app)                              Size     First Load JS
┌ ○ /                                    2.76 kB         103 kB
├ ○ /_not-found                          138 B          87.6 kB
├ ○ /destinations                        28.2 kB         129 kB
└ ● /destinations/[slug]                 5.16 kB         106 kB
    ├ /destinations/galapagos
    ├ /destinations/amazonia
    ├ /destinations/andes-cultura
    └ /destinations/andes-naturaleza
+ First Load JS shared by all            87.5 kB
  ├ chunks/117-81a2d9349d39e184.js       31.9 kB
  ├ chunks/fd9d1056-42a1c2df9c4a85a8.js  53.6 kB
  └ other shared chunks (total)          1.98 kB
```

## Top chunks (shared)

| Chunk | Size |
|---|---|
| chunks/fd9d1056-42a1c2df9c4a85a8.js | 53.6 kB |
| chunks/117-81a2d9349d39e184.js | 31.9 kB |
| other shared chunks | 1.98 kB |

## First Load JS por ruta

| Ruta | First Load JS |
|---|---|
| `/` | 103 kB |
| `/_not-found` | 87.6 kB |
| `/destinations` | 129 kB |
| `/destinations/[slug]` | 106 kB |

## Chunks dinámicos separados

| Chunk | Tamaño | Qué contiene |
|---|---|---|
| 473.8d53f9b51c627d56.js | 8.6 kB | Stats (dynamic import) |
| 233-e3046f019b6f73a3.js | 38.7 kB | ErrorPageClient (dynamic import) |

## Cambios aplicados en Fase 4

1. `HOME_TOURS` movido a `src/data/home-tours.ts`
2. `HOME_DESTINATIONS` movido a `src/data/home-destinations.ts`
3. Precarga condicional en `useHeroImages` (eager primera, idle el resto)
4. `dynamic` import para `ErrorPageClient` (ssr: false)
5. `dynamic` import para `Stats` + `min-height: 280px/264px` en `.stats`
