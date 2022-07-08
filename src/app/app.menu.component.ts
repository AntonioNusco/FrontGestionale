import { AuthService } from './service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Utente } from './api/utente';

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

        <div class="container-log">
            <p-table [value]="utenti" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Utente</th>
                        <th>App</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-utente>
                    <tr>
                        <td>{{utente.code}}</td>
                        <td>{{utente.name}}</td>
                        <td>{{utente.category}}</td>
                        <td>{{utente.quantity}}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})

export class AppMenuComponent implements OnInit {

    model: any[];

    utenti: Utente[];

    constructor(public appMain: AppMainComponent, private authService: AuthService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard']},
                    {label: 'App Eliminate', icon: 'pi pi-fw pi-home', routerLink: ['appeliminate']},
                    {label: 'Utenti', icon: 'pi pi-fw pi-home', routerLink: ['utenti']},
                    {label: 'Logout', icon: 'pi pi-fw pi-home', routerLink: ['logout']},
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
