import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  successMessage = "";
  failureMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private accountService: AccountService
  ) {}

  transferForm = this.formBuilder.group({
    amount: 0,
    toAccountNumber: 0
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

  transfer(accountNumber: number) {
    const body = this.transferForm.value;
    this.accountService.transfer(accountNumber, body)
    .subscribe({
      next: (response) => {
        this.failureMessage = "";
          this.successMessage = "Transfer completed successfully";
          this._router.navigateByUrl("/")
          .then(() => window.location.reload());
      },
      error: (e) => {
        this.successMessage = "";
        this.failureMessage = e.error.message;
      }
      
    }); 
  }

  @Input() accountNumber: number = 0;

  @Output() initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.getObjectFromLocalStorage("user");
  }

  onSubmit(accountNumber: number): void {
    this.transfer(accountNumber);
  }
}
