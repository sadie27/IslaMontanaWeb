# versions/

## Propósito
Almacena los archivos de migración individuales generados por Alembic. Cada archivo representa un cambio específico en el esquema de la base de datos con funciones upgrade() y downgrade().

## Contendrá
- Scripts de migración con nombres como `abc123_create_tours_table.py`
- Cada migración tiene un ID único y timestamp
- Funciones upgrade() para aplicar cambios
- Funciones downgrade() para revertir cambios

## Notas
- Los archivos se generan automáticamente con `alembic revision --autogenerate`
- Mantener orden cronológico de aplicación
- No eliminar migraciones una vez aplicadas en producción
- Cada migración debe ser atómica y reversible
