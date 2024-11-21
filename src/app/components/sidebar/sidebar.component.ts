import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule],  // Importa CommonModule para usar directivas como ngClass
  // template: `
  //   <div [ngClass]="{'collapse': isCollapsed}" class="navbar-collapse">
  //     <!-- Contenido del menú -->
  //   </div>
  // `,
})
export class SidebarComponent {
  isCollapsed = true;
}
