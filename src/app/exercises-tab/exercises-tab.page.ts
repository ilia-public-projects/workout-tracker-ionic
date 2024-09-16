import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExerciseModel } from '../models/exercises/exercise-model';
import { ExerciseEditor } from '../services/exercise-editor';
import { ExerciseLoader } from '../services/exercise-loader';
import { ExerciseCreateDialogComponent } from './create-dialog/exercise-create-dialog.component';
import { ExerciseEditDialogComponent } from './edit-dialog/exercise-edit-dialog.component';
import { ExerciseInfoDialogComponent } from './exercise-info-dialog/exercise-info-dialog.component';

@Component({
	selector: 'app-exercises-tab-page',
	templateUrl: 'exercises-tab.page.html',
})
export class ExercisesTabPage implements OnInit {

	public list: ExerciseModel[] = [];

	constructor(
		private loader: ExerciseLoader,
		private editor: ExerciseEditor,
		private modalCtrl: ModalController
	) { }

	async ngOnInit() {
		await this.search();
	}

	public async search(searchTest?: string) {
		this.list = await this.loader.get();
		if (searchTest) {
			this.list = this.list.filter(item => item.name.toLowerCase().includes(searchTest.toLowerCase()));
		}
	}

	public async handleSearch(event: CustomEvent) {
		await this.search(event.detail.value);
	}

	public async add() {
		const modal = await this.modalCtrl.create({
			component: ExerciseCreateDialogComponent
		});

		modal.present();

		const { data, role } = await modal.onDidDismiss();
		if (role === 'confirm') {
			await this.search();
		}
	}

	public async edit(item: ExerciseModel) {
		const modal = await this.modalCtrl.create({
			component: ExerciseEditDialogComponent,
			componentProps: {
				item
			}
		});

		modal.present();

		const { data, role } = await modal.onDidDismiss();
		if (role === 'confirm') {
			await this.search();
		}
	}

	public async info(item: ExerciseModel) {
		const itemId = item.id;
		const modal = await this.modalCtrl.create({
			component: ExerciseInfoDialogComponent,
			componentProps: {
				exerciseId: itemId
			}
		});

		modal.present();
	}

	public async delete(item: ExerciseModel) {
		await this.editor.delete(item.id);
		await this.search();
	}
}
