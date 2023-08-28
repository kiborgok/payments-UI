import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from './model/account.model';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private _router: Router,
    private accountService: AccountService,
  ) {}

  account?: Account;
  failureMessage = "";

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

  getAccount(customerId: string): void {
    this.accountService.getAccount(customerId)
    .subscribe({
      next: (response) => {
        this.account = response;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  removeObjectFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  @Input() loggedIn: boolean = false;

  @Output() initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.getObjectFromLocalStorage("user");
  }

  logOut(){
    this.removeObjectFromLocalStorage("user");
    this._router.navigateByUrl("/login")
          .then(() => window.location.reload());
  }
}
