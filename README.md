# IslaMontana Travel — Monorepo

Agencia de viajes de naturaleza en Ecuador. Galápagos, Amazonía, Andes, Costa del Pacífico.

## Estructura

```
IslaMontanaWeb/
├── frontend/   Next.js 14 App Router + TypeScript + Tailwind
└── backend/    FastAPI (Python) — API REST en VPS
```

## Inicio rápido

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # ajusta NEXT_PUBLIC_API_URL
npm install
npm run dev                         # http://localhost:3000
```

### Backend

```bash
cd backend
# ver backend/README.md
```

## Arquitectura de datos

El frontend NO tiene lógica de datos. Solo hace `fetch()` al backend FastAPI.  
Ver [`frontend/ARCHITECTURE.md`](./frontend/ARCHITECTURE.md) para el detalle completo.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base del backend FastAPI | `https://api.islamontana.com` |

## Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, Supabase (PostgreSQL)
- **Deploy**: Vercel (frontend), VPS Linux (backend)
