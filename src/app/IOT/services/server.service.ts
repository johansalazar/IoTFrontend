import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { genericResponse } from '../../Auth/Interfaces/genericResponse';
import { Observable } from 'rxjs';
import { Servidor } from '../interfaces/servidor.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
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
  getServidors(): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.get<genericResponse>(this.apiUrl + 'Servidores/GetAllServidores', {
      headers,
    });
  }
 // Obtener la lista de usuarios
 getServidorbyId(id: string,): Observable<genericResponse> {
  const headers = this.getAuthHeaders(); // Agregar encabezados
  return this.http.get<genericResponse>(`${this.apiUrl + 'Servidores/GetServidor'}/${id}`, { headers });
}

  // Crear un nuevo usuario
  createServidor(servidor: Servidor): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.post<genericResponse>(this.apiUrl + 'Servidores/AddServidor' , servidor, { headers });
  }

  // Actualizar un usuario existente
  updateServidor(id: string, servidor: Servidor): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.put<genericResponse>(`${this.apiUrl + 'Servidores/UpdateServidor'}/${id}`, servidor, { headers });
  }

  // Eliminar un usuario
  deleteServidor(id: string): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.delete<genericResponse>(`${this.apiUrl + 'Servidores/DeleteServidor' }/${id}`, { headers });
  }
}
