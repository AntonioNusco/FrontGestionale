import { AuthGuard } from './service/auth-guard.service';
import { UsersModule } from './login.module';
import { AuthInterceptor } from './service/authconfig.interceptor';
import { AuthService } from './service/auth.service';
import { AppownerService } from './service/appownerservice';
import { Routes, RouterModule } from '@angular/router';
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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import { LoginComponent } from './pages/login/login.component';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    AppFooterComponent
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
    UsersModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfigService, MenuService, UpdateService, ApplicazioneService, AppownerService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
