import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UtenteService } from 'src/app/service/utenteservice';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  registrazioneFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private utenteService: UtenteService
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
    this._controlloStatoUtente();
  }

  _controlloStatoUtente() {

    let idUtente = sessionStorage.getItem("Utente");
    let isLoggato: boolean;

    if(sessionStorage.length > 0) {
      this.utenteService.getUtente(idUtente).subscribe(utente => {
        isLoggato = utente.accesso;
  
        if(isLoggato) {
          window.alert('Hai già effettuato l\'accesso');
          this.router.navigate(['dashboard']);
        }
      })
    }
    
  }

  private _initLoginForm() {
    this.registrazioneFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registrazioneFormGroup.invalid) return;

    const userFormData = {};

    Object.keys(this.registrazioneForm).map((key) => {
      if(this.registrazioneForm[key].value != "") {
        userFormData[key] = this.registrazioneForm[key].value;
      }
    })

    this._registrazione(userFormData);
  }

  _registrazione(userData) {
    this.utenteService.aggiungiUtente(userData).subscribe(utente => {
      this.authError = false;
      if(sessionStorage.length == 0) {
        sessionStorage.setItem("Utente", "" + utente.idUtente);
        this.router.navigate(['dashboard']);
      } else if (sessionStorage.length > 0) {
        window.alert('Hai già effettuato l\'accesso!');
        this.router.navigate(['dashboard']);
      }
    })
  }

  get registrazioneForm() {
    return this.registrazioneFormGroup.controls;
  }
}
