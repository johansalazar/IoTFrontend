import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IoTFrontend';
  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí puedes realizar una inicialización de rutas, si es necesario
   // this.router.config = [...appRoutes, ...serverRoutes];  // Configura las rutas de cliente y servidor
  }
}
