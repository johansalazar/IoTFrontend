import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [RouterOutlet]
})
export class BodyComponent {
  // Aquí no es necesario ningún código adicional por el momento,
  // solo se usa el router-outlet para mostrar las vistas.
}
