import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,FormsModule],
  providers: [AuthService],
})
export class LoginComponent {
  //Servicios
  private authService = inject(AuthService);

  public email: string | undefined;
  public password: string | undefined;
  public errorMessage: string | undefined;

  // Constructor con servicio de rutas
  constructor(private router: Router) {}

  // Método de login
  login() {
  //  console.log('Email:', this.email);
  //  console.log('Password:', this.password);
   // debugger; // Esto hará una pausa en esta línea y abrirá DevTools
    // Validación básica antes de llamar al servicio
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese su correo y contraseña.';
     //console.log('Campos vacíos:', this.email, this.password);
      return;
    }

   //console.log('Intentando iniciar sesión con', this.email);

    // Llamar al servicio de autenticación
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
       //console.log('Respuesta del servidor:', response);
       // Verificar si la respuesta es exitosa
       if (response.isSuccess) {
        // Almacenar el token en el localStorage (o sessionStorage)
        localStorage.setItem('authToken', response.data.token);
       //console.log('Token almacenado:', response.data.token);
       this.authService.setUserName(response.data.name); // Guardar el nombre del usuario
        // Si la autenticación es exitosa, redirigir al usuario
        this.router.navigate(['/welcome']);
      } else {
        // Si el login no es exitoso, mostrar el mensaje de error
        this.errorMessage = response.message || 'Error en el inicio de sesión';
      }
      },
      error: (err) => {
        // Manejar errores en el inicio de sesión
        console.error('Error en el login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      },
    });
  }
  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/']);
  // }
}
