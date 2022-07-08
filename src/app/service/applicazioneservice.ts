import { FormGroup } from '@angular/forms';
import { Applicazione } from './../api/applicazione';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, retry } from 'rxjs';

@Injectable()
export class ApplicazioneService {

  headers = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

constructor(private http: HttpClient) {}

getApplicazioni(): Observable<Applicazione[]> {
  // return this.http.get<Applicazione[]>('http://localhost:8080/Gestionale/api/applicazione/lista');
  return this.http.get<Applicazione[]>('http://localhost:8080/progettogestionale/applicazionerest/getallapp');
}

getApplicazioniEliminate(): Observable<Applicazione[]> {
  return this.http.get<Applicazione[]>('http://localhost:8080/progettogestionale/applicazionerest/getappeliminate');
}

getApplicazione(appId: string): Observable<Applicazione> {
  // return this.http.get<Applicazione>(`http://localhost:8080/Gestionale/api/applicazione/${appId}`);
  return this.http.get<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/getbyid/${appId}`);
}

aggiungiApplicazione(appForm): Observable<Applicazione> {
  // console.log(JSON.parse(JSON.stringify(appForm)))
  return this.http.post<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/save`, appForm , this.headers);
}

modificaApplicazione(appForm): Observable<Applicazione> {
  // console.log(JSON.parse(JSON.stringify(appForm)))
  return this.http.post<Applicazione>(`http://localhost:8080/progettogestionale/applicazionerest/save`, appForm , this.headers);
}

rimuoviApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/progettogestionale/applicazionerest/logicdelete/${appId}`, appId);
}

recuperaApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/progettogestionale/applicazionerest/recuperoapp/${appId}`, appId);
}

}
