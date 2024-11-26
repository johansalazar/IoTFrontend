import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { DashboardComponent } from './Auth/components/dashboard/dashboard.component';
import { WelcomeComponent } from './Auth/components/welcome/welcome.component';
import { LocationsComponent } from './Auth/components/locations/locations.component';
import { DevicesComponent } from './Auth/components/devices/devices.component';
import { ReportComponent } from './Auth/components/report/report.component';
import { ServerComponent } from './Auth/components/servers/server.component';
import { MqttComponent } from './Auth/components/mqtt/mqtt.component';
import { UsersComponent } from './Auth/components/users/users.component';
import { AuthGuard } from './Auth/guards/auth.guard';
import { BodyComponent } from './Shared/body/body.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: BodyComponent,
    canActivate: [AuthGuard], // Protege rutas detrás del login
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'report', component: ReportComponent },
      { path: 'server', component: ServerComponent },
      { path: 'mqtt', component: MqttComponent },
    ],
  },

  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
