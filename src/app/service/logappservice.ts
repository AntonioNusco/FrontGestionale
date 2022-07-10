import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogFileApp } from "../api/logfileapp";

@Injectable()
export class LogFileAppService {
    constructor(private http: HttpClient) {}

    getLogs(): Observable<LogFileApp[]> {
        return this.http.get<LogFileApp[]>(`http://localhost:8080/progettogestionale/logfileapprest/getalllog`);
    }
}