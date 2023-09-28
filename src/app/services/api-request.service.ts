import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

    private baseUrl: string = 'https://5d55-200-27-88-4.ngrok-free.app';

    constructor(private http: HttpClient) 
    { 
      
    }

    get<T>(endpoint: string): Observable<T> 
    {
      return this.http.get<T>(`${this.baseUrl}${endpoint}`);
    }
  
    post<T, U>(endpoint: string, data: U): Observable<T> 
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
    }
  
    put<T, U>(endpoint: string, data: U): Observable<T> 
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
    }
  
    delete<T>(endpoint: string): Observable<T> 
    {
      return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
    }
}
