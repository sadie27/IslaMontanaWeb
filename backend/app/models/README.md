# models/

## Propósito
Modelos de SQLAlchemy que representan las tablas de la base de datos PostgreSQL. Define la estructura, relaciones y constraints de los datos.

## Contendrá
- `tour.py` - Modelo Tour (id, nombre, descripción, precio, duración, etc.)
- `destination.py` - Modelo Destination (islas/lugares de Galápagos)
- `contact.py` - Modelo ContactRequest (formularios de contacto)
- (Futuro) `booking.py` - Modelo para reservas
- (Futuro) `user.py` - Modelo de usuarios/clientes
- Relaciones entre modelos (ej: Tour puede tener múltiples Destinations)

## Notas
- Usar SQLAlchemy ORM declarative base
- Definir constraints (unique, nullable, foreign keys) en el modelo
- No incluir lógica de negocio en los modelos (solo definición de estructura)
- Los modelos se importan en services, NUNCA en routers
