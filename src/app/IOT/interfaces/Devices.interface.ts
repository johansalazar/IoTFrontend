export interface Device {
  id: string; // ID único del dispositivo (UUID)
  name: string; // Nombre del dispositivo
  deviceKey: string; // Clave única del dispositivo
  deviceType: string; // Tipo de dispositivo (por ejemplo: sensor, actuador, etc.)
  idLocation: string; // ID de la ubicación asociada (UUID)
  estado: boolean; // Estado del dispositivo (activo/inactivo)
  fechaCreacion: string; // Fecha de creación del dispositivo (ISO 8601)
}
