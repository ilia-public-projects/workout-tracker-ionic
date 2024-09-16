import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { ExerciseEntryModel } from "../models/exercises/exercise-entry-model";
import { GuidUtils } from "../utils/guid.utils";
import { ExerciseLoader } from "./exercise-loader";

@Injectable({ providedIn: 'root' })
export class ExerciseEditor {
    private key = "exercises";
    constructor(
        private storage: Storage,
        private loader: ExerciseLoader
    ) {
    }

    public async bulkInsert(data: ExerciseEntryModel[]) {
        data.sort((a, b) => a.name.localeCompare(b.name));
        
        await this.storage.set(this.key, data);
    }

    public async add(name: string) {
        // const exercises = await this.loader.get();

        // const model = new ExerciseEntryModel(GuidUtils.newGuid(), name);
        // exercises.push(model);

        // exercises.sort((a, b) => a.name.localeCompare(b.name));

        // await this.storage.set(this.key, exercises);
    }

    public async update(id: string, name: string) {
        const exercises = await this.loader.get();

        const model = exercises.find(x => x.id === id);
        if (model) {
            model.name = name;
        }

        exercises.sort((a, b) => a.name.localeCompare(b.name));

        await this.storage.set(this.key, exercises);
    }

    public async delete(id: string) {
        const exercises = await this.loader.get();

        const index = exercises.findIndex(x => x.id === id);
        if (index >= 0) {
            exercises.splice(index, 1);
        }

        await this.storage.set(this.key, exercises);
    }
}