import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    pin: '',
    customerId: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private customerService: CustomerService
  ) {}

  navigateToAccount() {
    this._router.navigate([''])
  }

  setObjectInLocalStorage(key: string, value: Object) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('Value must be an object.');
    }
  }

  successMessage = "";
  failureMessage = "";

  postAccountData() {
    const body = this.loginForm.value;
    this.customerService.login(body)
    .subscribe({
      next: (response) => {
        this.failureMessage = "";
        if(response.message.includes("successful")){
          this.setObjectInLocalStorage('user', response.customer);
          this.successMessage = "Logged in successfully";
          this._router.navigateByUrl("/")
          .then(() => window.location.reload());
        }else{
          this.failureMessage = response.message;
        }
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
