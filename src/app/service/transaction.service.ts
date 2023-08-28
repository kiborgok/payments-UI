import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';

const baseUrl = 'https://payments-api-0e6j.onrender.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${baseUrl}/transactions`);
  }

  getAccountMinistatement(accountNumber: number): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${baseUrl}/transactions/${accountNumber}/miniStatements`, null);
  }
}