import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('show loader', () => {
    service.loaderShow();
  });

  it('hide loader', () => {
    service.loaderHide();
  });
});
