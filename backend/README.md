# Backend - Islamontana Travel API

## Propósito
API REST construida con FastAPI que provee endpoints para gestión de tours, destinos y contacto. Maneja la lógica de negocio, validación de datos y persistencia en PostgreSQL.

## Contendrá
- Endpoints REST para tours, destinos y contacto
- Modelos de base de datos con SQLAlchemy
- Esquemas Pydantic para validación de entrada/salida
- Lógica de negocio en services
- Migraciones de base de datos con Alembic
- Tests unitarios e integración

## Notas
- **Arquitectura en capas:** routers → services → models
- Los routers NUNCA acceden directamente a la base de datos
- Toda la lógica de datos debe estar en services
- Usar Pydantic schemas para validación y serialización
- Las migraciones se generan automáticamente con Alembic
