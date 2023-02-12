import { TestBed } from '@angular/core/testing';

import { ErrorShowService } from './error-show.service';

describe('ErrorShowService', () => {
  let service: ErrorShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
