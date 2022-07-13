import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Utente } from './api/utente';
import { LogFileApp } from './api/logfileapp';
import { LogFileAppService } from './service/logappservice';
import { ApplicazioneService } from './service/applicazioneservice';
import { UtenteService } from './service/utenteservice';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="container-log" style="margin-top: 2.5rem;" *ngIf="modificatore">
        <!-- <div class="container-log" style="margin-top: 2.5rem;"> -->
            <p-table [value]="logsApp" [scrollable]="true" scrollHeight="500px" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Data</th>
                        <th>Utente</th>
                        <th>App</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-log>
                    <tr>
                        <td>{{log.data[2]}}/{{log.data[1]}}/{{log.data[0]}}</td>
                        <td>{{log.nomeUtente}} {{log.cognomeUtente}}</td>
                        <td>{{log.nome_App}}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})

export class AppMenuComponent implements OnInit {

    model: any[];

    logsApp: LogFileApp[] = [];
    utenti: any[] = [];
    utentiAppoggio: Utente[] = [];

    utenteLoggato: Utente;

    modificatore: boolean = false;

    constructor(public appMain: AppMainComponent, private logAppService: LogFileAppService, private appService: ApplicazioneService, private utenteService: UtenteService) { }

    ngOnInit() {

        this.utenteService.getUtente(sessionStorage.getItem("Utente")).subscribe(utente => {
            this.utenteLoggato = utente;

            if(this.utenteLoggato.ruolo) {
                this.modificatore = true;
            }

            this.model = [
                {
                    items: [
                        {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard']},
                        {label: 'App Eliminate', icon: 'pi pi-fw pi-home', routerLink: ['appeliminate'], visible: this.modificatore},
                        {label: 'Utenti', icon: 'pi pi-fw pi-home', routerLink: ['utenti'], visible: this.modificatore},
                        {label: 'Logout', icon: 'pi pi-fw pi-home', routerLink: ['logout']},
                    ]
                }
            ];
        })

        this.logAppService.getLogs().subscribe(logs => {
            this.logsApp = logs.slice().reverse();

            this.utenteService.getUtenti().subscribe(utente => {

              this.utenti = utente;

              this._getNomeCognomeUtente();

            })
        });


    }

    _getNomeCognomeUtente() {
      for(let item of this.logsApp) {

        let utenteAppoggio = this.utenti.find( u  => u.idUtente === item.idUtente );

        item.nomeUtente = utenteAppoggio.nome;
        item.cognomeUtente = utenteAppoggio.cognome;

      }
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}

