# CONTEXT.md — Contexto raíz del proyecto

> Fichero raíz de contexto. Lo importa `CLAUDE.md` con `@docs/CONTEXT.md`.
> Su trabajo es dar la visión global, las reglas transversales y **enrutar**
> hacia la documentación de cada dominio. No contiene convenciones específicas
> de frontend ni de backend: esas viven en sus ficheros (ver enrutamiento).

---

## 1. Qué es el proyecto

**IslaMontana** es la web de una empresa de turismo (destinos, tours y contacto).
Es un **monorepo** con dos aplicaciones independientes bajo la misma raíz:

- `frontend/` → Next.js 14 (App Router) exportado como sitio estático.
- `backend/` → FastAPI (REST). **Atención:** a día de hoy el backend solo tiene
  estructura de carpetas y READMEs de intención; **no hay código Python
  implementado todavía**. Al implementarlo, sigue lo definido en `docs/Backend.md`.

## 2. Stack (resumen)

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 (App Router, `output: 'export'`), React 18, TypeScript `strict` |
| Estilos | Tailwind v3 + CSS modular en `src/styles/`, fuente Outfit |
| Backend | FastAPI + SQLAlchemy + Alembic + Pydantic v2 (previsto), PostgreSQL |
| Tests backend | pytest + FastAPI TestClient (previsto) |

## 3. Cómo correr el proyecto

Frontend (`/frontend`):

```bash
npm run dev      # desarrollo (puerto 3000)
npm run build    # build estático
npm run lint     # lint
```

Backend: pendiente de implementación. El arranque previsto es `uvicorn app.main:app`
y migraciones con `alembic upgrade head` (confirmar al implementar).

## 4. Estructura del repositorio

```
/
├── CLAUDE.md                 # entrada mínima → importa docs/CONTEXT.md
├── docs/                     # toda la documentación de contexto (este sistema)
├── Skills/                   # skills propias del proyecto (ver §7)
├── frontend/                 # app Next.js
└── backend/                  # app FastAPI (solo estructura + READMEs por ahora)
```

## 5. Cómo está organizada esta documentación (léelo una vez)

La documentación funciona en dos tipos de fichero:

- **Ficheros router** (`CONTEXT.md`, `docs/Frontend.md`, `docs/Backend.md`): no
  contienen reglas, solo enrutan. Te dicen *a qué fichero ir* según la tarea.
- **Ficheros de contenido** (`Conventions*`, `Errors*`): contienen las reglas
  reales. **Cada regla vive en un único fichero**; si dudas dónde está algo,
  el router te lo indica.

**Regla de carga (importante para no malgastar contexto):**
solo `CLAUDE.md → CONTEXT.md` usa importación automática con `@`.
El resto de ficheros **NO** se importan con `@`: se leen **bajo demanda**.
Es decir, **lee `docs/Frontend.md` o `docs/Backend.md` solo cuando vayas a
trabajar en ese dominio**, y desde ahí lee sus hijos cuando la tarea lo pida.

## 6. Reglas transversales (aplican a todo el repo)

- **Idioma:** toda la documentación y los comentarios de código se escriben en
  **español**.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`,
  `perf:`, `ci:`, `docs:`). Mensajes en español tras el prefijo.
- **Ramas:** por ahora se trabaja sobre una sola rama (`main`).
- **Zona intocable — prohibición estricta.** Un conjunto de ficheros del dominio
  `/destinations` tiene animaciones calibradas a mano y **no puede modificarse**
  sin aprobación explícita del dueño del repo. Lista completa y política en
  `docs/ZonaIntocable.md`. Antes de tocar cualquier fichero de ese dominio,
  léelo.
- **No propagar deuda técnica conocida.** El repo tiene puntos detectados que
  están MAL y no deben replicarse ni darse por buenos (ver el bloque de
  "Atención" en `ConventionsStyle-Frontend.md` y en la sección "Manejo de
  errores" de `docs/DecisionesPendientes.md`, y las decisiones abiertas en ese
  mismo fichero). Si vas a tocar uno de esos puntos, corrígelo, no lo imites.
- **Ante ambigüedad, pregunta.** Si una decisión no está cubierta por estos
  docs, no improvises una convención nueva en silencio: proponla.
- **Grafo de conocimiento del repo.** El repo está mapeado con la skill
  `graphify` (`graphify-out/graph.json`). Para preguntas de relación, impacto o
  localización de código, invoca `/graphify` o consulta ese grafo directamente
  — la herramienta se documenta a sí misma.

## 7. Enrutamiento

Antes de tocar código, lee el router del dominio correspondiente:

- **Trabajo de frontend** → lee `docs/Frontend.md`.
- **Trabajo de backend** → lee `docs/Backend.md`.
- **Cambio transversal** (infra, config global, dependencias compartidas,
  algo que toca front y back a la vez) → se resuelve desde aquí.
- **¿Algo está mal o es deuda?** → consulta `docs/DecisionesPendientes.md`
  antes de actuar.
- **¿Tocas algo en `/destinations`?** → lee `docs/ZonaIntocable.md` primero.

## 8. Skills del proyecto

Las skills propias de la web viven en la carpeta **`Skills/`** (en la raíz del
repo). Aún no hay ninguna creada; a medida que se añadan, `docs/Frontend.md` y
`docs/Backend.md` referenciarán cuáles usar y con qué disparador.

> Nota: estas son skills *del proyecto*, referenciadas desde la documentación.
> Si en algún momento quieres que Claude Code las descubra de forma nativa,
> deberían vivir además en `.claude/skills/`. Mientras tanto, se invocan según
> lo que indiquen los routers de dominio.

## 9. Changelog (opcional, recomendado — no obligatorio)

Para cambios transversales significativos (infra, config global, dependencias
compartidas), es recomendable añadir una entrada en `CHANGELOG.md` (raíz del
repo). No es obligatorio por prompt: `git log` ya es la fuente autoritativa del
historial completo; el changelog es solo un resumen legible de lo que vale la
pena destacar.

**Formato de entrada** (una línea por cambio, la más reciente arriba del todo):

```
- AAAA-MM-DD · <tipo> · <descripción breve> · Ficheros: <a, b, c> · Ticket: <id o ->
```

`<tipo>` usa el mismo vocabulario que los commits: `feat`, `fix`, `refactor`,
`chore`, `perf`, `ci`, `docs`. Si no hay ticket, pon `-`.
