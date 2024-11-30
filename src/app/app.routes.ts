import { Routes } from '@angular/router';
import { DashboardComponent } from './Reportes/dashboard/dashboard.component';
import { WelcomeComponent } from './Auth/components/welcome/welcome.component';
import { LocationsComponent } from './IOT/iotinfraestructura/locations/locations.component';
import { DevicesComponent } from './IOT/iotinfraestructura/devices/devices.component';
import { ReportComponent } from './Reportes/report/report.component';
import { ServerComponent } from './IOT/iotinfraestructura/servers/server.component';
import { MqttComponent } from './IOT/iotinfraestructura/mqtt/mqtt.component';
import { UsersComponent } from './User/users/users.component';
import { AuthGuard } from './Auth/guards/auth.guard';
import { BodyComponent } from './Shared/body/body.component';
import { LoginComponent } from './Auth/components/login/login.component';

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
      { path: 'users', component: UsersComponent },
    ],
  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
