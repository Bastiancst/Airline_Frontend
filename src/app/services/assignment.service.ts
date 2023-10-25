import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private _http: HttpClient) {}


  getAssigmentList(): Observable<any> {
    return this._http.get('https://localhost:7292/api/assignment?clientId=5554DB96-8602-45ED-A0EA-A188B91C93E3');
  }

  /*
  getAssignment(id: number): Observable<any> {
    return this._http.get(`https://localhost:7292/api/employee/${id}`);
  }
  */

  addAssignment(data: any): Observable<any> {
    console.log(data)
    return this._http.post('https://localhost:7292/api/assignment/create?clienId=5554DB96-8602-45ED-A0EA-A188B91C93E3', data);
  }
}
