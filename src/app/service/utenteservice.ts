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
    return this.http.get<Utente[]>(`http://localhost:8080/progettogestionale/utenterest/getallutenti`);
  }

  getUtente(userId: string): Observable<Utente> {
    return this.http.get<Utente>(`http://localhost:8080/progettogestionale/utenterest/getutentebyid/${userId}`);
  }

  updateRuolo(userId: string): Observable<Utente> {
    return this.http.put<Utente>(`http://localhost:8080/progettogestionale/utenterest/rendimodificatore/${userId}`, userId)
  }

  downgradeRuolo(userId: string): Observable<Utente> {
    return this.http.put<Utente>(`http://localhost:8080/progettogestionale/utenterest/rendivisualizzatore/${userId}`, userId)
  }

  aggiungiUtente(userForm): Observable<Utente> {
    // return this.http.post<Utente>(`http://localhost:8080/Gestionale/api/utente/signup`, userForm, this.headers)
    return this.http.post<Utente>(`http://localhost:8080/progettogestionale/utenterest/save`, userForm, this.headers)
  }

}
