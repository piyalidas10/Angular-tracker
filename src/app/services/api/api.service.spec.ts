import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Endpoint } from '../../config/endpoint';
import { mockUsers } from '../../mockdata/users';

import { ApiService } from "./api.service";

describe("ApiService", () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('getUsers()', () => {

    it('getUsers() return users', (done: DoneFn) => {
      service.getUsers().subscribe((data) => { // now have to subscribe getUsers method to get data
        expect(data).toEqual(mockUsers);
        done();
      });
      httpController.expectOne({
        method: 'GET',
      }).flush(mockUsers);      
    });

  });

  afterEach(() => {
    httpController.verify();
  });
});
