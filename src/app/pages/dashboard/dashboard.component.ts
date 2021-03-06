import { RescanService } from './../../service/rescanservice';
import { HttpErrorResponse } from '@angular/common/http';
import { AppownerService } from './../../service/appownerservice';
import { ApplicazioneService } from './../../service/applicazioneservice';
import { Applicazione } from './../../api/applicazione';
import { AppConfig } from './../../api/appconfig';
import { ConfigService } from './../../service/app.config.service';
import { UpdateService } from './../../service/updateservice';
import { Update } from './../../api/update';
import { FilterService, MenuItem, ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppOwner } from 'src/app/api/appowner';
import { timer } from 'rxjs';
import { UtenteService } from 'src/app/service/utenteservice';
import { Utente } from 'src/app/api/utente';
import { LogFileAppService } from 'src/app/service/logappservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] = [];
  updates: Update[] = [];
  applicazioni: Applicazione[] = [];
  config: AppConfig;
  applicazione: Applicazione;

  appSelezionate: any;
  appFiltrate: any[] = [];

  display: boolean;

  form!: FormGroup;
  formOwner!: FormGroup;
  isSubmitted = false;
  editMode = false;
  addMode = false;
  currentAppId: string;
  currentOwnerId: number;
  isCaricato = false;
  isApplicazioniCaricate = false;
  caricamentoProgBar: number = 0;

  appOwners: AppOwner[];

  appOwnersApplicazione: AppOwner[] = [];

  selectedOwner: AppOwner;
  idAppOwner: number;

  utenteLoggato: Utente;

  aggiuntaOwner: boolean;
  visualizzaOwner: boolean = true;

  countries: any[] = [];

  constructor(
    private updateService: UpdateService,
    private applicazioneService: ApplicazioneService,
    public configService: ConfigService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private appownerService: AppownerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private rescanService: RescanService,
    private utenteService: UtenteService,
    public router: Router,
    private logService: LogFileAppService
  ) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.updateService.getUpdate().then(data => this.updates = data);
    this._getApplicazioni();
    this._initForm();
    this._initFormOwner();
    this._intervalloLoadingBar();
    this._controlloUtente();
    this._getOwners();
  }

  _getOwners() {
    this.appownerService.getOwners().subscribe((appOwners: AppOwner[]) => {
      this.appOwners = appOwners;

    })
  }

  onSelect(event) {
    if(event.value !== null) {
      this.appownerService.getOwner(event.value['idAppOwner']).subscribe(owner => {
        owner.nomeCognomeOwner = owner.nome + " " + owner.cognome
        this.idAppOwner = owner.idAppOwner;
        // console.log(this.idAppOwner);
        for (let item of this.appOwners) {
          let ownerAppoggio = this.appOwners.find(u => u.idAppOwner === item.idAppOwner);
          item.nomeCognomeOwner = ownerAppoggio.nome + " " + ownerAppoggio.cognome;
          // console.log(item.nomeCognomeOwner);
        }
      })
      console.log(this.selectedOwner);
    }

  }



  _controlloUtente() {
    if (sessionStorage.length > 0) {
      let idUtente = sessionStorage.getItem("Utente");
      let isLoggato: boolean;

      this.utenteService.getUtente(idUtente).subscribe((utente: Utente) => {
        isLoggato = utente.accesso;
      })

    } else if (sessionStorage.length == 0) {

      window.alert('Accesso negato, ?? richiesto l\'accesso!');
      this.router.navigate(['login']);

    }
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

  private _getApplicazioni() {
    this.applicazioneService.getApplicazioni().subscribe((apps) => {
      this.applicazioni = apps;
      this.appFiltrate = this.applicazioni;
    })
  }

  filtraggioNomeApp(event) {
    let filtratiPerNome: any[] = [];
    let queryNome = event.query;


    for (let i = 0; i < this.applicazioni.length; i++) {
      let app = this.applicazioni[i];
      if (app.nome_App.toLowerCase().indexOf(queryNome.toLowerCase()) == 0) {
        filtratiPerNome.push(app);
      }
    }

    this.appFiltrate = filtratiPerNome;
  }


  filtraggioApmApp(event) {
    let filtratiPerAPM: any[] = [];
    let queryAPM = event.query;


    for (let i = 0; i < this.applicazioni.length; i++) {
      let apps = this.applicazioni[i];
      if (apps.apmCode !== null) {
        if (apps.apmCode.toLowerCase().indexOf(queryAPM.toLowerCase()) == 0) {
          filtratiPerAPM.push(apps);
        }
      }
    }

    this.appFiltrate = filtratiPerAPM;
  }

  resetFiltro() {
    this.appFiltrate = this.applicazioni;
  }

  selezioneOwner(event) {
    this.idAppOwner = event.value['idAppOwner'];
  }

  eliminaOwner(idOwner) {
    let idApp = this.currentAppId;

    this.applicazioneService.eliminazioneOwner(idApp, idOwner).subscribe(data => {
      this.appOwnersApplicazione = [];
      this.applicazioneService.getApplicazione(idApp).subscribe(app => {
        this._editMode();
      })
    });
  }

  private _initFormOwner() {
    this.formOwner = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      cell: [''],
      dsUnit: ['']
    })
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      idApplicazione: [''],
      nome_App: ['', Validators.required],
      apmCode: [''],
      ownerOnboarding: [''],
      ownerAFP: [''],
      gdsUnit: [''],
      tecnologia: [''],
      serverManager: [''],
      soloCMS: [''],
      nodoConsole: [''],
      macchina: [''],
      noteOnboarding: [''],
      fase: [''],
      afpStatus: [''],
      pubblicatoDashboard: [''],
      noteAppOwner: [0],
      avgAnalysisTime: [0],
      jiraautomationActivation: [''],
      repoAvailability: [''],
      automationStatus: [''],
      automationEnablingDate: [Date.now()],
      automationNotes: [''],
      greenItIndex: [''],
      insertedInCastProgram: [''],
      stakeholderEngagement: [''],
      launchingMeetingDataGatheringStarting: [0],
      stakeholderBrief: [''],
      onBoardingKitDelivery: [''],
      onboardingKitClosing: [''],
      sourceCodeFinalDelivery: [''],
      primaRestitution: [''],
      done: [''],
      linkConfluence: [''],
      businessCriticality: [''],
      devMethodology: [''],
      provider: [''],
      // exist: [true],

      // DATI APPOWNER
      nome: [''],
      cognome: [''],
      email: [''],
      cell: [''],
      dsUnit: [''],

      // DATI RESCAN
      nRescan: [0],
      newOb: [0],
      py: [0],
      ytd: [0],
      afpe: [''],
      yoyRolling: [''],
      last_Rescan: [''],
      onGoing: [''],
      archive: [''],
      rkd: [''],

      idUtente: [''],

      intero: [this.idAppOwner]
    })
  }

  get appForm() {
    return this.form.controls;
  }

  get ownerForm(){
    return this.formOwner.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.display = true;
  }

  apriDialogAggiunta() {
    this.aggiuntaOwner = true;
    this._initFormOwner();
  }

  creaAppOwner() {

    console.log("Ho cliccato sul bottone di aggiunta Owner");

    if (this.form.invalid) {
      console.log("Campi nel form non validi")
    };

    const ownerFormData = {};

    Object.keys(this.ownerForm).map((key) => {
      if (this.ownerForm[key].value != "") {
        ownerFormData[key] = this.ownerForm[key].value;
        console.log(JSON.parse(JSON.stringify(ownerFormData)));
      }
    })

    this._servizioAggiuntaOwner(ownerFormData);
    // console.log(JSON.parse(JSON.stringify(ownerFormData)));

  }

  aggiuntaAppOwnerAllApplicazione() {
    if (this.form.invalid) return;

    const appFormData = {};

    Object.keys(this.appForm).map((key) => {
      if (this.appForm[key].value != "") {
        if(appFormData['intero'] == null || appFormData['intero'] == "") {
          appFormData['intero'] = this.appForm['intero'].setValue(this.idAppOwner);
        }
        appFormData[key] = this.appForm[key].value;
      }
    })

    this.applicazioneService.aggiungiOwnerApplicazione(appFormData).subscribe(owner => {
      this.appOwnersApplicazione = [];
      this.applicazioneService.getApplicazione(this.currentAppId).subscribe(app => {
        this._editMode();
      })
    })
  }

  addOrModify() {
    if (this.form.invalid) return;

    const appFormData = {};

    Object.keys(this.appForm).map((key) => {
      if (this.appForm[key].value != "") {
        if(appFormData['intero'] == null || appFormData['intero'] == "") {
          appFormData['intero'] = this.appForm['intero'].setValue(this.idAppOwner);
        }
        appFormData[key] = this.appForm[key].value;
      }
    })

    if(this.editMode) {
      this._updateApplicazione(appFormData);
    } else {
      this._aggiungiApplicazione(appFormData);
    }
  }

  _updateApplicazione(appData) {
    this.utenteService.getUtente(sessionStorage.getItem("Utente")).subscribe(utente => {
      this.utenteLoggato = utente;

      this.applicazioneService.modificaApplicazione(appData).subscribe((app: Applicazione) => {

        timer(2000).toPromise().then(() => {
          this.display = false;
          this._getApplicazioni();
          window.location.reload();
        })
      });
    });

  }

  _servizioAggiuntaOwner(ownerData) {
    this.appownerService.aggiuntaOwner(ownerData).subscribe(owner => {

      console.log("Sono nel servizio dell'aggiunta Owner");

      timer(2000).toPromise().then(() => {
        this.aggiuntaOwner = false;
        this._getApplicazioni();
        this._getOwners();
      })

    })
  }

  _aggiungiApplicazione(appData) {
    this.utenteService.getUtente(sessionStorage.getItem("Utente")).subscribe(utente => {
      this.utenteLoggato = utente;

      this.applicazioneService.aggiungiApplicazione(appData).subscribe((app: Applicazione) => {
        timer(2000).toPromise().then(() => {
          this.display = false;
          this._getApplicazioni();
        })
      });
    })

  }

  addClick() {
    this.display = true;
    this.addMode = true;
    this.resetForm();
    this._editMode();
  }

  getAppId(idApplicazione: string) {
    this.currentAppId = idApplicazione;
    this.editMode = true;

    this._editMode();
  }

  private _editMode() {
    setTimeout(() => this.isCaricato = true, 800);

    if (this.editMode) {
      this.applicazioneService.getApplicazione(this.currentAppId).subscribe(app => {
        // console.log(app);

        this.appForm['idApplicazione'].setValue(app.idApplicazione);
        this.appForm['nome_App'].setValue(app.nome_App);
        this.appForm['apmCode'].setValue(app.apmCode);
        this.appForm['ownerOnboarding'].setValue(app.ownerOnboarding);

        this.appForm['ownerAFP'].setValue(app.ownerAFP);
        this.appForm['gdsUnit'].setValue(app.gdsUnit);
        this.appForm['tecnologia'].setValue(app.tecnologia);

        this.appForm['serverManager'].setValue(app.serverManager);
        this.appForm['soloCMS'].setValue(app.soloCMS);
        this.appForm['nodoConsole'].setValue(app.nodoConsole);

        this.appForm['macchina'].setValue(app.macchina);
        this.appForm['noteOnboarding'].setValue(app.noteOnboarding);
        this.appForm['fase'].setValue(app.fase);

        this.appForm['afpStatus'].setValue(app.afpStatus);
        this.appForm['pubblicatoDashboard'].setValue(app.pubblicatoDashboard);
        this.appForm['noteAppOwner'].setValue(app.noteAppOwner);

        this.appForm['avgAnalysisTime'].setValue(app.avgAnalysisTime);
        this.appForm['jiraautomationActivation'].setValue(app.jiraautomationActivation);
        this.appForm['repoAvailability'].setValue(app.repoAvailability);

        this.appForm['automationStatus'].setValue(app.automationStatus);
        this.appForm['automationEnablingDate'].setValue(app.automationEnablingDate);
        this.appForm['automationNotes'].setValue(app.automationNotes);

        this.appForm['greenItIndex'].setValue(app.greenItIndex);
        this.appForm['insertedInCastProgram'].setValue(app.insertedInCastProgram);
        this.appForm['stakeholderEngagement'].setValue(app.stakeholderEngagement);

        this.appForm['launchingMeetingDataGatheringStarting'].setValue(app.launchingMeetingDataGatheringStarting);
        this.appForm['stakeholderBrief'].setValue(app.stakeholderBrief);
        this.appForm['onBoardingKitDelivery'].setValue(app.onBoardingKitDelivery);

        this.appForm['onboardingKitClosing'].setValue(app.onboardingKitClosing);
        this.appForm['sourceCodeFinalDelivery'].setValue(app.sourceCodeFinalDelivery);
        this.appForm['primaRestitution'].setValue(app.primaRestitution);

        this.appForm['done'].setValue(app.done);
        this.appForm['linkConfluence'].setValue(app.linkConfluence);
        this.appForm['businessCriticality'].setValue(app.businessCriticality);

        this.appForm['devMethodology'].setValue(app.devMethodology);
        this.appForm['provider'].setValue(app.provider);
        // this.appForm['exist'].setValue(app.exist);

        // DATI OWNER APPLICAZIONE
        let ownerApp: any[] = app.idOwners;

        this.appForm['intero'].setValue(this.idAppOwner);

        for (let item of ownerApp) {
          this.appownerService.getOwner(item).subscribe(appOwner => {
            this.appOwnersApplicazione.push(appOwner);
          })
        }

        // DATI RESCAN APPLICAZIONE
        let rescanApp = app.idRescans;
        this.rescanService.getRescans(rescanApp).subscribe(rescan => {
          this.appForm['nRescan'].setValue(rescan.nRescan);
          this.appForm['newOb'].setValue(rescan.newOb);
          this.appForm['py'].setValue(rescan.py);
          this.appForm['ytd'].setValue(rescan.ytd);
          this.appForm['afpe'].setValue(rescan.afpe);
          this.appForm['yoyRolling'].setValue(rescan.yoyRolling);
          this.appForm['last_Rescan'].setValue(rescan.last_Rescan);
          this.appForm['onGoing'].setValue(rescan.onGoing);
          this.appForm['archive'].setValue(rescan.archive);
          // this.appForm['exist'].setValue(rescanApp.exist);
          this.appForm['rkd'].setValue(rescan.rkd);
        })

        this.utenteService.getUtente(sessionStorage.getItem("Utente")).subscribe(utente => {
          this.appForm['idUtente'].setValue(utente.idUtente);
        })

      })

      this._initForm();

    }
  }

  resetFormOwner() {
    this.currentAppId = "";
    this.isCaricato = false;
    this.editMode = false;

    this.ownerForm['nome'].setValue("");
    this.ownerForm['cognome'].setValue("");
    this.ownerForm['email'].setValue("");
    this.ownerForm['cell'].setValue("");
    this.ownerForm['dsUnit'].setValue("");
  }

  resetForm() {
    this.currentAppId = "";
    this.isCaricato = false;
    this.editMode = false;

    this.appForm['idApplicazione'].setValue("");
    this.appForm['nome_App'].setValue("");
    this.appForm['apmCode'].setValue("");
    this.appForm['ownerOnboarding'].setValue("");

    this.appForm['ownerAFP'].setValue("");
    this.appForm['gdsUnit'].setValue("");
    this.appForm['tecnologia'].setValue("");

    this.appForm['serverManager'].setValue("");
    this.appForm['soloCMS'].setValue("");
    this.appForm['nodoConsole'].setValue("");

    this.appForm['macchina'].setValue("");
    this.appForm['noteOnboarding'].setValue("");
    this.appForm['fase'].setValue("");

    this.appForm['afpStatus'].setValue("");
    this.appForm['pubblicatoDashboard'].setValue("");
    this.appForm['noteAppOwner'].setValue("");

    this.appForm['avgAnalysisTime'].setValue("");
    this.appForm['jiraautomationActivation'].setValue("");
    this.appForm['repoAvailability'].setValue("");

    this.appForm['automationStatus'].setValue("");
    this.appForm['automationEnablingDate'].setValue("");
    this.appForm['automationNotes'].setValue("");

    this.appForm['greenItIndex'].setValue("");
    this.appForm['insertedInCastProgram'].setValue("");
    this.appForm['stakeholderEngagement'].setValue("");

    this.appForm['launchingMeetingDataGatheringStarting'].setValue("");
    this.appForm['stakeholderBrief'].setValue("");
    this.appForm['onBoardingKitDelivery'].setValue("");

    this.appForm['onboardingKitClosing'].setValue("");
    this.appForm['sourceCodeFinalDelivery'].setValue("");
    this.appForm['primaRestitution'].setValue("");

    this.appForm['done'].setValue("");
    this.appForm['linkConfluence'].setValue("");
    this.appForm['businessCriticality'].setValue("");

    this.appForm['devMethodology'].setValue("");
    this.appForm['provider'].setValue("");
    // this.appForm['exist'].setValue("");

    this.appForm['nome'].setValue("");
    this.appForm['cognome'].setValue("");
    this.appForm['email'].setValue("");
    this.appForm['cell'].setValue("");
    this.appForm['dsUnit'].setValue("");

    this.appForm['intero'].setValue("");

    this.appOwnersApplicazione = [];

  }

  deleteApp(idApplicazione: string) {
    this.currentAppId = idApplicazione;
    this.confirmationService.confirm({
      message: 'Sicuro di voler procedere?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.applicazioneService.rimuoviApplicazione(this.currentAppId).subscribe(() => {
          this._getApplicazioni();
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Prodotto eliminato!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: 'Prodotto non eliminato'
          });
        });
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rifiutata',
              detail: 'Hai rifiutato la cancellazione!'
            });
          break;
        }
      }
    })

  }
}
