import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', component: AppMainComponent,
      children: [
        {path: '', component: DashboardComponent}
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
