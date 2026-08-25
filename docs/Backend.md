# Backend.md — Router del dominio Backend

> Router del backend. Da el contexto de la app FastAPI y enruta hacia los
> ficheros de contenido. Léelo al empezar cualquier tarea de backend; lee sus
> hijos **bajo demanda**.

---

## ⚠️ Estado actual: backend SIN implementar

El directorio `backend/` contiene **solo estructura de carpetas y READMEs de
intención**; **no hay ningún `.py` implementado**. Toda la información de abajo
describe la arquitectura **prevista**. Al implementar, sigue estas convenciones y
ve resolviendo las decisiones pendientes (dependencias, versión de Python,
docker-compose) — proponlas, no las inventes en silencio.

## Contexto previsto

- **Lenguaje/Framework:** Python + FastAPI (REST).
- **Persistencia:** PostgreSQL con SQLAlchemy (ORM declarativo).
- **Migraciones:** Alembic.
- **Validación/DTOs:** Pydantic v2 (`BaseModel`).
- **Tests:** pytest + FastAPI TestClient.

```
backend/app/
├── main.py        # (previsto) arranque FastAPI
├── database.py    # (previsto) sesión SQLAlchemy
├── config.py      # (previsto) settings/env
├── routers/       # endpoints REST
├── services/      # lógica de negocio (única capa con acceso a BD)
├── models/        # modelos SQLAlchemy
├── schemas/       # DTOs Pydantic
├── migrations/    # Alembic
└── tests/
```

## Arquitectura (regla central)

Capas estrictas: **routers → services → models**. Los **routers NUNCA acceden a
la BD**; solo los **services** lo hacen. Los **models** no llevan lógica de
negocio. Los **schemas** (DTOs) están separados de los models.

## Endpoints previstos (REST)

- `GET /destinations`, `GET /destinations/{slug}`
- `GET /nav-menu`
- `GET /tours`, `GET /tours/{id}`
- `POST /contact`

Estos contratos deben casar con `frontend/src/types/api.ts` (capa `snake_case`
del frontend). Cualquier cambio de contrato se coordina con esa capa.

## A dónde ir según la tarea (enrutamiento)

- **Estructura del código, capas, naming, DTOs, validación, acceso a datos, DI,
  variables de entorno** → lee `docs/ConventionsBackend.md`.
- **Manejo de errores: excepciones de dominio, formato de respuesta de error,
  status HTTP, logging** → lee `docs/Errors-Backend.md`.

## Skills de backend

Las skills propias viven en `Skills/`. Aún no hay ninguna creada. Cuando se
añadan skills de backend, aquí se listará cuándo invocar cada una con su
disparador, sin duplicar su contenido.
