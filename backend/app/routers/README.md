# routers/

## Propósito
Definición de endpoints de la API REST. Cada router maneja un recurso específico (tours, destinos, contacto). Los routers delegan toda la lógica de negocio a los services.

## Contendrá
- `tours.py` - Endpoints GET /tours, GET /tours/{id}
- `destinations.py` - Endpoints GET /destinations
- `contact.py` - Endpoint POST /contact
- (Futuro) `bookings.py` - Endpoints de reservas
- (Futuro) `payments.py` - Endpoints de pagos con Stripe

## Notas
- Los routers NUNCA acceden directamente a models o la base de datos
- Toda la lógica debe delegarse a functions en services/
- Usar Pydantic schemas para request/response bodies
- Documentar endpoints con docstrings para OpenAPI/Swagger
- Manejar excepciones y retornar códigos HTTP apropiados
