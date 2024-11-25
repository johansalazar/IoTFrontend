// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.ejemplo.com/users';  // Cambia la URL según tu API

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
