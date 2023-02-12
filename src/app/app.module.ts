import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiService } from './services/api/api.service';
import { SharedService } from './services/shared/shared.service';
import { TrackingService } from './services/tracking/tracking.service';
import { TrackingDirective } from './directives/tracking.directive';
import { CommonModule } from '@angular/common';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler/http-error-handler.interceptor';
import { LoaderService } from './services/loader/loader.service';
import { LoaderComponent } from './components/loader/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    TrackingDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [TrackingService, ApiService, SharedService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
