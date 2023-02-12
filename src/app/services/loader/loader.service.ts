import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();
  constructor() { }

  loaderShow() {
    this.isLoading.next(true);
  }

  loaderHide() {
    this.isLoading.next(false);
  }
}
