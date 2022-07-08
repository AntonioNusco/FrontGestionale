import { TokenStorageService } from './../../service/token-storage.service';
import { AuthService } from './../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Utente } from 'src/app/api/utente';
import { UtenteService } from 'src/app/service/utenteservice';

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
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
    this._controlloStatoUtente();
  }

  _controlloStatoUtente() {

    let idUtente = sessionStorage.getItem("Utente");
    let isLoggato: boolean;

    this.utenteService.getUtente(idUtente).subscribe(utente => {
      isLoggato = utente.accesso;

      if(isLoggato) {
        window.alert('Hai già effettuato l\'accesso');
        this.router.navigate(['dashboard']);
      }
    })
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

    const userFormData = {};

    Object.keys(this.loginForm).map((key) => {
      if(this.loginForm[key].value != "") {
        userFormData[key] = this.loginForm[key].value;
      }
    })

    this._login(userFormData);

  }

  _login(userData) {
    this.auth.login(userData).subscribe((utente: Utente) => {
      this.authError = false;
      if(sessionStorage.length == 0) {
        sessionStorage.setItem("Utente", "" + utente.idUtente);
        this.router.navigate(['dashboard']);
      } else if (sessionStorage.length > 0) {
        window.alert('Hai già effettuato l\'accesso!');
        this.router.navigate(['dashboard']);
      }
    },
    (error: HttpErrorResponse) => {
      this.authError = true;
      if(error.status == 401) {
        this.authMessage = 'Password errata!'
      } else if (error.status == 404) {
        this.authMessage = 'Email errata!'
      } else {
        this.authMessage = 'Errore interno del server!'
      }
    })
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
