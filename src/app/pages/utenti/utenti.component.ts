import { timer } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utente } from './../../api/utente';
import { UtenteService } from './../../service/utenteservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html'
})
export class UtentiComponent implements OnInit {

  caricamentoProgBar: number = 0;
  isUtentiCaricati = false;
  isCaricato = false;
  display = false;
  editMode = false;

  utenti: Utente[] = [];

  form!: FormGroup;

  currentAppId = "";

  constructor(
    private utenteService: UtenteService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._getUtenti();
    this._intervalloLoadingBar();
    this._initForm();
  }

  private _intervalloLoadingBar() {
    let intervallo = setInterval(() => {
      this.caricamentoProgBar = this.caricamentoProgBar + Math.floor(Math.random() * 50) + 1;
      if (this.caricamentoProgBar >= 100) {
        this.caricamentoProgBar = 100;
        this.isUtentiCaricati = true;
        clearInterval(intervallo);
       }
    }, 1055);
  }

  private _getUtenti() {
    this.utenteService.getUtenti().subscribe((utenti) => {
      this.utenti = utenti;
    })
  }

  get userForm() {
    return this.form.controls;
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      ruolo: [false],
    })
  }

  addUtente() {
    if (this.form.invalid) return;

    const userFormData = {};

    Object.keys(this.userForm).map((key) => {
      if(this.userForm[key].value != "") {
        userFormData[key] = this.userForm[key].value;
      }
    })

    this._aggiungiUtente(userFormData);
  }

  _aggiungiUtente(userData) {
    this.utenteService.aggiungiUtente(userData).subscribe((utente: Utente) => {
      timer(2000).toPromise().then(() => {
        this.display = false;
        this._getUtenti();
      })
    })
  }

  onSubmit() {
    this.display = true;
  }

  getUserId(idUtente: string) {
    this.currentAppId = idUtente;
    this.editMode = true;

    this._editMode();
  }

  modificaRuolo(idUtente: string) {
    this.currentAppId = idUtente;

    this.utenteService.updateRuolo(idUtente).subscribe(() => {
      this._getUtenti();
    })
  }

  addClick() {
    setTimeout(() => this.isCaricato = true, 1000);
    this._initForm();
    this.display = true;
  }

  private _editMode() {
    setTimeout(() => this.isCaricato = true, 1000);

    if (this.editMode) {
      this.utenteService.getUtente(this.currentAppId).subscribe(utente => {
        this.userForm['nome'].setValue(utente.nome);
        this.userForm['cognome'].setValue(utente.cognome);
        this.userForm['email'].setValue(utente.email);
        this.userForm['ruolo'].setValue(utente.ruolo);
      })
    }
  }

  resetForm() {
    this.currentAppId = "";
    this.isCaricato = false;
    this.editMode = false;

    this.userForm['nome'].setValue("");
    this.userForm['cognome'].setValue("");
    this.userForm['email'].setValue("");
    this.userForm['ruolo'].setValue("");
  }

}
