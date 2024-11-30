import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mqtt } from '../interfaces/mqtt.interface';
import { genericResponse } from '../../Auth/Interfaces/genericResponse';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7159/api/v1/'; // Cambia esta URL por la tuya

  constructor() {}

  // Método para obtener el token (puedes modificarlo para obtenerlo desde almacenamiento local o un servicio de autenticación)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Obtiene el token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener la lista de usuarios
  getMqtts(): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.get<genericResponse>(this.apiUrl + 'MQTT/GetAllMQTTs', {
      headers,
    });
  }
 // Obtener la lista de usuarios
 getMqttbyId(id: string,): Observable<genericResponse> {
  const headers = this.getAuthHeaders(); // Agregar encabezados
  return this.http.get<genericResponse>(`${this.apiUrl + 'MQTT/GetMQTT'}/${id}`, { headers });
}

  // Crear un nuevo usuario
  createMqtt(mqtt: Mqtt): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.post<genericResponse>(this.apiUrl + 'MQTT/AddMQTT' , mqtt, { headers });
  }

  // Actualizar un usuario existente
  updateMqtt(id: string, mqtt: Mqtt): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.put<genericResponse>(`${this.apiUrl + 'MQTT/UpdateMQTT'}/${id}`, mqtt, { headers });
  }

  // Eliminar un usuario
  deleteMqtt(id: string): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.delete<genericResponse>(`${this.apiUrl + 'MQTT/DeleteMQTT' }/${id}`, { headers });
  }
}
