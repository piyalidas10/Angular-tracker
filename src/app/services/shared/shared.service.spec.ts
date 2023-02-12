import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getCurrentTime', () => {
    it('return currentTime calling getCurrentTime function', () => {
      expect(service.getCurrentTime()).toEqual(0);
    });
  });
  describe('setTrackingSequence', () => {
    it('should store the token in localStorage', () => {
      service.setTrackingSequence('');
      expect(localStorage.getItem('TRACK_SEQ')).toEqual(null);
    });
  });
  describe('setTrackingSequence', () => {
    it('return newSequence calling getTrackingSequence function when sequence is not null / undefined', () => {
      service.setTrackingSequence('0');
      expect(service['getSessionstorageItem']('TRACK_SEQ')).toEqual('0');
      expect(service.getTrackingSequence()).toEqual(1);
    });
  });
});