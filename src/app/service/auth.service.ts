import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Utente } from '../api/utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = 'false';

  headers = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  login(loginForm): Observable<Utente> {
    return this.http.post<Utente>(`http://localhost:8080/progettogestionale/utenterest/login`, loginForm, this.headers);
  }

  logout(utente): Observable<Utente> {
    return this.http.put<Utente>(`http://localhost:8080/progettogestionale/utenterest/logout`, utente);
  }
}
