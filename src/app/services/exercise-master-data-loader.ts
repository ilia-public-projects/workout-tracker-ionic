import { Injectable } from "@angular/core";
import { ExerciseLoader } from "./exercise-loader";
import { ExerciseModel } from "../models/exercises/exercise-model";
import { ExerciseEditor } from "./exercise-editor";

@Injectable({ providedIn: 'root' })
export class ExerciseMasterDataLoader {
    
    constructor(
        private exerciseLoader: ExerciseLoader,
        private exerciseEditor: ExerciseEditor
    ) { }

    public async insertMasterData(): Promise<void> {
        // populate the storage with the master data if it is not already there
        const exercises = await this.exerciseLoader.get();
        if (exercises.some(x => !x.isEditable)) {
            return;
        }

        const response = await fetch('assets/exercise_master/exercises.json');
        const data = await response.json() as ExerciseModel[];
        await this.exerciseEditor.bulkInsert(data);
    }
}