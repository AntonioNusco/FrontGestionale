import { Update } from './../api/update';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UpdateService {
  constructor(private http: HttpClient) {}

  getUpdate() {
    return this.http.get<any>('../../assets/data/update.json')
    .toPromise()
    .then(res => res.data as Update[])
    .then(data => data);
  }
}
