import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideForms(),          // Provee soporte general para formularios
//     provideHttpClient(),
//     provideAnimationsAsync(),     // Provee HttpClient si se necesita
//   ],
// }).catch(err => console.error(err));


// function provideForms(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
//   throw new Error('Function not implemented.');
// }
// export function provideForms(): import("@angular/core").Provider| import("@angular/core").EnvironmentProviders {
//   return {
//     provide: 'FORMS_SUPPORT',
//     useValue: true,
//   };
// }
