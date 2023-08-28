import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Account } from '../model/account.model';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../service/customer.service';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private accountService: AccountService,
    private customerService: CustomerService,
    private transactionService: TransactionService
  ) {}

  title = 'Get started with digital payments. ';
  failureMessage = "";
  miniStatements?: Transaction[] = [];
  transactions?: Transaction[] = [];
  customers?: Customer[] = [];
  accounts?: Account[] = [];
  loggedIn: boolean = false;

  getObjectFromLocalStorage(key: string) {
    const storedValue = localStorage.getItem(key);
  
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        this.loggedIn = true;
        this.getAccount(parsedValue.customerId);
        return parsedValue;
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    } else {
      return null;
    }
  }

  getAllAccounts(): void {
    this.accountService.getAllAccounts()
    .subscribe({
      next: (response) => {
        this.accounts = response;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers()
    .subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  getAllTransactions(): void {
    this.transactionService.getAllTransactions()
    .subscribe({
      next: (response) => {
        this.transactions = response;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  getAccountMinistatement(accountNumber: number): void {
    this.transactionService.getAccountMinistatement(accountNumber)
    .subscribe({
      next: (response) => {
        this.miniStatements = response;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  getAccount(customerId: string): void {
    this.accountService.getAccount(customerId)
    .subscribe({
      next: (response) => {
        this.getAccountMinistatement(response.accountNumber);
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  @Input() loggedId: boolean = false;

  @Output() initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.getObjectFromLocalStorage("user");
    this.getAllAccounts();
    this.getAllCustomers();
    this.getAllTransactions();
  }


}
