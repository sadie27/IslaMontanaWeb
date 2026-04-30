# Bundle Comparison: Baseline (Fase 2) vs Fase 4

## Métricas principales

| Métrica | Baseline (Fase 2) | Tras Fase 4 | Delta |
|---------|-------------------|-------------|-------|
| First Load JS `/` | 107 kB | 103 kB | **-4 kB** |
| First Load JS `/_not-found` | 87.6 kB | 87.6 kB | 0 |
| First Load JS `/destinations` | 129 kB | 129 kB | 0 |
| First Load JS `/destinations/[slug]` | 106 kB | 106 kB | 0 |
| Shared JS total | 87.4 kB | 87.5 kB | +0.1 kB |
| Chunk principal fd9d1056 | 53.6 kB | 53.6 kB | 0 |
| Chunk 117-... | 31.9 kB | 31.9 kB | 0 |
| other shared chunks | 1.92 kB | 1.98 kB | +0.06 kB |
| Chunks dinámicos separados | 0 | 2 | **+2** |
| Tamaño página `/` | 6.15 kB | 2.76 kB | **-3.4 kB** |

## Análisis

- **First Load JS `/` bajó 4 kB** (107 → 103 kB): `Stats` y `ErrorPageClient` se extrajeron del bundle inicial como chunks dinámicos.
- El chunk dinámico de `Stats` (~8.6 kB) solo se descarga cuando el usuario hace scroll hasta esa sección o el idle callback dispara.
- El chunk de `ErrorPageClient` (~38.7 kB) solo se descarga en rutas de error (`/ruta-inexistente`, errores 500).
- El tamaño de la página `/` bajó de 6.15 kB a 2.76 kB porque `Stats` ya no se incluye en el Server Component HTML inline.
- Las rutas `/destinations` y `/destinations/[slug]` no se tocaron.

## Conclusión

La Fase 4 cumple: First Load JS en `/` bajó 4 kB y se crearon 2 chunks dinámicos separados.
