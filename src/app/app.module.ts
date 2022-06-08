import { UtenteService } from './service/utenteservice';
import { UtentiComponent } from './pages/utenti/utenti.component';
import { AppEliminateComponent } from './pages/app-eliminate/app-eliminate.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UsersModule } from './login.module';
import { AuthService } from './service/auth.service';
import { AppownerService } from './service/appownerservice';
import { ApplicazioneService } from './service/applicazioneservice';
import { AppFooterComponent } from './app.footer.component';
import { UpdateService } from './service/updateservice';
import { MenuService } from './service/app.menu.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppMenuComponent } from './app.menu.component';
import { ConfigService } from './service/app.config.service';
import { AppTopBarComponent } from './app.topbar.component';
import { AppMainComponent } from './app.main.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import {MenubarModule} from 'primeng/menubar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    AppFooterComponent,
    LogoutComponent,
    AppEliminateComponent,
    UtentiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    FieldsetModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    MenubarModule,
    UsersModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfigService, MenuService, UpdateService, ApplicazioneService, UtenteService, AppownerService, AuthService, ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
