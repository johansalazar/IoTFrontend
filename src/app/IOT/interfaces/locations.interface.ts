export interface Locations {
  id: string; // UUID del Location
  nombre: string; // Nombre del Location
  descripcion: string; // Descripción del Location
  estado: boolean; // Estado activo/inactivo
  fechaCreacion: Date; // Fecha de creación
  servidorId: string; // UUID del servidor asociado
}
