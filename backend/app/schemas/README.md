# schemas/

## Propósito
Esquemas Pydantic que definen la forma de los datos que entran y salen de la API. Proveen validación automática, serialización y documentación de la API.

## Contendrá
- `tour.py` - TourCreate, TourUpdate, TourResponse, TourList
- `destination.py` - DestinationCreate, DestinationResponse
- `contact.py` - ContactRequest, ContactResponse
- (Futuro) `booking.py` - BookingCreate, BookingResponse
- Esquemas base compartidos (BaseResponse, PaginationParams)

## Notas
- Usar Pydantic v2 con modelos BaseModel
- Separar schemas de entrada (Create/Update) y salida (Response)
- Los schemas NO son los modelos de BD, son DTOs (Data Transfer Objects)
- Incluir validadores personalizados cuando sea necesario
- Usar config `from_attributes=True` para convertir desde modelos SQLAlchemy
