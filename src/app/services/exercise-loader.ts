import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { ExerciseModel } from "../models/exercises/exercise-model";

@Injectable({ providedIn: 'root' })
export class ExerciseLoader {
	private key = "exercises";

	constructor(
		private storage: Storage
	) {

	}

	public async get(): Promise<ExerciseModel[]> {
		const exercises = await this.storage.get(this.key) as ExerciseModel[];
		const result = exercises || [];
		return result;
	}

	public async getById(id: string) {
		const exercises = await this.get();
		const result = exercises.find(item => item.id === id);
		return result;
	}
}