import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  private dataSubject = new BehaviorSubject<T | null>(null);

  data$ = this.dataSubject.asObservable();

  setData(data: T): void 
  {
    this.dataSubject.next(data);
  }
}
