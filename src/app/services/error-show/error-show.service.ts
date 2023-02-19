import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorShowService {
  public errorMsg: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public errorMsg$ = this.errorMsg.asObservable();
  constructor() { }

  errorShow(msg: string): void {
    this.errorMsg.next(msg);
  }
}
