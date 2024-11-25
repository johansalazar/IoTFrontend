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

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] },
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'server', component: ServerComponent, canActivate: [AuthGuard] },
    { path: 'mqtt', component: MqttComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
