import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    }
];

@NgModule({
    imports: [IonicModule, RouterModule.forChild(routes)],
    declarations: [AuthComponent]
})
export class AuthModule { }
