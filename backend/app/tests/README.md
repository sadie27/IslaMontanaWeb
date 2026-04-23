# tests/

## Propósito
Suite de tests automatizados para el backend. Incluye tests unitarios de services, tests de integración de endpoints y tests de modelos de base de datos.

## Contendrá
- `test_routers/` - Tests de endpoints (integration tests)
- `test_services/` - Tests unitarios de lógica de negocio
- `test_models/` - Tests de modelos y relaciones de BD
- `conftest.py` - Fixtures compartidas de pytest
- `test_database.py` - Tests de configuración de BD

## Notas
- Usar pytest como framework de testing
- Usar base de datos de test separada (SQLite en memoria o PostgreSQL test)
- Los tests de routers deben usar TestClient de FastAPI
- Mockear servicios externos (Stripe, email, etc.) en tests
- Objetivo: alta cobertura de código especialmente en services
