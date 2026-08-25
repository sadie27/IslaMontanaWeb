# Backend.md — Router del dominio Backend

> Router del backend. Da el contexto de la app FastAPI y describe la
> arquitectura, convenciones y manejo de errores previstos. Léelo al empezar
> cualquier tarea de backend.
>
> **Nota:** las tres secciones de este fichero (arquitectura, convenciones,
> errores) son **intención sobre código que todavía no existe** — el backend
> no tiene ni una sola línea de Python implementada. Se mantienen fusionadas en
> un único fichero mientras eso siga siendo cierto, para no mantener 3 ficheros
> sincronizados a mano por algo que aún no se ha construido. El día que se
> implemente la primera ruta real de FastAPI, evalúa si conviene volver a
> separarlas en ficheros independientes (`ConventionsBackend.md`,
> `Errors-Backend.md`) según el volumen que acumulen.

---

## ⚠️ Estado actual: backend SIN implementar

El directorio `backend/` contiene **solo estructura de carpetas y READMEs de
intención**; **no hay ningún `.py` implementado**. Toda la información de abajo
describe la arquitectura **prevista**. Al implementar, sigue estas convenciones y
ve resolviendo las decisiones pendientes (dependencias, versión de Python,
docker-compose) — proponlas, no las inventes en silencio.

## Arquitectura prevista

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

### Arquitectura (regla central)

Capas estrictas: **routers → services → models**. Los **routers NUNCA acceden a
la BD**; solo los **services** lo hacen. Los **models** no llevan lógica de
negocio. Los **schemas** (DTOs) están separados de los models.

### Endpoints previstos (REST)

- `GET /destinations`, `GET /destinations/{slug}`
- `GET /nav-menu`
- `GET /tours`, `GET /tours/{id}`
- `POST /contact`

Estos contratos deben casar con `frontend/src/types/api.ts` (capa `snake_case`
del frontend). Cualquier cambio de contrato se coordina con esa capa.

## Convenciones previstas

> Cómo se **escribirá** el backend cuando se implemente: capas, naming,
> DTOs/validación, acceso a datos, inyección de dependencias y entorno.

### Separación de responsabilidades (lo más importante)

Capas estrictas, sin saltárselas:

- **Router:** solo define endpoints y el mapeo HTTP. Recibe la petición, llama al
  service y devuelve la respuesta. **No accede a la BD.**
- **Service:** **única** capa con acceso a base de datos. Contiene la lógica de
  negocio. Recibe la sesión de BD como dependencia.
- **Model:** estructura de tabla (SQLAlchemy declarativo). Sin lógica de negocio.
- **Schema:** DTO de entrada/salida (Pydantic). Separado del model; convierte
  desde modelos con `from_attributes=True`.

### Naming

- **Ficheros:** `snake_case.py` (`tour_service.py`, `destination_service.py`).
- **Schemas:** `NombreCreate`, `NombreUpdate`, `NombreResponse`.
- **Models:** clase en `PascalCase`.

### DTOs y validación

- Pydantic v2, `BaseModel`.
- Separación explícita `Create` / `Update` / `Response`.
- `from_attributes=True` para mapear desde modelos SQLAlchemy.
- La validación de entrada vive en los schemas, no en los routers.

### Acceso a datos

- SQLAlchemy (ORM declarativo). Las queries viven en los **services**.
- Migraciones con Alembic (`alembic upgrade head`).

### Inyección de dependencias

- DI de FastAPI para las sesiones de BD: patrón `Depends(get_db)`.

### Variables de entorno

Definidas en `backend/.env.example`:

```
DATABASE_URL=postgresql://...
SECRET_KEY=...
ENVIRONMENT=development|production|test
ALLOWED_ORIGINS=http://localhost:3000,...
API_PORT=8000
API_HOST=0.0.0.0
```

### Decisiones pendientes (proponer al implementar)

- Gestor de dependencias y lockfile (no hay `requirements.txt` ni
  `pyproject.toml`): elegir y fijar versiones de FastAPI, SQLAlchemy, Pydantic,
  Alembic, pytest.
- Versión de Python (no hay `.python-version`).
- `docker-compose.yml` está vacío: definir cómo se levanta el entorno local.

## Manejo de errores previsto

> El caso transversal "cuando algo va mal" en el servidor: excepciones de
> dominio, formato de respuesta de error, status HTTP y logging. Reglas
> **previstas** (backend aún sin código): defínelas al implementar y documenta
> aquí las decisiones reales.

### Flujo de errores (intención documentada)

Según la arquitectura prevista: los **services lanzan excepciones de dominio** y
los **routers las capturan** y las traducen a respuesta HTTP. Mantén esa
dirección: la lógica de negocio no construye respuestas HTTP; el router sí.

### Decisiones pendientes (definir al implementar y documentar aquí)

- **Jerarquía de excepciones de dominio:** crear excepciones propias (p. ej.
  `NotFoundError`, `ValidationError`, `ConflictError`) en un módulo común, en
  lugar de lanzar `HTTPException` desde los services.
- **Formato único de respuesta de error:** FastAPI por defecto devuelve
  `{ "detail": "mensaje" }`. Decidir si se personaliza a un formato propio
  (p. ej. `{ "error": { "code": ..., "message": ... } }`) y aplicarlo de forma
  consistente vía exception handlers globales.
- **Mapeo a status HTTP:** definir la correspondencia excepción de dominio →
  código HTTP en un único punto (exception handlers / middleware), no repartido
  por los routers.
- **Logging y observabilidad:** elegir librería y niveles; incluir un
  identificador de correlación (trace id) por petición.

### Regla de coherencia con el frontend

El frontend espera contratos estables (`frontend/src/types/api.ts`). Si cambias
el formato de error, coordínalo con el manejo de errores de cliente descrito en
la sección "Manejo de errores (Frontend)" de `docs/DecisionesPendientes.md`.

## A dónde ir según la tarea (enrutamiento)

Este fichero ya cubre arquitectura, convenciones y errores previstos en sus
tres secciones — no hace falta enrutar a otro sitio para trabajo de backend.

## Skills de backend

Las skills propias viven en `Skills/`. Aún no hay ninguna creada. Cuando se
añadan skills de backend, aquí se listará cuándo invocar cada una con su
disparador, sin duplicar su contenido.
