import { Rescan } from './../api/rescan';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class RescanService {

  constructor(private http: HttpClient) {}

  getRescans(rescanId: number): Observable<Rescan> {
    return this.http.get<Rescan>(`http://localhost:8080/progettogestionale/rescanrest/getrescanbyid/${rescanId}`);
  }

}
