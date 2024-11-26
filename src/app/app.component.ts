import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Auth/Services/auth.service';
import HeaderComponent from './Shared/header/header.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'IoTFrontend';
}
