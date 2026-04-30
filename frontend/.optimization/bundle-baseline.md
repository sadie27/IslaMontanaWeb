# Bundle Baseline — Fase 2 pre-refactor

**Fecha**: 2026-04-30
**Branch**: refactor/fase-2-server-first (antes del Commit 1)
**Next.js**: 14.2.35

## Build output (npm run build)

```
Route (app)                              Size     First Load JS
┌ ○ /                                    6.15 kB         107 kB
├ ○ /_not-found                          138 B          87.6 kB
├ ○ /destinations                        28.2 kB         129 kB
└ ● /destinations/[slug]                 5.15 kB         106 kB
    ├ /destinations/galapagos
    ├ /destinations/amazonia
    ├ /destinations/andes-cultura
    └ /destinations/andes-naturaleza
+ First Load JS shared by all            87.4 kB
  ├ chunks/117-81a2d9349d39e184.js       31.9 kB
  ├ chunks/fd9d1056-42a1c2df9c4a85a8.js  53.6 kB
  └ other shared chunks (total)          1.92 kB
```

## Top chunks (shared)

| Chunk | Size |
|---|---|
| chunks/fd9d1056-42a1c2df9c4a85a8.js | 53.6 kB |
| chunks/117-81a2d9349d39e184.js | 31.9 kB |
| other shared chunks | 1.92 kB |

## First Load JS por ruta

| Ruta | First Load JS |
|---|---|
| `/` | 107 kB |
| `/_not-found` | 87.6 kB |
| `/destinations` | 129 kB |
| `/destinations/[slug]` | 106 kB |

## Notas

- Analyzer HTML reports: `.next/analyze/client.html`, `.next/analyze/nodejs.html`, `.next/analyze/edge.html`
- `page.tsx` aún con `"use client"` en este baseline — Commits 1+2 lo convertirán a Server Component
