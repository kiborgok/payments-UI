import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

const baseUrl = 'https://payments-api-0e6j.onrender.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/login`, data);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${baseUrl}/customers`);
  }
}