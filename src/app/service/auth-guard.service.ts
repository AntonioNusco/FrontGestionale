import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UtenteService } from './utenteservice';
import { Utente } from '../api/utente';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public utenteService: UtenteService
  ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.length == 0) {

      window.alert('Accesso negato, è richiesto l\'accesso!');
      this.router.navigate(['login']);

      return false;
    }

    let idUtente = sessionStorage.getItem("Utente");
    let isLoggato: boolean;

    this.utenteService.getUtente(idUtente).subscribe((utente: Utente) => {
      isLoggato = utente.accesso;

      if (isLoggato) {
        this.router.navigate(['dashboard']);
      }
    })

    return true;
  }
}
