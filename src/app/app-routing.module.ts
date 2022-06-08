import { UtentiComponent } from './pages/utenti/utenti.component';
import { AppEliminateComponent } from './pages/app-eliminate/app-eliminate.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './service/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'appeliminate', component: AppEliminateComponent },
      { path: 'utenti', component: UtentiComponent },
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
