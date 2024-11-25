import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import HeaderComponent from "./Shared/header/header.component";
import { SidebarComponent } from "./Shared/sidebar/sidebar.component";
import { BodyComponent } from "./Shared/body/body.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, BodyComponent],
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
