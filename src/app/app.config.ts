import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlSpanish } from './core/Config/MatPaginatorIntlSpanish';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: MatPaginatorIntl, useFactory: MatPaginatorIntlSpanish}
  ]
};
