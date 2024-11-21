import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import HeaderComponent from '../header/header.component';


@Component({
    selector: 'app-login',
    standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, HeaderComponent],
  providers: [
   // provideHttpClient(withInterceptorsFromDi()), // Usar provideHttpClient correctamente
    AuthService
  ],
})
export class LoginComponent {
  //Servicios
  private authService = inject(AuthService)

  public username: string | undefined;
  public password: string | undefined;
  public errorMessage: string  | undefined;

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
      .subscribe(
       {
        next: (response) => {
          this.router.navigate(['/welcome']);
        },
        error: (err) =>{
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
       } 
      ) 
      //   response => {
      //   if (response.success) {
      //     this.router.navigate(['/welcome']);
      //   } else {
      //     this.errorMessage = 'Usuario o contraseña incorrectos';
      //   }
      // });
    }
  }
}
