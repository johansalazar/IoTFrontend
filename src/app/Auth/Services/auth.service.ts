import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  private apiUrl = 'https://localhost:7159/api/v1/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + 'Auth/Login', {
      email,
      password,
    });
  }
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
   // debugger;
    if (typeof window !== 'undefined' && token != null) {
      const token = localStorage.getItem(this.tokenKey);
      return !!token; // Devuelve true si el token existe
    }
    return false; // Devuelve false si no estás en el navegador
  }
  // Método para guardar el nombre del usuario en localStorage
  setUserName(username: string) {
   // debugger;
    localStorage.setItem('username', username);
  }

  // Método para obtener el nombre del usuario
  getUserName(): string {
   // debugger;
    return localStorage.getItem('username') || 'Invitado';
  }
  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  // Eliminar el token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
