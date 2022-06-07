import { TokenStorageService } from './../../service/token-storage.service';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email o Password Errati!'

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(user => {
      this.authError = false;
      this.auth.isLoggedIn = true;
      this.auth.saveToken();
      console.log(this.auth.isLoggedIn)
      // this.localstorageService.setToken(user.token);
      this.router.navigate(['dashboard']);
    },
    (error: HttpErrorResponse) => {
      this.authError = true;
      if(error.status !== 400) {
        this.authMessage = 'Errore nel server, riprova più tardi!'
      }
    }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
