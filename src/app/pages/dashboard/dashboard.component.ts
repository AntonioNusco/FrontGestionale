import { ApplicazioneService } from './../../service/applicazioneservice';
import { Applicazione } from './../../api/applicazione';
import { AppConfig } from './../../api/appconfig';
import { ConfigService } from './../../service/app.config.service';
import { UpdateService } from './../../service/updateservice';
import { Update } from './../../api/update';
import { FilterService, MenuItem } from 'primeng/api';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  isSubmitted = false;
  editMode = false;
  currentAppId: string;
  isCaricato = false;
  isApplicazioniCaricate = false;
  caricamentoProgBar: number = 0;

  constructor(
    private updateService: UpdateService,
    private applicazioneService: ApplicazioneService,
    public configService: ConfigService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.updateService.getUpdate().then(data => this.updates = data);
    this._getApplicazioni();
    this._initForm();
    this._intervalloLoadingBar();
  }

  private _intervalloLoadingBar() {
    let intervallo = setInterval(() => {
      this.caricamentoProgBar = this.caricamentoProgBar + Math.floor(Math.random() * 50) + 1;
      if (this.caricamentoProgBar >= 100) {
        this.caricamentoProgBar = 100;
        this.isApplicazioniCaricate = true;
        clearInterval(intervallo);
       }
    }, 1055);
  }

  private _getApplicazioni() {
    this.applicazioneService.getApplicazioni().subscribe((apps) => {
      console.log(apps);
      this.applicazioni = apps;
      this.appFiltrate = this.applicazioni;

    })
  }

  filtraggioNomeApp(event) {
    let filtratiPerNome: any[] = [];
    let queryNome = event.query;
    console.log("Nome: " + queryNome);


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
    console.log("APM: " + queryAPM);


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

  private _initForm() {
    this.form = this.formBuilder.group({
      nome_App: [''],
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
      done: [false],
      linkConfluence: [''],
      businessCriticality: [''],
      devMethodology: [''],
      provider: [''],
      exist: [''],

    })
  }

  get appForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.display = true;
    console.log("onSubmit");

    if (this.form.invalid) return;

    const appFormData = new FormData();

    Object.keys(this.appForm).map((key) => {
      appFormData.append(key, this.appForm[key].value);
    })

  }

  getAppId(idApplicazione: string) {
    this.currentAppId = idApplicazione;
    this.editMode = true;
    console.log(this.currentAppId);
    console.log(this.editMode);

    this._editMode();
  }

  private _editMode() {
    if (this.editMode) {
      this.applicazioneService.getApplicazione(this.currentAppId).subscribe(app => {
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
        this.appForm['exist'].setValue(app.exist);

        setTimeout(() => this.isCaricato = true, 1000);
      })
    }
  }

  resetForm() {
    this.currentAppId = "";
    this.isCaricato = false;

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
    this.appForm['exist'].setValue("");

  }
}
