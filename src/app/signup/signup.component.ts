import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  accountForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    customerId: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private accountService: AccountService
  ) {}

  navigateToLogin() {
    this._router.navigate(['login'])
  }

  successMessage = "";
  failureMessage = "";

  postAccountData() {
    const body = this.accountForm.value;
    this.accountService.createAccount(body)
    .subscribe({
      next: (response) => {
        this.failureMessage = "";
        this.successMessage = "Account created successfully";
        alert("Account created. Your PIN is: " + response.pin)
        setTimeout(()=>this.navigateToLogin(),4000)
      },
      error: (e) => {
        this.successMessage = "";
        this.failureMessage = e.error.text;
      }
      
    }); 
  }

  onSubmit(): void {
    this.postAccountData();
  }
}
