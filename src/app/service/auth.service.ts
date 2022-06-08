import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Utente } from '../api/utente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = 'false';

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<Utente> {
    return this.http.post<Utente>(`http://localhost:8080/Gestionale/api/utente/login`, {email, password});
  }

  logout() {
    this.isLoggedIn = 'false';
    this.saveToken();
    this.router.navigate(['login']);
  }

  saveToken() {
    return sessionStorage.setItem("Accesso", this.isLoggedIn + '');
  }

  getToken() {
    return sessionStorage.getItem("Accesso");
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('utente')!);
  //   return user !== 'null' ? true : false;
  // }
}
