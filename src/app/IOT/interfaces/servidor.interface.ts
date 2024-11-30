export interface Servidor {
  id: string; // Identificador único
  nombreHost: string; // Nombre del host
  direccionIP: string; // Dirección IP del Broker
  auditoria: string; // Información de auditoría
  idMQTT: string; // Identificador MQTT único
  estado: boolean; // Estado (Activo/Inactivo)
  fechaCreacion: string; // Fecha de creación en formato ISO
}
