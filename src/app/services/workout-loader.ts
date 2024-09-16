import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { WorkoutHeaderModel } from "../models/workouts/workout-header-model";

@Injectable({ providedIn: 'root' })
export class WorkoutLoader {
    private key = "workouts";

    constructor(
        private storage: Storage
    ) {
    }

    public async get() {
        return await this.storage.get(this.key) as WorkoutHeaderModel[];
        
    }
}