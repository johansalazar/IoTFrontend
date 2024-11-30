import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { genericResponse } from '../../Auth/Interfaces/genericResponse';
import { Locations } from '../interfaces/locations.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
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
  getLocations(): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.get<genericResponse>(this.apiUrl + 'Locations/GetAllLocations', {
      headers,
    });
  }
 // Obtener la lista de usuarios
 getLocationsbyId(id: string,): Observable<genericResponse> {
  const headers = this.getAuthHeaders(); // Agregar encabezados
  return this.http.get<genericResponse>(`${this.apiUrl + 'Locations/GetLocation'}/${id}`, { headers });
}

  // Crear un nuevo usuario
  createLocations(location: Locations): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.post<genericResponse>(this.apiUrl + 'Locations/AddLocation' , location, { headers });
  }

  // Actualizar un usuario existente
  updateLocations(id: string, location: Locations): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.put<genericResponse>(`${this.apiUrl + 'Locations/UpdateLocation'}/${id}`, location, { headers });
  }

  // Eliminar un usuario
  deleteLocations(id: string): Observable<genericResponse> {
    const headers = this.getAuthHeaders(); // Agregar encabezados
    return this.http.delete<genericResponse>(`${this.apiUrl + 'Locations/DeleteLocation' }/${id}`, { headers });
  }
}
