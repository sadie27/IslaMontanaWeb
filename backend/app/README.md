# app/

## Propósito
Directorio principal de la aplicación FastAPI. Contiene todos los módulos de la API organizados por responsabilidad: rutas, servicios, modelos, esquemas, migraciones y tests.

## Contendrá
- `main.py` - Punto de entrada de la aplicación FastAPI
- `database.py` - Configuración de conexión a PostgreSQL
- `config.py` - Configuración y variables de entorno
- Subdirectorios organizados por capa (routers, services, models, schemas)

## Notas
- Seguir arquitectura en capas para mantener separación de responsabilidades
- El archivo main.py configura CORS, middlewares y monta los routers
- Usar dependency injection de FastAPI para sesiones de BD
