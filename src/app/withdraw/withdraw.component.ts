import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  successMessage = "";
  failureMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private accountService: AccountService
  ) {}

  withdrawForm = this.formBuilder.group({
    amount: 0
  });

  getObjectFromLocalStorage(key: string) {
    const storedValue = localStorage.getItem(key);
  
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
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
        this.accountNumber = response.accountNumber;
      },
      error: (e) => {
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  withdraw(accountNumber: number) {
    const body = this.withdrawForm.value;
    this.accountService.withdraw(accountNumber, body)
    .subscribe({
      next: (response) => {
        this._router.navigateByUrl("/")
        .then(() => window.location.reload());
      },
      error: (e) => {
        console.log(e)
      }
      
    }); 
  }

  @Input() accountNumber: number = 0;

  @Output() initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.getObjectFromLocalStorage("user");
  }

  onSubmit(accountNumber: number): void {
    this.withdraw(accountNumber);
  }

}
