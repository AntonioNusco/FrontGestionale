import { Applicazione } from './../api/applicazione';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class ApplicazioneService {

constructor(private http: HttpClient) {}

getApplicazioni(): Observable<Applicazione[]> {
  return this.http.get<Applicazione[]>('http://localhost:8080/Gestionale/api/applicazione/lista');
}

getApplicazione(appId: string): Observable<Applicazione> {
  return this.http.get<Applicazione>(`http://localhost:8080/Gestionale/api/applicazione/${appId}`);
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
