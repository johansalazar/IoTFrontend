import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LocationsComponent } from './components/locations/locations.component';
import { DevicesComponent } from './components/devices/devices.component';
import { ReportComponent } from './components/report/report.component';
import { ServerComponent } from './components/servers/server.component';
import { MqttComponent } from './components/mqtt/mqtt.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'server', component: ServerComponent, canActivate: [AuthGuard] },
    { path: 'mqtt', component: MqttComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent }
];
