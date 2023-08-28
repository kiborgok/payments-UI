import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account.model';

const baseUrl = 'https://payments-api-0e6j.onrender.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccount(customerId: string): Observable<Account> {
    return this.http.get<Account>(`${baseUrl}/accounts/${customerId}`);
  }

  createAccount(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/accounts`, data);
  }

  withdraw(accountNumber: number, body: object): Observable<any> {
    return this.http.post(`${baseUrl}/accounts/${accountNumber}/withdraw`, body );
  }

  deposit(accountNumber: number, body: object): Observable<any> {
    return this.http.post(`${baseUrl}/accounts/${accountNumber}/deposit`, body );
  }

  transfer(accountNumber: number, body: object): Observable<any> {
    return this.http.post(`${baseUrl}/accounts/${accountNumber}/transfer`, body );
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${baseUrl}/accounts`);
  }
}
