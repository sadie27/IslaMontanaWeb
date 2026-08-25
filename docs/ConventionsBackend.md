# ConventionsBackend.md — Convenciones de código (Backend)

> Cómo se **escribe** el backend: capas, naming, DTOs/validación, acceso a
> datos, inyección de dependencias y entorno. El manejo de fallos está en
> `Errors-Backend.md`. Reglas **previstas** (backend aún sin código): aplícalas
> al implementar.

---

## Separación de responsabilidades (lo más importante)

Capas estrictas, sin saltárselas:

- **Router:** solo define endpoints y el mapeo HTTP. Recibe la petición, llama al
  service y devuelve la respuesta. **No accede a la BD.**
- **Service:** **única** capa con acceso a base de datos. Contiene la lógica de
  negocio. Recibe la sesión de BD como dependencia.
- **Model:** estructura de tabla (SQLAlchemy declarativo). Sin lógica de negocio.
- **Schema:** DTO de entrada/salida (Pydantic). Separado del model; convierte
  desde modelos con `from_attributes=True`.

## Naming

- **Ficheros:** `snake_case.py` (`tour_service.py`, `destination_service.py`).
- **Schemas:** `NombreCreate`, `NombreUpdate`, `NombreResponse`.
- **Models:** clase en `PascalCase`.

## DTOs y validación

- Pydantic v2, `BaseModel`.
- Separación explícita `Create` / `Update` / `Response`.
- `from_attributes=True` para mapear desde modelos SQLAlchemy.
- La validación de entrada vive en los schemas, no en los routers.

## Acceso a datos

- SQLAlchemy (ORM declarativo). Las queries viven en los **services**.
- Migraciones con Alembic (`alembic upgrade head`).

## Inyección de dependencias

- DI de FastAPI para las sesiones de BD: patrón `Depends(get_db)`.

## Variables de entorno

Definidas en `backend/.env.example`:

```
DATABASE_URL=postgresql://...
SECRET_KEY=...
ENVIRONMENT=development|production|test
ALLOWED_ORIGINS=http://localhost:3000,...
API_PORT=8000
API_HOST=0.0.0.0
```

## Decisiones pendientes (proponer al implementar)

- Gestor de dependencias y lockfile (no hay `requirements.txt` ni
  `pyproject.toml`): elegir y fijar versiones de FastAPI, SQLAlchemy, Pydantic,
  Alembic, pytest.
- Versión de Python (no hay `.python-version`).
- `docker-compose.yml` está vacío: definir cómo se levanta el entorno local.
