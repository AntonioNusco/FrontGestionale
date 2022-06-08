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
  return this.http.get<Applicazione[]>('http://localhost:8080/Gestionale/api/applicazione/lista');
}

getApplicazioniEliminate(): Observable<Applicazione[]> {
  return this.http.get<Applicazione[]>('http://localhost:8080/Gestionale/api/applicazione/deletedapp');
}

getApplicazione(appId: string): Observable<Applicazione> {
  return this.http.get<Applicazione>(`http://localhost:8080/Gestionale/api/applicazione/${appId}`);
}

aggiungiApplicazione(appForm): Observable<Applicazione> {
  // console.log(JSON.parse(JSON.stringify(appForm)))
  return this.http.post<Applicazione>(`http://localhost:8080/Gestionale/api/applicazione/aggiunta`, appForm , this.headers);
}

rimuoviApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/Gestionale/api/applicazione/delete/${appId}`, appId);
}

recuperaApplicazione(appId: string): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/Gestionale/api/applicazione/recovery/${appId}`, appId);
}

// async getApplicazioni() {
//   try {
//     const data: any = await this.http.get('http://localhost:8080/Gestionale/api/applicazione/lista').toPromise();
//     return data;
//   } catch (error) {
//     console.error('Errore: ' + error);
//   }
// }

}
