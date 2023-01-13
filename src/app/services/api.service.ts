import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { shareReplay } from 'rxjs/operators';
import { Endpoint } from '../config/endpoint';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public users: Observable<User[]> = of([]);
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    this.users = this.http
      .get<User[]>(`${Endpoint.originApi}/users`)
      .pipe(shareReplay(1));
    return this.users;
  }
}

// url : https://jsonplaceholder.typicode.com/users