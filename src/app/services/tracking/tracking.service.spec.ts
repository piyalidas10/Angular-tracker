import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { TrackingService } from './tracking.service';
import { Endpoint } from 'src/app/config/endpoint';
import { SharedService } from '../shared/shared.service';
import { mockTrackEvent } from '../../mockdata/trackEvent';

describe('TrackingService', () => {
  let service: TrackingService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TrackingService,
        { provide: SharedService },
      ]
    });
    service = TestBed.inject(TrackingService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be called track method with cutomValue with error', fakeAsync((done: DoneFn) => {
    service.pageBuilder('/');
    service['trackingUrl'] = `${Endpoint.trackingUrl}`;
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 400,
      statusText: 'Not Found'
    });
    spyOn(service, 'track').withArgs('test-API', '', mockTrackEvent.customValue).and.callThrough();
    service['callToTrackAPI'](mockTrackEvent).subscribe(
      () => { },
      (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toEqual(400);
        expect(error.error).toEqual(errorResponse);
        // done();
      }
    );
    httpController.expectOne({
      method: 'POST',
      url: Endpoint.trackingUrl,
    }).flush(errorResponse);
  }));

  it('should be called track method with cutomValue with success', fakeAsync((done: DoneFn) => {
    const successResponse = new HttpResponse({
      status: 200,
      statusText: 'saved successfully'
    });
    spyOn(service, 'track').withArgs('test-API', 'track-component', mockTrackEvent.customValue).and.callThrough();
    service['callToTrackAPI'](mockTrackEvent).subscribe(
      data => {
        expect(data).toEqual(successResponse);
        // done();
      }
    );
    httpController.expectOne({
      method: 'POST',
      url: Endpoint.trackingUrl,
    }).flush(successResponse);
  }));

//   afterEach(() => {
//     httpController.verify();
//   });
});
