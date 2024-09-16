import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ExerciseCreateDialogComponent } from './create-dialog/exercise-create-dialog.component';
import { ExerciseEditDialogComponent } from './edit-dialog/exercise-edit-dialog.component';
import { ExercisesTabPageRoutingModule } from './exercises-tab-routing.module';
import { ExercisesTabPage } from './exercises-tab.page';
import { ExerciseInfoDialogComponent } from './exercise-info-dialog/exercise-info-dialog.component';

@NgModule({
	declarations: [
		ExercisesTabPage,
		ExerciseCreateDialogComponent,
		ExerciseEditDialogComponent,
		ExerciseInfoDialogComponent
	],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ExploreContainerComponentModule,
		ExercisesTabPageRoutingModule,
		ReactiveFormsModule

	],
})
export class ExercisesTabPageModule { }
