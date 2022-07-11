import { Data } from "@angular/router";
import { Utente } from "./utente";

export interface LogFileApp {
    idLogApp?: number;
    data?: string;
    idApplicazione?: number;
    idUtente?: string;
    nome_App?: string;
}