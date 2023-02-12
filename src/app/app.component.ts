import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api/api.service';
import { TrackingService } from './services/tracking/tracking.service';
import { User } from './models/user';
import { LoaderService } from './services/loader/loader.service';
import { ErrorShowService } from './services/error-show/error-show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tracker';
  users: User[];
  customValue = {
    statusText: '',
    message: ''
  };
  isLoading$ = new Observable<boolean>();
  errorMsg$ = new Observable<string>();
  isBtnCLicked: boolean = false;
  
  constructor(
    private apiService: ApiService,
    private trackingService: TrackingService,
    private loaderService: LoaderService,
    private errorShowService: ErrorShowService,
  ) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.isLoading$ = this.loaderService.isLoading$;
    this.errorMsg$ = this.errorShowService.errorMsg$;
  }

  callUsers() {
    this.isBtnCLicked = true;
    this.apiService
      .getUsers()
      .subscribe({
        next: (data) => {
          console.log('API Response => ', data);
          if (data?.length > 0) {
            console.log('API Response => ', data);
            this.customValue = {
              statusText: '200',
              message: 'Data found',
            };
            this.trackingService.track(
              'user-API',
              'user-API-success',
              JSON.stringify(this.customValue)
            );
            this.users = data;
          } else {
            this.customValue = {
              statusText: '200',
              message: 'Data not found',
            };
            this.trackingService.track(
              'user-API',
              `user-API-repone-blank`,
              JSON.stringify(this.customValue)
            );
            console.log('Blank reponse');
          }
        },
      });
}
}
