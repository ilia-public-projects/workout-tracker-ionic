import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { WorkoutTabPage } from './workout-tab.page';
import { NewWorkoutDialogComponent } from './new-workout-dialog/new-workout-dialog.component';
import { WorkoutTabPageRoutingModule } from './workout-tab.routing.module';
import { RoutineEditorDialogComponent } from './routine-editor-dialog/routine-editor-dialog.component';
import { CommonComponentsModule } from '../common/common.module';

@NgModule({
	declarations: [
		WorkoutTabPage, 
		NewWorkoutDialogComponent,
		RoutineEditorDialogComponent
	],
	imports: [
		IonicModule,
		CommonComponentsModule,
		CommonModule,
		FormsModule,
		ExploreContainerComponentModule,
		WorkoutTabPageRoutingModule,
		ReactiveFormsModule
	],

})
export class WorkoutTabPageModule { }
