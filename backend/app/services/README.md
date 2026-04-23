# services/

## Propósito
Capa de lógica de negocio que actúa como intermediario entre routers y models. Contiene todas las operaciones CRUD y lógica de dominio de la aplicación.

## Contendrá
- `tour_service.py` - Lógica de negocio para tours (listar, obtener por ID, crear, actualizar)
- `destination_service.py` - Lógica para destinos
- `contact_service.py` - Procesamiento de formularios de contacto
- (Futuro) `booking_service.py` - Lógica de reservas
- (Futuro) `payment_service.py` - Integración con Stripe

## Notas
- Los services son el ÚNICO lugar donde se accede a la base de datos
- Reciben SessionLocal como parámetro para transacciones
- Implementan la lógica de negocio compleja
- Lanzan excepciones de dominio que los routers capturan
- Pueden llamar a otros services si es necesario
