import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utente } from '../api/utente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  isLoggedIn = false;

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<Utente> {
    return this.http.post<Utente>(`http://localhost:8080/Gestionale/api/utente/login`, {email, password});
  }

  logout() {
    // console.log("sono nel logout")
    this.router.navigate(['login']);
  }

  saveToken() {
    return sessionStorage.setItem("Accesso", this.isLoggedIn + '');
  }

  getToken() {
    console.log("Sono nel getToken con valore = " + sessionStorage.getItem("Accesso") )
    return sessionStorage.getItem("Accesso");
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('utente')!);
  //   console.log(user);
  //   return user !== 'null' ? true : false;
  // }
}
