import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { genericResponse } from '../../Auth/Interfaces/genericResponse';
import { Device } from '../interfaces/Devices.interface';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
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
  getDevices(): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.get<genericResponse>(this.apiUrl + 'Devices/GetAllDevices', {
      headers,
    });
  }
 // Obtener la lista de usuarios
 getDevicebyId(id: string,): Observable<genericResponse> {
  const headers = this.getAuthHeaders(); // Agregar encabezados
  return this.http.get<genericResponse>(`${this.apiUrl + 'Devices/GetDeviceById'}/${id}`, { headers });
}

  // Crear un nuevo usuario
  createDevice(devices: Device): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.post<genericResponse>(this.apiUrl + 'Devices/AddDevice' , devices, { headers });
  }

  // Actualizar un usuario existente
  updateDevice(id: string, devices: Device): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.put<genericResponse>(`${this.apiUrl + 'Devices/UpdateDevice'}/${id}`, devices, { headers });
  }

  // Eliminar un usuario
  deleteDevice(id: string): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.delete<genericResponse>(`${this.apiUrl + 'Devices/DeleteDevice' }/${id}`, { headers });
  }
}
