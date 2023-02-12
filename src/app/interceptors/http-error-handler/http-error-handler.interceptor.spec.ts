import { HttpClient, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { finalize, retry, tap } from 'rxjs/operators';
import { Endpoint } from 'src/app/config/endpoint';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';

describe('HttpErrorHandlerInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;
  let interceptor: HttpErrorHandlerInterceptor;
  let loaderService: LoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpErrorHandlerInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorHandlerInterceptor,
          multi: true
        },
        {
          provide: LoaderService
        }
      ]
    });
    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
    loaderService = TestBed.inject(LoaderService);
  });

  it('Get 400 error', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Ok'
    });
    spyOn(loaderService, 'loaderShow');
    client.get(Endpoint.users)
      .pipe(
        retry(1),
        finalize(() => {
          spyOn(loaderService, 'loaderHide');
        }),
      )
      .subscribe(
        () => { },
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy(); // check if executed
          expect(error).toEqual(errorResponse);
          expect(error.status).toEqual(400);
          expect(interceptor['displayServerErrorMessage'](error));
        }
      );

    let error = new ErrorEvent('ERROR', {});
    const retryCount = 1;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      httpController.expectOne({
        method: 'GET',
        url: Endpoint.users
      }).error(error, {
        status: 400,
        statusText: 'Ok',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
    }
  }));

  it('Get 401 error', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Ok'
    });
    spyOn(loaderService, 'loaderShow');
    client.get(Endpoint.users)
      .pipe(
        retry(1),
        finalize(() => {
          spyOn(loaderService, 'loaderHide');
        }),
      )
      .subscribe(
        () => { },
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy(); // check if executed
          expect(error).toEqual(errorResponse);
          expect(error.status).toEqual(401);
          expect(interceptor['displayServerErrorMessage'](error));
        }
      );

    let error = new ErrorEvent('ERROR', {});
    const retryCount = 1;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      httpController.expectOne({
        method: 'GET',
        url: Endpoint.users
      }).error(error, {
        status: 401,
        statusText: 'Ok',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
    }
  }));

  it('Get 403 error', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Ok'
    });
    spyOn(loaderService, 'loaderShow');
    client.get(Endpoint.users)
      .pipe(
        retry(1),
        finalize(() => {
          spyOn(loaderService, 'loaderHide');
        }),
      )
      .subscribe(
        () => { },
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy(); // check if executed
          expect(error).toEqual(errorResponse);
          expect(error.status).toEqual(403);
          expect(interceptor['displayServerErrorMessage'](error));
        }
      );

    let error = new ErrorEvent('ERROR', {});
    const retryCount = 1;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      httpController.expectOne({
        method: 'GET',
        url: Endpoint.users
      }).error(error, {
        status: 403,
        statusText: 'Ok',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
    }
  }));


  it('Get 404 error if API fail for URL not found', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Ok'
    });
    spyOn(loaderService, 'loaderShow');
    client.get(Endpoint.users)
      .pipe(
        retry(1),
        finalize(() => {
          spyOn(loaderService, 'loaderHide');
        }),
      )
      .subscribe(
        () => { },
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy(); // check if executed
          expect(error).toEqual(errorResponse);
          expect(error.status).toEqual(404);
          expect(interceptor['displayServerErrorMessage'](error));
        }
      );

    let error = new ErrorEvent('ERROR', {});
    const retryCount = 1;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      httpController.expectOne({
        method: 'GET',
        url: Endpoint.users
      }).error(error, {
        status: 404,
        statusText: 'Conflict',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
    }
  }));


  it('Get erver error from API', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });
    spyOn(loaderService, 'loaderShow');
    client.get(Endpoint.users)
      .pipe(
        retry(1),
        finalize(() => {
          spyOn(loaderService, 'loaderHide');
        }),
      )
      .subscribe(
        () => { },
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy(); // check if executed
          expect(error).toEqual(errorResponse);
          expect(error.status).toEqual(500);
          expect(interceptor['displayServerErrorMessage'](error));
        }
      );

    let error = new ErrorEvent('ERROR', {});
    const retryCount = 1;
    for (var i = 0, c = retryCount + 1; i < c; i++) {
      httpController.expectOne({
        method: 'GET',
        url: Endpoint.users
      }).error(error, {
        status: 500,
        statusText: 'Internal Server Error',
        headers: new HttpHeaders().set('content-type', 'application/json')
      });
    }
  }));

  // afterEach(() => {
  //   httpController.verify();
  // });
});
