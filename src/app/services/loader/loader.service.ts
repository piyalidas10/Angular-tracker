import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();
  constructor() { }

  loaderShow(): void {
    this.isLoading.next(true);
  }

  loaderHide(): void {
    this.isLoading.next(false);
  }
}
