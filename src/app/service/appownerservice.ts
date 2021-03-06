import { AppOwner } from './../api/appowner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class AppownerService {

constructor(private http: HttpClient) {}

getOwners(): Observable<AppOwner[]> {
  return this.http.get<AppOwner[]>('http://localhost:8080/progettogestionale/appownerrest/getall');
}

getOwner(ownerId: number): Observable<AppOwner> {
  return this.http.get<AppOwner>(`http://localhost:8080/progettogestionale/appownerrest/getbyid/${ownerId}`);
}

aggiuntaOwner(ownerForm): Observable<AppOwner> {
  return this.http.post<AppOwner>(`http://localhost:8080/progettogestionale/appownerrest/save`, ownerForm);
}

}
