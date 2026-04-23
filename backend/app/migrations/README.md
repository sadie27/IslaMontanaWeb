# migrations/

## Propósito
Directorio de Alembic para control de versiones de la base de datos. Contiene scripts de migración que permiten evolucionar el esquema de BD de forma controlada y reversible.

## Contendrá
- `env.py` - Configuración de Alembic
- `script.py.mako` - Template para nuevas migraciones
- `alembic.ini` - Archivo de configuración (en raíz de backend/)
- Carpeta `versions/` con scripts de migración generados

## Notas
- Generar migraciones automáticamente: `alembic revision --autogenerate -m "descripción"`
- Aplicar migraciones: `alembic upgrade head`
- Revertir migraciones: `alembic downgrade -1`
- NUNCA editar migraciones ya aplicadas en producción
- Revisar siempre las migraciones autogeneradas antes de aplicar
