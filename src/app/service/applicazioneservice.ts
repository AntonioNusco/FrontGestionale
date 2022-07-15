import { FormGroup } from '@angular/forms';
import { Applicazione } from './../api/applicazione';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, retry } from 'rxjs';
import { Utente } from '../api/utente';

@Injectable()
export class ApplicazioneService {

  headers = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

constructor(private http: HttpClient) {}

getApplicazioni(): Observable<Applicazione[]> {
  return this.http.get<Applicazione[]>('http://localhost:8080/progettogestionale/applicazionerest/getallapp');
}

getApplicazioniEliminate(): Observable<Applicazione[]> {
  return this.http.get<Applicazione[]>('http://localhost:8080/progettogestionale/applicazionerest/getappeliminate');
}

getApplicazione(appId: string): Observable<Applicazione> {
  return this.http.get<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/getbyid/${appId}`);
}

aggiungiApplicazione(appForm): Observable<Applicazione> {
  return this.http.post<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/save`, appForm , this.headers);
}

aggiungiOwnerApplicazione(aggiuntaOwnerForm): Observable<Applicazione> {
  return this.http.post<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/save`, aggiuntaOwnerForm , this.headers);
}
modificaApplicazione(formModifica): Observable<Applicazione> {
  return this.http.post<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/modificaapp`, formModifica , this.headers);
}

rimuoviApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/progettogestionale/applicazionerest/logicdelete/${appId}`, appId);
}

recuperaApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/progettogestionale/applicazionerest/recuperoapp/${appId}`, appId);
}

eliminazioneOwner(idApp, idOwner) {
  return this.http.delete(`http://localhost:8080/progettogestionale/applicazionerest/rimuoviowner/${idApp}/${idOwner}`);
}

}
