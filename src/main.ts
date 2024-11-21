import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient} from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { UsersComponent } from './app/components/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideForms(),          // Provee soporte general para formularios
    ReactiveFormsModule,     // Provee soporte para formularios reactivos
    provideHttpClient(),
    provideAnimationsAsync(),     // Provee HttpClient si se necesita
  ],
}).catch(err => console.error(err));
function provideForms(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

