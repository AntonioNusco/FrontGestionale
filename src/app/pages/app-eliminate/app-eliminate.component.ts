import { Applicazione } from './../../api/applicazione';
import { ApplicazioneService } from './../../service/applicazioneservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-eliminate',
  templateUrl: './app-eliminate.component.html'
})
export class AppEliminateComponent implements OnInit {

  isApplicazioniCaricate = false;
  caricamentoProgBar: number = 0;
  applicazioniEliminate: Applicazione[] = [];
  currentAppId = "";

  constructor(
    private appService: ApplicazioneService
  ) { }

  ngOnInit(): void {
    this._intervalloLoadingBar();
    this._getApplicazioniEliminate();
  }

  private _intervalloLoadingBar() {
    let intervallo = setInterval(() => {
      this.caricamentoProgBar = this.caricamentoProgBar + Math.floor(Math.random() * 50) + 1;
      if (this.caricamentoProgBar >= 100) {
        this.caricamentoProgBar = 100;
        this.isApplicazioniCaricate = true;
        clearInterval(intervallo);
       }
    }, 800);
  }

  private _getApplicazioniEliminate() {
    this.appService.getApplicazioniEliminate().subscribe((apps) => {
      this.applicazioniEliminate = apps;
    })
  }

  recuperaApp(appId: string) {
    this.currentAppId = appId;
    this.appService.recuperaApplicazione(appId).subscribe(() => {
      this._getApplicazioniEliminate();
    })
  }

}
