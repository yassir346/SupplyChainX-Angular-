import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {provideStore} from '@ngrx/store';
import {customerReducer} from './features/delivery/customer/state/customer.reducer';
import {provideEffects} from '@ngrx/effects';
import {CustomerEffects} from './features/delivery/customer/state/customer.effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore({ customer: customerReducer }),
    provideEffects(CustomerEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
