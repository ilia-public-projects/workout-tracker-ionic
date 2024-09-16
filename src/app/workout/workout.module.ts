import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout.routing.module';

@NgModule({
    declarations: [
        WorkoutComponent
    ],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		WorkoutRoutingModule
	],
})
export class WorkoutModule { }
