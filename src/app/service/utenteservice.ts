import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../api/utente';

@Injectable()
export class UtenteService {

  headers = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(`http://localhost:8080/Gestionale/api/utente/lista`);
  }

  getUtente(userId: string): Observable<Utente> {
    return this.http.get<Utente>(`http://localhost:8080/Gestionale/api/utente/${userId}`);
  }

  updateRuolo(userId: string): Observable<Utente> {
    return this.http.put<Utente>(`http://localhost:8080/Gestionale/api/utente/updaterole/${userId}`, userId)
  }

  aggiungiUtente(userForm): Observable<Utente> {
    return this.http.post<Utente>(`http://localhost:8080/Gestionale/api/utente/signup`, userForm, this.headers)
  }

}
