import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { RoutineModel } from '../models/routine/routine-model';
import { RoutineLoader } from '../services/routine-loader';
import { WorkoutLoader } from '../services/workout-loader';
import { RoutineEditorDialogComponent } from './routine-editor-dialog/routine-editor-dialog.component';

@Component({
	selector: 'app-workout-tab-page',
	templateUrl: 'workout-tab.page.html',
	styleUrls: ['workout-tab.page.scss']
})
export class WorkoutTabPage implements OnInit {
	public imageUrl?: string;
	public list: RoutineModel[] = [];

	constructor(
		private loader: WorkoutLoader,
		private router: Router,
		private modalCtrl: ModalController,
		private auth: AuthService,
		private routineLoader: RoutineLoader
	) { }

	async ngOnInit() {
		const user = await firstValueFrom(this.auth.getUser());
		console.log(user);
		if (user) {
			this.imageUrl = user.picture;
			console.log(this.imageUrl);
		}
		await this.search();
	}

	public async search() {
		this.list = await this.routineLoader.get();
	}

	public async manageRoutine(routineId?: string) {
		const modal = await this.modalCtrl.create({
			component: RoutineEditorDialogComponent,
			componentProps: {
				routineId: routineId
			}
		});

		modal.present();

		const { data, role } = await modal.onDidDismiss();
		if (role === 'confirm') {
			await this.search();
		}
	}

	public async startWorkout(routine: RoutineModel) {

	}

	public async startQuickWorkout() { }

}
