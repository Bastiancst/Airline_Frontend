import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}


  getEmployeeList(): Observable<any> {
    return this._http.get('https://localhost:7292/api/employee');
  }

  getEmployee(id: number): Observable<any> {
    return this._http.get(`https://localhost:7292/api/employee/${id}`);
  }

  addEmployee(data: any): Observable<any> {
    console.log(data)
    return this._http.post('https://localhost:7292/api/employee/create', data);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this._http.put(`https://localhost:7292/api/employee/update/?id=${id}`, data);
  }

  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`https://localhost:7292/api/employee/delete/?id=${id}`);
  }
}
