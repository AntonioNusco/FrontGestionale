import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UtenteService } from 'src/app/service/utenteservice';
import { Utente } from 'src/app/api/utente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utenteService: UtenteService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this._logout();
  }

  _logout() {
    let idUtente = sessionStorage.getItem("Utente");

    this.utenteService.getUtente(idUtente).subscribe((utente: Utente) => {
      this.authService.logout(utente).subscribe(utente => {
        sessionStorage.removeItem("Utente");
        this.router.navigate(['login']);
      })
    })
  }

}
