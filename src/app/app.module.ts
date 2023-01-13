import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { SharedService } from './services/shared.service';
import { TrackingService } from './services/tracking.service';
import { TrackingDirective } from './directives/tracking.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TrackingDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [TrackingService, ApiService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
