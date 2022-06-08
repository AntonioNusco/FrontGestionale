import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const autenticazione = this.authService.getToken();

    if (autenticazione == 'false') {
      window.alert('Accesso negato, è richiesto l\'accesso!');
      this.router.navigate(['login']);
    }

    return true;
  }
}
